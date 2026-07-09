import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, Search, Filter, Trash2, Calendar, Clock, X, ExternalLink, Plus, RefreshCw, CheckCircle2, Lock, ShieldAlert, KeyRound } from 'lucide-react';
import { LeadSubmission } from '../types';

interface AdminLeadsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminLeads({ isOpen, onClose }: AdminLeadsProps) {
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  
  // Password protection state
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('leads-authenticated') === 'true';
  });
  const [authError, setAuthError] = useState('');

  const loadLeads = () => {
    const leadsStr = localStorage.getItem('local-growth-leads') || '[]';
    try {
      setLeads(JSON.parse(leadsStr));
    } catch (e) {
      setLeads([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadLeads();
      setPassword('');
      setAuthError('');
    }
    // Listen to custom submissions
    const handleSub = () => {
      loadLeads();
    };
    window.addEventListener('lead-submitted', handleSub);
    return () => window.removeEventListener('lead-submitted', handleSub);
  }, [isOpen]);

  const handleDelete = (id: string) => {
    const updated = leads.filter(l => l.id !== id);
    localStorage.setItem('local-growth-leads', JSON.stringify(updated));
    setLeads(updated);
  };

  const handleStatusChange = (id: string, newStatus: LeadSubmission['status']) => {
    const updated = leads.map(l => {
      if (l.id === id) {
        return { ...l, status: newStatus };
      }
      return l;
    });
    localStorage.setItem('local-growth-leads', JSON.stringify(updated));
    setLeads(updated);
  };

  const handleAddSample = () => {
    const samples = [
      { name: 'John Miller', business: 'Miller Roofing & Siding', service: 'Google Maps Optimization', phone: '(512) 555-8291', email: 'john@millerroofing.com' },
      { name: 'Sarah Jenkins', business: 'Austin HVAC Pros', service: 'Phone Support & Lead Handling', phone: '(512) 555-3847', email: 'sarah@austinhvac.com' },
      { name: 'Mike Sanchez', business: 'EcoScape Landscaping', service: 'Reputation Management', phone: '(713) 555-1029', email: 'mike@ecoscapetx.com' }
    ];

    const randomSample = samples[Math.floor(Math.random() * samples.length)];
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 2);
    const dateStr = futureDate.toISOString().split('T')[0];

    const newLead: LeadSubmission = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
      fullName: randomSample.name,
      phoneNumber: randomSample.phone,
      businessName: randomSample.business,
      emailAddress: randomSample.email,
      service: randomSample.service,
      submittedAt: new Date().toISOString(),
      status: 'new',
      scheduledDate: dateStr,
      scheduledTime: '10:30 AM'
    };

    const updated = [newLead, ...leads];
    localStorage.setItem('local-growth-leads', JSON.stringify(updated));
    setLeads(updated);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all lead history from localStorage?')) {
      localStorage.removeItem('local-growth-leads');
      setLeads([]);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.emailAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phoneNumber.includes(searchTerm);

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesService = serviceFilter === 'all' || lead.service === serviceFilter;

    return matchesSearch && matchesStatus && matchesService;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Panel content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col h-[85vh] text-slate-100"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/40 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400">
                  <Database size={20} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-lg tracking-tight">Leads Inbox Console</h3>
                  <p className="text-xs text-slate-400">Manage free growth calls booked via the website landing form</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isAuthenticated && (
                  <>
                    <button
                      onClick={handleAddSample}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-xl flex items-center gap-1 transition-colors font-medium"
                    >
                      <Plus size={14} /> Add Demo Lead
                    </button>
                    <button
                      onClick={handleClearAll}
                      className="px-3 py-1.5 text-red-400 hover:bg-red-500/10 text-xs rounded-xl transition-colors font-medium"
                    >
                      Clear All
                    </button>
                  </>
                )}
                <button
                  onClick={onClose}
                  className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {!isAuthenticated ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-950/40">
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full max-w-md bg-slate-900 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6 relative"
                >
                  <div className="text-center space-y-2">
                    <div className="mx-auto w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-400 border border-amber-500/20">
                      <Lock size={22} className="animate-pulse" />
                    </div>
                    <h4 className="font-display font-bold text-white text-base">Administrator Authentication</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      To safeguard prospective client lists and active scheduling records, please verify your credentials.
                    </p>
                  </div>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (password === 'admin123' || password === 'mapto123' || password.toLowerCase() === 'mapstoestimate' || password.toLowerCase() === 'mapto') {
                        setIsAuthenticated(true);
                        sessionStorage.setItem('leads-authenticated', 'true');
                        setAuthError('');
                      } else {
                        setAuthError('Incorrect access key. Please try again.');
                      }
                    }} 
                    className="space-y-4"
                  >
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Access Key Password</label>
                      <div className="relative">
                        <KeyRound size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={e => {
                            setPassword(e.target.value);
                            if (authError) setAuthError('');
                          }}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all font-mono"
                          autoFocus
                        />
                      </div>
                      {authError && (
                        <motion.div 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-1.5 text-red-400 text-[11px] mt-1"
                        >
                          <ShieldAlert size={12} />
                          <span>{authError}</span>
                        </motion.div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs tracking-wider transition-colors"
                    >
                      Unlock Inbox Console
                    </button>
                  </form>

                  <div className="border-t border-slate-800/60 pt-4 text-center">
                    <span className="text-[10px] text-slate-500 tracking-wide">
                      Authentication Demo Access Code: <code className="text-amber-500/80 font-mono bg-slate-950/60 px-1.5 py-0.5 rounded border border-slate-800/40">admin123</code>
                    </span>
                  </div>
                </motion.div>
              </div>
            ) : (
              <>
                {/* Filter bar */}
                <div className="px-6 py-3 border-b border-slate-800 bg-slate-950/20 grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Search */}
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search lead or business..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="w-full bg-slate-950/40 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all"
                    />
                  </div>

                  {/* Status Filter */}
                  <div className="flex items-center gap-1.5">
                    <Filter size={12} className="text-slate-400" />
                    <select
                      value={statusFilter}
                      onChange={e => setStatusFilter(e.target.value)}
                      className="w-full bg-slate-950/40 border border-slate-800 rounded-xl px-3 py-2 text-xs outline-none text-slate-300"
                    >
                      <option value="all" className="bg-slate-900">All Statuses</option>
                      <option value="new" className="bg-slate-900">🟢 New Submission</option>
                      <option value="contacted" className="bg-slate-900">🔵 Contacted</option>
                      <option value="scheduled" className="bg-slate-900">🗓️ Scheduled</option>
                      <option value="closed" className="bg-slate-900">✔️ Closed</option>
                    </select>
                  </div>

                  {/* Service Filter */}
                  <div className="flex items-center gap-1.5">
                    <Filter size={12} className="text-slate-400" />
                    <select
                      value={serviceFilter}
                      onChange={e => setServiceFilter(e.target.value)}
                      className="w-full bg-slate-950/40 border border-slate-800 rounded-xl px-3 py-2 text-xs outline-none text-slate-300"
                    >
                      <option value="all" className="bg-slate-900">All Services</option>
                      <option value="Google Maps Optimization" className="bg-slate-900">Google Maps</option>
                      <option value="Reputation Management" className="bg-slate-900">Reputation</option>
                      <option value="Social Media Management" className="bg-slate-900">Social Media</option>
                      <option value="Content Creation" className="bg-slate-900">Content Creation</option>
                      <option value="Phone Support & Lead Handling" className="bg-slate-900">Phone Support</option>
                      <option value="Complete Growth System" className="bg-slate-900">Complete System</option>
                    </select>
                  </div>
                </div>

                {/* Main leads table area */}
                <div className="flex-1 overflow-auto">
                  {filteredLeads.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-3">
                      <div className="p-4 bg-slate-800/40 text-slate-500 rounded-full">
                        <Database size={32} />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">No lead submissions found</h4>
                        <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                          Fill out the booking form on the landing page or click "Add Demo Lead" above to simulate new entries in real time.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="min-w-full inline-block align-middle">
                      <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-slate-800 text-left">
                          <thead className="bg-slate-950/40 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                            <tr>
                              <th className="px-6 py-3.5">Lead / Business</th>
                              <th className="px-6 py-3.5">Contact Details</th>
                              <th className="px-6 py-3.5">Service Requested</th>
                              <th className="px-6 py-3.5">Call Appointment</th>
                              <th className="px-6 py-3.5">Status</th>
                              <th className="px-6 py-3.5 text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800 text-xs">
                            {filteredLeads.map(lead => (
                              <tr key={lead.id} className="hover:bg-slate-800/20 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="font-semibold text-white">{lead.fullName}</div>
                                  <div className="text-slate-400 text-[11px] font-mono">{lead.businessName}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div>{lead.phoneNumber}</div>
                                  <div className="text-slate-400 text-[11px]">{lead.emailAddress}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="px-2 py-0.5 bg-slate-800 text-amber-400 rounded-full text-[10px] font-medium border border-slate-700/60">
                                    {lead.service}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {lead.scheduledDate ? (
                                    <div className="space-y-0.5">
                                      <div className="flex items-center gap-1 text-slate-200">
                                        <Calendar size={12} className="text-slate-400" />
                                        <span>{new Date(lead.scheduledDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                      </div>
                                      <div className="flex items-center gap-1 text-slate-400 text-[11px] font-mono">
                                        <Clock size={10} />
                                        <span>{lead.scheduledTime}</span>
                                      </div>
                                    </div>
                                  ) : (
                                    <span className="text-slate-500 italic">Immediate Call</span>
                                  )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <select
                                    value={lead.status}
                                    onChange={e => handleStatusChange(lead.id, e.target.value as LeadSubmission['status'])}
                                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${
                                      lead.status === 'new'
                                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                        : lead.status === 'contacted'
                                        ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                                        : lead.status === 'scheduled'
                                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                                        : 'bg-slate-700/20 border-slate-600/30 text-slate-400'
                                    } outline-none cursor-pointer`}
                                  >
                                    <option value="new" className="bg-slate-900 text-emerald-400">New</option>
                                    <option value="contacted" className="bg-slate-900 text-blue-400">Contacted</option>
                                    <option value="scheduled" className="bg-slate-900 text-amber-400">Scheduled</option>
                                    <option value="closed" className="bg-slate-900 text-slate-400">Closed</option>
                                  </select>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                  <button
                                    onClick={() => handleDelete(lead.id)}
                                    className="text-red-400 hover:text-red-300 p-1.5 hover:bg-red-500/10 rounded-lg transition-all"
                                    title="Delete Lead"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer summary details */}
                <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-3">
                    <span>Total Booked: <strong className="text-white font-mono">{leads.length}</strong></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                    <span>New: <strong className="text-emerald-400 font-mono">{leads.filter(l => l.status === 'new').length}</strong></span>
                  </div>
                  <span className="text-[10px] italic flex items-center gap-1 text-slate-500">
                    <Database size={10} /> LocalStorage Persistence Active
                  </span>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
