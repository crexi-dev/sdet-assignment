import { type Locator, type Page } from '@playwright/test';

export class PropertyPage {
  readonly page: Page;
  readonly address: Locator;

  constructor(page: Page) {
    this.page = page;
  }
}
