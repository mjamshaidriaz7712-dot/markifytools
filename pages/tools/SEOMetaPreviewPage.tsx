import React, { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';

const SEOMetaPreviewPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('https://yourwebsite.com/your-page');

  const titleLimit = 60;
  const descriptionLimit = 160;

  return (
    <ToolLayout
      title="SEO Meta Preview Generator"
      description="See how your meta title & description will appear in Google search results."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="title" className="flex justify-between text-sm font-medium text-gray-700">
              <span>Meta Title</span>
              <span className={title.length > titleLimit ? 'text-red-500' : 'text-gray-500'}>
                {title.length} / {titleLimit}
              </span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Your Page Title"
            />
          </div>
          <div>
            <label htmlFor="description" className="flex justify-between text-sm font-medium text-gray-700">
              <span>Meta Description</span>
              <span className={description.length > descriptionLimit ? 'text-red-500' : 'text-gray-500'}>
                {description.length} / {descriptionLimit}
              </span>
            </label>
            <textarea
              id="description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="A brief description of your page content."
            />
          </div>
        </div>
        
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-dark">Google Preview</h3>
            <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-800 truncate">{url || 'https://yourwebsite.com/your-page'}</p>
                <h3 className="text-xl text-blue-800 hover:underline cursor-pointer truncate">
                    {title || 'Example Meta Title | Your Brand Name'}
                </h3>
                <p className="text-sm text-gray-600">
                    {description || 'This is an example of what your meta description will look like in the search results. It should be compelling and informative.'}
                </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-900 text-white">
                <p className="text-sm text-gray-300 truncate">{url || 'https://yourwebsite.com/your-page'}</p>
                <h3 className="text-xl text-blue-400 hover:underline cursor-pointer truncate">
                    {title || 'Example Meta Title | Your Brand Name'}
                </h3>
                <p className="text-sm text-gray-400">
                    {description || 'This is an example of what your meta description will look like in the search results. It should be compelling and informative.'}
                </p>
            </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default SEOMetaPreviewPage;