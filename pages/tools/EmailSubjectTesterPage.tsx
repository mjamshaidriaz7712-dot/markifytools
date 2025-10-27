import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import ToolLayout from '../../components/ToolLayout';

const EmailSubjectTesterPage: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!subject) {
      setError('Please enter a subject line to test.');
      return;
    }
    setIsLoading(true);
    setError('');
    setAnalysis('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Analyze the following email subject line: "${subject}".

      Provide a detailed analysis for increasing open rates, focusing on:
      1.  **Open Rate Score (1-100):** A score predicting its effectiveness.
      2.  **Spamminess Check:** Does it contain common spam trigger words (e.g., "free," "winner," "urgent")? Is the capitalization excessive?
      3.  **Clarity and Intrigue:** Is it clear what the email is about? Does it create curiosity?
      4.  **Length:** Is the subject line length appropriate for mobile and desktop clients?
      5.  **Strengths & Weaknesses:** A summary of what's good and what could be improved.
      6.  **Alternative Suggestions:** Provide 3 improved versions of the subject line.

      Format the output clearly using markdown-style headers.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      
      setAnalysis(response.text);
    } catch (err) {
      setError('Failed to analyze the subject line. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Email Subject Line Tester"
      description="Boost your open rates with better, more effective subject lines."
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Enter your email subject line
          </label>
          <input
            type="text"
            id="subject"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., A special offer just for you"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <button
          onClick={handleAnalyze}
          disabled={isLoading}
          className="w-full bg-primary text-white font-bold py-3 px-4 rounded-md hover:bg-primary-hover transition-colors duration-300 disabled:bg-gray-400 flex items-center justify-center"
        >
          {isLoading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
          {isLoading ? 'Testing...' : 'Test Subject Line'}
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

export default EmailSubjectTesterPage;