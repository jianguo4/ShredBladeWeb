# PlasticRecycling Page Layout Guide

A concise reference for replicating the Plastic Recycling page styling across other pages.

## Page Shell
- Wrapper: `div.min-h-screen.bg-white`.
- Horizontal padding: `px-4 sm:px-6 lg:px-8`; top padding `py-16`.
- Use `Header` at top and `Footer` at bottom.

## Hero Section
- Title: `text-6xl font-bold text-slate-900 mb-6`.
- Description: `text-lg sm:text-xl text-slate-600 leading-relaxed mb-8`; split into two `span.block` lines if you need forced line breaks.
- Section spacing: container `mb-4` (after latest tightening).

## Intro Section
- Grid: `grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 mb-12`; image on left (order swapped on mobile) and text on right.
- Image: `rounded-lg shadow-lg w-full h-full object-cover` with descriptive alt.
- Card: `bg-slate-50 p-8 border-l-4 border-blue-900 shadow-sm`.
- Section title: `text-2xl font-bold uppercase tracking-widest border-b pb-4`.
- Technical Highlights list:
  - Each item: `border-b border-slate-200/50 pb-3 last:border-0`.
  - Label: `block text-sm font-semibold tracking-[0.08em] uppercase text-slate-600 mb-1` (label above).
  - Value: `block text-base text-slate-800 leading-relaxed`.

## Problem & Technical Solution
- Section spacing: `mb-16`; heading `text-3xl sm:text-4xl font-bold`.
- Intro text: `text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl`.
- Cards grid: `grid md:grid-cols-3 gap-8`.
- Image wrapper: `mb-5 aspect-[5/4] sm:aspect-[4/3] max-h-[220px] sm:max-h-[240px] overflow-hidden`; image `object-cover`.
- Card title: `text-xl font-bold text-slate-900 mb-4`; body `text-slate-700 leading-relaxed`.

## Blade Gallery
- Section spacing: `mb-16`.
- Header row: flex with title `text-3xl sm:text-4xl font-bold` and description `text-base sm:text-lg text-slate-700 leading-relaxed` on the same line for desktop.
- Gallery rail: `flex gap-3 sm:gap-4 blade-gallery-scroll` with cards `w-[280px] h-[280px] sm:w-[300px] sm:h-[300px]` and hover zoom.
- Alt text pattern: `Industrial Granulator Knife for Plastic Recycling - <parsed name> - High Wear Resistance`.

## OEM & ODM Services
- Container padding bottom `pb-12`; header row `mb-6`.
- Section heading: `text-3xl sm:text-4xl font-bold text-slate-900` with paragraph `text-base sm:text-lg text-slate-700 leading-relaxed`.
- Cards grid: `grid md:grid-cols-2 gap-8 my-2`.
- Card chrome: `bg-white border border-slate-300 border-l-4` (blue for OEM, amber for ODM), `p-6`.
- Card title: `text-2xl font-bold text-slate-900`.
- Description text: `text-sm sm:text-base text-slate-700 leading-relaxed mb-5`.
- Bullet list: `space-y-3 text-sm sm:text-base text-slate-800 leading-relaxed`; bullets use small square via `h-1.5 w-1.5` colored dots.
- CTA button: `px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-none shadow-md hover:shadow-lg` with focus ring.

## Spacing Summary
- Hero to Intro gap: `mb-4` on hero container.
- Intro block bottom margin: `mb-12`.
- Problem/Solution bottom margin: `mb-16`.
- Blade Gallery bottom margin: `mb-16`.
- OEM/ODM section padding bottom: `pb-12`; grid vertical margin: `my-2`.

## Typography & Colors
- Primary text: `slate-900` for headings, `slate-700/800` for body.
- Accent borders: `border-blue-900` (Intro card left) and `border-l-4` colored indicators (OEM blue, ODM amber).
- Uppercase micro-labels use tight tracking `[0.08em]`.

## Accessibility & UX
- All images have meaningful alt text; keep descriptive.
- Maintain focus-visible rings on buttons (`focus-visible:ring-2`).
- Hover states: shadows and subtle color shifts; avoid layout shift.

## How to Reuse
- Copy the grid and typography primitives above to new pages, keeping spacing and typography tokens consistent.
- For new lists, follow the label-over-value pattern and body font sizes noted.
- Keep hero titles at `text-6xl` unless page hierarchy demands smaller.
