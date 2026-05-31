import React from 'react';
import clsx from 'clsx';

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label';
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body-lg' | 'body' | 'body-sm' | 'caption';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'critical' | 'success';
  truncate?: boolean;
  monospace?: boolean;
}

const variantMap = {
  h1: 'text-3xl',
  h2: 'text-2xl',
  h3: 'text-xl',
  h4: 'text-lg',
  h5: 'text-base',
  h6: 'text-sm',
  'body-lg': 'text-lg',
  body: 'text-base',
  'body-sm': 'text-sm',
  caption: 'text-xs',
};

const weightMap = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const colorMap = {
  primary: 'text-aegis-text-primary',
  secondary: 'text-aegis-text-secondary',
  tertiary: 'text-aegis-text-tertiary',
  accent: 'text-aegis-accent',
  critical: 'text-aegis-critical',
  success: 'text-aegis-success',
};

const Text = React.forwardRef<HTMLElement, TextProps>((
  {
    as = 'p',
    variant = 'body',
    weight = 'normal',
    color = 'primary',
    truncate,
    monospace,
    className,
    children,
    ...props
  },
  ref
) => {
  const Component = as;

  return (
    <Component
      ref={ref as any}
      className={clsx(
        variantMap[variant],
        weightMap[weight],
        colorMap[color],
        truncate && 'truncate',
        monospace && 'font-mono',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});

Text.displayName = 'Text';

export default Text;
