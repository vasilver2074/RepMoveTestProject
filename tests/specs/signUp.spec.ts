import { test, expect } from "@playwright/test";
import { SignUpPage } from "../pages/signUp.page";

test.describe("Sign Up Page tests", () => {

    let signUpPage: SignUpPage;

    test.beforeEach(async ({ page }) => {

        signUpPage = new SignUpPage(page);
        await signUpPage.navigateTo("/auth/sign-up");
    });

    test("authorization: successful Sign Up", async ({ page }) => {
        
        await signUpPage.signUp();
        await signUpPage.waitForNavigation("**/dashboard");

        expect(page.url()).toContain("/dashboard");
    });

    test("authorization: duplicate Sign Up", async ({ page }) => {
        
        await signUpPage.duplicateSignUp();
        await signUpPage.getErrorAlert("Invalid to sign up");

    });
});