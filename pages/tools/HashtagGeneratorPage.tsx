import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import ToolLayout from '../../components/ToolLayout';

const HashtagGeneratorPage: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!topic) {
      setError('Please enter a topic or keyword.');
      return;
    }
    setIsLoading(true);
    setError('');
    setHashtags([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Generate a list of 20 relevant Instagram hashtags for the topic: "${topic}". 
      
      Include a mix of:
      - Broad, popular hashtags
      - Niche-specific hashtags
      - Community-related hashtags
      
      Return the result as a single line of space-separated hashtags, each starting with #. Do not include any other text.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      
      const hashtagString = response.text.trim();
      setHashtags(hashtagString.split(' ').filter(h => h.startsWith('#')));
    } catch (err) {
      setError('Failed to generate hashtags. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hashtags.join(' '));
  };


  return (
    <ToolLayout
      title="Instagram Hashtag Generator"
      description="Find the best hashtags to increase the reach of your posts."
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
            Enter a topic or keyword
          </label>
          <input
            type="text"
            id="topic"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., travel photography, healthy recipes"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full bg-primary text-white font-bold py-3 px-4 rounded-md hover:bg-primary-hover transition-colors duration-300 disabled:bg-gray-400 flex items-center justify-center"
        >
          {isLoading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
          {isLoading ? 'Generating...' : 'Generate Hashtags'}
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {hashtags.length > 0 && (
          <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-light">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-dark">Generated Hashtags</h3>
                 <button onClick={copyToClipboard} className="text-sm bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300">Copy</button>
            </div>
            <div className="flex flex-wrap gap-2 text-primary">
                {hashtags.map((tag, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">{tag}</span>
                ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default HashtagGeneratorPage;