import { ResumeData, ATSAnalysis } from '../types/resume';

export const calculateATSScore = (data: ResumeData): ATSAnalysis => {
  let totalScore = 0;
  let maxScore = 0;
  const suggestions: string[] = [];

  // Section completeness (40% of total score)
  const sectionWeights = {
    personalInfo: 10,
    summary: 10,
    workExperience: 15,
    education: 10,
    skills: 10,
    certifications: 5,
    projects: 5,
    languages: 5,
    awards: 5
  };

  // Personal Info (10 points)
  let personalScore = 0;
  const { personalInfo } = data;
  if (personalInfo.firstName && personalInfo.lastName) personalScore += 3;
  if (personalInfo.email) personalScore += 2;
  if (personalInfo.phone) personalScore += 2;
  if (personalInfo.location) personalScore += 2;
  if (personalInfo.linkedin || personalInfo.github || personalInfo.website) personalScore += 1;
  
  totalScore += personalScore;
  maxScore += sectionWeights.personalInfo;
  
  if (personalScore < 8) {
    suggestions.push("Complete all essential personal information fields");
  }

  // Summary (10 points)
  let summaryScore = 0;
  if (data.summary) {
    if (data.summary.length >= 100) summaryScore += 5;
    if (data.summary.length >= 200) summaryScore += 3;
    if (data.summary.includes('years') || data.summary.includes('experience')) summaryScore += 2;
  }
  
  totalScore += summaryScore;
  maxScore += sectionWeights.summary;
  
  if (summaryScore < 8) {
    suggestions.push("Write a compelling professional summary with specific experience details");
  }

  // Work Experience (15 points)
  let experienceScore = 0;
  if (data.workExperience.length > 0) {
    experienceScore += 5;
    data.workExperience.forEach(exp => {
      if (exp.position && exp.company) experienceScore += 1;
      if (exp.description && exp.description.length > 50) experienceScore += 1;
      if (exp.achievements && exp.achievements.filter(Boolean).length > 0) experienceScore += 1;
    });
    experienceScore = Math.min(experienceScore, 15);
  }
  
  totalScore += experienceScore;
  maxScore += sectionWeights.workExperience;
  
  if (experienceScore < 10) {
    suggestions.push("Add more detailed work experience with specific achievements");
  }

  // Education (10 points)
  let educationScore = 0;
  if (data.education.length > 0) {
    educationScore += 5;
    data.education.forEach(edu => {
      if (edu.degree && edu.field && edu.institution) educationScore += 2;
    });
    educationScore = Math.min(educationScore, 10);
  }
  
  totalScore += educationScore;
  maxScore += sectionWeights.education;
  
  if (educationScore < 7) {
    suggestions.push("Include complete education information with degree, field, and institution");
  }

  // Skills (10 points)
  let skillsScore = 0;
  if (data.skills.length > 0) {
    skillsScore += 3;
    if (data.skills.length >= 5) skillsScore += 2;
    if (data.skills.length >= 10) skillsScore += 2;
    if (data.skills.some(skill => skill.category === 'Technical')) skillsScore += 2;
    if (data.skills.some(skill => skill.level === 'Advanced' || skill.level === 'Expert')) skillsScore += 1;
  }
  
  totalScore += skillsScore;
  maxScore += sectionWeights.skills;
  
  if (skillsScore < 8) {
    suggestions.push("Add more relevant skills, especially technical competencies");
  }

  // Other sections (smaller weights)
  const otherSections = [
    { data: data.certifications, weight: sectionWeights.certifications, name: 'certifications' },
    { data: data.projects, weight: sectionWeights.projects, name: 'projects' },
    { data: data.languages, weight: sectionWeights.languages, name: 'languages' },
    { data: data.awards, weight: sectionWeights.awards, name: 'awards' }
  ];

  otherSections.forEach(section => {
    let sectionScore = 0;
    if (section.data.length > 0) {
      sectionScore = Math.min(section.weight, section.data.length * 2);
    }
    totalScore += sectionScore;
    maxScore += section.weight;
  });

  // Calculate keyword density
  const allText = [
    data.summary,
    ...data.workExperience.map(exp => exp.description + ' ' + exp.achievements.join(' ')),
    ...data.skills.map(skill => skill.name),
    ...data.projects.map(project => project.description)
  ].join(' ').toLowerCase();

  const commonKeywords = [
    'management', 'leadership', 'team', 'project', 'development', 'analysis',
    'strategy', 'optimization', 'collaboration', 'communication', 'problem-solving',
    'innovation', 'results', 'achievement', 'growth', 'improvement', 'software',
    'technology', 'digital', 'data', 'process', 'customer', 'business', 'solution'
  ];

  const keywordsFound = commonKeywords.filter(keyword => allText.includes(keyword));
  const keywordDensity = Math.min(100, (keywordsFound.length / commonKeywords.length) * 100);

  // Final score calculation
  const sectionCompleteness = Math.min(100, (totalScore / maxScore) * 100);
  const formatCompatibility = 85; // Static score for format compatibility
  const finalScore = Math.round(
    (sectionCompleteness * 0.5) + 
    (keywordDensity * 0.3) + 
    (formatCompatibility * 0.2)
  );

  // Add keyword-specific suggestions
  if (keywordDensity < 40) {
    suggestions.push("Include more industry-relevant keywords in your descriptions");
  }

  if (finalScore < 70) {
    suggestions.push("Consider adding quantified achievements with specific metrics");
  }

  return {
    score: finalScore,
    keywordDensity: Math.round(keywordDensity),
    formatCompatibility,
    sectionCompleteness: Math.round(sectionCompleteness),
    suggestions
  };
};