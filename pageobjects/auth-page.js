const { BasePage } = require('./base-page');

class AuthPage extends BasePage {
    constructor(page) {
        super(page);
        this.signUpLoginBtn = page.locator('span.mdc-button__label:has-text("Sign Up or Log In")');
        this.firstNameFld = page.locator('input[name="firstName"]');
        this.lastNameFld = page.locator('input[name="lastName"]');
        this.phoneFld = page.locator('input[name="phone"]');
        this.roleDD = page.locator('cui-select[formcontrolname="role"]');
        this.stateDD = page.locator('[data-cy="selectDropdown"]')
        this.logInTab = page.locator('div[crxanalyticsevent="Sign Up - Sign In link"]:has-text("Log In")');
        this.emailFld = page.locator('input[formcontrolname="email"]');
        this.passFld = page.locator('input[formcontrolname="password"]');
        this.logInBtn = page.locator('button[data-cy="button-login"]');
        this.signUpBtn = page.locator('button[data-cy="button-signup"]');
        this.cancelBtn = page.locator('button[data-cy="button-cancel"]');
        this.forgotPassHdr = page.locator('h3.cui-modal-title:has-text("Forgot your password?")');
        this.forgotPass = page.locator('a.cui-link-blue:has-text("Forgot password?")');
        this.facebookBtn = page.locator('a.facebook');
        this.linkedinBtn = page.locator('a.linked-in');
        this.googleBtn = page.locator('a.google');
        this.ccimBtn = page.locator('a.ccim');
        this.resetPassBtn = page.locator('button:has-text("Reset Password")');
        this.resendEmailBtn = page.locator('button:has-text("Resend Email")');
        this.passLinkSentHdr = page.locator('h3.cui-modal-title:has-text("Password Link Sent")');
        this.forgotPassReturn = page.locator('a.cui-link-blue:has-text("Log In")');
        this.homePageElement = page.locator('[data-cy="tab"]:has-text("Sale")');
        this.licenseNumberFld = this.page.locator('input[formcontrolname="licenseNumber"]');
        this.activeListingsDD = this.page.locator('cui-select[formcontrolname="numberOfActiveListings"]');

        //error messages
        this.firstNameMaxErr = page.locator('span.validation:has-text("First name should be less than 64 characters")');
        this.lastNameMaxErr = page.locator('span.validation:has-text("Last name should be less than 64 characters")');
        this.emailMaxErr = page.locator('span.validation:has-text("This email address should be less than 64 characters")');
        this.wrongEmailOrPassErr = page.locator('span.mobile\\:cui-hidden:has-text("The email/username or password is incorrect.")');
        this.logInEmailFormatErr = page.locator('span.validation:has-text("Please enter correct email address")');
        this.phoneNumMaxErr = page.locator('span.validation:has-text("Phone should be less than 16 characters")');
        this.phoneNumFormatErr = page.locator('span.validation:has-text("Please enter a valid phone number")');
        this.signUpEmailFormatErr = page.locator('span.validation:has-text("The Email field is not a valid e-mail address.")');
        this.accountCreationErr = page.locator('span:has-text("Account creation unsuccessful. If you find this message is unexpected please contact support.")')
        this.signUpPassFldErr = page.locator('span.validation:has-text("Please enter a password")');
        this.firstNameFldErr = page.locator('span.validation:has-text("Please enter your first name")');
        this.passMinFldErr = page.locator('span.validation:has-text("Minimum 12 characters")');
        this.roleDDErr = page.locator('span:has-text("Please select your industry role")');
        this.lastNameFldErr = page.locator('span.validation:has-text("Please enter your last name")');
        this.emailFldErr = page.locator('span.validation:has-text("Please enter your email address")');
        this.passFldErr = page.locator('span.validation:has-text("Please enter password")');
        this.activeListingsErr = page.locator('span:has-text("Please select a number of Active Listings")');
        this.licenseStateErr = page.locator('cui-form-error:has-text("Please enter state")');
        this.licenseNumErr = page.locator('cui-form-error:has-text("Please enter number")');
        this.licenseNumMinFldErr = page.locator('cui-form-error:has-text("Minimum 4 characters")');

        //google
        this.googleEmailFld = page.locator('#identifierId');
        this.googleFirstNextBtn = page.locator('//*[@id="identifierNext"]/div/button/span');
        this.googleSecondNextBtn = page.locator('//*[@id="passwordNext"]/div/button/span');
        this.googlePassFld = page.locator('input[name="Passwd"]');
    }

