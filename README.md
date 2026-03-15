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

User → Frontend (React) </br>
→ API Request </br>
→ Backend (Express)  </br>
→ Controllers </br>
→ Models (Mongoose) </br>
→ MongoDB Database </br>
→ Response to Frontend </br>
→ UI Update </br>


---

# 🔐 Authentication Flow

User Register </br>
    ↓ </br>
Password Hash (bcrypt) </br>
    ↓ </br>
OTP Sent via Email </br>
    ↓ </br>
User verifies OTP </br>
    ↓ </br>
JWT Token Generated </br>
    ↓ </br>
User Logged In </br>


---

# 💼 Job Application Flow

Employer Posts Job </br>
    ↓ </br>
Job Stored in Database </br>
    ↓ </br>
Job Seeker Browses Jobs </br>
    ↓ </br>
User Applies </br>
    ↓ </br>
Application Stored </br>
    ↓ </br>
Employer Reviews Application </br>
    ↓ </br>
Status Updated </br>


---

# 📂 Backend Folder Structure


backend </br>
│ </br>
├── config </br>
│ ├── db.js </br>
│ └── emailConfig.js </br>
│ </br>
├── controllers </br>
│ ├── authController.js </br>
│ ├── jobController.js </br>
│ ├── applicationController.js </br>
│ ├── userController.js </br>
│ ├── savedController.js </br>
│ ├── analyticsController.js </br>
│ └── resumeController.js </br>
│ </br>
├── middleware </br>
│ ├── authMiddleware.js </br>
│ └── uploadMiddleware.js </br>
│ </br>
├── models </br>
│ ├── User.js </br>
│ ├── Job.js </br>
│ ├── Application.js </br>
│ ├── SavedJob.js </br>
│ ├── Analytics.js </br>
│ ├── Resume.js </br>
│ └── UserOTPVerification.js </br>
│ </br>
├── routes </br>
│ ├── authRoutes.js </br>
│ ├── jobRoutes.js </br>
│ ├── applicationRoutes.js </br>
│ ├── userRoutes.js </br>
│ ├── savedRoutes.js </br>
│ ├── analyticsRoutes.js </br>
│ └── resumeRoutes.js </br>
│ </br>
├── uploads </br>
├── server.js </br>
├── package.json </br>
└── .env </br>


---

# 📂 Frontend Folder Structure


frontend </br>
│ </br>
├── src </br>
│ </br>
│   ├── components </br>
│   │   ├── Cards </br>
│   │   ├── Input </br>
│   │   ├── layout </br>
│   │   ├── ResumeSections </br>
│   │   ├── ResumeTemplates </br>
│   │   ├── LoadingSpinner.jsx </br>
│   │   ├── Modal.jsx </br>
│   │   ├── Progress.jsx </br>
│   │   └── StatusBadge.jsx </br>
│   │ </br>
│   ├── context </br>
│   │   └── AuthContext.jsx </br>
│   │ </br>
│   ├── pages </br>
│   │   ├── Auth </br>
│   │   │   ├── Login.jsx </br>
│   │   │   └── SignUp.jsx </br>
│   │   │ </br>
│   │   ├── Employer </br>
│   │   │   ├── EmployerDashBoard.jsx </br>
│   │   │   ├── JobPostingForm.jsx </br>
│   │   │   ├── ManageJobs.jsx </br>
│   │   │   ├── ApplicationViewer.jsx </br>
│   │   │   └── EmployerProfilePage.jsx </br>
│   │   │ </br>
│   │   ├── JobSeeker </br>
│   │   │   ├── FindJob.jsx </br>
│   │   │   ├── JobDetails.jsx </br>
│   │   │   ├── SavedJobs.jsx </br>
│   │   │   └── UserProfile.jsx </br>
│   │   │ </br>
│   │   ├── ResumeBuilder </br>
│   │   │   ├── DashBoard.jsx </br>
│   │   │   └── EditResume.jsx </br>
│   │   │ </br>
│   │   ├── LandingPage </br>
│   │   └── NotFoundPage </br>
│   │ </br>
│   ├── routes </br>
│   │   └── ProtectedRoute.jsx </br>
│   │ </br>
│   ├── utils </br>
│   │   ├── apiPaths.js </br>
│   │   ├── axiosInstance.js </br>
│   │   ├── helper.js </br>
│   │   ├── uploadImage.js </br>
│   │   └── useTheme.js </br>
│   │ </br>
│   ├── App.jsx </br>
│   ├── main.jsx </br>
│   └── index.css </br>
│ </br>
├── index.html </br>
├── tailwind.config.js </br>
├── postcss.config.js </br>
├── vite.config.js </br>
└── package.json </br>




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


Resume </br>
│ </br>
├── profileInfo </br>
├── contactInfo </br>
├── workExperience </br>
├── education </br>
├── skills </br>
├── projects </br>
├── certifications </br>
├── languages </br>
└── interests </br>


---

# 🔌 API Endpoints

## Authentication

POST /api/auth/register </br>
POST /api/auth/login </br>
POST /api/auth/verify-otp </br>
POST /api/auth/resend-otp </br>
GET /api/auth/me </br>


## Jobs


POST /api/jobs </br>
GET /api/jobs </br>
GET /api/jobs/:id </br>
PUT /api/jobs/:id </br>
DELETE /api/jobs/:id </br>
PUT /api/jobs/:id/toggle-close </br>
GET /api/jobs/get-jobs-employer </br>


## Applications


POST /api/applications/:jobId </br>
GET /api/applications/my </br>
GET /api/applications/job/:jobId </br>
GET /api/applications/:id </br>
PUT /api/applications/:id/status </br>


## Saved Jobs


POST /api/save-jobs/:jobId </br> 
DELETE /api/save-jobs/:jobId </br>
GET /api/save-jobs/my </br>


## Resume


POST /api/resume </br>
GET /api/resume </br>
GET /api/resume/:id </br>
PUT /api/resume/:id </br>
DELETE /api/resume/:id </br>


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