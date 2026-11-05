# Word Scramble — English Games Design

Date: 2026-11-05

## Purpose

Add a playable English letter-unscrambling game to the existing Grade 7 English section of the Beit Or school website. Students should practice spelling and vocabulary; the teacher should be able to run a simple team competition on a projected screen.

## Existing site and constraints

- The site is a static GitHub Pages project (`teacher-site`) using HTML, CSS, and vanilla JavaScript, with Node's built-in test runner.
- `english.html` links to `english-games.html`, currently a list of classroom activities with no Word Scramble game.
- Preserve the existing blue/white school-site look, Hebrew navigation, and English gameplay words.
- No login, accounts, external service, or student data collection.
- The new game must run on phone, desktop, and classroom projector; controls must be usable with buttons and keyboard.

## Approaches considered

1. **Individual only:** simple and fast, but does not support projected class competition.
2. **Classroom only:** supports teams, but students cannot practice independently.
3. **Combined (selected by user):** a mode switch in one game, sharing word bank and puzzle mechanics while preserving separate scoring and round structure.

## User flow and behavior

1. Open **English → English Games → Word Scramble**.
2. Choose **Practice / Individual** or **Class Challenge / Teams**.
3. Pick **Easy**, **Medium**, or **Hard**. Easy has 3–4-letter familiar words, Medium 5–7-letter vocabulary, Hard 8–11-letter words. Include words from existing English lessons and a small supplementary set.
4. See scrambled, individually selectable letter tiles; select tiles to assemble a word. Duplicated letters remain distinct, and each shuffle must differ from the correct spelling. Allow undo, clear, and keyboard letter entry/backspace.
5. Show a free English clue from the start to distinguish legitimate anagrams (such as EAT and TEA). Submit a full answer. Incorrect answers give a retry message without revealing the solution. The optional paid hint reveals the Hebrew meaning and reduces points. Correct answers reveal the word and meaning before advancing.
6. Each question allows skip/reveal and moving forward; all visible feedback is also accessible text.

### Individual mode

- Ten words per game, chosen without repetition from the selected difficulty's curated bank.
- Correct without hint: **10 points**; correct after hint: **5 points**; skipped: **0**.
- No timer in individual practice; show question progress, score, and final result with **Play again**.

### Team mode

- Select **2, 3, or 4 teams**, with default labels Team 1, Team 2, etc.
- **12 turns** total, rotating teams in order so every allowed team count gets equal turns.
- Each active team gets **45 seconds** to solve; teacher can pause/resume the timer. Timeout means 0 points and reveal of the word.
- The same 10/5/0 scoring; show current team, prominent timer, and live scoreboard.
- The teacher advances after the answer/reveal; the scoreboard and winner/tie appear after round 12.

## Content and visual design

- New standalone page `english-scramble.html`, linked with a highlighted playable card in `english-games.html`, and a direct link in `english.html` alongside existing English tools.
- Intro panel with a mode choice, level cards and clear Start control.
- Game screen: progress, free disambiguating English clue, word letters, selected answer area, buttons for check/undo/clear/hint/skip, contextual feedback, and (team mode) timer and scoreboard. Timer ticks update in place so keyboard focus remains usable.
- Calm blue school styling, generous tile sizes for projector/touch devices, responsive layout; avoid audio and distracting animations.
- Hebrew guidance for Grade 7 students, English words and short English action labels where helpful.

## Quality checks

- Unit tests for difficulty banks and word lengths, non-trivial shuffling, repeated letters, 10 unique solo words, fair 12-turn team rotation, 10/5/0 scoring, and timer expiration handling.
- Static integration tests for navigation from English pages, expected accessible controls, and no accidental broken links.
- Run the repository's existing test suite before publication, then verify the live GitHub Pages URL after publishing.

## Out of scope

- User accounts, saved leaderboards, teacher dashboards, analytics, grading, multiplayer networking, or modifying existing lessons.

## Approved follow-up: letter reveal and answer reveal

- **תן אות** fills the next correct letter into the current answer, once per word. It counts as a hint, so a correct solution is worth 5 rather than 10 points.
- **גלה תשובה** reveals the correct word and its meaning, awards 0 points, and allows advancing to the next word or team.
- The prior Skip action remains internally compatible; the visible control is labeled **גלה תשובה** to make its consequence clear.

