import mainPage from "../../page_objects/main.page";
import listingPage from "../../page_objects/listing.page";

describe("Search", () => {
  beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    cy.errorHandler();
    cy.visit("/");
  });

  it("Should search by Keyword", () => {
    mainPage.searchBar.type("test", { force: true });
    cy.wait(1500)
    mainPage.searchButton.click();
    cy.url().should("contain", "?sort=Relevance&term=test");
    listingPage.listingElements.should("be.visible");
  });
  it("Should search by City using helper", () => {
    cy.intercept('POST', 'https://api.crexi.com/assets/search').as('searchResults')
    mainPage.searchBar.type("Los");
    // cy.contains("Los Angeles").click();
    cy.get('[data-cy="searchSuggestionItem"] [title="Los Angeles, CA"]').click();
    cy.get("h1").should("contain", " Los Angeles, CA Properties for Sale ");
    cy.wait('@searchResults')
    cy.get('[class="search-bar-pill-text"]').should("have.text", "Los Angeles, CA");
    listingPage.listingElements.should("be.visible");
  });
  it("Should turn the map on/off", () => {
    cy.visit("properties?placeIds%5B%5D=ChIJE9on3F3HwoAR9AhGJW_fL-I&mapZoom=9");
    cy.wait(3000);
    listingPage.mapButton.should("have.attr", "aria-checked", "true");
    listingPage.googleMapElement.should("have.attr", "class", "ng-star-inserted");
    listingPage.mapButton.click();
    listingPage.mapButton.should("have.attr", "aria-checked", "false");
    cy.url().should("contain", "showMap=false");
    listingPage.googleMapElement.should("have.attr", "class", "ng-star-inserted hide-map-view");
  });
  it("Should search by Property type", () => {
    mainPage.propertyTypeDropDown.click();
    mainPage.allCheckBoxAtPropertyType.click();
    cy.contains(" Senior Living ").click();
    mainPage.searchButton.click();
    cy.url().should("contain", "properties?types%5B%5D=Senior%20Living");
  });
  it("Should filter search by Price", () => {
    // cy.intercept("POST", "https://api.crexi.com/assets/search").as("stableDom");
    const minValue = 1000000;
    const maxValue = 1200000;
    cy.visit("/properties");
    listingPage.priceFilter.click();
    listingPage.minPriceInput.type(minValue);
    listingPage.maxPriceInput.type(maxValue);
    listingPage.excludeUnpricedCheckbox.check();
    listingPage.applyButton.click();
    listingPage.closePopUp.click();
    cy.url().should("contain", `askingPriceMax=${maxValue}&askingPriceMin=${minValue}`);
    cy.wait(2000);
    // cy.wait("@stableDom").then((interception) => {
    //   console.log(interception);
    // });
    const elementsToCheck = [0, 1, 20, 58, 59];
    elementsToCheck.forEach((index) => {
      cy.get('[data-cy="propertyPrice"]')
        .eq(index)
        .invoke("text")
        .then((text) => {
          const price = Number(text.replace(/[$,]/g, ""));
          cy.wrap(price).should("be.within", minValue, maxValue, `Element at index ${index} has a price of ${text}`);
        });
    });
  });
});
