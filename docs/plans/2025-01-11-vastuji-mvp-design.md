# Vastuji MVP Design Document

**Date:** January 11, 2025
**Status:** Design Complete - Ready for Implementation Planning
**Timeline:** 12 weeks to MVP launch

---

## Executive Summary

Vastuji is a **freemium web application** that provides scientific spatial analysis based on Vastu Shastra principles, positioned as "science meets geometry meets logic with a heartbeat." The platform serves homeowners and office owners who want rational, evidence-based spatial optimization rather than religious/mystical guidance.

**Core Innovation:** Users record a video walkthrough of their space, upload it, and receive an instant computer vision-generated floor plan with 16-zone heat map analysis. Free tier provides summary insights; paid tier unlocks detailed remedies plus 30-60 minute expert consultation.

**Differentiation:** Blueprint-style architectural aesthetic, geometric ratios + environmental physics grounding, instant processing, hybrid automated + expert model.

---

## 1. Product Positioning

### Value Proposition
- **Speed & Convenience:** Instant preliminary analysis (60 seconds) vs. days waiting for traditional consultant
- **Triage & Risk Assessment:** Understand severity and urgency of spatial issues before investing in full consultation
- **Scientific Credibility:** Mathematical, provable analysis using geometric ratios and environmental physics

### Target Users (MVP)
- **Primary:** Indian homeowners seeking evidence-based spatial optimization
- **Secondary:** Office/commercial property owners looking for competitive advantage

### Positioning vs. Competition
| Traditional Vastu Apps | Vastuji MVP |
|----------------------|-------------|
| Religious/mystical framing | Scientific, geometric, rational |
| Manual form inputs | Video upload → automated analysis |
| Generic templated advice | Computer vision-generated floor plans |
| One-time purchase or free | Freemium with expert consultation upsell |

---

## 2. User Journey

### Primary Flow (End-to-End)

```
Landing Page
    ↓
Property Context (type + goals selection)
    ↓
Video Upload + Compass Calibration
    ↓
Processing Animation (60-120 seconds)
    ↓
Free Heat Map Preview (16 zones, top 3 insights)
    ↓
[PAYWALL] → Lead Capture + Calendar Booking
    ↓
Payment → Unlock Detailed Analysis + Consultation
```

### Detailed Step Breakdown

**Step 1: Landing Page**
- Hero message: "Transform spaces with ancient wisdom" (subtext: "powered by modern geometry")
- Trust indicators: "16 Directional Zones", "Scientific Analysis", "99% Accuracy"
- Primary CTA: "Scan Your Space"
- Visual: Blueprint-style 4x4 grid with subtle directional annotations

**Step 2: Property Context Capture**
- Property type selection: Home, Office, Shop, Factory, Plot
- Optional goal selection: Wealth, Health, Career, Marriage, Peace, Business
  - *Note: Goals personalize messaging but don't change core analysis*

**Step 3: Video/Photo Upload**
- **Primary method:** "Record a walkthrough video" (30-120 seconds recommended)
- **Alternative:** "Upload photos of each room" (fallback if video fails)
- Compass calibration: Device orientation permission + visual "align to north" guide
- Upload progress bar with status: "Uploading... 47%"

**Step 4: Processing & Analysis**
- Processing animation (60-120 seconds perceived time)
- Status messages: "Extracting keyframes → Mapping spatial geometry → Calculating zones → Generating heat map"
- Never show blank loading screens

**Step 5: Free Preview Results**
- Blueprint-style floor plan (SVG, top-down view)
- 16-zone grid overlay, color-coded:
  - **Green:** Optimal zones
  - **Yellow/Amber:** Attention needed
  - **Red:** Critical issues
- Top 3 insights (one-liners): "Kitchen in southeast (Agneya) - Optimal placement"
- Overall score: 73/100
- Blur/lock detailed content with "Unlock Full Analysis" CTAs

**Step 6: Conversion → Consultation Booking**
- Lead capture form: Name, Email, Phone, Property Address (optional)
- Calendar booking: Choose consultation time slot
- Payment: ₹2,999 - ₹4,999 via Razorpay
- Confirmation: Email + calendar invite sent immediately
- Analysis unlocks: Full detailed report now viewable

---

## 3. Technical Architecture

### Frontend Stack
- **Framework:** SvelteKit with Svelte 5 (runes syntax)
- **Styling:** Tailwind CSS v4 (blueprint aesthetic)
- **Build:** Vite
- **Deployment:** Vercel or Netlify (edge functions for API)

