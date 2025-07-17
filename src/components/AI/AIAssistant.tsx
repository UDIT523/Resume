import React, { useState } from 'react';
import {
  Bot,
  X,
  Send,
  Lightbulb,
  Wand2,
  FileText,
  Briefcase,
  GraduationCap,
  Code,
  Award,
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { aiService } from '../../services/aiService';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Suggestion {
  id: string;
  type: 'summary' | 'experience' | 'skills' | 'achievement' | 'general';
  title: string;
  content: string;
  section?: string;
}

export default function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const { state, dispatch } = useResume();
  const { data } = state;
  const [activeTab, setActiveTab] = useState<'suggestions' | 'generate' | 'improve'>('suggestions');
  const [selectedSection, setSelectedSection] = useState<string>('summary');
  const [userInput, setUserInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Debug effect to track when component mounts/unmounts
  React.useEffect(() => {
    console.log('AIAssistant component mounted/updated, isOpen:', isOpen);
    return () => {
      console.log('AIAssistant component cleanup');
    };
  }, [isOpen]);

  const getSuggestions = (): Suggestion[] => {
    const suggestions: Suggestion[] = [];

    if (!data.summary || data.summary.length < 100) {
      suggestions.push({
        id: '1',
        type: 'summary',
        title: 'Enhance Your Professional Summary',
        content:
          'Your summary should be 2-3 sentences highlighting your key experience, skills, and career objectives. Include quantifiable achievements when possible.',
        section: 'summary',
      });
    }

    if (data.workExperience.length === 0) {
      suggestions.push({
        id: '2',
        type: 'experience',
        title: 'Add Work Experience',
        content:
          'Include your most recent and relevant work experiences. Focus on achievements rather than just responsibilities.',
        section: 'experience',
      });
    } else {
      const hasWeakDescriptions = data.workExperience.some(
        (exp) => exp.description.length < 50 || exp.achievements.filter(Boolean).length === 0
      );
      if (hasWeakDescriptions) {
        suggestions.push({
          id: '3',
          type: 'experience',
          title: 'Strengthen Experience Descriptions',
          content:
            'Use action verbs and quantify your achievements. Instead of "Managed team," try "Led team of 8 developers, increasing productivity by 25%."',
          section: 'experience',
        });
      }
    }

    if (data.skills.length < 5) {
      suggestions.push({
        id: '4',
        type: 'skills',
        title: 'Add More Skills',
        content:
          'Include both technical and soft skills relevant to your target role. Aim for 8-12 skills total.',
        section: 'skills',
      });
    }

    suggestions.push({
      id: '5',
      type: 'general',
      title: 'Use Keywords from Job Descriptions',
      content:
        'Review job postings in your field and incorporate relevant keywords into your resume to improve ATS compatibility.',
    });

    return suggestions;
  };

  const generateContent = async (section: string, prompt: string) => {
    setIsGenerating(true);
    setError(null);

    try {
      let generated = '';

      switch (section) {
        case 'summary':
          generated = await aiService.generateSummary({ section, userInput: prompt, currentData: data });
          break;
        case 'experience':
          generated = await aiService.generateExperienceDescription({ section, userInput: prompt, currentData: data });
          break;
        case 'achievements':
          generated = await aiService.generateAchievements({ section, userInput: prompt, currentData: data });
          break;
        case 'skills':
          generated = await aiService.generateSkills({ section, userInput: prompt, currentData: data });

          const skillNames = generated.split(',').map((skill) => skill.trim());
          const newSkills = skillNames.map((name) => ({
            id: Date.now().toString() + Math.random(),
            name,
            level: 'Intermediate' as const,
            category: 'Technical' as const,
          }));
          dispatch({ type: 'UPDATE_SKILLS', payload: [...data.skills, ...newSkills] });
          break;
        default:
          generated = 'Generated content will appear here...';
      }

      setGeneratedContent(generated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate content');
    } finally {
      setIsGenerating(false);
    }
  };

  const applyGeneratedContent = () => {
    if (!generatedContent) return;

    switch (selectedSection) {
      case 'summary':
        dispatch({ type: 'UPDATE_SUMMARY', payload: generatedContent });
        break;
      case 'experience':
        if (data.workExperience.length > 0) {
          const updated = [...data.workExperience];
          updated[0] = { ...updated[0], description: generatedContent };
          dispatch({ type: 'UPDATE_WORK_EXPERIENCE', payload: updated });
        }
        break;
      case 'achievements':
        if (data.workExperience.length > 0) {
          const updated = [...data.workExperience];
          const achievements = generatedContent
            .split('\n')
            .filter((line) => line.trim().startsWith('•'))
            .map((line) => line.replace('•', '').trim());
          updated[0] = { ...updated[0], achievements };
          dispatch({ type: 'UPDATE_WORK_EXPERIENCE', payload: updated });
        }
        break;
    }

    setGeneratedContent('');
    setUserInput('');
  };

  const suggestions = getSuggestions();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="flex items-center space-x-3">
            <Bot className="h-6 w-6" />
            <h2 className="text-xl font-bold">AI Assistant</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('suggestions')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'suggestions'
                ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            <Lightbulb className="h-4 w-4" />
            <span>Suggestions</span>
          </button>
          <button
            onClick={() => setActiveTab('generate')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'generate'
                ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            <Wand2 className="h-4 w-4" />
            <span>Generate</span>
          </button>
          <button
            onClick={() => setActiveTab('improve')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'improve'
                ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Improve</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {activeTab === 'suggestions' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 mb-4">Personalized Suggestions</h3>
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {suggestion.type === 'summary' && <FileText className="h-5 w-5 text-purple-600" />}
                      {suggestion.type === 'experience' && <Briefcase className="h-5 w-5 text-blue-600" />}
                      {suggestion.type === 'skills' && <Code className="h-5 w-5 text-green-600" />}
                      {suggestion.type === 'achievement' && <Award className="h-5 w-5 text-yellow-600" />}
                      {suggestion.type === 'general' && <Lightbulb className="h-5 w-5 text-gray-600" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-2">{suggestion.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{suggestion.content}</p>
                      {suggestion.section && (
                        <button
                          onClick={() => {
                            dispatch({ type: 'SET_CURRENT_SECTION', payload: suggestion.section! });
                            onClose();
                          }}
                          className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                        >
                          Go to {suggestion.section} →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'generate' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Generate Content</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What would you like to generate?
                    </label>
                    <select
                      value={selectedSection}
                      onChange={(e) => setSelectedSection(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="summary">Professional Summary</option>
                      <option value="experience">Experience Description</option>
                      <option value="achievements">Key Achievements</option>
                      <option value="skills">Skills List</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Describe your role, industry, or specific requirements:
                    </label>
                    <textarea
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="e.g., Senior Software Engineer at a fintech startup, 5 years experience with React and Node.js..."
                    />
                  </div>

                  <button
                    onClick={() => generateContent(selectedSection, userInput)}
                    disabled={isGenerating}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-4 w-4" />
                        <span>Generate Content</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {generatedContent && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Generated Content:</h4>
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{generatedContent}</p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={applyGeneratedContent}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Apply to Resume
                    </button>
                    <button
                      onClick={() => generateContent(selectedSection, userInput)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Regenerate
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'improve' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900 mb-4">Resume Improvement Tips</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">💡 Professional Summary</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Keep it 2-3 sentences long</li>
                    <li>• Include years of experience</li>
                    <li>• Mention key skills and achievements</li>
                    <li>• Tailor to the job you're applying for</li>
                  </ul>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">🎯 Work Experience</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Use action verbs (Led, Developed, Increased)</li>
                    <li>• Quantify achievements with numbers</li>
                    <li>• Focus on results, not just responsibilities</li>
                    <li>• Include relevant keywords from job descriptions</li>
                  </ul>
                </div>

                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">🔧 Skills Section</h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• List 8-12 relevant skills</li>
                    <li>• Include both technical and soft skills</li>
                    <li>• Match skills to job requirements</li>
                    <li>• Use industry-standard terminology</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-900 mb-2">📊 ATS Optimization</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Use standard section headings</li>
                    <li>• Include keywords from job postings</li>
                    <li>• Avoid images and complex formatting</li>
                    <li>• Save as PDF for best compatibility</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}