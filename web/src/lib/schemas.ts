import { z } from 'zod'
import { VALIDATION } from './constants'

export const createUrlSchema = z.object({
  originalUrl: z
    .string()
    .min(1, 'URL is required')
    .max(VALIDATION.URL_MAX_LENGTH, `URL must not exceed ${VALIDATION.URL_MAX_LENGTH} characters`)
    .url('URL must be a valid HTTP or HTTPS URL')
    .refine((url) => {
      try {
        const urlObj = new URL(url)
        return ['http:', 'https:'].includes(urlObj.protocol)
      } catch {
        return false
      }
    }, 'URL must use HTTP or HTTPS protocol'),
  
  customCode: z
    .string()
    .optional()
    .refine((code) => {
      if (!code) return true
      const trimmed = code.trim()
      if (trimmed.length < VALIDATION.CUSTOM_CODE_MIN_LENGTH) return false
      return trimmed.length <= VALIDATION.CUSTOM_CODE_MAX_LENGTH
    }, `Custom code must be between ${VALIDATION.CUSTOM_CODE_MIN_LENGTH} and ${VALIDATION.CUSTOM_CODE_MAX_LENGTH} characters`)
    .refine((code) => {
      if (!code) return true
      const trimmed = code.trim()
      if (!trimmed) return true
      return /^[a-zA-Z0-9][a-zA-Z0-9-_]*[a-zA-Z0-9]$/.test(trimmed)
    }, 'Custom code must start and end with alphanumeric characters and can contain hyphens and underscores'),
    
  title: z
    .string()
    .optional()
    .refine((title) => !title || title.trim().length <= VALIDATION.TITLE_MAX_LENGTH, `Title must not exceed ${VALIDATION.TITLE_MAX_LENGTH} characters`),
    
  description: z
    .string()
    .optional()
    .refine((desc) => !desc || desc.trim().length <= VALIDATION.DESCRIPTION_MAX_LENGTH, `Description must not exceed ${VALIDATION.DESCRIPTION_MAX_LENGTH} characters`),
})

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
  
  password: z
    .string()
    .min(1, 'Password is required'),
})

export const registerSchema = z.object({
  name: z
    .string()
    .min(VALIDATION.NAME_MIN_LENGTH, `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`)
    .max(VALIDATION.NAME_MAX_LENGTH, `Name must not exceed ${VALIDATION.NAME_MAX_LENGTH} characters`)
    .trim()
    .refine((name) => name.length >= VALIDATION.NAME_MIN_LENGTH, 'Name cannot be empty after trimming')
    .refine((name) => /^[a-zA-Z\s'-]+$/.test(name), 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
  
  password: z
    .string()
    .min(VALIDATION.PASSWORD_MIN_LENGTH, `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`)
    .max(VALIDATION.PASSWORD_MAX_LENGTH, `Password must not exceed ${VALIDATION.PASSWORD_MAX_LENGTH} characters`)
    .refine((password) => /[A-Z]/.test(password), 'Password must contain at least one uppercase letter')
    .refine((password) => /[a-z]/.test(password), 'Password must contain at least one lowercase letter')
    .refine((password) => /\d/.test(password), 'Password must contain at least one number'),
})

export type CreateUrlFormData = z.infer<typeof createUrlSchema>
export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>

export interface UrlData {
  id: string
  originalUrl: string
  shortUrl: string
  shortCode: string
  visitCount: number
  createdAt: string
  expiresAt?: string
  title?: string
  description?: string
}

export interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

export interface AnalyticsData {
  totalUrls: number
  totalClicks: number
  todayClicks: number
  recentUrls: Array<{
    id: string
    originalUrl: string
    shortUrl: string
    clicks: number
    createdAt: string
  }>
  clicksOverTime: Array<{
    date: string
    clicks: number
  }>
}