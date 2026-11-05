import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { mountScramble } from '../english-scramble.js';

function harness() {
  const rootHandlers = new Map();
  let html = '';
  let rootReplacements = 0;
  let activeElement = null;
  let restoredFocus = 0;
  const timerDisplay = { textContent: '00:45', closest() { return { classList: { toggle() {} } }; } };
  const root = {
    get innerHTML() { return html; },
    set innerHTML(value) { html = value; rootReplacements++; },
    querySelector(selector) {
      if (selector === '[data-timer]') return timerDisplay;
      if (activeElement?.dataset?.action && selector.includes(`data-action="${activeElement.dataset.action}"`)) {
        return { disabled: false, focus() { restoredFocus++; } };
      }
      return null;
    },
    addEventListener(type, callback) { rootHandlers.set(type, callback); },
  };
  const handlers = new Map();
  const document = {
    get activeElement() { return activeElement; },
    getElementById(id) { return id === 'scrambleApp' ? root : null; },
    addEventListener(type, callback) { handlers.set(type, callback); },
  };
  const intervals = new Map();
  let nextId = 1;
  const clock = {
    setInterval(fn) { const id = nextId++; intervals.set(id, fn); return id; },
    clearInterval(id) { intervals.delete(id); },
    tick() { for (const fn of [...intervals.values()]) fn(); },
    running() { return intervals.size; },
  };
  const game = mountScramble(document, clock, () => 0);
  const click = (action, value) => rootHandlers.get('click')({
    target: { closest() { return { disabled: false, dataset: { action, value } }; } },
  });
  return {
    game, root, clock, handlers, click, timerDisplay,
    rootReplacements: () => rootReplacements,
    focusRestores: () => restoredFocus,
    setActive: (action, value) => { activeElement = { dataset: { action, value } }; },
  };
}

function solveCurrentWord(game) {
  const current = game.getState();
  for (const letter of current.words[current.turn].word) {
    const tile = game.getState().tiles.find(tile => tile.letter === letter && !game.getState().selectedIds.includes(tile.id));
    assert.ok(tile, `missing ${letter}`);
    game.selectTile(tile.id);
  }
  game.submitAnswer();
}

test('standalone HTML loads the controller and provides responsive English game mounting point', () => {
  const html = readFileSync(new URL('../english-scramble.html', import.meta.url), 'utf8');
  assert.match(html, /id="scrambleApp"/);
  assert.match(html, /english-scramble\.css/);
  assert.match(html, /type="module" src="english-scramble\.js"/);
  assert.match(html, /viewport/);
  assert.match(html, /href="english-games\.html"/);
});

test('setup offers both modes, all difficulty levels, and team-count choice', () => {
  const { root, click } = harness();
  assert.match(root.innerHTML, /Individual/);
  assert.match(root.innerHTML, /Class Challenge/);
  for (const level of ['Easy', 'Medium', 'Hard']) assert.ok(root.innerHTML.includes(level));
  click('mode', 'teams');
  assert.match(root.innerHTML, /data-action="teams" data-value="4"/);
  click('teams', '4');
  assert.match(root.innerHTML, /data-action="teams" data-value="4" class="small-choice is-selected"/);
});

test('solo practice has 10 words, accessible letter controls, and correct answers earn ten points', () => {
  const { game, root, clock } = harness();
  game.startGame({ mode: 'solo', level: 'easy' });
  assert.equal(game.getState().words.length, 10);
  assert.equal(clock.running(), 0);
  assert.match(root.innerHTML, /aria-live="polite"/);
  assert.match(root.innerHTML, /data-action="tile"/);
  assert.match(root.innerHTML, /data-action="hint"/);
  solveCurrentWord(game);
  assert.equal(game.getState().scores[0], 10);
  assert.equal(game.getState().phase, 'revealed');
  game.nextWord();
  assert.equal(game.getState().turn, 1);
});

test('hints halve points and an incorrect answer cannot award points', () => {
  const { game } = harness();
  game.startGame({ mode: 'solo', level: 'medium' });
  game.selectTile(game.getState().tiles[0].id);
  game.submitAnswer();
  assert.equal(game.getState().scores[0], 0);
  assert.equal(game.getState().phase, 'playing');
  game.clearTiles();
  game.showHint();
  solveCurrentWord(game);
  assert.equal(game.getState().scores[0], 5);
  game.submitAnswer();
  assert.equal(game.getState().scores[0], 5);
});

