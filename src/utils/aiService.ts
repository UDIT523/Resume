import { ResumeContent, PersonalInfo, Experience } from '../types';

// Mock OpenAI service - in production, this would connect to your backend API
class AIService {
  private apiKey: string = 'mock-api-key';

  async generateSummary(personalInfo: PersonalInfo, experience: Experience[]): Promise<string> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const role = experience[0]?.position || 'Professional';
    const company = experience[0]?.company || 'Various Companies';
    const yearsExp = experience.length > 0 ? Math.min(experience.length * 2, 10) : 3;
    
    const summaries = [
      `Results-driven ${role} with ${yearsExp}+ years of experience delivering exceptional results at ${company} and other leading organizations. Proven track record of driving innovation, leading cross-functional teams, and implementing strategic initiatives that increase efficiency and profitability.`,
      
      `Dynamic ${role} with ${yearsExp} years of progressive experience in fast-paced environments. Expertise in strategic planning, team leadership, and process optimization. Demonstrated ability to exceed performance targets while maintaining the highest standards of quality and customer satisfaction.`,
      
      `Accomplished ${role} with ${yearsExp}+ years of experience transforming business operations and driving growth. Strong background in project management, stakeholder engagement, and innovative problem-solving. Committed to delivering measurable results and continuous improvement.`
    ];
    
    return summaries[Math.floor(Math.random() * summaries.length)];
  }

  async enhanceJobDescription(description: string, position: string): Promise<string[]> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const basePoints = description ? [description] : [];
    const enhancedPoints = [
      `Led cross-functional initiatives that improved operational efficiency by 25% and reduced costs by $50K annually`,
      `Collaborated with stakeholders to implement strategic solutions, resulting in 30% increase in customer satisfaction`,
      `Managed end-to-end project delivery using Agile methodologies, consistently meeting deadlines and budget requirements`,
      `Mentored team of 5+ junior professionals, fostering professional development and improving team productivity by 40%`,
      `Analyzed complex data sets to identify trends and opportunities, driving data-informed decision making across departments`
    ];
    
    return [...basePoints, ...enhancedPoints.slice(0, 3)];
  }

  async suggestSkills(experience: Experience[], targetRole?: string): Promise<string[]> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const roleBasedSkills: { [key: string]: string[] } = {
      'software engineer': ['JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Docker', 'Git', 'SQL', 'TypeScript', 'REST APIs'],
      'product manager': ['Product Strategy', 'Agile', 'Scrum', 'Data Analysis', 'User Research', 'Roadmap Planning', 'Stakeholder Management', 'A/B Testing'],
      'marketing': ['Digital Marketing', 'SEO/SEM', 'Content Strategy', 'Social Media', 'Analytics', 'Campaign Management', 'Brand Management', 'Lead Generation'],
      'sales': ['CRM', 'Lead Generation', 'Negotiation', 'Account Management', 'Sales Strategy', 'Customer Relationship Management', 'Pipeline Management'],
      'default': ['Leadership', 'Communication', 'Problem Solving', 'Project Management', 'Team Collaboration', 'Strategic Planning', 'Data Analysis', 'Process Improvement']
    };
    
    const role = (targetRole || experience[0]?.position || 'default').toLowerCase();
    const matchedRole = Object.keys(roleBasedSkills).find(key => role.includes(key)) || 'default';
    
    return roleBasedSkills[matchedRole];
  }

  async optimizeForATS(content: ResumeContent): Promise<{
    suggestions: string[];
    optimizedContent: Partial<ResumeContent>;
  }> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const suggestions = [
      'Use standard section headings like "Work Experience" and "Education"',
      'Include relevant keywords from job descriptions',
      'Use bullet points for better readability',
      'Avoid graphics, images, and complex formatting',
      'Include both acronyms and full terms (e.g., "AI (Artificial Intelligence)")',
      'Use standard fonts and avoid fancy formatting'
    ];
    
    const optimizedContent: Partial<ResumeContent> = {
      personalInfo: {
        ...content.personalInfo,
        summary: content.personalInfo.summary || await this.generateSummary(content.personalInfo, content.experience)
      }
    };
    
    return { suggestions, optimizedContent };
  }

  async generateCoverLetter(resumeContent: ResumeContent, jobDescription: string, companyName: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const name = resumeContent.personalInfo.fullName;
    const role = resumeContent.experience[0]?.position || 'Professional';
    
    return `Dear Hiring Manager,

I am writing to express my strong interest in joining ${companyName} as advertised. With my background as a ${role} and proven track record of delivering exceptional results, I am confident I would be a valuable addition to your team.

In my previous role at ${resumeContent.experience[0]?.company || 'my current position'}, I successfully ${resumeContent.experience[0]?.description[0] || 'led key initiatives that drove significant business impact'}. This experience has equipped me with the skills and expertise that directly align with your requirements.

Key qualifications I bring include:
• ${resumeContent.skills.slice(0, 3).join(', ')} expertise
• Strong background in ${resumeContent.experience[0]?.position || 'leadership and strategy'}
• Proven ability to deliver results in fast-paced environments

I am excited about the opportunity to contribute to ${companyName}'s continued success and would welcome the chance to discuss how my experience and passion align with your team's goals.

Thank you for your consideration. I look forward to hearing from you.

Sincerely,
${name}`;
  }

  async analyzeJobMatch(resumeContent: ResumeContent, jobDescription: string): Promise<{
    matchScore: number;
    matchedSkills: string[];
    missingSkills: string[];
    recommendations: string[];
  }> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const jobSkills = ['JavaScript', 'React', 'Node.js', 'AWS', 'Leadership', 'Agile', 'Communication'];
    const resumeSkills = resumeContent.skills.map(s => s.toLowerCase());
    
    const matchedSkills = jobSkills.filter(skill => 
      resumeSkills.some(rs => rs.includes(skill.toLowerCase()))
    );
    
    const missingSkills = jobSkills.filter(skill => 
      !resumeSkills.some(rs => rs.includes(skill.toLowerCase()))
    );
    
    const matchScore = Math.round((matchedSkills.length / jobSkills.length) * 100);
    
    const recommendations = [
      `Add ${missingSkills.slice(0, 2).join(' and ')} to your skills section`,
      'Quantify your achievements with specific metrics',
      'Include relevant keywords from the job description',
      'Highlight leadership and collaboration experience'
    ];
    
    return { matchScore, matchedSkills, missingSkills, recommendations };
  }
}

export const aiService = new AIService();