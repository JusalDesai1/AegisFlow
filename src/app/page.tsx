'use client';

import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import { colors } from '@/styles/tactical-neomorphism';

export default function Home() {
  return (
    <main style={{ background: colors.darker }}>
      <Navigation />
      <HeroSection />
      <FeaturesSection />
    </main>
  );
}
