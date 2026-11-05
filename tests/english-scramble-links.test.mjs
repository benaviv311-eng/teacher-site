import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const read = name => readFileSync(new URL(`../${name}`, import.meta.url), 'utf8');

test('the English games library opens playable Word Scramble without removing existing games', () => {
  const html = read('english-games.html');
  assert.match(html, /<a\b[^>]*href="english-scramble\.html"[^>]*>/);
  assert.match(html, /Word Scramble/);
  for (const existingGame of ['Hot Seat', 'Mime &amp; Guess', 'Sentence Auction']) {
    assert.ok(html.includes(existingGame) || html.includes(existingGame.replace('&amp;', '&')), existingGame);
  }
});

test('the Grade 7 English landing page links directly to the playable game', () => {
  const html = read('english.html');
  assert.match(html, /<a\b[^>]*href="english-scramble\.html"[^>]*>/);
  assert.match(html, /Word Scramble/);
  assert.match(html, /href="english-games\.html"/);
});

test('linked game assets exist and use relative paths compatible with GitHub Pages', () => {
  for (const name of ['english-scramble.html', 'english-scramble.css', 'english-scramble.js', 'english-scramble-core.mjs']) {
    assert.ok(existsSync(new URL(`../${name}`, import.meta.url)), `${name} missing`);
  }
  const html = read('english-scramble.html');
  assert.match(html, /href="english-games\.html"/);
  assert.match(html, /src="english-scramble\.js"/);
  assert.match(html, /href="english-scramble\.css"/);
});
