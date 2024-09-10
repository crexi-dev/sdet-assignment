// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
import user from "../fixtures/credentials.json";
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("errorHandler", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false;
  });
});

//LOGIN COMMAND (cy.login)
Cypress.Commands.add("loginByApi", (email = user.brokerUser.email, password = user.brokerUser.password) => {
  cy.request({
    method: "POST",
    url: "https://api.crexi.com/token", // Replace with your actual login API URL
    form: true, // Set to true to use form data
    body: {
      grant_type: "password",
      username: email,
      password: password,
    },
  }).then((response) => {
    cy.setCookie("crexi-auth", response.body.access_token);
    cy.visit("dashboard/my-crexi");
  });

  Cypress.Commands.add('signout', ()=>{
      cy.visit("/dashboard/my-crexi");
      cy.contains("span.mdc-button__label", "Sign Up or Log In").should(
        "not.exist"
      );
      //log out
      cy.contains("Log Out").click();
      cy.contains("Are you sure you want to log out?").should("be.visible");
      cy.contains("span.mdc-button__label", "Yes").click();
      cy.contains("span.mdc-button__label", "Sign Up or Log In").should(
        "be.visible"
      );
  })
});
