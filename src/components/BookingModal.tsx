import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGoogleLogin } from '@react-oauth/google';
import { X, Calendar as CalendarIcon, Clock, CheckCircle2, ChevronRight, Phone, Mail, Building, Briefcase, Sparkles, AlertCircle } from 'lucide-react';
import { SERVICES } from '../data';
import { LeadSubmission } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export default function BookingModal({ isOpen, onClose, defaultService = '' }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    businessName: '',
    emailAddress: '',
    service: defaultService || SERVICES[0],
  });

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [calendarSyncStatus, setCalendarSyncStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [oauthErrorMsg, setOauthErrorMsg] = useState<string>('');

  const getGoogleCalendarUrl = () => {
    if (!selectedDate || !selectedTime) return 'https://calendar.google.com';
    try {
      const eventDate = new Date(`${selectedDate} ${selectedTime}`);
      const eventEndDate = new Date(eventDate.getTime() + 15 * 60000); // 15 mins
      const startStr = eventDate.toISOString().replace(/-|:|\.\d+/g, '');
      const endStr = eventEndDate.toISOString().replace(/-|:|\.\d+/g, '');
      const title = `Growth Strategy Call: ${formData.businessName || formData.fullName}`;
      const details = `Local Growth Strategy Call\nRepresentative: ${formData.fullName}\nPhone: ${formData.phoneNumber}\nEmail: ${formData.emailAddress}\nService: ${formData.service}\n\nMapstoestimates Team`;
      const location = `Phone Call (${formData.phoneNumber})`;
      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startStr}/${endStr}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    } catch (e) {
      return 'https://calendar.google.com';
    }
  };

  const downloadIcsFile = () => {
    if (!selectedDate || !selectedTime) return;
    try {
      const eventDate = new Date(`${selectedDate} ${selectedTime}`);
      const eventEndDate = new Date(eventDate.getTime() + 15 * 60000);
      const startStr = eventDate.toISOString().replace(/-|:|\.\d+/g, '');
      const endStr = eventEndDate.toISOString().replace(/-|:|\.\d+/g, '');
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Mapstoestimates//Booking//EN',
        'BEGIN:VEVENT',
        `UID:${Date.now()}@mapstoestimates.com`,
        `DTSTAMP:${startStr}`,
        `DTSTART:${startStr}`,
        `DTEND:${endStr}`,
        `SUMMARY:Growth Strategy Call: ${formData.businessName || formData.fullName}`,
        `DESCRIPTION:Representative: ${formData.fullName}\\nPhone: ${formData.phoneNumber}\\nEmail: ${formData.emailAddress}\\nService: ${formData.service}`,
        `LOCATION:Phone Call (${formData.phoneNumber})`,
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'strategy-call.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error(e);
    }
  };

  const addToCalendar = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/calendar.events',
    onSuccess: async (tokenResponse) => {
      setCalendarSyncStatus('loading');
      setOauthErrorMsg('');
      try {
        const eventDate = new Date(`${selectedDate} ${selectedTime}`);
        const eventEndDate = new Date(eventDate.getTime() + 15 * 60000); // 15 mins
        
        const event = {
          summary: `Growth Strategy Call with ${formData.businessName || formData.fullName}`,
          description: `Call with ${formData.fullName}\nPhone: ${formData.phoneNumber}\nEmail: ${formData.emailAddress}\nService: ${formData.service}`,
          start: {
            dateTime: eventDate.toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          end: {
            dateTime: eventEndDate.toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        };

        const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${tokenResponse.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event),
        });

        if (response.ok) {
          setCalendarSyncStatus('success');
        } else {
          setCalendarSyncStatus('error');
        }
      } catch (err) {
        setCalendarSyncStatus('error');
      }
    },
    onError: (err) => {
      setCalendarSyncStatus('error');
      setOauthErrorMsg(err?.error_description || 'OAuth access restricted.');
    }
  });

  // Generate next 7 days (skipping Sundays)
  const getNextDays = () => {
    const days = [];
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    const today = new Date();
    
    let added = 0;
    let i = 0;
    while (added < 6) {
      const nextDate = new Date();
      nextDate.setDate(today.getDate() + i);
      
      if (nextDate.getDay() !== 0) { // Skip Sunday
        const dateStr = nextDate.toISOString().split('T')[0];
        const label = nextDate.toLocaleDateString('en-US', options);
        days.push({ value: dateStr, label });
        added++;
      }
      i++;
    }
    return days;
  };

  const days = getNextDays();
  const timeSlots = ['9:00 AM', '10:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM'];

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (!/^\+?[\d\s-]{7,15}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    if (!formData.businessName.trim()) newErrors.businessName = 'Business Name is required';
    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      newErrors.emailAddress = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    } else if (step === 2) {
      if (!selectedDate) {
        setErrors({ date: 'Please choose a preferred date' });
      } else if (!selectedTime) {
        setErrors({ time: 'Please choose an available time slot' });
      } else {
        setErrors({});
        setStep(3);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 3) {
      setIsSubmitting(true);
      setSubmitError('');

      const newSubmission: LeadSubmission = {
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        businessName: formData.businessName,
        emailAddress: formData.emailAddress,
        service: formData.service,
        submittedAt: new Date().toISOString(),
        status: 'new',
        scheduledDate: selectedDate,
        scheduledTime: selectedTime
      };

      // Get existing leads from localStorage
      const existingLeadsStr = localStorage.getItem('local-growth-leads') || '[]';
      try {
        const existingLeads = JSON.parse(existingLeadsStr) as LeadSubmission[];
        existingLeads.unshift(newSubmission);
        localStorage.setItem('local-growth-leads', JSON.stringify(existingLeads));
      } catch (e) {
        localStorage.setItem('local-growth-leads', JSON.stringify([newSubmission]));
      }

      // Notify other views (like leads panel)
      window.dispatchEvent(new Event('lead-submitted'));

      // Send the email via the backend API
      try {
        const response = await fetch('/api/send-booking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            phoneNumber: formData.phoneNumber,
            businessName: formData.businessName,
            emailAddress: formData.emailAddress,
            service: formData.service,
            selectedDate,
            selectedTime
          }),
        });

        const data = await response.json();
        
        if (!response.ok) {
          // We can still proceed to step 4 even if email fails in preview, 
          // but we can log the error or show a warning.
          console.warn('Email sending failed:', data.error);
        }
      } catch (error) {
        console.error('Error sending booking request:', error);
      } finally {
        setIsSubmitting(false);
        setStep(4);
      }
    }
  };

  const handleReset = () => {
    setStep(1);
    setFormData({
      fullName: '',
      phoneNumber: '',
      businessName: '',
      emailAddress: '',
      service: defaultService || SERVICES[0],
    });
    setSelectedDate('');
    setSelectedTime('');
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={handleReset}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 shadow-2xl z-10 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                  <Sparkles size={18} className="animate-pulse" />
                </span>
                <h3 className="font-display text-lg font-bold text-white tracking-tight">
                  {step === 4 ? 'Booking Confirmed!' : 'Book Your Free Growth Call'}
                </h3>
              </div>
              <button
                onClick={handleReset}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                id="modal-close-btn"
              >
                <X size={18} />
              </button>
            </div>

            {/* Stepper Indicator */}
            {step < 4 && (
              <div className="bg-slate-950/40 px-6 py-2.5 flex items-center justify-between text-xs border-b border-slate-800/50">
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold ${step >= 1 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>1</span>
                  <span className={`${step >= 1 ? 'text-amber-400 font-medium' : 'text-slate-500'}`}>Contact Info</span>
                </div>
                <div className="h-px bg-slate-800 flex-1 mx-4" />
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold ${step >= 2 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>2</span>
                  <span className={`${step >= 2 ? 'text-amber-400 font-medium' : 'text-slate-500'}`}>Schedule Call</span>
                </div>
                <div className="h-px bg-slate-800 flex-1 mx-4" />
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold ${step >= 3 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>3</span>
                  <span className={`${step === 3 ? 'text-amber-400 font-medium' : 'text-slate-500'}`}>Review & Book</span>
                </div>
              </div>
            )}

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm text-slate-400 mb-4 leading-relaxed">
                      We'll review your local presence and provide an actionable strategy to rank higher and book more jobs. Provide your details below to get started:
                    </h4>
                  </div>

                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Phone size={12} className="text-slate-400" /> Full Name <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full bg-slate-950/60 border ${errors.fullName ? 'border-red-500/80 focus:ring-red-500/20' : 'border-slate-800 focus:ring-amber-500/20 focus:border-amber-500/60'} rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-4 transition-all text-white`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-red-400 flex items-center gap-1"><AlertCircle size={10} /> {errors.fullName}</p>
                    )}
                  </div>

                  {/* Phone field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Phone size={12} className="text-slate-400" /> Phone Number <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. (555) 123-4567"
                      value={formData.phoneNumber}
                      onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className={`w-full bg-slate-950/60 border ${errors.phoneNumber ? 'border-red-500/80 focus:ring-red-500/20' : 'border-slate-800 focus:ring-amber-500/20 focus:border-amber-500/60'} rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-4 transition-all text-white`}
                    />
                    {errors.phoneNumber && (
                      <p className="text-[11px] text-red-400 flex items-center gap-1"><AlertCircle size={10} /> {errors.phoneNumber}</p>
                    )}
                  </div>

                  {/* Business Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Building size={12} className="text-slate-400" /> Business Name <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Plumbing LLC"
                      value={formData.businessName}
                      onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                      className={`w-full bg-slate-950/60 border ${errors.businessName ? 'border-red-500/80 focus:ring-red-500/20' : 'border-slate-800 focus:ring-amber-500/20 focus:border-amber-500/60'} rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-4 transition-all text-white`}
                    />
                    {errors.businessName && (
                      <p className="text-[11px] text-red-400 flex items-center gap-1"><AlertCircle size={10} /> {errors.businessName}</p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Mail size={12} className="text-slate-400" /> Email Address <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. john@acmeplumbing.com"
                      value={formData.emailAddress}
                      onChange={e => setFormData({ ...formData, emailAddress: e.target.value })}
                      className={`w-full bg-slate-950/60 border ${errors.emailAddress ? 'border-red-500/80 focus:ring-red-500/20' : 'border-slate-800 focus:ring-amber-500/20 focus:border-amber-500/60'} rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-4 transition-all text-white`}
                    />
                    {errors.emailAddress && (
                      <p className="text-[11px] text-red-400 flex items-center gap-1"><AlertCircle size={10} /> {errors.emailAddress}</p>
                    )}
                  </div>

                  {/* Select Service */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Briefcase size={12} className="text-slate-400" /> Primary Service Need
                    </label>
                    <select
                      value={formData.service}
                      onChange={e => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500/60 transition-all text-white appearance-none"
                    >
                      {SERVICES.map(srv => (
                        <option key={srv} value={srv} className="bg-slate-900 text-white">
                          {srv}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">Step 2 of 3</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Select a date and time for your free 15-minute Growth Consultation.
                    </p>
                  </div>

                  {/* Date Grid */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <CalendarIcon size={12} className="text-slate-400" /> Select a Date
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {days.map(day => (
                        <button
                          key={day.value}
                          type="button"
                          onClick={() => {
                            setSelectedDate(day.value);
                            setErrors({ ...errors, date: '' });
                          }}
                          className={`p-3 rounded-xl border text-center transition-all text-xs flex flex-col items-center justify-center gap-1 ${
                            selectedDate === day.value
                              ? 'bg-amber-500 border-amber-500 text-slate-950 font-bold'
                              : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                          }`}
                        >
                          <span>{day.label.split(',')[0]}</span>
                          <span className={selectedDate === day.value ? 'text-slate-950' : 'text-slate-400 font-mono text-[11px]'}>
                            {day.label.split(',')[1]}
                          </span>
                        </button>
                      ))}
                    </div>
                    {errors.date && (
                      <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1"><AlertCircle size={10} /> {errors.date}</p>
                    )}
                  </div>

                  {/* Time slots Grid */}
                  {selectedDate && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2 pt-2 border-t border-slate-800/50"
                    >
                      <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                        <Clock size={12} className="text-slate-400" /> Available Time Slots (Central Time)
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map(time => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => {
                              setSelectedTime(time);
                              setErrors({ ...errors, time: '' });
                            }}
                            className={`py-2 rounded-xl border text-center text-xs transition-all ${
                              selectedTime === time
                                ? 'bg-amber-500 border-amber-500 text-slate-950 font-bold'
                                : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                      {errors.time && (
                        <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1"><AlertCircle size={10} /> {errors.time}</p>
                      )}
                    </motion.div>
                  )}
                </div>
              )}

              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">Step 3 of 3</h4>
                    <p className="text-sm text-slate-300">
                      Please confirm your appointment details before finalizing:
                    </p>
                  </div>

                  <div className="bg-slate-950/60 rounded-2xl border border-slate-800 divide-y divide-slate-800/60 overflow-hidden text-sm">
                    <div className="p-4 flex justify-between items-start">
                      <div>
                        <span className="text-xs text-slate-400 block">Lead Representative</span>
                        <span className="font-semibold text-white">{formData.fullName}</span>
                      </div>
                      <span className="px-2 py-1 bg-slate-800 rounded-lg text-xs text-slate-300">{formData.businessName}</span>
                    </div>

                    <div className="p-4 grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-slate-400 block">Phone Connection</span>
                        <span className="font-mono text-white text-xs">{formData.phoneNumber}</span>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 block">Email Address</span>
                        <span className="text-slate-300 truncate block text-xs">{formData.emailAddress}</span>
                      </div>
                    </div>

                    <div className="p-4">
                      <span className="text-xs text-slate-400 block">Selected Service Analysis</span>
                      <span className="font-medium text-amber-400 text-xs">{formData.service}</span>
                    </div>

                    <div className="p-4 bg-amber-500/5 flex items-center gap-3">
                      <CalendarIcon className="text-amber-400 shrink-0" size={18} />
                      <div>
                        <span className="text-xs text-slate-400 block">Growth Call Schedule</span>
                        <span className="font-bold text-white text-xs">
                          {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })} at <span className="text-amber-400 font-mono">{selectedTime}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950/20 rounded-xl p-3 border border-slate-800/50 flex gap-2.5 items-start">
                    <CheckCircle2 size={16} className="text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      By submitting, you agree to receive a 1-on-1 growth strategy call. No obligation, 100% free. We respect your privacy.
                    </p>
                  </div>
                </form>
              )}

              {step === 4 && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-6 space-y-4"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 mb-2 border border-emerald-500/20">
                    <CheckCircle2 size={36} className="animate-bounce" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xl font-display font-bold text-white">Your Growth Call is Booked!</h4>
                    <p className="text-sm text-emerald-400 font-medium">Confirmation sent to {formData.emailAddress}</p>
                  </div>

                  <div className="bg-slate-950/60 rounded-2xl p-4 max-w-sm mx-auto text-left border border-slate-800 text-xs space-y-2">
                    <div className="flex justify-between border-b border-slate-800/60 pb-2">
                      <span className="text-slate-400">Company:</span>
                      <span className="font-semibold text-white">{formData.businessName}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800/60 pb-2">
                      <span className="text-slate-400">Scheduled:</span>
                      <span className="font-semibold text-white">
                        {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })} at {selectedTime}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Representative:</span>
                      <span className="font-semibold text-white">{formData.fullName}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                    A local growth specialist will call you at <strong className="text-slate-200">{formData.phoneNumber}</strong> at the scheduled time. Please have your Google Business Profile access ready if possible!
                  </p>

                  <div className="mt-6 pt-6 border-t border-slate-800 space-y-3">
                    <p className="text-xs font-semibold text-slate-300">Add to your calendar:</p>
                    <div className="flex flex-wrap items-center justify-center gap-2.5">
                      {/* Direct 1-click Google Calendar Link (Always Works without OAuth limits) */}
                      <a
                        href={getGoogleCalendarUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-md shadow-white/5 hover:scale-[1.02]"
                        id="direct-google-cal-btn"
                      >
                        <CalendarIcon size={14} className="text-blue-600" />
                        <span>Google Calendar</span>
                      </a>

                      {/* Apple / Outlook .ics download */}
                      <button
                        type="button"
                        onClick={downloadIcsFile}
                        className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium px-4 py-2 rounded-xl text-xs transition-all border border-slate-700"
                        id="download-ics-btn"
                      >
                        <Clock size={14} className="text-amber-400" />
                        <span>Apple / Outlook (.ics)</span>
                      </button>
                    </div>

                    {calendarSyncStatus === 'success' && (
                      <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-medium pt-1">
                        <CheckCircle2 size={14} /> Auto-synced to your connected Google Calendar!
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer buttons */}
            <div className="border-t border-slate-800 bg-slate-950/40 px-6 py-4 flex gap-3">
              {step < 4 ? (
                <>
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-800 hover:text-white transition-colors"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={step === 3 ? handleSubmit : handleNextStep}
                    disabled={step === 3 && isSubmitting}
                    className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-sm transition-all shadow-md shadow-amber-500/10 flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    id="modal-next-btn"
                  >
                    <span>{step === 3 && isSubmitting ? 'Booking...' : (step === 3 ? 'Confirm & Book Free Call' : 'Continue')}</span>
                    {!(step === 3 && isSubmitting) && <ChevronRight size={16} />}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors"
                >
                  Close Window
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
