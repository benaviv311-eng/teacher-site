import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('lesson 3 is visually single-column throughout', async () => {
  const html = await read('nutrition-grade8-lesson3.html');
  assert.match(html, /\.concept-detail-grid[^}]*grid-template-columns:1fr/);
  assert.match(html, /\.station[^}]*grid-template-columns:1fr/);
  assert.match(html, /\.rule-grid[^}]*grid-template-columns:1fr/);
  assert.doesNotMatch(html, /grid-template-columns:repeat\((?:2|3|4),1fr\)/);
});

test('lesson 3 replaces plate-building with an everyone-participates decision arena', async () => {
  const html = await read('nutrition-grade8-lesson3.html');

  assert.match(html, /זירת ההחלטות/);
  assert.match(html, /כולם מצביעים/);
  assert.match(html, /3.*2.*1/s);
  assert.match(html, /עוברים לפינה/);
  assert.match(html, /תלמיד אקראי/);
  assert.match(html, /שינוי מצב/);
  assert.match(html, /מותר להחליף/);
  assert.match(html, /אין נקודה על דעת הרוב/);
  assert.match(html, /לפני אימון/);
  assert.match(html, /אחרי אימון/);
  assert.match(html, /פרי שלם/);
  assert.match(html, /יום בלי אימון/);

  assert.doesNotMatch(html, /דראפט הצלחת/);
  assert.doesNotMatch(html, /מי חסר בצלחת/);
  assert.doesNotMatch(html, /בנו ארוחה ב־30 שניות/);
  assert.doesNotMatch(html, /plateCases/);
  assert.doesNotMatch(html, /plateReveal/);
});