### Backend Stack
- **API:** SvelteKit server routes OR separate Node.js/Python backend
- **Database:** PostgreSQL (Supabase) or Firebase Firestore
- **Storage:** AWS S3, Cloudflare R2, or Firebase Storage (video/image uploads)
- **Payment:** Razorpay (India market)
- **Email:** SendGrid, Resend, or similar
- **Calendar:** Calendly integration OR custom booking logic

### Computer Vision Pipeline

**Input:** Video walkthrough (30-120 seconds, ~10-50 MB file)

**Processing Steps:**
1. **Keyframe Extraction:** Extract frames every 0.5-1 second (30-240 frames)
2. **Spatial Mapping (SLAM/SfM):**
   - Structure from Motion or Visual SLAM algorithm
   - Generate 2D floor plan with room boundaries, walls, doorways
   - Scale calibration using compass + optional reference measurement
3. **Compass Alignment:**
   - Apply DeviceOrientationEvent data from video metadata
   - Rotate floor plan to true north (critical for directional analysis)
4. **Zone Grid Overlay:**
   - Divide floor plan into 4x4 grid (16 zones)
   - Map zones to cardinal/ordinal directions (N, NE, E, SE, S, SW, W, NW)
5. **Rule Engine Analysis:**
   - **Geometric scoring:** Symmetry, proportions, golden ratio compliance
   - **Physics scoring:** Solar orientation, natural light angles, airflow patterns
   - **Vastu directional rules:** Kitchen in SE = optimal, toilet in NE = critical issue
6. **Output Generation:**
   - Zone scores (0-100 per zone)
   - Color classification (green/yellow/red)
   - Templated insights based on property type + zone scores

**Tech Options:**
- **SLAM libraries:** ORB-SLAM, OpenVSLAM, or commercial APIs
- **Cloud APIs:** Google Vision AI, AWS Rekognition (if custom ML too complex)
- **Fallback:** If CV fails, allow manual floor plan annotation

---

## 4. Data Model

### Analysis Schema

```typescript
interface Analysis {
  id: string;                          // UUID
  userId?: string;                     // Optional (anonymous allowed)
  createdAt: timestamp;

  // Input data
  propertyType: 'home' | 'office' | 'shop' | 'factory' | 'plot';
  selectedGoals?: string[];            // Optional personalization
  videoUrl: string;                    // Storage URL
  compassHeading: number;              // Degrees from true north

  // Processing status
  status: 'uploading' | 'processing' | 'complete' | 'failed';

  // Generated outputs
  floorPlan: {
    svg: string;                       // Vector floor plan
    bounds: { width: number; height: number };
    scale: number;                     // meters per pixel
  };

  zones: Zone[16];                     // 16-zone analysis array

  summary: {
    topInsights: Insight[3];           // Free tier preview
    overallScore: number;              // 0-100
  };

  detailedReport?: {                   // Paid tier only
    roomAnalysis: RoomAnalysis[];
    remedies: Remedy[];
    geometricMetrics: GeometricData;
    physicsMetrics: PhysicsData;
  };
}

interface Zone {
  id: number;                          // 1-16
  direction: Direction;                // N, NE, E, SE, S, SW, W, NW
  directionSanskrit: string;           // उत्तर, ईशान, पूर्व, etc.
  score: number;                       // 0-100
  status: 'optimal' | 'attention' | 'critical';  // Green/Yellow/Red
  rooms: string[];                     // Which rooms occupy this zone
  briefInsight: string;                // One-liner (free tier)
  detailedAnalysis?: string;           // Full explanation (paid tier)
}

interface Insight {
  title: string;                       // "Kitchen Placement"
  severity: 'good' | 'warning' | 'critical';
  description: string;                 // One sentence summary
  zone: number;                        // Which zone (1-16)
}

interface Remedy {
  issue: string;
  recommendation: string;
  priority: 'high' | 'medium' | 'low';
  cost: 'free' | 'low' | 'medium' | 'high';  // Implementation cost estimate
}
```

### Booking Schema

```typescript
interface Booking {
  id: string;
  analysisId: string;                  // Links to Analysis
  userId?: string;

  // Contact info
  name: string;
  email: string;
  phone: string;
  propertyAddress?: string;

  // Scheduling
  scheduledTime: timestamp;
  timezone: string;

  // Payment
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentId?: string;                  // Razorpay transaction ID
  amount: number;                      // In rupees

  // Consultation
  consultantId?: string;               // Assigned expert
  consultationStatus: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;                      // User's specific questions
}
```

