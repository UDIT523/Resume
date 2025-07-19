import React from 'react';
import HomePageHeader from './HomePageHeader';
import ActionCards from './ActionCards';
import ResumeTemplates from './ResumeTemplates';

interface HomePageProps {
  onStartNew: () => void;
  onLoad: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartNew, onLoad }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-16 pb-8">
      <HomePageHeader onStartNew={onStartNew} />
      <ActionCards onStartNew={onStartNew} onLoad={onLoad} />
      <ResumeTemplates />
    </div>
  );
};

export default HomePage;
