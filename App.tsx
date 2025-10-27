import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ToolsPage from './pages/ToolsPage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LegalPage from './pages/LegalPage';
import { PRIVACY_POLICY, TERMS_OF_SERVICE, DISCLAIMER } from './constants';

// Tool Pages
import HeadlineAnalyzerPage from './pages/tools/HeadlineAnalyzerPage';
import UTMLinkBuilderPage from './pages/tools/UTMLinkBuilderPage';
import SEOMetaPreviewPage from './pages/tools/SEOMetaPreviewPage';
import SocialEngagementCalculatorPage from './pages/tools/SocialEngagementCalculatorPage';
import EmailSubjectTesterPage from './pages/tools/EmailSubjectTesterPage';
import RoiCalculatorPage from './pages/tools/RoiCalculatorPage';
import KeywordDensityAnalyzerPage from './pages/tools/KeywordDensityAnalyzerPage';
import BlogTitleGeneratorPage from './pages/tools/BlogTitleGeneratorPage';
import HashtagGeneratorPage from './pages/tools/HashtagGeneratorPage';
import BacklinkCheckerPage from './pages/tools/BacklinkCheckerPage';
import ColorPaletteGeneratorPage from './pages/tools/ColorPaletteGeneratorPage';
import WordCounterPage from './pages/tools/WordCounterPage';
import PersonaGeneratorPage from './pages/tools/PersonaGeneratorPage';
import ContentIdeaGeneratorPage from './pages/tools/ContentIdeaGeneratorPage';
import BestPostingTimeFinderPage from './pages/tools/BestPostingTimeFinderPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-light text-dark">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Legal Pages */}
            <Route path="/privacy-policy" element={<LegalPage title="Privacy Policy" content={PRIVACY_POLICY} />} />
            <Route path="/terms" element={<LegalPage title="Terms of Service" content={TERMS_OF_SERVICE} />} />
            <Route path="/disclaimer" element={<LegalPage title="Disclaimer" content={DISCLAIMER} />} />

            {/* Tool Pages */}
            <Route path="/tools/headline-analyzer" element={<HeadlineAnalyzerPage />} />
            <Route path="/tools/utm-builder" element={<UTMLinkBuilderPage />} />
            <Route path="/tools/seo-meta-preview" element={<SEOMetaPreviewPage />} />
            <Route path="/tools/engagement-calculator" element={<SocialEngagementCalculatorPage />} />
            <Route path="/tools/subject-tester" element={<EmailSubjectTesterPage />} />
            <Route path="/tools/roi-calculator" element={<RoiCalculatorPage />} />
            <Route path="/tools/keyword-density-analyzer" element={<KeywordDensityAnalyzerPage />} />
            <Route path="/tools/blog-title-generator" element={<BlogTitleGeneratorPage />} />
            <Route path="/tools/hashtag-generator" element={<HashtagGeneratorPage />} />
            <Route path="/tools/backlink-checker" element={<BacklinkCheckerPage />} />
            <Route path="/tools/color-palette-generator" element={<ColorPaletteGeneratorPage />} />
            <Route path="/tools/word-counter" element={<WordCounterPage />} />
            <Route path="/tools/persona-generator" element={<PersonaGeneratorPage />} />
            <Route path="/tools/content-idea-generator" element={<ContentIdeaGeneratorPage />} />
            <Route path="/tools/best-posting-time-finder" element={<BestPostingTimeFinderPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;