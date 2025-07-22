import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { getVariantStyles } from './metric-card.styles';

interface MetricCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: LucideIcon;
  variant?: 'blue' | 'green' | 'purple' | 'orange';
  className?: string;
}

export function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  variant = 'blue',
  className,
}: MetricCardProps) {
  const styles = getVariantStyles(variant);

  return (
    <Card
      className={cn(
        'border-0 shadow-lg hover:shadow-xl transition-shadow duration-200',
        styles.cardBg,
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={cn('text-sm font-medium', styles.titleColor)}>
          {title}
        </CardTitle>
        <Icon className={cn('h-4 w-4', styles.iconColor)} />
      </CardHeader>
      <CardContent>
        <div className={cn('text-2xl font-bold', styles.valueColor)}>
          {value}
        </div>
        <p className={cn('text-xs', styles.descriptionColor)}>
          {description}
        </p>
      </CardContent>
    </Card>
  );
}