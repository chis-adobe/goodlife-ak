# Performance Landing Page — Author Guide

## Template: Membership

The **Membership** template provides a dark-themed, fitness-focused page layout. It composes:

```
Header Fragment → Page Sections (blocks) → Footer Fragment
```

### Creating a New Page

1. In Universal Editor, create a new page using the **Membership** template
2. Set metadata:
   - `template`: `membership`
   - `header`: `/fragments/nav/header`
   - `footer`: `/fragments/nav/footer`
3. Add sections and blocks from the approved block palette

---

## Available Blocks

### Hero (variant: `performance`)

**Purpose:** Full-width dark hero section with large display heading, description, and CTA.

| Field | Type | Description |
|-------|------|-------------|
| Eyebrow | Text | Small label above heading (e.g., "Memberships") |
| Heading | Text | Main headline (e.g., "Performance Membership") |
| Description | Rich Text | Body paragraph |
| CTA Label | Text | Button text (e.g., "Join Now") |
| CTA Link | Text | Button destination URL |
| Background Image | DAM Reference | Optional background image |
| Variant | Select | Choose "Performance (dark centered)" |

**Guardrails:** Keep heading under 4 words for impact. Description should be 1-2 sentences max.

---

### Amenity Showcase

**Purpose:** Grid of 4 program images with badges below. Used to visually present the specialty programs.

| Field | Type | Description |
|-------|------|-------------|
| Image 1-4 | DAM Reference | Program photos (portrait ratio, 276×381) |
| Badge 1-4 | DAM Reference | Program logos/badges (SVG, ~135×24) |

**Guardrails:** Always use exactly 4 images. Images should be high-quality photos of each program in action. Badges are white SVG logos.

---

### Feature Showcase

**Purpose:** Z-pattern layout alternating image and text card with accordion. Each row presents one training program.

| Field | Type | Description |
|-------|------|-------------|
| Program Name | Text | Program name in all-caps (e.g., "REGYMEN") |
| Program Description | Rich Text | 1-2 sentence overview |
| Program Image | DAM Reference | Full-height program photo |
| Image Alt Text | Text | Accessible image description |
| Accordion Items | Structured | 3 expandable items (title + optional content) |

**Guardrails:** Use 3 accordion items per program. First item should have expanded content; items 2-3 can be title-only (collapsed teasers). Images alternate left/right automatically via z-pattern.

---

### Feature Grid

**Purpose:** 2×2 grid of benefits with icon + title + description.

| Field | Type | Description |
|-------|------|-------------|
| Icon | DAM Reference | 48×48 SVG icon |
| Title | Text | Benefit name (e.g., "Access to all 300+ GoodLife Gyms") |
| Description | Text | 1 sentence explanation |

**Guardrails:** Keep to 4 items for visual balance. Use consistent icon style (line art, same weight).

---

### Pricing Card

**Purpose:** Membership pricing display with gradient background and CTA.

| Field | Type | Description |
|-------|------|-------------|
| Plan Name | Text | Membership tier (e.g., "PERFORMANCE") |
| Plan Description | Rich Text | What's included summary |
| Price | Text | Dollar amount (e.g., "$39.99") |
| Price Period | Text | Billing cycle (e.g., "/ biweekly + $99 joining fee") |
| CTA Label | Text | Button text |
| CTA Link | Text | Join/purchase URL |
| Disclaimer | Rich Text | Legal fine print |

**Guardrails:** Only one pricing card per page. Price must include currency symbol.

---

### Club Selector

**Purpose:** Location-aware club picker that allows members to select their home club.

| Field | Type | Description |
|-------|------|-------------|
| Heading | Text | Section title (e.g., "Select your Home Club") |
| Description | Text | Instruction text |
| Club Name | Text | Pre-selected club |
| Club Details | Text | Location info |
| Change Label | Text | Link text for changing club |
| Change Link | Text | URL to club finder |

**Guardrails:** Club details auto-populate based on geolocation in the live experience.

---

## Section Styles

Sections can have the following styles (set via Section Metadata):

| Style | Effect |
|-------|--------|
| `full-width` | Removes max-width constraint, block fills viewport |
| `dark` | Dark background with white text |
| `full-width, dark` | Combined: dark + full-width |

---

## Fragments

### Header Fragment (`/fragments/nav/header`)

The header is a **shared fragment** — changes apply to all pages using it.

Structure:
- Sub-header (utility bar): "Get a Free Workout" + "Login"
- Main nav (red bar): Logo + navigation links + cart icon

### Footer Fragment (`/fragments/nav/footer`)

Also a shared fragment:
- Copyright text
- Accessibility / Privacy Policy links

---

## Asset Management (DAM)

All images must be uploaded to AEM Assets before use:

```
/content/dam/goodlife/
├── programs/       ← Training program photos
├── badges/         ← Program logo badges (SVG)
├── icons/          ← Feature grid icons (SVG)
└── logos/          ← Brand logos
```

In Universal Editor, use the **image picker** (reference field) to browse and select assets from DAM. Never paste external URLs or upload inline images.

---

## Extending with New Pages

To create additional membership pages (e.g., "Fitness" tier):

1. Create a new page with `membership` template
2. Reuse the same blocks — just change content
3. Each program page can have its own Feature Showcase rows
4. The Pricing Card can display different tier pricing
5. The Club Selector is reusable across all membership pages

---

## Accessibility Checklist

- All images must have descriptive `alt` text
- Headings follow hierarchy (h1 → h2 → h3)
- CTA buttons have clear action labels ("Join Now" not "Click Here")
- Accordion items are keyboard-navigable (Enter/Space to toggle)
- Color contrast meets WCAG AA on all text
