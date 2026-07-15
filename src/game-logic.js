export const DIE_FACTOR_BY_ROLL = { 1: 0.45, 2: 0.75, 3: 1, 4: 1.15, 5: 1.35, 6: 1.65 };
export const MIN_SAVINGS = -10;
export const NOBEL_REQUIREMENTS = { prestige: 70, papers: 6, discoveries: 2, wellbeing: 20 };
export const MAX_GAME_ROUNDS = 10;

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
    endingCharacterLabel: 'Tu homólogo científico',
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
    endingCharacterLabel: 'Your scientific counterpart',
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

// ---------------------------------------------------------------------------
// Endings
// Each entry: id, gender ('male'|'female'|'nonbinary'|'any'), tier
// ('high'|'medium-high'|'medium-low'|'low'), optional threshold fields
// (minPrestige, maxPrestige, minPapers, minDiscoveries, minWellbeing,
// minSavings), photo path (null until images are provided), and locale text.
//
// Within each tier entries are ordered hardest → easiest so that getEnding()
// returns the most impressive match first.
//
// Photo filenames (place files in images/endings/ in the repo root):
//   ramon-y-cajal.jpg · severo-ochoa.jpg · margarita-salas.jpg
//   juan-ignacio-cirac.jpg · maria-blasco.jpg · pedro-duque.jpg
//   angela-nieto.jpg · luisma-escudero.jpg · carme-torras.jpg
//   juan-luis-arsuaga.jpg · gabriella-morreale.jpg · jose-elguero.jpg
//   mateo-valero.jpg
// ---------------------------------------------------------------------------
export const ENDINGS = [
  // ── HIGH TIER ─────────────────────────────────────────────────────────────
  {
    id: 'ramon-y-cajal',
    gender: 'male',
    tier: 'high',
    minPrestige: 105, minPapers: 7, minDiscoveries: 3, minWellbeing: 30,
    photo: 'images/endings/ramon-y-cajal.jpg',
    es: {
      name: 'Santiago Ramón y Cajal',
      description: 'Tu carrera llegó tan alto como pocos en la historia de la ciencia. Tus investigaciones sobre el sistema nervioso revolucionaron la neurología. En 1906 recibiste el Premio Nobel, convirtiéndote en el científico más universal de España.'
    },
    en: {
      name: 'Santiago Ramón y Cajal',
      description: 'Your career reached heights few in the history of science have achieved. Your research on the nervous system revolutionised neurology. In 1906 you received the Nobel Prize, becoming Spain\'s most universal scientist.'
    }
  },
  {
    id: 'severo-ochoa',
    gender: 'male',
    tier: 'high',
    minPrestige: 95, minPapers: 7, minDiscoveries: 3, minWellbeing: 25,
    photo: 'images/endings/severo-ochoa.jpg',
    es: {
      name: 'Severo Ochoa',
      description: 'Tu dedicación a la bioquímica cambió el mundo. Tus descubrimientos sobre la síntesis del ARN sentaron las bases de la biología molecular. En 1959 el Premio Nobel reconoció lo que todos sabían: eras de los mejores.'
    },
    en: {
      name: 'Severo Ochoa',
      description: 'Your dedication to biochemistry changed the world. Your discoveries on RNA synthesis laid the foundations of molecular biology. In 1959 the Nobel Prize confirmed what everyone knew: you were among the best.'
    }
  },
  {
    id: 'margarita-salas',
    gender: 'female',
    tier: 'high',
    minPrestige: 90, minPapers: 7, minDiscoveries: 2, minWellbeing: 25,
    photo: 'images/endings/margarita-salas.jpg',
    es: {
      name: 'Margarita Salas',
      description: 'Pionera incansable de la biología molecular en España. Tu descubrimiento de la ADN polimerasa phi29 es hoy esencial en biotecnología. Una carrera brillante que abrió puertas para toda una generación de científicas.'
    },
    en: {
      name: 'Margarita Salas',
      description: 'A tireless pioneer of molecular biology in Spain. Your discovery of phi29 DNA polymerase is now essential in biotechnology. A brilliant career that opened doors for an entire generation of women in science.'
    }
  },
  {
    id: 'juan-ignacio-cirac',
    gender: 'male',
    tier: 'high',
    minPrestige: 82, minPapers: 6, minDiscoveries: 2, minWellbeing: 20,
    photo: 'images/endings/juan-ignacio-cirac.jpg',
    es: {
      name: 'Juan Ignacio Cirac',
      description: 'Tu trabajo teórico en física cuántica te situó como referencia mundial en computación cuántica. Tus modelos pioneros sentaron las bases de una nueva era tecnológica.'
    },
    en: {
      name: 'Juan Ignacio Cirac',
      description: 'Your theoretical work in quantum physics placed you as a world reference in quantum computing. Your pioneering models laid the foundations for a new technological era.'
    }
  },
  {
    id: 'maria-blasco',
    gender: 'female',
    tier: 'high',
    minPrestige: 70, minPapers: 6, minDiscoveries: 2, minWellbeing: 20,
    photo: 'images/endings/maria-blasco.jpg',
    es: {
      name: 'María Blasco',
      description: 'Bióloga molecular y directora del CNIO. Tu trabajo sobre los telómeros ha revolucionado el conocimiento sobre el envejecimiento y el cáncer. Una carrera que combina rigor científico y liderazgo institucional.'
    },
    en: {
      name: 'María Blasco',
      description: 'Molecular biologist and director of the CNIO. Your work on telomeres has revolutionised the understanding of ageing and cancer. A career that combines scientific rigour and institutional leadership.'
    }
  },
  {
    id: 'pedro-duque',
    gender: 'male',
    tier: 'high',
    minPrestige: 70, minPapers: 6, minDiscoveries: 2, minWellbeing: 20,
    photo: 'images/endings/pedro-duque.jpg',
    es: {
      name: 'Pedro Duque',
      description: 'Ingeniero aeroespacial y primer astronauta español. Completaste dos misiones espaciales y después serviste como Ministro de Ciencia. Una carrera que inspiró a millones de jóvenes a mirar hacia las estrellas.'
    },
    en: {
      name: 'Pedro Duque',
      description: 'Aerospace engineer and first Spanish astronaut. You completed two space missions and later served as Minister of Science. A career that inspired millions of young people to look toward the stars.'
    }
  },
  // ── MEDIUM-HIGH TIER ──────────────────────────────────────────────────────
  {
    id: 'angela-nieto',
    gender: 'female',
    tier: 'medium-high',
    minPrestige: 48, minPapers: 4, minDiscoveries: 1, minWellbeing: 15,
    photo: 'images/endings/angela-nieto.jpg',
    es: {
      name: 'Ángela Nieto',
      description: 'Investigadora del CSIC en biología del desarrollo. Tu trabajo sobre los procesos embrionarios te valió el premio "Para las Mujeres en la Ciencia" de la UNESCO. Una carrera marcada por el rigor y el compromiso.'
    },
    en: {
      name: 'Ángela Nieto',
      description: 'CSIC researcher in developmental biology. Your work on embryonic processes earned you UNESCO\'s "For Women in Science" award. A career marked by rigour and commitment.'
    }
  },
  {
    id: 'luisma-escudero',
    gender: 'male',
    tier: 'medium-high',
    minPrestige: 48, minPapers: 4, minDiscoveries: 1, minWellbeing: 15,
    photo: 'images/endings/luisma-escudero.jpg',
    es: {
      name: 'Luisma Escudero',
      description: 'Biólogo del desarrollo que descubrió el escutoide, una forma geométrica presente en las células del cuerpo. Un hallazgo inesperado que demostró que la naturaleza aún tiene secretos por revelar.'
    },
    en: {
      name: 'Luisma Escudero',
      description: 'Developmental biologist who discovered the scutoid, a geometric shape present in body cells. An unexpected finding that proved nature still has secrets to reveal.'
    }
  },
  {
    id: 'carme-torras',
    gender: 'female',
    tier: 'medium-high',
    minPrestige: 40, minPapers: 3, minWellbeing: 10,
    photo: 'images/endings/carme-torras.jpg',
    es: {
      name: 'Carme Torras',
      description: 'Investigadora de referencia en robótica inteligente y social en España. Premio Nacional de Investigación. Tu trabajo acerca la robótica a las personas y abre nuevas posibilidades para la tecnología del futuro.'
    },
    en: {
      name: 'Carme Torras',
      description: 'A leading researcher in intelligent and social robotics in Spain. National Research Award winner. Your work brings robotics closer to people and opens new possibilities for the technology of the future.'
    }
  },
  {
    id: 'juan-luis-arsuaga',
    gender: 'male',
    tier: 'medium-high',
    minPrestige: 40, minPapers: 3, minWellbeing: 10,
    photo: 'images/endings/juan-luis-arsuaga.jpg',
    es: {
      name: 'Juan Luis Arsuaga',
      description: 'Paleontólogo y divulgador científico. Codirector de las excavaciones de Atapuerca, un yacimiento clave para entender la evolución humana. Una carrera dedicada a descubrir de dónde venimos.'
    },
    en: {
      name: 'Juan Luis Arsuaga',
      description: 'Palaeontologist and science communicator. Co-director of the Atapuerca excavations, a key site for understanding human evolution. A career dedicated to discovering where we come from.'
    }
  },
  // ── MEDIUM-LOW TIER ───────────────────────────────────────────────────────
  {
    id: 'gabriella-morreale',
    gender: 'female',
    tier: 'medium-low',
    minPrestige: 22, minPapers: 2,
    photo: 'images/endings/gabriella-morreale.jpg',
    es: {
      name: 'Gabriella Morreale',
      description: 'Científica ítalo-española, referencia en endocrinología. Tu trabajo fue fundamental para prevenir el cretinismo a través de la detección temprana del hipotiroidismo. Una contribución que salvó vidas.'
    },
    en: {
      name: 'Gabriella Morreale',
      description: 'Italian-Spanish scientist, a reference in endocrinology. Your work was fundamental in preventing cretinism through early hypothyroidism detection. A contribution that saved lives.'
    }
  },
  {
    id: 'jose-elguero',
    gender: 'male',
    tier: 'medium-low',
    minPrestige: 22, minPapers: 2,
    photo: 'images/endings/jose-elguero.jpg',
    es: {
      name: 'José Elguero Bertolini',
      description: 'Químico orgánico y medicinal de referencia. Expresidente del CSIC y galardonado con la Medalla de Oro de la Real Sociedad Española de Química. Una carrera sólida al servicio de la ciencia española.'
    },
    en: {
      name: 'José Elguero Bertolini',
      description: 'A reference in organic and medicinal chemistry. Former CSIC president, awarded the Gold Medal of the Royal Spanish Chemical Society. A solid career in the service of Spanish science.'
    }
  },
  {
    id: 'mateo-valero',
    gender: 'male',
    tier: 'medium-low',
    minPrestige: 16, minPapers: 1,
    photo: 'images/endings/mateo-valero.jpg',
    es: {
      name: 'Mateo Valero',
      description: 'Experto en ingeniería computacional. Tu trabajo en redes de interconexión y procesadores es muy reconocido en el campo de la supercomputación. Una carrera técnica de alto impacto.'
    },
    en: {
      name: 'Mateo Valero',
      description: 'Expert in computational engineering. Your work on interconnection networks and processors is highly prestigious in the field of supercomputing. A high-impact technical career.'
    }
  },
  // ── LOW TIER ──────────────────────────────────────────────────────────────
  // Scandal endings (negative prestige, ordered gender-specific → any)
  {
    id: 'dra-moreno',
    gender: 'female',
    tier: 'low',
    maxPrestige: -1, minPapers: 1,
    photo: null,
    es: {
      name: 'Dra. Moreno',
      description: 'Falseaste tus datos para conseguir una publicación. Te pillaron, y te convertiste en un ejemplo de qué no hay que hacer para jóvenes científicos. Tu nombre vive, aunque no como querías.'
    },
    en: {
      name: 'Dr. Moreno',
      description: 'You faked your data to get a publication. You were caught, and became a cautionary tale for young scientists about what not to do. Your name lives on, though not as you wanted.'
    }
  },
  {
    id: 'dr-alvarez',
    gender: 'male',
    tier: 'low',
    maxPrestige: -1, minPapers: 1,
    photo: null,
    es: {
      name: 'Dr. Álvarez',
      description: 'Te apropiaste del trabajo de tus estudiantes. La voz corrió. Ahora nadie quiere trabajar contigo y tu laboratorio está vacío. Las ideas de otros no duran cuando las llevas tú.'
    },
    en: {
      name: 'Dr. Álvarez',
      description: 'You took credit for your students\' work. Word spread. Now no one wants to work with you and your lab is empty. Other people\'s ideas do not last when you carry them.'
    }
  },
  {
    id: 'dra-castillo',
    gender: 'nonbinary',
    tier: 'low',
    maxPrestige: -1, minPapers: 1,
    photo: null,
    es: {
      name: 'Dra. Castillo',
      description: 'Plagiaste un artículo de una investigadora junior. El escándalo acabó con tu carrera antes de que empezara de verdad. Una decisión que destruyó años de esfuerzo en un instante.'
    },
    en: {
      name: 'Dr. Castillo',
      description: 'You plagiarised a paper from a junior researcher. The scandal ended your career before it truly began. One decision that destroyed years of effort in an instant.'
    }
  },
  {
    id: 'the-fraudster',
    gender: 'any',
    tier: 'low',
    maxPrestige: -1,
    photo: null,
    es: {
      name: 'El Impostor',
      description: 'Tomaste atajos, fabricaste datos o robaste el trabajo de otras personas. Te descubrieron. Tu reputación quedó destruida, y tu nombre se asocia para siempre con el fraude científico.'
    },
    en: {
      name: 'The Fraudster',
      description: 'You took shortcuts, fabricated data, or stole others\' work. You were found out. Your reputation was destroyed, and your name is forever associated with scientific fraud.'
    }
  },
  // Sellout endings (high savings, low prestige)
  {
    id: 'dr-ramirez',
    gender: 'male',
    tier: 'low',
    minSavings: 4, maxPrestige: 4,
    photo: null,
    es: {
      name: 'Dr. Ramírez',
      description: 'Vendiste tu experiencia a una empresa petrolera para desmentir el cambio climático. Ganaste dinero, pero perdiste tu integridad. La ciencia te recuerda como un caso de estudio en ética de la investigación.'
    },
    en: {
      name: 'Dr. Ramírez',
      description: 'You sold your expertise to an oil company to disprove climate change. You won money, but lost your integrity. Science remembers you as a case study in research ethics.'
    }
  },
  {
    id: 'happy-in-industry',
    gender: 'any',
    tier: 'low',
    minSavings: 6,
    photo: null,
    es: {
      name: 'Feliz en la Industria',
      description: 'La academia no era para ti, y lo reconociste a tiempo. Te fuiste a la industria, tienes un buen sueldo y duermes bien por las noches. No hay Nobel, pero tampoco tienes que justificar tu financiación cada dos años.'
    },
    en: {
      name: 'Happy in Industry',
      description: 'Academia was not for you, and you recognised it in time. You went to industry, have a good salary, and sleep well at night. No Nobel, but you also do not have to justify your funding every two years.'
    }
  },
  // Tried but mediocre
  {
    id: 'dra-romero',
    gender: 'female',
    tier: 'low',
    minPapers: 1, minWellbeing: 35,
    photo: null,
    es: {
      name: 'Dra. Romero',
      description: 'Intentaste ser divulgadora científica, pero no era lo tuyo. Tu canal de YouTube tiene 12 suscriptores (3 son tu familia). Pero al menos lo intentaste, y eso cuenta.'
    },
    en: {
      name: 'Dr. Romero',
      description: 'You tried to become a science communicator, but it was not your thing. Your YouTube channel has 12 subscribers (3 are your family). But at least you tried, and that counts.'
    }
  },
  {
    id: 'bureaucratic-scientist',
    gender: 'any',
    tier: 'low',
    minPapers: 1,
    photo: null,
    es: {
      name: 'El Científico Burocrático',
      description: 'Empezaste con entusiasmo, pero te perdiste en la gestión, las reuniones y la política académica. Publicaste, pero nada relevante. Un final gris para un comienzo prometedor.'
    },
    en: {
      name: 'The Bureaucratic Scientist',
      description: 'You started with enthusiasm, but got lost in management, meetings, and academic politics. You published, but nothing relevant. A grey ending for a promising start.'
    }
  },
  {
    id: 'dr-torres',
    gender: 'male',
    tier: 'low',
    minDiscoveries: 1,
    photo: null,
    es: {
      name: 'Dr. Torres',
      description: 'Pasaste tu vida intentando inventar el movimiento perpetuo. Fallaste. Todos te dijeron que era imposible. No escuchaste. Al menos eras persistente.'
    },
    en: {
      name: 'Dr. Torres',
      description: 'You spent your life trying to invent perpetual motion. You failed. Everyone told you it was impossible. You did not listen. At least you were persistent.'
    }
  },
  // Generic poor endings (no extra threshold)
  {
    id: 'dra-suarez',
    gender: 'female',
    tier: 'low',
    photo: null,
    es: {
      name: 'Dra. Suárez',
      description: 'Te convertiste en conspiracionista. Ahora escribes blogs sobre extraterrestres y el 5G en lugar de hacer ciencia real. Perdiste tus credenciales, pero ganaste muchos seguidores en redes sociales.'
    },
    en: {
      name: 'Dr. Suárez',
      description: 'You became a conspiracy theorist. Now you write blogs about aliens and 5G instead of real science. You lost your credentials but gained many followers on social media.'
    }
  },
  {
    id: 'dr-ortega',
    gender: 'nonbinary',
    tier: 'low',
    photo: null,
    es: {
      name: 'Dr. Ortega',
      description: 'Tu investigación era tan irrelevante que tu única cita es de una página de Wikipedia sobre "contribuciones científicas triviales". Al menos apareces en algún lado.'
    },
    en: {
      name: 'Dr. Ortega',
      description: 'Your research was so irrelevant that your only citation is from a Wikipedia page about "trivial scientific contributions". At least you appear somewhere.'
    }
  },
  // Catch-all
  {
    id: 'the-forgotten',
    gender: 'any',
    tier: 'low',
    photo: null,
    es: {
      name: 'El Olvidado',
      description: 'Hiciste un trabajo mediocre en un campo oscuro. Tu único legado es una tesis polvorienta en un rincón olvidado de una biblioteca. Nadie te recuerda, pero tampoco te odian.'
    },
    en: {
      name: 'The Forgotten',
      description: 'You did mediocre work in an obscure field. Your only legacy is a dusty thesis in a forgotten library corner. No one remembers you, but no one hates you either.'
    }
  }
];

