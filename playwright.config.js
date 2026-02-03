import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 120000,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',

  webServer: {
    command: 'npx http-server . -p 8080 -c-1 --silent',
    url: 'http://localhost:8080/test/index.html',
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },

  use: {
    baseURL: 'http://localhost:8080',
  },

  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
});
