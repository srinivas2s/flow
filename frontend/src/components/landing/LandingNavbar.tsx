'use client';

import React, { useState, useEffect } from 'react';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Sparkles, Compass, Zap } from 'lucide-react';
import Link from 'next/link';

interface LandingNavbarProps {
  onEnterApp?: () => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({ onEnterApp }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 py-3.5 ${
        scrolled
          ? 'glass-panel border-b border-flow-border/70 shadow-lg'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-[1.02]">
          <Logo size="md" withText={true} />
        </Link>

        {/* Center navigation links */}
        <div className="hidden md:flex items-center gap-1.5 p-1 rounded-full neu-pressed border border-flow-border/60">
          <a
            href="#story"
            className="px-4 py-1.5 rounded-full text-xs font-semibold text-flow-text-secondary hover:text-flow-text-primary hover:bg-flow-surface/60 transition-all"
          >
            The Story
          </a>
          <a
            href="#intelligence"
            className="px-4 py-1.5 rounded-full text-xs font-semibold text-flow-text-secondary hover:text-flow-text-primary hover:bg-flow-surface/60 transition-all"
          >
            Intelligence
          </a>
          <a
            href="#adaptive"
            className="px-4 py-1.5 rounded-full text-xs font-semibold text-flow-text-secondary hover:text-flow-text-primary hover:bg-flow-surface/60 transition-all"
          >
            Adaptive Plan
          </a>
          <a
            href="#focus"
            className="px-4 py-1.5 rounded-full text-xs font-semibold text-flow-text-secondary hover:text-flow-text-primary hover:bg-flow-surface/60 transition-all"
          >
            Focus Mode
          </a>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <ThemeToggle size="sm" />
          <Link href="/app">
            <Button
              variant="primary"
              size="sm"
              className="gap-1.5 shadow-xl font-bold text-xs sm:text-sm group"
              onClick={onEnterApp}
            >
              <span>Launch App</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
