exports.PropertyListpage = class PropertyListpage {
    constructor(page) {
        this.page = page;
        this.salePropertieslink = page.locator('span[title="For Sale"]');
        this.propertylist = page.locator('div[class="search-grid-responsive"] [id*="search-item"]'); //use array[0]
        this.pageHeader = page.locator('div[class*="property-items-list"] h1')
    };

};