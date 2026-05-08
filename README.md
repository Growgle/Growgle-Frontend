# Growgle — AI-Powered Career Advisor

> **India's first personalised, all-in-one, pan-industrial career platform**, powered by Google's latest AI models, Cloud features, and real-time career intelligence.

Growgle is built on a **4.7 million token premium-quality RAG vector database** — the first, largest, and most diverse of its kind in India. It analyses career volatility through under-explored lenses like business psychology, administrative-policy frameworks, economic shifts, and international geopolitics.

Our engines are fuelled by premium domestic and international data retrieved from renowned Indian and international research organizations, MNC growth statistics, business outlook reports, government agencies and ministries, Google Data Commons statistics, and think-tank research publications.

From keeping users ahead with the latest job opportunities and region-based work culture insights, to designing customised, multi-dimensional career growth plans — **Growgle is the common path for Google and India towards realising Viksit Bharat by 2047.**

---

## Features

### AI Career Advisor (Explore)
An intelligent conversational assistant with five specialized interaction modes:
- **Learning Mode** — Step-by-step concept explanations, algorithm patterns, data structures, and language comparisons
- **Interview Mode** — Mock technical & behavioral interviews, system design challenges, salary negotiation practice
- **Mentorship Mode** — Career transition strategy, skills gap assessment, professional networking, and personal branding
- **Explore Mode** — Career path discovery, emerging tech trends, remote opportunities, and industry analysis
- **Roadmap Mode** — 90-day plans, structured learning schedules, portfolio projects, and certification journeys

Additional AI chat capabilities:
- **Voice Input** — Speak naturally; real-time speech-to-text via microphone
- **Text-to-Speech** — AI responses read aloud with a single click
- **Multilingual Support** — Auto-detect regional languages (Tamil, Hindi, Telugu, Malayalam, Kannada, and more); responses translated back to your language
- **File & Image Uploads** — Attach PDFs and images directly in chat
- **Chat History** — Persistent sessions stored in the cloud; searchable, filterable, and exportable as `.txt`
- **Typewriter Effect** — Smooth character-by-character rendering of AI responses

---

### Careers & Jobs Intelligence
A full-featured job discovery engine:
- **AI-Matched Featured Jobs** — Agent-curated job recommendations with dynamic Fit Scores (0–100%)
- **Live Job Feed** — Real-time job listings fetched from the backend (up to 25 latest openings)
- **Smart Filters** — Filter by skills, experience level, work type (Remote / Hybrid / On-site), region, and industry
- **Keyword Search** — Search across job title, company, and location simultaneously
- **Save & Track** — Bookmark any job; toggle saved-only view; status synced back to the backend
- **Interview Prep Assistant** — AI-generated interview questions and key skill focus areas for any job listing
- **Market Insights Dashboard** — At-a-glance stats: total recommendations, trending domains, top skills, and saved count
- **Regional Job Map** — City-wise job counts and growth percentages across major Indian tech hubs

---

### Career Dashboard
A personalised command centre for your career progress:
- **Key Metrics** — Live tracking of Skills Mastered, Career Score, Courses Completed, and Certifications
- **Skill Progress Bars** — Animated progress indicators with target levels per skill
- **AI Career Plan** — Auto-generated personalised career plan from the backend agent pipeline
- **Recommended Jobs** — Top AI-matched job opportunities surfaced directly on the dashboard
- **Upcoming Milestones** — Priority-tagged roadmap milestones with deadline and progress tracking
- **Recent Activity Feed** — Latest actions across courses, roadmaps, skills, and achievements
- **Google Calendar Integration** — Sync and view upcoming events; refresh on demand
- **Google Tasks Integration** — Quick-view of pending tasks with due dates linked to Google Tasks

---

### Career Roadmaps
AI-generated, multi-phase learning roadmaps:
- **Instant Roadmap Generation** — Enter a target role/course, current skills, experience level, and duration to generate a structured roadmap with milestones
- **Multi-Roadmap Tracking** — Manage multiple concurrent learning paths
- **Phase & Milestone Breakdown** — Each roadmap has phases containing milestones typed as course, project, or certification
- **Animated Progress Tracking** — Smooth progress bar animations per roadmap; overall progress aggregated
- **Auto-Refresh** — Polls every 30 seconds to catch agent-generated updates
- **Detailed Roadmap View** — Navigate into any roadmap for a granular phase-by-phase breakdown

---

### Industry Trends
Stay ahead with real-time market intelligence:
- **Trending Skills** — AI-curated cards showing demand level, growth percentage, and average salary per skill
- **Personalised Industry News** — Contextual news articles tagged by category (AI/ML, Cloud, Security, etc.) with impact level indicators
- **Government Policies & Regulations** — Relevant policy updates with region, status, deadline, and affected roles
- **Market Insights** — Top news sources, article volume trends, and comparative daily metrics
- **Emerging Technologies** — Spotlight on cutting-edge tech and their growth stages
- **GDELT Global Signals** — Real-time global news search powered by GDELT; configurable by query, timespan (1h–7d), source country, and language

