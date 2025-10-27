import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import ToolLayout from '../../components/ToolLayout';
import ToolInfoBox from '../../components/ToolInfoBox';
import RelatedTools from '../../components/RelatedTools';

const HashtagGeneratorPage: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [hashtags, setHashtags] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
        if (!topic) {
            setError('Please enter a topic to generate hashtags.');
            return;
        }
        setIsLoading(true);
        setError('');
        setHashtags('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Generate a list of 20 relevant and popular hashtags for social media posts about "${topic}". Include a mix of broad, niche, and community-specific hashtags. Output them as a single, space-separated string, each starting with #.`
            });
            
            setHashtags(response.text);

        } catch (err) {
            setError('Failed to generate hashtags. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = () => {
        if (hashtags) {
            navigator.clipboard.writeText(hashtags);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <ToolLayout
            title="Hashtag Generator"
            description="Find relevant and trending hashtags for your social media posts."
        >
            <div className="flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter your topic (e.g., 'digital marketing')"
                    className="flex-grow w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-primary-hover transition-colors duration-300 disabled:bg-gray-400 whitespace-nowrap"
                >
                    {isLoading ? 'Generating...' : 'Generate Hashtags'}
                </button>
            </div>

            {error && <div className="mt-4 text-red-600 bg-red-100 p-3 rounded-md">{error}</div>}

            <div className="mt-8 relative">
                {isLoading ? (
                     <div className="flex justify-center items-center min-h-[100px]">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        <p className="ml-3 text-gray-600">AI is finding hashtags...</p>
                    </div>
                ) : (
                    hashtags && (
                        <div>
                             <div className="bg-light p-4 rounded-md text-gray-800 break-words">
                                {hashtags}
                            </div>
                            <button onClick={handleCopy} className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md">
                                {copied ? 'Copied!' : 'Copy All'}
                            </button>
                        </div>
                    )
                )}
            </div>
            
            <ToolInfoBox title="How to Use Hashtags Effectively">
                <p>Don't just use the most popular hashtags, as your post can get lost. Use a mix of popular (1M+ posts), niche (10k-500k posts), and industry-specific hashtags to maximize your reach and connect with the right audience.</p>
            </ToolInfoBox>

            <RelatedTools currentToolLink="/tools/hashtag-generator" />
        </ToolLayout>
    );
};

export default HashtagGeneratorPage;
