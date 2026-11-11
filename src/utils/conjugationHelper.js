// Spanish 101 & 102 Conjugation & Grammar Helper
// Supports Present and Preterite (Past Tense) indicative and Reflexive Verbs

export const PRONOUNS = [
  { label: "yo (I)", idx: 0 },
  { label: "tú (you, informal)", idx: 1 },
  { label: "él / ella / usted (he/she/you, formal)", idx: 2 },
  { label: "nosotros / nosotras (we)", idx: 3 },
  { label: "vosotros / vosotras (you all, Spain)", idx: 4 },
  { label: "ellos / ellas / ustedes (they/you all)", idx: 5 }
];

export const REFLEXIVE_PRONOUNS = ["me", "te", "se", "nos", "os", "se"];

// -------------------------------------------------------------
// PRESENT TENSE IRREGULARS & STEM CHANGERS
// -------------------------------------------------------------
export const PRESENT_IRREGULARS = {
  // Core irregulars
  "ser": ["soy", "eres", "es", "somos", "sois", "son"],
  "estar": ["estoy", "estás", "está", "estamos", "estáis", "están"],
  "ir": ["voy", "vas", "va", "vamos", "vais", "van"],
  "haber": ["he", "has", "ha", "hemos", "habéis", "han"],
  "tener": ["tengo", "tienes", "tiene", "tenemos", "tenéis", "tienen"],
  "venir": ["vengo", "vienes", "viene", "venimos", "venís", "vienen"],
  "decir": ["digo", "dices", "dice", "decimos", "decís", "dicen"],
  "seguir": ["sigo", "sigues", "sigue", "seguimos", "seguís", "siguen"],
  "dar": ["doy", "das", "da", "damos", "dais", "dan"],
  "hacer": ["hago", "haces", "hace", "hacemos", "hacéis", "hacen"],
  "oír": ["oigo", "oyes", "oye", "oímos", "oís", "oyen"],
  "poner": ["pongo", "pones", "pone", "ponemos", "ponéis", "ponen"],
  "salir": ["salgo", "sales", "sale", "salimos", "salís", "salen"],
  "traer": ["traigo", "traes", "trae", "traemos", "traéis", "traen"],
  "valer": ["valgo", "vales", "vale", "valemos", "valéis", "valen"],
  "ver": ["veo", "ves", "ve", "vemos", "veis", "ven"],
  "saber": ["sé", "sabes", "sabe", "sabemos", "sabéis", "saben"],
  "conocer": ["conozco", "conoces", "conoce", "conocemos", "conocéis", "conocen"],
  
  // Stem changers (o -> ue)
  "almorzar": ["almuerzo", "almuerzas", "almuerza", "almorzamos", "almorzáis", "almuerzan"],
  "jugar": ["juego", "juegas", "juega", "jugamos", "jugáis", "juegan"],
  "costar": ["cuesto", "cuestas", "cuesta", "costamos", "costáis", "cuestan"],
  "poder": ["puedo", "puedes", "puede", "podemos", "podéis", "pueden"],
  "devolver": ["devuelvo", "devuelves", "devuelve", "devolvemos", "devolvéis", "devuelven"],
  "recordar": ["recuerdo", "recuerdas", "recuerda", "recordamos", "recordáis", "recuerdan"],
  "dormir": ["duermo", "duermes", "duerme", "dormimos", "dormís", "duermen"],
  "volver": ["vuelvo", "vuelves", "vuelve", "volvemos", "volvéis", "vuelven"],
  "encontrar": ["encuentro", "encuentras", "encuentra", "encontramos", "encontráis", "encuentran"],
  "acostar": ["acuesto", "acuestas", "acuesta", "acostamos", "acostáis", "acuestan"],

  // Stem changers (e -> ie)
  "cerrar": ["cierro", "cierras", "cierra", "cerramos", "cerráis", "cierran"],
  "preferir": ["prefiero", "prefieres", "prefiere", "preferimos", "preferís", "prefieren"],
  "comenzar": ["comienzo", "comienzas", "comienza", "comenzamos", "comenzáis", "comienzan"],
  "querer": ["quiero", "quieres", "quiere", "queremos", "queréis", "quieren"],
  "empezar": ["empiezo", "empiezas", "empieza", "empezamos", "empezáis", "empiezan"],
  "sentir": ["siento", "sientes", "siente", "sentimos", "sentís", "sienten"],
  "sentar": ["siento", "sientas", "sienta", "sentamos", "sentáis", "sientan"],
  "despertar": ["despierto", "despiertas", "despierta", "despertamos", "despertáis", "despiertan"],
  "entender": ["entiendo", "entiendes", "entiende", "entendemos", "entendéis", "entienden"],
  "pensar": ["pienso", "piensas", "piensa", "pensamos", "pensáis", "piensan"],
  "perder": ["pierdo", "pierdes", "pierde", "perdemos", "perdéis", "pierden"],

  // Stem changers (e -> i)
  "pedir": ["pido", "pides", "pide", "pedimos", "pedís", "piden"],
  "servir": ["sirvo", "sirves", "sirve", "servimos", "servís", "sirven"],
  "reír": ["río", "ríes", "ríe", "reímos", "reís", "ríen"],
  "sonreír": ["sonrío", "sonríes", "sonríe", "sonreímos", "sonreís", "sonríen"],
  "repetir": ["repito", "repites", "repite", "repetimos", "repetís", "repiten"],
  "vestir": ["visto", "vistes", "viste", "vestimos", "vestís", "visten"],
  "desvestir": ["desvisto", "desvistes", "desviste", "desvestimos", "desvestís", "desvisten"],
  "medir": ["mido", "mides", "mide", "medimos", "medís", "miden"]
};

