import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://hiremind-ai-3j1y.onrender.com",
});

// Attach Bearer token to every request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ==========================================
// RESUME UPLOAD
// ==========================================
export const uploadResume = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await API.post("/resume/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// ==========================================
// RESUME HISTORY
// ==========================================
export const getResumeHistory = async () => {
  const response = await API.get("/resume/history");
  return response.data;
};

// ==========================================
// AI JOB MATCH
// ==========================================
export const runJobMatch = async (resume_text: string, job_description: string) => {
  const response = await API.post("/resume/ai-job-match", { resume_text, job_description });
  return response.data;
};

// ==========================================
// AI RESUME REVIEW
// ==========================================
export const runResumeReview = async (resume_text: string) => {
  const response = await API.post("/resume/resume-review", { resume_text });
  return response.data;
};

// ==========================================
// AI CAREER MATCH
// ==========================================
export const runCareerMatch = async (
  resume_text: string,
  target_role: string,
  experience_level: string
) => {
  const response = await API.post("/resume/career-match", {
    resume_text,
    target_role,
    experience_level,
  });
  return response.data;
};

// ==========================================
// AI INTERVIEW PREP
// ==========================================
export const runInterviewPrep = async (
  resume_text: string,
  target_role: string,
  experience_level: string
) => {
  const response = await API.post("/resume/interview-prep", {
    resume_text,
    target_role,
    experience_level,
  });
  return response.data;
};

// ==========================================
// AI CAREER ANALYTICS
// ==========================================
export const runCareerAnalytics = async (resume_text: string) => {
  const response = await API.post("/resume/career-analytics", { resume_text });
  return response.data;
};

// ==========================================
// AI RESUME REWRITE (Suggestions Panel)
// ==========================================
export const runResumeRewrite = async (
  resume_text: string,
  section: string,
  text_to_rewrite: string
) => {
  const response = await API.post("/resume/rewrite", {
    resume_text,
    section,
    text_to_rewrite,
  });
  return response.data;
};

// ==========================================
// SALARY INTELLIGENCE
// ==========================================
export const runSalaryInsights = async (
  target_role: string,
  experience_level: string,
  location: string = "Global"
) => {
  const response = await API.post("/resume/salary-insights", {
    target_role,
    experience_level,
    location,
  });
  return response.data;
};
