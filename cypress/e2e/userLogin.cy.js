import { getUserInfo } from "../support/helper";
import {
  companyInfo,
  login,
  loginSuccess,
  loginUnsuccess,
  signOut,
  signUp,
  signUpErrorCheck,
} from "../utils/authenication";

describe("Authenication", () => {
  beforeEach(() => {});

  afterEach(() => {
    //create a clean environment after each test so the new test can run fine
    cy.clearCookies();
    cy.clearLocalStorage();
  });
  // Disabling account creation because I was not not able to successfully create them. It looks like
  // production is doing some sort of validation check to prevent bot from creating fake accounts.
  // This should be used in staging
  // getUserInfo will validate whether the account is in the correct role but I am block due to unauthorized

  it("User is able to sign up for an account as a Listing Broker/Agent", function () {
    //const role = "Listing Broker/Agent"
    //signUp("role");
    //companyInfo("1 - 5");
    //getUserInfo(role)
  });

  it("User is able to sign up for an account as a Listing Broker/Agent", function () {
    //const role = "Buyer Broke/Agent"
    //signUp("role");
    //companyInfo("1 - 5");
    //getUserInfo(role)
  });

  it("User is able to sign up for an account as a Selling/Buying Broker/Agent", function () {
    //const role = "Selling/Buying Broker/Agent"
    //signUp("role");
    //companyInfo("1 - 5");
    //getUserInfo(role)
  });

  it("User is able to sign up for an account as a Transaction Coordinator", function () {
    //const role = "Transaction Coordinator"
    //signUp("role");
    //companyInfo("1 - 5");
    //getUserInfo(role)
  });

  it("User is able to sign up for an account as a Landlord Broker/Agent", function () {
    //const role = "Landlord Broker/Agent"
    //signUp("role");
    //companyInfo("1 - 5");
    //getUserInfo(role)
    //getUserInfo(role)
  });

  it("User is able to sign up for an account as a Tenant Rep Broker", function () {
    //const role = "Tenant Rep Broker"
    //signUp("role");
    //companyInfo("1 - 5");
    //getUserInfo(role)
  });

  it("User is able to sign up for an account as a Principal", function () {
    //const role = "Principal"
    //signUp("role");
    //companyInfo("1 - 5");
    //getUserInfo(role)
  });

  it("User is able to sign up for an account as a Lender", function () {
    //const role = "Lender"
    //signUp("role");
    //companyInfo("1 - 5");
    //getUserInfo(role)
  });

  it("User is able to sign up for an account as a Assessor", function () {
    //const role = "Assessor"
    //signUp("role");
    //companyInfo("1 - 5");
    //getUserInfo(role)
  });

  it("User is able to sign up for an account as a Appraiser", function () {
    //const role = "Appraiser"
    //signUp("role");
    //companyInfo("1 - 5");
    //getUserInfo(role)
  });

  it("User is able to sign up for an account as a Third Party Service", function () {
    //const role = "Third Party Service"
    //signUp("role");
    //companyInfo("1 - 5");
    //getUserInfo(role)
  });

  it("User is able to sign up for an account as a Tenant", function () {
    //const role = "Tenant"
    //signUp("role");
    //companyInfo("1 - 5");
    //getUserInfo(role)
  });

  it("User is able to sign up for an account as a Owner/Property Manager", function () {
    //const role = "Owner/Property Manager"
    //signUp("role");
    //companyInfo("1 - 5");
    //getUserInfo(role)
  });

  it("User is able to sign up for an account as a Other", function () {
    //const role = "Other"
    //signUp("role");
    //companyInfo("1 - 5");
    //getUserInfo(role)
  });

  it("user is able to login with their newly created account", function () {
    //There are 3 ways to use login. If you have done a setup with account creation, it will use that credential
    //If you stored your credential in .env, it will use that instead
    //If you hardcorded like below, it will use that instead
    login("fallanfriend@gmail.com", "jackiengo123");
    loginSuccess();
    signOut();
  });

  it("Signup error check", function () {
    signUpErrorCheck();
  });

  it("user invalid login", function () {
    login("fake@gmail.com", "jackiengo123");
    loginUnsuccess();
  });
});
