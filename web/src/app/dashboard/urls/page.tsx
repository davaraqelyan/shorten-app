'use client';

import { useMyUrls } from '@/hooks/use-urls';
import { UrlCard, EmptyState, LoadingSkeleton, ErrorState, PageHeader } from '@/components/urls';

export default function UrlsPage() {
  const { data: urls = [], isLoading, error, refetch } = useMyUrls(true); // Enable refetch on window focus

  if (error) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-8">
      <PageHeader />
      
      {urls.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          {urls.map((url) => (
            <UrlCard key={url.id} url={url} />
          ))}
        </div>
      )}
    </div>
  );
}
