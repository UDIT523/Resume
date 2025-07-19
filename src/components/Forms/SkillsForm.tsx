import React, { useState } from 'react';
import { Plus, Trash2, Star } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { Skill } from '../../types/resume';

export default function SkillsForm() {
  const { state, dispatch } = useResume();
  const { skills } = state.data;
  const [newSkill, setNewSkill] = useState({ name: '', level: 'Intermediate' as const, category: 'Technical' as const });

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      const skill: Skill = {
        id: Date.now().toString(),
        ...newSkill
      };
      dispatch({
        type: 'UPDATE_SKILLS',
        payload: [...skills, skill]
      });
      setNewSkill({ name: '', level: 'Intermediate', category: 'Technical' });
    }
  };

  const handleDeleteSkill = (id: string) => {
    const updated = skills.filter(skill => skill.id !== id);
    dispatch({
      type: 'UPDATE_SKILLS',
      payload: updated
    });
  };

  const handleUpdateSkill = (id: string, field: keyof Skill, value: any) => {
    const updated = skills.map(skill =>
      skill.id === id ? { ...skill, [field]: value } : skill
    );
    dispatch({
      type: 'UPDATE_SKILLS',
      payload: updated
    });
  };

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-red-100 text-red-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-blue-100 text-blue-800';
      case 'Expert': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const StarRating = ({ level, onLevelChange }: { level: Skill['level'], onLevelChange: (newLevel: Skill['level']) => void }) => {
    const levels: Skill['level'][] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
    const starCount = levels.indexOf(level) + 1;

    return (
      <div className="flex">
        {levels.map((levelName, i) => (
          <Star
            key={i}
            className={`h-4 w-4 cursor-pointer ${i < starCount ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            onClick={() => onLevelChange(levelName)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills</h2>
        <p className="text-gray-600">Add your technical and soft skills.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Add New Skill</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skill Name
            </label>
            <input
              type="text"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., JavaScript, Communication, etc."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Level
            </label>
            <select
              value={newSkill.level}
              onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={newSkill.category}
              onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Technical">Technical</option>
              <option value="Soft">Soft Skills</option>
              <option value="Language">Language</option>
            </select>
          </div>
        </div>
        <button
          onClick={handleAddSkill}
          className="mt-4 flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {['Technical', 'Soft', 'Language'].map(category => {
        const categorySkills = getSkillsByCategory(category);
        if (categorySkills.length === 0) return null;

        return (
          <div key={category} className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              {category === 'Technical' ? 'Technical Skills' : 
               category === 'Soft' ? 'Soft Skills' : 'Languages'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categorySkills.map(skill => (
                <div key={skill.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-gray-900">{skill.name}</span>
                      <StarRating 
                        level={skill.level} 
                        onLevelChange={(newLevel) => handleUpdateSkill(skill.id, 'level', newLevel)}
                      />
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 text-xs rounded-full ${getLevelColor(skill.level)}`}>
                        {skill.level}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="p-1 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {skills.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No skills added yet. Add your first skill above!</p>
        </div>
      )}
    </div>
  );
}
