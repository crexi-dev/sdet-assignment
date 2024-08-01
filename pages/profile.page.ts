import { type Locator, type Page } from '@playwright/test';
import path from 'path';

export class ProfilePage {
  readonly page: Page;
  readonly hamburgerButton: Locator;
  readonly hamburgerMenuItem: Locator;
  readonly accountButton: Locator;
  readonly accountSettingsLink: Locator;
  readonly editLink: Locator;
  readonly uploadPhotoLink: Locator;
  readonly updateProfileButton: Locator;
  readonly successfulUpdateMsg: Locator;
  readonly fileExceedsErrorMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.hamburgerButton = page.getByTestId('hamburgerButton');
    this.hamburgerMenuItem = page.getByTestId('hamburgerMenuItem');
    this.accountButton = page.getByRole('button', { name: 'Account' });
    this.accountSettingsLink = page.getByRole('link', { name: 'Account Settings' });
    this.editLink = page.getByText('Edit', { exact: true });
    this.uploadPhotoLink = page.getByRole('textbox', { name: 'Click to upload your photo' });
    this.updateProfileButton = page.getByRole('button', { name: 'Update' });
    this.successfulUpdateMsg = page.getByText('Your personal info has been updated.');
    this.fileExceedsErrorMsg = page.getByText('File must not exceed 3 MB');
  }
  async uploadPhoto(filePath: string) {
    await this.hamburgerButton.click();
    await this.hamburgerMenuItem.first().click();
    await this.accountButton.click();
    await this.accountSettingsLink.click();
    await this.editLink.first().click();
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.uploadPhotoLink.first().click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(__dirname, filePath));

    await this.updateProfileButton.click();
  }
}
