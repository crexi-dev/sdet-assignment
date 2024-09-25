const { test, expect } = require('@playwright/test');
const { PropertyPage } = require('../pageobjects/property-page.js');
const { HomePage } = require('../pageobjects/home-page.js');
const { SearchResultsPage } = require('../pageobjects/searchResults-page.js');

test.describe('Property Search Verification', () => {
    let searchResultsPage, homePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        searchResultsPage = new SearchResultsPage(page);
        await page.goto('/');
    });

    // Test for first page results 
    test('verify for sale Senior Living property details in first page search results', async () => {
        const propertyDetailsToCheck = {
            'Property Type': 'Senior Living'
        };
        const maxResultsToVerify = 5;

        await homePage.searchSalePropertyTypes(propertyDetailsToCheck['Property Type']);
        const resultCount = await searchResultsPage.getResultCountPerPage();
        expect(resultCount, `No results found for "${propertyDetailsToCheck['Property Type']}"`).toBeGreaterThan(0);

        // Verify a maximum of 5 results or less if fewer results are present
        await verifySearchResultsPropertyDetails(propertyDetailsToCheck, Math.min(resultCount, maxResultsToVerify));
    });

    // Test for last page results 
    test('verify for sale Senior Living property details in last page search results', async () => {
        const propertyDetailsToCheck = {
            'Property Type': 'Senior Living'
        };
        const maxResultsToVerify = 5;

        // Verify more than 1 page exists and go to last page
        await homePage.searchSalePropertyTypes(propertyDetailsToCheck['Property Type']);
        const pageCount = await searchResultsPage.getPageCount();
        expect(pageCount, `Expected more than 1 page of results for "${propertyDetailsToCheck['Property Type']}"`).toBeGreaterThan(1);
        await searchResultsPage.lastPage.click();

        // Get the actual result count on the last page (max 5)
        const resultCount = await searchResultsPage.getResultCountPerPage();
        expect(resultCount, `No results on last page for "${propertyDetailsToCheck['Property Type']}"`).toBeGreaterThan(0);
        await verifySearchResultsPropertyDetails(propertyDetailsToCheck, Math.min(resultCount, maxResultsToVerify));
    });

    test('verify results per page', async () => {
        const propertyDetailsToCheck = {
            'Property Type': 'Senior Living'
        };
        // Ensure there are at least 2 pages of results for the test to proceed
        await homePage.searchSalePropertyTypes(propertyDetailsToCheck['Property Type']);
        const pageCount = await searchResultsPage.getPageCount();
        expect(pageCount).toBeGreaterThanOrEqual(2);

        // Verify that the selected count text matches the result count per page
        const resultCountText = await searchResultsPage.resultsPerPage.textContent();
        const resultCountPerPage = await searchResultsPage.getResultCountPerPage();
        expect(parseInt(resultCountText.trim())).toBe(resultCountPerPage);
    });


    // Helper function for verifying property details
    async function verifySearchResultsPropertyDetails(detailsToCheck, resultCount) {
        // Loop through the number of results requested
        for (let index = 0; index < resultCount; index++) {
            await verifySalePropertyCard(index);

            const propertyTab = await searchResultsPage.openTabOnAction(() => searchResultsPage.clickSalePropertyTile(index));
            await propertyTab.waitForLoadState();

            const propertyPage = new PropertyPage(propertyTab);
            await propertyPage.propertyDetailsContainer.first().waitFor({ state: 'visible' });

            const detailItems = await propertyPage.propertyDetailsContainer.elementHandles();
            const propertyDetails = await propertyPage.getPropertyDetailItems(detailItems);

            // Iterate over property details and run assertions
            for (const detail of propertyDetails) {
                // Expect nameText and valueText to be non-null and non-empty
                expect(detail.label, `Name text is null or empty`).not.toBeNull();
                expect(detail.value, `Value text is null or empty`).not.toBeNull();

                // Check if the current label is in the detailsToCheck object and assert its value
                if (detailsToCheck[detail.label]) {
                    expect(detail.value).toContain(detailsToCheck[detail.label]);
                }
            }
            await searchResultsPage.closeTabAndRefocus(propertyTab);
        }
    }

    // Verifying the Sale Property Card (price, name, description)
    async function verifySalePropertyCard(index) {
        expect(await searchResultsPage.getPriceFromResult(index)).toMatch(/^(?:\$\d{1,3}(?:,\d{3})*|\bUnpriced\b)$/); // Expect price to be in dollar value or "Unpriced"
        expect(await searchResultsPage.getNameFromResult(index)).not.toBe(''); // Ensure property name is not empty
        expect(await searchResultsPage.getDescFromResult(index)).not.toBe(''); // Ensure property description is not empty
        //expect(await searchResultsPage.getAddressFromResult(index)).toMatch(/^\d+\s[A-Za-z0-9\s]+/); // expect address to start with number followed by a name (address can be null, leaving this out for now)
    }
});
