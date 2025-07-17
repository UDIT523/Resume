import React from 'react';
import { ResumeData, ResumeTheme } from '../../../types/resume';

interface CompactTemplateProps {
  data: ResumeData;
  theme: ResumeTheme;
}

export default function CompactTemplate({ data, theme }: CompactTemplateProps) {
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
        fontFamily: 'Computer Modern Sans, Arial, sans-serif',
        fontSize: '9pt',
        color: '#000000',
        lineHeight: '1.0'
      }}
    >
      <div className="p-4 space-y-2">
        {/* Compact Header */}
        <div className="flex justify-between items-center mb-3 pb-1 border-b border-black">
          <div>
            <h1 className="text-lg font-bold" style={{ fontSize: '14pt' }}>
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <div className="text-xs">{personalInfo.location}</div>
          </div>
          <div className="text-xs text-right">
            <div>{personalInfo.phone}</div>
            <div>{personalInfo.email}</div>
            {personalInfo.website && <div>{personalInfo.website}</div>}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-4">
          {/* Left Column */}
          <div className="col-span-2 space-y-3">
            {/* Summary */}
            {summary && (
              <div>
                <h2 className="text-xs font-bold mb-1 uppercase">Summary</h2>
                <p className="text-xs text-justify leading-tight">{summary}</p>
              </div>
            )}

            {/* Experience */}
            {workExperience.length > 0 && (
              <div>
                <h2 className="text-xs font-bold mb-1 uppercase">Experience</h2>
                {workExperience.map((exp, index) => (
                  <div key={exp.id} className="mb-2">
                    <div className="flex justify-between items-baseline">
                      <div className="text-xs font-semibold">{exp.position}</div>
                      <div className="text-xs">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </div>
                    </div>
                    <div className="text-xs">{exp.company}, {exp.location}</div>
                    <div className="text-xs text-justify mt-1">{exp.description}</div>
                    {exp.achievements.filter(Boolean).length > 0 && (
                      <ul className="text-xs mt-1">
                        {exp.achievements.filter(Boolean).slice(0, 2).map((achievement, achIndex) => (
                          <li key={achIndex} className="flex">
                            <span className="mr-1">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <div>
                <h2 className="text-xs font-bold mb-1 uppercase">Projects</h2>
                {projects.slice(0, 2).map((project, index) => (
                  <div key={project.id} className="mb-2">
                    <div className="flex justify-between items-baseline">
                      <div className="text-xs font-semibold">{project.name}</div>
                      <div className="text-xs">{formatDate(project.endDate)}</div>
                    </div>
                    <div className="text-xs text-justify">{project.description}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {project.technologies.slice(0, 4).join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-3">
            {/* Education */}
            {education.length > 0 && (
              <div>
                <h2 className="text-xs font-bold mb-1 uppercase">Education</h2>
                {education.map((edu, index) => (
                  <div key={edu.id} className="mb-2">
                    <div className="text-xs font-semibold">{edu.degree}</div>
                    <div className="text-xs">{edu.field}</div>
                    <div className="text-xs">{edu.institution}</div>
                    <div className="text-xs">{formatDate(edu.endDate)}</div>
                    {edu.gpa && <div className="text-xs">GPA: {edu.gpa}</div>}
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h2 className="text-xs font-bold mb-1 uppercase">Skills</h2>
                <div className="space-y-2">
                  {['Technical', 'Soft'].map(category => {
                    const categorySkills = skills.filter(skill => skill.category === category);
                    if (categorySkills.length === 0) return null;
                    
                    return (
                      <div key={category}>
                        <div className="text-xs font-semibold">{category}:</div>
                        <div className="text-xs">
                          {categorySkills.map(skill => skill.name).join(', ')}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div>
                <h2 className="text-xs font-bold mb-1 uppercase">Languages</h2>
                {languages.map((lang, index) => (
                  <div key={lang.id} className="text-xs flex justify-between">
                    <span>{lang.name}</span>
                    <span>{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <div>
                <h2 className="text-xs font-bold mb-1 uppercase">Certifications</h2>
                {certifications.slice(0, 3).map((cert, index) => (
                  <div key={cert.id} className="mb-1">
                    <div className="text-xs font-semibold">{cert.name}</div>
                    <div className="text-xs">{cert.issuer}</div>
                    <div className="text-xs">{cert.date}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}