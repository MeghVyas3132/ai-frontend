'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import authService from "@/services/auth.service";
import { AxiosError } from "axios";

export type UserRole = "ADMIN" | "HR" | "EMPLOYEE" | "CANDIDATE";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  company_id: string;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  refreshTokens: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedUser = localStorage.getItem("user");
        const accessToken = localStorage.getItem("access_token");
        
        if (storedUser && accessToken) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error("Failed to restore user session:", err);
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
      setIsLoading(false);
    }
  }, []);

  const refreshTokens = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await authService.refreshToken(refreshToken);
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("refresh_token", response.refresh_token);
    } catch (err) {
      // Refresh failed, clear auth state
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setUser(null);
      setError("Session expired. Please login again.");
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login({ email, password });

      // Store tokens
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("refresh_token", response.refresh_token);

      // Extract user info from token or response
      const userData: User = {
        id: response.user?.id || "",
        email: response.user?.email || email,
        name: response.user?.name || "",
        role: (response.user?.role as UserRole) || "EMPLOYEE",
        company_id: response.user?.company_id || "",
        department: response.user?.department || undefined,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setIsLoading(false);
      return { success: true };
    } catch (err) {
      const axiosError = err as AxiosError;
      const errorMessage = (axiosError.response?.data as any)?.detail || "Login failed. Please try again.";
      setError(errorMessage);
      setIsLoading(false);
      return { success: false, error: errorMessage };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Logout API call failed:", err);
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setUser(null);
      setError(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        error,
        isAuthenticated: !!user,
        refreshTokens,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
