import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Trust from './components/Trust';
import Steps from './components/Steps';
import Pricing from './components/Pricing';
import FAQAndReturn from './components/FAQAndReturn';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import AdminLeads from './components/AdminLeads';
import ServiceDetailView from './components/ServiceDetailView';
import GMBReport from './components/GMBReport';
import ScrollProgress from './components/ScrollProgress';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import { SERVICE_DETAILS } from './data';

// Wrapper for Home Page
const HomePage = ({ onBookCall }: { onBookCall: (p?: string) => void }) => (
  <main>
    <Hero onBookCall={() => onBookCall()} />
    <Trust />
    <Steps />
    <Pricing onBookCall={onBookCall} />
  </main>
);

// Wrapper for Audit Page
const AuditPage = () => (
  <main className="pt-20 min-h-screen bg-slate-50">
    <GMBReport />
  </main>
);

// Wrapper for Pricing Page
const PricingPage = ({ onBookCall }: { onBookCall: (p?: string) => void }) => (
  <main className="pt-20 min-h-screen bg-slate-50">
    <Pricing onBookCall={onBookCall} />
    <FAQAndReturn />
  </main>
);

// Wrapper for Services Overview (reusing Steps and Trust)
const ServicesPage = ({ onBookCall }: { onBookCall: (p?: string) => void }) => (
  <main className="pt-20 min-h-screen">
    <div className="bg-slate-900 text-white py-24 text-center">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-display font-black mb-6">Our Services</h1>
        <p className="text-lg text-slate-300">Comprehensive local SEO and lead generation strategies designed to dominate your market.</p>
      </div>
    </div>
    <Steps />
    <Trust />
  </main>
);

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [defaultService, setDefaultService] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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

  const handleSelectService = (serviceId: string, pathOrHash?: string) => {
    if (serviceId) {
      navigate(`/services/${serviceId}`);
    } else if (pathOrHash) {
      if (pathOrHash.startsWith('#')) {
        navigate(`/${pathOrHash}`);
        setTimeout(() => {
          const element = document.querySelector(pathOrHash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          } else if (pathOrHash === '#home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 100);
      } else {
        navigate(`/${pathOrHash}`);
      }
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-slate-900 selection:bg-amber-500/20 selection:text-amber-900 overflow-x-hidden font-sans">
      <ScrollProgress />
      <Navbar onBookCall={() => handleBookCall()} />

      <Routes>
        <Route path="/" element={<HomePage onBookCall={handleBookCall} />} />
        <Route path="/audit" element={<AuditPage />} />
        <Route path="/pricing" element={<PricingPage onBookCall={handleBookCall} />} />
        <Route path="/services" element={<ServicesPage onBookCall={handleBookCall} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Dynamic Service Routes */}
        {SERVICE_DETAILS.map((service) => (
          <Route 
            key={service.id} 
            path={`/services/${service.id}`} 
            element={
              <ServiceDetailView 
                service={service} 
                onBack={() => navigate('/services')} 
                onBookCall={handleBookCall}
              />
            } 
          />
        ))}
      </Routes>

      <Footer 
        onBookCall={() => handleBookCall()} 
        onOpenAdmin={handleOpenAdmin} 
        onSelectService={handleSelectService}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultService={defaultService}
      />

      <AdminLeads
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
