# CLAUDE.md — adventure_story

## Project Overview

`adventure_story` is a "Choose Your Own Adventure" interactive story game with DnD-style class mechanics. It is a static browser application (no build step, no server). It currently has three stories — "The Curse of Valdrath's Keep" (dark fantasy, 4 classes), "The Court of Stolen Hours" (fae fantasy, 4 classes), and "The Pale Signal" (cosmic horror, 4 classes) — each with class-mechanical choices, flag-based state, and four distinct endings. New stories can be added to GitHub Pages without an app update via the remote catalog system.

## Current Status (as of last session)

**Branch: `main`** — all current work is on main and deployed to GitHub Pages.

### What was built

The project was refactored from a single `adventure.html` file into three files, and the complete story was written from scratch:

- **`adventure.html`** — HTML shell + full dark-fantasy CSS
- **`engine.js`** — Full game engine (IIFE, state machine, class gates, flag system)
- **`story-data.js`** — 71 scenes across 3 acts with 4 endings (~1,150 lines)

### What was tested and fixed (second session)

All four class paths and all four endings were tested end-to-end via automated browser driving (Chrome DevTools Protocol). **179 checks passed, 0 failures.**

Paths confirmed working:
- Fighter → Heroic (bold road, gate rush, hall fight, seal trial, `boss_fighter`)
- Rogue → Heroic (wise road, postern, library, throne flank, mechanism puzzle, `boss_phylactery`)
- Cleric → Heroic (equipped road, turn undead, altar reconsecrate, sunburst puzzle, `boss_cleric`)
- Wizard → Heroic (wise road, postern, wizard library exclusive scene, throne parley, rune puzzle, `boss_cunning`)
- `end_defeat`, `end_partial`, `end_costly` all confirmed reachable and distinct

Two bugs found and fixed (commit `fbfbed3`):
1. **Stale class badge** — `startGame()` now clears the badge element on reset so it doesn't persist on the hidden scene page.
2. **`end_defeat` unreachable** — `boss_direct` now routes to `end_defeat` when neither `has_phylactery` nor `seal_solved` is set (no preparation at all). `end_partial` now requires `seal_solved`. New defeat-branch narration added.

### What was completed (third session)

- **Mobile layout verified** — simulated 420px viewport in Chrome; class picker stacks to 1-column, choice buttons full-width, text clean. No issues found.
- **Standalone bundle** — `adventure_standalone.html` created (single self-contained file, all JS inlined, ~84KB). Uploaded to Google Drive and shared.
- **App icon** — 1024×1024 PNG generated via Canvas API (dark castle, green glowing windows, gold border). Downsized to 512×512 and 192×192 via Pillow.
- **PWA** — `manifest.json` + `sw.js` added; service worker caches core assets for offline use. Meta tags (`theme-color`, `manifest`, `apple-touch-icon`) added to `adventure.html`.
- **Capacitor Android** — Capacitor 8 wired up (`capacitor.config.json`, `android/` platform). `npm run build` copies game files to `www/`; `npm run sync` syncs to Android assets. Debug APK successfully built (4.9MB) via Android Studio.
- **Credit line removed** — "Anthony Woodward — CIS110" removed from all HTML files and CSS.

### What was completed (fourth session)

- **GitHub Pages deployed** — game is live at `https://tech-with-anthony.github.io/adventure_story/adventure.html`.
- **Root URL redirect** — `index.html` added with `<meta http-equiv="refresh">` so the root path redirects to `adventure.html`. The game is accessible at `https://tech-with-anthony.github.io/adventure_story/`.

### What was completed (fifth session)

- **README written** — `README.md` fully written with game description, live URL, how to run locally, project layout, and class descriptions.
- **Catalog system built** — story loading refactored from a single `window.STORY` global to a dynamic catalog:
  - `catalog.js` — defines `window.STORY_CATALOG` (array of `{ id, file, category, difficulty }` entries) and is the only registry of available stories
  - `stories/valdrath.js` — the Valdrath's Keep story, now registered via `window.STORIES` (plural) by pushing an entry with `title`, `blurb`, `classes`, and `story` fields
  - `engine.js` — `loadCatalogStories()` replaces the direct `startGame()` call; dynamically injects `<script>` tags from the catalog; `window.STORIES` drives the library picker; `state.story` holds the selected story; all scene/class lookups go through `state.story.story` and `state.story.classes`
  - `adventure.html` — now loads `catalog.js` then `engine.js` (not `story-data.js`)
  - `sw.js` — cache bumped to `adventure-stories-v2`; assets updated to include `/catalog.js` and `/stories/valdrath.js` instead of `/story-data.js`
