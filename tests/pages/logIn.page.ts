import { Page, test } from "@playwright/test";
import { getLoginData } from "../utils/utils";

export class LoginPage {
  constructor(private page: Page) {
    this.page = page;
  }

  async navigateTo() {
    await this.page.goto("https://dev-repmove-enterprise.web.app/auth/sign-in");
  }

  async login() {
    const loginData = getLoginData();
    await this.page.locator('[formcontrolname="email"] input').fill(loginData.email);
    await this.page.locator('[formcontrolname="password"] input').fill(loginData.password);
    await this.page.click("button[type='submit']");
  }
}