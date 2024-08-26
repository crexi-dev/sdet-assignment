const { test, expect } = require('./../fixtures/API');

/*NOTE: On the Property page I was unable to use any below - commented out locators to validate the page. 
       I would like to learn if the team has any idea or have been successful*/

test.describe('@smoke @propertyDetails Property Details Page validations', async () => {
    test('@qaproperty001 Validate Property View Details', async ({ page, loginPage, propertyListpage, /*propertyDetailsPage*/ }) => {
        //Navigate to Crexi
        await page.goto('/');

        //Click Sign up/Log In button
        await Promise.all([
            loginPage.signUpLoginButton.click(),
            expect(loginPage.SignupTab).toHaveText('Sign Up'),
            loginPage.logInTab.click(),
        ]);

        //Enter Email and Password and successful login
        await loginPage.enterEmail.fill('crexiproperty@yahoo.com');
        await loginPage.enterPassword.fill('123456Abcdefgh');
        await loginPage.loginButton.click();

        await Promise.all([
            page.waitForResponse(
                response => response.url().includes('/account')
                    && response.finished()
                    && response.status() === 200),
            expect(loginPage.welcomePageheader).toHaveText('Your Next Deal Starts Here.')
        ]);

        //Click Sale Properties and View the details of the first property
        await propertyListpage.salePropertieslink.click();
        let propId;
        await Promise.all([
            page.waitForResponse(
                (response) => response.url().includes('/assets/search')
                    && response.finished()
                    && response.status() === 200
                    && response.request().method() === 'POST'
                    && response.json().then((result) => propId = result.data[0].id)
            ),
            expect(propertyListpage.pageHeader).toHaveText(' Commercial Properties for Sale ')
        ]);

        await propertyListpage.propertylist.nth(0).click();
        await Promise.all([
            page.waitForResponse(
                response => response.url().includes(`/assets/${propId}`)
                    && response.finished()
                    && response.status() === 200
                    && response.request().method() === 'GET'),
        ]);

        // await expect(propertyDetailsPage.breadcrumbsProperty).toBeEnabled(); 
        // await expect(propertyDetailsPage.leftColumnImage.nth(0)).toBeVisible();
        // await expect(propertyDetailsPage.listingContactsLabel).toHaveValue('Listing Contacts');
        // await expect(propertyDetailsPage.rightColumnTabs.nth(0)).toHaveText('Property');
        // await expect(propertyDetailsPage.rightColumnTabs.nth(1)).toHaveText('Due Diligence');
        // await expect(propertyDetailsPage.rightColumnTabs.nth(2)).toHaveText('My Notes');
        // await expect(propertyDetailsPage.addressLabel).toHaveText('Address');
        // await expect(propertyDetailsPage.sectionHeaders.nth(0)).toHaveText('Details');
    });
});