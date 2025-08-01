export class BasePagePO {
  constructor(page) {
    this.page = page;
  }

  async waitAndClick(locator) {
    await locator.waitFor({ state: "visible" });
    await locator.click();
  }

  async waitAndDblClick(locator) {
    await locator.waitFor({ state: "visible" });
    await locator.dblclick();
  }

  async waitAndRightClick(locator) {
    await locator.waitFor({ state: "visible" });
    await locator.click({ button: "right" });
  }

  async waitAndHover(locator) {
    await locator.waitFor({ state: "visible" });
    await locator.hover();
  }

  async fillAndWait(locator, text) {
    await locator.waitFor({ state: "visible" });
    await locator.fill(text);
  }

  async getText(locator) {
    await locator.waitFor({ state: "visible" });
    return await locator.textContent();
  }

  async isVisible(locator) {
    return await locator.isVisible();
  }

  async waitForSelector(selector) {
    await this.page.waitForSelector(selector, { state: "visible" });
  }

  async scrollTo(locator) {
    await locator.scrollIntoViewIfNeeded();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState("load");
  }

  async waitForNetworkIdle() {
    await this.page.waitForLoadState("networkidle");
  }
}