- **First class prose pass** — 9 scenes in `stories/valdrath.js` received `function(s)` paragraphs to differentiate class experience: `boss_fighter`, `boss_direct`, `boss_ritual`, `boss_phylactery`, `boss_cunning` (all five boss approach scenes), plus selected Act I/II scenes.

### What was completed (sixth session)

Full class-differentiation pass across the entire story. Goal: every class should *feel* different, not just route differently.

**Dramatic peaks** — `function(s)` paragraphs inserted at the two most important observation moments:
- `keep_hall` — after the green-light paragraph, each class reads the space differently: fighter maps choke points, wizard identifies a binding lattice in the stonework, rogue counts exits, cleric feels the weight of the denied dead
- `crypt_descent` — as first paragraph (strongest position): fighter knows the wrong silence, wizard dates the construction, rogue realizes the defenses all face *inward*, cleric feels the original blessing underneath the corruption
- `boss_approach` — second paragraph: Malachar's opening address is class-specific (bored scorn at the fighter, evaluating curiosity at the wizard, amused theatrics at the rogue, visible unease at the cleric)
- `end_heroic` — final paragraph replaced with 4 class variants: fighter reflects on the soldier's cost; wizard goes back for the library; rogue counts a reward that turns out not to matter; cleric stays to speak burial rites over those who never received them

**Choice label text** — `engine.js` extended to support `function(s)` for `choice.text` (via `resolveText()` helper in `renderChoices`). Four choices updated:
- `keep_hall` wing choices — all three destination choices (library, armory/chapel, throne approach) now show class-specific action labels
- `boss_approach` attack choice — each class names their signature action (fighter: charges; wizard: drives a lance of force; rogue: goes for the throat; cleric: raises the holy symbol)

**Corridor one-liners** — brief atmospheric paragraphs appended to five transitional scenes to ground each moment in physical detail:
- `road_bold_flee` — the Thornwood fog swallowing the road behind you
- `road_wise_ignore` — first sight of the keep against the darkening sky
- `keep_gate` — the smell of the approach, what the gate looks like up close
- `keep_side_entry` — the dark of the servant's corridor, what the silence sounds like
- `crypt_entrance` — the cold that rises before the stairs do

**Boss fight prose** — all five boss approach scenes had class-specific `function(s)` paragraphs (confirmed already written in the fifth-session pass). Scenes: `boss_fighter`, `boss_direct`, `boss_ritual`, `boss_phylactery`, `boss_cunning`.

**NPC reactions** — the three named NPCs now respond differently by class:
- `road_wise_help` (Ewen the survivor) — after pressing the key into the player's hands: fighter gets a rope-thrown-to-drowning look, wizard gets a look of unease (they look like the keep), rogue gets the key held a moment longer than necessary, cleric gets wordless relief with both hands around theirs
- `keep_ghost_default` — the ghost's reaction on first sight: fighter's weapon arm almost fires before processing what they're seeing, wizard flinches away (aversion, not absence), rogue gets complete non-registration (worse than being stared through); the cleric version was already class-specific and left intact

### What was completed (seventh session)

- **Save / resume** — `localStorage`-backed progress save on every scene transition. Library card shows **Continue** + **New Game** when a save exists, or **Begin Adventure** for fresh starts. "Play Again" clears the save via `startGame()`.
  - `saveKey(id)` / `endsKey(id)` — localStorage key helpers
  - `getSave(id)` / `getEndings(id)` — read helpers (try/catch for private-mode safety)
  - `saveProgress(sceneId)` — writes name, charClass, flags, history, sceneId to localStorage
  - `resumeStory(entry, save)` — restores state and jumps directly to the saved scene
  - `clearSave(id)` — removes the save key; called by `startGame()`