---

## 5. Component Architecture

### Page Routes

```
/                              Landing page (positioning + CTA)
/scan                          Video upload interface
/analysis/:id                  Heat map results (free preview)
/analysis/:id/full             Detailed report (paid tier, auth required)
/consultation                  Booking flow (lead capture + calendar)
/about                         About Vastuji (science-based positioning)
```

### Key Components

```
src/lib/components/
├── capture/
│   ├── VideoRecorder.svelte          # Camera capture with compass overlay
│   ├── PhotoUploader.svelte          # Multi-photo upload alternative
│   ├── CompassCalibration.svelte     # Device orientation setup
│   └── UploadProgress.svelte         # Progress bar with status messages
│
├── analysis/
│   ├── FloorPlanViewer.svelte        # SVG floor plan renderer
│   ├── HeatMapOverlay.svelte         # 16-zone grid with color coding
│   ├── ZoneDetail.svelte             # Click zone → modal with details
│   ├── AnalysisSummary.svelte        # Top 3 insights card
│   └── ProcessingAnimation.svelte    # Loading state with steps
│
├── consultation/
│   ├── LeadCaptureForm.svelte        # Contact info collection
│   ├── CalendarBooking.svelte        # Scheduling interface
│   └── PaymentModal.svelte           # Razorpay integration
│
└── shared/
    ├── BlueprintGrid.svelte          # Reusable grid overlay
    ├── DirectionCompass.svelte       # North indicator
    └── ScoreGauge.svelte             # 0-100 score visualization
```

---

## 6. Visual Design System

### Blueprint Aesthetic

**Color Palette:**
```css
/* Primary (Blueprint) */
--navy-base: #0f1528;
--navy-light: #1e2a4a;
--technical-blue: #2563eb;
--grid-lines: #374151;

/* Heat Map */
--optimal-green: #10b981;
--attention-amber: #f59e0b;
--critical-red: #ef4444;
--neutral-gray: #6b7280;

/* Accents */
--gold-premium: #d4af37;
--white: #ffffff;
```

**Typography:**
```css
/* Font stack */
font-family: 'Inter', 'DM Sans', system-ui, sans-serif;
font-family-mono: 'JetBrains Mono', 'Courier New', monospace;

/* Sizes */
--text-5xl: 3rem;      /* 48px - Hero headings */
--text-3xl: 2rem;      /* 32px - Section headings */
--text-base: 1rem;     /* 16px - Body text */
--text-sm: 0.875rem;   /* 14px - Technical annotations */
```

**Visual Principles:**
- Clean lines, minimal ornament
- Grid-based layouts (respect 4x4 zone concept)
- Technical annotations with measurement callouts
- Top-down/isometric floor plan views
- Subtle shadows for architectural depth
- No gradients (except heat map color transitions)
- Line-based icons (geometric, not illustrative)

### UI Components Style Guide

**Buttons:**
- Primary CTA: Navy background, white text, subtle shadow
- Secondary: Border outline, transparent background
- Hover: Slight scale transform (1.02x)

**Cards:**
- White background with 1px gray border
- 8px rounded corners (subtle, not bubbly)
- Drop shadow: 0 1px 3px rgba(0,0,0,0.1)

**Heat Map Grid:**
- 16 equal squares in 4x4 layout
- Border: 2px solid grid-lines color
- Zone fill: Green/Amber/Red with 20% opacity
- Hover: Increase opacity to 40%, show zone number

---

## 7. Business Model & Monetization

### Freemium Tiers

**Free Tier (Preview Analysis)**
- ✅ Unlimited scans
- ✅ Instant heat map with 16-zone color coding
- ✅ Top 3 critical insights (one-liners)
- ✅ Overall score (0-100)
- ❌ Detailed remedies (locked)
- ❌ Room-by-room analysis (locked)
- ❌ Expert consultation (locked)

**Paid Tier (Full Consultation)**
- ✅ Everything in free tier
- ✅ Detailed room-by-room remedies
- ✅ Geometric metrics visualization
- ✅ Physics data (solar angles, airflow)
- ✅ Implementation priority roadmap
- ✅ 30-60 minute video consultation with expert
- ✅ Downloadable PDF report (blueprint-style)

### Pricing (India Market)

| Tier | Price | Deliverables |
|------|-------|--------------|
| Free Preview | ₹0 | Heat map + 3 insights |
| Single Consultation | ₹2,999 - ₹4,999 | Full report + 1hr consultation |
| Package (3 properties) | ₹7,999 | Discounted bundle for multiple spaces |

