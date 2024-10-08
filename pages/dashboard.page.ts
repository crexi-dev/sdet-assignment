import { BasePom, ByDataCyElement, ByXpathElement } from "./page";

export class Dashboard extends BasePom {
    elements = {
        sidebar: {
            container: () => new ByDataCyElement(this.page, "sidebar"),
            panel: (name: "Broker Tools" | "Search Tools" | "Account") =>
                new ByXpathElement(this.page, `//mat-expansion-panel-header[./span[normalize-space(.)="${name}"]]`),
            accountPanel: {
                accountSettingsLink: () => new ByXpathElement(this.page, '//a[@href="/dashboard/profile"]'),
            },
        },
    };
    actions = {
        goToAccountSettings: async () => {
            await this.elements.sidebar.container().get().waitFor({ state: "visible" });
            await this.elements.sidebar.panel("Account").get().click();
            const accountSettingsLink = this.elements.sidebar.accountPanel.accountSettingsLink().get();
            await accountSettingsLink.waitFor({ state: "visible" });
            await accountSettingsLink.click();
            await this.page.waitForURL(`${this.baseUrl}/dashboard/profile`, { waitUntil: "domcontentloaded" });
        },
    };
}
