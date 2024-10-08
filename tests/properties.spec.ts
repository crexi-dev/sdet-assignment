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
    
    test.beforeAll(async ({ browser }) => {
        context = new TestContext(browser);
        await context.initNewContext();
    });

    test.beforeEach(async () => {
        await context.initNewPage();
        landingPage = new LandingPage(context.page);
        await landingPage.navigate();
        await landingPage.actions.login(user);
        propertiesPage = new PropertiesPage(context.page);
        
    });

    test.afterAll(async () => {
        await context.dispose();
    });
    
    test("User can search for property and view property details.", async () => {
        const searchTerm = "Los Angeles, CA";
        await landingPage.actions.searchProperties(searchTerm);
        await expect(propertiesPage.elements.header().get()).toHaveText(`${searchTerm} Properties for Sale`);
        await propertiesPage.waitForSpinner();
        expect((await propertiesPage.elements.propertyListing().card().get().all()).length).toEqual(60);
    })

    test("When user clicks on property card, property details open in new tab", async () => {
        const searchTerm = "Los Angeles, CA";
        await landingPage.actions.searchProperties(searchTerm);
        await expect(propertiesPage.elements.header().get()).toHaveText(`${searchTerm} Properties for Sale`);
        await propertiesPage.waitForSpinner();
        const newTabPromise = context.browserContext.waitForEvent("page");
        const listing = propertiesPage.elements.propertyListing({index: "first"});
        await listing.card().get().waitFor({state: "visible"})
        const propertyTitle = await listing.title().get().innerText();
        const propertyAddress = (await listing.address().get().innerText()).split("\n").join(", ");
        await listing.card().get().click();
        const newTabPage = await newTabPromise;
        await newTabPage.waitForURL(/properties\/\d+\//, { waitUntil: "domcontentloaded" });
        const propertyDetailsPage = new PropertyDetailsPage(newTabPage);
        await expect(propertyDetailsPage.elements.propertyTitle().get()).toHaveText(propertyTitle);
        await expect(propertyDetailsPage.elements.propertyAddress().get()).toHaveText(propertyAddress);
    })
})