// -------------------------------------------------------------
// PRETERITE (PAST TENSE) IRREGULARS & STEM CHANGERS
// -------------------------------------------------------------
export const PRETERITE_IRREGULARS = {
  // Core irregular stems (Unit 4)
  "ser": ["fui", "fuiste", "fue", "fuimos", "fuisteis", "fueron"],
  "ir": ["fui", "fuiste", "fue", "fuimos", "fuisteis", "fueron"],
  "hacer": ["hice", "hiciste", "hizo", "hicimos", "hicisteis", "hicieron"],
  "tener": ["tuve", "tuviste", "tuvo", "tuvimos", "tuvisteis", "tuvieron"],
  "estar": ["estuve", "estuviste", "estuvo", "estuvimos", "estuvisteis", "estuvieron"],
  "poder": ["pude", "pudiste", "pudo", "pudimos", "pudisteis", "pudieron"],
  "poner": ["puse", "pusiste", "puso", "pusimos", "pusisteis", "pusieron"],
  "saber": ["supe", "supiste", "supo", "supimos", "supisteis", "supieron"],
  "venir": ["vine", "viniste", "vino", "vinimos", "vinisteis", "vinieron"],
  "decir": ["dije", "dijiste", "dijo", "dijimos", "dijisteis", "dijeron"],
  "traer": ["traje", "trajiste", "trajo", "trajimos", "trajisteis", "trajeron"],
  "dar": ["di", "diste", "dio", "dimos", "disteis", "dieron"],
  "ver": ["vi", "viste", "vio", "vimos", "visteis", "vieron"],
  "querer": ["quise", "quisiste", "quiso", "quisimos", "quisisteis", "quisieron"],
  "haber": ["hube", "hubiste", "hubo", "hubimos", "hubisteis", "hubieron"],

  // Preterite 3rd-person stem changers (e->i, o->u in Unit 3/4)
  "pedir": ["pedí", "pediste", "pidió", "pedimos", "pedisteis", "pidieron"],
  "servir": ["serví", "serviste", "sirvió", "servimos", "servisteis", "sirvieron"],
  "dormir": ["dormí", "dormiste", "durmió", "dormimos", "dormisteis", "durmieron"],
  "preferir": ["preferí", "preferiste", "prefirió", "preferimos", "preferisteis", "prefirieron"],
  "repetir": ["repetí", "repetiste", "repitió", "repetimos", "repetisteis", "repitieron"],
  "seguir": ["seguí", "seguiste", "siguió", "seguimos", "seguisteis", "siguieron"],
  "sentir": ["sentí", "sentiste", "sintió", "sentimos", "sentisteis", "sintieron"],
  "vestir": ["vestí", "vestiste", "vistió", "vestimos", "vestisteis", "vistieron"],
  "desvestir": ["desvestí", "desvestiste", "desvistió", "desvestimos", "desvestisteis", "desvistieron"],
  "medir": ["medí", "mediste", "midió", "medimos", "medisteis", "midieron"],
  "morir": ["morí", "moriste", "murió", "morimos", "moristeis", "murieron"],

  // Orthographic spelling changers in yo form (-car, -gar, -zar in Unit 3)
  "buscar": ["busqué", "buscaste", "buscó", "buscamos", "buscasteis", "buscaron"],
  "tocar": ["toqué", "tocaste", "tocó", "tocamos", "tocasteis", "tocaron"],
  "practicar": ["practiqué", "practicaste", "practicó", "practicamos", "practicasteis", "practicaron"],
  "sacar": ["saqué", "sacaste", "sacó", "sacamos", "sacasteis", "sacaron"],
  "pagar": ["pagué", "pagaste", "pagó", "pagamos", "pagasteis", "pagaron"],
  "llegar": ["llegué", "llegaste", "llegó", "llegamos", "llegasteis", "llegaron"],
  "jugar": ["jugué", "jugaste", "jugó", "jugamos", "jugasteis", "jugaron"],
  "almorzar": ["almorcé", "almorzaste", "almorzó", "almorzamos", "almorzasteis", "almorzaron"],
  "empezar": ["empecé", "empezaste", "empezó", "empezamos", "empezasteis", "empezaron"],
  "comenzar": ["comencé", "comenzaste", "comenzó", "comenzamos", "comenzasteis", "comenzaron"]
};

