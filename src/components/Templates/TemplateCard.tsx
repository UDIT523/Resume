import React from 'react';
import { Template } from '../../types';
import { Star, Users, CheckCircle } from 'lucide-react';

interface TemplateCardProps {
  template: Template;
  onSelect: (template: Template) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onSelect }) => {
  const getATSBadgeColor = (score: number) => {
    if (score >= 95) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 90) return 'bg-blue-100 text-blue-800 border-blue-200';
    return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  };

  return (
    <div
      onClick={() => onSelect(template)}
      className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Header with gradient background */}
      <div className={`h-40 ${template.color} p-4 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-black/20"></div>
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1">
              <span className="text-white text-xs font-medium">{template.category}</span>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getATSBadgeColor(template.atsScore || 90)}`}>
              ATS {template.atsScore || 90}%
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold text-lg mb-1 drop-shadow-sm">
              {template.name}
            </h3>
            <p className="text-white/90 text-sm drop-shadow-sm">
              {template.description}
            </p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 bg-white/20 rounded-full blur-lg"></div>
      </div>
      
      {/* Preview section */}
      <div className="p-4">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg h-40 mb-4 flex items-center justify-center relative overflow-hidden">
          {/* Mock resume preview */}
          <div className="w-full h-full p-3 bg-white rounded shadow-sm transform scale-75 origin-center">
            <div className="space-y-2">
              <div className={`h-2 rounded`} style={{ backgroundColor: template.colorScheme?.primary || '#3b82f6', width: '60%' }}></div>
              <div className="h-1 bg-gray-300 rounded w-full"></div>
              <div className="h-1 bg-gray-300 rounded w-4/5"></div>
              <div className="space-y-1 mt-3">
                <div className={`h-1 rounded`} style={{ backgroundColor: template.colorScheme?.accent || '#60a5fa', width: '40%' }}></div>
                <div className="h-1 bg-gray-200 rounded w-full"></div>
                <div className="h-1 bg-gray-200 rounded w-3/4"></div>
                <div className="h-1 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        {/* Stats and action */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>{template.usageCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span>4.8</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-green-600">
            <CheckCircle className="w-3 h-3" />
            <span className="text-xs font-medium">ATS Optimized</span>
          </div>
        </div>
        
        <button className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3 px-4 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 group-hover:shadow-lg transform group-hover:scale-105">
          Use This Template
        </button>
      </div>
    </div>
  );
};

export default TemplateCard;