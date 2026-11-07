import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('lesson 5 is the approved sugar lesson with the full flow', async () => {
  const html = await read('nutrition-grade8-lesson5.html');
  for (const phrase of [
    'סוכר: מה באמת קורה בגוף',
    '90 דקות',
    'סוכר באמת נותן בוסט',
    'המסע של הסוכר בגוף',
    'כמה סוכר באמת יש פה',
    'למה קולה ותפוח הם לא אותו דבר',
    'סוכר, דבש, סילאן ומייפל',
    'בלשי סוכר',
    'סוכר מוסף מול סוכר שנמצא טבעית',
    'כמה סוכר זה',
    'מעבדת הקיוסק'
  ]) assert.match(html, new RegExp(phrase));
});

test('lesson 5 keeps exactly ten four-option kiosk questions with hidden teacher answers', async () => {
  const html = await read('nutrition-grade8-lesson5.html');
  assert.equal((html.match(/class="kiosk-question"/g) ?? []).length, 10);
  assert.equal((html.match(/class="quiz-option"/g) ?? []).length, 40);
  assert.equal((html.match(/class="teacher-answer"/g) ?? []).length, 10);
  assert.match(html, /קוקה.?קולה/);
  assert.match(html, /משקה אנרגיה/);
  assert.match(html, /אייס קפה/);
  assert.match(html, /שוקו/);
  assert.match(html, /חטיף חלבון/);
});

test('lesson 5 concept loop uses glucose insulin added sugar and absorption rate', async () => {
  const js = await read('nutrition-concepts.js');
  const match = js.match(/'nutrition-grade8-lesson5\.html': \[([\s\S]*?)\n\s*\],\n\s*'nutrition-grade8-lesson6\.html'/);
  assert.ok(match, 'lesson 5 concepts should exist');
  for (const term of ['גלוקוז','אינסולין','סוכר מוסף','קצב ספיגה']) {
    assert.match(match[1], new RegExp(term));
  }
});

test('nutrition library labels lesson 5 as sugar', async () => {
  const html = await read('nutrition-science.html');
  const i = html.indexOf('nutrition-grade8-lesson5.html');
  assert.ok(i >= 0);
  const snippet = html.slice(i, i + 900);
  assert.match(snippet, /סוכר/);
  assert.match(snippet, /גלוקוז|אינסולין/);
  assert.doesNotMatch(snippet, /מים, זיעה ואלקטרוליטים/);
});