- **Ending gallery** — `recordEnding(sceneId, title)` tracks which `isEnding` scenes have been reached per story (stored under `endsKey`). Library card shows "N of M endings discovered" below the action buttons. `countEndingScenes(scenes)` counts total ending scenes.
- **Library card restructure** — card changed from `<button>` to `<div>` (nested `<button>` inside `<button>` is invalid HTML). Action buttons moved into `.story-card-actions`. CSS additions in `adventure.html`: `.story-card-actions`, `.story-card-endings`.
- **Remote catalog (Option 2)** — engine now fetches `catalog.json` from GitHub Pages at launch and loads story scripts from absolute URLs. Falls back to bundled `catalog.js` offline.
  - `catalog.json` — remote catalog with absolute GitHub Pages URLs (new root-level file)
  - `injectStoryScripts(catalog)` — extracted from old `loadCatalogStories()`; injects `<script>` tags, calls `showLibrary()` when all loaded
  - `loadCatalogStories()` — fetches remote `catalog.json` first; on network failure falls back to `window.STORY_CATALOG` (bundled `catalog.js`)
  - `sw.js` — bumped to `adventure-stories-v3` + `adventure-stories-dynamic-v1`; network-first for `catalog.json`; cache-first + store for remote story scripts
- **New custom agents**
  - `.claude/agents/fantasy-storyteller.md` — specialist for DnD/fantasy interactive fiction; covers fae/dark-fantasy voice, class differentiation rules, engine format conventions, choice writing, NPC dialogue, and scene writing checklist
  - `.claude/agents/content-editor.md` — grammar and coherence reviewer for stories, papers, and essays; preserves author voice; adapts focus for fiction vs. academic writing
- **Second story: "The Court of Stolen Hours"** (`stories/fae_court.js`, id `fae_court`)
  - Fae fantasy: sibling stolen by the Thornweave, Lord of the Twilight Court
  - 4 classes: Knight (Iron & Will), Bard (Song & Story), Witch (Old Pacts), Changeling (Twilight Blood)
  - ~68 scenes across 3 acts, 4 endings (`end_heroic`, `end_bargain`, `end_partial`, `end_lost`)
  - 29 `function(s)` paragraphs — same density as valdrath.js (~1/3 of scenes); class differentiation at boss approach, all endings, NPC reactions, hub choices
  - Written via pipeline: game-developer (draft) → fantasy-storyteller (class differentiation pass) → content-editor (grammar + coherence) → manual coherence fixes
  - `test_story.js` removed (was used to verify remote catalog; no longer needed)
  - `catalog.json` updated with `fae_court` entry pointing to GitHub Pages URL

### What was completed (eighth session)

- **CI/CD** — `.github/workflows/test.yml` added; Playwright/Chromium test runs on every push to main. `package.json` updated with `playwright` devDependency and `test` script. `tests/browser.test.js` written with 8 test groups (23 checks): library render, setup flow, Valdrath fighter path, save/resume, ending gallery, Fae Court knight path, Play Again reset, no JS errors.
- **Atmospheric audio** — `audio.js` added (Web Audio API ambient soundscapes, no audio files). Valdrath gets bass drone + wind noise + distant chains; Fae Court gets shimmer oscillators + wind + bell tones. Mute toggle persists in localStorage. All engine calls guarded with `window.AudioEngine &&`. `sw.js` bumped to `v5` + audio.js added to static cache.
- **Achievement system** — `adv_achievements_<id>` in localStorage. 12 achievements per story (5 ending-based, 4 class-specific, 3 exploration). Collapsible panel on each library card ("3 of 12 achievements"). `achievements.js` defines per-story achievement specs; engine hooks `checkAchievements()` on every `loadScene()` call.

### What was completed (ninth session)

