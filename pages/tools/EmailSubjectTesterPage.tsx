import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import ToolLayout from '../../components/ToolLayout';
import ToolInfoBox from '../../components/ToolInfoBox';
import RelatedTools from '../../components/RelatedTools';

const EmailSubjectTesterPage: React.FC = () => {
    const [subject, setSubject] = useState('');
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAnalyze = async () => {
        if (!subject) {
            setError('Please enter a subject line to test.');
            return;
        }
        setIsLoading(true);
        setError('');
        setAnalysis('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Analyze the following email subject line: "${subject}". Evaluate its potential for high open rates. Consider factors like clarity, urgency, curiosity, and potential to be flagged as spam. Provide actionable suggestions for improvement.`
            });
            
            setAnalysis(response.text);

        } catch (err) {
            setError('Failed to test subject line. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ToolLayout
            title="Email Subject Line Tester"
            description="Test your email subject lines to increase open rates and avoid spam filters."
        >
            <div className="flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter your email subject line..."
                    className="flex-grow w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                    onClick={handleAnalyze}
                    disabled={isLoading}
                    className="bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-primary-hover transition-colors duration-300 disabled:bg-gray-400 whitespace-nowrap"
                >
                    {isLoading ? 'Testing...' : 'Test Subject'}
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
                         <p className="text-gray-500 text-center">Your test results will appear here.</p>
                    )
                )}
            </div>
            
            <ToolInfoBox title="Tips for Better Subject Lines">
                <p>Keep them short and to the point (under 50 characters is best for mobile). Personalize when possible, create a sense of urgency or curiosity, and avoid using all caps or excessive exclamation marks!!!</p>
            </ToolInfoBox>

            <RelatedTools currentToolLink="/tools/subject-tester" />
        </ToolLayout>
    );
};

export default EmailSubjectTesterPage;
