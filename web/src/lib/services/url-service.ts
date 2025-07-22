import { apiClient } from './api-client'
import { UrlData, CreateUrlFormData } from '../schemas'
import { sanitizeUrl, sanitizeCustomCode } from '../sanitization'

export class UrlService {
  private readonly endpoints = {
    shorten: '/api/shorten',
    myUrls: '/api/my-urls',
    info: (shortCode: string) => `/api/info/${shortCode}`,
    delete: (id: string) => `/api/url/${id}`,
  }

  async createShortUrl(data: CreateUrlFormData): Promise<UrlData> {
    const sanitizedCustomCode = sanitizeCustomCode(data.customCode || '')
    
    const sanitizedData: any = {
      originalUrl: sanitizeUrl(data.originalUrl),
      title: data.title || undefined,
      description: data.description || undefined,
    }
    
    // Only include customCode if it's not empty
    if (sanitizedCustomCode) {
      sanitizedData.customCode = sanitizedCustomCode
    }

    return apiClient.post<UrlData>(this.endpoints.shorten, sanitizedData)
  }

  async getMyUrls(): Promise<UrlData[]> {
    return apiClient.get<UrlData[]>(this.endpoints.myUrls)
  }

  async getUrlInfo(shortCode: string): Promise<UrlData> {
    return apiClient.get<UrlData>(this.endpoints.info(shortCode))
  }

  async deleteUrl(id: string): Promise<void> {
    await apiClient.delete(this.endpoints.delete(id))
  }
}

export const urlService = new UrlService()