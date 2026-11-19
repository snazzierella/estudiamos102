// -------------------------------------------------------------
// CODEX BILINGUAL DATA & GRAMMAR RULES (Spanish 102)
// English by default with full Spanish toggle support.
// -------------------------------------------------------------

export const CONTRAST_CODEX_TABS = [
  { id: 'por_para', labelEn: '⏳ Por vs Para', labelEs: '⏳ Por vs Para' },
  { id: 'to_become', labelEn: '🔄 To Become', labelEs: '🔄 To Become' },
  { id: 'to_realize', labelEn: '💡 To Realize', labelEs: '💡 To Realize' },
  { id: 'personal_a', labelEn: '👤 Personal "a"', labelEs: '👤 "A" Personal' },
  { id: 'reciprocal_reflexive', labelEn: '🤝 Reciprocal vs Reflexive', labelEs: '🤝 Recíproco vs Reflexivo' },
  { id: 'saber_conocer_ser_estar', labelEn: '🔍 Saber & Ser', labelEs: '🔍 Saber & Ser' },
  { id: 'preterite_families', labelEn: '📦 Preterite Families', labelEs: '📦 Familias Pretérito' },
  { id: 'devolver_volver', labelEn: '🔄 Devolver vs Volver', labelEs: '🔄 Devolver vs Volver' },
  { id: 'preterite_imperfect', labelEn: '⏳ Preterite vs Imperfect', labelEs: '⏳ Pretérito vs Imperfecto' },
  { id: 'indefinite_negative', labelEn: '🚫 Indefinite & Negative Words', labelEs: '🚫 Palabras Indefinidas y Negativas' },
  { id: 'comparatives', labelEn: '⚖️ Comparatives (Tan/Tanto vs Más/Menos)', labelEs: '⚖️ Comparaciones (Tan/Tanto vs Más/Menos)' }
];

