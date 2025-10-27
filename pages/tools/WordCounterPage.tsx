import React, { useState, useMemo } from 'react';
import { GoogleGenAI } from "@google/genai";
import ToolLayout from '../../components/ToolLayout';

const WordCounterPage: React.FC = () => {
  const [text, setText] = useState('');
  const [readability, setReadability] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { words, characters } = useMemo(() => {
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    const charCount = text.length;
    return { words: wordCount, characters: charCount };
  }, [text]);

  const handleAnalyzeReadability = async () => {
    if (!text) {
      setError('Please enter some text to analyze.');
      return;
    }
    setIsLoading(true);
    setError('');
    setReadability('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Analyze the readability of the following text. 
      
      Text: "${text}"
      
      Provide a simple analysis including:
      1.  **Readability Level:** (e.g., Easy to read, 8th-grade level, College level)
      2.  **Summary:** A brief sentence on the overall tone and complexity.
      3.  **Suggestions:** One key suggestion to improve readability if necessary.
      
      Format the output clearly.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setReadability(response.text);
    } catch (err) {
      setError('Failed to analyze readability. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Word Counter & Readability"
      description="Count words, characters, and check the readability of your text."
    >
      <div className="space-y-4">
        <textarea
          rows={10}
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex justify-around text-center p-4 bg-light rounded-md">
          <div>
            <p className="text-2xl font-bold text-primary">{words}</p>
            <p className="text-sm text-gray-600">Words</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">{characters}</p>
            <p className="text-sm text-gray-600">Characters</p>
          </div>
        </div>
        <button
          onClick={handleAnalyzeReadability}
          disabled={isLoading}
          className="w-full bg-primary text-white font-bold py-3 px-4 rounded-md hover:bg-primary-hover transition-colors duration-300 disabled:bg-gray-400 flex items-center justify-center"
        >
          {isLoading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
          {isLoading ? 'Analyzing...' : 'Check Readability'}
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {readability && (
          <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-light">
            <h3 className="text-lg font-semibold mb-2 text-dark">Readability Analysis</h3>
            <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">{readability}</div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default WordCounterPage;