- **Engine & UI upgrades (PR #11)**:
  - **2 save slots per story** — `adv_save_<id>_1` / `adv_save_<id>_2`; slot buttons (`.slot-btn`) with character name + class + scene count replace the old `button.primary` on library cards; empty slots show "New Game", filled slots show character info + "Delete" button
  - **Typewriter mode** — paragraph-by-paragraph reveal at 850ms delay; click anywhere to skip to full text; toggle in settings panel persists in localStorage (`adv_typewriter`)
  - **Journey history panel** — collapsible "Journey So Far" below each scene listing visited scene titles; `state.history` tracks IDs; `historyEl` rendered after each `loadScene`
  - **Font size toggle** — 3 levels (small/medium/large) via `html[data-fontsize="..."]`; persists in localStorage (`adv_fontsize`)
  - **4 colour themes** — Valdrath (default dark fantasy), Parchment (sepia), Void (deep space), Ember (warm orange); `html[data-theme="..."]`; persists in localStorage (`adv_theme`)
  - **Settings panel** — gear icon (⚙) in fixed corner opens a slide-in panel with all four toggles
  - Tests updated to use `.slot-btn` selectors; all 23 checks pass
- **Third story: "The Pale Signal"** (`stories/pale_signal.js`, id `pale_signal`)
  - Cosmic horror: 1923 lighthouse, keeper vanished, anomalous signal from the deep
  - 4 classes: Captain (Authority & Navigation), Engineer (Mechanics & Grit), Radioman (Signals & Pattern), Naturalist (Observation & Record)
  - 53 scenes across 3 acts, 4 endings (`end_sealed`, `end_broadcast`, `end_recorded`, `end_consumed`)
  - Class-exclusive scenes: `radio_intercept` (Radioman), `engine_repair` (Engineer, required for `destroy_engineer` path)
  - Key flags: `has_journal`, `knows_signal`, `cave_reached`, `found_keeper`, `engine_running`
  - Registered in `catalog.json` + `catalog.js`; added to `sw.js` static cache (`v7`)
- **Standalone bundle** — `adventure_standalone.html` regenerated (~361KB) with all three stories + audio inlined

### What was completed (tenth session)

- **Go-Back button (PR #12)** — one-step undo for any choice. Before each `applyChoice`, the engine pushes a snapshot `{sceneId, flags, history}` onto `state.snapshots`. After `renderChoices`, a "← Go Back" button appears (dashed border, reduced opacity) that pops the snapshot and calls `loadScene(snap.sceneId)`. Snapshots are session-only — not saved to localStorage. Cleared on `startGame` and `resumeStory`. `null`-filtering added to paragraph resolution so `function(s)` paragraphs can return `null` to be skipped (used by new conditional paragraphs in fae_court and pale_signal).
- **Prose consistency fixes (PR #12)** — nine scenes audited and corrected across all three stories:
  - `valdrath.js` `boss_cunning`: paragraph 1 split into `function(s)` — rogue sees "the wight showed you" (silent gesture); others see "the wight told you"; rogue switch branch updated to reference the wight's silence, not instructions
  - `fae_court.js` `road_ignore_mortal`: opening verb corrected (player stopped in both arrival paths, not walked past)
  - `fae_court.js` `sibling_search`: false "confirmed twice" count removed
  - `fae_court.js` `archive_true_name`: librarian-directed prose rewritten to neutral; works for both normal and forced-access paths
  - `fae_court.js` `boss_final_choice`: opening paragraph now `function(s)` — players without leverage flags see "still standing, not nothing" instead of the false "disadvantaged" claim
  - `fae_court.js` `end_heroic`: paragraphs 1–4 conditional — `has_true_name`-only players (no `knows_weakness`) see the banishment-name sequence; `knows_weakness` players see the original endings-speech; `null` returns skip inapplicable lines
  - `pale_signal.js` `cave_depths`: removed "as you already knew there would be" from seventeenth-element sentence
  - `pale_signal.js` `confrontation_hub`: paragraph 2 (men in chamber) `function(s)`-gated by `found_keeper`; paragraph 3 (eighteenth element) gated by radioman class or `found_keeper`
  - `pale_signal.js` `broadcast_engineer`: paragraph 2 `function(s)` — `engine_running` flag controls whether the engine is described as already running or cold
- **Service worker cache bumped to v8 (PR #13)** — ensures all browsers (including Firefox) discard the cached pre-Go-Back `engine.js`

### What was completed (eleventh session)

- **Pale Signal ambient audio (PR #14)** — `startPaleSignal` added to `audio.js`; three-layer procedural soundscape:
  - Layer 1: deep ocean drone — two sine oscillators at 28Hz and 42Hz through a lowpass filter (80Hz cutoff), with a slow 0.04Hz LFO on gain (25-second "breathing" cycle)
  - Layer 2: AM radio static — white noise through a bandpass filter at 1800Hz (Q=2.0), gain 0.025; period-appropriate for 1923 shortwave equipment
  - Layer 3: signal pulses — 47Hz sine bursts (echoing the story's forty-seven second motif), 1.8s duration, every 15–25s; gain envelope: 0.3s ramp-up, exponential decay
  - `pale_signal: startPaleSignal` wired into the `STARTERS` map alongside valdrath and fae_court
- **Go-Back button implementation** — the engine changes from PR #12 were committed to the current branch; also confirmed that `null`-filtering of `function(s)` paragraph returns was added to `engine.js` at the same time
- **Test suite expanded to 27 checks (PR #14)**:
  - `pale_signal` added to the mock catalog in `setupRoutes`
  - Check [1] updated to verify all three story cards (≥3 cards, Pale Signal card present)
  - New [9] Go-Back button test (2 checks: button appears after first choice; click restores previous scene title)
  - New [10] Pale Signal captain path (1 check: reaches an ending)
  - Check numbering shifted: old [8] JS errors moved to [11]; all 27 checks pass

### What still needs to happen — NEXT SESSION

1. **Release APK** — debug APK is sideloadable but for Play Store distribution, a signed release APK is needed (`Build → Generate Signed Bundle / APK` in Android Studio, requires a keystore).
2. **Custom Android icon** — Capacitor uses generic launcher icons by default. Replace with the Valdrath's Keep icon via Android Studio's Image Asset tool (`res/mipmap-*`).

---

## Running the Project

Open `adventure.html` directly in any modern web browser. No server, build tool, or package manager is needed.

```
open adventure.html        # macOS
xdg-open adventure.html    # Linux
start adventure.html       # Windows
```

The game is also available online at:
`https://tech-with-anthony.github.io/adventure_story/`

The only external resource is Google Fonts (Cinzel, EB Garamond) loaded from a CDN; the game functions without it if offline (system serif fonts are used as fallback).

## Repository Structure

```
adventure_story/
├── adventure.html           # HTML shell + all CSS
├── adventure_standalone.html# Self-contained single-file bundle (~361KB, all stories inlined)
├── catalog.js               # Bundled story registry (window.STORY_CATALOG) — offline fallback
├── catalog.json             # Remote story registry with absolute GitHub Pages URLs
├── engine.js                # Game engine: setup, scene rendering, state, persistence, class gates
├── audio.js                 # Web Audio API ambient soundscapes (no audio files)
├── stories/
│   ├── valdrath.js          # "The Curse of Valdrath's Keep" — 71 scenes, 3 acts, 4 endings
│   ├── fae_court.js         # "The Court of Stolen Hours" — ~68 scenes, 3 acts, 4 endings
│   └── pale_signal.js       # "The Pale Signal" — 53 scenes, 3 acts, 4 endings (cosmic horror)
├── story-data.js            # Legacy single-story file (superseded by stories/valdrath.js)
├── tests/
│   └── browser.test.js      # Playwright/Chromium regression tests (27 checks)
├── .github/
│   └── workflows/
│       └── test.yml         # CI: runs npm test on every push to main
├── .claude/
│   └── agents/
│       ├── fantasy-storyteller.md  # DnD/fantasy interactive fiction specialist
│       └── content-editor.md       # Grammar and coherence reviewer
├── index.html               # Root redirect → adventure.html (for GitHub Pages)
├── manifest.json            # PWA manifest
├── sw.js                    # Service worker (offline cache, v7 + dynamic cache)
├── icon-1024.png            # App icon source
├── icon-512.png             # PWA icon (512×512)
├── icon-192.png             # PWA icon (192×192)
├── capacitor.config.json    # Capacitor Android config
├── package.json             # npm scripts + playwright devDependency
├── android/                 # Capacitor Android project
├── CLAUDE.md                # This file
└── README.md                # Project description with live URL
```

`adventure.html` loads the scripts in dependency order:
```html
<script src="catalog.js"></script>   <!-- defines window.STORY_CATALOG -->
<script src="audio.js"></script>     <!-- defines window.AudioEngine -->
<script src="engine.js"></script>    <!-- starts the game, loads stories from catalog -->
```

## Architecture

### HTML + CSS (`adventure.html`)

Three `<section>` elements; only one is visible at a time via `.page.active`:

| ID | Purpose |
|----|---------|
| `#page-library` | Story picker — grid of story cards |
| `#page-setup` | Character creation (name + class picker) |
| `#page-scene` | All story content — populated dynamically by the engine |

CSS highlights:
- CSS custom properties on `:root` control the dark-fantasy color scheme (`--bg-panel`, `--green`, `--gold`, `--arcane`, etc.)
- `html[data-theme="valdrath|parchment|void|ember"]` — 4 colour themes; default `valdrath` is dark fantasy
- `html[data-fontsize="small|medium|large"]` — 3 font size levels
- `.passage` + `@keyframes rise` handles animated paragraph entry
- `.class-badge` chips show the player's class throughout the game
- `.class-card` / `.class-grid` styles the 2×2 class picker in setup
- `.choices-col` stacks story choice buttons vertically with left-aligned text
- `.story-card` / `.story-grid` styles the library picker (card is a `<div>`, not `<button>`)
- `.slot-btn` — save-slot buttons on library cards (`.slot-empty` / `.slot-filled`)
- `.story-card-actions` — flex row of slot buttons
- `.story-card-endings` — gold italic "N of M endings discovered" line
- `.history-panel` / `.history-list` — collapsible "Journey So Far" beneath each scene
- `#settings-panel` — slide-in settings drawer (typewriter, theme, font size toggles)
- `@media (prefers-reduced-motion)` disables animations

### Game Engine (`engine.js`)

Wrapped in an IIFE with `"use strict"`. Single closure-level state object:

```js
var state = {
  name: "",          // player name from setup
  charClass: "",     // "fighter" | "wizard" | "rogue" | "cleric"
  flags: {},         // persistent boolean flags set by choices
  history: [],       // visited scene IDs
  story: null        // selected story entry from window.STORIES
};
```

**Key functions:**

| Function | Purpose |
|----------|---------|
| `loadCatalogStories()` | Fetches remote `catalog.json`; falls back to `window.STORY_CATALOG` on failure; calls `injectStoryScripts()` |
| `injectStoryScripts(catalog)` | Injects `<script>` tags from catalog entries; calls `showLibrary()` when all loaded |
| `showLibrary()` | Renders the story-picker grid from `window.STORIES` |
| `selectStory(entry)` | Stores `state.story`, shows setup page |
| `resumeStory(entry, save)` | Restores saved state (name, class, flags, history) and jumps to saved scene |
| `startGame()` | Clears save for current story, resets state, returns to library |
| `showSetupIntro()` → `askName()` → `askClass()` | Sequential setup flow |
| `beginStory()` | Sets class badge, calls `loadScene(state.story.story.start)` |
| `loadScene(id)` | Looks up scene in `state.story.story.scenes`, renders header + paragraphs + choices; saves progress or records ending |
| `renderChoices(choices, prompt)` | Filters visible choices, renders buttons or a Continue button |
| `resolveText(choice)` | Resolves `choice.text` as string or `fn(state)→string` |
| `resolveNext(next)` | Resolves `next` as string, `{class: id, default: id}` object, or `fn(state)→id` |
| `applyChoice(choice)` | Sets `setsFlag` if present, then calls `loadScene(resolveNext(...))` |
| `saveProgress(sceneId)` | Writes current state to localStorage under `adv_save_<id>` |
| `recordEnding(sceneId, title)` | Adds ending to `adv_ends_<id>` in localStorage; removes save key |
| `getSave(id)` / `getEndings(id)` | Read localStorage; return null/`{}` on error (private-mode safe) |
| `clearSave(id)` | Removes save key from localStorage |
| `countEndingScenes(scenes)` | Counts scenes with `isEnding: true` for the "N of M endings" display |
| `addP` / `addPs` / `clearInteract` / `renderContinue` | DOM utility helpers |

### Story Registry (`catalog.json` + `catalog.js` + `stories/*.js`)

`catalog.json` (root) is the **remote catalog** fetched by the engine at launch. It uses absolute GitHub Pages URLs so the app loads story scripts from the web even when running from an APK WebView:

```json
[
  { "id": "valdrath", "file": "https://tech-with-anthony.github.io/adventure_story/stories/valdrath.js", "category": "Dark Fantasy", "difficulty": 3 },
  { "id": "fae_court", "file": "https://tech-with-anthony.github.io/adventure_story/stories/fae_court.js", "category": "Fae / Fantasy", "difficulty": 2 }
]
```

`catalog.js` is the **offline fallback** — still loaded by `adventure.html` before `engine.js`. If the remote fetch fails, `loadCatalogStories()` uses `window.STORY_CATALOG` instead:

```js
window.STORY_CATALOG = [
  { id: "valdrath", file: "stories/valdrath.js", category: "Dark Fantasy", difficulty: 3 }
];
```

Each story file pushes an entry onto `window.STORIES` (which the engine reads to build the library):

```js
window.STORIES = window.STORIES || [];
window.STORIES.push({
  title:   "The Curse of Valdrath's Keep",
  blurb:   "...",
  classes: [ { id, name, tag, desc }, ... ],
  story:   { start: "tavern", scenes: { ... } }
});
```

**Scene object shape:**

```js
"scene-id": {
  chapter:      "Act I — The Call",        // shown above the panel
  title:        "The Rusty Flagon",         // h1 in scene header
  location:     "Thornwall — Merchant Quarter",  // italic subheader
  choicePrompt: "How do you respond?",     // optional; defaults to "What do you do?"
  isEnding:     true,                       // optional; replaces choices with "Play Again"
  paragraphs: [
    "Static string paragraph.",
    function (s) { return "Dynamic: " + s.name + " the " + s.charClass; }
  ],
  choices: [ ... ]
}
```

**Choice object shape:**

```js
{
  text:         "Draw your weapon and stand your ground.",
  // text:      function(s) { return s.charClass === "fighter" ? "Charge." : "Attack."; },
  next:         "scene_id",               // string, or...
  // next:      { fighter: "scene_a", default: "scene_b" },  // class-branch
  // next:      function(s) { return s.flags.has_key ? "scene_a" : "scene_b"; }, // flag-branch
  onlyFor:      ["wizard"],               // optional: hide from other classes
  requiresFlag: "has_postern_key",        // optional: hide until flag is set
  setsFlag:     "entered_quietly"         // optional: sets a flag when chosen
}
```

## Game Flow

```
loadCatalogStories()  ← fetches catalog.json (GitHub Pages); fallback: window.STORY_CATALOG
  └─ injectStoryScripts(catalog)
       └─ showLibrary() → selectStory()  OR  resumeStory() [if save exists]
            └─ showSetupIntro() → askName() → askClass()
                 └─ beginStory() → loadScene(story.story.start)
                      └─ saveProgress(sceneId)
                      └─ renderChoices() → applyChoice()
                           └─ loadScene(nextId)   [repeat until isEnding]
                                └─ recordEnding(sceneId, title)
                                └─ renderContinue("Play Again", startGame)
                                     └─ startGame() → clearSave() → showLibrary()
```

## Class System

Four playable classes with mechanical effects:

| Class | Mechanical advantages |
|-------|-----------------------|
| **Fighter** | Combat choices route to clean-win variants; can force entry at the gate |
| **Wizard** | Exclusive library research scene with phylactery details; can study the gate wards |
| **Rogue** | Exclusive trap detection and flank maneuver; throne room parley with better outcome |
| **Cleric** | Can turn undead, reconsecrate the altar (boosts final boss fight), and communicate with the ghost |

Class differentiation is implemented at three levels:
- **Routing**: `onlyFor: ["className"]` on choices hides options from other classes; `next: { fighter: "scene_a", default: "scene_b" }` routes different classes to different scenes
- **Prose**: `function(s)` paragraphs in `paragraphs[]` return class-specific text at observation moments (keep hall, crypt descent, boss approach, all 5 boss scenes, endings, NPC reactions)
- **Choice labels**: `function(s)` in `choice.text` names each class's action in their own idiom at decision points

## Key Flags

| Flag | Set By | Effect |
|------|--------|--------|
| `has_postern_key` | Helping the survivor (Act I) or buying the map | Unlocks postern-door choices at the keep gate |
| `entered_quietly` | Postern entry, gate climb (clean), wizard drain | Affects opening narration in the grand hall |
| `alerted_keep` | Noisy climb, rushed fight | Some scenes acknowledge the keep is on alert |
| `knows_phylactery` | Library research, altar study, ghost communication | Enables extra boss options |
| `has_phylactery` | Taking the lodestone from under the throne | Enables direct phylactery destruction at boss |
| `altar_restored` | Cleric reconsecrating the chapel | Amplifies Cleric's boss rite; affects boss narration |
| `has_ritual_oil` | Finding the satchel in the library | Enables the ritual oil boss option |
| `know_weakness` | Throne room parley (Rogue/Wizard paths) | Enables the "find the weakness" boss option |
| `seal_solved` | Passing the crypt trial via class method | Routes some boss conclusions to heroic ending |

## Story Structure

```
ACT I — THE CALL (tavern → road → keep entrance)
  tavern → road_bold / road_wise / road_equipped
  road_* → keep_gate / keep_gate_wounded / keep_gate_informed / keep_side

ACT II — THE KEEP (grand hall → three wings → throne → crypt stairs)
  keep_hall → keep_hall_combat / library / armory
  All wings → keep_altar / keep_throne → crypt_entrance

ACT III — THE CRYPT & BOSS
  crypt_descent → crypt_puzzle (class-specific) → boss_approach
  boss_approach → 5 boss approaches → one of 4 endings

ENDINGS
  end_heroic    — Malachar destroyed, full victory
  end_costly    — Malachar driven back, partial victory
  end_partial   — Lich retreats, curse weakened but not broken
  end_defeat    — Failed; the keep endures
```

## Naming Conventions

- **Functions**: camelCase, verb-first — `loadScene`, `renderChoices`, `applyChoice`, `beginStory`
- **Scene IDs**: `snake_case` strings — `"keep_gate_wounded"`, `"boss_phylactery"`
- **Flag keys**: `snake_case` strings — `"has_postern_key"`, `"altar_restored"`
- **CSS classes / HTML IDs**: kebab-case — `scene-header`, `class-badge`, `choices-col`
- **DOM references**: suffixed `El` — `sceneTextEl`, `classBadgeEl`

## Conventions to Follow

1. **Preserve the IIFE + `"use strict"`** — all engine JS must remain inside the IIFE in `engine.js`.
2. **Intentional globals only** — `window.STORY_CATALOG` (catalog registry) and `window.STORIES` (runtime story list) are the only intentional globals. Story files push onto `window.STORIES`; do not add other globals.
3. **No build tooling** — keep the project as static files with no bundlers or transpilers.
4. **Use CSS variables** — extend colors through `:root` custom properties, not hardcoded values.
5. **Scene data is pure data** — story files must not reference DOM or engine functions. Paragraphs and choice text may be `fn(state)` but must return strings only.
6. **Callback flow** — the engine uses click-handler callbacks, not promises or async/await.
7. **Accessibility** — maintain `aria-live` on `.panel`, `aria-labelledby`/`aria-describedby` on inputs, and call `.focus()` on the first interactive element after rendering.

## Testing

No automated test suite. Test manually by opening `adventure.html` in a browser and walking these paths:

1. **Fighter → Heroic**: Bold road → fight (easy win) → gate rush → hall combat → investigate chapel → altar study → crypt puzzle (sword pillar) → boss attack → `end_heroic` (via `seal_solved`)
2. **Wizard → Heroic**: Wise road → help survivor → gate informed (postern) → library wizard → throne parley → crypt puzzle (rune sequence) → boss cunning/ritual → `end_heroic`
3. **Rogue → Heroic**: Wise road → help → gate informed → throne rogue flank → `has_phylactery` → crypt puzzle (mechanism) → boss phylactery → `end_heroic`
4. **Cleric → Heroic**: Equipped road → hall combat (turn undead) → altar reconsecrate (`altar_restored`) → throne cleric fight → crypt puzzle (sunburst pillar) → boss cleric rite → `end_heroic`
5. **Partial ending**: Any path → boss without `has_phylactery` or `seal_solved` → `end_partial`
6. **Defeat ending**: Reach `boss_direct` without `has_phylactery` → `end_defeat`
7. **Class gates**: Wizard should not see Fighter-only choices; Fighter should not see Wizard-only choices.
8. **Flag gates**: "Use the postern key" choice must only appear after a path that sets `has_postern_key`.
9. **Play Again**: `startGame()` must fully reset state and return cleanly to the library with no leftover text or flags.
10. **Class prose**: At `keep_hall`, `crypt_descent`, `boss_approach`, and `end_heroic`, each class should receive distinct paragraph text — spot-check at least two classes per scene.
11. **Choice labels**: At the `keep_hall` wing-selection and the `boss_approach` attack choice, button text should differ by class.

Verify in at least Chrome and Firefox. Check layout at ≤ 420 px viewport width.