export const CONTRAST_TABS_CONTENT = {
  por_para: {
    bannerEn: "POR looks back at the cause, reason, route, duration, or exchange (\"because of / through / for\"). PARA looks forward toward the goal, destination, recipient, deadline, or purpose (\"in order to / for the benefit of\").",
    bannerEs: "POR mira hacia la causa o el trayecto (motivo, duración, medio, intercambio). PARA mira hacia la meta o el futuro (destino, destinatario, fecha límite, propósito + infinitivo).",
    headersEn: ["Usage / Rule", "Preposition", "Key Example"],
    headersEs: ["Uso / Regla", "Preposición", "Ejemplo Clave"],
    rows: [
      { ruleEn: "Cause or motive ('because of')", ruleEs: "Causa o motivo ('because of')", prep: "por", ex: "No fuimos por la lluvia." },
      { ruleEn: "Duration of time ('for 2 hours')", ruleEs: "Duración de tiempo", prep: "por", ex: "Estudié por dos horas." },
      { ruleEn: "Means of transport or communication", ruleEs: "Medio de transporte o comunicación", prep: "por", ex: "Mando la carta por correo / por tren." },
      { ruleEn: "Exchange, trade, or price ('in exchange for')", ruleEs: "Intercambio o precio", prep: "por", ex: "Pagué 20 dólares por el libro." },
      { ruleEn: "Movement through, along, or by ('through the park')", ruleEs: "Movimiento por / a través de ('through')", prep: "por", ex: "Paseamos por el parque." },
      { ruleEn: "Common fixed idiomatic expressions", ruleEs: "Expresiones fijas comunes", prep: "por", ex: "Por favor, por fin, por ejemplo, por si acaso." },
      { ruleEn: "Physical destination or heading toward", ruleEs: "Destino o dirección física", prep: "para", ex: "Salimos para Madrid mañana." },
      { ruleEn: "Recipient / Beneficiary ('for whom')", ruleEs: "Destinatario ('for whom')", prep: "para", ex: "Este regalo es para ti." },
      { ruleEn: "Purpose or goal (+ infinitive: 'in order to')", ruleEs: "Propósito u objetivo (+ infinitivo)", prep: "para", ex: "Estudio para aprender español." },
      { ruleEn: "Deadline or due date ('by Friday')", ruleEs: "Fecha límite ('deadline')", prep: "para", ex: "La tarea es para el viernes." },
      { ruleEn: "Personal opinion / Comparison standard", ruleEs: "Opinión personal / Estándar", prep: "para", ex: "Para mí, es muy importante." }
    ],
    tipEn: "💡 Mnemonic: POR = Cause / Route / Exchange. PARA = Destination / Deadline / Purpose.",
    tipEs: "💡 Regla Mnemotécnica: POR = Motivo / Trayecto / Intercambio. PARA = Destino / Plazo / Propósito."
  },

  to_become: {
    bannerEn: "In English, \"to become\" covers many scenarios, but Spanish requires choosing based on speed, effort, and permanence.",
    bannerEs: "En inglés solo se usa \"to become\", pero en español se elige según la velocidad, el esfuerzo y la permanencia.",
    headersEn: ["Verb", "Type of Change", "Effort / Nature", "Key Example"],
    headersEs: ["Verbo", "Tipo de Cambio", "Esfuerzo", "Ejemplo Clave"],
    rows: [
      { verb: "Ponerse + adj.", typeEn: "Sudden emotion or temporary physical appearance", typeEs: "Emoción / estado físico o ánimo pasajero", effortEn: "Involuntary, rapid, temporary", effortEs: "Involuntario, rápido", ex: "Se puso furioso / rojo / triste." },
      { verb: "Volverse + adj.", typeEn: "Radical transformation of personality or mental disposition", typeEs: "Transformación radical de personalidad", effortEn: "Deep, drastic, lasting shift", effortEs: "Profundo, drástico", ex: "Se volvió loco / rebelde / muy desconfiado." },
      { verb: "Hacerse + noun/adj.", typeEn: "Profession, status, political ideology, or religion", typeEs: "Profesión, estatus, ideología, religión", effortEn: "Conscious, with personal effort/time", effortEs: "Consciente, con tiempo y estudio", ex: "Se hizo médica / abogado / vegetariano." },
      { verb: "Llegar a ser + noun", typeEn: "Culmination of a long journey, career, or ambition", typeEs: "Culminación de una carrera exitosa", effortEn: "Long-term triumph through dedication", effortEs: "Meta final tras largo esfuerzo", ex: "Llegó a ser presidente de la empresa." }
    ],
    tipEn: "💡 Golden Rule: Rapid emotion = Ponerse. Drastic character shift = Volverse. College degree or profession = Hacerse.",
    tipEs: "💡 Regla de Oro: Emoción rápida = Ponerse. Cambio radical de conducta = Volverse. Título o carrera universitaria = Hacerse."
  },

  to_realize: {
    bannerEn: "⚠️ False Cognate Warning! In Spanish, 'realizar' NEVER means to mentally realize or become aware.",
    bannerEs: "⚠️ ¡Peligro de cognado falso! En español, realizar NUNCA significa percatarse mentalmente.",
    headersEn: ["Expression", "Real Meaning", "Correct Example"],
    headersEs: ["Expresión", "Significado Real", "Ejemplo Correcto"],
    rows: [
      { expr: "Darse cuenta de (que...)", isGood: true, meaningEn: "To become aware / realize mentally", meaningEs: "To become aware / realize mentally", ex: "\"Me di cuenta de que no tenía mi pasaporte.\"" },
      { expr: "Realizar (False Cognate!)", isGood: false, meaningEn: "To achieve, carry out, or fulfill a dream/project", meaningEs: "To achieve, carry out, fulfill a project or dream", ex: "\"El arquitecto realizó su gran proyecto.\"" }
    ],
    warningEn: "❌ Never say: \"Yo realicé que tenía tarea.\"\n✅ Always say: \"Me di cuenta de que tenía tarea.\"",
    warningEs: "❌ Nunca digas: \"Yo realicé que tenía tarea.\"\n✅ Siempre di: \"Me di cuenta de que tenía tarea.\""
  },

  personal_a: {
    bannerEn: "Mandatory whenever the direct object of the verb is a specific person or a beloved pet.",
    bannerEs: "Se usa obligatoriamente cuando el objeto directo del verbo es una persona específica o una mascota querida.",
    headersEn: ["Situation", "Takes \"a\"?", "Key Example"],
    headersEs: ["Situación", "¿Lleva \"a\"?", "Ejemplo Clave"],
    rows: [
      { sitEn: "Specific and known person", sitEs: "Persona humana específica y conocida", takes: "YES / SÍ", isYes: true, ex: "Visito a mi abuela en el hospital." },
      { sitEn: "Beloved pet or domestic animal", sitEs: "Mascota o animal doméstico querido", takes: "YES / SÍ", isYes: true, ex: "Paseo a mi perro por el parque." },
      { sitEn: "Inanimate object or thing", sitEs: "Cosa u objeto inanimado", takes: "NO", isYes: false, ex: "Compré el boleto de avión." },
      { sitEn: "Non-specific or indefinite person", sitEs: "Persona no específica / desconocida", takes: "NO", isYes: false, ex: "Busco un recepcionista bilingüe." },
      { sitEn: "With the verb tener (ordinary possession)", sitEs: "Con el verbo tener (posesión ordinaria)", takes: "NO", isYes: false, ex: "Tengo dos hermanos y un gato." }
    ],
    tipEn: "💡 Remember: a + el = al (Llamo al doctor).",
    tipEs: "💡 Recuerda: a + el = al (Llamo al doctor)."
  },

  reciprocal_reflexive: {
    bannerEn: "Reciprocal actions occur mutually between two or more people (\"each other\"), while reflexive actions affect the subject themselves.",
    bannerEs: "Las acciones recíprocas ocurren mutuamente entre dos o más personas (\"el uno al otro\"), mientras que las reflexivas recaen sobre el propio sujeto.",
    headersEn: ["Type", "Who receives action?", "Pronouns", "Example"],
    headersEs: ["Tipo", "¿Quién recibe la acción?", "Pronombres", "Ejemplo"],
    rows: [
      { type: "Reflexive / Reflexivo", targetEn: "The subject acts upon themselves", targetEs: "El propio sujeto (a sí mismo)", pron: "me, te, se, nos, os, se", ex: "\"Juan se mira en el espejo.\"" },
      { type: "Reciprocal / Recíproco", targetEn: "Mutually on each other (\"each other\")", targetEs: "Mutuamente el uno al otro (\"each other\")", pron: "ONLY plural! nos, os, se", ex: "\"Juan y Elena se miran el uno al otro.\"" }
    ],
    tipEn: "💡 Key clue: Reciprocal verbs ALWAYS require plural subjects (nosotros, vosotros, ellos/ellas/ustedes).",
    tipEs: "💡 Pista Clave: Los verbos recíprocos SIEMPRE requieren sujetos plurales (nosotros, vosotros, ellos/ellas/ustedes)."
  },

  saber_conocer_ser_estar: {
    bannerEn: "Contrasting foundational verb pairs (Saber & Conocer = \"to know\", Ser & Estar = \"to be\") and their special meanings in the preterite tense.",
    bannerEs: "Pares fundamentales de verbos (Saber y Conocer = \"to know\", Ser y Estar = \"to be\") y sus significados especiales en el tiempo pretérito.",
    headersEn: ["Pair & Meaning", "Fundamental Usage", "In Preterite (Special Meaning)"],
    headersEs: ["Par y Significado", "Uso Fundamental", "En Pretérito (Significado Especial)"],
    rows: [
      { 
        pair: "Saber", 
        meaningEn: "to know", 
        meaningEs: "to know", 
        useEn: "Facts, data, information, how-to (+ inf.)", 
        useEs: "Datos, hechos, información, cómo hacer algo (+ inf.)", 
        pret: "\"Supe la noticia ayer\" (I found out / learned)" 
      },
      { 
        pair: "Conocer", 
        meaningEn: "to know / be familiar with", 
        meaningEs: "to know / be familiar with", 
        useEn: "People (with 'a'), places, familiarity", 
        useEs: "Personas (con 'a'), lugares, familiaridad", 
        pret: "\"Conocí a María anoche\" (I met for the first time)" 
      },
      { 
        pair: "Ser (DOCTOR)", 
        meaningEn: "to be", 
        meaningEs: "to be", 
        useEn: "Description, Occupation, Characteristic, Time/Date, Origin, Material", 
        useEs: "Descripción, Ocupación, Característica, Hora, Origen, Material", 
        pret: "\"Fue una fiesta divertida\"" 
      },
      { 
        pair: "Estar (PLACE)", 
        meaningEn: "to be", 
        meaningEs: "to be", 
        useEn: "Position, Location, Action (-ndo), Condition, Emotion", 
        useEs: "Posición, Ubicación, Acción (-ndo), Condición, Emoción", 
        pret: "\"Estuve en el hotel tres días\"" 
      }
    ],
    noteEn: "📌 English Meanings Note:\n• Saber & Conocer both mean \"to know\" in English: Saber is for facts, data, and skills (how-to); Conocer is for people (with personal 'a') and places (familiarity).\n• Ser & Estar both mean \"to be\" in English: Ser is for inherent identity, occupation, traits, origin, and time (DOCTOR); Estar is for position, location, action (-ndo), condition, and emotions (PLACE).",
    noteEs: "📌 Nota sobre significados en inglés:\n• Saber y Conocer significan ambos \"to know\" en inglés: Saber se usa para hechos, datos y habilidades; Conocer se usa para personas (con 'a' personal) y lugares (familiaridad).\n• Ser y Estar significan ambos \"to be\" en inglés: Ser se usa para identidad inherente, ocupación, origen y hora (DOCTOR); Estar se usa para posición, ubicación, estados y emociones (PLACE).",
    tipEn: "💡 In the preterite: Saber = found out / learned news; Conocer = met someone for the first time.",
    tipEs: "💡 En pretérito: Saber = enterarse de algo; Conocer = conocer a alguien por primera vez."
  },

  preterite_families: {
    bannerEn: "The 7 verb families of the preterite tense and their irregular stem rules.",
    bannerEs: "Familias de verbos en el pretérito y sus reglas de raíz irregular.",
    headersEn: ["Family", "Specific Rule", "Examples"],
    headersEs: ["Familia", "Regla Específica", "Ejemplos"],
    rows: [
      { fam: "Regulars / Regulares", ruleEn: "-ar (-é, -aste, -ó, -amos, -aron) vs -er/-ir (-í, -iste, -ió, -imos, -ieron)", ruleEs: "-ar (-é, -aste, -ó, -amos, -aron) vs -er/-ir (-í, -iste, -ió, -imos, -ieron)", ex: "habló, comió, vivió" },
      { fam: "Stem-Changers (Sandal)", ruleEn: "ONLY -ir verbs! ONLY in 3rd person (él/ellos)! (e->i, o->u)", ruleEs: "¡SOLO verbos -ir! ¡SOLO en 3ª persona (él/ellos)! (e->i, o->u)", ex: "pidió/pidieron, durmió/durmieron, sirvió" },
      { fam: "Spelling (yo)", ruleEn: "-car -> qué, -gar -> gué, -zar -> cé", ruleEs: "-car -> qué, -gar -> gué, -zar -> cé", ex: "busqué, pagué, crucé, regué" },
      { fam: "Double Vowel (i->y)", ruleEn: "Double vowel in 3rd person (él/ellos)", ruleEs: "Doble vocal en 3ª persona", ex: "leyó/leyeron, creyó, oyó, destruyó" },
      { fam: "Radical U-stem", ruleEn: "Irregular stem WITHOUT accents (-e, -iste, -o, -imos, -ieron)", ruleEs: "Raíz irregular SIN acentos (-e, -iste, -o, -imos, -ieron)", ex: "estuve, tuve, anduve, puse, pude, supe" },
      { fam: "Radical I-stem", ruleEn: "hacer (hice/hizo), querer (quise), venir (vine)", ruleEs: "hacer (hice/hizo), querer (quise), venir (vine)", ex: "hice, hizo, quiso, vino" },
      { fam: "Radical J-stem", ruleEn: "Drop the 'i' in ellos (-eron)", ruleEs: "Terminan en -eron en ellos (sin 'i')", ex: "dije/dijeron, traje/trajeron, conduje/condujeron" }
    ],
    warningEn: "⚠️ Critical Rule: Verbs in -ar and -er (like volver, devolver, entender) NEVER stem-change in the preterite (*ellos devolvieron*, *él entendió*).",
    warningEs: "⚠️ Regla Crítica: Los verbos -ar y -er (como volver, devolver, entender) NUNCA tienen cambio de raíz en pretérito (*ellos devolvieron*, *él entendió*)."
  },

  devolver_volver: {
    bannerEn: "Returning an object or money vs returning physically as a person.",
    bannerEs: "Devolver un objeto o dinero vs regresar físicamente como persona.",
    headersEn: ["Verb", "Meaning", "Key Example"],
    headersEs: ["Verbo", "Significado", "Ejemplo Clave"],
    rows: [
      { verb: "Devolver", meanEn: "To return an item, object, or money to a person or store", meanEs: "Regresar un objeto o dinero a su tienda o lugar", ex: "\"Tengo que devolver estos pantalones a la tienda.\"" },
      { verb: "Volver", meanEn: "To return or come back physically as a person", meanEs: "Regresar una persona físicamente", ex: "\"Nosotros volvimos de las vacaciones ayer.\"" }
    ],
    tipEn: "💡 Quick test: If you are returning an object, use DEVOLVER. If a human is returning, use VOLVER.",
    tipEs: "💡 Prueba rápida: Si devuelves una cosa, usa DEVOLVER. Si una persona regresa, usa VOLVER."
  },

  preterite_imperfect: {
    bannerEn: "PRETERITE narrates completed past actions, specific events, or interruptions. IMPERFECT describes ongoing background actions, habitual routines ('used to / was -ing'), weather, age, time, and emotional states.",
    bannerEs: "El PRETÉRITO narra acciones completadas en un momento puntual. El IMPERFECTO describe acciones habituales ('used to do'), procesos en curso en el pasado ('was doing'), descripciones, hora, edad y estados emocionales.",
    headersEn: ["Tense / Aspect", "Usage / Trigger Phrases", "Key Example"],
    headersEs: ["Tiempo / Aspecto", "Uso / Frases Clave", "Ejemplo Clave"],
    rows: [
      { ruleEn: "Preterite: Completed action at specific past time", ruleEs: "Pretérito: Acción completada en tiempo específico", prep: "ayer, anoche, una vez", ex: "Ayer vi una película de horror en el cine." },
      { ruleEn: "Imperfect: Habitual, repeated or usual actions in past", ruleEs: "Imperfecto: Acciones habituales o repetidas", prep: "siempre, todos los días", ex: "Cuando era niña, siempre veía dibujos animados." },
      { ruleEn: "Imperfect: Ongoing action in progress ('while / was -ing')", ruleEs: "Imperfecto: Acción en proceso ('mientras')", prep: "mientras", ex: "Yo chateaba por internet mientras mi hermano montaba en bicicleta." },
      { ruleEn: "Imperfect: The 3 Irregulars (ser, ir, ver)", ruleEs: "Imperfecto: Los 3 Irregulares (ser, ir, ver)", prep: "era, iba, veía", ex: "Mi abuela era muy sabia y siempre iba a la biblioteca." },
      { ruleEn: "Imperfect: Haber (ongoing existence in past)", ruleEs: "Imperfecto: Haber (existencia continua en pasado)", prep: "había (singular only)", ex: "En aquellos tiempos no había teléfonos inteligentes." }
    ],
    tipEn: "💡 Golden Rule: If it's a specific completed event with a clear beginning and end, use PRETERITE. If it's a routine, description, or ongoing background, use IMPERFECT.",
    tipEs: "💡 Regla de Oro: Evento puntual completado = PRETÉRITO. Rutina, hábito o descripción de fondo = IMPERFECTO."
  },

  indefinite_negative: {
    bannerEn: "In Spanish, negative words require double negatives when placed after the verb ('No' + verb + negative). Words placed before the verb act as subjects and do not take 'no'.",
    bannerEs: "En español se usa la doble negación cuando la palabra negativa va después del verbo ('No' + verbo + negativa). Si va antes del verbo como sujeto, no se usa 'no'.",
    headersEn: ["Affirmative (Indefinite)", "Negative Equivalent", "Key Example"],
    headersEs: ["Afirmativa (Indefinida)", "Equivalente Negativa", "Ejemplo Clave"],
    rows: [
      { ruleEn: "Alguien (Someone / Anyone)", ruleEs: "Alguien (Alguien)", prep: "Nadie (No one / Nobody)", ex: "\"Nadie compra periódicos hoy en día.\" / \"No vi a nadie.\"" },
      { ruleEn: "Algo (Something / Anything)", ruleEs: "Algo (Algo)", prep: "Nada (Nothing / Not anything)", ex: "\"Nada es fácil.\" / \"No tengo nada en los bolsillos.\"" },
      { ruleEn: "Siempre (Always)", ruleEs: "Siempre (Siempre)", prep: "Nunca / Jamás (Never)", ex: "\"Nunca compro ropa en la tienda.\" / \"No voy nunca.\"" },
      { ruleEn: "También (Also / Too)", ruleEs: "También (También)", prep: "Tampoco (Neither / Not either)", ex: "\"No uso esa aplicación tampoco.\"" },
      { ruleEn: "Algún / alguno/a/os/as (Some / Any)", ruleEs: "Algún / alguno/a/os/as", prep: "Ningún / ninguno/a (None / Not any)", ex: "\"No tengo ningún libro en mi tableta.\"" },
      { ruleEn: "O... o (Either... or)", ruleEs: "O... o", prep: "Ni... ni (Neither... nor)", ex: "\"No tenemos ni computadora ni tableta.\"" }
    ],
    warningEn: "⚠️ Double Negative Rule: When a negative word follows the verb, you MUST place 'no' before the verb (e.g., \"No vi a nadie\", NEVER *\"Vi a nadie\"*). When the negative word is before the verb, do NOT use 'no' (\"Nadie vino\").",
    warningEs: "⚠️ Regla de Doble Negación: Si la palabra negativa va después del verbo, es OBLIGATORIO poner 'no' antes del verbo (\"No vi a nadie\"). Si va antes del verbo, NO uses 'no' (\"Nadie vino\")."
  },

  comparatives: {
    bannerEn: "Comparisons of equality use TAN (with adjectives/adverbs) or TANTO/A/OS/AS (matching nouns) + COMO. Comparisons of inequality use MÁS / MENOS + QUE (or DE before numbers).",
    bannerEs: "Las comparaciones de igualdad usan TAN (adjetivos/adverbios) o TANTO/A/OS/AS (sustantivos) + COMO. Las de desigualdad usan MÁS / MENOS + QUE (o DE con números).",
    headersEn: ["Type of Comparison", "Grammar Structure", "Key Example"],
    headersEs: ["Tipo de Comparación", "Estructura Gramatical", "Ejemplo Clave"],
    rows: [
      { ruleEn: "Equality: Adjectives / Adverbs", ruleEs: "Igualdad: Adjetivos / Adverbios", prep: "tan + adj/adv + como", ex: "\"Un enfermero es tan importante como un médico.\"" },
      { ruleEn: "Equality: Nouns (Gender/Number Agreement)", ruleEs: "Igualdad: Sustantivos (Concordancia)", prep: "tanto/a/os/as + sust. + como", ex: "\"El músico tiene tantos instrumentos como el cantante.\"" },
      { ruleEn: "Equality: Verbs", ruleEs: "Igualdad: Verbos", prep: "verbo + tanto como", ex: "\"Yo corro tanto como un futbolista.\"" },
      { ruleEn: "Inequality: Adjectives / Adverbs / Nouns", ruleEs: "Desigualdad: Adjetivos / Sustantivos", prep: "más / menos + palabra + que", ex: "\"Ella camina más que yo.\" / \"Estudia menos horas que tú.\"" },
      { ruleEn: "Inequality: Numbers (Quantity)", ruleEs: "Desigualdad: Cifras Numéricas", prep: "más de / menos de + número", ex: "\"El portátil cuesta más de quinientos dólares.\"" },
      { ruleEn: "Irregular Comparatives", ruleEs: "Comparativos Irregulares", prep: "mejor, peor, mayor, menor", ex: "\"Esta serie es mejor que la otra.\" / \"Mi hermano es menor que yo.\"" }
    ],
    tipEn: "💡 Number Alert: Always use 'más de' or 'menos de' when comparing numerical quantities (e.g., 'más de 10 dólares', never *'más que 10 dólares'*).",
    tipEs: "💡 Alerta de Números: Usa 'más de' o 'menos de' con cantidades numéricas ('más de 10 dólares', nunca *'más que 10 dólares'*)."
  }
};
