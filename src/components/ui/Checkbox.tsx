'use client';

import React from 'react';
import clsx from 'clsx';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>((
  { className, label, helperText, error, ...props },
  ref
) => {
  const id = props.id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  const descriptionId = error ? `${id}-error` : helperText ? `${id}-helper` : undefined;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          aria-describedby={descriptionId}
          aria-invalid={!!error}
          className={clsx(
            'w-5 h-5 rounded border-2 border-aegis-border cursor-pointer',
            'bg-aegis-card text-aegis-accent',
            'focus:outline-none focus:ring-2 focus:ring-aegis-accent focus:ring-offset-2 focus:ring-offset-aegis-darker',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-colors',
            className
          )}
          {...props}
        />
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-aegis-text-primary cursor-pointer">
            {label}
          </label>
        )}
      </div>
      {error && (
        <p id={descriptionId} className="text-sm text-aegis-critical">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={descriptionId} className="text-sm text-aegis-text-tertiary">
          {helperText}
        </p>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
