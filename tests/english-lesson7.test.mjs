import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('English library exposes lesson 7 as an active English Challenge lesson', async () => {
  const library = await read('english.html');
  const lessonUrl = new URL('../english-lesson7.html', import.meta.url);
  assert.equal(existsSync(lessonUrl), true);
  assert.match(library, /href="english-lesson7\.html"/);
  assert.match(library, /English Challenge/i);
});

test('English lesson 7 keeps the five-part challenge flow in one column', async () => {
  const html = await read('english-lesson7.html');
  assert.equal((html.match(/<article class="stage">/g) ?? []).length, 5);
  assert.equal((html.match(/class="lesson-column"/g) ?? []).length, 5);
  assert.equal((html.match(/class="teacher-answer"/g) ?? []).length, 5);
  assert.doesNotMatch(html, /class="two"/);
  for (const title of ['Verb Word Search','Complete the Sentences','Reading Comprehension','Opposites','Adjective Scramble']) assert.match(html, new RegExp(title,'i'));
});

test('English lesson 7 word search is a smaller 16x16 grid and still contains all 26 approved verbs', async () => {
  const html = await read('english-lesson7.html');
  for (const verb of ['go','eat','drink','play','read','write','run','walk','sleep','open','close','help','study','watch','listen','swim','jump','cook','clean','dance','remember','understand','practice','exercise','travel','answer']) {
    assert.match(html, new RegExp(`\\b${verb}\\b`, 'i'));
  }
  assert.match(html, /16×16/);
  assert.match(html, /1 point/i);
  assert.match(html, /3 points/i);
});

test('English lesson 7 uses the harder sentence completion bank and context clues', async () => {
  const html = await read('english-lesson7.html');
  for (const word of ['avoid','improve','decide','crowded','proud','careful','borrow','return','prepare','suddenly']) {
    assert.match(html, new RegExp(`\\b${word}\\b`, 'i'));
  }
  assert.match(html, /Before the test, Maya decided to/i);
  assert.match(html, /The bus was so .* that we had to stand near the door/i);
  assert.match(html, /The lights went out .* and everyone became quiet/i);
});

test('English lesson 7 uses the harder plastic-waste reading with inference questions', async () => {
  const html = await read('english-lesson7.html');
  assert.match(html, /reduce plastic waste at school/i);
  assert.match(html, /the school could not afford new machines/i);
  assert.match(html, /almost half as many plastic bottles as before/i);
  assert.match(html, /What can we infer from Maya's final comment\?/i);
  assert.match(html, /1-B.*2-C.*3-A.*4-B.*5-C.*6-B.*7-C/is);
});

test('English lesson 7 uses sixteen harder opposite pairs', async () => {
  const html = await read('english-lesson7.html');
  const pairs = [
    'ancient.*modern','generous.*selfish','ordinary.*unusual','patient.*impatient',
    'increase.*decrease','accept.*refuse','include.*exclude','create.*destroy',
    'succeed.*fail','possible.*impossible','careful.*careless','private.*public',
    'victory.*defeat','enter.*exit','expand.*contract','minimum.*maximum'
  ];
  for (const pair of pairs) assert.match(html, new RegExp(pair, 'is'));
});

test('English lesson 7 keeps the approved adjective scramble', async () => {
  const html = await read('english-lesson7.html');
  for (const scramble of ['YSONI','TEQIU','SYEA','CILTUFDIF','VEEISNPXE','PECHA','GONDERSUA','FESA','YVHEA','LTHGI']) assert.match(html, new RegExp(scramble));
});

test('English library exposes the lesson 7 classroom presentation page', async () => {
  const library = await read('english.html');
  const presentationUrl = new URL('../english-lesson7-presentation.html', import.meta.url);
  assert.equal(existsSync(presentationUrl), true);
  assert.match(library, /href="english-lesson7-presentation\.html"/);
});

test('Lesson 7 presentation runs directly on the site as ten classroom slides with upgraded content', async () => {
  const html = await read('english-lesson7-presentation.html');
  assert.equal((html.match(/<section class="slide/g) ?? []).length, 10);
  assert.doesNotMatch(html, /<iframe/i);
  assert.match(html, /id="prevSlide"/);
  assert.match(html, /id="nextSlide"/);
  assert.match(html, /id="fullscreenBtn"/);
  assert.match(html, /16×16/);
  assert.match(html, /reduce plastic waste at school/i);
  assert.match(html, /ancient/i);
  assert.match(html, /maximum/i);
});
