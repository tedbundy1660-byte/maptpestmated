import { FAQItem, PricingPlan } from './types';

export const SERVICES = [
  'Google Maps Optimization',
  'Reputation Management',
  'Social Media Management',
  'Content Creation',
  'Phone Support & Lead Handling',
  'Complete Growth System'
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'results',
    question: 'How long does it take to see results?',
    answer: 'Google Maps optimization typically begins showing initial improvements in local search rankings and citation visibility within 14 to 30 days. Our social media strategies start driving engagement within 2 weeks, while our 12-Hour Live Phone Support system gets activated immediately on onboarding, ensuring you start booking and qualifying leads on day one.'
  },
  {
    id: 'types',
    question: 'Do you work with every type of business?',
    answer: 'We focus exclusively on local service-based businesses, such as Roofing, Plumbing, HVAC, Electrical, Landscaping, and General Contracting. We specialize in high-intent, local-lead generation where phone calls, Google Maps rankings, and reputation are the primary drivers of new customer bookings.'
  },
  {
    id: 'areas',
    question: 'What areas do you service?',
    answer: 'We serve local service businesses across the entire United States and Canada. Our local SEO, citation building, and Google Business Profile optimization strategies are highly tailored to your precise city and target neighborhoods.'
  },
  {
    id: 'contracts',
    question: 'Will I be locked into a long-term contract?',
    answer: 'No long-term contracts are required! We offer flexible month-to-month terms on all of our plans so you can upgrade, downgrade, or cancel at any time. We believe in earning your partnership month after month through measurable, bottom-line results.'
  },
  {
    id: 'phones',
    question: 'How does the phone support service work?',
    answer: 'Under our Dominator plan, we provide a dedicated 12-hour live phone support line. Our professionally trained, US-based call agents handle all of your incoming leads, qualify them according to your custom criteria, and book appointments directly onto your Google or Jobber calendar, so you can focus on executing the work.'
  },
  {
    id: 'start-small',
    question: 'Can I start with one service and upgrade later?',
    answer: 'Absolutely! Many of our clients start with our Starter plan to dominate Google Maps and gain momentum, then upgrade to the Growth or Dominator plan once they need social media management, brand expansion, or complete lead-qualification and booking support.'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    subtitle: 'Map Visibility',
    priceMonthly: 199,
    priceAnnually: 159,
    features: [
      'Google Business Profile Optimization',
      'Review Strategy & Management',
      'Weekly Google Posts',
      'Basic Local Citations',
      'Monthly Performance Report'
    ]
  },
  {
    id: 'growth',
    name: 'Growth',
    subtitle: 'Build Your Brand',
    priceMonthly: 349,
    priceAnnually: 279,
    isPopular: true,
    features: [
      'Everything in Starter, plus:',
      'Facebook & Instagram Management',
      'Branded Animated Content',
      'Social Media Strategy',
      'Reputation Management',
      'Priority Support'
    ]
  },
  {
    id: 'dominator',
    name: 'Dominator',
    subtitle: 'Complete Growth System',
    priceMonthly: 699,
    priceAnnually: 559,
    features: [
      'Everything in Growth, plus:',
      '12-Hour Live Phone Support',
      'Lead Qualification',
      'Appointment Booking',
      'Call Tracking & Reporting',
      'Priority Support'
    ]
  }
];

export const STATS = [
  { value: '500+', label: 'Businesses Helped' },
  { value: '25K+', label: 'Calls Generated' },
  { value: '98%', label: 'Client Satisfaction' }
];

export const CLIENT_LOGOS = [
  { name: 'Roofing Companies', icon: 'home' },
  { name: 'Plumbing Services', icon: 'droplet' },
  { name: 'HVAC Experts', icon: 'wind' },
  { name: 'Electrical Services', icon: 'zap' },
  { name: 'Landscaping Companies', icon: 'leaf' }
];