---

### Profile & Resume
A comprehensive profile management and resume toolkit:
- **Tabbed Profile Editor** — Manage Personal Info, Resume, Skills & Experience, Preferences, and Privacy & Security in one place
- **Resume Upload** — Upload existing PDF resumes; stored securely via cloud storage
- **AI Resume Generation** — Build a LaTeX-compiled, publication-ready PDF resume directly from your profile data
- **AI Resume Enhancement** — Score, analyse, and improve your resume with ATS scoring, keyword gap analysis, rewritten bullet points, and formatting notes
- **Resume Analysis** — Detailed ATS score, top fixes, keyword gap (missing / underrepresented / recommended additions), and rewritten bullet suggestions
- **Skills Manager** — Add, categorise, and level-rate skills; changes immediately reflected in the dashboard
- **Experience & Education Entries** — Structured CRUD for work history and academic background
- **Social Links** — GitHub, LinkedIn, Twitter, and personal website fields
- **Notification Preferences** — Toggle email alerts, push notifications, weekly reports, job alerts, and skill recommendations
- **Profile Completeness** — Live completeness score shown in the profile header

---

### Authentication & Security
- **Firebase-Backed Auth** — Secure token-based authentication with JWT refresh flow
- **Google OAuth** — One-click sign-in with Google for calendar and tasks integration

---

### Design & Experience
- **Google Material Design 3** — Clean, minimal, and intuitive component library
- **Responsive Layout** — Seamless experience across desktop, tablet, and mobile
- **Framer Motion Animations** — Micro-interactions, entrance animations, and animated progress bars throughout
- **Accessibility** — WCAG-compliant with focus management and semantic HTML
- **Typewriter Rendering** — Character-by-character streaming feel for AI responses
- **Dark-Mode Ready** — Design tokens structured for theme extensibility

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 with App Router |
| **Styling** | Tailwind CSS 4 with custom Material Design tokens |
| **UI Library** | MUI (Material UI v7) + custom component library |
| **Animation** | Framer Motion |
| **Authentication** | NextAuth.js (Google OAuth) + Firebase token auth |
| **Charts** | Recharts |
| **Calendar** | React Big Calendar |
| **Icons** | Lucide React + MUI Icons |
| **HTTP Client** | Axios |
| **PDF** | pdf-lib (client-side), LaTeX compile (server-side) |
| **Language** | JavaScript (JSX) + TypeScript type definitions |
| **Date Utils** | date-fns |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/akshayks13/genai_frontend
   cd genai_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the project root and add the required variables:
   ```env
   NEXT_PUBLIC_API_BASE_URL=<your_backend_api_url>
   NEXT_PUBLIC_API_PROMPT_URL=<your_prompt_api_url>
   NEXTAUTH_SECRET=<your_nextauth_secret>
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=<your_google_client_id>
   GOOGLE_CLIENT_SECRET=<your_google_client_secret>
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

---

### Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload

# Production
npm run build        # Build optimized production bundle
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

---

## User Flow

<img width="1275" height="747" alt="Growgle User Flow Diagram" src="https://github.com/user-attachments/assets/729f43d3-fa3e-46e7-82ec-5e443196c74e" />

---

## Architecture Overview

<img width="1408" height="1080" alt="Growgle Architecture Diagram" src="https://github.com/user-attachments/assets/4910fc5f-29fc-4c8f-803a-874fb060f807" />

---

## Related Repositories

| Repository | Description |
|---|---|
| [Growgle-GeoAI](https://github.com/Santhosh292k/Growgle-GeoAI) | Flask microservice that queries BigQuery, enriches results with Vertex AI / Gemma embeddings, and returns Gemini-powered contextual answers for geo and region-aware insights. |
| [Growgle-CareerPulse](https://github.com/akshayks13/Growgle-CareerPulse) | Modular Express.js ETL and analytics service that ingests news and job feeds into BigQuery and uses Vertex AI / Gemini to produce AI-curated career recommendations. |
| [Growgle-Backend](https://github.com/Raamprathap/Growgle-Backend) | Firebase-backed authentication and lightweight API layer for user identity, token refresh, and session management across all Growgle services. |
| [Growgle-AutoApply](https://github.com/Raamprathap/Growgle-AutoApply) | Python agent suite using Gemini Computer Use + Playwright to control Chromium via vision and action — automating job applications and complex web interactions. |

---

## Team

Built with ❤️ by the **Growgle Team**

---

<p align="center">
  <strong>Growgle</strong> — Empowering the next generation of professionals with AI-driven career intelligence.<br/>
  <em>The common path for Google and India towards Viksit Bharat 2047.</em>
</p>
