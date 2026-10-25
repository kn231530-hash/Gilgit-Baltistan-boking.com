---
name: Gilgit Baltistan One
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3f4944'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#6f7973'
  outline-variant: '#bec9c2'
  surface-tint: '#1b6b51'
  primary: '#004532'
  on-primary: '#ffffff'
  primary-container: '#065f46'
  on-primary-container: '#8bd6b7'
  inverse-primary: '#8bd6b6'
  secondary: '#904d00'
  on-secondary: '#ffffff'
  secondary-container: '#fe932c'
  on-secondary-container: '#663500'
  tertiary: '#004063'
  on-tertiary: '#ffffff'
  tertiary-container: '#005887'
  on-tertiary-container: '#95cdff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a6f2d1'
  primary-fixed-dim: '#8bd6b6'
  on-primary-fixed: '#002116'
  on-primary-fixed-variant: '#00513b'
  secondary-fixed: '#ffdcc3'
  secondary-fixed-dim: '#ffb77d'
  on-secondary-fixed: '#2f1500'
  on-secondary-fixed-variant: '#6e3900'
  tertiary-fixed: '#cce5ff'
  tertiary-fixed-dim: '#93ccff'
  on-tertiary-fixed: '#001d31'
  on-tertiary-fixed-variant: '#004b73'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '800'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.04em
  currency-pkr:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '800'
    lineHeight: 20px
    letterSpacing: -0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-2xs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
---

## Brand & Style

This design system powers a civic and commercial super-app bridging regional tourism, local commerce, logistics, and public services across Gilgit-Baltistan. 

### Brand Personality
- **Alpine Clarity:** Evoking glacial air, dramatic skylines, and untamed terrain through stark whitespace, disciplined visual hierarchy, and luminous clarity.
- **Reliable & Resilient:** Engineered for high field utility under intermittent connectivity, harsh daylight outdoors, and multi-lingual usage (Urdu & English).
- **Hospitable & Dignified:** Grounded in local heritage, balancing administrative trust with warm, merchant-friendly access.

