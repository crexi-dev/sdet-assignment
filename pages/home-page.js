const { Page } = require("@playwright/test");

/** Base Crexi Home page with locators for elements on main home page crexi.com and on main page after user login
 * Sets the page to the correct playwright object type to enable code completion.
 * Is being inherited by other pages to set pages defaullt constructors and correct playwright object type*/

class HomePage {
  /**
   * @type {Page} */
  page;

  /**
   *
   * @param {Page} page - the playwright page object that is tied to this page
   */
  constructor(page) {
    this.page = page;
  }

  /**Locators */

  get btnSignUpOrLogin() {
    return this.page.locator("button.signup");
  }

  get dashboardLink() {
    return this.page.locator(
      'a[class*="header-nav-link"] [class="my-crexi-text"]'
    );
  }

  get accountSettingsLink() {
    return this.page.locator('[data-cy="link"]:has-text("Account Settings")');
  }

  get signedInProfile() {
    return this.page.locator('[class*="user-logged-in"]');
  }
}

module.exports = HomePage;
