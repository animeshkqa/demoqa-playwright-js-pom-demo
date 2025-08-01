import { BasePagePO } from "../basePagePO.js";

export class RadioButtonPO extends BasePagePO {
  constructor(page, data) {
    super(page);
    this.data = data;

    this.successMsg = page.locator(`//span[@class='text-success']`);
    this.yesRadioButton = page
      .locator(`//label[contains(@class, 'custom-control-label')]`)
      .first();
    this.noRadioButton = page
      .locator(`//label[contains(@class, 'custom-control-label')]`)
      .nth(2);
  }

  async radioButtonClick() {
    if (!(await this.yesRadioButton.isDisabled())) {
      await this.waitAndClick(this.yesRadioButton);
    }

    return (
      (await this.getText(this.yesRadioButton)) ===
        (await this.getText(this.successMsg)) &&
      (await this.noRadioButton.isDisabled())
    );
  }
}
