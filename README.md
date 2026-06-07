# 🛠️ Technology Stack

<div align="center">

| Layer | Technology |
|-------|-----------|
| 🎨 **Frontend** | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) |
| ⚙️ **Backend** | ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white) |
| 🤖 **AI Engine** | ![Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white) ![Groq](https://img.shields.io/badge/Groq_AI-F55036?style=for-the-badge&logoColor=white) |
| ☁️ **Deployment** | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) ![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white) |

</div>

---

# 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         End Users                           │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Next.js Frontend  ·  Vercel                    │
│                                                             │
│   Dashboard  ·  Resume Review  ·  Job Match                 │
│   Career Analytics  ·  Interview Prep  ·  Auth              │
└───────────────────────────┬─────────────────────────────────┘
                            │  REST API
                            ▼
┌─────────────────────────────────────────────────────────────┐
│               FastAPI Backend  ·  Render                    │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
               ▼                              ▼
    ┌──────────────────┐            ┌──────────────────────┐
    │  Resume Parser   │            │    ATS Analyzer      │
    │  NLP Engine      │            │    Skills Engine     │
    └────────┬─────────┘            └──────────┬───────────┘
             │                                 │
             └─────────────┬───────────────────┘
                           ▼
              ┌────────────────────────┐
              │      AI Engine Layer   │
              │                        │
              │  Gemini AI  ·  Groq AI │
              └────────────┬───────────┘
                           ▼
              ┌────────────────────────┐
              │  Career Intelligence   │
              │       Output           │
              └────────────────────────┘
```

---

# 🤖 AI Processing Pipeline

```
  📤 Resume Upload
        │
        ▼
  📑 Resume Parsing  ──────────────────────────────── NLP Engine
        │
        ▼
  🧠 Skill Extraction  ────────────────────────────── Skills Engine
        │
        ▼
  🤖 ATS Compatibility Analysis  ──────────────────── Groq AI
        │
        ▼
  ┌─────────────────────────────┐
  │     AI Evaluation Layer     │
  │  Gemini AI  ·  Groq AI      │
  └──────────────┬──────────────┘
                 │
        ┌────────┴─────────┐
        ▼                  ▼
  📊 Resume Insights   🗺️ Career Recommendations
        │                  │
        └────────┬──────────┘
                 ▼
        🎤 Interview Preparation
```

---

# ⚡ Application Structure

<table>
<tr>
<td width="50%">

### 🎨 Frontend — Next.js

```
src/
├── app/
│   ├── (main)/
│   │   ├── dashboard/
│   │   ├── resume-review/
│   │   ├── ai-job-match/
│   │   ├── ai-interview/
│   │   ├── career-analytics/
│   │   └── settings/
│   ├── auth/
│   └── login/
├── components/
│   ├── AuthCard
│   ├── ResumeUpload
│   ├── CareerMatchForm
│   ├── CareerAnalytics
│   ├── InterviewPrep
│   ├── Navbar / Sidebar
│   ├── Topbar / StatCard
│   └── Forms
├── hooks/
├── services/
├── lib/ · utils/ · types/
└── features/
```

</td>
<td width="50%">

### ⚙️ Backend — FastAPI

```
app/
├── routes/
│   ├── auth.py
│   └── resume.py
├── services/
│   ├── ai_insights.py
│   ├── ats_analyzer.py
│   ├── gemini_resume_review.py
│   ├── gemini_career_match.py
│   ├── gemini_career_analytics.py
│   ├── gemini_interview_prep.py
│   ├── groq_resume_review.py
│   ├── groq_jd_analyzer.py
│   └── groq_ats.py
├── database/
│   └── db.py
├── models/ · schemas/
└── utils/
    ├── nlp_engine.py
    └── skills.py
```

</td>
</tr>
</table>

---

# ☁️ Deployment Infrastructure

```
              ┌──────────────────────┐
              │        GitHub        │
              │   (Source Control)   │
              └──────────┬───────────┘
                         │  CI/CD Auto Deploy
           ┌─────────────┴──────────────┐
           ▼                            ▼
  ┌─────────────────┐         ┌──────────────────┐
  │     Vercel      │         │     Render       │
  │   (Frontend)    │◄───────►│   (Backend)      │
  │   Next.js App   │  API    │   FastAPI App    │
  └─────────────────┘         └──────────────────┘
```

---

# 🚀 Engineering Principles

<div align="center">

| Principle | Description |
|-----------|-------------|
| ⚡ **Performance First** | Optimized API response times with async FastAPI |
| 🧩 **Modular Architecture** | Cleanly separated frontend, backend, and AI layers |
| 🤖 **Dual AI Engine** | Gemini + Groq for redundancy and specialized tasks |
| 🔒 **Secure by Design** | Auth-protected routes, safe file handling |
| ☁️ **Cloud-Native** | Zero-config deployment via Vercel + Render |
| 📈 **Production-Ready** | Scalable services built for real-world usage |

</div>

---

<p align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=8B5CF6&height=120&section=footer"/>
</p>
