import { Resume, ResumeContent } from '../types';

const STORAGE_KEY = 'resumind_resumes';
const CURRENT_RESUME_KEY = 'resumind_current_resume';

export const saveResume = (resume: Resume): void => {
  const resumes = getResumes();
  const existingIndex = resumes.findIndex(r => r.id === resume.id);
  
  if (existingIndex >= 0) {
    resumes[existingIndex] = resume;
  } else {
    resumes.push(resume);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
};

export const getResumes = (): Resume[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const getResumeById = (id: string): Resume | null => {
  const resumes = getResumes();
  return resumes.find(r => r.id === id) || null;
};

export const deleteResume = (id: string): void => {
  const resumes = getResumes().filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
};

export const saveCurrentResume = (content: ResumeContent): void => {
  localStorage.setItem(CURRENT_RESUME_KEY, JSON.stringify(content));
};

export const getCurrentResume = (): ResumeContent | null => {
  const stored = localStorage.getItem(CURRENT_RESUME_KEY);
  if (!stored) return null;
  
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

export const clearCurrentResume = (): void => {
  localStorage.removeItem(CURRENT_RESUME_KEY);
};