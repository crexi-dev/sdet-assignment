const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
require('dotenv').config();
const { DashboardPage } = require('../pageobjects/dashboard-page.js');
const { AuthPage } = require('../pageobjects/auth-page.js');
const users = require('../utils/users-testdata.json');

test.describe('User Authentication Verification', () => {
  let authPage, dashboardPage

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    dashboardPage = new DashboardPage(page);
    await page.goto('/');
  });

  // Test log in for users of each role and type, see users-testdata.json in utils directory for example. More users and log in types can be added there.
  users.forEach((user) => {
    test.only(`verify log in for user role ${user.role} and login type ${user.type}`, async () => {
      // Log in for each login type (linkedin, ccim, google can be added here)
      switch (user.type) {
        case 'email':
          await authPage.logInFormSubmit({
            email: user.email,
            password: process.env.USER_PASSWORD
          });
          break;
        case 'google':
          await authPage.logInWithGoogle(
            user.email,
            process.env.USER_PASSWORD
          );
          break;
        default:
          throw new Error('Unknown login type');
      }
      await dashboardPage.logout();
    });
  });

  // Fakerjs email sign up example
  test.skip('verify user signup w/ faker email', async () => {
    const email = faker.internet.email();
    await authPage.signUpFormSubmit({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: email,
      role: await authPage.getRandomRole(),
      password: process.env.USER_PASSWORD,
      phoneNumber: faker.phone.number('(###) ###-####')
    })
    await dashboardPage.logout();
  });

  // Sign up with and without the phone number field should be tested
  test.skip('verify user signup w/ phone number', async () => {
    const email = faker.internet.email();
    await authPage.signUpFormSubmit({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: email,
      role: await authPage.getRandomRole(),
      password: process.env.USER_PASSWORD,
      phoneNumber: faker.phone.number()
    })
    await dashboardPage.logout();
  });

  // This test requires email aliasing working on the sign up form
  test.skip('verify user signup w/ email aliasing', async () => {
    let email = `ramsencrexi+${Date.now()}@gmail.com`; // By using date in millis this test can be run consecutively with no issue
    await authPage.signUpFormSubmit({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: email,
      role: await authPage.getRandomRole(),
      password: process.env.USER_PASSWORD,
    })
    await dashboardPage.logout();
  });

  // Test case for role 'Listing Broker/Agent'  
  test.skip('verify "Listing Broker/Agent" role sign up', async () => {
    await authPage.signUpFormSubmit({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      role: 'Listing Broker/Agent',
      password: process.env.USER_PASSWORD,
      licenseState: faker.location.state(),
      licenseNumber: faker.string.alpha({ count: 3, casing: 'upper' }) + '-' + faker.number.int({ min: 100000, max: 999999 })
    })
    await expect(authPage.accountCreationErr).toBeVisible();
  });

  // Test case for role "Landlord Broker/Agent" 
  test.skip('verify "Landlord Broker/Agent" role sign up', async () => {
    await authPage.signUpFormSubmit({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: process.env.USER_PASSWORD,
      role: 'Landlord Broker/Agent',
      activeListings: await authPage.getRandomNumberOfActiveListings()
    })
    await expect(authPage.accountCreationErr).toBeVisible();
  });

  test('verify log in field validation', async () => {
    await authPage.logInFormSubmit();
    await expect(authPage.emailFldErr).toBeVisible();
    await expect(authPage.passFldErr).toBeVisible();
  });

  test('verify wrong email or pass error validation', async () => {
    await authPage.logInFormSubmit({
      email: faker.internet.email(),
      password: process.env.USER_PASSWORD
    });
    await expect(authPage.wrongEmailOrPassErr).toBeVisible();
  });

  test('verify log in email format error validation', async () => {
    await authPage.logInFormSubmit({
      email: faker.string.alphanumeric(5)
    });
    await expect(authPage.logInEmailFormatErr).toBeVisible();
  });

  test('verify sign up email format error validation', async () => {
    await authPage.signUpFormSubmit({
      email: faker.string.alphanumeric(5)
    });
    await expect(authPage.signUpEmailFormatErr).toBeVisible();
  });

  test('verify sign up phone number format error validation', async () => {
    await authPage.signUpFormSubmit({
      phoneNumber: faker.string.alphanumeric(5)
    });
    await expect(authPage.phoneNumFormatErr).toBeVisible();
  });

  test('verify sign up empty field validation', async () => {
    await authPage.signUpFormSubmit();
    await expect(authPage.emailFldErr).toBeVisible();
    await expect(authPage.signUpPassFldErr).toBeVisible();
    await expect(authPage.firstNameFldErr).toBeVisible();
    await expect(authPage.lastNameFldErr).toBeVisible();
    await expect(authPage.roleDDErr).toBeVisible();
  });

  // BUG: User has to enter 1 more character than stated to see error
  test('verify sign up field character max', async () => {
    await authPage.signUpFormSubmit({
      firstName: faker.string.alphanumeric(65),
      lastName: faker.string.alphanumeric(65),
      email: faker.string.alphanumeric(55) + '@gmail.com',
      phoneNumber: faker.string.alphanumeric(17)
    });
    await expect(authPage.firstNameMaxErr).toBeVisible();
    await expect(authPage.lastNameMaxErr).toBeVisible();
    await expect(authPage.emailMaxErr).toBeVisible();
    await expect(authPage.phoneNumMaxErr).toBeVisible();
  });

  test('verify password minimum', async () => {
    await authPage.signUpFormSubmit({
      password: faker.string.alphanumeric(11)
    })
    await expect(authPage.passMinFldErr).toBeVisible();
  });

  test('verify "Landlord Broker/Agent" active listings field validation', async () => {
    await authPage.signUpFormSubmit({
      role: 'Landlord Broker/Agent',
    })
    await expect(authPage.activeListingsErr).toBeVisible();
  });

  test('verify "Lising Broker/Agent" license state and number field validation', async () => {
    await authPage.signUpFormSubmit({
      role: 'Listing Broker/Agent'
    })
    await expect(authPage.licenseStateErr).toBeVisible();
    await expect(authPage.licenseNumErr).toBeVisible();
  });

  test('verify "Lising Broker/Agent" license number field minimum', async () => {
    await authPage.signUpFormSubmit({
      role: 'Listing Broker/Agent',
      licenseNumber: faker.string.alphanumeric(3)
    })
    await expect(authPage.licenseNumMinFldErr).toBeVisible();
  });

  test('verify sign up failure with duplicate email', async () => {
    await authPage.signUpFormSubmit({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: users[0].email,
      role: await authPage.getRandomRole(),
      password: process.env.USER_PASSWORD
    })
    await expect(authPage.accountCreationErr).toBeVisible();
  });
});
