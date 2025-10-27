import React, { useState, useEffect } from 'react';
import ToolLayout from '../../components/ToolLayout';

const UTMLinkBuilderPage: React.FC = () => {
  const [url, setUrl] = useState('');
  const [source, setSource] = useState('');
  const [medium, setMedium] = useState('');
  const [campaign, setCampaign] = useState('');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');

  useEffect(() => {
    try {
      if (!url) {
        setGeneratedUrl('');
        return;
      }

      const base = new URL(url);
      const params = new URLSearchParams(base.search);
      
      if (source) params.set('utm_source', source); else params.delete('utm_source');
      if (medium) params.set('utm_medium', medium); else params.delete('utm_medium');
      if (campaign) params.set('utm_campaign', campaign); else params.delete('utm_campaign');
      if (term) params.set('utm_term', term); else params.delete('utm_term');
      if (content) params.set('utm_content', content); else params.delete('utm_content');
      
      base.search = params.toString();
      setGeneratedUrl(base.toString());

    } catch (error) {
       // handle invalid URL
       setGeneratedUrl('Invalid URL provided');
    }
  }, [url, source, medium, campaign, term, content]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedUrl);
  };

  return (
    <ToolLayout
      title="UTM Link Builder"
      description="Create trackable campaign URLs for Google Analytics."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">Website URL <span className="text-red-500">*</span></label>
            <input type="url" id="url" value={url} onChange={(e) => setUrl(e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="https://yourwebsite.com" required />
          </div>
          <div>
            <label htmlFor="source" className="block text-sm font-medium text-gray-700">Campaign Source <span className="text-red-500">*</span></label>
            <input type="text" id="source" value={source} onChange={(e) => setSource(e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g., google, newsletter" required />
          </div>
          <div>
            <label htmlFor="medium" className="block text-sm font-medium text-gray-700">Campaign Medium <span className="text-red-500">*</span></label>
            <input type="text" id="medium" value={medium} onChange={(e) => setMedium(e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g., cpc, email" required />
          </div>
          <div>
            <label htmlFor="campaign" className="block text-sm font-medium text-gray-700">Campaign Name <span className="text-red-500">*</span></label>
            <input type="text" id="campaign" value={campaign} onChange={(e) => setCampaign(e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g., summer_sale" required />
          </div>
          <div>
            <label htmlFor="term" className="block text-sm font-medium text-gray-700">Campaign Term (Optional)</label>
            <input type="text" id="term" value={term} onChange={(e) => setTerm(e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g., running+shoes" />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Campaign Content (Optional)</label>
            <input type="text" id="content" value={content} onChange={(e) => setContent(e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g., logo_link" />
          </div>
        </div>
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-dark">Generated URL</h3>
            <div className="bg-light p-4 rounded-md break-words h-full">
                {generatedUrl && generatedUrl !== 'Invalid URL provided' ? (
                    <p className="text-gray-800">{generatedUrl}</p>
                ) : (
                    <p className="text-gray-400">{generatedUrl || 'Your generated URL will appear here...'}</p>
                )}
            </div>
            {generatedUrl && generatedUrl !== 'Invalid URL provided' && (
                <button
                    onClick={copyToClipboard}
                    className="w-full bg-primary text-white font-bold py-3 px-4 rounded-md hover:bg-primary-hover transition-colors"
                >
                    Copy to Clipboard
                </button>
            )}
        </div>
      </div>
    </ToolLayout>
  );
};

export default UTMLinkBuilderPage;