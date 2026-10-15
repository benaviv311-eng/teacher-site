import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('grade 8 nutrition lessons load the shared practical nutrition module', async () => {
  const nav = await read('site-nav.js');
  assert.match(nav, /nutrition-grade8-/);
  assert.match(nav, /nutrition-practical\.js/);
});

test('practical nutrition module teaches a flexible balanced plate and the role of each component', async () => {
  const js = await read('nutrition-practical.js');
  for (const text of ['½', '¼', 'חלבון', 'פחמימה', 'שומן', 'סיבים', 'מים', 'ויטמינים ומינרלים']) {
    assert.match(js, new RegExp(text));
  }
  assert.match(js, /מודל חזותי/);
  assert.match(js, /לא חוק/);
});

test('each current nutrition lesson gets foods, a practical protocol and an investigation case', async () => {
  const js = await read('nutrition-practical.js');
  assert.match(js, /nutrition-grade8-lesson1\.html/);
  assert.match(js, /nutrition-grade8-lesson2\.html/);
  assert.match(js, /מאזן אנרגיה/);
  assert.match(js, /מטבוליזם/);
  assert.match(js, /מאכלים שמתחברים לנושא/);
  assert.match(js, /פרוטוקול מעשי/);
  assert.match(js, /תיק חקירה/);
  assert.match(js, /beforebegin/);
});
