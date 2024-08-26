exports.ProfilePage = class ProfilePage {
  constructor(page) {
    this.page = page;
    this.editPersonalData = page.locator('div[class="card-container personal"] a[class="profile-link"]', { hasText: ' Edit ' });
    this.editInfoModal = page.locator('[class="profile-edit-modal"] h3');
    this.editProfilePic = page.locator('div[class="profile-dashboard profile-info_ava"] input[name="fileInput"]');
    this.editHeaderImage = page.locator('div[class="profile-header-container"] input[name="fileInput"]');
    this.revertToDefault = page.locator('button[class*="profile-header-btn-revert"]', { hasText: ' Revert to Default ' })
    this.firstName = page.locator('input[name="firstName"]');
    this.lastName = page.locator('input[name="lastName"]');
    this.dateOfBirth = page.locator('input[name="dateOfBirth"]');
    this.updatePersonalData = page.locator('button[class*="cui-button-primary"]');
    this.closeButtonPersonalData = page.locator('button[class*="cui-modal-close"]');
    this.profileImageUpdated = page.locator('[data-cy="userAvatar"] img');
    this.headerImageDefault = page.locator('div[class="profile-header-image-container"] img[src*="/img/profile-header-image-default.png"]');
    this.editEmailAddress = page.locator('//div[@data-cy="accountDetails"]//span[@class="detail-text" and text()="Change your email"]//parent::div[1]//a[@class="profile-link ng-star-inserted" and contains(text(),"Edit")]');
    this.changeEmailModalHeader = page.locator('[heading="Change Email"] h3');
    this.newEmail = page.locator('[class="cui-form-field cui-form-field-text cui-form-field-invalid"] input[placeholder="example@email.com"]').nth(0);
    this.confirmEmail = page.locator('[class="cui-form-field cui-form-field-text cui-form-field-invalid"] input[placeholder="example@email.com"]').nth(1);
    this.currentPassword = page.locator('input[type="password"]');
    this.saveEmailButton = page.locator('button[class*="cui-button-primary"]');
  };

  async selectDateOfBirth(date, dateInWords) {
    await this.dateOfBirth.fill(date);
    await this.page.locator(`button[aria-label="${dateInWords}"]`).click();
  }

  async uploadProfilePic(file) {
    await this.editProfilePic.setInputFiles(file);
    await this.updatePersonalData.click();
  }

  async uploadHeaderPic(file) {
    await this.editHeaderImage.setInputFiles(file);
    await this.updatePersonalData.click({ delay: 3000 });
  }

  async revertHeaderPic() {
    await this.revertToDefault.click();
    await this.updatePersonalData.click();
  }
};
