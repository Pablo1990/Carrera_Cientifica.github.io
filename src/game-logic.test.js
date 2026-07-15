import { describe, it, expect } from 'vitest';
import {
  LANG,
  DIE_FACTOR_BY_ROLL,
  MIN_SAVINGS,
  NOBEL_REQUIREMENTS,
  MAX_GAME_ROUNDS,
  ENDINGS,
  randomInt,
  shuffle,
  rollDie,
  dieFactor,
  applyImpact,
  hasMetNobelRequirements,
  createInitialState,
  getEnding
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
    'dieIntro', 'gameEndTitle', 'nobelWin', 'nobelLose', 'endingCharacterLabel'
  ];
  const requiredFnKeys = ['characterIntro', 'dieText', 'decisionText', 'statsText', 'gameEndResult'];

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
// ENDINGS structure
// ---------------------------------------------------------------------------
describe('ENDINGS', () => {
  const validTiers = ['high', 'medium-high', 'medium-low', 'low'];
  const validGenders = ['male', 'female', 'nonbinary', 'any'];

  it('is a non-empty array', () => {
    expect(Array.isArray(ENDINGS)).toBe(true);
    expect(ENDINGS.length).toBeGreaterThan(0);
  });

  it('every entry has required fields with valid values', () => {
    ENDINGS.forEach((e) => {
      expect(typeof e.id, `${e.id}.id`).toBe('string');
      expect(e.id.length, `${e.id} id is non-empty`).toBeGreaterThan(0);
      expect(validGenders, `${e.id} gender`).toContain(e.gender);
      expect(validTiers, `${e.id} tier`).toContain(e.tier);
    });
  });

  it('every entry has non-empty es and en locale text with name and description', () => {
    ENDINGS.forEach((e) => {
      ['es', 'en'].forEach((lang) => {
        expect(typeof e[lang].name, `${e.id}.${lang}.name`).toBe('string');
        expect(e[lang].name.length, `${e.id}.${lang}.name non-empty`).toBeGreaterThan(0);
        expect(typeof e[lang].description, `${e.id}.${lang}.description`).toBe('string');
        expect(e[lang].description.length, `${e.id}.${lang}.description non-empty`).toBeGreaterThan(0);
      });
    });
  });

  it('ids are unique', () => {
    const ids = ENDINGS.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every non-high tier has at least one catch-all ending (no extra threshold beyond tier qualification)', () => {
    ['low'].forEach((tier) => {
      const tierEntries = ENDINGS.filter((e) => e.tier === tier);
      expect(tierEntries.length, `tier ${tier} has entries`).toBeGreaterThan(0);
      const hasCatchAll = tierEntries.some((e) => e.minPrestige == null && e.maxPrestige == null);
      expect(hasCatchAll, `tier ${tier} has a catch-all entry`).toBe(true);
    });
  });

  it('all four tiers have at least one entry', () => {
    validTiers.forEach((tier) => {
      const tierEntries = ENDINGS.filter((e) => e.tier === tier);
      expect(tierEntries.length, `tier ${tier} has entries`).toBeGreaterThan(0);
    });
  });

  it('the last entry is the ultimate catch-all (any gender, no thresholds)', () => {
    const last = ENDINGS[ENDINGS.length - 1];
    expect(last.gender).toBe('any');
    expect(last.tier).toBe('low');
    expect(last.minPrestige).toBeUndefined();
    expect(last.maxPrestige).toBeUndefined();
    expect(last.minPapers).toBeUndefined();
    expect(last.minSavings).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// getEnding
// ---------------------------------------------------------------------------
describe('getEnding', () => {
  function makeState(overrides = {}) {
    return Object.assign(createInitialState(), overrides);
  }

  // ── High tier ─────────────────────────────────────────────────────────
  it('male Nobel winner gets a male high-tier scientist', () => {
    const state = makeState({
      gender: 'hombre',
      prestige: 75, papers: 6, discoveries: 2, wellbeing: 25
    });
    const ending = getEnding(state);
    expect(ending.tier).toBe('high');
    expect(ending.gender).toBe('male');
  });

  it('female Nobel winner gets a female high-tier scientist', () => {
    const state = makeState({
      gender: 'mujer',
      prestige: 75, papers: 6, discoveries: 2, wellbeing: 25
    });
    const ending = getEnding(state);
    expect(ending.tier).toBe('high');
    expect(ending.gender).toBe('female');
  });

  it('exceptional male winner (prestige >= 105) gets Ramón y Cajal', () => {
    const state = makeState({
      gender: 'hombre',
      prestige: 110, papers: 8, discoveries: 4, wellbeing: 35
    });
    expect(getEnding(state).id).toBe('ramon-y-cajal');
  });

  it('exceptional female winner (prestige >= 90) gets Margarita Salas', () => {
    const state = makeState({
      gender: 'mujer',
      prestige: 92, papers: 8, discoveries: 3, wellbeing: 28
    });
    expect(getEnding(state).id).toBe('margarita-salas');
  });

  it('non-binary Nobel winner falls back to any eligible high-tier ending', () => {
    const state = makeState({
      gender: 'persona no binaria',
      prestige: 75, papers: 6, discoveries: 2, wellbeing: 25
    });
    const ending = getEnding(state);
    expect(ending.tier).toBe('high');
  });

  // ── Medium-High tier ──────────────────────────────────────────────────
  it('female medium-high player gets a female medium-high scientist', () => {
    const state = makeState({
      gender: 'mujer',
      prestige: 50, papers: 4, discoveries: 1, wellbeing: 20
    });
    const ending = getEnding(state);
    expect(ending.tier).toBe('medium-high');
    expect(ending.gender).toBe('female');
  });

  it('male medium-high player gets a male medium-high scientist', () => {
    const state = makeState({
      gender: 'hombre',
      prestige: 42, papers: 3, wellbeing: 15
    });
    const ending = getEnding(state);
    expect(ending.tier).toBe('medium-high');
    expect(ending.gender).toBe('male');
  });

  // ── Medium-Low tier ───────────────────────────────────────────────────
  it('medium-low male player gets a medium-low male scientist', () => {
    const state = makeState({
      gender: 'hombre',
      prestige: 24, papers: 2
    });
    const ending = getEnding(state);
    expect(ending.tier).toBe('medium-low');
    expect(ending.gender).toBe('male');
  });

  it('medium-low female player with modest prestige falls back to any eligible medium-low', () => {
    const state = makeState({
      gender: 'mujer',
      prestige: 16, papers: 1
    });
    const ending = getEnding(state);
    expect(ending.tier).toBe('medium-low');
  });

  // ── Low tier ──────────────────────────────────────────────────────────
  it('player with negative prestige gets a fraud-related ending', () => {
    const state = makeState({ prestige: -3, papers: 1, gender: 'hombre' });
    const ending = getEnding(state);
    expect(ending.tier).toBe('low');
    expect(['dra-moreno', 'dr-alvarez', 'dra-castillo', 'the-fraudster']).toContain(ending.id);
  });

  it('player with high savings gets happy-in-industry or sellout ending', () => {
    const state = makeState({ savings: 8, prestige: 3, gender: 'mujer' });
    const ending = getEnding(state);
    expect(ending.tier).toBe('low');
    expect(['happy-in-industry', 'dr-ramirez', 'dra-moreno', 'dra-romero',
      'bureaucratic-scientist', 'dra-suarez', 'the-forgotten']).toContain(ending.id);
  });

  it('always returns an ending object with id, tier, gender, es, en properties', () => {
    const states = [
      makeState({ gender: 'mujer', prestige: 80, papers: 7, discoveries: 2, wellbeing: 22 }),
      makeState({ gender: 'hombre', prestige: 45, papers: 4 }),
      makeState({ gender: 'persona no binaria', prestige: 0 }),
      makeState({ gender: 'hombre', prestige: -5, papers: 2 })
    ];
    states.forEach((state) => {
      const ending = getEnding(state);
      expect(typeof ending.id).toBe('string');
      expect(typeof ending.tier).toBe('string');
      expect(typeof ending.gender).toBe('string');
      expect(typeof ending.es.name).toBe('string');
      expect(typeof ending.en.name).toBe('string');
    });
  });

  it('returns the last ENDINGS entry as ultimate fallback for default empty state', () => {
    // Default state: prestige=0, papers=0, no gender → low tier, no specific match
    const state = createInitialState();
    const ending = getEnding(state);
    expect(ending.tier).toBe('low');
  });

  it('English gender strings are also recognised', () => {
    const stateW = makeState({ gender: 'woman', prestige: 75, papers: 6, discoveries: 2, wellbeing: 25 });
    const stateM = makeState({ gender: 'man', prestige: 75, papers: 6, discoveries: 2, wellbeing: 25 });
    expect(getEnding(stateW).gender).toBe('female');
    expect(getEnding(stateM).gender).toBe('male');
  });
});
