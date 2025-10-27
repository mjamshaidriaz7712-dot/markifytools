import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';

const BlogSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark">📰 Marketing Tips & Tutorials</h2>
          <p className="mt-4 text-lg text-gray-600">Insights and guides to level up your marketing game.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div key={post.title} className="bg-light rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-dark">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link to={post.link} className="font-semibold text-primary hover:underline">
                  Read More &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/blog"
            className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-lg text-md hover:bg-primary-hover transition-colors duration-300"
          >
            Visit Blog
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
