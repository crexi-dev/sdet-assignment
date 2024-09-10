class MainPage {
    get signupAndLoginButton() {return cy.get('[class="transclude-auth right-header-section"] [type="button"]') }
    get searchBar() {return cy.get('[class="search-form visible"] [name="search_term_string"]')}
    get searchButton() {return cy.get('[class="search-form visible"] [title="Search"]')}
    get propertyTypeDropDown() {return cy.get('[class="search-form visible"] [data-cy="selectedCount"]')}
    get allCheckBoxAtPropertyType() {return cy.get('[name="all"][data-cy="checkbox"]')}
    get userIcon() {return cy.get('[class="header-nav-link hover-toggle-btn ng-star-inserted"]')}
    get accountSettingsLink() {return cy.get('[class="card-body personal"] [class="profile-link"]')}
}
    export default new MainPage()