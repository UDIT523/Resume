import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  const [showPreview, setShowPreview] = useState(false); // State for full-screen preview visibility
  const [showLivePreview, setShowLivePreview] = useState(true); // State for live preview visibility
  const [mainContentWidth, setMainContentWidth] = useState(60); // Initial width for MainContent in percentage
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [hasSavedData, setHasSavedData] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('resumeBuilderData');
    setHasSavedData(!!savedData);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;

    // Ensure minimum width for both panels
    const minWidth = 20; // Minimum percentage width for each panel
    if (newWidth > minWidth && (100 - newWidth) > minWidth) {
      setMainContentWidth(newWidth);
    }
  }, [isResizing]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // Debug function to test AI toggle
  const handleToggleAI = () => {
    console.log('AI Assistant button clicked, current state:', showAI);
    setShowAI(!showAI);
    console.log('AI Assistant state after toggle:', !showAI);
  };

  const handleToggleExportMenu = () => {
    console.log('Export button clicked, current showExportMenu state:', showExportMenu);
    setShowExportMenu(!showExportMenu);
  };

  // Handler for full-screen preview toggle
  const handleTogglePreview = () => {
    setShowPreview(!showPreview);
    setShowLivePreview(false); // Hide live preview when full-screen preview is active
  };

  // Handler for live preview toggle
  const handleToggleLivePreview = () => {
    setShowLivePreview(!showLivePreview);
    setShowPreview(false); // Hide full-screen preview when live preview is active
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

  const handleExport = async (format: 'pdf' | 'html' | 'word') => {
    const { data, theme } = state;
    
    try {
      switch (format) {
        case 'pdf':
          await exportToPDF();
          break;
        case 'html':
          exportToHTML(data, theme);
          break;
        case 'word':
          await exportToWord(data, theme);
          break;
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('An error occurred during the export process. Please check the console for details.');
    } finally {
      setShowExportMenu(false);
    }
  };

  const handleSave = async () => {
    const dataToSave = {
      data: state.data,
      theme: state.theme,
      selectedTemplate: state.selectedTemplate,
    };
    const jsonString = JSON.stringify(dataToSave, null, 2);

    if ('showSaveFilePicker' in window) {
      try {
        const fileHandle = await (window as any).showSaveFilePicker({
          suggestedName: 'resumind_progress.json',
          types: [{
            description: 'JSON Files',
            accept: { 'application/json': ['.json'] },
          }],
        });
        const writable = await fileHandle.createWritable();
        await writable.write(jsonString);
        await writable.close();
        alert('Progress saved to file!');
      } catch (error) {
        console.error('Error saving file:', error);
        alert('Failed to save progress to file. Please try again or check console for details.');
      }
    } else {
      // Fallback for browsers that do not support showSaveFilePicker
      localStorage.setItem('resumeBuilderData', jsonString);
      alert('Progress saved to browser storage (your browser does not support saving to file directly).');
    }
  };

  const handleStartNew = () => {
    localStorage.removeItem('resumeBuilderData');
    dispatch({ type: 'LOAD_DATA', payload: initialState });
    setSessionStarted(true); // This will render the resume builder interface
  };

  const handleLoad = async () => {
    if ('showOpenFilePicker' in window) {
      try {
        const [fileHandle] = await (window as any).showOpenFilePicker({
          types: [{
            description: 'JSON Files',
            accept: { 'application/json': ['.json'] },
          }],
          multiple: false,
        });
        const file = await fileHandle.getFile();
        const contents = await file.text();
        const parsedData = JSON.parse(contents); // Corrected typo here

        const loadedState = {
          ...initialState,
          data: parsedData.data || initialState.data,
          theme: parsedData.theme || initialState.theme,
          selectedTemplate: parsedData.selectedTemplate || initialState.selectedTemplate,
        };
        dispatch({ type: 'LOAD_DATA', payload: loadedState });
        alert('Progress loaded from file!');
      } catch (error) {
        console.error('Error loading file:', error);
        alert('Failed to load progress from file. Please try again or check console for details.');
      }
    } else {
      // Fallback for browsers that do not support showOpenFilePicker
      const savedData = localStorage.getItem('resumeBuilderData');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          const loadedState = {
            ...initialState,
            data: parsedData.data || initialState.data,
            theme: parsedData.theme || initialState.theme,
            selectedTemplate: parsedData.selectedTemplate || initialState.selectedTemplate,
          };
          dispatch({ type: 'LOAD_DATA', payload: loadedState });
          alert('Progress loaded from browser storage.');
        } catch (error) {
          console.error('Error loading saved data from browser storage:', error);
          alert('Error loading saved data from browser storage. Starting a new session.');
          handleStartNew();
        }
      } else {
        alert('No saved data found in browser storage.');
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
        onExport={handleToggleExportMenu}
        onToggleSettings={() => setShowSettings(!showSettings)}
        onToggleAnalysis={() => setShowAnalysis(!showAnalysis)}
        onToggleAI={handleToggleAI}
        onSave={handleSave}
        onLoad={handleLoad}
        onGoHome={handleGoHome} // Pass onGoHome prop
        onTogglePreview={handleTogglePreview} // Pass the full-screen preview handler
        onToggleLivePreview={handleToggleLivePreview} // Pass the live preview handler
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
        {showPreview ? (
          <div id="resume-preview-container" className="flex-1">
            <ResumePreview />
          </div>
        ) : (
          <div className="flex-1 flex" ref={containerRef}>
            <div style={{ width: `${mainContentWidth}%` }} className="flex-shrink-0">
              <MainContent />
            </div>
            {showLivePreview && (
              <>
                <div
                  className="w-2 bg-gray-200 cursor-ew-resize flex-shrink-0"
                  onMouseDown={handleMouseDown}
                ></div>
                <div
                  id="resume-live-preview-container"
                  style={{ width: `${100 - mainContentWidth}%` }}
                  className="flex-shrink-0 border-l border-gray-200"
                >
                  <ResumePreview />
                </div>
              </>
            )}
          </div>
        )}
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
