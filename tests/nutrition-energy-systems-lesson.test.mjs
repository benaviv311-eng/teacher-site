import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const url = (path) => new URL(`../${path}`, import.meta.url);
const read = (path) => readFile(url(path), 'utf8');
const exists = async (path) => {
  try { await access(url(path)); return true; }
  catch { return false; }
};

test('nutrition lesson 4 is the energy-systems lesson and keeps later lessons available', async () => {
  assert.equal(await exists('nutrition-grade8-lesson4.html'), true);
  assert.equal(await exists('nutrition-grade8-lesson5.html'), true);
  assert.equal(await exists('nutrition-grade8-lesson6.html'), true);

  const library = await read('nutrition-science.html');
  assert.match(library, /nutrition-grade8-lesson4\.html/);
  assert.match(library, /תזונה ומערכות האנרגיה בספורט/);
  assert.match(library, /nutrition-grade8-lesson5\.html/);
  assert.match(library, /מים, זיעה ואלקטרוליטים/);
  assert.match(library, /nutrition-grade8-lesson6\.html/);
  assert.match(library, /ויטמינים ומינרלים/);
});

test('lesson 4 teaches ATP, lactate, alactic, lactic and the always-active aerobic system', async () => {
  const html = await read('nutrition-grade8-lesson4.html');
  assert.match(html, /ATP/);
  assert.match(html, /לקטט/);
  assert.match(html, /אנאירובי א[־-]לקטי/);
  assert.match(html, /אנאירובי לקטי/);
  assert.match(html, /המערכת האירובית.*פועלת.*כל הזמן/s);
  assert.match(html, /הגוף לא אוכל ATP/);
  assert.match(html, /מה תאכל לפני/);
  assert.match(html, /בנה ארוחה לספורטאי/);
});

test('lesson 4 has five reveal hooks and 15 energy-system game questions', async () => {
  const html = await read('nutrition-grade8-lesson4.html');
  assert.match(html, /היום נגלה 3 דברים/);
  assert.match(html, /מה אתם אומרים\?/);
  assert.equal((html.match(/class="hook-question"/g) ?? []).length, 5);
  assert.equal((html.match(/class="energy-question"/g) ?? []).length, 15);
});

test('shared concept loop uses the four concepts chosen for lesson 4', async () => {
  const js = await read('nutrition-concepts.js');
  const start = js.indexOf("'nutrition-grade8-lesson4.html'");
  const end = js.indexOf("'nutrition-grade8-lesson5.html'");
  assert.ok(start >= 0 && end > start);
  const lesson4 = js.slice(start, end);
  for (const term of ['ATP', 'לקטט', 'אנאירובי א־לקטי', 'אנאירובי לקטי']) {
    assert.match(lesson4, new RegExp(term));
  }
});
