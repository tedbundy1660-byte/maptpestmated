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
import ServiceDetailView from './components/ServiceDetailView';
import { SERVICE_DETAILS } from './data';
import BeforeAfter from './components/BeforeAfter';
import GMBReviews from './components/GMBReviews';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [defaultService, setDefaultService] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const handleBookCall = (planOrService?: string) => {
    if (planOrService === 'Starter') {
      setDefaultService('Google Maps Optimization');
    } else if (planOrService === 'Growth') {
      setDefaultService('Social Media Management');
    } else if (planOrService === 'Dominator') {
      setDefaultService('Phone Support & Lead Handling');
    } else if (planOrService) {
      setDefaultService(planOrService);
    } else {
      setDefaultService('');
    }
    setIsBookingOpen(true);
  };

  const handleOpenAdmin = () => {
    setIsAdminOpen(true);
  };

  const handleSelectService = (serviceId: string, hash?: string) => {
    setSelectedServiceId(serviceId || null);
    if (!serviceId) {
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          } else if (hash === '#home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const activeService = SERVICE_DETAILS.find(s => s.id === selectedServiceId);

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-slate-900 selection:bg-amber-500/20 selection:text-amber-900 overflow-x-hidden">
      {/* Sticky Top Header */}
      <Header 
        onBookCall={() => handleBookCall()} 
        onOpenAdmin={handleOpenAdmin} 
        onSelectService={handleSelectService}
      />

      {/* Main Content Area */}
      {activeService ? (
        <ServiceDetailView 
          service={activeService} 
          onBack={() => handleSelectService('')} 
          onBookCall={handleBookCall}
        />
      ) : (
        <main>
          {/* Dark Hero Section */}
          <Hero onBookCall={() => handleBookCall()} />

          {/* Gray trusted logo section & stats row */}
          <Trust />

          {/* Draggable Before & After visual comparison slider */}
          <BeforeAfter />

          {/* White 3-step growth explanation layout */}
          <Steps />

          {/* Google My Business Testimonials & Interactive Review Scanner tool */}
          <GMBReviews />

          {/* Light Gray pricing columns & benefits layout */}
          <Pricing onBookCall={handleBookCall} />

          {/* White Frequently Asked Questions & refund guarantee */}
          <FAQAndReturn />
        </main>
      )}

      {/* Sticky Dark Footer layout */}
      <Footer 
        onBookCall={() => handleBookCall()} 
        onOpenAdmin={handleOpenAdmin} 
        onSelectService={handleSelectService}
      />

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
