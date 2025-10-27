import React from 'react';

const BlogPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-dark mb-4">Marketing Blog</h1>
        <p className="text-lg text-gray-600 mb-8">
          Tips, tutorials, and insights from the Markify team.
        </p>
      </div>
       <div className="min-h-[50vh] flex items-center justify-center">
          <p className="text-2xl text-gray-400">Blog posts coming soon...</p>
      </div>
    </div>
  );
};

export default BlogPage;