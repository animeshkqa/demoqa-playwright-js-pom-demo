import { test, expect } from "@playwright/test";
import { HomePagePO } from "../pages/homePagePO.js";
import { ElementsPagePO } from "../pages/elementsPagePO.js";

let page, homePO, elementsPO;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  page = await context.newPage();

  homePO = new HomePagePO(page);
  elementsPO = new ElementsPagePO(page);

  await page.goto("/");
  await homePO.navigateToElements();
  await elementsPO.init();
});

test.afterAll(async () => {
  await page.close();
});

test.fail(
  "TC01_ELEMENTS_nVE Submit Text Boxes Data and Verify",
  { tag: ["@sit", "@smoke"] },
  async () => {
    // In this Test expected and actual will not match as in actual some spelling mistake is there, we can make it 'test.fixme' in real project and share the defect with dev
    await elementsPO.clickTextBoxLink();
    const actual = await elementsPO.textBoxTab.fillTextBoxesAndSubmit();
    const expected = await elementsPO.textBoxTab.getExpectedOutputArray();
    expect(actual).toEqual(expected);
  },
);

test(
  "TC02_ELEMENTS_pVE Select Check Boxes and Verify",
  { tag: ["@sit"] },
  async () => {
    await elementsPO.clickCheckBoxLink();
    expect(await elementsPO.checkBoxTab.checkBoxSelection()).toBeTruthy();
  },
);

test(
  "TC03_ELEMENTS_pVE Unselect Check Boxes and Verify",
  { tag: ["@sit"] },
  async () => {
    expect(await elementsPO.checkBoxTab.checkBoxUnselect()).toBeTruthy();
  },
);

test(
  "TC04_ELEMENTS_pVE Select Radio Button",
  { tag: ["@sit", "@smoke"] },
  async () => {
    await elementsPO.clickRadioButtonLink();
    expect(await elementsPO.radioButtonTab.radioButtonClick()).toBeTruthy();
  },
);

test(
  "TC05_ELEMENTS_pVE Add Person in Web Table",
  { tag: ["@sit"] },
  async () => {
    await elementsPO.clickWebTableLink();
    expect(await elementsPO.webTablesTab.addPersonToWebTable()).toBeTruthy();
  },
);

test(
  "TC06_ELEMENTS_pVE Remove Person from Web Table",
  { tag: ["@sit"] },
  async () => {
    expect(
      await elementsPO.webTablesTab.removePersonFromWebTable(),
    ).toBeTruthy();
  },
);

test(
  "TC07_ELEMENTS_pVE Perform Double CLick Action",
  { tag: ["@sit"] },
  async () => {
    await elementsPO.clickButtonsLink();
    expect(await elementsPO.buttonsTab.performDoubleClickAction()).toBeTruthy();
  },
);

test(
  "TC08_ELEMENTS_pVE Perform Right CLick Action",
  { tag: ["@sit", "@smoke"] },
  async () => {
    expect(await elementsPO.buttonsTab.performRightClickAction()).toBeTruthy();
  },
);

test(
  "TC09_ELEMENTS_pVE New Tab Open Test",
  { tag: ["@sit", "@smoke"] },
  async () => {
    await elementsPO.clickLinksLink();
    expect(await elementsPO.linksTab.clickToOpenNewTab()).toBeTruthy();
  },
);

test("TC10_ELEMENTS_pVE Upload A File", { tag: ["@sit"] }, async () => {
  await elementsPO.clickUploadAndDownloadLink();
  expect(await elementsPO.uploadDownloadTab.uploadFile()).toBeTruthy();
});

test("TC11_ELEMENTS_pVE Download A File", { tag: ["@sit"] }, async () => {
  expect(await elementsPO.uploadDownloadTab.downloadFile()).toBeTruthy();
});
