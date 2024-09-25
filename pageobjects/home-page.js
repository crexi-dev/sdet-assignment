const { BasePage } = require('./base-page');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.forSaleTab = page.locator('[data-cy="tab"]:has-text("Sale")');
    this.forLeaseTab = page.locator('[data-cy="tab"]:has-text("Lease")');
    this.saleTypesDD = page.locator('span.selected:has-text("All Types")').first();
    this.leaseTypesDD = page.locator('span.selected:has-text("All Types")').nth(1);
    this.searchFld = page.locator('input[name="search_term_string"]');
    this.saleSearchBtn = page.locator('button.search-bar-search-button[title="Search"]').first();
    this.leaseSearchBtn = page.locator('button.search-bar-search-button[title="Search"]').nth(1);
  }

  async searchSalePropertyTypes(types) {
    if (typeof types === 'string') {
        types = [types]; 
    }
    await this.saleTypesDD.click();
    for (const type of types) {
        await this.page.locator(`mat-checkbox:has-text("${type}")`).click();
    }
    await this.saleSearchBtn.click();
    await this.loadingSpinner.waitFor({ state: 'hidden' });
}
}
module.exports = { HomePage };