'use client'

import { HeroSection, FeaturesSection, CtaSection } from '@/components/landing'
import {
  HERO_CONTENT,
  HERO_FEATURES,
  FEATURES_SECTION,
  FEATURES_LIST,
  CTA_SECTION,
} from '@/constants/landing'

export default function LandingPage() {
  const handleFormSubmit = (_url: string) => {
    // URL submission handled by form component
  }

  const handleStartTrial = () => {
    // Start trial action
  }

  const handleViewFeatures = () => {
    // View features action
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <HeroSection
        badge={HERO_CONTENT.badge}
        title={HERO_CONTENT.title}
        description={HERO_CONTENT.description}
        form={HERO_CONTENT.form}
        features={HERO_FEATURES}
        onFormSubmit={handleFormSubmit}
      />

      <FeaturesSection
        title={FEATURES_SECTION.title}
        description={FEATURES_SECTION.description}
        features={FEATURES_LIST}
      />

      <CtaSection
        title={CTA_SECTION.title}
        description={CTA_SECTION.description}
        buttons={CTA_SECTION.buttons}
        disclaimer={CTA_SECTION.disclaimer}
        onPrimaryClick={handleStartTrial}
        onSecondaryClick={handleViewFeatures}
      />
    </div>
  )
}

