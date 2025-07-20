export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: 'Technical' | 'Soft' | 'Language';
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate: string;
  url?: string;
  github?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Native' | 'Fluent' | 'Conversational' | 'Basic';
}

export interface Award {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description: string;
}

export interface ResumeTheme {
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  backgroundColor: string;
  accentColor: string;
  fontFamily: string;
  fontSize: string;
  spacing: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  projects: Project[];
  languages: Language[];
  awards: Award[];
}

export interface ATSAnalysis {
  score: number;
  keywordDensity: number;
  formatCompatibility: number;
  sectionCompleteness: number;
  suggestions: string[];
}

export type TemplateType =
  | 'modern'
  | 'professional'
  | 'creative'
  | 'minimalist'
  | 'academic'
  | 'compact'
  | 'elegant'
  | 'classic'
  | 'chronological'
  | 'functional'
  | 'combination'
  | 'infographic'
  | 'tech'
  | 'executive'
  | 'student';
