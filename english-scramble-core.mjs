// The word bank follows the topics taught in English lessons 1–5, with a few familiar extras.
export const WORD_BANK = Object.freeze({
  easy: [
    { word: 'DOG', he: 'כלב', clue: 'An animal that can bark' },
    { word: 'CAT', he: 'חתול', clue: 'An animal that says meow' },
    { word: 'BOOK', he: 'ספר', clue: 'You read it' },
    { word: 'FOOD', he: 'אוכל', clue: 'Something you eat' },
    { word: 'PLAY', he: 'לשחק', clue: 'What you do in a game' },
    { word: 'GAME', he: 'משחק', clue: 'Something you play for fun' },
    { word: 'HOME', he: 'בית', clue: 'Where you live' },
    { word: 'LIKE', he: 'לאהוב / לחבב', clue: 'To enjoy something' },
    { word: 'READ', he: 'לקרוא', clue: 'What you do with a book' },
    { word: 'TEAM', he: 'קבוצה', clue: 'People who play together' },
    { word: 'SONG', he: 'שיר', clue: 'You can sing it' },
    { word: 'BALL', he: 'כדור', clue: 'You throw, kick or catch it' },
    { word: 'DAY', he: 'יום', clue: 'The time between two nights' },
    { word: 'EAT', he: 'לאכול', clue: 'What you do at lunch' },
  ],
  medium: [
    { word: 'PIZZA', he: 'פיצה', clue: 'A round food with cheese' },
    { word: 'MUSIC', he: 'מוזיקה', clue: 'You listen to it' },
    { word: 'SCHOOL', he: 'בית ספר', clue: 'A place where students learn' },
    { word: 'TENNIS', he: 'טניס', clue: 'A sport played with rackets' },
    { word: 'GAMING', he: 'משחקי מחשב', clue: 'Playing video games' },
    { word: 'FAMILY', he: 'משפחה', clue: 'Parents, siblings and relatives' },
    { word: 'FRIEND', he: 'חבר / חברה', clue: 'Someone you like spending time with' },
    { word: 'SPORTS', he: 'ספורט', clue: 'Football and basketball are examples' },
    { word: 'LESSON', he: 'שיעור', clue: 'A class at school' },
    { word: 'DANCING', he: 'ריקוד', clue: 'Moving your body to music' },
    { word: 'DRAWING', he: 'ציור', clue: 'Making pictures with a pencil' },
    { word: 'MORNING', he: 'בוקר', clue: 'The beginning of the day' },
    { word: 'HOBBIES', he: 'תחביבים', clue: 'Activities you enjoy in free time' },
    { word: 'SISTER', he: 'אחות', clue: 'A female sibling' },
  ],
  hard: [
    { word: 'FOOTBALL', he: 'כדורגל', clue: 'A sport with goals and a round ball' },
    { word: 'PRACTICE', he: 'להתאמן', clue: 'To repeat something to improve' },
    { word: 'HOMEWORK', he: 'שיעורי בית', clue: 'School work done after class' },
    { word: 'CLARINET', he: 'קלרינט', clue: 'A musical wind instrument' },
    { word: 'THAILAND', he: 'תאילנד', clue: 'A country in Southeast Asia' },
    { word: 'BREAKFAST', he: 'ארוחת בוקר', clue: 'The first meal of the day' },
    { word: 'BASKETBALL', he: 'כדורסל', clue: 'A sport where players shoot into a hoop' },
    { word: 'AFTERNOON', he: 'אחר הצהריים', clue: 'The time between noon and evening' },
    { word: 'STRENGTH', he: 'כוח', clue: 'The ability to use muscular force' },
    { word: 'FAVORITE', he: 'מועדף', clue: 'The thing you like most' },
    { word: 'EXERCISE', he: 'פעילות גופנית', clue: 'Movement that keeps you fit' },
    { word: 'QUESTION', he: 'שאלה', clue: 'Something you ask to get an answer' },
    { word: 'TOGETHER', he: 'ביחד', clue: 'With another person, not alone' },
    { word: 'DAUGHTER', he: 'בת', clue: 'A female child in a family' },
  ],
});

function shuffledCopy(items, random) {
  const result = items.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.min(i, Math.max(0, Math.floor(random() * (i + 1))));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function shuffleLetters(word, random = Math.random) {
  const normalized = String(word).toUpperCase();
  if (new Set(normalized).size < 2) throw new Error('Word must contain at least two different letters');
  const result = shuffledCopy([...normalized].map((letter, id) => ({ id, letter })), random);
  if (result.map(tile => tile.letter).join('') === normalized) {
    const first = result.findIndex(tile => tile.letter !== result[0].letter);
    [result[0], result[first]] = [result[first], result[0]];
  }
  return result;
}

export function chooseWords(level, count, random = Math.random) {
  const bank = WORD_BANK[level];
  if (!bank) throw new Error('Unknown level');
  if (!Number.isInteger(count) || count < 1 || count > bank.length) throw new Error('Invalid word count');
  return shuffledCopy(bank, random).slice(0, count);
}

export function teamForTurn(turnIndex, teamCount) {
  if (![2, 3, 4].includes(teamCount) || !Number.isInteger(turnIndex) || turnIndex < 0) {
    throw new Error('Invalid team count or turn index');
  }
  return turnIndex % teamCount;
}

export function pointsForCorrect(hintUsed) {
  return hintUsed ? 5 : 10;
}

export function evaluateAnswer(tiles, selectedIds, word) {
  if (!Array.isArray(selectedIds) || selectedIds.length !== word.length || new Set(selectedIds).size !== selectedIds.length) return false;
  const byId = new Map(tiles.map(tile => [tile.id, tile.letter]));
  const answer = selectedIds.map(id => byId.get(id));
  return answer.every(letter => typeof letter === 'string') && answer.join('').toUpperCase() === word.toUpperCase();
}
