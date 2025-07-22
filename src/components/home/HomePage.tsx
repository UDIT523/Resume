import React, { useState } from 'react';
import HomePageHeader from './HomePageHeader';
import ActionCards from './ActionCards';
import { ResumeData, ResumeTheme } from '../../types/resume';
import { calculateATSScore } from '../../utils/atsAnalysis';

interface HomePageProps {
  onStartNew: () => void;
  onLoad: () => void;
}

// Define a default theme
const defaultTheme: ResumeTheme = {
  primaryColor: '#007bff', // Blue
  secondaryColor: '#6c757d', // Gray
  textColor: '#333333', // Dark Gray
  backgroundColor: '#ffffff', // White
  accentColor: '#20c997', // Teal
  fontFamily: 'Arial, sans-serif',
  fontSize: '16px',
  spacing: '1.5rem', // Equivalent to theme.spacing in ModernTemplate
};

const HomePage: React.FC<HomePageProps> = ({ onStartNew, onLoad }) => {
  const [currentResumeData, setCurrentResumeData] = useState<ResumeData | null>(null);
  const [resumeScore, setResumeScore] = useState<number | null>(null);

  const handleCheckScore = (jsonData: { data: ResumeData }) => {
    console.log('Received data for score check:', jsonData);
    if (jsonData && jsonData.data) {
      const analysis = calculateATSScore(jsonData.data);
      console.log('ATS analysis result:', analysis);
      setResumeScore(analysis.score);
    } else {
      console.error('Invalid JSON structure for score check');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-16 pb-8">
      <HomePageHeader onStartNew={onStartNew} />
      <ActionCards onStartNew={onStartNew} onLoad={onLoad} onCheckScore={handleCheckScore} />

      {resumeScore !== null && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Resume Score</h3>
          <p className="text-4xl font-bold text-blue-600">{resumeScore}%</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
