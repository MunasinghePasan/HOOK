import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests/browser",
  workers: 1,
  use: {
    baseURL: "http://127.0.0.1:5178",
    reducedMotion: "reduce",
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
  },
  webServer: {
    command: "npx vite --host 127.0.0.1 --port 5178 --strictPort",
    url: "http://127.0.0.1:5178",
    env: { VITE_RECAPTCHA_SITE_KEY: "browser-test-fixture" },
    reuseExistingServer: false,
  },
});
