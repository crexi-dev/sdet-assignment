export function propertyTypes(propertyTypesArray) {
  cy.get('[data-cy="selectDropdown"]').first().click();
  propertyTypesArray.forEach((propertyType) => {
    cy.get(`label[for^="mat-mdc-checkbox-"]`).contains(propertyType).click();
  });
  cy.get('button[title="Search"]').first().click();
  if (propertyTypesArray.length === 1) {
    cy.contains(`${propertyTypesArray[0]} Properties for Sale`).should(
      "be.visible"
    );
  } else {
    cy.contains(`Commercial Properties for Sale`).should("be.visible");
  }
}
