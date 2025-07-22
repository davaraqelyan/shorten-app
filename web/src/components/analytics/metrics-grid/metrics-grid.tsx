import { TrendingUp, Link, Eye, BarChart3 } from 'lucide-react';
import { MetricCard } from '../metric-card';
import { AnalyticsMetrics } from '@/types/analytics';

interface MetricsGridProps {
  metrics: AnalyticsMetrics;
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <MetricCard
        title="Total URLs"
        value={metrics.totalUrls}
        description="All time URLs created"
        icon={Link}
        variant="blue"
      />
      <MetricCard
        title="Total Clicks"
        value={metrics.totalClicks}
        description="All time clicks"
        icon={Eye}
        variant="green"
      />
      <MetricCard
        title="Today's Clicks"
        value={metrics.todayClicks}
        description="Clicks today"
        icon={TrendingUp}
        variant="purple"
      />
      <MetricCard
        title="Avg. Clicks"
        value={metrics.averageClicksPerUrl}
        description="Per URL average"
        icon={BarChart3}
        variant="orange"
      />
    </div>
  );
}