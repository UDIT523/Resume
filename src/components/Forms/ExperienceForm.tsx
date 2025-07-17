import React, { useState } from 'react';
import { Plus, Trash2, Edit3 } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { WorkExperience } from '../../types/resume';

export default function ExperienceForm() {
  const { state, dispatch } = useResume();
  const { workExperience } = state.data;
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const createNewExperience = (): WorkExperience => ({
    id: Date.now().toString(),
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    achievements: ['']
  });

  const handleAddExperience = () => {
    const newExperience = createNewExperience();
    dispatch({
      type: 'UPDATE_WORK_EXPERIENCE',
      payload: [...workExperience, newExperience]
    });
    setEditingIndex(workExperience.length);
  };

  const handleDeleteExperience = (index: number) => {
    const updated = workExperience.filter((_, i) => i !== index);
    dispatch({
      type: 'UPDATE_WORK_EXPERIENCE',
      payload: updated
    });
    setEditingIndex(null);
  };

  const handleUpdateExperience = (index: number, field: string, value: any) => {
    const updated = workExperience.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    );
    dispatch({
      type: 'UPDATE_WORK_EXPERIENCE',
      payload: updated
    });
  };

  const handleAddAchievement = (expIndex: number) => {
    const updated = workExperience.map((exp, i) => 
      i === expIndex ? { ...exp, achievements: [...exp.achievements, ''] } : exp
    );
    dispatch({
      type: 'UPDATE_WORK_EXPERIENCE',
      payload: updated
    });
  };

  const handleUpdateAchievement = (expIndex: number, achIndex: number, value: string) => {
    const updated = workExperience.map((exp, i) => 
      i === expIndex ? {
        ...exp,
        achievements: exp.achievements.map((ach, j) => j === achIndex ? value : ach)
      } : exp
    );
    dispatch({
      type: 'UPDATE_WORK_EXPERIENCE',
      payload: updated
    });
  };

  const handleDeleteAchievement = (expIndex: number, achIndex: number) => {
    const updated = workExperience.map((exp, i) => 
      i === expIndex ? {
        ...exp,
        achievements: exp.achievements.filter((_, j) => j !== achIndex)
      } : exp
    );
    dispatch({
      type: 'UPDATE_WORK_EXPERIENCE',
      payload: updated
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Work Experience</h2>
          <p className="text-gray-600">Add your professional work history.</p>
        </div>
        <button
          onClick={handleAddExperience}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {workExperience.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">No work experience added yet.</p>
          <button
            onClick={handleAddExperience}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Add your first work experience
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {workExperience.map((exp, index) => (
            <div key={exp.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">
                  {exp.position || 'New Position'} {exp.company && `at ${exp.company}`}
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteExperience(index)}
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
                        Position Title
                      </label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => handleUpdateExperience(index, 'position', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleUpdateExperience(index, 'company', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => handleUpdateExperience(index, 'location', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => handleUpdateExperience(index, 'startDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => handleUpdateExperience(index, 'endDate', e.target.value)}
                        disabled={exp.current}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) => handleUpdateExperience(index, 'current', e.target.checked)}
                        className="mr-2"
                      />
                      <label className="text-sm text-gray-700">Currently work here</label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Description
                    </label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => handleUpdateExperience(index, 'description', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Describe your role and responsibilities..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Key Achievements
                    </label>
                    {exp.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-center space-x-2 mb-2">
                        <input
                          type="text"
                          value={achievement}
                          onChange={(e) => handleUpdateAchievement(index, achIndex, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Describe a key achievement..."
                        />
                        <button
                          onClick={() => handleDeleteAchievement(index, achIndex)}
                          className="p-2 text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => handleAddAchievement(index)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      + Add Achievement
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-600">
                  <p>{exp.location} • {exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                  {exp.description && <p className="mt-2">{exp.description}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}