const HomePage = require("./home-page");

/** Page that represents Properties Page with locators and functions related to it
 *  ext */

class PropertiesPage extends HomePage {
  /**Locators */
  get getFirstProperty() {
    return this.page.locator('[class*="badge-container"]').first();
  }

  get propertyDetailsLink() {
    return this.page
      .locator("crx-smart-nav-tabs")
      .getByRole("link", { name: "Property Details" });
  }

  get propertyDetailsTitle() {
    return this.page.locator('[data-cy="property-details-title"]');
  }

  get propertyStatusDropdown() {
    return this.page.locator('[data-cy="platformDropdown"]');
  }

  /**
   * Retrieves the property status option locator based on the given option name.
   *
   * @param {string} optionName - The name of the option to search for.
   * @returns {Locator} - The property status option element.
   */
  getPropertyStatusOption(optionName) {
    return this.page.locator(`[class*="options"] li:has-text("${optionName}")`);
  }

  get currentPropertyStatusFilterName() {
    return this.page
      .locator('[class="selected ng-star-inserted"]')
      .textContent();
  }

  /**
   * Returns the count of search results.
   *
   * @returns {number} The count of search results.
   */
  get searchResultsCount() {
    return this.page.locator('[data-cy="resultsCount"]').textContent();
  }

  /**Methods */

  async clickFirstPropertyDetails() {
    try {
      await this.getFirstProperty.waitFor({ state: "visible" });
      await this.getFirstProperty.click();
      await this.page.waitForLoadState("domcontentloaded");
      await this.propertyDetailsLink.waitFor({ state: "visible" });
      await this.propertyDetailsLink.click();
    } catch (error) {
      throw new Error(
        `Unable to click on first property: ${error.message}, ${error.stack}`
      );
    }
  }

  async setPropertyStatusFilter(propertyStatusFilterName) {
    try {
      if (
        (await this.currentPropertyStatusFilterName) !==
        propertyStatusFilterName
      ) {
        await this.propertyStatusDropdown.waitFor({ state: "visible" });
        await this.propertyStatusDropdown.click();
        await this.getPropertyStatusOption(propertyStatusFilterName).waitFor({
          state: "visible",
        });
        await this.getPropertyStatusOption(propertyStatusFilterName).click();
        await this.page.waitForLoadState("load");
      }
    } catch (error) {
      throw new Error(
        `Unable to set property status: ${error.message}, ${error.stack}`
      );
    }
  }
}

module.exports = PropertiesPage;
