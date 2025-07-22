export const RATE_LIMITS = {
  PER_MINUTE: 20,
  TTL_MS: 60000,
} as const;

export const TOKEN_CONFIG = {
  NAME: 'auth-token',
  EXPIRES_DAYS: 1, // Reduced from 7 days to 1 day for security
  SECURE: true,
  HTTP_ONLY: true,
  SAME_SITE: 'strict' as const,
} as const;

export const API_CONFIG = {
  TIMEOUT_MS: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY_MS: 1000,
} as const;

export const UI_CONFIG = {
  TOAST_DURATION_MS: 3000,
  SKELETON_ITEMS: 5,
  URLS_PER_PAGE: 10,
} as const;

export const VALIDATION = {
  URL_MAX_LENGTH: 2048,
  CUSTOM_CODE_MIN_LENGTH: 3,
  CUSTOM_CODE_MAX_LENGTH: 50,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  TITLE_MAX_LENGTH: 200,
  DESCRIPTION_MAX_LENGTH: 500,
} as const;

export const REACT_QUERY_CONFIG = {
  STALE_TIME: {
    DEFAULT: 5 * 60 * 1000, // 5 minutes
    SHORT: 2 * 60 * 1000, // 2 minutes
    LONG: 10 * 60 * 1000, // 10 minutes
  },
  RETRY_ATTEMPTS: 3,
} as const;
