const { defineConfig } = require("@playwright/test");

/**
 * Read environment variables  from .env file
 * httpa://github.com/motdotla/dotenv
 */

if (process.env.TEST_ENV === "test") {
  require("dotenv").config({ path: "./env/test.env" });
}

/**
 * @see https://playwright.dev/docs/test-configuration
 */

module.exports = defineConfig({
  // Run tests in headless browsers
  use: {
    headless: process.env.CI ? true : false,
    screenshot: "only-on-failure",
    // Collect trace when retrying failed tests. See https://playwright.dev/docs/trace-viewer
    trace: "retain-on-failure",
  },
  // Test files
  testDir: "./tests",
  // Test timeout
  timeout: 180000,
  fullyParralel: true,
  viewport: { width: 1920, height: 1080 },
  //Retry on CI only
  retries: process.env.CI ? 1 : 0,
  // Number of workers on CI, use default
  workers: process.env.CI ? 4 : undefined,
  // Reporter to use. See https://playwright.dev/docs/test-reporters
  reporter: [
    ["html", { outputFolder: "reports/playwright" }],
    ["junit", { outputFile: "results.xml" }],
  ],
  // Keeping only one browser in here for simplicity
  projects: [
    {
      name: "chrome",
      use: { browserName: "chromium" },
    },
  ],
});
