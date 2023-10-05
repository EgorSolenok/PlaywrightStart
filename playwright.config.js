// @ts-check
const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();

module.exports = defineConfig({
  globalSetup: 'utils/global-setup.js',
  testDir: './tests',
  outputDir: 'reporting',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'on-failure' }]],
  timeout: 30000,
  expect: {
    timeout: 10000
  },

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on'
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    }
    // {
    //   name: 'local',
    //   use: {
    //     baseURL: baseEnvUrl.local.home,
    //   },
    // },

    // {
    //   name: 'ci',
    //   use: {
    //     baseURL: process.env.CI
    //       ? baseEnvUrl.ci.prefix + process.env.GITHUB_REF_NAME + baseEnvUrl.ci.suffix //https://dev-myapp-chapter-2.mydomain.com
    //       : baseEnvUrl.staging.home,
    //   },

  ],
});

