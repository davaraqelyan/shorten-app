import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { loginSchema, LoginFormData } from '@/lib/schemas';

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError('');

    try {
      await login(data);
      reset();
      onSuccess?.();
    } catch (err) {
      console.error('Login error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'object' && err !== null && 'message' in err) {
        setError(String(err.message));
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleSubmit(onSubmit)(e);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6 pt-2">
      {error && (
        <Alert variant="destructive" className="border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="font-medium">{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-3">
        <Label htmlFor="email" className="text-sm font-semibold">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="Enter your email address"
          className="h-12 text-base border-2 focus:border-blue-500 transition-colors"
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-3">
        <Label htmlFor="password" className="text-sm font-semibold">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          {...register('password')}
          placeholder="Enter your password"
          className="h-12 text-base border-2 focus:border-blue-500 transition-colors"
          aria-invalid={errors.password ? 'true' : 'false'}
        />
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <Button 
        type="submit" 
        className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200" 
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            Signing In...
          </div>
        ) : (
          'Sign In'
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
        >
          Sign up instead
        </button>
      </p>
    </form>
  );
}