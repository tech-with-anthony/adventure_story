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
const pixelmatchModule = require('pixelmatch'); // v7 is ESM-only; CJS require() yields { default: fn }
const pixelmatch = typeof pixelmatchModule === 'function' ? pixelmatchModule : pixelmatchModule.default;
const { PNG } = require('pngjs');

const GAME_DIR = path.resolve(__dirname, '..');
const PORT = 7777;
const BASE = `http://localhost:${PORT}`;
const SCREENSHOT_DIR = path.join(__dirname, '__screenshots__');
const VISUAL_DIFF_THRESHOLD_PCT = 0.5; // allow up to 0.5% of pixels to differ (font-rendering flakiness)

let passed = 0;
let failed = 0;

function ok(label, condition) {
  if (condition) { console.log('  ✓', label); passed++; }
  else           { console.error('  ✗', label); failed++; }
}

/* ---- Visual regression helpers ---- */

/* Compares a freshly captured PNG buffer against a stored baseline.
 * If no baseline exists yet, the capture becomes the baseline (pass). */
function compareScreenshot(name, buffer) {
  if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  const baselinePath = path.join(SCREENSHOT_DIR, name + '.png');

  if (!fs.existsSync(baselinePath)) {
    fs.writeFileSync(baselinePath, buffer);
    console.log('  ✓ baseline captured:', name);
    passed++;
    return;
  }

  const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
  const current = PNG.sync.read(buffer);

  if (baseline.width !== current.width || baseline.height !== current.height) {
    ok(name + ': screenshot dimensions match baseline (got ' + current.width + 'x' + current.height +
      ', expected ' + baseline.width + 'x' + baseline.height + ')', false);
    return;
  }

  const diff = new PNG({ width: baseline.width, height: baseline.height });
  const numDiffPixels = pixelmatch(
    baseline.data, current.data, diff.data,
    baseline.width, baseline.height,
    { threshold: 0.1 }
  );
  const totalPixels = baseline.width * baseline.height;
  const diffPct = (numDiffPixels / totalPixels) * 100;
  ok(name + ': screenshot within tolerance (' + diffPct.toFixed(3) + '% differs, allowed ' +
    VISUAL_DIFF_THRESHOLD_PCT + '%)', diffPct <= VISUAL_DIFF_THRESHOLD_PCT);
}

