'use client';

import React from 'react';
import { useTheme } from './ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', size = 'md' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative flex items-center justify-between rounded-full p-1.5 transition-all duration-300 ${
        size === 'sm' ? 'w-14 h-7' : 'w-16 h-8'
      } neu-pressed ${className}`}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <div className="flex w-full items-center justify-between px-1 text-xs">
        <Sun className={`h-3.5 w-3.5 transition-colors duration-300 ${!isDark ? 'text-amber-500' : 'text-flow-muted'}`} />
        <Moon className={`h-3.5 w-3.5 transition-colors duration-300 ${isDark ? 'text-indigo-400' : 'text-flow-muted'}`} />
      </div>

      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        animate={{ x: isDark ? (size === 'sm' ? 26 : 30) : 0 }}
        className={`absolute left-1 top-1 flex items-center justify-center rounded-full neu-raised ${
          size === 'sm' ? 'w-5 h-5' : 'w-6 h-6'
        }`}
      >
        {isDark ? (
          <Moon className="h-3 w-3 text-flow-accent" />
        ) : (
          <Sun className="h-3 w-3 text-amber-500" />
        )}
      </motion.div>
    </button>
  );
};
