// @ts-check
const { test, expect } = require("../resources/login-fixture");
const PropertiesPage = require("../pages/properties-page");
//Test uses the testUserLoginPropertyDataPage fixture to login and navigate to the Property Data page
test.describe("Property related tests: View property details and search property", () => {
  test("Property Details: Users can click on a property to view its details.", async ({
    testUserLoginPropertyDataPage,
  }) => {
    const page = testUserLoginPropertyDataPage.page;
    const propertiesPage = new PropertiesPage(page);

    await test.step("Click on property data from User profile and check property details are displayed", async () => {
      await propertiesPage.clickFirstPropertyDetails();
      await expect(propertiesPage.propertyDetailsTitle).toBeVisible({
        timeout: 10000,
      });
    });
  });

  test("Users can search property by property status criteria", async ({
    testUserLoginPropertyDataPage,
  }) => {
    const page = testUserLoginPropertyDataPage.page;
    const propertiesPage = new PropertiesPage(page);

    await test.step("Click on property data from user profile and check results are refreshed", async () => {
      const initialResultCount = await propertiesPage.searchResultsCount;
      await propertiesPage.setPropertyStatusFilter("For Sale");
      const actualResultCount = await propertiesPage.searchResultsCount;
      await expect(initialResultCount).not.toEqual(actualResultCount);
    });
  });
});
