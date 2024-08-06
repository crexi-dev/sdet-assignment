import { expect, type Locator, type Page } from '@playwright/test';

export class LogInPage {
  readonly page: Page;
  readonly signInButton: Locator;
  readonly firstNameBox: Locator;
  readonly lastNameBox: Locator;
  readonly emailBox: Locator;
  readonly passwordBox: Locator;
  readonly passwordLoginBox: Locator;
  readonly roleDropDown: Locator;
  readonly activeListingsDropdown: Locator;
  readonly phoneBox: Locator;
  readonly signUpButton: Locator;
  readonly logInTab: Locator;
  readonly logInButton: Locator;
  readonly cancelButton: Locator;
  readonly forgotPassword: Locator;

  readonly firstNameError: Locator;
  readonly lastNameError: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;
  readonly passwordLogInError: Locator;
  readonly industryRoleError: Locator;
  readonly validEmailError: Locator;
  readonly passwordMinimumCharEror: Locator;
  readonly validPhoneNumberError: Locator;
  readonly invalidRegisterError: Locator;
  readonly invalidLogInError: Locator;

  /*
    Using UI facing locators as a priority as recommended on the Playwright documentation
    and testing-library.com.

    We recommend prioritizing role locators to locate elements, 
    as it is the closest way to how users and assistive technology perceive the page.

    https://testing-library.com/docs/queries/about/#priority
    https://playwright.dev/docs/locators
  */
  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.getByRole('button', { name: 'Sign Up or Log In' });
    this.firstNameBox = page.getByLabel('First Name Please enter your');
    this.lastNameBox = page.getByLabel('Last Name Please enter your');
    this.emailBox = page.getByLabel('Email Please enter your email');
    this.passwordBox = page.getByLabel('Password Minimum 12');
    this.passwordLoginBox = page.getByLabel('Password Please enter password');
    this.roleDropDown = page.getByText('Select Your Role');
    this.activeListingsDropdown = page.getByText('Select');
    this.phoneBox = page.getByLabel('Phone Number');
    this.signUpButton = page.getByRole('button', { name: 'Sign Up' });
    this.logInTab = page.getByText('Log In', { exact: true });
    this.logInButton = page.getByRole('button', { name: 'Log In' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.forgotPassword = page.getByText('Forgot password?');
    this.firstNameError = page.getByText('Please enter your first name');
    this.lastNameError = page.getByText('Please enter your last name');
    this.emailError = page.getByText('Please enter your email address');
    this.passwordError = page.getByText('Please enter a password');
    //Error message is different between register tab and log in.
    this.passwordLogInError = page.getByText('Please enter password');
    this.industryRoleError = page.getByText('Please select your industry role');
    this.validEmailError = page.getByText('The Email field is not a valid e-mail address.');
    this.passwordMinimumCharEror = page.getByText('Minimum 12 characters').nth(1);
    this.validPhoneNumberError = page.getByText('Please enter a valid phone number');
    this.invalidRegisterError = page.getByText(
      'Account creation unsuccessful. If you find this message is unexpected please contact support.'
    );
    this.invalidLogInError = page.getByText('The email/username or password is incorrect.');
  }

  async register(role: string, email: string, password: string) {
    await this.signInButton.click();
    await this.firstNameBox.click();
    await this.firstNameBox.fill('Test Name');
    await this.lastNameBox.click();
    await this.lastNameBox.fill('LName');
    await this.emailBox.click();
    await this.emailBox.fill(email);
    await this.passwordBox.click();
    await this.passwordBox.fill(password);
    await this.roleDropDown.click();
    await this.page.getByRole('option', { name: role }).click();
    await this.activeListingsDropdown.click();
    await this.page.getByText('-10').click();
    await this.phoneBox.click();
    await this.phoneBox.fill('0123456789');
    await this.signUpButton.click();
  }
  /*
    If this wasn't an assessment I would also create functions for registering with social media.
    
    async registerSocialMedia() { ... }
  */

  async verifyMandatoryFields() {
    await this.signInButton.click();
    //Leave all fields empty
    await this.signUpButton.click();
  }

  async verifyInvalidInput() {
    await this.signInButton.click();
    await this.emailBox.click();
    await this.emailBox.fill('invalidemail');
    await this.passwordBox.click();
    await this.passwordBox.fill('lessthan12');
    await this.phoneBox.click();
    await this.phoneBox.fill('invalidnumber');
    await this.signUpButton.click();
  }

  async logIn(email: string, password: string) {
    await this.signInButton.click();
    await this.logInTab.click();
    //email fill is flaky so waiting for a button to be visiable before attempting to fill
    await expect(this.logInButton).toBeVisible();
    await this.emailBox.click();
    await this.emailBox.fill(email);
    await this.passwordLoginBox.click();
    await this.passwordLoginBox.fill(password);
    await this.logInButton.click();
  }

  /*
  If this wasn't an assessment I would also create functions for logging in with social media.

  async logInSocialMedia() { ... }
*/

  //verify mandatory fields are required and look for messages.
  //verify email only allows unique entries
  //verify password only allows characters greater than 12
  //if there was no captcha in production or there was a way to bypass
  //would verify registration for every role if needed.
}
