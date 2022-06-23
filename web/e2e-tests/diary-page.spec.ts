import { test, expect } from "@playwright/test";

test("should redirect to today", async ({ page }) => {
  await page.goto("/");
  await page.waitForNavigation();

  const today = new Date();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();

  expect(page.url()).toContain(`/diary/${todayMonth}/${todayDay}`);
});

test("snapshot test", async ({ page }) => {
  await page.goto("/diary/6/23");
  await page.waitForSelector("text=This quote matches my life right now");
  await expect(page).toHaveScreenshot();
});
