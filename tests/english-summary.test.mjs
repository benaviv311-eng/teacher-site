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

test('English lesson 2 starts with verb discovery and moves into harder routine challenges', async () => {
  const html = await read('english-lesson2.html');

  assert.doesNotMatch(html, /Meet Maya|Hi, I’m Maya|הכן את Meet Maya/);
  assert.match(html, /Routine Clues/i);
  assert.match(html, /What do you do\?/i);
  assert.match(html, /תגידו את הפעולה באנגלית/);
  assert.match(html, /Memory Write/i);
  assert.match(html, /כתבו מהזיכרון/);
  assert.match(html, /Crazy Routine/i);
  assert.match(html, /Put My Day Together/i);
  assert.match(html, /מסדרים את היום/);
  assert.doesNotMatch(html, /משימה 3 — מוסיפים שעות/);
  assert.doesNotMatch(html, /Mime & Guess/);
});

test('English lesson 2 reveals the vocabulary only after students try to retrieve the verbs', async () => {
  const html = await read('english-lesson2.html');

  assert.match(html, /לא כותבים את ה־Vocabulary Bank מראש/);
  assert.match(html, /רק אחרי שהם ניסו/);
  assert.match(html, /REVEAL THE VERBS/i);
  assert.match(html, /wake up — להתעורר/);
  assert.match(html, /brush my teeth — מצחצח שיניים/);
  assert.match(html, /wash my face — שוטף פנים/);
  assert.match(html, /drink coffee — שותה קפה/);
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

test('English lesson 2 keeps all thirteen routine expressions available after the reveal', async () => {
  const html = await read('english-lesson2.html');

  assert.match(html, /13<\/b><span>ביטויי שגרה/);
  for (const phrase of [
    'wake up',
    'brush my teeth',
    'wash my face',
    'get dressed',
    'drink coffee',
    'eat breakfast',
    'go to school',
    'come home',
    'eat lunch',
    'do homework',
    'practice',
    'take a shower',
    'go to bed'
  ]) {
    assert.match(html, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});
