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

const DIE_FACTOR_BY_ROLL = { 1: 0.45, 2: 0.75, 3: 1, 4: 1.15, 5: 1.35, 6: 1.65 };
const MIN_SAVINGS = -10;
const NOBEL_REQUIREMENTS = { prestige: 70, papers: 6, discoveries: 2, wellbeing: 20 };
const MAX_GAME_ROUNDS = 10;

const LANG = {
  es: {
    htmlLang: 'es',
    pageTitle: 'Carrera Científica: Camino al Nobel',
    gameTitle: 'Carrera Científica: Camino al Nobel',
    subtitle: 'Un juego rápido para entender lo bonito y lo duro de la ciencia.',
    characterSectionTitle: 'Tu personaje',
    questionSectionStart: 'Empieza tu camino',
    questionPlaceholder: 'Pulsa en "Comenzar" para recibir tu primera decisión.',
    resultSectionTitle: 'Resultado',
    resultPlaceholder: 'Aquí verás qué pasó con tu decisión.',
    startBtnLabel: 'Comenzar',
    restartBtnLabel: 'Jugar otra vez',
    genders: ['mujer', 'hombre', 'persona no binaria'],
    genderDescriptors: {
      mujer: 'una mujer',
      hombre: 'un hombre',
      'persona no binaria': 'una persona no binaria'
    },
    characterIntro: (descriptor, age) =>
      `Tu protagonista es ${descriptor} de ${age} años que empieza a decidir su camino científico.`,
    dieIntro: 'Cada opción se resuelve con un dado virtual (1-6).',
    dieText: (roll) => {
      if (roll <= 2) return `🎲 Sacaste un ${roll}: hubo obstáculos imprevistos.`;
      if (roll <= 4) return `🎲 Sacaste un ${roll}: resultado razonable.`;
      return `🎲 Sacaste un ${roll}: ¡salió mejor de lo esperado!`;
    },
    decisionText: (label) => `Decidiste: "${label}"`,
    statsText: (s) =>
      `Edad: ${s.age} · Prestigio: ${s.prestige} · Bienestar: ${s.wellbeing} · Ahorros: ${s.savings} · Papers: ${s.papers} · Hallazgos: ${s.discoveries}`,
    gameEndTitle: 'Final de partida',
    nobelWin: '¡Ganaste el Nobel! Llegaste lejos combinando rigor, decisiones difíciles y algo de suerte.',
    nobelLose: 'No llegó el Nobel esta vez, pero construiste una carrera real: con aprendizaje, tropiezos y logros.',
    gameEndResult: (s) =>
      `Cierre: terminaste con ${s.papers} papers y ${s.discoveries} descubrimientos. La ciencia es una maratón, no un sprint.`,
    questions: [
      {
        title: 'Primera gran decisión',
        text: 'Tienes 18 años y toca elegir carrera. ¿Qué te llama más?',
        options: [
          { label: 'Biología: te flipa entender la vida.', impact: { prestige: 7, wellbeing: 1, papers: 1 } },
          { label: 'Física: quieres explicar el universo.', impact: { prestige: 8, wellbeing: -1, papers: 1 } },
          { label: 'Ingeniería biomédica: ciencia aplicada.', impact: { prestige: 6, savings: 2, papers: 0 } }
        ]
      },
      {
        title: 'Duda real',
        text: '¿Si elijo una carrera universitaria, puedo cambiar después?',
        options: [
          { label: 'Sí. Cambias de área con un máster puente.', impact: { prestige: 4, wellbeing: 3, savings: -1 } },
          { label: 'No cambio por miedo a perder tiempo.', impact: { prestige: 1, wellbeing: -2, savings: 1 } },
          { label: 'Pruebo prácticas antes de decidir.', impact: { prestige: 3, wellbeing: 2, savings: 1 } }
        ]
      },
      {
        title: 'Supervisor complicado',
        text: 'Empiezas el doctorado y tu supervisión es dura y confusa.',
        options: [
          { label: 'Busco mentores alternativos y red de apoyo.', impact: { prestige: 5, wellbeing: 2, papers: 1 } },
          { label: 'Aguanto en silencio.', impact: { prestige: 2, wellbeing: -4, papers: 1 } },
          { label: 'Pido cambio formal de supervisor.', impact: { prestige: 3, wellbeing: 3, savings: -1 } }
        ]
      },
      {
        title: 'Precariedad científica',
        text: 'Te ofrecen contrato corto con sueldo justo. ¿Qué haces?',
        options: [
          { label: 'Lo acepto para seguir investigando.', impact: { prestige: 4, wellbeing: -2, savings: -2, papers: 1 } },
          { label: 'Negocio condiciones y formación.', impact: { prestige: 3, wellbeing: 1, savings: 1 } },
          { label: 'Me paso temporalmente a industria.', impact: { prestige: 2, wellbeing: 2, savings: 4 } }
        ]
      },
      {
        title: 'Migrar al Reino Unido',
        text: 'Te planteas mudarte al Reino Unido para investigar.',
        options: [
          { label: 'Me mudo: más recursos, pero papeleo y nostalgia.', impact: { prestige: 7, wellbeing: -1, savings: -1, papers: 1 } },
          { label: 'No me mudo: mantengo red local.', impact: { prestige: 2, wellbeing: 2, savings: 1 } },
          { label: 'Voy con plan de regreso y contactos.', impact: { prestige: 6, wellbeing: 1, savings: -1, papers: 1 } }
        ]
      },
      {
        title: 'Conferencia internacional',
        text: '¡Te invitan a una conferencia al otro lado del mundo!',
        options: [
          { label: 'Presento mi trabajo y hago networking.', impact: { prestige: 8, wellbeing: 1, savings: -1, papers: 1 } },
          { label: 'No voy: ahorro y descanso.', impact: { prestige: -1, wellbeing: 3, savings: 2 } },
          { label: 'Asisto online y contacto por correo.', impact: { prestige: 3, wellbeing: 2, savings: 1 } }
        ]
      },
      {
        title: 'Paper bajo presión',
        text: 'Te exigen publicar rápido. Tus datos no son tan claros.',
        options: [
          { label: 'Repito experimentos y publico tarde pero sólido.', impact: { prestige: 7, wellbeing: -1, papers: 1 } },
          { label: 'Publico corriendo para competir.', impact: { prestige: 1, wellbeing: -2, papers: 1 } },
          { label: 'Comparto dudas con el equipo y redefino hipótesis.', impact: { prestige: 6, wellbeing: 1, papers: 1 } }
        ]
      },
      {
        title: 'Hallazgo inesperado',
        text: 'En un experimento aparece una señal rarísima. ¿Qué haces?',
        options: [
          { label: 'La investigo con rigor: podría ser descubrimiento.', impact: { prestige: 10, wellbeing: 1, discoveries: 1 } },
          { label: 'La ignoro porque no estaba en el plan.', impact: { prestige: -2, wellbeing: 0 } },
          { label: 'Pido revisión externa antes de anunciar nada.', impact: { prestige: 7, wellbeing: 1, discoveries: 1 } }
        ]
      },
      {
        title: 'Ciencia e industria',
        text: 'Una empresa te ofrece liderar I+D con buen sueldo.',
        options: [
          { label: 'Acepto y mantengo colaboración académica.', impact: { prestige: 5, wellbeing: 2, savings: 5, papers: 1 } },
          { label: 'Rechazo y sigo a tope en academia.', impact: { prestige: 4, wellbeing: -1, savings: -1, papers: 1 } },
          { label: 'Me voy y vuelvo luego a la universidad.', impact: { prestige: 3, wellbeing: 1, savings: 3 } }
        ]
      },
      {
        title: 'Pensamiento crítico',
        text: 'Un resultado viral contradice tu línea. ¿Cómo reaccionas?',
        options: [
          { label: 'Reviso sesgos, métodos y datos antes de opinar.', impact: { prestige: 7, wellbeing: 1, papers: 1 } },
          { label: 'Ataco el estudio en redes sin leerlo.', impact: { prestige: -5, wellbeing: -1 } },
          { label: 'Organizo debate con colegas y estudiantes.', impact: { prestige: 6, wellbeing: 2 } }
        ]
      }
    ]
  },
  en: {
    htmlLang: 'en',
    pageTitle: 'Scientific Career: Road to the Nobel',
    gameTitle: 'Scientific Career: Road to the Nobel',
    subtitle: 'A quick game to understand the beauty and hardship of science.',
    characterSectionTitle: 'Your character',
    questionSectionStart: 'Start your journey',
    questionPlaceholder: 'Press "Start" to receive your first decision.',
    resultSectionTitle: 'Result',
    resultPlaceholder: 'Here you will see what happened with your decision.',
    startBtnLabel: 'Start',
    restartBtnLabel: 'Play again',
    genders: ['woman', 'man', 'non-binary person'],
    genderDescriptors: {
      woman: 'a woman',
      man: 'a man',
      'non-binary person': 'a non-binary person'
    },
    characterIntro: (descriptor, age) =>
      `Your protagonist is ${descriptor}, ${age} years old, starting to decide their scientific path.`,
    dieIntro: 'Each option is resolved with a virtual die (1-6).',
    dieText: (roll) => {
      if (roll <= 2) return `🎲 You rolled a ${roll}: there were unexpected obstacles.`;
      if (roll <= 4) return `🎲 You rolled a ${roll}: a reasonable outcome.`;
      return `🎲 You rolled a ${roll}: it went better than expected!`;
    },
    decisionText: (label) => `You chose: "${label}"`,
    statsText: (s) =>
      `Age: ${s.age} · Prestige: ${s.prestige} · Wellbeing: ${s.wellbeing} · Savings: ${s.savings} · Papers: ${s.papers} · Discoveries: ${s.discoveries}`,
    gameEndTitle: 'Game over',
    nobelWin: 'You won the Nobel! You went far combining rigour, difficult decisions, and a bit of luck.',
    nobelLose: "The Nobel didn't come this time, but you built a real career: with learning, setbacks, and achievements.",
    gameEndResult: (s) =>
      `Closing: you finished with ${s.papers} papers and ${s.discoveries} discoveries. Science is a marathon, not a sprint.`,
    questions: [
      {
        title: 'First big decision',
        text: 'You are 18 years old and it is time to choose a degree. What calls to you?',
        options: [
          { label: 'Biology: you love understanding life.', impact: { prestige: 7, wellbeing: 1, papers: 1 } },
          { label: 'Physics: you want to explain the universe.', impact: { prestige: 8, wellbeing: -1, papers: 1 } },
          { label: 'Biomedical Engineering: applied science.', impact: { prestige: 6, savings: 2, papers: 0 } }
        ]
      },
      {
        title: 'Real doubt',
        text: 'If I choose a degree, can I switch to a different field later?',
        options: [
          { label: 'Yes. You switch fields with a bridge master\'s.', impact: { prestige: 4, wellbeing: 3, savings: -1 } },
          { label: "I won't switch out of fear of wasting time.", impact: { prestige: 1, wellbeing: -2, savings: 1 } },
          { label: 'I try internships before deciding.', impact: { prestige: 3, wellbeing: 2, savings: 1 } }
        ]
      },
      {
        title: 'Difficult supervisor',
        text: 'You start your PhD and your supervision is tough and confusing.',
        options: [
          { label: 'I seek alternative mentors and a support network.', impact: { prestige: 5, wellbeing: 2, papers: 1 } },
          { label: 'I endure in silence.', impact: { prestige: 2, wellbeing: -4, papers: 1 } },
          { label: 'I formally request a change of supervisor.', impact: { prestige: 3, wellbeing: 3, savings: -1 } }
        ]
      },
      {
        title: 'Scientific precarity',
        text: 'You are offered a short contract with a fair wage. What do you do?',
        options: [
          { label: 'I accept it to keep doing research.', impact: { prestige: 4, wellbeing: -2, savings: -2, papers: 1 } },
          { label: 'I negotiate terms and training.', impact: { prestige: 3, wellbeing: 1, savings: 1 } },
          { label: 'I temporarily move to industry.', impact: { prestige: 2, wellbeing: 2, savings: 4 } }
        ]
      },
      {
        title: 'Moving to the UK',
        text: 'You are considering moving to the UK to do research.',
        options: [
          { label: 'I move: more resources, but paperwork and homesickness.', impact: { prestige: 7, wellbeing: -1, savings: -1, papers: 1 } },
          { label: "I don't move: I keep my local network.", impact: { prestige: 2, wellbeing: 2, savings: 1 } },
          { label: 'I go with a return plan and contacts.', impact: { prestige: 6, wellbeing: 1, savings: -1, papers: 1 } }
        ]
      },
      {
        title: 'International conference',
        text: 'You are invited to a conference on the other side of the world!',
        options: [
          { label: 'I present my work and network.', impact: { prestige: 8, wellbeing: 1, savings: -1, papers: 1 } },
          { label: "I don't go: I save money and rest.", impact: { prestige: -1, wellbeing: 3, savings: 2 } },
          { label: 'I attend online and reach out by email.', impact: { prestige: 3, wellbeing: 2, savings: 1 } }
        ]
      },
      {
        title: 'Paper under pressure',
        text: 'You are pressed to publish quickly. Your data is not that clear.',
        options: [
          { label: 'I repeat experiments and publish late but solid.', impact: { prestige: 7, wellbeing: -1, papers: 1 } },
          { label: 'I rush to publish to compete.', impact: { prestige: 1, wellbeing: -2, papers: 1 } },
          { label: 'I share doubts with the team and redefine the hypothesis.', impact: { prestige: 6, wellbeing: 1, papers: 1 } }
        ]
      },
      {
        title: 'Unexpected finding',
        text: 'A very unusual signal appears in an experiment. What do you do?',
        options: [
          { label: 'I investigate it rigorously: it could be a discovery.', impact: { prestige: 10, wellbeing: 1, discoveries: 1 } },
          { label: 'I ignore it because it was not in the plan.', impact: { prestige: -2, wellbeing: 0 } },
          { label: 'I request an external review before announcing anything.', impact: { prestige: 7, wellbeing: 1, discoveries: 1 } }
        ]
      },
      {
        title: 'Science and industry',
        text: 'A company offers you to lead R&D with a good salary.',
        options: [
          { label: 'I accept and maintain academic collaboration.', impact: { prestige: 5, wellbeing: 2, savings: 5, papers: 1 } },
          { label: 'I decline and stay fully committed to academia.', impact: { prestige: 4, wellbeing: -1, savings: -1, papers: 1 } },
          { label: 'I leave and return to university later.', impact: { prestige: 3, wellbeing: 1, savings: 3 } }
        ]
      },
      {
        title: 'Critical thinking',
        text: 'A viral result contradicts your research line. How do you react?',
        options: [
          { label: 'I review biases, methods and data before commenting.', impact: { prestige: 7, wellbeing: 1, papers: 1 } },
          { label: 'I attack the study on social media without reading it.', impact: { prestige: -5, wellbeing: -1 } },
          { label: 'I organise a debate with colleagues and students.', impact: { prestige: 6, wellbeing: 2 } }
        ]
      }
    ]
  }
};

