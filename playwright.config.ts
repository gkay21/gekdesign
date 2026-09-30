import { defineConfig, devices } from '@playwright/test';

// Override with E2E_PORT if 4173 is taken (e.g. by another project's preview server).
const PORT = Number(process.env.E2E_PORT ?? 4173);

// Runs against the pre-rendered production build, served like a static host.
export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] }, testIgnore: /responsive\.spec\.ts/ },
    { name: 'mobile', use: { ...devices['Pixel 7'] }, testMatch: /responsive\.spec\.ts/ },
  ],
  webServer: {
    command: `pnpm build && pnpm exec serve build/client --listen ${PORT}`,
    url: `http://localhost:${PORT}`,
    // Never reuse: a different site on the same port would be tested silently.
    reuseExistingServer: false,
    timeout: 180_000,
  },
});
