import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { ResumeData, ResumeTheme } from '../../types/resume';

interface ProfessionalTemplateProps {
  data: ResumeData;
  theme: ResumeTheme;
}

export default function ProfessionalTemplate({ data, theme }: ProfessionalTemplateProps) {
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
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px'
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
      <div className="p-8 border-b-2" style={{ borderColor: theme.primaryColor }}>
        <div className="text-center">
          {personalInfo.profilePicture && (
            <img
              src={personalInfo.profilePicture}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4"
              style={{ borderColor: theme.primaryColor }}
            />
          )}
          <h1 className="text-3xl font-bold mb-2" style={{ color: theme.primaryColor }}>
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <div className="flex justify-center items-center space-x-6 text-gray-600">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>{personalInfo.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>{personalInfo.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>{personalInfo.location}</span>
            </div>
          </div>
          {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
            <div className="flex justify-center items-center space-x-4 mt-2 text-gray-600">
              {personalInfo.website && (
                <div className="flex items-center space-x-1">
                  <Globe className="h-4 w-4" />
                  <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline">{personalInfo.website}</a>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center space-x-1">
                  <Linkedin className="h-4 w-4" />
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center space-x-1">
                  <Github className="h-4 w-4" />
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {summary && (
          <div style={sectionStyle}>
            <h2 style={headingStyle}>Summary</h2>
            <p className="text-gray-700 leading-relaxed text-justify">{summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <div style={sectionStyle}>
            <h2 style={headingStyle}>Professional Experience</h2>
            {workExperience.map((exp, index) => (
              <div key={exp.id} className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg" style={{ color: theme.secondaryColor }}>
                      {exp.position}
                    </h3>
                    <p className="text-gray-700 font-medium">{exp.company} | {exp.location}</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-2 text-justify">{exp.description}</p>
                {exp.achievements.filter(Boolean).length > 0 && (
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    {exp.achievements.filter(Boolean).map((achievement, achIndex) => (
                      <li key={achIndex} className="text-justify">{achievement}</li>
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
                    <h3 className="font-bold" style={{ color: theme.secondaryColor }}>
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-gray-700">{edu.institution} | {edu.location}</p>
                    {edu.cgpa && <p className="text-gray-600 text-sm">CGPA: {edu.cgpa.toFixed(1)}</p>}
                    {edu.tenthPercentage && <p className="text-gray-600 text-sm">10th Percentage: {edu.tenthPercentage} ({edu.school}) - {edu.tenthPercentageYear}</p>}
                    {edu.twelfthPercentage && <p className="text-gray-600 text-sm">12th Percentage: {edu.twelfthPercentage} ({edu.school}) - {edu.twelfthPercentageYear}</p>}
                    {edu.honors && <p className="text-gray-600 text-sm">{edu.honors}</p>}
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div style={sectionStyle}>
            <h2 style={headingStyle}>Core Competencies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Technical', 'Soft', 'Language'].map(category => {
                const categorySkills = getSkillsByCategory(category);
                if (categorySkills.length === 0) return null;
                
                return (
                  <div key={category}>
                    <h3 className="font-bold mb-2" style={{ color: theme.secondaryColor }}>
                      {category === 'Technical' ? 'Technical Skills' : 
                       category === 'Soft' ? 'Soft Skills' : 'Languages'}
                    </h3>
                    <ul className="space-y-1">
                      {categorySkills.map(skill => (
                        <li key={skill.id} className="text-gray-700">
                          {skill.name} ({skill.level})
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div style={sectionStyle}>
            <h2 style={headingStyle}>Key Projects</h2>
            {projects.map((project, index) => (
              <div key={project.id} className="mb-4">
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
                      className="px-2 py-1 text-xs font-medium rounded"
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
            ))}
          </div>
        )}

        {/* Awards */}
        {awards.length > 0 && (
          <div style={sectionStyle}>
            <h2 style={headingStyle}>Awards & Recognition</h2>
            {awards.map((award, index) => (
              <div key={award.id} className="mb-3">
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
