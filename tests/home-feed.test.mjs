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

test('lessons page contains lessons only, not enrichment tools', async () => {
  const html = await read('lessons.html');
  assert.doesNotMatch(html, /תוכן נוסף/);
  assert.doesNotMatch(html, /critical-thinking\.html/);
  assert.doesNotMatch(html, /nutrition-builder\.html/);
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
