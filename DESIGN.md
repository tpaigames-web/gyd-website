# GYD Marketing — DESIGN.md

> **AI Agent Prompt**: Read this file before generating any UI component. Every color, type scale, spacing decision must align with the tokens below. When in doubt, prefer the values in this file over your training-data defaults.
> Source of truth for textual content: `../docs/MASTER_BRIEF.md`. Visual source of truth: `../docs/profile 2025 3.pdf`.

---

## 1. Visual Atmosphere & Design Philosophy

**Concept**: "Focus on the Dot" — a marketing agency that turns scattered noise into a single sharp insight. The site should feel like the explorer bull mascot taking a photo: scattered → lens charges → flash → clarity (and orange).

**Three adjectives the client insists on**: 专业可信 + 亲切友好 + 活泼有趣. The site must balance all three. Skewing only "professional" = boring (looks like every other agency, e.g. mysense.com.my which client explicitly dislikes). Skewing only "playful" = unprofessional.

**Mood reference (client liked)**:
- bikebear.com.my — playful + creative, bold colors, character-driven
- biccamera.com/bc/c/bicidea — clean info hierarchy, data-forward

**Mood reference (client disliked)**:
- mysense.com.my — too conservative, generic agency look

**Signature device**: scroll-driven **theme flip** from cream to orange. The user "uncovers" the brand by scrolling. Mimics camera shutter / discovery moment. Implemented via `body.flash-done` class flipped by GSAP ScrollTrigger at progress 0.88.

---

## 2. Color Palette

All colors are exposed as CSS custom properties scoped to `:root` and inverted under `body.flash-done`. Components must reference variables, not hex literals (so the flip works automatically).

| Token | Default | After `flash-done` | Role |
|------|---------|-------------------|------|
| `--gyd-bg` | `#E8E0D0` (T-shirt cream) | `#F15A24` (brand orange) | Page background |
| `--gyd-fg` | `#3A2B1E` (deep brown) | `#FAF6EF` (warm off-white) | Body text, headings |
| `--gyd-accent` | `#F15A24` (brand orange) | `#FAF6EF` | Buttons, highlights, the dot |
| `--gyd-accent-soft` | `#FFE6D4` (light peach) | `rgba(255,255,255,0.14)` | Soft fills, hover bg |
| `--gyd-muted` | `#9B9486` (warm gray) | `rgba(255,250,243,0.65)` | Secondary text, "before" data, dividers |
| `--gyd-line` | `rgba(58,43,30,0.1)` | `rgba(255,250,243,0.22)` | Borders, separators |
| `--gyd-white` | `#FFFFFF` | `#FFFFFF` | Card surfaces (does not flip) |

**Forbidden palette additions** in Phase 1: black, navy, neon, gradients beyond the orange→peach radial. If a section needs more contrast, use `--gyd-fg` on `--gyd-white`, not new colors.

The orange dot ● from the logo is a recurring motif. Use `<span style="color:var(--gyd-accent)">·</span>` or a 6px rounded square as a list marker / section anchor.

---

## 3. Typography

| Use | Font | Weight | Size | Tracking |
|-----|------|--------|------|----------|
| English display ("FOCUS", "GROW YOUR DREAM" marquee) | **Archivo Black** | 900 | clamp(4rem, 18vh, 12rem) | -0.02em |
| English body | **Inter** | 400 / 600 | 1rem (16px) | normal |
| Chinese display | **Noto Serif SC** | 700 / 900 | clamp(2rem, 6vw, 4rem) | normal |
| Chinese body | **Noto Sans SC** | 400 / 500 | 1rem (16px) | normal |
| UI controls / nav | Inter | 500 | 0.875rem (14px) | normal |
| Caption / metadata | Inter | 400 | 0.75rem (12px) | 0.02em |

**Hierarchy**:
- H1 (page hero): English display + Chinese display stacked, English first, Chinese underneath at 60% size.
- H2 (section): English label (uppercase, small, accent color) → Chinese H2 below (large).
- Body: 16/24 line-height, max-width 65ch, never full-bleed.

