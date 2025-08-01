import { BasePagePO } from "../basePagePO.js";
import { AddUpdatePersonModalPagePO } from "../addUpdatePersonModalPagePO.js";
import { countWebTableRow } from "../../utils/webTables.js";

export class WebTablesPO extends BasePagePO {
  constructor(page, data) {
    super(page);
    this.data = data;

    this.wtRowLocator = page
      .locator(`//div[contains(@class, 'rt-tbody')]`)
      .getByRole(`rowgroup`);
    this.wtAddBtn = page
      .locator(`//button[contains(@class, 'btn')]`)
      .getByText(`Add`);
    this.page = page;
  }

  async addUpdatePersonModal() {
    await this.waitAndClick(this.wtAddBtn);
    return new AddUpdatePersonModalPagePO(this.page);
  }

  async addPersonToWebTable() {
    const before = await countWebTableRow(this.wtRowLocator);
    const modal = await this.addUpdatePersonModal();

    await modal.fillRegFormAndSubmit(
      this.data.wtFirstName,
      this.data.wtLastName,
      this.data.wtEmail.text,
      this.data.wtAge.toString(),
      this.data.wtSalary.toString(),
      this.data.wtDepartment,
    );

    await this.waitForNetworkIdle();
    const after = await countWebTableRow(this.wtRowLocator);
    return before + 1 === after;
  }

  async removePersonFromWebTable() {
    const before = await countWebTableRow(this.wtRowLocator);

    for (let i = 0; i < before; i++) {
      const row = this.wtRowLocator.nth(i);
      const emailCell = row.locator(".rt-td").nth(3);
      const email = await emailCell.textContent();

      if (
        (email || "").trim().toLowerCase() ===
        this.data.wtEmail.text.trim().toLowerCase()
      ) {
        const deleteBtn = row.locator("span[title='Delete']");
        await deleteBtn.click();
        break;
      }
    }

    await this.waitForNetworkIdle();
    const after = await countWebTableRow(this.wtRowLocator);
    return before - 1 === after;
  }
}
