# Project Guide & Context for Claude

This document serves as the primary system briefing for Claude when working on or customizing this codebase for a new company or client.

---

## 📌 Project Overview
- **Name:** Pulso 24 (White-Label Commercial AI Platform for WhatsApp)
- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4, Lucide React icons, Framer Motion
- **Backend / Database:** Supabase (PostgreSQL with RLS), `@supabase/ssr`, `@supabase/supabase-js`
- **Automation / Bot Workflows:** n8n workflow templates (located in `scripts/`)

---

## ⚡ Essential Commands
```bash
# Install dependencies
npm install

# Start local development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## 🎯 White-Label & Re-Branding Quick Map
When customizing this project for a new company, adapt the following files:

### 1. Contact Information & WhatsApp Links
- **File:** `src/lib/constants.ts`
- **Fields:**
  - `OFFICIAL_WHATSAPP_NUMBER`: Format `55XXXXXXXXXXX` (DDI + DDD + Number)
  - `OFFICIAL_WHATSAPP_DISPLAY`: Formatted display string, e.g., `+55 (XX) XXXXX-XXXX`
  - `getWhatsAppUrl()`: Default welcome message when clicking WhatsApp action buttons

### 2. SEO, Meta Tags & Brand Title
- **File:** `src/app/layout.tsx`
- **Fields:** Page title, meta description, and OpenGraph / Twitter tags.

### 3. Logo & Visual Identity
- **Logo Component:** `src/components/logo.tsx` (SVG icon and typography)
- **Static Assets:** `public/` (favicon, manifest, static images)
- **Color Palette:** Dark theme with surgical brutalist aesthetics:
  - Base background: `#0B0F19`
  - Cards & surfaces: `#111827`
  - Accent / Primary (WhatsApp / CTA): Emerald `#10B981`
  - Secondary (AI status): Electric Cyan `#06B6D4`

### 4. Commercial Offers & Landing Page Copy
- **Landing Page Root:** `src/app/page.tsx`
- **Landing Components:** `src/components/landing/`
  - `hero.tsx`: Value proposition, headline and primary CTA
  - `pricing.tsx`: Plan names, pricing tiers and included features
  - `benefits.tsx` & `capabilities.tsx`: Service capabilities (Audio, Vision, PDF, 24/7)
  - `faq.tsx`: Frequently asked questions

### 5. Database Schema & Provisioning
- **File:** `supabase_schema.sql` (located in the project root)
- Run this SQL script in the target PostgreSQL / Supabase SQL Editor to provision tables:
  - `tenants`, `leads`, `conversations`, `messages`, `prompts`, `costs`, `billing`

### 6. AI Agent / WhatsApp Automation Workflows
- **Directory:** `scripts/`
  - `bia_pulso24_n8n_workflow_v2.json`: n8n workflow template for WhatsApp lead qualification, audio handling, and CRM synchronization.

---

## 🏛️ Application Architecture & Routes

```
src/
├── app/
│   ├── page.tsx          # Public high-conversion Landing Page
│   ├── layout.tsx        # Root layout, fonts, theme provider, metadata
│   ├── login/            # Authentication screen
│   ├── dashboard/        # Tenant/Client Portal (CRM Kanban, Live Chat, Prompts, Follow-up, WhatsApp QR Code)
│   └── admin/            # Super Admin CEO Dashboard (Onboarding queue, API costs, alerts, MRR metrics)
├── components/
│   ├── landing/          # Landing page sections & widgets
│   ├── dashboard/        # Client portal components
│   ├── admin/            # Super admin components
│   └── ui/               # Reusable Radix & Tailwind UI primitives
├── contexts/             # React Contexts (TenantContext, AdminViewContext)
└── lib/
    ├── constants.ts      # Global constants (WhatsApp numbers, contact links)
    └── supabase/         # Supabase client and data services
```

---

## 💡 Guidelines for Claude
- When making modifications, adhere strictly to TypeScript type safety and Tailwind CSS v4 patterns.
- Keep components modular and self-documenting.
- Preserve the existing dark-mode design system conventions.
