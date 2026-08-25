<div align="center">

  <img src="./docs/assets/banner.jpg" alt="FLOW - Focus, Logic, Orchestration & Workflow" width="100%" style="border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.4);" />

  <br/><br/>

  # FLOW
  ### **Focus · Logic · Orchestration · Workflow**

  <p align="center">
    <strong>An intelligent personal AI execution companion that turns scattered daily commitments into an adaptive plan and answers the ultimate question: <em>"What should I do right now?"</em></strong>
  </p>

  <p align="center">
    <a href="#the-flow-paradigm"><img src="https://img.shields.io/badge/Status-Active_MVP-06B6D4?style=for-the-badge" alt="Status" /></a>
    <a href="#technology-stack"><img src="https://img.shields.io/badge/Frontend-Next.js_15_%7C_React_19-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" /></a>
    <a href="#technology-stack"><img src="https://img.shields.io/badge/Styling-Tailwind_CSS_Neumorphism-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
    <a href="#technology-stack"><img src="https://img.shields.io/badge/Backend-FastAPI_%7C_Python_3.12-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" /></a>
    <a href="#technology-stack"><img src="https://img.shields.io/badge/Motion-Framer_Motion_12-FF0055?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" /></a>
    <a href="#license"><img src="https://img.shields.io/badge/License-MIT-A855F7?style=for-the-badge" alt="License" /></a>
  </p>

  <p align="center">
    <a href="#the-flow-paradigm">Paradigm</a> •
    <a href="#system-architecture">Architecture</a> •
    <a href="#core-features">Core Features</a> •
    <a href="#technology-stack">Tech Stack</a> •
    <a href="#neumorphic-design-system">Design System</a> •
    <a href="#quick-start-guide">Quick Start</a> •
    <a href="#backend-api-reference">API Specs</a> •
    <a href="#roadmap--phases">Roadmap</a>
  </p>

</div>

---

## The FLOW Paradigm

Most productivity apps fail because they are passive databases—to-do lists that grow indefinitely, calendars that require tedious micro-management, and generic chatbots that offer advice without context. 

**FLOW is fundamentally different.** It acts as an **active execution engine** built around cognitive load reduction and real-time contextual awareness.

<div align="center">

```
  CHAOS & OVERLOAD                    THE CRITICAL QUESTION                    CLARITY & ACTION
┌───────────────────┐               ┌────────────────────────┐               ┌───────────────────┐
│ • 14 Unread Tasks │               │                        │               │ [START NOW]       │
│ • Overdue Project │ ────────────> │ "What should I do      │ ────────────> │   Finish DBMS     │
│ • 3pm Meeting     │               │        right now?"     │               │   (35m Focus Box) │
│ • Cognitive Noise │               │                        │               │ • Auto Re-planned │
└───────────────────┘               └────────────────────────┘               └───────────────────┘
```

</div>

### The Continuous Execution Loop

```mermaid
flowchart LR
    A([1. Capture]) --> B([2. Understand])
    B --> C([3. Prioritize])
    C --> D([4. Adaptive Plan])
    D --> E([5. Act / Focus])
    E --> F([6. Learn & Context])
    F -->|Schedule Disruption| D
    F -->|New Input| A
    
    style A fill:#5B5CE2,stroke:#4C4DD1,stroke-width:2px,color:#fff
    style B fill:#7C7DFF,stroke:#5B5CE2,stroke-width:2px,color:#fff
    style C fill:#3B82F6,stroke:#2563EB,stroke-width:2px,color:#fff
    style D fill:#6366F1,stroke:#4F46E5,stroke-width:2px,color:#fff
    style E fill:#10B981,stroke:#059669,stroke-width:2px,color:#fff
    style F fill:#F59E0B,stroke:#D97706,stroke-width:2px,color:#fff
```

1. **Capture**: Enter raw, unstructured thoughts and commitments in natural language.
2. **Understand**: AI extracts task semantics, duration, dependencies, and cognitive weight.
3. **Prioritize**: Dynamically weighs deadlines, user energy levels, and scheduled commitments.
4. **Plan**: Assembles a feasible, non-overlapping timeline for the day.
5. **Act**: Enters distraction-free Focus Mode on the single most optimal task.
6. **Learn & Re-plan**: Recalculates dynamically when tasks run long or priorities shift.

---

## System Architecture

FLOW is structured with a decoupled, high-performance architecture separating the cinematic presentation and mobile-first app shell from the high-throughput AI orchestration backend.

### High-Level Architecture Diagram

