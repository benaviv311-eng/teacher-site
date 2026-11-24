import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const read=name=>readFileSync(new URL('../'+name,import.meta.url),'utf8');
const ctx={window:{}};
vm.runInNewContext(read('sports-excellence-goggins-data.js'),ctx,{filename:'sports-excellence-goggins-data.js'});
const d=ctx.window.GOGGINS_UNIT;
const teacher=read('sports-excellence-goggins.html');
const slides=read('sports-excellence-goggins-slides.html');
const library=read('sports-excellence.html');
const js=html=>[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(a=>a[1]).filter(Boolean).join('\n');

test('six lessons contain the full autobiographical sequence',()=>{
  assert.equal(d.sessions.length,6);
  assert.equal(Array.from(d.sessions,s=>s.id).join(','),'8,9,10,11,12,13');
  assert.equal(d.sections.length,26);
  assert.equal(Array.from(d.sections,s=>s.id).join(','),'1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,2.1,2.2,3.1,3.2,4.1,4.2,5.1,5.2,6.1,6.2,7.1,7.2,8.1,8.2,9.1,9.2,10.1,10.2');
});
test('teacher and slides source all their facts and prompts from the same canonical data',()=>{
  assert.match(teacher,/src="sports-excellence-goggins-data\.js"/);
  assert.match(slides,/src="sports-excellence-goggins-data\.js"/);
  assert.match(teacher,/s\.ideas\.map/);
  assert.match(slides,/s\.ideas\.map/);
  for(const s of d.sections){
    assert.ok(s.title&&s.question&&s.story&&s.science&&s.activity&&s.answer&&s.teacher,s.id);
    assert.equal(s.ideas.length,3,s.id);
    assert.equal(s.questions.length,3,s.id);
    assert.ok(d.sessions.some(x=>x.id===s.session),s.id);
    assert.ok(d.images[s.image],s.id);
    for(const k of s.sources) assert.ok(d.refs[k],s.id+' missing citation '+k);
  }
});
test('interactive deck offers section/deep links, quiz answer slides, optional speech',()=>{
  assert.equal(d.quiz.length,12);
  assert.ok(d.sessions.every(s=>d.quiz.filter(q=>q.session===s.id).length===2));
  for(const q of d.quiz){assert.equal(q.a.length,3);assert.ok(q.correct>=0&&q.correct<3);assert.ok(q.why)}
  assert.match(slides,/add\(sess\.id,'quiz-q'/);
  assert.match(slides,/add\(sess\.id,'quiz-a'/);
  assert.match(slides,/SpeechSynthesisUtterance/);
  assert.match(slides,/p\.get\('section'\)/);
  assert.match(slides,/p\.get\('lesson'\)/);
  assert.match(teacher,/sports-excellence-goggins-slides\.html\?section=/);
  assert.match(library,/href="sports-excellence-goggins\.html"/);
});
test('all executable inline scripts have valid JavaScript syntax',()=>{
  assert.doesNotThrow(()=>new Function(js(teacher)));
  assert.doesNotThrow(()=>new Function(js(slides)));
});
test('age appropriate safeguards and photo source links are present',()=>{
  assert.match(teacher,/כאב/);
  assert.match(teacher,/ילדות/);
  assert.match(slides,/credit/);
  assert.equal(d.sections.length*3+d.quiz.length*2+d.sessions.length*2,114);
  for(const photo of Object.values(d.images)){assert.ok(photo.src&&photo.credit&&photo.page)}
});
