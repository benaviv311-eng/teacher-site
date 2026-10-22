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
  assert.match(library, /ארבעת השחקנים בצלחת/);
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

  for (const idea of ['פרק 1 · פחמימה', 'פרק 2 · חלבון', 'פרק 3 · שומן', 'פרק 4 · סיבים']) {
    assert.match(html, new RegExp(idea));
  }

  assert.match(html, /זירת ההחלטות/);
  assert.match(html, /כולם מצביעים/);
  assert.match(html, /תלמיד אקראי/);
  assert.match(html, /שינוי מצב/);

  assert.match(html, /4 שאלות כשאני מסתכל על ארוחה/);
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

test('lesson 3 uses the decision arena as the central participation game', async () => {
  const html = await read('nutrition-grade8-lesson3.html');
  assert.match(html, /זירת ההחלטות/);
  assert.match(html, /כולם מצביעים/);
  assert.match(html, /עוברים לפינה/);
  assert.match(html, /תלמיד אקראי/);
  assert.match(html, /גניבת נקודה/);
  assert.match(html, /שינוי מצב/);
  assert.match(html, /מותר להחליף/);
  assert.match(html, /אין נקודה על דעת הרוב/);
  assert.match(html, /עוד 15 דקות מתחיל אימון/);
  assert.match(html, /סיימתם אימון של 90 דקות/);
  assert.match(html, /תפוח שלם מול מיץ תפוחים/);
  assert.match(html, /יום בלי אימון/);
  assert.match(html, /עדשים/);
  assert.match(html, /טחינה ואבוקדו/);
  assert.doesNotMatch(html, /דראפט הצלחת/);
  assert.doesNotMatch(html, /מי חסר בצלחת/);
});
