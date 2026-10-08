import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('energy game uses advanced mixed-format questions and keeps refresh', async () => {
  const html = await read('nutrition-grade8-lesson1.html');
  assert.match(html, /energyQuestionPool/);
  assert.match(html, /refreshEnergyQuestion/);
  assert.match(html, /מה חסר לנו כדי לדעת/);
  assert.match(html, /מי מהתלמידים צודק/);
  assert.match(html, /שאלת חישוב/);
  assert.match(html, /איזה סדר נכון/);
  assert.match(html, /אי אפשר לדעת מהמידע הזה/);
  assert.match(html, /🔄 רענן שאלה/);
});

test('food game uses varied portion, density and nutrition-quality questions and keeps refresh', async () => {
  const html = await read('nutrition-grade8-lesson1.html');
  assert.match(html, /foodQuestionPool/);
  assert.match(html, /refreshFoodQuestion/);
  assert.match(html, /מנה כפולה/);
  assert.match(html, /100 גרם שקדים/);
  assert.match(html, /יוגורט עם בננה ושיבולת שועל/);
  assert.match(html, /אי אפשר לדעת בלי לדעת את הכמות/);
  assert.match(html, /אותו מספר קלוריות/);
  assert.match(html, /קלוריות מודדות אנרגיה, לא איכות תזונתית/);
  assert.match(html, /🔄 רענן שאלה/);
});
