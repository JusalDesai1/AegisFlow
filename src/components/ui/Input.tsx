'use client';

import React, { useRef, useEffect } from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((
  { className, label, error, helperText, icon, type = 'text', ...props },
  ref
) => {
  const id = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const descriptionId = error ? `${id}-error` : helperText ? `${id}-helper` : undefined;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium mb-2 text-aegis-text-primary">
          {label}
          {props.required && <span aria-label="required" className="text-aegis-critical ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-aegis-text-secondary">{icon}</div>}
        <input
          ref={ref}
          id={id}
          type={type}
          aria-describedby={descriptionId}
          aria-invalid={!!error}
          className={clsx(
            'w-full px-4 py-2 rounded-lg border transition-colors',
            'bg-aegis-card text-aegis-text-primary',
            'border-aegis-border',
            'focus:outline-none focus:border-aegis-accent focus:ring-2 focus:ring-aegis-accent/20',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'placeholder:text-aegis-text-tertiary',
            icon && 'pl-10',
            error && 'border-aegis-critical focus:border-aegis-critical focus:ring-aegis-critical/20',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p id={descriptionId} className="text-sm text-aegis-critical mt-1.5 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={descriptionId} className="text-sm text-aegis-text-tertiary mt-1.5">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
