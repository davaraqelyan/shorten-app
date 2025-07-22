import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

function AnalyticsHeaderSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-72" />
      </div>
      <Skeleton className="h-10 w-32" />
    </div>
  );
}

function MetricCardSkeleton() {
  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-16 mb-1" />
        <Skeleton className="h-3 w-20" />
      </CardContent>
    </Card>
  );
}

function MetricsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <MetricCardSkeleton key={i} />
      ))}
    </div>
  );
}

function RecentUrlsListSkeleton() {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <Skeleton className="h-6 w-32 mb-1" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-3">
              <Skeleton className="h-4 w-4" />
              <div className="flex-1">
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="h-4 w-12" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ClickTrendsChartSkeleton() {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <Skeleton className="h-6 w-32 mb-1" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-4 w-4" />
                <div>
                  <Skeleton className="h-4 w-16 mb-1" />
                  <Skeleton className="h-1 w-20" />
                </div>
              </div>
              <Skeleton className="h-4 w-12" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function AnalyticsPageSkeleton() {
  return (
    <div className="space-y-8">
      <AnalyticsHeaderSkeleton />
      <MetricsGridSkeleton />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentUrlsListSkeleton />
        <ClickTrendsChartSkeleton />
      </div>
    </div>
  );
}