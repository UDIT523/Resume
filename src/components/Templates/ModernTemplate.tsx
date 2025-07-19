import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { ResumeData, ResumeTheme } from '../../types/resume';

interface ModernTemplateProps {
  data: ResumeData;
  theme: ResumeTheme;
}

export default function ModernTemplate({ data, theme }: ModernTemplateProps) {
  const { personalInfo, summary, workExperience, education, skills, certifications, projects, languages, awards } = data;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  const sectionStyle = {
    marginBottom: theme.spacing,
    color: theme.textColor
  };

  const headingStyle = {
    color: theme.primaryColor,
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '0.75rem',
    borderBottom: `2px solid ${theme.primaryColor}`,
    paddingBottom: '0.5rem'
  };

  return (
    <div 
      className="max-w-4xl mx-auto bg-white shadow-lg"
      style={{ 
        fontFamily: theme.fontFamily,
        fontSize: theme.fontSize,
        color: theme.textColor,
        backgroundColor: theme.backgroundColor
      }}
    >
      {/* Header */}
      <div 
        className="p-8 text-white"
        style={{ backgroundColor: theme.primaryColor }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <p className="text-lg opacity-90 mb-4">{personalInfo.email}</p>
          </div>
          <div className="text-right space-y-2">
            <div className="flex items-center justify-end space-x-2">
              <Phone className="h-4 w-4" />
              <span>{personalInfo.phone}</span>
            </div>
            <div className="flex items-center justify-end space-x-2">
              <MapPin className="h-4 w-4" />
              <span>{personalInfo.location}</span>
            </div>
            {personalInfo.website && (
              <div className="flex items-center justify-end space-x-2">
                <Globe className="h-4 w-4" />
                <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline">{personalInfo.website}</a>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center justify-end space-x-2">
                <Linkedin className="h-4 w-4" />
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center justify-end space-x-2">
                <Github className="h-4 w-4" />
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {summary && (
          <div style={sectionStyle}>
            <h2 style={headingStyle}>Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <div style={sectionStyle}>
            <h2 style={headingStyle}>Work Experience</h2>
            {workExperience.map((exp, index) => (
              <div key={exp.id} className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg" style={{ color: theme.secondaryColor }}>
                      {exp.position}
                    </h3>
                    <p className="text-gray-700 font-medium">{exp.company}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{exp.location}</p>
                    <p>{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{exp.description}</p>
                {exp.achievements.filter(Boolean).length > 0 && (
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {exp.achievements.filter(Boolean).map((achievement, achIndex) => (
                      <li key={achIndex}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div style={sectionStyle}>
            <h2 style={headingStyle}>Education</h2>
            {education.map((edu, index) => (
              <div key={edu.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold" style={{ color: theme.secondaryColor }}>
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-gray-700">{edu.institution}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{edu.location}</p>
                    <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                  </div>
                </div>
                {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                {edu.honors && <p className="text-gray-600 text-sm">{edu.honors}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div style={sectionStyle}>
            <h2 style={headingStyle}>Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Technical', 'Soft', 'Language'].map(category => {
                const categorySkills = getSkillsByCategory(category);
                if (categorySkills.length === 0) return null;
                
                return (
                  <div key={category}>
                    <h3 className="font-semibold mb-2" style={{ color: theme.secondaryColor }}>
                      {category === 'Technical' ? 'Technical Skills' : 
                       category === 'Soft' ? 'Soft Skills' : 'Languages'}
                    </h3>
                    <div className="space-y-1">
                      {categorySkills.map(skill => (
                        <div key={skill.id} className="flex items-center justify-between">
                          <span className="text-gray-700">{skill.name}</span>
                          <span className="text-sm text-gray-500">{skill.level}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div style={sectionStyle}>
            <h2 style={headingStyle}>Projects</h2>
            {projects.map((project, index) => (
              <div key={project.id} className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold" style={{ color: theme.secondaryColor }}>
                    {project.name}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {formatDate(project.startDate)} - {formatDate(project.endDate)}
                  </span>
                </div>
                <p className="text-gray-700 mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 text-xs rounded-full"
                      style={{ 
                        backgroundColor: theme.primaryColor + '20',
                        color: theme.primaryColor
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div style={sectionStyle}>
            <h2 style={headingStyle}>Certifications</h2>
            {certifications.map((cert, index) => (
              <div key={cert.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold" style={{ color: theme.secondaryColor }}>
                      {cert.name}
                    </h3>
                    <p className="text-gray-700">{cert.issuer}</p>
                  </div>
                  <span className="text-sm text-gray-600">{cert.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Awards */}
        {awards.length > 0 && (
          <div style={sectionStyle}>
            <h2 style={headingStyle}>Awards & Achievements</h2>
            {awards.map((award, index) => (
              <div key={award.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold" style={{ color: theme.secondaryColor }}>
                      {award.name}
                    </h3>
                    <p className="text-gray-700">{award.issuer}</p>
                    <p className="text-gray-600 text-sm">{award.description}</p>
                  </div>
                  <span className="text-sm text-gray-600">{award.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
