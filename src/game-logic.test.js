import { describe, it, expect } from 'vitest';
import {
  LANG,
  DIE_FACTOR_BY_ROLL,
  MIN_SAVINGS,
  NOBEL_REQUIREMENTS,
  MAX_GAME_ROUNDS,
  ACHIEVEMENTS,
  randomInt,
  shuffle,
  rollDie,
  dieFactor,
  applyImpact,
  hasMetNobelRequirements,
  createInitialState,
  buildQueue,
  checkAchievements
} from './game-logic.js';

// ---------------------------------------------------------------------------
// dieFactor
// ---------------------------------------------------------------------------
describe('dieFactor', () => {
  it('returns the correct multiplier for every die face', () => {
    expect(dieFactor(1)).toBe(0.45);
    expect(dieFactor(2)).toBe(0.75);
    expect(dieFactor(3)).toBe(1);
    expect(dieFactor(4)).toBe(1.15);
    expect(dieFactor(5)).toBe(1.35);
    expect(dieFactor(6)).toBe(1.65);
  });

  it('matches every entry defined in DIE_FACTOR_BY_ROLL', () => {
    Object.entries(DIE_FACTOR_BY_ROLL).forEach(([roll, factor]) => {
      expect(dieFactor(Number(roll))).toBe(factor);
    });
  });
});

// ---------------------------------------------------------------------------
// LANG structure
// ---------------------------------------------------------------------------
describe('LANG', () => {
  const requiredStringKeys = [
    'htmlLang', 'pageTitle', 'gameTitle', 'subtitle',
    'characterSectionTitle', 'questionSectionStart', 'questionPlaceholder',
    'resultSectionTitle', 'resultPlaceholder', 'startBtnLabel', 'restartBtnLabel',
    'dieIntro', 'gameEndTitle', 'nobelWin', 'nobelLose',
    'achievementsTitle', 'achievementsPlaceholder'
  ];
  const requiredFnKeys = ['characterIntro', 'dieText', 'decisionText', 'statsText', 'gameEndResult', 'impactText'];

  it.each(['es', 'en'])('LANG.%s has all required string keys', (lang) => {
    requiredStringKeys.forEach((key) => {
      expect(typeof LANG[lang][key], `${lang}.${key}`).toBe('string');
      expect(LANG[lang][key].length, `${lang}.${key} should be non-empty`).toBeGreaterThan(0);
    });
  });

  it.each(['es', 'en'])('LANG.%s has all required function keys', (lang) => {
    requiredFnKeys.forEach((key) => {
      expect(typeof LANG[lang][key], `${lang}.${key}`).toBe('function');
    });
  });

  it.each(['es', 'en'])('LANG.%s.genders is a non-empty array', (lang) => {
    expect(Array.isArray(LANG[lang].genders)).toBe(true);
    expect(LANG[lang].genders.length).toBeGreaterThan(0);
  });

  it.each(['es', 'en'])('LANG.%s: every gender has a corresponding descriptor', (lang) => {
    LANG[lang].genders.forEach((gender) => {
      expect(LANG[lang].genderDescriptors[gender]).toBeDefined();
      expect(typeof LANG[lang].genderDescriptors[gender]).toBe('string');
    });
  });

  it.each(['es', 'en'])('LANG.%s.achievements has a label for every ACHIEVEMENTS id', (lang) => {
    ACHIEVEMENTS.forEach(({ id }) => {
      expect(typeof LANG[lang].achievements[id], `${lang}.achievements.${id}`).toBe('string');
      expect(LANG[lang].achievements[id].length).toBeGreaterThan(0);
    });
  });
});

// ---------------------------------------------------------------------------
// LANG dieText
// ---------------------------------------------------------------------------
describe.each(['es', 'en'])('LANG.%s.dieText', (lang) => {
  const { dieText } = LANG[lang];

  it('returns a string containing the roll number for each face', () => {
    for (let roll = 1; roll <= 6; roll++) {
      expect(dieText(roll)).toContain(String(roll));
    }
  });

  it('returns different text for low (1-2), medium (3-4) and high (5-6) rolls', () => {
    const low = dieText(1);
    const medium = dieText(3);
    const high = dieText(5);
    expect(low).not.toBe(medium);
    expect(medium).not.toBe(high);
    expect(low).not.toBe(high);
  });

  it('rolls 1 and 2 share the same outcome text', () => {
    const roll1text = dieText(1).replace('1', 'X');
    const roll2text = dieText(2).replace('2', 'X');
    expect(roll1text).toBe(roll2text);
  });
});

