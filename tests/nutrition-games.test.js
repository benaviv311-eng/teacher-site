const fs = require('fs');
const path = require('path');

function read(file) {
  return fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
}

describe('nutrition science games segment', () => {
  test('nutrition science library exposes a dedicated games segment and metabolism Kahoot link', () => {
    const html = read('nutrition-science.html');
    expect(html).toContain('🎮 משחקים');
    expect(html).toContain('nutrition-kahoot.html');
    expect(html).toContain('Kahoot — מדעי התזונה');
  });

  test('nutrition Kahoot contains 20 questions and supports refreshing the question order', () => {
    const html = read('nutrition-kahoot.html');
    const questionCount = (html.match(/question:/g) || []).length;
    expect(questionCount).toBe(20);
    expect(html).toContain('רענן קהוט');
    expect(html).toContain('shuffle');
  });
});
