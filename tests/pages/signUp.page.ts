import { expect, Locator, Page, test } from "@playwright/test";
import { getLoginData } from "../utils/utils";
import { faker } from "@faker-js/faker";
import { BasePage } from "../pages/basePage.page";

export class SignUpPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public get email(): Locator {
      return this.page.locator('[formcontrolname="email"] input');
    }
  
    public get password(): Locator {
      return this.page.locator('[formcontrolname="password"] input');
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
    await this.email.fill(loginData.valid_email);
    await this.page.locator('app-phone-number').getByRole('combobox').click();
    await this.page.locator('.__code', { hasText: '+380' }).click();
    await this.page.locator('app-input').filter({ hasText: 'Phone' }).getByRole('textbox').fill(loginData.phone_number);
    await this.password.fill(loginData.valid_password);
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
    await this.email.fill(loginData.valid_email);
    await this.page.locator('app-phone-number').getByRole('combobox').click();
    await this.page.locator('.__code', { hasText: '+380' }).click();
    await this.page.locator('app-input').filter({ hasText: 'Phone' }).getByRole('textbox').fill(loginData.phone_number);
    await this.password.fill(loginData.valid_password);
    await this.page.click("button[type='submit']");

  }

}