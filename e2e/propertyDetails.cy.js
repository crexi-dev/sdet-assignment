describe('Property Details Test', () => {
  it('Should display the property details when a property is clicked', () => {
    //  Log in
    cy.visit('https://www.crexi.com/');
    
    cy.contains('Sign Up or Log In').click({ force: true });
    cy.get('div.tab.switch').contains('Log In').click({ force: true });
    
    cy.wait(2000);
    cy.get('input[formcontrolname="email"]').type('ss100yan@gmail.com', { force: true });
    cy.get('input[formcontrolname="password"]').type('crexiTest123!', { force: true });
    cy.get('button[type="submit"]').click({ force: true });

    cy.wait(4000); // Ensure login and dashboard load completely

    //  Perform a search (using the working selector)
    cy.get('input.search-bar-input[name="search_term_string"]').first().type('Los Angeles', { force: true });

    // Click the search button or press Enter
    cy.get('input.search-bar-input[name="search_term_string"]').first().type('{enter}', { force: true });

    

    cy.get('.cui-card-cover-link', { timeout: 10000 }) // 10 seconds timeout
    .first()
    .invoke('removeAttr', 'target', { force: true })
    .click({ force: true });
  
  

// Verify that the property details page is displayed
cy.url().should('include', '/properties/'); 

// Verify that the property details are visible

 cy.get('div.property-info-container .address-line h2.text').should('be.visible');

});
});