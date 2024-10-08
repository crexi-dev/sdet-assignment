import path = require("path");
import { BasePom, ByCrxAnalyticsEvent, ByCssElement, ByDataCyElement, ByLocator, ByTitle, ByXpathElement, NestedElement } from "./page";
import { expect } from "playwright/test";

export class ProfilePage extends BasePom {
    navigate: () => Promise<void> | void = async () => {
        await this.page.goto(`${this.baseUrl}/dashboard/profile`, {
            waitUntil: "domcontentloaded",
        });
        await this.elements.title.welcomeMessage().get().waitFor({ state: "visible" })
    };

    elements = {
        title: {
            container: () => new ByXpathElement(this.page, '//div[@class="title-container"]'),
            welcomeMessage: () => new NestedElement({
                element: this.elements.title.container(),
                child: {
                    element: new ByCssElement(this.page, "h2")
                }
            })
        },
        personalInfo: {
            editLink: () => new ByCrxAnalyticsEvent(this.page, "Profile - Edit Info"),
            modal: {
                title: () => new ByXpathElement(this.page, "//h3[text()='Edit Info']"),
                avatar: () => new NestedElement({
                    element: new ByXpathElement(this.page, "//form"),
                    child: {
                        element: new ByDataCyElement(this.page, "fileUploader-avatar"),
                    }
                }),
                avatarInput: () => new NestedElement({
                    element: new ByLocator(this.page, this.elements.personalInfo.modal.avatar().get()),
                    child: {
                        element: new ByXpathElement(this.page, "/input")
                    }
                    
                }),
                avatarImage: () => new NestedElement({
                    element: new ByLocator(this.page, this.elements.personalInfo.modal.avatar().get()),
                    child: {
                        element: new ByXpathElement(this.page, "../img")
                    }
                }),
                updateButton: () => new ByCrxAnalyticsEvent(this.page, "Profile - Edit Profile submitted"),
                closeButton: () => new ByCssElement(this.page, ".cui-modal-close")
            }
        }
    }

    actions = {
        changeProfilePicture: async (file: string) => {
            const personalInfo = this.elements.personalInfo;
            await personalInfo.editLink().get().click();
            await personalInfo.modal.title().get().waitFor({ state: "visible" })
            await personalInfo.modal.avatarInput().get().setInputFiles(file);
            await personalInfo.modal.updateButton().get().click();
            await expect(personalInfo.modal.avatarImage().get()).toBeVisible();
            await personalInfo.modal.closeButton().get().click();
            await personalInfo.modal.title().get().waitFor({ state: "hidden" });
        }
    }
}
