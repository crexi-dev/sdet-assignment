export function visitFirstPropertyCard(type) {
  cy.visit(`/${type}`);
  // If we decide to test e2e from clicking the property card to validating the info, we need to have the property url load directly instead of opening a new tab
  cy.get('[data-cy="propertyTile"] a.cui-card-cover-link')
    .first()
    .then(($link) => {
      const url = $link.attr("href");
      cy.visit(url);
    });
}
