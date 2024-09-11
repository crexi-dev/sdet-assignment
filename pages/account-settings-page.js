const HomePage = require("./home-page");
const path = require("path");

/** Page that represents Account Settings page for update profile photo test.
 * Extends HomePage class to sets the page to the correct playwright object type */
/**
 *
 * @class
 * @extends HomePage
 */
class AccountSettingsPage extends HomePage {
  /** Locators */

  get btnEditPersonalInfo() {
    return this.page.locator(
      'div[class="card-container personal"] a[class="profile-link"]',
      { hasText: " Edit " }
    );
  }

  get headerEditInfo() {
    return this.page.locator('[class="profile-edit-modal"] h3');
  }

  get editProfilePicture() {
    return this.page.locator(
      'div[class="profile-dashboard profile-info_ava"] input[name="fileInput"]'
    );
  }

  get firstName() {
    return this.page.locator('input[name="firstName"]');
  }

  get lastName() {
    return this.page.locator('input[name="lastName"]');
  }

  get updatePersonalData() {
    return this.page.locator('button[class*="cui-button-primary"]');
  }

  get profileImageUpdated() {
    return this.page.locator('[class*="thumb-image ng-star-inserted"]');
  }

  /**
   * Uploads a profile picture.
   *
   * @param {File} file - The file to be uploaded.
   * @returns {Promise<void>} - A promise that resolves when the profile picture is uploaded.
   */
  async uploadProfilePicture(file) {
    await this.editProfilePicture.setInputFiles(file);
    await this.updatePersonalData.click({delay: 2000}, {force: true});
  }
}

module.exports = AccountSettingsPage;
