'use client';

import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withText?: boolean;
  className?: string;
  animate?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  className = '',
}) => {
  const textSizes = {
    sm: 'text-lg font-black tracking-tight',
    md: 'text-xl font-black tracking-tight',
    lg: 'text-2xl font-black tracking-tight',
    xl: 'text-3xl font-black tracking-tight',
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <span className={`text-flow-text-primary tracking-wider font-sans ${textSizes[size]}`}>
        FLOW
      </span>
    </div>
  );
};
