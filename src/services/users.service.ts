import apiClient from '@/lib/api-client';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'HR' | 'EMPLOYEE' | 'CANDIDATE';
  company_id: string;
  department?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role: 'HR' | 'EMPLOYEE';
  department?: string;
}

export interface UpdateUserRequest {
  name?: string;
  department?: string;
  email?: string;
}

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
}

export interface ListUsersResponse {
  users: User[];
  total: number;
  page: number;
  page_size: number;
}

export const usersService = {
  async createUser(companyId: string, data: CreateUserRequest): Promise<User> {
    const response = await apiClient.post<User>('/users', {
      ...data,
      company_id: companyId,
    });
    return response.data;
  },

  async listUsers(params?: {
    skip?: number;
    limit?: number;
    role?: string;
    department?: string;
  }): Promise<ListUsersResponse> {
    const response = await apiClient.get<ListUsersResponse>('/users', { params });
    return response.data;
  },

  async getUser(userId: string): Promise<User> {
    const response = await apiClient.get<User>(`/users/${userId}`);
    return response.data;
  },

  async updateUser(userId: string, data: UpdateUserRequest): Promise<User> {
    const response = await apiClient.put<User>(`/users/${userId}`, data);
    return response.data;
  },

  async deleteUser(userId: string): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(`/users/${userId}`);
    return response.data;
  },

  async changePassword(userId: string, data: ChangePasswordRequest): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>(`/users/${userId}/change-password`, data);
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>('/users/me');
    return response.data;
  },
};

export default usersService;
