import React, { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';

const timeData: { [key: string]: { [key: string]: string[] } } = {
  'Instagram': {
    'General': ['9 AM - 11 AM', '2 PM - 4 PM'],
    'Tech': ['10 AM', '1 PM', '5 PM'],
    'Retail': ['12 PM', '3 PM', '5 PM'],
    'Healthcare': ['9 AM', '1 PM'],
  },
  'Facebook': {
    'General': ['9 AM', '1 PM', '3 PM'],
    'Tech': ['9 AM - 12 PM'],
    'Retail': ['12 PM', '3 PM', '6 PM'],
    'Healthcare': ['10 AM', '2 PM'],
  },
  'LinkedIn': {
    'General': ['10 AM - 12 PM'],
    'Tech': ['8 AM', '10 AM - 12 PM', '4 PM'],
    'Retail': ['9 AM', '12 PM'],
    'Healthcare': ['10 AM', '1 PM'],
  },
  'Twitter': {
      'General': ['8 AM - 10 AM', '12 PM', '6 PM'],
      'Tech': ['9 AM', '3 PM', '8 PM'],
      'Retail': ['12 PM', '5 PM'],
      'Healthcare': ['11 AM', '1 PM'],
  }
};

const BestPostingTimeFinderPage: React.FC = () => {
  const [platform, setPlatform] = useState('Instagram');
  const [industry, setIndustry] = useState('General');

  const platforms = Object.keys(timeData);
  const industries = Object.keys(timeData[platform]);
  const bestTimes = timeData[platform][industry] || [];

  return (
    <ToolLayout
      title="Best Posting Time Finder"
      description="Find the ideal times to post on social media for maximum engagement."
    >
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 space-y-4">
          <div>
            <label htmlFor="platform" className="block text-sm font-medium text-gray-700">Platform</label>
            <select id="platform" value={platform} onChange={e => setPlatform(e.target.value)} className="mt-1 w-full bg-white px-3 py-2 border border-gray-300 rounded-md">
              {platforms.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
            <select id="industry" value={industry} onChange={e => setIndustry(e.target.value)} className="mt-1 w-full bg-white px-3 py-2 border border-gray-300 rounded-md">
              {industries.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <div className="p-6 bg-light rounded-lg h-full">
            <h3 className="text-xl font-semibold text-dark">Best Times to Post on {platform}</h3>
            <p className="text-gray-600 mb-4">For the <span className="font-semibold">{industry}</span> industry:</p>
            <div className="flex flex-wrap gap-3">
                {bestTimes.map((time, index) => (
                    <div key={index} className="bg-primary text-white font-bold py-2 px-4 rounded-full">
                        {time}
                    </div>
                ))}
            </div>
            <p className="text-xs text-gray-500 mt-6">*These are general recommendations based on industry data. Always test to see what works best for your specific audience.</p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default BestPostingTimeFinderPage;