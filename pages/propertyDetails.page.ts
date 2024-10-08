import { BasePom, ByXpathElement } from "./page";

export class PropertyDetailsPage extends BasePom {
    elements = {
        propertyTitle: () => new ByXpathElement(this.page, "//crx-sales-pdp-media-header//h1"),
        propertyAddress: () => new ByXpathElement(this.page, "//crx-pdp-addresses//h2"),
    }
}
