import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import ToolLayout from '../../components/ToolLayout';

interface ColorPalette {
  colors: string[];
}

const ColorPaletteGeneratorPage: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [palette, setPalette] = useState<ColorPalette | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!keyword) {
      setError('Please enter a keyword or mood.');
      return;
    }
    setIsLoading(true);
    setError('');
    setPalette(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Generate a 5-color palette based on the keyword/mood: "${keyword}". The palette should be harmonious and suitable for branding. Provide the hex codes.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    colors: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                    }
                }
            }
        }
      });

      const jsonStr = response.text.trim();
      const result = JSON.parse(jsonStr) as ColorPalette;
      setPalette(result);

    } catch (err) {
      setError('Failed to generate a palette. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Color Palette Generator"
      description="Generate beautiful color palettes for your brand from a single keyword."
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
            <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., calm and professional, energetic summer"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="bg-primary text-white font-bold py-2 px-6 rounded-md hover:bg-primary-hover transition-colors duration-300 disabled:bg-gray-400 flex items-center justify-center whitespace-nowrap"
            >
                {isLoading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                {isLoading ? 'Generating...' : 'Generate Palette'}
            </button>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {palette && (
            <div className="mt-6">
                <div className="flex flex-col md:flex-row h-64 rounded-lg overflow-hidden shadow-lg">
                    {palette.colors.map((color, index) => (
                        <div key={index} className="flex-1 flex flex-col justify-end p-4 text-center" style={{ backgroundColor: color }}>
                            <span className="font-mono bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">{color}</span>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default ColorPaletteGeneratorPage;