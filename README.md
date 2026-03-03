# Nexoria — Premium Revenue System Website

A fully-functional, modern, professional personal brand and service website for international clients.

## Tech Stack
- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Express.js + MongoDB (Mongoose)
- **Payments**: Stripe Checkout
- **UI**: Custom Tailwind components, Framer-ready animations

## Pages
| Route | Description |
|-------|-------------|
| `/` | Full landing page (Hero, About, Services, Pricing, Workflow, Testimonials, Contact) |
| `/booking` | 3-step booking flow with Stripe payment |
| `/booking/success` | Post-payment confirmation page |
| `/portfolio` | Filterable project showcase with case studies |
| `/blog` | Insights blog with featured post and newsletter |
| `/admin` | Admin dashboard (Overview, Bookings, Projects, Feedback, Clients) |

## API Routes
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/contact` | POST | Contact form submission |
| `/api/bookings` | POST/GET | Create/list bookings |
| `/api/stripe/webhook` | POST | Stripe payment webhook |

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Edit `.env.local`:
```env
MONGODB_URI=mongodb://localhost:27017/nexoria
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 3. Run development server
```bash
npm run dev          # Next.js frontend on http://localhost:3000
npm run server       # Express backend on http://localhost:5001
```

### 4. Build for production
```bash
npm run build
npm start
```

## Stripe Setup
1. Create a Stripe account at stripe.com
2. Copy your API keys into `.env.local`
3. For webhooks: `stripe listen --forward-to localhost:3000/api/stripe/webhook`

## MongoDB Setup
- Local: `mongod` or MongoDB Compass
- Cloud: MongoDB Atlas connection string in `MONGODB_URI`

## Pricing Plans
| Plan | Price | Sessions |
|------|-------|---------|
| Launch | $36 | 1 × 60 min |
| Core | $48 | 1 × 90 min |
| Advance | $84 | 2 × 90 min |
| Pinnacle | $192 | 4 × unlimited |

## Deployment
- **Frontend**: Vercel (`vercel deploy`)
- **Backend**: Railway, Render, or Fly.io
- **Database**: MongoDB Atlas

---
Built with ❤️ for Nexoria
