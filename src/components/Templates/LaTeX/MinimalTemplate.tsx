import React from 'react';
import { ResumeData, ResumeTheme } from '../../../types/resume';

interface MinimalTemplateProps {
  data: ResumeData;
  theme: ResumeTheme;
}

export default function MinimalTemplate({ data, theme }: MinimalTemplateProps) {
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
        fontFamily: 'Latin Modern Roman, Computer Modern, serif',
        fontSize: '10pt',
        color: '#000000',
        lineHeight: '1.1'
      }}
    >
      <div className="p-6 space-y-3">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-1" style={{ fontSize: '16pt' }}>
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <div className="text-xs text-gray-700">
            {personalInfo.location} | {personalInfo.phone} | {personalInfo.email}
            {personalInfo.website && ` | ${personalInfo.website}`}
          </div>
        </div>

        {/* Summary */}
        {summary && (
          <div className="mb-4">
            <p className="text-xs text-justify leading-tight">{summary}</p>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-bold mb-1 uppercase tracking-wider">Education</h2>
            <div className="border-t border-gray-400 mb-2"></div>
            {education.map((edu, index) => (
              <div key={edu.id} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <div className="text-xs">
                    <span className="font-semibold">{edu.degree}</span> in {edu.field}, {edu.institution}
                  </div>
                  <div className="text-xs">{formatDate(edu.endDate)}</div>
                </div>
                {edu.gpa && <div className="text-xs text-gray-600">GPA: {edu.gpa}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {workExperience.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-bold mb-1 uppercase tracking-wider">Experience</h2>
            <div className="border-t border-gray-400 mb-2"></div>
            {workExperience.map((exp, index) => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between items-baseline mb-1">
                  <div className="text-xs">
                    <span className="font-semibold">{exp.position}</span>, {exp.company}
                  </div>
                  <div className="text-xs">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                <div className="text-xs text-justify mb-1">{exp.description}</div>
                {exp.achievements.filter(Boolean).length > 0 && (
                  <ul className="text-xs space-y-0.5">
                    {exp.achievements.filter(Boolean).map((achievement, achIndex) => (
                      <li key={achIndex} className="flex">
                        <span className="mr-2">•</span>
                        <span>{achievement}</span>
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
          <div className="mb-4">
            <h2 className="text-xs font-bold mb-1 uppercase tracking-wider">Skills</h2>
            <div className="border-t border-gray-400 mb-2"></div>
            <div className="text-xs">
              <span className="font-semibold">Technical:</span> {skills.filter(s => s.category === 'Technical').map(s => s.name).join(', ')}
            </div>
            {skills.filter(s => s.category === 'Soft').length > 0 && (
              <div className="text-xs mt-1">
                <span className="font-semibold">Soft Skills:</span> {skills.filter(s => s.category === 'Soft').map(s => s.name).join(', ')}
              </div>
            )}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-bold mb-1 uppercase tracking-wider">Projects</h2>
            <div className="border-t border-gray-400 mb-2"></div>
            {projects.map((project, index) => (
              <div key={project.id} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <div className="text-xs font-semibold">{project.name}</div>
                  <div className="text-xs">{formatDate(project.endDate)}</div>
                </div>
                <div className="text-xs text-justify">{project.description}</div>
                {project.technologies.length > 0 && (
                  <div className="text-xs text-gray-600 mt-1">
                    Technologies: {project.technologies.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}