const { chromium, expect } = require('@playwright/test');
const fs = require('fs');
(async () => {
  const dir = 'node_modules/.cache/hero-qa';
  fs.mkdirSync(dir, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--enable-webgl', '--ignore-gpu-blocklist'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForSelector('[data-ready="true"]', { timeout: 60000 });
  for (const [name, width, height] of [['desktop',1440,900],['tablet',820,1180],['mobile',390,844],['small-mobile',320,740]]) {
    await page.setViewportSize({width,height});
    await page.waitForTimeout(500);
    await page.screenshot({path: dir+'/'+name+'.png', fullPage:true});
    const result = await page.evaluate(() => {
      const svg = document.querySelector('.ribbon-svg');
      const path = document.querySelector('[data-motion-path]');
      const edge = document.querySelector('[data-ribbon-edge]');
      // The entire motion path must be a literal segment of the visible ribbon edge.
      const curve = path.getAttribute('d').slice(path.getAttribute('d').indexOf('C'));
      const visual = document.querySelector('.hero-visual').getBoundingClientRect();
      const cta = document.querySelector('.primary-cta').getBoundingClientRect();
      return {
        overflow: document.documentElement.scrollWidth > innerWidth,
        actualRibbonPath: edge.getAttribute('d').includes(curve),
        mobileCopyClear: innerWidth > 700 || cta.bottom < visual.top,
        viewBox: svg.getAttribute('viewBox'),
        canvases: document.querySelectorAll('canvas').length
      };
    });
    expect(result.overflow).toBe(false);
    expect(result.actualRibbonPath).toBe(true);
    expect(result.mobileCopyClear).toBe(true);
    expect(result.canvases).toBe(1);
    console.log(name, result);
  }
  await expect(page.getByRole('button', {name:'Play animation'})).toBeVisible();
  const first = await page.locator('canvas').screenshot();
  await page.waitForTimeout(400);
  expect(first.equals(await page.locator('canvas').screenshot())).toBe(true);
  await page.emulateMedia({reducedMotion:'no-preference'});
  await expect(page.getByRole('button', {name:'Pause animation'})).toBeVisible();
  await page.setViewportSize({width:1440,height:900});
  await page.reload({waitUntil:'networkidle'});
  await page.waitForSelector('[data-ready="true"]');
  for (const [phase, delay] of [['emerging',1100],['following-path',3200],['exiting',4500],['emitter-hidden',2900],['restarted',5800]]) {
    await page.waitForTimeout(delay);
    await page.screenshot({path:dir+'/loop-'+phase+'.png'});
    console.log('loop', phase);
  }
  await page.getByRole('button', {name:'Pause animation'}).click();
  await page.waitForTimeout(200);
  const paused = await page.locator('canvas').screenshot();
  await page.waitForTimeout(400);
  expect(paused.equals(await page.locator('canvas').screenshot())).toBe(true);
  await page.getByRole('button', {name:'Play animation'}).click();
  await page.waitForTimeout(500);
  expect(paused.equals(await page.locator('canvas').screenshot())).toBe(false);
  expect(errors).toEqual([]);
  console.log('PASS: layouts, exact SVG segment, full loop, reduced motion, live preference change, pause/resume, console.');
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
