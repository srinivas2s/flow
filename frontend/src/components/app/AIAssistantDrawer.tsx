'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X, Play, RefreshCw, Bot, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Task } from '@/types';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  actions?: Array<{
    label: string;
    action: 'start_focus' | 'replan' | 'view_tasks';
  }>;
}

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onStartFocus: (task?: Task) => void;
  onRecalculatePlan: () => void;
  onAddTask: (task: Partial<Task>) => void;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  onStartFocus,
  onRecalculatePlan,
  onAddTask,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: 'Good morning! I have organized your day. You have 45 minutes available before your 6:00 PM team meeting. Your DBMS assignment is due tomorrow—I recommend launching focus right now.',
      actions: [
        { label: 'Start Focus', action: 'start_focus' },
        { label: 'Change Plan', action: 'replan' },
      ],
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (userText: string = input) => {
    const query = userText.trim();
    if (!query) return;

    const userMessage: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Mock/deterministic AI reasoning
    setTimeout(() => {
      let aiResponse: Message;
      const lower = query.toLowerCase();

      if (lower.includes('what should i do') || lower.includes('next move') || lower.includes('right now')) {
        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: 'You have a 45-minute open slot right now. Finishing the DBMS Normalization assignment will clear your highest-pressure deadline.',
          actions: [
            { label: 'Start Focus', action: 'start_focus' },
            { label: 'Recalculate Plan', action: 'replan' },
          ],
        };
      } else if (lower.includes('add') || lower.includes('task') || lower.includes('deadline')) {
        const estimatedMinutes = lower.includes('hour') ? 60 : 30;
        onAddTask({
          title: query.replace(/^(add|create|task|new)\s+/i, ''),
          estimated_minutes: estimatedMinutes,
          priority: 'medium',
          status: 'todo',
          deadline: 'Tomorrow',
        });
        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `I've understood and added this task to your backlog with a ${estimatedMinutes}m estimate. I've rebalanced your schedule to fit it in.`,
          actions: [{ label: 'View Tasks', action: 'view_tasks' }],
        };
      } else if (lower.includes('replan') || lower.includes('change') || lower.includes('adjust')) {
        onRecalculatePlan();
        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: 'I have recalculated your daily timeline and optimized your break buffers. You are back on track.',
          actions: [{ label: 'Start Focus', action: 'start_focus' }],
        };
      } else {
        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `Got it. I'm keeping track of "${query}" in your productivity graph and adjusting your focus recommendations accordingly.`,
          actions: [{ label: 'What Should I Do Now?', action: 'start_focus' }],
        };
      }

      setIsTyping(false);
      setMessages((prev) => [...prev, aiResponse]);
    }, 700);
  };

  const handleActionClick = (action: string) => {
    if (action === 'start_focus') {
      onClose();
      onStartFocus();
    } else if (action === 'replan') {
      onRecalculatePlan();
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: 'Your timeline has been adapted and shifts applied.',
        },
      ]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Assistant Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative z-10 w-full max-w-md h-full bg-flow-surface neu-raised flex flex-col justify-between border-l border-flow-border shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-flow-border/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full neu-raised flex items-center justify-center text-flow-accent">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-flow-text-primary">FLOW Assistant</h3>
                  <span className="text-[11px] text-flow-muted">Context-aware productivity agent</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full neu-button text-flow-text-secondary hover:text-flow-text-primary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Prompts */}
            <div className="px-4 py-2 bg-flow-bg/50 border-b border-flow-border/30 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <button
                onClick={() => handleSend('What should I do right now?')}
                className="px-3 py-1 rounded-full neu-button text-[11px] font-semibold text-flow-accent whitespace-nowrap"
              >
                What should I do now?
              </button>
              <button
                onClick={() => handleSend('Recalculate my plan')}
                className="px-3 py-1 rounded-full neu-button text-[11px] font-semibold text-flow-text-secondary whitespace-nowrap"
              >
                Adjust Plan
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'neu-button-accent text-white font-medium'
                        : 'neu-card border border-flow-border/60 text-flow-text-primary'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Contextual Action Buttons */}
                  {msg.actions && (
                    <div className="flex flex-wrap gap-2 mt-2 ml-1">
                      {msg.actions.map((act, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleActionClick(act.action)}
                          className="px-3 py-1.5 rounded-xl neu-button text-xs font-bold text-flow-accent hover:text-flow-accent-hover flex items-center gap-1 shadow-sm"
                        >
                          {act.action === 'start_focus' && <Play className="w-3 h-3 fill-current" />}
                          {act.action === 'replan' && <RefreshCw className="w-3 h-3" />}
                          <span>{act.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 rounded-2xl neu-card max-w-[80px]">
                  <span className="w-2 h-2 rounded-full bg-flow-accent animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-flow-accent animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-flow-accent animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-4 border-t border-flow-border/50 bg-flow-surface">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask FLOW or dump a new task..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 rounded-2xl px-4 py-3 text-xs sm:text-sm neu-input text-flow-text-primary placeholder:text-flow-muted"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="icon"
                  className="rounded-2xl shrink-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
