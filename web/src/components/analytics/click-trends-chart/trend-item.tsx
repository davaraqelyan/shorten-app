import { Clock } from 'lucide-react';
import { ClickTrend } from '@/types/analytics';

interface TrendItemProps {
  trend: ClickTrend;
  maxClicks: number;
}

export function TrendItem({ trend, maxClicks }: TrendItemProps) {
  const percentage = maxClicks > 0 ? (trend.clicks / maxClicks) * 100 : 0;
  
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
      <div className="flex items-center space-x-3">
        <Clock className="h-4 w-4 text-gray-500 flex-shrink-0" />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {new Date(trend.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </span>
          <div className="w-20 h-1 bg-gray-200 dark:bg-gray-600 rounded-full mt-1">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {trend.clicks}
        </span>
        <span className="text-xs text-gray-500">clicks</span>
      </div>
    </div>
  );
}