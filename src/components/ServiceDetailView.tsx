import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, MapPin, Star, Instagram, Video, Phone, Sparkles, 
  Calculator, TrendingUp, CheckCircle2, ArrowRight, ShieldCheck, 
  Percent, Award, DollarSign, ArrowUpRight, CheckSquare
} from 'lucide-react';
import { ServiceDetail } from '../types';

interface ServiceDetailViewProps {
  service: ServiceDetail;
  onBack: () => void;
  onBookCall: (serviceName: string) => void;
}

export default function ServiceDetailView({ service, onBack, onBookCall }: ServiceDetailViewProps) {
  // ROI Calculator states
  const [currentRevenue, setCurrentRevenue] = useState(15000);
  const [missedCalls, setMissedCalls] = useState(15);
  const [avgJobValue, setAvgJobValue] = useState(450);

  // Dynamic icon selector helper
  const renderIcon = (name: string, className = "w-8 h-8 text-amber-400") => {
    switch (name) {
      case 'MapPin': return <MapPin className={className} />;
      case 'Star': return <Star className={className} />;
      case 'Instagram': return <Instagram className={className} />;
      case 'Video': return <Video className={className} />;
      case 'Phone': return <Phone className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  // Service-specific calculators
  const getCalculatorSection = () => {
    switch (service.iconName) {
      case 'MapPin':
        return (
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <Calculator className="text-amber-400 w-5 h-5" />
              <h4 className="font-display font-black text-white text-base">Google Maps Growth Estimator</h4>
            </div>
            <p className="text-xs text-slate-400">
              Contractors in the Google Maps top 3 receive up to 4.5x more phone calls. See your estimated monthly direct call value boost:
            </p>

            <div className="space-y-3 pt-2">
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Current Monthly Revenue:</span>
                  <span className="font-bold text-amber-400 font-mono">${currentRevenue.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="5000"
                  value={currentRevenue}
                  onChange={(e) => setCurrentRevenue(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-950 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/40">
                  <span className="text-slate-400 text-[10px] uppercase block">Est. Maps Call Boost</span>
                  <span className="font-mono text-emerald-400 font-bold text-sm block mt-1">+45% to +120%</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/40">
                  <span className="text-slate-400 text-[10px] uppercase block">New Est. Monthly Target</span>
                  <span className="font-mono text-amber-400 font-bold text-sm block mt-1">
                    ${Math.round(currentRevenue * 1.45).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Phone':
        return (
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <Calculator className="text-amber-400 w-5 h-5" />
              <h4 className="font-display font-black text-white text-base">Missed Revenue Calculator</h4>
            </div>
            <p className="text-xs text-slate-400">
              62% of incoming calls to small contractors go unanswered. Let’s calculate how much missed revenue our 12-hour support can recover for you:
            </p>

            <div className="space-y-3 pt-2">
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Estimated Missed Calls (per month):</span>
                  <span className="font-bold text-amber-400 font-mono">{missedCalls} calls</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="80"
                  step="5"
                  value={missedCalls}
                  onChange={(e) => setMissedCalls(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-950 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Average Job Value:</span>
                  <span className="font-bold text-amber-400 font-mono">${avgJobValue}</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="3000"
                  step="50"
                  value={avgJobValue}
                  onChange={(e) => setAvgJobValue(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-950 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/40 text-center mt-3">
                <span className="text-slate-400 text-[10px] uppercase block">Recovered Monthly Potential</span>
                <span className="font-mono text-emerald-400 font-black text-xl block mt-1.5">
                  ${Math.round(missedCalls * 0.45 * avgJobValue).toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500 mt-1 block">Assuming conservative 45% booking conversion on recovered calls</span>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-amber-400 w-5 h-5" />
              <h4 className="font-display font-black text-white text-base">Service Growth Impact Indicators</h4>
            </div>
            
            <div className="space-y-3.5">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800/50">
                <Award className="text-amber-400 shrink-0 mt-0.5" size={16} />
                <div>
                  <h5 className="font-semibold text-white text-xs">Consistent Brand Trust</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Instantly project a polished, top-tier local authority appearance to all searching prospects.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800/50">
                <Percent className="text-emerald-400 shrink-0 mt-0.5" size={16} />
                <div>
                  <h5 className="font-semibold text-white text-xs">High Conversion Optimization</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Turn cold clicks and map views into high-intent inbound job tickets automatically.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pt-28 pb-20 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-20" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-8 transition-colors group px-3 py-2 bg-slate-900 border border-slate-800/60 rounded-xl hover:border-slate-700"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Local Growth Homepage</span>
        </button>

        {/* Header Hero Area */}
        <div className="grid md:grid-cols-12 gap-8 items-center border-b border-slate-900 pb-12 mb-12">
          <div className="md:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/25 rounded-full">
              {renderIcon(service.iconName, "w-3.5 h-3.5 text-amber-400")}
              <span className="font-mono text-[9px] font-black text-amber-400 uppercase tracking-wider">
                Active Service Detail File
              </span>
            </div>
            
            <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              {service.title}
            </h1>
            
            <p className="text-amber-400 font-bold text-sm sm:text-base tracking-wide">
              {service.tagline}
            </p>
            
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-3xl">
              {service.description}
            </p>
          </div>

          {/* Quick Stats Block */}
          <div className="md:col-span-4 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 text-center space-y-4">
            <div className="inline-flex p-3 bg-amber-500/10 rounded-2xl text-amber-400 border border-amber-500/15">
              <TrendingUp size={24} />
            </div>
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block">Estimated Business Lift</span>
              <p className="text-white text-sm font-semibold mt-1 px-2 leading-snug">
                {service.estimatedRoi}
              </p>
            </div>
            <button
              onClick={() => onBookCall(service.title)}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs tracking-wider transition-colors"
            >
              Request Free Consultation
            </button>
          </div>
        </div>

        {/* Two Column Layout: Detailed Info vs ROI Tools */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Side: Features and Deliverables (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Key Features list */}
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <CheckSquare className="text-amber-500 w-5 h-5" />
                <h3 className="font-display font-extrabold text-white text-lg tracking-tight">Core System Capabilities</h3>
              </div>
              
              <div className="grid gap-3">
                {service.keyFeatures.map((feat, idx) => (
                  <div 
                    key={idx}
                    className="flex gap-3 items-start p-4 bg-slate-900/40 border border-slate-900/60 rounded-2xl hover:border-slate-800/80 transition-colors"
                  >
                    <span className="p-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-lg mt-0.5">
                      <CheckCircle2 size={13} />
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      {feat}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Deliverables */}
            <div className="space-y-4 bg-slate-900/20 border border-slate-900 rounded-3xl p-6">
              <h4 className="font-display font-black text-white text-sm uppercase tracking-wider">
                What’s Included in Setup & Deliverables:
              </h4>
              <ul className="grid sm:grid-cols-2 gap-3 pt-2">
                {service.deliverables.map((del, idx) => (
                  <li key={idx} className="flex gap-2 items-start text-slate-400 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Side: ROI Tools & Investment Callouts (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Interactive Calculator Block */}
            {getCalculatorSection()}

            {/* Packages & Pricing packaging summary */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-full blur-xl" />
              
              <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest block">Investment Packaging</span>
              <h4 className="font-display font-bold text-white text-sm tracking-tight mt-1">Pricing & Bundling Details</h4>
              
              <p className="text-xs text-slate-400 leading-relaxed mt-2">
                This service option is fully optimized and bundled. {service.pricingRange}
              </p>

              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-emerald-500" /> No contract lock-in
                </span>
                <span className="font-semibold text-white">Month-to-Month basis</span>
              </div>
            </div>

            {/* Quick Consultation Form Hook */}
            <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 text-center space-y-3">
              <p className="text-xs text-slate-300 font-medium">
                Want to see how {service.title} integrates into your local market?
              </p>
              <button
                onClick={() => onBookCall(service.title)}
                className="w-full bg-white hover:bg-slate-100 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Request Custom Competitor Scan</span>
                <ArrowUpRight size={14} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
