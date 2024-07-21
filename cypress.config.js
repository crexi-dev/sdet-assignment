require("dotenv").config();
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://www.crexi.com/",
    defaultCommandTimeout: 30000,
    retries: 3,
    viewportWidth: 1920,
    viewportHeight: 1080,
    env: {
      hardcoded_email: process.env.CYPRESS_hardcoded_email,
      hardcoded_password: process.env.CYPRESS_hardcoded_password,
    },
  },
});
