export interface AnalyticsMetrics {
  totalUrls: number;
  totalClicks: number;
  todayClicks: number;
  averageClicksPerUrl: number;
  clickRate: number;
}

export interface RecentUrl {
  id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
}

export interface ClickTrend {
  date: string;
  clicks: number;
}

export interface AnalyticsData {
  metrics: AnalyticsMetrics;
  recentUrls: RecentUrl[];
  clickTrends: ClickTrend[];
}