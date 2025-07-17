import React, { useState } from 'react';
import { Plus, Trash2, Edit3 } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { Education } from '../../types/resume';

export default function EducationForm() {
  const { state, dispatch } = useResume();
  const { education } = state.data;
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const createNewEducation = (): Education => ({
    id: Date.now().toString(),
    institution: '',
    degree: '',
    field: '',
    location: '',
    startDate: '',
    endDate: '',
    gpa: '',
    honors: ''
  });

  const handleAddEducation = () => {
    const newEducation = createNewEducation();
    dispatch({
      type: 'UPDATE_EDUCATION',
      payload: [...education, newEducation]
    });
    setEditingIndex(education.length);
  };

  const handleDeleteEducation = (index: number) => {
    const updated = education.filter((_, i) => i !== index);
    dispatch({
      type: 'UPDATE_EDUCATION',
      payload: updated
    });
    setEditingIndex(null);
  };

  const handleUpdateEducation = (index: number, field: string, value: string) => {
    const updated = education.map((edu, i) => 
      i === index ? { ...edu, [field]: value } : edu
    );
    dispatch({
      type: 'UPDATE_EDUCATION',
      payload: updated
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Education</h2>
          <p className="text-gray-600">Add your educational background.</p>
        </div>
        <button
          onClick={handleAddEducation}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Education</span>
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">No education entries added yet.</p>
          <button
            onClick={handleAddEducation}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Add your first education entry
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div key={edu.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">
                  {edu.degree || 'New Degree'} {edu.field && `in ${edu.field}`}
                  {edu.institution && ` at ${edu.institution}`}
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteEducation(index)}
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
                        Institution
                      </label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => handleUpdateEducation(index, 'institution', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="University of California, Berkeley"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Degree
                      </label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => handleUpdateEducation(index, 'degree', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Bachelor of Science"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Field of Study
                      </label>
                      <input
                        type="text"
                        value={edu.field}
                        onChange={(e) => handleUpdateEducation(index, 'field', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Computer Science"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={edu.location}
                        onChange={(e) => handleUpdateEducation(index, 'location', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Berkeley, CA"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="month"
                        value={edu.startDate}
                        onChange={(e) => handleUpdateEducation(index, 'startDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="month"
                        value={edu.endDate}
                        onChange={(e) => handleUpdateEducation(index, 'endDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GPA (Optional)
                      </label>
                      <input
                        type="text"
                        value={edu.gpa || ''}
                        onChange={(e) => handleUpdateEducation(index, 'gpa', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="3.8/4.0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Honors (Optional)
                      </label>
                      <input
                        type="text"
                        value={edu.honors || ''}
                        onChange={(e) => handleUpdateEducation(index, 'honors', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Magna Cum Laude"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-600">
                  <p>{edu.location} • {edu.startDate} - {edu.endDate}</p>
                  {edu.gpa && <p>GPA: {edu.gpa}</p>}
                  {edu.honors && <p>{edu.honors}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}