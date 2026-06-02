'use client';

import { colors, shadows, spacing, typography } from '@/styles/tactical-neomorphism';
import FeatureCard from './FeatureCard';

const features = [
  {
    icon: '🛰️',
    title: 'Real-time Detection',
    description: 'AI-powered satellite and sensor data analysis for instant disaster detection and mapping.',
  },
  {
    icon: '📍',
    title: 'Resource Coordination',
    description: 'Intelligent allocation and routing of emergency resources to affected areas.',
  },
  {
    icon: '🤖',
    title: 'AI Predictions',
    description: 'Machine learning models predict disaster progression and optimal response strategies.',
  },
  {
    icon: '📊',
    title: 'Live Dashboard',
    description: 'Comprehensive visualization of all incidents, resources, and operational metrics.',
  },
  {
    icon: '🔔',
    title: 'Alert System',
    description: 'Multi-channel notifications with prioritized routing to relevant personnel.',
  },
  {
    icon: '🌐',
    title: 'Cross-Agency Integration',
    description: 'Seamless communication between NDMA, SDMA, and district authorities.',
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      style={{
        background: colors.darker,
        padding: `${spacing.xl} ${spacing.lg}`,
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span
            style={{
              color: colors.accent,
              fontSize: '0.875rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Powerful Features
          </span>
          <h2
            style={{
              ...typography.h2,
              color: colors.textPrimary,
              marginTop: spacing.md,
            }}
          >
            Everything You Need for Effective Disaster Management
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
