import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

export function UserProfileSection() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  if (!user) return null;

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
          <span className="text-white font-medium text-sm">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLogout}
        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Sign Out
      </Button>
    </div>
  );
}