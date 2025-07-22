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
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-pulse flex items-center justify-between p-3">
              <div className="flex items-center space-x-3">
                <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div>
                  <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                  <div className="h-1 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
              <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}