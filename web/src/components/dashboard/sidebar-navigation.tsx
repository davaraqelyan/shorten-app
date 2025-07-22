import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3,
  Link as LinkIcon,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'URLs', href: '/dashboard/urls', icon: LinkIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function SidebarNavigation() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 px-6 py-6 space-y-1">
      {navigation.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
              isActive
                ? "bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200"
                : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
            )}
          >
            <Icon className="mr-3 h-5 w-5" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}