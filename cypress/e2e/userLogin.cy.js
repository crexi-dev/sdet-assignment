import {
  companyInfo,
  login,
  signOut,
  signUp,
  signUpErrorCheck,
} from "../utils/authenication";

describe("Authenication", () => {
  beforeEach(() => {});

  afterEach(() => {});
  // Disabling account creation because I was not not able to successfully create them. It looks like
  // production is doing some sort of validation check to prevent bot from creating fake accounts.
  // This should be used in staging

  // it("User is able to sign up for an account as a Listing Broker/Agent", function () {
  //   signUp("Listing Broker/Agent");
  //   companyInfo("1 - 5");
  // });

  // it("User is able to sign up for an account as a Listing Broker/Agent", function () {
  //   signUp("Buyer Broker/Agent");
  //   companyInfo("1 - 5");
  // });

  // it("User is able to sign up for an account as a Selling/Buying Broker/Agent", function () {
  //   signUp("Selling/Buying Broker/Agent");
  //   companyInfo("1 - 5");
  // });

  // it("User is able to sign up for an account as a Transaction Coordinator", function () {
  //   signUp("Transaction Coordinator");
  //   companyInfo("1 - 5");
  // });

  // it("User is able to sign up for an account as a Landlord Broker/Agent", function () {
  //   signUp("Landlord Broker/Agent");
  //   companyInfo("1 - 5");
  // });

  // it("User is able to sign up for an account as a Tenant Rep Broker", function () {
  //   signUp("Tenant Rep Broker");
  //   companyInfo("1 - 5");
  // });

  // it("User is able to sign up for an account as a Principal", function () {
  //   signUp("Principal");
  //   companyInfo("1 - 5");
  // });

  // it("User is able to sign up for an account as a Lender", function () {
  //   signUp("Lender");
  //   companyInfo("1 - 5");
  // });

  // it("User is able to sign up for an account as a Assessor", function () {
  //   signUp("Assessor");
  //   companyInfo("1 - 5");
  // });

  // it("User is able to sign up for an account as a Appraiser", function () {
  //   signUp("Appraiser");
  //   companyInfo("1 - 5");
  // });

  // it("User is able to sign up for an account as a Third Party Service", function () {
  //   signUp("Third Party Service");
  //   companyInfo("1 - 5");
  // });

  // it("User is able to sign up for an account as a Tenant", function () {
  //   signUp("Tenant");
  //   companyInfo("1 - 5");
  // });

  // it("User is able to sign up for an account as a Owner/Property Manager", function () {
  //   signUp("Owner/Property Manager");
  //   companyInfo("1 - 5");
  // });

  // it("User is able to sign up for an account as a Other", function () {
  //   signUp("Other");
  //   companyInfo("1 - 5");
  // });

  // it("Signup error check", function () {
  //   signUpErrorCheck();
  // });

  it("user is able to login with their newly created account", function () {
    login();
    signOut();
  });
});
