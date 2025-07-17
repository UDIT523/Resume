import React, { useState } from 'react';
import { Plus, Trash2, Edit3 } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { Award } from '../../types/resume';

export default function AwardsForm() {
  const { state, dispatch } = useResume();
  const { awards } = state.data;
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const createNewAward = (): Award => ({
    id: Date.now().toString(),
    name: '',
    issuer: '',
    date: '',
    description: ''
  });

  const handleAddAward = () => {
    const newAward = createNewAward();
    dispatch({
      type: 'UPDATE_AWARDS',
      payload: [...awards, newAward]
    });
    setEditingIndex(awards.length);
  };

  const handleDeleteAward = (index: number) => {
    const updated = awards.filter((_, i) => i !== index);
    dispatch({
      type: 'UPDATE_AWARDS',
      payload: updated
    });
    setEditingIndex(null);
  };

  const handleUpdateAward = (index: number, field: string, value: string) => {
    const updated = awards.map((award, i) => 
      i === index ? { ...award, [field]: value } : award
    );
    dispatch({
      type: 'UPDATE_AWARDS',
      payload: updated
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Awards & Achievements</h2>
          <p className="text-gray-600">Highlight your recognitions and achievements.</p>
        </div>
        <button
          onClick={handleAddAward}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Award</span>
        </button>
      </div>

      {awards.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">No awards added yet.</p>
          <button
            onClick={handleAddAward}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Add your first award
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {awards.map((award, index) => (
            <div key={award.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">
                  {award.name || 'New Award'}
                  {award.issuer && ` - ${award.issuer}`}
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteAward(index)}
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
                        Award Name
                      </label>
                      <input
                        type="text"
                        value={award.name}
                        onChange={(e) => handleUpdateAward(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Employee of the Year"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Issuing Organization
                      </label>
                      <input
                        type="text"
                        value={award.issuer}
                        onChange={(e) => handleUpdateAward(index, 'issuer', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="ABC Company"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date Received
                      </label>
                      <input
                        type="date"
                        value={award.date}
                        onChange={(e) => handleUpdateAward(index, 'date', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={award.description}
                      onChange={(e) => handleUpdateAward(index, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Describe the award and why you received it..."
                    />
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-600">
                  <p>{award.date}</p>
                  {award.description && <p className="mt-2">{award.description}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}