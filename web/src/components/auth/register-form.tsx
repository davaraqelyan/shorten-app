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
import { registerWithConfirmPasswordSchema, RegisterWithConfirmPasswordFormData } from '@/lib/validations/auth';

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterWithConfirmPasswordFormData>({
    resolver: zodResolver(registerWithConfirmPasswordSchema),
  });

  const onSubmit = async (data: RegisterWithConfirmPasswordFormData) => {
    setLoading(true);
    setError('');

    try {
      const { confirmPassword, ...userData } = data;
      await registerUser(userData);
      reset();
      onSuccess?.();
    } catch (err) {
      console.error('Registration error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'object' && err !== null && 'message' in err) {
        setError(String(err.message));
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-5 pt-2">
      {error && (
        <Alert variant="destructive" className="border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="font-medium">{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-3">
        <Label htmlFor="name" className="text-sm font-semibold">
          Full Name
        </Label>
        <Input
          id="name"
          type="text"
          {...register('name')}
          placeholder="Enter your full name"
          className="h-11 text-base border-2 focus:border-blue-500 transition-colors"
          aria-invalid={errors.name ? 'true' : 'false'}
        />
        {errors.name && (
          <p className="text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-3">
        <Label htmlFor="email" className="text-sm font-semibold">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="Enter your email address"
          className="h-11 text-base border-2 focus:border-blue-500 transition-colors"
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label htmlFor="password" className="text-sm font-semibold">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            {...register('password')}
            placeholder="Password"
            className="h-11 text-base border-2 focus:border-blue-500 transition-colors"
            aria-invalid={errors.password ? 'true' : 'false'}
          />
          {errors.password && (
            <p className="text-xs text-red-600">{errors.password.message}</p>
          )}
        </div>
        <div className="space-y-3">
          <Label htmlFor="confirmPassword" className="text-sm font-semibold">
            Confirm
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            placeholder="Confirm password"
            className="h-11 text-base border-2 focus:border-blue-500 transition-colors"
            aria-invalid={errors.confirmPassword ? 'true' : 'false'}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <Button 
          type="submit" 
          className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200" 
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              Creating Account...
            </div>
          ) : (
            'Create Account'
          )}
        </Button>
        
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
          >
            Sign in instead
          </button>
        </p>
      </div>
    </form>
  );
}