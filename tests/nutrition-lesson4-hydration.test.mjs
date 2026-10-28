import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const url = (path) => new URL(`../${path}`, import.meta.url);
const read = (path) => readFile(url(path), 'utf8');
const exists = async (path) => {
  try { await access(url(path)); return true; }
  catch { return false; }
};

test('grade 8 lesson 4 exists, is single-column, and covers hydration as four core concepts', async () => {
  assert.equal(await exists('nutrition-grade8-lesson4.html'), true);
  const html = await read('nutrition-grade8-lesson4.html');

  assert.match(html, /data-layout="single-column"/);
  assert.match(html, /מים.*זיעה.*אלקטרוליטים.*התייבשות/s);
  assert.match(html, /כמות.*תזמון/s);
  assert.match(html, /ניסוי.*יד|יד.*רטובה/s);
  assert.match(html, /מה קורה אם/);
  assert.match(html, /האם צריך.*איזוטוני|משקה איזוטוני/s);
  assert.match(html, /1,800/);
  assert.match(html, /2,300/);
  assert.match(html, /מלח.*נתרן|נתרן.*מלח/s);
  assert.match(html, /בנה התאוששות/);
  assert.match(html, /נוזלים.*פחמימה.*חלבון.*אלקטרוליטים/s);
});

test('lesson 4 contains ten three-choice myth questions with answer reveals', async () => {
  const html = await read('nutrition-grade8-lesson4.html');
  assert.equal((html.match(/class="myth-question"/g) ?? []).length, 10);
  assert.equal((html.match(/class="myth-options"/g) ?? []).length, 10);
  assert.equal((html.match(/class="myth-answer"/g) ?? []).length, 10);
});

test('nutrition concepts and library expose lesson 4', async () => {
  const concepts = await read('nutrition-concepts.js');
  const library = await read('nutrition-science.html');

  assert.match(concepts, /nutrition-grade8-lesson4\.html/);
  for (const term of ['מים', 'זיעה', 'אלקטרוליטים', 'התייבשות']) {
    assert.match(concepts, new RegExp(`term: '${term}'`));
  }

  assert.match(library, /nutrition-grade8-lesson4\.html/);
  assert.match(library, /מים.*זיעה.*אלקטרוליטים|שתייה.*זיעה/s);
});
