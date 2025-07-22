import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnalyticsHeaderProps {
  onCreateUrl: () => void;
}

export function AnalyticsHeader({ onCreateUrl }: AnalyticsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your URL performance and engagement metrics
        </p>
      </div>
      <Button
        onClick={onCreateUrl}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <Plus className="mr-2 h-4 w-4" />
        Shorten URL
      </Button>
    </div>
  );
}