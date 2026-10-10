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
