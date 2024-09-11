/** This file contains the login that is usong Playwright's fixture which is used to login the test user before running the tests
 * Navigation to the needed pages are done with direct url navigation as we are not testing the navigation itself but the functionality mentioned in the test
 */
const { test: base } = require("@playwright/test");
const SignUpLoginPage = require("../pages/signup-login-page");
const { populateLoginData } = require("./test-data/data-generator");
const HomePage = require("../pages/home-page");
const loadRequest = "https://t.crexi.com/track/*";

const test = base.extend({
  testUserLogin: async ({ page }, use) => {
    await page.goto(`${process.env.URL}`);
    const loginData = populateLoginData(
      `${process.env.TEST_EMAIL}`,
      `${process.env.TEST_PASSWORD}`
    );
    const signUpLoginPage = new SignUpLoginPage(page);
    const homePage = new HomePage(page);
    await signUpLoginPage.login(loginData.properties);
    await homePage.signedInProfile.waitFor({
      state: "visible",
      timeout: 100000,
    });
    await use({ page });
  },

  testUserLoginAccountProfilePage: async ({ testUserLogin }, use) => {
    const { page } = testUserLogin;
    await page.goto(`${process.env.PROFILE_URL}`, {
      waitUntil: "load",
      timeout: 100000,
    });
    await page.waitForRequest(loadRequest, { timeout: 100000 });
    await use({ page });
  },

  testUserLoginPropertyDataPage: async ({ testUserLogin }, use) => {
    const { page } = testUserLogin;
    await page.goto(`${process.env.PROPERTY_RECORDS_URL}`, {
      waitUntil: "load",
      timeout: 100000,
    });
    await page.waitForRequest(loadRequest, { timeout: 100000 });
    await use({ page });
  },
});

module.exports = { test, expect: base.expect };
