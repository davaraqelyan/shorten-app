import { apiClient } from './api-client'
import { tokenManager } from '../auth-token'
import { User, LoginFormData, RegisterFormData } from '../schemas'
import { sanitizeText } from '../sanitization'

export interface LoginResponse {
  user: User
  access_token: string
}

export interface RegisterResponse {
  user: User
  access_token: string
}

export class AuthService {
  private readonly endpoints = {
    login: '/api/auth/login',
    register: '/api/auth/register',
    me: '/api/auth/me',
  }

  async login(data: LoginFormData): Promise<User> {
    const response = await apiClient.post<LoginResponse>(
      this.endpoints.login, 
      data,
      { skipAuth: true }
    )
    
    tokenManager.setToken(response.access_token)
    return response.user
  }

  async register(data: RegisterFormData): Promise<User> {
    const sanitizedData = {
      ...data,
      name: sanitizeText(data.name, 100),
    }

    const response = await apiClient.post<RegisterResponse>(
      this.endpoints.register, 
      sanitizedData,
      { skipAuth: true }
    )
    
    tokenManager.setToken(response.access_token)
    return response.user
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const token = tokenManager.getToken()
      if (!token) return null

      return await apiClient.get<User>(this.endpoints.me)
    } catch (error) {
      tokenManager.clearToken()
      return null
    }
  }

  logout(): void {
    tokenManager.clearToken()
  }

  isAuthenticated(): boolean {
    return tokenManager.getToken() !== null && !tokenManager.isTokenExpired()
  }

  getTokenExpirationTime(): number | null {
    return tokenManager.getTokenExpirationTime()
  }
}

export const authService = new AuthService()