class BasePage {
    constructor(page) {
        this.page = page;
        this.loadingSpinner = page.locator('.cui-loading--page').first();
    }

    async verifyResponse(status, method, url) {
        await Promise.all([
            this.page.waitForResponse(
                (response) =>
                    response.finished() &&
                    response.url().includes(url) &&
                    response.status() === status &&
                    response.request().method() === method
            )
        ]);
    }

    async isPaneExpanded(element) {
        await element.waitFor({ status: 'visible' });
        return (await element.getAttribute('aria-expanded')) === 'true';
    }

    async openTabOnAction(action) {
        const [newTab] = await Promise.all([
            this.page.waitForEvent('popup'),
            action()
        ]);
        await newTab.waitForLoadState();
        return newTab;
    }

    async closeTabAndRefocus(tabPage) {
        await tabPage.close();
        await this.page.bringToFront();
    }
}
module.exports = { BasePage };
