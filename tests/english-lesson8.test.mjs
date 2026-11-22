import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('English library links lesson 8 Reading & Games Challenge', async () => {
  const library = await read('english.html');
  assert.match(library, /href="english-lesson8\.html"/);
  assert.match(library, /Reading & Games Challenge/i);
  assert.match(library, /href="english-lesson8-presentation\.html"/);
});

test('lesson 8 exposes the approved reading and game flow', async () => {
  const html = await read('english-lesson8.html');
  assert.match(html, /Reading Challenge 1/i);
  assert.match(html, /Reading Challenge 2/i);
  assert.match(html, /Reading Challenge 3/i);
  assert.match(html, /Hangman/i);
  assert.match(html, /Guess the Word/i);
  assert.match(html, /Animal Word Search/i);
});

test('lesson 8 keeps three reading levels and answer keys', async () => {
  const html = await read('english-lesson8.html');
  assert.match(html, /Maya is 12 years old/i);
  assert.match(html, /Tom visited the city zoo/i);
  assert.match(html, /students in Class 7B started a project/i);
  assert.match(html, /TEACHER KEY/i);
});

test('lesson 8 presentation viewer exists and points to the uploaded deck', async () => {
  assert.equal(existsSync(new URL('../english-lesson8-presentation.html', import.meta.url)), true);
  const viewer = await read('english-lesson8-presentation.html');
  assert.match(viewer, /1D1yjyFgSzChNVgDhKky7KPk1OlsiFltA/);
  assert.match(viewer, /Google Slides|PPTX/i);
});
