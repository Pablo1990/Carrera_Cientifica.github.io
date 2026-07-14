const characterEl = document.getElementById('character');
const statsEl = document.getElementById('stats');
const questionTitleEl = document.getElementById('question-title');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const resultEl = document.getElementById('result');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

const genders = ['mujer', 'hombre', 'persona no binaria'];
const genderDescriptors = { mujer: 'una mujer', hombre: 'un hombre', 'persona no binaria': 'una persona no binaria' };
const DIE_FACTOR_BY_ROLL = { 1: 0.45, 2: 0.75, 3: 1, 4: 1.15, 5: 1.35, 6: 1.65 };
const MIN_SAVINGS = -10;
const NOBEL_REQUIREMENTS = { prestige: 70, papers: 6, discoveries: 2, wellbeing: 20 };

const cryptoApi = globalThis.crypto;

function randomInt(maxExclusive) {
  if (!cryptoApi || typeof cryptoApi.getRandomValues !== 'function') {
    throw new Error('Este juego requiere un navegador con crypto.getRandomValues');
  }
  const values = new Uint32Array(1);
  cryptoApi.getRandomValues(values);
  return values[0] % maxExclusive;
}

const questions = [
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
];

const state = {
  age: 18,
  gender: '',
  prestige: 0,
  wellbeing: 50,
  savings: 10,
  papers: 0,
  discoveries: 0,
  rounds: 0,
  maxRounds: 10,
  queue: []
};

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

function dieText(roll) {
  if (roll <= 2) return `🎲 Sacaste un ${roll}: hubo obstáculos imprevistos.`;
  if (roll <= 4) return `🎲 Sacaste un ${roll}: resultado razonable.`;
  return `🎲 Sacaste un ${roll}: ¡salió mejor de lo esperado!`;
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
  statsEl.textContent = `Edad: ${state.age} · Prestigio: ${state.prestige} · Bienestar: ${state.wellbeing} · Ahorros: ${state.savings} · Papers: ${state.papers} · Hallazgos: ${state.discoveries}`;
}

function finishGame() {
  optionsEl.innerHTML = '';
  questionTitleEl.textContent = 'Final de partida';

  const wonNobel = state.prestige >= NOBEL_REQUIREMENTS.prestige && state.papers >= NOBEL_REQUIREMENTS.papers && state.discoveries >= NOBEL_REQUIREMENTS.discoveries && state.wellbeing >= NOBEL_REQUIREMENTS.wellbeing;

  if (wonNobel) {
    questionEl.textContent = '¡Ganaste el Nobel! Llegaste lejos combinando rigor, decisiones difíciles y algo de suerte.';
  } else {
    questionEl.textContent = 'No llegó el Nobel esta vez, pero construiste una carrera real: con aprendizaje, tropiezos y logros.';
  }

  resultEl.textContent = `Cierre: terminaste con ${state.papers} papers y ${state.discoveries} descubrimientos. La ciencia es una maratón, no un sprint.`;
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
      const roll = rollDie();
      applyImpact(option.impact, roll);
      resultEl.textContent = `${dieText(roll)} Decidiste: "${option.label}"`;
      renderStats();
      renderQuestion();
    });
    optionsEl.appendChild(button);
  });
}

function startGame() {
  state.age = 18 + randomInt(3);
  state.gender = genders[randomInt(genders.length)];
  state.prestige = 0;
  state.wellbeing = 50;
  state.savings = 10;
  state.papers = 0;
  state.discoveries = 0;
  state.rounds = 0;
  state.queue = shuffle(questions).slice(0, state.maxRounds);

  const descriptor = genderDescriptors[state.gender];
  characterEl.textContent = `Tu protagonista es ${descriptor} de ${state.age} años que empieza a decidir su camino científico.`;
  resultEl.textContent = 'Cada opción se resuelve con un dado virtual (1-6).';
  startBtn.hidden = true;
  restartBtn.hidden = true;

  renderStats();
  renderQuestion();
}

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
