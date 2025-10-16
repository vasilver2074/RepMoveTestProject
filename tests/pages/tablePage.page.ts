import { expect, Locator, Page, test } from "@playwright/test";
import { BasePage } from "./basePage.page";

export class TablePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public get parentBody(): Locator {
      return this.page.locator('table#example tbody');
    }

  public get rowCount(): Locator {
      return this.parentBody.locator('tr');
    }

  public get allColums(): Locator {
      return this.rowCount.locator('td');
    }

  // async getCartItems(): Promise<string[]> {
  //   return this.parentBody.locator(".inventory_item_name ").allTextContents();
  // }

  
}
