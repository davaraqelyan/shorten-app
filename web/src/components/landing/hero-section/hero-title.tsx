import { motion } from 'framer-motion';
import { ANIMATION_DELAYS } from '@/constants/landing';

interface HeroTitleProps {
  gradientText: string;
  normalText: string;
}

export function HeroTitle({ gradientText, normalText }: HeroTitleProps) {
  return (
    <motion.h1
      className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: ANIMATION_DELAYS.title }}
    >
      <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
        {gradientText}
      </span>
      <br />
      <span className="text-foreground">{normalText}</span>
    </motion.h1>
  );
}