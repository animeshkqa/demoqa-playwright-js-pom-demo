import { BasePagePO } from "../basePagePO.js";
import path from "path";
import fs from "fs/promises";

export class UploadDownloadPO extends BasePagePO {
  constructor(page, data) {
    super(page);
    this.data = data;

    this.chooseFileBtn = page.locator(
      `//input[contains(@class, 'form-control-file')]`,
    );
    this.uploadMsg = page.locator(`//p[@id='uploadedFilePath']`);
    this.downloadBtn = page
      .locator(`//a[contains(@class, 'btn')]`)
      .getByText(`Download`);
  }

  async uploadFile() {
    await this.chooseFileBtn.setInputFiles(this.data.udFIlePath);
    const uploadedFileName = path.basename(this.data.udFIlePath);
    const uploadMsgFileName = (await this.uploadMsg.textContent())
      .split("\\")
      .pop();
    return uploadedFileName === uploadMsgFileName;
  }

  async downloadFile() {
    const downloadPromise = this.page.waitForEvent("download");

    await this.waitAndClick(this.downloadBtn);
    const download = await downloadPromise;
    await download.saveAs(this.data.udDownloadFIlePath);

    try {
      await fs.access(this.data.udDownloadFIlePath);
      await fs.unlink(this.data.udDownloadFIlePath);
      return true;
    } catch (err) {
      console.warn(err.message);
      return false;
    }
  }
}
