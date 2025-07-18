import { LinkedInProfile, ResumeContent } from '../types';

// Simulated LinkedIn import - in production, this would use LinkedIn API
export const importFromLinkedIn = async (): Promise<ResumeContent> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock LinkedIn data
  const mockProfile: LinkedInProfile = {
    firstName: 'John',
    lastName: 'Doe',
    headline: 'Senior Software Engineer at Tech Corp',
    summary: 'Experienced software engineer with 5+ years of experience in full-stack development. Passionate about creating scalable web applications and leading development teams.',
    location: 'San Francisco, CA',
    positions: [
      {
        title: 'Senior Software Engineer',
        company: 'Tech Corp',
        location: 'San Francisco, CA',
        startDate: '2022-01',
        endDate: '',
        isCurrent: true,
        description: 'Lead development of microservices architecture serving 1M+ users daily. Mentor junior developers and drive technical decisions for the platform.'
      },
      {
        title: 'Software Engineer',
        company: 'StartupXYZ',
        location: 'San Francisco, CA',
        startDate: '2020-03',
        endDate: '2021-12',
        isCurrent: false,
        description: 'Developed and maintained React-based web applications. Collaborated with design team to implement responsive user interfaces.'
      }
    ],
    educations: [
      {
        schoolName: 'University of California, Berkeley',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Computer Science',
        startDate: '2016-09',
        endDate: '2020-05'
      }
    ],
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'MongoDB']
  };
  
  return convertLinkedInToResumeContent(mockProfile);
};

const convertLinkedInToResumeContent = (profile: LinkedInProfile): ResumeContent => {
  return {
    personalInfo: {
      fullName: `${profile.firstName} ${profile.lastName}`,
      email: '', // LinkedIn doesn't provide email in basic profile
      phone: '',
      location: profile.location,
      linkedIn: `https://linkedin.com/in/${profile.firstName.toLowerCase()}${profile.lastName.toLowerCase()}`,
      website: '',
      summary: profile.summary
    },
    experience: profile.positions.map((pos, index) => ({
      id: `linkedin-exp-${index}`,
      company: pos.company,
      position: pos.title,
      location: pos.location,
      startDate: pos.startDate,
      endDate: pos.endDate,
      current: pos.isCurrent,
      description: [pos.description]
    })),
    education: profile.educations.map((edu, index) => ({
      id: `linkedin-edu-${index}`,
      institution: edu.schoolName,
      degree: edu.degree,
      field: edu.fieldOfStudy,
      startDate: edu.startDate,
      endDate: edu.endDate
    })),
    skills: profile.skills,
    projects: [],
    certifications: []
  };
};