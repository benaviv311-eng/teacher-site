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

test('home page exposes Nutrition Science as a separate destination', async () => {
  const html = await read('index.html');
  assert.match(html, /nutrition-science\.html/);
  assert.match(html, /מדעי התזונה/);
});

test('shared navigation exposes Nutrition Science as its own icon and destination', async () => {
  const nav = await read('site-nav.js');
  assert.match(nav, /nutrition-science\.html/);
  assert.match(nav, /nutrition-grade8-lesson1\.html/);
  assert.match(nav, /מדעי תזונה/);
  assert.match(nav, /🔬/);
});

test('lesson 1 includes approved calorie quiz and energy-use section', async () => {
  const html = await read('nutrition-grade8-lesson1.html');
  assert.match(html, /מה יותר קלורי/);
  assert.match(html, /חפיסה שלמה של שוקולד פרה/);
  assert.match(html, /לאן האנרגיה הולכת/);
  assert.match(html, /להחזיק את הגוף עובד/);
  assert.match(html, /מאזן אנרגיה/);
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
  const pages = ['index.html','lessons.html','lesson-sleep.html','critical-thinking.html','nutrition-builder.html','nutrition-science.html','nutrition-grade8-lesson1.html','games.html'];
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

test('shared navigation includes the English teacher area', async () => {
  const nav = await read('site-nav.js');
  assert.match(nav, /english\.html/);
  assert.match(nav, /אנגלית/);
  assert.match(nav, /current === 'english\.html'/);
});

test('English page teaches lesson 1 with separate teacher and student guidance', async () => {
  const html = await read('english.html');
  assert.match(html, /אנגלית/);
  assert.match(html, /Introducing Myself/);
  assert.match(html, /מה אני עושה כמורה/);
  assert.match(html, /מה התלמידים עושים/);
  assert.match(html, /45 דקות/);
  assert.match(html, /site-nav\.js/);
});

test('English lesson 1 opens with Hot Seat and includes its rules and support language', async () => {
  const html = await read('english.html');
  assert.match(html, /Hot Seat/);
  assert.match(html, /It is…/);
  assert.match(html, /You can…/);
  assert.match(html, /It has…/);
  assert.match(html, /football/);
  assert.match(html, /pizza/);
  assert.match(html, /שתי קבוצות/);
});

test('English area injects lesson 2 My Daily Routine with board prep, vocabulary, game and exit ticket', async () => {
  const nav = await read('site-nav.js');
  assert.match(nav, /שיעור 2 — My Daily Routine/);
  assert.match(nav, /Today I can talk about my daily routine in English/);
  assert.match(nav, /wake up/);
  assert.match(nav, /get dressed/);
  assert.match(nav, /eat breakfast/);
  assert.match(nav, /do homework/);
  assert.match(nav, /take a shower/);
  assert.match(nav, /Meet Maya/);
  assert.match(nav, /Mime & Guess/);
  assert.match(nav, /What time do you wake up\?/);
  assert.match(nav, /Exit Ticket/);
});
