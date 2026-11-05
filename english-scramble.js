import {
  chooseWords, evaluateAnswer, pointsForCorrect, shuffleLetters, teamForTurn,
} from './english-scramble-core.mjs';

const LEVELS = {
  easy: { title: 'Easy', range: '3–4 letters', icon: '🌱' },
  medium: { title: 'Medium', range: '5–7 letters', icon: '⚡' },
  hard: { title: 'Hard', range: '8–11 letters', icon: '🔥' },
};

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]);
}

export function mountScramble(doc, clock = globalThis, random = Math.random) {
  const root = doc.getElementById('scrambleApp');
  if (!root) throw new Error('Word Scramble mounting point is missing');

  const settings = { mode: 'solo', level: 'easy', teamCount: 2 };
  let state = null;
  let timerId = null;

  function clearTimer() {
    if (timerId !== null) clock.clearInterval(timerId);
    timerId = null;
  }

  function currentWord() { return state.words[state.turn]; }
  function currentTeam() { return state.mode === 'teams' ? teamForTurn(state.turn, state.teamCount) : 0; }
  function answerText() {
    const byId = new Map(state.tiles.map(tile => [tile.id, tile.letter]));
    return state.selectedIds.map(id => byId.get(id)).join('');
  }

  function startGame({ mode = settings.mode, level = settings.level, teamCount = settings.teamCount } = {}) {
    if (!['solo', 'teams'].includes(mode) || !LEVELS[level] || ![2, 3, 4].includes(Number(teamCount))) {
      throw new Error('Invalid Word Scramble game settings');
    }
    clearTimer();
    settings.mode = mode;
    settings.level = level;
    settings.teamCount = Number(teamCount);
    const words = chooseWords(level, mode === 'teams' ? 12 : 10, random);
    state = {
      mode, level, teamCount: Number(teamCount), words, turn: 0,
      tiles: shuffleLetters(words[0].word, random), selectedIds: [],
      scores: Array.from({ length: mode === 'teams' ? Number(teamCount) : 1 }, () => 0),
      phase: 'playing', hintUsed: false, paused: false, secondsLeft: mode === 'teams' ? 45 : null,
      result: null, awarded: 0, message: '',
    };
    if (mode === 'teams') {
      timerId = clock.setInterval(() => {
        if (!state || state.phase !== 'playing' || state.paused || state.mode !== 'teams') return;
        state.secondsLeft = Math.max(0, state.secondsLeft - 1);
        if (state.secondsLeft === 0) {
          state.phase = 'revealed';
          state.result = 'timeout';
          state.message = 'Time is up! ⏰';
          render();
        } else {
          updateTimerDisplay();
        }
      }, 1000);
    }
    render();
  }

  function canEdit() { return state?.phase === 'playing' && !state.paused; }

  function selectTile(id) {
    if (!canEdit()) return;
    const numericId = Number(id);
    if (state.tiles.some(tile => tile.id === numericId) && !state.selectedIds.includes(numericId)) {
      state.selectedIds.push(numericId);
      state.message = '';
      render();
    }
  }

  function undoTile() {
    if (!canEdit()) return;
    state.selectedIds.pop();
    state.message = '';
    render();
  }

  function clearTiles() {
    if (!canEdit()) return;
    state.selectedIds = [];
    state.message = '';
    render();
  }

  function showHint() {
    if (!canEdit()) return;
    state.hintUsed = true;
    state.message = 'Use the clue to find the word.';
    render();
  }

  function reveal(result, message) {
    if (!canEdit()) return;
    state.phase = 'revealed';
    state.result = result;
    state.message = message;
    render();
  }

  function submitAnswer() {
    if (!canEdit()) return;
    if (state.selectedIds.length !== currentWord().word.length) {
      state.message = 'בחרו את כל האותיות לפני הבדיקה.';
      render();
      return;
    }
    if (!evaluateAnswer(state.tiles, state.selectedIds, currentWord().word)) {
      state.message = 'Not quite! Try again 💪';
      render();
      return;
    }
    state.awarded = pointsForCorrect(state.hintUsed);
    state.scores[currentTeam()] += state.awarded;
    reveal('correct', `Correct! +${state.awarded} points 🎉`);
  }

  function skipWord() { reveal('skipped', 'No points this time. Keep learning!'); }

  function finishGame() {
    if (!state) return;
    state.phase = 'finished';
    clearTimer();
    render();
  }

  function nextWord() {
    if (!state || state.phase !== 'revealed') return;
    if (state.turn === state.words.length - 1) return finishGame();
    state.turn += 1;
    state.tiles = shuffleLetters(currentWord().word, random);
    state.selectedIds = [];
    state.hintUsed = false;
    state.paused = false;
    state.secondsLeft = state.mode === 'teams' ? 45 : null;
    state.phase = 'playing';
    state.result = null;
    state.awarded = 0;
    state.message = '';
    render();
  }

  function togglePause() {
    if (state?.mode !== 'teams' || state.phase !== 'playing') return;
    state.paused = !state.paused;
    render();
  }

  function resetToSetup() { clearTimer(); state = null; render(); }

  function modeButton(mode, icon, title, description) {
    return `<button type="button" data-action="mode" data-value="${mode}" class="choice-card ${settings.mode === mode ? 'is-selected' : ''}" aria-pressed="${settings.mode === mode}"><span class="choice-icon">${icon}</span><strong>${title}</strong><small>${description}</small></button>`;
  }

  function setupHTML() {
    return `<section class="scramble-hero"><div class="hero-eyebrow">🔤 English Games · Grade 7</div><h1>Word Scramble<span class="hero-dot">.</span></h1><p>Arrange the letters. Discover the word. Win the challenge!</p><div class="hero-stats"><span>🧠 Vocabulary</span><span>🏆 3 Levels</span><span>👥 Solo & Teams</span></div></section>
      <section class="scramble-panel setup-panel"><div class="section-heading"><span class="step-index">01</span><div><h2>איך רוצים לשחק?</h2><p>בחרו מצב משחק</p></div></div><div class="mode-grid">${modeButton('solo', '🎯', 'Individual', 'תרגול אישי בקצב שלך · 10 מילים')}${modeButton('teams', '🏆', 'Class Challenge', 'תחרות כיתתית · 12 תורות')}</div>
      <div class="section-heading section-spacer"><span class="step-index">02</span><div><h2>בחרו רמת קושי</h2><p>המילים משתנות לפי הרמה</p></div></div><div class="level-grid">${Object.entries(LEVELS).map(([level, details]) => `<button type="button" data-action="level" data-value="${level}" class="level-card ${settings.level === level ? 'is-selected' : ''}" aria-pressed="${settings.level === level}"><span>${details.icon}</span><strong>${details.title}</strong><small>${details.range}</small></button>`).join('')}</div>
      ${settings.mode === 'teams' ? `<div class="team-pick"><strong>כמה קבוצות משחקות?</strong><div class="team-count-options">${[2, 3, 4].map(count => `<button type="button" data-action="teams" data-value="${count}" class="small-choice ${settings.teamCount === count ? 'is-selected' : ''}" aria-pressed="${settings.teamCount === count}">${count} Teams</button>`).join('')}</div><p>לכל קבוצה אותו מספר תורות · 45 שניות לתור</p></div>` : ''}
      <button type="button" class="start-button" data-action="start">Start Game <span>←</span></button></section>`;
  }

  function scoreHTML() {
    if (state.mode === 'solo') {
      return `<div class="solo-score"><span>⭐ Your Score</span><strong>${state.scores[0]}</strong></div>`;
    }
    return `<div class="scoreboard" aria-label="Team scoreboard">${state.scores.map((score, team) => `<div class="team-score ${currentTeam() === team && state.phase !== 'finished' ? 'is-active' : ''}"><span>Team ${team + 1}</span><strong>${score}</strong></div>`).join('')}</div>`;
  }

  function tilesHTML() {
    const selected = new Set(state.selectedIds);
    return `<div class="letter-tiles" dir="ltr" aria-label="Scrambled letters">${state.tiles.map(tile => `<button type="button" data-action="tile" data-value="${tile.id}" class="letter-tile ${selected.has(tile.id) ? 'is-used' : ''}" aria-label="Letter ${tile.letter}" ${selected.has(tile.id) || state.phase !== 'playing' || state.paused ? 'disabled' : ''}>${tile.letter}</button>`).join('')}</div>`;
  }

  function answerHTML() {
    const answer = answerText();
    return `<div class="answer-slots" dir="ltr" aria-label="Your answer">${Array.from({ length: currentWord().word.length }, (_, index) => `<span class="answer-slot ${answer[index] ? 'has-letter' : ''}">${answer[index] || '·'}</span>`).join('')}</div>`;
  }

  function playHTML() {
    const progress = state.turn + 1;
    const total = state.words.length;
    const isTeams = state.mode === 'teams';
    const timer = state.secondsLeft === null ? '' : `00:${String(state.secondsLeft).padStart(2, '0')}`;
    return `<section class="scramble-play"><div class="play-head"><div><span class="eyebrow">${isTeams ? 'CLASS CHALLENGE' : 'INDIVIDUAL PRACTICE'} · ${LEVELS[state.level].title.toUpperCase()}</span><h1>${isTeams ? `Team ${currentTeam() + 1}'s turn` : 'Build the word!'}</h1><span class="progress-caption">Word ${progress} of ${total}</span></div><button type="button" class="text-button" data-action="restart">↶ New game</button></div>
      <div class="progress-track"><div style="width:${Math.round((progress / total) * 100)}%"></div></div>
      ${scoreHTML()}
      ${isTeams ? `<div class="timer-row"><span class="timer-pill ${state.secondsLeft <= 10 ? 'is-urgent' : ''}" aria-label="Time remaining">⏱ <b data-timer>${timer}</b></span><button type="button" class="pause-button" data-action="pause" ${state.phase !== 'playing' ? 'disabled' : ''}>${state.paused ? '▶ Resume' : 'Ⅱ Pause'}</button></div>` : ''}
      <div class="puzzle-card"><div class="puzzle-top"><span class="puzzle-label">UNSCRAMBLE THE LETTERS</span><span class="word-length">${currentWord().word.length} letters</span></div><div class="free-clue"><span>CLUE</span>${escapeHTML(currentWord().clue)}</div>${tilesHTML()}<div class="puzzle-divider"><span>YOUR ANSWER</span></div>${answerHTML()}
      ${state.hintUsed ? `<div class="hint-box" role="note">💡 פירוש בעברית: <span>${escapeHTML(currentWord().he)}</span></div>` : ''}
      <div class="feedback ${state.result === 'correct' ? 'is-correct' : state.result ? 'is-revealed' : ''}" role="status" aria-live="polite">${escapeHTML(state.message || (state.paused ? 'הזמן נעצר. לחצו Resume כדי להמשיך.' : 'Tap the letters in the right order.'))}</div>
      ${state.phase === 'revealed' ? `<div class="reveal-box"><span>The word is</span><strong dir="ltr">${currentWord().word}</strong><small>${escapeHTML(currentWord().he)}</small></div><button type="button" class="start-button" data-action="next">${progress === total ? 'See Results' : 'Next Word'} <span>←</span></button>` : `<div class="action-grid"><button type="button" class="main-action" data-action="check" ${state.paused ? 'disabled' : ''}>✓ Check Answer</button><button type="button" class="soft-action" data-action="undo" ${state.paused ? 'disabled' : ''}>↶ Undo</button><button type="button" class="soft-action" data-action="clear" ${state.paused ? 'disabled' : ''}>✕ Clear</button><button type="button" class="soft-action" data-action="hint" ${state.paused || state.hintUsed ? 'disabled' : ''}>💡 Hint</button><button type="button" class="soft-action skip-action" data-action="skip" ${state.paused ? 'disabled' : ''}>Skip →</button></div>`}</div>
      <p class="keyboard-tip">⌨️ אפשר גם להקליד אותיות, למחוק ב־Backspace ולאשר ב־Enter.</p></section>`;
  }

  function finishedHTML() {
    const best = Math.max(...state.scores);
    const winners = state.scores.map((score, index) => ({ score, index })).filter(team => team.score === best);
    const title = state.mode === 'solo' ? 'Amazing work!' : winners.length > 1 ? 'תיקו! 🤝' : `Team ${winners[0].index + 1} wins! 🏆`;
    return `<section class="scramble-hero end-hero"><span class="finish-icon">🏆</span><div class="hero-eyebrow">CHALLENGE COMPLETE</div><h1>${title}</h1><p>${state.mode === 'solo' ? `You earned ${state.scores[0]} points across ${state.words.length} words.` : `All ${state.words.length} turns are complete. Well played!`}</p></section>
      <section class="scramble-panel results-panel"><h2>${state.mode === 'teams' ? 'Final Scoreboard' : 'Your Results'}</h2>${scoreHTML()}<div class="results-actions"><button type="button" class="start-button" data-action="start">Play Again <span>←</span></button><button type="button" class="soft-action" data-action="restart">Change Mode / Level</button></div></section>`;
  }

  function updateTimerDisplay() {
    const element = root.querySelector?.('[data-timer]');
    if (!element) return render();
    element.textContent = `00:${String(state.secondsLeft).padStart(2, '0')}`;
    element.closest('.timer-pill')?.classList.toggle('is-urgent', state.secondsLeft <= 10);
  }

  function render() {
    const focused = doc.activeElement;
    const previousAction = focused?.dataset?.action;
    const previousValue = focused?.dataset?.value;
    root.innerHTML = !state ? setupHTML() : state.phase === 'finished' ? finishedHTML() : playHTML();
    if (!previousAction || typeof root.querySelector !== 'function') return;
    const matching = `[data-action="${previousAction}"]${previousValue !== undefined ? `[data-value="${previousValue}"]` : ''}`;
    let nextFocus = root.querySelector(matching);
    if (!nextFocus || nextFocus.disabled) {
      nextFocus = root.querySelector('[data-action="tile"]:not(:disabled)')
        || root.querySelector('[data-action="check"]:not(:disabled)')
        || root.querySelector('[data-action="next"]')
        || root.querySelector('[data-action="start"]');
    }
    nextFocus?.focus?.({ preventScroll: true });
  }

  root.addEventListener('click', event => {
    const button = event.target.closest('[data-action]');
    if (!button || button.disabled) return;
    const { action, value } = button.dataset;
    if (!state) {
      if (action === 'mode') settings.mode = value;
      if (action === 'level') settings.level = value;
      if (action === 'teams') settings.teamCount = Number(value);
      if (action === 'start') return startGame();
      return render();
    }
    if (action === 'tile') selectTile(value);
    if (action === 'undo') undoTile();
    if (action === 'clear') clearTiles();
    if (action === 'hint') showHint();
    if (action === 'check') submitAnswer();
    if (action === 'skip') skipWord();
    if (action === 'next') nextWord();
    if (action === 'pause') togglePause();
    if (action === 'restart') resetToSetup();
    if (action === 'start') startGame();
  });

  doc.addEventListener('keydown', event => {
    if (!canEdit() || ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target?.tagName)) return;
    if (/^[a-z]$/i.test(event.key)) {
      const tile = state.tiles.find(item => item.letter === event.key.toUpperCase() && !state.selectedIds.includes(item.id));
      if (tile) selectTile(tile.id);
    } else if (event.key === 'Backspace') {
      event.preventDefault();
      undoTile();
    } else if (event.key === 'Enter') {
      // Do not hijack Enter while a focused button can perform its own action.
      if (event.target?.tagName !== 'BUTTON') { event.preventDefault(); submitAnswer(); }
    } else if (event.key === 'Escape') {
      clearTiles();
    }
  });

  render();
  return {
    getState: () => state,
    startGame, selectTile, undoTile, clearTiles, showHint, submitAnswer,
    skipWord, nextWord, togglePause, finishGame,
  };
}

if (typeof document !== 'undefined') mountScramble(document);
