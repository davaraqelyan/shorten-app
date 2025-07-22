import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, Plus } from 'lucide-react';
import { getPageHeading } from '@/lib/utils/page-headings';

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  const pathname = usePathname();
  const pageHeading = getPageHeading(pathname);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 z-10">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {pageHeading}
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/urls">
            <Button 
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              New URL
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}