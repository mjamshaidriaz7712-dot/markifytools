import React from 'react';

interface LegalPageProps {
  title: string;
  content: string;
}

const LegalPage: React.FC<LegalPageProps> = ({ title, content }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-dark mb-6">{title}</h1>
        <div className="prose max-w-none text-gray-700">
            {content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
