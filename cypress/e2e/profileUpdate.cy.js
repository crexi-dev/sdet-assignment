import "cypress-mochawesome-reporter/register";
import {
  changeAvatar,
  login,
  loginSuccess,
  signOut,
} from "../utils/authenication";

describe("Profile", () => {
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

  it("User can change their profile picture using a JPG image", function () {
    changeAvatar("flower.jpg");
  });

  it("User can change their profile picture using a PNG image", function () {
    changeAvatar("bear.png");
  });
});
