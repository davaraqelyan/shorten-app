export interface UrlDetails {
  id: string;
  originalUrl: string;
  shortUrl: string;
  shortCode: string;
  visitCount: number;
  createdAt: string;
  title?: string;
  description?: string;
}

export interface Visit {
  id: string;
  urlId: string;
  timestamp: string;
  userAgent?: string;
  ipAddress?: string;
  country?: string;
  city?: string;
  device?: string;
  browser?: string;
  referrer?: string;
}