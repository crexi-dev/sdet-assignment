const { BasePage } = require('./base-page');

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.dashboard = page.locator('span.my-crexi-text:has-text("Dashboard")');
    this.accountPane = page.locator('#mat-expansion-panel-header-2');
    this.accountSettings = page.locator('span.action-item-label:has-text("Account Settings")');
    this.logOutBtn = page.locator('span[data-cy="link"]:has-text("Log Out")');
    this.logOutConfirmBtn = page.locator('span.mdc-button__label:has-text("Yes")');
  }

  async logout() {
    await this.goToAccountSettings();
    await this.logOutFromAccountSettings();
  }

  async goToAccountSettings() {
    await this.dashboard.waitFor({ state: 'visible' });
    await this.dashboard.click();
    if (!await this.isPaneExpanded(this.accountPane)) {
      await this.accountPane.click();
    }
    await this.accountSettings.click();
  }

  async logOutFromAccountSettings() {
    await this.logOutBtn.click();
    await this.logOutConfirmBtn.click();
  }
}
module.exports = { DashboardPage };