import { BasePagePO } from "../basePagePO.js";

export class LinksPagePO extends BasePagePO {
  constructor(page, data) {
    super(page);
    this.data = data;

    this.homeLink = page.locator(`//a`).getByText(`Home`).first();
  }

  async clickToOpenNewTab() {
    const [newTab] = await Promise.all([
      this.page.waitForEvent("popup"),
      this.waitAndClick(this.homeLink),
    ]);

    await newTab.waitForLoadState();
    const isUrlCorrect = newTab.url() === `${this.data}/`;
    await newTab.close();

    return isUrlCorrect;
  }
}
