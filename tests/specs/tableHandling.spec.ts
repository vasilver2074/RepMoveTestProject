import { Page, Locator, Browser, test, expect } from "@playwright/test";
import { TablePage } from "../pages/tablePage.page";

test.describe(`Launch the browser and handle table data`, async () => {
  let tablePage: TablePage;

  test.beforeEach(async ({ page }) => {
    tablePage = new TablePage(page);
    await tablePage.navigateTo("https://datatables.net/");
    await page.waitForSelector(`table#example`, {
      state: "visible",
    });
  });

  test(`Get the total number of rows from table `, async ({ page }) => {
    const count = await tablePage.rowCount.count();
    console.log("The total number of rows from table are equals " + count);
    expect(count).toEqual(10);
  });

  test(`Get the total number of columns for all rows`, async ({ page }) => {
    const columnCount = await tablePage.allColums.count();
    console.log(
      "The total number of column from table are equals " + columnCount
    );
    expect(columnCount).toEqual(60);
  });

  test(`Get all data from a row from the table`, async ({ page }) => {
    //const allColums = page.locator(`table#example tbody tr`).last();
    const allColums = await tablePage.rowCount.last();
    await page.waitForTimeout(1000);
    //const rowData = await allColums.locator("td").allTextContents();
    const rowData = await tablePage.allColums.allTextContents();
    console.log(rowData);
    expect(rowData).toContain("Cedric Kelly");
  });

  test(`Get the last data row from the table`, async ({ page }) => {
    const tableLocator = page.locator(`table#example tbody`);

    const row_text = await tableLocator
      .locator(`tr`)
      .last()
      .locator(`:scope`)
      .allInnerTexts();
    row_text.forEach((text) => {
      console.log(text);
    });
    expect(row_text[0]).toContain("Cedric Kelly");
  });

  test(`Increase count of rows and get all names`, async ({ page }) => {
    await page.getByLabel("entries per page").selectOption(`25`);
    await page.waitForTimeout(1000);
    const allnames = await page
      .locator(`table#example tbody`)
      .locator(`tr`)
      .locator(`:scope`)
      .locator(`td.sorting_1`)
      .allInnerTexts();
    allnames.forEach((text) => {
      console.log(text);
    });
    expect(allnames.length).toEqual(25);
  });

  test(`Search for people who have Tokyo office`, async ({ page }) => {
    await page.locator(`input[type='search']`).fill(`Tokyo`);
    await page.waitForTimeout(2000);
    const tableLocator = await page.locator(`table#example tbody`);
    const rowCount = await tableLocator.locator("tr").count();
    console.log(
      "The total number of searched Tokyo rows from table are equals " +
        rowCount
    );
    expect(rowCount).toEqual(5);

    const last = await tableLocator
      .locator("tr")
      .locator(":scope", { hasText: `Tokyo` })
      .locator(`td.sorting_1`)
      .allInnerTexts();
    last.forEach((text) => {
      console.log(text);
    });
    expect(last).toContain("Garrett Winters");
  });

  test(`Sort the table and get the data`, async ({ page }) => {
    await page
      .getByRole("cell", { name: "Name Toggle ordering More..." })
      .getByLabel("Toggle ordering")
      .click();
    await page.waitForTimeout(2000);
    const tableLocator = page.locator(`table#example tbody`);
    const row = await tableLocator
      .locator(`tr`)
      .locator(":scope")
      .locator(`td.sorting_1`)
      .allInnerTexts();
    await row.forEach((text) => {
      console.log(text);
    });
  });
});
