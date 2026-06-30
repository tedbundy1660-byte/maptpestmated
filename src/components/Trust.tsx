import { Home, Droplet, Wind, Zap, Leaf, Shield, Award, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { STATS, CLIENT_LOGOS } from '../data';

export default function Trust() {
  // Mapping string to Lucide Icons
  const getIcon = (name: string) => {
    switch (name) {
      case 'home': return <Home className="w-5 h-5" />;
      case 'droplet': return <Droplet className="w-5 h-5" />;
      case 'wind': return <Wind className="w-5 h-5" />;
      case 'zap': return <Zap className="w-5 h-5" />;
      case 'leaf': return <Leaf className="w-5 h-5" />;
      default: return <Shield className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-12 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Logos in Gray (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center lg:text-left">
              Trusted by Local Service Businesses Across the USA
            </h4>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 pt-2">
              {CLIENT_LOGOS.map((logo) => (
                <div
                  key={logo.name}
                  className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                >
                  <span className="p-1 bg-slate-100 rounded-lg text-slate-400">
                    {getIcon(logo.icon)}
                  </span>
                  <span className="font-display font-bold text-xs tracking-tight">
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Stats (5 cols) */}
          <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 lg:pl-8">
            <div className="grid grid-cols-3 gap-4 text-center">
              {STATS.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="space-y-1"
                >
                  <p className="font-display font-black text-2xl sm:text-3xl text-slate-950 tracking-tight leading-none">
                    {stat.value}
                  </p>
                  <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider leading-tight">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
