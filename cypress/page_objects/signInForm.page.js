class RegistrationForm {
    get createRealEstateBtn() {return cy.get('[style="min-height: 0px; height: auto; transition-duration: 300ms;"] [role="button"]').eq(1)}
    get firstNameInputField() {return cy.get('[formcontrolname="firstName"][name="firstName"]')}
    get lastNameInputField() {return cy.get('[formcontrolname="lastName"][name="lastName"]')}
    get emailInputField() {return cy.get('[formcontrolname="email"]')}
    get passwordInputField() {return cy.get('[formcontrolname="password"]')}
    get roleDropDownMenu() {return cy.get('[data-cy="selectDropdown"][formcontrolname="role"]')}
    get phoneInputField() {return cy.get('[formcontrolname="phone"][name="phone"]')}
    get signUpButton() {return cy.get('[data-cy="button-signup"]')}
    get firstNameErrorMessage() {return cy.get('[class="two"] [class="validation ng-star-inserted"]').eq("0")}
    get lastNameErrorMessage() {return cy.get('[class="two"] [class="validation ng-star-inserted"]').eq("1")}
    get emailErrorMessage() {return cy.get('[class="one"] [class="validation ng-star-inserted"]').eq("0")}
    get passwordErrorMessage() {return cy.get('[class="one"] [class="validation ng-star-inserted"]').eq("1")}
    get roleErrorMessage() {return cy.get('[data-cy="validation"] [class="ng-star-inserted"]')}
    get logInTab() {return cy.get('[class="tab switch"]')}
    get loginButton() {return cy.get('[data-cy="button-login"]')}
    get incorrectUserErrorMessage() {return cy.get('[class="validation server-validation ng-star-inserted"]').eq(0)}
    

     signOut() {
        cy.visit("/dashboard/my-crexi");
        cy.contains("span.mdc-button__label", "Sign Up or Log In").should("not.exist");
        cy.contains("Log Out").click();
        cy.contains("Are you sure you want to log out?").should("be.visible");
        cy.contains("span.mdc-button__label", "Yes").click();
        cy.contains("span.mdc-button__label", "Sign Up or Log In").should("be.visible");
    }
    
}
    export default new RegistrationForm()