**Effect**: the "blurred → focused" big-text reveal from the PDF (FOCUS / PRINCIPLE / CONTACT) — apply `filter: blur(6px)` initially, animate to `blur(0)` on scroll-into-view. Reserved for section titles, not body.

---

## 4. Component Styling

### 4.1 Button (primary CTA)
```
height:        48px desktop / 44px mobile
padding:       0 24px
radius:        9999px (pill)
bg:            var(--gyd-accent)
color:         var(--gyd-bg)         /* contrast inverts on flip */
font:          Inter 600 / 14px / tracking 0.02em / uppercase
hover:         translateY(-1px), shadow 0 6px 20px var(--gyd-accent)/30
```

### 4.2 Button (ghost / secondary)
```
border:        1px solid var(--gyd-fg)
color:         var(--gyd-fg)
bg:            transparent
hover:         bg var(--gyd-accent-soft)
```

### 4.3 Card (service / case study / testimonial)
```
bg:            var(--gyd-white)
radius:        16px
padding:       24-32px
shadow:        0 1px 0 var(--gyd-line), 0 12px 32px rgba(58,43,30,0.06)
hover:         translateY(-2px), shadow grows
```

### 4.4 Input / form field
```
bg:            transparent
border:        none
border-bottom: 1px solid var(--gyd-line)
font:          Inter 400 / 16px
focus:         border-bottom-color var(--gyd-accent)
placeholder:   var(--gyd-muted)
```
Underline-only style (NOT boxed) — feels editorial, matches the PDF's "company profile" tone.

### 4.5 Numbered marker (used in 4 大问题, 服务流程, 案例编号)
```
①②③④⑤⑥  — use these glyphs directly, color: var(--gyd-accent), size matches surrounding heading.
```

### 4.6 BEFORE / AFTER data display (case studies)
```
left column:   "APPOINT US:" label (muted, small) + crossed-through OR muted numbers
right column:  "APPOINT US:" label (accent) + bold accent-color numbers
arrow:         → between, accent color
```
Matches the PDF's case study layout exactly.

### 4.7 Quote bubble (orange speech bubble from PDF)
```
bg:            var(--gyd-accent)
color:         var(--gyd-bg)
padding:       16px 24px
radius:        24px with one corner reduced to 4px (tail direction)
font:          Noto Serif SC 700, Chinese; Inter 600, English
```

---

## 5. Layout & Spacing

**Grid**: 12-col with 24px gutter on desktop, 4-col with 16px gutter on mobile.

**Container**: `max-width: 1280px`, side padding `clamp(16px, 4vw, 48px)`.

**Vertical rhythm** (section spacing):
- Between major sections: `clamp(64px, 12vh, 144px)`
- Between subsection blocks: `48px`
- Between paragraphs: `16px`

**Hero section**: pinned scroll, 180% scroll length, full-bleed cream/orange bg, bull mascot centered drifting right.

**Asymmetry rule**: never center everything. Use the rule of thirds — text on left, bull/visual on right (or inverse). The orange dot ● ties the asymmetric pair together.

---

## 6. Shadow & Elevation

Keep shadows soft and warm-tinted (matches cream bg), not gray.

| Level | Use | Value |
|-------|-----|-------|
| 0 | Flat surfaces | none |
| 1 | Cards at rest | `0 1px 0 var(--gyd-line), 0 8px 20px rgba(58,43,30,0.04)` |
| 2 | Cards on hover, sticky nav | `0 1px 0 var(--gyd-line), 0 16px 40px rgba(58,43,30,0.08)` |
| 3 | Modals, popovers, lens glow | `0 32px 80px rgba(58,43,30,0.16)` |
| Lens glow (Hero special) | Camera flash bloom | `radial-gradient(circle, rgba(241,90,36,0.55) 0%, rgba(241,90,36,0) 60%)` with `mix-blend-mode: screen` |

---

## 7. Guardrails (Do's & Don'ts)

### Do
- Use the orange dot ● as a punctuation device. One per heading, sparingly.
- Pin the Hero on scroll. Let the bull do the talking via 55-frame flipbook.
- Surface BEFORE/AFTER data prominently — it's the agency's proof.
- Treat 5 services (整合策略 / 数字营销 / 内容与创意 / 线下活动 / 品牌打造) as the primary structure on `/services`.
- Reference `MASTER_BRIEF.md` for content, NEVER invent copy.

