import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/logIn.page";

test.describe("Login Page tests", () => {

    test("authorization: successful login", async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigateTo();
        await loginPage.login();
        await page.waitForURL("**/dashboard")

        expect(page.url()).toContain("/dashboard");
    });
});

