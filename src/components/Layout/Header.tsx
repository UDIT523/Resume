import React from 'react';
import { FileText, Download, Settings, BarChart3, Bot, Save, FolderOpen, Eye } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

interface HeaderProps {
  onExport: () => void;
  onToggleSettings: () => void;
  onToggleAnalysis: () => void;
  onToggleAI: () => void;
  onSave: () => void;
  onLoad: () => void;
  onGoHome: () => void;
  onTogglePreview: () => void;
  onToggleLivePreview: () => void;
}

export default function Header({ onExport, onToggleSettings, onToggleAnalysis, onToggleAI, onSave, onLoad, onGoHome, onTogglePreview, onToggleLivePreview }: HeaderProps) {
  const { state } = useResume();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3 mr-8">
            <button
              onClick={onGoHome}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Go to Home"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-gray-900 whitespace-nowrap">Resume Builder</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Progress:</span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${state.completionPercentage}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-900">
                {Math.round(state.completionPercentage)}%
              </span>
            </div>
            
            <button
              onClick={onToggleAnalysis}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="whitespace-nowrap">ATS Score: {state.atsAnalysis.score}%</span>
            </button>
            
            <button
              onClick={onToggleAI}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors rounded-lg cursor-pointer"
              type="button"
              aria-label="Open AI Assistant"
            >
              <Bot className="h-4 w-4" />
              <span className="whitespace-nowrap">AI Assistant</span>
            </button>
            
            <button
              onClick={onToggleSettings}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="h-5 w-5" />
            </button>

            {/* Load Button */}
            <button
              onClick={onLoad}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-xl hover:bg-gray-800 transition-colors"
            >
              <FolderOpen className="h-4 w-4" />
              <span>Load</span>
            </button>
            
            <button
              onClick={onSave}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors whitespace-nowrap"
            >
              <Save className="h-4 w-4" />
              <span>Save Progress</span>
            </button>
            
            {/* Export Button */}
            <button
              onClick={() => {
                console.log('Export button clicked in Header');
                onExport();
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>

            {/* Full-screen Preview Button */}
            <button
              onClick={onTogglePreview}
              className="flex items-center space-x-1 px-2 py-1 text-xs font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-lg"
              aria-label="Toggle Full-screen Preview"
            >
              <Eye className="h-4 w-4" />
              <span>Full Preview</span>
            </button>

            {/* Live Preview Button */}
            <button
              onClick={onToggleLivePreview}
              className="flex items-center space-x-1 px-2 py-1 text-xs font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-lg"
              aria-label="Toggle Live Preview"
            >
              <Eye className="h-4 w-4" />
              <span>Live Preview</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
