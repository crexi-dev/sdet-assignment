const { test, expect } = require('./../fixtures/API');
const profileImagePic1 = '././test_assets/ProfilePictureCrexi1.jpg';
const profileImagePic2 = '././test_assets/ProfilePictureCrexi2.jpg';
const headerImagePic = '././test_assets/HeaderPictureCrexi.jpg';

test.describe('@smoke @profileData Profile Data validations', async () => {
    test('@qaprofile001 Change Profile Image', async ({ page, loginPage, profilePage }) => {
        await page.goto('/');

        //Click Sign up/Log In button
        await Promise.all([
            loginPage.signUpLoginButton.click(),
            expect(loginPage.SignupTab).toHaveText('Sign Up'),
            loginPage.logInTab.click(),
        ]);

        //Login to the account
        await loginPage.enterEmail.fill('crexiprofiledata@yahoo.com');
        await loginPage.enterPassword.fill('123456Abcdefgh');
        await loginPage.loginButton.click();

        await Promise.all([
            page.waitForResponse(
                response => response.url().includes('/account')
                    && response.finished()
                    && response.status() === 200),
            expect(loginPage.welcomePageheader).toHaveText('Your Next Deal Starts Here.')
        ]);

        //Navigate to Profile Data
        await page.goto('/dashboard/profile');

        //Click Edit Personal Data and update Profile Image
        await profilePage.editPersonalData.click();
        await expect(profilePage.editInfoModal).toHaveText('Edit Info');
        await profilePage.selectDateOfBirth('9/9/1990', 'September 9, 1990');
        await profilePage.uploadProfilePic(profileImagePic1);
        await Promise.all([
            page.waitForResponse(
                response => response.url().includes('/account')
                    && response.finished()
                    && response.status() === 200
                    && response.request().method() === 'PATCH'),
            expect(profilePage.profileImageUpdated).toBeVisible()
        ]);

        //Uploading 2nd image since there isn't a way to revert profile image to default image.
        await profilePage.editPersonalData.click();
        await expect(profilePage.editInfoModal).toHaveText('Edit Info');
        await profilePage.uploadProfilePic(profileImagePic2);

        await Promise.all([
            page.waitForResponse(
                response => response.url().includes('/account')
                    && response.finished()
                    && response.status() === 200
                    && response.request().method() === 'PATCH'),
            expect(profilePage.profileImageUpdated).toBeVisible()
        ]);
    });

    test('@qaprofile002 Change Header Image', async ({ page, loginPage, profilePage }) => {
        await page.goto('/');
        
        //Click Sign up/Log In button
        await Promise.all([
            loginPage.signUpLoginButton.click(),
            expect(loginPage.SignupTab).toHaveText('Sign Up'),
            loginPage.logInTab.click(),
        ]);

        //Login to the account
        await loginPage.enterEmail.fill('crexiheaderimage@yahoo.com');
        await loginPage.enterPassword.fill('123456Abcdefg');
        await loginPage.loginButton.click();

        await Promise.all([
            page.waitForResponse(
                response => response.url().includes('/account')
                    && response.finished()
                    && response.status() === 200),
            expect(loginPage.welcomePageheader).toHaveText('Your Next Deal Starts Here.')
        ]);

        //Navigate to Profile Data
        await page.goto('/dashboard/profile');

        //Click Edit Personal Data and update Header Image
        await profilePage.editPersonalData.click();
        await expect(profilePage.editInfoModal).toHaveText('Edit Info');
        await profilePage.uploadHeaderPic(headerImagePic);
        await Promise.all([
            page.waitForResponse(
                response => response.url().includes('/account')
                    && response.finished()
                    && response.status() === 200
                    && response.request().method() === 'PATCH')
        ]);

        await profilePage.editPersonalData.click();
        await expect(profilePage.headerImageDefault).not.toBeVisible();
        await expect(profilePage.revertToDefault).toBeVisible();

        //Revert Header image to default image.
        await profilePage.revertHeaderPic();

        await Promise.all([
            page.waitForResponse(
                response => response.url().includes('/account')
                    && response.finished()
                    && response.status() === 200
                    && response.request().method() === 'PATCH'),
            expect(profilePage.headerImageDefault).toBeVisible()
        ]);
    });
});