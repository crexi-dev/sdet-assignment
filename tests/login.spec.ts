import { test, expect } from "@playwright/test";
import { LandingPage } from "../pages/landing.page";
import { users } from "../data/users";
import { TestContext } from "../helpers/context";

test.describe("Login Tests", () => {
    let context: TestContext;
    let landingPage: LandingPage;
    const user = users.test;

    test.beforeAll(async ({ browser }) => {
        context = new TestContext(browser);
        await context.initNewContext();
    });

    test.beforeEach(async () => {
        await context.initNewPage();
        landingPage = new LandingPage(context.page);
        await test.step("Navigating to landing page.", async () => {
            await landingPage.navigate();
        });
    });

    test.afterAll(async () => {
        await context.dispose();
    });

    test("Existing user is able to login", async () => {
        await test.step("Logging in with existing user.", async () => {
            await landingPage.navigate();
            await landingPage.actions.login(user);
        });
    });

    test("If users attempts to log in with invalid credentials, validation message informs user username or password was incorrect.", async () => {
        await test.step("Entering user credentials and submitting.", async () => {
            await landingPage.actions.enterCredentials({
                email: "test@test.com",
                password: "test123",
            });
            await landingPage.elements.signUpOrLoginModal.login.logInButton().get().click();
        });
        await test.step("Confirming validation message", async () => {
            const validation = landingPage.elements.signUpOrLoginModal.login.validationMessage().get();
            const expectedMessage = "The email/username or password is incorrect.";
            await expect(validation).toHaveText(expectedMessage);
        });
    });
});
