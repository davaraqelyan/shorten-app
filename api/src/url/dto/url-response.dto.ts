export interface UrlResponseDto {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  title?: string;
  description?: string;
  visitCount: number;
  createdAt: Date;
  expiresAt?: Date;
  clickCount?: number;
}