exports.SearchPage = class SearchPage {
    constructor(page) {
        this.page = page;
        this.leaseLink = page.locator('div[class="search-tabs"] h3[class*="search-tabs-item"]').nth(1);
        this.searchTextbox = page.locator('input[class="search-bar-input ng-pristine ng-valid ng-touched"]');
        this.enterSearchText = page.locator('div[class="search-bar-input-wrapper search-bar-active"] input');
        this.searchButton = page.locator('button[class="search-bar-search-button mdc-button mat-mdc-button mat-unthemed mat-mdc-button-base"]').nth(1);
        this.showMapToggle = page.locator('button[id="mat-mdc-slide-toggle-1-button"]');
        this.leasePropertyList = page.locator('[id*="search-item"]');
        this.searchResultHeader = page.locator('header[class="seo-header ng-star-inserted"] h1');
        this.leaseBadge = page.locator('[class="cui-badge cui-badge-purple-500 ng-star-inserted"]');
        this.SearchCount = page.locator('span[data-cy="resultsCount"]');
        this.undisclosedRate = page.locator('[class="cui-card-info-title"]');
        this.partialAddressLincoln = page.locator('h5[title="1231 Lincoln Blvd"]');
        this.propertyDesc = page.locator('div[data-cy="propertyDescription"]');
        this.propertyAddress = page.locator('h4[data-cy="propertyAddress"]');
    };
};