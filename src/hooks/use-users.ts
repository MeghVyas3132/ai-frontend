import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import usersService, {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  ChangePasswordRequest,
  ListUsersResponse,
} from '@/services/users.service';
import { AxiosError } from 'axios';

const USERS_QUERY_KEY = ['users'];
const USER_QUERY_KEY = (id: string) => ['users', id];

export const useListUsers = (params?: { skip?: number; limit?: number; role?: string; department?: string }) => {
  return useQuery<ListUsersResponse, AxiosError>({
    queryKey: [...USERS_QUERY_KEY, params],
    queryFn: () => usersService.listUsers(params),
  });
};

export const useGetUser = (userId: string | undefined) => {
  return useQuery<User, AxiosError>({
    queryKey: USER_QUERY_KEY(userId || ''),
    queryFn: () => usersService.getUser(userId!),
    enabled: !!userId,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<User, AxiosError, { companyId: string; data: CreateUserRequest }>({
    mutationFn: ({ companyId, data }) => usersService.createUser(companyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
  });
};

export const useUpdateUser = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation<User, AxiosError, UpdateUserRequest>({
    mutationFn: (data) => usersService.updateUser(userId, data),
    onSuccess: (data) => {
      queryClient.setQueryData(USER_QUERY_KEY(userId), data);
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
  });
};

export const useDeleteUser = (userId?: string) => {
  const queryClient = useQueryClient();
  return useMutation<{ message: string }, AxiosError, void>({
    mutationFn: async () => {
      if (!userId) throw new Error("User ID is required");
      return usersService.deleteUser(userId);
    },
    onSuccess: () => {
      if (userId) {
        queryClient.removeQueries({ queryKey: USER_QUERY_KEY(userId) });
        queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
      }
    },
  });
};

export const useChangePassword = (userId: string) => {
  return useMutation<{ message: string }, AxiosError, ChangePasswordRequest>({
    mutationFn: (data) => usersService.changePassword(userId, data),
  });
};

export const useGetCurrentUser = () => {
  return useQuery<User, AxiosError>({
    queryKey: ['current-user'],
    queryFn: () => usersService.getCurrentUser(),
  });
};
