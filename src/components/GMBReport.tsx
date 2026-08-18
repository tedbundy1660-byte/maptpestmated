import React, { useState, useRef, useEffect } from 'react';
import { Search, Loader2, RefreshCw, BarChart, AlertCircle, MapPin, Zap, PieChart, LayoutList, TrendingUp, AlertTriangle, CheckCircle, Download } from 'lucide-react';
import Markdown from 'react-markdown';
import { motion } from 'motion/react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { LineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';

const MOCK_MARKDOWN = `## 📊 Local SEO & GMB Optimization Audit

Based on standard local search algorithms and common industry gaps, here is a general, data-driven optimization roadmap to improve your visibility in the Google Local Pack.

### 1. Visibility & Engagement Snapshot
* **Profile Completeness Issues:** Most profiles are missing secondary categories and critical service attributes.
* **Review Velocity:** Average. Consistent review generation is the #1 ranking factor currently underutilized.
* **Local Keyword Saturation:** Low. Service descriptions often lack geo-modified keywords (e.g., "[Service] in [City]").

### 2. High-Impact SEO Opportunities
* **Primary Category Alignment:** Ensure your primary category exactly matches the highest-volume search intent for your main service.
* **Review Response Optimization:** Responding to 100% of reviews (and naturally weaving in keywords) signals active management to Google.
* **Photo & Video Frequency:** Google rewards active profiles. Profiles with 100+ photos get 520% more calls and direction requests. Upload weekly.

### 3. Actionable Step-by-Step Roadmap
1. **Week 1: Foundation Audit:** Claim all missing attributes, ensure Name, Address, Phone (NAP) consistency across the web, and rewrite the 750-character business description.
2. **Week 2: The Review Engine:** Implement a frictionless, automated SMS/Email review request system for all satisfied customers.
3. **Week 3: Visual Authority:** Upload 15-20 high-quality, geo-tagged photos of the team, equipment, and completed jobs.
4. **Week 4: Q&A Seeding:** Pre-populate the Google Q&A section with your 5 most common customer questions to capture long-tail voice searches.
`;

const MOCK_DATA = {
  score: 68,
  metrics: [
    { label: 'Profile Completeness', value: 65, status: 'warning', icon: AlertTriangle },
    { label: 'Review Velocity', value: 85, status: 'good', icon: TrendingUp },
    { label: 'Keyword Saturation', value: 30, status: 'poor', icon: AlertCircle }
  ],
  opportunities: [
    { title: 'Primary Category Alignment', desc: 'Ensure your primary category exactly matches the highest-volume search intent for your main service.' },
    { title: 'Review Response Optimization', desc: 'Responding to 100% of reviews signals active management to Google algorithm.' },
    { title: 'Photo & Video Frequency', desc: 'Profiles with 100+ photos get 520% more calls. Upload high-quality assets weekly.' }
  ],
  roadmap: [
    { week: 1, title: 'Foundation Audit', desc: 'Claim missing attributes and rewrite 750-char description.' },
    { week: 2, title: 'The Review Engine', desc: 'Implement automated SMS/Email review requests.' },
    { week: 3, title: 'Visual Authority', desc: 'Upload 15-20 high-quality, geo-tagged photos.' },
    { week: 4, title: 'Q&A Seeding', desc: 'Pre-populate the Google Q&A section with top questions.' }
  ],
  trafficData: [
    { month: 'Jan', traffic: 120, optimized: 150 },
    { month: 'Feb', traffic: 130, optimized: 180 },
    { month: 'Mar', traffic: 125, optimized: 220 },
    { month: 'Apr', traffic: 140, optimized: 280 },
    { month: 'May', traffic: 150, optimized: 350 },
    { month: 'Jun', traffic: 160, optimized: 420 }
  ],
  competitorData: [
    { name: 'Your Biz', reviews: 45, color: '#3b82f6' },
    { name: 'Competitor A', reviews: 156, color: '#cbd5e1' },
    { name: 'Competitor B', reviews: 98, color: '#cbd5e1' }
  ]
};

