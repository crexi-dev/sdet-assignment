const { test, expect } = require('@playwright/test');
require('dotenv').config();
const { ProfilePage } = require('../pageobjects/profile-page.js');
const { DashboardPage } = require('../pageobjects/dashboard-page.js');
const { AuthPage } = require('../pageobjects/auth-page.js');
const users = require('../utils/users-testdata.json');

test.describe('User Profile Verification', () => {
    let authPage, dashboardPage, profilePage;

    test.beforeEach(async ({ page }) => {
        authPage = new AuthPage(page);
        dashboardPage = new DashboardPage(page);
        profilePage = new ProfilePage(page);
        await page.goto('/');
    });

    test('verify user can set jpg profile picture', async () => {
        const filepath = './assets/porsche.jpg';

        await authPage.logInFormSubmit({
            email: users[0].email,
            password: process.env.USER_PASSWORD
        });
        await dashboardPage.goToAccountSettings();
        await verifyProfilePictureUpload(filepath);
    });

    test('verify user can set png profile picture', async () => {
        const filepath = './assets/dog.png';

        await authPage.logInFormSubmit({
            email: users[0].email,
            password: process.env.USER_PASSWORD
        });
        await dashboardPage.goToAccountSettings();
        await verifyProfilePictureUpload(filepath);
    });

    // BUG: Attempting an mp4 upload displays a success message while the previous profile picture remains
    test.skip('verify error diplays if use attempts mp4 upload', async () => {
        const filepath = './assets/smallmp4.mp4';

        await authPage.logInFormSubmit({
            email: users[0].email,
            password: process.env.USER_PASSWORD
        });
        await dashboardPage.goToAccountSettings();
        await verifyProfilePictureUpload(filepath);
    });

    // BUG: Attempting a webp upload displays a success message while the previous profile picture remains
    test.skip('verify error diplays if use attempts webp upload', async () => {
        const filepath = './assets/webpfile.webp';

        await authPage.logInFormSubmit({
            email: users[0].email,
            password: process.env.USER_PASSWORD
        });
        await dashboardPage.goToAccountSettings();
        await verifyProfilePictureUpload(filepath);
    });

    test('verify error displays for profile pictures over 3MB', async () => {
        const filepath = './assets/3MBpng.png';

        await authPage.logInFormSubmit({
            email: users[0].email,
            password: process.env.USER_PASSWORD
        });
        await dashboardPage.goToAccountSettings();
        await profilePage.uploadProfilePicture(filepath);
        await expect(profilePage.maxSizeProfilePicErr).toBeVisible();
    });

    async function verifyProfilePictureUpload(filepath) {
        const profileImageExists = await profilePage.profileImg.count() > 0;
        let oldImage = '';
        if (profileImageExists) {
            oldImage = await profilePage.profileImg.getAttribute('src');
        }
        await profilePage.uploadProfilePicture(filepath);
        await profilePage.verifyResponse(200, 'PATCH', '/account');
        const newImage = await profilePage.profileImg.getAttribute('src');
        await profilePage.personalUpdateMsg.waitFor({ state: 'visible' });
        await expect(newImage).not.toBe(oldImage);
    }
});