### Don't
- Don't use shadcn's default neutral grays for body text — use `var(--gyd-fg)` (`#3A2B1E`).
- Don't use rounded buttons under 9999px (no soft-rounded buttons). Either pill or square.
- Don't add a third accent color. The site is fundamentally 3 colors (cream / orange / white) + 1 dark text.
- Don't use Material/Apple system fonts. Stick to Archivo Black + Inter + Noto SC.
- Don't show the bull mascot at less than 60% viewport-min on the Hero (it's the protagonist).
- Don't add gradients except the lens glow radial. Flat fills.
- Don't use icons from a brand-icon set (Facebook/Instagram logos) — lucide-react 1.x dropped them and we use text/SVG badges instead.
- Don't auto-play sound on page load. Sound is triggered by click only (see GlobalClickSound), and respects the user's volume/mute prefs in localStorage.

---

## 8. Responsive Behavior

Breakpoints (Tailwind default, mobile-first):
- `sm` 640px — single col, hamburger nav
- `md` 768px — 2-col grids, persistent nav
- `lg` 1024px — 3-col service grid
- `xl` 1280px — 4-col case study grid

**Hero on mobile** (≤768px):
- 55-frame flipbook is heavy (18 MB) — keep it BUT lazy-load first 20 frames and progressive-load the rest. Show frame 0 immediately as static fallback during load.
- Pin length reduces to `+=120%` (vs `+=180%` desktop) so the flip happens faster on small viewports.
- Mascot occupies 90vw on mobile (vs `min(80vw,80vh)` desktop).
- Marquee background text scales to `12vh` (was 18vh).

**Touch targets**: minimum 44×44 px (Apple HIG). Volume control slider hidden on mobile, only the mute toggle is shown.

---

## 9. Animation Principles

- **All scroll-triggered animations use GSAP + ScrollTrigger + Lenis** (already wired in `hooks/useLenis.ts`). No CSS-only `scroll-driven-animations` (browser support gaps).
- **Hero timeline**: precisely follows the original `test/index.html` lines 1451-1499 choreography. See `BULL_ANIMATION_MIGRATION.md`. Numbers in that file are the contract.
- **Section entrances** (services, cases, testimonials): subtle `fade + translateY(20px)` over 600ms, ease `power2.out`, triggered when section is 20% in viewport. Use Framer Motion `whileInView` (already installed).
- **Hover**: never longer than 200ms. Lift = 1-2px, never 8px.
- **Sparks on Hero flash**: 18 particles, radial dispersion 220-400px, opacity 0→1→0 over ~1s. Already implemented.
- **Reduced motion**: respect `@media (prefers-reduced-motion: reduce)` — skip the entire hero scroll animation, render the final state immediately. (TODO — currently not implemented.)

---

## Agent Quick-Reference (read me first)

When generating a new component or page for GYD Marketing:

1. **Background = `bg-[var(--gyd-bg)]`** unless you have a reason.
2. **Text = `text-[var(--gyd-fg)]`**, secondary = `text-[var(--gyd-muted)]`.
3. **CTA buttons** = primary pill (section 4.1), nothing else.
4. **Cards** use section 4.3 spec, never raw shadcn `Card` defaults.
5. **Section spacing** = `py-[clamp(64px,12vh,144px)]`.
6. **Headings** stack EN display + ZH display (section 3).
7. **Content text** = pull from Sanity via `pickLocalized()`, never hard-code.
8. **Don't add new colors.** If you reach for a color that's not in section 2, stop and ask.

---

**File version**: v1.0 · 2026-05-14
**Source documents**:
- `../docs/MASTER_BRIEF.md` (content + brand spec)
- `../docs/profile 2025 3.pdf` (visual reference)
- `../docs/BULL_ANIMATION_MIGRATION.md` (Hero animation contract)
- `../docs/ADMIN_PANEL_PLAN.md` (Sanity backend)
