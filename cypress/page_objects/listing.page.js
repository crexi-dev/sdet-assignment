class ListingPage {
    get listingElements() {return cy.get('[class="search-results"]')}
    get mapButton() {return cy.get('[role="switch"]') }
    get googleMapElement() {return cy.get('[data-cy="mapContainer"][searchcontext="sales"]')}
    get priceFilter() {return cy.get('[class="filter ng-star-inserted"] [formtitle="Price"]')}
    get minPriceInput() {return cy.get('[name="minValue"]') }
    get maxPriceInput() {return cy.get('[name="maxValue"]') }
    get excludeUnpricedCheckbox() {return cy.get('[type="checkbox"]')}
    get applyButton() {return cy.get('[class="apply cui-button-primary mdc-button mat-mdc-button mat-unthemed mat-mdc-button-base"]')}
    get closePopUp() {return cy.get('[class="cui-modal-close ng-star-inserted"]')}
}   
    export default new ListingPage()