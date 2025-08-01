import { test, expect } from "@playwright/test";
import { HomePagePO } from "../pages/homePagePO.js";
import { WidgetsPagePO } from "../pages/widgetsPagePO.js";

let page, homePO, widgetsPagePO;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  page = await context.newPage();

  homePO = new HomePagePO(page);
  widgetsPagePO = new WidgetsPagePO(page);

  await page.goto("/");
  await homePO.navigateToWidgets();
  await widgetsPagePO.init();
});

test.afterAll(async () => {
  await page.close();
});

test(
  "TC01_WIDGETS_pVE Get Mouse Hover Tool Tips Text and Verify",
  { tag: ["@sit"] },
  async () => {
    await widgetsPagePO.clickToolTipsLink();
    expect(await widgetsPagePO.checkToolTipsTxtOnHover()).toBeTruthy();
  },
);

test("TC02_WIDGETS_pVE Pick a date", { tag: ["@sit"] }, async () => {
  await widgetsPagePO.clickDatePickerLink();
  expect(await widgetsPagePO.pickADate()).toBeTruthy();
});
