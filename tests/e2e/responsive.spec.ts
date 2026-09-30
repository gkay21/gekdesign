import { expect, test } from '@playwright/test';

// Runs in the "mobile" project (Pixel 7): no page should scroll sideways.
for (const path of ['/', '/work', '/services', '/about', '/insights', '/contact', '/work/fairfield-dental-care']) {
  test(`${path} has no horizontal overflow on mobile`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('networkidle');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
}
