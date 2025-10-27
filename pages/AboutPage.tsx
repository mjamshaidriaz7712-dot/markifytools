import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-dark mb-4 text-center">About Markify Tools</h1>
        <p className="text-lg text-gray-600 mb-6">
          Welcome to Markify Tools, your go-to resource for simple, powerful, and completely free marketing utilities. Our mission is to empower digital marketers, small business owners, creators, and students by providing easy-to-use tools that deliver real results.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          We believe that access to great marketing tools shouldn't be complicated or expensive. That's why every tool on our site is browser-based, requires no sign-up, and is designed to be as intuitive as possible. Whether you're analyzing headlines, building trackable links, or generating content ideas, we're here to help you work smarter, not harder.
        </p>
         <p className="text-lg text-gray-600">
          Thank you for trusting Markify Tools. We're constantly working on new tools and improving existing ones based on your feedback.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
