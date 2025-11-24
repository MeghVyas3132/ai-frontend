'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import authService from "@/services/auth.service";
import { AxiosError } from "axios";
import { setAccessToken as setApiAccessToken } from "@/lib/api-client";

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
  accessToken: string | null;
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
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize from sessionStorage (user info only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedUser = sessionStorage.getItem("user");
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          // Note: access_token is stored in memory only, so it won't persist on refresh
          // This forces re-authentication which is more secure
        }
      } catch (err) {
        console.error("Failed to restore user session:", err);
        sessionStorage.removeItem("user");
      }
      setIsLoading(false);
    }
  }, []);

  const setTokensLocally = useCallback((newAccessToken: string) => {
    setAccessToken(newAccessToken);
    setApiAccessToken(newAccessToken); // Sync with api-client
  }, []);

  const refreshTokens = useCallback(async () => {
    try {
      // Refresh token comes from httpOnly cookie (sent automatically by browser)
      const response = await authService.refreshToken("");
      setTokensLocally(response.access_token);
    } catch (err) {
      // Refresh failed, clear auth state
      sessionStorage.removeItem("user");
      setAccessToken(null);
      setApiAccessToken(null);
      setUser(null);
      setError("Session expired. Please login again.");
      throw err;
    }
  }, [setTokensLocally]);

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login({ email, password });

      // Store access token in memory and sync with api-client
      setTokensLocally(response.access_token);
      // Refresh token is stored in httpOnly cookie by backend

      // Extract user info
      const userData: User = {
        id: response.user?.id || "",
        email: response.user?.email || email,
        name: response.user?.name || "",
        role: (response.user?.role as UserRole) || "EMPLOYEE",
        company_id: response.user?.company_id || "",
        department: response.user?.department || undefined,
      };

      // Store user in sessionStorage (cleared on browser close)
      sessionStorage.setItem("user", JSON.stringify(userData));
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
  }, [setTokensLocally]);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Logout API call failed:", err);
    } finally {
      sessionStorage.removeItem("user");
      setAccessToken(null);
      setApiAccessToken(null);
      setUser(null);
      setError(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
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
