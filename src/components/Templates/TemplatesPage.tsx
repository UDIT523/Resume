import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';

const templates = [
  { id: 'modern', name: 'Modern', description: 'Clean and contemporary design' },
  { id: 'professional', name: 'Professional', description: 'Traditional corporate style' },
  { id: 'creative', name: 'Creative', description: 'Unique and eye-catching layout' },
  { id: 'minimalist', name: 'Minimalist', description: 'Simple and elegant' },
  { id: 'academic', name: 'Academic', description: 'Formatted for CVs and academic roles' },
  { id: 'compact', name: 'Compact', description: 'Space-efficient and concise' },
  { id: 'elegant', name: 'Elegant', description: 'Stylish and sophisticated' },
  { id: 'classic', name: 'Classic', description: 'Timeless and traditional' },
  { id: 'chronological', name: 'Chronological', description: 'Highlights work history in reverse order' },
  { id: 'functional', name: 'Functional', description: 'Emphasizes skills over chronological work history' },
  { id: 'combination', name: 'Combination', description: 'Blends chronological and functional elements' },
  { id: 'infographic', name: 'Infographic', description: 'Visual and creative representation of skills and experience' },
  { id: 'tech', name: 'Tech', description: 'Optimized for technology and IT roles' },
  { id: 'executive', name: 'Executive', description: 'Designed for senior-level professionals' },
  { id: 'student', name: 'Student', description: 'Tailored for students and recent graduates' },
];

export default function TemplatesPage() {
  const { state, dispatch } = useResume();
  const [activeTab, setActiveTab] = useState('template');

  const handleTemplateChange = (templateId: string) => {
    dispatch({ type: 'SET_TEMPLATE', payload: templateId });
  };

  return (
    <div className="p-6 bg-white h-full overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      
      <div className="flex border-b mb-6">
        <button 
          onClick={() => setActiveTab('template')}
          className={`px-4 py-2 text-lg font-medium ${activeTab === 'template' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        >
          Template
        </button>
        <button 
          onClick={() => setActiveTab('colors')}
          className={`px-4 py-2 text-lg font-medium ${activeTab === 'colors' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        >
          Colors
        </button>
        <button 
          onClick={() => setActiveTab('fonts')}
          className={`px-4 py-2 text-lg font-medium ${activeTab === 'fonts' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        >
          Fonts
        </button>
      </div>

      {activeTab === 'template' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Choose Template</h2>
          <div className="space-y-4">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => handleTemplateChange(template.id)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  state.selectedTemplate === template.id
                    ? 'bg-blue-50 border-blue-500 shadow-md'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{template.name}</h3>
                    <p className="text-gray-600">{template.description}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 ${state.selectedTemplate === template.id ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                    {state.selectedTemplate === template.id && <div className="w-full h-full bg-white rounded-full transform scale-50"></div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'colors' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Choose Color Scheme</h2>
          <p>Color options will be available here.</p>
        </div>
      )}

      {activeTab === 'fonts' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Choose Font</h2>
          <p>Font options will be available here.</p>
        </div>
      )}
    </div>
  );
}
