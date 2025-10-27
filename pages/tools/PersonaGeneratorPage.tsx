import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import ToolLayout from '../../components/ToolLayout';

interface Persona {
    name: string;
    age: number;
    jobTitle: string;
    goals: string[];
    painPoints: string[];
    motivations: string[];
    marketingMessage: string;
}

const PersonaGeneratorPage: React.FC = () => {
  const [audience, setAudience] = useState('');
  const [product, setProduct] = useState('');
  const [persona, setPersona] = useState<Persona | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!audience || !product) {
      setError('Please fill in all fields.');
      return;
    }
    setIsLoading(true);
    setError('');
    setPersona(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Generate a marketing buyer persona for a company that sells "${product}". The target audience is described as: "${audience}".`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    age: { type: Type.INTEGER },
                    jobTitle: { type: Type.STRING },
                    goals: { type: Type.ARRAY, items: { type: Type.STRING }},
                    painPoints: { type: Type.ARRAY, items: { type: Type.STRING }},
                    motivations: { type: Type.ARRAY, items: { type: Type.STRING }},
                    marketingMessage: { type: Type.STRING },
                },
                required: ["name", "age", "jobTitle", "goals", "painPoints", "motivations", "marketingMessage"]
            }
        }
      });
      const jsonStr = response.text.trim();
      setPersona(JSON.parse(jsonStr));

    } catch (err) {
      setError('Failed to generate a persona. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Marketing Persona Generator"
      description="Quickly create a detailed buyer persona based on your target audience."
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="audience" className="block text-sm font-medium text-gray-700 mb-1">Target Audience Description</label>
          <input type="text" id="audience" value={audience} onChange={e => setAudience(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g., small business owners, busy moms, college students" />
        </div>
        <div>
          <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">Your Product/Service</label>
          <input type="text" id="product" value={product} onChange={e => setProduct(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g., project management software, meal delivery service" />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full bg-primary text-white font-bold py-3 px-4 rounded-md hover:bg-primary-hover transition-colors duration-300 disabled:bg-gray-400 flex items-center justify-center"
        >
          {isLoading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
          {isLoading ? 'Generating...' : 'Generate Persona'}
        </button>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {persona && (
          <div className="mt-6 p-6 border border-gray-200 rounded-lg bg-light grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold text-dark">{persona.name}</h2>
              <p className="text-lg text-gray-600">{persona.jobTitle}, Age {persona.age}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-dark mb-2">Goals</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">{persona.goals.map((g,i) => <li key={i}>{g}</li>)}</ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-dark mb-2">Pain Points</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">{persona.painPoints.map((p,i) => <li key={i}>{p}</li>)}</ul>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-dark mb-2">Motivations</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">{persona.motivations.map((m,i) => <li key={i}>{m}</li>)}</ul>
            </div>
             <div className="md:col-span-2 bg-blue-100 p-4 rounded-md">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Key Marketing Message</h3>
              <p className="text-blue-700 italic">"{persona.marketingMessage}"</p>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default PersonaGeneratorPage;