let currentLang = 'es';

const state = {
  age: 18,
  gender: '',
  prestige: 0,
  wellbeing: 50,
  savings: 10,
  papers: 0,
  discoveries: 0,
  rounds: 0,
  maxRounds: Math.min(MAX_GAME_ROUNDS, LANG.es.questions.length),
  queue: []
};

function randomInt(maxExclusive) {
  if (!globalThis.crypto || typeof globalThis.crypto.getRandomValues !== 'function') {
    throw new Error('This game requires a browser with crypto.getRandomValues support.');
  }
  const values = new Uint32Array(1);
  globalThis.crypto.getRandomValues(values);
  return values[0] % maxExclusive;
}

function shuffle(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = randomInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function rollDie() {
  return randomInt(6) + 1;
}

function dieFactor(roll) {
  return DIE_FACTOR_BY_ROLL[roll];
}

function applyImpact(baseImpact, roll) {
  const factor = dieFactor(roll);
  const keys = ['prestige', 'wellbeing', 'savings', 'papers', 'discoveries'];

  keys.forEach((key) => {
    const raw = baseImpact[key] || 0;
    state[key] += Math.round(raw * factor);
  });

  state.wellbeing = Math.max(0, Math.min(100, state.wellbeing));
  state.savings = Math.max(MIN_SAVINGS, state.savings);
  state.age += 1;
  state.rounds += 1;
}

function renderStats() {
  statsEl.textContent = LANG[currentLang].statsText(state);
}

function hasMetNobelRequirements() {
  return (
    state.prestige >= NOBEL_REQUIREMENTS.prestige &&
    state.papers >= NOBEL_REQUIREMENTS.papers &&
    state.discoveries >= NOBEL_REQUIREMENTS.discoveries &&
    state.wellbeing >= NOBEL_REQUIREMENTS.wellbeing
  );
}

function finishGame() {
  const t = LANG[currentLang];
  optionsEl.innerHTML = '';
  questionTitleEl.textContent = t.gameEndTitle;

  if (hasMetNobelRequirements()) {
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
      applyImpact(option.impact, roll);
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
  startBtn.hidden = false;
  restartBtn.hidden = true;
}

langEsBtn.addEventListener('click', () => switchLanguage('es'));
langEnBtn.addEventListener('click', () => switchLanguage('en'));
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

