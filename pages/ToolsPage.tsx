import React from 'react';
import { Link } from 'react-router-dom';
import { TOOLS_DATA } from '../constants';

const ToolsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-dark mb-4">All Our Tools</h1>
        <p className="text-lg text-gray-600 mb-12">
          Explore our full suite of 15+ free marketing tools to supercharge your campaigns.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {TOOLS_DATA.map((tool) => (
          <div key={tool.title} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="flex-shrink-0 mb-4 text-primary">
              {tool.icon}
            </div>
            <h3 className="text-xl font-semibold text-dark mb-2">{tool.title}</h3>
            <p className="text-gray-600 flex-grow">{tool.description}</p>
            <Link to={tool.link} className="mt-4 text-primary font-semibold hover:underline self-start">
              Open Tool &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsPage;