import React from 'react';
import { Plus, MessageCircle, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onCreateResume: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onCreateResume }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome to Resumind!!
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Craft a standout resume that showcases your skills and helps you land your dream job.
        </p>
        
        <div className="flex items-center justify-center space-x-4 mb-12">
          <button
            onClick={onCreateResume}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Resume</span>
          </button>
          
          <div className="flex items-center space-x-2 bg-white px-4 py-3 rounded-lg border border-gray-200">
            <MessageCircle className="w-5 h-5 text-gray-400" />
            <span className="text-gray-500">Type your questions or request here...</span>
          </div>
          
          <button className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors">
            <Sparkles className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;