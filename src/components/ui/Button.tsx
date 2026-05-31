import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((
  {
    className,
    variant = 'primary',
    size = 'md',
    icon,
    loading,
    fullWidth,
    children,
    disabled,
    ...props
  },
  ref
) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-aegis-accent hover:bg-aegis-accent-light text-aegis-darker shadow-glow-md hover:shadow-glow-lg',
    secondary: 'bg-aegis-card border border-aegis-border hover:border-aegis-accent text-aegis-text-primary',
    danger: 'bg-aegis-critical/10 border border-aegis-critical hover:bg-aegis-critical/20 text-aegis-critical',
    success: 'bg-aegis-success/10 border border-aegis-success hover:bg-aegis-success/20 text-aegis-success',
    ghost: 'text-aegis-text-primary hover:bg-white/5',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-2',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-3',
  };

  return (
    <button
      ref={ref}
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        icon
      )}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
