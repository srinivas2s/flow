from fastapi import APIRouter
from typing import List
from app.models.schemas import MemoryResponse, MemoryCreate
from app.services.store import db

router = APIRouter(prefix="/memories", tags=["Memories"])

@router.get("", response_model=List[MemoryResponse])
async def list_memories():
    return db.get_memories()

@router.post("", response_model=MemoryResponse, status_code=201)
async def create_memory(mem_in: MemoryCreate):
    created = db.add_memory(mem_in.model_dump())
    return created
