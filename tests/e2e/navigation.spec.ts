import { expect, test } from '@playwright/test';

test.describe('pages and routing', () => {
  for (const [path, title] of [
    ['/', /Digital Design & Engineering Studio/],
    ['/work', /Selected Work/],
    ['/services', /Services/],
    ['/about', /About/],
    ['/insights', /Insights/],
    ['/contact', /Start a Project/],
    ['/privacy', /Privacy Policy/],
  ] as const) {
    test(`${path} renders with its own title`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(title);
      await expect(page.locator('h1').first()).toBeVisible();
    });
  }

  test('header links navigate between pages', async ({ page }) => {
    await page.goto('/');
    await page.locator('header nav').getByRole('link', { name: 'Work' }).click();
    await expect(page).toHaveURL(/\/work$/);
    await expect(page.locator('header nav a[aria-current="page"]')).toHaveText('Work');
  });

  test('unknown paths show the 404 page with a 404 status', async ({ page }) => {
    const response = await page.goto('/definitely-not-a-page');
    expect(response?.status()).toBe(404);
    await expect(page.locator('h1')).toHaveText('Page not found');
  });

  test('unknown case study slugs redirect to the work page', async ({ page }) => {
    await page.goto('/work/not-a-real-project');
    await expect(page).toHaveURL(/\/work$/);
  });

  test('sitemap lists the case studies', async ({ request }) => {
    const xml = await (await request.get('/sitemap.xml')).text();
    expect(xml).toContain('https://gekdesign.com.au/work/fairfield-dental-care');
    expect(xml).toContain('https://gekdesign.com.au/work/atlassian-jira');
  });
});

test.describe('case study overlays', () => {
  test('open from the home page and close back to it', async ({ page }) => {
    await page.goto('/');
    await page.locator('main a[href="/work/fairfield-dental-care"]').first().click();
    await expect(page).toHaveURL(/\/work\/fairfield-dental-care$/);
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(page).toHaveURL(/\/$/);
  });

  test('"next case study" replaces the overlay without adding history', async ({ page }) => {
    await page.goto('/work');
    await page.locator('main a[href^="/work/"]').first().click();
    const first = page.url();
    await page.getByRole('dialog').getByText('Next Case Study').click();
    await expect(page).not.toHaveURL(first);
    await page.getByRole('button', { name: 'Close case study' }).click();
    await expect(page).toHaveURL(/\/work$/);
  });

  test('direct links render the case study in the pre-rendered HTML', async ({ request }) => {
    const html = await (await request.get('/work/vodafone-shop')).text();
    expect(html).toContain('<title>Vodafone Online Shop Rebuild Case Study — GEK Design</title>');
    expect(html).toContain('A rebuilt Next.js shop front end');
  });

  test('SLA badge shows GEK Design’s guarantee, and Atlassian’s published SLA on Jira', async ({ page }) => {
    await page.goto('/work/stan-live-video');
    await expect(page.getByRole('dialog').getByText('99.99% SLA · GEK Design')).toBeVisible();
    await page.goto('/work/atlassian-jira');
    await expect(page.getByRole('dialog').getByText('99.9% Cloud SLA')).toBeVisible();
  });
});

test.describe('contact', () => {
  test('?service= pre-fills the brief after hydration', async ({ page }) => {
    await page.goto('/contact?service=Sprint+Model');
    await expect(page.getByText('Sprint Model')).toBeVisible();
  });

  test('services CTA links through to a pre-filled contact form', async ({ page }) => {
    await page.goto('/services');
    await page.getByRole('button', { name: /sprint/i }).first().click();
    await expect(page).toHaveURL(/\/contact\?service=Sprint\+Model/);
  });
});
