import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Logo } from '@/components/ui/logo';
import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';

type AuthMode = 'login' | 'register';

interface AuthDialogProps {
  mode: AuthMode;
  trigger: React.ReactNode;
}

export function AuthDialog({ mode: initialMode, trigger }: AuthDialogProps) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>(initialMode);

  const handleSuccess = () => {
    setOpen(false);
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  const isLogin = mode === 'login';

  return (
    <Dialog open={open} onOpenChange={setOpen} key={initialMode}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg border-0 shadow-2xl bg-white/95 backdrop-blur-xl dark:bg-slate-900/95">
        <DialogHeader className="space-y-4 text-center pb-2">
          <div className="mx-auto mb-2">
            <Logo size="md" showTagline={false} />
          </div>
          <DialogTitle className="text-2xl font-bold">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            {isLogin 
              ? 'Sign in to your account to continue'
              : 'Join ShortLink to start creating and tracking your URLs'
            }
          </DialogDescription>
        </DialogHeader>
        
        {isLogin ? (
          <LoginForm onSuccess={handleSuccess} onSwitchToRegister={switchMode} />
        ) : (
          <RegisterForm onSuccess={handleSuccess} onSwitchToLogin={switchMode} />
        )}
      </DialogContent>
    </Dialog>
  );
}

export function LoginDialog() {
  return (
    <AuthDialog
      mode="login"
      trigger={
        <Button variant="outline" className="h-10 px-6 font-semibold border-2 hover:bg-muted/50 transition-colors">
          Sign In
        </Button>
      }
    />
  );
}

export function RegisterDialog() {
  return (
    <AuthDialog
      mode="register"
      trigger={
        <Button className="h-10 px-6 font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200">
          Sign Up
        </Button>
      }
    />
  );
}