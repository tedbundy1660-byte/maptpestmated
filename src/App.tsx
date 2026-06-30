import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Trust from './components/Trust';
import Steps from './components/Steps';
import Pricing from './components/Pricing';
import FAQAndReturn from './components/FAQAndReturn';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import AdminLeads from './components/AdminLeads';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [defaultService, setDefaultService] = useState('');

  const handleBookCall = (planName?: string) => {
    if (planName === 'Starter') {
      setDefaultService('Google Maps Optimization');
    } else if (planName === 'Growth') {
      setDefaultService('Social Media Management');
    } else if (planName === 'Dominator') {
      setDefaultService('Phone Support & Lead Handling');
    } else {
      setDefaultService('');
    }
    setIsBookingOpen(true);
  };

  const handleOpenAdmin = () => {
    setIsAdminOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-slate-900 selection:bg-amber-500/20 selection:text-amber-900 overflow-x-hidden">
      {/* Sticky Top Header */}
      <Header onBookCall={() => handleBookCall()} onOpenAdmin={handleOpenAdmin} />

      {/* Main Landing Folds */}
      <main>
        {/* Dark Hero Section */}
        <Hero onBookCall={() => handleBookCall()} />

        {/* Gray trusted logo section & stats row */}
        <Trust />

        {/* White 3-step growth explanation layout */}
        <Steps />

        {/* Light Gray pricing columns & benefits layout */}
        <Pricing onBookCall={handleBookCall} />

        {/* White Frequently Asked Questions & refund guarantee */}
        <FAQAndReturn />
      </main>

      {/* Sticky Dark Footer layout */}
      <Footer onBookCall={() => handleBookCall()} onOpenAdmin={handleOpenAdmin} />

      {/* Interactive step-by-step scheduling dialog */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultService={defaultService}
      />

      {/* Hidden/accessible Leads inbox console dashboard panel */}
      <AdminLeads
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
