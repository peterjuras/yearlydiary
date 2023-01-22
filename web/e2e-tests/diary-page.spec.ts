import { test, expect } from "@playwright/test";

test("should redirect to today", async ({ page }) => {
  await page.goto("/");

  await page.waitForNavigation();

  expect(page.url()).toContain("/diary/6/23");
});

test("snapshot test", async ({ page }) => {
  await page.goto("/diary/6/23");
  await page.waitForSelector("text=Check out what others have answered today!");
  await expect(page).toHaveScreenshot();
});
