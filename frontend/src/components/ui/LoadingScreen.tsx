'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-flow-bg text-flow-text-primary px-6 select-none overflow-hidden">
      <div className="flex flex-col items-center text-center">
        {/* Minimalist Word: FLOW */}
        <h1 className="text-3xl sm:text-4xl font-black text-flow-text-primary tracking-tight mb-5">
          FLOW
        </h1>

        {/* Slow Smooth Loading Bar */}
        <div className="w-36 h-1 rounded-full neu-pressed overflow-hidden border border-flow-border/40">
          <motion.div
            className="h-full bg-flow-accent rounded-full"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>
    </div>
  );
};
