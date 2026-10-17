import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('English lessons end with three main things learned today', async () => {
  const lesson1 = await read('english-lesson1.html');
  const lesson2 = await read('english-lesson2.html');
  const lesson3 = await read('english-lesson3.html');

  for (const html of [lesson1, lesson2, lesson3]) {
    assert.match(html, /3 דברים שלמדנו היום/);
  }

  assert.match(lesson1, /להציג את עצמי בכמה משפטים באנגלית/);
  assert.match(lesson1, /לשאול ולענות על שאלות היכרות בסיסיות/);
  assert.match(lesson1, /להשתמש באוצר מילים כדי לדבר על דברים שאני אוהב/);

  assert.match(lesson2, /להשתמש בביטויים של שגרת יום/);
  assert.match(lesson2, /לכתוב את הרוטינה האישית שלי באנגלית/);
  assert.match(lesson2, /לספר על היום שלי בלי לקרוא מהמחברת/);

  assert.match(lesson3, /להשתמש באוצר מילים של תחביבים וזמן פנוי/);
  assert.match(lesson3, /לומר מה אני אוהב, מאוד אוהב ולא אוהב לעשות באנגלית/);
  assert.match(lesson3, /לכתוב ולספר על הזמן הפנוי שלי בכמה משפטים/);
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
  assert.doesNotMatch(html, /<h3>Mime & Guess/);
  assert.doesNotMatch(html, /ממחיזים ומנחשים/);
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

test('English library exposes lesson 3 as an active lesson page', async () => {
  const library = await read('english.html');
  const lesson3Url = new URL('../english-lesson3.html', import.meta.url);

  assert.equal(existsSync(lesson3Url), true);
  assert.match(library, /href="english-lesson3\.html"/);
  assert.doesNotMatch(library, /שיעור 3 · בקרוב/);
});

test('English lesson 3 follows the approved hobbies and free-time lesson flow', async () => {
  const html = await read('english-lesson3.html');

  assert.match(html, /Hobbies & Free Time/i);
  assert.match(html, /Today I can talk and write about my hobbies and free time in English/i);
  assert.match(html, /Write 3 activities you know in English/i);
  assert.match(html, /Don't use the Vocabulary Bank yet/i);
  assert.match(html, /Vocabulary Bank/i);
  assert.match(html, /Guess the Hobby/i);
  assert.match(html, /Like \/ Love \/ Don't Like/i);
  assert.match(html, /Spot the Mistake/i);
  assert.match(html, /My Free-Time Profile/i);
  assert.match(html, /Guess My Hobby/i);
  assert.match(html, /My Free Time — Independent Writing/i);
  assert.match(html, /Pair Share \+ Exit Ticket/i);
  assert.match(html, /like \/ love \/ don't like \+ verb-ing/i);
  assert.match(html, /Write 6–8 sentences about your free time/i);
  assert.match(html, /3 different activities/i);
  assert.match(html, /1 sentence with love/i);
  assert.match(html, /1 sentence with don't like/i);
  assert.match(html, /1 sentence with In my free time/i);
});

test('English lesson 3 keeps the approved vocabulary and Guess My Hobby scoring', async () => {
  const html = await read('english-lesson3.html');

  for (const phrase of [
    'play football',
    'play basketball',
    'play video games',
    'listen to music',
    'watch TV',
    'read',
    'draw',
    'dance',
    'ride a bike',
    'hang out with friends',
    'play an instrument',
    'exercise'
  ]) {
    assert.match(html, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
  }

  assert.match(html, /אחרי רמז 1.*3 נקודות/is);
  assert.match(html, /אחרי רמז 2.*2 נקודות/is);
  assert.match(html, /אחרי רמז 3.*נקודה אחת/is);
  assert.match(html, /You need a ball/);
  assert.match(html, /You play with other people/);
  assert.match(html, /You can score goals/);
});
