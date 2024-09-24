describe('Profile Picture Update Test', () => {
  it('Should update the profile picture successfully', () => {
    // Login
    cy.visit('https://www.crexi.com/');

    // Click on the "Sign Up or Log In" button
    cy.contains('Sign Up or Log In').click({ force: true });

    // Switch to the "Log In" tab
    cy.get('div.tab.switch').contains('Log In').click({ force: true });

    // Wait for the page to load fully
    cy.wait(2000);

    // Fill the email and password fields
    cy.get('input[formcontrolname="email"]').type('ss100yan@gmail.com', { force: true });
    cy.get('input[formcontrolname="password"]').type('crexiTest123!', { force: true });

    // Click the login button
    cy.get('button[type="submit"]').click({ force: true });

    // Wait for login to complete and dashboard to load
    cy.wait(4000);

    
   
    //  Open the profile page
    cy.visit('https://www.crexi.com/dashboard/profile');
    cy.wait(2000);  // Ensure the page loads fully

    //  Click the 'Edit' button for the profile picture
    cy.get('.card-body.personal a.profile-link').click({ force: true });


    //Click the 'Edit' button for the profile picture
    
cy.get('input[name="fileInput"]').parents('div').contains('Edit').click({ force: true });
// This is the Edit button for profile pic


    // Upload the new profile picture
    const fileName = 'newProfilePicture.png'; // Replace with your file path
    cy.get('input[type="file"]').attachFile(fileName);


//  Submit the update by directly targeting the button and ensuring visibility
cy.contains('Update').scrollIntoView().click({ force: true });



 //  Assert that the success banner is displayed
cy.contains('Your personal info has been updated').should('be.visible');
  });
});


