# Now - E-commerce Homepage

A production-ready, mobile-first e-commerce homepage built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 📱 **Mobile-First Design** - Optimized for phones, tablets, and desktop
- ⚡ **Fast Loading** - Optimized images, minimal JavaScript
- 🎯 **Touch-Friendly** - Large tap targets (44px minimum), swipeable carousels
- ♿ **Accessible** - Semantic HTML, ARIA labels, proper contrast
- 🎨 **Modern UI** - Rounded cards, soft shadows, energetic accent color

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Images**: Next.js Image optimization

## Getting Started

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
src/
├── app/
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Homepage composition
│   └── globals.css     # Global styles + Tailwind
├── components/
│   ├── layout/         # Header, Footer, MobileNav
│   ├── home/           # HeroBanner, CategoryBar, FlashDeals, etc.
│   ├── ui/             # Button, Badge, ProductCard, CategoryCard
│   └── icons/          # SVG icon components
├── data/
│   └── mockData.ts     # Mock products, categories, banners
└── types/
    └── index.ts        # TypeScript interfaces
```

## Page Sections

1. **Sticky Header** - Logo, search bar, cart icon
2. **Hero Banner** - Swipeable promotional carousel
3. **Category Bar** - Horizontal scroll category shortcuts
4. **Flash Deals** - Countdown timer + deal products
5. **Featured Products** - Grid of product cards
6. **Promo Banners** - Mid-page promotional images
7. **More Products** - Additional product grid
8. **Trust Badges** - Delivery, returns, security info
9. **Footer** - Links, social, app download
10. **Mobile Bottom Nav** - Sticky navigation (mobile only)

## Design System

### Colors
- Primary: `#FF6B35` (Energetic Orange/Coral)
- Background: `#FFFFFF`
- Surface: `#F8FAFC`
- Text: `#0F172A` / `#64748B`

### Responsive Breakpoints
- Mobile: < 640px (default)
- Tablet: 640px - 1024px (sm:, md:)
- Desktop: > 1024px (lg:, xl:)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

MIT
