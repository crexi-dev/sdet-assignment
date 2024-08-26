const { test, expect } = require('./../fixtures/API');

test.describe('@smoke @loginPage Login Page validations', async () => {
    test('@qalog001 Validate Login Page Errors', async ({ page, loginPage }) => {
        //Navigate to Crexi
        await page.goto('/');

        //Click Sign up/Log In button
        await Promise.all([
            loginPage.signUpLoginButton.click(),
            expect(loginPage.SignupTab).toHaveText('Sign Up'),
            loginPage.logInTab.click(),
        ]);

        //Check the required field attributes
        await Promise.all([
            expect(loginPage.enterEmail).toHaveAttribute('required'),
            expect(loginPage.enterPassword).toHaveAttribute('required'),
        ]);

        //Error validation for Email and Password field
        await loginPage.loginButton.click();
        await expect(loginPage.emailError).toHaveText(' Please enter your email address ');
        await expect(loginPage.errorMessagePassword).toHaveText('Please enter password');

        await loginPage.enterEmail.fill('abc');
        await loginPage.enterPassword.fill('12345abcdef');
        await loginPage.loginButton.click();
        await expect(loginPage.emailError).toHaveText(' Please enter correct email address ');

        await loginPage.enterEmail.fill('pqr@gmail.com');
        await loginPage.loginButton.click();
        await expect(loginPage.emailNotCorrectError).toHaveText('The email/username or password is incorrect.');
    });

    test('@qalog002 Validate Login is successful', async ({ page, loginPage }) => {
        //Navigate to Crexi
        await page.goto('/');

        //Click Sign up/Log In button
        await Promise.all([
            loginPage.signUpLoginButton.click(),
            expect(loginPage.SignupTab).toHaveText('Sign Up'),
            loginPage.logInTab.click(),
        ]);

        //Enter Email and Password and successful login
        await loginPage.enterEmail.fill('crexilogin@gmail.com');
        await loginPage.enterPassword.fill('123456Abcdefgh');
        await loginPage.loginButton.click();

        await Promise.all([
            page.waitForResponse(
                response => response.url().includes('/account')
                    && response.finished()
                    && response.status() === 200),
            expect(loginPage.welcomePageheader).toHaveText('Your Next Deal Starts Here.')
        ]);
    });
});
