import { expect, Page, test } from "@playwright/test";
import { getLoginData } from "../utils/utils";
import { BasePage } from "./basePage.page";

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async successfulLogin() {
    const loginData = getLoginData();
    await this.page.locator('[formcontrolname="email"] input').fill(loginData.valid_email);
    await this.page.locator('[formcontrolname="password"] input').fill(loginData.valid_password);
    await this.page.click("button[type='submit']");
  }

  async incorrectPasswordLogin(){
    const loginData = getLoginData();
    await this.page.locator('[formcontrolname="email"] input').fill(loginData.valid_email);
    await this.page.locator('[formcontrolname="password"] input').fill(loginData.invalid_password);
    await this.page.click("button[type='submit']");
  }

  async emptyEmailLogin(){
    const loginData = getLoginData();
    await this.page.locator('[formcontrolname="password"] input').fill(loginData.valid_password);
    await this.page.click("button[type='submit']");
  }

  async getErrorMessage(){
    await expect(this.page.locator('.__error')).toBeVisible();
    await expect(this.page.locator('.__error')).toHaveText('Please, enter your email address');
  }

}