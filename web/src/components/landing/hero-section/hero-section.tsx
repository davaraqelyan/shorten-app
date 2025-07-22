import { motion } from 'framer-motion';
import { HeroBadge } from './hero-badge';
import { HeroTitle } from './hero-title';
import { HeroDescription } from './hero-description';
import { HeroFeatures } from './hero-features';
import { UrlShortenerForm } from '../url-shortener-form';

interface HeroSectionProps {
  badge: { text: string };
  title: { gradient: string; normal: string };
  description: string;
  form: {
    placeholder: string;
    buttonText: string;
    disclaimer: string;
  };
  features: Array<{
    icon: any;
    text: string;
    colorClass: string;
  }>;
  onFormSubmit?: (url: string) => void;
}

export function HeroSection({ 
  badge, 
  title, 
  description, 
  form, 
  features, 
  onFormSubmit 
}: HeroSectionProps) {
  return (
    <section className="container mx-auto px-4 py-24 lg:py-32 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-12"
      >
        <div className="space-y-6">
          <HeroBadge text={badge.text} />
          <HeroTitle gradientText={title.gradient} normalText={title.normal} />
          <HeroDescription text={description} />
        </div>

        <UrlShortenerForm
          placeholder={form.placeholder}
          buttonText={form.buttonText}
          disclaimer={form.disclaimer}
          onSubmit={onFormSubmit}
        />

        <HeroFeatures features={features} />
      </motion.div>
    </section>
  );
}