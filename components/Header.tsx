import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { MenuIcon, XIcon, SearchIcon, RocketIcon } from './icons';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeLinkStyle = {
    color: '#007BFF',
    fontWeight: '600',
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-dark">
              <RocketIcon />
              <span>MarkifyTools</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <nav className="flex items-center space-x-8">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className="text-gray-600 hover:text-primary transition-colors duration-200"
                  style={({ isActive }) => isActive ? activeLinkStyle : {}}
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-600 hover:text-primary transition-colors duration-200">
                <SearchIcon />
            </button>
            <Link to="/tools" className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-hover transition-colors duration-300">
                Try a Tool
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-primary focus:outline-none"
            >
              {isMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-primary"
                style={({ isActive }) => isActive ? activeLinkStyle : {}}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
