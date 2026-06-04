'use client';

import Link from 'next/link';
import { useState } from 'react';
import { colors, shadows, spacing } from '@/styles/tactical-neomorphism';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      style={{
        background: colors.dark,
        borderBottom: `1px solid ${colors.border}`,
        boxShadow: shadows.subtleDark,
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
      className="w-full"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <div
            style={{
              background: colors.accent,
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="font-bold text-white"
          >
            ⚡
          </div>
          <span style={{ color: colors.textPrimary }} className="text-xl font-bold">
            AegisFlow
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            style={{ color: colors.textSecondary }}
            className="hover:text-white transition"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            style={{ color: colors.textSecondary }}
            className="hover:text-white transition"
          >
            How It Works
          </Link>
          <Link
            href="#"
            style={{ color: colors.textSecondary }}
            className="hover:text-white transition"
          >
            Pricing
          </Link>
          <button
            style={{
              background: colors.accent,
              color: 'white',
              padding: `${spacing.sm} ${spacing.lg}`,
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              boxShadow: shadows.elevatedLight,
            }}
            className="hover:opacity-90 transition"
          >
            Launch App
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
          style={{ color: colors.accent }}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div style={{ background: colors.card, borderTop: `1px solid ${colors.border}` }} className="md:hidden p-6">
          <div className="flex flex-col gap-4">
            <Link href="#features" style={{ color: colors.textSecondary }}>
              Features
            </Link>
            <Link href="#how-it-works" style={{ color: colors.textSecondary }}>
              How It Works
            </Link>
            <button
              style={{
                background: colors.accent,
                color: 'white',
                padding: `${spacing.sm} ${spacing.lg}`,
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Launch App
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
