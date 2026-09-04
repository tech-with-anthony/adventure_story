/**
 * Playwright/Chromium regression test for adventure_story.
 * Tests: library render, setup flow, scene navigation, save/resume, ending gallery.
 *
 * Run locally (remote dev env):
 *   PLAYWRIGHT_EXEC_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome node tests/browser.test.js
 *
 * Run in CI (GitHub Actions):
 *   node tests/browser.test.js
 */

const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const GAME_DIR = path.resolve(__dirname, '..');
const PORT = 7777;
const BASE = `http://localhost:${PORT}`;

let passed = 0;
let failed = 0;

function ok(label, condition) {
  if (condition) { console.log('  ✓', label); passed++; }
  else           { console.error('  ✗', label); failed++; }
}

/* ---- Minimal HTTP server ---- */
function startServer() {
  return http.createServer((req, res) => {
    let filePath = path.join(GAME_DIR, req.url.split('?')[0]);
    if (filePath.endsWith('/')) filePath += 'adventure.html';
    if (!fs.existsSync(filePath)) { res.writeHead(404); res.end(); return; }
    const ext = path.extname(filePath);
    const mime = {
      '.html': 'text/html', '.js': 'application/javascript',
      '.json': 'application/json', '.css': 'text/css', '.png': 'image/png'
    }[ext] || 'text/plain';
    res.writeHead(200, { 'Content-Type': mime });
    fs.createReadStream(filePath).pipe(res);
  }).listen(PORT);
}

/* ---- Intercept catalog.json so story scripts load from localhost ---- */
async function setupRoutes(page) {
  await page.route('**/catalog.json', route => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([
      { id: 'valdrath',  file: `${BASE}/stories/valdrath.js`,  category: 'Dark Fantasy',   difficulty: 3 },
      { id: 'fae_court', file: `${BASE}/stories/fae_court.js`, category: 'Fae / Fantasy',  difficulty: 2 }
    ])
  }));
}

/* ---- Helpers ---- */
async function waitForLibrary(page) {
  await page.waitForSelector('#page-library.active', { timeout: 10000 });
}
async function waitForSetup(page) {
  await page.waitForSelector('#page-setup.active', { timeout: 8000 });
}
async function waitForScene(page) {
  await page.waitForSelector('#page-scene.active', { timeout: 8000 });
}
async function clickPrimary(page) {
  await page.locator('#page-setup .primary').first().click();
}

/* Valdrath story card uses a curly apostrophe (’) in its title */
const VALDRATH_TEXT = 'Valdrath’s Keep';

/* ---- Story walk: Valdrath Fighter → ending ---- */
async function walkValdrath(page) {
  await waitForLibrary(page);
  const valdrath = page.locator('.story-card').filter({ hasText: VALDRATH_TEXT });
  await valdrath.locator('.slot-btn').first().click();

  await waitForSetup(page);
  await clickPrimary(page);
  await page.locator('input[type=text]').fill('Tester');
  await clickPrimary(page);
  await page.locator('.class-card.fighter').click();
  await waitForScene(page);

  const steps = [
    'Take the Bold Road', 'Fight them off', 'Rush the gate',
    'Fight through', 'Investigate the chapel', 'Study the altar',
    'Descend into the crypt', null, 'Attack directly',
  ];

  for (const step of steps) {
    try {
      if (step) {
        const btn = page.locator('#scene-interact button', { hasText: step }).first();
        const visible = await btn.isVisible({ timeout: 3000 }).catch(() => false);
        if (visible) { await btn.click(); }
        else { await page.locator('#scene-interact button').first().click(); }
      } else {
        await page.locator('#scene-interact button').first().click();
      }
      await page.waitForTimeout(300);
    } catch (e) { /* scene already advanced */ }
  }

  for (let i = 0; i < 15; i++) {
    const ending = await page.locator('#scene-interact button', { hasText: 'Play Again' })
      .isVisible().catch(() => false);
    if (ending) break;
    const btn = page.locator('#scene-interact button').first();
    if (!await btn.isVisible({ timeout: 2000 }).catch(() => false)) break;
    await btn.click();
    await page.waitForTimeout(300);
  }

  const onEnding = await page.locator('#scene-interact button', { hasText: 'Play Again' })
    .isVisible().catch(() => false);
  ok('Valdrath: fighter path reaches an ending (Play Again shown)', onEnding);
  return onEnding;
}

