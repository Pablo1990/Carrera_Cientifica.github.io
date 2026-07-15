import {
  LANG,
  MAX_GAME_ROUNDS,
  randomInt,
  shuffle,
  rollDie,
  applyImpact,
  hasMetNobelRequirements,
  createInitialState,
  getEnding
} from './src/game-logic.js';

const characterEl = document.getElementById('character');
const statsEl = document.getElementById('stats');
const questionTitleEl = document.getElementById('question-title');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const resultEl = document.getElementById('result');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const langEsBtn = document.getElementById('lang-es');
const langEnBtn = document.getElementById('lang-en');
const endingPanelEl = document.getElementById('ending-panel');
const endingCharacterLabelEl = document.getElementById('ending-character-label');
const endingPhotoEl = document.getElementById('ending-photo');
const endingNameEl = document.getElementById('ending-name');
const endingDescriptionEl = document.getElementById('ending-description');

let currentLang = 'es';

const state = createInitialState();

function renderStats() {
  statsEl.textContent = LANG[currentLang].statsText(state);
}

function hasMetNobel() {
  return hasMetNobelRequirements(state);
}

function finishGame() {
  const t = LANG[currentLang];
  optionsEl.innerHTML = '';
  questionTitleEl.textContent = t.gameEndTitle;

  if (hasMetNobel()) {
    questionEl.textContent = t.nobelWin;
  } else {
    questionEl.textContent = t.nobelLose;
  }

  resultEl.textContent = t.gameEndResult(state);

  // Show ending character card
  const ending = getEnding(state);
  const endingText = ending[currentLang];
  endingCharacterLabelEl.textContent = t.endingCharacterLabel;
  endingNameEl.textContent = endingText.name;
  endingDescriptionEl.textContent = endingText.description;

  if (ending.photo) {
    endingPhotoEl.src = ending.photo;
    endingPhotoEl.alt = endingText.name;
    endingPhotoEl.hidden = false;
    endingPhotoEl.onerror = () => {
      endingPhotoEl.hidden = true;
    };
  } else {
    endingPhotoEl.hidden = true;
  }
  endingPanelEl.hidden = false;

  startBtn.hidden = true;
  restartBtn.hidden = false;
}

function renderQuestion() {
  if (state.rounds >= state.maxRounds || state.queue.length === 0) {
    finishGame();
    renderStats();
    return;
  }

  const q = state.queue.pop();
  questionTitleEl.textContent = q.title;
  questionEl.textContent = q.text;
  optionsEl.innerHTML = '';

  q.options.forEach((option) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = option.label;
    button.addEventListener('click', () => {
      optionsEl.querySelectorAll('button').forEach((optionButton) => {
        optionButton.disabled = true;
      });
      const roll = rollDie();
      applyImpact(state, option.impact, roll);
      const t = LANG[currentLang];
      resultEl.textContent = `${t.dieText(roll)} ${t.decisionText(option.label)}`;
      renderStats();
      renderQuestion();
    });
    optionsEl.appendChild(button);
  });
}

function startGame() {
  const t = LANG[currentLang];
  const questions = t.questions;

  state.age = 18 + randomInt(3);
  state.gender = t.genders[randomInt(t.genders.length)];
  state.prestige = 0;
  state.wellbeing = 50;
  state.savings = 10;
  state.papers = 0;
  state.discoveries = 0;
  state.rounds = 0;
  state.maxRounds = Math.min(MAX_GAME_ROUNDS, questions.length);
  state.queue = shuffle(questions).slice(0, state.maxRounds);

  const descriptor = t.genderDescriptors[state.gender];
  characterEl.textContent = t.characterIntro(descriptor, state.age);
  resultEl.textContent = t.dieIntro;
  startBtn.hidden = true;
  restartBtn.hidden = true;
  endingPanelEl.hidden = true;

  renderStats();
  renderQuestion();
}

function updateStaticUI() {
  const t = LANG[currentLang];
  document.documentElement.lang = t.htmlLang;
  document.title = t.pageTitle;
  document.getElementById('game-title').textContent = t.gameTitle;
  document.getElementById('subtitle').textContent = t.subtitle;
  document.getElementById('character-title').textContent = t.characterSectionTitle;
  document.getElementById('result-title').textContent = t.resultSectionTitle;
  startBtn.textContent = t.startBtnLabel;
  restartBtn.textContent = t.restartBtnLabel;

  langEsBtn.classList.toggle('active', currentLang === 'es');
  langEnBtn.classList.toggle('active', currentLang === 'en');
  langEsBtn.setAttribute('aria-pressed', currentLang === 'es');
  langEnBtn.setAttribute('aria-pressed', currentLang === 'en');
}

function switchLanguage(lang) {
  if (lang === currentLang) return;
  currentLang = lang;
  updateStaticUI();

  // Reset to initial pre-game state when language changes
  state.rounds = 0;
  state.queue = [];
  characterEl.textContent = '';
  statsEl.textContent = '';
  questionTitleEl.textContent = LANG[currentLang].questionSectionStart;
  questionEl.textContent = LANG[currentLang].questionPlaceholder;
  optionsEl.innerHTML = '';
  resultEl.textContent = LANG[currentLang].resultPlaceholder;
  endingPanelEl.hidden = true;
  startBtn.hidden = false;
  restartBtn.hidden = true;
}

langEsBtn.addEventListener('click', () => switchLanguage('es'));
langEnBtn.addEventListener('click', () => switchLanguage('en'));
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