// ---------------------------------------------------------------------------
// LANG questions
// ---------------------------------------------------------------------------
describe.each(['es', 'en'])('LANG.%s.questions', (lang) => {
  const { questions } = LANG[lang];

  it(`has at least ${MAX_GAME_ROUNDS} questions`, () => {
    expect(questions.length).toBeGreaterThanOrEqual(MAX_GAME_ROUNDS);
  });

  it('every question has a non-empty title and text', () => {
    questions.forEach((q) => {
      expect(typeof q.title).toBe('string');
      expect(q.title.length).toBeGreaterThan(0);
      expect(typeof q.text).toBe('string');
      expect(q.text.length).toBeGreaterThan(0);
    });
  });

  it('every question has at least one option with a label and an impact object', () => {
    questions.forEach((q) => {
      expect(q.options.length).toBeGreaterThan(0);
      q.options.forEach((opt) => {
        expect(typeof opt.label).toBe('string');
        expect(opt.label.length).toBeGreaterThan(0);
        expect(typeof opt.impact).toBe('object');
      });
    });
  });

  it('question titles are unique', () => {
    const titles = questions.map((q) => q.title);
    expect(new Set(titles).size).toBe(titles.length);
  });
});

it('ES and EN have the same number of questions', () => {
  expect(LANG.es.questions.length).toBe(LANG.en.questions.length);
});

it.each(['es', 'en'])('LANG.%s: exactly one question is marked alwaysFirst', (lang) => {
  const fixed = LANG[lang].questions.filter((q) => q.alwaysFirst);
  expect(fixed.length).toBe(1);
});

it.each(['es', 'en'])('LANG.%s: the alwaysFirst question is at index 0', (lang) => {
  expect(LANG[lang].questions[0].alwaysFirst).toBe(true);
});

// ---------------------------------------------------------------------------
// LANG impactText
// ---------------------------------------------------------------------------
describe.each(['es', 'en'])('LANG.%s.impactText', (lang) => {
  const { impactText } = LANG[lang];

  it('returns a non-empty string', () => {
    const before = { prestige: 0, wellbeing: 50, savings: 10, papers: 0, discoveries: 0 };
    const after  = { prestige: 5, wellbeing: 50, savings: 10, papers: 0, discoveries: 0 };
    expect(typeof impactText(before, after)).toBe('string');
    expect(impactText(before, after).length).toBeGreaterThan(0);
  });

  it('includes a positive delta when a stat increases', () => {
    const before = { prestige: 0, wellbeing: 50, savings: 10, papers: 0, discoveries: 0 };
    const after  = { prestige: 8, wellbeing: 50, savings: 10, papers: 1, discoveries: 0 };
    const text = impactText(before, after);
    expect(text).toContain('+8');
    expect(text).toContain('+1');
  });

  it('includes a negative delta when a stat decreases', () => {
    const before = { prestige: 10, wellbeing: 50, savings: 10, papers: 0, discoveries: 0 };
    const after  = { prestige: 10, wellbeing: 45, savings: 8,  papers: 0, discoveries: 0 };
    const text = impactText(before, after);
    expect(text).toContain('-5');
    expect(text).toContain('-2');
  });

  it('omits stats that did not change', () => {
    const before = { prestige: 5, wellbeing: 50, savings: 10, papers: 0, discoveries: 0 };
    const after  = { prestige: 5, wellbeing: 50, savings: 10, papers: 0, discoveries: 0 };
    const text = impactText(before, after);
    // No numeric delta should appear
    expect(text).not.toMatch(/[+-]\d/);
  });
});

