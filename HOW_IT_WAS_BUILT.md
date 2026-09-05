# How This Was Built

`adventure_story` is a static, no-build-step browser game — but it's also a real case study in
building and maintaining a non-trivial project across many separate Claude Code sessions with no
memory between them. This doc is for other Claude Code users who want to understand (and steal)
the workflow, not for players of the game. If you want to know what the game *is*, read
`README.md`. If you want the full session-by-session history, read `CLAUDE.md` — this doc
distills the patterns out of it.

## The problem: no memory between sessions

Every Claude Code session starts cold. Sixteen sessions in, there's no chat history to fall back
on, no shared scratch state, nothing but the repository on disk. For a project this size — three
full interactive stories, a scene/choice/flag engine, a service worker, CI, a save system, an
authoring tool — that's a real problem unless something in the repo does the remembering.

That something is `CLAUDE.md`. It's checked into the repo, read at the start of every session, and
treated as ground truth. It has three load-bearing parts:

- **A standing policy** at the top of the file (see below) that applies to *every* task regardless
  of session.
- **An append-only session log** — one `### What was completed (Nth session)` entry per session,
  written in past tense, describing exactly what changed and why. Nothing gets rewritten; if a
  later session finds something wrong, it's fixed in the code and the fix is logged as new,
  dated work — the log itself isn't retconned.
- **A running "What still needs to happen" list** — the backlog. Whatever a session doesn't get to
  goes here, and it's the first thing read the next time.

The effect is that a session sixteen deep can pick up mid-thought: it knows the fourteenth session
did a full content audit and found a missing `id` field in `pale_signal.js` that was silently
corrupting save keys, it knows the fifteenth session shipped a Scene Graph tab for the authoring
tool, and it knows exactly what's still outstanding (a signed release APK, a custom Android icon).
None of that lives in any model's context by default — it lives in the file.

The practical lesson: if you want an agent-built project to compound instead of drifting, give it
a durable, append-only log that gets read first and written to last, every session.

## The mandatory agent-usage policy

The very first section of `CLAUDE.md` is not about the game at all — it's a policy:

> Before starting any task in this repo — no matter how small — check the list of available
> agents and use whichever ones are relevant. This is not optional.

This is a deliberate override of the default instinct to just start editing files. It forces a
beat, at the start of *every* task, of checking which specialist agents exist and routing work to
them instead of doing everything inline in the main thread. The policy names concrete routings —
story prose to `fantasy-storyteller`, grammar passes to `content-editor`, running the app to a
`run` skill, debugging to `debugger`, tests to `test-runner`, UI work to `frontend-developer`,
new-feature design to `code-architect` — and explicitly says not to assume a task is "too simple"
to warrant delegation.

What this buys you in practice: a main thread that stays focused on orchestration (breaking a
request into tracks, sequencing them, reviewing the output) instead of context-switching between
prose writing, CSS, and JS engine work inside a single session. It also means the *right* skillset
gets applied consistently — a grammar pass by a content-editor agent behaves differently from one
folded into a feature-implementation pass by an engineering-focused agent.

## The specialist-agent pipeline pattern

The recurring shape of real feature work in this project is: one agent designs, a domain
specialist implements, another specialist polishes, a test agent verifies, and a review agent
does a last pass before anything is considered done. Each stage exists because it catches
something the previous stage isn't good at.

The clearest worked example is the sixteenth session, which shipped five tracks in one pass:

- a New Game+ epilogue for Valdrath's Keep (11 new scenes)
- three Story Forge authoring-tool upgrades (import/export round-tripping, a Live Preview tab,
  smarter validation)
- an accessibility pass (skip links, `aria-hidden` on decorative icons, a WCAG AA contrast audit)
- scene fade transitions in the engine
- a visual-regression test suite

These tracks were executed via `code-architect` (design), `fantasy-storyteller` (epilogue
content), `frontend-developer` ×3 (the actual implementation across the different UI/engine
surfaces), `content-editor` (prose polish on the epilogue), `test-runner` (the new test groups),
and `code-reviewer` (a final pass over the whole batch).

