const { chromium } = require('@playwright/test');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch({channel:'chrome',headless:true});
 try {
 const page = await browser.newPage({viewport:{width:1440,height:900}});
 const errors=[]; page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.env.TEST_BASE_URL || 'http://localhost:3002',{waitUntil:'domcontentloaded',timeout:120000});
 await page.waitForSelector('.services-sequential',{timeout:90000});
 await page.evaluate(()=>window.scrollTo(0,1400)); await page.waitForTimeout(1200);
 assert.equal(await page.locator('.service-panel').count(),5);
 assert.equal(await page.locator('.pin-spacer').count(),0);
 assert.equal(await page.locator('.services-stage').evaluate(e=>getComputedStyle(e).position),'sticky');
 assert.equal(await page.locator('.services-stage').evaluate(e=>getComputedStyle(e).transform),'none');
 assert.match(await page.locator('.service-visual-identity').textContent(),/cupid/i);
 assert.match(await page.locator('.service-visual-linkedin').textContent(),/Unnity/);
 assert.match(await page.locator('.service-visual-meta').textContent(),/Donmiller/);
 assert.match(await page.locator('.service-visual-identity').textContent(),/XL TO 7XL/);
 assert.match(await page.locator('.service-visual-google').textContent(),/digital marketing agency near me/);
 const assets=await page.evaluate(async()=>Promise.all(['/images/services/donmiller-leather.webp','/images/services/cupid-plus-size.webp'].map(async src=>(await fetch(src)).ok)));
 assert(assets.every(Boolean));
 for(const i of [0,1,2,3,4,2,0]) {
  await page.locator('.services-index a').nth(i).click(); await page.waitForTimeout(900);
  const state=await page.locator('.service-panel').nth(i).evaluate(e=>({opacity:+getComputedStyle(e).opacity,inert:e.inert,top:e.getBoundingClientRect().top,bottom:e.getBoundingClientRect().bottom,bg:getComputedStyle(e.closest('.services-stage')).backgroundColor}));
  assert.equal(state.opacity,1);assert.equal(state.inert,false);assert(state.top>=90 && state.bottom<=innerHeightFallback());
  if(i===4) assert.equal(state.bg,'rgb(42, 22, 80)');
  console.log('Chapter',i+1,'PASS');
  await page.screenshot({path:`node_modules/.cache/services-qa/refined-${i}.png`});
 }
 await page.locator('.services-index a').first().click(); await page.waitForTimeout(100);
 const startingY=await page.evaluate(()=>scrollY);
 await page.evaluate(()=>window.scrollBy(0,150)); await page.waitForTimeout(100);
 assert.equal(await page.locator('.service-panel[data-active="true"]').getAttribute('data-service'),'1');
 assert.equal(await page.locator('.service-panel').nth(1).evaluate(e=>+getComputedStyle(e).opacity),1);
 await page.evaluate(y=>window.scrollTo(0,y),startingY);
 const stableTop=await page.locator('.services-stage').evaluate(e=>e.getBoundingClientRect().top);
 for(let step=0;step<12;step++) {
  await page.evaluate(()=>window.scrollBy(0,12)); await page.waitForTimeout(30);
  const top=await page.locator('.services-stage').evaluate(e=>e.getBoundingClientRect().top);
  assert(Math.abs(top-stableTop)<1, 'Sticky stage must not drift while scrolling');
 }
 await page.locator('.services-index a').first().click(); await page.waitForTimeout(150);
 const art=page.locator('.service-panel').first().locator('svg.service-artwork');
 const frame=await art.screenshot();await page.waitForTimeout(1600);assert(!frame.equals(await art.screenshot()));
 for(const width of [820,390,320]) {
  await page.setViewportSize({width,height:844});await page.waitForTimeout(400);
  assert.equal(await page.locator('.services-sequential').count(),0);
  for(const panel of await page.locator('.service-panel').all()) {await panel.scrollIntoViewIfNeeded();assert.equal(await panel.evaluate(e=>e.inert),false);}
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 }
 await page.setViewportSize({width:1440,height:900});await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(400);
 assert.equal(await page.locator('.services-sequential').count(),0);
 assert.equal(await page.locator('.preview-build').evaluate(e=>getComputedStyle(e).animationName),'none');
 assert.deepEqual(errors,[]);console.log('PASS: reverse scroll, animated preview, responsive layouts, reduced motion, no page errors');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
function innerHeightFallback(){return 905;}
