import { BasePagePO } from "../basePagePO.js";

export class ButtonsPagePO extends BasePagePO {
  constructor(page, data) {
    super(page);
    this.data = data;

    this.dblClickBtn = page.getByText(`Double Click Me`);
    this.rightClickBtn = page.getByText(`Right Click Me`);
    this.dblClickSuccessMsg = page.getByText(`You have done a double click`);
    this.rightClickSuccessMsg = page.getByText(`You have done a right click`);
  }

  async performDoubleClickAction() {
    await this.waitAndDblClick(this.dblClickBtn);
    return (await this.dblClickSuccessMsg.count()) !== 0;
  }

  async performRightClickAction() {
    await this.waitAndRightClick(this.rightClickBtn);
    return (await this.rightClickSuccessMsg.count()) !== 0;
  }
}
