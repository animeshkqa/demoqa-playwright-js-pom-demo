import { BasePagePO } from "../basePagePO.js";

export class TextBoxPO extends BasePagePO {
  constructor(page, data) {
    super(page);
    this.data = data;

    this.tbFullNameBox = page.getByPlaceholder(`Full Name`);
    this.tbEmailbox = page.getByPlaceholder(`name@example.com`);
    this.tbCurAddBox = page.getByPlaceholder(`Current Address`);
    this.tbPermAddBox = page.locator(`//textarea[@id='permanentAddress']`);
    this.tbSubmitBtn = page.getByText(`Submit`);
    this.tbSubmitOp = page.locator(`//div[contains(@class, 'border')]/p`);
  }

  async fillTextBoxesAndSubmit() {
    await this.fillAndWait(this.tbFullNameBox, this.data.tbFullName);
    await this.fillAndWait(this.tbEmailbox, this.data.tbEmail.text);
    await this.fillAndWait(this.tbCurAddBox, this.data.tbCurrentAddress);
    await this.fillAndWait(this.tbPermAddBox, this.data.tbPermanentAddress);
    await this.waitAndClick(this.tbSubmitBtn);

    const output = await this.tbSubmitOp.all();
    const outputArr = [];
    for (const line of output) {
      outputArr.push((await line.textContent()).trimEnd());
    }
    return outputArr;
  }

  async getExpectedOutputArray() {
    return [
      "Name:" + this.data.tbFullName,
      "Email:" + this.data.tbEmail.text,
      "Current Address :" + this.data.tbCurrentAddress,
      "Permanent Address :" + this.data.tbPermanentAddress,
    ];
  }
}