// Endings arrays for regular verbs
const PRES_AR_ENDINGS = ["o", "as", "a", "amos", "áis", "an"];
const PRES_ER_ENDINGS = ["o", "es", "e", "emos", "éis", "en"];
const PRES_IR_ENDINGS = ["o", "es", "e", "imos", "ís", "en"];

const PRET_AR_ENDINGS = ["é", "aste", "ó", "amos", "asteis", "aron"];
const PRET_ER_IR_ENDINGS = ["í", "iste", "ió", "imos", "isteis", "ieron"];

/**
 * Parses raw verb inputs (including reflexives, slash variants, and multi-word phrases)
 */
export function parseVerb(rawVerb) {
  let cleaned = (rawVerb || "").trim().toLowerCase();
  
  // Handle slash formats like "lavé / lavaste / lavó"
  if (cleaned.includes("/")) {
    const parts = cleaned.split("/").map(p => p.trim());
    // Guess base infinitive based on the first form
    const first = parts[0];
    if (first === "fui") return { base: "ir", isReflexive: false, suffix: "" };
    if (first === "hice") return { base: "hacer", isReflexive: false, suffix: "" };
    if (first === "tuve") return { base: "tener", isReflexive: false, suffix: "" };
    if (first === "estuve") return { base: "estar", isReflexive: false, suffix: "" };
    if (first === "pude") return { base: "poder", isReflexive: false, suffix: "" };
    if (first === "puse") return { base: "poner", isReflexive: false, suffix: "" };
    if (first === "supe") return { base: "saber", isReflexive: false, suffix: "" };
    if (first === "vine") return { base: "venir", isReflexive: false, suffix: "" };
    if (first === "dije") return { base: "decir", isReflexive: false, suffix: "" };
    if (first === "traje") return { base: "traer", isReflexive: false, suffix: "" };
    if (first === "di") return { base: "dar", isReflexive: false, suffix: "" };
    if (first === "vi") return { base: "ver", isReflexive: false, suffix: "" };
    if (first === "lavé") return { base: "lavar", isReflexive: false, suffix: "" };
    if (first === "barrí") return { base: "barrer", isReflexive: false, suffix: "" };
    if (first === "sacudí") return { base: "sacudir", isReflexive: false, suffix: "" };
    if (first === "compré") return { base: "comprar", isReflexive: false, suffix: "" };
    if (first === "pagué") return { base: "pagar", isReflexive: false, suffix: "" };
    if (first === "busqué") return { base: "buscar", isReflexive: false, suffix: "" };
    if (first === "pidió") return { base: "pedir", isReflexive: false, suffix: "" };
    if (first === "sirvió") return { base: "servir", isReflexive: false, suffix: "" };
    if (first === "durmió") return { base: "dormir", isReflexive: false, suffix: "" };
    if (first === "prefirió") return { base: "preferir", isReflexive: false, suffix: "" };
    if (first === "midió") return { base: "medir", isReflexive: false, suffix: "" };
    if (first === "repitió") return { base: "repetir", isReflexive: false, suffix: "" };
    if (first === "siguió") return { base: "seguir", isReflexive: false, suffix: "" };
    return { base: first, isReflexive: false, suffix: "" };
  }

  const tokens = cleaned.split(/\s+/);
  let mainWord = tokens[0];
  const suffix = tokens.length > 1 ? " " + tokens.slice(1).join(" ") : "";
  let isReflexive = false;

  if (mainWord.endsWith("se")) {
    isReflexive = true;
    mainWord = mainWord.slice(0, -2);
  }

  return { base: mainWord, isReflexive, suffix };
}

