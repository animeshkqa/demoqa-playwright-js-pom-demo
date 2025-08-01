import { test, expect } from "@playwright/test";
import { HomePagePO } from "../pages/homePagePO.js";
import { AlertsFramesWindowsPagePO } from "../pages/alertsFramesWindowsPagePO.js";

let page, homePO, alertsFramesPO;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  page = await context.newPage();

  homePO = new HomePagePO(page);
  alertsFramesPO = new AlertsFramesWindowsPagePO(page);

  await page.goto("/");
  await homePO.navigateToAlertsFramesWindows();
  await alertsFramesPO.init();
});

test.afterAll(async () => {
  await page.close();
});

test(
  "TC01_ALERTS_FRAMES_WINDOWS_pVE Handle Alert",
  { tag: ["@sit", "@smoke"] },
  async () => {
    await alertsFramesPO.clickAlertsLink();
    const alertArray = await alertsFramesPO.alertsTab.clickAndHandleAlert();
    expect(alertArray[0]).toBeTruthy();
    expect(alertArray[1]).toBeTruthy();
  },
);

test(
  "TC02_ALERTS_FRAMES_WINDOWS_pVE Accept Confirm",
  { tag: ["@sit"] },
  async () => {
    await alertsFramesPO.clickAlertsLink();
    expect(await alertsFramesPO.alertsTab.clickAndAcceptConfirm()).toBeTruthy();
  },
);

test(
  "TC03_ALERTS_FRAMES_WINDOWS_pVE Reject Confirm",
  { tag: ["@sit"] },
  async () => {
    expect(await alertsFramesPO.alertsTab.clickAndRejectConfirm()).toBeTruthy();
  },
);

test(
  "TC04_ALERTS_FRAMES_WINDOWS_pVE Enter Prompt",
  { tag: ["@sit"] },
  async () => {
    expect(await alertsFramesPO.alertsTab.clickAndEnterPrompt()).toBeTruthy();
  },
);

test(
  "TC05_ALERTS_FRAMES_WINDOWS_pVE Get Frames Text",
  { tag: ["@sit"] },
  async () => {
    await alertsFramesPO.clickFramesLink();
    expect(
      await alertsFramesPO.framesTab.getFrameMsgInNestedFrames(),
    ).toBeTruthy();
  },
);
