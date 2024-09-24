const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'tpywq4',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: false,  // This disables the support file requirement
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mocha',
    overwrite: false,
    html: true,
    json: true,
  },
});
