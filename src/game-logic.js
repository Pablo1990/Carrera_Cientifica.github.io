export const DIE_FACTOR_BY_ROLL = { 1: 0.45, 2: 0.75, 3: 1, 4: 1.15, 5: 1.35, 6: 1.65 };
export const MIN_SAVINGS = -10;
export const NOBEL_REQUIREMENTS = { prestige: 70, papers: 6, discoveries: 2, wellbeing: 20 };
export const MAX_GAME_ROUNDS = 10;

export const ACHIEVEMENTS = [
  { id: 'degree',       condition: (s) => s.rounds >= 1 },
  { id: 'first_paper',  condition: (s) => s.papers >= 1 },
  { id: 'phd',          condition: (s) => s.prestige >= 20 && s.papers >= 2 },
  { id: 'ten_papers',   condition: (s) => s.papers >= 10 },
  { id: 'discovery',    condition: (s) => s.discoveries >= 1 },
  { id: 'two_discoveries', condition: (s) => s.discoveries >= 2 },
  { id: 'prestige50',   condition: (s) => s.prestige >= 50 },
  { id: 'wellbeing80',  condition: (s) => s.wellbeing >= 80 },
];

export const LANG = {
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
    achievementsTitle: 'Logros',
    achievementsPlaceholder: 'Aún no has conseguido ningún logro.',
    achievements: {
      degree:          '🎓 ¡Licenciado/a! Elegiste tu carrera universitaria.',
      first_paper:     '📄 ¡Primer paper publicado!',
      phd:             '🔬 ¡Doctorado aprobado! Prestigio y papers suficientes.',
      ten_papers:      '📚 ¡10 papers publicados! Investigador/a prolífico/a.',
      discovery:       '💡 ¡Primer descubrimiento científico!',
      two_discoveries: '🌌 ¡Dos descubrimientos! Camino al Nobel.',
      prestige50:      '⭐ ¡Prestigio 50! Referente en tu campo.',
      wellbeing80:     '😊 ¡Bienestar 80! Equilibrio vida-ciencia.',
    },
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
    impactText: (before, after) => {
      const deltas = [
        ['Prestigio',  after.prestige    - before.prestige],
        ['Bienestar',  after.wellbeing   - before.wellbeing],
        ['Ahorros',    after.savings     - before.savings],
        ['Papers',     after.papers      - before.papers],
        ['Hallazgos',  after.discoveries - before.discoveries],
      ].filter(([, d]) => d !== 0)
       .map(([label, d]) => `${label} ${d > 0 ? '+' : ''}${d}`);
      return deltas.length ? `📊 Cambios: ${deltas.join(' · ')}` : '📊 Sin cambios en estadísticas.';
    },
    statsText: (s) =>
      `Edad: ${s.age} · Prestigio: ${s.prestige} · Bienestar: ${s.wellbeing} · Ahorros: ${s.savings} · Papers: ${s.papers} · Hallazgos: ${s.discoveries}`,
    gameEndTitle: 'Final de partida',
    nobelWin: '¡Ganaste el Nobel! Llegaste lejos combinando rigor, decisiones difíciles y algo de suerte.',
    nobelLose: 'No llegó el Nobel esta vez, pero construiste una carrera real: con aprendizaje, tropiezos y logros.',
    gameEndResult: (s) =>
      `Cierre: terminaste con ${s.papers} papers y ${s.discoveries} descubrimientos. La ciencia es una maratón, no un sprint.`,
    questions: [
      {
        alwaysFirst: true,
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
    achievementsTitle: 'Achievements',
    achievementsPlaceholder: 'No achievements unlocked yet.',
    achievements: {
      degree:          '🎓 Graduated! You chose your university degree.',
      first_paper:     '📄 First paper published!',
      phd:             '🔬 PhD passed! Enough prestige and papers.',
      ten_papers:      '📚 10 papers published! Prolific researcher.',
      discovery:       '💡 First scientific discovery!',
      two_discoveries: '🌌 Two discoveries! On the road to the Nobel.',
      prestige50:      '⭐ Prestige 50! A reference in your field.',
      wellbeing80:     '😊 Wellbeing 80! Great work-life balance.',
    },
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
    impactText: (before, after) => {
      const deltas = [
        ['Prestige',    after.prestige    - before.prestige],
        ['Wellbeing',   after.wellbeing   - before.wellbeing],
        ['Savings',     after.savings     - before.savings],
        ['Papers',      after.papers      - before.papers],
        ['Discoveries', after.discoveries - before.discoveries],
      ].filter(([, d]) => d !== 0)
       .map(([label, d]) => `${label} ${d > 0 ? '+' : ''}${d}`);
      return deltas.length ? `📊 Changes: ${deltas.join(' · ')}` : '📊 No stat changes.';
    },
    statsText: (s) =>
      `Age: ${s.age} · Prestige: ${s.prestige} · Wellbeing: ${s.wellbeing} · Savings: ${s.savings} · Papers: ${s.papers} · Discoveries: ${s.discoveries}`,
    gameEndTitle: 'Game over',
    nobelWin: 'You won the Nobel! You went far combining rigour, difficult decisions, and a bit of luck.',
    nobelLose: "The Nobel didn't come this time, but you built a real career: with learning, setbacks, and achievements.",
    gameEndResult: (s) =>
      `Closing: you finished with ${s.papers} papers and ${s.discoveries} discoveries. Science is a marathon, not a sprint.`,
    questions: [
      {
        alwaysFirst: true,
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
          { label: "Yes. You switch fields with a bridge master's.", impact: { prestige: 4, wellbeing: 3, savings: -1 } },
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

export function randomInt(maxExclusive) {
  if (!globalThis.crypto || typeof globalThis.crypto.getRandomValues !== 'function') {
    throw new Error('This game requires a browser with crypto.getRandomValues support.');
  }
  const values = new Uint32Array(1);
  globalThis.crypto.getRandomValues(values);
  return values[0] % maxExclusive;
}

export function shuffle(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = randomInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function rollDie() {
  return randomInt(6) + 1;
}

export function dieFactor(roll) {
  return DIE_FACTOR_BY_ROLL[roll];
}

export function applyImpact(state, baseImpact, roll) {
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

export function hasMetNobelRequirements(state) {
  return (
    state.prestige >= NOBEL_REQUIREMENTS.prestige &&
    state.papers >= NOBEL_REQUIREMENTS.papers &&
    state.discoveries >= NOBEL_REQUIREMENTS.discoveries &&
    state.wellbeing >= NOBEL_REQUIREMENTS.wellbeing
  );
}

export function createInitialState() {
  return {
    age: 18,
    gender: '',
    prestige: 0,
    wellbeing: 50,
    savings: 10,
    papers: 0,
    discoveries: 0,
    rounds: 0,
    maxRounds: Math.min(MAX_GAME_ROUNDS, LANG.es.questions.length),
    queue: [],
    achievements: []
  };
}

export function buildQueue(questions, maxRounds) {
  const fixed = questions.filter((q) => q.alwaysFirst);
  const rest = shuffle(questions.filter((q) => !q.alwaysFirst));
  // Queue is consumed via .pop(), so items at the END are shown FIRST.
  // Fixed questions go at the end so they appear first in the game.
  const selected = rest.slice(0, maxRounds - fixed.length);
  return [...selected, ...fixed];
}

export function checkAchievements(state) {
  return ACHIEVEMENTS
    .filter((a) => !state.achievements.includes(a.id) && a.condition(state))
    .map((a) => a.id);
}
