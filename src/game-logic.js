export const DIE_FACTOR_BY_ROLL = { 1: 0.45, 2: 0.75, 3: 1, 4: 1.15, 5: 1.35, 6: 1.65 };
export const MIN_SAVINGS = -10;
export const NOBEL_REQUIREMENTS = { prestige: 70, papers: 6, discoveries: 2, wellbeing: 20 };
export const MAX_GAME_ROUNDS = 10;
/** Wellbeing at or below this value triggers a forced burnout game-over. */
export const BURNOUT_THRESHOLD = 10;

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

/** Returns a signed string representation of a numeric delta, e.g. "+5" or "-3".
 *  Callers are expected to filter out zero deltas before invoking this function.
 */
function formatDelta(d) {
  return `${d > 0 ? '+' : ''}${d}`;
}

/**
 * Builds a list of human-readable delta strings for changed stats.
 * Returns an array so callers can join with a locale-specific separator
 * or apply further filtering before rendering.
 * @param {Array<[string, string]>} labels - Pairs of [display label, state key].
 * @param {Object} before - Snapshot of stats before the impact.
 * @param {Object} after  - Stats object after the impact.
 * @returns {string[]} Array of formatted delta strings for stats that changed.
 */
function buildImpactText(labels, before, after) {
  const deltas = labels
    .filter(([, key]) => after[key] !== before[key])
    .map(([label, key]) => `${label} ${formatDelta(after[key] - before[key])}`);
  return deltas;
}

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
      const deltas = buildImpactText(
        [['Prestigio', 'prestige'], ['Bienestar', 'wellbeing'], ['Ahorros', 'savings'], ['Papers', 'papers'], ['Hallazgos', 'discoveries']],
        before, after
      );
      return deltas.length ? `📊 Cambios: ${deltas.join(' · ')}` : '📊 Sin cambios en estadísticas.';
    },
    statsText: (s) =>
      `Edad: ${s.age} · Prestigio: ${s.prestige} · Bienestar: ${s.wellbeing} · Ahorros: ${s.savings} · Papers: ${s.papers} · Hallazgos: ${s.discoveries}`,
    gameEndTitle: 'Final de partida',
    nobelWin: '¡Ganaste el Nobel! Llegaste lejos combinando rigor, decisiones difíciles y algo de suerte.',
    nobelLose: 'No llegó el Nobel esta vez, pero construiste una carrera real: con aprendizaje, tropiezos y logros.',
    gameEndResult: (s) =>
      `Cierre: terminaste con ${s.papers} papers y ${s.discoveries} descubrimientos. La ciencia es una maratón, no un sprint.`,
    leftAcademiaTitle: 'Nueva etapa fuera de la academia',
    leftAcademiaMsg: 'Elegiste salir de la academia. No toda carrera científica termina en un laboratorio: muchos exinvestigadores transforman el mundo desde la empresa, la política o la educación. Fue una decisión valiente y completamente legítima.',
    leftAcademiaResult: (s) =>
      `Saliste en la ronda ${s.rounds}. Acumulaste ${s.papers} papers y ${s.discoveries} descubrimientos. El conocimiento que adquiriste te acompañará siempre.`,
    burnoutTitle: 'Burnout: el límite del cuerpo y la mente',
    burnoutMsg: 'La presión acumulada te pasó factura. El burnout científico afecta a casi la mitad de las personas en investigación. Parar a tiempo también es sabiduría: tu bienestar importa más que cualquier paper.',
    burnoutResult: (s) =>
      `Tu bienestar llegó al límite en la ronda ${s.rounds}. Con ${s.papers} papers y ${s.discoveries} descubrimientos, dejaste huella aunque el camino se cortó antes de lo esperado.`,
    questions: [
      {
        order: 1,
        title: 'Primera gran decisión',
        text: 'Tienes 18 años. La selectividad ha quedado atrás y llega el momento de elegir tu carrera. ¿Qué camino científico escoges?',
        options: [
          { label: 'Biología: te fascina el origen de la vida y la célula.', impact: { prestige: 6, wellbeing: 2, papers: 1 } },
          { label: 'Física: quieres descifrar las leyes del universo.', impact: { prestige: 7, papers: 1 } },
          { label: 'Ingeniería biomédica: ciencia con impacto real e inmediato.', impact: { prestige: 5, savings: 2 } }
        ]
      },
      {
        order: 2,
        title: 'El trabajo de fin de grado',
        text: 'En tu último año de carrera, un profesor te invita a su laboratorio para el TFG. Es tu primera chispa real de investigación. ¿Qué haces?',
        options: [
          { label: 'Me implico a fondo: quiero publicar algo aunque me cueste noches.', impact: { prestige: 5, wellbeing: -1, papers: 1 } },
          { label: 'Lo hago bien pero sin obsesionarme; equilibro vida y ciencia.', impact: { prestige: 3, wellbeing: 3 } },
          { label: 'Me doy cuenta de que no es lo mío y busco trabajo fuera.', impact: { wellbeing: 3, savings: 3 }, exitAcademia: true }
        ]
      },
      {
        order: 3,
        title: '¿Doctorado o mercado laboral?',
        text: 'Tu directora de TFG queda encantada contigo y te ofrece una beca de doctorado. Son cuatro años, sueldo bajo y mucha incertidumbre. ¿Aceptas?',
        options: [
          { label: 'Acepto. Quiero llegar lejos en la ciencia.', impact: { prestige: 8, savings: -3, papers: 1 } },
          { label: 'Me lo pienso y busco opciones mixtas entre academia e industria.', impact: { prestige: 4, savings: 1 } },
          { label: 'Rechazo. Prefiero estabilidad y un buen sueldo ya.', impact: { savings: 5, wellbeing: 4 }, exitAcademia: true }
        ]
      },
      {
        order: 4,
        title: 'Los primeros experimentos',
        text: 'Llevas un año en el doctorado y los experimentos no salen como esperabas. El fracaso se repite semana tras semana. ¿Cómo gestionas la frustración?',
        options: [
          { label: 'Busco ayuda y reformulo la hipótesis con calma y método.', impact: { prestige: 6, wellbeing: 2, papers: 1 } },
          { label: 'Me encierro y trabajo el doble de horas para compensar.', impact: { prestige: 5, wellbeing: -7, papers: 1 } },
          { label: 'Hablo con compañeros de doctorado: descubro que no soy el único.', impact: { prestige: 3, wellbeing: 4 } }
        ]
      },
      {
        order: 5,
        title: 'Crisis con el supervisor',
        text: 'Tu supervisor lleva meses ignorando tu trabajo y minimizando tus ideas. Estás al límite. Una colega te dice: "Denuncia, lo que hace no está bien."',
        options: [
          { label: 'Pido formalmente un cambio de supervisor.', impact: { prestige: 4, wellbeing: 3, savings: -1 } },
          { label: 'Aguanto en silencio. Seguro que mejora...', impact: { prestige: 1, wellbeing: -10 } },
          { label: 'No puedo más con esto. Dejo el doctorado.', impact: { wellbeing: 6, savings: 2 }, exitAcademia: true }
        ]
      },
      {
        order: 6,
        title: 'La defensa de tesis',
        text: 'Llegó el gran día. Cuatro años condensados en 200 páginas y 45 minutos ante el tribunal. Es el momento de defender quién eres como investigador/a.',
        options: [
          { label: 'Me preparo a fondo y defiendo con seguridad y pasión.', impact: { prestige: 10, wellbeing: 3, papers: 1, discoveries: 1 } },
          { label: 'Los nervios me bloquean y respondo con dudas ante el tribunal.', impact: { prestige: 4, wellbeing: -2 } },
          { label: 'Presento los datos honestamente, sin adornos, con rigor.', impact: { prestige: 7, wellbeing: 2, papers: 1 } }
        ]
      },
      {
        order: 7,
        title: 'El primer postdoc',
        text: 'Con el doctorado en la mano, te llega una oferta de postdoc en el extranjero. Más recursos, pero lejos de todo lo conocido. ¿Qué haces?',
        options: [
          { label: 'Me mudo: la movilidad internacional abre puertas clave.', impact: { prestige: 9, wellbeing: -2, savings: -2, papers: 1 } },
          { label: 'Prefiero un postdoc local; cuido mi red de apoyo.', impact: { prestige: 5, wellbeing: 3 } },
          { label: 'Acepto un trabajo en industria. La academia puede esperar.', impact: { savings: 6, wellbeing: 5 }, exitAcademia: true }
        ]
      },
      {
        order: 8,
        title: 'La lucha por financiación',
        text: 'Tu contrato postdoctoral termina en dos meses. No hay proyecto nuevo. El laboratorio se queda sin fondos. ¿Cómo sobrevives?',
        options: [
          { label: 'Me lanzo a escribir una propuesta de proyecto competitivo.', impact: { prestige: 7, wellbeing: -5, papers: 1 } },
          { label: 'Busco colaboración con un grupo que tenga financiación.', impact: { prestige: 5, savings: 2, wellbeing: 1 } },
          { label: 'Sin fondos ni perspectivas, dejo la ciencia.', impact: { wellbeing: 3, savings: 4 }, exitAcademia: true }
        ]
      },
      {
        order: 9,
        title: 'El hallazgo inesperado',
        text: 'En un experimento de rutina aparece una señal que no cuadra con nada conocido. Podría ser ruido... o el descubrimiento de tu vida. ¿Qué haces?',
        options: [
          { label: 'Lo investigo con rigor: replico, valido y documento todo.', impact: { prestige: 12, wellbeing: 2, discoveries: 1 } },
          { label: 'Anuncio el descubrimiento antes de validarlo para adelantarme.', impact: { prestige: 3, wellbeing: -3, papers: 1 } },
          { label: 'Pido una revisión externa antes de publicar absolutamente nada.', impact: { prestige: 9, wellbeing: 1, discoveries: 1, papers: 1 } }
        ]
      },
      {
        order: 10,
        title: 'El camino al Nobel',
        text: 'El Comité Nobel empieza a citar tu trabajo. Estás en el círculo de los grandes. Este es el momento de dejar tu huella definitiva en la ciencia.',
        options: [
          { label: 'Publico el paper que lo cambia todo y doy conferencias globales.', impact: { prestige: 15, papers: 2, discoveries: 1 } },
          { label: 'Me centro en mentorizar a la siguiente generación de científicos.', impact: { wellbeing: 10, prestige: 8 } },
          { label: 'Fusiono mi investigación con aplicaciones que salvan vidas.', impact: { prestige: 12, discoveries: 1, wellbeing: 5, papers: 1 } }
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
      const deltas = buildImpactText(
        [['Prestige', 'prestige'], ['Wellbeing', 'wellbeing'], ['Savings', 'savings'], ['Papers', 'papers'], ['Discoveries', 'discoveries']],
        before, after
      );
      return deltas.length ? `📊 Changes: ${deltas.join(' · ')}` : '📊 No stat changes.';
    },
    statsText: (s) =>
      `Age: ${s.age} · Prestige: ${s.prestige} · Wellbeing: ${s.wellbeing} · Savings: ${s.savings} · Papers: ${s.papers} · Discoveries: ${s.discoveries}`,
    gameEndTitle: 'Game over',
    nobelWin: 'You won the Nobel! You went far combining rigour, difficult decisions, and a bit of luck.',
    nobelLose: "The Nobel didn't come this time, but you built a real career: with learning, setbacks, and achievements.",
    gameEndResult: (s) =>
      `Closing: you finished with ${s.papers} papers and ${s.discoveries} discoveries. Science is a marathon, not a sprint.`,
    leftAcademiaTitle: 'A new chapter outside academia',
    leftAcademiaMsg: "You chose to leave academia. Not every scientific career ends in a lab: many former researchers transform the world through industry, policy, or education. It was a brave and completely legitimate decision.",
    leftAcademiaResult: (s) =>
      `You left in round ${s.rounds}. You accumulated ${s.papers} papers and ${s.discoveries} discoveries. The knowledge you gained will always stay with you.`,
    burnoutTitle: 'Burnout: the limit of body and mind',
    burnoutMsg: 'The accumulated pressure took its toll. Scientific burnout affects almost half of all researchers. Knowing when to stop is also wisdom: your wellbeing matters more than any paper.',
    burnoutResult: (s) =>
      `Your wellbeing reached its limit in round ${s.rounds}. With ${s.papers} papers and ${s.discoveries} discoveries, you left your mark even though the journey was cut short.`,
    questions: [
      {
        order: 1,
        title: 'First big decision',
        text: 'You are 18 years old. Exams are behind you and it is time to choose your degree. Which scientific path do you take?',
        options: [
          { label: 'Biology: you are fascinated by the origin of life and the cell.', impact: { prestige: 6, wellbeing: 2, papers: 1 } },
          { label: 'Physics: you want to decode the laws of the universe.', impact: { prestige: 7, papers: 1 } },
          { label: 'Biomedical Engineering: science with immediate real impact.', impact: { prestige: 5, savings: 2 } }
        ]
      },
      {
        order: 2,
        title: 'Final year project',
        text: 'In your final year, a professor invites you to their lab for your thesis project. It is your first real spark of research. What do you do?',
        options: [
          { label: 'I go all in: I want to publish something even if it costs me nights.', impact: { prestige: 5, wellbeing: -1, papers: 1 } },
          { label: 'I do it well but without obsessing; I balance life and science.', impact: { prestige: 3, wellbeing: 3 } },
          { label: 'I realise research is not for me and look for a job outside.', impact: { wellbeing: 3, savings: 3 }, exitAcademia: true }
        ]
      },
      {
        order: 3,
        title: 'PhD or job market?',
        text: 'Your thesis supervisor is impressed and offers you a PhD scholarship. Four years, low pay, lots of uncertainty. Do you accept?',
        options: [
          { label: 'I accept. I want to go far in science.', impact: { prestige: 8, savings: -3, papers: 1 } },
          { label: 'I think it over and look for hybrid options between academia and industry.', impact: { prestige: 4, savings: 1 } },
          { label: 'I decline. I prefer stability and a good salary now.', impact: { savings: 5, wellbeing: 4 }, exitAcademia: true }
        ]
      },
      {
        order: 4,
        title: 'First experiments',
        text: 'You have been doing your PhD for a year and the experiments keep failing week after week. How do you handle the frustration?',
        options: [
          { label: 'I seek help and calmly reformulate the hypothesis with method.', impact: { prestige: 6, wellbeing: 2, papers: 1 } },
          { label: 'I lock myself away and work twice as hard to compensate.', impact: { prestige: 5, wellbeing: -7, papers: 1 } },
          { label: 'I talk to fellow PhD students: I discover I am not alone.', impact: { prestige: 3, wellbeing: 4 } }
        ]
      },
      {
        order: 5,
        title: 'Supervisor crisis',
        text: 'Your supervisor has been ignoring your work for months, dismissing your ideas. You are at your limit. A colleague says: "Report them. What they are doing is not okay."',
        options: [
          { label: 'I formally request a change of supervisor.', impact: { prestige: 4, wellbeing: 3, savings: -1 } },
          { label: 'I endure in silence. It will get better...', impact: { prestige: 1, wellbeing: -10 } },
          { label: "I can't take it anymore. I quit the PhD.", impact: { wellbeing: 6, savings: 2 }, exitAcademia: true }
        ]
      },
      {
        order: 6,
        title: 'The thesis defence',
        text: 'The big day has arrived. Four years compressed into 200 pages and 45 minutes before the committee. It is time to defend who you are as a researcher.',
        options: [
          { label: 'I prepare thoroughly and defend with confidence and passion.', impact: { prestige: 10, wellbeing: 3, papers: 1, discoveries: 1 } },
          { label: 'Nerves get the better of me and I answer with hesitation.', impact: { prestige: 4, wellbeing: -2 } },
          { label: 'I present the data honestly, without embellishment, with rigour.', impact: { prestige: 7, wellbeing: 2, papers: 1 } }
        ]
      },
      {
        order: 7,
        title: 'First postdoc',
        text: 'With your PhD in hand, you receive a postdoc offer abroad. More resources, but far from everything familiar. What do you do?',
        options: [
          { label: 'I move: international mobility opens key doors.', impact: { prestige: 9, wellbeing: -2, savings: -2, papers: 1 } },
          { label: 'I prefer a local postdoc, close to my support network.', impact: { prestige: 5, wellbeing: 3 } },
          { label: 'I take an industry job. Academia can wait.', impact: { savings: 6, wellbeing: 5 }, exitAcademia: true }
        ]
      },
      {
        order: 8,
        title: 'The funding battle',
        text: 'Your postdoc contract ends in two months. There is no new project. The lab is running out of money. How do you survive?',
        options: [
          { label: 'I write a competitive research grant proposal.', impact: { prestige: 7, wellbeing: -5, papers: 1 } },
          { label: 'I seek collaboration with a well-funded research group.', impact: { prestige: 5, savings: 2, wellbeing: 1 } },
          { label: 'With no funds and no prospects, I leave academia.', impact: { wellbeing: 3, savings: 4 }, exitAcademia: true }
        ]
      },
      {
        order: 9,
        title: 'The unexpected finding',
        text: 'During a routine experiment, an anomalous signal appears that does not fit anything known. It could be noise... or the discovery of your life.',
        options: [
          { label: 'I investigate it rigorously: I replicate, validate and document everything.', impact: { prestige: 12, wellbeing: 2, discoveries: 1 } },
          { label: 'I announce the discovery before validating it to get ahead.', impact: { prestige: 3, wellbeing: -3, papers: 1 } },
          { label: 'I request an external review before publishing anything.', impact: { prestige: 9, wellbeing: 1, discoveries: 1, papers: 1 } }
        ]
      },
      {
        order: 10,
        title: 'The road to the Nobel',
        text: 'The Nobel Committee is starting to cite your work. You are in the circle of the greats. This is the moment to leave your definitive mark on science.',
        options: [
          { label: 'I publish the paper that changes everything and give global talks.', impact: { prestige: 15, papers: 2, discoveries: 1 } },
          { label: 'I focus on mentoring the next generation of scientists.', impact: { wellbeing: 10, prestige: 8 } },
          { label: 'I merge my research with life-saving applications.', impact: { prestige: 12, discoveries: 1, wellbeing: 5, papers: 1 } }
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
  // Sort by the numeric `order` property so the narrative arc is always preserved.
  const sorted = [...questions].sort((a, b) => a.order - b.order);
  const selected = sorted.slice(0, maxRounds);
  // Queue is consumed via .pop(), so items at the END are shown FIRST.
  // Reversing puts order-1 at the end so it is shown first in the game.
  return [...selected].reverse();
}

export function checkAchievements(state) {
  return ACHIEVEMENTS
    .filter((a) => !state.achievements.includes(a.id) && a.condition(state))
    .map((a) => a.id);
}

export function snapshotStats(state) {
  return {
    prestige: state.prestige,
    wellbeing: state.wellbeing,
    savings: state.savings,
    papers: state.papers,
    discoveries: state.discoveries
  };
}

/**
 * Checks whether the game should end early after applying an impact.
 * Burnout (wellbeing at or below BURNOUT_THRESHOLD) is checked first so that
 * a harsh die roll can force an exit even on an option that doesn't voluntarily
 * leave academia.
 * @param {Object} state - Current player state (after impact was applied).
 * @param {boolean} [optionExitsAcademia=false] - True when the chosen option
 *   explicitly leaves academia (option.exitAcademia === true).
 * @returns {'burnout'|'leftAcademia'|null}
 */
export function checkEarlyEnd(state, optionExitsAcademia = false) {
  if (state.wellbeing <= BURNOUT_THRESHOLD) return 'burnout';
  if (optionExitsAcademia) return 'leftAcademia';
  return null;
}
