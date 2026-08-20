import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <main className="pt-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-display font-black text-4xl md:text-5xl text-slate-900 mb-6 tracking-tight">
            Let's Scale Your Business
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Ready to dominate the local search results and flood your inbox with qualified leads? Get in touch with our team of growth experts today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
            {isSubmitted ? (
              <div className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="text-emerald-500" size={32} />
                </div>
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-600">Our team will be in touch within 24 hours.</p>
              </div>
            ) : null}
            
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 relative z-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">First Name</label>
                  <input type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Last Name</label>
                  <input type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all" />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
                <input type="email" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all" />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">How can we help?</label>
                <textarea required rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all resize-none"></textarea>
              </div>
              
              <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 mt-2">
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>

          {/* Contact Info & Details */}
          <div className="space-y-8 flex flex-col justify-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Direct Contact</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-xl">
                    <Mail className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Email</h4>
                    <a href="mailto:hello@rankboostpro.com" className="text-slate-600 hover:text-amber-500 transition-colors">hello@rankboostpro.com</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-50 p-3 rounded-xl">
                    <Phone className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Phone</h4>
                    <a href="tel:+18005550199" className="text-slate-600 hover:text-amber-500 transition-colors">1 (800) 555-0199</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-amber-50 p-3 rounded-xl">
                    <MapPin className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Headquarters</h4>
                    <p className="text-slate-600">100 Innovation Way<br />San Francisco, CA 94105</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>
              <h4 className="font-bold text-lg mb-2 relative z-10">Looking for immediate assistance?</h4>
              <p className="text-sm text-slate-400 relative z-10 mb-4">Our strategy advisors are on standby to discuss your exact revenue goals.</p>
              <button className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-5 py-2.5 rounded-lg text-sm transition-colors w-full relative z-10">
                Book a Strategy Call
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
