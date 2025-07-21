import React, { useState } from 'react';
import HomePageHeader from './HomePageHeader';
import ActionCards from './ActionCards';
import { ResumeData, ResumeTheme } from '../../types/resume';
// Removed import for ModernTemplate as preview is being removed

interface HomePageProps {
  onStartNew: () => void;
  // onLoad prop is now handled internally by HomePage
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

const HomePage: React.FC<HomePageProps> = ({ onStartNew }) => {
  const [currentResumeData, setCurrentResumeData] = useState<ResumeData | null>(null);
  // Removed isPreviewVisible state

  const handleLoad = (data: ResumeData) => {
    setCurrentResumeData(data);
    // Removed setIsPreviewVisible(true);
  };

  // Removed handlePreview function

  return (
    <div className="min-h-screen flex flex-col items-center pt-16 pb-8">
      <HomePageHeader onStartNew={onStartNew} />
      {/* Removed onPreview prop */}
      <ActionCards onStartNew={onStartNew} onLoad={handleLoad} />

      {/* Removed conditional rendering of preview */}
    </div>
  );
};

export default HomePage;
