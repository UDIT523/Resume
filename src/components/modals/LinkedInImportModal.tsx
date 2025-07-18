import React, { useState } from 'react';
import { X, Linkedin, CheckCircle, AlertCircle } from 'lucide-react';
import { importFromLinkedIn } from '../../utils/linkedinImport';
import { ResumeContent } from '../../types';

interface LinkedInImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (content: ResumeContent) => void;
}

const LinkedInImportModal: React.FC<LinkedInImportModalProps> = ({
  isOpen,
  onClose,
  onImport
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleImport = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const content = await importFromLinkedIn();
      onImport(content);
      onClose();
    } catch (err) {
      setError('Failed to import LinkedIn profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-md w-full mx-4 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Linkedin className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Import from LinkedIn</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Import your professional information from LinkedIn to quickly populate your resume.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">What will be imported:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Basic profile information</li>
                  <li>• Work experience and descriptions</li>
                  <li>• Education history</li>
                  <li>• Skills and endorsements</li>
                </ul>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-sm text-red-800">{error}</span>
              </div>
            </div>
          )}

          <p className="text-xs text-gray-500">
            Note: This is a demo version. In production, you would authenticate with LinkedIn's API.
          </p>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={loading}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Importing...' : 'Import Profile'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkedInImportModal;