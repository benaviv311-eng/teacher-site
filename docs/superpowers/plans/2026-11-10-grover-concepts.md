# Grover Explanations Synchronization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deepen teacher explanations of Grover's approaches while keeping the existing slide deck accurate and readable.

**Architecture:** Expand the existing `#approaches` section in the teacher HTML and revise only its matching static slide. Keep the quiz module, test logic, URLs and navigation untouched.

**Tech Stack:** Static RTL HTML/CSS, Node built-in test runner.

**Spec:** `docs/superpowers/specs/2026-11-10-grover-concepts-design.md`

## Global Constraints
- Preserve the six lesson parts and 50-minute total.
- Preserve all 55 slides and direct links `?start=25` and `?start=46`.
- Retain the caveat that this is an illustrative framework, not a scientific test of children's personalities.

## Review Focus
- Hebrew direction and wrapping in the three-column slide at 16:9.
- Teacher text must distinguish original Grover descriptions from classroom adaptation.
- One concept should not be represented as a fixed label or moral value of a child.
- Existing quiz/start offsets and teacher remote must stay intact.
- No unrelated content or layout should change.

### Task 1: Concept depth and synchronized slide

**Files:**
- Modify: `sports-excellence-lesson5.html`, `sports-excellence-lesson5-slides.html`
- Test: `tests/sports-excellence-lesson5-grover-explanations.test.mjs`

**Interfaces:** Existing IDs `approaches` and slide `data-part="approaches"` remain stable; output is teacher lesson page plus one synced student slide.

- [ ] Create a test checking the presence of detailed concept descriptions in the teacher HTML and the corresponding concise criteria in slide HTML. Also confirm slide count, quiz section and fixed lesson parts.
- [ ] Run test, expect failure because detailed explanations are missing.
- [ ] Expand the teacher concepts and update the matching slide in place.
- [ ] Re-run new test and full `npm test` and inspect the changed slide for overflow.
- [ ] Commit content and tests, publish only these files without overwriting concurrent changes.
