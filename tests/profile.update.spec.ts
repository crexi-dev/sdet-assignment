import { test, expect } from '@playwright/test';
import { LogInPage } from '../pages/login.page';
import { ProfilePage } from '../pages/profile.page';
import { readJsonFile } from '../utils/helpers';
import path from 'path';
const env = process.env.ENV || 'prod';

const logins = readJsonFile(path.join(__dirname, `../test_data/${env}/logins.json`));

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.BASE_URL!);
  const loginPage = new LogInPage(page);
  await loginPage.logIn(logins.logins[0].email, logins.logins[0].password);
});

/*

    Logs in and updates the profile picture twice, first with a jpg
    then with a png.

*/
test('Update profile picture with JPG and PNG', async ({ page }) => {
  const profilePage = new ProfilePage(page);
  //upload a jpg
  await profilePage.uploadPhoto('../data_files/sample-profile.jpg');
  await expect(profilePage.successfulUpdateMsg).toBeVisible();
  //upload a png
  await profilePage.uploadPhoto('../data_files/sample-profile.png');
  await expect(profilePage.successfulUpdateMsg).toBeVisible();
});

/*
    Logs in and attempts to update the profile picture with a file that exceeds
    the size allowed. Should produce an error message and no update.
*/
test('Update profile picture with a bigger size than allowed', async ({ page }) => {
  const profilePage = new ProfilePage(page);
  //upload a big file
  await profilePage.uploadPhoto('../data_files/sample-profile-bigger.jpg');
  await expect(profilePage.fileExceedsErrorMsg).toBeVisible();
});

/* 

Test Cases:
Happy Path upload PNG or JPG check for "Your personal info has been updated." 

On upload you can check for thumbnailBase64Content in account PATCH request.

Negative Scenarios: Try uploading a file over 3MB should get File must not exceed 3 MB message.
Try uploading file that is not a PNG or JPG.

Bug: Date of Birth is required to update the profile, 
but there is no red asterisk indicating it is mandatory and no error message when trying to update.

If you try uploading a non JPG or PNG file there is no error message, 
it just does not update the profile pic but still says your personal info has been updated.


*/
