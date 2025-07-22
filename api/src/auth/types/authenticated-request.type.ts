import type { Request as ExpressRequest } from 'express';
import type { AuthUser } from './auth-user.type';

export interface AuthenticatedRequest extends ExpressRequest {
  user: AuthUser;
}