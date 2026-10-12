# MARKETME — Digital Marketing Agency Website

MarketMe is a production-ready, interactive digital marketing agency website engineered to demonstrate strategic competence, capture qualified inquiries, and position MarketMe as a full-funnel growth partner.

## Key Features

1. **Strategic Brand Positioning**
   - Color architecture: 70% dark/neutral (`#0C0D10`, `#14151A`), 20% white/light gray, 10% energetic orange (`#F97316`).
   - "Strategy first. Execution second. Growth always."
   - Zero AI-slop clichés or fake testimonials.

2. **Harry Fox Mascot Engine**
   - Brand guide mascot featuring white fur, orange accents, black streetwear hoodie, cyber visor, cargo pants, chunky sneakers, and fluffy fox tail.
   - Reusable `HarryMascot` component with 10 poses (`harry-idle`, `harry-wave`, `harry-point-right`, `harry-point-left`, `harry-present`, `harry-thinking`, `harry-analyse`, `harry-idea`, `harry-celebrate`, `harry-cta`).
   - Built-in SVG vector rendering with automatic fallback/replacement whenever custom `.webp` or `.png` images are placed in `/public/assets/harry/`.

3. **Layered 2D Interactive Hero**
   - Mouse-responsive multi-plane parallax depth on desktop.
   - Floating marketing dimensions (`SOCIAL`, `ADS`, `SEO`, `CONTENT`, `LEADS`, `AUTOMATION`, `ANALYTICS`).
   - Performance indicators (`Visibility ↑`, `Credibility ↑`, `Brand Authority ↑`, `Qualified Leads ↑`).

4. **Problem-First Bottleneck Selector**
   - 9 interactive real-world marketing challenges.
   - Immediate diagnosis panel highlighting the likely systemic bottleneck and recommended starting service.

5. **MarketMe Growth System (Funnel Engine)**
   - Interactive 6-stage connected journey: `ATTENTION` → `TRAFFIC` → `LEADS` → `NURTURE` → `CUSTOMERS` → `REVENUE`.
   - Orange progress pipeline connecting mapped channels and KPIs.

6. **Services Architecture**
   - **Social Media Marketing**: Brand authority, reels, carousels, New Client Launch Support up to ₹3,000 paid media boost.
   - **Performance Marketing**: Meta Ads, Google Ads, JioHotstar OTT advertising, tracking architecture (GA4, CAPI), New Client Launch Support up to ₹5,000 paid media testing credit.
   - **Full Digital Marketing**: Unified multi-channel growth systems.
   - **Marketing Automation**: CRM stages, speed-to-lead, instant WhatsApp alerts.
   - **Websites & Landing Pages (CRO)**: Sub-second speed, message match, friction reduction.

7. **How MarketMe Thinks**
   - Practical root-cause scenarios solving high-click/no-lead leaks, poor lead quality, and vanity views.

8. **Interactive Marketing Diagnosis Tool**
   - 6-step questionnaire analyzing objectives, active channels, bottlenecks, monthly budget, and business model.
   - Dynamic recommendation engine and lead capture form.

9. **Ask Harry (Floating Decision-Tree Assistant)**
   - Guided conversational decision tree pointing visitors to the right strategic action or WhatsApp chat.

10. **Direct Contact Integration**
    - WhatsApp direct links pre-configured for phone: `9321856109`.
    - Instagram: `@marketme.ny`
    - LinkedIn: `MarketMe`

---

## Mascot Artwork Replacement

Place transparent PNG or WebP files in `/public/assets/harry/` matching these exact filenames:
- `harry-idle.webp`
- `harry-wave.webp`
- `harry-point-right.webp`
- `harry-point-left.webp`
- `harry-present.webp`
- `harry-thinking.webp`
- `harry-analyse.webp`
- `harry-idea.webp`
- `harry-celebrate.webp`
- `harry-walk.webp`
- `harry-cta.webp`

The component will automatically detect the files and render the photography/illustrations in place of the built-in vector graphics.

---

## Deploying to Firebase Hosting

This project is pre-configured with `firebase.json` for Firebase Hosting.

### Prerequisites
Install the Firebase CLI:
```bash
npm install -g firebase-tools
```

### 1. Login to Firebase
```bash
firebase login
```

### 2. Initialize Firebase (if not already linked)
```bash
firebase init hosting
```
- Select your Firebase Project.
- Set the public directory to: `dist`
- Configure as single-page app (rewrite all URLs to /index.html): `Yes`
- Set up automatic builds and deploys with GitHub: (optional)

### 3. Build & Deploy
```bash
npm run build
firebase deploy --only hosting
```

Your website will be live on `<your-project-id>.web.app`!
