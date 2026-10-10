import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('metabolism lesson keeps both 20-question banks complete and myth answers balanced', async () => {
  const html = await read('nutrition-grade8-lesson2.html');
  const opening = html.match(/const openingQuestions=\[(.*?)\];\s*\n\s*const mythQuestions=/s)?.[1] ?? '';
  const myths = html.match(/const mythQuestions=\[(.*?)\];\s*\n\s*function makeQuiz/s)?.[1] ?? '';

  assert.equal((opening.match(/id:'o\d+'/g) ?? []).length, 20);
  assert.equal((myths.match(/id:'m\d+'/g) ?? []).length, 20);
  assert.equal((myths.match(/answer:0/g) ?? []).length, 10, 'myth quiz should contain 10 true answers');
  assert.equal((myths.match(/answer:1/g) ?? []).length, 10, 'myth quiz should contain 10 false answers');
});
