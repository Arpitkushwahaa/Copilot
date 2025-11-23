# Code Generation Copilot

AI code generation. Frontend + Backend.

![App Screenshot](./frontend/public/screenshot.png)
![ER Diagram](./docs/er-diagram.svg)

## Structure
```
frontend/  # Next.js UI
backend/   # Express + PostgreSQL API
docs/      # ER diagram assets
```

Minimal README per request.# Code Generation Copilot

Minimal submission README – only required items.

![Screenshot](./frontend/public/screenshot.png)
![ER Diagram](./docs/er-diagram.svg)

## 1. Repository & Setup
Structure:
```
frontend/   # Next.js (App Router, React, TS, Tailwind)
backend/    # Express + PostgreSQL + Gemini API
docs/       # ER diagram (SVG/DBML)
```
Environment templates:
```
.env.example              # Root reference
frontend/.env.example     # FRONTEND: NEXT_PUBLIC_API_URL
backend/.env.example      # BACKEND: PORT, DATABASE_URL, GEMINI_API_KEY, CORS_ORIGIN
```
Quick start (local):
```bash
# Backend
cd backend
npm install
npm run migrate
npm run dev   # http://localhost:5000

# Frontend (new terminal)
cd frontend
npm install
npm run dev   # http://localhost:3000
```
Tech choices (why): Next.js (SSR + routing), Tailwind (rapid UI), Express (simple REST), PostgreSQL (relational integrity), Gemini API (AI generation), TypeScript (type safety).

API endpoints:
```
POST /api/generate   # Generate code
GET  /api/history    # Paginated generations
GET  /api/stats      # Usage statistics
GET  /health         # Service & DB status
```

Schema (3 tables, 3NF):
```
users(id, email, username, created_at)
languages(id, name, file_extension, syntax_highlighter, is_active)
generations(id, user_id?, language_id, prompt, generated_code, created_at)
```
Relationships: users 1:N generations; languages 1:N generations.
FK rules: user_id ON DELETE SET NULL; language_id ON DELETE RESTRICT.

## 2. ER Diagram
Provided as SVG (`./docs/er-diagram.svg`) and DBML (`./docs/er-diagram.dbml`). Include this image in submission. (PDF optional.)

## 3. Migration Scripts
Location: `backend/migrations/`
```
001_initial_schema.sql   # Tables + indexes + constraints
002_seed_data.sql        # Seed languages + demo user
run-migrations.js        # Runner script
```

## 4. Live Demo
Update after deployment:
```
Frontend URL: https://YOUR_FRONTEND_URL
Backend API:  https://YOUR_BACKEND_URL
Health:       https://YOUR_BACKEND_URL/health
```
Demo credentials (seeded):
```
Email: demo@codecopilot.com
Username: demo_user
User ID: 1
```

---
This README intentionally minimal per submission requirements.
# Code Generation Copilot# Code Generation Copilot# Code Generation Copilot# Code Generation Copilot# Code Generation Copilot



AI code generator using natural language prompts.



![Screenshot](./frontend/public/screenshot.png)AI code generator using natural language prompts.



![ER Diagram](./docs/er-diagram.svg)



## Structure![Screenshot](./frontend/public/screenshot.png)AI-powered code generation with natural language prompts.

```

frontend/   # Next.js

backend/    # Express + PostgreSQL

```![ER Diagram](./docs/er-diagram.svg)



## Setup

```bash

# Backend## Structure**Stack:** Next.js · Express · PostgreSQL · Gemini AIAI-powered code generation tool with natural language prompts.  AI-powered code generation tool with natural language prompts.  

cd backend && npm install && npm run migrate && npm run dev

```

# Frontend  

cd frontend && npm install && npm run devfrontend/   # Next.js

```

backend/    # Express + PostgreSQL

## Deploy

Backend: Railway | Frontend: Vercel | DB: Supabase```![Screenshot](./frontend/public/screenshot.png)**Tech Stack:** Next.js · Express.js · PostgreSQL · Google Gemini AI**Tech Stack:** Next.js · Express · PostgreSQL · Google Gemini AI



