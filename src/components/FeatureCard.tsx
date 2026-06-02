'use client';

import { colors, shadows, spacing, typography } from '@/styles/tactical-neomorphism';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div
      style={{
        background: colors.card,
        border: `1px solid ${colors.border}`,
        borderRadius: '12px',
        padding: spacing.lg,
        boxShadow: shadows.subtleDark,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      className="hover:shadow-2xl hover:scale-105 hover:border-orange-500"
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.boxShadow = shadows.elevatedDark;
        el.style.borderColor = colors.accent;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.boxShadow = shadows.subtleDark;
        el.style.borderColor = colors.border;
      }}
    >
      <div style={{ fontSize: '3rem', marginBottom: spacing.md }}>{icon}</div>
      <h3 style={{ ...typography.h4, color: colors.textPrimary, marginBottom: spacing.sm }}>
        {title}
      </h3>
      <p style={{ ...typography.bodySm, color: colors.textSecondary }}>{description}</p>
    </div>
  );
}
