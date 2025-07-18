import React, { useState } from 'react';
import { Target, TrendingUp, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { aiService } from '../../utils/aiService';
import { ResumeContent } from '../../types';

interface JobMatchAnalyzerProps {
  resumeContent: ResumeContent;
}

const JobMatchAnalyzer: React.FC<JobMatchAnalyzerProps> = ({ resumeContent }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;
    
    setLoading(true);
    try {
      const result = await aiService.analyzeJobMatch(resumeContent, jobDescription);
      setAnalysis(result);
    } catch (error) {
      console.error('Failed to analyze job match:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Target className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Job Match Analyzer</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Paste Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Paste the job description here to analyze how well your resume matches..."
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading || !jobDescription.trim()}
          className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Target className="w-4 h-4" />}
          <span>{loading ? 'Analyzing...' : 'Analyze Match'}</span>
        </button>

        {analysis && (
          <div className="mt-6 space-y-4">
            {/* Match Score */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">Match Score</h4>
                <div className={`text-2xl font-bold ${getScoreColor(analysis.matchScore)}`}>
                  {analysis.matchScore}%
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${getScoreBackground(analysis.matchScore)}`}
                  style={{ width: `${analysis.matchScore}%` }}
                ></div>
              </div>
            </div>

            {/* Matched Skills */}
            {analysis.matchedSkills.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h4 className="font-medium text-gray-900">Matched Skills</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysis.matchedSkills.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Skills */}
            {analysis.missingSkills.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <h4 className="font-medium text-gray-900">Skills to Add</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingSkills.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm border border-dashed border-red-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h4 className="font-medium text-gray-900">Recommendations</h4>
              </div>
              <div className="space-y-2">
                {analysis.recommendations.map((rec: string, index: number) => (
                  <div key={index} className="flex items-start space-x-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-sm text-gray-600">{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobMatchAnalyzer;