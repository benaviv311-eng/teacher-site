import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('lesson 4 has a full RTL classroom deck', async () => {
  const [html,css,js] = await Promise.all([
    read('nutrition-grade8-lesson4-slides.html'),
    read('nutrition-grade8-lesson4-slides.css'),
    read('nutrition-grade8-lesson4-slides.js')
  ]);
  assert.match(html, /<html[^>]+dir="rtl"[^>]+lang="he"|<html[^>]+lang="he"[^>]+dir="rtl"/);
  assert.match(html, /מצגת מלאה לכיתה/);
  assert.match(html, /nutrition-grade8-lesson4-slides\.css/);
  assert.match(html, /nutrition-grade8-lesson4-slides\.js/);
  assert.match(css, /unicode-bidi/);
  assert.match(js, /requestFullscreen/);
});

test('deck keeps the approved concepts and 15 + 15 games', async () => {
  const [html,js] = await Promise.all([
    read('nutrition-grade8-lesson4-slides.html'),
    read('nutrition-grade8-lesson4-slides.js')
  ]);
  for (const term of ['ATP','לקטט','אנאירובי א־לקטי','אנאירובי לקטי']) assert.match(html,new RegExp(term));
  assert.match(html,/המערכת האירובית פועלת כל הזמן/);
  assert.match(html,/הגוף לא אוכל ATP/);
  assert.equal((js.match(/"kind":"energy"/g) ?? []).length, 15);
  assert.equal((js.match(/"kind":"food"/g) ?? []).length, 15);
});