import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark tracking-tight">
          All Your Marketing Tools in One Place
          <span className="block text-primary">100% Free & Simple.</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600">
          From SEO to Social Media, boost your marketing with our easy, browser-based tools. No sign-ups, no fees, just results.
        </p>
        <div className="mt-10">
          <Link
            to="/tools"
            className="inline-block bg-primary text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-primary-hover transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Explore Tools
          </Link>
        </div>
        <div className="mt-12">
            <img src="https://picsum.photos/800/400?grayscale" alt="Marketing tools illustration" className="mx-auto rounded-lg shadow-2xl"/>
        </div>
      </div>
    </section>
  );
};

export default Hero;
