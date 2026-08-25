'use client';

import React from 'react';
import { Home, CheckSquare, Calendar, Brain, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export type TabType = 'home' | 'tasks' | 'plan' | 'brain';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenAI: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  onOpenAI,
}) => {
  const tabs = [
    { id: 'home' as TabType, label: 'Home', icon: Home },
    { id: 'tasks' as TabType, label: 'Tasks', icon: CheckSquare },
    { id: 'plan' as TabType, label: 'Plan', icon: Calendar },
    { id: 'brain' as TabType, label: 'Brain', icon: Brain },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-[max(env(safe-area-inset-bottom),8px)] pt-1 pointer-events-none">
      <div className="max-w-sm mx-auto relative pointer-events-auto">
        <div className="glass-panel neu-card rounded-full p-1 flex items-center justify-between border border-flow-border/80 shadow-xl backdrop-blur-xl">
          {tabs.slice(0, 2).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-full transition-all duration-200 min-h-[38px] ${
                  isActive ? 'text-flow-accent' : 'text-flow-text-secondary hover:text-flow-text-primary'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 neu-pressed rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <Icon className="w-4 h-4 mb-0.5" />
                <span className="text-[9px] font-bold tracking-tight">{tab.label}</span>
              </button>
            );
          })}

          {/* Integrated Compact Center AI Button */}
          <button
            onClick={onOpenAI}
            aria-label="Ask FLOW AI"
            className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-full text-flow-accent hover:text-flow-accent-hover transition-all min-h-[38px]"
          >
            <div className="w-6 h-6 rounded-full neu-raised flex items-center justify-center text-flow-accent hover:scale-105 transition-transform">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="text-[9px] font-bold tracking-tight text-flow-accent mt-0.5">AI</span>
          </button>

          {tabs.slice(2).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-full transition-all duration-200 min-h-[38px] ${
                  isActive ? 'text-flow-accent' : 'text-flow-text-secondary hover:text-flow-text-primary'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 neu-pressed rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <Icon className="w-4 h-4 mb-0.5" />
                <span className="text-[9px] font-bold tracking-tight">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
