'use client';

import React from 'react';
import clsx from 'clsx';

interface RadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface RadioGroupContextType {
  value?: string;
  onValueChange?: (value: string) => void;
}

const RadioGroupContext = React.createContext<RadioGroupContextType | undefined>(undefined);

const RadioGroup = ({
  value,
  onValueChange,
  children,
  className,
}: RadioGroupProps) => {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div role="radiogroup" className={className}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
};

interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value: string;
  helperText?: string;
}

const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>((
  { className, label, value, helperText, ...props },
  ref
) => {
  const context = React.useContext(RadioGroupContext);
  const id = props.id || `radio-${value}`;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          id={id}
          type="radio"
          value={value}
          checked={context?.value === value}
          onChange={(e) => context?.onValueChange?.(e.target.value)}
          className={clsx(
            'w-5 h-5 rounded-full border-2 border-aegis-border cursor-pointer',
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
      {helperText && (
        <p className="text-xs text-aegis-text-tertiary ml-7">
          {helperText}
        </p>
      )}
    </div>
  );
});

RadioButton.displayName = 'RadioButton';

export { RadioGroup, RadioButton };
