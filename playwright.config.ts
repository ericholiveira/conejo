import { PlaywrightTestConfig, devices } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: 'tests/e2e/',
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  reporter: [
    [
      'html',
      {
        outputFolder: 'report',
        open: 'never',
      },
    ],
  ],
  webServer: {
    command: 'npm run start',
    url: 'http://127.0.0.1:4002',
  },
  use: {
    headless: true,
    ignoreHTTPSErrors: true,
    baseURL: 'http://127.0.0.1:4002',
    video: 'off',
  },
}
export default config
