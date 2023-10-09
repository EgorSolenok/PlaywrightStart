// @ts-check
require('dotenv').config()
const path = require('path')
const { defineConfig, devices } = require('@playwright/test')
const { STORAGE_STATE_PATH } = require('./common-data/paths.json')

module.exports = defineConfig({
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
    },
    {
      name: 'setup',
      testMatch: '**/*.setup.js',
    },
    {
      name: 'authin',
      testMatch: '**/*.auth.spec.js',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE_PATH,
      },
    },
    {
      name: 'authout',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: ['**/*auth.spec.js']
    },
  ],
})
