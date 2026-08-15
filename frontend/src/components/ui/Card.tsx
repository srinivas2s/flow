'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'raised' | 'flat' | 'inset' | 'glass';
  elevation?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  variant = 'raised',
  elevation = 'md',
  children,
  interactive = false,
  className = '',
  ...props
}) => {
  const variantStyles = {
    raised: elevation === 'lg' ? 'neu-card' : elevation === 'sm' ? 'neu-flat' : 'neu-raised',
    flat: 'neu-flat',
    inset: 'neu-pressed',
    glass: 'glass-panel shadow-sm',
  };

  return (
    <motion.div
      whileHover={interactive ? { y: -2, transition: { duration: 0.2 } } : undefined}
      className={`rounded-2xl p-5 md:p-6 transition-all duration-300 ${variantStyles[variant]} ${
        interactive ? 'cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
