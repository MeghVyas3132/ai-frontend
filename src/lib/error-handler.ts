import { AxiosError } from 'axios';
import { toast } from 'sonner';

export interface ApiError {
  message: string;
  status: number;
  details?: any;
}

export const handleApiError = (error: unknown, defaultMessage: string = 'An error occurred'): ApiError => {
  if (error instanceof AxiosError) {
    const message = (error.response?.data as any)?.detail || error.message || defaultMessage;
    const status = error.response?.status || 500;

    const apiError: ApiError = {
      message,
      status,
      details: error.response?.data,
    };

    // Show toast for errors
    if (status === 401) {
      toast.error('Session expired. Please login again.');
    } else if (status === 403) {
      toast.error('You do not have permission to perform this action.');
    } else if (status === 404) {
      toast.error('Resource not found.');
    } else if (status >= 500) {
      toast.error('Server error. Please try again later.');
    }

    return apiError;
  }

  return {
    message: defaultMessage,
    status: 500,
  };
};

export const logError = (context: string, error: unknown) => {
  console.error(`[${context}]`, error);
};
