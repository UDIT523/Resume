import React from 'react';
import { Template, ResumeContent } from '../../types';

interface BuilderPreviewProps {
  template: Template;
  content: ResumeContent;
  isPreviewMode: boolean;
}

const BuilderPreview: React.FC<BuilderPreviewProps> = ({ template, content, isPreviewMode }) => {
  const colorScheme = template.colorScheme || {
    primary: '#2563eb',
    secondary: '#1e40af',
    accent: '#3b82f6',
    text: '#1f2937',
    background: '#ffffff'
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${isPreviewMode ? 'mx-auto max-w-4xl' : ''}`}>
      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-gray-900">Live Preview</h3>
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: colorScheme.primary }}
              ></div>
              <span className="text-sm text-gray-600">{template.name}</span>
            </div>
          </div>
          <p className="text-sm text-gray-600">Your resume will appear here as you edit</p>
        </div>
        
        <div 
          className="border-2 rounded-lg p-8 min-h-[800px]"
          style={{ 
            borderColor: colorScheme.accent + '40',
            backgroundColor: colorScheme.background 
          }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 
              className="text-3xl font-bold mb-2"
              style={{ color: colorScheme.primary }}
            >
              {content.personalInfo.fullName || 'Your Name'}
            </h1>
            <div 
              className="space-y-1"
              style={{ color: colorScheme.text + 'CC' }}
            >
              <p>{content.personalInfo.email || 'your.email@example.com'}</p>
              <p>{content.personalInfo.phone || '+1 (555) 123-4567'}</p>
              <p>{content.personalInfo.location || 'City, State'}</p>
              {content.personalInfo.linkedIn && (
                <p style={{ color: colorScheme.accent }}>{content.personalInfo.linkedIn}</p>
              )}
              {content.personalInfo.website && (
                <p style={{ color: colorScheme.accent }}>{content.personalInfo.website}</p>
              )}
            </div>
          </div>

          {/* Summary */}
          {content.personalInfo.summary && (
            <div className="mb-8">
              <h2 
                className="text-xl font-semibold mb-3 pb-1 border-b-2"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.accent 
                }}
              >
                Professional Summary
              </h2>
              <p 
                className="leading-relaxed"
                style={{ color: colorScheme.text }}
              >
                {content.personalInfo.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {content.experience.length > 0 && (
            <div className="mb-8">
              <h2 
                className="text-xl font-semibold mb-3 pb-1 border-b-2"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.accent 
                }}
              >
                Work Experience
              </h2>
              <div className="space-y-6">
                {content.experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 
                          className="font-semibold"
                          style={{ color: colorScheme.primary }}
                        >
                          {exp.position}
                        </h3>
                        <p style={{ color: colorScheme.secondary }}>
                          {exp.company} • {exp.location}
                        </p>
                      </div>
                      <div 
                        className="text-right text-sm"
                        style={{ color: colorScheme.text + 'AA' }}
                      >
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </div>
                    </div>
                    <ul 
                      className="list-disc list-inside space-y-1"
                      style={{ color: colorScheme.text }}
                    >
                      {exp.description.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {content.education.length > 0 && (
            <div className="mb-8">
              <h2 
                className="text-xl font-semibold mb-3 pb-1 border-b-2"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.accent 
                }}
              >
                Education
              </h2>
              <div className="space-y-4">
                {content.education.map((edu, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 
                          className="font-semibold"
                          style={{ color: colorScheme.primary }}
                        >
                          {edu.degree} in {edu.field}
                        </h3>
                        <p style={{ color: colorScheme.secondary }}>{edu.institution}</p>
                        {edu.gpa && (
                          <p 
                            className="text-sm"
                            style={{ color: colorScheme.text + 'AA' }}
                          >
                            GPA: {edu.gpa}
                          </p>
                        )}
                      </div>
                      <div 
                        className="text-right text-sm"
                        style={{ color: colorScheme.text + 'AA' }}
                      >
                        {edu.startDate} - {edu.endDate}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {content.skills.length > 0 && (
            <div className="mb-8">
              <h2 
                className="text-xl font-semibold mb-3 pb-1 border-b-2"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.accent 
                }}
              >
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {content.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-sm"
                    style={{ 
                      backgroundColor: colorScheme.accent + '20',
                      color: colorScheme.primary 
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {content.projects.length > 0 && (
            <div className="mb-8">
              <h2 
                className="text-xl font-semibold mb-3 pb-1 border-b-2"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.accent 
                }}
              >
                Projects
              </h2>
              <div className="space-y-6">
                {content.projects.map((project, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 
                          className="font-semibold"
                          style={{ color: colorScheme.primary }}
                        >
                          {project.name}
                        </h3>
                        {project.link && (
                          <a 
                            href={project.link} 
                            className="text-sm hover:underline"
                            style={{ color: colorScheme.accent }}
                          >
                            View Project
                          </a>
                        )}
                      </div>
                      {project.startDate && (
                        <div 
                          className="text-right text-sm"
                          style={{ color: colorScheme.text + 'AA' }}
                        >
                          {project.startDate} - {project.endDate || 'Present'}
                        </div>
                      )}
                    </div>
                    <p 
                      className="mb-2"
                      style={{ color: colorScheme.text }}
                    >
                      {project.description}
                    </p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 rounded text-xs"
                            style={{ 
                              backgroundColor: colorScheme.secondary + '20',
                              color: colorScheme.secondary 
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {content.certifications.length > 0 && (
            <div className="mb-8">
              <h2 
                className="text-xl font-semibold mb-3 pb-1 border-b-2"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.accent 
                }}
              >
                Certifications
              </h2>
              <div className="space-y-4">
                {content.certifications.map((cert, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 
                          className="font-semibold"
                          style={{ color: colorScheme.primary }}
                        >
                          {cert.name}
                        </h3>
                        <p style={{ color: colorScheme.secondary }}>{cert.issuer}</p>
                        {cert.link && (
                          <a 
                            href={cert.link} 
                            className="text-sm hover:underline"
                            style={{ color: colorScheme.accent }}
                          >
                            View Credential
                          </a>
                        )}
                      </div>
                      <div 
                        className="text-right text-sm"
                        style={{ color: colorScheme.text + 'AA' }}
                      >
                        {cert.date}
                        {cert.expiryDate && (
                          <div>Expires: {cert.expiryDate}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuilderPreview;