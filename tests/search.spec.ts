import { test, expect } from "@playwright/test";
import { LandingPage } from "../pages/landing.page";
import { users } from "../data/users";
import { TestContext } from "../helpers/context";
import { PropertiesPage } from "../pages/properties.page";

test.describe("Search Tests", () => {
    let context: TestContext;
    let landingPage: LandingPage;
    let propertiesPage: PropertiesPage;

    const user = users.test;

    test.beforeAll(async ({ browser }) => {
        context = new TestContext(browser);
        await context.initNewContext();
    });

    test.beforeEach(async () => {
        await context.initNewPage();
        landingPage = new LandingPage(context.page);
        propertiesPage = new PropertiesPage(context.page);
        await test.step("Navigating to landing page and logging in.", async () => {
            await landingPage.navigate();
            await landingPage.actions.login(user);
        });
    });

    test.afterAll(async () => {
        await context.dispose();
    });

    test("User can filter search", async () => {
        const searchTerm = "Los Angeles, CA";
        await test.step(`Filtering search to only include retail locations, and searching for properties in ${searchTerm}`, async () => {
            await landingPage.actions.filterSearch(["Retail"]);
            await landingPage.actions.searchProperties(searchTerm);
        });
        await test.step("Verifying retail properties are displayed.", async () => {
            await propertiesPage.waitForSpinner();
            await expect(propertiesPage.elements.header().get()).toHaveText(`${searchTerm} Retail Properties for Sale`);
            expect(await propertiesPage.elements.propertyListing().card().get().count()).toEqual(60);
        });
    });
});
