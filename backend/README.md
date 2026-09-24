# TalentHunt Backend API

Production-ready Express.js & MongoDB backend for the **TalentHunt** platform. Provides robust REST APIs, JWT authentication with HTTP-only cookies, multi-role authorization, server-side talent scoring, skill gap analysis, ATS resume parsing, opportunity application tracking, teacher management, and administrative governance.

---

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Prerequisites](#prerequisites)
3. [Environment Configuration](#environment-configuration)
4. [Installation & Setup](#installation--setup)
5. [Database Seeding & Default Credentials](#database-seeding--default-credentials)
6. [Running the Application](#running-the-application)
7. [Database Models](#database-models)
8. [Authentication & Authorization Flow](#authentication--authorization-flow)
9. [Calculation Engines & Services](#calculation-engines--services)
10. [File Upload Setup](#file-upload-setup)
11. [API Endpoint Reference](#api-endpoint-reference)
12. [Frontend Integration Guide](#frontend-integration-guide)
13. [Deployment Instructions](#deployment-instructions)
14. [Security & Best Practices](#security--best-practices)

---

## Architecture Overview

```
backend/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection & health check
│   ├── controllers/
│   │   ├── admin.controller.js
│   │   ├── application.controller.js
│   │   ├── assessment.controller.js
│   │   ├── auth.controller.js
│   │   ├── notification.controller.js
│   │   ├── opportunity.controller.js
│   │   ├── organization.controller.js
│   │   ├── recruiter.controller.js
│   │   ├── resume.controller.js
│   │   ├── school.controller.js
│   │   ├── student.controller.js
│   │   └── teacher.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js     # JWT token validation & req.user injection
│   │   ├── error.middleware.js    # Global error handler & 404 handler
│   │   ├── rateLimit.middleware.js# General & auth rate limits
│   │   ├── role.middleware.js     # Role enforcement (student, teacher, etc.)
│   │   └── upload.middleware.js   # Multer storage & MIME/size validation
│   ├── models/
│   │   ├── Achievement.js
│   │   ├── Application.js         # Compound index { user: 1, opportunity: 1 }
│   │   ├── Assessment.js
│   │   ├── AssessmentResult.js
│   │   ├── Notification.js
│   │   ├── Opportunity.js
│   │   ├── Organization.js
│   │   ├── Recruiter.js
│   │   ├── Resume.js
│   │   ├── School.js
│   │   ├── Skill.js
│   │   ├── Student.js
│   │   ├── Teacher.js
│   │   └── User.js
│   ├── routes/
│   │   ├── admin.routes.js
│   │   ├── application.routes.js
│   │   ├── assessment.routes.js
│   │   ├── auth.routes.js
│   │   ├── notification.routes.js
│   │   ├── opportunity.routes.js
│   │   ├── organization.routes.js
│   │   ├── recruiter.routes.js
│   │   ├── resume.routes.js
│   │   ├── school.routes.js
│   │   ├── student.routes.js
│   │   └── teacher.routes.js
│   ├── services/
│   │   ├── resumeAnalyzer.service.js # PDF extraction & ATS scoring
│   │   ├── skillGap.service.js       # Target role benchmarks & gaps
│   │   └── talentScore.service.js    # Multi-factor talent & placement scores
│   ├── utils/
│   │   ├── apiResponse.js            # Standardized API response format
│   │   ├── generateToken.js          # JWT signed token + cookie setter
│   │   └── validation.js             # express-validator result checker
│   ├── app.js                        # Express setup, middleware, routes
│   ├── seed.js                       # Initial mock/development data
│   └── server.js                     # HTTP server launcher & graceful shutdown
├── uploads/
│   └── resumes/                      # Local resume storage directory
├── .env.example
├── package.json
└── README.md
```

---

## Prerequisites

- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher
- **MongoDB**: Local MongoDB instance (port 27017) or MongoDB Atlas connection URI

---

## Environment Configuration

Copy `.env.example` to `.env` in the `backend/` folder:

```bash
cp .env.example .env
```

### Environment Variables Reference

| Variable | Description | Example / Default |
|---|---|---|
| `PORT` | Port the server listens on | `5000` |
| `NODE_ENV` | Environment mode (`development` / `production`) | `development` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/talenthunt` |
| `JWT_SECRET` | Secret key for signing JWTs (min 32 chars) | `talenthunt_jwt_super_secret_production_key_2026` |
| `JWT_EXPIRES_IN` | Token expiration duration | `7d` |
| `COOKIE_EXPIRES_IN_DAYS` | HTTP-only cookie lifetime in days | `7` |
| `FRONTEND_URL` | Frontend origin for CORS and cookie trust | `http://localhost:5500` |
| `MAX_FILE_SIZE` | Maximum resume upload size in bytes (5MB) | `5242880` |

---

## Installation & Setup

1. Open terminal and navigate into the `backend/` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure MongoDB is running:
   ```bash
   # On Windows (PowerShell with Admin):
   net start MongoDB
   # Or run mongod directly
   ```

---

## Database Seeding & Default Credentials

To populate the database with test accounts, categories, sample opportunities, and assessment tests:

```bash
npm run seed
```

### Seed Development Accounts (Password for all: `Password@123`)

| Role | Email | Student Type / Role Info |
|---|---|---|
| **Admin** | `admin@talenthunt.com` | System Administrator |
| **Student (College)** | `student@talenthunt.com` | College Student (B.Tech CS, IIT Delhi) |
| **Student (School)** | `schoolstudent@talenthunt.com`| School Student (Class 10, DPS RK Puram) |
| **Teacher** | `teacher@talenthunt.com` | Verified Senior Educator (Mathematics & CS) |
| **Recruiter** | `recruiter@talenthunt.com` | TechNova Solutions Talent Acquisition |
| **Organization** | `org@talenthunt.com` | Innovation Hub Foundation |
| **School** | `school@talenthunt.com` | Delhi Public School |

> ⚠️ **Security Notice:** Seed credentials are for local development and testing only. Never use these in a production environment.

---

## Running the Application

### Development Mode (with hot-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server starts at `http://localhost:5000`.

### Health Check
Verify backend and database status:
```bash
curl http://localhost:5000/api/health
```
Response:
```json
{
  "success": true,
  "message": "TalentHunt API is running",
  "data": {
    "status": "healthy",
    "timestamp": "2026-09-24T09:00:00.000Z",
    "database": {
      "status": "connected",
      "host": "127.0.0.1",
      "name": "talenthunt"
    }
  }
}
```

---

## Database Models

All models are built with strict schemas, timestamps, indexes, and validation rules:

1. **User**: Authentication core (`email`, `password` hashed with bcrypt, `role`, `name`, `status`).
2. **Student**: Profile details (`user`, `studentType` ['school', 'college'], `phone`, `dateOfBirth`, `gender`, `institution`, `course`, `branch`, `year`, `class`, `city`, `skills`, `bio`, `profileImage`, `resume`, `achievements`, `talentScore`, `placementReadiness`).
3. **Teacher**: Teaching qualifications (`user`, `phone`, `subjects`, `qualification`, `experience`, `specialization`, `city`, `availability`, `verificationStatus`, `earnings`).
4. **School**: School institution metadata (`user`, `schoolName`, `schoolType`, `city`, `website`, `contactPerson`, `email`, `phone`).
5. **Recruiter**: Employer profile (`user`, `companyName`, `jobRole`, `companyWebsite`, `industry`, `contactInformation`).
6. **Organization**: Non-profit or educational partner (`user`, `organizationName`, `organizationType`, `website`, `eventInterest`).
7. **Opportunity**: Listings (`title`, `description`, `organization`, `type`, `category`, `location`, `mode`, `deadline`, `skills`, `eligibility`, `salary`, `createdBy`, `status`).
8. **Application**: Tracks user applications (`user`, `opportunity`, `status` ['applied', 'shortlisted', 'interview', 'selected', 'rejected', 'withdrawn']).
   - **Unique Compound Index**: `{ user: 1, opportunity: 1 }` prevents duplicate submissions.
9. **Assessment**: Test definitions (`title`, `description`, `targetAudience`, `category`, `durationMinutes`, `totalMarks`, `passingPercentage`, `questions` with options, correct answer, marks).
10. **AssessmentResult**: User test submissions (`student`, `assessment`, `score`, `totalQuestions`, `correctAnswers`, `percentage`, `passed`, `completedAt`).
11. **Skill**: Skill records per student (`student`, `name`, `category`, `level`, `score`, `verified`).
12. **Achievement**: Awards and certs (`student`, `title`, `issuer`, `issueDate`, `description`, `certificateUrl`).
13. **Resume**: Uploaded resume files (`student`, `fileName`, `fileUrl`, `fileSize`, `mimeType`, `extractedText`, `analysis`).
14. **Notification**: User activity alerts (`user`, `title`, `message`, `type`, `isRead`, `link`).

---

## Authentication & Authorization Flow

1. **Registration** (`POST /api/auth/register`):
   - Validates password length (>= 8 chars), format, and uniqueness of email.
   - Hashes password using `bcryptjs` (salt rounds: 10).
   - Creates the `User` and automatically creates the corresponding role profile (`Student`, `Teacher`, `Recruiter`, etc.).
   - Issues a JWT containing `{ userId, role }` and sets an HTTP-only secure cookie named `token`.
2. **Login** (`POST /api/auth/login`):
   - Compares credentials using `bcrypt.compare`.
   - Sends signed JWT via both HTTP-only cookie and JSON response body (`data.token`).
3. **Authentication Check** (`GET /api/auth/me`):
   - Protected route verifying JWT from either cookie or `Authorization: Bearer <token>` header.
4. **Role Middleware** (`requireRole("admin")`, `requireRole("student")`, etc.):
   - Confirms user role before delegating to controller.
5. **Resource Authorization**:
   - Students cannot view or mutate another student's profile.
   - Recruiters cannot edit another recruiter's posted opportunities.

---

## Calculation Engines & Services

### 1. Talent Score Engine (`services/talentScore.service.js`)
Calculates an objective talent index between 0 and 100 based on:
- **Assessment Performance (60% weight)**: Normalized average of passed tests.
- **Skill Proficiency (30% weight)**: Normalized weighted average of verified and recorded skills.
- **Achievements & Portfolio (10% bonus)**: Extra credit for certifications and documented achievements.
- **Placement Readiness Index**: Dynamic status:
  - 85+ → *High*
  - 70-84 → *Moderate*
  - Below 70 → *Needs Improvement*

### 2. Skill Gap Analyzer (`services/skillGap.service.js`)
Predefined industry benchmark skill models for high-demand target roles:
- `software-developer`: Data Structures, Algorithms, System Design, Git, SQL, Problem Solving.
- `frontend-developer`: HTML5, CSS3, JavaScript, React / UI Frameworks, Responsive Design, Web APIs.
- `backend-developer`: Node.js, Express, REST APIs, MongoDB, SQL, Authentication & Security.
- `data-analyst`: Python, SQL, Statistics, Data Visualization, Excel, Machine Learning Basics.
- `full-stack-developer`: Frontend, Backend, Database Design, REST APIs, Git, Cloud Basics.
- `python-developer`: Core Python, OOP, Flask / Django, Pandas, Unit Testing.

Compares benchmark targets against the student's actual assessed scores and returns categorized status: `Good` (>= 75%), `Moderate` (50–74%), or `Critical Gap` (< 50%).

### 3. ATS Resume Analyzer (`services/resumeAnalyzer.service.js`)
- Parses text from PDF/DOC uploads via `pdf-parse`.
- Extracts contact details, education sections, projects, and work experience.
- Scans against 60+ technical and soft-skill keywords.
- Calculates an ATS match score (0–100), detects missing critical sections, and provides tailored improvement tips.

---

## File Upload Setup

- Storage: Multer disk storage at `backend/uploads/resumes/`.
- File validation: Max size 5 MB; MIME types allowed: `application/pdf`, `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`.
- Cloud ready: Controller decoupled with storage adapter abstraction for future migration to AWS S3, Cloudinary, or Supabase Storage without altering API contracts.

---

## API Endpoint Reference

### Response Format
All endpoints return a uniform JSON structure:
```json
// Success
{ "success": true, "message": "Success message", "data": { ... } }

// Error
{ "success": false, "message": "Error description", "errors": [ ... ] }
```

### Auth Routes (`/api/auth`)
- `POST /api/auth/register` — Register new user (student, school, recruiter, organization, teacher, admin)
- `POST /api/auth/login` — Login user with email & password, sets JWT cookie
- `GET /api/auth/me` — Get current authenticated user profile
- `POST /api/auth/logout` — Invalidate session and clear auth cookie

### Student Routes (`/api/students`)
- `GET /api/students/profile` — Fetch student profile & scores (Student only)
- `PUT /api/students/profile` — Update student profile details (Student only)
- `GET /api/students/skills` — List student skills
- `PUT /api/students/skills` — Save or update student skills array
- `GET /api/students/achievements` — List student achievements
- `POST /api/students/achievements` — Add an achievement
- `GET /api/students/talent-score` — Compute & retrieve real-time talent score
- `GET /api/students/skill-gap?role=frontend-developer` — Get benchmark skill gap analysis
- `GET /api/students/results` — Fetch student assessment submission history

### Opportunity Routes (`/api/opportunities`)
- `GET /api/opportunities` — List opportunities (Supports query params: `type`, `category`, `location`, `mode`, `search`)
- `GET /api/opportunities/:id` — Get single opportunity details
- `POST /api/opportunities` — Create opportunity (Recruiter, Organization, Admin)
- `PUT /api/opportunities/:id` — Update opportunity (Owner or Admin)
- `DELETE /api/opportunities/:id` — Remove opportunity (Owner or Admin)
- `POST /api/opportunities/:id/apply` — Apply for opportunity (Student, Teacher)

### Application Routes (`/api/applications`)
- `GET /api/applications` — Get user's submitted applications
- `GET /api/applications/:id` — Get single application details
- `DELETE /api/applications/:id` — Withdraw application
- `PUT /api/applications/:id/status` — Update status (Recruiter, Org, Admin)

### Assessment Routes (`/api/assessments`)
- `GET /api/assessments` — List available assessments
- `GET /api/assessments/:id` — Get assessment questions
- `POST /api/assessments/:id/submit` — Submit answers; backend evaluates and scores
- `GET /api/assessments/:id/results` — Get result for an assessment

### Teacher Routes (`/api/teachers`)
- `GET /api/teachers/profile` — Get teacher profile (Teacher only)
- `PUT /api/teachers/profile` — Update teacher details (Teacher only)
- `GET /api/teachers/classes` — Get teacher's scheduled classes
- `GET /api/teachers/students` — Get enrolled students
- `GET /api/teachers/schedule` — Get weekly teaching schedule
- `GET /api/teachers/earnings` — Get earnings summary

### School Routes (`/api/schools`)
- `GET /api/schools/profile` — Get school profile (School only)
- `PUT /api/schools/profile` — Update school profile
- `GET /api/schools` — Public directory of registered schools

### Recruiter & Organization Routes
- `GET /api/recruiters/profile` / `PUT /api/recruiters/profile`
- `GET /api/recruiters/applications` — Recruiter view of applicants for their jobs
- `GET /api/organizations/profile` / `PUT /api/organizations/profile`

### Resume Routes (`/api/resumes`)
- `POST /api/resumes` — Upload resume (Multipart form data, field `resume`)
- `GET /api/resumes` — List uploaded resumes for student
- `DELETE /api/resumes/:id` — Delete uploaded resume
- `POST /api/resumes/:id/analyze` — Trigger ATS scoring & keyword analysis

### Notification Routes (`/api/notifications`)
- `GET /api/notifications` — Fetch user notifications
- `PUT /api/notifications/:id/read` — Mark single notification as read
- `PUT /api/notifications/read-all` — Mark all as read

### Admin Routes (`/api/admin`)
- `GET /api/admin/users` — List all registered users
- `GET /api/admin/students` — List all student profiles
- `GET /api/admin/teachers` — List all teachers
- `PUT /api/admin/teachers/:id/verify` — Verify or unverify a teacher
- `GET /api/admin/recruiters` — List recruiter accounts
- `GET /api/admin/organizations` — List organization accounts
- `GET /api/admin/opportunities` — Manage all platform opportunities
- `GET /api/admin/applications` — Oversee all applications
- `GET /api/admin/reports` — Platform statistics (user counts, opportunities, etc.)
- `POST /api/admin/assessments` — Create assessments

---

## Frontend Integration Guide

The frontend connects to the backend through a unified client at `frontend/js/common/api.js`:

```html
<!-- Include in any HTML file -->
<script src="../../js/common/api.js"></script>
```

### Example Usage

```javascript
// Check current user
const me = await TalentHuntAPI.auth.getMe();

// User Login
await TalentHuntAPI.auth.login({
    email: "student@talenthunt.com",
    password: "Password@123"
});

// Load real student talent score
const scoreData = await TalentHuntAPI.students.getTalentScore();

// Apply to opportunity
await TalentHuntAPI.opportunities.apply("6ab4e137de348068fbb9aedd");

// User Logout
await TalentHuntAPI.auth.logout();
```

---

## Deployment Instructions

### Deploy to Render

1. **Create Web Service** on [Render.com](https://render.com).
2. Connect your Git repository.
3. Configure the service:
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Set **Environment Variables** in Render Dashboard:
   - `NODE_ENV` = `production`
   - `PORT` = `10000`
   - `MONGODB_URI` = `mongodb+srv://<user>:<password>@cluster0.mongodb.net/talenthunt?retryWrites=true&w=majority`
   - `JWT_SECRET` = `<Generate a 64-char random string>`
   - `FRONTEND_URL` = `https://your-frontend-domain.com`
5. Click **Deploy**.

### Deploy to Railway

1. Install Railway CLI or deploy via GitHub integration on [railway.app](https://railway.app).
2. Set root directory to `backend`.
3. Add MongoDB database service in Railway project.
4. Set Railway Environment Variables (`MONGODB_URI`, `JWT_SECRET`, `FRONTEND_URL`).
5. Deploy.

---

## Security & Best Practices

- **Password Protection**: Passwords hashed with `bcryptjs` and 10 salt rounds; plaintext passwords are never logged or stored.
- **HTTP-Only Cookies**: JWT authentication is transmitted via `httpOnly`, `sameSite: "lax"`, and `secure` in production, protecting against XSS token theft.
- **Helmet**: Secures HTTP response headers against clickjacking, sniffing, and MIME-type vulnerabilities.
- **CORS Protection**: Restricted to configured `FRONTEND_URL`; wildcard origins (`*`) are disallowed when credentials are exchanged.
- **Rate Limiting**: Auth endpoints throttled to 10 requests per 15 minutes to eliminate brute-force password guessing.
- **Centralized Error Handling**: Detailed stack traces are silenced in production mode to avoid leaking internal architecture.
