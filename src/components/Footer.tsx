import { Facebook, Instagram, Linkedin, Youtube, Phone, Mail, MapPin, Database, Award, CheckCircle } from 'lucide-react';
import { SERVICES } from '../data';

interface FooterProps {
  onBookCall: () => void;
  onOpenAdmin: () => void;
}

export default function Footer({ onBookCall, onOpenAdmin }: FooterProps) {
  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
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
            <a href="#home" className="inline-flex items-center gap-2.5 group">
              <div className="relative flex items-end gap-[3px] h-7 w-7 pb-1.5 pt-1 px-1 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <div className="w-[4px] h-[35%] bg-amber-500 rounded-sm" />
                <div className="w-[4px] h-[65%] bg-amber-500 rounded-sm" />
                <div className="w-[4px] h-[95%] bg-amber-500 rounded-sm" />
                <div className="absolute right-0.5 top-1 w-1.5 h-1.5 rounded-full bg-amber-400" />
              </div>
              <div>
                <span className="font-display font-bold text-white text-base tracking-tight leading-none block">
                  Local Growth
                </span>
                <span className="font-mono text-[9px] font-bold text-amber-500 uppercase tracking-widest block mt-0.5">
                  System
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
                  <a href={link.href} className="hover:text-amber-400 transition-colors">
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
              {SERVICES.slice(0, 5).map((srv) => (
                <li key={srv}>
                  <button onClick={() => onBookCall()} className="hover:text-amber-400 transition-colors text-left">
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
                <span className="hover:text-white transition-colors cursor-pointer break-all">info@localgrowthsystem.com</span>
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
            <span>© 2026 Local Growth System. All Rights Reserved.</span>
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
