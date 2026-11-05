import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const url = (path) => new URL(`../${path}`, import.meta.url);
const read = (path) => readFile(url(path), 'utf8');
const exists = async (path) => { try { await access(url(path)); return true; } catch { return false; } };

test('lesson 4 links to a dedicated classroom test page', async () => {
  assert.equal(await exists('nutrition-grade8-lesson4-classwork.html'), true);
  const lesson = await read('nutrition-grade8-lesson4.html');
  assert.match(lesson, /nutrition-grade8-lesson4-classwork\.html/);
  assert.match(lesson, /עבודת כיתה/);
});

test('classroom test keeps the approved 100-point structure and word bank', async () => {
  const html = await read('nutrition-grade8-lesson4-classwork.html');
  assert.match(html, /45 דקות/);
  assert.match(html, /100 נקודות/);
  assert.match(html, /בנק המושגים/);
  assert.match(html, /ATP/);
  assert.match(html, /גליקוגן/);
  assert.match(html, /מטבוליזם/);
  assert.match(html, /NEAT/);
  assert.match(html, /חלק ב׳/);
  assert.match(html, /חלק ג׳/);
  assert.match(html, /חלק ד׳/);
  assert.doesNotMatch(html, /מפתח תשובות|תשובה נכונה/);
});