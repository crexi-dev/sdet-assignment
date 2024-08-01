import { test, expect } from '@playwright/test';
import { LogInPage } from '../pages/login.page';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.crexi.com/');
});

/*

  Will not run this test as there is a recaptchca in production. 
  If I had access to the featureflag API I would turn off recaptcha when running this test.

*/
test.fixme('Register for an Account', async ({ page }) => {
  const loginPage = new LogInPage(page);
  await loginPage.register();
});

/*

  Log in with a non unique email an expect an error popup.

*/
test('Register for an Account with non unique email', async ({ page }) => {
  const loginPage = new LogInPage(page);
  await loginPage.nonUniqueEmailRegister();

  await expect(loginPage.invalidRegisterError).toBeVisible();
});

/*

  Verify mandatory fields are required and expect error messages to pop up.

*/
test('Verify Mandatory Fields are Required', async ({ page }) => {
  const loginPage = new LogInPage(page);
  await loginPage.verifyMandatoryFields();
  //Verify error messages are visible
  await expect(loginPage.firstNameError).toBeVisible();
  await expect(loginPage.lastNameError).toBeVisible();
  await expect(loginPage.emailError).toBeVisible();
  await expect(loginPage.passwordError).toBeVisible();
  await expect(loginPage.industryRoleError).toBeVisible();
});

/*

  Verify invalid inputs produce error messages.

*/
test('Verify Invalid Inputs', async ({ page }) => {
  const loginPage = new LogInPage(page);
  await loginPage.verifyInvalidInput();
  //Verify error messages are visible
  await expect(loginPage.validEmailError).toBeVisible();
  await expect(loginPage.passwordMinimumCharEror).toBeVisible();
  await expect(loginPage.validPhoneNumberError).toBeVisible();
});

/*

    Happy path log in.

*/
test('Log in to Account', async ({ page }) => {
  const loginPage = new LogInPage(page);
  await loginPage.logIn('yorippin@gmail.com', 'Lakersrule123!');
});

/*

  Log in with no email or password.

*/
test('Log in empty email and password', async ({ page }) => {
  const loginPage = new LogInPage(page);
  await loginPage.logIn('', '');

  await expect(loginPage.emailError).toBeVisible();
  await expect(loginPage.passwordLogInError).toBeVisible();
});

/*

  Log in with an invalid password.

*/
test('Log in with invalid password', async ({ page }) => {
  const loginPage = new LogInPage(page);
  await loginPage.logIn('yorippin@gmail.com', 'invalidpassword');

  await expect(loginPage.invalidLogInError.first()).toBeVisible();
});
