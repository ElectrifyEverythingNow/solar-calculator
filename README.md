# Balcony aka "Plug In" Solar Calculator

See if plug-in solar makes sense for you. Part of [ElectrifyEverythingNow.com](https://electrifyeverythingnow.com).

## Quick Start

```bash
npm install --legacy-peer-deps
npm run dev
```

## Deploy to Cloudflare Pages

1. Push this repo to GitHub
2. In Cloudflare Dashboard > Pages > Create a project > Connect to Git
3. Settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Root directory:** `solar-calculator` (if in a monorepo)
   - **Node.js version:** 20
4. Environment variable: `NEXT_PUBLIC_NREL_API_KEY` = your free NREL API key from https://developer.nrel.gov/signup/
5. Deploy

To serve at `electrifyeverythingnow.com/solar-calculator`, configure a custom domain in Cloudflare Pages settings.

## Stack

- Next.js 16 (static export)
- React 19 + Tailwind CSS v4
- react-simple-maps (US choropleth)
- NREL PVWatts API (optional refinement)
- No database, no backend