const VisualDashboard = React.forwardRef<HTMLDivElement, { data: typeof MOCK_DATA }>(({ data }, ref) => {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div ref={ref} className="bg-white relative overflow-hidden p-6 md:p-8">
      {/* Watermark */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 overflow-hidden opacity-[0.02]">
        <div className="text-[120px] font-black font-display text-slate-900 -rotate-45 whitespace-nowrap">
          RANKBOOST PRO AUDIT
        </div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-10 relative z-10">
        
        {/* Top Header for PDF context (hidden unless exported, but good to have) */}
        <div className="border-b border-slate-100 pb-4 mb-6">
          <h2 className="font-display font-black text-2xl text-slate-900">Local SEO & GMB Optimization Audit</h2>
          <p className="text-sm text-slate-500 font-medium">Generated by RankBoost Pro</p>
        </div>

        {/* Top Section: Score & Metrics */}
      <div className="grid md:grid-cols-12 gap-8">
        {/* Score Ring */}
        <motion.div variants={item} className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl"></div>
          <div className="relative w-32 h-32 flex items-center justify-center mb-4">
            <svg className="w-full h-full -rotate-90 transform drop-shadow-sm" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-200" />
              <motion.circle 
                initial={{ strokeDasharray: "0 251.2" }}
                animate={{ strokeDasharray: `${(data.score / 100) * 251.2} 251.2` }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" 
                className="text-amber-500"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-display font-black text-slate-900">{data.score}</span>
            </div>
          </div>
          <h3 className="font-bold text-slate-900 tracking-tight">Optimization Score</h3>
          <p className="text-sm text-slate-500 mt-1 font-medium">Needs Improvement</p>
        </motion.div>

        {/* Metrics */}
        <motion.div variants={item} className="md:col-span-8 flex flex-col justify-center space-y-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          {data.metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <div key={i}>
                <div className="flex justify-between text-sm font-bold mb-2 text-slate-700">
                  <span className="flex items-center gap-2">
                    <Icon size={16} className={m.status === 'good' ? 'text-emerald-500' : m.status === 'warning' ? 'text-amber-500' : 'text-red-500'} />
                    {m.label}
                  </span>
                  <span className="font-mono text-slate-900">{m.value}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${m.value}%` }}
                    transition={{ duration: 1, delay: 0.4 + (i * 0.1), ease: "easeOut" }}
                    className={`h-full rounded-full ${m.status === 'good' ? 'bg-emerald-500' : m.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'}`}
                  />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Traffic Projection Chart */}
        <motion.div variants={item} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h4 className="font-bold text-slate-900 text-sm mb-6 flex items-center gap-2">
            <TrendingUp size={16} className="text-blue-500" />
            6-Month Growth Trajectory
          </h4>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.trafficData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                  labelStyle={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}
                />
                <Line type="monotone" dataKey="optimized" name="With Optimization" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="traffic" name="Current Trend" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Competitor Benchmarking Chart */}
        <motion.div variants={item} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h4 className="font-bold text-slate-900 text-sm mb-6 flex items-center gap-2">
            <BarChart size={16} className="text-amber-500" />
            Review Volume vs Top Competitors
          </h4>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={data.competitorData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <RechartsTooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Bar dataKey="reviews" name="Total Reviews" radius={[4, 4, 0, 0]} maxBarSize={50}>
                  {data.competitorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Opportunities Grid */}
      <motion.div variants={item} className="space-y-5">
        <h3 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
          <Zap className="text-amber-500 fill-amber-500/20" size={20} />
          High-Impact Opportunities
        </h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {data.opportunities.map((opp, i) => (
            <motion.div variants={item} key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
              <h4 className="font-bold text-slate-900 text-sm mb-2 group-hover:text-blue-600 transition-colors">{opp.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{opp.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Roadmap */}
      <motion.div variants={item} className="space-y-6 pt-6 border-t border-slate-100">
         <h3 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
          <MapPin className="text-blue-500 fill-blue-500/20" size={20} />
          4-Week Execution Roadmap
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.roadmap.map((step, i) => (
            <motion.div variants={item} key={i} className="relative p-5 bg-blue-50/50 rounded-2xl border border-blue-100 overflow-hidden group">
               <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-bl-full transform origin-top-right group-hover:scale-150 transition-transform duration-500"></div>
               <div className="relative z-10">
                 <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs mb-4 shadow-sm shadow-blue-500/30">
                   W{step.week}
                 </div>
                 <h4 className="font-bold text-slate-900 text-sm mb-1.5">{step.title}</h4>
                 <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
               </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      </motion.div>
    </div>
  );
});

export default function GMBReport() {
  const [url, setUrl] = useState('');
  const [reportText, setReportText] = useState('');
  const [reportData, setReportData] = useState<typeof MOCK_DATA | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'visual' | 'text'>('visual');
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading && viewMode === 'text' && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [reportText, isLoading, viewMode]);

  const generateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    setReportText('');
    setReportData(null);
    setError(null);
    setViewMode('visual'); // Default to visual on new generation

    try {
      // Simulate network scan delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Reveal visual dashboard immediately
      setReportData(MOCK_DATA);

      // Simulate streaming output for text mode
      let i = 0;
      const streamInterval = setInterval(() => {
        setReportText(MOCK_MARKDOWN.slice(0, i + 10));
        i += 10;
        if (i >= MOCK_MARKDOWN.length) {
          clearInterval(streamInterval);
          setReportText(MOCK_MARKDOWN); 
          setIsLoading(false);
        }
      }, 20);
    } catch (err: any) {
      setError('An unexpected error occurred while generating the report.');
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!reportData) return;
    
    // Fallback text generator if dashboard view is not currently mounted
    if (!dashboardRef.current || viewMode !== 'visual') {
      setViewMode('visual');
      // Wait for React to render the visual mode before screenshotting
      setTimeout(generateScreenshotPDF, 500);
      return;
    }

    generateScreenshotPDF();
  };

  const generateScreenshotPDF = async () => {
    if (!dashboardRef.current) return;
    
    try {
      setIsPdfGenerating(true);
      
      const element = dashboardRef.current;
      const canvas = await html2canvas(element, {
        scale: 2, // High resolution
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2] // Fit exactly
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`RankBoost_Audit_${url.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`);
      
    } catch (err) {
      console.error("PDF generation failed", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsPdfGenerating(false);
    }
  };

  return (
    <section id="gmb-audit" className="py-24 bg-slate-50 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="font-mono text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-100 px-3.5 py-1.5 rounded-full inline-block">
            SMART AUDIT
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight flex items-center justify-center gap-3">
            <MapPin className="text-blue-500" size={32} />
            Deep-Search Optimization Report
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Enter your Google My Business link or exact business name and city. Our tool will analyze your local presence, identify critical ranking gaps, and generate a step-by-step roadmap for Local Pack dominance.
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 mb-12 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <form onSubmit={generateReport} className="relative z-10">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="e.g., https://g.page/your-business OR 'Joe\\'s Plumbing, Chicago IL'"
                  className="block w-full pl-11 pr-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow text-sm placeholder:text-slate-400 font-medium"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !url.trim()}
                className="bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 min-w-[200px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Analyzing Profile...
                  </>
                ) : (
                  <>
                    <Zap size={18} className="text-amber-400" />
                    Generate Audit
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results Area */}
        {(reportText || reportData || isLoading || error) && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col transition-all duration-500 animate-in slide-in-from-bottom-8 fade-in min-h-[400px]">
            {/* Report Header */}
            <div className="bg-slate-900 text-white p-4 md:px-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/20 p-2 rounded-lg border border-blue-500/30 hidden sm:block">
                  <BarChart className="text-blue-400" size={20} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg leading-none">Optimization Roadmap</h3>
                  {url && <p className="text-slate-400 text-xs font-mono mt-1 truncate max-w-[200px] md:max-w-[300px]">{url}</p>}
                </div>
              </div>
              
              {/* Controls */}
              <div className="flex items-center gap-4 self-end sm:self-auto">
                {isLoading && (
                  <div className="flex items-center gap-2 text-xs font-mono text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
                    <RefreshCw className="animate-spin" size={12} />
                    <span className="hidden sm:inline">PROCESSING</span>
                  </div>
                )}
                
                {/* View Toggle & Actions */}
                {(reportData || reportText) && (
                  <div className="flex items-center gap-3">
                    {!isLoading && (
                      <button
                        onClick={handleDownloadPDF}
                        disabled={isPdfGenerating}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white rounded-lg text-xs font-bold transition-all shadow-sm border border-blue-500 hover:shadow-md"
                        title="Download PDF Report"
                      >
                        {isPdfGenerating ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                        <span className="hidden sm:inline">
                          {isPdfGenerating ? "Generating..." : "Download PDF"}
                        </span>
                      </button>
                    )}
                    <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700 shrink-0">
                      <button 
                        type="button"
                        onClick={() => setViewMode('visual')}
                        className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-2 ${
                          viewMode === 'visual' ? 'bg-blue-500 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                        }`}
                      >
                        <PieChart size={14} /> <span className="hidden sm:inline">Dashboard</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => setViewMode('text')}
                        className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-2 ${
                          viewMode === 'text' ? 'bg-blue-500 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                        }`}
                      >
                        <LayoutList size={14} /> <span className="hidden sm:inline">Document</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Error State */}
            {error && (
              <div className="p-6 md:p-8 bg-red-50 text-red-700 flex flex-col items-center justify-center text-center space-y-4 h-full flex-grow">
                <AlertCircle size={40} className="text-red-500" />
                <div>
                  <h4 className="font-bold text-lg mb-1">Analysis Failed</h4>
                  <p className="text-sm opacity-90">{error}</p>
                </div>
              </div>
            )}
            
            {/* Loading Scanner Overlay */}
            {isLoading && !reportData && !error && (
              <div className="flex-grow flex items-center justify-center p-12 bg-slate-50/50 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-500/5 translate-y-full animate-[scan_2s_ease-in-out_infinite] border-t-2 border-blue-500 shadow-[0_-20px_40px_rgba(59,130,246,0.2)]"></div>
                <div className="flex flex-col items-center gap-6 relative z-10">
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-slate-200 rounded-full"></div>
                    <div className="w-20 h-20 border-4 border-blue-500 rounded-full border-t-transparent animate-spin absolute inset-0"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Search className="text-blue-500 animate-pulse" size={24} />
                    </div>
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-blue-600 font-mono text-sm font-bold tracking-widest">SCANNING PROFILE</p>
                    <p className="text-slate-400 text-xs">Analyzing local search metrics...</p>
                  </div>
                </div>
              </div>
            )}

            {/* Content Display */}
            <div className="relative bg-slate-50">
              {/* Visual Dashboard Mode */}
              <div className={viewMode === 'visual' ? 'block' : 'hidden'}>
                {reportData && <VisualDashboard data={reportData} ref={dashboardRef} />}
              </div>
              
              {/* Markdown Text Mode */}
              {viewMode === 'text' && reportText && (
                <div className="p-6 md:p-10 prose prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-h2:text-slate-900 prose-h3:text-slate-800 prose-a:text-blue-600 prose-p:leading-relaxed prose-li:marker:text-blue-500">
                  <Markdown>{reportText}</Markdown>
                  {isLoading && (
                    <div className="flex items-center gap-2 text-slate-400 mt-8 mb-4">
                      <span className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></span>
                      <span className="h-2 w-2 bg-blue-500 rounded-full animate-pulse delay-75"></span>
                      <span className="h-2 w-2 bg-blue-500 rounded-full animate-pulse delay-150"></span>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
