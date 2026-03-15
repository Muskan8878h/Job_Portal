# Job Portal 

A **Full Stack Job Portal Application** where:

- **Job Seekers** can search jobs, apply, build resumes, and track applications.
- **Employers** can post jobs, manage applications, and analyze hiring data.

The system is built using a **modern MERN Stack architecture** with secure authentication, resume builder, analytics dashboard, and file upload system.

---

# 📁 Project Architecture

The project is divided into two main parts:

Job-Portal

frontend   # React + Vite UI

backend    # Node.js + Express API`


---

# 🚀 Tech Stack

## Frontend

-------------------------------------
| Technology      | Purpose         |
|-----------------|-----------------|
| React           | UI Library      |
| Vite            | Fast build tool |
| React Router    | Routing         |
| Axios           | API requests    |
| TailwindCSS     | Styling         |
| DaisyUI         | UI components   |
| Framer Motion   | Animations      |
| React Icons     | Icons           |
| Lucide React    | Icons           |
| Zustand         | State management|
| html2canvas     | Resume export   |
| Moment.js       | Date formatting |
| React Hot Toast | Notifications   |

---

## Backend

----------------------------------
| Technology | Purpose            |
|------------|--------------------|
| Node.js    | Runtime environment|
| Express.js | Web framework      |
| MongoDB    | Database           |
| Mongoose   | ODM for MongoDB    |
| JWT        | Authentication     |
| Bcrypt     | Password hashing   |
| Multer     | File upload        |
| Nodemailer | Email sending      |
| Dotenv     | Environment variables|

---

# 🔄 Project Flow

User → Frontend (React)
→ API Request
→ Backend (Express)
→ Controllers
→ Models (Mongoose)
→ MongoDB Database
→ Response to Frontend
→ UI Update


---

# 🔐 Authentication Flow

User Register
    ↓
Password Hash (bcrypt)
    ↓
OTP Sent via Email
    ↓
User verifies OTP
    ↓
JWT Token Generated
    ↓
User Logged In


---

# 💼 Job Application Flow

Employer Posts Job
    ↓
Job Stored in Database
    ↓
Job Seeker Browses Jobs
    ↓
User Applies
    ↓
Application Stored
    ↓   
Employer Reviews Application
    ↓
Status Updated


---

# 📂 Backend Folder Structure


backend
│
├── config
│ ├── db.js
│ └── emailConfig.js
│
├── controllers
│ ├── authController.js
│ ├── jobController.js
│ ├── applicationController.js
│ ├── userController.js
│ ├── savedController.js
│ ├── analyticsController.js
│ └── resumeController.js
│
├── middleware
│ ├── authMiddleware.js
│ └── uploadMiddleware.js
│
├── models
│ ├── User.js
│ ├── Job.js
│ ├── Application.js
│ ├── SavedJob.js
│ ├── Analytics.js
│ ├── Resume.js
│ └── UserOTPVerification.js
│
├── routes
│ ├── authRoutes.js
│ ├── jobRoutes.js
│ ├── applicationRoutes.js
│ ├── userRoutes.js
│ ├── savedRoutes.js
│ ├── analyticsRoutes.js
│ └── resumeRoutes.js
│
├── uploads
├── server.js
├── package.json
└── .env


---

# 📂 Frontend Folder Structure


frontend
│
├── src
│
│   ├── components
│   │   ├── Cards
│   │   ├── Input
│   │   ├── layout
│   │   ├── ResumeSections
│   │   ├── ResumeTemplates
│   │   ├── LoadingSpinner.jsx
│   │   ├── Modal.jsx
│   │   ├── Progress.jsx
│   │   └── StatusBadge.jsx
│   │
│   ├── context
│   │   └── AuthContext.jsx
│   │
│   ├── pages
│   │   ├── Auth
│   │   │   ├── Login.jsx
│   │   │   └── SignUp.jsx
│   │   │
│   │   ├── Employer
│   │   │   ├── EmployerDashBoard.jsx
│   │   │   ├── JobPostingForm.jsx
│   │   │   ├── ManageJobs.jsx
│   │   │   ├── ApplicationViewer.jsx
│   │   │   └── EmployerProfilePage.jsx
│   │   │
│   │   ├── JobSeeker
│   │   │   ├── FindJob.jsx
│   │   │   ├── JobDetails.jsx
│   │   │   ├── SavedJobs.jsx
│   │   │   └── UserProfile.jsx
│   │   │
│   │   ├── ResumeBuilder
│   │   │   ├── DashBoard.jsx
│   │   │   └── EditResume.jsx
│   │   │
│   │   ├── LandingPage
│   │   └── NotFoundPage
│   │
│   ├── routes
│   │   └── ProtectedRoute.jsx
│   │
│   ├── utils
│   │   ├── apiPaths.js
│   │   ├── axiosInstance.js
│   │   ├── helper.js
│   │   ├── uploadImage.js
│   │   └── useTheme.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json




