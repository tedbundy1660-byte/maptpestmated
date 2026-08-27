import React from 'react';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Michael Chen',
      company: 'Apex Plumbing',
      text: "They completely turned around our local presence. We're now getting 3x the calls from Google Maps compared to last year. Best investment we've made.",
      rating: 5,
    },
    {
      name: 'Sarah Jenkins',
      company: 'Jenkins HVAC Pros',
      text: "The team is incredibly knowledgeable. They optimized our Google Business Profile and added schema markup to our site. We dominate local search now.",
      rating: 5,
    },
    {
      name: 'David Rodriguez',
      company: 'Rodriguez Landscaping',
      text: "We were invisible before working with Mapto Estimates. Now we are the #1 result in our city. Highly recommend their local SEO services.",
      rating: 5,
    }
  ];

  return (
    <section className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 mb-4">Trusted by Local Businesses</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">Don't just take our word for it. See what our clients have to say about our local SEO and GMB optimization results.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-slate-700 mb-8 italic">"{review.text}"</p>
              <div>
                <p className="font-bold text-slate-900">{review.name}</p>
                <p className="text-sm text-slate-500">{review.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
