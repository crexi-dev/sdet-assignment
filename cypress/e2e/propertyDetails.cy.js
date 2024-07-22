import "cypress-mochawesome-reporter/register";
import { login, loginSuccess, signOut } from "../utils/authenication";
import { visitFirstPropertyCard } from "../utils/property";

describe("Property Detail", () => {
  beforeEach(() => {
    // There are 3 ways to use login:
    // 1. If you have done a setup with account creation, it will use those credentials.
    // 2. If you stored your credentials in .env, it will use those instead.
    // 3. If you hardcoded them like below, it will use those instead.

    login("fallanfriend@gmail.com", "jackiengo123");
    loginSuccess();
  });
  afterEach(() => {
    // Create a clean environment after each test so the new test can run properly.
    signOut();
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("user is able to view sale properties", function () {
    visitFirstPropertyCard("properties");
  });

  it("user is able to view lease properties", function () {
    visitFirstPropertyCard("lease/properties");
  });

  it("user is able to view aunction properties", function () {
    visitFirstPropertyCard("properties/Auctions");
  });
});
