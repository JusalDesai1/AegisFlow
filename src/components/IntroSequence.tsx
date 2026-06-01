'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface IntroSequenceProps {
  onComplete: () => void;
}

const IntroSequence = ({ onComplete }: IntroSequenceProps) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timings = [2000, 2000, 3000];
    const timer = setTimeout(() => {
      if (stage < 2) {
        setStage(stage + 1);
      } else {
        onComplete();
      }
    }, timings[stage]);

    return () => clearTimeout(timer);
  }, [stage, onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-aegis-darker via-aegis-dark to-aegis-darker flex flex-col items-center justify-center overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,107,74,0.1)_1px,transparent_1px),linear-gradient(0deg,rgba(255,107,74,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Stage 1: System Boot */}
      {stage >= 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center z-10"
        >
          <motion.div
            animate={stage === 0 ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 1.5, repeat: stage === 0 ? Infinity : 0 }}
            className="mb-6"
          >
            <div className="text-6xl font-bold text-aegis-accent mb-4">AegisFlow</div>
            <div className="text-lg text-aegis-text-secondary">Emergency Operations Intelligence Platform</div>
          </motion.div>

          {stage === 0 && (
            <motion.div
              animate={{ scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 border-2 border-aegis-accent rounded-full mx-auto mt-8"
            />
          )}
        </motion.div>
      )}

      {/* Stage 2: Network Connection */}
      {stage >= 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute w-full text-center z-10"
        >
          <div className="space-y-4">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block"
            >
              <svg className="w-16 h-16 mx-auto text-aegis-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </motion.div>
            <p className="text-aegis-text-secondary">Initializing secure connection...</p>
            <motion.div className="flex gap-1 justify-center">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ scaleY: [1, 2, 1] }}
                  transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity }}
                  className="w-1 h-6 bg-aegis-accent rounded-full"
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Stage 3: System Ready */}
      {stage >= 2 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center z-10"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2 }}
            className="w-16 h-16 mx-auto mb-6 text-aegis-success"
          >
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </motion.div>
          <p className="text-2xl font-semibold text-aegis-success">System Ready</p>
          <p className="text-aegis-text-secondary mt-2">Entering command center...</p>
        </motion.div>
      )}
    </div>
  );
};

export default IntroSequence;
