import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const url = (path) => new URL(`../${path}`, import.meta.url);
const read = (path) => readFile(url(path), 'utf8');
const exists = async (path) => { try { await access(url(path)); return true; } catch { return false; } };

test('lesson 4 exposes a teacher answer key but student page does not', async () => {
  assert.equal(await exists('nutrition-grade8-lesson4-classwork-answers.html'), true);
  const lesson = await read('nutrition-grade8-lesson4.html');
  const classwork = await read('nutrition-grade8-lesson4-classwork.html');
  assert.match(lesson, /nutrition-grade8-lesson4-classwork-answers\.html/);
  assert.match(lesson, /פתרון למורה/);
  assert.doesNotMatch(classwork, /nutrition-grade8-lesson4-classwork-answers\.html/);
});

test('answer key includes all four parts and scoring guidance', async () => {
  const html = await read('nutrition-grade8-lesson4-classwork-answers.html');
  assert.match(html, /חלק א׳/);
  assert.match(html, /חלק ב׳/);
  assert.match(html, /חלק ג׳/);
  assert.match(html, /חלק ד׳/);
  assert.match(html, /100 נקודות/);
  assert.match(html, /מטבוליזם/);
  assert.match(html, /ATP/);
  assert.match(html, /אנאירובי א־לקטי/);
  assert.match(html, /אירובית/);
});