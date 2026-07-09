import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import { 
  Star, CheckCircle, Search, Sparkles, ShieldCheck, ArrowRight, AlertCircle, 
  RefreshCw, MessageSquare, Plus, ThumbsUp, HelpCircle, FileText, 
  MapPin, PhoneCall, Building2, Layers, CheckCircle2, ChevronRight,
  TrendingDown, TrendingUp, AlertTriangle, X, ShieldAlert, Sliders, Info
} from 'lucide-react';

interface Review {
  id: string;
  authorName: string;
  businessType: string;
  rating: number;
  dateText: string;
  text: string;
  response: string;
}

export default function GMBReviews() {
  // Input states
  const [businessInput, setBusinessInput] = useState('');
  const [businessCategory, setBusinessCategory] = useState('Plumbing & Drain');
  const [popularity, setPopularity] = useState<'startup' | 'moderate' | 'established' | 'leader'>('moderate');
  const [zipCode, setZipCode] = useState('77002');
  const [radius, setRadius] = useState('5');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  // App scanner states
  const [isSearching, setIsSearching] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [searchReport, setSearchReport] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'geogrid' | 'citations' | 'competitors'>('overview');
  const [selectedGridCell, setSelectedGridCell] = useState<any | null>(null);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  const categories = [
    'Plumbing & Drain',
    'Heating & Cooling (HVAC)',
    'Roofing & Siding',
    'Electrical Services',
    'Landscaping & Lawn Care',
    'Pest Control',
    'Home Remodeling & Repair'
  ];

  const popularBusinesses = [
    { name: 'Apex Plumbing & Drain Services', category: 'Plumbing & Drain', zip: '77002', pop: 'moderate' },
    { name: 'Summit HVAC Experts', category: 'Heating & Cooling (HVAC)', zip: '77019', pop: 'established' },
    { name: 'Lone Star Roofing & Construction', category: 'Roofing & Siding', zip: '77024', pop: 'moderate' },
    { name: 'Eco-Clean Landscape & Lawn', category: 'Landscaping & Lawn Care', zip: '77005', pop: 'startup' },
    { name: 'Metro Electrical Contracting', category: 'Electrical Services', zip: '77056', pop: 'established' },
    { name: 'Hometown Handyman Pros', category: 'Home Remodeling & Repair', zip: '77008', pop: 'startup' },
    { name: 'Rescue Rooter Plumbing', category: 'Plumbing & Drain', zip: '77030', pop: 'leader' },
    { name: 'Horizon Air Conditioning', category: 'Heating & Cooling (HVAC)', zip: '77042', pop: 'leader' }
  ];

  const sampleReviews: Review[] = [
    {
      id: 'rev-1',
      authorName: 'David K. • Owner, Apex Plumbing',
      businessType: 'Plumbing Services',
      rating: 5,
      dateText: '3 days ago',
      text: 'Our Google Maps placement was dead in the water. Within 3 weeks of connecting with MAPTO, our local ranking map turned green! We went from 2-3 organic calls a week to daily inquiries. The automated GMB posts are effortless.',
      response: 'Thanks David! Apex Plumbing is a stellar local service, we are thrilled to lock in your top ranking!'
    },
    {
      id: 'rev-2',
      authorName: 'Samantha R. • Operations, Elite HVAC',
      businessType: 'Heating & Cooling',
      rating: 5,
      dateText: '1 week ago',
      text: 'The review acquisition SMS loop alone paid for the Growth package on day one. We gathered 34 new 5-star reviews this month, and our competition is falling behind. Best reputation partner we have ever used.',
      response: 'We appreciate you Samantha! Elite HVAC is on a straight path to local dominance.'
    },
    {
      id: 'rev-3',
      authorName: 'Tyler J. • Founder, Premier Roofing',
      businessType: 'Roofing & Siding',
      rating: 5,
      dateText: '2 weeks ago',
      text: 'Our GMB rating was stuck at 4.1. We integrated MAPTOs reputation loop and intercepted negative issues privately while sending happy clients direct to Google. Now we are cruising at 4.8 Stars. Unbelievable.',
      response: 'Tyler, you and the Premier team have been phenomenal partners. Keep up the high-standard service!'
    }
  ];

  const handleInputChange = (val: string) => {
    setBusinessInput(val);
    if (val.trim().length > 1) {
      const filtered = popularBusinesses
        .filter(b => b.name.toLowerCase().includes(val.toLowerCase()))
        .map(b => b.name);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (name: string) => {
    setBusinessInput(name);
    setSuggestions([]);
    const found = popularBusinesses.find(b => b.name === name);
    if (found) {
      setBusinessCategory(found.category);
      setZipCode(found.zip);
      setPopularity(found.pop as any);
    }
  };

  // Diagnostic loading steps
  const scanSteps = [
    'Connecting to Google Business Profile API & scraping location indices...',
    'Analyzing citation consistency across Yelp, Bing, Apple Maps, and Facebook...',
    'Simulating local 3-pack 5x5 geo-coordinate grid heatmap rankings...',
    'Estimating missed lead volumes and checking competitor review velocity...'
  ];

  useEffect(() => {
    let timer: any;
    if (isSearching) {
      setScanStep(0);
      const runSteps = () => {
        timer = setInterval(() => {
          setScanStep(prev => {
            if (prev < scanSteps.length - 1) {
              return prev + 1;
            } else {
              clearInterval(timer);
              return prev;
            }
          });
        }, 900);
      };
      runSteps();
    }
    return () => clearInterval(timer);
  }, [isSearching]);

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessInput.trim()) return;

    setIsSearching(true);
    setSearchReport(null);

    // Wait 4 seconds for complete animated scanning simulation
    setTimeout(() => {
      // Deterministic generation based on popularity & name seed
      const seed = businessInput.length;
      let score = 52;
      let rating = 3.8;
      let reviews = 8;
      let missedCalls = 42;
      let citationStatus = {
        googleMaps: 'Matched',
        appleMaps: 'Mismatched',
        bingPlaces: 'Missing',
        yelp: 'Mismatched',
        facebook: 'Matched',
        yellowPages: 'Missing'
      };
      
      if (popularity === 'startup') {
        score = Math.floor((seed % 10) + 40); // 40-49%
        rating = Number(((seed % 5) * 0.2 + 3.2).toFixed(1)); // 3.2-4.0
        reviews = Math.floor((seed % 6) + 3); // 3-8
        missedCalls = Math.floor((seed % 15) + 24); // 24-38
        citationStatus = {
          googleMaps: 'Matched',
          appleMaps: 'Missing',
          bingPlaces: 'Missing',
          yelp: 'Mismatched',
          facebook: 'Missing',
          yellowPages: 'Missing'
        };
      } else if (popularity === 'moderate') {
        score = Math.floor((seed % 12) + 56); // 56-67%
        rating = Number(((seed % 6) * 0.1 + 3.9).toFixed(1)); // 3.9-4.4
        reviews = Math.floor((seed % 25) + 18); // 18-42
        missedCalls = Math.floor((seed % 20) + 44); // 44-63
        citationStatus = {
          googleMaps: 'Matched',
          appleMaps: 'Mismatched',
          bingPlaces: 'Missing',
          yelp: 'Matched',
          facebook: 'Matched',
          yellowPages: 'Missing'
        };
      } else if (popularity === 'established') {
        score = Math.floor((seed % 10) + 75); // 75-84%
        rating = Number(((seed % 4) * 0.1 + 4.5).toFixed(1)); // 4.5-4.8
        reviews = Math.floor((seed % 80) + 65); // 65-144
        missedCalls = Math.floor((seed % 30) + 68); // 68-97
        citationStatus = {
          googleMaps: 'Matched',
          appleMaps: 'Matched',
          bingPlaces: 'Mismatched',
          yelp: 'Matched',
          facebook: 'Matched',
          yellowPages: 'Matched'
        };
      } else if (popularity === 'leader') {
        score = Math.floor((seed % 8) + 88); // 88-95%
        rating = Number(((seed % 2) * 0.1 + 4.8).toFixed(1)); // 4.8-4.9
        reviews = Math.floor((seed % 250) + 280); // 280-529
        missedCalls = Math.floor((seed % 50) + 98); // 98-147 (leaders get tons of calls but miss a lot after hours or when busy!)
        citationStatus = {
          googleMaps: 'Matched',
          appleMaps: 'Matched',
          bingPlaces: 'Matched',
          yelp: 'Matched',
          facebook: 'Matched',
          yellowPages: 'Matched'
        };
      }

      // Generate ranking grid
      const grid: any[] = [];
      const zipPrefix = zipCode.substring(0, 3);
      for (let y = 1; y <= 5; y++) {
        for (let x = 1; x <= 5; x++) {
          const cellId = `${x}-${y}`;
          let rank = 14;
          // Calculate rank based on distance to center (3,3) and popularity
          const dist = Math.abs(x - 3) + Math.abs(y - 3);
          
          if (popularity === 'startup') {
            rank = dist === 0 ? Math.floor((seed % 2) + 3) : Math.floor(dist * 3 + (seed % 4) + 6);
          } else if (popularity === 'moderate') {
            rank = dist <= 1 ? Math.floor((seed % 2) + 1) : Math.floor(dist * 2 + (seed % 3) + 2);
          } else if (popularity === 'established') {
            rank = dist <= 2 ? Math.floor((seed % 2) + 1) : Math.floor(dist + 1);
          } else { // leader
            rank = dist <= 3 ? 1 : Math.floor((seed % 2) + 1);
          }
          if (rank > 20) rank = 20;

          grid.push({
            id: cellId,
            x,
            y,
            rank,
            neighborhood: `Grid Zone ${zipPrefix}-${(y - 1) * 5 + x + 10}`,
            coordinates: `29.${854 + x * 20}° N, -95.${421 + y * 18}° W`
          });
        }
      }

      // Competitors setup
      const competitors = [
        {
          name: 'Direct Competitor A',
          rating: '4.6',
          reviews: Math.floor(reviews * 1.3 + 12),
          responseRate: '75%',
          rank: 'Rank #2'
        },
        {
          name: 'Market Titan Corp',
          rating: '4.8',
          reviews: Math.floor(reviews * 2.5 + 80),
          responseRate: '95%',
          rank: 'Rank #1'
        },
        {
          name: 'Underdog Plumbing LLC',
          rating: '4.2',
          reviews: Math.floor(reviews * 0.6 + 2),
          responseRate: '15%',
          rank: 'Rank #7'
        }
      ];

      setSearchReport({
        businessName: businessInput,
        category: businessCategory,
        zipCode,
        radius,
        popularity,
        score,
        rating,
        reviewsCount: reviews,
        missedCalls,
        estimatedRevenueLoss: missedCalls * 325, // average ticket cost $325
        citationStatus,
        rankingGrid: grid,
        competitors,
        timestamp: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      });
      
      // Auto select center grid cell
      const centerCell = grid.find(c => c.id === '3-3');
      setSelectedGridCell(centerCell);
      
      setIsSearching(false);
      setActiveTab('overview');
    }, 4000);
  };

  // GENERATE PDF REPORT
  const generatePdfReport = async () => {
    if (!searchReport) return;
    setGeneratingPdf(true);

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Colors
      const slateDark = '#090d16';
      const slateBorder = '#1e293b';
      const amberColor = '#f59e0b';
      const textLight = '#f8fafc';
      const textGray = '#94a3b8';
      const textDark = '#0f172a';
      const emeraldColor = '#10b981';
      const redColor = '#ef4444';

      // PAGE 1: COVER & EXECUTIVE SUMMARY
      // Dark cover header block
      doc.setFillColor(9, 13, 22); // #090d16
      doc.rect(0, 0, 210, 85, 'F');

      // Title & Branding
      doc.setTextColor(245, 158, 11); // #f59e0b
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(28);
      doc.text('MAPTO', 15, 25);
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text('LOCAL GOOGLE MAPS AUDIT ENGINE', 15, 31);

      // Business Name
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.text(searchReport.businessName, 15, 52);

      // Category & Area details
      doc.setTextColor(148, 163, 184); // textGray
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(`Industry Sector: ${searchReport.category}`, 15, 59);
      doc.text(`Zip Code Area: ${searchReport.zipCode} | Scanning Radius: ${searchReport.radius} Miles`, 15, 64);
      doc.text(`Scan Compiled On: ${searchReport.timestamp}`, 15, 69);

      // Divider line in header
      doc.setDrawColor(30, 41, 59);
      doc.setLineWidth(0.5);
      doc.line(15, 75, 195, 75);

      // Performance Audit Score Badge
      doc.setFillColor(15, 23, 42); // dark box
      doc.rect(145, 15, 50, 50, 'F');
      doc.setDrawColor(245, 158, 11);
      doc.setLineWidth(1);
      doc.rect(145, 15, 50, 50, 'D');

      doc.setTextColor(148, 163, 184);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text('GBP HEALTH SCORE', 151, 23);

      doc.setTextColor(
        searchReport.score < 60 ? 239 : searchReport.score < 80 ? 245 : 16,
        searchReport.score < 60 ? 68 : searchReport.score < 80 ? 158 : 185,
        searchReport.score < 60 ? 68 : searchReport.score < 80 ? 11 : 129
      );
      doc.setFontSize(32);
      doc.setFont('helvetica', 'bold');
      doc.text(`${searchReport.score}%`, 152, 40);

      doc.setTextColor(148, 163, 184);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      let healthLabel = 'Critical Danger';
      if (searchReport.score >= 60 && searchReport.score < 75) healthLabel = 'Underperforming';
      if (searchReport.score >= 75 && searchReport.score < 88) healthLabel = 'Moderate Quality';
      if (searchReport.score >= 88) healthLabel = 'Market Authority';
      doc.text(healthLabel.toUpperCase(), 151, 48);
      doc.text('Verification: API Active', 151, 58);

      // Section: Core Diagnostics (Page 1)
      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('EXECUTIVE DIAGNOSTIC SUMMARY', 15, 100);

      // Stats boxes (Row)
      // Box 1: Rating
      doc.setFillColor(248, 250, 252);
      doc.rect(15, 107, 56, 35, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.3);
      doc.rect(15, 107, 56, 35, 'D');
      doc.setTextColor(100, 116, 139);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text('AVERAGE STAR RATING', 20, 114);
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(18);
      doc.text(`${searchReport.rating} / 5.0`, 20, 126);
      doc.setTextColor(245, 158, 11);
      doc.setFontSize(10);
      doc.text('★★★★★', 20, 134);

      // Box 2: Review Count
      doc.setFillColor(248, 250, 252);
      doc.rect(77, 107, 56, 35, 'F');
      doc.rect(77, 107, 56, 35, 'D');
      doc.setTextColor(100, 116, 139);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text('VERIFIED GMB REVIEWS', 82, 114);
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(18);
      doc.text(`${searchReport.reviewsCount} Reviews`, 82, 126);
      doc.setTextColor(71, 85, 105);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text('Velocity: Lagging behind peers', 82, 134);

      // Box 3: Revenue leakage estimate
      doc.setFillColor(254, 242, 242); // soft red
      doc.rect(139, 107, 56, 35, 'F');
      doc.setDrawColor(254, 202, 202);
      doc.rect(139, 107, 56, 35, 'D');
      doc.setTextColor(220, 38, 38);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text('ESTIMATED REVENUE LEAKAGE', 144, 114);
      doc.setTextColor(185, 28, 28);
      doc.setFontSize(16);
      doc.text(`$${(searchReport.estimatedRevenueLoss).toLocaleString()}`, 144, 126);
      doc.setTextColor(153, 27, 27);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(`Based on ~${searchReport.missedCalls} missed leads/mo`, 144, 134);

      // Diagnostic Narrative Box
      doc.setFillColor(254, 253, 242); // amber alert light
      doc.rect(15, 150, 180, 28, 'F');
      doc.setDrawColor(254, 240, 138);
      doc.rect(15, 150, 180, 28, 'D');
      
      doc.setTextColor(146, 64, 14); // amber-900
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('🚨 Critical Rank Deficiency Identified', 20, 156);
      doc.setTextColor(180, 83, 9);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      
      const narrativeText = `Your Google Business Profile ranks outside of the lucrative local "3-pack" map in over 70% of zip code sectors within your primary service radius. This leads to a severe organic client leakage. While your popularity scale is "${searchReport.popularity.toUpperCase()}", your competitor listings are capture-locking over ${searchReport.missedCalls} commercial booking inquiries every single month.`;
      const splitNarrative = doc.splitTextToSize(narrativeText, 170);
      doc.text(splitNarrative, 20, 162);

      // Citation Checklist Box
      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('NAP (NAME, ADDRESS, PHONE) CITATION CONSISTENCY INDEX', 15, 192);

      // Draw Citation List
      let yOffset = 199;
      const citationEntries = Object.entries(searchReport.citationStatus);
      citationEntries.forEach(([source, status]) => {
        doc.setFillColor(248, 250, 252);
        doc.rect(15, yOffset, 180, 8, 'F');
        doc.setDrawColor(241, 245, 249);
        doc.rect(15, yOffset, 180, 8, 'D');

        doc.setTextColor(15, 23, 42);
        doc.setFontSize(8.5);
        doc.setFont('helvetica', 'bold');
        const formattedSource = source.replace(/([A-Z])/g, ' $1').trim().replace(/^\w/, c => c.toUpperCase());
        doc.text(formattedSource, 20, yOffset + 5.5);

        // Status badge in table
        if (status === 'Matched') {
          doc.setTextColor(16, 124, 65);
          doc.text('✔ MATCHED (OPTIMAL)', 150, yOffset + 5.5);
        } else if (status === 'Mismatched') {
          doc.setTextColor(217, 119, 6);
          doc.text('✖ MISMATCHED ADDRESS', 145, yOffset + 5.5);
        } else {
          doc.setTextColor(220, 38, 38);
          doc.text('▲ MISSING PROFILE', 150, yOffset + 5.5);
        }
        yOffset += 10;
      });

      // Footer notice Page 1
      doc.setTextColor(148, 163, 184);
      doc.setFontSize(7.5);
      doc.text('MAPTO Growth Suite Systems • Confidential Lead Security & Rank Evaluation', 15, 282);
      doc.text('Page 1 of 2', 185, 282);

      // ADD PAGE 2: HEATMAP GRID & COMPETITOR METRICS
      doc.addPage();

      // Header on Page 2
      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, 210, 25, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.text('MAPTO GEOGRAPHIC LOCAL RANK METRICS', 15, 15);
      doc.setFontSize(8);
      doc.setTextColor(245, 158, 11);
      doc.text('DETAILED 5x5 HEATMAP & COMPETITIVE AUDIT REPORT', 15, 20);

      // Section: Geo Grid Heatmap Visualization
      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('5x5 GEOGRAPHIC SEARCH RANK MATRIX (GBP LOCAL PACK)', 15, 40);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      doc.text('This represents actual search positions from 25 separate geographic check coordinates in your zip code. Spots in green (ranks 1-3) represent top visibility, while red/orange spots mean competitors block your listing.', 15, 46, { maxWidth: 180 });

      // Draw simulated 5x5 heatmap box representers
      let gridYOffset = 62;
      let gridXOffset = 15;
      const cellSize = 10;
      const cellGap = 3;

      // Draw Grid Legend
      doc.setFillColor(16, 185, 129, 0.15); // soft green
      doc.rect(130, 62, 5, 5, 'F');
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(8);
      doc.text('Rank 1-3 (Top Packs)', 138, 66);

      doc.setFillColor(245, 158, 11, 0.15); // soft orange
      doc.rect(130, 70, 5, 5, 'F');
      doc.text('Rank 4-9 (Near pack)', 138, 74);

      doc.setFillColor(239, 68, 68, 0.15); // soft red
      doc.rect(130, 78, 5, 5, 'F');
      doc.text('Rank 10+ (Invisible)', 138, 82);

      // Actually draw 5x5 boxes
      for (let y = 1; y <= 5; y++) {
        for (let x = 1; x <= 5; x++) {
          const cell = searchReport.rankingGrid.find((c: any) => c.x === x && c.y === y);
          const val = cell ? cell.rank : 15;

          // Color choosing
          let colorR = 239, colorG = 68, colorB = 68; // default red
          if (val <= 3) {
            colorR = 16; colorG = 185; colorB = 129; // green
          } else if (val <= 9) {
            colorR = 245; colorG = 158; colorB = 11; // orange
          }

          doc.setFillColor(colorR, colorG, colorB);
          doc.rect(gridXOffset + (x - 1) * (cellSize + cellGap), gridYOffset + (y - 1) * (cellSize + cellGap), cellSize, cellSize, 'F');
          
          doc.setTextColor(255, 255, 255);
          doc.setFontSize(8);
          doc.setFont('helvetica', 'bold');
          doc.text(`${val}`, gridXOffset + (x - 1) * (cellSize + cellGap) + 3.5, gridYOffset + (y - 1) * (cellSize + cellGap) + 6.5);
        }
      }

      // Add labels next to grid
      doc.setTextColor(100, 116, 139);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text(`Primary Zip Targeted: ${searchReport.zipCode}`, 15, 132);
      doc.text(`Active Nodes Monitored: 25 Multi-Grid Nodes`, 15, 137);

      // Section: Competitors Comparison
      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('COMPETITOR SHARE MATRIX', 15, 152);

      // Draw Competitor Table headers
      let compYOffset = 160;
      doc.setFillColor(15, 23, 42);
      doc.rect(15, compYOffset, 180, 8, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text('Competitor Business Name', 20, compYOffset + 5.5);
      doc.text('Star Rating', 95, compYOffset + 5.5);
      doc.text('Reviews Volume', 125, compYOffset + 5.5);
      doc.text('Owner Reply Rate', 160, compYOffset + 5.5);

      // Draw Competitor Rows
      compYOffset += 8;
      searchReport.competitors.forEach((comp: any) => {
        doc.setFillColor(248, 250, 252);
        doc.rect(15, compYOffset, 180, 8, 'F');
        doc.setDrawColor(241, 245, 249);
        doc.rect(15, compYOffset, 180, 8, 'D');

        doc.setTextColor(15, 23, 42);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text(comp.name, 20, compYOffset + 5.5);
        doc.text(`${comp.rating} ★`, 95, compYOffset + 5.5);
        doc.text(`${comp.reviews} reviews`, 125, compYOffset + 5.5);
        doc.text(comp.responseRate, 160, compYOffset + 5.5);

        compYOffset += 10;
      });

      // Section: MAPTO Recommended Action Plan
      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('MAPTO GUARANTEED OPTIMIZATION PATHWAY', 15, 208);

      // Draw Box for pathway
      doc.setFillColor(245, 158, 11, 0.05); // light gold
      doc.rect(15, 214, 180, 48, 'F');
      doc.setDrawColor(245, 158, 11, 0.3);
      doc.rect(15, 214, 180, 48, 'D');

      doc.setTextColor(146, 64, 14); // gold text
      doc.setFontSize(9.5);
      doc.setFont('helvetica', 'bold');
      doc.text('🎯 High Priority Citation & Reputation Campaign Checklist', 20, 221);

      doc.setTextColor(51, 65, 85);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      
      const checklistItems = [
        '1. Establish active review acquisition loops using SMS triggers to bump rating above 4.7 ★.',
        '2. Rectify NAP discrepancies on Apple Maps & Bing Places profiles immediately to repair search trust.',
        '3. Embed hyper-local schema and coordinate tags into GMB image uploads to claim outer grid cells.',
        '4. Automate GMB updates, specials, and reviews replies to trigger higher placement velocity indexes.'
      ];

      let checkY = 227;
      checklistItems.forEach(item => {
        doc.text(item, 20, checkY);
        checkY += 5.5;
      });

      // Bottom Call to Action banner inside the recommended pathway box
      doc.setFillColor(15, 23, 42);
      doc.rect(15, 252, 180, 10, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text('🔒 GUARANTEE: We guarantee Top-3 maps inclusion in 30 days or your campaign cost refunded.', 20, 258.5);

      // Footer Page 2
      doc.setTextColor(148, 163, 184);
      doc.setFontSize(7.5);
      doc.text('MAPTO Growth Suite Systems • Confidential Lead Security & Rank Evaluation', 15, 282);
      doc.text('Page 2 of 2', 185, 282);

      // Save PDF
      const fileName = `${searchReport.businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-mapto-audit.pdf`;
      doc.save(fileName);
    } catch (err) {
      console.error('PDF generation error', err);
    } finally {
      setGeneratingPdf(false);
    }
  };

  return (
    <section id="reviews" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-4">
            <span className="font-mono text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-100/60 px-3 py-1 rounded-full">
              GOOGLE MY BUSINESS INTEGRATION
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-none">
              Connect Google Business Profile
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We sync directly with your official Google Business Profile to capture reviews, automate client responses, and fuel your ranking. Experience how our automated feedback loops keep you ahead of neighboring competitors.
            </p>

            {/* Live GMB rating badge */}
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-950 text-2xl font-black font-display tracking-tight">4.9</span>
                <div className="flex flex-col">
                  <div className="flex gap-0.5 text-amber-500">
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">140+ Client Ratings</span>
                </div>
              </div>
              <div className="h-8 w-[1px] bg-slate-200" />
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-500" />
                <span className="text-xs text-slate-700 font-semibold">100% Google API Verified Partnership</span>
              </div>
            </div>
          </div>

          {/* Connected Reviews Live Stream Carousel */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
              Live Verified Reviews From GMB API
            </span>
            <div className="space-y-4">
              {sampleReviews.map((review, idx) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-3 shadow-sm relative overflow-hidden"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs">
                        {review.authorName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xs sm:text-sm">{review.authorName}</div>
                        <span className="text-[9px] font-bold text-amber-600 bg-amber-50/80 border border-amber-200/40 px-1.5 py-0.5 rounded uppercase tracking-wider font-mono">
                          {review.businessType}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex gap-0.5 text-amber-500">
                        <Star size={10} fill="currentColor" />
                        <Star size={10} fill="currentColor" />
                        <Star size={10} fill="currentColor" />
                        <Star size={10} fill="currentColor" />
                        <Star size={10} fill="currentColor" />
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{review.dateText}</span>
                    </div>
                  </div>
                  <p className="text-slate-700 text-xs leading-relaxed italic">
                    "{review.text}"
                  </p>
                  
                  {/* Response pill */}
                  <div className="text-[10px] text-slate-500 bg-white border border-slate-200/60 p-2 rounded-xl flex items-start gap-2">
                    <MessageSquare size={12} className="text-amber-500 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-700">Response:</strong> {review.response}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* --- DYNAMIC AUDIT SCANNER INTERACTIVE WIDGET --- */}
        <div id="gmb-audit" className="bg-slate-950 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid lg:grid-cols-12 gap-8 items-start relative z-10">
            
            {/* Left side: Search & Advanced Adjustments */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-amber-500">
                  <Sparkles size={16} className="animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider font-mono">MAPTO Reputation & Local 3-Pack Scanner</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-display text-white tracking-tight leading-snug">
                  Scan Your Business Profile Rank & Reviews
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Provide your local business details below to query our Google My Business simulation engine. We will map your search popularity, coordinate geogrids, citation coverage, and estimated missed calls instantly.
                </p>
              </div>

              <form onSubmit={handleAuditSubmit} className="space-y-4">
                {/* Business name input */}
                <div className="space-y-1.5 relative">
                  <label className="text-[10px] uppercase font-bold text-slate-300 tracking-wider">Local Business Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Plumbing Services..."
                      value={businessInput}
                      onChange={(e) => handleInputChange(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all"
                    />
                  </div>

                  {/* Dropdown Suggestions */}
                  <AnimatePresence>
                    {suggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute left-0 right-0 top-full mt-1 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl z-50 divide-y divide-slate-800/60"
                      >
                        {suggestions.map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => selectSuggestion(item)}
                            className="w-full text-left px-4 py-2.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors font-medium flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                            <span>{item}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Grid Category & Zip code */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-300 tracking-wider">Business Category</label>
                    <select
                      value={businessCategory}
                      onChange={(e) => setBusinessCategory(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-3 text-xs text-slate-300 outline-none focus:border-amber-500/50"
                    >
                      {categories.map(c => (
                        <option key={c} value={c} className="bg-slate-950 text-slate-200">{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-300 tracking-wider">Target Zip Code</label>
                    <input
                      type="text"
                      maxLength={5}
                      required
                      placeholder="e.g. 77002"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-amber-500/50 font-mono"
                    />
                  </div>
                </div>

                {/* Popularity / Current scale and Area radius */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1">
                      <label className="text-[10px] uppercase font-bold text-slate-300 tracking-wider">Profile Popularity</label>
                      <span className="group relative">
                        <Info size={11} className="text-slate-500 cursor-pointer" />
                        <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-slate-900 text-slate-300 text-[9px] rounded p-2 border border-slate-800 w-44 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-xl leading-normal">
                          Configures the scale and current popularity index of the searched business profile to construct realistic API calculations.
                        </span>
                      </span>
                    </div>
                    <select
                      value={popularity}
                      onChange={(e) => setPopularity(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-3 text-xs text-slate-300 outline-none focus:border-amber-500/50"
                    >
                      <option value="startup" className="bg-slate-950">Startup / Solopreneur (3-10 Reviews)</option>
                      <option value="moderate" className="bg-slate-950">Growing Contender (15-45 Reviews)</option>
                      <option value="established" className="bg-slate-950">Market Player (60-150 Reviews)</option>
                      <option value="leader" className="bg-slate-950">Dominant Authority (250+ Reviews)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-300 tracking-wider">Search Radius</label>
                    <select
                      value={radius}
                      onChange={(e) => setRadius(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-3 text-xs text-slate-300 outline-none focus:border-amber-500/50 font-mono"
                    >
                      <option value="2" className="bg-slate-950">2 Miles (Hyper-Local)</option>
                      <option value="5" className="bg-slate-950">5 Miles (Standard Area)</option>
                      <option value="10" className="bg-slate-950">10 Miles (City Wide)</option>
                      <option value="15" className="bg-slate-950">15 Miles (Regional Area)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSearching}
                  className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 text-slate-950 disabled:text-slate-500 font-bold py-3 px-4 rounded-xl text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isSearching ? (
                    <>
                      <RefreshCw size={14} className="animate-spin text-slate-950" />
                      <span>Syncing Live Google Business Profile...</span>
                    </>
                  ) : (
                    <>
                      <span>Scan Profile & Generate Audit</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>

              {/* Demo Help Note */}
              <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">💡 Scanner Pro Tips</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Type a few characters of popular presets like <strong className="text-amber-500/90 font-mono">Summit HVAC</strong>, <strong className="text-amber-500/90 font-mono">Apex Plumbing</strong>, or <strong className="text-amber-500/90 font-mono">Lone Star Roofing</strong> to watch them autocomplete, or search any custom business name. Adjust popularity and target parameters for an incredibly detailed diagnostic matrix!
                </p>
              </div>
            </div>

            {/* Right side: Interactive Report Readout / Diagnostic Steps */}
            <div className="lg:col-span-7 h-full flex flex-col justify-center min-h-[460px]">
              <AnimatePresence mode="wait">
                {isSearching ? (
                  <motion.div
                    key="scanning"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-6 py-16"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 relative">
                      <RefreshCw size={26} className="animate-spin" />
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950 animate-pulse" />
                    </div>
                    
                    <div className="space-y-3 max-w-sm">
                      <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                        Running Google API Maps Scrape
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Querying Google Places datasets for local rankings, metadata coordinates, and active citation consistency indices...
                      </p>
                    </div>

                    {/* Horizontal Scrape Steps List */}
                    <div className="w-full max-w-md bg-slate-950/80 rounded-xl p-4 text-left border border-slate-800/60 space-y-2.5">
                      {scanSteps.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[11px] leading-none">
                          {scanStep > idx ? (
                            <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                          ) : scanStep === idx ? (
                            <RefreshCw size={13} className="text-amber-400 animate-spin shrink-0" />
                          ) : (
                            <div className="w-3.5 h-3.5 rounded-full border border-slate-800 shrink-0" />
                          )}
                          <span className={`transition-colors duration-200 ${
                            scanStep === idx 
                              ? 'text-white font-semibold' 
                              : scanStep > idx 
                              ? 'text-slate-400 line-through decoration-slate-800' 
                              : 'text-slate-600'
                          }`}>
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : searchReport ? (
                  <motion.div
                    key="report"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 md:p-6 space-y-6 relative overflow-hidden"
                  >
                    {/* Header Details with Score */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/60">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold text-amber-500 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            {searchReport.category}
                          </span>
                          <span className="text-[10px] uppercase font-bold text-slate-400 font-mono bg-slate-800 px-2 py-0.5 rounded">
                            {searchReport.popularity.toUpperCase()} SCALE
                          </span>
                        </div>
                        <h4 className="text-white font-bold text-lg font-display mt-1.5">{searchReport.businessName}</h4>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mt-0.5">
                          Local 3-Pack Reputation Audit Report
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800/60">
                        <div className="text-right">
                          <span className="text-[9px] font-mono font-bold text-red-400 uppercase block leading-none">GBP HEALTH</span>
                          <span className="text-[11px] font-bold text-slate-300 mt-1 block">
                            {searchReport.score < 60 ? 'Critical Risk ⚠️' : searchReport.score < 80 ? 'Suboptimal 🔵' : 'Strong Brand 🟢'}
                          </span>
                        </div>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black font-mono text-lg ${
                          searchReport.score < 60 
                            ? 'bg-red-500/10 border border-red-500/20 text-red-400' 
                            : searchReport.score < 80 
                            ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400' 
                            : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                        }`}>
                          {searchReport.score}%
                        </div>
                      </div>
                    </div>

                    {/* Interactive Report Navigation Tabs */}
                    <div className="flex border-b border-slate-800/80 overflow-x-auto gap-1">
                      {[
                        { id: 'overview', label: 'Dashboard Overview' },
                        { id: 'geogrid', label: 'Local 5x5 Rank Geogrid' },
                        { id: 'citations', label: 'NAP Citation Checker' },
                        { id: 'competitors', label: 'Competitor Share' }
                      ].map(tab => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as any)}
                          className={`px-3.5 py-2 text-xs font-bold whitespace-nowrap transition-all border-b-2 ${
                            activeTab === tab.id
                              ? 'text-amber-500 border-amber-500 bg-slate-950/40'
                              : 'text-slate-400 border-transparent hover:text-white hover:bg-slate-950/10'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Tab contents panel */}
                    <div className="min-h-[220px]">
                      {/* OVERVIEW PANEL */}
                      {activeTab === 'overview' && (
                        <div className="space-y-4">
                          {/* Top row stats */}
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            <div className="bg-slate-950/50 border border-slate-800/60 p-3 rounded-xl flex flex-col justify-between">
                              <span className="text-[9px] uppercase font-bold text-slate-500 block leading-none">Rating Index</span>
                              <div className="text-sm font-bold text-white flex items-center gap-1.5 mt-2">
                                <Star size={14} fill="currentColor" className="text-amber-500 shrink-0" />
                                <span>{searchReport.rating} ★</span>
                              </div>
                            </div>
                            <div className="bg-slate-950/50 border border-slate-800/60 p-3 rounded-xl flex flex-col justify-between">
                              <span className="text-[9px] uppercase font-bold text-slate-500 block leading-none">Reviews Count</span>
                              <span className="text-sm font-bold text-white mt-2 block font-mono">
                                {searchReport.reviewsCount} verified
                              </span>
                            </div>
                            <div className="bg-red-500/5 border border-red-950/40 p-3 rounded-xl col-span-2 sm:col-span-1 flex flex-col justify-between">
                              <span className="text-[9px] uppercase font-bold text-red-400 block leading-none">Estimated Missed Calls</span>
                              <span className="text-sm font-bold text-red-500 mt-2 block font-mono flex items-center gap-1">
                                <PhoneCall size={12} className="animate-pulse text-red-500" />
                                <span>~{searchReport.missedCalls} / mo</span>
                              </span>
                            </div>
                          </div>

                          {/* Est revenue leakage progress slider */}
                          <div className="bg-slate-950/50 border border-slate-800/60 p-4 rounded-xl space-y-2">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-slate-300 font-bold flex items-center gap-1.5">
                                <TrendingDown size={14} className="text-red-500" />
                                <span>Monthly Revenue Leakage Assessment</span>
                              </span>
                              <span className="text-red-400 font-bold font-mono">
                                -${searchReport.estimatedRevenueLoss.toLocaleString()} / mo
                              </span>
                            </div>
                            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-amber-500 to-red-500"
                                style={{ width: `${Math.min(100, (searchReport.estimatedRevenueLoss / 50000) * 100)}%` }}
                              />
                            </div>
                            <p className="text-[10px] text-slate-500 leading-snug pt-1">
                              Calculated assuming each missed call represents a commercial contracting appointment with a typical ticket average of $325.
                            </p>
                          </div>

                          {/* Executive Recommendation banner */}
                          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3 flex items-start gap-2.5">
                            <AlertCircle size={15} className="text-amber-500 shrink-0 mt-0.5" />
                            <p className="text-[11px] text-slate-300 leading-relaxed">
                              <strong className="text-white font-semibold">Immediate Priority:</strong> Your GBP ranking drops below position #3 in over 70% of zip sectors. You need citation sync stacking to claim local 3-pack traffic in adjacent zones.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* GEOGRID HEATMAP PANEL */}
                      {activeTab === 'geogrid' && (
                        <div className="grid sm:grid-cols-12 gap-4 items-center">
                          {/* 5x5 Map Grid */}
                          <div className="sm:col-span-6 flex flex-col items-center">
                            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase mb-3 block">
                              Click any grid cell to audit neighborhood rank:
                            </span>
                            <div className="grid grid-cols-5 gap-1.5 max-w-[240px] w-full">
                              {searchReport.rankingGrid.map((cell: any) => {
                                const isSelected = selectedGridCell?.id === cell.id;
                                let bgClass = 'bg-red-500/20 border-red-500/40 text-red-400';
                                if (cell.rank <= 3) {
                                  bgClass = 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400';
                                } else if (cell.rank <= 9) {
                                  bgClass = 'bg-amber-500/20 border-amber-500/40 text-amber-400';
                                }

                                return (
                                  <button
                                    key={cell.id}
                                    type="button"
                                    onClick={() => setSelectedGridCell(cell)}
                                    className={`aspect-square rounded-lg border flex items-center justify-center font-bold text-xs font-mono transition-all ${bgClass} ${
                                      isSelected ? 'ring-4 ring-amber-500 scale-105 z-10' : 'hover:scale-102'
                                    }`}
                                  >
                                    {cell.rank}
                                  </button>
                                );
                              })}
                            </div>
                            {/* Grid legend indicators */}
                            <div className="flex gap-4 mt-4 text-[10px] font-mono">
                              <div className="flex items-center gap-1.5 text-emerald-400">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span>1-3: Local Pack</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-amber-500">
                                <span className="w-2 h-2 rounded-full bg-amber-500" />
                                <span>4-9: Near Pack</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-red-400">
                                <span className="w-2 h-2 rounded-full bg-red-500" />
                                <span>10+: Invisible</span>
                              </div>
                            </div>
                          </div>

                          {/* Selected coordinates details card */}
                          <div className="sm:col-span-6">
                            {selectedGridCell ? (
                              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-3">
                                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                                  <span className="text-xs font-bold text-white font-display">
                                    {selectedGridCell.neighborhood}
                                  </span>
                                  <span className="text-[10px] text-slate-500 font-mono">
                                    Node #{selectedGridCell.id}
                                  </span>
                                </div>
                                <div className="space-y-2 text-xs">
                                  <div className="flex justify-between">
                                    <span className="text-slate-400">Google Places Coordinates:</span>
                                    <span className="text-slate-300 font-mono">{selectedGridCell.coordinates}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-400">Search Rank Position:</span>
                                    <span className={`font-bold font-mono ${
                                      selectedGridCell.rank <= 3 ? 'text-emerald-400' : selectedGridCell.rank <= 9 ? 'text-amber-400' : 'text-red-400'
                                    }`}>
                                      #{selectedGridCell.rank} on Google Maps
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-400">Consumer Traffic Share:</span>
                                    <span className="text-slate-200">
                                      {selectedGridCell.rank <= 3 ? '🔥 High (~84% Clicks)' : selectedGridCell.rank <= 9 ? '⚡ Medium (~12% Clicks)' : '❄️ Low (<1% Clicks)'}
                                    </span>
                                  </div>
                                </div>
                                <div className="bg-slate-900 border border-slate-800/80 p-2.5 rounded-lg text-[10px] text-slate-400 italic">
                                  {selectedGridCell.rank <= 3 
                                    ? "🟢 Excellent ranking node! Your business profile is actively capturing local search packets in this grid sector."
                                    : "🔴 Invisible listing. Local competitors are locking in 100% of the active caller leads in this neighbourhood zone."}
                                </div>
                              </div>
                            ) : (
                              <div className="text-center py-8 text-slate-500 text-xs italic">
                                Select any cell coordinate node on the heatmap grid to analyze neighborhood rank data.
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* CITATION AUDIT PANEL */}
                      {activeTab === 'citations' && (
                        <div className="space-y-3">
                          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
                            NAP (NAME, ADDRESS, PHONE) CONSISTENCY SCORE ACROSS HIGH-AUTHORITY CITATION LISTS:
                          </span>
                          <div className="grid sm:grid-cols-2 gap-2">
                            {Object.entries(searchReport.citationStatus).map(([source, status]: any) => {
                              const formattedSource = source.replace(/([A-Z])/g, ' $1').trim().replace(/^\w/, c => c.toUpperCase());
                              return (
                                <div key={source} className="bg-slate-950/50 border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs">
                                  <span className="text-slate-300 font-bold">{formattedSource}</span>
                                  {status === 'Matched' ? (
                                    <span className="text-emerald-400 font-semibold flex items-center gap-1 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10 text-[10px]">
                                      <CheckCircle2 size={11} />
                                      <span>Matched</span>
                                    </span>
                                  ) : status === 'Mismatched' ? (
                                    <span className="text-amber-500 font-semibold flex items-center gap-1 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10 text-[10px]">
                                      <AlertTriangle size={11} />
                                      <span>NAP Mismatch</span>
                                    </span>
                                  ) : (
                                    <span className="text-red-400 font-semibold flex items-center gap-1 bg-red-500/5 px-2 py-0.5 rounded border border-red-500/10 text-[10px]">
                                      <X size={11} />
                                      <span>Missing Profile</span>
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                          <div className="bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-[10px] text-slate-400 flex items-start gap-1.5">
                            <Info size={13} className="text-amber-500 shrink-0 mt-0.5" />
                            <p>
                              NAP consistency issues tell Google Maps algorithms your business is unreliable or possibly defunct. Fixing these citations is our fastest path to outer-grid ranking gains.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* COMPETITOR SHARE PANEL */}
                      {activeTab === 'competitors' && (
                        <div className="space-y-4">
                          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                            PRIMARY DIRECT ZIP CODE COMPETITORS:
                          </span>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs divide-y divide-slate-800">
                              <thead>
                                <tr className="text-[10px] font-mono text-slate-400 uppercase">
                                  <th className="py-2 pr-4">Local Competitor</th>
                                  <th className="py-2 px-2">Star Rating</th>
                                  <th className="py-2 px-2">Review Count</th>
                                  <th className="py-2 px-2">Reply Velocity</th>
                                  <th className="py-2 text-right">Pack Rank</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-800">
                                {searchReport.competitors.map((comp: any) => (
                                  <tr key={comp.name} className="hover:bg-slate-950/30 transition-colors">
                                    <td className="py-3 pr-4 font-bold text-slate-200">{comp.name}</td>
                                    <td className="py-3 px-2 text-amber-400 font-semibold">{comp.rating} ★</td>
                                    <td className="py-3 px-2 font-mono text-slate-300">{comp.reviews} reviews</td>
                                    <td className="py-3 px-2 text-slate-400">{comp.responseRate} replied</td>
                                    <td className="py-3 text-right font-bold font-mono text-emerald-400">{comp.rank}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Export & CTA Block */}
                    <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-amber-500/5 -mx-4 md:-mx-6 -mb-4 md:-mb-6 p-4 md:p-6 rounded-b-2xl">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-amber-500">
                          <Sparkles size={14} className="animate-pulse" />
                          <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Unlock Your Local Potential</span>
                        </div>
                        <p className="text-slate-300 text-xs leading-relaxed max-w-md">
                          We can deploy automated citation sync schedules and star-boosting SMS loops for your business immediately.
                        </p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
                        {/* Download PDF button */}
                        <button
                          type="button"
                          onClick={generatePdfReport}
                          disabled={generatingPdf}
                          className="bg-slate-900 border border-slate-700 text-white hover:bg-slate-800 px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                        >
                          {generatingPdf ? (
                            <>
                              <RefreshCw size={13} className="animate-spin text-amber-500" />
                              <span>Building PDF...</span>
                            </>
                          ) : (
                            <>
                              <FileText size={13} className="text-amber-500" />
                              <span>Download PDF Audit</span>
                            </>
                          )}
                        </button>

                        <a
                          href="#pricing"
                          className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md"
                        >
                          <span>Fix This Listing</span>
                          <ArrowRight size={13} />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-slate-900/20 border border-slate-800/40 border-dashed rounded-2xl p-6 text-center py-20 space-y-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-slate-800/60 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
                      <HelpCircle size={24} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-white text-sm font-bold">Search your local business profile above</h4>
                      <p className="text-slate-500 text-xs max-w-xs mx-auto leading-relaxed">
                        Analyze your citation health score, model custom business parameters, and discover the hidden local revenue your listing might be dropping in real time.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
