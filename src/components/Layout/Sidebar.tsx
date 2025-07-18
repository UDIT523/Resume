import React from 'react';
import { 
  User, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Award, 
  Folder, 
  Globe, 
  Trophy,
  Layout
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

const sections = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'summary', label: 'Summary', icon: FileText },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'projects', label: 'Projects', icon: Folder },
  { id: 'languages', label: 'Languages', icon: Globe },
  { id: 'awards', label: 'Awards', icon: Trophy }
];

interface SidebarProps {
  onTemplatesClick?: () => void;
}

export default function Sidebar({ onTemplatesClick }: SidebarProps) {
  const { state, dispatch } = useResume();

  const getSectionCompletion = (sectionId: string): number => {
    const { data } = state;
    
    switch (sectionId) {
      case 'personal':
        const personalFields = Object.values(data.personalInfo).filter(Boolean);
        return (personalFields.length / 5) * 100; // 5 required fields
      case 'summary':
        return data.summary.length > 50 ? 100 : 0;
      case 'experience':
        return data.workExperience.length > 0 ? 100 : 0;
      case 'education':
        return data.education.length > 0 ? 100 : 0;
      case 'skills':
        return data.skills.length > 0 ? 100 : 0;
      case 'certifications':
        return data.certifications.length > 0 ? 100 : 0;
      case 'projects':
        return data.projects.length > 0 ? 100 : 0;
      case 'languages':
        return data.languages.length > 0 ? 100 : 0;
      case 'awards':
        return data.awards.length > 0 ? 100 : 0;
      default:
        return 0;
    }
  };

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Resume Sections</h2>
        <nav className="space-y-2">
          {sections.map((section) => {
            const Icon = section.icon;
            const completion = getSectionCompletion(section.id);
            const isActive = state.currentSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => {
                  if (section.id === 'templates' && onTemplatesClick) {
                    onTemplatesClick();
                  } else {
                    dispatch({ type: 'SET_CURRENT_SECTION', payload: section.id });
                  }
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                  isActive && section.id !== 'templates'
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive && section.id !== 'templates' ? 'text-blue-600' : 'text-gray-500'}`} />
                <div className="flex-1">
                  <div className="font-medium">{section.label}</div>
                  {section.id !== 'templates' && (
                    <div className="flex items-center space-x-2 mt-1">
                    <div className="w-16 bg-gray-200 rounded-full h-1">
                      <div 
                        className={`h-1 rounded-full transition-all duration-300 ${
                          completion === 100 ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${completion}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{Math.round(completion)}%</span>
                  </div>
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
