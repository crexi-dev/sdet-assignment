describe('User Registration Test', () => {
  it('Should register a new user with valid details', () => {
    // Visit the Crexi homepage
    cy.visit('https://www.crexi.com');
    
    // Click on the "Sign Up or Log In" button
    cy.contains('Sign Up or Log In').click({ force: true });

    // Switch to the "Sign Up" tab
    cy.contains('Sign Up').click({ force: true });

    // Wait for the page to load fully
    cy.wait(2000);

    // First Name
    cy.get('input[formcontrolname="firstName"]')
      .should('be.visible')
      .type('Jhon', { delay: 100, force: true });

    // Last Name
    cy.get('input[formcontrolname="lastName"]')
      .should('be.visible')
      .type('Smith', { delay: 100, force: true });

    // Email
    cy.get('input[formcontrolname="email"]')
      .should('be.visible')
      .type('stoyantest33@gmail.com', { delay: 100, force: true });

    // Password
    cy.get('input[formcontrolname="password"]')
      .should('be.visible')
      .type('crexiTest321!', { delay: 100, force: true });

    // Industry Role (Handling dropdown)
    cy.get('div.cui-select-input').click({ force: true });
    cy.get('span.cui-dropdown-list-item-text').contains('Selling/Buying Broker/Agent').click({ force: true });

    // Phone Number
    cy.get('input[formcontrolname="phone"]')
      .should('be.visible')
      .type('3054241234', { delay: 100, force: true });

    // Scroll the modal form down
    cy.get('div.mat-mdc-dialog-content').scrollTo('bottom', { ensureScrollable: true });

    // Ensure overlay is dismissed if it's covering the button
    cy.get('div.cdk-overlay-backdrop').then($overlay => {
      if ($overlay.is(':visible')) {
        cy.wrap($overlay).click({ force: true });
      }
    });

    // Click the "Sign Up" button directly by its class
    cy.get('button[data-cy="button-signup"]').click({ force: true });

    // Check for the success message that appears after registration
    // cy.contains('You successfully signed up. Welcome to Crexi!')
    //   .should('be.visible');
  });
});
