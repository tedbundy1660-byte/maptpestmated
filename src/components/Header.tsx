import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone, Database, Compass, Award, Users, FileText } from 'lucide-react';
import { SERVICES } from '../data';

interface HeaderProps {
  onBookCall: () => void;
  onOpenAdmin: () => void;
  onSelectService: (serviceId: string, hash?: string) => void;
}

export default function Header({ onBookCall, onOpenAdmin, onSelectService }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const getServiceId = (name: string) => {
    return name.toLowerCase().replace(/ & /g, '-&-').replace(/ /g, '-');
  };

  // Detect scroll to style header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Before & After', href: '#comparison' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'GBP Scanner', href: '#gmb-audit' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
    { label: 'About Us', href: '#footer' },
    { label: 'Contact', href: '#footer' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-900 py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo with Yellow Rising Bars */}
          <a 
            href="#home" 
            onClick={(e) => {
              e.preventDefault();
              onSelectService('', '#home');
            }} 
            className="flex items-center gap-2.5 group" 
            id="logo-link"
          >
            <div className="relative flex items-end gap-[3px] h-7 w-7 pb-1.5 pt-1 px-1 rounded-lg bg-amber-500/10 border border-amber-500/20 group-hover:bg-amber-500/15 transition-colors">
              <div className="w-[4px] h-[35%] bg-amber-500 rounded-sm group-hover:h-[45%] transition-all duration-300" />
              <div className="w-[4px] h-[65%] bg-amber-500 rounded-sm group-hover:h-[75%] transition-all duration-300" />
              <div className="w-[4px] h-[95%] bg-amber-500 rounded-sm group-hover:h-[85%] transition-all duration-300" />
              <div className="absolute right-0.5 top-1 w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
            </div>
            <div>
              <span className="font-display font-bold text-white text-base tracking-tight leading-none block">
                MAPTO
              </span>
              <span className="font-mono text-[9px] font-bold text-amber-500 uppercase tracking-widest block mt-0.5">
                ESTIMATE
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <a 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                onSelectService('', '#home');
              }} 
              className="text-slate-300 hover:text-white text-xs font-semibold tracking-wide transition-colors"
            >
              Home
            </a>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className="flex items-center gap-1 text-slate-300 hover:text-white text-xs font-semibold tracking-wide py-2 transition-colors focus:outline-none">
                <span>Services</span>
                <ChevronDown size={14} className={`text-slate-500 transition-transform duration-200 ${isServicesOpen ? 'rotate-180 text-amber-400' : ''}`} />
              </button>

              {/* Dropdown Box */}
              {isServicesOpen && (
                <div className="absolute top-full -left-12 w-64 bg-slate-950 border border-slate-900 rounded-2xl p-3 shadow-2xl mt-1 text-xs">
                  <div className="grid gap-1">
                    {SERVICES.map((srv) => (
                      <button
                        key={srv}
                        onClick={() => {
                          onSelectService(getServiceId(srv));
                          setIsServicesOpen(false);
                        }}
                        className="text-left w-full px-3 py-2.5 rounded-xl text-slate-400 hover:bg-slate-900 hover:text-white transition-all flex items-center gap-2 group/item"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 group-hover/item:scale-125 transition-transform" />
                        <span>{srv}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectService('', link.href);
                }}
                className="text-slate-300 hover:text-white text-xs font-semibold tracking-wide transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA / Demo buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Database Leads Console Button (Subtle demo-tool) */}
            <button
              onClick={onOpenAdmin}
              className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-900 rounded-xl transition-all flex items-center gap-1.5 text-xs font-medium border border-transparent hover:border-amber-500/20"
              title="View Leads Inbox Console"
            >
              <Database size={15} />
              <span className="sr-only sm:not-sr-only">Leads Inbox</span>
            </button>

            <button
              onClick={onBookCall}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs tracking-wide transition-all duration-200 active:scale-95 shadow-md shadow-amber-500/10 flex items-center gap-1.5"
              id="header-cta-btn"
            >
              <Phone size={13} className="fill-slate-950" />
              <span>Book a Free Call</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={onOpenAdmin}
              className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-900 rounded-lg transition-colors"
              title="View Leads Inbox Console"
            >
              <Database size={16} />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-colors focus:outline-none"
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-slate-950 border-b border-slate-900 px-4 py-5 shadow-2xl flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                onSelectService('', '#home');
              }}
              className="text-slate-300 hover:text-white py-2 text-sm font-semibold border-b border-slate-900/40"
            >
              Home
            </a>
            
            {/* Services expansion */}
            <div className="py-2 border-b border-slate-900/40">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block mb-2">Services we provide</span>
              <div className="grid grid-cols-1 gap-2 pl-2">
                {SERVICES.map((srv) => (
                  <button
                    key={srv}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onSelectService(getServiceId(srv));
                    }}
                    className="text-left py-1 text-slate-400 text-xs hover:text-white transition-colors"
                  >
                    {srv}
                  </button>
                ))}
              </div>
            </div>

            {navLinks.slice(1).map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  onSelectService('', link.href);
                }}
                className="text-slate-300 hover:text-white py-2 text-sm font-semibold border-b border-slate-900/40"
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="text-slate-300 hover:text-white py-2 text-sm font-semibold border-b border-slate-900/40 text-left flex items-center gap-2 w-full"
            >
              <Database size={15} className="text-amber-500" />
              <span>Leads Inbox Console</span>
            </button>
          </div>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onBookCall();
            }}
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs tracking-wide transition-colors flex items-center justify-center gap-2"
          >
            <Phone size={13} className="fill-slate-950" />
            <span>Book a Free Growth Call</span>
          </button>
        </div>
      )}
    </header>
  );
}
