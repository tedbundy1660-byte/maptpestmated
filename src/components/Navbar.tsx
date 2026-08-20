import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onBookCall: () => void;
}

export default function Navbar({ onBookCall }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Free Audit', path: '/audit' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-amber-500 text-white p-1.5 rounded-lg group-hover:bg-amber-600 transition-colors shadow-sm">
                <Rocket size={20} />
              </div>
              <span className={`font-display font-bold text-xl tracking-tight ${isScrolled || location.pathname !== '/' ? 'text-slate-900' : 'text-slate-900 lg:text-white'}`}>
                RankBoost <span className="text-amber-500 font-black">Pro</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-sm font-bold transition-colors ${
                      isActive 
                        ? 'text-amber-500' 
                        : isScrolled || location.pathname !== '/'
                          ? 'text-slate-600 hover:text-slate-900' 
                          : 'text-slate-600 lg:text-slate-200 lg:hover:text-white hover:text-slate-900'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={onBookCall}
                className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-sm shadow-amber-500/20 hover:shadow-md hover:-translate-y-0.5"
              >
                Book a Call
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 -mr-2 text-slate-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X size={24} className={isScrolled || location.pathname !== '/' ? 'text-slate-900' : 'text-slate-900'} />
              ) : (
                <Menu size={24} className={isScrolled || location.pathname !== '/' ? 'text-slate-900' : 'text-slate-900 lg:text-white'} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 pb-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-2xl font-display font-bold ${
                    location.pathname === link.path ? 'text-amber-500' : 'text-slate-900'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-8 pt-8 border-t border-slate-100">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onBookCall();
                  }}
                  className="w-full bg-slate-900 text-white px-6 py-4 rounded-xl font-bold text-lg"
                >
                  Book a Strategy Call
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
