export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/auth/register",
        LOGIN: "/api/auth/login",
        VERIFY_REGISTER_OTP: "/api/auth/verify-otp",
        RESEND_OTP: "/api/auth/resend-otp",
        GET_PROFILE: "/api/auth/me", 
        UPDATE_PROFILE: "/api/user/profile",
        DELETE_RESUME: "/api/user/resume"
    },

    IMAGE: {
        UPLOAD_IMAGE: "/api/auth/upload-image",
    },

    DASHBOARD: {
        OVERVIEW: `/api/analytics/overview`,
    },

    JOBS: {
        GET_ALL_JOBS: "/api/jobs",
        GET_JOB_BY_ID: (id) => `/api/jobs/${id}`,
        POST_JOB: "/api/jobs",
        GET_JOBS_EMPLOYER: "/api/jobs/get-jobs-employer",
        UPDATE_JOB: (id) => `/api/jobs/${id}`,
        TOGGLE_CLOSE: (id) => `/api/jobs/${id}/toggle-close`,
        DELETE_JOB: (id) => `/api/jobs/${id}`,

        SAVE_JOB: (id) => `/api/save-jobs/${id}`,
        UNSAVE_JOB: (id) => `/api/save-jobs/${id}`,
        GET_SAVED_JOBS: "/api/save-jobs/my",
    },

    APPLICATIONS: {
        APPLY_TO_JOB: (id) => `/api/applications/${id}`,
        GET_ALL_APPLICATION: (id) => `/api/applications/job/${id}`,
        UPDATE_STATUS: (id) => `/api/applications/${id}/status`,
    },

    RESUME: {
        CREATE: "/api/resume",
        GET_ALL: "/api/resume",
        GET_BY_ID: (id) => `/api/resume/${id}`,
        UPDATE: (id) => `/api/resume/${id}`,
        DELETE: (id) => `/api/resume/${id}` ,
        UPLOAD_IMAGES: (id) => `/api/resume/${id}/upload-images`,
    },
};