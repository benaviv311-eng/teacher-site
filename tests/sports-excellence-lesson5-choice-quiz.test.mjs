import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { QUESTIONS, DISCUSSION_QUESTIONS, scoreResponses, describeProfile } from '../sports-excellence-lesson5-choice-bank.mjs';

const read = (name) => readFile(new URL(`../${name}`, import.meta.url), 'utf8');
const types = ['Cooler', 'Closer', 'Cleaner'];

test('fifteen classroom dilemmas give each approach one distinct, meaningful option', () => {
  assert.equal(QUESTIONS.length, 15);
  assert.deepEqual(QUESTIONS.map((q) => q.id), Array.from({ length: 15 }, (_, i) => i + 1));
  for (const question of QUESTIONS) {
    assert.ok(question.prompt.length > 20);
    assert.equal(question.options.length, 3);
    assert.deepEqual([...new Set(question.options.map((o) => o.type))].sort(), [...types].sort());
    assert.ok(question.options.every((o) => o.text.length > 14));
  }
  for (const type of types) {
    for (const position of [0, 1, 2]) {
      assert.equal(QUESTIONS.filter((q) => q.options[position].type === type).length, 5);
    }
  }
});

test('paper answer-key scoring supports mixed outcomes and never forces a personal diagnosis', () => {
  const allA = scoreResponses(Array(15).fill('א'));
  assert.equal(Object.values(allA).reduce((total, count) => total + count, 0), 15);
  const matchingCleaner = QUESTIONS.map((q) => ['א', 'ב', 'ג'][q.options.findIndex((o) => o.type === 'Cleaner')]);
  assert.deepEqual(scoreResponses(matchingCleaner), { Cooler: 0, Closer: 0, Cleaner: 15 });
  assert.equal(describeProfile({ Cooler: 2, Closer: 5, Cleaner: 8 }).type, 'Cleaner');
  assert.equal(describeProfile({ Cooler: 4, Closer: 5, Cleaner: 6 }).type, 'משולב');
  assert.equal(describeProfile({ Cooler: 5, Closer: 5, Cleaner: 5 }).type, 'משולב');
});

test('five oral discussion questions hide the type until the explanation is revealed', () => {
  assert.equal(DISCUSSION_QUESTIONS.length, 5);
  for (const [index, question] of DISCUSSION_QUESTIONS.entries()) {
    assert.equal(question.id, index + 1);
    assert.ok(question.prompt.length > 20);
    assert.equal(question.options.length, 3);
    assert.deepEqual(new Set(question.options.map((o) => o.type)), new Set(types));
    assert.ok(question.options.every((o) => o.text.length > 14 && o.explanation.length > 35));
  }
});

test('projector quiz is appended to lesson 5 and teacher guide exposes the paper key', async () => {
  const [quiz, teacher] = await Promise.all([
    read('sports-excellence-lesson5-slides.html'),
    read('sports-excellence-lesson5.html'),
  ]);
  assert.match(quiz, /<html lang="he" dir="rtl">/);
  assert.match(quiz, /sports-excellence-lesson5-choice-bank\.mjs/);
  assert.match(quiz, /מפתח ניקוד/);
  assert.match(quiz, /חמש שאלות/);
  assert.match(quiz, /55 שקופיות/);
  assert.match(quiz, /אין תשובה אחת נכונה/);
  assert.match(quiz, /data-part="quiz"/);
  assert.match(teacher, /מבחן: פתיחה/);
  assert.match(teacher, /id="choiceQuizKey"/);
  assert.match(teacher, /מבחן רפלקטיבי/);
  assert.match(teacher, /הסכום של שלושת הטורים/);
  assert.match(teacher, /מפתח ניקוד לתלמידים/);
  assert.match(quiz, /דיון בעל־פה/);
  assert.match(quiz, /מגלים את המשמעות/);
  assert.match(teacher, /id="choiceOral"/);
  assert.match(teacher, /שקופית 46/);
});
