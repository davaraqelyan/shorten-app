import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils/clipboard';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
  text: string;
  successMessage?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  showText?: boolean;
}

export function CopyButton({ 
  text, 
  successMessage, 
  variant = 'ghost', 
  size = 'sm',
  className,
  showText = false
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(text, successMessage);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleCopy}
      className={cn(
        'transition-all duration-200',
        size === 'icon' && 'h-6 w-6 p-0',
        className
      )}
    >
      {copied ? (
        <Check className={cn('h-3 w-3', showText && 'mr-2')} />
      ) : (
        <Copy className={cn('h-3 w-3', showText && 'mr-2')} />
      )}
      {showText && (copied ? 'Copied!' : 'Copy')}
    </Button>
  );
}