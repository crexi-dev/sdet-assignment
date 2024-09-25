const { BasePage } = require('./base-page');

class ProfilePage extends BasePage {
  constructor(page) {
    super(page);
    this.editPersonal = page.locator('cui-avatar[data-cy="userAvatar"]');
    this.firstNameFld = page.locator('input[name="firstName"]');
    this.lastNameFld = page.locator('input[name="lastName"]');
    this.dobFld = page.locator('input[name="dateOfBirth"]');
    this.todaysDate = page.locator('button[aria-current="date"]');
    this.profilePicture = page.locator('input[name="fileInput"]').first();
    this.personalUpdateMsg = page.locator('span:has-text("Your personal info has been updated.")');
    this.firstNameFldErr = page.locator('span:has-text("Please enter your first name")');
    this.lastNameFldErr = page.locator('span:has-text("Please enter your last name")');
    this.updateBtn = page.locator('button[type="submit"]:has-text("Update")');
    this.fileSizeErr = page.locator('div:has-text("File must not exceed 3 MB")');
    this.profileImg = page.locator('//crx-app/div/crx-dashboard-component/crx-normal-page/div/crx-drawer/mat-drawer-container/mat-drawer-content/div/div/article/div/div/section/div/ng-component/div/div/div/div[2]/div[2]/crx-profile-user/div/cui-avatar/img');
    this.maxSizeProfilePicErr = page.locator('div.error-message:has-text("File must not exceed 3 MB")');

  }

  async uploadProfilePicture(filepath) {
    await this.loadingSpinner.waitFor({ state: 'hidden' });
    await this.editPersonal.click();
    await this.profilePicture.setInputFiles(filepath);
    await this.updateBtn.waitFor({ state: 'visible' });
    await this.updateBtn.click();
  }
}
module.exports = { ProfilePage };