export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface Resume {
  id: string;
  userId: string;
  title: string;
  templateId: string;
  content: ResumeContent;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResumeContent {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn?: string;
  website?: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate?: string;
  endDate?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
  expiryDate?: string;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  color: string;
  preview: string;
  usageCount: number;
  atsScore?: number;
  colorScheme?: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
  };
}

export interface WizardStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<any>;
  completed: boolean;
}

export interface ResumeScore {
  overall: number;
  sections: {
    personalInfo: number;
    experience: number;
    education: number;
    skills: number;
    projects: number;
    certifications: number;
  };
  suggestions: string[];
  atsCompatibility: number;
  keywords: string[];
  missingKeywords: string[];
}

export interface LinkedInProfile {
  firstName: string;
  lastName: string;
  headline: string;
  summary: string;
  location: string;
  positions: LinkedInPosition[];
  educations: LinkedInEducation[];
  skills: string[];
}

export interface LinkedInPosition {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface LinkedInEducation {
  schoolName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

export interface UserSettings {
  theme: 'light' | 'dark';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
  privacy: {
    profilePublic: boolean;
    showEmail: boolean;
  };
  autoSave: boolean;
}