import { ResumeContent, ResumeScore } from '../types';

export const calculateResumeScore = (content: ResumeContent): ResumeScore => {
  const scores = {
    personalInfo: scorePersonalInfo(content.personalInfo),
    experience: scoreExperience(content.experience),
    education: scoreEducation(content.education),
    skills: scoreSkills(content.skills),
    projects: scoreProjects(content.projects),
    certifications: scoreCertifications(content.certifications)
  };

  const overall = Math.round(
    (scores.personalInfo * 0.2 + 
     scores.experience * 0.3 + 
     scores.education * 0.15 + 
     scores.skills * 0.15 + 
     scores.projects * 0.1 + 
     scores.certifications * 0.1)
  );

  const suggestions = generateSuggestions(content, scores);
  const atsCompatibility = calculateATSCompatibility(content);
  const keywords = extractKeywords(content);
  const missingKeywords = suggestMissingKeywords(content);

  return {
    overall,
    sections: scores,
    suggestions,
    atsCompatibility,
    keywords,
    missingKeywords
  };
};

const scorePersonalInfo = (info: any): number => {
  let score = 0;
  if (info.fullName) score += 20;
  if (info.email) score += 20;
  if (info.phone) score += 15;
  if (info.location) score += 15;
  if (info.summary && info.summary.length > 50) score += 20;
  if (info.linkedIn) score += 5;
  if (info.website) score += 5;
  return Math.min(score, 100);
};

const scoreExperience = (experience: any[]): number => {
  if (experience.length === 0) return 0;
  
  let score = Math.min(experience.length * 25, 50);
  
  experience.forEach(exp => {
    if (exp.description && exp.description.length > 0) score += 10;
    if (exp.description && exp.description.some((d: string) => d.length > 30)) score += 10;
  });
  
  return Math.min(score, 100);
};

const scoreEducation = (education: any[]): number => {
  if (education.length === 0) return 60; // Not always required
  
  let score = Math.min(education.length * 40, 80);
  
  education.forEach(edu => {
    if (edu.gpa) score += 10;
  });
  
  return Math.min(score, 100);
};

const scoreSkills = (skills: string[]): number => {
  if (skills.length === 0) return 0;
  return Math.min(skills.length * 10, 100);
};

const scoreProjects = (projects: any[]): number => {
  if (projects.length === 0) return 70; // Not always required
  
  let score = Math.min(projects.length * 30, 90);
  
  projects.forEach(project => {
    if (project.link) score += 5;
    if (project.technologies && project.technologies.length > 0) score += 5;
  });
  
  return Math.min(score, 100);
};

const scoreCertifications = (certifications: any[]): number => {
  if (certifications.length === 0) return 80; // Not always required
  return Math.min(certifications.length * 25, 100);
};

const generateSuggestions = (content: ResumeContent, scores: any): string[] => {
  const suggestions: string[] = [];
  
  if (scores.personalInfo < 80) {
    suggestions.push('Add a professional summary to highlight your key qualifications');
  }
  
  if (scores.experience < 70) {
    suggestions.push('Add more detailed descriptions to your work experience');
  }
  
  if (scores.skills < 60) {
    suggestions.push('Include more relevant skills for your target role');
  }
  
  if (content.projects.length === 0) {
    suggestions.push('Consider adding relevant projects to showcase your abilities');
  }
  
  if (!content.personalInfo.linkedIn) {
    suggestions.push('Add your LinkedIn profile URL');
  }
  
  return suggestions;
};

const calculateATSCompatibility = (content: ResumeContent): number => {
  let score = 100;
  
  // Deduct points for potential ATS issues
  if (!content.personalInfo.summary) score -= 10;
  if (content.experience.length === 0) score -= 20;
  if (content.skills.length < 5) score -= 15;
  
  return Math.max(score, 0);
};

const extractKeywords = (content: ResumeContent): string[] => {
  const keywords = new Set<string>();
  
  // Extract from skills
  content.skills.forEach(skill => keywords.add(skill.toLowerCase()));
  
  // Extract from experience descriptions
  content.experience.forEach(exp => {
    exp.description.forEach(desc => {
      const words = desc.toLowerCase().match(/\b\w{3,}\b/g) || [];
      words.forEach(word => keywords.add(word));
    });
  });
  
  return Array.from(keywords).slice(0, 20);
};

const suggestMissingKeywords = (content: ResumeContent): string[] => {
  const commonKeywords = [
    'leadership', 'teamwork', 'communication', 'problem-solving',
    'project management', 'analytical', 'creative', 'innovative'
  ];
  
  const existingKeywords = extractKeywords(content);
  
  return commonKeywords.filter(keyword => 
    !existingKeywords.includes(keyword.toLowerCase())
  ).slice(0, 5);
};