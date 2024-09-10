const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: false,
      json: true
    },
    baseUrl: "https://www.crexi.com/",
    defaultCommandTimeout: 20000,
    // retries: 3,
    viewportWidth: 1920,
    viewportHeight: 1080,
    screenshotOnRunFailure: true,
    screenshotsFolder: "cypress/screenshots",
  },
});
