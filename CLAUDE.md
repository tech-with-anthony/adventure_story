# CLAUDE.md — adventure_story

## Project Overview

`adventure_story` is a DnD-themed "Choose Your Own Adventure" interactive story game. It is a static browser application (no build step, no server) created as CIS110 coursework by Anthony Woodward. The story is "The Curse of Valdrath's Keep" — a fully branching adventure with class-mechanical choices, flag-based state, and four distinct endings.

## Running the Project

Open `adventure.html` directly in any modern web browser. No server, build tool, or package manager is needed.

```
open adventure.html        # macOS
xdg-open adventure.html    # Linux
start adventure.html       # Windows
```

The only external resource is Google Fonts (Cinzel, EB Garamond) loaded from a CDN; the game functions without it if offline.

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
| `addP` / `addPs` / `clearInteract` / `renderContinue` | DOM utility helpers (same patterns as original) |

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
2. **No globals** — `window.STORY` is the only intentional global; do not add others.
3. **No build tooling** — keep the project as static files with no bundlers or transpilers.
4. **Use CSS variables** — extend colors through `:root` custom properties, not hardcoded values.
5. **Scene data is pure data** — `story-data.js` must not reference DOM or engine functions. Paragraphs may be `fn(state)` but must return strings only.
6. **Callback flow** — the engine uses click-handler callbacks, not promises or async/await.
7. **Accessibility** — maintain `aria-live` on `.panel`, `aria-labelledby`/`aria-describedby` on inputs, and call `.focus()` on the first interactive element after rendering.

## Testing

No automated test suite. Test manually by opening `adventure.html` in a browser and walking these paths:

1. **Fighter → Heroic**: Bold road → fight (easy win) → gate rush → hall combat → throne (fight) → crypt puzzle → boss (attack) + has_phylactery → `end_heroic`
2. **Wizard → Heroic**: Wise road → help survivor → gate informed (postern) → hall magic → library wizard → throne (parley) → crypt puzzle → boss ritual/cunning → `end_heroic`
3. **Rogue → Heroic**: Wise road → help → gate informed → hall stealth → throne rogue flank → crypt puzzle → boss phylactery → `end_heroic`
4. **Cleric → Heroic**: Equipped road → hall combat (holy) → altar reconsecrate → throne (cleric fight) → crypt puzzle → boss cleric (with altar_restored) → `end_heroic`
5. **Partial ending**: Any path → boss without has_phylactery or seal_solved → `end_partial`
6. **Defeat ending**: Any path → boss_direct without has_phylactery → boss loses → `end_defeat` (verify boss_direct routes here)
7. **Class gates**: Select Wizard and verify Fighter-only choices are absent; select Fighter and verify Wizard-only choices absent.
8. **Flag gates**: Confirm "Use the postern key" choice only appears after taking a path that sets `has_postern_key`.
9. **Play Again**: Verify `startGame()` fully resets state and returns cleanly to setup.

Verify in at least Chrome and Firefox. Check animations, fonts, and layout at ≤ 420 px viewport width.
