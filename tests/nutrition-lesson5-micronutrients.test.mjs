import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const url = (path) => new URL(`../${path}`, import.meta.url);
const read = (path) => readFile(url(path), 'utf8');
const exists = async (path) => {
  try { await access(url(path)); return true; }
  catch { return false; }
};

test('grade 8 lesson 5 exists, is single-column, and teaches four micronutrients', async () => {
  assert.equal(await exists('nutrition-grade8-lesson5.html'), true);
  const html = await read('nutrition-grade8-lesson5.html');

  assert.match(html, /data-layout="single-column"/);
  assert.match(html, /ברזל.*סידן.*ויטמין D.*B12/s);
  assert.match(html, /90 דקות/);
  assert.match(html, /ספיגה/);
  assert.match(html, /מועשר/);
  assert.match(html, /בנה יום|בונים יום/);
  assert.match(html, /לא מאבחנים|לא לאבחן/);
});

test('lesson 5 contains forty three-choice dilemmas with hidden teacher answers', async () => {
  const html = await read('nutrition-grade8-lesson5.html');
  assert.equal((html.match(/class="dilemma-question"/g) ?? []).length, 40);
  assert.equal((html.match(/class="dilemma-options"/g) ?? []).length, 40);
  assert.equal((html.match(/class="dilemma-answer"/g) ?? []).length, 40);

  for (const concept of ['iron','calcium','vitamin-d','b12']) {
    const match = html.match(new RegExp(`data-concept="${concept}"[\\s\\S]*?<\\/section>`));
    assert.ok(match, `missing ${concept} section`);
    assert.equal((match[0].match(/class="dilemma-question"/g) ?? []).length, 10, `${concept} should have 10 dilemmas`);
  }
});

test('lesson 5 gives food sources, deficiency context, and practical questions for every concept', async () => {
  const html = await read('nutrition-grade8-lesson5.html');
  for (const phrase of [
    'המוגלובין','ויטמין C','עדשים',
    'עצמות','1,300','יוגורט',
    '600 IU','שמש','דג',
    'מערכת העצבים','מזון מועשר','טבעונ'
  ]) {
    assert.match(html, new RegExp(phrase));
  }
});

test('nutrition concepts and library expose lesson 5', async () => {
  const concepts = await read('nutrition-concepts.js');
  const library = await read('nutrition-science.html');

  assert.match(concepts, /nutrition-grade8-lesson5\.html/);
  for (const term of ['ברזל', 'סידן', 'ויטמין D', 'B12']) {
    assert.match(concepts, new RegExp(`term: '${term}'`));
  }

  assert.match(library, /nutrition-grade8-lesson5\.html/);
  assert.match(library, /ויטמינים.*מינרלים|ברזל.*סידן/s);
});
