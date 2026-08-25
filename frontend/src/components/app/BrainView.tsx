'use client';

import React, { useState } from 'react';
import { Memory } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Brain, Sparkles, Lightbulb, Bookmark, Sliders, History, Plus } from 'lucide-react';
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
    <div className="space-y-5 pb-28 max-w-2xl mx-auto px-1">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-flow-text-primary tracking-tight">
            Brain & Memory
          </h1>
          <p className="text-xs sm:text-sm text-flow-text-secondary font-medium">
            Cognitive context indexed over time
          </p>
        </div>

        <Badge variant="accent" size="sm" icon={<Brain className="w-3.5 h-3.5 text-flow-accent" />}>
          Productivity Graph
        </Badge>
      </div>

      {/* Graph Vision Banner */}
      <div className="neu-card p-4 sm:p-5 border border-flow-accent/40 bg-flow-accent/5 shadow-md">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-2xl neu-raised flex items-center justify-center text-flow-accent shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-flow-text-primary">
              Personal Productivity Graph
            </h2>
            <p className="text-xs text-flow-text-secondary mt-1 leading-relaxed font-medium">
              FLOW tracks your execution rhythms, constraints, and past decisions so you never have to re-explain context.
            </p>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-tight transition-all duration-200 min-h-[36px] ${
              selectedCategory === cat.id
                ? 'neu-pressed text-flow-accent bg-flow-accent/10 border border-flow-accent/40 shadow-sm'
                : 'neu-raised text-flow-text-secondary hover:text-flow-text-primary'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Memory Nodes List */}
      <div className="grid grid-cols-1 gap-3.5">
        {filteredMemories.map((mem) => (
          <motion.div
            layout
            key={mem.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="neu-card p-4 sm:p-5 border border-flow-border/80 flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-flow-muted">
                  {mem.title}
                </span>
                <Badge variant={getCategoryBadgeVariant(mem.category)} size="sm">
                  {mem.category.toUpperCase()}
                </Badge>
              </div>

              <p className="text-xs sm:text-sm font-bold text-flow-text-primary leading-relaxed">
                {mem.content}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-flow-border/50 flex items-center justify-between text-[11px] text-flow-muted font-medium">
              <span>Observed: {mem.created_at}</span>
              {mem.confidence && (
                <span className="font-bold text-flow-accent">
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