/* Waits for webfonts to finish loading, then screenshots + compares. */
async function captureAndCompare(page, name) {
  await page.evaluate(() => document.fonts.ready);
  const buffer = await page.screenshot({ fullPage: false });
  compareScreenshot(name, buffer);
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
      { id: 'valdrath',    file: `${BASE}/stories/valdrath.js`,    category: 'Dark Fantasy',    difficulty: 3 },
      { id: 'fae_court',  file: `${BASE}/stories/fae_court.js`,   category: 'Fae / Fantasy',   difficulty: 2 },
      { id: 'pale_signal', file: `${BASE}/stories/pale_signal.js`, category: 'Cosmic Horror',  difficulty: 4 }
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

/* Valdrath story card uses a curly apostrophe (') in its title */
const VALDRATH_TEXT = "Valdrath’s Keep";

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

/* ---- Story walk: Pale Signal Captain → ending ---- */
async function walkPaleSignal(page) {
  await waitForLibrary(page);
  const signal = page.locator('.story-card').filter({ hasText: 'Pale Signal' });
  await signal.locator('.slot-btn').first().click();

  await waitForSetup(page);
  await clickPrimary(page);
  await page.locator('input[type=text]').fill('Tester');
  await clickPrimary(page);
  await page.locator('.class-card.captain').click();
  await waitForScene(page);

  for (let i = 0; i < 50; i++) {
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
  ok('Pale Signal: captain path reaches an ending (Play Again shown)', onEnding);
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
    /* [1] Library renders all three stories */
    console.log('\n[1] Library renders all three stories');
    {
      const page = await browser.newPage();
      await setupRoutes(page);
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(BASE + '/adventure.html');
      await waitForLibrary(page);

      ok('Three story cards visible', await page.locator('.story-card').count() >= 3);
      ok("Valdrath's Keep card present",
        await page.locator('.story-card', { hasText: VALDRATH_TEXT }).count() > 0);
      ok('Stolen Hours card present',
        await page.locator('.story-card', { hasText: 'Stolen Hours' }).count() > 0);
      ok('Pale Signal card present',
        await page.locator('.story-card', { hasText: 'Pale Signal' }).count() > 0);
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

    /* [9] Go-Back button */
    console.log('\n[9] Go-Back button (one-step undo)');
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
      await page.locator('input[type=text]').fill('BackTest');
      await clickPrimary(page);
      await page.locator('.class-card.fighter').click();
      await waitForScene(page);

      // Make one choice; back button should now appear
      await page.locator('#scene-interact button').first().click();
      await page.waitForTimeout(300);
      const backBtn = page.locator('#scene-interact button.back-btn');
      ok('Go-Back button appears after first choice', await backBtn.isVisible().catch(() => false));

      // Record scene title before going back
      const titleAfter = await page.locator('#scene-title').textContent().catch(() => '');
      await backBtn.click();
      await page.waitForTimeout(300);
      const titleRestored = await page.locator('#scene-title').textContent().catch(() => '');
      ok('Go-Back restores previous scene', titleRestored !== titleAfter && titleRestored !== '');

      await page.close();
    }

    /* [10] Pale Signal: Captain path */
    console.log('\n[10] Pale Signal: Captain → ending');
    {
      const page = await browser.newPage();
      await setupRoutes(page);
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(BASE + '/adventure.html');
      await page.evaluate(() => localStorage.clear());
      await page.reload();
      await walkPaleSignal(page);
      await page.close();
    }

    /* [12] Visual regression (screenshot baselines) */
    console.log('\n[12] Visual regression (screenshot baselines)');
    {
      const viewport = { width: 1280, height: 900 };

      /* Library page */
      {
        const page = await browser.newPage({ viewport });
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await setupRoutes(page);
        page.on('pageerror', e => errors.push(e.message));
        await page.goto(BASE + '/adventure.html');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await waitForLibrary(page);
        await captureAndCompare(page, 'library');
        await page.close();
      }

      /* Setup page (name entry) */
      {
        const page = await browser.newPage({ viewport });
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await setupRoutes(page);
        page.on('pageerror', e => errors.push(e.message));
        await page.goto(BASE + '/adventure.html');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await waitForLibrary(page);
        const card = page.locator('.story-card', { hasText: VALDRATH_TEXT });
        await card.locator('.slot-btn').first().click();
        await waitForSetup(page);
        await clickPrimary(page); // intro -> name entry
        await page.waitForSelector('input[type=text]');
        await captureAndCompare(page, 'setup-name');
        await page.close();
      }

      /* Loaded scene page (default theme) */
      {
        const page = await browser.newPage({ viewport });
        await page.emulateMedia({ reducedMotion: 'reduce' });
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
        await page.locator('input[type=text]').fill('Snapshot');
        await clickPrimary(page);
        await page.locator('.class-card.fighter').click();
        await waitForScene(page);
        await captureAndCompare(page, 'scene-default');
        await page.close();
      }

      /* Scene page under each of the 4 colour themes */
      const themes = ['valdrath', 'parchment', 'void', 'ember'];
      for (const theme of themes) {
        const page = await browser.newPage({ viewport });
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await setupRoutes(page);
        page.on('pageerror', e => errors.push(e.message));
        await page.goto(BASE + '/adventure.html');
        await page.evaluate((t) => {
          localStorage.clear();
          localStorage.setItem('adv_theme', t);
        }, theme);
        await page.reload();
        await waitForLibrary(page);
        ok('Theme "' + theme + '" applied to <html data-theme>',
          (await page.evaluate(() => document.documentElement.dataset.theme)) === theme);

        const card = page.locator('.story-card', { hasText: VALDRATH_TEXT });
        await card.locator('.slot-btn').first().click();
        await waitForSetup(page);
        await clickPrimary(page);
        await page.locator('input[type=text]').fill('Snapshot');
        await clickPrimary(page);
        await page.locator('.class-card.fighter').click();
        await waitForScene(page);
        await captureAndCompare(page, 'scene-theme-' + theme);
        await page.close();
      }
    }

    /* [13] New Game+ epilogue unlock (seeded ending completion) */
    console.log('\n[13] New Game+ epilogue unlock (seeded ending completion)');
    {
      const page = await browser.newPage();
      await setupRoutes(page);
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(BASE + '/adventure.html');
      await page.evaluate(() => {
        localStorage.clear();
        // Seed all 5 real Valdrath ending IDs (isEnding:true, not isEpilogue) as discovered.
        localStorage.setItem('adv_ends_valdrath', JSON.stringify({
          end_heroic:  'The Heroic End',
          end_costly:  'A Costly Victory',
          end_partial: 'Weakened, Not Broken',
          end_defeat:  'Darkness Prevails',
          end_bound:   'Sealed in Stone'
        }));
      });
      await page.reload();
      await waitForLibrary(page);

      const card = page.locator('.story-card', { hasText: VALDRATH_TEXT });
      const epilogueBtn = card.locator('.epilogue-btn');
      ok('Epilogue button appears after all 5 endings recorded',
        await epilogueBtn.isVisible().catch(() => false));

      await epilogueBtn.click();
      await waitForScene(page);

      const title = await page.locator('#scene-title').textContent().catch(() => '');
      ok('Epilogue opens scene with a visible title', title.trim().length > 0);

      const bodyText = await page.locator('#scene-text').textContent().catch(() => '');
      ok('Epilogue scene renders non-empty story text', bodyText.trim().length > 0);

      await page.close();
    }

    /* [15] Choice stats (visit/pick tracking) */
    console.log('\n[15] Choice stats (visit/pick tracking)');
    {
      // Uses the real Go-Back flow (already proven reliable by [9]) rather than
      // seeding localStorage directly, so this exercises recordSceneVisit /
      // recordChoicePick / renderChoices exactly as a real replay would.
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
      await page.locator('input[type=text]').fill('StatsTest');
      await clickPrimary(page);
      await page.locator('.class-card.fighter').click();
      await waitForScene(page);

      // First-ever visit to the opening scene (tavern, 3 choices) — no stats yet.
      const statsBeforeCount = await page.locator('#scene-interact .choice-stat').count();
      ok('No .choice-stat shown on a scene visited for the first time', statsBeforeCount === 0);

      const firstChoiceBtn = page.locator('#scene-interact button').first();
      const firstChoiceLabel = (await firstChoiceBtn.textContent()).trim();
      await firstChoiceBtn.click();
      await page.waitForTimeout(300);

      const backBtn = page.locator('#scene-interact button.back-btn');
      ok('Go-Back button available to return to the first-choice scene',
        await backBtn.isVisible().catch(() => false));
      await backBtn.click();
      await page.waitForTimeout(300);

      const choiceButtons = page.locator('#scene-interact button:not(.back-btn)');
      const totalChoices = await choiceButtons.count();
      const statsAfterCount = await page.locator('#scene-interact .choice-stat').count();
      ok('.choice-stat appears under every choice on a scene\'s second visit',
        totalChoices > 0 && statsAfterCount === totalChoices);

      const pickedBtn = page.locator('#scene-interact button', { hasText: firstChoiceLabel }).first();
      const pickedStatText = (await pickedBtn.locator('.choice-stat').textContent().catch(() => '')).trim();
      ok('Previously-picked choice reports 1 pick out of 2 visits ("' + pickedStatText + '")',
        /\b1\b/.test(pickedStatText) && /\b2\b/.test(pickedStatText));

      const otherBtn = page.locator('#scene-interact button:not(.back-btn)').filter({ hasNotText: firstChoiceLabel }).first();
      const otherStatText = (await otherBtn.locator('.choice-stat').textContent().catch(() => '')).trim();
      ok('An unpicked choice on the same scene reports 0 picks out of 2 visits ("' + otherStatText + '")',
        /\b0\b/.test(otherStatText) && /\b2\b/.test(otherStatText));

      await page.close();
    }

    /* [16] No JS console errors */
    console.log('\n[16] No JS console errors');
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
