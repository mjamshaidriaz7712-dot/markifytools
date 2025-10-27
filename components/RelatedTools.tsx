import React from 'react';
import { Link } from 'react-router-dom';
import { TOOLS_DATA } from '../constants';
import { Tool } from '../types';

interface RelatedToolsProps {
  currentToolLink: string;
  count?: number;
}

const RelatedTools: React.FC<RelatedToolsProps> = ({ currentToolLink, count = 3 }) => {
  const relatedTools = TOOLS_DATA
    .filter(tool => tool.link !== currentToolLink)
    .sort(() => 0.5 - Math.random())
    .slice(0, count);

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-center text-dark mb-8">Related Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {relatedTools.map((tool: Tool) => (
          <Link to={tool.link} key={tool.link} className="block bg-light p-6 rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="text-primary mb-3">
              {React.cloneElement(tool.icon, { className: 'h-8 w-8' })}
            </div>
            <h3 className="text-lg font-semibold text-dark mb-2">{tool.title}</h3>
            <p className="text-sm text-gray-600">{tool.description.substring(0, 80)}...</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedTools;
