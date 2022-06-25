import { test, expect } from "@playwright/test";

test.beforeEach(async ({ context }) => {
  // June 23 will be used as "today" for all tests
  const fakeNow = new Date("June 23 2042 13:37:11").valueOf();

  // From https://github.com/microsoft/playwright/issues/6347#issuecomment-1085850728
  await context.addInitScript(`{
    // Extend Date constructor to default to fakeNow
    Date = class extends Date {
      constructor(...args) {
        if (args.length === 0) {
          super(${fakeNow});
        } else {
          super(...args);
        }
      }
    }
    // Override Date.now() to start from fakeNow
    const __DateNowOffset = ${fakeNow} - Date.now();
    const __DateNow = Date.now;
    Date.now = () => __DateNow() + __DateNowOffset;
  }`);
});

test("should redirect to today", async ({ page }) => {
  await page.goto("/");
  await page.waitForNavigation();

  expect(page.url()).toContain("/diary/6/23");
});

test("snapshot test", async ({ page }) => {
  await page.goto("/diary/6/23");
  await page.waitForSelector("text=This quote matches my life right now");
  await expect(page).toHaveScreenshot();
});
