import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import ToolLayout from '../../components/ToolLayout';

const ContentIdeaGeneratorPage: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [ideas, setIdeas] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!keyword) {
      setError('Please enter a keyword or topic.');
      return;
    }
    setIsLoading(true);
    setError('');
    setIdeas([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Generate 10 content ideas (for blog posts or social media) based on the following keyword/topic: "${keyword}".
      
      The ideas should be specific and actionable. For example, instead of "Talk about marketing", suggest "A beginner's guide to content marketing funnels".
      
      Return the result as a numbered list. Do not include any other text before or after the list.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const generatedText = response.text;
      const ideasArray = generatedText.split('\n').filter(t => t.trim() !== '').map(t => t.replace(/^\d+\.\s*/, ''));
      setIdeas(ideasArray);

    } catch (err) {
      setError('Failed to generate ideas. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Content Idea Generator"
      description="Get endless content ideas for your blog or social media channels."
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-1">
            Enter your main keyword or topic
          </label>
          <input
            type="text"
            id="keyword"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., sustainable fashion, productivity hacks"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full bg-primary text-white font-bold py-3 px-4 rounded-md hover:bg-primary-hover transition-colors duration-300 disabled:bg-gray-400 flex items-center justify-center"
        >
          {isLoading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
          {isLoading ? 'Generating...' : 'Generate Ideas'}
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {ideas.length > 0 && (
          <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-light">
            <h3 className="text-lg font-semibold mb-2 text-dark">Generated Ideas</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                {ideas.map((idea, index) => (
                    <li key={index}>{idea}</li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default ContentIdeaGeneratorPage;