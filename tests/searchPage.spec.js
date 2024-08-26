const { test, expect } = require('./../fixtures/API');
const searchText = '1233 Lincoln Blvd Santa Monica, CA 90401';
/*Note:
      The commented out lines below are locators which are not working, so I alternated it with Keyboard actions */

test.describe('@smoke @searchPage Search Page validations', async () => {
    test('@qasearch001 Validate Search Page', async ({ page, loginPage, searchPage }) => {
        //Navigate to Crexi
        await page.goto('/');

        //Click Sign up/Log In button
        await Promise.all([
            loginPage.signUpLoginButton.click(),
            expect(loginPage.SignupTab).toHaveText('Sign Up'),
            loginPage.logInTab.click(),
        ]);

        //Login Details and wait for page to load
        await loginPage.enterEmail.fill('crexisearch@yahoo.com');
        await loginPage.enterPassword.fill('123456Abcdefgh');
        await loginPage.loginButton.click();

        await Promise.all([
            page.waitForResponse(
                response => response.url().includes('/account')
                    && response.finished()
                    && response.status() === 200),
            expect(loginPage.welcomePageheader).toHaveText('Your Next Deal Starts Here.')
        ]);

        //Search Property and validate the details
        await searchPage.leaseLink.click();
        await page.keyboard.press('Tab');
        // await expect(searchPage.searchTextbox).toBeEnabled();
        await searchPage.enterSearchText.fill(searchText);
        // await searchPage.enterSearchText.fill(searchText);
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        // await searchPage.searchTextbox.click();

        await Promise.all([
            page.waitForResponse(
                response => response.url().includes('https://api-lease.crexi.com/assets/search')
                    && response.finished()
                    && response.status() === 200
                    && response.request().method() === 'POST'),
        ]);
        await expect(searchPage.SearchCount).toHaveText('1');
        await expect(searchPage.undisclosedRate).toHaveText('Undisclosed Rate');
        await expect(searchPage.partialAddressLincoln).toHaveText('1231 Lincoln Blvd');
        await expect(searchPage.propertyDesc).toHaveText(' Office • Single tenant • 7,250 sq. ft. ');
        const addressVal = await searchPage.propertyAddress.allTextContents();
        addressVal.forEach((value, index) => {
            expect(addressVal[index]).toBe(' 1233 Lincoln Blvd Santa Monica, CA 90401');
        });
    });
});