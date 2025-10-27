import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import ToolLayout from '../../components/ToolLayout';
import ToolInfoBox from '../../components/ToolInfoBox';
import RelatedTools from '../../components/RelatedTools';

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
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Analyze the following headline for marketing effectiveness: "${headline}". Provide a score from 1-100 and a detailed breakdown covering clarity, emotional resonance, use of power words, and suggestions for improvement. Format the output as clean, readable text.`
            });
            
            setAnalysis(response.text);

        } catch (err) {
            setError('Failed to analyze headline. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ToolLayout
            title="Headline Analyzer"
            description="Get AI-powered feedback on your headlines to improve click-through rates and engagement."
        >
            <div className="flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="Enter your headline here..."
                    className="flex-grow w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                    onClick={handleAnalyze}
                    disabled={isLoading}
                    className="bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-primary-hover transition-colors duration-300 disabled:bg-gray-400 whitespace-nowrap"
                >
                    {isLoading ? 'Analyzing...' : 'Analyze Headline'}
                </button>
            </div>

            {error && <div className="mt-4 text-red-600 bg-red-100 p-3 rounded-md">{error}</div>}

            <div className="mt-8 p-6 border border-gray-200 rounded-lg min-h-[150px]">
                {isLoading ? (
                     <div className="flex justify-center items-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        <p className="ml-3 text-gray-600">AI is analyzing...</p>
                    </div>
                ) : (
                    analysis ? (
                        <pre className="whitespace-pre-wrap font-sans text-gray-700">{analysis}</pre>
                    ) : (
                         <p className="text-gray-500 text-center">Your analysis will appear here.</p>
                    )
                )}
            </div>
            
            <ToolInfoBox title="How does the Headline Analyzer work?">
                <p>This tool uses a powerful AI model to evaluate your headline against key marketing principles. It assesses factors like word choice, emotional triggers, and clarity to predict its performance and give you actionable feedback.</p>
            </ToolInfoBox>

            <RelatedTools currentToolLink="/tools/headline-analyzer" />
        </ToolLayout>
    );
};

export default HeadlineAnalyzerPage;
