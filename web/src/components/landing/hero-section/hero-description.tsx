import { motion } from 'framer-motion';
import { ANIMATION_DELAYS } from '@/constants/landing';

interface HeroDescriptionProps {
  text: string;
}

export function HeroDescription({ text }: HeroDescriptionProps) {
  return (
    <motion.p
      className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: ANIMATION_DELAYS.description }}
    >
      {text}
    </motion.p>
  );
}