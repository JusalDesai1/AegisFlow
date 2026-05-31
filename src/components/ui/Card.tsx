import React from 'react';
import clsx from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'danger' | 'success';
  padding?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>((
  { className, variant = 'default', padding = 'md', interactive, children, ...props },
  ref
) => {
  const baseStyles = 'bg-aegis-card border border-aegis-border rounded-lg transition-all duration-200';

  const variants = {
    default: 'hover:border-aegis-accent/50',
    elevated: 'border-aegis-accent/30 shadow-glow-md',
    danger: 'border-aegis-critical/30 bg-aegis-critical/5',
    success: 'border-aegis-success/30 bg-aegis-success/5',
  };

  const paddings = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  return (
    <div
      ref={ref}
      className={clsx(
        baseStyles,
        variants[variant],
        paddings[padding],
        interactive && 'cursor-pointer hover:shadow-glow-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
