import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import ToolLayout from '../../components/ToolLayout';
import ToolInfoBox from '../../components/ToolInfoBox';
import RelatedTools from '../../components/RelatedTools';

const BlogTitleGeneratorPage: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [titles, setTitles] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        if (!topic) {
            setError('Please enter a topic to generate titles.');
            return;
        }
        setIsLoading(true);
        setError('');
        setTitles([]);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Generate 10 catchy, SEO-friendly blog post titles about "${topic}". Each title should be on a new line. Do not use markdown or numbering.`
            });
            
            const generatedTitles = response.text.split('\n').filter(title => title.trim() !== '');
            setTitles(generatedTitles);

        } catch (err) {
            setError('Failed to generate titles. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
    }

    return (
        <ToolLayout
            title="Blog Title Generator"
            description="Generate catchy and SEO-friendly blog post titles based on your keyword."
        >
            <div className="flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter your topic or keyword (e.g., 'content marketing')"
                    className="flex-grow w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-primary-hover transition-colors duration-300 disabled:bg-gray-400 whitespace-nowrap"
                >
                    {isLoading ? 'Generating...' : 'Generate Titles'}
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
                    titles.length > 0 && (
                        <ul className="space-y-3">
                            {titles.map((title, index) => (
                                <li key={index} className="bg-light p-4 rounded-md flex justify-between items-center">
                                    <span className="text-gray-800">{title}</span>
                                    <button onClick={() => handleCopy(title)} className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-1 px-3 rounded-md">
                                        Copy
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )
                )}
            </div>
            
            <ToolInfoBox title="Why is a good title important?">
                <p>Your blog post title is the first thing people see. A great title grabs attention, clearly communicates the post's value, and includes keywords that help it rank well in search engines. It's often the single most important factor in whether someone clicks to read your article.</p>
            </ToolInfoBox>

            <RelatedTools currentToolLink="/tools/blog-title-generator" />
        </ToolLayout>
    );
};

export default BlogTitleGeneratorPage;
