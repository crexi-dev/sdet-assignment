import { BasePom, ByDataCyElement, ByXpathElement, IPageElementOptions, NestedElement } from "./page";

export class PropertiesPage extends BasePom {
    elements = {
        header: () => new ByXpathElement(this.page, "//header/h1"),
        propertyListing: (cardOptions?: IPageElementOptions) => {
            const card = () => new ByXpathElement(this.page, "//cui-card", cardOptions);
            return {
                card,
                title: () =>
                    new NestedElement({
                        element: card(),
                        child: {
                            element: new ByDataCyElement(this.page, "propertyName"),
                        },
                    }),
                address: () =>
                    new NestedElement({
                        element: card(),
                        child: {
                            element: new ByDataCyElement(this.page, "propertyAddress"),
                        },
                    }),
            };
        },
    };
}
