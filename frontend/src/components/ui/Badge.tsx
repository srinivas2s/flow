'use client';

import React from 'react';

export interface BadgeProps {
  variant?: 'accent' | 'neutral' | 'success' | 'warning' | 'danger' | 'inset';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  children,
  icon,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'px-2.5 py-0.5 text-xs tracking-tight',
    md: 'px-3 py-1 text-xs font-medium',
  };

  const variantClasses = {
    accent: 'neu-pill text-flow-accent border border-flow-accent/20 font-semibold',
    neutral: 'neu-pill text-flow-text-secondary',
    success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
    danger: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20',
    inset: 'neu-pressed text-flow-text-secondary text-[11px]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium select-none transition-colors ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
