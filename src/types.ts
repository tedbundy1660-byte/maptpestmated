export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  priceMonthly: number;
  priceAnnually: number;
  features: string[];
  isPopular?: boolean;
}

export interface LeadSubmission {
  id: string;
  fullName: string;
  phoneNumber: string;
  businessName: string;
  emailAddress: string;
  service: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'scheduled' | 'closed';
  scheduledDate?: string;
  scheduledTime?: string;
}
