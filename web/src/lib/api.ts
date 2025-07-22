import { tokenManager } from './auth-token'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export const api = {
  shorten: `${API_BASE_URL}/api/shorten`,
  myUrls: `${API_BASE_URL}/api/my-urls`,
  urlInfo: (shortCode: string) => `${API_BASE_URL}/api/info/${shortCode}`,
  deleteUrl: (id: string) => `${API_BASE_URL}/api/url/${id}`,
  auth: {
    login: `${API_BASE_URL}/api/auth/login`,
    register: `${API_BASE_URL}/api/auth/register`,
    me: `${API_BASE_URL}/api/auth/me`
  }
}

export const getAuthToken = () => tokenManager.getToken()

export const apiRequest = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken()
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  }

  const response = await fetch(url, defaultOptions)
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(error.message || `HTTP ${response.status}`)
  }
  
  return response.json()
}