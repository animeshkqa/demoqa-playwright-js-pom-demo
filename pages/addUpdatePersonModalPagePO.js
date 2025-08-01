import { BasePagePO } from "./basePagePO.js";

export class AddUpdatePersonModalPagePO extends BasePagePO {
  constructor(page) {
    super(page);
    this.firstName = page.getByPlaceholder(`First Name`);
    this.lastName = page.getByPlaceholder(`Last Name`);
    this.emailBox = page.getByPlaceholder(`name@example.com`);
    this.ageBox = page.getByPlaceholder(`age`);
    this.salary = page.getByPlaceholder(`Salary`);
    this.departmentBox = page.getByPlaceholder(`Department`);
    this.regFormSubmit = page.getByText(`Submit`);
  }

  async fillRegFormAndSubmit(
    fname,
    lname,
    emailid,
    agenum,
    salary,
    department,
  ) {
    await this.fillAndWait(this.firstName, fname);
    await this.fillAndWait(this.lastName, lname);
    await this.fillAndWait(this.emailBox, emailid);
    await this.fillAndWait(this.ageBox, agenum);
    await this.fillAndWait(this.salary, salary);
    await this.fillAndWait(this.departmentBox, department);

    await this.waitAndClick(this.regFormSubmit);
  }
}
