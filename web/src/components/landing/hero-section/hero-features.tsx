import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { ANIMATION_DELAYS } from '@/constants/landing';

interface HeroFeature {
  icon: LucideIcon;
  text: string;
  colorClass: string;
}

interface HeroFeaturesProps {
  features: HeroFeature[];
}

const getColorClasses = (colorClass: string) => {
  const colors = {
    green: {
      bg: 'bg-green-500/10',
      icon: 'text-green-600',
    },
    blue: {
      bg: 'bg-blue-500/10',
      icon: 'text-blue-600',
    },
    purple: {
      bg: 'bg-purple-500/10',
      icon: 'text-purple-600',
    },
  };
  return colors[colorClass as keyof typeof colors] || colors.blue;
};

export function HeroFeatures({ features }: HeroFeaturesProps) {
  return (
    <motion.div
      className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: ANIMATION_DELAYS.features }}
    >
      {features.map((feature) => {
        const colors = getColorClasses(feature.colorClass);
        return (
          <div key={feature.text} className="flex items-center gap-2 text-muted-foreground">
            <div className={`p-2 rounded-full ${colors.bg}`}>
              <feature.icon className={`h-4 w-4 ${colors.icon}`} />
            </div>
            <span>{feature.text}</span>
          </div>
        );
      })}
    </motion.div>
  );
}