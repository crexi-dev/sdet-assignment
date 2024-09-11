// @ts-check
const { test, expect } = require("@playwright/test");
const {
  populateSignUpData,
  populateLoginData,
} = require("../resources/test-data/data-generator");
const SignUpLoginPage = require("../pages/signup-login-page");

test.beforeEach(async ({ page }) => {
  // @ts-ignore
  await page.goto(`${process.env.URL}`);
});

test.describe("User Login: Users can register and log in with a username and password.", () => {
  /**Was not able to get succesful sign up as at the moment of developing test I was getting error (I have sent  email to Rameet),
  Was getting 400 error which indicates bad request but there were no errors on UI (might be a bug?)*/
  test("Sign Up to Crexi", async ({ page }) => {
    const signUpData = populateSignUpData();
    const signUpLoginPage = new SignUpLoginPage(page);
    await signUpLoginPage.signUp(signUpData.properties);
  });
  //logging in with my test user and not with user from previous test due to error above
  test("Log In to Crexi", async ({ page }) => {
    // @ts-ignore
    const loginData = populateLoginData(
      `${process.env.TEST_EMAIL}`,
      `${process.env.TEST_PASSWORD}`
    );
    const signUpLoginPage = new SignUpLoginPage(page);

    await signUpLoginPage.login(loginData.properties);
    await expect(
      page.getByTitle("commercial real estate by crexi")
    ).toBeVisible({ timeout: 10000 });
  });
});
