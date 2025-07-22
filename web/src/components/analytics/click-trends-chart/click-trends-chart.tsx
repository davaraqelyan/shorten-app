import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ClickTrend } from '@/types/analytics';
import { cn } from '@/lib/utils';
import { TrendItem } from './trend-item';
import { EmptyState } from './empty-state';
import { LoadingSkeleton } from './loading-skeleton';

interface ClickTrendsChartProps {
  trends: ClickTrend[];
  isLoading?: boolean;
  className?: string;
}

export function ClickTrendsChart({
  trends,
  isLoading,
  className,
}: ClickTrendsChartProps) {
  const maxClicks = Math.max(...trends.map(t => t.clicks), 1);
  const totalClicks = trends.reduce((sum, trend) => sum + trend.clicks, 0);

  if (isLoading) {
    return <LoadingSkeleton className={className} />;
  }

  return (
    <Card className={cn('border-0 shadow-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Click Trends
        </CardTitle>
        <CardDescription>
          Last 7 days • {totalClicks} total clicks
        </CardDescription>
      </CardHeader>
      <CardContent>
        {trends.length > 0 ? (
          <div className="space-y-3">
            {trends.map((trend, index) => (
              <TrendItem 
                key={`${trend.date}-${index}`} 
                trend={trend} 
                maxClicks={maxClicks}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </CardContent>
    </Card>
  );
}