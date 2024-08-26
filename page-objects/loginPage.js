exports.LoginPage = class LoginPage {
	constructor(page) {
		this.page = page;
		this.signUpLoginButton = page.locator('button[class*="signup cui-button-primary"]');
		this.signUpLoginModal = page.locator('[id="signupModal"]');
		this.SignupTab = page.locator('div[id="signupModal"] div[class="tab"]');
		this.logInTab = page.locator('[class="tab switch"]', { hasText: 'Log In' });
		this.enterEmail = page.locator('[class*="sign-in"] input[formcontrolname="email"]');
		this.emailNotCorrectError = page.locator('[class*="sign-in"] input[formcontrolname="email"] + div[class="validation server-validation ng-star-inserted"] span');
		this.emailError = page.locator('[class*="sign-in"] input[formcontrolname="email"] + span[class="validation ng-star-inserted"]');
		this.enterPassword = page.locator('[class*="sign-in"] input[formcontrolname="password"]');
		this.errorMessagePassword = page.locator('[class*="sign-in"] input[formcontrolname="password"] + span[class="validation ng-star-inserted"]');
		this.loginButton = page.locator('[class*="sign-in"] [data-cy="button-login"]');
		this.cancelButton = page.locator('[class*="sign-in"] [data-cy="button-cancel"]');
		this.forgotPasswordLink = page.locator('[class*="sign-in"] [class="cui-link-blue"]', { hasText: ' Forgot password? ' });
		this.welcomePageheader = page.locator('div[builder-model="homepage-h-1"] span[class*="builder-text"] p');
	};
};