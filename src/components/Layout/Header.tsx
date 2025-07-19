import React from 'react';
import { FileText, Download, Settings, BarChart3, Bot, Save, FolderOpen } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

interface HeaderProps {
  onExport: () => void;
  onToggleSettings: () => void;
  onToggleAnalysis: () => void;
  onToggleAI: () => void;
  onSave: () => void;
  onLoad: () => void; // Added onLoad prop
}

export default function Header({ onExport, onToggleSettings, onToggleAnalysis, onToggleAI, onSave, onLoad }: HeaderProps) {
  const { state } = useResume();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">Resume Builder</h1>
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
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              <BarChart3 className="h-4 w-4" />
              <span>ATS Score: {state.atsAnalysis.score}%</span>
            </button>
            
            <button
              onClick={onToggleAI}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors rounded-lg cursor-pointer"
              type="button"
              aria-label="Open AI Assistant"
            >
              <Bot className="h-4 w-4" />
              <span>AI Assistant</span>
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
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FolderOpen className="h-4 w-4" />
              <span>Load</span>
            </button>
            
            <button
              onClick={onSave}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Save Progress</span>
            </button>
            
            <button
              onClick={onExport}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
