import { type Locator, type Page } from '@playwright/test';

export class PropertiesPage {
  readonly page: Page;
  readonly searchButton: Locator;
  readonly allFiltersButton: Locator;
  readonly searchLocTextBox: Locator;
  readonly searchDropdown: Locator;
  readonly applyFiltersButton: Locator;
  readonly searchResults: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.searchDropdown = page.getByTestId('selectDropdown').locator('.autocomplete-item');
    this.allFiltersButton = page.getByRole('button', { name: 'All Filters' });
    this.searchLocTextBox = page.getByPlaceholder('City, State, County, Zip Code');
    this.searchResults = page.locator('[data-cy="gridView"] [data-cy="tileContent"]');
    this.applyFiltersButton = page.getByTestId('applyFilters');
  }

  /*

    Search on Crexi.com, currently it's only by Location

  */
  async search(locations: string[]) {
    await this.searchButton.click();
    await this.allFiltersButton.click();

    for (const location of locations) {
      await this.searchLocTextBox.click();
      await this.searchLocTextBox.fill(location);
      await this.searchDropdown.click();
      //pressing enter was working but stopped, bug?
      //await this.searchLocTextBox.press("Enter");
    }
    await this.page.waitForTimeout(3000);
    await this.applyFiltersButton.click();
  }
  /*
    Clicks the search results based on the index 
  */
}
