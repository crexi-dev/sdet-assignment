import { test, expect } from '@playwright/test';
import { LogInPage } from '../pages/login.page';
import { ProfilePage } from '../pages/profile.page';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.crexi.com/');
  const loginPage = new LogInPage(page);
  await loginPage.logIn('yorippin@gmail.com', 'Lakersrule123!');
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
