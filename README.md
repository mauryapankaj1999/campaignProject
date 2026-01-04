# Campaign Monitoring Dashboard

A production-ready campaign monitoring dashboard built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Features

- 📊 Display campaigns with key metrics (name, status, platforms, budget, dates)
- 🔍 Search campaigns by name
- 🎯 Filter campaigns by status (active, paused, ended)
- ⚡ Loading, empty, and error states
- 🎨 Clean, responsive UI with Tailwind CSS
- 🔒 TypeScript for type safety
- 🧩 Reusable component architecture

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main dashboard page
├── components/
│   ├── Badge.tsx            # Status badge component
│   ├── CampaignCard.tsx     # Campaign card display
│   ├── EmptyState.tsx       # Empty state component
│   ├── ErrorState.tsx       # Error state component
│   ├── LoadingState.tsx     # Loading state component
│   ├── SearchBar.tsx        # Search input component
│   └── StatusFilter.tsx    # Status filter buttons
├── lib/
│   └── api.ts               # API client for fetching campaigns
├── types/
│   └── campaign.ts          # TypeScript types for campaigns
└── ...config files
```

## Deployment

This project is ready to deploy on Vercel:

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Deploy!

Or use the Vercel CLI:
```bash
npm i -g vercel
vercel
```

## API

The dashboard fetches data from:
- `GET https://mixo-fe-backend-task.vercel.app/campaigns`

## Build

```bash
npm run build
npm start
```

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React 18** - UI library

