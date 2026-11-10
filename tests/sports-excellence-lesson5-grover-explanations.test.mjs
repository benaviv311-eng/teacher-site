import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (filename) => readFile(new URL(`../${filename}`, import.meta.url), 'utf8');

test('Grover concepts are explained in depth to teachers and summarized in the matching slide', async () => {
  const teacher = await read('sports-excellence-lesson5.html');
  const slides = await read('sports-excellence-lesson5-slides.html');

  const types = ['Cooler', 'Closer', 'Cleaner'];
  const descriptions = [...teacher.matchAll(/<article class="grover-depth" data-grover-concept="([^"]+)">([\s\S]*?)<\/article>/g)];
  assert.deepEqual(descriptions.map((match) => match[1]), types);
  for (const [i, type] of types.entries()) {
    const body = descriptions[i][2];
    assert.ok(body.length > 650, `${type}: expected real teacher guidance, not one-line copy`);
    for (const term of ['בלחץ', 'יתרון', 'מגבלה', 'כדורעף', 'שאלה למורה']) {
      assert.ok(body.includes(term), `${type}: missing ${term}`);
    }
    assert.match(slides, new RegExp(`<div data-grover-concept="${type}">[\\s\\S]*?<b>${type}<\\/b>`));
  }

  assert.match(teacher, /I OWN THIS/);
  assert.match(teacher, /DONE\. NEXT/);
  assert.match(teacher, /אין מבחן מדעי/);
  assert.match(slides, /לא סוגי אישיות מדעיים/);
  assert.match(slides, /מגבלה אפשרית/);
});

test('Grover expansion keeps lesson layout, section order and 55-slide quiz navigation intact', async () => {
  const teacher = await read('sports-excellence-lesson5.html');
  const slides = await read('sports-excellence-lesson5-slides.html');
  const lessonParts = [...teacher.matchAll(/<section class="card lesson-part(?: [^"]+)?" id="([^"]+)" data-minutes="(\d+)"/g)];
  assert.deepEqual(lessonParts.map((match) => match[1]), ['open', 'approaches', 'lab', 'tools', 'balance', 'closing']);
  assert.equal(lessonParts.reduce((sum, match) => sum + Number(match[2]), 0), 50);
  assert.match(slides, /55 שקופיות/);
  assert.match(slides, /data-part="approaches"/);
  assert.match(slides, /data-part="quiz"/);
  assert.match(teacher, /slides\.html\?start=25/);
  assert.match(teacher, /slides\.html\?start=46/);
});
