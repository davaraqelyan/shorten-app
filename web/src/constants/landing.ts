import { Link, BarChart3, Shield } from 'lucide-react';

export const HERO_CONTENT = {
  badge: {
    text: 'Fast, Secure, and Reliable',
  },
  title: {
    gradient: 'Shorten URLs',
    normal: 'Like a Pro',
  },
  description: 'Transform your long URLs into powerful, trackable short links. Get detailed analytics, custom domains, and enterprise-grade security. Perfect for marketing campaigns, social media, and more.',
  form: {
    placeholder: 'Enter your long URL here... (e.g., https://example.com/very-long-url)',
    buttonText: 'Shorten URL',
    disclaimer: 'No registration required for basic use • Free forever',
  },
};

export const HERO_FEATURES = [
  {
    icon: Shield,
    text: 'Enterprise Security',
    colorClass: 'green',
  },
  {
    icon: Link,
    text: 'Lightning Fast',
    colorClass: 'blue',
  },
  {
    icon: BarChart3,
    text: 'Advanced Analytics',
    colorClass: 'purple',
  },
];

export const FEATURES_SECTION = {
  title: 'Why Choose ShortLink?',
  description: 'Everything you need to create, manage, and track your shortened URLs with professional-grade tools',
};

export const FEATURES_LIST = [
  {
    icon: Link,
    title: 'Custom Short URLs',
    description: 'Create branded short links with your own custom domain and memorable aliases.',
  },
  {
    icon: BarChart3,
    title: 'Detailed Analytics',
    description: 'Track clicks, geographic data, referral sources, and user engagement in real-time.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Advanced security features including password protection, expiration dates, and GDPR compliance.',
  },
];

export const CTA_SECTION = {
  title: 'Ready to Get Started?',
  description: 'Join thousands of users who trust ShortLink for their URL shortening needs. Start creating powerful short links today.',
  buttons: {
    primary: 'Start Free Trial',
    secondary: 'View Features',
  },
  disclaimer: 'No credit card required • Cancel anytime • 30-day money-back guarantee',
};

export const ANIMATION_DELAYS = {
  badge: 0.1,
  title: 0.2,
  description: 0.4,
  form: 0.6,
  features: 0.8,
  featureCard: 0.2,
};