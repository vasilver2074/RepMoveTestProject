import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/logIn.page";

test.describe("Login Page tests", () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);
        await loginPage.navigateTo();
    });

    test("authorization: successful login", async ({ page }) => {
        
        await loginPage.successfulLogin();
        await loginPage.waitForNavigation();

        expect.soft(page.url()).toContain("/dashboard");
    });

    test("authorization: incorrect password login", async ({ page }) => {
        
        await loginPage.incorrectPasswordLogin();
        await loginPage.getErrorAlert()
        
    });

    test("authorization: empty email login", async ({ page }) => {
        
        await loginPage.emptyEmailLogin();
        await loginPage.getErrorMessage();
        
    });
});

