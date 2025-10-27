import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import ToolLayout from '../../components/ToolLayout';
import ToolInfoBox from '../../components/ToolInfoBox';
import RelatedTools from '../../components/RelatedTools';

const ContentIdeaGeneratorPage: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [ideas, setIdeas] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        if (!topic) {
            setError('Please enter a topic to generate ideas.');
            return;
        }
        setIsLoading(true);
        setError('');
        setIdeas([]);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Generate 10 content ideas for the topic "${topic}". Include a mix of blog posts, video ideas, and social media post concepts. Each idea should be on a new line. Do not use markdown.`
            });
            
            const generatedIdeas = response.text.split('\n').filter(idea => idea.trim() !== '');
            setIdeas(generatedIdeas);

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
            description="Never run out of content ideas. Get suggestions based on your topic."
        >
            <div className="flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter your topic or keyword..."
                    className="flex-grow w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-primary-hover transition-colors duration-300 disabled:bg-gray-400 whitespace-nowrap"
                >
                    {isLoading ? 'Generating...' : 'Generate Ideas'}
                </button>
            </div>

            {error && <div className="mt-4 text-red-600 bg-red-100 p-3 rounded-md">{error}</div>}

            <div className="mt-8">
                {isLoading ? (
                     <div className="flex justify-center items-center h-full min-h-[150px]">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        <p className="ml-3 text-gray-600">AI is brainstorming...</p>
                    </div>
                ) : (
                    ideas.length > 0 && (
                        <ul className="space-y-3">
                            {ideas.map((idea, index) => (
                                <li key={index} className="bg-light p-4 rounded-md">
                                    <p className="text-gray-800">{idea}</p>
                                </li>
                            ))}
                        </ul>
                    )
                )}
            </div>
            
            <ToolInfoBox title="Beat Writer's Block">
                <p>Consistent content creation is key to growing an audience. Use this tool to spark inspiration for your blog, YouTube channel, or social media calendar. You can take these ideas as-is or use them as a starting point for your own unique content.</p>
            </ToolInfoBox>

            <RelatedTools currentToolLink="/tools/content-idea-generator" />
        </ToolLayout>
    );
};

export default ContentIdeaGeneratorPage;
