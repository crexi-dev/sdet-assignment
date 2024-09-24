describe('Search Functionality Test', () => {
  it('Should search for properties based on type', () => {
    //  Log in
    cy.visit('https://www.crexi.com/');
    
    cy.contains('Sign Up or Log In').click({ force: true });
    cy.get('div.tab.switch').contains('Log In').click({ force: true });
    
    cy.wait(2000);
    cy.get('input[formcontrolname="email"]').type('ss100yan@gmail.com', { force: true });
    cy.get('input[formcontrolname="password"]').type('crexiTest123!', { force: true });
    cy.get('button[type="submit"]').click({ force: true });

    cy.wait(4000); // Ensure login and dashboard load completely

    // Open the property type dropdown
    cy.get('span[data-cy="selectedCount"]').first().click({ force: true });

    // Select the checkbox for "Retail"
    cy.get('input[name="item_0"]').check({ force: true });

    // Enter a search location or criteria
    cy.get('input.search-bar-input[name="search_term_string"]').first().type('Los Angeles', { force: true });

    // Click the search button or press Enter
    cy.get('input.search-bar-input[name="search_term_string"]').first().type('{enter}', { force: true });

     // Handle the popup by clicking "Cancel"
     cy.contains('button', 'Cancel').click({ force: true });

    // Verify that search results appear
    cy.contains('Retail Properties').should('be.visible');
  });
});