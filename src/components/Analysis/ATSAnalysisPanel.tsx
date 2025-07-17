import React from 'react';
import { X, TrendingUp, AlertCircle, CheckCircle, Target } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

interface ATSAnalysisPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ATSAnalysisPanel({ isOpen, onClose }: ATSAnalysisPanelProps) {
  const { state } = useResume();
  const { atsAnalysis, data } = state;

  if (!isOpen) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (score >= 60) return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    return <AlertCircle className="h-5 w-5 text-red-500" />;
  };

  const calculateKeywords = () => {
    const allText = [
      data.summary,
      ...data.workExperience.map(exp => exp.description + ' ' + exp.achievements.join(' ')),
      ...data.skills.map(skill => skill.name),
      ...data.projects.map(project => project.description)
    ].join(' ').toLowerCase();

    const commonKeywords = [
      'management', 'leadership', 'team', 'project', 'development', 'analysis',
      'strategy', 'optimization', 'collaboration', 'communication', 'problem-solving',
      'innovation', 'results', 'achievement', 'growth', 'improvement'
    ];

    return commonKeywords.filter(keyword => allText.includes(keyword));
  };

  const keywords = calculateKeywords();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">ATS Analysis</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {/* Overall Score */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Overall ATS Score</h3>
              {getScoreIcon(atsAnalysis.score)}
            </div>
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-3xl font-bold ${getScoreColor(atsAnalysis.score)}`}>
                  {atsAnalysis.score}%
                </span>
                <span className="text-sm text-gray-500">
                  {atsAnalysis.score >= 80 ? 'Excellent' : 
                   atsAnalysis.score >= 60 ? 'Good' : 'Needs Improvement'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    atsAnalysis.score >= 80 ? 'bg-green-500' : 
                    atsAnalysis.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${atsAnalysis.score}%` }}
                />
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Score Breakdown</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Format Compatibility</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${atsAnalysis.formatCompatibility}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{atsAnalysis.formatCompatibility}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Section Completeness</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${atsAnalysis.sectionCompleteness}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{atsAnalysis.sectionCompleteness}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Keyword Density</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${atsAnalysis.keywordDensity}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{atsAnalysis.keywordDensity}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Keywords Found */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Keywords Found</h4>
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              {keywords.length === 0 && (
                <p className="text-gray-500 text-sm">No common keywords found. Consider adding more industry-specific terms.</p>
              )}
            </div>

            {/* Suggestions */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Improvement Suggestions</h4>
              <div className="space-y-3">
                {[
                  "Add more quantified achievements with specific numbers and percentages",
                  "Include more industry-specific keywords in your experience descriptions",
                  "Ensure all sections are properly filled with relevant information",
                  "Use standard section headings like 'Work Experience' and 'Education'",
                  "Include relevant certifications and technical skills",
                  "Optimize your professional summary with key competencies"
                ].map((suggestion, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Target className="h-4 w-4 text-blue-500 mt-0.5" />
                    <span className="text-sm text-gray-700">{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ATS Tips */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">💡 ATS Tips</h4>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• Use standard fonts like Arial, Helvetica, or Times New Roman</li>
                <li>• Avoid images, graphics, and complex formatting</li>
                <li>• Include relevant keywords from the job description</li>
                <li>• Use standard section headings</li>
                <li>• Save and submit as PDF when possible</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}