const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here (optional)
    },

    specPattern: "cypress/e2e/**/*.spec.js",
    baseUrl: "https://www.saucedemo.com",

    env: {
      apiBaseUrl: "https://jsonplaceholder.typicode.com"
    },

    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: false,
      json: true,
      reportFilename: "report"  // <-- fixed name
    }
  }
});
