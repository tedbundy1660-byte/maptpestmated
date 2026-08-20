import React from 'react';
import { Award, ShieldCheck, CheckCircle } from 'lucide-react';

export default function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-6 opacity-80 hover:opacity-100 transition-opacity">
      {/* Google Partner Badge */}
      <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png" 
          alt="Google" 
          className="w-5 h-5 object-contain"
        />
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-300 leading-none tracking-widest uppercase">Google</span>
          <span className="text-[10px] font-medium text-slate-500 leading-tight">Partner</span>
        </div>
      </div>

      <div className="w-[1px] h-6 bg-slate-800 hidden sm:block"></div>

      {/* Verified Reviewer Badge */}
      <div className="flex items-center gap-1.5 grayscale hover:grayscale-0 transition-all">
        <CheckCircle className="text-emerald-500" size={18} />
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-300 leading-none tracking-widest uppercase">Verified</span>
          <span className="text-[10px] font-medium text-slate-500 leading-tight">Agency</span>
        </div>
      </div>

      <div className="w-[1px] h-6 bg-slate-800 hidden sm:block"></div>

      {/* Top Rated SEO Badge */}
      <div className="flex items-center gap-1.5 grayscale hover:grayscale-0 transition-all">
        <Award className="text-amber-500" size={18} />
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-300 leading-none tracking-widest uppercase">Top Rated</span>
          <span className="text-[10px] font-medium text-slate-500 leading-tight">SEO Firm</span>
        </div>
      </div>
      
      <div className="w-[1px] h-6 bg-slate-800 hidden sm:block"></div>

      {/* Meta Business Partner Badge */}
      <div className="flex items-center gap-1.5 grayscale hover:grayscale-0 transition-all">
        <svg viewBox="0 0 36 36" className="w-5 h-5 fill-blue-500" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1-8.5c1.8-.5 3.3-1.6 4.3-3.1 1.7-2.6 1.3-6.1-1-8.3-2.1-2-5.4-2.1-7.7-.2-1.6 1.4-2.3 3.5-1.9 5.5l1.6-.4c-.2-1.3.3-2.7 1.4-3.6 1.5-1.3 3.8-1.2 5.2.1 1.5 1.5 1.8 3.8.6 5.5-.7 1-1.7 1.7-2.9 2l.9 7Z"/>
        </svg>
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-300 leading-none tracking-widest uppercase">Meta</span>
          <span className="text-[10px] font-medium text-slate-500 leading-tight">Business Partner</span>
        </div>
      </div>
    </div>
  );
}
