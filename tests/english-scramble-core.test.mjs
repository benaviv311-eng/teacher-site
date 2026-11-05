import test from 'node:test';
import assert from 'node:assert/strict';
import {
  WORD_BANK,
  chooseWords,
  shuffleLetters,
  teamForTurn,
  pointsForCorrect,
  evaluateAnswer,
} from '../english-scramble-core.mjs';

test('word banks contain enough distinct single English words in their difficulty ranges', () => {
  for (const [level, min, max] of [['easy', 3, 4], ['medium', 5, 7], ['hard', 8, 11]]) {
    const bank = WORD_BANK[level];
    assert.ok(bank.length >= 12, `${level} needs twelve team words`);
    assert.equal(new Set(bank.map(entry => entry.word)).size, bank.length);
    for (const entry of bank) {
      assert.match(entry.word, /^[A-Z]+$/);
      assert.ok(entry.word.length >= min && entry.word.length <= max, entry.word);
      assert.ok(entry.he && entry.clue, `${entry.word} needs two clues`);
    }
  }
});

test('chooseWords returns non-repeating sets of ten and twelve questions', () => {
  for (const level of ['easy', 'medium', 'hard']) {
    for (const count of [10, 12]) {
      const selected = chooseWords(level, count, () => 0.8);
      assert.equal(selected.length, count);
      assert.equal(new Set(selected.map(item => item.word)).size, count);
    }
  }
  assert.throws(() => chooseWords('easy', 100), /count/i);
});

test('shuffleLetters assigns unique ids to repeated letters and never shows the answer unchanged', () => {
  for (const word of ['BOOK', 'APPLE', 'CAT', 'AAAAAB']) {
    const shuffled = shuffleLetters(word, () => 0);
    assert.equal(shuffled.length, word.length);
    assert.equal(new Set(shuffled.map(tile => tile.id)).size, word.length);
    assert.deepEqual(shuffled.map(tile => tile.letter).sort(), word.split('').sort());
    assert.notEqual(shuffled.map(tile => tile.letter).join(''), word);
  }
});

test('teamForTurn gives equal turns to two, three or four teams in twelve rounds', () => {
  for (const teams of [2, 3, 4]) {
    const turns = Array.from({ length: 12 }, (_, index) => teamForTurn(index, teams));
    assert.equal(turns[0], 0);
    assert.equal(turns[teams], 0);
    for (let team = 0; team < teams; team++) {
      assert.equal(turns.filter(value => value === team).length, 12 / teams);
    }
  }
  assert.throws(() => teamForTurn(0, 1), /team/i);
});

test('correct answers are worth ten points, or five if a hint was used', () => {
  assert.equal(pointsForCorrect(false), 10);
  assert.equal(pointsForCorrect(true), 5);
});

test('evaluateAnswer works by tile identity, including repeated letters, without accepting partial attempts', () => {
  const tiles = [
    { id: 0, letter: 'O' },
    { id: 1, letter: 'B' },
    { id: 2, letter: 'K' },
    { id: 3, letter: 'O' },
  ];
  assert.equal(evaluateAnswer(tiles, [1, 0, 3, 2], 'book'), true);
  assert.equal(evaluateAnswer(tiles, [1, 0, 2, 3], 'BOOK'), false);
  assert.equal(evaluateAnswer(tiles, [1, 0, 3], 'BOOK'), false);
  assert.equal(evaluateAnswer(tiles, [1, 0, 0, 2], 'BOOK'), false);
});
