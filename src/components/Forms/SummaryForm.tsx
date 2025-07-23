import React from 'react';
import { useResume } from '../../context/ResumeContext';

export default function SummaryForm() {
  const { state, dispatch } = useResume();
  const { summary } = state.data;

  const handleChange = (value: string) => {
    dispatch({
      type: 'UPDATE_SUMMARY',
      payload: value
    });
  };

  const suggestions = [
    "Highlight your most relevant experience and skills",
    "Quantify your achievements with specific numbers",
    "Tailor your summary to the job you're applying for",
    "Keep it concise (2-3 sentences)",
    "Use action verbs and industry keywords"
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Summary</h2>
        <p className="text-gray-600">Write a compelling summary that highlights your key qualifications.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Summary
          </label>
          <textarea
            value={summary}
            onChange={(e) => handleChange(e.target.value)}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write a brief summary of your professional background, key skills, and career objectives..."
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {summary.length} characters
            </span>
            <span className={`text-sm ${summary.length >= 200 && summary.length <= 400 ? 'text-green-600' : 'text-gray-500'}`}>
              Recommended: 200-400 characters
            </span>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Tips for a great summary:</h3>
          <ul className="space-y-1 text-sm text-blue-800">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
