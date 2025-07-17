import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { Language } from '../../types/resume';

export default function LanguagesForm() {
  const { state, dispatch } = useResume();
  const { languages } = state.data;
  const [newLanguage, setNewLanguage] = useState({ name: '', proficiency: 'Conversational' as const });

  const handleAddLanguage = () => {
    if (newLanguage.name.trim()) {
      const language: Language = {
        id: Date.now().toString(),
        ...newLanguage
      };
      dispatch({
        type: 'UPDATE_LANGUAGES',
        payload: [...languages, language]
      });
      setNewLanguage({ name: '', proficiency: 'Conversational' });
    }
  };

  const handleDeleteLanguage = (id: string) => {
    const updated = languages.filter(lang => lang.id !== id);
    dispatch({
      type: 'UPDATE_LANGUAGES',
      payload: updated
    });
  };

  const handleUpdateLanguage = (id: string, field: keyof Language, value: any) => {
    const updated = languages.map(lang =>
      lang.id === id ? { ...lang, [field]: value } : lang
    );
    dispatch({
      type: 'UPDATE_LANGUAGES',
      payload: updated
    });
  };

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case 'Native': return 'bg-green-100 text-green-800';
      case 'Fluent': return 'bg-blue-100 text-blue-800';
      case 'Conversational': return 'bg-yellow-100 text-yellow-800';
      case 'Basic': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Languages</h2>
        <p className="text-gray-600">Add the languages you speak and your proficiency level.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Add New Language</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <input
              type="text"
              value={newLanguage.name}
              onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Spanish, French, Mandarin"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Proficiency
            </label>
            <select
              value={newLanguage.proficiency}
              onChange={(e) => setNewLanguage({ ...newLanguage, proficiency: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Basic">Basic</option>
              <option value="Conversational">Conversational</option>
              <option value="Fluent">Fluent</option>
              <option value="Native">Native</option>
            </select>
          </div>
        </div>
        <button
          onClick={handleAddLanguage}
          className="mt-4 flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Language</span>
        </button>
      </div>

      {languages.length > 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Your Languages</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {languages.map(language => (
              <div key={language.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-gray-900">{language.name}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getProficiencyColor(language.proficiency)}`}>
                      {language.proficiency}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    value={language.proficiency}
                    onChange={(e) => handleUpdateLanguage(language.id, 'proficiency', e.target.value)}
                    className="text-sm px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Basic">Basic</option>
                    <option value="Conversational">Conversational</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Native">Native</option>
                  </select>
                  <button
                    onClick={() => handleDeleteLanguage(language.id)}
                    className="p-1 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No languages added yet. Add your first language above!</p>
        </div>
      )}
    </div>
  );
}