import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import ToolLayout from '../../components/ToolLayout';
import ToolInfoBox from '../../components/ToolInfoBox';
import RelatedTools from '../../components/RelatedTools';

interface Color {
    hex: string;
    name: string;
}

const ColorPaletteGeneratorPage: React.FC = () => {
    const [theme, setTheme] = useState('');
    const [palette, setPalette] = useState<Color[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        if (!theme) {
            setError('Please enter a theme to generate a palette.');
            return;
        }
        setIsLoading(true);
        setError('');
        setPalette([]);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: `Generate a 5-color palette based on the theme: "${theme}".`,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            palette: {
                                type: Type.ARRAY,
                                description: "An array of 5 color objects.",
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        hex: { type: Type.STRING, description: "The hex code of the color, e.g., #FFFFFF" },
                                        name: { type: Type.STRING, description: "A descriptive name for the color." }
                                    }
                                }
                            }
                        }
                    }
                }
            });

            const result = JSON.parse(response.text.trim());
            setPalette(result.palette);

        } catch (err) {
            setError('Failed to generate palette. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = (hex: string) => {
        navigator.clipboard.writeText(hex);
    };

    return (
        <ToolLayout
            title="Color Palette Generator"
            description="Create beautiful color schemes from a keyword or theme."
        >
            <div className="flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    placeholder="Enter a theme (e.g., 'calm ocean', 'autumn forest')"
                    className="flex-grow w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-primary-hover transition-colors duration-300 disabled:bg-gray-400 whitespace-nowrap"
                >
                    {isLoading ? 'Generating...' : 'Generate Palette'}
                </button>
            </div>

            {error && <div className="mt-4 text-red-600 bg-red-100 p-3 rounded-md">{error}</div>}

            <div className="mt-8">
                {isLoading ? (
                    <div className="flex justify-center items-center min-h-[120px]">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        <p className="ml-3 text-gray-600">AI is mixing colors...</p>
                    </div>
                ) : (
                    palette.length > 0 && (
                        <div className="flex flex-col md:flex-row rounded-lg overflow-hidden shadow-lg">
                            {palette.map((color, index) => (
                                <div key={index} className="flex-1 p-4 text-center text-white flex flex-col justify-center" style={{ backgroundColor: color.hex, minHeight: '120px' }}>
                                    <span className="font-bold text-lg" style={{textShadow: '0 1px 2px rgba(0,0,0,0.5)'}}>{color.name}</span>
                                    <button onClick={() => handleCopy(color.hex)} className="font-mono mt-1 opacity-80 hover:opacity-100" style={{textShadow: '0 1px 2px rgba(0,0,0,0.5)'}}>{color.hex}</button>
                                </div>
                            ))}
                        </div>
                    )
                )}
            </div>
            
            <ToolInfoBox title="Using Your New Palette">
                <p>A consistent color palette strengthens brand identity. Use these colors across your website, social media graphics, and marketing materials. Typically, you'll have 1-2 primary colors, 1-2 secondary/accent colors, and a neutral color for text and backgrounds.</p>
            </ToolInfoBox>

            <RelatedTools currentToolLink="/tools/color-palette-generator" />
        </ToolLayout>
    );
};

export default ColorPaletteGeneratorPage;
