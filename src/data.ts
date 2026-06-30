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

export const SERVICE_DETAILS = [
  {
    id: 'google-maps-optimization',
    title: 'Google Maps Optimization',
    tagline: 'Dominate Local Search & Drive Free Direct Calls',
    description: '84% of local service queries result in a Map Pack discovery. We fine-tune your listing, resolve suspension risks, build geo-targeted local citations, and design review loops that keep your business pinned to the absolute top of Google Maps where your prospects are looking.',
    keyFeatures: [
      'Google Business Profile Full Optimization & Auditing',
      'High-Value Local Citation Synchronization (Yelp, Bing, YellowPages)',
      'Geo-Tagged Photo Metadata Injections & Real-Time Uploads',
      'Review Acquisition Campaign Automation & Feedback Response Scripts',
      'Weekly Geo-Targeted Local Google Business Posts & Updates'
    ],
    estimatedRoi: 'Avg. 45% increase in organic local call volume within first 30-45 days.',
    iconName: 'MapPin',
    deliverables: [
      'Complete local competitor analysis report',
      '150+ high-authority local citations built/corrected',
      'Review request cards & QR code assets designed for technicians',
      'Monthly Google Maps local heat-map visibility tracking'
    ],
    pricingRange: 'Included in Starter, Growth, and Dominator packages.'
  },
  {
    id: 'reputation-management',
    title: 'Reputation Management',
    tagline: 'Build a Five-Star Moat That Outshines Your Competitors',
    description: 'Your online reputation is your ultimate digital salesman. We help you proactively request feedback from happy customers via SMS/Email templates, respond to reviews across platforms instantly, and mitigate poor experiences before they damage your public ratings.',
    keyFeatures: [
      'SMS & Email Review Broadcast Automation Systems',
      'Immediate Review Alerts with Smart Auto-Response Templates',
      'Negative Review Interception & Resolution Funnels',
      'Multi-platform Review Sync (Google, Facebook, Angi, Houzz, Yelp)',
      'Quarterly Competitive Reputation Benchmarking & Analysis'
    ],
    estimatedRoi: 'Convert up to 3x more website visitors by showcasing genuine five-star social proof.',
    iconName: 'Star',
    deliverables: [
      'Customized reputation-funnel landing page',
      'API sync set-up for review monitoring on 5+ portals',
      'Auto-replies designed specifically for your industry',
      'Review widgets to showcase fresh star-ratings on your homepage'
    ],
    pricingRange: 'Included in Growth and Dominator packages.'
  },
  {
    id: 'social-media-management',
    title: 'Social Media Management',
    tagline: 'Stay Top-of-Mind in Your Local Service Community',
    description: 'Most local service contractors neglect their social feeds, leaving them look abandoned. We take over your Facebook, Instagram, and LinkedIn pages, posting high-quality local updates, completed project spotlights, and seasonal tips that build community trust.',
    keyFeatures: [
      'Seasonal Content Calendar & Expert Copywriting Production',
      'Before-and-After Completed Project Spotlight Templates',
      'Local Community Group Engagement & Local Post Distribution',
      'Custom Cover Artworks, Dynamic Banners, and Brand Templates',
      'Detailed Monthly Analytics on Impression Share & Local Reach'
    ],
    estimatedRoi: 'Over 80% higher referral confidence and persistent local top-of-mind brand status.',
    iconName: 'Instagram',
    deliverables: [
      '3 to 4 premium custom branded posts per week',
      'Industry-specific informational graphic sheets',
      'Social account visual tuning & brand layout upgrade',
      'Dedicated social media associate managing updates'
    ],
    pricingRange: 'Included in Growth and Dominator packages.'
  },
  {
    id: 'content-creation',
    title: 'Content Creation',
    tagline: 'Thumb-Stopping Animated Videos & High-Impact Visual Assets',
    description: 'Static text gets ignored. We produce professional branded animated clips, educational seasonal reels, before-and-after project videos, and customized lead-generation resources that explain why your plumbing, roofing, or HVAC service is superior.',
    keyFeatures: [
      'Animated Explainer Video Production (Short-Form Reel/TikTok Style)',
      'High-Impact Before-and-After Project Video Slide compilations',
      'Seasonal Severe-Weather Preparation Guides & Visual Tips',
      'Lead-Magnet PDFs (e.g. "Ultimate Homeowner Winterizing Checklist")',
      'Custom Branded Asset Library with Premium Typography'
    ],
    estimatedRoi: 'Avg. 2.4x higher click-through rates on paid or organic posts.',
    iconName: 'Video',
    deliverables: [
      '2 custom short-form animated videos per month',
      'Branded lead magnet resource with download page set-up',
      'Professional raw photo styling presets for your technicians',
      'Seasonal promotional graphic templates (Summer, Winter, Fall)'
    ],
    pricingRange: 'Included in Growth and Dominator packages.'
  },
  {
    id: 'phone-support-&-lead-handling',
    title: 'Phone Support & Lead Handling',
    tagline: '12-Hour US-Based Live Dispatch & Instant Appointment Booking',
    description: 'If you do not answer the phone, the customer moves to the next contractor instantly. Our professional, trained call agents handle your incoming leads, qualify them according to your criteria, and book jobs directly into your calendar.',
    keyFeatures: [
      '12-Hour Live Phone Support Coverage (8:00 AM - 8:00 PM Central)',
      'Customized Contractor Qualification Scripts & Intake Flows',
      'Instant Appointment Booking into Jobber, Housecall Pro, or Google Calendar',
      'Immediate SMS / Email Notifications to Your Techs & Team',
      'Daily Call Recordings & High-Intent Opportunity Digests'
    ],
    estimatedRoi: 'Zero missed leads. Boost phone-intake booking rates by up to 35% on incoming calls.',
    iconName: 'Phone',
    deliverables: [
      'Dedicated local inbound telephone dispatch line',
      'Custom scripting set-up aligned with your pricing & policy rules',
      'CRM calendar integration configuration',
      'Dedicated caller onboarding training and testing simulation'
    ],
    pricingRange: 'Included in Dominator package.'
  },
  {
    id: 'complete-growth-system',
    title: 'Complete Growth System',
    tagline: 'Our Fully Managed Lead-to-Booking Master Pipeline',
    description: 'The ultimate solution for ambitious local business owners who want to scale without managing separate marketing tools. We combine Maps optimization, active review campaigns, social proof, and professional live booking agents into a single high-efficiency machine.',
    keyFeatures: [
      'All-in-One Integration (SEO, Maps, Social, Reviews, Content, Phone)',
      'Dedicated Senior Local Growth Advisor & Monthly Strategy Audits',
      'Interactive Custom Lead & Call Performance Dashboard Access',
      'Direct Native Integration with Calendar Suites & CRM Workspaces',
      'Bi-Weekly Strategy Calls & Competitor Intrusion Analytics'
    ],
    estimatedRoi: 'Maximize marketing ROI. Build a highly scalable, automated local service brand.',
    iconName: 'Sparkles',
    deliverables: [
      'Complete rollout of all Starter, Growth, and Dominator deliverables',
      'Priority ongoing dashboard maintenance & support responses',
      'Custom regional SEO keyword expansion campaign',
      'Bi-weekly lead performance optimization review call'
    ],
    pricingRange: 'Included in Dominator package.'
  }
];

