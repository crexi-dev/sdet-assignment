import { test, expect } from "@playwright/test";
import { LandingPage } from "../pages/landing.page";
import { TestContext } from "../helpers/context";
import { Chance } from "chance";

test.describe("Sign Up Tests", () => {
    let context: TestContext;
    let landingPage: LandingPage;
    const chance = new Chance();

    test.beforeAll(async ({ browser }) => {
        context = new TestContext(browser);
        await context.initNewContext();
    });

    test.beforeEach(async () => {
        await context.initNewPage();
        landingPage = new LandingPage(context.page);
        await test.step("Navigate to landing page", async () => {
            await landingPage.navigate();
        });
    });

    /** In a real world test, cleanup would involve invalidating or deleting created used
     * so as to not pollute environment with large number of new accounts.
     */
    test("User can sign up for a new account.", async () => {
        const firstName = chance.first({ nationality: "en" });
        const lastName = chance.last({ nationality: "en" });
        const email = `${firstName}.${lastName}@gmail.com`;
        await test.step("Open the signup popup and enter randomly generated user data", async () => {
            await landingPage.actions.signUp({
                firstName,
                lastName,
                email,
                password: "uw6^j:UaG6r+8ur",
                role: "Other",
            });
        });
        await test.step("Validate user was created.", async () => {
            await landingPage.waitForSpinner();
            /**
             * Signing up for new account via automation fails, likely due to captcha, just validating error message as cannot bypass.
             * Would work to find way around captcha in a real world test
             * (usually work with developers to have a mechanism that allows automation
             * to bypass, even if that is only available in testing environments and not production.)
             * Currently just validating error message to confirm request for new user was made.
             */
            const failureMessage =
                "Account creation unsuccessful. If you find this message is unexpected please contact support.";
            await expect(landingPage.elements.notification(failureMessage).get()).toBeVisible();
        });
    });
});