    async logInFormSubmit({ email, password } = {}) {
        await this.signUpLoginBtn.click();
        await this.logInTab.click();
        await this.firstNameFld.waitFor({ state: 'hidden' });
        await this.logInBtn.waitFor({ state: 'visible' });
        if (email) {
            await this.emailFld.fill(email);
        }
        if (password) {
            await this.passFld.fill(password);
        }
        await this.logInBtn.click();
    }

    async logInWithGoogle(email, password) {
        await this.signUpLoginBtn.click();
        await this.logInTab.click();
        await this.firstNameFld.waitFor({ state: 'hidden' });
        await this.googleBtn.click();
        await this.googleEmailFld.waitFor({ state: 'visible' });
        await this.googleEmailFld.fill(email);
        await this.googleFirstNextBtn.click();
        await this.googlePassFld.waitFor({ state: 'visible' });
        await this.googlePassFld.fill(password);
        await this.googleSecondNextBtn.click();
        await this.homePageElement.waitFor({ state: 'visible' });
    }

    async signUpFormSubmit({ firstName, lastName, email, password, role, phoneNumber, licenseState, licenseNumber, activeListings } = {}) {
        await this.signUpLoginBtn.click();
        await this.firstNameFld.waitFor({ state: 'visible' });

        if (firstName) {
            await this.firstNameFld.fill(firstName);
        }
        if (lastName) {
            await this.lastNameFld.fill(lastName);
        }
        if (email) {
            await this.emailFld.fill(email);
        }
        if (password) {
            await this.passFld.fill(password);
        }
        if (role) {
            await this.roleDD.click();
            await this.page.locator(`span[data-cy="dropdownItem-${role}"]`).waitFor({ state: 'visible' });
            await this.page.locator(`span[data-cy="dropdownItem-${role}"]`).click();
        }
        if (phoneNumber) {
            await this.phoneFld.fill(phoneNumber);
        }
        if (licenseState && role == 'Listing Broker/Agent') {
            await this.stateDD.click();
            await this.page.locator(`span[data-cy="dropdownItem-${state}"]`).waitFor({ state: 'visible' });
            await this.page.locator(`span[data-cy="dropdownItem-${state}"]`).click();
        }
        if (licenseNumber && role == 'Listing Broker/Agent') {
            await this.licenseNumberFld.fill(licenseNumber);
        }
        if (activeListings && role == 'Landlord Broker/Agent') {
            await this.activeListingsDD;
            await this.page.locator(`span[data-cy="dropdownItem-${activeListings}"]`).waitFor({ state: 'visible' });
            await this.page.locator(`span[data-cy="dropdownItem-${activeListings}"]`).click();
        }
        await this.signUpBtn.click();
    }

    async getRandomRole() {
        const roles = [
            //'Listing Broker/Agent', License State/Number required for this test case, will test separately 
            'Buyer Broker/Agent',
            'Selling/Buying Broker/Agent',
            'Transaction Coordinator',
            //'Landlord Broker/Agent', Active Listings required for this test case, will test separately
            'Tenant Rep Broker',
            'Principal',
            'Lender',
            'Assessor',
            'Appraiser',
            'Third Party Service',
            'Tenant',
            'Owner/Property Manager',
            'Other'
        ];
        const randomIndex = Math.floor(Math.random() * roles.length);
        return roles[randomIndex];
    }

    async getRandomNumberOfActiveListings() {
        const listings = [
            '0',
            '1-3',
            '4-10',
            '11-20',
            '21+'
        ];
        const randomIndex = Math.floor(Math.random() * listings.length);
        return listings[randomIndex];
    }
}
module.exports = { AuthPage };