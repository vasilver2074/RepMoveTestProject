import { test, expect } from "@playwright/test";
import { SignUpPage } from "../pages/signUp.page";

test.describe("Sign Up Page tests", () => {

    test("authorization: successful login", async ({ page }) => {
        const signUpPage = new SignUpPage(page);

        await signUpPage.navigateTo();
        await signUpPage.signUp();

        expect(page.url()).toContain("/dashboard");
    });
});