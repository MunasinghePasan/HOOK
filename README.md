# HOOK landing page

One continuous marketing page built with React, TypeScript, Vite, Tailwind CSS, Lucide and Motion. The original landing page includes an additional Inquiry section immediately before the footer. Product mockups are illustrative frontend components. An Express service receives website inquiries and sends the two SMTP messages.

## Run locally

Use Node.js 22.13+ (verified with Node 24).

```sh
npm ci
npm run dev
```

For the complete form, follow the [inquiry setup guide](docs/INQUIRIES.md) for credential setup. The development command starts Vite and the inquiry API together. Open http://localhost:5173 for a key registered to localhost.

```sh
npm run lint
npm run typecheck
npm run build
npm run preview
```

The production build is written to `dist/`. Fonts are self-hosted; no external image or font service is required at runtime.

## Files and content

- `src/App.tsx`: single-page composition and availability notices.
- `src/components/Sections.tsx`: all marketing sections, navigation, FAQs, pricing and team.
- `src/components/Mockups.tsx`: responsive product previews with sample records.
- `src/components/UI.tsx`: shared controls, reveal animation, native modal dialog and labels.
- `src/styles.css`: design system and responsive layouts.
- `src/config.ts`: official logo path, all five team photo mappings, copyright year, CTA destinations and availability copy.
- `src/icons.ts`, `src/notice-context.ts`: shared icon map and notice context.
- `index.html`: title, description and social metadata.
- `public/favicon.png`, `public/social-preview.png`: brand assets derived from the official JPEG.
- `docs/QA.md`: verification results and limits.

## Replace missing official assets

The supplied logo is stored at public/images/hook-logo.jpeg. Team portraits currently use initials. No fictional portraits or team biographies are used.

Place the official files in `public/images/` and `public/images/team/`, then update the matching entries in `src/config.ts`:

```ts
logo: "/images/hook-logo.jpeg";
// Nirmal's team entry:
photo: "/images/team/nirmal-kalubowila.jpg";
```

All image paths are maintained in that one file. The logo is rendered proportionally. Photos use `object-fit: cover` and `object-position: center 25%`; adjust the crop only if a supplied photograph needs it. The five names and roles follow the supplied brief exactly.

## Configure real destinations

Copy `.env.example` to `.env.local` and set only confirmed destinations. Restart the dev server or rebuild after changing them.

- `VITE_LOGIN_URL`
- `VITE_SIGNUP_URL`
- `VITE_RECRUITER_URL`
- `VITE_PRIVACY_URL`
- `VITE_TERMS_URL`


Use complete HTTP(S) URLs. Empty or invalid values show an accessible, honest availability notice. The footer Contact link opens the inquiry form. Premium pricing remains “Coming Soon.”

## Deploy on a custom .com or .lk domain

Deploy the Node service behind HTTPS to serve the built frontend and its inquiry endpoint. See [production configuration](docs/INQUIRIES.md#production).

Before public launch, replace missing official assets, configure verified app/legal/contact links, confirm product availability and plan limits, and update `index.html` with absolute production URLs for `og:image` and `twitter:image`. Add the final canonical URL and `og:url` once the domain is known. The supplied sharing image is 1200 × 630 PNG; no production hostname has been invented. The optional Windows script `scripts/create-social-preview.ps1` regenerates the sharing graphic and favicon.

This task prepares a local deployment-ready build. It does not purchase a domain, configure DNS, publish legal policies or deploy to a hosting account.

## Implementation notes

- Accessible mobile disclosure navigation with Escape support and active section links.
- Native modal dialog with focus containment, Escape dismissal, scroll lock and focus restoration.
- Keyboard-operable FAQ, one expanded answer at a time.
- Smooth scrolling, one-time section reveals, hover states and `prefers-reduced-motion` support.
- The configured inquiry form uses Google reCAPTCHA and sends validated contact information to the HOOK team.
- Static product controls intentionally illustrate the platform; the inquiry form is connected to the Node API.
- A scoped dependency override upgrades the lint parser's `minimatch` dependency to the patched 11.x series. This does not enter the production bundle.
