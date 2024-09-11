const HomePage = require("../pages/home-page");

/** Form class with functions to populate a form with fields. Currently is used for Signup/Login test */

class Form extends HomePage {
  /**Locators */
  getSelectOption(optionName) {
    return this.page.getByRole("option").filter({ hasText: optionName });
  }

  /**
   * Populates a form with the given fields.
   *
   * @param {Object[]} fields An array of field objects, each with the following properties:
   * @property {string} type The type of field, such as `text` or `select`.
   * @property {string} label The label of the field.
   * @property {string|number|boolean} value The value of the field.
   * @returns {Promise<void>} A promise that resolves when the form has been populated.
   * @throws {Error} If an error occurs while populating the form.
   */
  async populateForm(fields) {
    let field;
    try {
      for (field of fields) {
        await this.setField(field.type, field.label, field.value);
      }
    } catch (error) {
      throw new Error(`Unable to set field: ${error.message}, ${error.stack}`);
    }
  }

  /**
   * Sets the value of a field.
   *
   * @param {string} fieldType The type of field (text, select, dropdown, money, date, lookup, and toggle)
   * @param {string} label The label of the field.
   * @param {string} value The value to set.
   * @throws {Error} If the field type is not supported.
   */
  async setField(fieldType, label, value) {
    switch (fieldType.toLowerCase()) {
      case "text":
        await this.setTextField(label, value);
        break;
      case "select":
        await this.setSelectField(label, value);
        break;
      default:
        throw new Error(`${fieldType} is not a supported field type`);
    }
  }

  /**
   * Sets the value of a form text field.
   * @param {string} label The label of the text field.
   * @param {string} value The value to set the text field to.
   * @throws {Error} If the text field cannot be found or cannot be set.
   */
  async setTextField(label, value) {
    try {
      const field = this.page.getByLabel(label);
      await field.clear();
      await field.fill(value);
    } catch (error) {
      throw new Error(
        `Unable to set field ${label}: ${error.message}, ${error.stack}`
      );
    }
  }

  /**
   * Sets the value of a form select field.
   * @param {string} label The label of the select field.
   * @param {string} value The value to set the select field to.
   * @throws {Error} If the select field cannot be found or cannot be set.
   */
  async setSelectField(label, value) {
    try {
      const element = this.page.getByLabel(label);
      await element.click();
      await this.getSelectOption(value).click();
    } catch (error) {
      throw new Error(
        `Unable to set field ${label}: ${error.message}, ${error.stack}`
      );
    }
  }
}

module.exports = Form;
