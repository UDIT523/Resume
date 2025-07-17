import React from 'react';

interface TemplatesPageProps {
  onBack: () => void;
}

export default function TemplatesPage({ onBack }: TemplatesPageProps) {
  return (
    <div className="p-6">
      <button onClick={onBack} className="mb-4 text-blue-500 hover:underline">
        &larr; Back to Editor
      </button>
      <h1 className="text-2xl font-bold">Templates Page</h1>
      <p>This is where your resume templates will appear.</p>
    </div>
  );
}
