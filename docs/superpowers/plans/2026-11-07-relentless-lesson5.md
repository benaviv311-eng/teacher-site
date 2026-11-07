# Relentless Lesson 5 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish complete lesson 5 in the existing sports-excellence course with a synchronized student presentation.

**Architecture:** A standalone teacher HTML page and a separate student deck, linked from the existing course index. Both expose ordered six-part structure; the teacher controller sends slide index via BroadcastChannel/localStorage.

**Tech Stack:** Static HTML, CSS, JavaScript, Node.js built-in test runner, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-11-07-relentless-lesson5-design.md`

## Global Constraints

- Hebrew `lang=he`, `dir=rtl` and readable responsive layout.
- Maintain existing courses, links and site navigation.
- Six sections total 5+8+10+10+9+8=50 minutes.
- Teacher answers not visible on student slides.
- No labeling children Cooler/Closer/Cleaner as diagnostic identities.

## Review Focus

- A teacher page link must resolve to an existing student deck.
- A student deck must not reveal the teacher answer key.
- No exercise suggests all participants must perform personally or reveal results.
- At 24:24 the volleyball set is tied, not match point.
- All 6 lab questions are retained in their original order, 3 regular and 3 fast.

---

### Task 1: Teacher lesson

**Files:** Create `sports-excellence-lesson5.html`; Test `tests/sports-excellence-lesson5.test.mjs`.

- [ ] Write failing test checking six titled parts, timing, content, answers, and scientific caveats.
- [ ] Run `node --test tests/sports-excellence-lesson5.test.mjs`, verify missing lesson failure.
- [ ] Implement complete teacher lesson and slide controller.
- [ ] Run focused test, verify pass.

### Task 2: Student slides

**Files:** Create `sports-excellence-lesson5-slides.html`; Test `tests/sports-excellence-lesson5.test.mjs`.

- [ ] Write failing tests checking ordered presentation sections, all six lab scenarios, and no answer key.
- [ ] Run focused test, verify missing slides failure.
- [ ] Implement slides with mobile-responsive 16:9 layout, keyboard/fullscreen navigation and teacher sync.
- [ ] Run focused test, verify pass.

### Task 3: Course integration and publication

**Files:** Modify `sports-excellence.html`; Test `tests/sports-excellence-lesson5.test.mjs`.

- [ ] Write failing test expecting course card link and summary.
- [ ] Run focused test, verify missing link failure.
- [ ] Add card to existing course listing only.
- [ ] Run `npm test` and link/accessibility checks, verify pass.
- [ ] Commit and publish to existing GitHub Pages repository, verify live URL.
