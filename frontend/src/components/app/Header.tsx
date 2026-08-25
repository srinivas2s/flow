'use client';

import React from 'react';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Sparkles, Menu } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  onOpenAI?: () => void;
  onOpenMenu?: () => void;
  currentViewTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAI,
  onOpenMenu,
  currentViewTitle = 'Today',
}) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(new Date());

  return (
    <header className="sticky top-0 z-30 w-full glass-panel border-b border-flow-border/50 px-3 sm:px-6 py-2.5 sm:py-3 transition-all">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* Side Menu Drawer Toggle */}
          {onOpenMenu && (
            <button
              onClick={onOpenMenu}
              aria-label="Open navigation menu"
              className="p-2 rounded-xl neu-button text-flow-text-primary hover:text-flow-accent transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center"
            >
              <Menu className="w-4 h-4" />
            </button>
          )}

          <Link href="/" className="transition-opacity hover:opacity-90 flex items-center gap-2">
            <Logo size="sm" withText={true} />
          </Link>

          <div className="hidden md:flex flex-col ml-3 pl-3 border-l border-flow-border">
            <span className="text-xs font-bold text-flow-text-primary">{currentViewTitle}</span>
            <span className="text-[10px] text-flow-muted">{formattedDate}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenAI && (
            <button
              onClick={onOpenAI}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full neu-button text-xs font-bold text-flow-accent hover:text-flow-accent-hover transition-colors min-h-[36px]"
              title="Open AI Assistant"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>
          )}
          <ThemeToggle size="sm" />
        </div>
      </div>
    </header>
  );
};
