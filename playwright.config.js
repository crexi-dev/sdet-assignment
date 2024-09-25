require('dotenv').config();

module.exports = {
    timeout: 30000,  // Timeout for each test
    retries: 2,      // Number of retries in case of test failure
    workers: 4,
    use: {
      headless: true, // Run tests in headless mode
      baseURL: process.env.BASE_URL,
    },
    testDir: './tests',
    projects: [
      { name: 'Chromium', use: { browserName: 'chromium' } },
    //   { name: 'Firefox', use: { browserName: 'firefox' } },
    //   { name: 'WebKit', use: { browserName: 'webkit' } },
    ],
  };
  