import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { FeatureCard } from '../feature-card';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  title: string;
  description: string;
  features: Feature[];
}

export function FeaturesSection({ title, description, features }: FeaturesSectionProps) {
  return (
    <section className="container mx-auto px-4 py-24 max-w-7xl">
      <motion.div
        className="space-y-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">{title}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}