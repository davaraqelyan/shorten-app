'use client';

import { createContext, useContext, useEffect, ReactNode } from 'react';
import {
  useCurrentUser,
  useLogin,
  useRegister,
  useLogout,
} from '@/hooks/use-auth';
import { User, LoginFormData, RegisterFormData } from '@/lib/schemas';

interface AuthContextType {
  user: User | null;
  login: (data: LoginFormData) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading, error } = useCurrentUser();
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();

  // Clear user data if token is invalid
  useEffect(() => {
    if (error) {
      logoutMutation.mutate();
    }
  }, [error, logoutMutation]);

  const login = async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync(data);
    } catch (error) {
      console.error('Auth context login error:', error);
      throw error;
    }
  };

  const register = async (data: RegisterFormData) => {
    try {
      await registerMutation.mutateAsync(data);
    } catch (error) {
      console.error('Auth context register error:', error);
      throw error;
    }
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  const value = {
    user: user || null,
    login,
    register,
    logout,
    loading: isLoading || loginMutation.isPending || registerMutation.isPending,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
