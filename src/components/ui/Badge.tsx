import React from 'react';
import clsx from 'clsx';
import { SeverityLevel } from '@/types';
import { getSeverityColor, getSeverityLabel } from '@/utils/formatters';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'severity' | 'status' | 'info';
  severity?: SeverityLevel;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>((
  { className, variant = 'default', severity, size = 'md', icon, children, ...props },
  ref
) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full gap-1.5';

  const sizes = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const variants = {
    default: 'bg-aegis-card border border-aegis-border text-aegis-text-secondary',
    severity:
      severity === 'CRITICAL'
        ? 'bg-aegis-critical/20 border border-aegis-critical text-aegis-critical'
        : severity === 'HIGH'
          ? 'bg-aegis-accent/20 border border-aegis-accent text-aegis-accent'
          : severity === 'MODERATE'
            ? 'bg-aegis-warning/20 border border-aegis-warning text-aegis-warning'
            : severity === 'LOW'
              ? 'bg-aegis-info/20 border border-aegis-info text-aegis-info'
              : 'bg-aegis-text-tertiary/10 text-aegis-text-tertiary',
    status: 'bg-aegis-success/20 border border-aegis-success text-aegis-success',
    info: 'bg-aegis-info/20 border border-aegis-info text-aegis-info',
  };

  return (
    <span
      ref={ref}
      className={clsx(
        baseStyles,
        sizes[size],
        variants[variant],
        className
      )}
      {...props}
    >
      {icon}
      {variant === 'severity' && severity ? getSeverityLabel(severity) : children}
    </span>
  );
});

Badge.displayName = 'Badge';

export default Badge;
