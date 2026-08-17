'use client';

import React from 'react';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  onOpenAI?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAI }) => {
  // Format current date e.g. "Monday, Aug 25"
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  }).format(new Date());

  return (
    <header className="sticky top-0 z-30 w-full glass-panel border-b border-flow-border/50 px-4 py-3 sm:px-6 md:px-8 transition-all">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="transition-opacity hover:opacity-90">
            <Logo size="sm" withText={true} />
          </Link>
          <div className="hidden sm:flex flex-col ml-3 pl-3 border-l border-flow-border">
            <span className="text-xs font-semibold text-flow-text-primary">Good morning</span>
            <span className="text-[11px] text-flow-muted">{formattedDate}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {onOpenAI && (
            <button
              onClick={onOpenAI}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full neu-button text-xs font-medium text-flow-accent hover:text-flow-accent-hover transition-colors"
              title="Open AI Assistant"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Ask FLOW</span>
            </button>
          )}
          <ThemeToggle size="sm" />
        </div>
      </div>
    </header>
  );
};
