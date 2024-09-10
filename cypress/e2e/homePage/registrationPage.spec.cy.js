import registrationForm from "../../page_objects/signInForm.page";
import mainPage from "../../page_objects/main.page";
import errorMessage from "../../fixtures/verification.json";
import verification from "../../fixtures/credentials.json";

describe("Registration", () => {
  beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.errorHandler();
    cy.visit("/");
  });

  it("Should Sign Up using valid data as Owner/Property Manager", () => {
    //we can use 3 way of passing data:
    // 1.Writing them manually, 2.Using fakerjs 3.Putting them within fixtures file to
    mainPage.signupAndLoginButton.click();
    registrationForm.firstNameInputField.type("TestName");
    registrationForm.lastNameInputField.type("TestLastName");
    registrationForm.emailInputField.type("email@email.com");
    registrationForm.passwordInputField.type("123password123");
    registrationForm.roleDropDownMenu.click();
    cy.contains("Owner/Property Manager").click();
    registrationForm.phoneInputField.type("7471112233");
    //i cannot complete these step, since there might be some bot that blocks creation via cypress/framework.
  });
  //since i cannot use this in prod, i would just state what test i would have done if that would be staging env:
  // it("User is able to sign up for an account as a Listing Broker/Agent", ()  => {})
  // it("User is able to sign up for an account as a Listing Broker/Agent", ()  => {})
  // it("User is able to sign up for an account as a Selling/Buying Broker/Agent",()  => {})
  // it("User is able to sign up for an account as a Transaction Coordinator",()  => {})
  // it("User is able to sign up for an account as a Landlord Broker/Agent",()  => {})
  // it("User is able to sign up for an account as a Tenant Rep Broker",()  => {})
  // it("User is able to sign up for an account as a Principal",()  => {})
  // it("User is able to sign up for an account as a Lender",()  => {})
  // it("User is able to sign up for an account as a Assessor",()  => {})
  // it("User is able to sign up for an account as a Appraiser",()  => {})
  // it("User is able to sign up for an account as a Third Party Service",()  => {})
  // it("User is able to sign up for an account as a Tenant",()  => {})
  // it("User is able to sign up for an account as a Owner/Property Manager",()  => {})
  // it("User is able to sign up for an account as a Other",()  => {})

  it("Should be able to Login with existing/created account and Logout", () => {
      mainPage.signupAndLoginButton.click();
      registrationForm.logInTab.click();
      registrationForm.emailInputField.type(verification.brokerUser.email);
      registrationForm.passwordInputField.type(verification.brokerUser.password);
      registrationForm.loginButton.click();
      cy.get('[data-cy="authorizationForm"]').should("not.exist");
      registrationForm.signOut()
    });

  it("Should see error messages when signing up with empty data", () => {
    mainPage.signupAndLoginButton.click();
    registrationForm.signUpButton.click();
    cy.wait(1000);
    registrationForm.firstNameErrorMessage.should("be.visible").and("have.text", errorMessage.missedFirstName);
    registrationForm.lastNameErrorMessage.should("be.visible").and("have.text", errorMessage.missedLastName);
    registrationForm.emailErrorMessage.should("be.visible").and("have.text", errorMessage.missedEmail);
    registrationForm.passwordErrorMessage.should("be.visible").and("have.text", errorMessage.missedPassword);
    registrationForm.roleErrorMessage.should("be.visible").and("have.text", errorMessage.missedRole);
  });

  it("Should Not sign up with invalid email format(no '@' symbol)", () => {
    mainPage.signupAndLoginButton.click();
    cy.wait(1500);
    registrationForm.emailInputField.type("emailemail.com");
    registrationForm.signUpButton.click();
    registrationForm.emailErrorMessage.should("be.visible").and("have.text", errorMessage.invalidEmail);
  });

  it("Should Not sign up with invalid amount of password chars", () => {
    mainPage.signupAndLoginButton.click();
    registrationForm.passwordInputField.should("be.visible").type("12345678901");
    registrationForm.signUpButton.click();
    registrationForm.passwordErrorMessage.should("be.visible").and("have.text", errorMessage.passwordMinLengthError);
  });
  it("Should Not Log in with invalid user data", () => {
    mainPage.signupAndLoginButton.click();
    registrationForm.logInTab.click();
    registrationForm.emailInputField.type(verification.invalidUser.invalidEmail);
    registrationForm.passwordInputField.type(verification.invalidUser.invalidPassword);
    registrationForm.loginButton.click();
    registrationForm.incorrectUserErrorMessage.should("be.visible").and("have.text", errorMessage.loginInvalidData);
  });
});
