const { chromium } = require('@playwright/test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const output = path.join(process.cwd(), 'node_modules/.cache/metro-review');
fs.mkdirSync(output, { recursive: true });

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const widths = process.env.METRO_TEST_WIDTHS ? process.env.METRO_TEST_WIDTHS.split(',').map(Number) : [1440, 820, 390, 320];
    for (const width of widths) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'no-preference' });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => {
        if (message.type() === 'error' && /hydrat|Metro|metro/i.test(message.text())) errors.push(message.text());
      });
      await page.goto(process.env.TEST_BASE_URL || 'http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.evaluate(() => document.fonts.ready);
      const scene = page.locator(`.metro-artwork-${width <= 700 ? 'mobile' : 'desktop'}`);
      await scene.waitFor({ state: 'visible' });
      await page.waitForFunction(selector => document.querySelector(selector)?.dataset.motion === 'true', `.metro-artwork-${width <= 700 ? 'mobile' : 'desktop'}`);
      await page.waitForTimeout(800);
      const section = page.locator('.metro-journey');
      const bounds = await section.evaluate(element => {
        const plane = element.closest('.services-plane');
        const offset = plane ? new DOMMatrix(getComputedStyle(plane).transform).m42 : 0;
        return { top: element.getBoundingClientRect().top + scrollY - offset, height: element.offsetHeight };
      });
      const positions = [];
      for (const progress of [0, .6, 1]) {
        await page.evaluate(({ bounds, progress }) => {
          const start = bounds.top - innerHeight * .65;
          const end = bounds.top + bounds.height - innerHeight * .75;
          window.scrollTo({ top: start + (end - start) * progress, behavior: 'instant' });
        }, { bounds, progress });
        await page.waitForTimeout(1400);
        positions.push(await scene.evaluate(svg => {
          const matrix = svg.querySelector('[data-metro-car="0"]').transform.baseVal.consolidate().matrix;
          return { x: matrix.e, y: matrix.f, reached: svg.querySelectorAll('[data-reached="true"]').length };
        }));
        if (progress === .6) await scene.screenshot({ path: path.join(output, `journey-${width}.png`) });
      }
      assert.ok(positions[2].x > positions[0].x + 200, `Train travels forward at ${width}`);
      assert.ok(positions[1].y > positions[0].y + 50, `Train follows the bend midway at ${width}`);
      assert.ok(positions[2].y > positions[0].y + 150, `Train descends at ${width}`);
      assert.equal(positions[2].reached, 4, `All stations reached at ${width}`);
      assert.ok(positions[0].reached < positions[2].reached, 'Stations reveal progressively');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `No horizontal overflow at ${width}`);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForTimeout(200);
      const staticPose = await scene.locator('[data-metro-car="0"]').getAttribute('transform');
      await page.evaluate(() => window.scrollBy(0, -160));
      await page.waitForTimeout(400);
      assert.equal(await scene.locator('[data-metro-car="0"]').getAttribute('transform'), staticPose, 'Reduced motion freezes the train');
      assert.equal(await scene.locator('[data-reached="true"]').count(), 4, 'Reduced motion shows all stations');
      assert.deepEqual(errors, [], `No hydration or runtime errors at ${width}`);
      console.log(`${width}px: journey, station reveals, reduced motion and overflow passed`, positions);
      await page.close();
    }
    const page = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    await page.goto(process.env.TEST_BASE_URL || 'http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 60000 });
    assert.equal(await page.locator('.metro-artwork-mobile [data-metro-car]').count(), 3);
    assert.equal(await page.locator('.metro-problems li').count(), 4);
    console.log('Server-rendered fallback passed');
    await page.close();
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
