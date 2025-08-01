import { BasePagePO } from "./basePagePO.js";

export class HomePagePO extends BasePagePO {
  constructor(page) {
    super(page);
    this.elementsPageLink = page.locator(`path`).first();
    this.alertsFramesWindowsPageLink = page.getByText(
      `Alerts, Frame & Windows`,
    );
    this.widgetsPageLink = page.getByText(`Widgets`);
    this.interactionsPageLink = page.getByText(`Interactions`);
  }

  async navigateToElements() {
    await this.waitAndClick(this.elementsPageLink);
  }

  async navigateToAlertsFramesWindows() {
    await this.waitAndClick(this.alertsFramesWindowsPageLink);
  }

  async navigateToWidgets() {
    await this.waitAndClick(this.widgetsPageLink);
  }

  async navigateToInteractions() {
    await this.waitAndClick(this.interactionsPageLink);
  }
}
