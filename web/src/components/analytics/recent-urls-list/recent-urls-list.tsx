import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RecentUrl } from '@/types/analytics';
import { cn } from '@/lib/utils';
import { UrlItem } from './url-item';
import { EmptyState } from './empty-state';
import { LoadingSkeleton } from './loading-skeleton';

interface RecentUrlsListProps {
  urls: RecentUrl[];
  isLoading?: boolean;
  onCreateUrl?: () => void;
  className?: string;
}

export function RecentUrlsList({
  urls,
  isLoading,
  onCreateUrl,
  className,
}: RecentUrlsListProps) {
  if (isLoading) {
    return <LoadingSkeleton className={className} />;
  }

  return (
    <Card className={cn('border-0 shadow-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent URLs</CardTitle>
        <CardDescription>
          Your most recently created short URLs
        </CardDescription>
      </CardHeader>
      <CardContent>
        {urls.length > 0 ? (
          <div className="space-y-4">
            {urls.map((url) => (
              <UrlItem key={url.id} url={url} />
            ))}
          </div>
        ) : (
          <EmptyState onCreateUrl={onCreateUrl} />
        )}
      </CardContent>
    </Card>
  );
}