### Design Movement: Modern Alpine Utility
A synthesis of modern utilitarian minimalism and tactile card-based surfaces. The design relies on expansive, high-key white canvases (#FFFFFF, #F8FAFC) grounded by deep Karakoram pine and emerald tones, accented by golden apricot sunbeams and glacial cyan highlights. Structural clarity takes precedence over decorative noise: generous negative space, crisp 1px borders, subtle ambient diffusions, and comfortable touch targets.

## Colors

The palette mirrors the geographic majesty of northern Pakistan: sheer snowpack, pine forests along riverbeds, sun-ripened Hunza apricots, and glacial meltwater rivers.

### Core Swatches
- **Primary (Deep Karakoram Emerald - `#065F46` / Mid Emerald `#047857`):** Anchors core actions, navigation bars, verified trust emblems, and high-priority states. Conveys stability, authority, and organic vitality.
- **Secondary (Warm Apricot Gold - `#D97706`):** Highlights ratings, featured vendor tiers, seasonal promotional ribbons, and time-critical calls to action.
- **Tertiary (Crystal Glacial Cyan - `#0284C7`):** Powers secondary interactive pills, logistical indicators, water transit, weather stats, and digital booking flags.
- **Neutral (Slate Carbon - `#0F172A` / Mist Canvas `#F8FAFC`):** Pure `#FFFFFF` and muted slate `#F8FAFC` form the substrate, with deep neutral `#0F172A` delivering WCAG AAA contrast for bi-directional typography.

### Application Rules
- Canvas backgrounds stay at `#F8FAFC` to isolate white (`#FFFFFF`) floating cards.
- Dark accents never fall to pitch black; slate tints maintain softness against emerald tones.
- Functional states: WhatsApp actions reserve dedicated native green (`#25D366`), while system alerts employ calibrated crimson (`#DC2626`).

## Typography

The type system blends the energetic geometry of **Plus Jakarta Sans** for headlines, labels, and price triggers with the legibility of **Inter** for descriptions, metadata, and Urdu/English alphanumeric parity.

### Hierarchy & Treatment
- **Display & Headlines:** Used for regional discovery modules, vendor titles, and service hero blocks. Tight negative tracking keeps English titles clean, while generous line heights prevent descender clipping when displaying Urdu Nastaliq-compatible Latin terms.
- **Price Architecture (`currency-pkr`):** Formatted with bold prefix numerals: `PKR 14,500 / night`. The "PKR" text renders in `label-sm` weight, with figures set to `currency-pkr`.
- **Bilingual Considerations:** Vertical alignments are tuned with expanded internal line bounds (minimum 1.4x font size) to support localized scripts without layout jumps.

## Layout & Spacing

A compact, high-density fluid grid system designed for mobile devices while scaling gracefully to tablets and kiosks.

### Screen Layout Principles
- **Mobile Handheld (0 - 640px):** 4-column fluid grid, 16px (`1rem`) outer margin, 16px gutter. Navigation, actions, and primary pills are kept within the primary 75% thumb zone.
- **Tablet & Foldables (641px - 1024px):** 8-column layout with 24px margins, allowing split-pane browsing (e.g., booking catalog on left, interactive region map on right).
- **Desktop / Web (1025px+):** 12-column centered layout constrained to a maximum width of 1200px to preserve mobile-app symmetry.

### Spacing Rhythm
All spacing maps strictly to a 4px/8px modular scale. Spacing within atomic cards is restricted to `space-sm` (8px) and `space-md` (16px), while inter-card spacing relies on `space-md` to maintain breathing room without disjointed vertical lists.

## Elevation & Depth

Visual hierarchy uses clean elevation layering rather than high-contrast drop shadows. This preserves daylight legibility and maintains an airy alpine feel.

### Depth Stratification
- **Ground (Level 0):** Background screen canvas set to `#F8FAFC`.
- **Card Base (Level 1):** Solid `#FFFFFF` surfaces bounded by a hairline stroke (`1px solid #E2E8F0`). Drop shadow: `0px 2px 8px -2px rgba(15, 23, 42, 0.04), 0px 1px 3px -1px rgba(15, 23, 42, 0.02)`.
- **Raised Interactive Cards (Level 2):** Applied to active booking sheets, highlighted tour packages, and active search results. Border remains `1px solid #CBD5E1`. Shadow: `0px 8px 20px -4px rgba(6, 95, 70, 0.06), 0px 4px 8px -2px rgba(15, 23, 42, 0.03)`.
- **Overlays & Floating Modals (Level 3):** Bottom sheets, booking drawers, and sticky action docks. Shadow: `0px 16px 32px -6px rgba(15, 23, 42, 0.12)`.
- **Glass Accents:** Sticky top header strips and weather pills utilize frosted transparency: `background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(226, 232, 240, 0.8)`.

## Shapes

The geometric identity relies on soft, modern curves that reflect eroded mountain river pebbles and welcoming modern hospitality.

### Corner Radius Spec
- **Cards & Modal Sheets (`rounded-2xl`):** `1rem` (16px) standard exterior radius. Internal media and image carousels nested within cards inherit a matched `0.75rem` (12px) curve.
- **Search Pill & Interactive Chips:** Completely rounded pill profile (`9999px`) for quick-touch category scanning and search inputs.
- **Micro-Badges & Tags:** `0.375rem` (6px) or full pill to distinguish metadata tags from structural cards.
- **Action Buttons:** `0.75rem` (12px) for primary square-cornered CTA blocks, or full capsule (`9999px`) for tertiary floating action triggers.

## Components

### Universal Search Pill & Category Chips
- **Search Bar:** Capsule container (`9999px`) filled with `#FFFFFF`, bordered with `1.5px solid #E2E8F0`. Left icon in Karakoram Emerald (`#065F46`), placeholder text in Slate Muted (`#94A3B8`), and trailing voice/filter buttons enclosed in soft circles.
- **Category Chips:** Horizontal scroll ribbon with pill-shaped chips (`padding: 8px 16px`). Default state: `#FFFFFF` background, `#E2E8F0` border, `#0F172A` text. Selected state: solid `#065F46` fill, `#FFFFFF` text, paired with dynamic iconography (e.g., Jeeps, Hotels, Apricots, Handicrafts, Flights).

### Cards (Hotels, Tours & Market Items)
- **Structure:** White container, 16px border-radius, hairline border (`#E2E8F0`), Level 1 elevation.
- **Image Header:** 16:9 or 4:3 aspect ratio, border-radius matching card top, equipped with an absolute-positioned top-left **Status Tag** (e.g., "Available Today") and top-right **Favorite Heart**.
- **Body:** Title in `headline-sm`, subtitle/location with map-pin icon in `body-sm`.
- **Footer:** Two-tier flex layout: left side shows pricing structure (`currency-pkr`); right side hosts contextual actions.

### Badges, Stars & Price Tags
- **Verified Badges:** Deep emerald tinted capsule (`background: #ECFDF5; border: 1px solid #A7F3D0; color: #065F46`) enclosing a check-shield icon and label-sm text ("GB Verified").
- **Rating Stars:** Apricot Gold (`#D97706`) solid fill icon paired with bold numeric rating (`12px`) and gray total review count: `★ 4.9 (128)`.
- **Price Tags:** High-emphasis price display stacked over period labels: `PKR 8,500` in `headline-sm` bold, with `/ day` or `/ total` in `body-sm` slate gray.

### Action Buttons
- **'Book Now' (Primary):** Background `#065F46`, hover/active `#047857`, text `#FFFFFF`, bold font `label-lg`, 12px border radius. Subtly enhanced by an emerald inset highlight.
- **'WhatsApp Inquiry' (Secondary Utility):** Dedicated background `#25D366` or white `#FFFFFF` surface with `1.5px solid #25D366` and `#128C7E` text. Accompanied by the standard chat bubble icon.
- **Action Grouping:** When paired in a bottom sheet or sticky card footer, 'Book Now' claims a 65% width flex share, while 'WhatsApp' takes 35% with an icon-centric layout.

### Status Tags
- **Available / Confirmed:** `#ECFDF5` background, `#065F46` text, dot indicator `#10B981`.
- **Limited Seats / High Demand:** `#FFFBEB` background, `#B45309` text, dot indicator `#F59E0B`.
- **Pass Closed / Weather Alert:** `#FEF2F2` background, `#B91C1C` text, dot indicator `#EF4444`.