**Competitive Context:** Traditional Vastu consultants charge ₹10,000-50,000 for on-site visits. Vastuji offers premium insights at 30-50% lower cost with instant turnaround.

### Conversion Strategy

**Paywall Touchpoints:**
1. **Zone click:** Modal says "Unlock detailed remedies for this zone"
2. **Detailed insights blur:** Visual blur with "Book consultation to unlock"
3. **Sticky footer CTA:** "Get Expert Analysis - ₹2,999" always visible
4. **Email follow-up:** 24hrs after free scan, send "Ready to optimize your space?" email

**Target Metrics:**
- Free-to-paid conversion: 5-10% (industry standard freemium)
- Consultation show-up rate: >70%
- Customer satisfaction: 4+ stars average

---

## 8. MVP Scope Definition

### IN Scope (Must-Have for Launch)

**User-Facing Features:**
- ✅ Landing page with scientific positioning
- ✅ Property type + goal selection
- ✅ Video upload with compass calibration
- ✅ Processing animation with status updates
- ✅ Free heat map preview (16 zones, top 3 insights)
- ✅ Paywall on detailed analysis
- ✅ Lead capture + calendar booking form
- ✅ Payment integration (Razorpay)
- ✅ Email confirmations (upload, results, booking)

**Backend/ML:**
- ✅ Video storage infrastructure
- ✅ Computer vision: Video → floor plan (SLAM/SfM)
- ✅ Compass-aligned zone mapping
- ✅ Rule engine: Geometric + physics + Vastu scoring
- ✅ Summary insight generation (templated)
- ✅ Admin dashboard for monitoring

**Infrastructure:**
- ✅ Database for analyses, users, bookings
- ✅ Payment processing
- ✅ Calendar integration
- ✅ Email service
- ✅ Error logging & monitoring

### OUT of Scope (Future v2+)

**Deferred Features:**
- ❌ Room type auto-detection (classify "kitchen" vs "bedroom")
- ❌ Native mobile apps (iOS/Android) - web-first MVP
- ❌ AR overlay mode (live camera view with heat map)
- ❌ Multi-language support (English only initially)
- ❌ Remedy marketplace (buy products/services)
- ❌ Consultant marketplace (multiple experts, ratings)
- ❌ Social sharing / referral program
- ❌ PDF report downloads (show in-app only for MVP)
- ❌ 3D floor plan visualizations
- ❌ Historical tracking (rescan after changes)
- ❌ Team/enterprise features
- ❌ API access for third parties

---

## 9. Implementation Roadmap (12 Weeks)

### Phase 1: Foundation (Weeks 1-2)
**Goals:** Infrastructure setup, design system implementation

**Tasks:**
- Refine existing SvelteKit project structure
- Implement blueprint design system (colors, typography, components)
- Set up database schema (PostgreSQL/Firebase)
- Configure video storage (S3/R2/Firebase)
- Create API route structure
- Basic authentication setup

**Deliverable:** Clean codebase with design system, functional video upload

---

### Phase 2: Computer Vision (Weeks 3-5)
**Goals:** Core ML pipeline working

**Tasks:**
- Integrate SLAM/SfM library or API
- Build keyframe extraction from video
- Implement floor plan generation
- Compass alignment logic
- Zone grid overlay calculation
- Test with 20+ sample videos, iterate on accuracy

**Deliverable:** Video → floor plan pipeline with 80%+ accuracy

**Risk Mitigation:** This is the highest technical risk phase. Allocate buffer time. Have fallback plan (manual floor plan annotation tool if CV fails).

---

### Phase 3: Analysis Engine (Weeks 6-8)
**Goals:** Scoring and insights generation

**Tasks:**
- Implement rule engine:
  - Geometric analysis (symmetry, proportions)
  - Physics calculations (solar orientation, light)
  - Vastu directional rules
- Build zone scoring algorithm
- Create insight templates (property type × zone score → message)
- Heat map color coding logic
- Summary generation (top 3 insights)

**Deliverable:** Complete analysis pipeline from video → heat map → insights

---

### Phase 4: Conversion Flow (Weeks 9-10)
**Goals:** Monetization mechanics working

**Tasks:**
- Results page with free/paid tier separation
- Blur/lock UI for paid content
- Lead capture form with validation
- Calendar booking integration
- Razorpay payment integration
- Booking confirmation emails
- Admin dashboard for bookings

**Deliverable:** End-to-end user can pay and book consultation

---

