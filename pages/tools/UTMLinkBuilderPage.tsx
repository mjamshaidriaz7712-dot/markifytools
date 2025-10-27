import React, { useState, useEffect } from 'react';
import ToolLayout from '../../components/ToolLayout';
import ToolInfoBox from '../../components/ToolInfoBox';
import RelatedTools from '../../components/RelatedTools';

const UTMLinkBuilderPage: React.FC = () => {
    const [url, setUrl] = useState('');
    const [source, setSource] = useState('');
    const [medium, setMedium] = useState('');
    const [campaign, setCampaign] = useState('');
    const [term, setTerm] = useState('');
    const [content, setContent] = useState('');
    const [generatedUrl, setGeneratedUrl] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const buildUrl = () => {
            if (!url) {
                setGeneratedUrl('');
                return;
            }

            try {
                const urlObject = new URL(url.startsWith('http') ? url : `https://${url}`);
                urlObject.searchParams.delete('utm_source');
                urlObject.searchParams.delete('utm_medium');
                urlObject.searchParams.delete('utm_campaign');
                urlObject.searchParams.delete('utm_term');
                urlObject.searchParams.delete('utm_content');
                
                if (source) urlObject.searchParams.set('utm_source', source);
                if (medium) urlObject.searchParams.set('utm_medium', medium);
                if (campaign) urlObject.searchParams.set('utm_campaign', campaign);
                if (term) urlObject.searchParams.set('utm_term', term);
                if (content) urlObject.searchParams.set('utm_content', content);
                setGeneratedUrl(urlObject.toString());
            } catch (error) {
                setGeneratedUrl('Please enter a valid URL.');
            }
        };
        buildUrl();
    }, [url, source, medium, campaign, term, content]);

    const handleCopy = () => {
        if (generatedUrl && !generatedUrl.startsWith('Please')) {
            navigator.clipboard.writeText(generatedUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };
    
    const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary";
    const labelClass = "block text-gray-700 font-semibold mb-2";

    return (
        <ToolLayout
            title="UTM Link Builder"
            description="Easily create campaign URLs with UTM parameters for better tracking in analytics."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="url" className={labelClass}>Website URL *</label>
                    <input type="text" id="url" value={url} onChange={e => setUrl(e.target.value)} className={inputClass} placeholder="https://example.com" required />
                </div>
                <div>
                    <label htmlFor="source" className={labelClass}>Campaign Source *</label>
                    <input type="text" id="source" value={source} onChange={e => setSource(e.target.value)} className={inputClass} placeholder="e.g. google, newsletter" required />
                </div>
                 <div>
                    <label htmlFor="medium" className={labelClass}>Campaign Medium *</label>
                    <input type="text" id="medium" value={medium} onChange={e => setMedium(e.target.value)} className={inputClass} placeholder="e.g. cpc, email" required />
                </div>
                <div>
                    <label htmlFor="campaign" className={labelClass}>Campaign Name *</label>
                    <input type="text" id="campaign" value={campaign} onChange={e => setCampaign(e.target.value)} className={inputClass} placeholder="e.g. spring_sale" required />
                </div>
                 <div>
                    <label htmlFor="term" className={labelClass}>Campaign Term</label>
                    <input type="text" id="term" value={term} onChange={e => setTerm(e.target.value)} className={inputClass} placeholder="e.g. running+shoes (for paid keywords)" />
                </div>
                <div>
                    <label htmlFor="content" className={labelClass}>Campaign Content</label>
                    <input type="text" id="content" value={content} onChange={e => setContent(e.target.value)} className={inputClass} placeholder="e.g. logolink, textlink (for A/B testing)" />
                </div>
            </div>

            {url && (
                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-2">Generated URL:</h3>
                    <div className="relative bg-gray-100 p-4 rounded-md font-mono text-sm break-all">
                        {generatedUrl || 'Start typing to generate a URL...'}
                        {generatedUrl && !generatedUrl.startsWith('Please') && (
                            <button onClick={handleCopy} className="absolute top-2 right-2 bg-primary hover:bg-primary-hover text-white font-bold py-1 px-2 rounded text-xs">
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        )}
                    </div>
                </div>
            )}
            
            <ToolInfoBox title="What are UTM parameters?">
                <p>UTM parameters are short text codes added to URLs to help you track the performance of web marketing campaigns. They allow analytics tools like Google Analytics to tell you where your visitors came from and what campaign brought them to your site.</p>
            </ToolInfoBox>

            <RelatedTools currentToolLink="/tools/utm-builder" />
        </ToolLayout>
    );
};

export default UTMLinkBuilderPage;
