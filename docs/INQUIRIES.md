# HOOK inquiry setup

Use Node 22.13 or newer. Run commands from the directory containing package.json.

## Local setup

1. Install dependencies with `npm ci`. In PowerShell, use the ignored .env.local file. On a fresh checkout, copy .env.example to .env.local only if .env.local does not already exist.
2. Sign in to the HOOK sender account and enable [Google 2-Step Verification](https://myaccount.google.com/signinoptions/two-step-verification). Open [App passwords](https://myaccount.google.com/apppasswords), create one named “HOOK website”, and put the generated app password into SMTP_PASSWORD without display spaces. Use the same account for SMTP_USER. App-password availability depends on the account's security settings and Workspace administrator. See [Google's prerequisites](https://support.google.com/accounts/answer/185833).
3. Open the [reCAPTCHA admin console](https://www.google.com/recaptcha/admin/create), label the integration, select the **Challenge (v2)** type and **“I'm not a robot” Checkbox**, and register the hostname **localhost** for development. For production, register your actual website hostname (and www hostname if used). Enter hostnames without protocols, paths or ports. Use a separate key pair for production. Keep domain validation enabled. [Domain settings](https://developers.google.com/recaptcha/docs/domain_validation)
4. Copy the public site key to VITE_RECAPTCHA_SITE_KEY. Set RECAPTCHA_SECRET_KEY to the corresponding siteverify-compatible secret (legacy secret for a Cloud-managed key). Set RECAPTCHA_HOSTNAMES to the exact comma-separated hostnames from which visitors submit the form. Use http://localhost:5173 when testing the localhost key. [Checkbox setup](https://developers.google.com/recaptcha/docs/display) · [Server verification](https://developers.google.com/recaptcha/docs/verify)
5. Run `npm.cmd run dev`. The launcher starts the inquiry API on an available loopback port and Vite proxies /api to it. Open the printed port using localhost, normally http://localhost:5173/#inquiry. Restart this command after editing .env.local. A blank public key displays the direct email option. Invalid or absent server credentials disable submissions or return a submission failure.
6. After configuring real credentials, submit one inquiry using an address you control. Confirm both messages arrive, that replying to the admin message targets the submitter, and that the timestamp shows Asia/Colombo time.

## Environment settings

| Variable | Value or use |
| --- | --- |
| SMTP_HOST | smtp.gmail.com |
| SMTP_PORT | 465 |
| SMTP_SECURE | true for implicit TLS on 465. With false, STARTTLS is required. |
| SMTP_USER | hookprojectbysemicolon@gmail.com |
| SMTP_PASSWORD | Generated Gmail app password, server only |
| INQUIRY_RECEIVER_EMAIL | Defaults to hookprojectbysemicolon@gmail.com |
| VITE_RECAPTCHA_SITE_KEY | Public checkbox key, required at frontend build time |
| RECAPTCHA_SECRET_KEY | Matching Google secret, server only |
| RECAPTCHA_HOSTNAMES | Comma-separated exact hosts; set explicitly in production |
| PORT | Node HTTP port, default 3001 |
| HOST | Default 127.0.0.1; set 0.0.0.0 when required by the hosting platform |
| TRUSTED_PROXY_IP | Optional trusted reverse proxy IP or CIDR, used to identify clients for rate limiting |
| NODE_ENV | Set to production when running the deployed service |

The SMTP and verification secrets belong in the hosting platform's runtime secrets. Vite variables are public. Rebuild when changing the public site key.

## Production

Deploy one Node web service with outbound HTTPS access to Google and outbound TCP 465 to Gmail. Use `npm ci && npm run build` as the build command and `npm start` as the start command. Ship server/, shared/, dist/, package.json and runtime dependencies. Use the service's assigned PORT and bind HOST as required. Point the domain at the host, enable HTTPS, and forward the site's paths to this service. The frontend posts to the relative /api/inquiry URL, so no API base URL or cross-origin access is required.

For an existing static frontend host, configure a same-origin **reverse proxy** for /api/* to the HTTPS Node service; keep the frontend's public files on the static host. A static-files-only deployment needs this forwarding service to accept submissions. Configure the proxy to overwrite forwarded client IP headers and restrict direct backend ingress before setting TRUSTED_PROXY_IP to that proxy's address. With no trusted proxy configured the limit applies to each connecting peer.

The endpoint allows 10 attempts per client per 15 minutes and JSON requests up to 24 KB. Google verification precedes SMTP. Gmail's acceptance of the administrator message establishes receipt; acknowledgement acceptance is reported independently. Final mailbox delivery is determined by the recipient mail system. Server logs report failure stages without message bodies, credentials or tokens.

This configuration runs one Node instance. Rate counters and completed request IDs are held in process memory (receipt retention 30 minutes). They reset on restart. For multiple instances, share rate counters and persist receipt state across workers. SMTP acceptance and a local receipt cannot be committed atomically across a process crash.

## Files and verification

- src/components/InquirySection.tsx and inquiry.css implement form validation, verification, accessible feedback and layout. SocialLinks.tsx contains the footer profiles map. Set a confirmed URL on a disabled entry to activate its icon.
- src/App.tsx and src/components/Sections.tsx place the form and extend both navigations and the footer. src/config.ts updates the contact and privacy notices.
- shared/inquiry.mjs and its TypeScript declarations share field limits, validation and contact constants.
- server/config.mjs validates configuration, server/app.mjs handles submission, server/start.mjs configures SMTP and serves the built site, and server/mail.mjs renders both HTML/plain-text messages. Both messages embed the official JPEG as an inline Content-ID attachment with HOOK alt text. The file is loaded from public/images during development or dist/images in a built deployment.
- package.json, package-lock.json, vite.config.ts, .env.example and .gitignore contain runtime, proxy and environment setup.
- Runtime dependencies added: express, express-rate-limit, nodemailer and react-google-recaptcha. Development dependencies added: @types/react-google-recaptcha and @playwright/test.
- Run `npm test` for mocked backend tests. For browser tests, install Chromium with `npx playwright install chromium` and run `npm run test:browser`. With Chrome already installed on Windows, set `$env:PLAYWRIGHT_CHANNEL='chrome'` instead. Playwright starts a separate test server and intercepts the Google script and API responses in the test browser only.
- Run `npm run lint`, `npm run typecheck` and `npm run build`. Browser tests cover 320, 768, 1100 and 1440 pixel widths. No live verification or email delivery was exercised during implementation.

