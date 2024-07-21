import { login, signOut } from "../utils/authenication";
import { visitFirstPropertyCard } from "../utils/property";

describe("Property Detail", () => {
  beforeEach(() => {
    //There are 3 ways to use login. If you have done a setup with account creation, it will use that credential
    //If you stored your credential in .env, it will use that instead
    //If you hardcorded like below, it will use that instead
    login("fallanfriend@gmail.com", "jackiengo123");
  });
  afterEach(() => {
    //create a clean environment after each test so the new test can run fine
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