function normalizePlayerGender(gender) {
  if (gender === 'mujer' || gender === 'woman') return 'female';
  if (gender === 'hombre' || gender === 'man') return 'male';
  return 'nonbinary';
}

function meetsEndingThreshold(state, ending) {
  return (
    (ending.minPrestige == null || state.prestige >= ending.minPrestige) &&
    (ending.maxPrestige == null || state.prestige <= ending.maxPrestige) &&
    (ending.minPapers == null || state.papers >= ending.minPapers) &&
    (ending.minDiscoveries == null || state.discoveries >= ending.minDiscoveries) &&
    (ending.minWellbeing == null || state.wellbeing >= ending.minWellbeing) &&
    (ending.minSavings == null || state.savings >= ending.minSavings)
  );
}

function getEndingTier(state) {
  if (hasMetNobelRequirements(state)) return 'high';
  if (state.prestige >= 40 && state.papers >= 3) return 'medium-high';
  if (state.prestige >= 16 && state.papers >= 1) return 'medium-low';
  return 'low';
}

export function getEnding(state) {
  const playerGender = normalizePlayerGender(state.gender);
  const tier = getEndingTier(state);
  const candidates = ENDINGS.filter((e) => e.tier === tier);

  // Pass 1: gender-specific match or 'any', in array order (hardest first)
  for (const ending of candidates) {
    if (
      meetsEndingThreshold(state, ending) &&
      (ending.gender === playerGender || ending.gender === 'any')
    ) {
      return ending;
    }
  }

  // Pass 2: any eligible ending in this tier (fallback for unmatched genders)
  for (const ending of candidates) {
    if (meetsEndingThreshold(state, ending)) {
      return ending;
    }
  }

  // Ultimate fallback
  return ENDINGS[ENDINGS.length - 1];
}

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
    queue: []
  };
}
