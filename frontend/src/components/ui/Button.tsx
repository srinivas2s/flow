'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'neu';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  children: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'neu',
  size = 'md',
  children,
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3.5 py-1.5 text-xs font-medium rounded-xl min-h-[36px]',
    md: 'px-5 py-2.5 text-sm font-medium rounded-2xl min-h-[44px]',
    lg: 'px-7 py-3.5 text-base font-semibold rounded-2xl min-h-[52px]',
    icon: 'p-2.5 rounded-2xl min-h-[44px] min-w-[44px] flex items-center justify-center',
  };

  const variantClasses = {
    primary: 'neu-button-accent text-white font-semibold',
    secondary: 'neu-button text-flow-text-primary hover:text-flow-accent',
    neu: 'neu-raised text-flow-text-primary hover:text-flow-accent active:shadow-neu-pressed',
    ghost: 'bg-transparent hover:bg-flow-surface/60 text-flow-text-secondary hover:text-flow-text-primary',
    danger: 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      disabled={disabled || isLoading}
      className={`relative inline-flex items-center justify-center gap-2 select-none transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-flow-accent/50 disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Loading...</span>
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
};