The interesting operational detail is *ordering*: the Story Forge upgrades and the epilogue
content are independent — they don't touch the same files — so those tracks ran in parallel. The
accessibility pass and the scene-fade transitions both touch `engine.js` and `adventure.html`,
so those ran sequentially instead of in parallel, specifically to avoid two agents editing the
same files at the same time and silently clobbering each other's changes. That's a general rule
worth keeping: parallelize across disjoint files, serialize across shared ones.

The `code-reviewer` pass at the end of that batch wasn't a formality — it caught two real bugs
before merge:

1. The New Game+ button was rendering (and silently failing) on the Fae Court and Pale Signal
   library cards, which have no epilogue content at all. It should have been gated on
   `entry.story.scenes.epilogue_start` existing, and wasn't, until review caught it.
2. The new scene-fade transition left the outgoing scene's choice buttons clickable during the
   ~220ms fade window, so a fast double-click could fire `applyChoice` twice against stale state
   and corrupt `history`/`snapshots`. The fix was `pointer-events: none` on the interact area for
   the duration of the transition.

Neither bug was in the "happy path" any single agent was focused on while building its own track
— they're the kind of cross-cutting issue that only shows up when something looks at the whole
diff at once. That's the argument for treating review as a separate, mandatory stage rather than
something folded into implementation.

## Plan mode as a gate before multi-agent work

Before any of that fan-out happens, the pattern this project follows is: use read-only
`Explore`-style agents to ground a proposed approach in what's actually in the codebase (not what
the model assumes is there), then present a written plan and get explicit sign-off before any file
changes start.

This matters more, not less, as you parallelize across agents. A wrong assumption caught before
five agents start editing is a one-line correction. The same wrong assumption caught after five
agents have already touched engine.js, three story files, and the CSS is a multi-file untangling
job — and worse, it may not even surface cleanly, because the symptoms show up scattered across
whichever tracks happened to depend on the bad assumption. Read-only exploration is cheap; undoing
parallel agent work is not. Gate the fan-out on a plan, not the other way around.

## What the engine actually looks like

Briefly, for context: the game has no build step and no server. `catalog.json` / `catalog.js`
register available stories; each story file (`stories/valdrath.js`, etc.) pushes an entry onto a
single `window.STORIES` global containing a plain-data scene graph — scene IDs mapping to
paragraphs (strings or `function(state)` for class-specific prose), choices (with `next`,
`onlyFor`, `requiresFlag`, `setsFlag`), and endings. `engine.js` is the only thing that touches the
DOM or interprets that data; story files are required to stay pure data so they can be authored,
diffed, and even generated by a separate visual tool (Story Forge) without engine knowledge. That
separation is what made a lot of the specialist-agent work possible in the first place — a
`fantasy-storyteller` agent can write and edit story files without needing to understand
`engine.js`'s render loop at all.

## Testing as a feedback loop, not just a gate

The Playwright suite (`tests/browser.test.js`) grew alongside the feature set rather than being
written once: 8 test groups covering the library, setup flow, class paths, save/resume, and
endings in the eighth session; expanded to 27 checks by the eleventh session to cover the Go-Back
button and a new story's path; and up to 41 checks by the sixteenth session, once visual-regression
and New Game+ tests were added.

That last expansion is the best example in the project of tests finding something a review pass
plausibly wouldn't have: the new visual-regression tests captured baseline screenshots of the
library page across runs and diffed them, and the diffs turned up **nondeterministic story-card
ordering** — the library was rendering the three story cards in a different order on different
page loads. The root cause was that `injectStoryScripts()` was injecting each story's `<script>`
tag with the default `async` behavior, so `window.STORIES.push()` calls from different story files
could complete in whatever order the browser happened to finish fetching them, not the order
declared in the catalog. The fix was to re-sort `window.STORIES` to match the catalog's declared
order once all scripts finish loading.

That's a bug a code reader would have had to think specifically about script-loading semantics to
catch — it wouldn't show up in a single test run, only in a diff across runs. It's a concrete
argument for growing your test suite as real functionality accretes, rather than treating "tests
pass" as a static gate you satisfy once and stop thinking about.
