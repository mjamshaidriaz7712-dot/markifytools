import React from 'react';
import { Link } from 'react-router-dom';
import { FOOTER_LINKS } from '../constants';
import { RocketIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Logo & About */}
          <div className="md:col-span-1">
             <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-white mb-4">
                <RocketIcon />
                <span>MarkifyTools</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Markify Tools helps digital marketers with free, smart, and simple online utilities.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.legalLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Markify Tools. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;