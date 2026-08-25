'use client';

import React from 'react';
import { Logo } from '@/components/ui/Logo';
import { Home, CheckSquare, Calendar, Brain, Cpu, FileText, Mail, Clock, X, ChevronRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type AppViewType = 'home' | 'tasks' | 'calendar' | 'mcp' | 'docs' | 'email' | 'plan' | 'brain';

interface SideNavDrawerProps {
  isOpen: boolean;
  activeView: AppViewType;
  onSelectView: (view: AppViewType) => void;
  onClose: () => void;
  onOpenAI: () => void;
}

export const SideNavDrawer: React.FC<SideNavDrawerProps> = ({
  isOpen,
  activeView,
  onSelectView,
  onClose,
  onOpenAI,
}) => {
  const menuSections = [
    {
      title: 'Execution Core',
      items: [
        { id: 'home' as AppViewType, label: 'Today & Next Move', icon: Home, badge: 'Active' },
        { id: 'tasks' as AppViewType, label: 'Tasks Matrix', icon: CheckSquare },
        { id: 'calendar' as AppViewType, label: 'Calendar & Day Inspector', icon: Calendar, badge: 'New' },
        { id: 'plan' as AppViewType, label: 'Daily Sequence Plan', icon: Clock },
      ],
    },
    {
      title: 'Intelligence & MCP Hub',
      items: [
        { id: 'mcp' as AppViewType, label: 'AI MCP Orchestrator', icon: Cpu, badge: '5 Tools' },
        { id: 'docs' as AppViewType, label: 'Document Task Ingest', icon: FileText },
        { id: 'email' as AppViewType, label: 'Email Auto-Scheduler', icon: Mail },
        { id: 'brain' as AppViewType, label: 'Brain Knowledge Graph', icon: Brain },
      ],
    },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* Slide-in Drawer */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
          className="relative w-80 max-w-[85vw] h-full bg-flow-surface neu-card border-r border-flow-border/80 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-10"
        >
          <div>
            {/* Top Logo & Close Button */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-flow-border/60">
              <Logo size="md" withText={true} />
              <button
                onClick={onClose}
                aria-label="Close navigation"
                className="p-2 rounded-xl neu-button text-flow-muted hover:text-flow-text-primary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Groups */}
            <div className="space-y-6">
              {menuSections.map((section, idx) => (
                <div key={idx} className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-flow-muted px-2">
                    {section.title}
                  </span>

                  <div className="space-y-1 pt-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeView === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            onSelectView(item.id);
                            onClose();
                          }}
                          className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all text-left min-h-[44px] ${
                            isActive
                              ? 'neu-pressed text-flow-accent border border-flow-accent/40 bg-flow-accent/5 font-black shadow-inner'
                              : 'neu-raised text-flow-text-secondary hover:text-flow-text-primary font-bold'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-flow-accent' : 'text-flow-muted'}`} />
                            <span className="text-xs truncate">{item.label}</span>
                          </div>

                          {item.badge && (
                            <span
                              className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                                isActive
                                  ? 'bg-flow-accent text-white'
                                  : 'neu-pressed text-flow-muted'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom AI Trigger Button */}
          <div className="pt-6 border-t border-flow-border/50 space-y-3">
            <button
              onClick={() => {
                onOpenAI();
                onClose();
              }}
              className="w-full p-3 rounded-2xl neu-button-accent flex items-center justify-center gap-2 text-xs font-bold shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask FLOW AI Assistant</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-flow-muted font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>MCP Protocol v1.2 Connected</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
