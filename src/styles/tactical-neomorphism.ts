/**
 * AEGISFLOW TACTICAL NEOMORPHISM DESIGN SYSTEM
 * 
 * Premium emergency response interface design language
 * Inspired by military command centers, aviation cockpits
 * 
 * Core Principles:
 * 1. Depth through sophisticated shadow layering
 * 2. Haptic feedback in motion and visual
 * 3. Micro-interactions that communicate state
 * 4. Luxury materials aesthetic (brushed metal, carbon fiber)
 * 5. Professional military/aviation inspiration (not gaming)
 */

// ============================================================================
// COLOR PALETTE
// ============================================================================

export const colors = {
  // Base colors
  darker: '#050a15',      // Almost black, very dark blue
  dark: '#0f1419',        // Dark background
  card: '#1a2332',        // Card background
  surface: '#2d3d4f',     // Surface hover
  border: 'rgba(255, 255, 255, 0.12)',
  
  // Brand accent
  accent: '#ff6b4a',      // Tactical orange
  accentLight: '#ffaa99', // Light tactical orange
  accentDark: '#e85a39',  // Dark tactical orange
  
  // Status colors
  success: '#00d084',     // Emergency green
  warning: '#ffa500',     // Caution orange
  critical: '#ff3333',    // Emergency red
  info: '#00b8e6',        // Tactical blue
  
  // Text colors
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textTertiary: 'rgba(255, 255, 255, 0.5)',
  textDisabled: 'rgba(255, 255, 255, 0.3)',
};

// ============================================================================
// SHADOW SYSTEM (DEPTH LAYERS)
// ============================================================================

export const shadows = {
  // Subtle: Inactive elements
  subtleLight: '0 2px 4px rgba(255, 107, 74, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
  subtleDark: '0 -2px 4px rgba(0, 0, 0, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.05)',
  
  // Elevated: Interactive elements
  elevatedLight: '0 8px 16px rgba(255, 107, 74, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)',
  elevatedDark: '0 -8px 16px rgba(0, 0, 0, 0.16), inset 0 1px 3px rgba(255, 255, 255, 0.08)',
  
  // Pressed: Active/pressed state
  pressedLight: 'inset 0 4px 8px rgba(0, 0, 0, 0.12), inset 0 -2px 4px rgba(255, 255, 255, 0.08)',
  pressedDark: 'inset 0 -4px 8px rgba(255, 107, 74, 0.08), inset 0 2px 4px rgba(255, 255, 255, 0.04)',
  
  // Floating: Modals, floating panels
  floatingLight: '0 20px 40px rgba(0, 0, 0, 0.16), 0 8px 16px rgba(0, 0, 0, 0.12)',
  floatingDark: '0 20px 40px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(255, 107, 74, 0.08)',
  
  // Glow: Critical alerts
  glowCritical: '0 0 20px rgba(255, 51, 51, 0.4), inset 0 0 20px rgba(255, 51, 51, 0.1)',
  glowWarning: '0 0 20px rgba(255, 165, 0, 0.3), inset 0 0 20px rgba(255, 165, 0, 0.08)',
  glowSuccess: '0 0 20px rgba(0, 208, 132, 0.3), inset 0 0 20px rgba(0, 208, 132, 0.08)',
  
  // Premium: Ultra depth
  premiumLight: '0 40px 80px rgba(255, 107, 74, 0.2), 0 20px 40px rgba(0, 0, 0, 0.16)',
  premiumDark: '0 40px 80px rgba(0, 0, 0, 0.5), 0 20px 40px rgba(255, 107, 74, 0.12)',
};

// ============================================================================
// SURFACE TEXTURES
// ============================================================================

export const textures = {
  // Carbon fiber pattern (dark backgrounds)
  carbonFiber: {
    backgroundImage: `
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 2px,
        rgba(255, 255, 255, 0.03) 2px,
        rgba(255, 255, 255, 0.03) 4px
      ),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(255, 255, 255, 0.02) 2px,
        rgba(255, 255, 255, 0.02) 4px
      )
    `,
    backgroundSize: '4px 4px',
  },
  
  // Brushed metal pattern (panels)
  brushedMetal: {
    backgroundImage: `
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 1px,
        rgba(255, 255, 255, 0.05) 1px,
        rgba(255, 255, 255, 0.05) 2px
      )
    `,
    backgroundSize: '2px 100%',
  },
  
  // Tactical grid (maps/data areas)
  tacticalGrid: {
    backgroundImage: `
      linear-gradient(0deg, rgba(255, 107, 74, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 107, 74, 0.03) 1px, transparent 1px)
    `,
    backgroundSize: '50px 50px',
  },
  
  // Noise (subtle grain)
  grain: {
    backgroundImage: `
      url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /></filter><rect width="100" height="100" fill="rgba(255,255,255,0.02)" filter="url(%23n)" /></svg>')
    `,
    backgroundSize: '100px 100px',
  },
};

// ============================================================================
// GRADIENTS
// ============================================================================

