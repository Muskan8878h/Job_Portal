Job Portal Frontend

A modern Job Portal Web Application Frontend built with React, Vite, TailwindCSS, and DaisyUI.
This platform allows Job Seekers to find jobs and build resumes while Employers can post jobs, manage applicants, and analyze hiring data.

The frontend communicates with the Node.js + Express + MongoDB backend API.


## Folder Structure

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




Tech Stack
Frontend

React 19

Vite

React Router DOM

Axios

UI & Styling

TailwindCSS

DaisyUI

Framer Motion

React Icons

Lucide React

State Management

React Context API

Zustand (Theme Management)

Utilities

html2canvas (Resume Export)

moment.js (Date Formatting)

react-hot-toast (Notifications)

Project Features
Authentication

User Registration

Login System

JWT Authentication

OTP Verification

Profile Management

Job Seeker Features
Job Search

Browse jobs

View job details

Filter by categories

Salary range filtering

Applications

Apply for jobs

View saved jobs

Track application status

Resume Builder

Users can create professional resumes with:

Profile Information

Work Experience

Education

Skills

Projects

Certifications

Languages

Interests

Resume Templates

Multiple templates available with customizable themes.

Employer Features

Employers can:

Access Employer Dashboard

Post new jobs

Manage posted jobs

View applicants

Update application status

Manage company profile

View hiring analytics




Routing Structure
    Public Routes
    Route	Description
    /	Landing Page
    /signup	User Registration
    /login	User Login
    /find-jobs	Browse Jobs
    /job/:jobId	Job Details
    /saved-jobs	Saved Jobs
    /profile	User Profile
    /dashboard	Resume Dashboard
    /resume/:resumeId	Resume Editor

Employer Protected Routes
    Route	Description
    /employer-dashboard	Employer Dashboard
    /post-job	Post New Job
    /manage-jobs	Manage Posted Jobs
    /applicants	View Applicants
    /company-profile	Employer Profile


Environment Setup
    1 Install Dependencies
        npm install
    2 Run Development Server
        npm run dev

    Application runs at:
        http://localhost:5173
    3 Build for Production
        npm run build

Dependencies
Main dependencies used in the project:
        
    react
    react-router-dom
    axios
    tailwindcss
    daisyui
    framer-motion
    lucide-react
    react-hot-toast
    html2canvas
    moment
    zustand