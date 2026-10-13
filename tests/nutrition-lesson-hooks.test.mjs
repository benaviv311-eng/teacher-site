import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

for (const [file, hook] of [
  ['nutrition-grade8-lesson1.html', 'מה מכיל יותר אנרגיה — כף טחינה או קערה גדולה של אבטיח'],
  ['nutrition-grade8-lesson2.html', 'אם אני לא אוכל כמה שעות — המטבוליזם שלי מתחיל'],
]) {
  test(`${file} opens with a board plan and five reveal discussion questions`, async () => {
    const html = await read(file);
    assert.match(html, /היום נגלה 3 דברים/);
    assert.match(html, new RegExp(hook));
    assert.match(html, /מה אתם אומרים\?/);
    assert.equal((html.match(/class="hook-question"/g) ?? []).length, 5);
    assert.match(html, /גלה/);
  });
}

test('lesson 1 adds memorable food-energy facts, myths and teacher sources', async () => {
  const html = await read('nutrition-grade8-lesson1.html');
  assert.match(html, /9–4–4/);
  assert.match(html, /1 גרם שומן/);
  assert.match(html, /1 גרם פחמימ/);
  assert.match(html, /1 גרם חלבון/);
  assert.match(html, /100 גרם אבטיח/);
  assert.match(html, /100 גרם שקדים/);
  assert.match(html, /טחינה/);
  assert.match(html, /שמן זית/);
  assert.match(html, /זיעה.*קלוריות|קלוריות.*זיעה/s);
  assert.match(html, /אימון.*מוחק.*ארוחה|ארוחה.*מוחק.*אימון/s);
  assert.match(html, /ביסוס מדעי למורה/);
  assert.match(html, /fda\.gov/);
  assert.match(html, /ncbi\.nlm\.nih\.gov/);
});
