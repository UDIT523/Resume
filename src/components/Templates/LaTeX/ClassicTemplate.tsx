import React from 'react';
import { ResumeData, ResumeTheme } from '../../../types/resume';

interface ClassicTemplateProps {
  data: ResumeData;
  theme: ResumeTheme;
}

export default function ClassicTemplate({ data, theme }: ClassicTemplateProps) {
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
        fontFamily: 'Computer Modern, Times New Roman, serif',
        fontSize: '11pt',
        color: '#000000',
        lineHeight: '1.15'
      }}
    >
      <div className="p-8 space-y-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2" style={{ fontSize: '20pt', letterSpacing: '1px' }}>
            {personalInfo.firstName.toUpperCase()} {personalInfo.lastName.toUpperCase()}
          </h1>
          <div className="text-sm">
            {personalInfo.location} • {personalInfo.phone} • {personalInfo.email}
          </div>
          {personalInfo.website && (
            <div className="text-sm mt-1">{personalInfo.website}</div>
          )}
        </div>

        {/* Objective */}
        {summary && (
          <div className="mb-6">
            <h2 className="text-sm font-bold mb-2 text-center uppercase" style={{ letterSpacing: '2px' }}>
              Objective
            </h2>
            <div className="w-16 h-px bg-black mx-auto mb-3"></div>
            <p className="text-center text-sm leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold mb-2 text-center uppercase" style={{ letterSpacing: '2px' }}>
              Education
            </h2>
            <div className="w-16 h-px bg-black mx-auto mb-3"></div>
            {education.map((edu, index) => (
              <div key={edu.id} className="mb-3 text-center">
                <div className="font-bold text-sm">{edu.degree} in {edu.field}</div>
                <div className="text-sm">{edu.institution}, {edu.location}</div>
                <div className="text-sm">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</div>
                {edu.gpa && <div className="text-sm">GPA: {edu.gpa}</div>}
                {edu.honors && <div className="text-sm italic">{edu.honors}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {workExperience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold mb-2 text-center uppercase" style={{ letterSpacing: '2px' }}>
              Experience
            </h2>
            <div className="w-16 h-px bg-black mx-auto mb-3"></div>
            {workExperience.map((exp, index) => (
              <div key={exp.id} className="mb-4">
                <div className="text-center mb-2">
                  <div className="font-bold text-sm">{exp.position}</div>
                  <div className="text-sm">{exp.company}, {exp.location}</div>
                  <div className="text-sm italic">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                <div className="text-sm text-justify px-4">{exp.description}</div>
                {exp.achievements.filter(Boolean).length > 0 && (
                  <ul className="list-disc list-inside text-sm mt-2 px-4 space-y-1">
                    {exp.achievements.filter(Boolean).map((achievement, achIndex) => (
                      <li key={achIndex}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold mb-2 text-center uppercase" style={{ letterSpacing: '2px' }}>
              Skills
            </h2>
            <div className="w-16 h-px bg-black mx-auto mb-3"></div>
            <div className="text-center text-sm">
              {skills.map((skill, index) => (
                <span key={skill.id}>
                  {skill.name}
                  {index < skills.length - 1 ? ' • ' : ''}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Additional sections would follow the same pattern */}
      </div>
    </div>
  );
}