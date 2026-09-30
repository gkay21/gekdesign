// Captures the live (or archived) client websites used in the case study mock-ups.
// Usage: node scripts/mockups/capture.mjs [name ...]   (no names = capture everything)
// Output: scripts/mockups/.cache/<name>.png — consumed by build.py.
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const CACHE = join(dirname(fileURLToPath(import.meta.url)), '.cache');
const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36';

// Hide cookie banners without consenting.
const HIDE_COOKIE_BANNERS = `
  for (const el of document.querySelectorAll('body *')) {
    const s = getComputedStyle(el);
    if ((s.position === 'fixed' || s.position === 'sticky') && /cookie/i.test(el.textContent || '') && el.getBoundingClientRect().top > 300) {
      el.style.display = 'none';
    }
  }`;

// Each viewport matches the aspect ratio of the screen it is composited onto.
const SHOTS = {
  fairfield: { url: 'https://fairfielddentalcare.com.au/', viewport: [1600, 944], scale: 1.5 },
  unibet: { url: 'https://www.unibet.com.au/', viewport: [1440, 1080], scale: 1.5, script: HIDE_COOKIE_BANNERS },
  stan: { url: 'https://www.stan.com.au/', viewport: [1600, 900], scale: 1.5 },
  // Vodafone's Next.js shop was replaced in 2023, so capture the archived February 2021 page.
  vodafone: {
    url: 'https://web.archive.org/web/20210201if_/https://www.vodafone.com.au/mobile-phones',
    viewport: [1920, 1080],
    scale: 1.25,
    wait: 15000,
  },
  // Atlassian's public Ecosystem Jira; blur real people's names and avatars.
  jira: {
    url: 'https://ecosystem.atlassian.net/browse/ACJIRA-1',
    viewport: [1600, 1138],
    scale: 1.5,
    css: `
      [data-testid="page-layout.banner"] { display: none !important; }
      [data-testid^="issue.views.field.user"], [data-testid*="read-only-assignee"],
      [data-testid^="issue-comment-base.ui.comment.ak-comment."][data-testid$="-header"],
      img[src*="gravatar"], img[src*="avatar-management"], img[src*="useravatar"] { filter: blur(5px) !important; }`,
  },
  // Full-length page for the stacked-pages layout; scroll first so lazy sections render.
  miniminds: { url: 'https://minimindselc.com.au/', viewport: [1440, 900], scale: 2, fullPage: true },
};

const capture = async (browser, name, shot) => {
  const [width, height] = shot.viewport;
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: shot.scale, userAgent: USER_AGENT });
  await page.goto(shot.url, { waitUntil: shot.fullPage ? 'networkidle' : 'domcontentloaded', timeout: 120000 });
  await page.waitForTimeout(shot.wait ?? 8000);
  if (shot.fullPage) {
    const total = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < total; y += 400) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(250);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1500);
  }
  if (shot.css) await page.addStyleTag({ content: shot.css });
  if (shot.script) await page.evaluate(shot.script);
  await page.waitForTimeout(800);
  const out = join(CACHE, `${name}.png`);
  await page.screenshot({ path: out, fullPage: Boolean(shot.fullPage) });
  await page.close();
  console.log(`captured ${name} -> ${out}`);
};

const names = process.argv.slice(2);
const selected = names.length ? names : Object.keys(SHOTS);
const unknown = selected.filter((n) => !SHOTS[n]);
if (unknown.length) {
  console.error(`Unknown shot(s): ${unknown.join(', ')}. Available: ${Object.keys(SHOTS).join(', ')}`);
  process.exit(1);
}

await mkdir(CACHE, { recursive: true });
const browser = await chromium.launch();
try {
  for (const name of selected) await capture(browser, name, SHOTS[name]);
} finally {
  await browser.close();
}