test('team timer can pause, expire and will not update finished games', () => {
  const { game, clock, root } = harness();
  game.startGame({ mode: 'teams', level: 'hard', teamCount: 3 });
  assert.equal(game.getState().words.length, 12);
  assert.equal(clock.running(), 1);
  assert.match(root.innerHTML, /00:45/);
  clock.tick();
  assert.equal(game.getState().secondsLeft, 44);
  game.togglePause();
  clock.tick();
  assert.equal(game.getState().secondsLeft, 44);
  game.togglePause();
  for (let i = 0; i < 44; i++) clock.tick();
  assert.equal(game.getState().phase, 'revealed');
  assert.equal(game.getState().result, 'timeout');
  assert.deepEqual(game.getState().scores, [0, 0, 0]);
  for (let turn = 0; turn < 11; turn++) {
    game.nextWord();
    game.skipWord();
  }
  game.nextWord();
  assert.equal(game.getState().phase, 'finished');
  assert.equal(clock.running(), 0);
  const finalScores = game.getState().scores.slice();
  clock.tick();
  assert.deepEqual(game.getState().scores, finalScores);
  assert.match(root.innerHTML, /תיקו/);
});

test('keyboard letter entry uses distinct repeated letter tiles and backspace undoes selection', () => {
  const { game, handlers } = harness();
  game.startGame({ mode: 'solo', level: 'easy' });
  const firstLetter = game.getState().tiles[0].letter;
  handlers.get('keydown')({ key: firstLetter.toLowerCase(), target: { tagName: 'BODY' }, preventDefault() {} });
  assert.equal(game.getState().selectedIds.length, 1);
  handlers.get('keydown')({ key: 'Backspace', target: { tagName: 'BODY' }, preventDefault() {} });
  assert.equal(game.getState().selectedIds.length, 0);
});

test('countdown updates the timer in place without replacing focused gameplay controls', () => {
  const { game, clock, timerDisplay, rootReplacements } = harness();
  game.startGame({ mode: 'teams', level: 'easy', teamCount: 2 });
  const beforeTick = rootReplacements();
  clock.tick();
  assert.equal(rootReplacements(), beforeTick, 'a timer tick must not replace focused buttons');
  assert.equal(timerDisplay.textContent, '00:44');
});

test('the intended meaning is visible before spending points on a hint', () => {
  const { game, root } = harness();
  game.startGame({ mode: 'solo', level: 'easy' });
  assert.ok(root.innerHTML.includes(game.getState().words[0].clue), 'anagram targets need a free English clue');
  assert.equal(game.getState().hintUsed, false);
});

test('selecting setup options restores keyboard focus after rendering', () => {
  const { click, setActive, focusRestores } = harness();
  setActive('mode', 'teams');
  click('mode', 'teams');
  assert.equal(focusRestores(), 1);
});

test('Give a Letter places exactly one correct letter and limits the score to hint points', () => {
  const { game, root } = harness();
  game.startGame({ mode: 'solo', level: 'easy' });
  assert.match(root.innerHTML, /data-action="letter"/);
  const word = game.getState().words[0].word;
  game.giveLetter();
  assert.equal(game.getState().selectedIds.length, 1);
  const chosenId = game.getState().selectedIds[0];
  assert.equal(game.getState().tiles.find(tile => tile.id === chosenId).letter, word[0]);
  assert.equal(game.getState().hintUsed, true);
  game.giveLetter();
  assert.equal(game.getState().selectedIds.length, 1, 'only one letter can be given per word');
  for (const letter of word.slice(1)) {
    const tile = game.getState().tiles.find(item => item.letter === letter && !game.getState().selectedIds.includes(item.id));
    game.selectTile(tile.id);
  }
  game.submitAnswer();
  assert.equal(game.getState().scores[0], 5);
});

test('Reveal Answer displays the correct word with zero points and lets the next team play', () => {
  const { game, root } = harness();
  game.startGame({ mode: 'teams', level: 'medium', teamCount: 2 });
  assert.match(root.innerHTML, /data-action="reveal"/);
  const word = game.getState().words[0].word;
  game.revealAnswer();
  assert.equal(game.getState().phase, 'revealed');
  assert.equal(game.getState().result, 'revealed');
  assert.deepEqual(game.getState().scores, [0, 0]);
  assert.ok(root.innerHTML.includes(`>${word}</strong>`));
  game.nextWord();
  assert.equal(game.getState().turn, 1);
  assert.deepEqual(game.getState().scores, [0, 0]);
});
