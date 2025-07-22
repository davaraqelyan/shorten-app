export enum ErrorCode {
  NETWORK_ERROR = 'NETWORK_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  RATE_LIMIT_ERROR = 'RATE_LIMIT_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  NOT_FOUND_ERROR = 'NOT_FOUND_ERROR',
  PERMISSION_ERROR = 'PERMISSION_ERROR',
}

export class AppError extends Error {
  constructor(
    message: string,
    public code: ErrorCode,
    public statusCode?: number,
    public details?: unknown
  ) {
    super(message)
    this.name = 'AppError'
  }

  static isAppError(error: unknown): error is AppError {
    return error instanceof AppError
  }
}

export class NetworkError extends AppError {
  constructor(message = 'Network request failed') {
    super(message, ErrorCode.NETWORK_ERROR)
  }
}

export class AuthenticationError extends AppError {
  constructor(message = 'Authentication failed') {
    super(message, ErrorCode.AUTHENTICATION_ERROR, 401)
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation failed', details?: unknown) {
    super(message, ErrorCode.VALIDATION_ERROR, 400, details)
  }
}

export class RateLimitError extends AppError {
  constructor(message = 'Rate limit exceeded') {
    super(message, ErrorCode.RATE_LIMIT_ERROR, 429)
  }
}

export class ServerError extends AppError {
  constructor(message = 'Server error occurred') {
    super(message, ErrorCode.SERVER_ERROR, 500)
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, ErrorCode.NOT_FOUND_ERROR, 404)
  }
}

export function getErrorMessage(error: unknown): string {
  if (AppError.isAppError(error)) {
    return error.message
  }
  
  if (error instanceof Error) {
    return error.message
  }
  
  return 'An unexpected error occurred'
}

export function getUserFriendlyMessage(error: unknown): string {
  if (AppError.isAppError(error)) {
    switch (error.code) {
      case ErrorCode.NETWORK_ERROR:
        return 'Please check your internet connection and try again.'
      case ErrorCode.AUTHENTICATION_ERROR:
        return 'Please log in again to continue.'
      case ErrorCode.VALIDATION_ERROR:
        return 'Please check your input and try again.'
      case ErrorCode.RATE_LIMIT_ERROR:
        return 'Too many requests. Please wait a moment and try again.'
      case ErrorCode.NOT_FOUND_ERROR:
        return 'The requested resource was not found.'
      case ErrorCode.SERVER_ERROR:
        return 'Server error occurred. Our team has been notified.'
      case ErrorCode.PERMISSION_ERROR:
        return 'You do not have permission to perform this action.'
      default:
        return error.message
    }
  }
  
  return 'Something went wrong. Please try again later.'
}