---



**[Arpit Kushwaha](https://github.com/Arpitkushwahaa)**## Setup


```bash

# Backend## ER Diagram

cd backend && npm install && npm run migrate && npm run dev



# Frontend  

cd frontend && npm install && npm run dev![Database Schema](./docs/er-diagram.svg)![Application Screenshot](./frontend/public/screenshot.png)![Application Screenshot](./public/screenshot.png)

```



## Deploy

Backend: Railway | Frontend: Vercel | DB: Supabase## Project Structure



---



**[Arpit Kushwaha](https://github.com/Arpitkushwahaa)**```## 📊 Database ER Diagram## 📊 Database ER Diagram


├── frontend/      # Next.js app

├── backend/       # Express API

│   └── migrations/    # SQL schemas

└── docs/          # ER diagrams![ER Diagram](./docs/er-diagram.svg)!

```



## Database

------

3 tables: `users`, `languages`, `generations` (3NF normalized)  

Relationships: users (1:N) generations, languages (1:N) generations



## Setup## 📁 Project Structure## 📁 Project Structure



**Backend:**

```bash

cd backend``````

npm install

cp .env.example .envcode-copilot/code-copilot/

npm run migrate

npm run dev├── frontend/             # Next.js React Application├── frontend/             # Next.js React Frontend

```

│   ├── app/             # Next.js App Router│   ├── app/             # Next.js App Router

**Frontend:**

```bash│   ├── components/      # React components│   │   ├── api/         # API routes (legacy)

cd frontend

npm install  │   ├── contexts/        # State management│   │   ├── docs/        # Documentation page

cp .env.example .env.local

npm run dev│   ├── public/          # Static assets│   │   ├── globals.css

```

│   ├── package.json│   │   ├── layout.tsx

## API

│   └── .env.example│   │   └── page.tsx

`POST /api/generate` - Generate code  

`GET /api/history` - Get history  ││   ├── components/      # React components

`GET /api/stats` - Statistics  

`GET /health` - Health check├── backend/             # Express API Server│   ├── contexts/        # React Context providers



## Deploy│   ├── src/│   ├── lib/             # Utility functions



- **Backend:** Railway/Render│   │   ├── config/      # Database config│   ├── public/          # Static assets

- **Frontend:** Vercel

- **Database:** Supabase/Neon│   │   ├── controllers/ # Business logic│   ├── types/           # TypeScript definitions



## Demo│   │   └── routes/      # API endpoints│   ├── package.json     # Frontend dependencies



Email: `demo@codecopilot.com`  │   ├── migrations/      # SQL schema & seeds│   ├── next.config.js   # Next.js configuration

Languages: Python, JavaScript, TypeScript, Java, C++, Go, Rust

│   ├── package.json│   ├── tailwind.config.ts

---

│   └── .env.example│   ├── tsconfig.json

**Author:** Arpit Kushwaha · [GitHub](https://github.com/Arpitkushwahaa)

││   └── .env.example     # Frontend environment template

├── docs/                # ER diagrams & documentation│

└── .env.example         # Environment template├── backend/             # Node.js Express API

```│   ├── src/

│   │   ├── config/      # Database configuration

---│   │   ├── controllers/ # Business logic

│   │   ├── routes/      # API endpoints

## 🗄️ Database Schema│   │   └── server.js    # Entry point

│   ├── migrations/      # SQL schema & seed data

**3 Normalized Tables (3NF):**│   │   ├── 001_initial_schema.sql

- **users** → User accounts  │   │   ├── 002_seed_data.sql

- **languages** → Programming languages reference  │   │   └── run-migrations.js

- **generations** → Code generation history  │   ├── package.json     # Backend dependencies

│   ├── verify-db.js     # Database verification script

**Relationships:** users (1:N) generations, languages (1:N) generations  │   └── .env.example     # Backend environment template

**Features:** 8 optimized indexes, foreign key constraints, unique constraints│

├── docs/                # Documentation & Diagrams

---│   ├── er-diagram.svg   # ER Diagram (visual)

│   ├── er-diagram.dbml  # ER Diagram (code)

## 🛠️ Setup Instructions│   └── README.md        # Docs readme

│

### Prerequisites├── .env.example         # Root environment template

- Node.js 18+├── README.md            # This file

- PostgreSQL 14+└── .gitignore          # Git ignore rules

- [Gemini API Key](https://aistudio.google.com/app/apikey)```



### Quick Start---



**Backend:**## 🗄️ Database Schema

```bash

cd backend**3 Normalized Tables (3NF):**

npm install

cp .env.example .env     # Edit with your credentials- **users** - User accounts (`id`, `email`, `username`, `created_at`, `updated_at`)

npm run migrate          # Create tables & seed data- **languages** - Programming languages reference (`id`, `name`, `file_extension`, `syntax_highlighter`, `is_active`)

npm run dev              # http://localhost:5000- **generations** - Code generation history (`id`, `user_id` FK, `language_id` FK, `prompt`, `generated_code`, `created_at`)

```

**Relationships:**

**Frontend:**

```bash```

cd frontend┌─────────────────┐         ┌──────────────────────┐

npm install│     users       │         │      languages       │

cp .env.example .env.local    # Set NEXT_PUBLIC_API_URL├─────────────────┤         ├──────────────────────┤

npm run dev                    # http://localhost:3000│ PK  id          │         │ PK  id               │

```│     email       │         │     name (UNIQUE)    │

│     username    │         │     file_extension   │

---│     created_at  │         │     syntax_highlight │

│     updated_at  │         │     is_active        │

## 📡 API Endpoints└─────────────────┘         └──────────────────────┘

         │                            │

**Base URL:** `http://localhost:5000/api`         │ 1:N                    1:N │

         └────────────┬───────────────┘

| Method | Endpoint | Description |                      │

|--------|----------|-------------|              ┌───────▼────────┐

| POST | `/generate` | Generate code from prompt |              │   generations  │

| GET | `/history` | Get paginated generation history |              ├────────────────┤

| GET | `/stats` | Get usage statistics |              │ PK  id         │

| GET | `/health` | Health check |              │ FK  user_id    │  ← NULL allowed (anonymous)

              │ FK  language_id│  ← RESTRICT (can't delete active languages)

**Example Request:**              │     prompt     │

```json              │     generated_ │

POST /api/generate              │     code       │

{              │     created_at │

  "prompt": "Write a Python function to reverse a string",              └────────────────┘

  "language": "Python",```

  "userId": 1

}### Normalization Decisions

```

- **3NF (Third Normal Form)**: All tables are in 3NF

---- **languages table**: Eliminates redundant language strings, enables easy addition of new languages

- **Foreign Keys**: 

## 🌐 Deployment  - `user_id`: `ON DELETE SET NULL` - preserves generations even if user is deleted

  - `language_id`: `ON DELETE RESTRICT` - prevents deletion of languages still in use

**Backend:** [Railway](https://railway.app/) or [Render](https://render.com/)  

**Frontend:** [Vercel](https://vercel.com/)  ### Constraints

**Database:** [Supabase](https://supabase.com/) or [Neon](https://neon.tech/)

1. **Primary Keys**: Auto-incrementing `SERIAL` for all tables

**Steps:**2. **Unique Constraints**: `users.email`, `languages.name`

1. Deploy PostgreSQL database3. **Check Constraints**:

2. Deploy backend (set `DATABASE_URL`, `GEMINI_API_KEY`, `CORS_ORIGIN`)   - `prompt` length: 1-5000 characters

3. Run migrations: `npm run migrate`   - `generated_code` must not be empty

4. Deploy frontend (set `NEXT_PUBLIC_API_URL`)4. **Foreign Key Constraints**: Maintain referential integrity



------



## 🎮 Demo Credentials## 🚀 Complexity Analysis



**Demo User:**  ### Time Complexity

- Email: `demo@codecopilot.com`  

- Username: `demo_user`#### Paginated History Retrieval (`GET /api/history`)



**Pre-seeded:** 7 languages (Python, JavaScript, TypeScript, Java, C++, Go, Rust)**Query:**

```sql

---SELECT * FROM generations

ORDER BY created_at DESC

## 🎥 Video DemoLIMIT 10 OFFSET 0

```

[2-3 minute walkthrough](https://your-video-link.com) - Update after recording

**Complexity: O(log n + k)**

---- **O(log n)**: B-tree index traversal on `created_at DESC` index

- **k**: Number of rows returned (limit size)

## 👤 Author- **Without Index**: O(n log n) for sorting all rows



**Arpit Kushwaha**  **Best Case**: O(k) when fetching first page (already sorted)  

GitHub: [@Arpitkushwahaa](https://github.com/Arpitkushwahaa)**Worst Case**: O(n) if no index exists



---#### Code Generation (`POST /api/generate`)



## 📄 License**Complexity: O(1)** for database insertion

- Single INSERT operation

MIT License- Foreign key lookups use indexed columns (`language_id`)



---### Space Complexity



**Made with ❤️ using Next.js, Express.js, PostgreSQL & Google Gemini AI**- **Database Storage**: O(n) where n = number of generations

- **Memory per Request**: O(1) - constant per API call
- **Index Storage**: O(n) for each index (minimal overhead)

---

## 📊 Indexing Strategy

### Created Indexes

1. **`idx_generations_created_at_desc`** (B-tree, DESC)
   - **Purpose**: Dramatically speeds up paginated history queries
   - **Impact**: Reduces query time from O(n log n) to O(log n + k)
   - **Use Case**: `ORDER BY created_at DESC` in history endpoint

2. **`idx_generations_user_id`** (B-tree)
   - **Purpose**: Fast user-specific history filtering
   - **Impact**: O(log n) user lookup instead of O(n) scan
   - **Use Case**: `WHERE user_id = ?`

3. **`idx_generations_language_id`** (B-tree)
   - **Purpose**: Fast language filtering
   - **Use Case**: `WHERE language_id = ?`

4. **`idx_generations_user_created`** (Composite B-tree)
   - **Purpose**: Optimal for paginated user-specific queries
   - **Covers**: Both `user_id` and `created_at DESC`
   - **Benefit**: Eliminates need for sorting step

5. **`idx_users_email`** (B-tree)
   - **Purpose**: Fast JOIN operations on email
   - **Use Case**: User authentication lookups

6. **`idx_languages_name`** (B-tree)
   - **Purpose**: Fast language name resolution
   - **Use Case**: Converting language string to `language_id`

### When Are Indexes Useful?

✅ **Use Indexes For:**
- Columns in `WHERE` clauses (filtering)
- Columns in `ORDER BY` clauses (sorting)
- Foreign keys used in JOINs
- Columns with high selectivity (many unique values)

❌ **Avoid Indexes For:**
- Small tables (< 1000 rows)
- Columns with low cardinality (few unique values)
- Frequently updated columns (index maintenance overhead)

### Query Performance Impact

| Query Type | Without Index | With Index | Improvement |
|------------|---------------|------------|-------------|
| Paginated History | O(n log n) | O(log n + k) | ~100x faster at scale |
| User Filter | O(n) | O(log n) | ~10x faster |
| Language Filter | O(n) | O(log n) | ~10x faster |

---

## 🛠️ Setup Instructions

### Prerequisites

- **Node.js** 18+ and npm
- **PostgreSQL** 14+
- **Gemini API Key** from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Quick Start (Both Frontend & Backend)

You can run both servers simultaneously:

```powershell
# Terminal 1 - Backend
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run migrate
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with backend URL
npm run dev
```

### Backend Setup (Detailed)

1. **Navigate to backend folder:**
   ```powershell
   cd backend
   ```

2. **Install dependencies:**
   ```powershell
   npm install
   ```

3. **Create PostgreSQL database:**
   ```powershell
   # Using psql command line
   psql -U postgres
   CREATE DATABASE code_copilot;
   \q
   ```

4. **Configure environment variables:**
   ```powershell
   cp .env.example .env
   ```
   
   Edit `backend/.env` with your actual values:
   ```env
   PORT=5000
   DATABASE_URL=postgresql://postgres:password@localhost:5432/code_copilot
   
   GEMINI_API_KEY=your_actual_gemini_api_key
   GEMINI_MODEL=gemini-2.5-flash
   
   CORS_ORIGIN=http://localhost:3000
   ```

5. **Run migrations:**
   ```powershell
   npm run migrate
   ```
   
   This will:
   - Create tables (`users`, `languages`, `generations`)
   - Create 8 optimized indexes
   - Seed 7 default languages
   - Create demo user

6. **Verify database setup:**
   ```powershell
   node verify-db.js
   ```

7. **Start backend server:**
   ```powershell
   npm run dev  # Development with hot reload
   # OR
   npm start    # Production
   ```

   Backend API runs on: `http://localhost:5000`

### Frontend Setup (Detailed)

1. **Navigate to frontend folder:**
   ```powershell
   cd frontend
   ```

2. **Install dependencies:**
   ```powershell
   npm install
   ```

3. **Configure environment:**
   ```powershell
   cp .env.example .env.local
   ```
   
   Edit `frontend/.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   MODE=ai
   ```

4. **Start frontend development server:**
   ```powershell
   npm run dev
   ```

   Frontend app runs on: `http://localhost:3000`

### Environment Files Overview

```
.env.example              # Root-level template with all options
├── frontend/.env.example # Frontend-specific template
│   └── .env.local       # Your frontend config (create this)
└── backend/.env.example  # Backend-specific template
    └── .env             # Your backend config (create this)
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Generate Code
```http
POST /api/generate
Content-Type: application/json

{
  "prompt": "Write a Python function to reverse a string",
  "language": "Python",
  "userId": 1  // Optional
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": 42,
    "code": "def reverse_string(s):\n    return s[::-1]",
    "language": "Python",
    "prompt": "Write a Python function to reverse a string",
    "timestamp": "2025-01-23T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Missing or invalid prompt/language
- `401 Unauthorized`: Invalid Gemini API key
- `429 Too Many Requests`: API quota exceeded
- `500 Internal Server Error`: Database or Gemini API failure

#### 2. Get History (Paginated)
```http
GET /api/history?page=1&limit=10&language=Python&userId=1
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `language` (optional): Filter by language name
- `userId` (optional): Filter by user ID

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 42,
      "prompt": "Write a Python function to reverse a string",
      "code": "def reverse_string(s):\n    return s[::-1]",
      "timestamp": "2025-01-23T10:30:00.000Z",
      "language": "Python",
      "file_extension": ".py",
      "user_email": "demo@codecopilot.com",
      "username": "demo_user"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 42,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

#### 3. Get Statistics
```http
GET /api/stats
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalGenerations": 127,
    "languageBreakdown": [
      { "language": "Python", "language_count": "45" },
      { "language": "JavaScript", "language_count": "38" },
      { "language": "TypeScript", "language_count": "24" }
    ]
  }
}
```

#### 4. Health Check
```http
GET /health
```

**Response (200):**
```json
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2025-01-23T10:30:00.000Z"
}
```

---

## 🌐 Deployment

### Step 1: Deploy Backend (Railway / Render)

#### Option A: Railway (Recommended)

1. **Create PostgreSQL database:**
   - Go to [Railway](https://railway.app/)
   - Create new project → Add PostgreSQL
   - Note the `DATABASE_URL` from the Connect tab

2. **Deploy backend:**
   - Click "New" → "GitHub Repo"
   - Select your repository
   - Configure service:
     - **Root Directory:** `backend`
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`

3. **Set environment variables in Railway:**
   ```
   DATABASE_URL=postgresql://user:password@host:5432/database
   GEMINI_API_KEY=your_api_key
   GEMINI_MODEL=gemini-2.5-flash
   CORS_ORIGIN=https://your-frontend-url.vercel.app
   PORT=5000
   NODE_ENV=production
   ```

4. **Run migrations:**
   ```bash
   # SSH into Railway or use local connection to production DB
   npm run migrate
   ```

#### Option B: Render

1. Create PostgreSQL database on [Neon](https://neon.tech/) or Render
2. Create new Web Service → Connect your repo
3. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npm run migrate`
   - **Start Command:** `npm start`
4. Add environment variables (same as above)

### Step 2: Deploy Frontend (Vercel)

1. **Go to [Vercel](https://vercel.com/)**

2. **Import your GitHub repository**

3. **Configure project:**
   - **Framework Preset:** Next.js
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)

4. **Add environment variable:**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.railway.app
   ```

5. **Deploy** - Vercel will auto-build and deploy

### Step 3: Verify Deployment

1. Visit your frontend URL
2. Try generating code
3. Check browser console for API errors
4. Verify backend health: `https://your-backend.railway.app/health`

---

## 🎮 Demo Credentials

### Live Demo Access

**Application URL:** [https://your-app.vercel.app](https://your-app.vercel.app) *(Update after deployment)*

### Demo User Credentials

The database includes a pre-seeded demo user:

- **Email:** `demo@codecopilot.com`
- **Username:** `demo_user`
- **User ID:** `1`

**Note:** Currently, the application operates in anonymous mode. User authentication will be implemented in a future version. The demo user exists in the database to demonstrate the user-generation relationship.

### Testing the Demo

1. **Generate Code:**
   - Enter prompt: "Write a Python function to reverse a string"
   - Select language: Python
   - Click "Generate Code"

2. **View History:**
   - All generations are saved automatically
   - Browse paginated history
   - Filter by language

3. **Try Different Languages:**
   - Python, JavaScript, TypeScript, Java, C++, Go, Rust

### Database Schema

The demo includes:
- **7 pre-seeded languages** (Python, JavaScript, TypeScript, Java, C++, Go, Rust)
- **1 demo user** for testing user-related features
- **Sample generations** (if migrations include seed data)

---

## 🎥 Video Demo

[Watch 2-3 minute walkthrough video](https://your-video-link.com)

**Demo includes:**
- Code generation with different languages
- Viewing paginated history
- Database persistence verification
- Responsive design showcase

**Demo Credentials:**
- Email: `demo@codecopilot.com`

---

## 🧪 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **React Syntax Highlighter** - Code display
- **Swagger UI React** - API documentation

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **Google Gemini AI** - Code generation
- **pg** (node-postgres) - PostgreSQL client
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Express Rate Limit** - Rate limiting middleware

### DevOps
- **Vercel** - Frontend hosting
- **Railway/Render** - Backend hosting
- **Supabase/Neon** - Managed PostgreSQL
- **GitHub** - Version control

---

## 📝 Migration Files

Located in `backend/migrations/`:

- **`001_initial_schema.sql`** - Creates tables, indexes, constraints, triggers
- **`002_seed_data.sql`** - Inserts default languages and demo user
- **`run-migrations.js`** - Automated migration runner script

### Running Migrations Manually

```powershell
cd backend
node migrations/run-migrations.js
```

---

## 🔒 Security Features

- **Helmet.js**: Security headers (XSS, content sniffing protection)
- **CORS**: Configurable origin whitelist
- **Rate Limiting**: 100 requests per minute per IP (configurable)
- **Input Validation**: Prompt length limits, SQL injection prevention
- **Parameterized Queries**: All database queries use prepared statements
- **Environment Variables**: Sensitive data in .env files (not committed)

---

## 📊 Database Indexes Explained

Our database uses 8 strategic indexes to optimize query performance:

### Index 1: `idx_generations_created_at_desc`
```sql
CREATE INDEX idx_generations_created_at_desc 
ON generations (created_at DESC);
```
**Why**: Speeds up `ORDER BY created_at DESC` in paginated history queries  
**Impact**: O(n log n) → O(log n + k) for pagination

### Index 2: `idx_generations_user_id`
```sql
CREATE INDEX idx_generations_user_id 
ON generations (user_id);
```
**Why**: Fast filtering by user in history endpoint  
**Impact**: O(n) scan → O(log n) B-tree lookup

### Index 3: `idx_generations_language_id`
```sql
CREATE INDEX idx_generations_language_id 
ON generations (language_id);
```
**Why**: Fast filtering by language  
**Impact**: Enables efficient JOINs with languages table

### Index 4: `idx_generations_user_created` (Composite)
```sql
CREATE INDEX idx_generations_user_created 
ON generations (user_id, created_at DESC);
```
**Why**: Optimizes user-specific paginated queries (covers both filter + sort)  
**Impact**: Single index lookup instead of index merge

### Indexes 5-8: Foreign Key Optimization
- `idx_users_email`: Fast user lookups during JOINs
- `idx_languages_name`: Fast language name resolution
- Additional indexes on frequently queried columns

---

## 🚦 Project Status & Next Steps

### ✅ Phase 1: Backend Implementation (COMPLETE)
- [x] Created backend folder structure
- [x] Set up PostgreSQL schema with 3 normalized tables
- [x] Created migration scripts (001_initial_schema.sql, 002_seed_data.sql)
- [x] Implemented code generation endpoint with Gemini AI
- [x] Implemented paginated history endpoint
- [x] Added statistics endpoint
- [x] Created Express server with security middleware
- [x] Added 8 optimized database indexes
- [x] Database verification script

### ✅ Phase 2: Frontend Restructure (COMPLETE)
- [x] Moved Next.js app to `/frontend` folder
- [x] Separated frontend and backend configurations
- [x] Created `.env.example` files for both frontend and backend
- [x] Updated project structure documentation
- [x] Created frontend README.md

### ✅ Phase 3: Documentation (COMPLETE)
- [x] Created ER diagram (SVG format in `/docs`)
- [x] Added schema explanations and normalization decisions
- [x] Documented API endpoints with examples
- [x] Added complexity analysis (time/space)
- [x] Documented indexing strategy
- [x] Added deployment guide
- [x] Included demo credentials

### ⏳ Phase 4: Final Submission Tasks (TODO)
- [ ] **Deploy backend** to Railway/Render with production database
- [ ] **Deploy frontend** to Vercel
- [ ] **Test deployed application** end-to-end
- [ ] **Record video demo** (2-3 minutes walkthrough)
- [ ] **Update README** with live deployment URLs
- [ ] **Test all features** on production environment

### 🎥 Video Demo Checklist

When recording your 2-3 minute video, include:

1. **Introduction (15s)**
   - Project name and your name
   - Tech stack overview

2. **Code Generation Demo (60s)**
   - Show UI and explain layout
   - Enter a prompt (e.g., "Python function to reverse a string")
   - Select language
   - Generate and show syntax-highlighted output
   - Copy to clipboard feature

3. **History & Features (45s)**
   - Browse paginated history
   - Filter by language
   - Show search functionality
   - Dark/light theme toggle

4. **Backend/Database (30s)**
   - Quick mention of API architecture
   - Show ER diagram
   - Explain database normalization

5. **Conclusion (15s)**
   - Deployment platforms used
   - Future improvements

---

## 👤 Author

**Arpit Kushwaha**  
GitHub: [@Arpitkushwahaa](https://github.com/Arpitkushwahaa)

---

## 📄 License

MIT License - See LICENSE file for details

---

**Made with ❤️ using Next.js, Express.js, PostgreSQL & Google Gemini AI**
