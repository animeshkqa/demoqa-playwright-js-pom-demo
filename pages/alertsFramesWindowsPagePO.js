import path from "path";
import dotenv from "dotenv";
dotenv.config();

import { BasePagePO } from "./basePagePO.js";

import { readKeyValueSheet } from "../utils/readExcel.js";
import { AlertsPO } from "./alertsFramesWindowsSubTabs/alertsPO.js";
import { FramesPO } from "./alertsFramesWindowsSubTabs/framesPO.js";

export class AlertsFramesWindowsPagePO extends BasePagePO {
  constructor(page) {
    super(page);
    this.dataFilePath = path.resolve(process.env.DATA_FILE);
    this.alertsFramesData = {};
  }

  async init() {
    const sheetName = "alertsFramesWindows";
    this.alertsFramesData = await readKeyValueSheet(
      this.dataFilePath,
      sheetName,
    );

    this.alertsTab = new AlertsPO(this.page, this.alertsFramesData);
    this.framesTab = new FramesPO(this.page, this.alertsFramesData);
  }

  async clickAlertsLink() {
    await this.waitAndClick(this.page.getByText(`Alerts`).nth(1));
  }

  async clickFramesLink() {
    await this.waitAndClick(this.page.getByText(`Nested Frames`));
  }
}
