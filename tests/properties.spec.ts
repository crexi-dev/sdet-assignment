import { test, expect } from "@playwright/test";
import { LandingPage } from "../pages/landing.page";
import { users } from "../data/users";
import { TestContext } from "../helpers/context";
import { PropertiesPage } from "../pages/properties.page";
import { PropertyDetailsPage } from "../pages/propertyDetails.page";

test.describe("Properties Tests", () => {
    let context: TestContext;
    let landingPage: LandingPage;
    let propertiesPage: PropertiesPage;
    const user = users.test;
    const searchTerm = "Los Angeles, CA";

    test.beforeAll(async ({ browser }) => {
        context = new TestContext(browser);
        await context.initNewContext();
    });

    test.beforeEach(async () => {
        await context.initNewPage();
        landingPage = new LandingPage(context.page);
        propertiesPage = new PropertiesPage(context.page);
        await test.step("Navigate to landing page and log in.", async () => {
            await landingPage.navigate();
            await landingPage.actions.login(user);
        });
    });

    test.afterAll(async () => {
        await context.dispose();
    });

    test("User can search for property and view property details.", async () => {
        await test.step(`Search for properties in ${searchTerm}`, async () => {
            await landingPage.actions.searchProperties(searchTerm);
        });

        await test.step("Verify user was taken to the property listings page, and properties matching search term are display.", async () => {
            await expect(propertiesPage.elements.header().get()).toHaveText(`${searchTerm} Properties for Sale`);
            await propertiesPage.waitForSpinner();
            /**
             * Just using the default number of displayed property listing tiles per page
             * as the way to confirm properties are displayed. In a read world test
             * more data would be used to confirm that search results are correct.
             */
            const expectedDisplayedProperties = 60;
            expect((await propertiesPage.elements.propertyListing().card().get().all()).length).toEqual(
                expectedDisplayedProperties
            );
        });
    });

    test("When user clicks on property card, property details open in new tab", async () => {
        let propertyDetailsPage: PropertyDetailsPage;
        let propertyTitle: string;
        let propertyAddress: string;

        await test.step(`Searching for properties in ${searchTerm}, and waiting for user to be taken to results.`, async () => {
            await landingPage.actions.searchProperties(searchTerm);
            await expect(propertiesPage.elements.header().get()).toHaveText(`${searchTerm} Properties for Sale`);
            await propertiesPage.waitForSpinner();
        });

        await test.step("Clicking on first listed property, and going to newly opened tab.", async () => {
            const newTabPromise = context.browserContext.waitForEvent("page");
            const listing = propertiesPage.elements.propertyListing({ index: "first" });
            await listing.card().get().waitFor({ state: "visible" });
            propertyTitle = await listing.title().get().innerText();
            propertyAddress = (await listing.address().get().innerText()).split("\n").join(", ");
            await listing.card().get().click();
            const newTabPage = await newTabPromise;
            await newTabPage.waitForURL(/properties\/\d+\//, { waitUntil: "domcontentloaded" });
            propertyDetailsPage = new PropertyDetailsPage(newTabPage);
        });

        await test.step("Verify property details loaded are correct.", async () => {
            await expect(propertyDetailsPage.elements.propertyTitle().get()).toHaveText(propertyTitle);
            await expect(propertyDetailsPage.elements.propertyAddress().get()).toHaveText(propertyAddress);
        });
    });
});
