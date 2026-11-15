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

test('English lesson 7 keeps the approved five-part challenge flow in one column', async () => {
  const html = await read('english-lesson7.html');
  const stages = html.match(/<article class="stage">/g) ?? [];
  const columns = html.match(/class="lesson-column"/g) ?? [];
  const answers = html.match(/class="teacher-answer"/g) ?? [];

  assert.equal(stages.length, 5);
  assert.equal(columns.length, 5);
  assert.equal(answers.length, 5);
  assert.doesNotMatch(html, /class="two"/);
  assert.match(html, /Verb Word Search/i);
  assert.match(html, /Complete the Sentences/i);
  assert.match(html, /Reading Comprehension/i);
  assert.match(html, /Opposites/i);
  assert.match(html, /Adjective Scramble/i);
});

test('English lesson 7 word search uses 20 regular verbs and 6 bonus verbs', async () => {
  const html = await read('english-lesson7.html');
  for (const verb of ['go','eat','drink','play','read','write','run','walk','sleep','open','close','help','study','watch','listen','swim','jump','cook','clean','dance']) {
    assert.match(html, new RegExp(`\\b${verb}\\b`, 'i'));
  }
  for (const verb of ['remember','understand','practice','exercise','travel','answer']) {
    assert.match(html, new RegExp(`\\b${verb}\\b`, 'i'));
  }
  assert.match(html, /18×18/);
  assert.match(html, /1 point/i);
  assert.match(html, /3 points/i);
});

test('English lesson 7 includes the approved sentence completion bank', async () => {
  const html = await read('english-lesson7.html');
  for (const word of ['borrow','quiet','arrive','difficult','library','choose','carry','homework','remember','finish']) {
    assert.match(html, new RegExp(`\\b${word}\\b`, 'i'));
  }
  assert.match(html, /I usually .* at school before 8:00/i);
  assert.match(html, /Please be .* when the teacher is speaking/i);
  assert.match(html, /Try to .* the new words for the test/i);
});

test('English lesson 7 includes the approved Daniel reading and six questions', async () => {
  const html = await read('english-lesson7.html');
  assert.match(html, /Daniel is 13 years old and lives near his school/i);
  assert.match(html, /His favorite subject is Science because he likes learning how things work/i);
  assert.match(html, /Twice a week, he plays basketball with his friends/i);
  assert.match(html, /What time does he usually go to bed\?/i);
  assert.match(html, /1-B.*2-C.*3-A.*4-B.*5-A.*6-B/is);
});

test('English lesson 7 uses the approved harder opposites and adjective scramble', async () => {
  const html = await read('english-lesson7.html');
  for (const pair of ['noisy.*quiet','empty.*full','expensive.*cheap','dangerous.*safe','heavy.*light','polite.*rude','narrow.*wide','arrive.*leave','forget.*remember','begin.*finish']) {
    assert.match(html, new RegExp(pair, 'is'));
  }
  for (const scramble of ['YSONI','TEQIU','SYEA','CILTUFDIF','VEEISNPXE','PECHA','GONDERSUA','FESA','YVHEA','LTHGI']) {
    assert.match(html, new RegExp(scramble));
  }
});

test('English library exposes the lesson 7 classroom presentation page', async () => {
  const library = await read('english.html');
  const presentationUrl = new URL('../english-lesson7-presentation.html', import.meta.url);

  assert.equal(existsSync(presentationUrl), true);
  assert.match(library, /href="english-lesson7-presentation\.html"/);
  assert.match(library, /מצגת שיעור 7|English Challenge.*מצגת/is);
});

test('Lesson 7 presentation runs directly on the site as ten classroom slides', async () => {
  const html = await read('english-lesson7-presentation.html');
  const slides = html.match(/<section class="slide/g) ?? [];

  assert.equal(slides.length, 10);
  assert.doesNotMatch(html, /<iframe/i);
  assert.match(html, /id="prevSlide"/);
  assert.match(html, /id="nextSlide"/);
  assert.match(html, /id="fullscreenBtn"/);
  assert.match(html, /Verb Word Search/i);
  assert.match(html, /Complete the Sentences/i);
  assert.match(html, /Reading Comprehension/i);
  assert.match(html, /Opposites/i);
  assert.match(html, /Adjective Scramble/i);
});
