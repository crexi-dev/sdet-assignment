import { test, expect } from '@playwright/test';
import { LogInPage } from '../pages/login.page';
import { readJsonFile } from '../utils/helpers';
import { faker } from '@faker-js/faker';
import path from 'path';

const env = process.env.ENV || 'prod';
const logins = readJsonFile(path.join(__dirname, `../test_data/${env}/logins.json`));

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.BASE_URL!);
});

/*
  Will not run this test as there is a recaptcha in production. 
  If I had access to the featureflag API I would turn off recaptcha when running this test.
*/
test.fixme('Register for an Account', async ({ page }) => {
  const loginPage = new LogInPage(page);
  //if I was running this I would generate unique emails example qa+random@gmail.com
  await loginPage.register(
    'Lender',
    faker.person.firstName(),
    faker.person.lastName(),
    'email@email.com',
    'testpassword123',
    '0123456789'
  );
});

/*
  Log in with a non unique email an expect an error popup.
*/
test('Register for an Account with a non unique email', async ({ page }) => {
  const loginPage = new LogInPage(page);
  await loginPage.register(
    'Lender',
    faker.person.firstName(),
    faker.person.lastName(),
    'yorippin@gmail.com',
    'testpassword123',
    '0123456789'
  );
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
  await loginPage.logIn(logins.logins[0].email, logins.logins[0].password);
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
  await loginPage.logIn('randomemail@email.com', 'invalidpassword');

  await expect(loginPage.invalidLogInError.first()).toBeVisible();
});
