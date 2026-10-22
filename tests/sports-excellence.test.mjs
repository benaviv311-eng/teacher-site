import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('sports excellence lesson 1 is a full classroom lesson with reflection and science', async () => {
  const html = await read('sports-excellence-lesson1.html');
  assert.match(html, /אין שלוש תכונות/);
  assert.match(html, /אם הייתם משחקים שוב עכשיו/);
  assert.match(html, /מקרה מבחן/);
  assert.match(html, /דילמת המצטיין/);
  assert.match(html, /תכונה אחת שכבר חזקה אצלי/);
  assert.match(html, /מה המחקר אומר/);
  assert.match(html, /תרגול מכוון/);
  assert.match(html, /18%/);
  assert.match(html, /Macnamara/);
  assert.match(html, /Ericsson/);
  assert.match(html, /משוב/);
  assert.match(html, /site-nav\.js/);
});

test('sports excellence lesson 2 is the current complete improvement lesson', async () => {
  const html = await read('sports-excellence-lesson2.html');
  assert.match(html, /איך באמת משתפרים/);
  assert.match(html, /זמן/);
  assert.match(html, /קושי/);
  assert.match(html, /משוב/);
  assert.match(html, /תיקון/);
  assert.match(html, /המאמן הכי גרוע/);
  assert.match(html, /הקושי הנכון/);
  assert.match(html, /ארבע הפינות/);
  assert.match(html, /מאגר שאלות/);
  assert.match(html, /site-nav\.js/);
});

test('sports excellence library links to the current lesson 2', async () => {
  const html = await read('sports-excellence.html');
  assert.match(html, /sports-excellence-lesson2\.html/);
  assert.match(html, /איך באמת משתפרים/);
});
