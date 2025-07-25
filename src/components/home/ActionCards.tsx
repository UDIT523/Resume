import React, { useRef } from 'react';
import { ResumeData } from '../../types/resume';

interface ActionCardsProps {
  onStartNew: () => void;
  onLoad: (data: ResumeData) => void;
}

const ActionCards: React.FC<ActionCardsProps> = ({ onStartNew, onLoad }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('resume', file);

      try {
        const response = await fetch('/api/upload/resume', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Resume uploaded and processed:', data);
          onLoad(data); // Pass the loaded data to the parent component
        } else {
          console.error('Failed to upload resume:', response.statusText);
        }
      } catch (error) {
        console.error('Error uploading resume:', error);
      }
    }
  };

  const handleUploadResumeClick = async () => {
    fileInputRef.current?.click();
  };

  const cards = [
    {
      title: 'Create New Resume',
      description: 'Start fresh and build a professional resume in minutes.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-purple-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      ),
      onClick: onStartNew,
    },
    {
      title: 'Import from LinkedIn',
      description: 'Auto-generate your resume using your LinkedIn profile.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m-0.5-6.5v6.5a3 3 0 003 3h6.5"
          />
        </svg>
      ),
      onClick: () => console.log('Import from LinkedIn functionality not yet implemented.'), // Placeholder
    },
    {
      title: 'Upload Existing Resume',
      description: 'Upload your current resume to enhance or update it with AI.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
          />
        </svg>
      ),
      onClick: handleUploadResumeClick,
    },
    {
      title: 'Check Resume Score',
      description: 'See how your resume performs and what to improve.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      onClick: () => alert('Resume score analysis coming soon!'),
    },
  ];

  const reorderedCards = [
    cards[0], // Create New Resume
    cards[1], // Import from LinkedIn
    cards[2], // Upload Existing Resume
    cards[3], // Check Resume Score
  ];

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.doc,.docx,.html,.txt"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4 mb-16">
        {reorderedCards.map((card, index) => (
          <button
            key={index}
            onClick={card.onClick}
            className="flex flex-col items-start p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            <div className="p-3 rounded-full bg-gray-100 mb-4">{card.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-left">{card.title}</h3>
            <p className="text-gray-600 text-left">{card.description}</p>
          </button>
        ))}
      </div>
    </>
  );
};

export default ActionCards;
