import path from "path";
import dotenv from "dotenv";
dotenv.config();

import { BasePagePO } from "./basePagePO.js";
import { TextBoxPO } from "./elementsSubTabs/textBoxPO.js";
import { CheckBoxPO } from "./elementsSubTabs/checkBoxPO.js";
import { RadioButtonPO } from "./elementsSubTabs/radioButtonPO.js";
import { WebTablesPO } from "./elementsSubTabs/webTablesPO.js";
import { ButtonsPagePO } from "./elementsSubTabs/buttonsPagePO.js";
import { LinksPagePO } from "./elementsSubTabs/linksPagePO.js";
import { UploadDownloadPO } from "./elementsSubTabs/uploadDownloadPO.js";

import { readKeyValueSheet } from "../utils/readExcel.js";

export class ElementsPagePO extends BasePagePO {
  constructor(page) {
    super(page);
    this.dataFilePath = path.resolve(process.env.DATA_FILE);
    this.homeUrl = process.env.BASE_URL;
    this.elementsData = {};
  }

  async init() {
    const sheetName = "elements";
    this.elementsData = await readKeyValueSheet(this.dataFilePath, sheetName);

    this.textBoxTab = new TextBoxPO(this.page, this.elementsData);
    this.checkBoxTab = new CheckBoxPO(this.page, this.elementsData);
    this.radioButtonTab = new RadioButtonPO(this.page, this.elementsData);
    this.webTablesTab = new WebTablesPO(this.page, this.elementsData);
    this.buttonsTab = new ButtonsPagePO(this.page, this.elementsData);
    this.linksTab = new LinksPagePO(this.page, this.homeUrl);
    this.uploadDownloadTab = new UploadDownloadPO(this.page, this.elementsData);
  }

  async clickTextBoxLink() {
    await this.waitAndClick(this.page.getByText(`Text Box`));
  }

  async clickCheckBoxLink() {
    await this.waitAndClick(this.page.getByRole(`listitem`).filter({ hasText: `Check Box` }));
  }

  async clickRadioButtonLink() {
    await this.waitAndClick(this.page.getByText(`Radio Button`));
  }

  async clickWebTableLink() {
    await this.waitAndClick(this.page.getByText(`Web Tables`));
  }

  async clickButtonsLink() {
    await this.waitAndClick(this.page.getByRole(`listitem`).filter({ hasText: `Buttons` }));
  }

  async clickLinksLink() {
    await this.waitAndClick(this.page.getByText(`Links`).first());
  }

  async clickUploadAndDownloadLink() {
    await this.waitAndClick(this.page.getByText(`Upload and Download`).first());
  }
}
