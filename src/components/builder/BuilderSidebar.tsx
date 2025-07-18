import React from 'react';
import { ResumeContent } from '../../types';
import { User, Briefcase, GraduationCap, Code, FolderOpen, Award, Sparkles } from 'lucide-react';
import PersonalInfoForm from './forms/PersonalInfoForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import ProjectsForm from './forms/ProjectsForm';
import CertificationsForm from './forms/CertificationsForm';
import AIAssistant from '../ai/AIAssistant';

interface BuilderSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  resumeContent: ResumeContent;
  onContentChange: (section: keyof ResumeContent, data: any) => void;
}

const BuilderSidebar: React.FC<BuilderSidebarProps> = ({
  activeSection,
  onSectionChange,
  resumeContent,
  onContentChange
}) => {
  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'certifications', label: 'Certifications', icon: Award }
  ];

  const renderForm = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <PersonalInfoForm
            data={resumeContent.personalInfo}
            onChange={(data) => onContentChange('personalInfo', data)}
          />
        );
      case 'experience':
        return (
          <ExperienceForm
            data={resumeContent.experience}
            onChange={(data) => onContentChange('experience', data)}
          />
        );
      case 'education':
        return (
          <EducationForm
            data={resumeContent.education}
            onChange={(data) => onContentChange('education', data)}
          />
        );
      case 'skills':
        return (
          <SkillsForm
            data={resumeContent.skills}
            onChange={(data) => onContentChange('skills', data)}
          />
        );
      case 'projects':
        return (
          <ProjectsForm
            data={resumeContent.projects}
            onChange={(data) => onContentChange('projects', data)}
          />
        );
      case 'certifications':
        return (
          <CertificationsForm
            data={resumeContent.certifications}
            onChange={(data) => onContentChange('certifications', data)}
          />
        );
      default:
        return <div className="p-4 text-gray-500">Select a section to edit</div>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="border-b border-gray-200">
        <nav className="flex flex-col">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                    : 'text-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{section.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 max-h-[400px] overflow-y-auto">
        {renderForm()}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <AIAssistant
          resumeContent={resumeContent}
          onContentUpdate={onContentChange}
          activeSection={activeSection}
        />
      </div>
    </div>
  );
};

export default BuilderSidebar;