import React from 'react';
import HomePageHeader from './HomePageHeader';
import ActionCards from './ActionCards';

interface HomePageProps {
  onStartNew: () => void;
  onLoad: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartNew, onLoad }) => {
  return (
    <div className="min-h-screen flex flex-col items-center pt-16 pb-8">
      <HomePageHeader onStartNew={onStartNew} />
      <ActionCards onStartNew={onStartNew} onLoad={onLoad} />
    </div>
  );
};

export default HomePage;