```mermaid
graph TB
    subgraph Client["Frontend Client (Next.js 15 + React 19)"]
        Landing["Cinematic Storytelling Landing Page"]
        AppShell["Mobile-First Application Shell"]
        
        subgraph AppScreens["Application Screens"]
            HomeScreen["Home (Next Move & Summary)"]
            TaskScreen["Tasks (Prioritized Backlog)"]
            PlanScreen["Plan (Adaptive Timeline)"]
            BrainScreen["Brain (Context & Memory)"]
        end
        
        subgraph ModalsOverlays["Interactive Overlays"]
            FocusOverlay["Immersive Focus Mode"]
            CaptureModal["AI Natural Language Capture"]
            AssistantDrawer["Contextual AI Assistant"]
        end
        
        DesignSys["Modern Neumorphic Design System (Light/Dark Engine)"]
    end

    subgraph BackendGateway["FastAPI Gateway & Service Layer"]
        FastAPIApp["FastAPI REST Application (Python 3.12)"]
        CORS["CORS & Request Validation Middleware"]
        PydanticSchemas["Pydantic v2 Models & Schema Enforcers"]
    end

    subgraph CoreEngines["Core Intelligence Engines"]
        DecompEngine["NLP Task Decomposition Engine"]
        AdaptiveEngine["Dynamic Re-scheduling & Priority Engine"]
        FocusEngine["Session Metrics & Focus State Tracker"]
        MemoryEngine["Habit & Context Memory Store"]
    end

    subgraph DataStorage["Data & Persistence"]
        LocalCache["Client LocalStorage / Offline Cache"]
        BackendStore["Stateful In-Memory / Vector Persistence"]
    end

    %% Connections
    Landing --> AppShell
    AppShell --> AppScreens
    AppScreens --> ModalsOverlays
    AppScreens --> DesignSys
    
    AppShell <-->|REST / JSON Async| FastAPIApp
    FastAPIApp --> CORS
    CORS --> PydanticSchemas
    PydanticSchemas --> CoreEngines
    
    DecompEngine <--> BackendStore
    AdaptiveEngine <--> BackendStore
    MemoryEngine <--> BackendStore
    AppShell <--> LocalCache

    classDef clientStyle fill:#0F172A,stroke:#5B5CE2,stroke-width:2px,color:#F8FAFC;
    classDef serverStyle fill:#1E1B4B,stroke:#7C7DFF,stroke-width:2px,color:#F8FAFC;
    classDef engineStyle fill:#064E3B,stroke:#34D399,stroke-width:2px,color:#F8FAFC;
    classDef storeStyle fill:#312E81,stroke:#818CF8,stroke-width:2px,color:#F8FAFC;

    class Client,Landing,AppShell,HomeScreen,TaskScreen,PlanScreen,BrainScreen,FocusOverlay,CaptureModal,AssistantDrawer,DesignSys clientStyle;
    class BackendGateway,FastAPIApp,CORS,PydanticSchemas serverStyle;
    class CoreEngines,DecompEngine,AdaptiveEngine,FocusEngine,MemoryEngine engineStyle;
    class DataStorage,LocalCache,BackendStore storeStyle;
```

---

## Core Features

<table>
  <tr>
    <td width="50%">
      <h3 align="center">"What Should I Do Now?"</h3>
      <p>Eliminates decision fatigue with a prominent hero recommendation card explaining <strong>why</strong> a task was selected, estimated completion duration, and a 1-tap launch into deep focus.</p>
    </td>
    <td width="50%">
      <h3 align="center">Natural Language AI Capture</h3>
      <p>Accepts natural inputs like <em>"Finish DBMS introduction due tomorrow with 35 min estimated"</em>, parsing them into structured tasks with estimated time and priority tags.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3 align="center">Dynamic Adaptive Replanning</h3>
      <p>When unexpected disruptions occur, FLOW recalculates the remaining day's schedule automatically without guilt trips or broken streak penalties.</p>
    </td>
    <td width="50%">
      <h3 align="center">Distraction-Free Focus Mode</h3>
      <p>A full-screen ambient workspace with custom countdown timer, active sub-step breakdown, tactile controls, and celebration animations upon task completion.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3 align="center">Cognitive Memory & Brain</h3>
      <p>Stores personal productivity context (e.g., peak deep-work hours, recurring blockers, preferred work sprints) to continuously refine future scheduling.</p>
    </td>
    <td width="50%">
      <h3 align="center">Cinematic Storytelling Landing Page</h3>
      <p>An immersive, motion-rich narrative that visualizes the shift from fragmented chaos to unified execution clarity.</p>
    </td>
  </tr>
</table>

---

## Technology Stack

