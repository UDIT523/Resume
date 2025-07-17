import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { ResumeData, ResumeTheme, TemplateType, ATSAnalysis } from '../types/resume';

interface ResumeState {
  data: ResumeData;
  theme: ResumeTheme;
  selectedTemplate: TemplateType;
  atsAnalysis: ATSAnalysis;
  currentSection: string;
  completionPercentage: number;
}

type ResumeAction = 
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<ResumeData['personalInfo']> }
  | { type: 'UPDATE_SUMMARY'; payload: string }
  | { type: 'UPDATE_WORK_EXPERIENCE'; payload: ResumeData['workExperience'] }
  | { type: 'UPDATE_EDUCATION'; payload: ResumeData['education'] }
  | { type: 'UPDATE_SKILLS'; payload: ResumeData['skills'] }
  | { type: 'UPDATE_CERTIFICATIONS'; payload: ResumeData['certifications'] }
  | { type: 'UPDATE_PROJECTS'; payload: ResumeData['projects'] }
  | { type: 'UPDATE_LANGUAGES'; payload: ResumeData['languages'] }
  | { type: 'UPDATE_AWARDS'; payload: ResumeData['awards'] }
  | { type: 'UPDATE_THEME'; payload: Partial<ResumeTheme> }
  | { type: 'SET_TEMPLATE'; payload: TemplateType }
  | { type: 'SET_CURRENT_SECTION'; payload: string }
  | { type: 'UPDATE_ATS_ANALYSIS'; payload: ATSAnalysis }
  | { type: 'LOAD_DATA'; payload: ResumeState };

const initialData: ResumeData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: ''
  },
  summary: '',
  workExperience: [],
  education: [],
  skills: [],
  certifications: [],
  projects: [],
  languages: [],
  awards: []
};

const initialTheme: ResumeTheme = {
  primaryColor: '#2563eb',
  secondaryColor: '#1e40af',
  textColor: '#1f2937',
  backgroundColor: '#ffffff',
  accentColor: '#3b82f6',
  fontFamily: 'Inter',
  fontSize: '14px',
  spacing: '1rem'
};

export const initialState: ResumeState = {
  data: initialData,
  theme: initialTheme,
  selectedTemplate: 'modern',
  atsAnalysis: {
    score: 0,
    keywordDensity: 0,
    formatCompatibility: 85,
    sectionCompleteness: 0,
    suggestions: []
  },
  currentSection: 'personal',
  completionPercentage: 0
};

const ResumeContext = createContext<{
  state: ResumeState;
  dispatch: React.Dispatch<ResumeAction>;
} | undefined>(undefined);

function resumeReducer(state: ResumeState, action: ResumeAction): ResumeState {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        data: {
          ...state.data,
          personalInfo: { ...state.data.personalInfo, ...action.payload }
        }
      };
    case 'UPDATE_SUMMARY':
      return {
        ...state,
        data: { ...state.data, summary: action.payload }
      };
    case 'UPDATE_WORK_EXPERIENCE':
      return {
        ...state,
        data: { ...state.data, workExperience: action.payload }
      };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        data: { ...state.data, education: action.payload }
      };
    case 'UPDATE_SKILLS':
      return {
        ...state,
        data: { ...state.data, skills: action.payload }
      };
    case 'UPDATE_CERTIFICATIONS':
      return {
        ...state,
        data: { ...state.data, certifications: action.payload }
      };
    case 'UPDATE_PROJECTS':
      return {
        ...state,
        data: { ...state.data, projects: action.payload }
      };
    case 'UPDATE_LANGUAGES':
      return {
        ...state,
        data: { ...state.data, languages: action.payload }
      };
    case 'UPDATE_AWARDS':
      return {
        ...state,
        data: { ...state.data, awards: action.payload }
      };
    case 'UPDATE_THEME':
      return {
        ...state,
        theme: { ...state.theme, ...action.payload }
      };
    case 'SET_TEMPLATE':
      return {
        ...state,
        selectedTemplate: action.payload
      };
    case 'SET_CURRENT_SECTION':
      return {
        ...state,
        currentSection: action.payload
      };
    case 'UPDATE_ATS_ANALYSIS':
      return {
        ...state,
        atsAnalysis: action.payload
      };
    case 'LOAD_DATA':
      return action.payload;
    default:
      return state;
  }
}

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('resumeBuilderData', JSON.stringify(state));
  }, [state]);

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
