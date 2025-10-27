import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import ToolLayout from '../../components/ToolLayout';
import ToolInfoBox from '../../components/ToolInfoBox';
import RelatedTools from '../../components/RelatedTools';

const PersonaGeneratorPage: React.FC = () => {
    const [product, setProduct] = useState('');
    const [audience, setAudience] = useState('');
    const [persona, setPersona] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        if (!product || !audience) {
            setError('Please describe your product and target audience.');
            return;
        }
        setIsLoading(true);
        setError('');
        setPersona('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Generate a detailed marketing persona for a customer of the following product/service.
                Product/Service: "${product}"
                Target Audience: "${audience}"
                
                The persona should include:
                - A fictional name and photo description.
                - Demographics (Age, Location, Occupation, Income).
                - Goals (What they want to achieve).
                - Frustrations (What are their pain points).
                - Motivations.
                - A short bio.
                Format the output as clean, readable text with clear headings.`
            });
            
            setPersona(response.text);

        } catch (err) {
            setError('Failed to generate persona. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ToolLayout
            title="Persona Generator"
            description="Create detailed marketing personas to better understand your target audience."
        >
            <div className="space-y-4">
                 <div>
                    <label htmlFor="product" className="block text-gray-700 font-semibold mb-2">Product/Service Description</label>
                    <input
                        type="text"
                        id="product"
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                        placeholder="e.g., A mobile app for learning new languages"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                 </div>
                 <div>
                    <label htmlFor="audience" className="block text-gray-700 font-semibold mb-2">Target Audience</label>
                    <input
                        type="text"
                        id="audience"
                        value={audience}
                        onChange={(e) => setAudience(e.target.value)}
                        placeholder="e.g., Young professionals who want to travel"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                 </div>
                 <div className="text-center">
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading}
                        className="bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-primary-hover transition-colors duration-300 disabled:bg-gray-400"
                    >
                        {isLoading ? 'Generating...' : 'Generate Persona'}
                    </button>
                 </div>
            </div>

            {error && <div className="mt-4 text-red-600 bg-red-100 p-3 rounded-md">{error}</div>}

            <div className="mt-8 p-6 border border-gray-200 rounded-lg min-h-[150px]">
                {isLoading ? (
                     <div className="flex justify-center items-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        <p className="ml-3 text-gray-600">AI is creating your persona...</p>
                    </div>
                ) : (
                    persona ? (
                        <pre className="whitespace-pre-wrap font-sans text-gray-700">{persona}</pre>
                    ) : (
                         <p className="text-gray-500 text-center">Your generated persona will appear here.</p>
                    )
                )}
            </div>
            
            <ToolInfoBox title="What is a Marketing Persona?">
                <p>A marketing persona is a semi-fictional representation of your ideal customer based on market research and real data about your existing customers. Creating personas helps you understand your customers' needs, experiences, behaviors, and goals, which allows you to create more targeted and effective marketing.</p>
            </ToolInfoBox>

            <RelatedTools currentToolLink="/tools/persona-generator" />
        </ToolLayout>
    );
};

export default PersonaGeneratorPage;
