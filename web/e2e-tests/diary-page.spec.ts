import { test, expect } from "@playwright/test";

test("should redirect to today", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.waitForNavigation();

  const today = new Date();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();

  expect(page.url()).toContain(`/diary/${todayMonth}/${todayDay}`);
});

test("snapshot test", async ({ page }) => {
  await page.goto("http://localhost:3000/diary/6/23");
  await expect(page).toHaveScreenshot();
});
