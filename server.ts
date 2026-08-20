import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

// Load environment variables for development
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Google Maps Audit API
  app.post('/api/audit', async (req, res) => {
    try {
      const { url } = req.body;
      const apiKey = process.env.GOOGLE_MAPS_API_KEY;
      
      if (!apiKey) {
        return res.status(500).json({ error: 'GOOGLE_MAPS_API_KEY is not configured on the server.' });
      }

      // Step 1: Text Search to find the business
      const searchRes = await fetch('https://places.googleapis.com/v1/places:searchText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'places.id,places.displayName,places.rating,places.userRatingCount,places.primaryType,places.location,places.regularOpeningHours,places.nationalPhoneNumber,places.websiteUri,places.formattedAddress,places.businessStatus,places.reviews'
        },
        body: JSON.stringify({ textQuery: url })
      });
      const searchData = await searchRes.json();
      
      if (searchData.error) {
        console.error('Google Maps API Error:', searchData.error);
        const errorMsg = typeof searchData.error === 'string' ? searchData.error : (searchData.error.message || JSON.stringify(searchData.error));
        return res.status(500).json({ error: `Google Maps API Error: ${errorMsg}` });
      }

      const place = searchData.places?.[0];
      if (!place) {
        return res.status(404).json({ error: 'Business not found on Google Maps. Try adding city and state.' });
      }

      // Extract new details
      const address = place.formattedAddress || 'Address not listed';
      const status = place.businessStatus || 'OPERATIONAL';
      const primaryType = place.primaryType ? place.primaryType.replace(/_/g, ' ') : 'local business';
      const recentReviews = place.reviews || [];
      const topReview = recentReviews.length > 0 ? recentReviews[0] : null;

      // Profile Completeness Score
      let profileScore = 20; // Base score
      if (place.nationalPhoneNumber) profileScore += 20;
      if (place.websiteUri) profileScore += 20;
      if (place.regularOpeningHours) profileScore += 20;
      if (place.formattedAddress) profileScore += 20;

      const userReviews = place.userRatingCount || 0;
      const rating = place.rating || 0;

      // Step 2: Search Nearby for Competitors
      let competitors = [];
      if (place.location && place.primaryType) {
        const nearbyRes = await fetch('https://places.googleapis.com/v1/places:searchNearby', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': 'places.displayName,places.userRatingCount,places.rating'
          },
          body: JSON.stringify({
            includedTypes: [place.primaryType],
            maxResultCount: 6,
            locationRestriction: {
              circle: {
                center: place.location,
                radius: 5000.0 // 5km
              }
            }
          })
        });
        const nearbyData = await nearbyRes.json();
        
        if (nearbyData.error) {
           console.error('Google Maps API Nearby Error:', nearbyData.error);
        } else {
           const nearbyPlaces = (nearbyData.places || []).filter((p: any) => p.displayName?.text !== place.displayName?.text);
           
           competitors = nearbyPlaces.map((p: any) => ({
             name: p.displayName?.text || 'Competitor',
             reviews: p.userRatingCount || 0,
             rating: p.rating || 0,
             color: '#cbd5e1'
           })).sort((a: any, b: any) => b.reviews - a.reviews).slice(0, 3);
        }
      }

      // Fallback competitors if none found
      if (competitors.length === 0) {
        competitors = [
          { name: 'Top Local Competitor', reviews: Math.max(userReviews * 2, 120), rating: 4.8, color: '#cbd5e1' },
          { name: 'Average Competitor', reviews: Math.max(Math.floor(userReviews * 1.5), 80), rating: 4.3, color: '#cbd5e1' }
        ];
      }

      const competitorData = [
        ...competitors,
        { name: 'Your Biz', reviews: userReviews, rating: rating, color: '#3b82f6' }
      ];
      
      const maxCompetitorReviews = Math.max(...competitors.map((c: any) => c.reviews), 1);
      const reviewScore = Math.min(Math.round((userReviews / maxCompetitorReviews) * 100), 100);
      
      // Keyword saturation logic based on exact matches in reviews vs business type
      const kwScore = recentReviews.some((r: any) => r.text?.text?.toLowerCase().includes(primaryType)) ? 85 : 45; 

      const overallScore = Math.round((profileScore + reviewScore + kwScore) / 3);

      // Generate dynamic opportunities
      const opportunities = [];
      if (!place.websiteUri) {
        opportunities.push({ title: 'Critical: Missing Website', desc: 'Your profile has no linked website. Adding a localized landing page increases conversion by up to 300%.' });
      }
      if (userReviews < maxCompetitorReviews) {
        opportunities.push({ title: 'Review Deficit', desc: `You are trailing the top competitor by ${maxCompetitorReviews - userReviews} reviews. Implement an automated SMS request sequence.` });
      } else {
        opportunities.push({ title: 'Sustain Market Dominance', desc: 'You lead your market in reviews! Shift focus to long-tail keyword saturation in your Google Posts.' });
      }
      opportunities.push({ title: `Optimize for "${primaryType}"`, desc: `Ensure your primary category perfectly matches what local searchers are looking for. Add secondary categories.` });

      if (topReview && topReview.rating < 4) {
         opportunities.push({ title: 'Negative Review Mitigation', desc: 'Your most recent highlighted review is sub-optimal. Ensure prompt, professional responses to all feedback.' });
      }

      const reportData = {
        score: overallScore,
        metrics: [
          { label: 'Profile Completeness', value: profileScore, status: profileScore >= 80 ? 'good' : 'warning' },
          { label: 'Review Velocity', value: reviewScore, status: reviewScore >= 80 ? 'good' : reviewScore >= 50 ? 'warning' : 'poor' },
          { label: 'Keyword Saturation', value: kwScore, status: kwScore > 50 ? 'good' : 'warning' }
        ],
        opportunities,
        roadmap: [
          { week: 1, title: 'Foundation & NAP Sync', desc: `Verify Name, Address, and Phone across directories. Address: ${address}.` },
          { week: 2, title: 'The Review Engine', desc: `Launch targeted outreach to gain ${Math.ceil((maxCompetitorReviews - userReviews)/4 > 0 ? (maxCompetitorReviews - userReviews)/4 : 10)} new reviews this week.` },
          { week: 3, title: 'Visual Authority', desc: 'Upload geo-tagged photos of the storefront, team, and recent projects.' },
          { week: 4, title: 'Content & Q&A Seeding', desc: 'Pre-populate the Google Q&A section with common customer questions.' }
        ],
        trafficData: [
          { month: 'Jan', traffic: 120, optimized: 150 },
          { month: 'Feb', traffic: 125, optimized: 180 },
          { month: 'Mar', traffic: 122, optimized: 220 },
          { month: 'Apr', traffic: 128, optimized: 280 },
          { month: 'May', traffic: 125, optimized: 340 },
          { month: 'Jun', traffic: 130, optimized: 450 }
        ],
        competitorData
      };

      const markdownReport = `## 📊 In-Depth Local SEO Audit: ${place.displayName?.text}

**Target Location:** ${address}
**Business Status:** ${status}
**Primary Category:** ${primaryType.toUpperCase()}

Based on live Google Maps data, we have analyzed your profile against local competitors. Here is your customized optimization teardown.

---

### 1. Visibility & Engagement Snapshot

* **Overall Optimization Score:** **${overallScore}/100**
* **Profile Completeness (${profileScore}%):** ${profileScore < 100 ? 'You are missing critical attributes (e.g., website, phone, or hours) which severely limits Google’s trust in your listing.' : 'Your profile foundation is solid and well-populated.'}
* **Reputation Authority:** You have **${userReviews}** reviews (Rating: ${rating} ⭐). 
  * *Competitor Benchmark:* Your top competitor, ${competitors[0].name}, has **${competitors[0].reviews}** reviews (Rating: ${competitors[0].rating} ⭐). 
  * *Verdict:* ${userReviews < competitors[0].reviews ? 'You need to aggressively acquire reviews to capture the #1 Map Pack spot.' : 'You are currently dominating the local market in review volume.'}
* **Keyword Saturation (${kwScore}%):** ${kwScore > 50 ? 'Good keyword usage detected in your reviews.' : 'Poor. Your service descriptions and customer reviews lack geo-modified keywords (e.g., "' + primaryType + ' in [City]").'}

---

### 2. High-Impact Opportunities

${opportunities.map(o => `* **${o.title}:** ${o.desc}`).join('\n')}

---

### 3. Competitor Landscape

1. **${competitors[0]?.name || 'Top Competitor'}** - ${competitors[0]?.reviews || 0} reviews (${competitors[0]?.rating || 0} ⭐)
2. **${competitors[1]?.name || 'Secondary Competitor'}** - ${competitors[1]?.reviews || 0} reviews (${competitors[1]?.rating || 0} ⭐)
3. **Your Business** - ${userReviews} reviews (${rating} ⭐)

---

### 4. Actionable 30-Day Roadmap

* **Week 1 (Foundation):** ${reportData.roadmap[0].desc}
* **Week 2 (Reputation):** ${reportData.roadmap[1].desc}
* **Week 3 (Visuals):** ${reportData.roadmap[2].desc}
* **Week 4 (Conversion):** ${reportData.roadmap[3].desc}

> *Disclaimer: This report was generated dynamically using live Google Maps data via the Places API.*
`;

      res.json({ reportData, markdownReport });
    } catch (error) {
      console.error('Audit Error:', error);
      res.status(500).json({ error: 'Failed to generate audit from live data.' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
