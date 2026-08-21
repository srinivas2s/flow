'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Task, PlanItem, Memory, AIRecommendation } from '@/types';
import { apiClient, calculateLocalRecommendation, INITIAL_TASKS, INITIAL_PLAN, INITIAL_MEMORIES } from '@/lib/api';
import { Header } from '@/components/app/Header';
import { BottomNav, TabType } from '@/components/app/BottomNav';
import { HomeView } from '@/components/app/HomeView';
import { TaskListView } from '@/components/app/TaskListView';
import { PlanTimelineView } from '@/components/app/PlanTimelineView';
import { BrainView } from '@/components/app/BrainView';
import { AIAssistantDrawer } from '@/components/app/AIAssistantDrawer';
import { FocusModeOverlay } from '@/components/app/FocusModeOverlay';
import { Suspense } from 'react';

function AppShellContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>('home');
  
  // State
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [plan, setPlan] = useState<PlanItem[]>(INITIAL_PLAN);
  const [memories, setMemories] = useState<Memory[]>(INITIAL_MEMORIES);
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);

  // Modals & Overlays
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isFocusOpen, setIsFocusOpen] = useState(false);
  const [activeFocusTask, setActiveFocusTask] = useState<Task | null>(null);
  const [isRecalculating, setIsRecalculating] = useState(false);

  // Initial load
  useEffect(() => {
    async function loadData() {
      const [fetchedTasks, fetchedPlan, fetchedMemories] = await Promise.all([
        apiClient.getTasks(),
        apiClient.getPlan(),
        apiClient.getMemories(),
      ]);
      setTasks(fetchedTasks);
      setPlan(fetchedPlan);
      setMemories(fetchedMemories);
      setRecommendation(calculateLocalRecommendation(fetchedTasks));
    }
    loadData();

    // Check if query param asked to start focus directly
    if (searchParams.get('action') === 'focus') {
      const target = tasks.find((t) => t.id === 't-1') || tasks[0];
      setActiveFocusTask(target);
      setIsFocusOpen(true);
    }
  }, [searchParams]);

  // Handlers
  const handleStartFocus = (task?: Task) => {
    const target = task || recommendation?.task || tasks[0];
    setActiveFocusTask(target);
    setIsFocusOpen(true);
  };

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) => {
      const updated = prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: (t.status === 'completed' ? 'todo' : 'completed') as Task['status'],
              completed_at: t.status === 'completed' ? undefined : new Date().toISOString(),
            }
          : t
      );
      setRecommendation(calculateLocalRecommendation(updated));
      return updated;
    });
  };

  const handleAddTask = async (taskData: Partial<Task>) => {
    const newTask = await apiClient.createTask(taskData);
    setTasks((prev) => {
      const updated = [newTask, ...prev];
      setRecommendation(calculateLocalRecommendation(updated));
      return updated;
    });
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => {
      const updated = prev.filter((t) => t.id !== taskId);
      setRecommendation(calculateLocalRecommendation(updated));
      return updated;
    });
  };

  const handleRecalculatePlan = async () => {
    setIsRecalculating(true);
    const updatedPlan = await apiClient.recalculatePlan();
    setPlan(updatedPlan);
    setTimeout(() => {
      setIsRecalculating(false);
    }, 600);
  };

  const handleCompleteFocusTask = (taskId: string) => {
    handleToggleTask(taskId);
    handleRecalculatePlan();
  };

  return (
    <div className="min-h-screen bg-flow-bg text-flow-text-primary flex flex-col selection:bg-flow-accent/20">
      {/* Top Header */}
      <Header onOpenAI={() => setIsAIOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-6 pb-20">
        {activeTab === 'home' && (
          <HomeView
            tasks={tasks}
            plan={plan}
            recommendation={recommendation}
            onStartFocus={handleStartFocus}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onOpenAI={() => setIsAIOpen(true)}
          />
        )}

        {activeTab === 'tasks' && (
          <TaskListView
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            onStartFocus={handleStartFocus}
          />
        )}

        {activeTab === 'plan' && (
          <PlanTimelineView
            plan={plan}
            onRecalculate={handleRecalculatePlan}
            isRecalculating={isRecalculating}
          />
        )}

        {activeTab === 'brain' && (
          <BrainView
            memories={memories}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        onOpenAI={() => setIsAIOpen(true)}
      />

      {/* AI Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        onStartFocus={handleStartFocus}
        onRecalculatePlan={handleRecalculatePlan}
        onAddTask={handleAddTask}
      />

      {/* Focus Mode Overlay */}
      <FocusModeOverlay
        isOpen={isFocusOpen}
        task={activeFocusTask}
        onClose={() => setIsFocusOpen(false)}
        onCompleteTask={handleCompleteFocusTask}
      />
    </div>
  );
}

export default function AppPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-flow-bg" />}>
      <AppShellContent />
    </Suspense>
  );
}
