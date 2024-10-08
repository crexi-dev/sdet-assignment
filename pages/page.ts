import { Locator, Page } from "playwright";

/**
 * Provides basic interface for page element refinement.
 */
export interface IPageElementOptions {
    filter?: {
        has?: Locator;
        hasNot?: Locator;
        hasText?: string | RegExp;
        hasNotText?: string | RegExp;
    };
    onlyVisible?: boolean;
    index?: "first" | "last" | number;
}

/**
 * Base class for Page element to provide a consistent interface for all page elements.
 */
abstract class PageElement {
    constructor(
        protected page: Page,
        protected locator: string | Locator,
        private options?: IPageElementOptions
    ) {}

    /**
     * This is used to generate the locator string specific to the type of element.
     */
    protected constructLocator: () => string;

    /**
     * Resolves an element on the page when called.
     * @returns Locator
     */
    get() {
        let loc: Locator;
        if (typeof this.locator === "string") {
            const locStr = this.constructLocator();
            loc = this.page.locator(locStr, this.options?.filter);
        } else {
            loc = this.locator;
        }
        if (!this.options) {
            return loc;
        }
        if (this.options.onlyVisible) {
            console.log("hello");
            return loc.locator("visible=true");
        }
        if (!this.options.index) {
            return loc;
        }
        if (this.options.index === "first") {
            return loc.first();
        } else if (this.options.index === "last") {
            return loc.last();
        }
        return loc.nth(this.options.index);
    }
}

/**
 * Retrieve element resolved using XPath.
 */
export class ByXpathElement extends PageElement {
    constructor(page: Page, locator: string, options?: IPageElementOptions) {
        super(page, locator, options);
    }
    protected constructLocator = () => `xpath=${this.locator}`;
}

/**
 * Retrieve element resolved using CSS selectors.
 */
export class ByCssElement extends PageElement {
    constructor(page: Page, locator: string, options?: IPageElementOptions) {
        super(page, locator, options);
    }
    protected constructLocator = () => `css=${this.locator}`;
}

/**
 * Retrieve element resolved using element's title attribute.
 */
export class ByTitleElement extends PageElement {
    constructor(page: Page, locator: string, options?: IPageElementOptions) {
        super(page, locator, options);
    }
    protected constructLocator = () => `[title="${this.locator}"]`;
}

/**
 * Retrieve element resolved using the formcontrolname attribute.
 */
export class ByFormControlName extends PageElement {
    constructor(page: Page, locator: string, options?: IPageElementOptions) {
        super(page, locator, options);
    }
    protected constructLocator = () => `[formcontrolname="${this.locator}"]`;
}

/**
 * Retrieve element resolved using the data-cy attribute.
 */
export class ByDataCyElement extends PageElement {
    constructor(page: Page, locator: string, options?: IPageElementOptions) {
        super(page, locator, options);
    }
    protected constructLocator = () => `[data-cy="${this.locator}"]`;
}

/**
 * Retrieve element resolved using the crxanalyticsevent attribute.
 */
export class ByCrxAnalyticsEvent extends PageElement {
    constructor(page: Page, locator: string, options?: IPageElementOptions) {
        super(page, locator, options);
    }
    protected constructLocator: () => string = () => `[crxanalyticsevent="${this.locator}"]`;
}

/**
 * Retrieve element resolved using the element's name attribute.
 */
export class ByName extends PageElement {
    constructor(page: Page, locator: string, options?: IPageElementOptions) {
        super(page, locator, options);
    }
    protected constructLocator: () => string = () => `[name="${this.locator}"]`;
}

/**
 * Retrieve element resolved using the element's title attribute.
 */
export class ByTitle extends PageElement {
    constructor(page: Page, locator: string, options?: IPageElementOptions) {
        super(page, locator, options);
    }
    protected constructLocator: () => string = () => `[title="${this.locator}"]`;
}

/**
 * Retrieve element resolved using standard playwright Locator object.
 * This is mostly used for creating a nested element using a previously defined element.
 */
export class ByLocator extends PageElement {
    constructor(page: Page, locator: Locator, options?: IPageElementOptions) {
        super(page, locator, options);
    }
}

/** Interface that represents structure of nested element */
export interface INestedElement {
    element: PageElement;
    child?: INestedElement;
}

/** Retrieve a compound nested element. */
export class NestedElement {
    constructor(protected elements: INestedElement) {}

    get() {
        const getElement = (current: INestedElement): Locator => {
            if (current.child) {
                return current.element.get().locator(getElement(current.child));
            }
            return current.element.get();
        };
        return getElement(this.elements);
    }
}

/**
 * Base class for POMs.
 */
export abstract class BasePom {
    /**
     * Currently static, this would be changed to be resolved through a function call
     * that uses an environment variable to determine correct base url for environment
     * tests are being run against.
     */
    protected baseUrl: string = "https://www.crexi.com/";
    elements: unknown;
    actions: unknown;

    constructor(protected page: Page) {}
    navigate: () => Promise<void> | void;

    async waitForSpinner() {
        const spinner = new ByCssElement(this.page, ".cui-spinner-loading").get();
        await spinner.waitFor({ state: "attached" });
        const isSpinnerVisible = () => spinner.isVisible();
        const spinnerCount = () => spinner.count();
        let count = 0;
        while ((await isSpinnerVisible()) || (await spinnerCount()) > 0 || count < 5) {
            await this.page.waitForTimeout(500);
            count++;
        }
    }
}
