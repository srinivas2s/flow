from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.models.schemas import TaskCreate, TaskUpdate, TaskResponse
from app.services.store import db

router = APIRouter(prefix="/tasks", tags=["Tasks"])

@router.get("", response_model=List[TaskResponse])
async def list_tasks(status: Optional[str] = Query(None, description="Filter by status (todo, in_progress, completed)")):
    tasks = db.get_all_tasks()
    if status:
        tasks = [t for t in tasks if t.get('status') == status]
    return tasks

@router.post("", response_model=TaskResponse, status_code=201)
async def create_task(task_in: TaskCreate):
    created = db.add_task(task_in.model_dump())
    return created

@router.get("/{task_id}", response_model=TaskResponse)
async def get_task(task_id: str):
    task = db.get_task(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.patch("/{task_id}", response_model=TaskResponse)
async def update_task(task_id: str, task_update: TaskUpdate):
    updated = db.update_task(task_id, task_update.model_dump(exclude_unset=True))
    if not updated:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated

@router.delete("/{task_id}", status_code=204)
async def delete_task(task_id: str):
    success = db.delete_task(task_id)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")
    return None
