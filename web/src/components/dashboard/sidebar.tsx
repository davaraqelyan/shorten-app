import { Logo } from '@/components/ui/logo';
import { SidebarNavigation } from './sidebar-navigation';
import { UserProfileSection } from './user-profile-section';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out",
      isOpen ? "translate-x-0" : "-translate-x-full",
      "lg:translate-x-0 lg:static lg:inset-0"
    )}>
      <div className="flex flex-col h-full">
        <div className="flex items-center h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <Logo size="sm" />
        </div>
        <SidebarNavigation />
        <UserProfileSection />
      </div>
    </div>
  );
}