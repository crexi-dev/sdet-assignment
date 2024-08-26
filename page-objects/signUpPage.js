exports.SignUpPage = class SignUpPage {
    constructor(page) {
        this.page = page;
        this.firstName = page.locator('div[id="signupModal"] input[name="firstName"]');
        this.firstNameError = page.locator('input[name="firstName"] + span[class="validation ng-star-inserted"]');
        this.lastName = page.locator('div[id="signupModal"] input[name="lastName"]');
        this.lastNameError = page.locator('input[name="lastName"] + span[class="validation ng-star-inserted"]');
        this.email = page.locator('div[id="signupModal"] input[name="email"]');
        this.emailError = page.locator('input[name="email"] + span[class="validation ng-star-inserted"]');
        this.password = page.locator('div[id="signupModal"] input[name="password"]');
        this.passwordMinimum = page.locator('[class="min-password"]', { hasText: 'Minimum 12 characters' });
        this.passwordError = page.locator('input[name="password"] + span + span[class="validation ng-star-inserted"]');
        this.selectRoleDropdown = page.locator('[class*="mat-mdc-dialog-content"] [data-cy="selectDropdown"] [class="cui-select-input"]');
        this.selectRoleDrpdwnOpen = page.locator('div[data-cy="dropdownContent"]');
        this.selectRoleDropdownOptions = page.locator('div[data-cy="dropdownContent"] span ');
        this.selectRoleError = page.locator('crx-sign-up-industry-role span[class="ng-star-inserted"]');
        this.phoneNumber = page.locator('div[id="signupModal"] input[name="phone"]');
        this.phoneNumberError = page.locator('input[name="phone"] + span[class="validation ng-star-inserted"]');
        this.signUpButton = page.locator('div[id="signupModal"] button[data-cy="button-signup"]');
        this.cancelButton = page.locator('div[id="signupModal"] button[data-cy="button-cancel"]');

        //Can be moved to a different file
        this.welcomeModal = page.locator('div[id*="mat-mdc-dialog-title"]');
        this.welcomeCloseButton = page.locator('[class*="cui-modal-close"]');
    };

    async selectRoleOption(option) {
        await this.selectRoleDropdown.click();
        await this.selectRoleDrpdwnOpen.waitFor({ state: 'visible' });
        await this.page.locator('div[data-cy="dropdownContent"] span', { hasText: option }).click({ force: true });
    }
};