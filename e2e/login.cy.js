describe('Login Test', () => {
  it('Should log in with valid credentials', () => {
    // Visit the homepage
    cy.visit('https://www.crexi.com/');

    // Click on the "Sign Up or Log In" button
    cy.contains('Sign Up or Log In').click({ force: true });

    // Switch to the "Log In" tab
    cy.get('div.tab.switch').contains('Log In').click({ force: true });

    // Wait for the page to load fully
    cy.wait(2000);

    // Use formcontrolname to target the email field
    cy.get('input[formcontrolname="email"]')
      .should('exist')
      .should('be.visible')
      .focus()
      .clear()
      .type('ss100yan@gmail.com', { delay: 100, force: true });

    // Ensure the password input is visible before typing
    cy.get('input[formcontrolname="password"]')
      .should('exist')
      .should('be.visible')
      .focus()
      .clear()
      .type('crexiTest123!', { delay: 100, force: true });

    // Click the login button
    cy.get('button[type="submit"]').should('be.visible').click({ force: true });

    // Wait for the page to load fully after login
    cy.wait(4000);

    // Check for a different unique element after login, like the profile icon or dashboard link
    cy.get('span.icon-regular.fa-bell').should('be.visible'); // Bell icon check



  });
});
