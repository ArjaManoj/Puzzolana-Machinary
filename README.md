# Puzzolana Machinery — Enterprise Digital Platform

Official corporate website and machinery intelligence platform for **Puzzolana Machinery** (Crushing, Screening, Washing, Mining, and Road-Building equipment).

---

## 🏗️ Architecture Overview

The system is structured as a high-performance, enterprise-grade full-stack platform:

```
puzzolana-machinery/
├── frontend/             # Next.js App Router (TypeScript, Tailwind CSS, Server Components)
│   ├── app/              # Routes, layout & page controllers
│   ├── components/       # Atomic UI components (common, layout, ui, machinery)
│   ├── features/         # Domain feature modules (product-finder, comparison, quotation)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # API clients, utils, formatters, validation schemas
│   ├── types/            # Shared TypeScript data models
│   └── public/           # Static assets, branding, diagrams, icons
├── backend/              # Node.js + Express + TypeScript API Engine
│   ├── src/
│   │   ├── config/       # Environment, Database, CORS, Logger configurations
│   │   ├── controllers/  # Request orchestrators
│   │   ├── middleware/   # Auth, RateLimiting, ErrorHandler, Validation
│   │   ├── models/       # Mongoose Data Schemas (Products, Enquiries, etc.)
│   │   ├── routes/       # API endpoints (Public & Protected Admin routes)
│   │   ├── services/     # Core Business logic & DB aggregations
│   │   ├── validators/   # Zod / Joi payload validation rules
│   │   └── utils/        # Reference ID generators, email templates, helpers
│   └── tests/            # Unit & Integration test suites (Jest + Supertest)
├── docs/                 # Enterprise architecture & module tracking specs
├── scripts/              # Setup, migration, and verification automation
└── .github/              # CI/CD Workflows for automated linting & testing
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: `v18+` or `v20+` (Detected: `v24.19.0`)
- **npm**: `v9+` or `v11+`
- **MongoDB**: MongoDB Atlas URI or Local MongoDB instance (`mongodb://127.0.0.1:27017`)

### 1. Installation
Install all dependencies for root, backend, and frontend:
```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

### 2. Configure Environment
Copy `.env.example` to `backend/.env` and `frontend/.env.local`:
```bash
cp .env.example backend/.env
cp .env.example frontend/.env.local
```

### 3. Verify Setup
Run the automated environment and file verification script:
```bash
npm run verify
```

### 4. Run Development Servers
Start both backend (`http://localhost:5000`) and frontend (`http://localhost:3000`) concurrently:
```bash
npm run dev
```

Or run individually:
```bash
# Terminal 1: Backend API
npm run dev:backend

# Terminal 2: Next.js Frontend
npm run dev:frontend
```

---

## 📌 Module Progression Roadmap

All 38 modules are developed sequentially with thorough verification:
- [x] **MODULE 1**: Project Setup & Environment Scaffolding
- [ ] **MODULE 2**: Architecture + Folder Structure
- [ ] **MODULE 3**: Design System (Industrial Palette, Typography, Tokens)
- [ ] **MODULE 4**: MongoDB Schemas (Products, Enquiries, Analytics)
- [ ] **MODULE 5**: Express Backend Engine
- [ ] **MODULE 6**: Authentication & Authorization (JWT, RBAC)
- [ ] *... (See `docs/MODULE_TRACKER.md` for full 38-module progress)*

---

## 🛡️ License & Confidentiality
Corporate Enterprise Platform for Puzzolana Machinery. Proprietary engineering assets.
