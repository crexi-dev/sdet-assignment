const { BasePage } = require('./base-page');

class SearchResultsPage extends BasePage {
    constructor(page) {
        super(page);
        this.noResultsMsg = page.locator('h2:has-text("Oh no! There aren’t any properties that match your search.")');
        this.nextPage = page.locator('span:has-text("Next")').first();
        this.propertyTile = page.locator('crx-property-tile-aggregate[data-cy="propertyTile"] crx-sales-property-tile');
        this.pagination = page.locator('div.pagination-container');
        this.lastPage = page.locator('li.page.last.ng-star-inserted a.white.ng-star-inserted');
        this.resultsPerPage = page.locator('div.text.no-label span.selected[data-cy="selectedCount"]').last();
    }

    async getPriceFromResult(index) {
        return await this.page.locator(`(//span[@data-cy="propertyPrice"])[${++index}]`).textContent(); // I use ++index in cases where index starts at 1 rather than 0
    }

    async getRateFromResult(index) {
        return await this.page.locator(`(//div[contains(@class, "cui-card-info-title")])[${++index}]`).textContent();
    }

    async getNameFromResult(index) {
        return await this.page.locator(`(//h5[@data-cy="propertyName"])[${++index}]`).textContent();
    }

    async getDescFromResult(index) {
        return await this.page.locator(`(//div[@data-cy="propertyDescription"])[${++index}]`).textContent();
    }

    async getSaleAddressFromResult(index) {
        return await this.page.locator(`(//span[@data-cy="propertyAddress"])[${++index}]`).textContent();
    }

    async getLeaseAddressFromResult(index) {
        return await this.page.locator(`(//h4[@data-cy="propertyAddress"])[${++index}]`).textContent();
    }

    async clickSalePropertyTile(index) {
        await this.page.locator(`crx-property-tile-aggregate[data-cy="propertyTile"] crx-sales-property-tile`).nth(index).click();
    }

    async clickLeasePropertyTile(index) {
        await this.page.locator('//crx-app/div/ng-component/crx-normal-page/div/crx-drawer/mat-drawer-container/mat-drawer-content/div/div/article/div/div/crx-search-table-view/div/crx-search-view-grid/div/div[1]/div[1]/crx-search-results/div/div/crx-property-tile-aggregate[1]/div/crx-property-tile-new/cui-card').nth(index).click();
    }

    async getResultCountPerPage() {
        await this.propertyTile.last().waitFor( {state: 'visible'})
        return await this.propertyTile.count();
    }

    async getPageCount() {
        await this.pagination.waitFor({ state: 'visible' });
        const paginationItems = this.pagination.locator('ul.pagination li.page');
        const pageCount = await paginationItems.count();
        const lastPageNumber = await paginationItems.nth(pageCount - 1).locator('a').textContent();
        return parseInt(lastPageNumber.trim(), 10);
    }
}
module.exports = { SearchResultsPage };