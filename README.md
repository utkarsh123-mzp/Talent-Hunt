# TalentHunt 🚀

> **Discover potential. Develop skills. Shape your future.**

TalentHunt is a full-stack talent discovery and development platform designed to connect **students, teachers, schools, recruiters, and organizations** in one ecosystem.

The platform helps students build their profiles, evaluate their skills through assessments, analyze their talent, discover relevant opportunities, apply for positions, and showcase their achievements. It also provides dedicated workflows for teacher hiring, recruiters, organizations, schools, and administrators.

---

## 🌟 Features

### 👨‍🎓 Student Platform

* Create and manage a personal talent profile
* Add education, skills, achievements, and projects
* Take technical, aptitude, and academic assessments
* View assessment results and performance
* Track **Talent Score**
* Analyze individual skills and identify skill gaps
* Discover internships, jobs, scholarships, competitions, and other opportunities
* Apply to opportunities
* Track submitted applications
* Upload and manage resumes
* Analyze uploaded resumes
* Receive notifications and platform updates

### 👨‍🏫 Teacher Platform

* Teacher profile management
* Teaching category and subject information
* Qualification and experience management
* Class management
* Student management
* Schedule management
* Earnings and payment tracking
* Teacher opportunity/application workflows

### 🏫 School Platform

* School profile management
* Connect with qualified teachers
* Support school-level student journeys
* School-focused student and academic workflows

### 💼 Recruiter Platform

* Recruiter profile and company information
* Create job/internship opportunities
* Update and manage posted opportunities
* Review candidate applications
* Update application status

### 🏢 Organization Platform

* Organization profile management
* Publish opportunities and competitions
* Manage organization opportunities
* Review and manage applications

### 🛠️ Admin Platform

* Admin authentication and protected routes
* Manage platform users and role-based resources
* Manage students, teachers, schools, recruiters, and organizations
* Manage opportunities, assessments, applications, and platform data

---

## 🧠 Talent Development Workflow

TalentHunt follows a simple journey:

```text
Create Profile
      ↓
Take Assessments
      ↓
Analyze Skills
      ↓
Build Talent Profile
      ↓
Discover Opportunities
      ↓
Apply & Track Progress
```

The student dashboard includes dedicated areas for:

* Assessments
* Assessment Tests
* Skill Analysis
* Talent Score
* Achievements
* Student Profile
* Opportunities
* Competitions
* Settings

---

## 🏗️ Project Architecture

The repository is organized into separate frontend and backend applications.

```text
Talent-Hunt/
│
├── frontend/
│   ├── html/
│   │   ├── admin/
│   │   ├── assessments/
│   │   ├── auth/
│   │   ├── college/
│   │   ├── dashboard/
│   │   ├── hire-teachers/
│   │   ├── opportunities/
│   │   ├── school-students/
│   │   ├── teacher/
│   │   ├── teacher-portal/
│   │   └── index.html
│   │
│   ├── css/
│   │   ├── admin/
│   │   ├── assessments/
│   │   ├── auth/
│   │   ├── college/
│   │   ├── common/
│   │   ├── dashboard/
│   │   ├── hire-teachers/
│   │   ├── opportunities/
│   │   ├── school-students/
│   │   ├── teacher/
│   │   └── teacher-portal/
│   │
│   ├── js/
│   │   ├── admin/
│   │   ├── assessments/
│   │   ├── auth/
│   │   ├── college/
│   │   ├── common/
│   │   ├── dashboard/
│   │   ├── hire-teachers/
│   │   ├── opportunities/
│   │   ├── school-students/
│   │   ├── teacher/
│   │   └── teacher-portal/
│   │
│   └── vercel.json
│
└── backend/
    ├── src/
    │   ├── config/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── models/
    │   ├── routes/
    │   ├── services/
    │   ├── utils/
    │   ├── app.js
    │   ├── server.js
    │   ├── seed.js
    │   └── test-api.js
    │
    ├── package.json
    └── .env.example
```

---

## 💻 Tech Stack

### Frontend

* **HTML5**
* **CSS3**
* **JavaScript**
* **Phosphor Icons**
* Static multi-page architecture
* Vercel deployment configuration

### Backend

* **Node.js**
* **Express 5**
* **MongoDB**
* **Mongoose**
* **JWT Authentication**
* **bcryptjs**
* **Cookie Parser**
* **CORS**
* **Helmet**
* **Morgan**
* **Express Rate Limit**
* **Express Validator**
* **Multer**
* **PDF Parse**
* **dotenv**

---

## 🔐 Authentication & Authorization

TalentHunt uses JWT-based authentication with protected API routes and role-based authorization.

Supported roles include:

```text
student
teacher
school
recruiter
organization
admin
```

