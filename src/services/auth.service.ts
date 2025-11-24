import apiClient from '@/lib/api-client';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
    company_id: string;
    department?: string;
  };
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface ResendVerificationRequest {
  email: string;
}

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/refresh', {
      refresh_token: refreshToken,
    });
    return response.data;
  },

  async logout(): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>('/auth/logout');
    return response.data;
  },

  async verifyEmail(token: string): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>('/auth/verify-email', {
      token,
    });
    return response.data;
  },

  async resendVerification(email: string): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>('/auth/resend-verification', {
      email,
    });
    return response.data;
  },
};

export default authService;
