import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import ToolLayout from '../../components/ToolLayout';
import ToolInfoBox from '../../components/ToolInfoBox';
import RelatedTools from '../../components/RelatedTools';

const BacklinkCheckerPage: React.FC = () => {
    const [url, setUrl] = useState('');
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAnalyze = async () => {
        if (!url) {
            setError('Please enter a URL to analyze.');
            return;
        }
        setIsLoading(true);
        setError('');
        setAnalysis('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Simulate a backlink analysis for the website "${url}". Since you cannot access live web data, provide a conceptual analysis. Describe the types of websites that would ideally be linking to a site like this to give it authority. Give 5 fictional examples of high-quality backlinks, including the hypothetical linking site and the anchor text they might use. Explain why these would be valuable links.`
            });
            
            setAnalysis(response.text);

        } catch (err) {
            setError('Failed to perform analysis. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ToolLayout
            title="Backlink Checker"
            description="Discover who is linking to your website (or your competitors')."
        >
            <div className="flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter a domain, e.g., example.com"
                    className="flex-grow w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                    onClick={handleAnalyze}
                    disabled={isLoading}
                    className="bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-primary-hover transition-colors duration-300 disabled:bg-gray-400 whitespace-nowrap"
                >
                    {isLoading ? 'Checking...' : 'Check Backlinks'}
                </button>
            </div>

            {error && <div className="mt-4 text-red-600 bg-red-100 p-3 rounded-md">{error}</div>}

            <div className="mt-8 p-6 border border-gray-200 rounded-lg min-h-[150px]">
                {isLoading ? (
                     <div className="flex justify-center items-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        <p className="ml-3 text-gray-600">AI is running a simulated analysis...</p>
                    </div>
                ) : (
                    analysis ? (
                        <pre className="whitespace-pre-wrap font-sans text-gray-700">{analysis}</pre>
                    ) : (
                         <p className="text-gray-500 text-center">Your simulated backlink report will appear here.</p>
                    )
                )}
            </div>
            
            <ToolInfoBox title="Note: This is a Simulated Tool">
                <p>A real backlink checker requires a massive, constantly updated database of the entire web, which is beyond the scope of this free tool. Instead, we use a powerful AI to provide an educational analysis. It describes what an ideal backlink profile for a site like yours would look like, helping you understand what to aim for in your link-building strategy.</p>
            </ToolInfoBox>

            <RelatedTools currentToolLink="/tools/backlink-checker" />
        </ToolLayout>
    );
};

export default BacklinkCheckerPage;