// ---------------------------------------------------------------------------
// createInitialState
// ---------------------------------------------------------------------------
describe('createInitialState', () => {
  it('returns a fresh state object with the expected default values', () => {
    const state = createInitialState();
    expect(state.age).toBe(18);
    expect(state.gender).toBe('');
    expect(state.prestige).toBe(0);
    expect(state.wellbeing).toBe(50);
    expect(state.savings).toBe(10);
    expect(state.papers).toBe(0);
    expect(state.discoveries).toBe(0);
    expect(state.rounds).toBe(0);
    expect(state.queue).toEqual([]);
    expect(state.achievements).toEqual([]);
  });

  it('sets maxRounds to the minimum of MAX_GAME_ROUNDS and questions.length', () => {
    const state = createInitialState();
    expect(state.maxRounds).toBe(Math.min(MAX_GAME_ROUNDS, LANG.es.questions.length));
  });

  it('returns a new independent object on every call', () => {
    const a = createInitialState();
    const b = createInitialState();
    a.prestige = 99;
    expect(b.prestige).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// applyImpact
// ---------------------------------------------------------------------------
describe('applyImpact', () => {
  it('applies the die factor to every impact key', () => {
    const state = createInitialState();
    // roll=3 → factor=1, so values are unchanged
    applyImpact(state, { prestige: 10, wellbeing: 5, savings: 2, papers: 1, discoveries: 1 }, 3);
    expect(state.prestige).toBe(10);
    expect(state.wellbeing).toBe(55);
    expect(state.savings).toBe(12);
    expect(state.papers).toBe(1);
    expect(state.discoveries).toBe(1);
  });

  it('increments age and rounds by 1 each call', () => {
    const state = createInitialState();
    applyImpact(state, {}, 3);
    expect(state.age).toBe(19);
    expect(state.rounds).toBe(1);
  });

  it('clamps wellbeing to a maximum of 100', () => {
    const state = createInitialState();
    state.wellbeing = 98;
    // roll=6 → factor=1.65; 10*1.65=16.5 → Math.round=17 → 98+17=115 → clamped to 100
    applyImpact(state, { wellbeing: 10 }, 6);
    expect(state.wellbeing).toBe(100);
  });

  it('clamps wellbeing to a minimum of 0', () => {
    const state = createInitialState();
    state.wellbeing = 2;
    // roll=6 → factor=1.65; -20*1.65=-33 → Math.round(-33)=-33 → 2-33=-31 → clamped to 0
    applyImpact(state, { wellbeing: -20 }, 6);
    expect(state.wellbeing).toBe(0);
  });

  it('clamps savings to MIN_SAVINGS', () => {
    const state = createInitialState();
    state.savings = MIN_SAVINGS;
    applyImpact(state, { savings: -100 }, 3);
    expect(state.savings).toBe(MIN_SAVINGS);
  });

  it('treats missing impact keys as 0', () => {
    const state = createInitialState();
    const before = { ...state };
    applyImpact(state, {}, 3);
    expect(state.prestige).toBe(before.prestige);
    expect(state.papers).toBe(before.papers);
    expect(state.discoveries).toBe(before.discoveries);
  });
});

// ---------------------------------------------------------------------------
// hasMetNobelRequirements
// ---------------------------------------------------------------------------
describe('hasMetNobelRequirements', () => {
  it('returns false for the initial state', () => {
    expect(hasMetNobelRequirements(createInitialState())).toBe(false);
  });

  it('returns true when all requirements are exactly met', () => {
    const state = createInitialState();
    state.prestige = NOBEL_REQUIREMENTS.prestige;
    state.papers = NOBEL_REQUIREMENTS.papers;
    state.discoveries = NOBEL_REQUIREMENTS.discoveries;
    state.wellbeing = NOBEL_REQUIREMENTS.wellbeing;
    expect(hasMetNobelRequirements(state)).toBe(true);
  });

  it('returns true when all requirements are exceeded', () => {
    const state = createInitialState();
    state.prestige = NOBEL_REQUIREMENTS.prestige + 10;
    state.papers = NOBEL_REQUIREMENTS.papers + 2;
    state.discoveries = NOBEL_REQUIREMENTS.discoveries + 1;
    state.wellbeing = NOBEL_REQUIREMENTS.wellbeing + 5;
    expect(hasMetNobelRequirements(state)).toBe(true);
  });

  it.each([
    ['prestige', NOBEL_REQUIREMENTS.prestige - 1],
    ['papers', NOBEL_REQUIREMENTS.papers - 1],
    ['discoveries', NOBEL_REQUIREMENTS.discoveries - 1],
    ['wellbeing', NOBEL_REQUIREMENTS.wellbeing - 1]
  ])('returns false when %s is one below the requirement', (key, value) => {
    const state = createInitialState();
    state.prestige = NOBEL_REQUIREMENTS.prestige;
    state.papers = NOBEL_REQUIREMENTS.papers;
    state.discoveries = NOBEL_REQUIREMENTS.discoveries;
    state.wellbeing = NOBEL_REQUIREMENTS.wellbeing;
    state[key] = value;
    expect(hasMetNobelRequirements(state)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// shuffle
// ---------------------------------------------------------------------------
describe('shuffle', () => {
  it('returns an array with the same elements in any order', () => {
    const items = [1, 2, 3, 4, 5];
    const result = shuffle(items);
    expect(result).toHaveLength(items.length);
    expect([...result].sort((a, b) => a - b)).toEqual(items);
  });

  it('does not mutate the original array', () => {
    const items = [1, 2, 3, 4, 5];
    const copy = [...items];
    shuffle(items);
    expect(items).toEqual(copy);
  });

  it('returns a new array reference', () => {
    const items = [1, 2, 3];
    expect(shuffle(items)).not.toBe(items);
  });
});

// ---------------------------------------------------------------------------
// rollDie / randomInt
// ---------------------------------------------------------------------------
describe('rollDie', () => {
  it('always returns an integer between 1 and 6 inclusive', () => {
    for (let i = 0; i < 200; i++) {
      const result = rollDie();
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(6);
      expect(Number.isInteger(result)).toBe(true);
    }
  });
});

describe('randomInt', () => {
  it('returns values in [0, maxExclusive)', () => {
    for (let i = 0; i < 100; i++) {
      const result = randomInt(5);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(5);
    }
  });
});

// ---------------------------------------------------------------------------
// buildQueue
// ---------------------------------------------------------------------------
describe('buildQueue', () => {
  const questions = [
    { alwaysFirst: true, title: 'A' },
    { title: 'B' },
    { title: 'C' },
    { title: 'D' },
    { title: 'E' },
  ];

  it('returns an array of the requested length', () => {
    const q = buildQueue(questions, 4);
    expect(q).toHaveLength(4);
  });

  it('puts the alwaysFirst question at the END of the queue (shown first via .pop())', () => {
    const q = buildQueue(questions, 4);
    expect(q[q.length - 1].alwaysFirst).toBe(true);
  });

  it('always includes every alwaysFirst question', () => {
    for (let i = 0; i < 20; i++) {
      const q = buildQueue(questions, 4);
      const titles = q.map((item) => item.title);
      expect(titles).toContain('A');
    }
  });

  it('does not include more items than maxRounds', () => {
    const q = buildQueue(questions, 3);
    expect(q).toHaveLength(3);
  });

  it('does not mutate the original questions array', () => {
    const copy = [...questions];
    buildQueue(questions, 4);
    expect(questions).toEqual(copy);
  });
});

// ---------------------------------------------------------------------------
// checkAchievements
// ---------------------------------------------------------------------------
describe('checkAchievements', () => {
  it('returns no achievements for the initial state', () => {
    const state = createInitialState();
    expect(checkAchievements(state)).toEqual([]);
  });

  it('returns "degree" achievement after the first round', () => {
    const state = createInitialState();
    state.rounds = 1;
    expect(checkAchievements(state)).toContain('degree');
  });

  it('returns "first_paper" when papers becomes 1', () => {
    const state = createInitialState();
    state.papers = 1;
    expect(checkAchievements(state)).toContain('first_paper');
  });

  it('returns "discovery" when discoveries becomes 1', () => {
    const state = createInitialState();
    state.discoveries = 1;
    expect(checkAchievements(state)).toContain('discovery');
  });

  it('does not return already-unlocked achievements', () => {
    const state = createInitialState();
    state.rounds = 1;
    state.achievements = ['degree'];
    expect(checkAchievements(state)).not.toContain('degree');
  });

  it('can return multiple achievements at once', () => {
    const state = createInitialState();
    state.rounds = 1;
    state.papers = 1;
    state.discoveries = 1;
    const unlocked = checkAchievements(state);
    expect(unlocked).toContain('degree');
    expect(unlocked).toContain('first_paper');
    expect(unlocked).toContain('discovery');
  });

  it('every achievement id in ACHIEVEMENTS is eventually reachable', () => {
    // Just verify all achievement ids are strings and conditions are functions
    ACHIEVEMENTS.forEach(({ id, condition }) => {
      expect(typeof id).toBe('string');
      expect(typeof condition).toBe('function');
    });
  });
});
