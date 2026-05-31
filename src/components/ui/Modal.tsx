'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeButton?: boolean;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>((
  { isOpen, onClose, title, children, size = 'md', closeButton = true },
  ref
) => {
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={clsx(
                'bg-aegis-card border border-aegis-border rounded-lg shadow-glow-lg',
                'max-h-[90vh] overflow-y-auto',
                sizes[size]
              )}
            >
              {/* Header */}
              {(title || closeButton) && (
                <div className="flex items-center justify-between p-6 border-b border-aegis-border sticky top-0 bg-aegis-card/95 backdrop-blur">
                  {title && <h2 className="text-xl font-bold text-aegis-text-primary">{title}</h2>}
                  {closeButton && (
                    <button
                      onClick={onClose}
                      className="text-aegis-text-secondary hover:text-aegis-text-primary transition-colors"
                      aria-label="Close modal"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="p-6">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

Modal.displayName = 'Modal';

export default Modal;
