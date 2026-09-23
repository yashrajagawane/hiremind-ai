# 🚀 HireMind AI — Complete Upgradation Plan

> **Author:** Yashraj Agawane
> **Created:** September 2026
> **Status:** In Progress
> **Repo:** [hiremind-ai](https://github.com/yashrajagawane/HireMind-AI)

---

## 🐛 BUGS FOUND (Deep Code Audit)

Before building, we fix everything. Here's every bug found across the codebase:

---

### 🔴 CRITICAL BUGS

| # | File | Bug | Impact |
|---|------|-----|--------|
| 1 | `backend/app/routes/resume.py` | `LAST_RESUME_TEXT` and `LAST_CAREER_ANALYTICS` are **global in-memory variables**. In a multi-user or restarted server scenario, one user's resume overwrites another's. **No user isolation at all.** | Data leak between users |
| 2 | `backend/app/routes/auth.py` | `db = SessionLocal()` is called but **never closed** — connection leaks on every login/signup | Server crash under load |
| 3 | `backend/app/services/security.py` | `SECRET_KEY = "hiremind_secret_key"` is **hardcoded** — anyone with source code access can forge JWT tokens | Security vulnerability |
| 4 | `backend/app/models/user.py` | `Base.metadata.create_all(bind=engine)` is called **twice** — once in `user.py` and once in `main.py` | DB init issue |
| 5 | `backend/app/services/gemini_career_analytics.py` | `load_dotenv()` is **missing** — `GEMINI_API_KEY` will be None in production | API key not loaded |
| 6 | `backend/app/services/gemini_interview_prep.py` | Same — `load_dotenv()` is **missing** | API key not loaded |
| 7 | `backend/app/services/gemini_career_match.py` | Same — `load_dotenv()` is **missing** | API key not loaded |

---

### 🟡 MEDIUM BUGS

| # | File | Bug | Impact |
|---|------|-----|--------|
| 8 | `backend/app/routes/resume.py` | Error endpoints return `{"error": "..."}` with **HTTP 200** instead of proper 400/422 | Bad API contract |
| 9 | `backend/app/services/ats_analyzer.py` | `analyze_resume()` is **never called** in any route — dead code | Dead code confusion |
| 10 | `backend/app/services/ai_insights.py` | `generate_ai_insights()` is also **never called** — dead code | Dead code confusion |
| 11 | `backend/app/services/groq_resume_review.py` | Defines `generate_resume_review()` but the route uses the Gemini version — **Groq version is unreachable** | Unreachable code |
| 12 | `backend/main.py` | `allow_origins=["*"]` with `allow_credentials=True` — browsers **block this combination** | CORS failure |
| 13 | `backend/app/utils/nlp_engine.py` | `extract_education()` keyword "engineering" will match job experience sentences, not just education sections | Wrong education data |

---

### 🟢 MINOR BUGS / CODE QUALITY

| # | File | Bug |
|---|------|-----|
| 14 | `backend/app/routes/resume.py` | `resume_text[:1500]` — arbitrary truncation, may cut off mid-word |
| 15 | `backend/app/services/ai_insights.py` | `detect_domain()` checks "react" twice — Full Stack branch can never trigger |
| 16 | All Gemini service files | JSON cleaning only strips backtick blocks — Gemini sometimes outputs other prefixes |
| 17 | `backend/app/routes/resume.py` | No file type validation — user can upload `.exe`, `.sh`, any file |
| 18 | `backend/app/services/resume_parser.py` | No error handling for corrupted or password-protected PDFs |
| 19 | `backend/main.py` | No rate limiting — AI endpoints can drain API quota in seconds |

---

---

## 📋 UPGRADE PHASES

**Total Phases: 6**
Each phase ends with: `git add . && git commit && git push` ✅

---

## PHASE 1 — 🔧 Bug Fixes & Security Hardening
> **Goal:** Fix all critical and medium bugs. No new features — solid foundation first.
> **Commit Message:** `fix: critical bug fixes - session leaks, JWT security, CORS, dead code cleanup`

### Tasks:

#### 1.1 — Fix DB Session Leaks (auth.py)
- Replace raw `SessionLocal()` with FastAPI `Depends(get_db)` pattern
- Create a `get_db()` generator in `database/db.py` that auto-closes sessions

#### 1.2 — Move JWT Secret to Environment Variable (security.py)
- Remove `SECRET_KEY = "hiremind_secret_key"`
- Replace with `SECRET_KEY = os.getenv("SECRET_KEY", "fallback_dev_key")`
- Add `SECRET_KEY` to `.env` and `.env.example`

#### 1.3 — Add `load_dotenv()` to All Gemini Services
- `gemini_career_analytics.py` → add `from dotenv import load_dotenv` + `load_dotenv()`
- `gemini_interview_prep.py` → same fix
- `gemini_career_match.py` → same fix

#### 1.4 — Fix CORS Configuration (main.py)
- Change `allow_origins=["*"]` to use env var: `allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:3000")]`
- This properly allows credentials with specific origins

#### 1.5 — Fix Error Response HTTP Status Codes (resume.py)
- Replace all `return {"error": "..."}` with `raise HTTPException(status_code=400, detail="...")`
- Apply to: `ai_job_match`, `career_match`, `interview_prep`, `career_analytics`

#### 1.6 — Add File Type Validation on Upload (resume.py)
- Validate `file.content_type` is PDF or DOCX
- Return HTTP 400 if unsupported file type

#### 1.7 — Fix Duplicate `create_all` Call
- Remove `Base.metadata.create_all(bind=engine)` from `user.py`
- Keep it only in `main.py`

#### 1.8 — Add Error Handling to Resume Parser
- Wrap PDF/DOCX parsing in try/except
- Return HTTP 500 with a readable message on failure

#### 1.9 — Remove / Document Dead Code
- Mark `ats_analyzer.py` and `ai_insights.py` as unused with clear comments
- Fix `detect_domain()` Full Stack branch ordering

---

## PHASE 2 — 🏗️ Backend Architecture Overhaul
> **Goal:** Solve the #1 critical bug — per-user data isolation.
> **Commit Message:** `refactor: replace global state with proper per-request data flow and Pydantic schemas`

### Tasks:

#### 2.1 — Replace Global State with Request-Based Data Flow
**Problem:** `LAST_RESUME_TEXT` is a global Python variable shared across ALL users.
**Solution:** Pass `resume_text` directly in the request body for all AI endpoints.
- Frontend stores resume text in `localStorage` after upload
- Each AI endpoint receives `resume_text` in its request body

#### 2.2 — Create Pydantic Request/Response Schemas
- Create `backend/app/schemas/resume_schema.py`
- Define typed models for:
  - `ResumeUploadResponse`
  - `JobMatchRequest` (includes resume_text + job_description)
  - `CareerMatchRequest` (includes resume_text + target_role + experience_level)
  - `InterviewPrepRequest`

#### 2.3 — Add FastAPI DB Dependency Injection
- Create `get_db()` generator in `database/db.py`
- Use `db: Session = Depends(get_db)` in all route functions

#### 2.4 — Add JWT Auth Middleware
- Create `backend/app/middleware/auth_middleware.py`
- Add `get_current_user()` dependency to protect all `/resume/*` routes
- Extract user identity from token for future per-user features

---

## PHASE 3 — ✨ New Feature: Resume History & User Dashboard
> **Goal:** Users see their past resume analyses — not just the current one.
> **Commit Message:** `feat: resume history - save and retrieve past analyses per user`

### Tasks:

#### 3.1 — Create Resume History DB Model (Backend)
- Create `backend/app/models/resume_history.py`
- Fields: `id`, `user_id (FK)`, `filename`, `ats_score`, `career_domain`, `skills_found (JSON)`, `analysis_json (JSON)`, `created_at (timestamp)`

#### 3.2 — Save Analysis to DB on Upload
- After `/resume/upload` runs successfully, save full results to `ResumeHistory` table
- Link to authenticated user via JWT

#### 3.3 — New API Endpoints
- `GET /resume/history` → list all past analyses for the logged-in user
- `GET /resume/history/{id}` → full analysis for a specific resume
- `DELETE /resume/history/{id}` → delete a specific history entry

#### 3.4 — Frontend: Resume History Page
- Add "History" tab to Resume Review page
- Show list of past uploads with ATS score, date, filename
- Click any past entry → view its full results in the UI
- Delete button for each history item

---

## PHASE 4 — 🎯 New Feature: AI Resume Improvement Suggestions Panel
> **Goal:** Help users improve their resume in real-time with specific rewrites.
> **Commit Message:** `feat: ai resume improvement suggestions panel with actionable rewrites`

### Tasks:

#### 4.1 — New Backend Service: `gemini_resume_improver.py`
- Gemini prompt that returns specific, actionable rewrites
- Output JSON format:
```json
{
  "action_items": [
    {
      "section": "Experience",
      "original": "Worked on a project",
      "improved": "Built sentiment analysis model achieving 93% accuracy using BERT"
    }
  ],
  "missing_sections": ["Certifications", "GitHub Links"],
  "keyword_additions": ["Docker", "CI/CD", "System Design"],
  "format_tips": ["Add bullet points", "Quantify achievements"]
}
```

#### 4.2 — New Route: `POST /resume/improve`
- Accepts `resume_text` in body
- Returns improvement suggestions from Gemini

#### 4.3 — Frontend: Suggestions Panel
- New "AI Suggestions" section in Resume Review page
- "Before → After" style action items in cards
- Missing sections shown as red warning chips
- Keyword additions shown as blue chips
- Each suggestion has a "Copy" button

---

## PHASE 5 — 📊 New Feature: Salary Intelligence & Market Insights
> **Goal:** Give users a realistic salary range based on skills + role + location.
> **Commit Message:** `feat: salary intelligence and market insights feature`

### Tasks:

#### 5.1 — New Backend Service: `gemini_salary_intel.py`
- Gemini provides salary data based on:
  - Detected skills from resume
  - Target role (user-provided)
  - Experience level
  - Location (India default, expandable)
- Output JSON:
```json
{
  "role": "ML Engineer",
  "experience_level": "Fresher",
  "salary_range": {
    "min": "6 LPA",
    "mid": "8 LPA",
    "max": "12 LPA"
  },
  "top_companies_hiring": ["Google", "Microsoft", "Swiggy"],
  "in_demand_skills": ["PyTorch", "MLOps", "LangChain"],
  "market_trend": "Growing - 23% YoY demand increase",
  "remote_available": true
}
```

#### 5.2 — New Route: `POST /resume/salary-intel`
- Takes `target_role`, `experience_level`, `resume_text`
- Returns salary intelligence

#### 5.3 — Frontend: Salary Intelligence Card
- Add "Market Insights" section to Career Analytics page
- Salary range as a beautiful visual range bar
- Top companies as logo chips
- In-demand skills as a trending tag cloud

---

## PHASE 6 — 🌐 Production Polish & Performance
> **Goal:** Make the app production-ready with rate limiting, caching, error boundaries.
> **Commit Message:** `feat: production hardening - rate limiting, caching, error boundaries, env cleanup`

### Tasks:

#### 6.1 — Add Rate Limiting (Backend)
- Install `slowapi` library
- 10 requests/minute per IP on AI endpoints
- Return HTTP 429 with `Retry-After` header on exceeded limit

#### 6.2 — Add Response Caching for Career Analytics
- Hash `resume_text` as a cache key
- Skip Gemini re-call if same resume analyzed within 1 hour
- Use `functools.lru_cache` or Redis for production

#### 6.3 — Add Global Error Boundary (Frontend)
- Create `components/ErrorBoundary.tsx`
- Wrap all pages with it
- Show friendly "Something went wrong" UI instead of blank crash

#### 6.4 — Improve Loading UX (Frontend)
- Skeleton loaders for every AI result section
- Animated progress bar during resume upload + analysis
- Toast notifications for success/error states

#### 6.5 — Environment Variable Audit
- Create `backend/.env.example` with all variables documented
- Create `frontend/.env.example`
- Add startup check that fails fast if required env vars are missing

#### 6.6 — Update `.gitignore`
- Add `backend/uploads/` so uploaded resumes are never committed
- Add `*.pdf`, `*.docx` to be safe

#### 6.7 — Update README with new features
- Document all new endpoints
- Update architecture diagram
- Add screenshots of new features

---

## 📅 Phase Summary Table

| Phase | Focus | Key Deliverable | Commit Message |
|-------|-------|-----------------|----------------|
| **1** | Bug Fixes & Security | Secure, leak-free backend | `fix: critical bug fixes` |
| **2** | Architecture Refactor | Per-user data isolation, Pydantic schemas | `refactor: proper session handling` |
| **3** | Resume History | Save & retrieve past analyses | `feat: resume history` |
| **4** | AI Suggestions Panel | Actionable resume improvement UI | `feat: ai suggestions panel` |
| **5** | Salary Intelligence | Market insights & salary data | `feat: salary intelligence` |
| **6** | Production Polish | Rate limiting, caching, error UX | `feat: production hardening` |

---

## ✅ Progress Tracker

- [x] Phase 1 — Bug Fixes & Security Hardening ✅ Completed September 2026
- [x] Phase 2 — Backend Architecture Overhaul ✅ Completed September 2026
- [x] Phase 3 — Resume History Feature ✅ Completed September 2026
- [x] Phase 4 — AI Suggestions Panel ✅ Completed September 2026
- [ ] Phase 5 — Salary Intelligence Feature
- [ ] Phase 6 — Production Polish

---

> 🚀 **One Phase at a Time. Commit and Push after each. Let's build.**
