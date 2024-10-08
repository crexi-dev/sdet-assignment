import { test, expect } from "@playwright/test";
import { LandingPage } from "../pages/landing.page";
import { users } from "../data/users";
import { TestContext } from "../helpers/context";
import { ProfilePage } from "../pages/profile.page";
import path = require("path");


test.describe("Profile Tests", () => {
    let context: TestContext;
    let landingPage: LandingPage;
    let profilePage: ProfilePage;
    const user = users.test;
    test.beforeAll(async ({ browser }) => {
        context = new TestContext(browser);
        await context.initNewContext();
    })
    test.beforeEach(async () => {
        await context.initNewPage();
        landingPage = new LandingPage(context.page);
        profilePage = new ProfilePage(context.page);
        await landingPage.navigate();
        await landingPage.actions.login(user);
        await profilePage.navigate();
    });

    test.afterAll(async () => {
        await context.dispose();
    });

    test("User can change profile picture", async () => {
        await profilePage.waitForSpinner();
        await expect(profilePage.elements.title
            .welcomeMessage().get())
            .toHaveText(`Welcome Back ${user.firstName}`);
        const profilePicture = path.join(__dirname,  "fixtures", "static", "profile.png" )
        await profilePage.actions.changeProfilePicture(profilePicture);
        await context.page.waitForTimeout(3000)
    })
})