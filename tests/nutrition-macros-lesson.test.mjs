import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const url = (path) => new URL(`../${path}`, import.meta.url);
const read = (path) => readFile(url(path), 'utf8');
const exists = async (path) => {
  try { await access(url(path)); return true; }
  catch { return false; }
};

test('nutrition library and practical module expose grade 8 lesson 3', async () => {
  const library = await read('nutrition-science.html');
  const practical = await read('nutrition-practical.js');
  assert.match(library, /nutrition-grade8-lesson3\.html/);
  assert.match(library, /חלבון, פחמימה ושומן/);
  assert.match(practical, /nutrition-grade8-lesson3\.html/);
});

test('lesson 3 teaches macronutrient roles with the approved interactive structure', async () => {
  const pageExists = await exists('nutrition-grade8-lesson3.html');
  assert.equal(pageExists, true, 'nutrition-grade8-lesson3.html should exist');
  const html = await read('nutrition-grade8-lesson3.html');

  assert.match(html, /היום נגלה 3 דברים/);
  assert.match(html, /אם חלבון בונה שריר/);
  assert.match(html, /מה אתם אומרים\?/);
  assert.equal((html.match(/class="hook-question"/g) ?? []).length, 5);

  for (const idea of ['פחמימות — הדלק', 'חלבון — הבנייה', 'שומן — הרבה יותר מאנרגיה', 'סיבים — השחקן הרביעי']) {
    assert.match(html, new RegExp(idea));
  }

  assert.match(html, /מי חסר בצלחת/);
  assert.match(html, /אורז/);
  assert.match(html, /חביתה/);
  assert.match(html, /טחינה/);
  assert.match(html, /אין “ארוחה רעה”|אין ארוחה רעה/);

  assert.match(html, /4 שאלות לפני שסיימתי לבנות ארוחה/);
  assert.match(html, /דלק\?/);
  assert.match(html, /בנייה\?/);
  assert.match(html, /צבע\?/);
  assert.match(html, /מים\?/);

  assert.match(html, /תיק חקירה/);
  assert.match(html, /קופסת טונה/);
  assert.match(html, /גליקוגן/);
  assert.match(html, /ביסוס מדעי למורה/);
  assert.match(html, /site-nav\.js/);
});