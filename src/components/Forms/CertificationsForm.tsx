import React, { useState } from 'react';
import { Plus, Trash2, Edit3 } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { Certification } from '../../types/resume';

export default function CertificationsForm() {
  const { state, dispatch } = useResume();
  const { certifications } = state.data;
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const createNewCertification = (): Certification => ({
    id: Date.now().toString(),
    name: '',
    issuer: '',
    date: '',
    expiryDate: '',
    credentialId: ''
  });

  const handleAddCertification = () => {
    const newCertification = createNewCertification();
    dispatch({
      type: 'UPDATE_CERTIFICATIONS',
      payload: [...certifications, newCertification]
    });
    setEditingIndex(certifications.length);
  };

  const handleDeleteCertification = (index: number) => {
    const updated = certifications.filter((_, i) => i !== index);
    dispatch({
      type: 'UPDATE_CERTIFICATIONS',
      payload: updated
    });
    setEditingIndex(null);
  };

  const handleUpdateCertification = (index: number, field: string, value: string) => {
    const updated = certifications.map((cert, i) => 
      i === index ? { ...cert, [field]: value } : cert
    );
    dispatch({
      type: 'UPDATE_CERTIFICATIONS',
      payload: updated
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Certifications</h2>
          <p className="text-gray-600">Add your professional certifications and credentials.</p>
        </div>
        <button
          onClick={handleAddCertification}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Certification</span>
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">No certifications added yet.</p>
          <button
            onClick={handleAddCertification}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Add your first certification
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <div key={cert.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">
                  {cert.name || 'New Certification'}
                  {cert.issuer && ` - ${cert.issuer}`}
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCertification(index)}
                    className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {editingIndex === index ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Certification Name
                      </label>
                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => handleUpdateCertification(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="AWS Certified Solutions Architect"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Issuing Organization
                      </label>
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => handleUpdateCertification(index, 'issuer', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Amazon Web Services"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Issue Date
                      </label>
                      <input
                        type="date"
                        value={cert.date}
                        onChange={(e) => handleUpdateCertification(index, 'date', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date (Optional)
                      </label>
                      <input
                        type="date"
                        value={cert.expiryDate || ''}
                        onChange={(e) => handleUpdateCertification(index, 'expiryDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Credential ID (Optional)
                      </label>
                      <input
                        type="text"
                        value={cert.credentialId || ''}
                        onChange={(e) => handleUpdateCertification(index, 'credentialId', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Certificate ID or verification URL"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-600">
                  <p>{cert.date} {cert.expiryDate && `- ${cert.expiryDate}`}</p>
                  {cert.credentialId && <p className="mt-1">ID: {cert.credentialId}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}