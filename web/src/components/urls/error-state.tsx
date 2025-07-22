import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  onRetry: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <p className="text-muted-foreground mb-4">Failed to load URLs</p>
        <Button onClick={onRetry}>Try Again</Button>
      </div>
    </div>
  );
}