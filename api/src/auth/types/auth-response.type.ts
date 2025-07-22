import type { AuthUser } from './auth-user.type';

export interface AuthResponse {
  access_token: string;
  user: AuthUser;
}