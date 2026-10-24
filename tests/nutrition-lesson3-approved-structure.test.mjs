import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('lesson 3 follows the approved four-core-concepts lesson structure', async () => {
  const html = await read('nutrition-grade8-lesson3.html');

  assert.match(html, /ארבעת השחקנים בצלחת/);
  assert.match(html, /היום נגלה 3 דברים/);
  assert.match(html, /אם חלבון בונה שריר/);
  assert.equal((html.match(/class="hook-question"/g) ?? []).length, 5);

  for (const concept of ['פחמימה', 'חלבון', 'שומן', 'סיבים']) {
    assert.match(html, new RegExp(`פרק.*${concept}`));
  }

  assert.match(html, /מה זה/);
  assert.match(html, /למה זה מעניין/);
  assert.match(html, /מאכלים/);
  assert.match(html, /מה קורה בגוף/);
  assert.match(html, /חיבור לאימון/);
  assert.match(html, /מיני־אתגר|מיני-אתגר/);

  assert.match(html, /זירת ההחלטות/);
  assert.match(html, /כולם מצביעים/);
  assert.match(html, /עוברים לפינה/);
  assert.match(html, /לפני אימון/);
  assert.match(html, /אחרי אימון/);
  assert.match(html, /יום בלי אימון/);
  assert.match(html, /תיק חקירה/);

  assert.match(html, /10 שאלות כלליות/);
  assert.equal((html.match(/class="review-question"/g) ?? []).length, 10);
  assert.match(html, /גלוקוז.*גליקוגן/s);
  assert.match(html, /פרי שלם.*מיץ/s);
  assert.match(html, /חלבון.*הכי חשוב.*ספורטאים/s);
});

test('lesson 3 concept loop uses the four lesson topics and closes with definition, example and relevance', async () => {
  const js = await read('nutrition-concepts.js');
  const lesson3 = js.slice(js.indexOf("'nutrition-grade8-lesson3.html'"));
  const lesson3Block = lesson3.slice(0, lesson3.indexOf(']\n  };') + 1);

  for (const term of ['פחמימה', 'חלבון', 'שומן', 'סיבים']) {
    assert.match(lesson3Block, new RegExp(`term: '${term}'`));
  }
  assert.match(js, /למה חשוב לי/);
  assert.match(js, /importance/);
});

test('nutrition library names lesson 3 as the four players on the plate', async () => {
  const library = await read('nutrition-science.html');
  assert.match(library, /ארבעת השחקנים בצלחת/);
});


test('lesson 3 is truly single-column and keeps every student active throughout the lesson', async () => {
  const html = await read('nutrition-grade8-lesson3.html');

  assert.match(html, /data-layout="single-column"/);
  assert.doesNotMatch(html, /\.station,\.rule-grid\{grid-template-columns:1fr 1fr\}/);
  assert.match(html, /body \.concept-loop-grid\{grid-template-columns:1fr!important\}/);

  assert.equal((html.match(/class="participation-stop"/g) ?? []).length, 4);
  assert.match(html, /כולם מצביעים/);
  assert.match(html, /שיחה בזוגות/);
  assert.match(html, /תלמיד אקראי/);
});
