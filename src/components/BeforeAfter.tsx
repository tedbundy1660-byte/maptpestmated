import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sliders, MapPin, Star, Share2, TrendingUp, Sparkles, CheckCircle2, ChevronRight, AlertTriangle, ArrowRight } from 'lucide-react';

interface CompareCase {
  id: string;
  title: string;
  description: string;
  metricLabel: string;
  metricBefore: string;
  metricAfter: string;
  icon: React.ReactNode;
}

export default function BeforeAfter() {
  const [activeTab, setActiveTab] = useState<string>('maps');
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const isDragging = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const cases: CompareCase[] = [
    {
      id: 'maps',
      title: 'Google Maps Rank Heatmap',
      description: 'See how our hyper-local citation stacking and map grid optimization turns red search "dead zones" into a sea of #1 green rankings in every neighboring zip code.',
      metricLabel: 'Local 3-Pack Coverage',
      metricBefore: '12% visibility',
      metricAfter: '94% visibility',
      icon: <MapPin className="w-4 h-4" />
    },
    {
      id: 'reviews',
      title: 'Reputation & Star Rating',
      description: 'Watch our automated review-acquisition campaign handle negative feedback privately, while boosting verified positive reviews on autopilot to secure your five-star reputation.',
      metricLabel: 'Google Star Rating',
      metricBefore: '3.6 ★ (8 reviews)',
      metricAfter: '4.9 ★ (142 reviews)',
      icon: <Star className="w-4 h-4" />
    },
    {
      id: 'social',
      title: 'Social Brand & Content',
      description: 'Transform a neglected, text-only feed into a highly-polished, seasonal social marketing funnel that establishes authority and builds trust in your local community.',
      metricLabel: 'Monthly Organic Reach',
      metricBefore: '250 people',
      metricAfter: '8,400 people',
      icon: <Share2 className="w-4 h-4" />
    }
  ];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  // Clean up global listeners if component unmounts mid-drag
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const currentCase = cases.find(c => c.id === activeTab) || cases[0];

  // Simulated Map Heatmap Grid Data
  const heatmapGrid = [
    { id: 1, beforeRank: 12, afterRank: 1, x: 1, y: 1 },
    { id: 2, beforeRank: 15, afterRank: 2, x: 2, y: 1 },
    { id: 3, beforeRank: 19, afterRank: 1, x: 3, y: 1 },
    { id: 4, beforeRank: 14, afterRank: 3, x: 4, y: 1 },
    { id: 5, beforeRank: 9, afterRank: 1, x: 5, y: 1 },
    { id: 6, beforeRank: 8, afterRank: 1, x: 1, y: 2 },
    { id: 7, beforeRank: 11, afterRank: 2, x: 2, y: 2 },
    { id: 8, beforeRank: 6, afterRank: 1, x: 3, y: 2 },
    { id: 9, beforeRank: 14, afterRank: 1, x: 4, y: 2 },
    { id: 10, beforeRank: 18, afterRank: 2, x: 5, y: 2 },
    { id: 11, beforeRank: 16, afterRank: 1, x: 1, y: 3 },
    { id: 12, beforeRank: 13, afterRank: 1, x: 2, y: 3 },
    { id: 13, beforeRank: 7, afterRank: 1, x: 3, y: 3 }, // Center listing
    { id: 14, beforeRank: 11, afterRank: 1, x: 4, y: 3 },
    { id: 15, beforeRank: 15, afterRank: 3, x: 5, y: 3 },
    { id: 16, beforeRank: 21, afterRank: 2, x: 1, y: 4 },
    { id: 17, beforeRank: 14, afterRank: 1, x: 2, y: 4 },
    { id: 18, beforeRank: 10, afterRank: 2, x: 3, y: 4 },
    { id: 19, beforeRank: 12, afterRank: 1, x: 4, y: 4 },
    { id: 20, beforeRank: 17, afterRank: 1, x: 5, y: 4 },
    { id: 21, beforeRank: 14, afterRank: 3, x: 1, y: 5 },
    { id: 22, beforeRank: 19, afterRank: 1, x: 2, y: 5 },
    { id: 23, beforeRank: 11, afterRank: 2, x: 3, y: 5 },
    { id: 24, beforeRank: 13, afterRank: 1, x: 4, y: 5 },
    { id: 25, beforeRank: 16, afterRank: 2, x: 5, y: 5 },
  ];

  return (
    <section id="comparison" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-mono text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-100/60 px-3 py-1 rounded-full">
            PROOF IN ACTION
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mt-3">
            The MAPTO Dramatic Transformation
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Drag the interactive slider below to witness how we elevate typical local service listings from invisible to local market dominators.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {cases.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSliderPosition(50); // Reset slider to center
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-slate-950 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              {tab.icon}
              <span>{tab.title}</span>
            </button>
          ))}
        </div>

        {/* Case Detail Card + Slider Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: Description & Stats (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-600">
                <Sparkles size={18} />
                <span className="text-xs font-bold uppercase tracking-wider font-mono">Active Case Transformation</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-snug">
                {currentCase.title}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {currentCase.description}
              </p>
            </div>

            {/* Performance Stats Board */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                {currentCase.metricLabel}
              </span>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">BEFORE MAPTO</span>
                  <div className="text-sm font-bold text-red-500 font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span>{currentCase.metricBefore}</span>
                  </div>
                </div>
                <div className="space-y-1 border-l border-slate-100 pl-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">AFTER MAPTO</span>
                  <div className="text-sm font-bold text-emerald-500 font-mono flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{currentCase.metricAfter}</span>
                  </div>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-50 text-[11px] text-slate-500 flex items-center gap-1.5">
                <CheckCircle2 size={12} className="text-emerald-500" />
                <span>Verified client growth audit results.</span>
              </div>
            </div>
          </div>

          {/* Column 2: Interactive Slider Container (8 cols) */}
          <div className="lg:col-span-8 flex flex-col">
            <div 
              ref={containerRef}
              className="relative w-full aspect-[4/3] md:aspect-[16/10] bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl select-none cursor-ew-resize"
              onTouchStart={handleTouchStart}
              onMouseDown={handleMouseDown}
            >
              {/* --- AFTER CONTENT (The Background) --- */}
              <div className="absolute inset-0 w-full h-full p-4 md:p-8 flex items-center justify-center bg-slate-900">
                {activeTab === 'maps' && (
                  <div className="w-full h-full max-w-lg mx-auto flex flex-col justify-between py-2">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>GBP Ranking Grid Overlay</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Dominating Top-3 Pack
                      </span>
                    </div>
                    {/* Simulated Map Grid */}
                    <div className="grid grid-cols-5 gap-2 md:gap-3 my-auto max-w-sm mx-auto w-full">
                      {heatmapGrid.map((cell) => {
                        return (
                          <div 
                            key={cell.id} 
                            className="aspect-square rounded-full bg-emerald-500/10 border border-emerald-500/30 flex flex-col items-center justify-center relative group"
                          >
                            <span className="text-emerald-400 text-xs sm:text-sm font-bold font-mono">
                              {cell.afterRank}
                            </span>
                            <span className="absolute bottom-0 text-[6px] text-emerald-500/60 scale-75 font-mono">
                              GBP #{cell.afterRank}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="text-center text-[10px] text-slate-400 font-mono">
                      Radius Coverage: 5-Mile Geo-Target Stacking Active
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="w-full max-w-md mx-auto space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                      <span>Google Reputation Center</span>
                      <span className="text-emerald-400 font-bold">4.9 ★ Rating Dashboard</span>
                    </div>
                    {/* After GMB review card */}
                    <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-lg backdrop-blur-sm">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-3">
                          <div className="w-9 h-9 bg-amber-500 rounded-full flex items-center justify-center font-bold text-slate-950 text-sm">
                            MH
                          </div>
                          <div>
                            <div className="font-semibold text-white text-xs sm:text-sm flex items-center gap-1.5">
                              <span>Marcus Harris</span>
                              <span className="text-[9px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">Verified Customer</span>
                            </div>
                            <div className="flex gap-0.5 text-amber-500 mt-1">
                              <Star size={11} fill="currentColor" />
                              <Star size={11} fill="currentColor" />
                              <Star size={11} fill="currentColor" />
                              <Star size={11} fill="currentColor" />
                              <Star size={11} fill="currentColor" />
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">2 hours ago</span>
                      </div>
                      <p className="text-slate-200 text-xs leading-relaxed">
                        "Unbelievable customer service! Called at 7 PM regarding an emergency pipe burst, and they had a qualified plumber book and arrive within 45 mins. Exceptionally professional response!"
                      </p>
                      
                      {/* Automated Reply Box */}
                      <div className="mt-3 bg-slate-950/40 border-l-2 border-amber-500 p-3 rounded-r-xl space-y-1">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold text-slate-300">Response from Owner (Automated Feedback Guard)</span>
                          <span className="text-amber-500/70 font-mono">Reply Sent Instant</span>
                        </div>
                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          "Thank you so much, Marcus! We strive for prompt dispatch and emergency response on every single call. We appreciate your plumbing partnership!"
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'social' && (
                  <div className="w-full max-w-sm mx-auto space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>Social Brand Spotlight Reel</span>
                      <span className="text-emerald-400 font-bold">100% Brand Match</span>
                    </div>
                    {/* Branded Instagram/FB Mockup Post */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
                      {/* Post Header */}
                      <div className="flex items-center gap-2 p-3 border-b border-slate-800/80">
                        <div className="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-bold text-[10px] text-amber-400">
                          ME
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-white">MAPTO Heating & Cooling</div>
                          <div className="text-[9px] text-slate-400 font-mono">Houston, TX</div>
                        </div>
                      </div>
                      {/* Post Media Area */}
                      <div className="bg-slate-950 relative aspect-video flex flex-col justify-between p-4 border-b border-slate-800/80 overflow-hidden">
                        {/* Background pattern */}
                        <div className="absolute inset-0 bg-radial-gradient from-amber-500/5 to-transparent pointer-events-none" />
                        <div className="z-10 flex justify-between items-start">
                          <span className="text-[8px] bg-amber-500 text-slate-950 px-2 py-0.5 rounded font-bold uppercase tracking-wider font-mono">
                            Autumn Tune-Up
                          </span>
                          <span className="text-[8px] bg-slate-900/80 text-white border border-slate-800 px-2 py-0.5 rounded font-mono">
                            Promo: AUTO30
                          </span>
                        </div>
                        <div className="z-10 space-y-1 text-center py-1">
                          <h4 className="text-sm font-display font-black text-white tracking-tight uppercase">
                            Is Your Furnace Ready for Winter?
                          </h4>
                          <p className="text-[9px] text-slate-300">
                            Pre-winter inspection covers heat exchanger safety & airflow tuning.
                          </p>
                        </div>
                        <div className="z-10 flex justify-between items-center text-[8px] text-slate-400 border-t border-slate-800/50 pt-2">
                          <span>Licensed #1742A</span>
                          <span className="text-amber-500 font-bold">Book Online Today</span>
                        </div>
                      </div>
                      {/* Post Stats Footer */}
                      <div className="p-3 space-y-1 bg-slate-900/40 text-[10px]">
                        <div className="flex items-center gap-3 text-slate-400">
                          <span className="text-white font-semibold">❤️ 48 Likes</span>
                          <span>💬 7 Comments</span>
                          <span>✈️ 12 Shares</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* --- BEFORE CONTENT (The Foreground, clipped by width) --- */}
              <div 
                className="absolute inset-y-0 left-0 h-full overflow-hidden p-4 md:p-8 flex items-center justify-center bg-slate-950 border-r border-amber-500/30"
                style={{ width: `${sliderPosition}%` }}
              >
                {/* We use min-w-xx in order to prevent content inside from distorting as width shrinks */}
                <div className="absolute inset-0 h-full p-4 md:p-8 flex items-center justify-center bg-slate-950" style={{ width: containerRef.current?.getBoundingClientRect().width }}>
                  {activeTab === 'maps' && (
                    <div className="w-full h-full max-w-lg mx-auto flex flex-col justify-between py-2 opacity-60">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                        <span>GBP Ranking Grid Overlay</span>
                        <span className="text-red-500 font-bold flex items-center gap-1">
                          <AlertTriangle size={12} className="animate-bounce" />
                          GBP Ranking Invisible (Not in Top 10)
                        </span>
                      </div>
                      {/* Simulated Map Grid (Before - Invisible) */}
                      <div className="grid grid-cols-5 gap-2 md:gap-3 my-auto max-w-sm mx-auto w-full">
                        {heatmapGrid.map((cell) => {
                          return (
                            <div 
                              key={cell.id} 
                              className="aspect-square rounded-full bg-red-500/5 border border-red-500/20 flex flex-col items-center justify-center relative"
                            >
                              <span className="text-red-500/70 text-xs sm:text-sm font-bold font-mono">
                                {cell.beforeRank}
                              </span>
                              <span className="absolute bottom-0 text-[6px] text-red-500/40 scale-75 font-mono">
                                GBP #{cell.beforeRank}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="text-center text-[10px] text-slate-500 font-mono">
                        No Citations Found • Suspension Risks Flagged
                      </div>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="w-full max-w-md mx-auto space-y-4 opacity-50">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-2">
                        <span>Google Reputation Center</span>
                        <span className="text-red-400 font-bold">Unoptimized Reputation Listing</span>
                      </div>
                      {/* Before review card */}
                      <div className="bg-slate-950 border border-slate-900 p-5 rounded-2xl space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-3">
                            <div className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center font-bold text-slate-500 text-sm">
                              U
                            </div>
                            <div>
                              <div className="font-semibold text-slate-400 text-xs sm:text-sm">
                                Anonymous User
                              </div>
                              <div className="flex gap-0.5 text-slate-700 mt-1">
                                <Star size={11} fill="currentColor" className="text-amber-500" />
                                <Star size={11} fill="currentColor" className="text-amber-500" />
                                <Star size={11} className="text-slate-700" />
                                <Star size={11} className="text-slate-700" />
                                <Star size={11} className="text-slate-700" />
                              </div>
                            </div>
                          </div>
                          <span className="text-[10px] text-slate-600 font-mono">11 months ago</span>
                        </div>
                        <p className="text-slate-400 text-xs leading-relaxed">
                          "Called them during an emergency but nobody answered the phone. Left a voicemail but nobody got back. Had to call another local service provider..."
                        </p>
                        
                        <div className="mt-3 border-l-2 border-slate-700 p-3 rounded-r-xl bg-slate-900/20 text-slate-500 text-[10px] italic">
                          No owner response. Customer moved to a competitor listing.
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'social' && (
                    <div className="w-full max-w-sm mx-auto space-y-3 opacity-40">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                        <span>Social Brand Spotlight Reel</span>
                        <span className="text-red-500 font-bold">No Social Presence</span>
                      </div>
                      {/* Barren Post Mockup */}
                      <div className="bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden">
                        <div className="flex items-center gap-2 p-3 border-b border-slate-900">
                          <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center font-bold text-[10px] text-slate-500">
                            GBP
                          </div>
                          <div>
                            <div className="text-[11px] font-bold text-slate-400">Owner Listing (Inactive)</div>
                            <div className="text-[9px] text-slate-600 font-mono">Updated June 2022</div>
                          </div>
                        </div>
                        <div className="p-8 text-center text-[11px] text-slate-500 italic space-y-1">
                          <p>No images, posts or reels published recently.</p>
                          <p className="text-[9px] text-slate-600">Customers perceive the brand as permanently closed.</p>
                        </div>
                        <div className="p-3 bg-slate-950 border-t border-slate-900 text-[10px] text-slate-600">
                          ❤️ 0 Likes • 0 Comments
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* --- SLIDER DRAGGABLE BAR --- */}
              <div 
                className="absolute inset-y-0 w-1 bg-amber-500 cursor-ew-resize z-40 flex items-center justify-center group"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="w-8 h-8 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg border border-white flex items-center justify-center transition-transform duration-150 transform -translate-x-1/2 scale-90 group-hover:scale-105 active:scale-95">
                  <Sliders size={14} className="animate-pulse" />
                </div>
                {/* BEFORE Label */}
                <div className="absolute right-4 top-4 bg-slate-950/80 backdrop-blur border border-slate-800 text-red-500 text-[10px] font-bold uppercase px-2 py-1 rounded select-none pointer-events-none tracking-widest font-mono shadow-md">
                  Before
                </div>
                {/* AFTER Label */}
                <div className="absolute left-4 top-4 bg-slate-900/80 backdrop-blur border border-slate-800 text-emerald-400 text-[10px] font-bold uppercase px-2 py-1 rounded select-none pointer-events-none tracking-widest font-mono shadow-md">
                  After
                </div>
              </div>

            </div>
            
            {/* Action Tip beneath slider */}
            <p className="text-center text-slate-400 text-[11px] font-medium mt-3 italic flex items-center justify-center gap-1">
              <span>← Hold and slide horizontal slider to compare actual client results →</span>
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
