import React, { useState } from 'react';
import { Plus, Trash2, Edit3, X } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { Project } from '../../types/resume';

export default function ProjectsForm() {
  const { state, dispatch } = useResume();
  const { projects } = state.data;
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newTech, setNewTech] = useState('');

  const createNewProject = (): Project => ({
    id: Date.now().toString(),
    name: '',
    description: '',
    technologies: [],
    startDate: '',
    endDate: '',
    url: '',
    github: ''
  });

  const handleAddProject = () => {
    const newProject = createNewProject();
    dispatch({
      type: 'UPDATE_PROJECTS',
      payload: [...projects, newProject]
    });
    setEditingIndex(projects.length);
  };

  const handleDeleteProject = (index: number) => {
    const updated = projects.filter((_, i) => i !== index);
    dispatch({
      type: 'UPDATE_PROJECTS',
      payload: updated
    });
    setEditingIndex(null);
  };

  const handleUpdateProject = (index: number, field: string, value: any) => {
    const updated = projects.map((project, i) => 
      i === index ? { ...project, [field]: value } : project
    );
    dispatch({
      type: 'UPDATE_PROJECTS',
      payload: updated
    });
  };

  const handleAddTechnology = (projectIndex: number) => {
    if (newTech.trim()) {
      const updated = projects.map((project, i) => 
        i === projectIndex ? {
          ...project,
          technologies: [...project.technologies, newTech.trim()]
        } : project
      );
      dispatch({
        type: 'UPDATE_PROJECTS',
        payload: updated
      });
      setNewTech('');
    }
  };

  const handleDeleteTechnology = (projectIndex: number, techIndex: number) => {
    const updated = projects.map((project, i) => 
      i === projectIndex ? {
        ...project,
        technologies: project.technologies.filter((_, j) => j !== techIndex)
      } : project
    );
    dispatch({
      type: 'UPDATE_PROJECTS',
      payload: updated
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Projects</h2>
          <p className="text-gray-600">Showcase your key projects and achievements.</p>
        </div>
        <button
          onClick={handleAddProject}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Project</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">No projects added yet.</p>
          <button
            onClick={handleAddProject}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Add your first project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div key={project.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">
                  {project.name || 'New Project'}
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteProject(index)}
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
                        Project Name
                      </label>
                      <input
                        type="text"
                        value={project.name}
                        onChange={(e) => handleUpdateProject(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="E-commerce Platform"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project URL (Optional)
                      </label>
                      <input
                        type="url"
                        value={project.url || ''}
                        onChange={(e) => handleUpdateProject(index, 'url', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://myproject.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GitHub URL (Optional)
                      </label>
                      <input
                        type="url"
                        value={project.github || ''}
                        onChange={(e) => handleUpdateProject(index, 'github', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://github.com/username/project"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="month"
                        value={project.startDate}
                        onChange={(e) => handleUpdateProject(index, 'startDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="month"
                        value={project.endDate}
                        onChange={(e) => handleUpdateProject(index, 'endDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={project.description}
                      onChange={(e) => handleUpdateProject(index, 'description', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Describe your project, its purpose, and key features..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Technologies Used
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                        >
                          {tech}
                          <button
                            onClick={() => handleDeleteTechnology(index, techIndex)}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newTech}
                        onChange={(e) => setNewTech(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTechnology(index);
                          }
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Add a technology (e.g., React, Node.js)"
                      />
                      <button
                        onClick={() => handleAddTechnology(index)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-600">
                  <p>{project.startDate} - {project.endDate}</p>
                  {project.description && <p className="mt-2">{project.description}</p>}
                  {project.technologies.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}