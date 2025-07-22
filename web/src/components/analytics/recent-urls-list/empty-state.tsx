import { Link, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onCreateUrl?: () => void;
}

export function EmptyState({ onCreateUrl }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Link className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
      <p className="text-gray-500 dark:text-gray-400 text-center mb-4">
        No URLs created yet
      </p>
      {onCreateUrl && (
        <Button onClick={onCreateUrl} variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Create Your First URL
        </Button>
      )}
    </div>
  );
}