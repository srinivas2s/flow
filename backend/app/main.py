from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import tasks, plan, ai, focus, memories

app = FastAPI(
    title="FLOW API",
    description="Backend AI execution companion and adaptive planning service for FLOW",
    version="1.0.0",
)

# Enable CORS for Next.js development and production origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers under /api prefix
app.include_router(tasks.router, prefix="/api")
app.include_router(plan.router, prefix="/api")
app.include_router(ai.router, prefix="/api")
app.include_router(focus.router, prefix="/api")
app.include_router(memories.router, prefix="/api")

@app.get("/api/health", tags=["Health"])
async def healthcheck():
    return {
        "status": "healthy",
        "service": "FLOW Engine",
        "version": "1.0.0",
        "description": "Focus, Logic, Orchestration & Workflow active",
    }
