import React, { useState } from 'react';
import { Phone, ArrowRight, CheckCircle, ShieldCheck, Zap, Sparkles, MapPin, Play, Heart, Star } from 'lucide-react';
import { SERVICES } from '../data';
import { LeadSubmission } from '../types';

interface HeroProps {
  onBookCall: () => void;
}

export default function Hero({ onBookCall }: HeroProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    businessName: '',
    emailAddress: '',
    service: SERVICES[0]
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (!/^\+?[\d\s-]{7,15}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Enter a valid phone number';
    }
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      newErrors.emailAddress = 'Enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      const dateStr = tomorrow.toISOString().split('T')[0];

      const newSubmission: LeadSubmission = {
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        businessName: formData.businessName,
        emailAddress: formData.emailAddress,
        service: formData.service,
        submittedAt: new Date().toISOString(),
        status: 'new',
        scheduledDate: dateStr,
        scheduledTime: '10:30 AM' // Default slot for inline fast submission
      };

      const existingLeadsStr = localStorage.getItem('local-growth-leads') || '[]';
      try {
        const existingLeads = JSON.parse(existingLeadsStr) as LeadSubmission[];
        existingLeads.unshift(newSubmission);
        localStorage.setItem('local-growth-leads', JSON.stringify(existingLeads));
      } catch (e) {
        localStorage.setItem('local-growth-leads', JSON.stringify([newSubmission]));
      }

      window.dispatchEvent(new Event('lead-submitted'));
      setIsSubmitted(true);
    }
  };

  return (
    <section id="home" className="relative bg-[#060a13] text-slate-100 overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
      {/* Background aesthetics */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.06),transparent_50%)]" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column Content */}
          <div className="lg:col-span-7 space-y-6 lg:pr-4">
            
            {/* Tag badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/25 rounded-full">
              <Sparkles size={11} className="text-amber-400" />
              <span className="font-mono text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                For Local Service Businesses
              </span>
            </div>

            {/* Massive Headline */}
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[54px] tracking-tight leading-[1.08] text-white">
              More Calls. <br />
              More Booked Jobs. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                More Revenue.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed">
              We help local service businesses rank higher on Google Maps, build trust on social media, and convert more calls into booked appointments.
            </p>

            {/* Three key focus checklist items */}
            <div className="grid sm:grid-cols-3 gap-3.5 pt-2">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/40 border border-slate-900/60 hover:border-slate-800 transition-colors">
                <span className="p-1 rounded-lg bg-amber-500/10 text-amber-400">
                  <MapPin size={14} />
                </span>
                <span className="text-xs font-semibold text-slate-300 leading-tight">
                  Rank Higher <br />On Google Maps
                </span>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/40 border border-slate-900/60 hover:border-slate-800 transition-colors">
                <span className="p-1 rounded-lg bg-amber-500/10 text-amber-400">
                  <Phone size={14} />
                </span>
                <span className="text-xs font-semibold text-slate-300 leading-tight">
                  Get More Calls <br />From Local Customers
                </span>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/40 border border-slate-900/60 hover:border-slate-800 transition-colors">
                <span className="p-1 rounded-lg bg-amber-500/10 text-amber-400">
                  <CheckCircle size={14} />
                </span>
                <span className="text-xs font-semibold text-slate-300 leading-tight">
                  Convert More Leads <br />Into Booked Jobs
                </span>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-3">
              <button
                onClick={onBookCall}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 px-6 rounded-xl text-xs tracking-wider transition-all duration-200 shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2"
                id="hero-call-btn"
              >
                <Phone size={14} className="fill-slate-950" />
                <span>Book a Free Growth Call</span>
              </button>
              
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/40 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all"
              >
                <Play size={13} className="fill-slate-300" />
                <span>See How It Works</span>
              </a>
            </div>

            {/* Micro proof badges */}
            <div className="flex items-center gap-6 pt-4 text-xs text-slate-500 border-t border-slate-900/60 max-w-md">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="w-7 h-7 rounded-full bg-slate-800 border border-slate-950 flex items-center justify-center text-[10px] font-bold text-slate-400">
                    {num === 4 ? '+50' : <Star size={10} className="fill-amber-400 text-amber-400" />}
                  </div>
                ))}
              </div>
              <div>
                <p className="font-medium text-slate-400">Trusted by 500+ Contractors</p>
                <p className="text-[10px] text-slate-500">Rated 4.9/5 stars nationwide</p>
              </div>
            </div>

          </div>

          {/* Right Column - Booking Card Form */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-amber-500/5 rounded-3xl blur-2xl pointer-events-none" />

            {/* White overlay form container representing the high-contrast widget in the screenshot */}
            <div className="relative bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 overflow-hidden" id="hero-form-card">
              
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-500" />

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-center space-y-1.5 mb-2">
                    <h3 className="font-display font-black text-xl sm:text-2xl text-slate-950 leading-tight">
                      Book Your Free <br />
                      <span className="text-amber-500 font-extrabold">15-Minute Growth Call</span>
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed max-w-sm mx-auto">
                      We'll review your business and show you opportunities to get more calls and jobs.
                    </p>
                  </div>

                  {/* Name Input */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full bg-slate-50 border ${errors.fullName ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:ring-amber-200 focus:border-amber-500'} rounded-xl px-3.5 py-2.5 text-xs text-slate-950 outline-none focus:ring-4 transition-all`}
                    />
                    {errors.fullName && <p className="text-[10px] text-red-500">{errors.fullName}</p>}
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="e.g. (555) 000-0000"
                      value={formData.phoneNumber}
                      onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className={`w-full bg-slate-50 border ${errors.phoneNumber ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:ring-amber-200 focus:border-amber-500'} rounded-xl px-3.5 py-2.5 text-xs text-slate-950 outline-none focus:ring-4 transition-all`}
                    />
                    {errors.phoneNumber && <p className="text-[10px] text-red-500">{errors.phoneNumber}</p>}
                  </div>

                  {/* Business Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Business Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Electrical Services"
                      value={formData.businessName}
                      onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                      className={`w-full bg-slate-50 border ${errors.businessName ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:ring-amber-200 focus:border-amber-500'} rounded-xl px-3.5 py-2.5 text-xs text-slate-950 outline-none focus:ring-4 transition-all`}
                    />
                    {errors.businessName && <p className="text-[10px] text-red-500">{errors.businessName}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Address *</label>
                    <input
                      type="email"
                      placeholder="e.g. john@business.com"
                      value={formData.emailAddress}
                      onChange={e => setFormData({ ...formData, emailAddress: e.target.value })}
                      className={`w-full bg-slate-50 border ${errors.emailAddress ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:ring-amber-200 focus:border-amber-500'} rounded-xl px-3.5 py-2.5 text-xs text-slate-950 outline-none focus:ring-4 transition-all`}
                    />
                    {errors.emailAddress && <p className="text-[10px] text-red-500">{errors.emailAddress}</p>}
                  </div>

                  {/* Service Need Select */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Select Your Service</label>
                    <select
                      value={formData.service}
                      onChange={e => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-950 outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-500 transition-all appearance-none"
                    >
                      {SERVICES.map(srv => (
                        <option key={srv} value={srv}>{srv}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3.5 px-4 rounded-xl text-xs tracking-wider transition-colors shadow-md mt-2"
                    id="hero-submit-btn"
                  >
                    Book My Free Call
                  </button>

                  {/* Proof and Trust Tags */}
                  <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500 pt-3 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={13} className="text-emerald-500" />
                      <span>No Obligation</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle size={13} className="text-emerald-500" />
                      <span>100% Free</span>
                    </span>
                  </div>

                </form>
              ) : (
                <div className="py-12 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mb-2 border border-emerald-200">
                    <CheckCircle size={30} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-black text-xl text-slate-950">Awesome, You're Booked!</h3>
                    <p className="text-slate-500 text-xs max-w-xs mx-auto">
                      Thank you for requesting a 1-on-1 strategy call. One of our Local SEO specialists will reach out to:
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 text-left border border-slate-100 text-xs max-w-xs mx-auto space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Business:</span>
                      <span className="font-bold text-slate-950">{formData.businessName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Phone:</span>
                      <span className="font-bold text-slate-950 font-mono">{formData.phoneNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Email:</span>
                      <span className="font-bold text-slate-950 truncate">{formData.emailAddress}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed max-w-xs mx-auto">
                    We've saved your booking to our console. Check the "Leads Inbox" database folder in the top navigation to view or modify your session.
                  </p>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ fullName: '', phoneNumber: '', businessName: '', emailAddress: '', service: SERVICES[0] });
                    }}
                    className="mt-4 px-4 py-2 text-xs font-semibold text-amber-500 hover:text-amber-600 border border-amber-200 hover:border-amber-400 rounded-xl transition-all"
                  >
                    Submit Another Request
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
