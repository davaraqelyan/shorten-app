import { TrendingUp } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <TrendingUp className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
      <p className="text-gray-500 dark:text-gray-400 text-center">
        No click data available yet
      </p>
      <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-1">
        Data will appear as your URLs get clicked
      </p>
    </div>
  );
}