### Phase 5: Polish & Testing (Weeks 11-12)
**Goals:** Production-ready quality

**Tasks:**
- Error handling and edge cases
- Mobile responsiveness testing
- Performance optimization (video upload, processing speed)
- Security audit (payment, data privacy)
- Beta testing with 10-20 users
- Bug fixes based on feedback
- Documentation (user guide, consultant onboarding)

**Deliverable:** Stable, tested MVP ready for public launch

---

## 10. Success Metrics & KPIs

### Technical Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Floor plan accuracy | >80% usable without correction | Manual review of 100 samples |
| Processing time | <2 minutes for 30-60sec video | Server-side timing logs |
| Upload success rate | >95% | Failed uploads / total attempts |
| Mobile compatibility | Works on iOS 14+, Android 10+ | Device testing matrix |

### Business Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Free-to-paid conversion | 5-10% | Paid bookings / total free scans |
| Consultation show-up rate | >70% | Completed calls / scheduled calls |
| Customer satisfaction | 4+ stars average | Post-consultation survey |
| Time to first scan | <3 minutes from landing | Analytics funnel tracking |

### Growth Metrics (Post-Launch)

| Metric | 30-Day Target | 90-Day Target |
|--------|--------------|--------------|
| Total scans | 500 | 2,000 |
| Paid consultations | 25-50 | 100-200 |
| Revenue | ₹75k-250k | ₹300k-1M |
| Organic traffic | 1,000 visits | 5,000 visits |

---

## 11. Risk Mitigation

### Technical Risks

**Risk 1: Computer vision accuracy too low**
- **Mitigation:** Build manual floor plan annotation fallback tool
- **Fallback:** Offer hybrid mode where CV generates draft, user corrects

**Risk 2: Processing time too slow (>5 minutes)**
- **Mitigation:** Optimize pipeline, use GPU instances, parallel processing
- **Fallback:** Set expectation of "results in 2-4 hours" instead of instant

**Risk 3: Mobile upload failures (network issues)**
- **Mitigation:** Chunked uploads, resume capability, compression
- **Fallback:** Desktop upload option, email video link option

### Business Risks

**Risk 4: Low free-to-paid conversion (<2%)**
- **Mitigation:** A/B test paywall placement, improve free tier value perception
- **Fallback:** Pivot to subscription model or lower consultation price

**Risk 5: Consultant availability bottleneck**
- **Mitigation:** Build consultant network early, automate scheduling
- **Fallback:** Async-only consultations (recorded video reviews)

**Risk 6: Market perception as "another Vastu app"**
- **Mitigation:** Strong brand positioning, PR emphasizing science angle
- **Fallback:** Target niche (architects, designers) before mass market

---

## 12. Next Steps

### Immediate Actions (This Week)

1. **Validate ML feasibility:** Run proof-of-concept with existing SLAM library on 5 sample videos
2. **Design mockups:** Create high-fidelity designs for landing page, scan flow, results page
3. **Set up infrastructure:** Provision database, storage, deployment pipeline
4. **Content creation:** Write initial insight templates for 16 zones × 5 property types

### Planning for Implementation

**Option A: Build in-house (if team has capacity)**
- Use `superpowers:writing-plans` to create detailed implementation plan
- Break into 2-week sprints aligned with roadmap phases
- Set up git worktree for isolated development

**Option B: Hire/contract specialists**
- ML engineer for computer vision pipeline (Weeks 3-5)
- Frontend developer for UI polish (Weeks 9-12)
- Vastu consultant for rule engine content

**Ready to proceed with creating a detailed implementation plan?**

---

## Appendix: Reference Links

### Technical Resources
- **SLAM Libraries:** ORB-SLAM3, OpenVSLAM, LSD-SLAM
- **Computer Vision APIs:** Google Vision AI, AWS Rekognition, Azure Computer Vision
- **SvelteKit Docs:** https://kit.svelte.dev
- **Tailwind CSS v4:** https://tailwindcss.com

### Design Inspiration
- **Blueprint Aesthetic:** Architectural drawing references, technical documentation styles
- **Heat Maps:** Data visualization best practices (D3.js examples)
- **Mobile Camera UX:** Native camera apps, AR measurement apps

### Vastu Knowledge Base
- 16 zones (Vastu Purusha Mandala)
- 8 directions and their deities/elements
- Room placement guidelines by property type
- Remedies and corrections (traditional + modern)

---

**Document Version:** 1.0
**Last Updated:** January 11, 2025
**Next Review:** After ML proof-of-concept validation
