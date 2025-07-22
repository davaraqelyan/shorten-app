'use client';

import { useRouter } from 'next/navigation';
import { useAnalytics } from '@/hooks/use-analytics';
import { getUserFriendlyMessage } from '@/lib/errors';
import { toast } from 'sonner';
import {
  AnalyticsHeader,
  MetricsGrid,
  RecentUrlsList,
  ClickTrendsChart,
  AnalyticsPageSkeleton,
} from '@/components/analytics';


export default function AnalyticsPage() {
  const { data: analyticsData, isLoading, error } = useAnalytics();
  const router = useRouter();

  const handleCreateUrl = () => {
    router.push('/dashboard/urls');
  };

  if (error) {
    toast.error(getUserFriendlyMessage(error));
  }

  if (isLoading) {
    return <AnalyticsPageSkeleton />;
  }

  if (!analyticsData) {
    return null;
  }

  return (
    <div className="space-y-8">
      <AnalyticsHeader onCreateUrl={handleCreateUrl} />
      <MetricsGrid metrics={analyticsData.metrics} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentUrlsList
          urls={analyticsData.recentUrls}
          onCreateUrl={handleCreateUrl}
        />
        <ClickTrendsChart trends={analyticsData.clickTrends} />
      </div>
    </div>
  );
}
