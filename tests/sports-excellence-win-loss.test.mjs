import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const script = read('sports-excellence-win-loss-data.js');
const ctx = { window: {} };
vm.runInNewContext(script, ctx, { filename: 'sports-excellence-win-loss-data.js' });
const d = ctx.window.WINLOSS;
const teacher = read('sports-excellence-lesson6.html');
const slides = read('sports-excellence-lesson6-slides.html');
const library = read('sports-excellence.html');

test('lesson 6 and 7 preserve all approved and developed sections', () => {
  assert.equal(d.sections.length, 14);
  assert.equal(d.sections.filter(s => s.lesson === 6).length, 8);
  assert.equal(d.sections.filter(s => s.lesson === 7).length, 6);
  assert.equal(Array.from(d.sections, s => s.id).join(','), '1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,2.1,2.2,2.3,2.4,2.5,2.6');
});

test('every teacher section has matching slideshow data', () => {
  for(const s of d.sections) {
    assert.ok(s.title && s.question && s.story && s.explain && s.teacher && s.practice, s.id);
    assert.equal(s.points.length, 3, s.id);
    assert.ok(s.prompts.length >= 3, s.id);
    assert.ok(d.images[s.image], 'missing photo for '+s.id);
    for(const ref of s.source ?? []) assert.ok(d.refs[ref], 'missing reference '+ref);
  }
  for(const page of [teacher,slides]) assert.match(page, /src="sports-excellence-win-loss-data\.js"/);
  assert.match(slides,/s\.points\.map/);
  assert.match(teacher,/s\.points\.map/);
});

test('ten value dilemmas remain subjective with no correctness grading', () => {
  assert.equal(d.dilemmas.length, 10);
  for(const pair of d.dilemmas) {
    assert.equal(pair.length,2);
    assert.ok(pair.every(x=>typeof x==='string' && x.length>15));
  }
  assert.match(slides,/אין תשובה נכונה אחת/);
});

test('presenter navigation and lesson transitions are wired', () => {
  assert.match(slides,/URLSearchParams\(location\.search\)/);
  assert.match(slides,/requested=p\.get\('section'\)/);
  assert.match(slides,/lesson7Start=items\.length/);
  assert.match(slides,/סיכום שיעור 6/);
  assert.match(slides,/if\(s\.id==="2\.3"\)/);
  assert.match(teacher,/sports-excellence-lesson6-slides\.html\?section=/);
  assert.match(library,/href="sports-excellence-lesson6\.html"/);
});

test('browser scripts compile, source images are credited', () => {
  for(const page of [teacher,slides]) {
    const inline = [...page.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(Boolean).join('\n');
    assert.doesNotThrow(()=>new Function(inline));
  }
  for(const img of Object.values(d.images)) {
    assert.match(img.url,/commons\.wikimedia\.org/);
    assert.ok(img.credit && img.link && img.url);
  }
  assert.match(slides,/photocredit/);
});
