# HOOK verification — 15 November 2026

## Completed

- `npm run lint`: passed with no errors or warnings.
- `npm run typecheck`: passed.
- `npm run build`: passed; static production output is in `dist/`.
- `npm audit`: zero reported vulnerabilities.
- `npm audit --omit=dev`: zero reported production vulnerabilities.
- Development server and production preview both served successfully.
- Production HTML, favicon and sharing PNG returned HTTP 200 with the expected content types.

## Browser verification

Tested the actual page in the Chromium-based in-app browser, including the built production output, using viewport overrides:

| Viewport width | Usable width with scrollbar | Page scroll width | Horizontal overflow |
| --- | --- | --- | --- |
| 320 | 305 | 305 | None |
| 390 | 375 | 375 | None |
| 768 | 753 | 753 | None |
| 1024 | 1009 | 1009 | None |
| 1440 | 1425 | 1425 | None |

- One H1; 16 main content sections plus navigation and footer = 18 requested sections.
- All same-page links resolve to existing anchors.
- All five supplied names and roles are displayed correctly.
- Mobile menu opens, closes after selecting a section, and closes with Escape while restoring focus to its toggle.
- All nine FAQ entries tested; expanded state and visible answer agree. Opening another answer closes the previous answer. Enter toggles the focused question.
- Signup, login, recruiter, Premium, privacy, terms and contact controls display their appropriate availability notices.
- Dialog Tab and Shift+Tab explicitly wrap between its controls. Escape closes the notice and focus returns to the triggering CTA.
- No production console errors or warnings observed. Transient development HMR warnings during file rewrites were superseded by a successful production build and fresh production-page checks.
- Desktop hero, CATS and HOOK BRIDGE compositions reviewed visually; mobile hero/navigation and responsive product layouts checked.
- Reduced-motion CSS and Motion configuration reviewed in source. The operating-system preference was not changed.
- Social sharing image visually inspected at 1200 × 630.

## Issues fixed during QA

1. Removed unused imports and separated shared context/icon exports to pass lint cleanly.
2. Tightened product-mockup line boxes and improved secondary text contrast.
3. Corrected the CV preview overflow at the smallest viewport and accounted for the browser's scrollbar width.
4. Preserved spaces in headings whose line breaks disappear on mobile.
5. Added explicit modal focus wrapping after keyboard testing identified focus leaving the dialog.
6. Scoped a patched minimatch override to the development lint parser; the audit now reports zero vulnerabilities.
7. Restricted self-hosted font imports to the Latin subset used by this page.

## Evidence

- `docs/screenshots/hook-desktop.jpg`
- `docs/screenshots/hook-bridge-desktop.jpg`
- `docs/screenshots/hook-mobile.jpg`

Desktop screenshots use the browser viewport override; the in-app capture may resample them. The mobile image was saved at the browser's native panel size.

## Scope and remaining inputs

- No logo or team images were supplied. Temporary text branding and initials are clearly identified and configurable in `src/config.ts`.
- There are no live authentication, registration, recruiter onboarding, legal or contact destinations. Confirmed URLs can be added through `.env.local`.
- No fabricated prices, testimonials, partnerships, contact details or customer metrics are used. Every product dashboard is marked illustrative.
- No real-device Safari/Firefox testing, screen-reader session or formal WCAG conformance audit was performed. Browser viewport testing does not replace those checks.
- This is the requested single-page marketing site. Product dashboards are demonstrations, not an implemented portal or backend.
- No public deployment, DNS configuration, domain purchase or TLS provisioning was performed. Deployment steps and domain-dependent metadata are documented in `README.md`.
- Temporary test servers were stopped after verification. Start the development preview with `npm run dev` or serve the production build with `npm run preview`.
