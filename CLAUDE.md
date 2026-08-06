# CLAUDE.md — adventure_story

## Project Overview

`adventure_story` is a DnD-themed "Choose Your Own Adventure" interactive story game. It is a static browser application (no build step, no server). The story is "The Curse of Valdrath's Keep" — a fully branching adventure with class-mechanical choices, flag-based state, and four distinct endings.

## Current Status (as of last session)

**Branch: `choices`** — this is where all current work lives. The branch is pushed to GitHub and up to date.

### What was built

The project was refactored from a single `adventure.html` file into three files, and the complete story was written from scratch:

- **`adventure.html`** — HTML shell + full dark-fantasy CSS
- **`engine.js`** — Full game engine (IIFE, state machine, class gates, flag system)
- **`story-data.js`** — 70 scenes across 3 acts with 4 endings (~1,150 lines)

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

- **Arcadia OS moved out** — the Debian gaming-distro project that briefly lived in `arcadia-os/` now has its own repository (`tech-with-anthony/arcadia-os`). It shared nothing with this game.
- **Story quality pass** — four defects found and fixed, each verified by a scripted render of the affected scenes (12/12 assertions):
  1. `keep_library` — "a cold blue flame that cast no warmth": subject/verb disagreement, and flames *cast* shadows but *give* warmth.
  2. `throne_battle_cleric` — told every Cleric "the altar's restoration pulses through you" **unconditionally**, contradicting the very next paragraph's `altar_restored` check. A Cleric who reached the throne via the library or armory never saw the chapel, so the line was simply false. Removed; the conditional now carries it.
  3. `library_notes` — was a trap choice. It reveals where the phylactery is hidden, then set `knows_throne_secret`, a flag nothing reads, while its sibling choice set `knows_phylactery` and unlocked real options. Now sets `knows_phylactery`.
  4. `alerted_keep` — documented here as affecting scenes, but never read anywhere. Raising the alarm had zero narrative consequence. Now branches the grand hall's opening (three distinct openings: quiet / alerted / plain).
- **README** — replaced the one-line placeholder with a player-facing description plus a developer section on the scene-data format.
- **Custom Android launcher icon** — generated from `icon-1024.png` at all five densities: legacy `ic_launcher`, circular `ic_launcher_round`, and full-bleed adaptive `ic_launcher_foreground`. `ic_launcher_background` changed from Capacitor's default `#FFFFFF` (which put the dark tower on a white plate) to `#09100A`, sampled from the art's own edge. The adaptive foreground deliberately drops the gold frame and title text, since launcher masks eat the outer ~25%; verified by compositing against circle and squircle masks.

### What still needs to happen — NEXT SESSION

1. **Cross-browser check** — still outstanding. Firefox is not installable in the cloud session (`firefox-esr` has no candidate), so this needs a local machine. Chrome/Chromium is the only engine ever tested.
2. **Release APK** — debug APK is sideloadable but Play Store distribution needs a signed release APK (`Build → Generate Signed Bundle / APK`). Requires a keystore, which is a signing secret you should generate and keep yourself.
3. **Remaining dead flags** (optional) — eight flags are still set but never read: `combat_worn`, `crypt_safe_entry`, `has_rope`, `has_sword_upgrade`, `lich_knows_you`, `rushed_crypt`, `seal_forced`, `wight_fight_worn`. Each is a place the story could react and currently doesn't. `lich_knows_you` is the most promising — the player deliberately provokes Malachar in `hall_combat_call` and nothing ever comes of it.

> **Note:** the engine sets only one flag per choice (`applyChoice` does `state.flags[choice.setsFlag] = true`). Wiring up several of these at once would need that to accept an array.

---

## Running the Project

Open `adventure.html` directly in any modern web browser. No server, build tool, or package manager is needed.

```
open adventure.html        # macOS
xdg-open adventure.html    # Linux
start adventure.html       # Windows
```

The only external resource is Google Fonts (Cinzel, EB Garamond) loaded from a CDN; the game functions without it if offline (system serif fonts are used as fallback).

## Repository Structure

```
adventure_story/
├── adventure.html   # HTML shell + all CSS
├── engine.js        # Game engine: setup, scene rendering, state, class gates
├── story-data.js    # All scene definitions (window.STORY)
├── CLAUDE.md        # This file
└── README.md        # Placeholder title
```

