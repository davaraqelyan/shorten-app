import { AnalyticsData, ClickTrend, RecentUrl } from '@/types/analytics';
import { useMemo } from 'react';
import { useMyUrls } from './use-urls';

export function useAnalytics() {
  const { data: urls = [], isLoading, error } = useMyUrls(true); 

  const analyticsData = useMemo((): AnalyticsData | null => {
    if (!urls.length) {
      return {
        metrics: {
          totalUrls: 0,
          totalClicks: 0,
          todayClicks: 0,
          averageClicksPerUrl: 0,
          clickRate: 0,
        },
        recentUrls: [],
        clickTrends: [],
      };
    }

    const totalUrls = urls.length;
    const totalClicks = urls.reduce((sum, url) => sum + (url.visitCount || 0), 0);
    const todayClicks = 0;
    const averageClicksPerUrl = totalUrls > 0 ? totalClicks / totalUrls : 0;
    const clickRate = totalUrls > 0 ? (totalClicks / totalUrls) * 100 : 0;

    const recentUrls: RecentUrl[] = urls
      .slice()
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
      .map((url) => ({
        id: url.id,
        originalUrl: url.originalUrl,
        shortUrl: url.shortUrl,
        clicks: url.visitCount || 0,
        createdAt: url.createdAt,
      }));

    const clickTrends: ClickTrend[] = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      clickTrends.push({
        date: date.toISOString().split('T')[0],
        clicks: Math.floor(Math.random() * 50),
      });
    }

    return {
      metrics: {
        totalUrls,
        totalClicks,
        todayClicks,
        averageClicksPerUrl: Number(averageClicksPerUrl.toFixed(1)),
        clickRate: Number(clickRate.toFixed(1)),
      },
      recentUrls,
      clickTrends,
    };
  }, [urls]);

  return {
    data: analyticsData,
    isLoading,
    error,
    isEmpty: !urls.length,
  };
}