import React from 'react';
import { Target, Users, Zap, ShieldCheck, Award, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { label: 'Active Clients', value: '250+' },
    { label: 'Revenue Generated', value: '$45M+' },
    { label: 'Years Experience', value: '12+' },
    { label: 'Team Members', value: '35' },
  ];

  return (
    <main className="pt-24 min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="font-display font-black text-5xl md:text-7xl mb-6 tracking-tight">
            We Build <span className="text-amber-500">Local Monopolies.</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            RankBoost Pro isn't just an agency. We are a specialized growth engine dedicated to transforming local service businesses into market leaders through data-driven SEO and high-conversion lead systems.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-amber-500 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-amber-600/30">
            {stats.map((stat, i) => (
              <div key={i} className="text-center px-4">
                <div className="font-display font-black text-4xl text-slate-900 mb-1">{stat.value}</div>
                <div className="text-amber-900 font-bold text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display font-bold text-4xl text-slate-900 mb-6">Our Mission is Simple: Your Unfair Advantage.</h2>
            <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
              <p>
                The local search landscape is fiercely competitive. We saw too many skilled contractors and service professionals losing out to lower-quality competitors simply because they lacked digital visibility.
              </p>
              <p>
                We built RankBoost Pro to level the playing field. By combining cutting-edge GMB optimization, authoritative local citations, and conversion-focused web design, we ensure that when a customer in your area needs your service, <strong>you are the only logical choice.</strong>
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <Target className="text-blue-500 mb-4" size={32} />
                <h3 className="font-bold text-slate-900 mb-2">Precision Driven</h3>
                <p className="text-sm text-slate-600">Every decision is backed by live search data, not guesswork.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <ShieldCheck className="text-emerald-500 mb-4" size={32} />
                <h3 className="font-bold text-slate-900 mb-2">Total Transparency</h3>
                <p className="text-sm text-slate-600">Real-time reporting dashboards so you always know your ROI.</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 to-blue-600 rounded-3xl transform rotate-3 scale-105 opacity-20 blur-xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
              alt="Team strategy meeting" 
              className="rounded-3xl shadow-2xl relative z-10 w-full object-cover aspect-[4/5]"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display font-black text-4xl text-slate-900 mb-6">Ready to dominate your territory?</h2>
          <p className="text-xl text-slate-600 mb-10">Stop losing high-value jobs to your competitors. Partner with the experts.</p>
          <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-xl shadow-slate-900/20 transition-all flex items-center gap-2 mx-auto">
            Book Your Strategy Call <ArrowRight size={20} />
          </button>
        </div>
      </section>

    </main>
  );
}
