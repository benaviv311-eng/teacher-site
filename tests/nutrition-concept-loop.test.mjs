import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const url = (path) => new URL(`../${path}`, import.meta.url);
const read = (path) => readFile(url(path), 'utf8');
const exists = async (path) => {
  try { await access(url(path)); return true; }
  catch { return false; }
};

test('grade 8 nutrition lessons load the shared four-concept learning loop', async () => {
  const nav = await read('site-nav.js');
  assert.match(nav, /nutrition-concepts\.js/);
  assert.equal(await exists('nutrition-concepts.js'), true, 'nutrition-concepts.js should exist');
});

test('concept loop defines four lesson-specific concepts for lessons 1-3', async () => {
  const js = await read('nutrition-concepts.js');

  for (const lesson of ['lesson1', 'lesson2', 'lesson3']) {
    assert.match(js, new RegExp(`nutrition-grade8-${lesson}\\.html`));
  }

  for (const term of [
    'קלוריה', 'צפיפות אנרגטית', 'הוצאה אנרגטית', 'מאזן אנרגיה',
    'מטבוליזם', 'הוצאה אנרגטית במנוחה', 'NEAT', 'האפקט התרמי של המזון',
    'פחמימה', 'חלבון', 'שומן', 'סיבים'
  ]) {
    assert.match(js, new RegExp(term));
  }

  assert.match(js, /4 מושגים/);
  assert.match(js, /מה אתם חושבים/);
  assert.match(js, /חוזרים ל־4 המושגים/);
  assert.match(js, /הגדרה/);
  assert.match(js, /דוגמה/);
});

test('concept loop inserts the prompt near the start and the definitions near the end', async () => {
  const js = await read('nutrition-concepts.js');
  assert.match(js, /board-plan/);
  assert.match(js, /beforebegin/);
  assert.match(js, /\.exit/);
  assert.match(js, /science/);
});
