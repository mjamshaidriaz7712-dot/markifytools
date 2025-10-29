import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-4xl font-bold">Post not found</h1>
        <p className="mt-4">Sorry, we couldn't find the blog post you're looking for.</p>
        <Link to="/blog" className="mt-8 inline-block bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-hover">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-dark mb-8">{post.title}</h1>
        <div className="prose lg:prose-lg max-w-none text-gray-700">
          {post.content}
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;