| Layer | Technology | Version | Purpose & Highlights |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | [Next.js](https://nextjs.org/) | `15.1.7` | App Router, Server/Client components, optimized builds |
| **UI Library** | [React](https://react.dev/) | `19.0.0` | Modern concurrent rendering, clean hooks architecture |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `5.7.3` | Full-stack end-to-end type safety and schema alignment |
| **Styling & Tokens** | [Tailwind CSS](https://tailwindcss.com/) | `3.4.17` | Utility-first styling with custom Neumorphic extension |
| **Animation Engine** | [Framer Motion](https://www.framer.com/motion/) | `12.4.7` | Physics-based spring animations, layout morphing & gestures |
| **Iconography** | [Lucide React](https://lucide.dev/) | `0.475.0` | Consistent, lightweight vector icon set |
| **Visual Effects** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) | `1.9.4` | Micro-reward particle bursts upon task completion |
| **Backend API** | [FastAPI](https://fastapi.tiangolo.com/) | `0.115+` | High-performance asynchronous REST API framework |
| **Data Validation** | [Pydantic](https://docs.pydantic.dev/) | `v2.x` | Strict type validation and JSON serialization |
| **ASGI Server** | [Uvicorn](https://www.uvicorn.org/) | `0.32+` | Lightning-fast ASGI web server for Python |
| **Runtime** | Node.js & Python | `Node 24+` / `Py 3.12` | Modern cross-platform runtime environments |

---

## Neumorphic Design System

FLOW employs a soft, tactile **Modern Neumorphic Design System** engineered specifically to look warm, organic, and calm rather than sterile or abrasive.

```
       LIGHT MODE SURFACE                      DARK MODE SURFACE
┌───────────────────────────────┐       ┌───────────────────────────────┐
│  Background: #F2F3F5          │       │  Background: #0D0E10          │
│  Surface:    #F7F8FA          │       │  Surface:    #15171A          │
│  Elevated:   #FFFFFF          │       │  Elevated:   #1B1E22          │
│  Accent:     #5B5CE2          │       │  Accent:     #7C7DFF          │
│  Shadow:     Soft Raised      │       │  Shadow:     Deep Inset/Night │
└───────────────────────────────┘       └───────────────────────────────┘
```

### Design Token Architecture

```css
/* Light Mode Variables */
:root {
  --flow-bg: #F2F3F5;
  --flow-surface: #F7F8FA;
  --flow-elevated: #FFFFFF;
  --flow-text-primary: #17181A;
  --flow-text-secondary: #6B7078;
  --flow-accent: #5B5CE2;
  --neu-shadow-raised: 6px 6px 14px rgba(188, 196, 210, 0.45), -6px -6px 14px rgba(255, 255, 255, 0.95);
  --neu-shadow-pressed: inset 3px 3px 6px rgba(188, 196, 210, 0.45), inset -3px -3px 6px rgba(255, 255, 255, 0.95);
}

/* Dark Mode Variables (.dark) */
.dark {
  --flow-bg: #0D0E10;
  --flow-surface: #15171A;
  --flow-elevated: #1B1E22;
  --flow-text-primary: #F5F5F5;
  --flow-text-secondary: #9A9FA8;
  --flow-accent: #7C7DFF;
  --neu-shadow-raised: 6px 6px 16px rgba(0, 0, 0, 0.65), -5px -5px 14px rgba(255, 255, 255, 0.028);
  --neu-shadow-pressed: inset 3px 3px 7px rgba(0, 0, 0, 0.75), inset -2px -2px 6px rgba(255, 255, 255, 0.025);
}
```

---

## Repository Anatomy

```text
flow/
├── IMPLEMENTATION_PLAN.md       # Multi-phase execution roadmap & task checklist
├── README.md                    # Project manifesto, architecture & setup guide
├── .gitignore                   # Production ignore rules
│
├── docs/                        # Project documentation & visual assets
│   └── assets/                  # Brand artwork, logo, diagrams & mockups
│       ├── banner.jpg           # FLOW official project banner
│       └── logo.jpg             # FLOW glassmorphic app icon
│
├── frontend/                    # Next.js 15 Web Application
│   ├── src/
│   │   ├── app/                 # Next.js App Router
│   │   │   ├── layout.tsx       # Root HTML layout, theme provider & font injection
│   │   │   ├── page.tsx         # Cinematic interactive landing page (Scenes 01-08)
│   │   │   ├── globals.css      # Neumorphic tokens, custom shadows & animations
│   │   │   └── app/             # Core Product Experience
│   │   │       ├── page.tsx     # Main application shell (Home, Tasks, Plan, Brain)
│   │   │       └── ...
│   │   ├── components/          # Component Architecture
│   │   │   ├── ui/              # Neumorphic buttons, cards, pills, inputs & badges
│   │   │   ├── landing/         # Storytelling sections (Chaos, AI Reveal, Focus Demo)
│   │   │   ├── app/             # HomeView, TaskList, PlanTimeline, FocusModal, BrainView
│   │   │   └── theme/           # ThemeContext & ThemeSwitcher
│   │   ├── lib/                 # API client, fallback mock dataset & utils
│   │   └── types/               # Task, Schedule, FocusSession & Memory interfaces
│   ├── tailwind.config.ts       # Custom Tailwind palette & Neumorphic box-shadows
│   ├── tsconfig.json            # Strict TypeScript compiler options
│   └── package.json             # Frontend dependencies & npm scripts
│
└── backend/                     # FastAPI Python Service
    ├── app/
    │   ├── main.py              # FastAPI initialization, CORS & endpoint routers
    │   ├── models/              # Pydantic schemas (Task, Plan, Recommendation, Memory)
    │   ├── services/            # Adaptive scheduling & natural language decomposition logic
    │   └── routers/             # Tasks, Plan, Focus, AI and Memory API endpoints
    └── requirements.txt         # Python dependencies (fastapi, uvicorn, pydantic)
```

---

## Backend API Reference

The backend provides a clean RESTful interface for task orchestration, intelligent replanning, and focus tracking.

| Method | Endpoint | Description | Request Body / Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Healthcheck & system status | *None* |
| `GET` | `/api/tasks` | Fetch all user tasks & status | `?status=all\|todo\|completed` |
| `POST` | `/api/tasks` | Create a new task manually | `TaskCreate` schema |
| `PATCH` | `/api/tasks/{id}` | Update task status or details | `TaskUpdate` schema |
| `DELETE` | `/api/tasks/{id}` | Remove a task | *None* |
| `GET` | `/api/plan` | Fetch structured adaptive daily timeline | *None* |
| `POST` | `/api/plan/recalculate` | Trigger recalculation after schedule change | `{"disrupted_task_id": "t1"}` |
| `POST` | `/api/ai/recommend` | Compute optimal "What should I do now?" | *None* |
| `POST` | `/api/focus/start` | Initialize a distraction-free focus session | `{"task_id": "t1", "duration_minutes": 25}` |
| `POST` | `/api/focus/complete` | Record completed focus session & stats | `{"session_id": "s1"}` |
| `GET` | `/api/memories` | Retrieve stored productivity context & habits | *None* |

---

## Quick Start Guide

### Prerequisites
* **Node.js**: v18.18+ or v20+ / v24+
* **npm**: v9+ (or `pnpm` / `bun`)
* **Python**: v3.10+ or v3.12+

### 1. Clone & Setup Workspace

```bash
git clone https://github.com/srinivas2s/flow.git
cd flow
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
> The frontend application will be live at `http://localhost:3000`.

### 3. Backend Setup

```bash
cd backend
python -m venv venv

# On Windows:
.\venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
> The API server will be live at `http://localhost:8000` (Interactive Swagger Docs at `http://localhost:8000/docs`).

---

## Roadmap & Phases

- [x] **Phase 1 - Foundation**: Next.js 15, TypeScript, Tailwind config & design tokens.
- [x] **Phase 2 - Design System**: Modern Neumorphic tokens, dual light/dark palettes, motion utilities.
- [ ] **Phase 3 - Cinematic Landing Page**: 8 narrative scroll scenes showcasing the transformation from chaos to clarity.
- [ ] **Phase 4 - Mobile-First App Shell**: Home, Tasks, Plan, Brain, Focus Mode & AI Assistant drawer.
- [ ] **Phase 5 - FastAPI Intelligence Service**: NLP decomposition, adaptive replanner & focus tracker endpoints.
- [ ] **Phase 6 - Full Integration**: Wire frontend reactive state to FastAPI endpoints with offline fallback.
- [ ] **Phase 7 - Polish & Accessibility**: Fluid responsiveness, reduced-motion preferences & tactile visual cues.
- [ ] **Phase 8 - Final Production QA**: End-to-end user testing and production verification.

---

## License

Distributed under the **MIT License**.

<div align="center">
  <br/>
  <img src="./docs/assets/logo.jpg" alt="FLOW Icon" width="64" style="border-radius: 12px;" />
  <br/>
  <strong>FLOW — Focus, Logic, Orchestration & Workflow</strong><br/>
  <sub>Designed with precision for human cognitive clarity.</sub>
</div>
