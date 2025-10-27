import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import ToolLayout from '../../components/ToolLayout';
import ToolInfoBox from '../../components/ToolInfoBox';
import RelatedTools from '../../components/RelatedTools';

const BestPostingTimeFinderPage: React.FC = () => {
    const [platform, setPlatform] = useState('');
    const [industry, setIndustry] = useState('');
    const [audience, setAudience] = useState('');
    const [recommendation, setRecommendation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        if (!platform || !industry || !audience) {
            setError('Please fill in all fields to get a recommendation.');
            return;
        }
        setIsLoading(true);
        setError('');
        setRecommendation('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Based on general marketing best practices, what are the best times to post on ${platform} for the ${industry} industry, targeting an audience of ${audience}? Provide 2-3 key time slots (including timezone, e.g., EST) and explain the reasoning behind these recommendations.`
            });
            
            setRecommendation(response.text);

        } catch (err) {
            setError('Failed to generate recommendation. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ToolLayout
            title="Best Posting Time Finder"
            description="Analyze your audience to find the optimal times to post on social media."
        >
             <div className="space-y-4">
                 <div>
                    <label htmlFor="platform" className="block text-gray-700 font-semibold mb-2">Social Media Platform</label>
                    <input type="text" id="platform" value={platform} onChange={(e) => setPlatform(e.target.value)} placeholder="e.g., Instagram, LinkedIn, TikTok" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
                 </div>
                 <div>
                    <label htmlFor="industry" className="block text-gray-700 font-semibold mb-2">Your Industry</label>
                    <input type="text" id="industry" value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="e.g., SaaS, Fashion, Food & Beverage" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
                 </div>
                 <div>
                    <label htmlFor="audience" className="block text-gray-700 font-semibold mb-2">Target Audience</label>
                    <input type="text" id="audience" value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="e.g., College students in the US" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
                 </div>
                 <div className="text-center">
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading}
                        className="bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-primary-hover transition-colors duration-300 disabled:bg-gray-400"
                    >
                        {isLoading ? 'Analyzing...' : 'Find Best Times'}
                    </button>
                 </div>
            </div>

            {error && <div className="mt-4 text-red-600 bg-red-100 p-3 rounded-md">{error}</div>}

            <div className="mt-8 p-6 border border-gray-200 rounded-lg min-h-[150px]">
                {isLoading ? (
                     <div className="flex justify-center items-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        <p className="ml-3 text-gray-600">AI is calculating optimal times...</p>
                    </div>
                ) : (
                    recommendation ? (
                        <pre className="whitespace-pre-wrap font-sans text-gray-700">{recommendation}</pre>
                    ) : (
                         <p className="text-gray-500 text-center">Your personalized posting time recommendations will appear here.</p>
                    )
                )}
            </div>
            
            <ToolInfoBox title="Note: A Guideline, Not a Guarantee">
                <p>This tool provides recommendations based on general data and best practices. The absolute best time to post depends on your specific audience. Use these recommendations as a starting point, and then check your own social media analytics to see when your followers are most active and engaged.</p>
            </ToolInfoBox>

            <RelatedTools currentToolLink="/tools/best-posting-time-finder" />
        </ToolLayout>
    );
};

export default BestPostingTimeFinderPage;
