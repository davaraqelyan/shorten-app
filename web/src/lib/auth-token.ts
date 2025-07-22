import Cookies from 'js-cookie'
import { TOKEN_CONFIG } from './constants'
import { AuthenticationError } from './errors'

export interface TokenData {
  token: string
  expiresAt: number
}

class TokenManager {
  private readonly tokenKey = TOKEN_CONFIG.NAME
  
  setToken(token: string): void {
    try {
      const tokenData: TokenData = {
        token,
        expiresAt: Date.now() + (TOKEN_CONFIG.EXPIRES_DAYS * 24 * 60 * 60 * 1000)
      }
      
      Cookies.set(this.tokenKey, JSON.stringify(tokenData), {
        expires: TOKEN_CONFIG.EXPIRES_DAYS,
        secure: process.env.NODE_ENV === 'production',
        sameSite: TOKEN_CONFIG.SAME_SITE,
        path: '/'
      })
    } catch (error) {
      console.error('Failed to store token:', error)
      throw new AuthenticationError('Failed to store authentication token')
    }
  }
  
  getToken(): string | null {
    try {
      const tokenDataStr = Cookies.get(this.tokenKey)
      if (!tokenDataStr) return null
      
      const tokenData: TokenData = JSON.parse(tokenDataStr)
      
      if (Date.now() > tokenData.expiresAt) {
        this.clearToken()
        return null
      }
      
      return tokenData.token
    } catch (error) {
      console.error('Failed to retrieve token:', error)
      this.clearToken()
      return null
    }
  }
  
  clearToken(): void {
    try {
      Cookies.remove(this.tokenKey, { path: '/' })
    } catch (error) {
      console.error('Failed to clear token:', error)
    }
  }
  
  isTokenExpired(): boolean {
    try {
      const tokenDataStr = Cookies.get(this.tokenKey)
      if (!tokenDataStr) return true
      
      const tokenData: TokenData = JSON.parse(tokenDataStr)
      return Date.now() > tokenData.expiresAt
    } catch {
      return true
    }
  }
  
  getTokenExpirationTime(): number | null {
    try {
      const tokenDataStr = Cookies.get(this.tokenKey)
      if (!tokenDataStr) return null
      
      const tokenData: TokenData = JSON.parse(tokenDataStr)
      return tokenData.expiresAt
    } catch {
      return null
    }
  }
}

export const tokenManager = new TokenManager()