Authentication endpoints include:

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
```

Protected resources use authentication middleware and role-based access control.

---

## 🔌 API Modules

The backend exposes modular REST API routes for:

```text
/api/auth
/api/students
/api/teachers
/api/schools
/api/recruiters
/api/organizations
/api/opportunities
/api/assessments
/api/applications
/api/resumes
/api/notifications
/api/admin
```

A health-check endpoint is also available:

```http
GET /api/health
```

---

## 📊 Assessments

The platform supports assessments for different audiences.

Examples include:

* Technical Skills
* Aptitude & Reasoning
* Class 10 Science & Aptitude
* School-level assessments

Assessment results can be stored and used for performance and skill analysis.

---

## 📄 Resume Management

Authenticated users can:

* Upload resumes
* View stored resumes
* Retrieve individual resumes
* Analyze resumes
* Delete resumes

Resume uploads are handled through **Multer**, while PDF content can be processed using **pdf-parse**.

---

## 🎯 Opportunities

TalentHunt supports opportunity discovery and application workflows for students and other eligible users.

Opportunities can include:

* Internships
* Jobs
* Scholarships
* Competitions
* Challenges
* Learning opportunities

Recruiters and organizations can create and manage opportunities, while eligible users can apply and track application status.

---

## 🗄️ Database Models

The backend uses MongoDB with Mongoose models including:

```text
User
Student
Teacher
School
Recruiter
Organization
Opportunity
Assessment
AssessmentResult
Application
Resume
Skill
Achievement
Notification
```

This structure allows the platform to maintain separate domain data while connecting it through user accounts and relationships.

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/utkarsh123-mzp/Talent-Hunt.git

cd Talent-Hunt
```

---

# 🔧 Backend Setup

### 2. Navigate to backend

```bash
cd backend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file using the provided example:

```bash
cp .env.example .env
```

Configure:

```env
PORT=5000
NODE_ENV=development

MONGODB_URI=mongodb://127.0.0.1:27017/talenthunt

JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRES_IN=7d

FRONTEND_URL=http://localhost:5500

UPLOAD_DIR=uploads
MAX_FILE_SIZE_MB=5
```

For production, use a secure JWT secret and a hosted MongoDB connection string.

### 5. Start the backend

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

The backend runs by default on:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

---

## 🌱 Seed Development Data

The backend includes a database seeding script.

Run:

```bash
npm run seed
```

The seed script creates development data for multiple roles, including sample:

* Admin
* Students
* Teacher
* Recruiter
* Organization
* School
* Skills
* Assessments
* Assessment results
* Opportunities
* Notifications

> **Warning:** The seed script clears existing collections before inserting the sample data. Do not run it against a production database.

---

# 🎨 Frontend Setup

The frontend is a static HTML/CSS/JavaScript application.

Navigate to:

```bash
cd frontend
```

You can serve the frontend using a local static server.

For example, with VS Code Live Server:

```text
frontend/html/index.html
```

Or any static HTTP server.

The included `vercel.json` routes the root URL to:

```text
/html/index.html
```

and maintains the required CSS, JavaScript, and HTML paths for deployment.

---

## 🚀 Deployment

### Frontend — Vercel

The frontend is configured for Vercel deployment.

In Vercel, use:

```text
Root Directory: frontend
Framework Preset: Other
```

The existing:

```text
frontend/vercel.json
```

handles the required rewrites for the static website.

### Backend

The Express backend can be deployed to a Node.js-compatible hosting provider.

Set the production environment variables:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_production_secret
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://your-frontend-domain.com
```

Make sure the frontend API configuration points to the deployed backend URL.

---

## 🔗 Live Project

### Frontend

```text
https://talent-hunt-theta.vercel.app/
```

### GitHub Repository

```text
https://github.com/utkarsh123-mzp/Talent-Hunt
```

---

## 🔒 Security

The backend includes several security and reliability mechanisms:

* JWT authentication
* Password hashing with bcryptjs
* Role-based authorization
* Helmet security headers
* API rate limiting
* Request validation
* Centralized error handling
* HTTP request logging
* Cookie parsing
* File upload restrictions

---

## 📁 Backend Architecture

The backend follows a modular architecture:

```text
Routes
  ↓
Middleware
  ↓
Controllers
  ↓
Services
  ↓
Models
  ↓
MongoDB
```

### Routes

Define API endpoints and access requirements.

### Controllers

Handle incoming requests and application logic.

### Services

Encapsulate reusable business logic.

### Models

Define MongoDB/Mongoose data structures.

### Middleware

Handle:

* Authentication
* Role authorization
* Validation
* Rate limiting
* Error handling
* File uploads

---

## 🧪 Development

Backend development:

```bash
npm run dev
```

Start the production server:

```bash
npm start
```

Seed development data:

```bash
npm run seed
```

---

## 🔮 Future Enhancements

Potential improvements include:

* Advanced recommendation algorithms
* AI-powered career recommendations
* Real-time notifications
* Messaging between students and recruiters
* Online teacher booking and payments
* Advanced resume scoring
* Skill recommendation engine
* Leaderboards and competitions
* Analytics dashboards
* Email/SMS notifications
* Cloud-based resume and document storage
* Automated job matching

---

## 🤝 Contributing

Contributions are welcome.

```bash
# Fork the repository

# Create a feature branch
git checkout -b feature/your-feature

# Commit your changes
git add .
git commit -m "Add your feature"

# Push the branch
git push origin feature/your-feature

# Open a Pull Request
```

Please keep contributions focused, maintain the existing project structure, and test backend/API changes before submitting a pull request.

---

## 📜 License

This project currently uses the **ISC License** for the backend package.

---

## 👥 TalentHunt

**TalentHunt — Discover potential. Develop skills. Shape your future.**

Built to create a unified ecosystem for **talent discovery, skill development, education, recruitment, and career opportunities**.
