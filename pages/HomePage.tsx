import React from 'react';
import Hero from '../components/Hero';
import ToolsGrid from '../components/ToolsGrid';
import BlogSection from '../components/BlogSection';
import TrustSection from '../components/TrustSection';
import Newsletter from '../components/Newsletter';

const HomePage: React.FC = () => {
  return (
    <div className="bg-light">
      <Hero />
      <ToolsGrid />
      <BlogSection />
      <TrustSection />
      <Newsletter />
    </div>
  );
};

export default HomePage;