# English Word Scramble Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a playable Word Scramble game in the existing Grade 7 English section, with individual and team modes.

**Architecture:** Add a pure ESM game engine and word bank (`english-scramble-core.mjs`), then a single browser controller and responsive page. Add links to existing English landing and games pages without changing other games. No server or dependencies.

**Tech Stack:** Static HTML/CSS, vanilla JavaScript ESM, Node built-in `node:test` and `assert`.

**Spec:** `docs/superpowers/specs/2026-11-05-english-word-scramble-design.md`

## Global Constraints

- Preserve the current blue/white visual language and Hebrew navigation.
- Use three levels Easy (3–4 letters), Medium (5–7), Hard (8–11), with ten unique individual questions and twelve fair team turns.
- Team mode: 2–4 teams, 45 seconds per turn, pause/resume; scores 10/5/0 depending on hint or skip/timeout.
- Support repeated letters, tap and keyboard entry, undo and clear, small screens and large projected screens, and accessible text feedback.
- Do not add accounts, analytics, remote storage, or dependencies.

## Review Focus

- Duplicate letter tiles remain independently selectable — Task 1 test.
- A random shuffle never displays the correct word unchanged — Task 1 test.
- Two, three, and four teams get exactly equal turns — Task 1 test.
- Stale timers never award points or trigger changes after round completion — Task 2 test.
- Links from both English pages resolve to the new playable page — Task 3 test.

---

### Task 1: Pure game rules and curated vocabulary

**Files:**
- Create: `english-scramble-core.mjs`
- Create: `tests/english-scramble-core.test.mjs`

**Interfaces:**
- `WORD_BANK`: object keyed by `easy`, `medium`, `hard`, entries `{word,he,clue}`.
- `shuffleLetters(word, random = Math.random)`: array of `{id,letter}` with different visible order from word.
- `chooseWords(level,count,random = Math.random)`: unique word objects.
- `teamForTurn(turnIndex, teamCount)`: zero-based team index.
- `pointsForCorrect(hintUsed)`: 10 or 5.
- `evaluateAnswer(letters, selectedIds, word)`: boolean, case-insensitive.

- [ ] Write tests for all above outputs, exact level lengths, ten/twelve unique words, duplicate letters, unchanged shuffle, fair turns, and scores.
- [ ] Run `node --test tests/english-scramble-core.test.mjs`; observe expected failure because core module is absent.
- [ ] Implement minimal `english-scramble-core.mjs` exports and curated words.
- [ ] Run focused tests; require all pass.
- [ ] Commit game rules and test.

### Task 2: Playable UI, modes, controls, timer

**Files:**
- Create: `english-scramble.html`
- Create: `english-scramble.css`
- Create: `english-scramble.js`
- Create: `tests/english-scramble-ui.test.mjs`

**Interfaces:**
- `english-scramble.js` imports core exports, renders setup/play/finished states in existing DOM elements.
- `startGame({mode,level,teamCount})`, `selectTile(id)`, `undoTile()`, `clearTiles()`, `showHint()`, `submitAnswer()`, `skipWord()`, `nextWord()`, `togglePause()`, `finishGame()` are controller actions.
- Expose only `mountScramble(document,clock)` for DOM integration/test; default browser entry runs on page load.

- [ ] Write static/DOM-oriented tests that pin mode and level selectors, controls, timer and score regions, accessible announcements, and prevent timer activity after completion (by a controllable clock).
- [ ] Run focused UI tests; observe expected failure with missing game page/controller.
- [ ] Implement responsive markup, styling, and controller with click/keyboard interaction and distinct solo/team flows.
- [ ] Run focused UI tests; require all pass.
- [ ] Commit playable game and tests.

### Task 3: English section integration and release

**Files:**
- Modify: `english-games.html`
- Modify: `english.html`
- Create: `tests/english-scramble-links.test.mjs`

**Interfaces:**
- Both English pages link directly to `english-scramble.html`.
- `english-games.html` retains all existing activity cards.

- [ ] Write failing link tests for two entry points, expected labels, and the new file's existence.
- [ ] Run link tests; observe failure because the links are missing.
- [ ] Add a prominent linked Word Scramble card to the English games collection and a direct tool card to the English landing.
- [ ] Run focused tests then `npm test`, require all pass.
- [ ] Verify browser behavior at mobile and projected widths if preview is available.
- [ ] Commit integration and release notes, push the GitHub Pages source branch, and verify the published URL.