---

# 🗄 Database Schema Design

## 1️⃣ User Schema

Stores both **Job Seekers and Employers**

--------------------------------------------------------
| Field              | Type   | Description             |
|--------------------|--------|-------------------------|
| name               | String | User name               |
| email              | String | Unique email            |
| password           | String | Hashed password         |
| role               | String | `jobseeker` / `employer`|
| avatar             | String | Profile image           |
| resume             | String | Resume file             |
| companyName        | String | Employer company        |
| companyDescription | String | Company details         |
| companyLogo        | String | Company logo            |
| verified           | Boolean | Email verified         |

---

## 2️⃣ Job Schema

Stores job postings.

-----------------------
| Field       | Type   |
|-------------|--------|
| title       | String |
| description | String |
| requirements| String |
| location    | String |
| category    | String |
| type        | String |
| salaryMin   | Number |
| salaryMax   | Number |
| company     | ObjectId|
| isClosed    | Boolean |

### Job Types

- Remote  
- Full-Time  
- Part-Time  
- Internship  
- Contract  

---

## 3️⃣ Application Schema

Tracks job applications.

------------------------
| Field     | Type     |
|-----------|----------|
| job       | ObjectId |
| applicant | ObjectId |
| status    | String   |

### Status Options

- Applied
- In Review
- Rejected
- Accepted

---

## 4️⃣ Saved Job Schema

------------------------
| Field     | Type     |
|-----------|----------|
| jobseeker | ObjectId |
| job       | ObjectId |

---

## 5️⃣ Resume Schema


Resume
│
├── profileInfo
├── contactInfo
├── workExperience
├── education
├── skills
├── projects
├── certifications
├── languages
└── interests


---

# 🔌 API Endpoints

## Authentication


POST /api/auth/register
POST /api/auth/login
POST /api/auth/verify-otp
POST /api/auth/resend-otp
GET /api/auth/me


## Jobs


POST /api/jobs
GET /api/jobs
GET /api/jobs/:id
PUT /api/jobs/:id
DELETE /api/jobs/:id
PUT /api/jobs/:id/toggle-close
GET /api/jobs/get-jobs-employer


## Applications


POST /api/applications/:jobId
GET /api/applications/my
GET /api/applications/job/:jobId
GET /api/applications/:id
PUT /api/applications/:id/status


## Saved Jobs


POST /api/save-jobs/:jobId
DELETE /api/save-jobs/:jobId
GET /api/save-jobs/my


## Resume


POST /api/resume
GET /api/resume
GET /api/resume/:id
PUT /api/resume/:id
DELETE /api/resume/:id


---

# ⚙️ Installation Guide

## 1️⃣ Clone Repository


git clone `https://github.com/Muskan8878h/Job_Portal`

`cd job-portal`

# Backend Setup

    ## Install Dependencies

    `cd backend
    npm install`

    ## Environment Variables

    Create .env

    PORT=8000
    MONGO_URI=your_mongodb_connection
    JWT_SECRET=your_secret
    EMAIL_USER=your_email
    EMAIL_PASS=your_password

    ## Start Backend
    `npm run dev`

    or

    `node server.js`

    ## Server runs at:

    `http://localhost:8000`

---

# Frontend Setup
    ## Install Dependencies

    `cd frontend
    npm install`

    ## Start Frontend

    `npm run dev`

    ## Runs at:
    
    `http://localhost:5173`


---

## 📦 Libraries Used

---------------------------------
| Library     | Purpose          |
|-------------|------------------|
| express     | API framework    |
| mongoose    | MongoDB ORM      |
| jsonwebtoken| Authentication   |
| bcrypt      | Password hashing |
| multer      | File upload      |
| nodemailer  | Email service    |
| axios       | HTTP client      |
| zustand     | State management |
| tailwindcss | Styling          |
| daisyui     | UI components    |

---

## 🔄 Alternative Libraries

--------------------------------------------
| Current Library | Alternative             |
|---------------- |-------------------------|
| Express         | Fastify / NestJS        |
| MongoDB         | PostgreSQL / MySQL      |
| Mongoose        | Prisma                  |
| JWT             | OAuth / Auth0           |
| Bcrypt          | Argon2                  |
| Multer          | Busboy                  |
| Nodemailer      | SendGrid / Mailgun      |
| Axios           | Fetch API               |
| Zustand         | Redux / Recoil          |
| TailwindCSS     | Bootstrap / Material UI |



## 🚀 Future Improvements

-  AI Job Recommendation
-  Chat between employer & candidate
-  Interview scheduling
-  Resume AI suggestions
-  Notification system