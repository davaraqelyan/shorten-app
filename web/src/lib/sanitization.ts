import { VALIDATION } from './constants'

// Use dynamic imports to handle both server and client environments
export function sanitizeHtml(input: string): string {
  if (typeof window === 'undefined') {
    // Server-side: Use isomorphic-dompurify
    const createDOMPurify = require('isomorphic-dompurify')
    const DOMPurify = createDOMPurify()
    return DOMPurify.sanitize(input, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: []
    })
  } else {
    // Client-side: Use regular dompurify
    const DOMPurify = require('dompurify')
    return DOMPurify.sanitize(input, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: []
    })
  }
}

export function sanitizeUrl(url: string): string {
  const sanitized = sanitizeHtml(url).trim()
  
  if (sanitized.length > VALIDATION.URL_MAX_LENGTH) {
    throw new Error(`URL too long. Maximum length is ${VALIDATION.URL_MAX_LENGTH} characters.`)
  }
  
  if (!isValidUrl(sanitized)) {
    throw new Error('Invalid URL format')
  }
  
  return sanitized
}

export function sanitizeCustomCode(code: string): string {
  if (!code) return ''
  
  const sanitized = sanitizeHtml(code)
    .trim()
    .replace(/[^a-zA-Z0-9-_]/g, '')
  
  if (sanitized.length > VALIDATION.CUSTOM_CODE_MAX_LENGTH) {
    throw new Error(`Custom code too long. Maximum length is ${VALIDATION.CUSTOM_CODE_MAX_LENGTH} characters.`)
  }
  
  if (sanitized && !/^[a-zA-Z0-9][a-zA-Z0-9-_]*[a-zA-Z0-9]$/.test(sanitized)) {
    throw new Error('Custom code must start and end with alphanumeric characters')
  }
  
  return sanitized
}

export function sanitizeText(text: string, maxLength = 1000): string {
  const sanitized = sanitizeHtml(text).trim()
  
  if (sanitized.length > maxLength) {
    throw new Error(`Text too long. Maximum length is ${maxLength} characters.`)
  }
  
  return sanitized
}

export function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    return ['http:', 'https:'].includes(urlObj.protocol)
  } catch {
    return false
  }
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

export function escapeHtml(text: string): string {
  if (typeof window === 'undefined') {
    // Server-side HTML escaping
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
  } else {
    // Client-side HTML escaping
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }
}