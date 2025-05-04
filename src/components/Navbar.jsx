import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ user, onSignOut }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '#services' },
    { label: 'About', path: '#about' },
    { label: 'Leaderboard', path: '#testimonials' },
    { label: 'FAQ', path: '#faq' },
    { label: 'Contact', path: '#contact' },
  ];

  const handleSmoothScroll = (e, path) => {
    if (path.startsWith('#') && path !== '/') {
      e.preventDefault();
      const targetId = path.slice(1);
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-black/95 backdrop-blur-sm text-white py-4 px-4 md:px-8 shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <img src="/logoo.svg" alt="Illume AI Logo" className="h-16 md:h-20 w-auto" />
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2 hover:text-purple-400 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                to={link.path}
                onClick={(e) => handleSmoothScroll(e, link.path)}
                className="hover:text-purple-400 transition"
              >
                {link.label}
              </Link>
            </li>
          ))}

          <li>
            <Link to="/community" className="hover:text-purple-400 transition">
              Community
            </Link>
          </li>

          <li>
            <Link
              to="/profile"
              className={`hover:text-orange-400 transition ${
                location.pathname === '/profile' ? 'text-orange-400 font-semibold' : ''
              }`}
            >
              Profile
            </Link>
          </li>

          {user ? (
            <li>
              <button
                onClick={onSignOut}
                className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded"
              >
                Sign Out
              </button>
            </li>
          ) : (
            <li>
              <Link
                to="/signin"
                className={`bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded ${
                  location.pathname === '/signin' ? 'font-semibold' : ''
                }`}
              >
                Sign In
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm md:hidden py-4 px-4"
            >
              <ul className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      onClick={(e) => handleSmoothScroll(e, link.path)}
                      className="block hover:text-purple-400 transition py-2"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/community"
                    onClick={() => setIsOpen(false)}
                    className="block hover:text-purple-400 transition py-2"
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className={`block hover:text-orange-400 transition py-2 ${
                      location.pathname === '/profile' ? 'text-orange-400 font-semibold' : ''
                    }`}
                  >
                    Profile
                  </Link>
                </li>
                {user ? (
                  <li>
                    <button
                      onClick={() => {
                        onSignOut();
                        setIsOpen(false);
                      }}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded text-left"
                    >
                      Sign Out
                    </button>
                  </li>
                ) : (
                  <li>
                    <Link
                      to="/signin"
                      onClick={() => setIsOpen(false)}
                      className="block w-full bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded"
                    >
                      Sign In
                    </Link>
                  </li>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;