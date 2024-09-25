const { BasePage } = require('./base-page');

class PropertyPage extends BasePage {
  constructor(page) {
    super(page);
    this.seniorLivingText = page.locator('font:has-text("Senior Living")');
    this.propertyDetailsContainer = page.locator('[data-cy="details"]');
  }

  async getPropertyDetailItems(detailItems) {
    const details = [];
    for (let detailIndex = 0; detailIndex < detailItems.length; detailIndex++) {
        const nameElement = await detailItems[detailIndex].$('span.detail-name');
        const valueElement = await detailItems[detailIndex].$('span.detail-value');
        
        // Collect name and value if they exist
        if (nameElement && valueElement) {
            const nameText = await nameElement.textContent();
            const valueText = await valueElement.textContent();
            
            details.push({
                label: nameText ? nameText.trim() : null,
                value: valueText ? valueText.trim() : null
            });
        }
    }
    return details;
}
}
module.exports = { PropertyPage };