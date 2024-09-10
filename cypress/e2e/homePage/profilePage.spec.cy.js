import "cypress-real-events/support";
import mainPage from "../../page_objects/main.page";
import dashboardPage from "../../page_objects/dashboard.page";

describe("Profile", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    cy.errorHandler();
    cy.loginByApi();
  });

  it("Should change Profile Photo with Valid PNG format", () => {
    cy.intercept("PATCH", "https://api.crexi.com/account").as("avatarUpdated");
    mainPage.userIcon.realHover();
    cy.contains(" Account Settings ").click({ force: true });
    mainPage.accountSettingsLink.click();
    cy.url().should("eq", "https://www.crexi.com/dashboard/profile");
    dashboardPage.editPersonalDataButton.click({ force: true });
    //check that it accepts only images
    dashboardPage.editAvatarButton.eq(0).should("have.attr", "accept", "image/*");
    dashboardPage.editAvatarButton.eq(0).selectFile(`cypress/fixtures/gnome_paladin.png`);
    cy.contains("button", "Update").click();
    //waiting for API request that verifies taht PATCH requerst has been complete
    cy.wait("@avatarUpdated");
    cy.contains("Your personal info has been updated.").should("be.visible");
  });

  it("Should change Profile Photo with Valid JPG format", () => {
    cy.intercept("PATCH", "https://api.crexi.com/account").as("avatarUpdated");
    mainPage.userIcon.realHover();
    cy.contains(" Account Settings ").click({ force: true });
    mainPage.accountSettingsLink.click();
    cy.url().should("eq", "https://www.crexi.com/dashboard/profile");
    dashboardPage.editPersonalDataButton.click({ force: true });
    //check that it accepts only images
    dashboardPage.editAvatarButton.eq(0).should("have.attr", "accept", "image/*");
    dashboardPage.editAvatarButton.eq(0).selectFile(`cypress/fixtures/City_view.jpg`);
    cy.contains("button", "Update").click();
    //waiting for API request that verifies taht PATCH requerst has been complete
    cy.wait("@avatarUpdated");
    cy.contains("Your personal info has been updated.").should("be.visible");
  });

  it.skip("Should throw error if using wrong format (MP4)", () => {
    cy.intercept("PATCH", "https://api.crexi.com/account").as("avatarUpdated");
    cy.visit("/dashboard/profile");
    dashboardPage.editPersonalDataButton.click({ force: true });
    //check that it accepts only images
    dashboardPage.editAvatarButton.eq(0).selectFile(`cypress/fixtures/videofile.mp4`);
    cy.contains("button", "Update").click();
    cy.wait("@avatarUpdated");
    //should be some error that would let us know that we're using wrong format
    cy.contains("Some error message").should("be.visible");
  });
});
