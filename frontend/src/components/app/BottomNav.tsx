'use client';

import React from 'react';
import { Home, CheckSquare, Calendar, Brain, Sparkles, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export type TabType = 'home' | 'tasks' | 'plan' | 'brain';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenAI: () => void;
  onQuickAdd?: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  onOpenAI,
  onQuickAdd,
}) => {
  const tabs = [
    { id: 'home' as TabType, label: 'Home', icon: Home },
    { id: 'tasks' as TabType, label: 'Tasks', icon: CheckSquare },
    { id: 'plan' as TabType, label: 'Plan', icon: Calendar },
    { id: 'brain' as TabType, label: 'Brain', icon: Brain },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-safe pb-3 pt-1 pointer-events-none">
      <div className="max-w-md mx-auto relative pointer-events-auto">
        <div className="glass-panel neu-card rounded-3xl p-2 flex items-center justify-around border border-flow-border shadow-2xl">
          {tabs.slice(0, 2).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex flex-col items-center justify-center py-1.5 px-4 rounded-2xl transition-all duration-200 ${
                  isActive ? 'text-flow-accent' : 'text-flow-text-secondary hover:text-flow-text-primary'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 neu-pressed rounded-2xl -z-10"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <Icon className="w-5 h-5 mb-0.5" />
                <span className="text-[11px] font-semibold tracking-tight">{tab.label}</span>
              </button>
            );
          })}

          {/* Center Floating Action Button (AI Assistant / Quick Action) */}
          <div className="relative -top-5 flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={onOpenAI}
              aria-label="Ask FLOW AI"
              className="w-14 h-14 rounded-full neu-button-accent flex items-center justify-center shadow-lg relative group"
            >
              <Sparkles className="w-6 h-6 text-white animate-pulse-slow" />
              <span className="absolute -bottom-6 text-[10px] font-bold text-flow-accent tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                AI
              </span>
            </motion.button>
          </div>

          {tabs.slice(2).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex flex-col items-center justify-center py-1.5 px-4 rounded-2xl transition-all duration-200 ${
                  isActive ? 'text-flow-accent' : 'text-flow-text-secondary hover:text-flow-text-primary'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 neu-pressed rounded-2xl -z-10"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <Icon className="w-5 h-5 mb-0.5" />
                <span className="text-[11px] font-semibold tracking-tight">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
