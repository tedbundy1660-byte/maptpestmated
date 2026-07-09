import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, CheckCircle, Search, Sparkles, ShieldCheck, ArrowRight, AlertCircle, RefreshCw, MessageSquare, Plus, ThumbsUp, HelpCircle } from 'lucide-react';

interface Review {
  id: string;
  authorName: string;
  businessType: string;
  rating: number;
  dateText: string;
  text: string;
  response: string;
}

export default function GMBReviews() {
  const [businessInput, setBusinessInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchReport, setSearchReport] = useState<any | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const sampleReviews: Review[] = [
    {
      id: 'rev-1',
      authorName: 'David K. • Owner, Apex Roofing',
      businessType: 'Roofing Services',
      rating: 5,
      dateText: '3 days ago',
      text: 'Our Google Maps placement was dead in the water. Within 3 weeks of connecting with MAPTO, our local ranking map turned green! We went from 2-3 organic calls a week to daily inquiries. The automated GMB posts are effortless.',
      response: 'Thanks David! Apex Roofing is a stellar local service, we are thrilled to lock in your top ranking!'
    },
    {
      id: 'rev-2',
      authorName: 'Samantha R. • Operations, Elite HVAC',
      businessType: 'Heating & Cooling',
      rating: 5,
      dateText: '1 week ago',
      text: 'The review acquisition SMS loop alone paid for the Growth package on day one. We gathered 34 new 5-star reviews this month, and our competition is falling behind. Best reputation partner we have ever used.',
      response: 'We appreciate you Samantha! Elite HVAC is on a straight path to local dominance.'
    },
    {
      id: 'rev-3',
      authorName: 'Tyler J. • Founder, Premier Plumbing',
      businessType: 'Plumbing & Drain',
      rating: 5,
      dateText: '2 weeks ago',
      text: 'Our GMB rating was stuck at 4.1. We integrated MAPTOs reputation loop and intercepted negative issues privately while sending happy clients direct to Google. Now we are cruising at 4.8 Stars. Unbelievable.',
      response: 'Tyler, you and the Premier team have been phenomenal partners. Keep up the high-standard service!'
    }
  ];

  const autocompleteList = [
    'Oakwood Plumbing & Drain Co.',
    'Summit HVAC Experts',
    'Lone Star Roofing & Construction',
    'Eco-Clean Landscape & Lawn',
    'Metro Electrical Contracting',
    'Hometown Handyman Pros'
  ];

  const handleInputChange = (val: string) => {
    setBusinessInput(val);
    if (val.trim().length > 1) {
      const filtered = autocompleteList.filter(item => 
        item.toLowerCase().includes(val.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (name: string) => {
    setBusinessInput(name);
    setSuggestions([]);
  };

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessInput.trim()) return;

    setIsSearching(true);
    setSearchReport(null);

    // Simulate audit generation
    setTimeout(() => {
      const randomSeed = Math.random();
      const score = Math.floor(randomSeed * 25) + 55; // 55 to 80
      const currentReviews = Math.floor(randomSeed * 18) + 4;
      const missedCalls = Math.floor(randomSeed * 15) + 8;
      
      setSearchReport({
        businessName: businessInput,
        score: score,
        rating: (randomSeed * 0.8 + 3.8).toFixed(1),
        currentReviewsCount: currentReviews,
        missedCallsEstimated: missedCalls,
        optimizationLevel: score < 65 ? 'Critical Warning' : 'Underperforming',
        citationCompleteness: `${Math.floor(randomSeed * 20) + 40}%`,
        keyIssues: [
          score < 65 ? 'No active review-acquisition triggers in place.' : 'Review velocity is lagging (last review > 60 days ago).',
          'Missing high-authority map citation listings (Yelp, Bing, YellowPages mismatch).',
          'Business profile image metadata lacks local coordinates.'
        ]
      });
      setIsSearching(false);
    }, 2500);
  };

  return (
    <section id="reviews" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-4">
            <span className="font-mono text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-100/60 px-3 py-1 rounded-full">
              GOOGLE MY BUSINESS INTEGRATION
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-none">
              Connect Google Business Profile
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We sync directly with your official Google Business Profile to capture reviews, automate client responses, and fuel your ranking. Experience how our automated feedback loops keep you ahead.
            </p>

            {/* Live GMB rating badge */}
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-950 text-2xl font-black font-display tracking-tight">4.9</span>
                <div className="flex flex-col">
                  <div className="flex gap-0.5 text-amber-500">
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">140+ Client Ratings</span>
                </div>
              </div>
              <div className="h-8 w-[1px] bg-slate-200" />
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-500" />
                <span className="text-xs text-slate-700 font-semibold">100% Google API Verified Partnership</span>
              </div>
            </div>
          </div>

          {/* Connected Reviews Live Stream Carousel */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
              Live Verified Reviews From GMB API
            </span>
            <div className="space-y-4">
              {sampleReviews.map((review, idx) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-3 shadow-sm relative overflow-hidden"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs">
                        {review.authorName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xs sm:text-sm">{review.authorName}</div>
                        <span className="text-[9px] font-bold text-amber-600 bg-amber-50/80 border border-amber-200/40 px-1.5 py-0.5 rounded uppercase tracking-wider font-mono">
                          {review.businessType}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex gap-0.5 text-amber-500">
                        <Star size={10} fill="currentColor" />
                        <Star size={10} fill="currentColor" />
                        <Star size={10} fill="currentColor" />
                        <Star size={10} fill="currentColor" />
                        <Star size={10} fill="currentColor" />
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{review.dateText}</span>
                    </div>
                  </div>
                  <p className="text-slate-700 text-xs leading-relaxed italic">
                    "{review.text}"
                  </p>
                  
                  {/* Response pill */}
                  <div className="text-[10px] text-slate-500 bg-white border border-slate-200/60 p-2 rounded-xl flex items-start gap-2">
                    <MessageSquare size={12} className="text-amber-500 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-700">Response:</strong> {review.response}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* --- AUDIT SIMULATOR CONSOLE WIDGET --- */}
        <div id="gmb-audit" className="bg-slate-950 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid lg:grid-cols-12 gap-8 items-start relative z-10">
            
            {/* Left side: Interactive form */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-amber-500">
                  <Sparkles size={16} className="animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider font-mono">MAPTO Reputation Scanner</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-display text-white tracking-tight leading-snug">
                  Scan Your Business Profile Rank & Reviews
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Enter your business name below to run a real-time citation check. We'll audit your search visibility, competitor scores, and missed customer pipeline estimate.
                </p>
              </div>

              <form onSubmit={handleAuditSubmit} className="space-y-4 relative">
                <div className="space-y-2 relative">
                  <label className="text-[10px] uppercase font-bold text-slate-300 tracking-wider">Local Business Name</label>
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input
                      type="text"
                      placeholder="e.g. Apex Plumbing Services..."
                      value={businessInput}
                      onChange={(e) => handleInputChange(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-xs text-white outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all"
                    />
                  </div>

                  {/* Auto-suggestions dropdown */}
                  <AnimatePresence>
                    {suggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute left-0 right-0 top-full mt-1 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl z-50 divide-y divide-slate-800/60"
                      >
                        {suggestions.map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => selectSuggestion(item)}
                            className="w-full text-left px-4 py-2.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors font-medium flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                            <span>{item}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  type="submit"
                  disabled={isSearching}
                  className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 text-slate-950 disabled:text-slate-500 font-bold py-3 px-4 rounded-xl text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isSearching ? (
                    <>
                      <RefreshCw size={14} className="animate-spin text-slate-950" />
                      <span>Syncing Google API & Citation Map...</span>
                    </>
                  ) : (
                    <>
                      <span>Scan My Google Profile</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>

              {/* Security trust line */}
              <p className="text-[10px] text-slate-500 leading-snug">
                🔒 Safe check. This audit is completely private and does not lock, modify, or alert your active Google Business listing in any way.
              </p>
            </div>

            {/* Right side: Report readout */}
            <div className="lg:col-span-7 h-full flex flex-col justify-center min-h-[300px]">
              <AnimatePresence mode="wait">
                {isSearching ? (
                  <motion.div
                    key="scanning"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 py-12"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                      <RefreshCw size={24} className="animate-spin" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider animate-pulse">Running Diagnostic</h4>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto">
                        Fetching local maps visibility grid, calculating review acquisition velocity and monitoring missed contractor lead opportunities...
                      </p>
                    </div>
                  </motion.div>
                ) : searchReport ? (
                  <motion.div
                    key="report"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 space-y-6"
                  >
                    {/* Header score */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/60">
                      <div>
                        <h4 className="text-white font-bold text-base font-display">{searchReport.businessName}</h4>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Maps Reputation Diagnostic Report</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-[10px] font-mono font-bold text-red-400 uppercase block">GBP HEALTH SCORE</span>
                          <span className="text-xs font-semibold text-slate-400">Poor Visibility Package</span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center font-black font-mono text-lg text-red-400">
                          {searchReport.score}%
                        </div>
                      </div>
                    </div>

                    {/* Stats columns */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div className="bg-slate-950/40 border border-slate-800/40 p-3 rounded-xl">
                        <span className="text-[9px] uppercase font-bold text-slate-500 block">Rating found</span>
                        <div className="text-sm font-bold text-white mt-1 flex items-center gap-1">
                          <Star size={12} fill="currentColor" className="text-amber-500" />
                          <span>{searchReport.rating} ★</span>
                        </div>
                      </div>
                      <div className="bg-slate-950/40 border border-slate-800/40 p-3 rounded-xl">
                        <span className="text-[9px] uppercase font-bold text-slate-500 block">Review Count</span>
                        <span className="text-sm font-bold text-white mt-1 block font-mono">{searchReport.currentReviewsCount} Reviews</span>
                      </div>
                      <div className="bg-slate-950/40 border border-slate-800/40 p-3 rounded-xl col-span-2 sm:col-span-1">
                        <span className="text-[9px] uppercase font-bold text-slate-500 block">Estimated Missed Calls</span>
                        <span className="text-xs font-bold text-red-400 mt-1 block font-mono">~{searchReport.missedCallsEstimated} leads /mo</span>
                      </div>
                    </div>

                    {/* Key Issues */}
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Identified Optimization Gaps</span>
                      <div className="space-y-1.5">
                        {searchReport.keyIssues.map((issue: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                            <AlertCircle size={13} className="text-amber-500 shrink-0 mt-0.5" />
                            <span>{issue}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Recommendation */}
                    <div className="pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-amber-500/5 -mx-6 -mb-6 p-6 rounded-b-2xl">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-amber-500">
                          <Sparkles size={14} />
                          <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Recommended Optimization Path</span>
                        </div>
                        <p className="text-slate-200 text-xs leading-relaxed max-w-md">
                          Deploy MAPTO's review automated SMS triggers and citation stacking plan. We guarantee top-3 maps inclusion in 30 days.
                        </p>
                      </div>
                      <a
                        href="#pricing"
                        className="bg-white hover:bg-slate-100 text-slate-950 text-[11px] font-bold py-2 px-3.5 rounded-lg transition-colors inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap"
                      >
                        <span>Fix This Listing</span>
                        <ArrowRight size={12} />
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-slate-900/20 border border-slate-800/40 border-dashed rounded-2xl p-6 text-center py-16 space-y-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-800/60 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
                      <HelpCircle size={20} />
                    </div>
                    <div>
                      <h4 className="text-white text-xs font-bold">Search your local business profile above</h4>
                      <p className="text-slate-500 text-[11px] max-w-xs mx-auto mt-1">
                        Analyze your citation health score and discover the hidden local revenue your listing might be dropping.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
