import path from "path";
import { pickDateYyyyDdMm } from "../utils/datePicker.js";
import dotenv from "dotenv";
dotenv.config();

import { BasePagePO } from "./basePagePO.js";
import { readKeyValueSheet } from "../utils/readExcel";

export class WidgetsPagePO extends BasePagePO {
  constructor(page) {
    super(page);
    this.dataFilePath = path.resolve(process.env.DATA_FILE);
    this.widgetsData = {};

    this.hvrBtn = page.getByText(`Hover me to see`);
    this.toolTips = page.getByRole(`tooltip`);
    this.dateInput = page.locator(`//input[@id='datePickerMonthYearInput']`);
    this.yearInput = page.locator(
      `//select[contains(@class, 'react-datepicker__year-select')]`,
    );
    this.monthInput = page.locator(
      `//select[contains(@class, 'react-datepicker__month-select')]`,
    );
  }

  async init() {
    const sheetName = "widgets";
    this.widgetsData = await readKeyValueSheet(this.dataFilePath, sheetName);
  }

  async clickToolTipsLink() {
    await this.waitAndClick(this.page.getByText(`Tool Tips`));
  }

  async checkToolTipsTxtOnHover() {
    await this.waitAndHover(this.hvrBtn);
    return (
      (await this.toolTips.textContent()) === this.widgetsData.wBtnHoverTxt
    );
  }

  async clickDatePickerLink() {
    await this.waitAndClick(this.page.getByText(`Date Picker`));
  }

  async pickADate() {
    await this.waitAndClick(this.dateInput);
    await pickDateYyyyDdMm(
      this.page,
      this.widgetsData.wDate,
      this.yearInput,
      this.monthInput,
    );
    const selectedDate = await this.dateInput.getAttribute("value");
    const expformattedDate = `${String(this.widgetsData.wDate).slice(6, 8)}/${String(this.widgetsData.wDate).slice(4, 6)}/${String(this.widgetsData.wDate).slice(0, 4)}`;

    return expformattedDate === selectedDate;
  }
}
