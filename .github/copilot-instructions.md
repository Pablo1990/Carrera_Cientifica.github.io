# Copilot Instructions — Carrera Científica

## Project overview

**Carrera Científica** is a short browser-based educational game (in Spanish and English) for teenagers that simulates real decisions in a scientific career. Players accumulate stats over 10 rounds and try to meet the Nobel Prize requirements.

Live URL: <https://pablo1990.github.io/Carrera_Cientifica/>

---

## Repository structure

```
├── index.html            # Entry point — static HTML, loads game.js as an ES module
├── game.js               # DOM / presentation layer only (no game logic here)
├── styles.css            # All CSS; dark theme, responsive, no preprocessor
├── src/
│   ├── game-logic.js     # All pure game logic (exported, testable, no DOM)
│   └── game-logic.test.js# Vitest unit tests for game-logic.js
├── .github/
│   └── workflows/
│       └── deploy.yml    # Deploys the repo root to GitHub Pages on push to main
├── package.json          # type: "module"; only devDependency is vitest
└── package-lock.json
```

There is **no build step** — the game runs directly in the browser as static files.

---

## Architecture rules

- **Pure logic goes in `src/game-logic.js`** — no `document`, `window`, or DOM references allowed there. This keeps it testable with Vitest (Node.js environment).
- **DOM manipulation goes in `game.js`** — it imports from `src/game-logic.js` and wires everything to the HTML.
- All files use **ES module syntax** (`import`/`export`). The `package.json` declares `"type": "module"`.
- Randomness is done exclusively via `crypto.getRandomValues` (see `randomInt` in `game-logic.js`). Never use `Math.random`.

---

## Game mechanics

Key constants exported from `src/game-logic.js`:

| Constant | Value | Meaning |
|---|---|---|
| `MAX_GAME_ROUNDS` | 10 | Rounds per game |
| `NOBEL_REQUIREMENTS` | `{ prestige: 70, papers: 6, discoveries: 2, wellbeing: 20 }` | Win condition |
| `MIN_SAVINGS` | -10 | Lower clamp on savings stat |
| `DIE_FACTOR_BY_ROLL` | `{ 1: 0.45, …, 6: 1.65 }` | Multipliers applied to impact values |

**Player state** shape (from `createInitialState`):
```js
{ age, gender, prestige, wellbeing, savings, papers, discoveries, rounds, maxRounds, queue }
```

Each round: player picks an option → die is rolled → `applyImpact(state, option.impact, roll)` scales the impact by the die factor and updates stats.

---

## Bilingual content (`LANG` object)

All user-visible strings and questions live in the `LANG` object in `src/game-logic.js`, keyed by `'es'` and `'en'`. Both languages must **always be kept in sync**:

- Same number of questions (`LANG.es.questions.length === LANG.en.questions.length`).
- Same keys and function signatures in both locale objects.
- Corresponding questions at the same index should cover the same scenario.

When adding or editing questions, always update **both** `LANG.es.questions` and `LANG.en.questions`.

---

## Running tests

```bash
npm install        # install vitest (only devDependency)
npm test           # run all tests once (vitest run)
npm run test:watch # watch mode
```

Tests are in `src/game-logic.test.js` and cover every exported function. **All tests must pass before merging.** There is no linter or formatter configured.

---

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which publishes the entire repo root to GitHub Pages. No build command is needed.

---

## Common tasks and where to make changes

| Task | File(s) to edit |
|---|---|
| Add/edit a question | `src/game-logic.js` — update both `LANG.es.questions` and `LANG.en.questions` |
| Change game balance (impacts, Nobel thresholds, die factors) | `src/game-logic.js` — exported constants at the top |
| Change UI layout or styling | `index.html` and/or `styles.css` |
| Change game flow or DOM behaviour | `game.js` |
| Add a new stat or mechanic | `src/game-logic.js` (`applyImpact`, `createInitialState`, `hasMetNobelRequirements`) + update `LANG[lang].statsText` in both locales + add tests |
| Add tests | `src/game-logic.test.js` |

---

## Known issues and workarounds

- `randomInt` requires `crypto.getRandomValues`, which is available in all modern browsers and in Node.js ≥ 15. Vitest runs in Node, which provides `globalThis.crypto` automatically; no polyfill is needed.
- The `deploy.yml` workflow uploads the entire repo root as a Pages artifact, so any file added to the root will be publicly served. Keep sensitive content out of the repo root.
