from pydantic import BaseModel, Field
from typing import Optional, List, Literal
from datetime import datetime

PriorityType = Literal['high', 'medium', 'low']
TaskStatusType = Literal['todo', 'in_progress', 'completed']
PlanStatusType = Literal['scheduled', 'active', 'completed', 'skipped', 'missed']
PlanActivityType = Literal['task', 'meeting', 'break', 'deep_work', 'routine']
MemoryCategoryType = Literal['decision', 'context', 'preference', 'habit']

# Task Schemas
class TaskBase(BaseModel):
    title: str = Field(..., description="Title of the task")
    description: Optional[str] = Field(None, description="Detailed context or requirements")
    deadline: Optional[str] = Field(None, description="Deadline string e.g. Tomorrow, 5:00 PM")
    priority: PriorityType = Field('medium', description="Cognitive priority weight")
    estimated_minutes: int = Field(30, description="Estimated duration in minutes")
    category: Optional[str] = Field('General', description="Category or project tag")

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    deadline: Optional[str] = None
    priority: Optional[PriorityType] = None
    estimated_minutes: Optional[int] = None
    status: Optional[TaskStatusType] = None
    category: Optional[str] = None

class TaskResponse(TaskBase):
    id: str
    status: TaskStatusType
    completed_at: Optional[str] = None
    created_at: str

# Plan Schemas
class PlanItemResponse(BaseModel):
    id: str
    task_id: Optional[str] = None
    title: str
    start_time: str
    end_time: str
    duration_minutes: int
    status: PlanStatusType
    type: PlanActivityType
    reason: Optional[str] = None

class PlanRecalculateRequest(BaseModel):
    disrupted_task_id: Optional[str] = None
    delay_minutes: Optional[int] = 30

# Memory Schemas
class MemoryBase(BaseModel):
    title: str
    content: str
    category: MemoryCategoryType
    confidence: Optional[float] = 0.9

class MemoryCreate(MemoryBase):
    pass

class MemoryResponse(MemoryBase):
    id: str
    created_at: str

# Focus Session Schemas
class FocusSessionStart(BaseModel):
    task_id: str
    duration_minutes: int = 35

class FocusSessionComplete(BaseModel):
    session_id: str
    actual_minutes: Optional[int] = None
    notes: Optional[str] = None

class FocusSessionResponse(BaseModel):
    id: str
    task_id: str
    task_title: str
    duration_minutes: int
    started_at: str
    completed_at: Optional[str] = None
    status: Literal['active', 'completed']

# AI Recommendation Schema
class AIRecommendationResponse(BaseModel):
    task: TaskResponse
    reason: str
    available_time_minutes: int
    next_commitment: str
    confidence_score: float
    suggested_break_after: bool
