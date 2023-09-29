// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  globalSetup: 'utils/globalSetup.js',
  testDir: './tests',
  outputDir: 'reporting',
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { open: 'on-failure' }]],
  // reporter: [['html', { open: 'always' }]],
  timeout: 60000,
  expect: {
    timeout: 10000
  },

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    // Capture screenshot after each test failure.
    screenshot: 'only-on-failure',
    // Record video only when retrying a test for the first time.
    video: 'on'
  },
  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // viewport: { width: 1280, height: 720 },
      },
    },
    // {
    //   name: 'all-browsers-and-tests',
    //   use: {
    //     // baseURL: 'https://playwright.dev/',
    //     ...devices['Desktop Chrome']
    //   },
    // },
    // {
    //   name: 'all-browsers-and-tests',
    //   use: {
    //     // baseURL: 'https://playwright.dev/',
    //     ...devices['Desktop Firefox']
    //   },
    // },

    // Example only
    // {
    //   name: 'local',
    //   use: {
    //     baseURL: baseEnvUrl.local.home,
    //   },
    // },

    // Example only
    // {
    //   name: 'ci',
    //   use: {
    //     baseURL: process.env.CI
    //       ? baseEnvUrl.ci.prefix + process.env.GITHUB_REF_NAME + baseEnvUrl.ci.suffix //https://dev-myapp-chapter-2.mydomain.com
    //       : baseEnvUrl.staging.home,
    //   },
    /**
     * GitHub variables: https://docs.github.com/en/actions/learn-github-actions/variables
     * GitLab variables: https://docs.gitlab.com/ee/ci/variables/predefined_variables.html#predefined-variables-reference
     */
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

