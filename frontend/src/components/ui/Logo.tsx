'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withText?: boolean;
  className?: string;
  animate?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  withText = true,
  className = '',
  animate = false,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-lg font-bold tracking-tight',
    md: 'text-xl font-bold tracking-tight',
    lg: 'text-2xl font-extrabold tracking-tight',
    xl: 'text-3xl font-extrabold tracking-tight',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <motion.div
        whileHover={animate ? { scale: 1.05, rotate: 3 } : undefined}
        className={`relative flex items-center justify-center rounded-2xl neu-raised p-1.5 ${iconSizes[size]}`}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-flow-accent"
        >
          {/* FLOW organic loop emblem */}
          <path
            d="M8 20C8 13.3726 13.3726 8 20 8C26.6274 8 32 13.3726 32 20C32 26.6274 26.6274 32 20 32C15.5 32 11.5 29.5 9.5 26"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle
            cx="20"
            cy="20"
            r="4.5"
            fill="currentColor"
            className="text-flow-accent"
          />
          <motion.circle
            cx="28"
            cy="15"
            r="2"
            fill="currentColor"
            animate={animate ? { scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] } : undefined}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>

      {withText && (
        <div className="flex flex-col">
          <span className={`text-flow-text-primary tracking-wider font-extrabold font-sans ${textSizes[size]}`}>
            FLOW
          </span>
          {size === 'xl' && (
            <span className="text-[10px] font-medium uppercase tracking-widest text-flow-muted">
              Focus • Logic • Orchestration • Workflow
            </span>
          )}
        </div>
      )}
    </div>
  );
};
