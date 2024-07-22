export function signUp(role) {
  //create a random email
  const emailAddress =
    "jackieNgo+" + (+new Date()).toString().slice(7) + "@gmail.com";
  //create a random password
  const randomPassword = Array.from({ length: 12 }, () =>
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(
      Math.floor(Math.random() * 52)
    )
  ).join("");
  const phoneNumber = 6265559999;

  Cypress.env("email", emailAddress);
  Cypress.env("password", randomPassword);

  // Visit the home page
  cy.visit("/");

  // Click the Sign Up or Log In btn
  cy.contains(".mdc-button__label", "Sign Up or Log In")
    .should("be.visible")
    .click();

  //Wait for signup modal to appear
  cy.get('[id="signupModal"]').should("be.visible");
  //Input the credential info
  cy.get('input[name="firstName"]').type("Jackie");
  cy.get('input[name="lastName"]').type("Ngo");
  cy.get('input[name="email"]').type(emailAddress);
  cy.get('input[name="password"]').type(randomPassword);
  cy.get('[aria-label="Select Your Role"]').click();
  //Add a conditional for listing broker/agent because it has additioal fields
  if (role === "Listing Broker/Agent") {
    cy.get('[data-cy="dropdownItem-Listing Broker/Agent"]').click();
    cy.get('[formcontrolname="licenseStateCode"]').click();
    cy.get('[data-cy="dropdownItem-CA"]').click();
    cy.get('[formcontrolname="licenseNumber"]').type(1234);
  } else {
    //Allow role to by dynamic and reusable
    cy.get(`[data-cy="dropdownItem-${role}"]`).click();
  }
  cy.get('[formcontrolname="numberOfActiveListings"]').click();
  cy.get('[data-cy="dropdownItem-0"]').click();
  cy.get('input[name="phone"]').type(phoneNumber);
  cy.get('[data-cy="button-signup"]').click();
}

export function companyInfo(size) {
  cy.get('[aria-label="Select company size"]').click();
  //Allow company size to be dynamic
  cy.get(`data-cy="dropdownItem-${size}"`).click();
  cy.get('[formcontrolname="companyName"]').type("QA Company");
  cy.get('[form="profile-information-form"]').click();
}

//There are 3 ways to use login. If you have done a setup with account creation, it will use that credential
//If you stored your credential in .env, it will use that instead
//If you hardcorded like below, it will use that instead
export function login(
  email = Cypress.env("email") || Cypress.env("hardcoded_email"),
  password = Cypress.env("password") || Cypress.env("hardcoded_password")
) {
  cy.visit("/");
  //click sign in btn
  cy.contains(".mdc-button__label", "Sign Up or Log In")
    .should("be.visible")
    .click();
  //switch to log in tab
  cy.contains(".tab", "Log In").click();
  //enter credential
  cy.get('[formcontrolname="email"]').type(email);
  cy.get('[formcontrolname="password"]').type(password);
  //please submit btn
  cy.get('[data-cy="button-login"]').click();
}

export function loginSuccess() {
  //wait for the modal to disappear
  cy.get('[data-cy="authorizationForm"]').should("not.exist");
}

export function loginUnsuccess() {
  cy.contains("The email/username or password is incorrect.").should(
    "be.visible"
  );
}

export function cancelLogin() {
  cy.get('[data-cy="button-cancel"]').click();
  cy.get('[data-cy="authorizationForm"]').should("not.exist");
}

export function changeAvatar(type) {
  //click the side bar menu
  cy.get('[data-cy="hamburgerButton"]').click();
  cy.get('a[data-cy="hamburgerMenuItem"][href="/dashboard/my-crexi"]').click();
  cy.url().should("eq", "https://www.crexi.com/dashboard/my-crexi");
  cy.get("#mat-expansion-panel-header-2").click();
  //select account setting
  cy.contains("Account Settings").click();
  cy.url().should("eq", "https://www.crexi.com/dashboard/profile");
  //click on the avatar
  cy.get('[data-cy="userAvatar"]').click();
  //check that it accepts only images
  cy.get('input[name="fileInput"]').should("have.attr", "accept", "image/*");
  //upload an iamge based on type
  cy.get('input[name="fileInput"]')
    .first()
    .selectFile(`cypress/fixtures/${type}`);
  //added a wait if there was something that shows iamge was uploaded successfully, i would wait for that.. this wait is for the image to change
  cy.wait(3000);
  //click update
  cy.contains("button", "Update").click();
  cy.contains("Your personal info has been updated.").should("be.visible");
}

export function signUpErrorCheck() {
  cy.visit("/");
  // Click the Sign Up or Log In btn
  cy.contains(".mdc-button__label", "Sign Up or Log In")
    .should("be.visible")
    .click();
  //Wait for signup modal to appear
  cy.get('[id="signupModal"]').should("be.visible");
  cy.get('[data-cy="button-signup"]').click();
  //Check for error message
  cy.contains("Please enter your first name")
    .scrollIntoView()
    .should("be.visible");
  cy.contains("Please enter your last name")
    .scrollIntoView()
    .should("be.visible");
  cy.contains("Please enter your email address")
    .scrollIntoView()
    .should("be.visible");
  cy.contains("Please enter a password").scrollIntoView().should("be.visible");
  cy.contains("Please select your industry role")
    .scrollIntoView()
    .should("be.visible");

  //Check for valid email
  cy.get('input[name="email"]').type("a");
  cy.contains("The Email field is not a valid e-mail address.")
    .scrollIntoView()
    .should("be.visible");

  //Check for minimum password
  cy.get('input[name="password"]').type("a");
  cy.contains("Minimum 12 characters").scrollIntoView().should("be.visible");

  //Check for state and license number
  cy.get('[formcontrolname="role"]').click();
  cy.get('[data-cy="dropdownItem-Listing Broker/Agent"]').click();
  cy.contains("Please enter state").scrollIntoView().should("be.visible");
  cy.get('[formcontrolname="licenseNumber"]').type("a");
  cy.contains("Minimum 4 characters").scrollIntoView().should("be.visible");
}

export function signOut() {
  cy.visit("/dashboard/my-crexi");
  //if login, you should not see this btn
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
}
