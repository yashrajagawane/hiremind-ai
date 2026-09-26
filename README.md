<div align="center">

<div align="center">

```
██╗  ██╗██╗██████╗ ███████╗███╗   ███╗██╗███╗   ██╗██████╗       █████╗ ██╗
██║  ██║██║██╔══██╗██╔════╝████╗ ████║██║████╗  ██║██╔══██╗     ██╔══██╗██║
███████║██║██████╔╝█████╗  ██╔████╔██║██║██╔██╗ ██║██║  ██║     ███████║██║
██╔══██║██║██╔══██╗██╔══╝  ██║╚██╔╝██║██║██║╚██╗██║██║  ██║     ██╔══██║██║
██║  ██║██║██║  ██║███████╗██║ ╚═╝ ██║██║██║ ╚████║██████╔╝     ██║  ██║██║
╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═════╝      ╚═╝  ╚═╝╚═╝
```
</div>


### AI-Powered Resume Intelligence Platform

<p>
Resume Analysis · ATS Scoring · Job Matching · Career Analytics · Interview Prep · Salary Intelligence
</p>

<br>

<a href="https://hiremind-ai-seven.vercel.app">
<img src="https://img.shields.io/badge/🚀_Live_Demo-hiremind--ai.vercel.app-8B5CF6?style=for-the-badge&logoColor=white"/>
</a>

<br><br>

<img src="https://img.shields.io/badge/Next.js_16-000?style=flat-square&logo=nextdotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white"/>
<img src="https://img.shields.io/badge/Python_3.12-3776AB?style=flat-square&logo=python&logoColor=white"/>
<img src="https://img.shields.io/badge/Gemini_2.5_Flash-4285F4?style=flat-square&logo=google&logoColor=white"/>
<img src="https://img.shields.io/badge/Groq_·_Llama_3.1-F55036?style=flat-square&logoColor=white"/>
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white"/>
<img src="https://img.shields.io/badge/License-MIT-green?style=flat-square"/>

</div>

<br>

---

<a id="top"></a>

> **HireMind AI** is a full-stack platform that transforms how candidates prepare for careers — combining resume intelligence, ATS compatibility scoring, AI-powered job matching, career analytics, interview preparation, and salary insights into a single, authenticated workspace.

<br>

## Table of Contents

