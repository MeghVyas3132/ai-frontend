import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import authService, { LoginRequest, LoginResponse } from '@/services/auth.service';
import { AxiosError } from 'axios';

interface UseLoginOptions {
  onSuccess?: (data: LoginResponse) => void;
  onError?: (error: AxiosError) => void;
}

export const useLogin = (options?: UseLoginOptions) => {
  return useMutation<LoginResponse, AxiosError, LoginRequest>({
    mutationFn: (credentials) => authService.login(credentials),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

export const useRefreshToken = () => {
  return useMutation<LoginResponse, AxiosError, string>({
    mutationFn: (refreshToken) => authService.refreshToken(refreshToken),
  });
};

export const useVerifyEmail = () => {
  return useMutation<{ message: string }, AxiosError, string>({
    mutationFn: (token) => authService.verifyEmail(token),
  });
};

export const useResendVerification = () => {
  return useMutation<{ message: string }, AxiosError, string>({
    mutationFn: (email) => authService.resendVerification(email),
  });
};
