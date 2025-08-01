import { BasePagePO } from "../basePagePO.js";

export class AlertsPO extends BasePagePO {
  constructor(page, data) {
    super(page);
    this.data = data;

    this.alertClickMeBtn = page.getByText(`Click me`).first();
    this.confirmClickMeBtn = page.getByText(`Click me`).nth(2);
    this.promptClickMeBtn = page.getByText(`Click me`).nth(3);
    this.confirmTextSuccessMsg = page
      .locator(`//span[contains(@class, 'text-success')]`)
      .getByText(`You selected `);
    this.promotTextSuccessMsg = page
      .locator(`//span[contains(@class, 'text-success')]`)
      .getByText(`You entered `);
  }

  async clickAndHandleAlert() {
    let dialogType, dialogMsg;
    this.page.on("dialog", async (dialog) => {
      dialogType = dialog.type();
      dialogMsg = dialog.message();
      await dialog.accept();
    });
    await this.waitAndClick(this.alertClickMeBtn);

    return [dialogType === this.data.alType, dialogMsg === this.data.alMsg];
  }

  async clickAndAcceptConfirm() {
    this.page.on("dialog", async (dialog) => {
      await dialog.accept();
    });
    await this.waitAndClick(this.confirmClickMeBtn);
    return (
      (await this.confirmTextSuccessMsg.textContent()) === this.data.cnAcceptMsg
    );
  }

  async clickAndRejectConfirm() {
    this.page.on("dialog", async (dialog) => {
      await dialog.dismiss();
    });
    await this.waitAndClick(this.confirmClickMeBtn);
    return (
      (await this.confirmTextSuccessMsg.textContent()) === this.data.cnRejectMsg
    );
  }

  async clickAndEnterPrompt() {
    this.page.on("dialog", async (dialog) => {
      await dialog.accept(this.data.ptMsg);
    });
    await this.waitAndClick(this.promptClickMeBtn);
    return (
      (await this.promotTextSuccessMsg.textContent()) === this.data.ptSucMsg
    );
  }
}