- [Product Showcase](#showcase)
- [Features](#features)
- [System Architecture](#architecture)
- [AI Pipeline](#ai-pipeline)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

<a id="showcase"></a>

## Product Showcase

<div align="center">
<img src="./assets/previews/landing-page.png" width="100%"/>
<br><br>
</div>

<table>
<tr>
<td width="50%">

**📄 AI Resume Review**

Deep resume analysis powered by Gemini 2.5 Flash — extracts strengths, weaknesses, career fit roles, and actionable recommendations.

<img src="./assets/previews/ai-resume-review.png" width="100%"/>

</td>
<td width="50%">

**🎯 AI Job Matching**

Paste any job description and get an instant ATS compatibility score, matched/missing skills breakdown, and role-fit assessment via Groq (Llama 3.1).

<img src="./assets/previews/job-match.png" width="100%"/>

</td>
</tr>
<tr>
<td width="50%">

**📊 Career Analytics**

Comprehensive career readiness evaluation — industry alignment, skill depth analysis, growth trajectory, and predictive career insights.

<img src="./assets/previews/ca.png" width="100%"/>

</td>
<td width="50%">

**🎤 Interview Preparation**

AI-generated interview questions and preparation strategies tailored to your resume, target role, and experience level.

<img src="./assets/previews/IP.png" width="100%"/>

</td>
</tr>
</table>

<div align="right">

[↑ Back to Top](#top)

</div>

---

<a id="features"></a>

## Features

| Module | What It Does | AI Engine |
|---|---|---|
| **Resume Upload & Parse** | Extracts text from PDF/DOCX, runs NLP to pull email, phone, education, experience, projects, certifications, and skills | spaCy `en_core_web_sm` + regex |
| **ATS Score Checker** | Evaluates resume against ATS criteria — scores technical skills, projects, certifications, experience, and industry readiness | Groq · Llama 3.1 8B |
| **AI Resume Review** | Professional recruiter-style review with strengths, weaknesses, recommendations, and career-fit roles | Gemini 2.5 Flash |
| **AI Job Match** | Compares resume against a job description — returns ATS score, matched/missing skills, candidate level, and recommendation | Groq · Llama 3.1 8B |
| **Career Match** | Evaluates resume fit for a target role and experience level — returns match score, hiring probability, and alternative roles | Gemini 2.5 Flash |
| **Career Analytics** | Full career readiness assessment with industry alignment, skill depth, and growth analysis | Gemini 2.5 Flash |
| **Interview Prep** | Generates role-specific interview questions, weak area detection, confidence scoring, and preparation strategies | Gemini 2.5 Flash |
| **AI Suggestions** | AI-powered section rewriting — select any part of your resume and get an optimized version | Gemini 2.5 Flash |
| **Salary Intelligence** | Market salary data, demand trends, top hiring industries, negotiation tips, and premium-pay skills for any role/location | Gemini 2.5 Flash |
| **Resume History** | Persistent storage of all uploaded resumes and their analysis data, tied to authenticated user accounts | PostgreSQL |

<div align="right">

[↑ Back to Top](#top)

</div>

---

<a id="architecture"></a>

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      Client (Browser)                           │
│                                                                 │
│   Next.js 16  ·  React 19  ·  TypeScript  ·  Tailwind CSS v4   │
│   Pages: Dashboard · Resume Review · Job Match · Career Match   │
│   Career Analytics · Interview Prep · AI Suggestions            │
│   Salary Insights · Resume History · Settings                   │
│                                                                 │
│   Auth: JWT token stored client-side → sent as Bearer header    │
│   Deployment: Vercel (auto-deploy from GitHub)                  │
└──────────────────────────────┬──────────────────────────────────┘
                               │  REST API (Axios)
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                     FastAPI Backend                              │
│                                                                 │
│   Middleware: CORS · SlowAPI Rate Limiting · JWT Auth            │
│   Routes:    /auth/*  ·  /resume/*                              │
│   Security:  bcrypt password hashing · HS256 JWT tokens         │
│                                                                 │
│   Deployment: Render (Python 3.12, uvicorn)                     │
└───────┬──────────────────┬──────────────────┬───────────────────┘
        │                  │                  │
        ▼                  ▼                  ▼
┌──────────────┐  ┌────────────────┐  ┌───────────────────┐
│   NLP Layer  │  │   AI Engines   │  │    Database        │
│              │  │                │  │                    │
│  spaCy NLP   │  │  Gemini 2.5    │  │   PostgreSQL       │
│  Regex       │  │  Flash         │  │   (SQLAlchemy ORM) │
│  Skills DB   │  │                │  │                    │
│  PyPDF2      │  │  Groq API      │  │   Tables:          │
│  python-docx │  │  (Llama 3.1    │  │   · users          │
│              │  │   8B Instant)  │  │   · resume_history │
└──────────────┘  └────────────────┘  └───────────────────┘
```

<div align="right">

[↑ Back to Top](#top)

</div>

---

<a id="ai-pipeline"></a>

## AI Pipeline

The backend processes each resume through a multi-stage pipeline:

```
 📤  Upload (PDF / DOCX)
      │
      ▼
 📑  Resume Parser ─────────────────── PyPDF2 / python-docx
      │
      ▼
 🧹  Text Cleaning ─────────────────── Regex normalization
      │
      ▼
 🧠  NLP Extraction ────────────────── spaCy (en_core_web_sm)
      │  Extracts: email, phone, education,
      │  experience, projects, certifications
      │
      ▼
 🔧  Skill Matching ────────────────── 40+ skill keyword database
      │
      ▼
 🤖  AI ATS Analysis ───────────────── Groq · Llama 3.1 8B Instant
      │  Returns: ATS score, career domain,
      │  summary, strengths, weaknesses,
      │  recommendations
      │
      ▼
 💾  Persist to Database ───────────── PostgreSQL (resume_history)
      │
      ▼
 📊  Response to Client ────────────── Structured JSON
```

**Post-upload AI features** (on-demand, rate-limited):

| Feature | Model | Input |
|---|---|---|
| Resume Review | Gemini 2.5 Flash | resume text |
| Career Match | Gemini 2.5 Flash | resume text + target role + experience level |
| Interview Prep | Gemini 2.5 Flash | resume text + target role + experience level |
| Career Analytics | Gemini 2.5 Flash | resume text |
| AI Suggestions | Gemini 2.5 Flash | resume text + section + text to rewrite |
| Salary Intelligence | Gemini 2.5 Flash | target role + experience level + location |
| Job Match (vs JD) | Groq · Llama 3.1 8B | resume text + job description |

> **Caching**: Repeated AI requests with identical inputs are served from an in-memory TTL cache (1-hour TTL, 500 max entries) to reduce API costs and latency.

<div align="right">

[↑ Back to Top](#top)

</div>

---

<a id="tech-stack"></a>

## Tech Stack

| Layer | Technology | Details |
|---|---|---|
| **Frontend** | Next.js 16, React 19, TypeScript | App Router, SSR-capable pages |
| **Styling** | Tailwind CSS v4 | PostCSS integration |
| **HTTP Client** | Axios | API communication with Bearer auth |
| **PDF Export** | jsPDF | Client-side PDF generation |
| **Icons** | Lucide React | Consistent icon system |
| **Backend** | FastAPI, Python 3.12 | Async-ready REST API |
| **Database** | PostgreSQL, SQLAlchemy | Users + resume history persistence |
| **Auth** | JWT (HS256), bcrypt | Token-based auth with hashed passwords |
| **NLP** | spaCy (`en_core_web_sm`) | Entity extraction, text processing |
| **Resume Parsing** | PyPDF2, python-docx | PDF and DOCX text extraction |
| **AI — Primary** | Google Gemini 2.5 Flash | Resume review, career match, interview prep, analytics, rewriting, salary |
| **AI — Secondary** | Groq (Llama 3.1 8B Instant) | ATS scoring, job description analysis |
| **Rate Limiting** | SlowAPI | Per-IP limits (5/min uploads, 10/min AI, 30/min default) |
| **Caching** | cachetools (TTLCache) | In-memory response cache for AI endpoints |
| **Frontend Hosting** | Vercel | Auto-deploy from GitHub |
| **Backend Hosting** | Render | Python web service, auto-deploy |

<div align="right">

[↑ Back to Top](#top)

</div>

---

<a id="project-structure"></a>

## Project Structure

<details>
<summary><b>Frontend — Next.js 16</b></summary>

```
frontend/
├── src/
│   ├── app/
│   │   ├── (main)/                 # Authenticated layout group
│   │   │   ├── dashboard/
│   │   │   ├── resume-review/
│   │   │   ├── ai-job-match/
│   │   │   ├── ai-interview/
│   │   │   ├── career-analytics/
│   │   │   ├── resume-history/
│   │   │   ├── ai-suggestions/
│   │   │   ├── salary-insights/
│   │   │   ├── settings/
│   │   │   └── layout.tsx          # Sidebar + Topbar wrapper
│   │   ├── auth/                   # Auth page
│   │   ├── login/                  # Login page
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Landing / redirect
│   │   └── globals.css
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── Topbar.tsx
│   │   ├── Navbar.tsx
│   │   ├── AuthCard.tsx
│   │   ├── ResumeUpload.tsx
│   │   ├── ResumeReviewUpload.tsx
│   │   ├── CareerMatchForm.tsx
│   │   ├── CareerAnalytics.tsx
│   │   ├── InterviewPrep.tsx
│   │   ├── SettingsPage.tsx
│   │   └── StatCard.tsx
│   └── services/
│       ├── authService.ts          # Login / signup API calls
│       └── resumeService.ts        # All resume API calls
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── eslint.config.mjs
```

</details>

<details>
<summary><b>Backend — FastAPI</b></summary>

```
backend/
├── main.py                         # App entry, CORS, rate limiting, error handlers
├── app/
│   ├── routes/
│   │   ├── auth.py                 # POST /auth/signup, /auth/login
│   │   └── resume.py              # All /resume/* endpoints (9 routes)
│   ├── services/
│   │   ├── gemini_resume_review.py
│   │   ├── gemini_career_match.py
│   │   ├── gemini_career_analytics.py
│   │   ├── gemini_interview_prep.py
│   │   ├── gemini_resume_rewrite.py
│   │   ├── gemini_salary_intelligence.py
│   │   ├── groq_ats.py
│   │   ├── groq_jd_analyzer.py
│   │   ├── groq_resume_review.py
│   │   ├── ai_insights.py
│   │   ├── ats_analyzer.py
│   │   ├── resume_parser.py        # PDF + DOCX text extraction
│   │   └── security.py            # bcrypt + JWT
│   ├── utils/
│   │   ├── nlp_engine.py           # spaCy NLP extractions
│   │   ├── skills.py              # Skills keyword matching
│   │   └── cache.py               # TTLCache decorator
│   ├── models/
│   │   ├── user.py
│   │   └── resume_history.py
│   ├── schemas/
│   │   ├── user_schema.py
│   │   └── resume_schema.py
│   ├── database/
│   │   └── db.py                   # SQLAlchemy engine + session
│   └── middleware/
│       └── auth_middleware.py      # JWT token verification
├── requirements.txt
├── runtime.txt                     # Python 3.12.10
└── .env.example
```

</details>

<div align="right">

[↑ Back to Top](#top)

</div>

---

<a id="getting-started"></a>

## Getting Started

### Prerequisites

- **Node.js** v18+ (npm)
- **Python** 3.10+
- **PostgreSQL** database
- **Google Gemini API key** — [Get one here](https://aistudio.google.com/app/apikey)
- **Groq API key** — [Get one here](https://console.groq.com/keys)

### 1. Clone

```bash
git clone https://github.com/yashrajagawane/HireMind-AI.git
cd HireMind-AI
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m spacy download en_core_web_sm
```

Create `backend/.env`:

```env
DATABASE_URL=postgresql://user:password@host:port/dbname
GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key
SECRET_KEY=your_strong_random_secret   # python -c "import secrets; print(secrets.token_hex(32))"
FRONTEND_URL=http://localhost:3000
```

Start the API server:

```bash
uvicorn main:app --reload
```

> Backend runs at `http://localhost:8000` — API docs at `/docs`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Start the dev server:

```bash
npm run dev
```

> Frontend runs at `http://localhost:3000`

<div align="right">

[↑ Back to Top](#top)

</div>

---

<a id="api-endpoints"></a>

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/auth/signup` | Create new user account | — |
| `POST` | `/auth/login` | Login, returns JWT | — |

### Resume Intelligence

| Method | Endpoint | Description | Rate Limit | Auth |
|---|---|---|---|---|
| `POST` | `/resume/upload` | Upload & analyze resume (PDF/DOCX) | 5/min | ✅ |
| `GET` | `/resume/history` | Get user's resume history | — | ✅ |
| `POST` | `/resume/resume-review` | AI resume review | 10/min | ✅ |
| `POST` | `/resume/ai-job-match` | Match resume vs job description | 10/min | ✅ |
| `POST` | `/resume/career-match` | Career fit analysis for target role | 10/min | ✅ |
| `POST` | `/resume/career-analytics` | Full career readiness analysis | 10/min | ✅ |
| `POST` | `/resume/interview-prep` | Interview preparation guide | 10/min | ✅ |
| `POST` | `/resume/rewrite` | AI-powered section rewriting | 10/min | ✅ |
| `POST` | `/resume/salary-insights` | Salary intelligence for role/location | 10/min | ✅ |

### System

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API status |
| `GET` | `/health` | Health check for deployment monitoring |

<div align="right">

[↑ Back to Top](#top)

</div>

---

<a id="deployment"></a>

## Deployment

```
                ┌──────────────┐
                │    GitHub    │
                │   (Source)   │
                └──────┬───────┘
                       │  Push triggers auto-deploy
          ┌────────────┴────────────┐
          ▼                         ▼
  ┌───────────────┐        ┌───────────────┐
  │    Vercel     │        │    Render     │
  │   Frontend    │◄──────►│   Backend     │
  │   Next.js 16  │  API   │   FastAPI     │
  │               │        │   Python 3.12 │
  └───────────────┘        └───────────────┘
```

| Component | Platform | Configuration |
|---|---|---|
| Frontend | Vercel | Auto-detected Next.js, env var: `NEXT_PUBLIC_API_URL` |
| Backend | Render | `render.yaml` — Python web service, `uvicorn main:app` |

<div align="right">

[↑ Back to Top](#top)

</div>

---

<a id="contributing"></a>

## Contributing

Contributions are welcome. To get started:

```bash
git clone https://github.com/yashrajagawane/HireMind-AI.git
cd HireMind-AI
git checkout -b feature/your-feature
# Make your changes
git commit -m "feat: your feature"
git push origin feature/your-feature
# Open a Pull Request
```

<div align="right">

[↑ Back to Top](#top)

</div>

---

<a id="license"></a>

## License

This project is licensed under the [MIT License](./LICENSE).

---

<div align="center">

<br>

**Built by [Yashraj Agawane](https://github.com/yashrajagawane)**

AI Developer · Full Stack Engineer

<br>

<a href="https://github.com/yashrajagawane">
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/>
</a>
<a href="https://hiremind-ai-seven.vercel.app">
<img src="https://img.shields.io/badge/Live_Demo-8B5CF6?style=for-the-badge&logo=vercel&logoColor=white"/>
</a>

<br><br>

⭐ **Star this repo** if HireMind AI was useful — it keeps the project alive.

<br>

<img src="https://capsule-render.vercel.app/api?type=waving&color=8B5CF6&height=100&section=footer"/>

</div>
