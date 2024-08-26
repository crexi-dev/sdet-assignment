const { test, expect } = require('../fixtures/API');

const firstNameVal = 'CrexiFn';
const lastNameVal = 'LnTest';
const emailVal = 'crexisignup1@yahoo.com';
const passwordVal = '123456Abcdefgh';
const phoneNumberVal = '888-273-0423';

/* NOTE: Sign up test can be run only once
If I had access to use the API to update the email or remove the user I would:
**Choose Option1:** Use test.afterEach(); and use the API call to update email or remove the user/email from the system

**Option 2:** is what I attempted to do below - commented out code but that was not possible after 1st run 
    and I am unable to reuse the email to signup.
**/

// const modifyFirstName = Array.from({ length: 5 }, () => Math.random().toString(36).charAt(2)).join('');
// const modifyLastName = Array.from({ length: 5 }, () => Math.random().toString(36).charAt(2)).join('');
// const modifyEmailVal = Array.from({ length: 5 }, () => Math.random().toString(36).charAt(2)).join('') + '@gmail.com';


test.describe('@smoke @signUpPage Sign up Page validations', async () => {
    test('@qasignup001 Validate Sign up Cancel', async ({ page, loginPage, signUpPage }) => {
        //Navigate to Crexi
        await page.goto('/');

        //Click Sign up/Log In button
        await Promise.all([
            loginPage.signUpLoginButton.click(),
            expect(loginPage.SignupTab).toHaveText('Sign Up')
        ]);

        //Check the required field attributes
        await Promise.all([
            expect(signUpPage.firstName).toHaveAttribute('required'),
            expect(signUpPage.lastName).toHaveAttribute('required'),
            expect(signUpPage.email).toHaveAttribute('required'),
            expect(signUpPage.password).toHaveAttribute('required'),
        ]);

        //Enter and select fields and click Cancel
        await signUpPage.firstName.fill(firstNameVal);
        await signUpPage.lastName.fill(lastNameVal);
        await signUpPage.email.fill(emailVal);
        await signUpPage.password.fill(passwordVal);
        await signUpPage.selectRoleOption('Buyer Broker/Agent');
        await signUpPage.phoneNumber.fill(phoneNumberVal);
        await signUpPage.cancelButton.click();
    });

    test.skip('@qasignup002 Validate Sign up is Successful', async ({ page, loginPage, signUpPage, /*profilePage*/ }) => {
        //Navigate to Crexi
        await page.goto('/');
        
        //Click Sign up/Log In button
        await Promise.all([
            loginPage.signUpLoginButton.click(),
            expect(loginPage.SignupTab).toHaveText('Sign Up')
        ]);

        //Enter and select fields and click Sign Up
        await signUpPage.firstName.fill(firstNameVal);
        await signUpPage.lastName.fill(lastNameVal);
        await signUpPage.email.fill(emailVal);
        await signUpPage.password.fill(passwordVal);
        await signUpPage.selectRoleOption('Buyer Broker/Agent');
        await signUpPage.phoneNumber.click();
        await signUpPage.signUpButton.click({ delay: 5000 });

        await Promise.all([
            page.waitForResponse(
                response => response.url().includes('/account')
                    && response.finished()
                    && response.status() === 201),
        ]);

        // //Navigate to Profile page
        // await page.goto('/dashboard/profile');

        // //Edit Name and DOB and save
        // await profilePage.editPersonalData.click();
        // await expect(profilePage.editInfoModal).toHaveText('Edit Info');
        // await profilePage.firstName.fill(modifyFirstName);
        // await profilePage.lastName.fill(modifyLastName);
        // await profilePage.selectDateOfBirth('9/9/1990', 'September 9, 1990');
        // await Promise.all([
        //     page.waitForResponse(
        //         response => response.url().includes('/account')
        //             && response.finished()
        //             && response.status() === 200
        //             && response.request().method() === 'PATCH'),
        // ]);

        // //Edit Email address and save
        // await profilePage.editEmailAddress.click();
        // await expect(profilePage.changeEmailModalHeader).toHaveText('Change Email');
        // await profilePage.newEmail.fill(modifyEmailVal);
        // await profilePage.confirmEmail.fill(modifyEmailVal);
        // await profilePage.currentPassword.fill(passwordVal);
        // await profilePage.saveEmailButton.click({delay: 2000});
        // await Promise.all([
        //     page.waitForResponse(
        //         response => response.url().includes('/account/email')
        //             && response.finished()
        //             && response.status() === 201
        //             && response.request().method() === 'PUT'),
        // ]);

    });
});