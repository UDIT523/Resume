import React, { useState } from 'react';
import { X, Palette, Type, Layout, ArrowLeft } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { TemplateType } from '../../types/resume';

interface CustomizationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomizationPanel({ isOpen, onClose }: CustomizationPanelProps) {
  const { state, dispatch } = useResume();
  const { theme, selectedTemplate } = state;
  const [activeTab, setActiveTab] = useState<'template' | 'colors' | 'fonts'>('template');
  const [isTemplateView, setTemplateView] = useState(false);

  const templates: { id: TemplateType; name: string; description: string }[] = [
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

  const fonts = [
    { id: 'Inter', name: 'Inter', category: 'Sans-serif' },
    { id: 'Roboto', name: 'Roboto', category: 'Sans-serif' },
    { id: 'Georgia', name: 'Georgia', category: 'Serif' },
    { id: 'Times New Roman', name: 'Times New Roman', category: 'Serif' },
    { id: 'Arial', name: 'Arial', category: 'Sans-serif' }
  ];

  const colorPresets = [
    { name: 'Blue', primary: '#2563eb', secondary: '#1e40af' },
    { name: 'Green', primary: '#059669', secondary: '#047857' },
    { name: 'Purple', primary: '#7c3aed', secondary: '#6d28d9' },
    { name: 'Red', primary: '#dc2626', secondary: '#b91c1c' },
    { name: 'Orange', primary: '#ea580c', secondary: '#c2410c' },
    { name: 'Teal', primary: '#0d9488', secondary: '#0f766e' }
  ];

  const handleTemplateChange = (templateId: TemplateType) => {
    dispatch({ type: 'SET_TEMPLATE', payload: templateId });
  };

  const handleColorChange = (field: string, color: string) => {
    dispatch({ type: 'UPDATE_THEME', payload: { [field]: color } });
  };

  const handleFontChange = (font: string) => {
    dispatch({ type: 'UPDATE_THEME', payload: { fontFamily: font } });
  };

  const handlePresetApply = (preset: typeof colorPresets[0]) => {
    dispatch({
      type: 'UPDATE_THEME',
      payload: {
        primaryColor: preset.primary,
        secondaryColor: preset.secondary
      }
    });
  };

  const handleClose = () => {
    if (isTemplateView) {
      setTemplateView(false);
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleClose} />
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          {isTemplateView ? (
            <button
              onClick={() => setTemplateView(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-xl font-bold text-gray-900">Back</span>
            </button>
          ) : (
            <h2 className="text-xl font-bold text-gray-900">Customize Resume</h2>
          )}
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {!isTemplateView ? (
          <div className="flex border-b">
            <button
              onClick={() => setTemplateView(true)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'template'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            <Layout className="h-4 w-4" />
            <span>Template</span>
          </button>
          <button
            onClick={() => setActiveTab('colors')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'colors'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            <Palette className="h-4 w-4" />
            <span>Colors</span>
          </button>
          <button
            onClick={() => setActiveTab('fonts')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'fonts'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            <Type className="h-4 w-4" />
            <span>Fonts</span>
          </button>
        </div>

        ) : null}

        <div className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {isTemplateView ? (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 mb-4">Choose Template</h3>
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleTemplateChange(template.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedTemplate === template.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{template.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedTemplate === template.id
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-300'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {activeTab === 'colors' ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Color Presets</h3>
                <div className="grid grid-cols-3 gap-3">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => handlePresetApply(preset)}
                      className="p-3 border rounded-lg hover:border-gray-300 transition-colors"
                    >
                      <div className="flex space-x-2 mb-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: preset.primary }}
                        />
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: preset.secondary }}
                        />
                      </div>
                      <span className="text-sm text-gray-700">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Custom Colors</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Color
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={theme.primaryColor}
                        onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                        className="w-12 h-10 rounded border border-gray-300"
                      />
                      <input
                        type="text"
                        value={theme.primaryColor}
                        onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Secondary Color
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={theme.secondaryColor}
                        onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                        className="w-12 h-10 rounded border border-gray-300"
                      />
                      <input
                        type="text"
                        value={theme.secondaryColor}
                        onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Text Color
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={theme.textColor}
                        onChange={(e) => handleColorChange('textColor', e.target.value)}
                        className="w-12 h-10 rounded border border-gray-300"
                      />
                      <input
                        type="text"
                        value={theme.textColor}
                        onChange={(e) => handleColorChange('textColor', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
              ) : activeTab === 'fonts' ? (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Font Family</h3>
                  {fonts.map((font) => (
                    <div
                      key={font.id}
                      onClick={() => handleFontChange(font.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        theme.fontFamily === font.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900" style={{ fontFamily: font.id }}>
                            {font.name}
                          </h4>
                          <p className="text-sm text-gray-600">{font.category}</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          theme.fontFamily === font.id
                            ? 'bg-blue-500 border-blue-500'
                            : 'border-gray-300'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
