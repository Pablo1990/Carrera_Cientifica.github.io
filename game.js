import {
  LANG,
  MAX_GAME_ROUNDS,
  randomInt,
  rollDie,
  applyImpact,
  hasMetNobelRequirements,
  createInitialState,
  buildQueue,
  checkAchievements,
  snapshotStats
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
const achievementsPanelEl = document.getElementById('achievements-panel');
const achievementsTitleEl = document.getElementById('achievements-title');
const achievementsListEl = document.getElementById('achievements-list');

let currentLang = 'es';

const state = createInitialState();

function renderStats() {
  statsEl.textContent = LANG[currentLang].statsText(state);
}

/**
 * Returns the translated label strings for the given achievement IDs.
 * Defensively filters out IDs with no translation (e.g. an achievement
 * added before the locale object was updated).
 * @param {string[]} ids - Achievement IDs to look up.
 * @param {Object} translations - The locale's achievements object.
 * @returns {string[]} Translated labels for known IDs.
 */
function getAchievementLabels(ids, translations) {
  return ids.filter((id) => translations[id]).map((id) => translations[id]);
}

function renderAchievements() {
  const t = LANG[currentLang];
  achievementsTitleEl.textContent = t.achievementsTitle;
  const labels = getAchievementLabels(state.achievements, t.achievements);
  if (labels.length === 0) {
    achievementsListEl.innerHTML = `<li class="achievements-placeholder">${t.achievementsPlaceholder}</li>`;
  } else {
    achievementsListEl.innerHTML = labels
      .map((label) => `<li class="achievement-item">${label}</li>`)
      .join('');
  }
  achievementsPanelEl.hidden = false;
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
      const before = snapshotStats(state);
      applyImpact(state, option.impact, roll);
      const newAchievements = checkAchievements(state);
      newAchievements.forEach((id) => state.achievements.push(id));
      const t = LANG[currentLang];
      const impactLine = t.impactText(before, state);
      const achievementLines = getAchievementLabels(newAchievements, t.achievements)
        .map((label) => `🏅 ${label}`)
        .join('\n');
      resultEl.textContent = [
        `${t.dieText(roll)} ${t.decisionText(option.label)}`,
        impactLine,
        achievementLines
      ].filter(Boolean).join('\n');
      renderStats();
      if (newAchievements.length > 0) renderAchievements();
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
  state.achievements = [];
  state.maxRounds = Math.min(MAX_GAME_ROUNDS, questions.length);
  state.queue = buildQueue(questions, state.maxRounds);

  const descriptor = t.genderDescriptors[state.gender];
  characterEl.textContent = t.characterIntro(descriptor, state.age);
  resultEl.textContent = t.dieIntro;
  startBtn.hidden = true;
  restartBtn.hidden = true;

  achievementsListEl.innerHTML = `<li class="achievements-placeholder">${t.achievementsPlaceholder}</li>`;
  achievementsTitleEl.textContent = t.achievementsTitle;
  achievementsPanelEl.hidden = false;

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
  achievementsTitleEl.textContent = t.achievementsTitle;
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
  state.achievements = [];
  characterEl.textContent = '';
  statsEl.textContent = '';
  questionTitleEl.textContent = LANG[currentLang].questionSectionStart;
  questionEl.textContent = LANG[currentLang].questionPlaceholder;
  optionsEl.innerHTML = '';
  resultEl.textContent = LANG[currentLang].resultPlaceholder;
  achievementsPanelEl.hidden = true;
  startBtn.hidden = false;
  restartBtn.hidden = true;
}

langEsBtn.addEventListener('click', () => switchLanguage('es'));
langEnBtn.addEventListener('click', () => switchLanguage('en'));
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
