import { expect, test } from '@playwright/test';

test.describe('keyboard and screen-reader access', () => {
  test('case study cards are real links to their pages', async ({ page }) => {
    await page.goto('/work');
    const hrefs = await page.locator('main a[href^="/work/"]').evaluateAll((links) => links.map((a) => a.getAttribute('href')));
    expect(hrefs).toContain('/work/stan-live-video');
    expect(hrefs.length).toBeGreaterThanOrEqual(6);
  });

  test('a card can be opened with the keyboard and focus returns on close', async ({ page }) => {
    await page.goto('/work');
    const card = page.locator('main a[href="/work/vodafone-shop"]');
    await card.focus();
    await page.keyboard.press('Enter');

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toBeFocused();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(card).toBeFocused();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
  });

  test('Tab stays inside an open dialog', async ({ page }) => {
    await page.goto('/insights');
    await page.locator('main a[href^="/insights/"]').first().click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    for (let i = 0; i < 12; i++) {
      await page.keyboard.press('Tab');
      expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true);
    }
  });

  test('ctrl/cmd-click on a card is left to the browser (new tab), not hijacked', async ({ page, context }) => {
    await page.goto('/work');
    const [popup] = await Promise.all([
      context.waitForEvent('page'),
      page.locator('main a[href="/work/stan-live-video"]').click({ modifiers: ['ControlOrMeta'] }),
    ]);
    await popup.waitForURL(/\/work\/stan-live-video$/);
    await expect(page).toHaveURL(/\/work$/);
  });
});
