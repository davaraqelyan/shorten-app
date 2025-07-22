'use client';

import { useState, useEffect } from 'react';
import { LoginDialog, RegisterDialog } from '@/components/auth/auth-dialog';
import { useAuth } from '@/contexts/auth-context';
import { LogOut, Moon, Sun, User } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Logo } from './ui/logo';

export function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-6 py-4">
        <Logo />

        <nav className="flex items-center space-x-2">
          {mounted ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="h-10 w-10 rounded-full hover:bg-muted/50 transition-colors"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 transition-transform" />
              ) : (
                <Sun className="h-5 w-5 transition-transform" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          ) : (
            <div className="h-10 w-10" />
          )}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-10 px-4 rounded-full hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium hidden sm:block">
                      {user.name}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2">
                <div className="flex items-center space-x-2 p-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="h-px bg-border my-1" />
                <DropdownMenuItem
                  onClick={() => (window.location.href = '/dashboard')}
                  className="cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-3">
              <LoginDialog />
              <RegisterDialog />
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
