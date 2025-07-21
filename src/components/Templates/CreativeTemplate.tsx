import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { ResumeData, ResumeTheme } from '../../types/resume';

interface CreativeTemplateProps {
  data: ResumeData;
  theme: ResumeTheme;
}

export default function CreativeTemplate({ data, theme }: CreativeTemplateProps) {
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
    position: 'relative' as const,
    paddingLeft: '1rem'
  };

  const getSkillBarWidth = (level: string) => {
    switch (level) {
      case 'Beginner': return '25%';
      case 'Intermediate': return '50%';
      case 'Advanced': return '75%';
      case 'Expert': return '100%';
      default: return '50%';
    }
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
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-1/3 p-6" style={{ backgroundColor: theme.primaryColor + '15' }}>
          <div className="text-center mb-8">
            <div 
              className="w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold"
              style={{ backgroundColor: theme.primaryColor }}
            >
              {personalInfo.firstName.charAt(0)}{personalInfo.lastName.charAt(0)}
            </div>
            <h1 className="text-2xl font-bold mb-2" style={{ color: theme.primaryColor }}>
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
          </div>

          {/* Contact Info */}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4" style={{ color: theme.primaryColor }}>
              Contact
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" style={{ color: theme.primaryColor }} />
                <span>{personalInfo.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" style={{ color: theme.primaryColor }} />
                <span>{personalInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" style={{ color: theme.primaryColor }} />
                <span>{personalInfo.location}</span>
              </div>
              {personalInfo.website && (
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" style={{ color: theme.primaryColor }} />
                  <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="text-xs hover:underline">{personalInfo.website}</a>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center space-x-2">
                  <Linkedin className="h-4 w-4" style={{ color: theme.primaryColor }} />
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center space-x-2">
                  <Github className="h-4 w-4" style={{ color: theme.primaryColor }} />
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4" style={{ color: theme.primaryColor }}>
                Skills
              </h2>
              <div className="space-y-4">
                {skills.map(skill => (
                  <div key={skill.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs text-gray-500">{skill.level}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: getSkillBarWidth(skill.level),
                          backgroundColor: theme.primaryColor 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4" style={{ color: theme.primaryColor }}>
                Languages
              </h2>
              {languages.map(lang => (
                <div key={lang.id} className="mb-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{lang.name}</span>
                    <span className="text-xs text-gray-500">{lang.proficiency}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="w-2/3 p-8">
          {/* Summary */}
          {summary && (
            <div style={sectionStyle}>
              <h2 style={headingStyle}>
                <span className="absolute left-0 top-0 w-1 h-full rounded" style={{ backgroundColor: theme.primaryColor }}></span>
                About Me
              </h2>
              <p className="text-gray-700 leading-relaxed text-justify">{summary}</p>
            </div>
          )}

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <div style={sectionStyle}>
              <h2 style={headingStyle}>
                <span className="absolute left-0 top-0 w-1 h-full rounded" style={{ backgroundColor: theme.primaryColor }}></span>
                Experience
              </h2>
              {workExperience.map((exp, index) => (
                <div key={exp.id} className="mb-6 relative">
                  <div className="absolute left-0 top-0 w-3 h-3 rounded-full" style={{ backgroundColor: theme.primaryColor }}></div>
                  <div className="ml-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg" style={{ color: theme.secondaryColor }}>
                          {exp.position}
                        </h3>
                        <p className="text-gray-700 font-medium">{exp.company}</p>
                        <p className="text-gray-600 text-sm">{exp.location}</p>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2 text-justify">{exp.description}</p>
                    {exp.achievements.filter(Boolean).length > 0 && (
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {exp.achievements.filter(Boolean).map((achievement, achIndex) => (
                          <li key={achIndex} className="text-justify">{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div style={sectionStyle}>
              <h2 style={headingStyle}>
                <span className="absolute left-0 top-0 w-1 h-full rounded" style={{ backgroundColor: theme.primaryColor }}></span>
                Education
              </h2>
              {education.map((edu, index) => (
                <div key={edu.id} className="mb-4 relative">
                  <div className="absolute left-0 top-0 w-3 h-3 rounded-full" style={{ backgroundColor: theme.primaryColor }}></div>
                  <div className="ml-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold" style={{ color: theme.secondaryColor }}>
                          {edu.degree} in {edu.field}
                        </h3>
                        <p className="text-gray-700">{edu.institution}</p>
                        <p className="text-gray-600 text-sm">{edu.location}</p>
                        {edu.cgpa && <p className="text-gray-600 text-sm">CGPA: {edu.cgpa.toFixed(1)}</p>}
                        {edu.tenthPercentage && <p className="text-gray-600 text-sm">10th Percentage: {edu.tenthPercentage}</p>}
                        {edu.twelfthPercentage && <p className="text-gray-600 text-sm">12th Percentage: {edu.twelfthPercentage}</p>}
                        {edu.honors && <p className="text-gray-600 text-sm">{edu.honors}</p>}
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div style={sectionStyle}>
              <h2 style={headingStyle}>
                <span className="absolute left-0 top-0 w-1 h-full rounded" style={{ backgroundColor: theme.primaryColor }}></span>
                Projects
              </h2>
              {projects.map((project, index) => (
                <div key={project.id} className="mb-4 relative">
                  <div className="absolute left-0 top-0 w-3 h-3 rounded-full" style={{ backgroundColor: theme.primaryColor }}></div>
                  <div className="ml-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold" style={{ color: theme.secondaryColor }}>
                        {project.url ? (
                          <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {project.name}
                          </a>
                        ) : (
                          project.name
                        )}
                      </h3>
                      <span className="text-sm text-gray-600">
                        {formatDate(project.startDate)} - {formatDate(project.endDate)}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2 text-justify">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-2 py-1 text-xs rounded-full"
                          style={{ 
                            backgroundColor: theme.primaryColor + '20',
                            color: theme.primaryColor,
                            border: `1px solid ${theme.primaryColor}30`
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div style={sectionStyle}>
              <h2 style={headingStyle}>
                <span className="absolute left-0 top-0 w-1 h-full rounded" style={{ backgroundColor: theme.primaryColor }}></span>
                Certifications
              </h2>
              {certifications.map((cert, index) => (
                <div key={cert.id} className="mb-3 relative">
                  <div className="absolute left-0 top-0 w-3 h-3 rounded-full" style={{ backgroundColor: theme.primaryColor }}></div>
                  <div className="ml-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold" style={{ color: theme.secondaryColor }}>
                          {cert.credentialId ? (
                            <a href={cert.credentialId} target="_blank" rel="noopener noreferrer" className="hover:underline">
                              {cert.name}
                            </a>
                          ) : (
                            cert.name
                          )}
                        </h3>
                        <p className="text-gray-700 text-justify">{cert.issuer}</p>
                      </div>
                      <span className="text-sm text-gray-600">{cert.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Awards */}
          {awards.length > 0 && (
            <div style={sectionStyle}>
              <h2 style={headingStyle}>
                <span className="absolute left-0 top-0 w-1 h-full rounded" style={{ backgroundColor: theme.primaryColor }}></span>
                Awards
              </h2>
              {awards.map((award, index) => (
                <div key={award.id} className="mb-3 relative">
                  <div className="absolute left-0 top-0 w-3 h-3 rounded-full" style={{ backgroundColor: theme.primaryColor }}></div>
                  <div className="ml-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold" style={{ color: theme.secondaryColor }}>
                          {award.name}
                        </h3>
                        <p className="text-gray-700 text-justify">{award.issuer}</p>
                        <p className="text-gray-600 text-sm text-justify">{award.description}</p>
                      </div>
                      <span className="text-sm text-gray-600">{award.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
