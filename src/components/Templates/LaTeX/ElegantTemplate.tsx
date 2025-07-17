import React from 'react';
import { ResumeData, ResumeTheme } from '../../../types/resume';

interface ElegantTemplateProps {
  data: ResumeData;
  theme: ResumeTheme;
}

export default function ElegantTemplate({ data, theme }: ElegantTemplateProps) {
  const { personalInfo, summary, workExperience, education, skills, certifications, projects, languages, awards } = data;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div 
      className="max-w-4xl mx-auto bg-white shadow-lg"
      style={{ 
        fontFamily: 'Palatino, Georgia, serif',
        fontSize: '11pt',
        color: '#2c3e50',
        lineHeight: '1.3'
      }}
    >
      <div className="p-8">
        {/* Header with elegant styling */}
        <div className="text-center mb-8 pb-6 border-b-2" style={{ borderColor: theme.primaryColor }}>
          <h1 className="text-4xl font-light mb-3" style={{ 
            fontSize: '24pt', 
            color: theme.primaryColor,
            letterSpacing: '2px'
          }}>
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <div className="text-sm text-gray-600 space-x-4">
            <span>{personalInfo.location}</span>
            <span>•</span>
            <span>{personalInfo.phone}</span>
            <span>•</span>
            <span>{personalInfo.email}</span>
          </div>
          {personalInfo.website && (
            <div className="text-sm text-gray-600 mt-1">{personalInfo.website}</div>
          )}
        </div>

        {/* Summary with elegant styling */}
        {summary && (
          <div className="mb-8">
            <h2 className="text-lg font-light mb-4 text-center" style={{ 
              color: theme.primaryColor,
              letterSpacing: '1px'
            }}>
              Professional Profile
            </h2>
            <p className="text-center text-gray-700 leading-relaxed italic max-w-3xl mx-auto">
              "{summary}"
            </p>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-light mb-4 pb-2 border-b" style={{ 
              color: theme.primaryColor,
              letterSpacing: '1px',
              borderColor: theme.primaryColor + '40'
            }}>
              Education
            </h2>
            {education.map((edu, index) => (
              <div key={edu.id} className="mb-4 flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{edu.degree} in {edu.field}</div>
                  <div className="text-gray-600 italic">{edu.institution}</div>
                  <div className="text-sm text-gray-500">{edu.location}</div>
                  {edu.gpa && <div className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</div>}
                  {edu.honors && <div className="text-sm font-medium text-gray-700 mt-1">{edu.honors}</div>}
                </div>
                <div className="text-sm text-gray-500 text-right">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {workExperience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-light mb-4 pb-2 border-b" style={{ 
              color: theme.primaryColor,
              letterSpacing: '1px',
              borderColor: theme.primaryColor + '40'
            }}>
              Professional Experience
            </h2>
            {workExperience.map((exp, index) => (
              <div key={exp.id} className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium text-gray-800 text-lg">{exp.position}</div>
                    <div className="text-gray-600 italic">{exp.company}</div>
                    <div className="text-sm text-gray-500">{exp.location}</div>
                  </div>
                  <div className="text-sm text-gray-500 text-right">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                <div className="text-gray-700 text-justify mb-2 leading-relaxed">{exp.description}</div>
                {exp.achievements.filter(Boolean).length > 0 && (
                  <ul className="space-y-1">
                    {exp.achievements.filter(Boolean).map((achievement, achIndex) => (
                      <li key={achIndex} className="flex items-start text-gray-700">
                        <span className="mr-3 mt-2 w-1 h-1 bg-gray-400 rounded-full flex-shrink-0"></span>
                        <span className="leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-light mb-4 pb-2 border-b" style={{ 
              color: theme.primaryColor,
              letterSpacing: '1px',
              borderColor: theme.primaryColor + '40'
            }}>
              Core Competencies
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {['Technical', 'Soft'].map(category => {
                const categorySkills = skills.filter(skill => skill.category === category);
                if (categorySkills.length === 0) return null;
                
                return (
                  <div key={category}>
                    <h3 className="font-medium text-gray-800 mb-2">
                      {category === 'Technical' ? 'Technical Skills' : 'Soft Skills'}
                    </h3>
                    <div className="space-y-1">
                      {categorySkills.map(skill => (
                        <div key={skill.id} className="flex justify-between items-center">
                          <span className="text-gray-700">{skill.name}</span>
                          <span className="text-xs text-gray-500 italic">{skill.level}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}