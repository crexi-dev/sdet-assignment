import { changeAvatar, login, signOut } from "../utils/authenication";
import { propertyTypes, realEstateTypes } from "../utils/search";

describe("Search", () => {
  beforeEach(() => {
    //There are 3 ways to use login. If you have done a setup with account creation, it will use that credential
    //If you stored your credential in .env, it will use that instead
    //If you hardcorded like below, it will use that instead
    //Don't really need to have this unless we are doing something like favoriting
    //login("fallanfriend@gmail.com", "jackiengo123");
    cy.visit("/");
  });
  afterEach(() => {
    //create a clean environment after each test so the new test can run fine
    //signOut();
    cy.clearCookies();
    cy.clearLocalStorage();
  });
  it("user is able to select Retail from property type and view the property summary page", function () {
    propertyTypes(["Retail"]);
  });

  it("user is able to select Multifamily from property type and view the property summary page", function () {
    propertyTypes(["Multifamily"]);
  });

  it("user is able to select Office from property type and view the property summary page", function () {
    propertyTypes(["Office"]);
  });

  it("user is able to select Industrial from property type and view the property summary page", function () {
    propertyTypes(["Industrial"]);
  });

  it("user is able to select Hospitality from property type and view the property summary page", function () {
    propertyTypes(["Hospitality"]);
  });

  it("user is able to select Mixed Use from property type and view the property summary page", function () {
    propertyTypes(["Mixed Use"]);
  });

  it("user is able to select Land from property type and view the property summary page", function () {
    propertyTypes(["Land"]);
  });

  it("user is able to select Self Storage from property type and view the property summary page", function () {
    propertyTypes(["Self Storage"]);
  });

  it("user is able to select Mobile Home Park from property type and view the property summary page", function () {
    propertyTypes(["Mobile Home Park"]);
  });

  it("user is able to select 2 properties type and view the property summary page", function () {
    propertyTypes(["Retail", "Multifamily"]);
  });

  it("user is able to select 3 properties type and view the property summary page", function () {
    propertyTypes(["Office", "Industrial", "Hospitality"]);
  });

  it("user is able to select 4 properties type and view the property summary page", function () {
    propertyTypes(["Mixed Use", "Land", "Self Storage", "Mobile Home Park"]);
  });
});
