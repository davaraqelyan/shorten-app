import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ANIMATION_DELAYS } from '@/constants/landing';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export function FeatureCard({ icon: Icon, title, description, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * ANIMATION_DELAYS.featureCard }}
      viewport={{ once: true }}
      className="group"
    >
      <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 group-hover:scale-105">
        <CardHeader className="pb-4">
          <CardTitle className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-colors">
              <Icon className="h-8 w-8 text-blue-600" />
            </div>
            <span className="text-xl font-semibold">{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-muted-foreground text-center leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}