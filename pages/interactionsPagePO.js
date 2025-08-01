import dotenv from "dotenv";
dotenv.config();

import { BasePagePO } from "./basePagePO.js";

export class InteractionsPagePO extends BasePagePO {
  constructor(page) {
    super(page);

    this.draggable = page.locator(`//div[@id='draggable']`);
    this.droppable = page.locator(`//div[@id='droppable']`).first();
  }

  async clickDroppableLink() {
    await this.waitAndClick(this.page.getByText(`Droppable`));
  }

  async dragToDroppable() {
    await this.draggable.hover();
    await this.page.mouse.down();

    await this.droppable.hover();
    await this.page.mouse.up();

    return (await this.droppable.textContent()) === "Dropped!";
  }
}
