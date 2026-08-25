'use client';

import React, { useState } from 'react';
import { Task, Priority } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Plus, Check, Clock, Calendar, Trash2, CheckCircle2, Play, Filter, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskListViewProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onAddTask: (task: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
  onStartFocus: (task: Task) => void;
}

export const TaskListView: React.FC<TaskListViewProps> = ({
  tasks,
  onToggleTask,
  onAddTask,
  onDeleteTask,
  onStartFocus,
}) => {
  const [filter, setFilter] = useState<'today' | 'upcoming' | 'completed'>('today');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedMinutes, setEstimatedMinutes] = useState(30);
  const [priority, setPriority] = useState<Priority>('medium');
  const [deadline, setDeadline] = useState('Tomorrow, 5:00 PM');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.status === 'completed';
    if (filter === 'today') return task.status !== 'completed';
    if (filter === 'upcoming') return task.status !== 'completed' && task.deadline?.toLowerCase().includes('friday');
    return true;
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      estimated_minutes: Number(estimatedMinutes),
      priority,
      deadline,
      status: 'todo',
    });

    setTitle('');
    setDescription('');
    setIsAddModalOpen(false);
  };

  const getPriorityVariant = (p: Priority) => {
    if (p === 'high') return 'danger';
    if (p === 'medium') return 'warning';
    return 'neutral';
  };

  return (
    <div className="space-y-5 pb-28 max-w-2xl mx-auto px-1">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-flow-text-primary tracking-tight">
            Tasks
          </h1>
          <p className="text-xs sm:text-sm text-flow-text-secondary font-medium">
            Prioritized by cognitive weight and available time
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsAddModalOpen(true)}
          className="gap-1.5 font-bold shadow-lg min-h-[42px] px-4"
        >
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl neu-pressed">
        {(['today', 'upcoming', 'completed'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 min-h-[40px] ${
              filter === tab
                ? 'neu-raised text-flow-accent shadow-sm'
                : 'text-flow-text-secondary hover:text-flow-text-primary'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="neu-card p-8 text-center"
            >
              <CheckCircle2 className="w-8 h-8 text-flow-accent mx-auto mb-2 opacity-60" />
              <p className="text-sm font-bold text-flow-text-primary">No tasks in this view</p>
              <span className="text-xs text-flow-muted">All clear for this filter category.</span>
            </motion.div>
          ) : (
            filteredTasks.map((task) => {
              const isCompleted = task.status === 'completed';
              return (
                <motion.div
                  layout
                  key={task.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className={`neu-card p-4 sm:p-5 flex items-start justify-between gap-3.5 transition-all border border-flow-border/80 ${
                    isCompleted ? 'opacity-55' : ''
                  }`}
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    {/* Checkbox */}
                    <button
                      onClick={() => onToggleTask(task.id)}
                      aria-label="Toggle complete"
                      className={`w-7 h-7 rounded-full flex items-center justify-center mt-0.5 shrink-0 transition-all ${
                        isCompleted
                          ? 'neu-pressed bg-emerald-500/20 text-emerald-500'
                          : 'neu-raised text-transparent hover:text-flow-muted'
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </button>

                    <div className="min-w-0">
                      <p
                        className={`text-sm sm:text-base font-bold text-flow-text-primary leading-snug ${
                          isCompleted ? 'line-through text-flow-muted' : ''
                        }`}
                      >
                        {task.title}
                      </p>

                      {task.description && (
                        <p className="text-xs text-flow-text-secondary mt-1 line-clamp-2 font-medium">
                          {task.description}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        <Badge variant={getPriorityVariant(task.priority)} size="sm">
                          {task.priority.toUpperCase()}
                        </Badge>

                        {task.deadline && (
                          <div className="flex items-center gap-1 text-[11px] text-flow-muted font-medium">
                            <Calendar className="w-3 h-3 text-flow-accent" />
                            <span>{task.deadline}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-1 text-[11px] text-flow-muted font-medium">
                          <Clock className="w-3 h-3 text-flow-accent" />
                          <span>{task.estimated_minutes} min</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {!isCompleted && (
                      <button
                        onClick={() => onStartFocus(task)}
                        title="Start Focus on this task"
                        className="p-2.5 rounded-xl neu-button text-flow-accent hover:text-flow-accent-hover min-h-[40px] min-w-[40px] flex items-center justify-center"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </button>
                    )}
                    <button
                      onClick={() => onDeleteTask(task.id)}
                      title="Delete task"
                      className="p-2.5 rounded-xl neu-button text-flow-muted hover:text-red-500 min-h-[40px] min-w-[40px] flex items-center justify-center"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Add Task Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Create Actionable Task"
      >
        <form onSubmit={handleCreateTask} className="space-y-4">
          <Input
            label="Task Objective"
            placeholder="e.g. Finish DBMS Normalization Assignment"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoFocus
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-flow-text-secondary">
              Description / Notes
            </label>
            <textarea
              className="w-full rounded-2xl p-3 text-sm neu-input placeholder:text-flow-muted min-h-[75px]"
              placeholder="Requirements, context, or dependencies..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-flow-text-secondary">
                Duration (Mins)
              </label>
              <input
                type="number"
                min="5"
                max="300"
                step="5"
                className="rounded-2xl p-3 text-sm neu-input font-bold"
                value={estimatedMinutes}
                onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-flow-text-secondary">
                Priority
              </label>
              <select
                className="rounded-2xl p-3 text-sm neu-input bg-transparent font-bold"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          <Input
            label="Deadline / Target Window"
            placeholder="e.g. Tomorrow, 5:00 PM"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          <div className="flex gap-3 pt-3">
            <Button
              type="button"
              variant="secondary"
              size="md"
              className="flex-1"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md" className="flex-1 font-bold">
              Save to Backlog
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
