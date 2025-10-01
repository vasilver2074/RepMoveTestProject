import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/logIn.page";

test.describe("Login Page tests", () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);
        await loginPage.navigateTo("https://dev-repmove-enterprise.web.app/auth/sign-in");
    });

    test("authorization: successful login", async ({ page }) => {
        
        await loginPage.successfulLogin();
        await loginPage.waitForNavigation("**/dashboard");

        expect.soft(page.url()).toContain("/dashboard");
    });

    test("authorization: incorrect password login", async ({ page }) => {
        
        await loginPage.incorrectPasswordLogin();
        await loginPage.getErrorAlert("Invalid to login");
        
    });

    test("authorization: empty email login", async ({ page }) => {
        
        await loginPage.emptyEmailLogin();
        await loginPage.getErrorMessage();
        
    });
});

