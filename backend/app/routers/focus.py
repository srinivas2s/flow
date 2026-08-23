from fastapi import APIRouter, HTTPException
from app.models.schemas import FocusSessionStart, FocusSessionComplete, FocusSessionResponse
from app.services.store import db

router = APIRouter(prefix="/focus", tags=["Focus"])

@router.post("/start", response_model=FocusSessionResponse)
async def start_focus_session(req: FocusSessionStart):
    session = db.start_focus_session(req.task_id, req.duration_minutes)
    return session

@router.post("/complete", response_model=FocusSessionResponse)
async def complete_focus_session(req: FocusSessionComplete):
    session = db.complete_focus_session(req.session_id, req.actual_minutes)
    if not session:
        raise HTTPException(status_code=404, detail="Focus session not found")
    return session
