import React, { useState } from 'react';
import { Template, ResumeContent } from '../../types';
import BuilderSidebar from './BuilderSidebar';
import BuilderPreview from './BuilderPreview';
import ResumeScoring from '../resume/ResumeScoring';
import JobMatchAnalyzer from '../ai/JobMatchAnalyzer';
import CoverLetterGenerator from '../ai/CoverLetterGenerator';
import { ArrowLeft, Save, Download, Eye, BarChart3, Target, FileText } from 'lucide-react';
import { saveResume, saveCurrentResume } from '../../utils/resumeStorage';
import { exportToPDF } from '../../utils/pdfExport';

interface ResumeBuilderProps {
  template: Template;
  initialContent?: ResumeContent;
  onBack: () => void;
}

const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ template, initialContent, onBack }) => {
  const [resumeContent, setResumeContent] = useState<ResumeContent>(initialContent || {
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedIn: '',
      website: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: []
  });

  const [activeSection, setActiveSection] = useState('personal');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showScoring, setShowScoring] = useState(false);
  const [showJobMatch, setShowJobMatch] = useState(false);
  const [showCoverLetter, setShowCoverLetter] = useState(false);

  const handleContentChange = (section: keyof ResumeContent, data: any) => {
    setResumeContent(prev => ({
      ...prev,
      [section]: data
    }));
    
    // Auto-save to localStorage
    saveCurrentResume({
      ...resumeContent,
      [section]: data
    });
  };

  const handleSave = () => {
    const resume = {
      id: Date.now().toString(),
      userId: 'current-user',
      title: `${resumeContent.personalInfo.fullName || 'Untitled'} Resume`,
      templateId: template.id,
      content: resumeContent,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    saveResume(resume);
    alert('Resume saved successfully!');
  };

  const handleExport = () => {
    exportToPDF(resumeContent, template);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <div className="text-sm text-gray-500">
                Editing: <span className="font-medium">{template.name}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                <Eye className="w-4 h-4" />
                <span>{isPreviewMode ? 'Edit' : 'Preview'}</span>
              </button>
              <button
                onClick={() => setShowScoring(!showScoring)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Score</span>
              </button>
              <button
                onClick={() => setShowJobMatch(!showJobMatch)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                <Target className="w-4 h-4" />
                <span>Job Match</span>
              </button>
              <button
                onClick={() => setShowCoverLetter(!showCoverLetter)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                <FileText className="w-4 h-4" />
                <span>Cover Letter</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={handleExport}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`grid gap-8 ${
          isPreviewMode 
            ? 'grid-cols-1' 
            : (showScoring || showJobMatch || showCoverLetter)
              ? 'grid-cols-1 lg:grid-cols-3' 
              : 'grid-cols-1 lg:grid-cols-3'
        }`}>
          {!isPreviewMode && (
            <div className="lg:col-span-1">
              <BuilderSidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                resumeContent={resumeContent}
                onContentChange={handleContentChange}
              />
            </div>
          )}
          
          <div className={
            isPreviewMode 
              ? 'lg:col-span-1' 
              : (showScoring || showJobMatch || showCoverLetter)
                ? 'lg:col-span-1' 
                : 'lg:col-span-2'
          }>
            <BuilderPreview
              template={template}
              content={resumeContent}
              isPreviewMode={isPreviewMode}
            />
          </div>
          
          {!isPreviewMode && (showScoring || showJobMatch || showCoverLetter) && (
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {showScoring && <ResumeScoring content={resumeContent} />}
                {showJobMatch && <JobMatchAnalyzer resumeContent={resumeContent} />}
                {showCoverLetter && <CoverLetterGenerator resumeContent={resumeContent} />}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;