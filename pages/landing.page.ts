import { Page } from "playwright";
import { BasePom, ByCssElement, ByDataCyElement, ByFormControlName, ByName, ByTitle, ByXpathElement, NestedElement } from "./page";
import { IUser } from "../data/users";

export class LandingPage extends BasePom {
    navigate = async () => {
        await this.page.goto(this.baseUrl, {
            waitUntil: "domcontentloaded",
        });
        await this.elements.signUpOrLoginButton().get().waitFor({ state: "visible" })
    };
    elements = {
        signUpOrLoginButton: () => new ByXpathElement(this.page, '//button[./span[normalize-space(.)="Sign Up or Log In"]]'),
        signUpOrLoginModal: {
            tab: (tabName: "Sign Up" | "Log In") => new ByXpathElement(this.page, `//div[contains(@class,"tab") and .="${tabName}"]`),
            login: {
                emailInput: () => new ByFormControlName(this.page, 'email'),
                passwordInput: () => new ByFormControlName(this.page, 'password'),
                logInButton: () => new ByXpathElement(this.page, '//button[./span[normalize-space(.)="Log In"]]'),
                validationMessage: () => new NestedElement({
                    element: this.elements.signUpOrLoginModal.login.emailInput(),
                    child: {
                        element: new ByXpathElement(this.page, "//following-sibling::div/span")
                    }
                })
            },
            signUp: {
                firstNameBox: () => new ByFormControlName(this.page, "firstName"),
                lastNameBox: () => new ByFormControlName(this.page, "lastName"),
                emailBox: () => new ByFormControlName(this.page, "email"),
                passwordBox: () => new ByFormControlName(this.page, "password"),
                roleDropdown: () => new ByXpathElement(this.page, "//cui-form-label", { filter: { hasText: "Industry Role"}}),
                roleOption: (optionName: string) => new NestedElement({
                    element: new ByDataCyElement(this.page, "dropdownContent"),
                    child: {
                        element: new ByDataCyElement(this.page, "dropdownOption", { filter: { hasText: optionName}})
                    }
                }),
                signUpButton: () => new ByDataCyElement(this.page, "button-signup"),
            }
        },
        loggedInActions: {
            container: () => new ByCssElement(this.page, "div.logged-in-actions"),
            dashboardLink: () => new NestedElement({
                element: this.elements.loggedInActions.container(),
                child: {
                    element: new ByXpathElement(this.page, '//crx-my-crexi-nav/a[span[.="Dashboard"]]')
                } 
            })

        }, 
        searchBox: () => new   ByName(this.page, "search_term_string", { index: "first" }),
        searchButton: () => new ByTitle(this.page, "Search", { index: "first" }),
        filter: {
            dropdownButton: () => new ByCssElement(this.page, "crx-dropdown-button", { index: "first" }),
            dropdown: () => new ByDataCyElement(this.page, "selectDropdown", { index: "first" }),
            checkbox: (optionName: string) => new ByXpathElement(this.page, "//crx-multilevel-checkboxes//cui-checkbox", { filter: { hasText: optionName}}),
        },
        notification: (message: string) => new ByDataCyElement(this.page, "notification", { filter: { hasText: message }})
    }
    actions = {
        waitForTabToBeSelected: async (tabName: "Sign Up" | "Log In") => {
            await this.elements.signUpOrLoginModal.tab(tabName).get()
                .and(this.page.locator(":not(.switch)"))
                .waitFor({ state: "visible" });
        },
        enterCredentials: async (user: IUser) => {
            await this.elements.signUpOrLoginButton().get().click();
            const modal = this.elements.signUpOrLoginModal;
            const loginTab = modal.tab("Log In").get();
            await loginTab.click();
            await this.actions.waitForTabToBeSelected("Log In");
            const emailInput = modal.login.emailInput().get();
            const passwordInput = modal.login.passwordInput().get();
            await emailInput.waitFor({ state: "visible" });
            await passwordInput.waitFor({ state: "visible" });
            await emailInput.fill(user.email);
            await passwordInput.fill(user.password);
        },
        login: async (user: IUser) => {
            await this.actions.enterCredentials(user);
            const loginButton = this.elements.signUpOrLoginModal.login.logInButton().get();
            await loginButton.click();
            await loginButton.waitFor({ state: "hidden" })
            await this.elements.loggedInActions.container().get().waitFor({ state: "visible" });
        },
        signUp: async (user: IUser) => {
            await this.elements.signUpOrLoginButton().get().click();
            const modal = this.elements.signUpOrLoginModal.signUp;
            await this.actions.waitForTabToBeSelected("Sign Up");
            await modal.firstNameBox().get().fill(user.firstName);
            await modal.lastNameBox().get().fill(user.lastName);
            await modal.emailBox().get().fill(user.email);
            await modal.passwordBox().get().fill(user.password);
            await modal.roleDropdown().get().click();
            await modal.roleOption(user.role).get().click();
            await modal.signUpButton().get().click();
        },
        clickOnDashboardLink: async () => {
            await this.elements.loggedInActions.dashboardLink().get().click();
            await this.page.waitForURL(`${this.baseUrl}/dashboard/my-crexi`, { waitUntil: "domcontentloaded"})
        },
        searchProperties: async (searchTerm: string) => {
            await this.elements.searchBox().get().fill(searchTerm);
            await this.elements.searchButton().get().click();
            await this.page.waitForURL(/properties\?/, { waitUntil: "domcontentloaded"});
        },
        filterOptionChecked: async (filterName: string) => {
            const checkbox = this.elements.filter.checkbox(filterName).get();
            const isChecked = (await checkbox.locator("mat-checkbox").getAttribute("class")).includes("checked");
            return isChecked;
        },
        filterSearch: async (filters: string[]) => {
            await this.elements.filter.dropdownButton().get().click();
            await this.waitForSpinner();
            await this.elements.filter.dropdown().get().waitFor({ state: "visible" });
            if (filters) {
                filters.forEach(async (f) => {
                    await this.elements.filter.checkbox(f).get().click();
                })
            }
        },
    }
}
