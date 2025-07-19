import React, { useState, useEffect } from 'react';
import { ResumeProvider, useResume, initialState } from './context/ResumeContext';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import MainContent from './components/MainContent';
import ResumePreview from './components/Preview/ResumePreview';
import CustomizationPanel from './components/Customization/CustomizationPanel';
import ATSAnalysisPanel from './components/Analysis/ATSAnalysisPanel';
import AIAssistant from './components/AI/AIAssistant';
import TemplatesPage from './components/Templates/TemplatesPage';
import HomePage from './components/home/HomePage'; // Import HomePage
import { exportToPDF, exportToHTML, exportToWord } from './utils/exportUtils';
import { calculateATSScore } from './utils/atsAnalysis';

function AppContent() {
  const { state, dispatch } = useResume();
  const [showSettings, setShowSettings] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [hasSavedData, setHasSavedData] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('resumeBuilderData');
    setHasSavedData(!!savedData);
  }, []);

  // Debug function to test AI toggle
  const handleToggleAI = () => {
    console.log('AI Assistant button clicked, current state:', showAI);
    setShowAI(!showAI);
    console.log('AI Assistant state after toggle:', !showAI);
  };

  // Calculate completion percentage
  useEffect(() => {
    const calculateCompletion = () => {
      const { data } = state;
      let completed = 0;
      let total = 9; // Total sections

      // Personal info
      const personalFields = Object.values(data.personalInfo).filter(Boolean);
      if (personalFields.length >= 5) completed += 1;

      // Summary
      if (data.summary && data.summary.length > 50) completed += 1;

      // Work experience
      if (data.workExperience.length > 0) completed += 1;

      // Education
      if (data.education.length > 0) completed += 1;

      // Skills
      if (data.skills.length > 0) completed += 1;

      // Certifications
      if (data.certifications.length > 0) completed += 1;

      // Projects
      if (data.projects.length > 0) completed += 1;

      // Languages
      if (data.languages.length > 0) completed += 1;

      // Awards
      if (data.awards.length > 0) completed += 1;

      return Math.round((completed / total) * 100);
    };

    const percentage = calculateCompletion();
    dispatch({ type: 'SET_CURRENT_SECTION', payload: state.currentSection });
    
    // Update completion percentage in context if needed
    if (state.completionPercentage !== percentage) {
      // We'll update the context to include completion percentage
      (state as any).completionPercentage = percentage;
    }
  }, [state.data, dispatch]);

  // Calculate ATS score
  useEffect(() => {
    const atsAnalysis = calculateATSScore(state.data);
    dispatch({ type: 'UPDATE_ATS_ANALYSIS', payload: atsAnalysis });
  }, [state.data, dispatch]);

  const handleExport = (format: 'pdf' | 'html' | 'word') => {
    const { data, theme } = state;
    
    switch (format) {
      case 'pdf':
        exportToPDF();
        break;
      case 'html':
        exportToHTML(data, theme);
        break;
      case 'word':
        exportToWord(data, theme);
        break;
    }
    
    setShowExportMenu(false);
  };

  const handleSave = () => {
    localStorage.setItem('resumeBuilderData', JSON.stringify(state));
    // Optionally, show a notification to the user
    alert('Progress saved!');
  };

  const handleStartNew = () => {
    localStorage.removeItem('resumeBuilderData');
    dispatch({ type: 'LOAD_DATA', payload: initialState });
    setSessionStarted(true);
  };

  const handleLoad = () => {
    const savedData = localStorage.getItem('resumeBuilderData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_DATA', payload: parsedData });
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
    setSessionStarted(true);
  };

  const handleGoHome = () => {
    setSessionStarted(false);
  };

  const completionPercentage = (() => {
    const { data } = state;
    let completed = 0;
    let total = 9;

    const personalFields = Object.values(data.personalInfo).filter(Boolean);
    if (personalFields.length >= 5) completed += 1;
    if (data.summary && data.summary.length > 50) completed += 1;
    if (data.workExperience.length > 0) completed += 1;
    if (data.education.length > 0) completed += 1;
    if (data.skills.length > 0) completed += 1;
    if (data.certifications.length > 0) completed += 1;
    if (data.projects.length > 0) completed += 1;
    if (data.languages.length > 0) completed += 1;
    if (data.awards.length > 0) completed += 1;

    return Math.round((completed / total) * 100);
  })();

  if (!sessionStarted) {
    return <HomePage onStartNew={handleStartNew} onLoad={handleLoad} />;
  }

  if (showTemplates) {
    return <TemplatesPage />;
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Header
        onExport={() => setShowExportMenu(!showExportMenu)}
        onToggleSettings={() => setShowSettings(!showSettings)}
        onToggleAnalysis={() => setShowAnalysis(!showAnalysis)}
        onToggleAI={handleToggleAI}
        onSave={handleSave}
        onLoad={handleLoad}
        onGoHome={handleGoHome} // Pass onGoHome prop
      />
      
      {/* Export Menu */}
      {showExportMenu && (
        <div className="absolute top-16 right-4 z-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[150px]">
          <button
            onClick={() => handleExport('pdf')}
            className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
          >
            Export as PDF
          </button>
          <button
            onClick={() => handleExport('html')}
            className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
          >
            Export as HTML
          </button>
          <button
            onClick={() => handleExport('word')}
            className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
          >
            Export as Word
          </button>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        <Sidebar onTemplatesClick={() => setShowTemplates(true)} />
        <MainContent />
        <div id="resume-preview-container" className="w-1/2 border-l border-gray-200">
          <ResumePreview />
        </div>
      </div>

      <CustomizationPanel 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
      
      <ATSAnalysisPanel 
        isOpen={showAnalysis} 
        onClose={() => setShowAnalysis(false)} 
      />
      
      <AIAssistant 
        isOpen={showAI} 
        onClose={() => setShowAI(false)} 
      />
    </div>
  );
}

function App() {
  return (
    <ResumeProvider>
      <AppContent />
    </ResumeProvider>
  );
}

export default App;
