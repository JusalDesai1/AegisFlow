'use client';

import { colors, gradients, shadows, spacing, typography } from '@/styles/tactical-neomorphism';

export default function HeroSection() {
  return (
    <section
      style={{
        background: gradients.premiumDark,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(0deg, rgba(255, 107, 74, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 107, 74, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div
          style={{
            display: 'inline-block',
            background: colors.card,
            border: `1px solid ${colors.border}`,
            borderRadius: '20px',
            padding: `${spacing.sm} ${spacing.lg}`,
            marginBottom: spacing.lg,
            boxShadow: shadows.subtleDark,
          }}
        >
          <span style={{ color: colors.accent, fontSize: '0.875rem', fontWeight: '600' }}>
            🚨 AI-Powered Emergency Response
          </span>
        </div>

        {/* Main Heading */}
        <h1
          style={{
            ...typography.h1,
            color: colors.textPrimary,
            marginBottom: spacing.lg,
            fontSize: '4rem',
            background: gradients.buttonPrimary,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: '1.1',
          }}
        >
          Disaster Management at the Speed of Light
        </h1>

        {/* Subtitle */}
        <p
          style={{
            ...typography.bodyLg,
            color: colors.textSecondary,
            marginBottom: spacing.xl,
            maxWidth: '600px',
            margin: `0 auto ${spacing.xl}`,
            fontSize: '1.25rem',
          }}
        >
          Real-time disaster detection, resource coordination, and emergency response powered by advanced AI
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            style={{
              background: gradients.buttonPrimary,
              color: 'white',
              padding: `${spacing.md} ${spacing.xl}`,
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem',
              boxShadow: shadows.elevatedLight,
              transition: 'all 0.3s ease',
            }}
            className="hover:scale-105 hover:shadow-lg"
          >
            Launch Dashboard
          </button>
          <button
            style={{
              background: 'transparent',
              color: colors.accent,
              padding: `${spacing.md} ${spacing.xl}`,
              borderRadius: '8px',
              border: `2px solid ${colors.accent}`,
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
            }}
            className="hover:bg-opacity-10 hover:bg-orange-500"
          >
            Learn More
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-20 pt-20 border-t" style={{ borderColor: colors.border }}>
          <div>
            <div style={{ color: colors.accent, fontSize: '2rem', fontWeight: 'bold' }}>99.9%</div>
            <div style={{ color: colors.textTertiary, fontSize: '0.875rem', marginTop: spacing.sm }}>
              Uptime
            </div>
          </div>
          <div>
            <div style={{ color: colors.success, fontSize: '2rem', fontWeight: 'bold' }}>10k+</div>
            <div style={{ color: colors.textTertiary, fontSize: '0.875rem', marginTop: spacing.sm }}>
              Active Operators
            </div>
          </div>
          <div>
            <div style={{ color: colors.info, fontSize: '2rem', fontWeight: 'bold' }}&lt;2s</div>
            <div style={{ color: colors.textTertiary, fontSize: '0.875rem', marginTop: spacing.sm }}>
              Detection Time
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
