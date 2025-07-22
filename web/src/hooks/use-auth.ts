import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/lib/services/auth-service';
import { User, LoginFormData, RegisterFormData } from '@/lib/schemas';
import { REACT_QUERY_CONFIG } from '@/lib/constants';

export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
};

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: () => authService.getCurrentUser(),
    enabled: authService.isAuthenticated(),
    staleTime: REACT_QUERY_CONFIG.STALE_TIME.DEFAULT,
    retry: false,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginFormData): Promise<User> => {
      const user = await authService.login(data);
      return user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(authKeys.user(), user);

      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
    onError: (error) => {
      queryClient.removeQueries({ queryKey: authKeys.user() });
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RegisterFormData): Promise<User> => {
      const user = await authService.register(data);
      return user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(authKeys.user(), user);

      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
    onError: (error) => {
      queryClient.removeQueries({ queryKey: authKeys.user() });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<void> => {
      authService.logout();
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
}