`adventure.html` loads the scripts in dependency order:
```html
<script src="story-data.js"></script>  <!-- defines window.STORY -->
<script src="engine.js"></script>       <!-- starts the game -->
```

## Architecture

### HTML + CSS (`adventure.html`)

Two `<section>` elements; only one is visible at a time via `.page.active`:

| ID | Purpose |
|----|---------|
| `#page-setup` | Character creation (name + class picker) |
| `#page-scene` | All story content — populated dynamically by the engine |

CSS highlights:
- CSS custom properties on `:root` control the dark-fantasy color scheme (`--bg-panel`, `--green`, `--gold`, `--arcane`, etc.)
- `.passage` + `@keyframes rise` handles animated paragraph entry
- `.class-badge` chips show the player's class throughout the game
- `.class-card` / `.class-grid` styles the 2×2 class picker in setup
- `.choices-col` stacks story choice buttons vertically with left-aligned text
- `@media (prefers-reduced-motion)` disables animations

### Game Engine (`engine.js`)

Wrapped in an IIFE with `"use strict"`. Single closure-level state object:

```js
var state = {
  name: "",          // player name from setup
  charClass: "",     // "fighter" | "wizard" | "rogue" | "cleric"
  flags: {},         // persistent boolean flags set by choices
  history: []        // visited scene IDs
};
```

**Key functions:**

| Function | Purpose |
|----------|---------|
| `startGame()` | Resets state, returns to setup page |
| `showSetupIntro()` → `askName()` → `askClass()` | Sequential setup flow |
| `beginStory()` | Sets class badge, calls `loadScene(STORY.start)` |
| `loadScene(id)` | Looks up scene, renders header + paragraphs + choices |
| `renderChoices(choices, prompt)` | Filters visible choices, renders buttons or a Continue button |
| `resolveNext(next)` | Resolves `next` as string, `{class: id, default: id}` object, or `fn(state)→id` |
| `applyChoice(choice)` | Sets `setsFlag` if present, then calls `loadScene(resolveNext(...))` |
| `addP` / `addPs` / `clearInteract` / `renderContinue` | DOM utility helpers |

### Scene Data (`story-data.js`)

Exports `window.STORY`:

```js
window.STORY = {
  start: "tavern",       // first scene ID
  scenes: { ... }        // keyed by scene ID
};
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
startGame()
  └─ showSetupIntro() → askName() → askClass()
       └─ beginStory() → loadScene("tavern")
            └─ renderChoices() → applyChoice()
                 └─ loadScene(nextId)   [repeat until isEnding]
                      └─ renderContinue("Play Again", startGame)
```

## Class System

Four playable classes with mechanical effects:

| Class | Mechanical advantages |
|-------|-----------------------|
| **Fighter** | Combat choices route to clean-win variants; can force entry at the gate |
| **Wizard** | Exclusive library research scene with phylactery details; can study the gate wards |
| **Rogue** | Exclusive trap detection and flank maneuver; throne room parley with better outcome |
| **Cleric** | Can turn undead, reconsecrate the altar (boosts final boss fight), and communicate with the ghost |

Class gating is implemented via:
- `onlyFor: ["className"]` on choices — hides options from other classes
- `next: { fighter: "scene_a", default: "scene_b" }` on choices — different outcomes for different classes

## Key Flags

| Flag | Set By | Effect |
|------|--------|--------|
| `has_postern_key` | Helping the survivor (Act I) or buying the map | Unlocks postern-door choices at the keep gate |
| `entered_quietly` | Postern entry, gate climb (clean), wizard drain | Affects opening narration in the grand hall |
| `alerted_keep` | Noisy climb, rushed fight | Grand hall opens with the alarm still sounding and the horn answered twice |
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
2. **No globals** — `window.STORY` is the only intentional global; do not add others.
3. **No build tooling** — keep the project as static files with no bundlers or transpilers.
4. **Use CSS variables** — extend colors through `:root` custom properties, not hardcoded values.
5. **Scene data is pure data** — `story-data.js` must not reference DOM or engine functions. Paragraphs may be `fn(state)` but must return strings only.
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
9. **Play Again**: `startGame()` must fully reset state and return cleanly to setup with no leftover text or flags.

Verify in at least Chrome and Firefox. Check layout at ≤ 420 px viewport width.
