import { Browser, BrowserContext, Page } from "playwright";

export class TestContext {
    public browserContext: BrowserContext;
    public page: Page;

    constructor(private browser: Browser) {}
    async initNewContext() {
        this.browserContext = await this.browser.newContext();
    }

    async initNewPage() {
        this.page = await this.browserContext.newPage();
    }

    async dispose() {
        await this.browserContext.close();
    }
}
