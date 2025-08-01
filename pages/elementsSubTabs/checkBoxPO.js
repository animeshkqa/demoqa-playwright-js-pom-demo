import { BasePagePO } from "../basePagePO.js";

export class CheckBoxPO extends BasePagePO {
  constructor(page, data) {
    super(page);
    this.data = data;

    this.successMsg = page.locator(`//span[@class='text-success']`);
    this.cbHomeListDownBtn = page.locator(
      `//span[text()='Home']/parent::label/preceding-sibling::button`,
    );
    this.cbDesktopListDownBtn = page
      .locator(`//button[contains(@class, 'rct-collapse-btn')]`)
      .nth(1);
    this.cbHomeCheckbox = page.locator(`//span[@class='rct-checkbox']`).first();
    this.cbDesktopCheckbox = page
      .locator(`//span[@class='rct-checkbox']`)
      .nth(1);
    this.cbDesktopTitle = page.locator(`//span[@class='rct-title']`).nth(1);
    this.cbListInDesktop = page.locator(`//ol`).nth(2).locator(`//li`);
  }

  async checkBoxSelection() {
    await this.waitAndClick(this.cbHomeListDownBtn);
    await this.waitAndClick(this.cbDesktopListDownBtn);
    await this.waitAndClick(this.cbDesktopCheckbox);

    const expected = [(await this.cbDesktopTitle.textContent()).toLowerCase()];
    for (const li of await this.cbListInDesktop.all()) {
      expected.push((await li.textContent()).toLowerCase());
    }

    const actual = [];
    for (const msg of await this.successMsg.all()) {
      actual.push((await msg.textContent()).toLowerCase());
    }

    return expected.join(" ") === actual.join(" ");
  }

  async checkBoxUnselect() {
    await this.waitAndDblClick(this.cbHomeCheckbox);
    return (await this.successMsg.count()) === 0;
  }
}
