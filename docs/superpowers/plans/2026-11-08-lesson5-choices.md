# Lesson 5 Choices Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement task-by-task, with test-first checks.

**Goal:** Integrate a notebook-scored 15-question quiz plus five reveal-based oral discussion questions into the existing Lesson 5 slide deck.

**Architecture:** A shared ES module supplies question text, types, explanations, and scoring. The student deck dynamically appends the optional slides, while the teacher page renders its answer keys and launch links.

**Tech Stack:** Static RTL HTML/CSS, browser ES modules, Node test runner; existing GitHub Pages site.

**Spec:** `docs/superpowers/specs/2026-11-08-lesson5-choices-design.md`

## Global constraints

- Preserve the original 24 slides and the six-part 50-minute teacher route.
- 15 private questions are balanced across all three answer positions; the five oral questions each have three different types.
- No public student classification or statistical validation claims.
- Use current main as publication base to retain unrelated site changes.

## Review focus

- Direct entry via `?start=25` and `?start=46` opens the intended section.
- Student choice slides hide type labels until the subsequent reveal slide.
- Teacher controller includes 55 positions and synchronizes with student deck.
- All relative imports resolve on GitHub Pages.
- The 15-question answer key and teacher key originate from one data source.

## Task 1: Shared bank and tests

- [x] Add tests for fifteen prompts, three distinct types, balanced answer positions, scoring, and mixed outcomes.
- [x] Observe failure before creating `sports-excellence-lesson5-choice-bank.mjs`.
- [x] Add the bank and five oral questions; verify the tests.

## Task 2: Presenter and teacher pages

- [x] Add the 15-question module and the five oral reveal pairs to `sports-excellence-lesson5-slides.html`.
- [x] Add direct section buttons, notebook key, teacher explanations, and the 55-slide controller to `sports-excellence-lesson5.html`.
- [x] Run `npm test` and `git diff --check`.

## Task 3: Publish and verify

- [ ] Update the remote default branch without overwriting new unrelated commits.
- [ ] Open published `?start=25` and `?start=46`; verify question/reveal navigation.
