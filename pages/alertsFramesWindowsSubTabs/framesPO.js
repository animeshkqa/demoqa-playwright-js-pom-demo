import { BasePagePO } from "../basePagePO.js";

export class FramesPO extends BasePagePO {
  constructor(page, data) {
    super(page);
    this.data = data;
  }

  async getFrameMsgInNestedFrames() {
    const parentFrameHandle = await this.page.$(`//iframe[@id='frame1']`);
    const parentFrame = await parentFrameHandle.contentFrame();
    const parentFrameTxtActual = await parentFrame.locator(`body`).innerText();

    const childFrames = await parentFrame.childFrames();
    const childFrameTxtActual = await childFrames[0]
      .locator(`body`)
      .innerText();

    console.log("Actual: " + parentFrameTxtActual + " " + childFrameTxtActual);
    console.log(
      "Expected: " + this.data.prntFrameTxt + " " + this.data.childFrameTxt,
    );
    return (
      parentFrameTxtActual === this.data.prntFrameTxt &&
      childFrameTxtActual === this.data.childFrameTxt
    );
  }
}
