import React from 'react';
import { useResume } from '../../context/ResumeContext';
import ModernTemplate from '../Templates/ModernTemplate';
import ProfessionalTemplate from '../Templates/ProfessionalTemplate';
import CreativeTemplate from '../Templates/CreativeTemplate';
import AcademicTemplate from '../Templates/LaTeX/AcademicTemplate';
import ClassicTemplate from '../Templates/LaTeX/ClassicTemplate';
import MinimalTemplate from '../Templates/LaTeX/MinimalTemplate';
import ElegantTemplate from '../Templates/LaTeX/ElegantTemplate';
import CompactTemplate from '../Templates/LaTeX/CompactTemplate';

export default function ResumePreview() {
  const { state } = useResume();
  const { data, theme, selectedTemplate } = state;

  const renderTemplate = () => {
    const props = { data, theme };
    
    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate {...props} />;
      case 'professional':
        return <ProfessionalTemplate {...props} />;
      case 'creative':
        return <CreativeTemplate {...props} />;
      case 'academic':
        return <AcademicTemplate {...props} />;
      case 'classic':
        return <ClassicTemplate {...props} />;
      case 'minimal':
        return <MinimalTemplate {...props} />;
      case 'elegant':
        return <ElegantTemplate {...props} />;
      case 'compact':
        return <CompactTemplate {...props} />;
      // For templates not yet implemented, fall back to professional
      case 'banking':
      case 'tech':
      case 'executive':
      case 'consulting':
      case 'healthcare':
      case 'legal':
      case 'sales':
      case 'startup':
      case 'international':
      case 'graduate':
      case 'freelancer':
      case 'nonprofit':
      case 'government':
        return <ProfessionalTemplate {...props} />;
      default:
        return <ModernTemplate {...props} />;
    }
  };

  return (
    <div className="w-full h-full bg-gray-100 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      <div className="max-w-4xl mx-auto">
        {renderTemplate()}
      </div>
    </div>
  );
}