/**
 * Checks if a vocabulary item represents a verb (101 verbs, reflexives, preterites)
 */
export function isVerbItem(item) {
  if (!item || !item.spanish) return false;
  if (item.category === "Verbs" && item.subcategory !== "Verbs Structured Like Gustar") return true;
  if (item.subcategory?.includes("Verbos Reflexivos") || item.subcategory?.includes("Pretérito")) return true;
  
  const parsed = parseVerb(item.spanish);
  if (parsed.isReflexive) return true;
  if (parsed.base.endsWith("ar") || parsed.base.endsWith("er") || parsed.base.endsWith("ir")) {
    return !item.spanish.toLowerCase().startsWith("el ") && !item.spanish.toLowerCase().startsWith("la ");
  }
  return false;
}

/**
 * Conjugates any Spanish 101 or 102 verb in Present or Preterite (Past Tense),
 * automatically prepending reflexive pronouns (me, te, se, nos, os, se) for reflexive verbs.
 */
export function conjugate(rawVerb, pronounIdx, tense = "present") {
  const { base, isReflexive, suffix } = parseVerb(rawVerb);
  let conjugatedBase = "";

  if (tense === "preterite" || tense === "past") {
    if (PRETERITE_IRREGULARS[base]) {
      conjugatedBase = PRETERITE_IRREGULARS[base][pronounIdx];
    } else {
      const stem = base.slice(0, -2);
      const ending = base.slice(-2);
      if (ending === "ar") {
        conjugatedBase = stem + PRET_AR_ENDINGS[pronounIdx];
      } else if (ending === "er" || ending === "ir") {
        conjugatedBase = stem + PRET_ER_IR_ENDINGS[pronounIdx];
      } else {
        conjugatedBase = base;
      }
    }
  } else {
    // Present tense
    if (PRESENT_IRREGULARS[base]) {
      conjugatedBase = PRESENT_IRREGULARS[base][pronounIdx];
    } else {
      const stem = base.slice(0, -2);
      const ending = base.slice(-2);
      if (ending === "ar") {
        conjugatedBase = stem + PRES_AR_ENDINGS[pronounIdx];
      } else if (ending === "er") {
        conjugatedBase = stem + PRES_ER_ENDINGS[pronounIdx];
      } else if (ending === "ir") {
        conjugatedBase = stem + PRES_IR_ENDINGS[pronounIdx];
      } else {
        conjugatedBase = base;
      }
    }
  }

  if (isReflexive) {
    const refPronoun = REFLEXIVE_PRONOUNS[pronounIdx] || "se";
    return `${refPronoun} ${conjugatedBase}${suffix}`;
  }

  return `${conjugatedBase}${suffix}`;
}

/**
 * Generates an interactive conjugation question for a given verb item.
 * Automatically handles reflexive pronouns and preterite past tense.
 */
