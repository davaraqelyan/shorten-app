import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'lucide-react';

interface CtaSectionProps {
  title: string;
  description: string;
  buttons: {
    primary: string;
    secondary: string;
  };
  disclaimer: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export function CtaSection({ 
  title, 
  description, 
  buttons, 
  disclaimer, 
  onPrimaryClick, 
  onSecondaryClick 
}: CtaSectionProps) {
  return (
    <section className="container mx-auto px-4 py-24 max-w-7xl">
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 p-12 lg:p-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]"></div>
        
        <div className="relative text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            {title}
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              onClick={onPrimaryClick}
              className="px-8 py-4 text-lg font-semibold bg-white text-blue-600 hover:bg-blue-50 shadow-xl"
            >
              <Link className="mr-2 h-5 w-5" />
              {buttons.primary}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={onSecondaryClick}
              className="px-8 py-4 text-lg font-semibold border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              {buttons.secondary}
            </Button>
          </div>
          <p className="text-sm text-blue-200">
            {disclaimer}
          </p>
        </div>
      </motion.div>
    </section>
  );
}