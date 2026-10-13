import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('nutrition science library exposes a dedicated games segment and metabolism Kahoot link', async () => {
  const html = await read('nutrition-science.html');
  assert.match(html, /🎮 משחקים/);
  assert.match(html, /nutrition-kahoot\.html/);
  assert.match(html, /Kahoot — מטבוליזם/);
});

test('nutrition Kahoot contains 20 questions and supports refreshing the question order', async () => {
  const html = await read('nutrition-kahoot.html');
  assert.equal((html.match(/question:/g) ?? []).length, 20);
  assert.match(html, /רענן קהוט/);
  assert.match(html, /function shuffle\(/);
});

test('nutrition Kahoot stays inside the nutrition section in global navigation', async () => {
  const nav = await read('site-nav.js');
  assert.match(nav, /current === 'nutrition-kahoot\.html'/);
});
