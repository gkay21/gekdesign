import { expect, test, type Page } from '@playwright/test';

// The real mailer is never called: requests are intercepted.
const MAILER = 'https://mailer.gekdesign.com.au/send';

const goToDetailsStep = async (page: Page) => {
  await page.goto('/contact');
  await page.getByRole('button', { name: 'Next: Budget & Timeline' }).click();
  await page.getByRole('button', { name: 'Next: Contact Details' }).click();
};

test('form fields have accessible labels', async ({ page }) => {
  await goToDetailsStep(page);
  for (const label of ['Your Full Name *', 'Work Email Address *', 'Company / Brand Name', 'Current Website / Deck URL', 'Brief Overview of Goals & Challenges']) {
    await expect(page.getByLabel(label)).toBeVisible();
  }
});

test('invalid details show errors and send nothing', async ({ page }) => {
  let requests = 0;
  await page.route(MAILER, (route) => {
    requests++;
    return route.fulfill({ status: 200, body: '{}' });
  });
  await goToDetailsStep(page);
  await page.getByRole('button', { name: 'Submit Project Brief' }).click();

  await expect(page.getByText('Please enter your name.')).toBeVisible();
  await expect(page.getByText('Please enter your email address.')).toBeVisible();
  expect(requests).toBe(0);
});

test('a valid brief posts to the mailer and shows the success screen', async ({ page }) => {
  let body: Record<string, string> | undefined;
  await page.route(MAILER, async (route) => {
    body = route.request().postDataJSON();
    await route.fulfill({ status: 200, body: '{}' });
  });
  await goToDetailsStep(page);
  await page.getByLabel('Your Full Name *').fill('Jane Smith');
  await page.getByLabel('Work Email Address *').fill('jane@company.com');
  await page.getByLabel('Brief Overview of Goals & Challenges').fill('A new website.');
  await page.getByRole('button', { name: 'Submit Project Brief' }).click();

  await expect.poll(() => body?.email).toBe('jane@company.com');
  expect(body?.name).toBe('Jane Smith');
  expect(body?.message).toContain('Timeline: 4 – 6 Weeks');
  expect(body?.message).toContain('Project details:\nA new website.');
  await expect(page.getByRole('button', { name: 'Submit Project Brief' })).toBeHidden();
});

test('a mailer error is shown and the form keeps its values', async ({ page }) => {
  await page.route(MAILER, (route) =>
    route.fulfill({ status: 400, body: JSON.stringify({ errors: [{ detail: 'invalid email' }] }) })
  );
  await goToDetailsStep(page);
  await page.getByLabel('Your Full Name *').fill('Jane Smith');
  await page.getByLabel('Work Email Address *').fill('jane@company.com');
  await page.getByRole('button', { name: 'Submit Project Brief' }).click();

  await expect(page.getByRole('alert')).toHaveText('invalid email');
  await expect(page.getByLabel('Your Full Name *')).toHaveValue('Jane Smith');
});

test('a filled-in honeypot shows success but sends nothing', async ({ page }) => {
  let requests = 0;
  await page.route(MAILER, (route) => {
    requests++;
    return route.fulfill({ status: 200, body: '{}' });
  });
  await goToDetailsStep(page);
  await page.getByLabel('Your Full Name *').fill('Spam Bot');
  await page.getByLabel('Work Email Address *').fill('bot@spam.com');
  await page.locator('#contact-reference').fill('https://spam.example');
  await page.getByRole('button', { name: 'Submit Project Brief' }).click();

  await expect(page.getByRole('button', { name: 'Submit Project Brief' })).toBeHidden();
  expect(requests).toBe(0);
});
