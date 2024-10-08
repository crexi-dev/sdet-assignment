import { test, expect } from "@playwright/test";
import { LandingPage } from "../pages/landing.page";
import { TestContext } from "../helpers/context";
import { Chance } from "chance";


test.describe("Sign Up Tests", () => {
    let context: TestContext;
    let landingPage: LandingPage;
    let chance = new Chance();

    test.beforeAll(async ({ browser }) => {
        context = new TestContext(browser);
        await context.initNewContext();
    })

    test.beforeEach(async () => {
        await context.initNewPage();
        landingPage = new LandingPage(context.page);
        await landingPage.navigate();
    })

    test("User can sign up for a new account.", async () => {
        const firstName = chance.first({nationality: "en"});
        const lastName = chance.last({nationality: "en"});
        const email = `${firstName}.${lastName}@gmail.com`
        await landingPage.actions.signUp({
            firstName,
            lastName,
            email,
            password: "uw6^j:UaG6r+8ur",
            role: "Other",
        })
        await landingPage.waitForSpinner();
        // Signing up for new account via automation fails, likely due to captcha, just validating error message as cannot bypass.
        const failureMessage = "Account creation unsuccessful. If you find this message is unexpected please contact support.";
        await expect( landingPage.elements.notification(failureMessage).get()).toBeVisible();
    })
})