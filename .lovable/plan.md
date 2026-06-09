# AI Portfolio — Plan

An elegant, single-page portfolio in the **Noir & Gold** palette (black + warm gold accents), built around a rotating 3D avatar bust in the hero and an animated ASCII art footer signature.

## Tech additions
- `three`, `@react-three/fiber`, `@react-three/drei` — for the 3D bust hero
- All styling stays in Tailwind v4 via `src/styles.css` design tokens (gold `#c9a84c`, light gold `#f0d78c`, jet `#0d0d0d`, raised black `#1a1a1a`)
- Typography: serif display (Cormorant / Instrument Serif) for headings + clean sans (Inter) for body — loaded via `<link>` in `__root.tsx`

## Page structure (single route, `src/routes/index.tsx`)
1. **Top nav** — minimal: monogram left, anchor links right (Work · About · Contact)
2. **Hero**
   - Left: name, "4th-year B.Tech · Artificial Intelligence", one-line positioning, two thin gold-outline CTAs (View Work · Get in Touch)
   - Right: **3D avatar bust** in a Canvas — slow auto-rotate, subtle mouse parallax, gold rim light on black. Since no model file was provided, I'll use a stylized procedural bust (drei `<Sphere>` morphed + `MeshDistortMaterial` head + shoulders, or a free CDN-hosted GLB head model loaded via `useGLTF`). You can swap in your own `.glb` later by dropping it into `src/assets/`.
3. **About** — short bio paragraph, AI/ML focus areas, current year
4. **Skills** — quiet two-column list (Languages, ML/DL, Tools) — no progress bars, just typography
5. **Featured Project — Mac the Helper**
   - Large editorial card: title, tagline ("Never miss a birthday or special day again"), description (message friends & family on their special dates; set date and time, app reminds & helps you send the message), feature bullets, mock UI image (generated)
6. **Other / Coming Soon** — placeholder slots you can fill in later
7. **Contact** — email + social links (GitHub, LinkedIn, X) — placeholders you confirm later
8. **Footer with animated ASCII art**
   - Full-width canvas rendering live animated ASCII (flow-field / wave of characters in gold-on-black, monospace), running on `requestAnimationFrame`
   - Below it: copyright + monogram

## 3D details
- `<Canvas>` with `dpr=[1,2]`, transparent background
- Lighting: warm key light (gold tint) + cool fill, soft shadows
- Material: dark matte with gold rim via `MeshStandardMaterial` + emissive edge or `Edges` component
- Idle auto-rotate; pauses on hover and follows cursor slightly
- Lazy-loaded with `Suspense` + a thin gold loading line so initial paint stays fast

## Animated ASCII footer details
- HTML `<pre>` with a fixed character grid (e.g. 120×18)
- Each frame computes a value per cell from `sin/cos` of position + time, mapped to a character ramp `" .:-=+*#%@"`
- Color: gold (`#c9a84c`) on black; opacity falloff at edges for an elegant vignette
- Pauses when off-screen (IntersectionObserver) for battery friendliness

## Design tokens (added to `src/styles.css`)
- `--background: #0d0d0d`, `--foreground: #f0d78c` (light gold for body)
- `--primary: #c9a84c` (gold), `--primary-foreground: #0d0d0d`
- `--muted: #1a1a1a`, `--border: rgba(201,168,76,0.18)`
- `--font-display`, `--font-sans` mapped to the chosen serif + Inter

## What I need from you later (not blockers)
- Real bio paragraph + skill list
- Your GitHub / LinkedIn / email
- Optional: a `.glb` of a head you'd like to use instead of the procedural bust
- A Mac the Helper screenshot (otherwise I'll generate a stylized mockup)

## Out of scope for v1
- CMS / backend (static site for now)
- Contact form submission (mailto link instead)
- Blog

Approve to build.
