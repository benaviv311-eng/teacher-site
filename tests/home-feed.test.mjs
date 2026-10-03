import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('home page exposes a central feed and shared feed data', async () => {
  const html = await read('index.html');
  assert.match(html, /id="centralFeed"/);
  assert.match(html, /central-feed-data\.js/);
});

test('bottom navigation includes a lessons destination', async () => {
  const html = await read('index.html');
  assert.match(html, /href="lessons\.html"/);
  assert.match(html, /📖/);
});

test('lessons page lists the sleep lesson as lesson 1 under its topic', async () => {
  const html = await read('lessons.html');
  assert.match(html, /שינה ואורח חיים בריא/);
  assert.match(html, /שיעור 1/);
  assert.match(html, /lesson-sleep\.html/);
  assert.match(html, /שינה: הבסיס לתפקוד היומיומי/);
});

test('lessons page body does not list enrichment tools as lessons', async () => {
  const html = await read('lessons.html');
  assert.doesNotMatch(html, /<h2>תוכן נוסף<\/h2>/);
  assert.doesNotMatch(html, /<h3>חשיבה ביקורתית ותודעה חברתית<\/h3>/);
  assert.doesNotMatch(html, /<h3>בונה תפריט<\/h3>/);
});

test('sleep lesson has an icon-only fixed home button on the left', async () => {
  const html = await read('lesson-sleep.html');
  assert.match(html, /class="home-fixed"/);
  assert.match(html, /href="index\.html"/);
  assert.match(html, /\.home-fixed\{position:fixed;top:12px;left:14px/);
  assert.match(html, /aria-label="בית"/);
});

test('every page loads the shared frozen navigation and sleep lesson has no top-right back icon', async () => {
  const pages = ['index.html','lessons.html','lesson-sleep.html','critical-thinking.html','nutrition-builder.html','games.html'];
  for (const page of pages) {
    const html = await read(page);
    assert.match(html, /site-nav\.js/, `${page} should load site-nav.js`);
  }
  const sleep = await read('lesson-sleep.html');
  assert.doesNotMatch(sleep, /class="back"/);
});

test('central feed data mixes content from multiple site areas', async () => {
  const js = await read('central-feed-data.js');
  assert.match(js, /sleep/);
  assert.match(js, /critical/);
  assert.match(js, /nutrition/);
  assert.match(js, /lesson-sleep\.html/);
  assert.match(js, /critical-thinking\.html/);
  assert.match(js, /nutrition-builder\.html/);
});
