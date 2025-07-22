import { tokenManager } from '../auth-token'
import { API_CONFIG } from '../constants'
import { 
  AppError,
  NetworkError,
  AuthenticationError,
  ValidationError,
  RateLimitError,
  ServerError,
  NotFoundError
} from '../errors'

export interface ApiResponse<T = unknown> {
  data: T
  success: boolean
  message?: string
}

export interface ApiRequestConfig extends RequestInit {
  timeout?: number
  skipAuth?: boolean
  retries?: number
}

class ApiClient {
  private readonly baseUrl: string
  private readonly timeout: number
  private readonly maxRetries: number

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
    this.timeout = API_CONFIG.TIMEOUT_MS
    this.maxRetries = API_CONFIG.RETRY_ATTEMPTS
  }

  private async makeRequest<T>(
    endpoint: string,
    config: ApiRequestConfig = {}
  ): Promise<T> {
    const {
      timeout = this.timeout,
      skipAuth = false,
      retries = 0,
      ...fetchConfig
    } = config

    const url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((fetchConfig.headers as Record<string, string>) || {})
    }

    if (!skipAuth) {
      const token = tokenManager.getToken()
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(url, {
        ...fetchConfig,
        headers,
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        await this.handleErrorResponse(response)
      }

      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        return await response.json()
      }

      return response.text() as unknown as T
    } catch (error) {
      clearTimeout(timeoutId)
      
      if (error instanceof AppError) {
        throw error
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new NetworkError('Request timeout')
      }

      if (retries < this.maxRetries) {
        await this.delay(API_CONFIG.RETRY_DELAY_MS * (retries + 1))
        return this.makeRequest(endpoint, { ...config, retries: retries + 1 })
      }

      throw new NetworkError('Network request failed')
    }
  }

  private async handleErrorResponse(response: Response): Promise<never> {
    let errorMessage = 'Request failed'
    let errorDetails: unknown

    try {
      const errorData = await response.json()
      errorMessage = errorData.message || errorMessage
      errorDetails = errorData
    } catch {
      errorMessage = response.statusText || errorMessage
    }

    switch (response.status) {
      case 400:
        throw new ValidationError(errorMessage, errorDetails)
      case 401:
        tokenManager.clearToken()
        throw new AuthenticationError(errorMessage)
      case 404:
        throw new NotFoundError(errorMessage)
      case 429:
        throw new RateLimitError(errorMessage)
      case 500:
      case 502:
      case 503:
      case 504:
        throw new ServerError(errorMessage)
      default:
        throw new AppError(errorMessage, response.status as any, response.status, errorDetails)
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async get<T>(endpoint: string, config?: ApiRequestConfig): Promise<T> {
    return this.makeRequest<T>(endpoint, { ...config, method: 'GET' })
  }

  async post<T>(endpoint: string, data?: unknown, config?: ApiRequestConfig): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
    })
  }

  async put<T>(endpoint: string, data?: unknown, config?: ApiRequestConfig): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined
    })
  }

  async delete<T>(endpoint: string, config?: ApiRequestConfig): Promise<T> {
    return this.makeRequest<T>(endpoint, { ...config, method: 'DELETE' })
  }

  async patch<T>(endpoint: string, data?: unknown, config?: ApiRequestConfig): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined
    })
  }
}

export const apiClient = new ApiClient()