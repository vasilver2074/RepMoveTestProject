import { Page, expect } from "@playwright/test";

export abstract class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async waitForNavigation(url: string) {
        await this.page.waitForURL(url);
    }
    async getErrorAlert(errorMessage: string) {
        this.page.on("dialog", async (dialog) => {
            expect(dialog.type()).toContain("alert");
            expect(dialog.message()).toContain(errorMessage);
            await dialog.accept();
        });
    }

}