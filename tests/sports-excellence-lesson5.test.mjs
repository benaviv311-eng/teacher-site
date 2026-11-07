import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (name) => readFile(new URL(`../${name}`, import.meta.url), 'utf8');

test('lesson 5 gives teachers a complete 50-minute sequence with usable answers', async () => {
  const html = await read('sports-excellence-lesson5.html');
  assert.match(html, /<html lang="he" dir="rtl">/);
  const parts = [...html.matchAll(/<section class="card lesson-part(?: [^"]+)?" id="([^"]+)" data-minutes="(\d+)"/g)];
  assert.deepEqual(parts.map((x) => x[1]), ['open', 'approaches', 'lab', 'tools', 'balance', 'closing']);
  assert.deepEqual(parts.map((x) => Number(x[2])), [5, 8, 10, 10, 9, 8]);
  assert.equal(parts.reduce((sum, x) => sum + Number(x[2]), 0), 50);
  assert.match(html, /מוכנות/);
  assert.match(html, /החלטיות/);
  assert.match(html, /שליטה עצמית/);
  assert.match(html, /התאוששות/);
  assert.match(html, /Cooler/);
  assert.match(html, /Closer/);
  assert.match(html, /Cleaner/);
  assert.match(html, /לא אבחון/);
  assert.match(html, /תשובה נכונה/);
  assert.match(html, /20 שניות/);
  assert.match(html, /7 שניות/);
  assert.match(html, /לא ניתן להסיק/);
  assert.match(html, /שחיקה/);
  assert.match(html, /כרטיס יציאה/);
  assert.match(html, /sports-excellence-lesson5-slides\.html/);
  assert.match(html, /site-nav\.js/);
});

test('student deck runs the same six-part lesson without leaking teacher answers', async () => {
  const html = await read('sports-excellence-lesson5-slides.html');
  assert.match(html, /<html lang="he" dir="rtl">/);
  assert.match(html, /aspect-ratio:\s*16\s*\/\s*9/);
  assert.match(html, /data-part="open"/);
  assert.match(html, /data-part="approaches"/);
  assert.match(html, /data-part="lab"/);
  assert.match(html, /data-part="tools"/);
  assert.match(html, /data-part="balance"/);
  assert.match(html, /data-part="closing"/);
  assert.match(html, /שיקגו/);
  assert.match(html, /סטיב קר/);
  assert.match(html, /כדורגל/);
  assert.match(html, /פסק זמן/);
  assert.match(html, /20 שניות/);
  assert.match(html, /7 שניות/);
  assert.doesNotMatch(html, /תשובה נכונה/);
  assert.match(html, /BroadcastChannel/);
  assert.match(html, /requestFullscreen/);
});

test('course library offers lesson 5 without replacing the previous lessons', async () => {
  const html = await read('sports-excellence.html');
  for (let i = 1; i <= 5; i++) assert.match(html, new RegExp(`sports-excellence-lesson${i}\\.html`));
  assert.match(html, /מה מבדיל בין שחקן טוב לשחקן בלתי ניתן לעצירה/);
});
