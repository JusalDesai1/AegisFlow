'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
  duration?: number;
  onClose: (id: string) => void;
}

const Toast = ({ id, title, description, variant = 'default', duration = 5000, onClose }: ToastProps) => {
  useEffect(() => {
    if (duration === Infinity) return;
    const timer = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const variants = {
    default: 'bg-aegis-card border-aegis-border',
    destructive: 'bg-aegis-critical/10 border-aegis-critical',
    success: 'bg-aegis-success/10 border-aegis-success',
  };

  const textVariants = {
    default: 'text-aegis-text-primary',
    destructive: 'text-aegis-critical',
    success: 'text-aegis-success',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: 0 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: -20, x: 100 }}
      className={clsx(
        'w-full max-w-md rounded-lg border p-4 shadow-lg',
        variants[variant],
        textVariants[variant]
      )}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex gap-3">
        <div className="flex-1">
          {title && <h4 className="font-semibold mb-1">{title}</h4>}
          {description && <p className="text-sm opacity-75">{description}</p>}
        </div>
        <button
          onClick={() => onClose(id)}
          aria-label="Dismiss"
          className="flex-shrink-0 opacity-50 hover:opacity-75 transition-opacity"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

interface ToastContainerProps {
  toasts: ToastProps[];
  onClose: (id: string) => void;
}

const ToastContainer = ({ toasts, onClose }: ToastContainerProps) => {
  return (
    <div
      className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none"
      role="region"
      aria-label="Notifications"
      aria-live="polite"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast {...toast} onClose={onClose} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export { Toast, ToastContainer };
