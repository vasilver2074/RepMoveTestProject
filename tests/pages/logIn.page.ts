import { expect, Page, test } from "@playwright/test";
import { getLoginData } from "../utils/utils";

export class LoginPage {
  constructor(private page: Page) {
    this.page = page;
  }

  async navigateTo() {
    await this.page.goto("https://dev-repmove-enterprise.web.app/auth/sign-in");
  }

  async waitForNavigation(){
    await this.page.waitForURL("**/dashboard")
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

  async getErrorAlert(){
    this.page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("Invalid to login");
    await dialog.accept();
  });
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