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

test('energy duel uses varied question types and supports refreshing the current question', async () => {
  const html = await read('nutrition-grade8-lesson1.html');
  assert.match(html, /רענן שאלה/);
  assert.match(html, /refreshQuestion/);
  assert.match(html, /questionPool/);
  assert.match(html, /מדרגות/);
  assert.match(html, /מזיע/);
  assert.match(html, /אי אפשר לדעת/);
  assert.match(html, /ריקוד/);
  assert.match(html, /עלייה/);
});

test('food quiz mixes everyday nutritious foods with treats and supports refresh', async () => {
  const html = await read('nutrition-grade8-lesson1.html');
  assert.match(html, /foodQuestionPool/);
  assert.match(html, /refreshFoodQuestion/);
  assert.match(html, /רענן שאלה/);
  assert.match(html, /יוגורט/);
  assert.match(html, /אבוקדו/);
  assert.match(html, /סוכריית גומי/);
  assert.match(html, /שוקולד פרה/);
  assert.match(html, /אי אפשר לדעת בלי לדעת/);
  assert.match(html, /קלוריות לא אומרות אם מזון בריא/);
});

test('health lessons page lists the sleep lesson as lesson 1 under its topic', async () => {
  const html = await read('lessons.html');
  assert.match(html, /שינה ואורח חיים בריא/);
  assert.match(html, /שיעור 1/);
  assert.match(html, /lesson-sleep\.html/);
  assert.match(html, /שינה: הבסיס לתפקוד היומיומי/);
});

test('health lessons page body does not list enrichment tools as lessons', async () => {
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

test('central feed data mixes content from multiple site areas', async () => {
  const js = await read('central-feed-data.js');
  assert.match(js, /sleep/);
  assert.match(js, /critical/);
  assert.match(js, /nutrition/);
  assert.match(js, /lesson-sleep\.html/);
  assert.match(js, /critical-thinking\.html/);
  assert.match(js, /nutrition-builder\.html/);
});

test('subject landing pages share the same library visual structure', async () => {
  for (const page of ['lessons.html','english.html','nutrition-science.html']) {
    const html = await read(page);
    assert.match(html, /data-subject-library/);
    assert.match(html, /subject-library\.css/);
    assert.match(html, /class="hero library-hero"/);
    assert.match(html, /class="topic-card"/);
    assert.match(html, /site-nav\.js/);
  }
});

test('English landing page is a clean lesson library', async () => {
  const html = await read('english.html');
  assert.match(html, /כל שיעורי האנגלית/);
  assert.match(html, /english-lesson1\.html/);
  assert.match(html, /english-lesson2\.html/);
  assert.match(html, /Introducing Myself/);
  assert.match(html, /My Daily Routine/);
  assert.doesNotMatch(html, /מה אני עושה כמורה/);
});

test('English lesson 1 lives on its own page with teacher and student guidance', async () => {
  const html = await read('english-lesson1.html');
  assert.match(html, /Introducing Myself/);
  assert.match(html, /מה אני עושה כמורה/);
  assert.match(html, /מה התלמידים עושים/);
  assert.match(html, /Hot Seat/);
  assert.match(html, /It is…/);
  assert.match(html, /football/);
  assert.match(html, /45 דקות/);
  assert.match(html, /site-nav\.js/);
});

test('English lesson 2 lives on its own page with routine vocabulary, game and exit ticket', async () => {
  const html = await read('english-lesson2.html');
  assert.match(html, /שיעור 2 — My Daily Routine/);
  assert.match(html, /Today I can talk about my daily routine in English/);
  assert.match(html, /wake up/);
  assert.match(html, /get dressed/);
  assert.match(html, /eat breakfast/);
  assert.match(html, /do homework/);
  assert.match(html, /take a shower/);
  assert.match(html, /Meet Maya/);
  assert.match(html, /Mime & Guess/);
  assert.match(html, /What time do you wake up\?/);
  assert.match(html, /Exit Ticket/);
  assert.match(html, /site-nav\.js/);
});

test('shared navigation keeps English active across English subpages', async () => {
  const nav = await read('site-nav.js');
  assert.match(nav, /english\.html/);
  assert.match(nav, /startsWith\('english-'\)/);
});

test('all core pages load shared frozen navigation', async () => {
  const pages = ['index.html','lessons.html','lesson-sleep.html','critical-thinking.html','nutrition-builder.html','nutrition-science.html','nutrition-grade8-lesson1.html','games.html','english.html','english-lesson1.html','english-lesson2.html'];
  for (const page of pages) {
    const html = await read(page);
    assert.match(html, /site-nav\.js/, `${page} should load site-nav.js`);
  }
});

test('English lesson 1 prep board includes the lesson vocabulary bank', async () => {
  const html = await read('english-lesson1.html');
  assert.match(html, /VOCABULARY BANK/);
  for (const word of ['football','basketball','tennis','music','clarinet','theater','gaming','drawing','dancing','strength training','dog','school','pizza','hamburger','Thailand']) {
    assert.match(html, new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});
