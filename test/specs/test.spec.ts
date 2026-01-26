import { expect } from "@wdio/globals";
import { swagLabs } from "../pageobjects/page_factory";
import { saucedemoData } from "../testData.ts";

describe("Swag Labs tests", () => {
  beforeEach(async () => {
    // await browser.reloadSession();
    await swagLabs.loginPage.navigate();
    await swagLabs.loginPage.login("standard_user", "secret_sauce");
    await expect(browser).toHaveUrl("https://www.saucedemo.com/inventory.html");

    // await $(".inventory_list").waitForDisplayed();

    // await $(".bm-overlay").waitForDisplayed({ reverse: true });
  });

  it("try to login with no data", async () => {
    await swagLabs.loginPage.navigate();
    await swagLabs.loginPage.clickLoginButton();
    await expect(browser).toHaveUrl("https://www.saucedemo.com/");
    expect(swagLabs.loginPage.errorMessage).toHaveText(
      "Epic sadface: Username is required",
    );
  });

  it("check inventory page title", async () => {
    await expect(swagLabs.inventoryPage.title).toHaveText("Products");
  });

  it("check sorting options on the products page", async () => {
    const sortingList = await swagLabs.inventoryPage.getSortingOptions();
    expect(sortingList).toEqual(saucedemoData.products.sortingOptions);
  });

  it("burger menu opens on product page", async () => {
    await swagLabs.inventoryPage.openMenuIfClosed();

    await expect(swagLabs.inventoryPage.menuWrap).toHaveAttribute(
      "aria-hidden",
      "false",
    );
  });

  it("check remove button appears after adding item to cart", async () => {
    const firstItem = swagLabs.inventoryPage.firstItem;
    await firstItem.waitForDisplayed();

    const btn = firstItem.$(".btn_inventory");
    await btn.waitForClickable();
    await btn.click();

    await swagLabs.layout.cartBadge.waitForDisplayed({ timeout: 10000 });
    await expect(swagLabs.layout.cartBadge).toHaveText("1");

    await expect(firstItem.$(".btn_inventory")).toHaveText("Remove", {
      containing: true,
    });
  });
});
