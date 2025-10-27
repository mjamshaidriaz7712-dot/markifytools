import React from 'react';

interface ToolLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const ToolLayout: React.FC<ToolLayoutProps> = ({ title, description, children }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-dark">{title}</h1>
          <p className="mt-3 text-lg text-gray-600">{description}</p>
        </div>
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ToolLayout;