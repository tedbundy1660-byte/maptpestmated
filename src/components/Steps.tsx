import { MapPin, ThumbsUp, PhoneCall, ArrowRight, Sparkles } from 'lucide-react';

export default function Steps() {
  const steps = [
    {
      num: '1',
      title: 'Get Found',
      subtitle: 'Dominate Google Maps',
      desc: 'We optimize your Google Business Profile, generate reviews, build local backlinks, and help you rank higher in local searches.',
      icon: MapPin,
      iconBg: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      badgeColor: 'bg-blue-500 text-white'
    },
    {
      num: '2',
      title: 'Build Trust',
      subtitle: 'Social Media That Sells',
      desc: 'We create engaging posts, animated videos, and content that builds your brand, gets more attention, and brings you more local customers.',
      icon: ThumbsUp,
      iconBg: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      badgeColor: 'bg-amber-500 text-slate-950'
    },
    {
      num: '3',
      title: 'Convert Leads',
      subtitle: 'Never Miss a Call Again',
      desc: 'Our 12-hour live phone support answers calls, qualifies leads, and books appointments so you can focus on serving customers.',
      icon: PhoneCall,
      iconBg: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      badgeColor: 'bg-emerald-500 text-white'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white border-y border-slate-100 relative overflow-hidden">
      
      {/* Decorative accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-slate-100 rounded-full blur-3xl pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 border border-amber-200 rounded-full text-[10px] font-bold text-amber-800 uppercase tracking-wider">
            <Sparkles size={10} className="text-amber-600" />
            <span>Structured Acquisition</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3.5xl text-slate-950 tracking-tight leading-tight">
            Our 3-Step Local Growth System
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
            We bring more customers to your business and make sure you never miss a lead.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          
          {/* Central Connection Path (Only visible on MD/LG screens) */}
          <div className="hidden md:block absolute top-[68px] left-[15%] right-[15%] h-[1.5px] bg-slate-100 -z-10" />

          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.num}
                className="group relative flex flex-col items-center text-center p-6 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Step Num Circular Header */}
                <div className="relative mb-6">
                  {/* Icon Circle */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center border ${step.iconBg} relative transition-transform duration-300 group-hover:scale-105`}>
                    <IconComponent size={24} />
                  </div>
                  
                  {/* Step Badge */}
                  <span className={`absolute -bottom-1 -right-1 w-6 h-6 flex items-center justify-center rounded-full text-[11px] font-black border-2 border-white ${step.badgeColor}`}>
                    {step.num}
                  </span>
                </div>

                {/* Body Content */}
                <div className="space-y-2 flex-1">
                  <h3 className="font-display font-extrabold text-slate-900 text-lg leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-amber-500 font-bold text-xs uppercase tracking-wider">
                    {step.subtitle}
                  </p>
                  <p className="text-slate-500 text-[12px] leading-relaxed pt-2">
                    {step.desc}
                  </p>
                </div>

                {/* Corner link accent (just for style) */}
                <div className="absolute bottom-4 right-4 text-slate-200 group-hover:text-amber-500 transition-colors">
                  <ArrowRight size={14} />
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
