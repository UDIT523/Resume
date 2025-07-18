import React, { useState, useEffect } from 'react';
import { ResumeContent, ResumeScore } from '../../types';
import { calculateResumeScore } from '../../utils/resumeScoring';
import { BarChart3, CheckCircle, AlertCircle, TrendingUp, Target } from 'lucide-react';

interface ResumeScoringProps {
  content: ResumeContent;
}

const ResumeScoring: React.FC<ResumeScoringProps> = ({ content }) => {
  const [score, setScore] = useState<ResumeScore | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const calculateScore = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      const calculatedScore = calculateResumeScore(content);
      setScore(calculatedScore);
      setLoading(false);
    };

    calculateScore();
  }, [content]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Resume Analysis</h3>
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (!score) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <BarChart3 className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Resume Analysis</h3>
      </div>

      {/* Overall Score */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-medium text-gray-900">Overall Score</h4>
          <div className={`text-2xl font-bold ${getScoreColor(score.overall)}`}>
            {score.overall}/100
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              score.overall >= 80 ? 'bg-green-500' :
              score.overall >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${score.overall}%` }}
          ></div>
        </div>
      </div>

      {/* Section Scores */}
      <div className="mb-8">
        <h4 className="text-md font-medium text-gray-900 mb-4">Section Breakdown</h4>
        <div className="space-y-3">
          {Object.entries(score.sections).map(([section, sectionScore]) => (
            <div key={section} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 capitalize">
                {section.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      sectionScore >= 80 ? 'bg-green-500' :
                      sectionScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${sectionScore}%` }}
                  ></div>
                </div>
                <span className={`text-sm font-medium ${getScoreColor(sectionScore)}`}>
                  {sectionScore}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ATS Compatibility */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-3">
          <Target className="w-5 h-5 text-blue-600" />
          <h4 className="text-md font-medium text-gray-900">ATS Compatibility</h4>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Applicant Tracking System Score</span>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBackground(score.atsCompatibility)} ${getScoreColor(score.atsCompatibility)}`}>
            {score.atsCompatibility}%
          </div>
        </div>
      </div>

      {/* Suggestions */}
      {score.suggestions.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h4 className="text-md font-medium text-gray-900">Improvement Suggestions</h4>
          </div>
          <div className="space-y-2">
            {score.suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">{suggestion}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Keywords */}
      <div>
        <h4 className="text-md font-medium text-gray-900 mb-3">Keywords Found</h4>
        <div className="flex flex-wrap gap-2 mb-4">
          {score.keywords.slice(0, 10).map((keyword, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs"
            >
              {keyword}
            </span>
          ))}
        </div>
        
        {score.missingKeywords.length > 0 && (
          <>
            <h5 className="text-sm font-medium text-gray-700 mb-2">Consider Adding</h5>
            <div className="flex flex-wrap gap-2">
              {score.missingKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs border border-dashed border-gray-300"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResumeScoring;