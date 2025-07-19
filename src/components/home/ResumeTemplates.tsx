import React from 'react';

const ResumeTemplates: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Professional Resume Templates
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Placeholder for templates */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center h-64">
          <img src="https://via.placeholder.com/150x200?text=Template+1" alt="Template 1" className="mb-4 rounded-md shadow-sm" />
          <h3 className="text-xl font-semibold text-gray-800">Modern Template</h3>
          <p className="text-gray-500 text-sm">Clean and professional</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center h-64">
          <img src="https://via.placeholder.com/150x200?text=Template+2" alt="Template 2" className="mb-4 rounded-md shadow-sm" />
          <h3 className="text-xl font-semibold text-gray-800">Creative Template</h3>
          <p className="text-gray-500 text-sm">Unique and artistic</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center h-64">
          <img src="https://via.placeholder.com/150x200?text=Template+3" alt="Template 3" className="mb-4 rounded-md shadow-sm" />
          <h3 className="text-xl font-semibold text-gray-800">Classic Template</h3>
          <p className="text-gray-500 text-sm">Traditional and elegant</p>
        </div>
      </div>
      <div className="text-center mt-12">
        <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
          Browse All Templates
        </button>
      </div>
    </div>
  );
};

export default ResumeTemplates;
