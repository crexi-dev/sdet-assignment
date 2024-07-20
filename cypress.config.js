const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://www.crexi.com/",
    defaultCommandTimeout: 30000,
    retries: 0,
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
});
