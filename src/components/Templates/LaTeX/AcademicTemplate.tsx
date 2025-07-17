import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { ResumeData, ResumeTheme } from '../../../types/resume';

interface AcademicTemplateProps {
  data: ResumeData;
  theme: ResumeTheme;
}

export default function AcademicTemplate({ data, theme }: AcademicTemplateProps) {
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
        fontFamily: 'Times New Roman, serif',
        fontSize: '11pt',
        color: '#000000',
        lineHeight: '1.2'
      }}
    >
      {/* Header */}
      <div className="text-center py-6 border-b-2 border-black">
        <h1 className="text-2xl font-bold mb-2" style={{ fontSize: '18pt' }}>
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="text-sm space-y-1">
          <div>{personalInfo.location}</div>
          <div>{personalInfo.phone} • {personalInfo.email}</div>
          {personalInfo.website && <div>{personalInfo.website}</div>}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Research Interests / Summary */}
        {summary && (
          <div>
            <h2 className="text-sm font-bold mb-2 uppercase tracking-wide border-b border-gray-400 pb-1">
              Research Interests
            </h2>
            <p className="text-justify">{summary}</p>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-sm font-bold mb-2 uppercase tracking-wide border-b border-gray-400 pb-1">
              Education
            </h2>
            {education.map((edu, index) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold">{edu.degree} in {edu.field}</div>
                    <div className="italic">{edu.institution}, {edu.location}</div>
                    {edu.gpa && <div className="text-sm">GPA: {edu.gpa}</div>}
                    {edu.honors && <div className="text-sm font-medium">{edu.honors}</div>}
                  </div>
                  <div className="text-sm">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {workExperience.length > 0 && (
          <div>
            <h2 className="text-sm font-bold mb-2 uppercase tracking-wide border-b border-gray-400 pb-1">
              Experience
            </h2>
            {workExperience.map((exp, index) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <div className="font-bold">{exp.position}</div>
                    <div className="italic">{exp.company}, {exp.location}</div>
                  </div>
                  <div className="text-sm">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                <div className="text-sm text-justify">{exp.description}</div>
                {exp.achievements.filter(Boolean).length > 0 && (
                  <ul className="list-disc list-inside text-sm mt-1 space-y-0.5">
                    {exp.achievements.filter(Boolean).map((achievement, achIndex) => (
                      <li key={achIndex}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Publications would go here in a real academic CV */}
        
        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-sm font-bold mb-2 uppercase tracking-wide border-b border-gray-400 pb-1">
              Technical Skills
            </h2>
            <div className="text-sm">
              {skills.map((skill, index) => (
                <span key={skill.id}>
                  {skill.name}
                  {index < skills.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Awards */}
        {awards.length > 0 && (
          <div>
            <h2 className="text-sm font-bold mb-2 uppercase tracking-wide border-b border-gray-400 pb-1">
              Honors and Awards
            </h2>
            {awards.map((award, index) => (
              <div key={award.id} className="mb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{award.name}</div>
                    <div className="text-sm italic">{award.issuer}</div>
                    {award.description && <div className="text-sm">{award.description}</div>}
                  </div>
                  <div className="text-sm">{award.date}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}