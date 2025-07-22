import { Link, Eye } from 'lucide-react';
import { RecentUrl } from '@/types/analytics';

interface UrlItemProps {
  url: RecentUrl;
}

export function UrlItem({ url }: UrlItemProps) {
  return (
    <div className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
      <Link className="h-4 w-4 text-gray-500 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
          {url.originalUrl}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {url.shortUrl}
        </p>
      </div>
      <div className="flex items-center space-x-2 flex-shrink-0">
        <Eye className="h-3 w-3 text-gray-400" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {url.clicks}
        </span>
      </div>
    </div>
  );
}