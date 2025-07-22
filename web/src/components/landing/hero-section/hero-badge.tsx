import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { ANIMATION_DELAYS } from '@/constants/landing';

interface HeroBadgeProps {
  text: string;
}

export function HeroBadge({ text }: HeroBadgeProps) {
  return (
    <motion.div
      className="inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium bg-background/50 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: ANIMATION_DELAYS.badge }}
    >
      <Zap className="mr-2 h-4 w-4 text-blue-600" />
      {text}
    </motion.div>
  );
}