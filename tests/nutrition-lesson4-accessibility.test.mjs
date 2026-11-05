import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../nutrition-grade8-lesson4.html', import.meta.url), 'utf8');

test('lesson 4 has a light classroom route and quick actions', () => {
  assert.match(html, /class="lesson-route"/);
  assert.match(html, /במשפט אחד/);
  assert.match(html, /nutrition-grade8-lesson4-slides\.html/);
  assert.match(html, /nutrition-grade8-lesson4-classwork\.html/);
});

test('long quiz banks are presented one question at a time', () => {
  assert.match(html, /data-quiz-deck="energy"/);
  assert.match(html, /data-quiz-deck="food"/);
  assert.match(html, /class="deck-controls"/);
  assert.match(html, /שאלה <span class="deck-current">1<\/span>/);
  assert.match(html, /משחק אחד בכל פעם/);
});

test('scientific depth remains available while the main scan stays simple', () => {
  assert.match(html, /class="quick-take"/);
  assert.match(html, /class="deep-dive"/);
  assert.match(html, /המערכת האירובית פועלת כל הזמן/);
  assert.equal((html.match(/class="energy-question(?: advanced)?"/g) ?? []).length, 15);
  assert.equal((html.match(/class="food-question"/g) ?? []).length, 15);
});