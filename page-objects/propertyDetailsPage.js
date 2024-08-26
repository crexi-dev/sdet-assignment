exports.PropertyDetailsPage = class PropertyDetailsPage {
    constructor(page) {
        this.page = page;
        this.leftColumnImage = page.locator('img[data-cy="image"]');
        this.breadcrumbsProperty = page.locator('div[class*="nav-toolbar-breadcrumbs"]');
        this.waitingForEle = page.locator('div[class*="broker-data"] h2');
        this.listingContactsLabel = page.locator('div[class*="broker-data"] h2', { hasText: 'Listing Contacts' });
        this.activeLabel = page.locator('div[class="offer-container"] h2');
        this.rightColumnTabs = page.locator('div[class="right-column"] span[class="mdc-tab__text-label"]');
        this.addressLabel = page.locator('div[class*="property-info-container addresses"] div[class*="headline"] span');
        this.sectionHeaders = page.locator('div[class*="property-info-container"] h2 span');
        this.flora = page.locator('div[class*="title cui-heading-4"]');
        this.leftColumn = page.locator('div[class="left-column"]');
        this.rightColumn = page.locator('div[class="right-column"]');
    };
};
