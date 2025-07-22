import { Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeVariants = {
  sm: {
    container: 'w-8 h-8',
    icon: 'h-4 w-4',
    title: 'text-lg',
    tagline: 'text-xs',
  },
  md: {
    container: 'w-10 h-10',
    icon: 'h-6 w-6',
    title: 'text-xl',
    tagline: 'text-xs',
  },
  lg: {
    container: 'w-12 h-12',
    icon: 'h-8 w-8',
    title: 'text-2xl',
    tagline: 'text-sm',
  },
};

export function Logo({ showTagline = true, size = 'md', className }: LogoProps) {
  const variant = sizeVariants[size];

  return (
    <div className={cn('flex items-center space-x-3', className)}>
      <div className={cn(
        'flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600',
        variant.container
      )}>
        <LinkIcon className={cn('text-white', variant.icon)} />
      </div>
      <div className="flex flex-col">
        <span className={cn('font-bold tracking-tight', variant.title)}>
          ShortLink
        </span>
        {showTagline && (
          <span className={cn('text-muted-foreground hidden sm:block', variant.tagline)}>
            URL Shortener
          </span>
        )}
      </div>
    </div>
  );
}