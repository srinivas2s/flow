'use client';

import React from 'react';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface LandingNavbarProps {
  onEnterApp?: () => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({ onEnterApp }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-flow-border/40 px-4 py-3 sm:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="transition-opacity hover:opacity-90">
          <Logo size="md" withText={true} />
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle size="sm" />
          <Link href="/app">
            <Button
              variant="primary"
              size="sm"
              className="gap-1.5 shadow-md font-medium text-xs sm:text-sm"
              onClick={onEnterApp}
            >
              <span>Enter App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
