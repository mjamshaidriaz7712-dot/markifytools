import React from 'react';

const Newsletter: React.FC = () => {
  return (
    <section className="bg-primary py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white">Get Smarter Marketing Insights</h2>
        <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
          Get the latest marketing tips, tools, and updates — straight to your inbox.
        </p>
        <form className="mt-8 max-w-lg mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-md text-dark placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <button
            type="submit"
            className="bg-dark text-white font-semibold py-3 px-6 rounded-md hover:bg-gray-700 transition-colors duration-300 whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
