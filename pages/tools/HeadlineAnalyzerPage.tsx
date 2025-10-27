import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import ToolLayout from '../../components/ToolLayout';

const HeadlineAnalyzerPage: React.FC = () => {
  const [headline, setHeadline] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!headline) {
      setError('Please enter a headline to analyze.');
      return;
    }
    setIsLoading(true);
    setError('');
    setAnalysis('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Analyze the following headline for a blog post or advertisement: "${headline}". 
      
      Provide a detailed analysis covering these points:
      1.  **Clarity and Conciseness:** Is the headline easy to understand?
      2.  **Engagement Score (1-100):** How likely is this headline to grab attention and encourage clicks?
      3.  **Sentiment Analysis:** What emotion does the headline evoke (e.g., positive, negative, neutral, urgent, curious)?
      4.  **Strengths:** What makes this headline effective?
      5.  **Areas for Improvement:** What could be changed to make it stronger?
      6.  **Alternative Suggestions:** Provide 3 improved versions of the headline.
      
      Format the output clearly using markdown-style headers.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      
      setAnalysis(response.text);
    } catch (err) {
      setError('Failed to analyze the headline. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Headline Analyzer"
      description="Write attention-grabbing titles that drive clicks and engagement."
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="headline" className="block text-sm font-medium text-gray-700 mb-1">
            Enter your headline
          </label>
          <textarea
            id="headline"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., 10 Simple Tricks to Triple Your Website Traffic"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
          />
        </div>
        <button
          onClick={handleAnalyze}
          disabled={isLoading}
          className="w-full bg-primary text-white font-bold py-3 px-4 rounded-md hover:bg-primary-hover transition-colors duration-300 disabled:bg-gray-400 flex items-center justify-center"
        >
          {isLoading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
          {isLoading ? 'Analyzing...' : 'Analyze Headline'}
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {analysis && (
          <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-light">
            <h3 className="text-lg font-semibold mb-2 text-dark">Analysis Result</h3>
            <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">{analysis}</div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default HeadlineAnalyzerPage;