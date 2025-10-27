import React from 'react';
import { Link } from 'react-router-dom';
import { TOOLS_DATA } from '../constants';

const ToolsGrid: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark">Our Most Popular Tools</h2>
          <p className="mt-4 text-lg text-gray-600">Quickly access the tools you need to get the job done.</p>
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

        <div className="text-center mt-16">
          <Link
            to="/tools"
            className="inline-block bg-white text-primary border border-primary font-semibold py-3 px-8 rounded-lg text-md hover:bg-primary hover:text-white transition-all duration-300"
          >
            See All 15 Tools
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ToolsGrid;
