import React from 'react';
import { Facebook, Instagram, Linkedin, Youtube, Phone, Mail, MapPin, Database, Award, CheckCircle } from 'lucide-react';
import { SERVICES } from '../data';

interface FooterProps {
  onBookCall: () => void;
  onOpenAdmin: () => void;
  onSelectService: (serviceId: string, hash?: string) => void;
}

export default function Footer({ onBookCall, onOpenAdmin, onSelectService }: FooterProps) {
  const getServiceId = (name: string) => {
    return name.toLowerCase().replace(/ & /g, '-&-').replace(/ /g, '-');
  };

  const quickLinks = [
    { label: 'Home', href: '/', onClick: (e: React.MouseEvent) => { e.preventDefault(); onSelectService('', '#home'); } },
    { label: 'About Us', href: '/about', onClick: (e: React.MouseEvent) => { e.preventDefault(); onSelectService('', 'about'); } },
    { label: 'Services', href: '/services', onClick: (e: React.MouseEvent) => { e.preventDefault(); onSelectService('', 'services'); } },
    { label: 'Pricing', href: '/pricing', onClick: (e: React.MouseEvent) => { e.preventDefault(); onSelectService('', 'pricing'); } },
    { label: 'Contact', href: '/contact', onClick: (e: React.MouseEvent) => { e.preventDefault(); onSelectService('', 'contact'); } },
  ];

  return (
    <footer className="bg-[#04070d] text-slate-400 border-t border-slate-900 pt-16 pb-8 text-xs relative overflow-hidden" id="footer">
      
      {/* Decorative ambient gradient */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-6 lg:gap-8 pb-12 border-b border-slate-900">
          
          {/* Column 1: Brand Info (4 cols on large, full on smaller) */}
          <div className="col-span-2 md:col-span-4 space-y-4">
            {/* Logo */}
            <a 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                onSelectService('', '#home');
              }} 
              className="inline-flex items-center gap-3.5 group"
            >
              <div className="relative flex items-center justify-center h-10 w-10 rounded-xl bg-slate-900 border border-slate-700 shadow-lg group-hover:border-amber-500 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all duration-300 overflow-hidden">
                {/* Radar circular rings with enhanced colors */}
                <div className="absolute w-8 h-8 rounded-full border border-slate-800 group-hover:border-amber-500/10 transition-colors" />
                <div className="absolute w-5 h-5 rounded-full border border-slate-700 group-hover:border-amber-500/30 group-hover:scale-110 transition-all duration-500" />
                
                {/* Crosshair target lines */}
                <div className="absolute w-6 h-[1px] bg-slate-700 group-hover:bg-amber-500/40 transition-colors" />
                <div className="absolute h-6 w-[1px] bg-slate-700 group-hover:bg-amber-500/40 transition-colors" />
                
                {/* Pulsating target center - highly visible amber */}
                <div className="relative w-2 h-2 rounded-full bg-amber-500 flex items-center justify-center">
                  <div className="absolute w-4 h-4 rounded-full bg-amber-500/60 animate-ping opacity-90" />
                </div>
              </div>
              <div>
                <span className="font-display font-black text-white text-[18px] tracking-[0.08em] leading-none block">
                  MAP <span className="text-amber-500 text-[19px] drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]">TO</span>
                </span>
                <span className="font-mono text-[9px] font-bold text-slate-300 uppercase tracking-[0.25em] block mt-1">
                  ESTIMATE
                </span>
              </div>
            </a>

            <p className="text-slate-400 leading-relaxed text-[11px] max-w-xs">
              We help local service businesses get found online, generate more calls, and convert those calls into booked jobs.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Youtube, href: '#', label: 'YouTube' }
              ].map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="p-2 bg-slate-950 hover:bg-slate-900 hover:text-white border border-slate-900 hover:border-slate-800 rounded-xl transition-all"
                    aria-label={social.label}
                  >
                    <IconComponent size={14} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <h4 className="font-display font-extrabold text-white text-xs tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-[11px]">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} onClick={link.onClick} className="hover:text-amber-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button onClick={onOpenAdmin} className="hover:text-amber-400 transition-colors text-left flex items-center gap-1">
                  <span>Leads Console</span>
                  <span className="px-1 py-0.2 bg-slate-900 text-slate-500 text-[8px] rounded font-mono">Demo</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Services (2 cols) */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <h4 className="font-display font-extrabold text-white text-xs tracking-wider uppercase">
              Our Services
            </h4>
            <ul className="space-y-2 text-[11px]">
              {SERVICES.map((srv) => (
                <li key={srv}>
                  <button onClick={() => onSelectService(getServiceId(srv))} className="hover:text-amber-400 transition-colors text-left">
                    {srv}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us (2 cols) */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <h4 className="font-display font-extrabold text-white text-xs tracking-wider uppercase">
              Contact Us
            </h4>
            <ul className="space-y-2.5 text-[11px] text-slate-400">
              <li className="flex gap-2 items-start">
                <Phone size={13} className="text-amber-500 shrink-0 mt-0.5" />
                <span className="font-mono hover:text-white transition-colors cursor-pointer">(888) 123-4567</span>
              </li>
              <li className="flex gap-2 items-start">
                <Mail size={13} className="text-amber-500 shrink-0 mt-0.5" />
                <span className="hover:text-white transition-colors cursor-pointer break-all">growth@mapstoestimates.com</span>
              </li>
              <li className="flex gap-2 items-start">
                <MapPin size={13} className="text-amber-500 shrink-0 mt-0.5" />
                <span>123 Growth Way, Suite 100 Austin, TX 78701</span>
              </li>
            </ul>
          </div>

          {/* Column 5: Call Out Box / CTA (2 cols) */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="font-display font-extrabold text-white text-xs tracking-wider uppercase">
              Book Your Free Call
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Let's talk about how we can grow your business.
            </p>
            <button
              onClick={() => onBookCall()}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2 px-3 rounded-xl text-xs tracking-wide transition-colors"
              id="footer-cta-btn"
            >
              Book Now
            </button>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center md:text-left">
            <span>© 2026 MAP TO ESTIMATE. All Rights Reserved.</span>
            <span className="hidden sm:inline text-slate-800">|</span>
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1 text-slate-500 hover:text-amber-500 transition-colors text-[10px]"
            >
              <Database size={11} />
              <span>Launch Leads Dashboard Panel</span>
            </button>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <a href="#faq" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <span className="text-slate-800">•</span>
            <a href="#faq" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <span className="text-slate-800">•</span>
            <a href="#faq" className="hover:text-slate-400 transition-colors">Return Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
