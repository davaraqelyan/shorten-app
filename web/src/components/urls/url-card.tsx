import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/ui/copy-button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Link,
  Copy,
  ExternalLink,
  MoreVertical,
  Trash2,
  Calendar,
  TrendingUp,
  Eye,
} from 'lucide-react';
import { UrlDetails } from '@/types/url';
import { formatDate } from '@/lib/utils/date';
import { useUrlActions } from '@/hooks/use-url-actions';

interface UrlCardProps {
  url: UrlDetails;
}

export function UrlCard({ url }: UrlCardProps) {
  const { deleteUrl, copyUrl, openOriginalUrl } = useUrlActions();

  return (
    <Card className="border-0 shadow-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm hover:shadow-xl transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0 mr-4">
            <div className="flex items-center space-x-3 mb-2">
              <Link className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {url.originalUrl}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    {url.shortUrl}
                  </span>
                  <CopyButton
                    text={url.shortUrl}
                    successMessage="URL copied to clipboard!"
                    size="icon"
                    className="hover:bg-blue-100 dark:hover:bg-blue-900"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span className="font-medium">
                  {url.visitCount} clicks
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {formatDate(url.createdAt)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              {url.visitCount}
            </Badge>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => copyUrl(url.shortUrl)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => openOriginalUrl(url.originalUrl)}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Original
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => deleteUrl(url.id)}
                  className="text-red-600 dark:text-red-400"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}