export function generateConjugationQuestion(verbItem, options = {}) {
  const { base, isReflexive, suffix } = parseVerb(verbItem.spanish);

  // Skip gustar-type verbs since they conjugate indirectly
  if (verbItem.subcategory === "Verbs Structured Like Gustar") {
    return null;
  }

  // Determine target tense: check options first, then infer from subcategory
  let targetTense = options.tense || "present";
  if (!options.tense) {
    if (verbItem.subcategory?.includes("Pretérito") || verbItem.english?.toLowerCase().includes("preterite") || verbItem.english?.toLowerCase().includes("(past)")) {
      targetTense = "preterite";
    }
  }

  const tenseLabel = targetTense === "preterite" ? "Pretérito (Past Tense)" : "Presente";

  // Filter pronouns based on vosotros preference
  const allowedPronouns = options.excludeVosotros 
    ? PRONOUNS.filter(p => p.idx !== 4) 
    : PRONOUNS;

  const randPronoun = allowedPronouns[Math.floor(Math.random() * allowedPronouns.length)];
  const correctForm = conjugate(verbItem.spanish, randPronoun.idx, targetTense);

  // Generate 3 plausible distractors
  const distractors = new Set();
  
  // Distractor source 1: Other pronoun forms of the same verb and tense
  for (let i = 0; i < 6; i++) {
    if (i !== randPronoun.idx && !(options.excludeVosotros && i === 4)) {
      distractors.add(conjugate(verbItem.spanish, i, targetTense));
    }
  }

  // Distractor source 2: Forms from the alternate tense (e.g. Present vs Preterite confusion)
  const alternateTense = targetTense === "preterite" ? "present" : "preterite";
  for (let i = 0; i < 6; i++) {
    if (!(options.excludeVosotros && i === 4)) {
      distractors.add(conjugate(verbItem.spanish, i, alternateTense));
    }
  }

  // Distractor source 3: Wrong reflexive pronouns for reflexives
  if (isReflexive) {
    const wrongReflexive = REFLEXIVE_PRONOUNS[(randPronoun.idx + 2) % 6];
    distractors.add(`${wrongReflexive} ${conjugate(base, randPronoun.idx, targetTense)}${suffix}`);
  }

  let distractorsArray = Array.from(distractors).filter(form => form !== correctForm);
  distractorsArray = distractorsArray.sort(() => Math.random() - 0.5).slice(0, 3);

  const choices = [correctForm, ...distractorsArray].sort(() => Math.random() - 0.5);

  let displayVerb = verbItem.spanish;
  if (isReflexive) {
    displayVerb = `${verbItem.spanish} (Verbo Reflexivo)`;
  }

  return {
    verb: displayVerb,
    meaning: verbItem.english,
    pronoun: randPronoun.label,
    tense: targetTense,
    tenseLabel: tenseLabel,
    isReflexive,
    correct: correctForm,
    choices: choices
  };
}