export const gradients = {
  // Threat level visualization
  threatGreen: 'linear-gradient(135deg, #1a4d2e 0%, #2d5a3d 100%)',
  threatYellow: 'linear-gradient(135deg, #8b6914 0%, #b8860b 100%)',
  threatOrange: 'linear-gradient(135deg, #cc5500 0%, #ff6b4a 100%)',
  threatRed: 'linear-gradient(135deg, #7a0a0a 0%, #cc0000 100%)',
  
  // Data visualization heatmaps
  heatmapCold: 'linear-gradient(90deg, #0066cc 0%, #00b8e6 50%, #00ffff 100%)',
  heatmapWarm: 'linear-gradient(90deg, #ffff00 0%, #ff9900 50%, #ff3333 100%)',
  
  // Premium accents
  premiumAccent: 'linear-gradient(135deg, #ff6b4a 0%, #ff8c73 50%, #ffaa99 100%)',
  premiumDark: 'linear-gradient(135deg, #1a2332 0%, #0f1419 100%)',
  
  // Button states
  buttonPrimary: 'linear-gradient(135deg, #ff6b4a 0%, #ff8c73 100%)',
  buttonPrimaryHover: 'linear-gradient(135deg, #ff8c73 0%, #ffaa99 100%)',
  buttonDanger: 'linear-gradient(135deg, #ff3333 0%, #ff6666 100%)',
  buttonSuccess: 'linear-gradient(135deg, #00d084 0%, #33e6a6 100%)',
};

// ============================================================================
// TYPOGRAPHY SCALE
// ============================================================================

export const typography = {
  // Heading scales
  h1: {
    fontSize: '2.5rem',     // 40px
    fontWeight: 'bold',
    lineHeight: '1.2',
    letterSpacing: '-0.5px',
  },
  h2: {
    fontSize: '2rem',       // 32px
    fontWeight: 'bold',
    lineHeight: '1.3',
    letterSpacing: '-0.3px',
  },
  h3: {
    fontSize: '1.5rem',     // 24px
    fontWeight: 'semibold',
    lineHeight: '1.4',
  },
  h4: {
    fontSize: '1.25rem',    // 20px
    fontWeight: 'semibold',
    lineHeight: '1.4',
  },
  
  // Body text
  bodyLg: {
    fontSize: '1rem',       // 16px
    fontWeight: '400',
    lineHeight: '1.6',
  },
  body: {
    fontSize: '0.9375rem', // 15px
    fontWeight: '400',
    lineHeight: '1.6',
  },
  bodySm: {
    fontSize: '0.875rem',   // 14px
    fontWeight: '400',
    lineHeight: '1.5',
  },
  
  // UI labels
  label: {
    fontSize: '0.8125rem',  // 13px
    fontWeight: '600',
    lineHeight: '1.4',
  },
  caption: {
    fontSize: '0.75rem',    // 12px
    fontWeight: '500',
    lineHeight: '1.4',
  },
  captionSm: {
    fontSize: '0.6875rem',  // 11px
    fontWeight: '500',
    lineHeight: '1.4',
  },
  
  // Monospace
  mono: {
    fontSize: '0.875rem',
    fontFamily: 'Monaco, "Courier New", monospace',
    fontWeight: '500',
    lineHeight: '1.5',
  },
};

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const borderRadius = {
  none: '0',
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  full: '9999px',
};

// ============================================================================
// SPACING SCALE
// ============================================================================

export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '2.5rem', // 40px
  '3xl': '3rem',   // 48px
  '4xl': '4rem',   // 64px
};

// ============================================================================
// ANIMATION/TRANSITION EASING
// ============================================================================

export const easing = {
  // Standard easing curves
  linear: 'cubic-bezier(0, 0, 1, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  
  // Spring-like easing
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  
  // Custom for premium feel
  premium: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  haptic: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
};

// ============================================================================
// ANIMATION DEFINITIONS
// ============================================================================

export const animations = {
  // Button press (haptic-like feedback)
  buttonPress: {
    duration: '120ms',
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    keyframes: {
      '0%': { transform: 'scale(1)', boxShadow: shadows.elevatedLight },
      '50%': { transform: 'scale(0.97)' },
      '100%': { transform: 'scale(1)', boxShadow: shadows.pressedLight },
    },
  },
  
  // Alert pulse (urgent state)
  urgentPulse: {
    duration: '2s',
    easing: 'cubic-bezier(0.4, 0, 0.6, 1)',
    keyframes: {
      '0%': { opacity: '1', boxShadow: shadows.glowCritical },
      '50%': { opacity: '0.8', boxShadow: '0 0 30px rgba(255, 51, 51, 0.2)' },
      '100%': { opacity: '1', boxShadow: shadows.glowCritical },
    },
  },
  
  // Data update (smooth refresh)
  dataRefresh: {
    duration: '600ms',
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    keyframes: {
      '0%': { opacity: '0.6', transform: 'scale(0.95)' },
      '50%': { opacity: '1' },
      '100%': { opacity: '1', transform: 'scale(1)' },
    },
  },
  
  // Smooth state transition
  stateTransition: {
    duration: '400ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Fade in
  fadeIn: {
    duration: '300ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Slide up
  slideUp: {
    duration: '400ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Shake (error)
  shake: {
    duration: '400ms',
    easing: 'cubic-bezier(0.36, 0, 0.66, -0.56)',
  },
  
  // Bounce (success)
  bounce: {
    duration: '600ms',
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
};

// ============================================================================
// Z-INDEX SCALE
// ============================================================================

export const zIndex = {
  hide: '-1',
  base: '0',
  dropdown: '100',
  sticky: '200',
  fixed: '300',
  modal: '400',
  popover: '500',
  tooltip: '600',
  notification: '700',
  overlay: '800',
};

// ============================================================================
// BREAKPOINTS (Responsive Design)
// ============================================================================

export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// ============================================================================
// COMPLETE DESIGN TOKEN EXPORT
// ============================================================================

export const designTokens = {
  colors,
  shadows,
  textures,
  gradients,
  typography,
  borderRadius,
  spacing,
  easing,
  animations,
  zIndex,
  breakpoints,
};

export default designTokens;
