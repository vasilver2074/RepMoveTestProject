import { expect, Page, test } from "@playwright/test";
import { getLoginData } from "../utils/utils";
import { faker } from "@faker-js/faker";
import { BasePage } from "../pages/basePage.page";

export class SignUpPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async signUp() {

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const companyName = faker.company.name();

    const loginData = getLoginData();

    await this.page.locator('[formcontrolname="firstName"] input').fill(firstName);
    await this.page.locator('[formcontrolname="lastName"] input').fill(lastName);
    await this.page.locator('[formcontrolname="companyName"] input').fill(companyName);
    await this.page.locator('.ng-select-container').filter({ hasText: 'Industry' }).getByRole('combobox').click();
    await this.page.locator('.ng-option-label', { hasText: 'Distributor' }).click();
    await this.page.locator('[formcontrolname="email"] input').fill(loginData.valid_email);
    await this.page.locator('app-phone-number').getByRole('combobox').click();
    await this.page.locator('.__code', { hasText: '+380' }).click();
    await this.page.locator('app-input').filter({ hasText: 'Phone' }).getByRole('textbox').fill(loginData.phone_number);
    await this.page.locator('[formcontrolname="password"] input').fill(loginData.valid_password);
    await this.page.click("button[type='submit']");

  }

  async duplicateSignUp() {

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const companyName = faker.company.name();

    const loginData = getLoginData();

    await this.page.locator('[formcontrolname="firstName"] input').fill(firstName);
    await this.page.locator('[formcontrolname="lastName"] input').fill(lastName);
    await this.page.locator('[formcontrolname="companyName"] input').fill(companyName);
    await this.page.locator('.ng-select-container').filter({ hasText: 'Industry' }).getByRole('combobox').click();
    await this.page.locator('.ng-option-label', { hasText: 'Distributor' }).click();
    await this.page.locator('[formcontrolname="email"] input').fill(loginData.valid_email);
    await this.page.locator('app-phone-number').getByRole('combobox').click();
    await this.page.locator('.__code', { hasText: '+380' }).click();
    await this.page.locator('app-input').filter({ hasText: 'Phone' }).getByRole('textbox').fill(loginData.phone_number);
    await this.page.locator('[formcontrolname="password"] input').fill(loginData.valid_password);
    await this.page.click("button[type='submit']");

  }

}