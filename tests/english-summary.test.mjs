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


test('English lesson 3 shows a teacher answer beside every question-based activity', async () => {
  const html = await read('english-lesson3.html');
  const answerBoxes = html.match(/class="teacher-answer"/g) ?? [];

  assert.equal(answerBoxes.length, 9);
  assert.match(html, /כל 3 פעילויות נכונות מתקבלות/);
  assert.match(html, /אין תשובה אחת נכונה/);
  assert.match(html, /1\. play football.*2\. listen to music.*3\. draw.*4\. play video games.*5\. ride a bike.*6\. read/is);
  assert.match(html, /1\. Correct.*2\. Incorrect.*listening to music.*4\. Incorrect.*playing video games.*6\. Incorrect.*riding a bike/is);
  assert.match(html, /Are you writing about me\?.*No.*Who are you writing about\?.*Yourself.*How many sentences\?.*Six/is);
  assert.match(html, /Example answer: playing football/i);
  assert.match(html, /How many sentences\?.*Six to eight.*How many different activities\?.*At least three/is);
  assert.match(html, /I love listening to music\..*I don't like reading\./is);
});


test('English library exposes lesson 4 as an active School Life lesson', async () => {
  const library = await read('english.html');
  const lesson4Url = new URL('../english-lesson4.html', import.meta.url);

  assert.equal(existsSync(lesson4Url), true);
  assert.match(library, /href="english-lesson4\.html"/);
  assert.match(library, /School Life/i);
});

test('English lesson 4 uses one-column progressive School Life flow', async () => {
  const html = await read('english-lesson4.html');
  const stages = html.match(/<article class="stage">/g) ?? [];
  const columns = html.match(/class="lesson-column"/g) ?? [];

  assert.equal(stages.length, 9);
  assert.equal(columns.length, 9);
  assert.doesNotMatch(html, /class="two"/);
  assert.match(html, /Write 3 school subjects you know in English/i);
  assert.match(html, /Vocabulary Bank/i);
  assert.match(html, /Match the Subject/i);
  assert.match(html, /Choose Your Subjects/i);
  assert.match(html, /WHY\?/i);
  assert.match(html, /Build My School Day/i);
  assert.match(html, /Guess the Subject/i);
  assert.match(html, /My School Day — Independent Writing/i);
  assert.match(html, /Pair Share \+ Exit Ticket/i);
});

test('English lesson 4 keeps teacher answers directly with question activities', async () => {
  const html = await read('english-lesson4.html');
  const answerBoxes = html.match(/class="teacher-answer"/g) ?? [];

  assert.equal(answerBoxes.length, 8);
  assert.match(html, /Math.*History.*PE.*Art.*Geography.*Science/is);
  assert.match(html, /אין תשובה אחת נכונה/);
  assert.match(html, /I like PE because it is fun\./i);
  assert.match(html, /My school starts at 8:00\./i);
  assert.match(html, /Example answer: Math/i);
  assert.match(html, /Six to eight/i);
  assert.match(html, /My favorite subject is PE because it is fun\./i);
});

test('English lesson 4 teaches the approved subject and because vocabulary', async () => {
  const html = await read('english-lesson4.html');

  for (const phrase of [
    'English',
    'Math',
    'Science',
    'PE',
    'History',
    'Art',
    'Music',
    'Geography',
    'Hebrew',
    'Computer Science',
    'fun',
    'interesting',
    'easy',
    'difficult',
    'boring'
  ]) {
    assert.match(html, new RegExp(phrase.replace(/[.*+?^\${}()|[\]\\]/g, '\\$&'), 'i'));
  }

  assert.match(html, /because = כי/i);
  assert.match(html, /I like PE because it is fun\./i);
  assert.match(html, /I don't like Math because it is difficult\./i);
  assert.match(html, /רמז 1 = 3 נקודות.*רמז 2 = 2 נקודות.*רמז 3 = נקודה אחת/is);
  assert.match(html, /3 דברים שלמדנו היום/);
});


test('English library exposes a test-prep page for lessons 1 to 4', async () => {
  const library = await read('english.html');
  const prepUrl = new URL('../english-test-prep.html', import.meta.url);

  assert.equal(existsSync(prepUrl), true);
  assert.match(library, /href="english-test-prep\.html"/);
  assert.match(library, /הכנה לבוחן/);
});

test('English test-prep page reviews lessons 1 to 4 in one column', async () => {
  const html = await read('english-test-prep.html');

  assert.match(html, /Lessons 1–4/i);
  assert.match(html, /Memory Dump/i);
  assert.match(html, /Vocabulary Rescue/i);
  assert.match(html, /Build It/i);
  assert.match(html, /Fix It/i);
  assert.match(html, /From Question to Answer/i);
  assert.match(html, /Challenge Round/i);
  assert.match(html, /Mini Test/i);
  assert.match(html, /Introducing Myself/i);
  assert.match(html, /My Daily Routine/i);
  assert.match(html, /Hobbies & Free Time/i);
  assert.match(html, /School Life/i);
  assert.doesNotMatch(html, /class="two"/);
});

test('English test-prep page includes study material and teacher answers', async () => {
  const html = await read('english-test-prep.html');

  assert.match(html, /My name is/i);
  assert.match(html, /wake up/i);
  assert.match(html, /I like \/ love \/ don't like \+ verb-ing/i);
  assert.match(html, /because/i);
  assert.match(html, /What's your name\?/i);
  assert.match(html, /What do you do after school\?/i);
  assert.match(html, /What is your favorite subject\? Why\?/i);
  assert.match(html, /Checklist/i);
  assert.match(html, /teacher-answer/);
});
