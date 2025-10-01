import { expect, Locator, Page, test } from "@playwright/test";
import { getLoginData } from "../utils/utils";
import { BasePage } from "./basePage.page";

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public get email(): Locator {
    return this.page.locator('[formcontrolname="email"] input');
  }

  public get password(): Locator {
    return this.page.locator('[formcontrolname="password"] input');
  }

  public get submitButton(): Locator {
    return this.page.locator("button[type='submit']");
  }

  async login(email: string, password: string) {
    const loginData = getLoginData();
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submitButton.click();
  }

  async emptyEmailLogin(){
    const loginData = getLoginData();
    await this.password.fill(loginData.valid_password);
    await this.submitButton.click();
  }

  async getErrorMessage(){
    await expect.soft(this.page.locator('.__error')).toBeVisible();
    await expect.soft(this.page.locator('.__error')).toHaveText('Please, enter your email address');
  }

}