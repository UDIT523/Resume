import React, { useState, useEffect } from 'react';
import { Resume } from '../../types';
import { getResumes, deleteResume } from '../../utils/resumeStorage';
import { FileText, Calendar, Trash2, Edit, Download, Eye } from 'lucide-react';

interface MyResumesProps {
  onCreateResume: () => void;
  onEditResume: (resume: Resume) => void;
}

const MyResumes: React.FC<MyResumesProps> = ({ onCreateResume, onEditResume }) => {
  const [resumes, setResumes] = useState<Resume[]>([]);

  useEffect(() => {
    setResumes(getResumes());
  }, []);

  const handleDeleteResume = (id: string) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      deleteResume(id);
      setResumes(getResumes());
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (resumes.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Resumes Yet</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            You haven't created any resumes yet. Start building your professional resume now!
          </p>
        </div>
        <button
          onClick={onCreateResume}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Create Your First Resume
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Resumes</h2>
          <p className="text-gray-600 mt-1">Manage and edit your saved resumes</p>
        </div>
        <button
          onClick={onCreateResume}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Create New Resume
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumes.map((resume) => (
          <div
            key={resume.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 truncate">
                    {resume.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {resume.content.personalInfo.fullName || 'Untitled Resume'}
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    Updated {formatDate(resume.updatedAt)}
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => onEditResume(resume)}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Edit Resume"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteResume(resume.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete Resume"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg h-32 mb-4 flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">Resume Preview</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => onEditResume(resume)}
                  className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Edit
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyResumes;