import { Page, test } from "@playwright/test";
import { getLoginData } from "../utils/utils";
import { faker } from "@faker-js/faker";

export class SignUpPage {
  constructor(private page: Page) {
    this.page = page;
  }

  async navigateTo() {
    await this.page.goto("https://dev-repmove-enterprise.web.app/auth/sign-up");
  }

  async signUp() {
    
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const companyName = faker.company.name();
    const phoneNumber = faker.phone.number();

    const loginData = getLoginData();
    //await this.page.getByPlaceholder("First Name").fill(firstName); 
    await this.page.locator('[formcontrolname="firstName"] input').fill(firstName);
    await this.page.locator('[formcontrolname="lastName"] input').fill(lastName);
    await this.page.locator('[formcontrolname="companyName"] input').fill(companyName); 
    await this.page.locator('[formcontrolname="industry"] span .ng-arrow').selectOption("Food & Beverage");
    await this.page.locator('[formcontrolname="email"] input').fill(loginData.valid_email);
    await this.page.getByPlaceholder("Country").selectOption("+380");
    await this.page.locator('[formcontrolname="email"] input').fill(phoneNumber);
    await this.page.locator('[formcontrolname="password"] input').fill(loginData.valid_password);
    await this.page.click("button[type='submit']");
  }
}