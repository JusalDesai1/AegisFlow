import React from 'react';
import clsx from 'clsx';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'success' | 'warning';
  title?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((
  { className, variant = 'default', title, icon, onClose, children, ...props },
  ref
) => {
  const variants = {
    default: 'bg-aegis-info/10 border-aegis-info text-aegis-info',
    destructive: 'bg-aegis-critical/10 border-aegis-critical text-aegis-critical',
    success: 'bg-aegis-success/10 border-aegis-success text-aegis-success',
    warning: 'bg-aegis-warning/10 border-aegis-warning text-aegis-warning',
  };

  const roleMap = {
    default: 'status',
    destructive: 'alert',
    success: 'status',
    warning: 'alert',
  };

  return (
    <div
      ref={ref}
      role={roleMap[variant]}
      aria-live="polite"
      aria-atomic="true"
      className={clsx(
        'relative w-full rounded-lg border border-l-4 p-4',
        variants[variant],
        className
      )}
      {...props}
    >
      <div className="flex gap-3">
        {icon && <div className="mt-0.5 flex-shrink-0">{icon}</div>}
        <div className="flex-1">
          {title && <h3 className="font-semibold mb-1">{title}</h3>}
          <div className="text-sm">{children}</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close alert"
            className="flex-shrink-0 text-current opacity-50 hover:opacity-75 transition-opacity"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
});

Alert.displayName = 'Alert';

export default Alert;
