const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/**/*.spec.js",  // ensures your *.spec.js files are found
    baseUrl: "https://www.saucedemo.com"     // optional, useful for cy.visit()
  },
});
