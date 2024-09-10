class DashBoard {
        get avatarIcon() {return cy.get('[data-cy="userAvatar"]')}
        get editAvatarButton() {return cy.get('input[name="fileInput"]')}
        get editPersonalDataButton() {return cy.get('[class="card-body personal"] [class="profile-link"]')}
}   
    export default new DashBoard()