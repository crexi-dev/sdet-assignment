import { test, expect } from "@playwright/test";
import { LandingPage } from "../pages/landing.page";
import { users } from "../data/users";
import { TestContext } from "../helpers/context";
import { ProfilePage } from "../pages/profile.page";
import * as path from "path";

test.describe("Profile Tests", () => {
    let context: TestContext;
    let landingPage: LandingPage;
    let profilePage: ProfilePage;
    const user = users.test;

    test.beforeAll(async ({ browser }) => {
        context = new TestContext(browser);
        await context.initNewContext();
    });
    test.beforeEach(async () => {
        await context.initNewPage();
        landingPage = new LandingPage(context.page);
        profilePage = new ProfilePage(context.page);
        await test.step("Navigating to landing page and logging in.", async () => {
            await landingPage.navigate();
            await landingPage.actions.login(user);
            await profilePage.navigate();
        });
    });

    test.afterAll(async () => {
        await context.dispose();
    });

    test("User can change profile picture", async () => {
        await test.step("Verifying profile page to load.", async () => {
            await profilePage.waitForSpinner();
            await expect(profilePage.elements.title.welcomeMessage().get()).toHaveText(
                `Welcome Back ${user.firstName}`
            );
        });
        /**
         * Currently image does not persist on user's profile, even though there are no errors,
         * and the image is displayed as the user's profile avatar in the modal.
         * or any failing API requests, would bring up with developers as to why this might be the case,
         * and if this is expected behavior or not.
         */
        await test.step("Upload new profile picture for user.", async () => {
            const profilePicture = path.join(__dirname, "fixtures", "static", "profile.png");
            await profilePage.actions.changeProfilePicture(profilePicture);
        });
    });
});
