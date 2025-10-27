import React, { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';
import ToolInfoBox from '../../components/ToolInfoBox';
import RelatedTools from '../../components/RelatedTools';

const SEOMetaPreviewPage: React.FC = () => {
    const [title, setTitle] = useState('Example Title - Your Website Name');
    const [description, setDescription] = useState('This is an example of a meta description. It should be concise and compelling, encouraging users to click on your link in the search results.');
    const [url, setUrl] = useState('https://www.example.com/your-page-url');

    const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary";
    const labelClass = "block text-gray-700 font-semibold mb-2";
    
    // Simple truncation for display purposes
    const truncate = (str: string, num: number) => {
        if (str.length <= num) return str;
        return str.slice(0, num) + '...';
    };

    return (
        <ToolLayout
            title="SEO Meta Preview Tool"
            description="See how your title tag and meta description will appear in Google search results."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4">Your Content</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="title" className={labelClass}>Title</label>
                            <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className={inputClass} />
                            <p className="text-sm text-gray-500 mt-1">{title.length} / 60 characters</p>
                        </div>
                        <div>
                            <label htmlFor="description" className={labelClass}>Meta Description</label>
                            <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} className={inputClass} rows={4}></textarea>
                             <p className="text-sm text-gray-500 mt-1">{description.length} / 160 characters</p>
                        </div>
                        <div>
                            <label htmlFor="url" className={labelClass}>URL</label>
                            <input type="text" id="url" value={url} onChange={e => setUrl(e.target.value)} className={inputClass} />
                        </div>
                    </div>
                </div>
                <div>
                     <h3 className="text-xl font-bold mb-4">Google Search Preview</h3>
                     <div className="border border-gray-200 p-4 rounded-lg shadow-sm">
                         <div>
                            <span className="text-sm text-gray-800">{truncate(url, 35)}</span>
                            <h3 className="text-blue-800 text-xl hover:underline cursor-pointer truncate">{truncate(title, 60)}</h3>
                         </div>
                         <p className="text-sm text-gray-600 mt-1">{truncate(description, 160)}</p>
                     </div>
                </div>
            </div>

            <ToolInfoBox title="Optimizing for Search Engines">
                <p><strong>Title Tag:</strong> Aim for under 60 characters. Your most important keywords should be first, followed by your brand name.</p>
                <p><strong>Meta Description:</strong> Keep it under 160 characters. It's not a direct ranking factor, but a good description increases your click-through rate.</p>
            </ToolInfoBox>

            <RelatedTools currentToolLink="/tools/seo-meta-preview" />
        </ToolLayout>
    );
};

export default SEOMetaPreviewPage;
