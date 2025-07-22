import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <Card className={cn('border-0 shadow-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm', className)}>
      <CardHeader>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse flex items-center space-x-4 p-3">
              <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
              </div>
              <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}