// -------------------------------------------------------------
// FILL IN THE BLANK SENTENCE PRACTICE
// -------------------------------------------------------------
export function generateFillInTheBlank(sentenceItem) {
  const sentence = (sentenceItem.spanish || "").trim();
  
  const BLANK_SPECS = {
    // Spanish 101 Present Tense Sentences
    "la mujer come una manzana roja": {
      blanked: "la mujer [_____] una manzana roja",
      correct: "come",
      choices: ["como", "comes", "come", "comemos"],
      type: "verb"
    },
    "la mujer come una manzana roja (adj)": {
      blanked: "la mujer come una manzana [_____]",
      correct: "roja",
      choices: ["rojo", "roja", "rojos", "rojas"],
      type: "adjective"
    },
    "el muchacho tiene un perro negro": {
      blanked: "el muchacho [_____] un perro negro",
      correct: "tiene",
      choices: ["tengo", "tienes", "tiene", "tenemos"],
      type: "verb"
    },
    "el muchacho tiene un perro negro (adj)": {
      blanked: "el muchacho tiene un perro [_____]",
      correct: "negro",
      choices: ["negro", "negra", "negros", "negras"],
      type: "adjective"
    },
    "nosotros vivimos en una casa grande": {
      blanked: "nosotros [_____] en una casa grande",
      correct: "vivimos",
      choices: ["vivo", "vives", "vive", "vivimos"],
      type: "verb"
    },
    "ellos quieren almorzar en la cafetería": {
      blanked: "ellos [_____] almorzar en la cafetería",
      correct: "quieren",
      choices: ["quiero", "quieres", "quiere", "quieren"],
      type: "verb"
    },
    "el estudiante hace la tarea en la biblioteca": {
      blanked: "el estudiante [_____] la tarea en la biblioteca",
      correct: "hace",
      choices: ["hago", "haces", "hace", "hacemos"],
      type: "verb"
    },
    "yo no sé la respuesta": {
      blanked: "yo no [_____] la respuesta",
      correct: "sé",
      choices: ["sé", "sabes", "sabe", "sabemos"],
      type: "verb"
    },
    "el maestro enseña la clase de español": {
      blanked: "el maestro [_____] la clase de español",
      correct: "enseña",
      choices: ["enseño", "enseñas", "enseña", "enseñan"],
      type: "verb"
    },
    "dónde está la residencia estudiantil": {
      blanked: "dónde [_____] la residencia estudiantil",
      correct: "está",
      choices: ["estoy", "estás", "está", "están"],
      type: "verb"
    },
    "hace mucho frío en el invierno": {
      blanked: "hace mucho [_____] en el invierno",
      correct: "frío",
      choices: ["frío", "fría", "fríos", "frías"],
      type: "adjective"
    },
    "nosotros preferimos jugar al fútbol": {
      blanked: "nosotros [_____] jugar al fútbol",
      correct: "preferimos",
      choices: ["prefiero", "prefieres", "prefiere", "preferimos"],
      type: "verb"
    },
    "mi familia prefiere comer pollo con arroz": {
      blanked: "mi familia [_____] comer pollo con arroz",
      correct: "prefiere",
      choices: ["prefiero", "prefieres", "prefiere", "preferimos"],
      type: "verb"
    },
    "yo tengo que estudiar para el examen": {
      blanked: "yo [_____] que estudiar para el examen",
      correct: "tengo",
      choices: ["tengo", "tienes", "tiene", "tenemos"],
      type: "verb"
    },
    "ella habla español muy bien": {
      blanked: "ella [_____] español muy bien",
      correct: "habla",
      choices: ["hablo", "hablas", "habla", "hablan"],
      type: "verb"
    },
    "qué quieres comer hoy": {
      blanked: "qué [_____] comer hoy",
      correct: "quieres",
      choices: ["quiero", "quieres", "quiere", "queremos"],
      type: "verb"
    },
    "el libro está encima del escritorio": {
      blanked: "el libro [_____] encima del escritorio",
      correct: "está",
      choices: ["estoy", "estás", "está", "están"],
      type: "verb"
    },
    "la escuela está cerca de la casa": {
      blanked: "la escuela [_____] cerca de la casa",
      correct: "está",
      choices: ["estoy", "estás", "está", "están"],
      type: "verb"
    },
    "nosotros compramos pan en el mercado": {
      blanked: "nosotros [_____] pan en el mercado",
      correct: "compramos",
      choices: ["compro", "compras", "compra", "compramos"],
      type: "verb"
    },
    "yo vengo a la universidad en autobús": {
      blanked: "yo [_____] a la universidad en autobús",
      correct: "vengo",
      choices: ["vengo", "vienes", "viene", "venimos"],
      type: "verb"
    },
    "mi amigo duerme en la clase": {
      blanked: "mi amigo [_____] en la clase",
      correct: "duerme",
      choices: ["duermo", "duermes", "duerme", "dormimos"],
      type: "verb"
    }
  };

  let targetKey = sentence;
  if (sentence === "la mujer come una manzana roja" && Math.random() > 0.5) {
    targetKey = "la mujer come una manzana roja (adj)";
  } else if (sentence === "el muchacho tiene un perro negro" && Math.random() > 0.5) {
    targetKey = "el muchacho tiene un perro negro (adj)";
  }

  const spec = BLANK_SPECS[targetKey];
  if (!spec) return null;

  return {
    sentence: spec.blanked,
    meaning: sentenceItem.english,
    correct: spec.correct,
    choices: [...spec.choices].sort(() => Math.random() - 0.5),
    type: spec.type
  };
}
