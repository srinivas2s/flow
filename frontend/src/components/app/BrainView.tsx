'use client';

import React, { useState } from 'react';
import { Memory } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Brain, Sparkles, Lightbulb, Bookmark, Sliders, History, Plus, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface BrainViewProps {
  memories: Memory[];
  onAddMemory?: (memory: Partial<Memory>) => void;
}

export const BrainView: React.FC<BrainViewProps> = ({ memories }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Knowledge' },
    { id: 'decision', label: 'Decisions', icon: Bookmark },
    { id: 'context', label: 'Context', icon: Lightbulb },
    { id: 'preference', label: 'Preferences', icon: Sliders },
    { id: 'habit', label: 'Habits', icon: History },
  ];

  const filteredMemories = selectedCategory === 'all'
    ? memories
    : memories.filter((m) => m.category === selectedCategory);

  const getCategoryBadgeVariant = (cat: Memory['category']) => {
    switch (cat) {
      case 'decision': return 'accent';
      case 'context': return 'warning';
      case 'preference': return 'neutral';
      case 'habit': return 'success';
      default: return 'neutral';
    }
  };

  return (
    <div className="space-y-6 pb-24 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-flow-text-primary tracking-tight">
            Brain & Memory
          </h1>
          <p className="text-xs sm:text-sm text-flow-text-secondary mt-0.5">
            Personal productivity context learned over time
          </p>
        </div>

        <Badge variant="accent" size="sm" icon={<Brain className="w-3.5 h-3.5 text-flow-accent" />}>
          Productivity Graph
        </Badge>
      </div>

      {/* Graph Vision Concept Banner */}
      <div className="neu-card p-5 border border-flow-accent/40 bg-flow-accent/5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-2xl neu-raised flex items-center justify-center text-flow-accent shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-flow-text-primary">
              Personal Productivity Graph
            </h2>
            <p className="text-xs text-flow-text-secondary mt-1 leading-relaxed">
              FLOW continuously indexes your execution rhythms, project constraints, and past decisions so you never have to re-explain your context.
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all duration-200 ${
              selectedCategory === cat.id
                ? 'neu-pressed text-flow-accent bg-flow-accent/10 border border-flow-accent/30'
                : 'neu-raised text-flow-text-secondary hover:text-flow-text-primary'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Memory Nodes List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredMemories.map((mem) => (
          <motion.div
            layout
            key={mem.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="neu-card p-5 border border-flow-border/50 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-flow-muted">
                  {mem.title}
                </span>
                <Badge variant={getCategoryBadgeVariant(mem.category)} size="sm">
                  {mem.category.toUpperCase()}
                </Badge>
              </div>

              <p className="text-sm font-bold text-flow-text-primary mt-1 leading-relaxed">
                {mem.content}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-flow-border/40 flex items-center justify-between text-[11px] text-flow-muted">
              <span>Observed: {mem.created_at}</span>
              {mem.confidence && (
                <span className="font-semibold text-flow-accent">
                  {Math.round(mem.confidence * 100)}% Confidence
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
