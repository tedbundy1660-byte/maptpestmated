import React from 'react';
import { MapPin } from 'lucide-react';

export default function ServiceAreas() {
  const areas = [
    'Los Angeles, CA',
    'San Diego, CA',
    'San Francisco, CA',
    'Seattle, WA',
    'Portland, OR',
    'Austin, TX',
    'Dallas, TX',
    'Houston, TX',
    'Miami, FL',
    'Orlando, FL',
    'Chicago, IL',
    'New York, NY',
    'Boston, MA',
    'Denver, CO',
    'Phoenix, AZ'
  ];

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 mb-4">Areas We Serve</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">We provide local SEO and Google Business Profile optimization for service businesses nationwide.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {areas.map((area, i) => (
            <div key={i} className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-sm justify-center">
              <MapPin size={16} className="text-amber-500" />
              <span className="text-sm font-bold text-slate-800">{area}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
