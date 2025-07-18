import React from 'react';
import { Plus, Linkedin, Upload, BarChart3 } from 'lucide-react';

interface ActionCardsProps {
  onCreateResume: () => void;
  onImportLinkedIn: () => void;
  onUploadResume: () => void;
  onCheckScore: () => void;
}

const ActionCards: React.FC<ActionCardsProps> = ({
  onCreateResume,
  onImportLinkedIn,
  onUploadResume,
  onCheckScore
}) => {
  const actions = [
    {
      id: 'create',
      title: 'Create New Resume',
      description: 'Start fresh and build a professional resume in minutes.',
      icon: Plus,
      color: 'bg-purple-600',
      onClick: onCreateResume
    },
    {
      id: 'linkedin',
      title: 'Import from LinkedIn',
      description: 'Auto-generate your resume using your LinkedIn profile.',
      icon: Linkedin,
      color: 'bg-blue-600',
      onClick: onImportLinkedIn
    },
    {
      id: 'upload',
      title: 'Upload Existing Resume',
      description: 'Upload your current resume to enhance or update it with AI.',
      icon: Upload,
      color: 'bg-red-500',
      onClick: onUploadResume
    },
    {
      id: 'score',
      title: 'Check Resume Score',
      description: 'See how your resume performs and what to improve.',
      icon: BarChart3,
      color: 'bg-purple-600',
      onClick: onCheckScore
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={action.onClick}
              className="group bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 text-left"
            >
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {action.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {action.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ActionCards;