export type Priority = 'high' | 'medium' | 'low';
export type TaskStatus = 'todo' | 'in_progress' | 'completed';
export type PlanStatus = 'scheduled' | 'active' | 'completed' | 'skipped' | 'missed';
export type MemoryCategory = 'decision' | 'context' | 'preference' | 'habit';

export interface Task {
  id: string;
  title: string;
  description?: string;
  deadline?: string; // ISO string or human-readable (e.g. "Tomorrow, 5:00 PM")
  deadlineDate?: string;
  priority: Priority;
  estimated_minutes: number;
  status: TaskStatus;
  category?: string;
  completed_at?: string;
  created_at: string;
}

export interface PlanItem {
  id: string;
  task_id?: string;
  title: string;
  start_time: string; // e.g. "09:00 AM" or "09:00"
  end_time: string;   // e.g. "10:30 AM" or "10:30"
  duration_minutes: number;
  status: PlanStatus;
  type: 'task' | 'meeting' | 'break' | 'deep_work' | 'routine';
  reason?: string;
}

export interface Memory {
  id: string;
  title: string;
  content: string;
  category: MemoryCategory;
  created_at: string;
  confidence?: number;
}

export interface FocusSession {
  id: string;
  task_id: string;
  task_title: string;
  duration_minutes: number;
  started_at: string;
  completed_at?: string;
  current_step?: string;
  steps?: string[];
  notes?: string;
}

export interface AIRecommendation {
  task: Task;
  reason: string;
  available_time_minutes: number;
  next_commitment: string;
  confidence_score: number;
  suggested_break_after: boolean;
}
