'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  count?: number;
  height?: string;
  variant?: 'card' | 'text' | 'avatar';
}

const LoadingSkeleton = ({ count = 1, height = '20px', variant = 'card' }: LoadingSkeletonProps) => {
  const variants = {
    card: 'rounded-lg h-24',
    text: `rounded h-[${height}]`,
    avatar: 'rounded-full w-12 h-12',
  };

  const elements = Array.from({ length: count });

  return (
    <>
      {elements.map((_, idx) => (
        <motion.div
          key={idx}
          className={`bg-gradient-to-r from-aegis-card to-aegis-card/50 shimmer-loading ${variants[variant]}`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      ))}
    </>
  );
};

export default LoadingSkeleton;
