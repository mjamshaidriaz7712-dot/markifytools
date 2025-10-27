import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from './icons';

const TrustSection: React.FC = () => {
  const features = [
    { title: '100% Free & No Sign-Up', description: 'Access all our tools instantly without any cost or registration.' },
    { title: 'Fast, Lightweight & Mobile-Friendly', description: 'Our tools are built for speed and work perfectly on any device.' },
    { title: 'SEO-Optimized for Marketers', description: 'Tools designed to help you rank higher and grow your online presence.' },
    { title: 'Trusted by Professionals', description: 'Used by creators, agencies, and small businesses worldwide.' },
  ];

  return (
    <section className="py-16 sm:py-20 bg-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark">Why Markify Tools?</h2>
          <p className="mt-4 text-lg text-gray-600">We focus on what matters: simplicity, power, and results.</p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0">
                <CheckCircleIcon />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-dark">{feature.title}</h3>
                <p className="mt-1 text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
            <Link to="/tools" className="bg-primary text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-primary-hover transition-colors duration-300">
                Try Our Tools Now
            </Link>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
