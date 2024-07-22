import "cypress-mochawesome-reporter/register";
import {
  changeAvatar,
  login,
  loginSuccess,
  signOut,
} from "../utils/authenication";

describe("Profile", () => {
  beforeEach(() => {
    //There are 3 ways to use login. If you have done a setup with account creation, it will use that credential
    //If you stored your credential in .env, it will use that instead
    //If you hardcorded like below, it will use that instead
    login("fallanfriend@gmail.com", "jackiengo123");
    loginSuccess();
  });
  afterEach(() => {
    //create a clean environment after each test so the new test can run fine
    signOut();
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("User is able to change their profile picture using jpg", function () {
    changeAvatar("flower.jpg");
  });

  it("User is able to change their profile picture using png", function () {
    changeAvatar("bear.png");
  });
});
