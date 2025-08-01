import { test, expect } from "@playwright/test";
import { HomePagePO } from "../pages/homePagePO.js";
import { InteractionsPagePO } from "../pages/interactionsPagePO";

let page, homePO, interactionsPO;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  page = await context.newPage();

  homePO = new HomePagePO(page);
  interactionsPO = new InteractionsPagePO(page);

  await page.goto("/");
  await homePO.navigateToInteractions();
});

test.afterAll(async () => {
  await page.close();
});

test(
  "TC01_WIDGETS_pVE Get Mouse Hover Tool Tips Text and Verify",
  { tag: ["@sit", "@smoke"] },
  async () => {
    await interactionsPO.clickDroppableLink();
    expect(await interactionsPO.dragToDroppable()).toBeTruthy();
  },
);
