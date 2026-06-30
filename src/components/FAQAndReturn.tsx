import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_ITEMS } from '../data';
import { ChevronDown, HelpCircle, ShieldAlert, BadgeCheck, HeartHandshake, RefreshCw } from 'lucide-react';

export default function FAQAndReturn() {
  const [openId, setOpenId] = useState<string | null>('results');

  const toggleId = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  const guarantees = [
    { text: '30-Day Money-Back Guarantee for Starter & Growth plans.', isBold: true },
    { text: 'For the Dominator plan, we offer a 30-day satisfaction guarantee on setup and onboarding. After that, cancellations require a 30-day notice.', isBold: false },
    { text: 'No setup fees are refundable.', isBold: false },
    { text: 'If we do not deliver the agreed-upon services as outlined, you are eligible for a full or partial refund.', isBold: false },
    { text: 'Our goal is long-term partnership, not short-term gains.', isBold: true }
  ];

  return (
    <section id="faq" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: FAQ Accordion (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-950 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-1.5">
                Everything you need to know about how our acquisition systems operate.
              </p>
            </div>

            {/* Accordion List */}
            <div className="space-y-3.5 pt-4">
              {FAQ_ITEMS.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div
                    key={item.id}
                    className="border border-slate-100 rounded-2xl bg-slate-50/50 overflow-hidden hover:bg-slate-50 hover:border-slate-200 transition-all"
                  >
                    {/* Header trigger */}
                    <button
                      type="button"
                      onClick={() => toggleId(item.id)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-slate-900 focus:outline-none"
                    >
                      <span className="flex items-center gap-2.5">
                        <HelpCircle size={15} className="text-amber-500 shrink-0" />
                        <span>{item.question}</span>
                      </span>
                      <ChevronDown
                        size={16}
                        className={`text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-amber-500' : ''}`}
                      />
                    </button>

                    {/* Collapsible Content */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                        >
                          <div className="px-5 pb-5 pt-1 text-slate-500 text-[12px] sm:text-[13px] leading-relaxed pl-11 border-t border-slate-100/50">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Return Policy Guarantee Widget (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl" />

              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-amber-100 rounded-2xl text-amber-600 shrink-0 border border-amber-200/50">
                  <HeartHandshake size={24} />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest block">Satisfaction Promise</span>
                  <h3 className="font-display font-black text-xl text-slate-900 tracking-tight mt-0.5">
                    Return Policy & Guarantee
                  </h3>
                </div>
              </div>

              {/* Subtitle text */}
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                We stand behind our services and your success. If you're not satisfied within the first 30 days, let us know. We'll work with you to address any issues.
              </p>

              {/* Bullet list with custom BadgeCheck icons */}
              <div className="space-y-4">
                {guarantees.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <span className="shrink-0 mt-0.5 text-emerald-500">
                      <BadgeCheck size={16} className="fill-emerald-100" />
                    </span>
                    <p className={`text-slate-500 text-[12px] leading-relaxed ${item.isBold ? 'font-bold text-slate-800' : ''}`}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom tag */}
              <div className="mt-8 pt-5 border-t border-slate-200/60 flex items-center gap-3 text-[10px] font-mono text-slate-400">
                <RefreshCw size={12} className="text-slate-400 animate-spin-slow" />
                <span>Month-to-month, risk-free collaboration loops</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
