const HomePage = require("./home-page");
const Form = require("../components/form");

/** Page that represents SignUp/Login popup with locators and functions related to it */

class SignUpLoginPage extends HomePage {
  constructor(page) {
    super(page);
    this.form = new Form(page);
  }

  /**Locators */

  get btnLogin() {
    return this.page.locator('button[data-cy="button-login"]');
  }

  get btnSignUp() {
    return this.page.locator('button[data-cy="button-signup"]');
  }

  getSignUpModalTab(tabName) {
    return this.page.locator(`#signupModal .tab:has-text("${tabName}")`);
  }

  /**Methods */
  /**
   * Sign up a user.
   *
   * @param {Object[]} fields An array of field objects, each with the following properties:
   * @property {string} type The type of field, such as `text` or `select`.
   * @property {string} label The label of the field.
   * @property {string|number} value The value of the field.
   * @throws {Error} If an error occurs during the sign-up process.
   */
  async signUp(fields) {
    try {
      await this.btnSignUpOrLogin.click();
      await this.form.populateForm(fields);
      await this.btnSignUp.click();
      await this.page.waitForLoadState("load");
    } catch (error) {
      throw new Error(
        `An error occurred during the sign-up process: ${error.message}, ${error.stack}`
      );
    }
  }

  /**
   * Login a user.
   *
   * @param {Object[]} fields An array of field objects, each with the following properties:
   * @property {string} type The type of field, such as `text` or `select`.
   * @property {string} label The label of the field.
   * @property {string|number} value The value of the field.
   * @throws {Error} If an error occurs during the login process.
   */

  async login(fields) {
    try {
      await this.btnSignUpOrLogin.click();
      await this.getSignUpModalTab("Log In").click();
      await this.form.populateForm(fields);
      await this.btnLogin.click();
      await this.page.waitForLoadState("domcontentloaded");
    } catch (error) {
      throw new Error(
        `An error occurred during the login process: ${error.message}, ${error.stack}`
      );
    }
  }
}

module.exports = SignUpLoginPage;