/* ---- Story walk: Fae Court Knight → ending ---- */
async function walkFaeCourt(page) {
  await waitForLibrary(page);
  const fae = page.locator('.story-card').filter({ hasText: 'Stolen Hours' });
  await fae.locator('.slot-btn').first().click();

  await waitForSetup(page);
  await clickPrimary(page);
  await page.locator('input[type=text]').fill('Tester');
  await clickPrimary(page);
  await page.locator('.class-card.knight').click();
  await waitForScene(page);

  for (let i = 0; i < 35; i++) {
    const ending = await page.locator('#scene-interact button', { hasText: 'Play Again' })
      .isVisible().catch(() => false);
    if (ending) break;
    const btn = page.locator('#scene-interact button').first();
    if (!await btn.isVisible({ timeout: 2000 }).catch(() => false)) break;
    await btn.click();
    await page.waitForTimeout(250);
  }

  const onEnding = await page.locator('#scene-interact button', { hasText: 'Play Again' })
    .isVisible().catch(() => false);
  ok('Fae Court: knight path reaches an ending (Play Again shown)', onEnding);
  return onEnding;
}

/* ---- Main ---- */
(async () => {
  const server = startServer();

  const launchOpts = { args: ['--no-sandbox', '--disable-dev-shm-usage'] };
  if (process.env.PLAYWRIGHT_EXEC_PATH) {
    launchOpts.executablePath = process.env.PLAYWRIGHT_EXEC_PATH;
  }
  const browser = await chromium.launch(launchOpts);
  const errors = [];

  try {
    /* [1] Library renders both stories */
    console.log('\n[1] Library renders both stories');
    {
      const page = await browser.newPage();
      await setupRoutes(page);
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(BASE + '/adventure.html');
      await waitForLibrary(page);

      ok('Two story cards visible', await page.locator('.story-card').count() >= 2);
      ok("Valdrath’s Keep card present",
        await page.locator('.story-card', { hasText: VALDRATH_TEXT }).count() > 0);
      ok('Stolen Hours card present',
        await page.locator('.story-card', { hasText: 'Stolen Hours' }).count() > 0);
      await page.close();
    }

    /* [2] Setup flow */
    console.log('\n[2] Setup flow (name + class picker)');
    {
      const page = await browser.newPage();
      await setupRoutes(page);
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(BASE + '/adventure.html');
      await waitForLibrary(page);

      const card = page.locator('.story-card', { hasText: VALDRATH_TEXT });
      await card.locator('.slot-btn').first().click();
      await waitForSetup(page);
      ok('Setup page shown after Begin Adventure', true);

      await clickPrimary(page);
      ok('Name input appears', await page.locator('input[type=text]').isVisible());

      const continueBtn = page.locator('#page-setup button.primary');
      ok('Continue disabled with empty name', await continueBtn.isDisabled());

      await page.locator('input[type=text]').fill('Aria');
      ok('Continue enabled after name entered', await continueBtn.isEnabled());
      await continueBtn.click();

      ok('Class cards rendered', await page.locator('.class-card').count() === 4);
      await page.locator('.class-card.fighter').click();
      await waitForScene(page);
      ok('Scene page shown after class chosen', true);

      const badge = await page.locator('#class-badge').textContent();
      ok('Class badge shows Fighter', badge.includes('Fighter'));
      await page.close();
    }

    /* [3] Valdrath full path */
    console.log('\n[3] Valdrath: Fighter → ending');
    {
      const page = await browser.newPage();
      await setupRoutes(page);
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(BASE + '/adventure.html');
      await page.evaluate(() => localStorage.clear());
      await page.reload();
      await walkValdrath(page);
      await page.close();
    }

    /* [4] Save / Resume */
    console.log('\n[4] Save / Resume');
    {
      const page = await browser.newPage();
      await setupRoutes(page);
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(BASE + '/adventure.html');
      await page.evaluate(() => localStorage.clear());
      await page.reload();
      await waitForLibrary(page);

      const card = page.locator('.story-card', { hasText: VALDRATH_TEXT });
      await card.locator('.slot-btn').first().click();
      await waitForSetup(page);
      await clickPrimary(page);
      await page.locator('input[type=text]').fill('SaveTest');
      await clickPrimary(page);
      await page.locator('.class-card.wizard').click();
      await waitForScene(page);

      for (let i = 0; i < 3; i++) {
        await page.locator('#scene-interact button').first().click();
        await page.waitForTimeout(300);
      }

      const saveExists = await page.evaluate(() =>
        !!Object.keys(localStorage).find(k => k.startsWith('adv_save_'))
      );
      ok('Save written to localStorage after scene transitions', saveExists);

      await page.goto(BASE + '/adventure.html');
      await waitForLibrary(page);

      const continueBtn = page.locator('.story-card', { hasText: VALDRATH_TEXT })
        .locator('.slot-btn.slot-filled').first();
      ok('Continue button appears after reload', await continueBtn.isVisible());

      await continueBtn.click();
      await waitForScene(page);
      ok('Continue resumes directly to scene page', true);
      await page.close();
    }

    /* [5] Ending gallery */
    console.log('\n[5] Ending gallery');
    {
      const page = await browser.newPage();
      await setupRoutes(page);
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(BASE + '/adventure.html');
      await page.evaluate(() => localStorage.clear());
      await page.reload();

      const reached = await walkValdrath(page);
      if (reached) {
        await page.locator('#scene-interact button', { hasText: 'Play Again' }).click();
        await waitForLibrary(page);

        const endingsText = await page.locator('.story-card', { hasText: VALDRATH_TEXT })
          .locator('.story-card-endings').textContent().catch(() => '');
        ok('Endings discovered line shown on library card', endingsText.includes('endings discovered'));
        ok('At least 1 ending recorded', /^[1-9]/.test(endingsText.trim()));
      } else {
        ok('Endings gallery (skipped — path did not reach ending)', false);
        ok('At least 1 ending recorded (skipped)', false);
      }
      await page.close();
    }

    /* [6] Fae Court knight path */
    console.log('\n[6] Fae Court: Knight → ending');
    {
      const page = await browser.newPage();
      await setupRoutes(page);
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(BASE + '/adventure.html');
      await page.evaluate(() => localStorage.clear());
      await page.reload();
      await walkFaeCourt(page);
      await page.close();
    }

    /* [7] Play Again resets state */
    console.log('\n[7] Play Again resets state');
    {
      const page = await browser.newPage();
      await setupRoutes(page);
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(BASE + '/adventure.html');
      await page.evaluate(() => localStorage.clear());
      await page.reload();

      const reached = await walkValdrath(page);
      if (reached) {
        await page.locator('#scene-interact button', { hasText: 'Play Again' }).click();
        await waitForLibrary(page);
        ok('Play Again returns to library', true);

        const saveGone = await page.evaluate(() =>
          !Object.keys(localStorage).some(k => k.startsWith('adv_save_'))
        );
        ok('Save cleared after Play Again', saveGone);

        const badge = await page.locator('#class-badge').textContent();
        ok('Class badge cleared', badge.trim() === '');
      } else {
        ok('Play Again resets (skipped — path did not reach ending)', false);
        ok('Save cleared after Play Again (skipped)', false);
        ok('Class badge cleared (skipped)', false);
      }
      await page.close();
    }

    /* [8] No JS console errors */
    console.log('\n[8] No JS console errors');
    ok('No uncaught JS errors across all tests', errors.length === 0);
    if (errors.length) errors.forEach(e => console.error('   Error:', e));

  } finally {
    await browser.close();
    server.close();
  }

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`Results: ${passed} passed, ${failed} failed`);
  if (failed > 0) process.exit(1);
})();
