'use client';

import React, { useRef, useEffect } from 'react';
import clsx from 'clsx';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>((
  { className, label, error, helperText, options, ...props },
  ref
) => {
  const id = props.id || `select-${Math.random().toString(36).substr(2, 9)}`;
  const descriptionId = error ? `${id}-error` : helperText ? `${id}-helper` : undefined;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium mb-2 text-aegis-text-primary">
          {label}
          {props.required && <span aria-label="required" className="text-aegis-critical ml-1">*</span>}
        </label>
      )}
      <select
        ref={ref}
        id={id}
        aria-describedby={descriptionId}
        aria-invalid={!!error}
        className={clsx(
          'w-full px-4 py-2 rounded-lg border transition-colors appearance-none cursor-pointer',
          'bg-aegis-card text-aegis-text-primary',
          'border-aegis-border',
          'focus:outline-none focus:border-aegis-accent focus:ring-2 focus:ring-aegis-accent/20',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'bg-[url(\"data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\" viewBox=\"0 0 12 12\"%3E%3Cpath fill=\"%23a0aec0\" d=\"M6 9L1 4h10z\"/%3E%3C/svg%3E\")] bg-no-repeat bg-right-4 bg-center pr-10',
          error && 'border-aegis-critical focus:border-aegis-critical focus:ring-aegis-critical/20',
          className
        )}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={descriptionId} className="text-sm text-aegis-critical mt-1.5">
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

Select.displayName = 'Select';

export default Select;
