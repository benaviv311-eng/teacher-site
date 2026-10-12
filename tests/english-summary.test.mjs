import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('English lessons end with three main things learned today', async () => {
  const lesson1 = await read('english-lesson1.html');
  const lesson2 = await read('english-lesson2.html');

  for (const html of [lesson1, lesson2]) {
    assert.match(html, /3 דברים שלמדנו היום/);
  }

  assert.match(lesson1, /להציג את עצמי בכמה משפטים באנגלית/);
  assert.match(lesson1, /לשאול ולענות על שאלות היכרות בסיסיות/);
  assert.match(lesson1, /להשתמש באוצר מילים כדי לדבר על דברים שאני אוהב/);

  assert.match(lesson2, /להשתמש בביטויים של שגרת יום/);
  assert.match(lesson2, /לכתוב את הרוטינה האישית שלי באנגלית/);
  assert.match(lesson2, /לספר על היום שלי בלי לקרוא מהמחברת/);
});

test('English lesson 2 is writing-led and removes the Maya reading section', async () => {
  const html = await read('english-lesson2.html');

  assert.doesNotMatch(html, /Meet Maya|Hi, I’m Maya|הכן את Meet Maya/);
  assert.match(html, /משימה 1 — השלמת משפטים/);
  assert.match(html, /משימה 2 — בונים משפטים/);
  assert.match(html, /משימה 3 — מוסיפים שעות/);
  assert.match(html, /משימה 4 — מסדרים את היום/);
  assert.match(html, /משימה 5 — הרוטינה שלי/);
  assert.match(html, /and \/ then \/ after school \/ in the evening/i);
  assert.match(html, /Write at least six sentences/i);
  assert.match(html, /פסקה קצרה/);
});

test('English lesson 2 includes an independent full-day schedule writing task', async () => {
  const html = await read('english-lesson2.html');

  assert.match(html, /My Full Day — Write it by yourself/i);
  assert.match(html, /Write your full daily routine from morning to night/i);
  assert.match(html, /Write at least 8 sentences/i);
  assert.match(html, /Use your own real schedule/i);
  assert.match(html, /first.*then.*after school.*in the evening.*finally/is);
  assert.match(html, /בלי משפטים להשלמה/);
});

test('English lesson 2 adds three morning routine expressions to the vocabulary bank and practice', async () => {
  const html = await read('english-lesson2.html');

  assert.match(html, /13<\/b><span>ביטויי שגרה/);
  assert.match(html, /brush my teeth — מצחצח שיניים/);
  assert.match(html, /wash my face — שוטף פנים/);
  assert.match(html, /drink coffee — שותה קפה/);
  assert.match(html, /I brush my teeth in the morning\./);
  assert.match(html, /I wash my face in the morning\./);
  assert.match(html, /I drink coffee in the morning\./);
});
