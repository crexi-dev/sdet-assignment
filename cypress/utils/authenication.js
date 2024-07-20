export function signUp(role) {
  const emailAddress =
    "jackieNgo+" + (+new Date()).toString().slice(7) + "@gmail.com";
  const randomPassword = Array.from({ length: 12 }, () =>
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(
      Math.floor(Math.random() * 52)
    )
  ).join("");
  const phoneNumber = 6263776001;

  Cypress.env("email", emailAddress);
  Cypress.env("password", randomPassword);

  cy.visit("/");
  cy.contains(".mdc-button__label", "Sign Up or Log In")
    .should("be.visible")
    .click();
  cy.get('[id="signupModal"]').should("be.visible");
  cy.get('input[name="firstName"]').type("Jackie");
  cy.get('input[name="lastName"]').type("Ngo");
  cy.get('input[name="email"]').type(emailAddress);
  cy.get('input[name="password"]').type(randomPassword);
  cy.get('[aria-label="Select Your Role"]').click();
  if (role === "Listing Broker/Agent") {
    cy.get('[data-cy="dropdownItem-Listing Broker/Agent"]').click();
    cy.get('[formcontrolname="licenseStateCode"]').click();
    cy.get('[data-cy="dropdownItem-CA"]').click();
    cy.get('[formcontrolname="licenseNumber"]').type(1234);
  } else {
    cy.get(`[data-cy="dropdownItem-${role}"]`).click();
  }
  cy.get('[formcontrolname="numberOfActiveListings"]').click();
  cy.get('[data-cy="dropdownItem-0"]').click();
  cy.get('input[name="phone"]').type(phoneNumber);
  cy.get('[data-cy="button-signup"]').click();
}

export function companyInfo(size) {
  cy.get('[aria-label="Select company size"]').click();
  cy.get(`data-cy="dropdownItem-${size}"`).click();
  cy.get('[formcontrolname="companyName"]').type("QA Company");
  cy.get('[form="profile-information-form"]').click();
}

export function login(
  email = Cypress.env("email"),
  password = Cypress.env("password")
) {
  cy.visit("/");
  cy.contains(".mdc-button__label", "Sign Up or Log In")
    .should("be.visible")
    .click();
  cy.contains(".tab", "Log In").click();
  cy.get('[formcontrolname="email"]').type(email);
  cy.get('[formcontrolname="password"]').type(password);
  cy.get('[data-cy="button-login"]').click();
  cy.get('[data-cy="button-login"]').should("not.be.visible");
}

export function changeAvatar() {
  cy.get('[data-cy="hamburgerButton"]').click();
  cy.get('a[data-cy="hamburgerMenuItem"][href="/dashboard/my-crexi"]').click();
  cy.url().should("eq", "https://www.crexi.com/dashboard/my-crexi");
  cy.get("#mat-expansion-panel-header-2").click();
  cy.contains("Account Settings").click();
  cy.url().should("eq", "https://www.crexi.com/dashboard/profile");
  cy.get('[data-cy="userAvatar"]').click();
  cy.get('input[name="fileInput"]')
    .first()
    .selectFile("cypress/fixtures/flower.jpg");
  cy.contains("button", "Update").click();
  cy.contains("Your personal info has been updated.").should("be.visible");
}
