# CLAUDE.md — adventure_story

## Project Overview

`adventure_story` is a self-contained "Choose Your Own Adventure" interactive story game. It is a single-file browser application (no build step, no dependencies, no server) created as CIS110 coursework by Anthony Woodward. The entire project lives in `adventure.html`.

## Running the Project

Open `adventure.html` directly in any modern web browser. No server, build tool, or package manager is needed.

```
open adventure.html        # macOS
xdg-open adventure.html    # Linux
start adventure.html       # Windows
```

The only external resource is Google Fonts (Cinzel, EB Garamond) loaded from a CDN; the game functions without it if offline (browser fallback fonts apply).

## Repository Structure

```
adventure_story/
├── adventure.html   # Entire application: HTML + CSS + JavaScript
└── README.md        # Placeholder title only
```

## Architecture

The application is a single HTML file with three embedded sections:

### HTML (lines 282–352)
Five `<section>` elements, each representing one screen. Only one is visible at a time via the `.active` CSS class.

| ID | Screen |
|----|--------|
| `page-setup` | Character/world setup questions |
| `page-intro` | Story introduction |
| `page-s1` | Chapter I — The Cave |
| `page-s2` | Chapter II — The River |
| `page-ending` | Outcome and "Play Again" |

### CSS (lines 10–280)
- CSS custom properties (`--bg-panel`, `--green`, `--gold`, `--text`, etc.) defined on `:root` control the entire dark-fantasy color scheme.
- `.page` elements are `display: none` by default; `.page.active` sets `display: flex`.
- Paragraph animations use the `rise` keyframe (`opacity: 0 → 1` + `translateY`). A `@media (prefers-reduced-motion)` block disables them.
- Responsive breakpoint at `max-width: 420px` stacks buttons full-width.

### JavaScript (lines 353–702)
Everything is wrapped in an IIFE (`(function() { "use strict"; ... })()`) to avoid polluting the global scope.

## State Management

Two plain objects hold all runtime state:

```js
var answers = {};   // User inputs keyed by setupQuestions[n].key
var choices = {};   // Binary game decisions: { removeClothing, useRope }
```

`v(key)` is a shorthand getter: `function v(key) { return answers[key]; }` (line 384).

## Key Data Structures

**Setup question definition:**
```js
{ key: "name", prompt: "What is the name of the main character?", retry: "Please enter a name:" }
```

The five keys are: `name`, `forestName`, `clothingType`, `legendaryTreasure`, `smallChest`.

## Game Flow

```
startGame()
  └─ showSetupIntro()
       └─ runSetup(0..4)          collect answers sequentially
            └─ beginIntro()       page-intro, narrative introduction
                 └─ beginChapter1()  page-s1, cave choice (removeClothing)
                      └─ beginChapter2()  page-s2, river choice (useRope)
                           └─ showEnding()   page-ending, one of 3 outcomes
```

**Ending matrix:**

| removeClothing | useRope | Outcome |
|---|---|---|
| yes | yes | Best — treasure found, family saved |
| no | no | Worst — lost forever |
| mixed | mixed | Middle — small chest found, partial recovery |

## Naming Conventions

- **Functions**: camelCase, verb-first — `showPage`, `beginChapter1`, `renderChoice`, `addP`, `clearInteract`
- **Variables**: camelCase — `introTextEl`, `setupContentEl`, `setupQuestions`
- **CSS classes / HTML IDs**: kebab-case — `page-setup`, `story-text`, `btn-row`, `choice-prompt`, `error-msg`
- **DOM element references**: suffixed with `El` — `s1TextEl`, `endingActionsEl`

## Key Utility Functions

| Function | Location | Purpose |
|----------|----------|---------|
| `showPage(id)` | line 378 | Deactivates all `.page` elements, activates the one with the given ID, scrolls to top |
| `addP(container, text, variant)` | line 386 | Creates and appends an animated `<p class="passage">` element |
| `addPs(container, lines, variant)` | line 395 | Calls `addP` for each string in an array |
| `clearInteract(el)` | line 399 | Empties an interaction container and hides it |
| `renderChoice(interactEl, prompt, onChoose)` | line 404 | Renders a Yes/No choice with a callback for the decision |
| `renderContinue(interactEl, label, onClick)` | line 434 | Renders a single "Continue" button |
| `runSetup(index)` | line 491 | Recursively steps through setup questions via callbacks |

## Story Text Generation

Narrative text is built with string concatenation using `v()` to interpolate user-supplied values:

```js
"Once upon a time, there was a curious explorer named " + v("name") + " who came from a poor family..."
```

All story text is hard-coded template strings — there is no AI/LLM or procedural generation.

## Conventions to Follow

1. **Preserve the IIFE + `"use strict"`** — all JS must remain inside the existing IIFE.
2. **No globals** — do not attach anything to `window` or declare variables outside the IIFE.
3. **No build tooling** — keep the project as a single self-contained HTML file with no external scripts or bundlers.
4. **Use CSS variables** — extend or modify colors/spacing through the `:root` custom properties, not hardcoded values.
5. **DOM helper pattern** — use `addP`/`addPs` for story paragraphs; use `renderChoice`/`renderContinue` for interaction areas.
6. **Callback continuations** — async-style flow is achieved by passing callbacks, not promises or async/await (consistent with the ES5 style of the file).
7. **Accessibility** — maintain `aria-live` on panel containers, `aria-labelledby`/`aria-describedby` on inputs, and call `.focus()` on the first interactive element after rendering.

## Testing

There is no automated test suite. Test manually by opening `adventure.html` in a browser and walking all paths:

1. **Best ending** — answer all setup questions → Chapter I: **Yes** → Chapter II: **Yes**
2. **Worst ending** — Chapter I: **No** → Chapter II: **No**
3. **Mixed ending A** — Chapter I: **Yes** → Chapter II: **No**
4. **Mixed ending B** — Chapter I: **No** → Chapter II: **Yes**
5. **Play Again** — verify `startGame()` resets state and returns to the setup screen cleanly
6. **Validation** — on each setup question, submit an empty field; confirm the error message appears and the Continue button remains disabled

Verify in at least Chrome and Firefox. Check that animations run, fonts load, and the layout is correct on a narrow viewport (≤ 420 px).
