const { test, expect } = require("../resources/login-fixture");
const AccountSettingsPage = require("../pages/account-settings-page");

test.describe("Upload profile photo and cover", () => {
  test("Upload your profile photo ", async ({
    testUserLoginAccountProfilePage,
  }) => {
    const page = testUserLoginAccountProfilePage.page;
    const accSettingsPage = new AccountSettingsPage(page);
    const profilePhoto1 = "./resources/photo/picture.jpg";
    const profilePhoto2 = "./resources/photo/picture2.jpg";

    test.step("Edit Personal Info, select and upload profile photo", async () => {
      await accSettingsPage.btnEditPersonalInfo.click();
      await expect(accSettingsPage.headerEditInfo).toHaveText("Edit Info");
      await accSettingsPage.uploadProfilePicture(profilePhoto1);
      await Promise.all([
        page.waitForResponse(
          (response) =>
            response.url().includes("/account") &&
            response.finished() &&
            response.status() === 200 &&
            response.request().method() === "PATCH"
        ),
        expect(accSettingsPage.profileImageUpdated).toBeVisible(),
      ]);
    });

    test.step("Upload second picture to check that photo actually changed ", async () => {
      await accSettingsPage.btnEditPersonalInfo.click();
      await expect(accSettingsPage.headerEditInfo).toHaveText("Edit Info");
      await accSettingsPage.uploadProfilePicture(profilePhoto2);

      await Promise.all([
        page.waitForResponse(
          (response) =>
            response.url().includes("/account") &&
            response.finished() &&
            response.status() === 200 &&
            response.request().method() === "PATCH"
        ),
        expect(accSettingsPage.profileImageUpdated).toBeVisible(),
      ]);
    });
  });
});
