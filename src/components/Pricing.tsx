import { useState } from 'react';
import { PRICING_PLANS } from '../data';
import { Check, Flame, MessageSquare, TrendingUp, Calendar, PhoneIncoming, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface PricingProps {
  onBookCall: (planName?: string) => void;
}

export default function Pricing({ onBookCall }: PricingProps) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annually'>('monthly');

  const sideBenefits = [
    {
      title: 'More Calls',
      desc: 'We put your business in front of local customers searching for your services.',
      icon: PhoneIncoming,
      iconColor: 'text-amber-400 bg-amber-500/10'
    },
    {
      title: 'More Bookings',
      desc: 'We turn calls into appointments so your schedule stays full.',
      icon: Calendar,
      iconColor: 'text-amber-400 bg-amber-500/10'
    },
    {
      title: 'More Revenue',
      desc: 'More jobs. More profits. Simple as that.',
      icon: TrendingUp,
      iconColor: 'text-amber-400 bg-amber-500/10'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-slate-50 relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header and Toggle */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="font-display font-black text-2xl sm:text-3.5xl text-slate-950 tracking-tight leading-tight">
            Choose the Plan That Fits Your Business
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Select a plan that aligns with your current goals. Upgrade or cancel at any time.
          </p>

          {/* Monthly / Annual Toggle Selector */}
          <div className="inline-flex items-center gap-1.5 p-1 bg-slate-200/60 border border-slate-200 rounded-2xl mt-4">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 ${
                billingPeriod === 'monthly'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingPeriod('annually')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-1.5 ${
                billingPeriod === 'annually'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[9px] rounded-lg font-black uppercase">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Core Layout Grid (Pricing Columns + Side Benefit Card) */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Pricing Plans Column Group (9 columns) */}
          <div className="lg:col-span-9 grid sm:grid-cols-3 gap-6 items-stretch">
            {PRICING_PLANS.map((plan, idx) => {
              const price = billingPeriod === 'monthly' ? plan.priceMonthly : plan.priceAnnually;
              
              return (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  key={plan.id}
                  className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ${
                    plan.isPopular
                      ? 'bg-white border-2 border-amber-500 shadow-2xl scale-105 sm:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.3)]'
                      : 'bg-white border border-slate-200 hover:border-slate-300 shadow-lg hover:shadow-xl'
                  }`}
                  id={`pricing-${plan.id}`}
                >
                  {/* Popular Floating Badge */}
                  {plan.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500 text-slate-950 text-[10px] font-black rounded-full uppercase tracking-wider flex items-center gap-1">
                      <Flame size={11} className="fill-slate-950" />
                      <span>Most Popular</span>
                    </div>
                  )}

                  {/* Plan Top Meta */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-display font-black text-slate-900 text-lg">{plan.name}</h3>
                      <p className="text-slate-400 text-xs mt-0.5">{plan.subtitle}</p>
                    </div>

                    {/* Price indicator */}
                    <div className="pt-2">
                      <span className="font-display font-black text-3xl text-slate-950">
                        ${price}
                      </span>
                      <span className="text-slate-500 text-xs font-medium"> /month</span>
                      {billingPeriod === 'annually' && (
                        <p className="text-[10px] text-emerald-600 font-bold mt-1">Billed annually (${price * 12}/year)</p>
                      )}
                    </div>

                    <div className="h-px bg-slate-100 my-4" />

                    {/* Benefits Checklist */}
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => {
                        const isEverythingHeader = feature.toLowerCase().includes('everything in');
                        
                        return (
                          <li
                            key={index}
                            className={`flex items-start gap-2 text-xs ${
                              isEverythingHeader
                                ? 'font-bold text-slate-800 pt-1 pb-1'
                                : 'text-slate-500'
                            }`}
                          >
                            <span className={`shrink-0 mt-0.5 p-0.5 rounded-full ${
                              plan.isPopular ? 'text-amber-500 bg-amber-50' : 'text-emerald-500 bg-emerald-50'
                            }`}>
                              <Check size={11} strokeWidth={3} />
                            </span>
                            <span>{feature}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Submit Call-to-Action button */}
                  <div className="pt-8">
                    <button
                      onClick={() => onBookCall(plan.name)}
                      className={`w-full font-bold py-3 px-4 rounded-xl text-xs transition-colors tracking-wide ${
                        plan.isPopular
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/10'
                          : 'bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      Get Started
                    </button>
                  </div>

                </motion.div>
              );
            })}
          </div>

          {/* Right Column highlighted dark benefits card (3 columns) */}
          <div className="lg:col-span-3 flex">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative w-full bg-slate-950 border border-slate-900 rounded-3xl p-6 flex flex-col justify-center space-y-6 text-slate-100 shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />
              
              {sideBenefits.map((benefit) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={benefit.title} className="flex gap-4 items-start relative z-10 group">
                    <div className={`p-2.5 rounded-xl shrink-0 ${benefit.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent size={18} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-display font-extrabold text-white text-sm">
                        {benefit.title}
                      </h4>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        {benefit.desc}
                      </p>
                    </div>
                  </div>
                );
              })}

              <div className="pt-2 border-t border-slate-900 text-center">
                <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest block mb-1">Guaranteed Call Loops</span>
                <p className="text-[10px] text-slate-500">Structured strictly for high ROI metrics</p>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
