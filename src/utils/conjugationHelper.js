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

export const CONCRETE_PRONOUN_MAP = {
  0: [{ pronoun: "yo", meaning: "I", fullLabel: "yo (I)" }],
  1: [{ pronoun: "tú", meaning: "you, informal", fullLabel: "tú (you, informal)" }],
  2: [
    { pronoun: "él", meaning: "he", fullLabel: "él (he)" },
    { pronoun: "ella", meaning: "she", fullLabel: "ella (she)" },
    { pronoun: "usted", meaning: "you, formal", fullLabel: "usted (you, formal)" }
  ],
  3: [
    { pronoun: "nosotros", meaning: "we", fullLabel: "nosotros (we)" },
    { pronoun: "nosotras", meaning: "we, female", fullLabel: "nosotras (we, female)" }
  ],
  4: [
    { pronoun: "vosotros", meaning: "you all, Spain", fullLabel: "vosotros (you all, Spain)" },
    { pronoun: "vosotras", meaning: "you all, Spain female", fullLabel: "vosotras (you all, Spain female)" }
  ],
  5: [
    { pronoun: "ellos", meaning: "they", fullLabel: "ellos (they)" },
    { pronoun: "ellas", meaning: "they, female", fullLabel: "ellas (they, female)" },
    { pronoun: "ustedes", meaning: "you all", fullLabel: "ustedes (you all)" }
  ]
};

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
  "medir": ["mido", "mides", "mide", "medimos", "medís", "miden"],
  "despedir": ["despido", "despides", "despide", "despedimos", "despedís", "despiden"],
  "reunir": ["reúno", "reúnes", "reúne", "reunimos", "reunís", "reúnen"]
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
  "despedir": ["despedí", "despediste", "despidió", "despedimos", "despedisteis", "despidieron"],
  "reunir": ["reuní", "reuniste", "reunió", "reunimos", "reunisteis", "reunieron"],

  // Orthographic spelling changers in yo form (-car, -gar, -zar in Unit 3)
  "abrazar": ["abracé", "abrazaste", "abrazó", "abrazamos", "abrazasteis", "abrazaron"],
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

export const GUSTAR_VERBS = [
  "gustar",
  "encantar",
  "doler",
  "molestar",
  "fascinar",
  "importar",
  "faltar",
  "quedar"
];

export const GUSTAR_FORMS = {
  "gustar": {
    present: { singular: "gusta", plural: "gustan" },
    preterite: { singular: "gustó", plural: "gustaron" }
  },
  "encantar": {
    present: { singular: "encanta", plural: "encantan" },
    preterite: { singular: "encantó", plural: "encantaron" }
  },
  "doler": {
    present: { singular: "duele", plural: "duelen" },
    preterite: { singular: "dolió", plural: "dolieron" }
  },
  "molestar": {
    present: { singular: "molesta", plural: "molestan" },
    preterite: { singular: "molestó", plural: "molestaron" }
  },
  "fascinar": {
    present: { singular: "fascinan", plural: "fascinan" },
    preterite: { singular: "fascinó", plural: "fascinaron" }
  },
  "importar": {
    present: { singular: "importa", plural: "importan" },
    preterite: { singular: "importó", plural: "importaron" }
  },
  "faltar": {
    present: { singular: "falta", plural: "faltan" },
    preterite: { singular: "faltó", plural: "faltaron" }
  },
  "quedar": {
    present: { singular: "queda", plural: "quedan" },
    preterite: { singular: "quedó", plural: "quedaron" }
  }
};

export const INDIRECT_OBJECT_PRONOUNS = [
  { pronoun: "(a mí)", iop: "me", translation: "to me / I like" },
  { pronoun: "(a ti)", iop: "te", translation: "to you (inf) / you like" },
  { pronoun: "(a él / ella / usted)", iop: "le", translation: "to him/her/you (formal)" },
  { pronoun: "(a nosotros / nosotras)", iop: "nos", translation: "to us / we like" },
  { pronoun: "(a vosotros / vosotras)", iop: "os", translation: "to you all (Spain)" },
  { pronoun: "(a ellos / ellas / ustedes)", iop: "les", translation: "to them/you all" }
];

export function isGustarVerb(itemOrStr) {
  if (!itemOrStr) return false;
  if (typeof itemOrStr === "object") {
    if (itemOrStr.subcategory === "Verbs Structured Like Gustar") return true;
    const base = parseVerb(itemOrStr.spanish).base;
    return GUSTAR_VERBS.includes(base);
  }
  const base = parseVerb(itemOrStr).base;
  return GUSTAR_VERBS.includes(base);
}

// -------------------------------------------------------------
// RECIPROCAL VERBS (Acciones Mutuas: "Each Other")
// In Spanish, reciprocal verbs describe mutual actions between two or more
// people. They ONLY exist in plural forms (nosotros, vosotros, ellos/ellas/ustedes).
// Singular forms (e.g., "yo me beso") are unnatural and require a Direct Object.
// -------------------------------------------------------------
export const RECIPROCAL_VERBS = [
  "abrazarse",
  "ayudarse",
  "besarse",
  "conocerse",
  "despedirse",
  "divorciarse",
  "mirarse",
  "pelearse",
  "reunirse",
  "turnarse",
  "saludarse",
  "escribirse",
  "hablarse"
];

export function isReciprocalVerb(itemOrStr) {
  if (!itemOrStr) return false;
  if (isSentenceItem(itemOrStr)) return false;

  if (typeof itemOrStr === "object") {
    // Exclude reflexive actions with specific object or prepositional phrase like "mirarse en el espejo"
    if (itemOrStr.spanish?.includes("en el espejo") || itemOrStr.english?.toLowerCase().includes("oneself")) {
      return false;
    }
    const sp = (itemOrStr.spanish || "").trim().toLowerCase();
    const parsed = parseVerb(sp);
    if (parsed.isReflexive) {
      const baseWithSe = parsed.base + "se";
      return RECIPROCAL_VERBS.includes(sp) || RECIPROCAL_VERBS.includes(baseWithSe);
    }
    return RECIPROCAL_VERBS.includes(sp);
  }

  const str = String(itemOrStr).toLowerCase().trim();
  if (str.includes("en el espejo")) return false;
  const parsed = parseVerb(str);
  if (parsed.isReflexive) {
    const baseWithSe = parsed.base + "se";
    return RECIPROCAL_VERBS.includes(str) || RECIPROCAL_VERBS.includes(baseWithSe);
  }
  return RECIPROCAL_VERBS.includes(str);
}

/**
 * Checks if a vocabulary item represents a verb (101 verbs, reflexives, preterites, reciprocals)
 */
export function isVerbItem(item) {
  if (!item) return false;
  if (item.isSentence || isSentenceItem(item)) return false;

  const sp = (typeof item === "string" ? item : item.spanish || "").trim().toLowerCase();
  if (!sp) return false;

  // Sentences or non-verbs with punctuation (excluding slash preterite drill strings like "lavé / lavaste / lavó")
  if (/[.,?¿!¡]/.test(sp)) {
    if (!sp.includes("/") || sp.split("/").length < 2) return false;
  }

  // Reject noun phrases or sentences starting with determiners or subject pronouns
  if (
    sp.startsWith("el ") ||
    sp.startsWith("la ") ||
    sp.startsWith("los ") ||
    sp.startsWith("las ") ||
    sp.startsWith("un ") ||
    sp.startsWith("una ") ||
    sp.startsWith("unos ") ||
    sp.startsWith("unas ") ||
    sp.startsWith("yo ") ||
    sp.startsWith("tú ") ||
    sp.startsWith("él ") ||
    sp.startsWith("ella ") ||
    sp.startsWith("usted ") ||
    sp.startsWith("nosotros ") ||
    sp.startsWith("nosotras ") ||
    sp.startsWith("vosotros ") ||
    sp.startsWith("vosotras ") ||
    sp.startsWith("ellos ") ||
    sp.startsWith("ellas ") ||
    sp.startsWith("ustedes ") ||
    sp.startsWith("a ellos ") ||
    sp.startsWith("a ellas ") ||
    sp.startsWith("mis ") ||
    sp.startsWith("sus ") ||
    sp.startsWith("nuestros ") ||
    sp.startsWith("es muy ") ||
    sp.startsWith("antes de ") ||
    sp.startsWith("después de ")
  ) {
    return false;
  }

  const parsed = parseVerb(sp);
  const baseNorm = parsed.base.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const baseEndsInVerb = baseNorm.endsWith("ar") || baseNorm.endsWith("er") || baseNorm.endsWith("ir");
  const isKnownVerb = baseEndsInVerb || !!PRESENT_IRREGULARS[parsed.base] || GUSTAR_VERBS.includes(parsed.base);

  if (!isKnownVerb) return false;

  return true;
}

/**
 * Determines whether a question or item targets Pretérito (Past Tense).
 */
export function isPreteriteTense(questionOrItem) {
  if (!questionOrItem) return false;
  if (questionOrItem.tense === "preterite" || questionOrItem.tense === "past") return true;
  if (typeof questionOrItem.tenseLabel === "string" && questionOrItem.tenseLabel.includes("Pretérito")) return true;
  if (questionOrItem.item) {
    if (questionOrItem.item.subcategory?.includes("Pretérito")) return true;
    if (questionOrItem.item.english?.toLowerCase().includes("preterite") || questionOrItem.item.english?.toLowerCase().includes("(past)")) return true;
  }
  return false;
}

/**
 * Conjugates any Spanish 101 or 102 verb in Present or Preterite (Past Tense).
 * Automatically prepending reflexive pronouns (me, te, se, nos, os, se) for reflexive verbs.
 * For gustar and gustar-like verbs, returns indirect object pronoun + gusta / gustan.
 */
export function conjugate(rawVerb, pronounIdx, tense = "present") {
  const { base, isReflexive, suffix } = parseVerb(rawVerb);

  // Special handling for Gustar and verbs structured like it:
  // Gustar does NOT conjugate by person. It only uses 3rd-person singular/plural with IOPs!
  if (isGustarVerb(rawVerb)) {
    const forms = GUSTAR_FORMS[base] || GUSTAR_FORMS["gustar"];
    const tenseForms = (tense === "preterite" || tense === "past") ? forms.preterite : forms.present;
    const iop = INDIRECT_OBJECT_PRONOUNS[pronounIdx]?.iop || "le";
    return `${iop} ${tenseForms.singular} (sing.) / ${iop} ${tenseForms.plural} (pl.)`;
  }

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

const GUSTAR_PRACTICE_TEMPLATES = [
  // Present - Singular
  {
    sentence: "A mí me [_____] la música clásica.",
    isPlural: false,
    meaning: "I like classical music (singular noun)",
    tense: "present"
  },
  {
    sentence: "A Juan le [_____] comer tacos en el restaurante.",
    isPlural: false,
    meaning: "Juan likes eating tacos (verb infinitive)",
    tense: "present"
  },
  {
    sentence: "A nosotros nos [_____] el café por la mañana.",
    isPlural: false,
    meaning: "We like coffee in the morning (singular noun)",
    tense: "present"
  },
  // Present - Plural
  {
    sentence: "A mis amigos les [_____] las películas de acción.",
    isPlural: true,
    meaning: "My friends like action movies (plural noun)",
    tense: "present"
  },
  {
    sentence: "¿A ti te [_____] las manzanas rojas?",
    isPlural: true,
    meaning: "Do you like red apples? (plural noun)",
    tense: "present"
  },
  {
    sentence: "A Elena y a Mateo les [_____] los libros de historia.",
    isPlural: true,
    meaning: "Elena and Mateo like history books (plural noun)",
    tense: "present"
  },
  // Preterite - Singular
  {
    sentence: "Ayer me [_____] mucho la fiesta de cumpleaños.",
    isPlural: false,
    meaning: "Yesterday I liked the birthday party a lot (singular past)",
    tense: "preterite"
  },
  {
    sentence: "¿A ti te [_____] el concierto del sábado pasado?",
    isPlural: false,
    meaning: "Did you like last Saturday's concert? (singular past)",
    tense: "preterite"
  },
  // Preterite - Plural
  {
    sentence: "A nosotros nos [_____] mucho las vacaciones en México.",
    isPlural: true,
    meaning: "We liked the vacation days in Mexico a lot (plural past)",
    tense: "preterite"
  },
  {
    sentence: "A ellos les [_____] las nuevas canciones del disco.",
    isPlural: true,
    meaning: "They liked the new songs on the album (plural past)",
    tense: "preterite"
  }
];

/**
 * Generates an interactive conjugation question for a given verb item.
 * Automatically handles reflexive pronouns, preterite past tense, and Gustar-structure verbs.
 */
export function generateConjugationQuestion(verbItem, options = {}) {
  if (!verbItem || !verbItem.spanish || !isVerbItem(verbItem) || isSentenceItem(verbItem)) {
    return null;
  }

  const parsedVerb = parseVerb(verbItem.spanish);
  const baseNorm = parsedVerb.base.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const baseEndsInVerb = baseNorm.endsWith("ar") || baseNorm.endsWith("er") || baseNorm.endsWith("ir");
  if (!baseEndsInVerb && !PRESENT_IRREGULARS[parsedVerb.base] && !GUSTAR_VERBS.includes(parsedVerb.base)) {
    return null;
  }

  const isGustar = isGustarVerb(verbItem);

  // Determine target tense: check options first, then infer from subcategory
  let targetTense = options.tense || "present";
  if (!options.tense) {
    if (verbItem.subcategory?.includes("Pretérito") || verbItem.english?.toLowerCase().includes("preterite") || verbItem.english?.toLowerCase().includes("(past)")) {
      targetTense = "preterite";
    }
  }

  const tenseLabel = targetTense === "preterite" ? "Pretérito (Past Tense)" : "Presente";

  // SPECIAL: Verbs Structured Like Gustar
  // Gustar does NOT conjugate by pronoun (yo/tú/él). It tests singular (gusta/gustó) vs plural (gustan/gustaron)!
  if (isGustar) {
    const templates = GUSTAR_PRACTICE_TEMPLATES.filter(t => t.tense === targetTense);
    const pool = templates.length > 0 ? templates : GUSTAR_PRACTICE_TEMPLATES;
    const tpl = pool[Math.floor(Math.random() * pool.length)];
    
    let correct = "";
    let choices = [];
    if (tpl.tense === "preterite") {
      correct = tpl.isPlural ? "gustaron" : "gustó";
      choices = tpl.isPlural 
        ? ["gustaron", "gustó", "gustan", "gustaronte"] 
        : ["gustó", "gustaron", "gusta", "gusté"];
    } else {
      correct = tpl.isPlural ? "gustan" : "gusta";
      choices = tpl.isPlural 
        ? ["gustan", "gusta", "gusto", "gustas"] 
        : ["gusta", "gustan", "gusto", "gustamos"];
    }

    // Shuffle choices
    choices = choices.sort(() => Math.random() - 0.5);

    return {
      verb: tpl.sentence,
      infinitive: "gustar",
      subjectPronoun: tpl.isPlural ? "plural" : "singular",
      subjectMeaning: tpl.isPlural ? "plural object" : "singular object",
      prompt: tpl.sentence,
      meaning: tpl.meaning,
      pronoun: tpl.isPlural ? "Objeto Plural (¿gusta o gustan?)" : "Objeto Singular / Verbo (¿gusta o gustan?)",
      tense: tpl.tense,
      tenseLabel: tenseLabel,
      isReflexive: false,
      isReciprocal: false,
      isGustar: true,
      questionWord: tpl.sentence,
      correct: correct,
      choices: choices
    };
  }

  const isReciprocal = isReciprocalVerb(verbItem);
  const { base, isReflexive, suffix } = parseVerb(verbItem.spanish);

  // Filter pronouns based on vosotros preference and reciprocal constraints
  let allowedPronouns = options.excludeVosotros 
    ? PRONOUNS.filter(p => p.idx !== 4) 
    : PRONOUNS;

  if (isReciprocal) {
    // Reciprocal actions describe mutual interactions ("each other"),
    // which strictly requires two or more subjects (plural pronouns only: nosotros, vosotros, ellos).
    // Singular forms like "yo me beso" ("I kiss myself") are unnatural and avoided.
    allowedPronouns = allowedPronouns.filter(p => p.idx === 3 || p.idx === 4 || p.idx === 5);
  }

  const randPronoun = allowedPronouns[Math.floor(Math.random() * allowedPronouns.length)];
  const correctForm = conjugate(verbItem.spanish, randPronoun.idx, targetTense);

  // Concrete subject pronoun for clean "yo (tener)" prompt formatting
  const candidates = CONCRETE_PRONOUN_MAP[randPronoun.idx] || CONCRETE_PRONOUN_MAP[0];
  const chosenPronounObj = candidates[Math.floor(Math.random() * candidates.length)];
  const chosenSubject = chosenPronounObj.pronoun;

  let pronounLabel = chosenPronounObj.fullLabel;
  if (isReciprocal) {
    pronounLabel = `${chosenSubject} (${chosenPronounObj.meaning} — each other)`;
  }

  const prompt = `${chosenSubject} (${verbItem.spanish})`;

  // Generate 3 plausible distractors
  const distractors = new Set();
  const alternateTense = targetTense === "preterite" ? "present" : "preterite";

  if (isReciprocal) {
    // Only plural distractors (nosotros, vosotros, ellos)
    const pluralIndices = options.excludeVosotros ? [3, 5] : [3, 4, 5];
    for (const pIdx of pluralIndices) {
      if (pIdx !== randPronoun.idx) {
        distractors.add(conjugate(verbItem.spanish, pIdx, targetTense));
      }
    }
    for (const pIdx of pluralIndices) {
      distractors.add(conjugate(verbItem.spanish, pIdx, alternateTense));
    }
    // Plural wrong reciprocal pronoun (e.g. "se besamos" or "nos besan")
    const wrongReflexive = randPronoun.idx === 3 ? "se" : "nos";
    distractors.add(`${wrongReflexive} ${conjugate(base, randPronoun.idx, targetTense)}${suffix}`);
    // Bare plural verb without reciprocal pronoun
    distractors.add(`${conjugate(base, randPronoun.idx, targetTense)}${suffix}`);
  } else {
    // Distractor source 1: Other pronoun forms of the same verb and tense
    for (let i = 0; i < 6; i++) {
      if (i !== randPronoun.idx && !(options.excludeVosotros && i === 4)) {
        distractors.add(conjugate(verbItem.spanish, i, targetTense));
      }
    }

    // Distractor source 2: Forms from the alternate tense (e.g. Present vs Preterite confusion)
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
  }

  let distractorsArray = Array.from(distractors).filter(form => form && form !== correctForm);
  distractorsArray = distractorsArray.sort(() => Math.random() - 0.5).slice(0, 3);

  const choices = [correctForm, ...distractorsArray].sort(() => Math.random() - 0.5);

  return {
    verb: prompt,
    infinitive: verbItem.spanish,
    subjectPronoun: chosenSubject,
    subjectMeaning: chosenPronounObj.meaning,
    prompt: prompt,
    meaning: verbItem.english,
    pronoun: pronounLabel,
    tense: targetTense,
    tenseLabel: tenseLabel,
    isReflexive,
    isReciprocal,
    isGustar: false,
    questionWord: prompt,
    correct: correctForm,
    choices: choices
  };
}


// -------------------------------------------------------------
// FILL IN THE BLANK SENTENCE PRACTICE
// -------------------------------------------------------------
export const BLANK_SPECS = {
    // Spanish 101 Present Tense Sentences
    "la mujer come una manzana roja": {
      blanked: "la mujer [_____] una manzana roja",
      correct: "come",
      choices: ["como", "comes", "come", "comemos"],
      type: "verb",
      targetVerb: "comer",
      tense: "present"
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
      type: "verb",
      targetVerb: "tener",
      tense: "present"
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
      type: "verb",
      targetVerb: "vivir",
      tense: "present"
    },
    "ellos quieren almorzar en la cafetería": {
      blanked: "ellos [_____] almorzar en la cafetería",
      correct: "quieren",
      choices: ["quiero", "quieres", "quiere", "quieren"],
      type: "verb",
      targetVerb: "querer",
      tense: "present"
    },
    "el estudiante hace la tarea en la biblioteca": {
      blanked: "el estudiante [_____] la tarea en la biblioteca",
      correct: "hace",
      choices: ["hago", "haces", "hace", "hacemos"],
      type: "verb",
      targetVerb: "hacer",
      tense: "present"
    },
    "yo no sé la respuesta": {
      blanked: "yo no [_____] la respuesta",
      correct: "sé",
      choices: ["sé", "sabes", "sabe", "sabemos"],
      type: "verb",
      targetVerb: "saber",
      tense: "present"
    },
    "el maestro enseña la clase de español": {
      blanked: "el maestro [_____] la clase de español",
      correct: "enseña",
      choices: ["enseño", "enseñas", "enseña", "enseñan"],
      type: "verb",
      targetVerb: "enseñar",
      tense: "present"
    },
    "dónde está la residencia estudiantil": {
      blanked: "dónde [_____] la residencia estudiantil",
      correct: "está",
      choices: ["estoy", "estás", "está", "están"],
      type: "verb",
      targetVerb: "estar",
      tense: "present"
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
      type: "verb",
      targetVerb: "preferir",
      tense: "present"
    },
    "mi familia prefiere comer pollo con arroz": {
      blanked: "mi familia [_____] comer pollo con arroz",
      correct: "prefiere",
      choices: ["prefiero", "prefieres", "prefiere", "preferimos"],
      type: "verb",
      targetVerb: "preferir",
      tense: "present"
    },
    "yo tengo que estudiar para el examen": {
      blanked: "yo [_____] que estudiar para el examen",
      correct: "tengo",
      choices: ["tengo", "tienes", "tiene", "tenemos"],
      type: "verb",
      targetVerb: "tener",
      tense: "present"
    },
    "ella habla español muy bien": {
      blanked: "ella [_____] español muy bien",
      correct: "habla",
      choices: ["hablo", "hablas", "habla", "hablan"],
      type: "verb",
      targetVerb: "hablar",
      tense: "present"
    },
    "qué quieres comer hoy": {
      blanked: "qué [_____] comer hoy",
      correct: "quieres",
      choices: ["quiero", "quieres", "quiere", "queremos"],
      type: "verb",
      targetVerb: "querer",
      tense: "present"
    },
    "el libro está encima del escritorio": {
      blanked: "el libro [_____] encima del escritorio",
      correct: "está",
      choices: ["estoy", "estás", "está", "están"],
      type: "verb",
      targetVerb: "estar",
      tense: "present"
    },
    "la escuela está cerca de la casa": {
      blanked: "la escuela [_____] cerca de la casa",
      correct: "está",
      choices: ["estoy", "estás", "está", "están"],
      type: "verb",
      targetVerb: "estar",
      tense: "present"
    },
    "nosotros compramos pan en el mercado": {
      blanked: "nosotros [_____] pan en el mercado",
      correct: "compramos",
      choices: ["compro", "compras", "compra", "compramos"],
      type: "verb",
      targetVerb: "comprar",
      tense: "present"
    },
    "yo vengo a la universidad en autobús": {
      blanked: "yo [_____] a la universidad en autobús",
      correct: "vengo",
      choices: ["vengo", "vienes", "viene", "venimos"],
      type: "verb",
      targetVerb: "venir",
      tense: "present"
    },
    "mi amigo duerme en la clase": {
      blanked: "mi amigo [_____] en la clase",
      correct: "duerme",
      choices: ["duermo", "duermes", "duerme", "dormimos"],
      type: "verb",
      targetVerb: "dormir",
      tense: "present"
    },

    // Spanish 102 Reciprocal and Direct Object Sentences:
    // Demonstrates both Conjugated forms (se abrazan, se besan) AND
    // Infinitive with attached pronouns (abrazarse, besarse, ayudarnos, lavarme, lavarse)
    // after modal verbs, 'ir a', prepositions (antes de, para, después de), and impersonal expressions.
    "los dos amigos se abrazan cuando se ven": {
      blanked: "los dos amigos [_____] cuando se ven",
      correct: "se abrazan",
      choices: ["se abrazan", "abrazarse", "abrazan", "se abraza"],
      type: "verb",
      targetVerb: "abrazarse",
      tense: "present",
      hint: "Verbo conjugado principal: los amigos (ellos) realizan la acción directamente."
    },
    "los dos amigos van a abrazarse con alegría": {
      blanked: "los dos amigos van a [_____] con alegría",
      correct: "abrazarse",
      choices: ["abrazarse", "se abrazan", "abrazar", "se abrazaron"],
      type: "verb",
      targetVerb: "abrazarse",
      tense: "present",
      hint: "Con perífrasis verbal ('van a...'), el pronombre se une al infinitivo: abrazarse."
    },
    "los dos amigos corrieron para abrazarse con emoción": {
      blanked: "los dos amigos corrieron para [_____] con emoción",
      correct: "abrazarse",
      choices: ["abrazarse", "se abrazan", "abrazar", "se abrazaron"],
      type: "verb",
      targetVerb: "abrazarse",
      tense: "present",
      hint: "Después de una preposición ('para'), se usa el infinitivo con pronombre unido: abrazarse."
    },
    "a ellos les encanta abrazarse cuando hace frío": {
      blanked: "a ellos les encanta [_____] cuando hace frío",
      correct: "abrazarse",
      choices: ["abrazarse", "se abrazan", "abrazar", "se abrazaron"],
      type: "verb",
      targetVerb: "abrazarse",
      tense: "present",
      hint: "Después de 'les encanta', el verbo va en infinitivo con pronombre: abrazarse."
    },
    "ellos se besan antes de salir": {
      blanked: "ellos [_____] antes de salir",
      correct: "se besan",
      choices: ["se besan", "besarse", "besan", "se besaron"],
      type: "verb",
      targetVerb: "besarse",
      tense: "present",
      hint: "Verbo conjugado principal: ellos realizan la acción mutuamente."
    },
    "los novios quieren besarse en el parque": {
      blanked: "los novios quieren [_____] en el parque",
      correct: "besarse",
      choices: ["besarse", "se besan", "besar", "se besaron"],
      type: "verb",
      targetVerb: "besarse",
      tense: "present",
      hint: "Con dos verbos ('quieren + ...'), el segundo verbo va en infinitivo con pronombre unido: besarse."
    },
    "los novios van a besarse en el altar": {
      blanked: "los novios van a [_____] en el altar",
      correct: "besarse",
      choices: ["besarse", "se besan", "besar", "se besaron"],
      type: "verb",
      targetVerb: "besarse",
      tense: "present",
      hint: "Después de 'van a' (ir a + infinitivo), el pronombre se une al infinitivo: besarse."
    },
    "a ellos les gusta besarse bajo la lluvia": {
      blanked: "a ellos les gusta [_____] bajo la lluvia",
      correct: "besarse",
      choices: ["besarse", "se besan", "besar", "se besaron"],
      type: "verb",
      targetVerb: "besarse",
      tense: "present",
      hint: "Después de 'les gusta', el verbo va en infinitivo con pronombre: besarse."
    },
    "nosotros vamos a besarnos antes de salir": {
      blanked: "nosotros vamos a [_____] antes de salir",
      correct: "besarnos",
      choices: ["besarnos", "besarse", "nos besamos", "besarme"],
      type: "verb",
      targetVerb: "besarse",
      tense: "present",
      hint: "Con 'nosotros' después de 'vamos a', se une el pronombre 'nos' al infinitivo: besarnos (nunca 'se' ni 'me')."
    },
    "nosotros nos vamos a besar antes de salir": {
      blanked: "nosotros [_____] a besar antes de salir",
      correct: "nos vamos",
      choices: ["nos vamos", "vamos", "se van", "me voy"],
      type: "verb",
      targetVerb: "besarse",
      tense: "present",
      hint: "Pronombre recíproco 'nos' antes de 'vamos': nos vamos a besar (nunca 'se' con nosotros)."
    },
    "nosotros nos vamos a besar antes de salir (inf)": {
      blanked: "nosotros nos vamos a [_____] antes de salir",
      correct: "besar",
      choices: ["besar", "besarse", "besarnos", "besan"],
      type: "verb",
      targetVerb: "besarse",
      tense: "present",
      hint: "El pronombre 'nos' ya está antes de 'vamos' (nos vamos a...). Por tanto, el infinitivo va solo: besar. ¡Nunca se repite el pronombre (*nos vamos a besarnos)!"
    },
    "los novios se van a besar en el altar": {
      blanked: "los novios [_____] a besar en el altar",
      correct: "se van",
      choices: ["se van", "van", "se va", "nos vamos"],
      type: "verb",
      targetVerb: "besarse",
      tense: "present",
      hint: "Pronombre 'se' colocado antes del verbo conjugado: se van a besar."
    },
    "los novios se van a besar en el altar (inf)": {
      blanked: "los novios se van a [_____] en el altar",
      correct: "besar",
      choices: ["besar", "besarse", "besan", "besaron"],
      type: "verb",
      targetVerb: "besarse",
      tense: "present",
      hint: "El pronombre 'se' ya está antes de 'van' (se van a...). El infinitivo va solo: besar. ¡Nunca dupliques el pronombre (*se van a besarse)!"
    },
    "los novios se quieren besar en el parque": {
      blanked: "los novios se quieren [_____] en el parque",
      correct: "besar",
      choices: ["besar", "besarse", "besan", "se besan"],
      type: "verb",
      targetVerb: "besarse",
      tense: "present",
      hint: "El pronombre 'se' ya está antes del verbo auxiliar (se quieren...). Usa el infinitivo simple: besar."
    },
    "nosotros nos debemos ayudar en la clase": {
      blanked: "nosotros nos debemos [_____] en la clase",
      correct: "ayudar",
      choices: ["ayudar", "ayudarnos", "ayudarse", "ayudamos"],
      type: "verb",
      targetVerb: "ayudarse",
      tense: "present",
      hint: "Con 'nos debemos...', el pronombre 'nos' ya está al principio. Usa el infinitivo simple: ayudar (no *nos debemos ayudarnos)."
    },
    "los amigos se despiden en la estación": {
      blanked: "los amigos [_____] en la estación",
      correct: "se despiden",
      choices: ["se despiden", "despedirse", "despiden", "se despide"],
      type: "verb",
      targetVerb: "despedirse",
      tense: "present",
      hint: "Verbo conjugado principal: los amigos realizan la acción."
    },
    "antes de despedirse los estudiantes se dieron un abrazo": {
      blanked: "antes de [_____] los estudiantes se dieron un abrazo",
      correct: "despedirse",
      choices: ["despedirse", "se despiden", "despedir", "se despidieron"],
      type: "verb",
      targetVerb: "despedirse",
      tense: "present",
      hint: "Después de una preposición ('antes de'), el verbo SIEMPRE va en infinitivo: despedirse."
    },
    "nosotros nos ayudamos con la tarea de español": {
      blanked: "nosotros [_____] con la tarea de español",
      correct: "nos ayudamos",
      choices: ["nos ayudamos", "ayudarnos", "se ayudan", "ayudamos"],
      type: "verb",
      targetVerb: "ayudarse",
      tense: "present",
      hint: "Verbo conjugado: nosotros realizamos la acción."
    },
    "nosotros debemos ayudarnos en la clase": {
      blanked: "nosotros debemos [_____] en la clase",
      correct: "ayudarnos",
      choices: ["ayudarnos", "nos ayudamos", "ayudarse", "ayudamos"],
      type: "verb",
      targetVerb: "ayudarse",
      tense: "present",
      hint: "Después de un verbo modal ('debemos'), el pronombre 'nos' se une al infinitivo: ayudarnos."
    },
    "es muy importante ayudarse entre compañeros": {
      blanked: "es muy importante [_____] entre compañeros",
      correct: "ayudarse",
      choices: ["ayudarse", "se ayudan", "ayudar", "nos ayudamos"],
      type: "verb",
      targetVerb: "ayudarse",
      tense: "present",
      hint: "En expresiones impersonales ('es importante...'), se usa el infinitivo general: ayudarse."
    },
    "mis padres se conocieron en la universidad": {
      blanked: "mis padres [_____] en la universidad",
      correct: "se conocieron",
      choices: ["se conocieron", "conocerse", "se conocen", "conocieron"],
      type: "verb",
      targetVerb: "conocerse",
      tense: "preterite",
      hint: "Verbo conjugado en pretérito (pasado): acción completada."
    },
    "los dos estudiantes van a conocerse hoy": {
      blanked: "los dos estudiantes van a [_____] hoy",
      correct: "conocerse",
      choices: ["conocerse", "se conocen", "conocer", "se conocieron"],
      type: "verb",
      targetVerb: "conocerse",
      tense: "present",
      hint: "Después de 'van a' (ir a + infinitivo), el pronombre se une al infinitivo: conocerse."
    },
    "los hermanos a veces se pelean por los juguetes": {
      blanked: "los hermanos a veces [_____] por los juguetes",
      correct: "se pelean",
      choices: ["se pelean", "pelearse", "pelean", "se pelea"],
      type: "verb",
      targetVerb: "pelearse",
      tense: "present",
      hint: "Verbo conjugado principal: los hermanos realizan la acción."
    },
    "después de pelearse los niños pidieron perdón": {
      blanked: "después de [_____] los niños pidieron perdón",
      correct: "pelearse",
      choices: ["pelearse", "se pelean", "pelear", "se pelearon"],
      type: "verb",
      targetVerb: "pelearse",
      tense: "present",
      hint: "Después de una preposición ('después de'), se usa el infinitivo con pronombre unido: pelearse."
    },
    "yo me lavo las manos antes de comer": {
      blanked: "yo [_____] las manos antes de comer",
      correct: "me lavo",
      choices: ["me lavo", "lavarme", "te lavas", "se lava"],
      type: "verb",
      targetVerb: "lavarse",
      tense: "present",
      hint: "Verbo reflexivo conjugado para 'yo' con objeto directo ('las manos')."
    },
    "yo me lavo las manos antes de comer (obj)": {
      blanked: "yo me lavo [_____] antes de comer",
      correct: "las manos",
      choices: ["las manos", "los dientes", "la chaqueta", "el pelo"],
      type: "noun",
      hint: "Objeto directo: la parte del cuerpo sobre la que recae la acción."
    },
    "yo necesito lavarme las manos": {
      blanked: "yo necesito [_____] las manos",
      correct: "lavarme",
      choices: ["lavarme", "me lavo", "lavarse", "lavar"],
      type: "verb",
      targetVerb: "lavarse",
      tense: "present",
      hint: "Con 'necesito + infinitivo' para 'yo', el pronombre 'me' se une al infinitivo: lavarme."
    },
    "antes de comer es necesario lavarse las manos": {
      blanked: "antes de comer es necesario [_____] las manos",
      correct: "lavarse",
      choices: ["lavarse", "se lava", "lavar", "me lavo"],
      type: "verb",
      targetVerb: "lavarse",
      tense: "present",
      hint: "Frase impersonal ('es necesario...'): se usa el infinitivo general con pronombre unido: lavarse."
    },
    "él se cepilla los dientes después de cenar": {
      blanked: "él [_____] los dientes después de cenar",
      correct: "se cepilla",
      choices: ["se cepilla", "me cepillo", "te cepillas", "se cepillan"],
      type: "verb",
      targetVerb: "cepillarse",
      tense: "present"
    },
    "ella se pone la chaqueta porque hace frío": {
      blanked: "ella [_____] la chaqueta porque hace frío",
      correct: "se pone",
      choices: ["se pone", "me pongo", "te pones", "se ponen"],
      type: "verb",
      targetVerb: "ponerse",
      tense: "present"
    },
    "yo beso a mi madre todas las mañanas": {
      blanked: "yo beso [_____] mi madre todas las mañanas",
      correct: "a",
      choices: ["a", "de", "en", "con"],
      type: "preposition",
      hint: "Se usa la 'a' personal porque el objeto directo es una persona específica."
    },
    "nosotros ayudamos a nuestros amigos": {
      blanked: "nosotros ayudamos [_____] nuestros amigos",
      correct: "a",
      choices: ["a", "de", "con", "por"],
      type: "preposition",
      hint: "Se usa la 'a' personal porque el objeto directo son personas específicas."
    },
    "yo me despierto a las siete de la mañana": {
      blanked: "yo [_____] a las siete de la mañana",
      correct: "me despierto",
      choices: ["me despierto", "te despiertas", "se despierta", "nos despertamos"],
      type: "verb",
      targetVerb: "despertarse",
      tense: "present",
      hint: "Verbo reflexivo con cambio de raíz (e -> ie) conjugado para 'yo'."
    },
    "mi hermano se levanta tarde los fines de semana": {
      blanked: "mi hermano [_____] tarde los fines de semana",
      correct: "se levanta",
      choices: ["se levanta", "me levanto", "te levantas", "se levantan"],
      type: "verb",
      targetVerb: "levantarse",
      tense: "present"
    },
    "nosotros nos duchamos con agua caliente": {
      blanked: "nosotros [_____] con agua caliente",
      correct: "nos duchamos",
      choices: ["nos duchamos", "se duchan", "me ducho", "duchamos"],
      type: "verb",
      targetVerb: "ducharse",
      tense: "present"
    },
    "a mi hermano le duele mucho la garganta hoy": {
      blanked: "a mi hermano le [_____] mucho la garganta hoy",
      correct: "duele",
      choices: ["duele", "duelen", "doler", "duelo"],
      type: "verb",
      targetVerb: "doler",
      tense: "present",
      hint: "Doler concuerda con el sujeto singular ('la garganta'): duele."
    },
    "nosotros nos sentimos muy cansados": {
      blanked: "nosotros nos [_____] muy cansados",
      correct: "sentimos",
      choices: ["sentimos", "sienten", "siento", "sientes"],
      type: "verb",
      targetVerb: "sentirse",
      tense: "present"
    },
    "los amigos se saludan con un apretón de manos": {
      blanked: "los amigos [_____] con un apretón de manos",
      correct: "se saludan",
      choices: ["se saludan", "saludarse", "nos saludamos", "saludan"],
      type: "verb",
      targetVerb: "saludarse",
      tense: "present",
      hint: "Acción recíproca entre amigos (ellos): se saludan."
    },
    "ayer compré una camisa azul en la tienda": {
      blanked: "ayer [_____] una camisa azul en la tienda",
      correct: "compré",
      choices: ["compré", "compro", "compró", "compramos"],
      type: "verb",
      targetVerb: "comprar",
      tense: "preterite",
      hint: "Pretérito regular de -ar para 'yo': compré."
    },
    "nosotros lavamos los platos anoche": {
      blanked: "nosotros [_____] los platos anoche",
      correct: "lavamos",
      choices: ["lavamos", "lavaron", "lavo", "lavaste"],
      type: "verb",
      targetVerb: "lavar",
      tense: "preterite"
    },
    "ella fue al supermercado ayer por la tarde": {
      blanked: "ella [_____] al supermercado ayer por la tarde",
      correct: "fue",
      choices: ["fue", "va", "fueron", "fui"],
      type: "verb",
      targetVerb: "ir",
      tense: "preterite",
      hint: "Pretérito irregular del verbo ir para 'ella': fue."
    },
    "mis amigos limpiaron la casa esta mañana": {
      blanked: "mis amigos [_____] la casa esta mañana",
      correct: "limpiaron",
      choices: ["limpiaron", "limpian", "limpió", "limpiamos"],
      type: "verb",
      targetVerb: "limpiar",
      tense: "preterite"
    },
    "tú pagaste la ropa con tarjeta de crédito": {
      blanked: "tú [_____] la ropa con tarjeta de crédito",
      correct: "pagaste",
      choices: ["pagaste", "pagas", "pagó", "pagué"],
      type: "verb",
      targetVerb: "pagar",
      tense: "preterite"
    },
    "yo busqué los zapatos nuevos en el centro comercial": {
      blanked: "yo [_____] los zapatos nuevos en el centro comercial",
      correct: "busqué",
      choices: ["busqué", "busco", "buscó", "buscaron"],
      type: "verb",
      targetVerb: "buscar",
      tense: "preterite",
      hint: "Cambio ortográfico en pretérito (c -> qu) para 'yo': busqué."
    },
    "esta camisa de algodón cuesta treinta dólares": {
      blanked: "esta camisa de algodón [_____] treinta dólares",
      correct: "cuesta",
      choices: ["cuesta", "cuestan", "costó", "costar"],
      type: "verb",
      targetVerb: "costar",
      tense: "present"
    },
    "anoche comí pollo asado con verduras": {
      blanked: "anoche [_____] pollo asado con verduras",
      correct: "comí",
      choices: ["comí", "como", "comió", "comimos"],
      type: "verb",
      targetVerb: "comer",
      tense: "preterite"
    },
    "nosotros viajamos a méxico en avión": {
      blanked: "nosotros [_____] a México en avión",
      correct: "viajamos",
      choices: ["viajamos", "viajo", "viajaron", "viaja"],
      type: "verb",
      targetVerb: "viajar",
      tense: "preterite"
    },
    "el pasajero mostró el pasaporte en el mostrador": {
      blanked: "el pasajero [_____] el pasaporte en el mostrador",
      correct: "mostró",
      choices: ["mostró", "muestra", "mostraron", "mostré"],
      type: "verb",
      targetVerb: "mostrar",
      tense: "preterite"
    },
    "ellos hicieron las maletas antes del viaje": {
      blanked: "ellos [_____] las maletas antes del viaje",
      correct: "hicieron",
      choices: ["hicieron", "hacen", "hizo", "hicimos"],
      type: "verb",
      targetVerb: "hacer",
      tense: "preterite",
      hint: "Pretérito irregular de hacer con raíz 'hic-': hicieron."
    },
    "yo le di la tarjeta de embarque al agente": {
      blanked: "yo le [_____] la tarjeta de embarque al agente",
      correct: "di",
      choices: ["di", "da", "dio", "dimos"],
      type: "verb",
      targetVerb: "dar",
      tense: "preterite",
      hint: "Pretérito irregular de dar para 'yo': di."
    },
    "nosotros nos quedamos en un hotel cómodo": {
      blanked: "nosotros [_____] en un hotel cómodo",
      correct: "nos quedamos",
      choices: ["nos quedamos", "se quedaron", "me quedé", "quedamos"],
      type: "verb",
      targetVerb: "quedarse",
      tense: "preterite"
    },
    "el recepcionista nos dio la llave de la habitación": {
      blanked: "el recepcionista nos [_____] la llave de la habitación",
      correct: "dio",
      choices: ["dio", "da", "di", "dieron"],
      type: "verb",
      targetVerb: "dar",
      tense: "preterite"
    },
    "ayer yo no pude encontrar mi pasaporte": {
      blanked: "ayer yo no [_____] encontrar mi pasaporte",
      correct: "pude",
      choices: ["pude", "puedo", "pudo", "pudimos"],
      type: "verb",
      targetVerb: "poder",
      tense: "preterite",
      hint: "Pretérito irregular de poder para 'yo': pude."
    },
    "ella tuvo que cancelar la reserva": {
      blanked: "ella [_____] que cancelar la reserva",
      correct: "tuvo",
      choices: ["tuvo", "tiene", "tuve", "tuvieron"],
      type: "verb",
      targetVerb: "tener",
      tense: "preterite",
      hint: "Pretérito irregular de tener para 'ella': tuvo."
    },
    "nosotros estuvimos en españa durante las vacaciones": {
      blanked: "nosotros [_____] en España durante las vacaciones",
      correct: "estuvimos",
      choices: ["estuvimos", "estamos", "estuvo", "estuvieron"],
      type: "verb",
      targetVerb: "estar",
      tense: "preterite",
      hint: "Pretérito irregular de estar con raíz 'estuv-': estuvimos."
    },
    "ella me lo explicó con calma": {
      blanked: "ella me [_____] explicó con calma",
      correct: "lo",
      choices: ["lo", "la", "los", "las"],
      type: "pronoun",
      hint: "Pronombre de objeto directo masculino singular: lo."
  }
};

// -------------------------------------------------------------
// SENTENCE & FLASHCARD ELIGIBILITY HELPERS
// -------------------------------------------------------------
export function isSentenceItem(item) {
  if (!item) return false;
  if (typeof item === "object" && item.isSentence) return true;
  if (typeof item === "object" && (item.category === "Sentences" || item.subcategory === "Syllabus Sentences")) return true;

  const sp = (typeof item === "string" ? item : item.spanish || "").trim().toLowerCase();
  if (!sp) return false;

  if (typeof BLANK_SPECS !== "undefined" && BLANK_SPECS[sp]) return true;

  // Sentences or non-verbs with punctuation (excluding slash preterite drill strings like "lavé / lavaste / lavó")
  if (/[.,?¿!¡]/.test(sp)) {
    if (!sp.includes("/") || sp.split("/").length < 2) return true;
  }

  // Multi-word phrases with sentence subject / clause starters
  const words = sp.split(/\s+/);
  if (!sp.includes("/") && words.length >= 3) {
    if (
      sp.startsWith("a ellos ") ||
      sp.startsWith("a ellas ") ||
      sp.startsWith("los dos ") ||
      sp.startsWith("los amigos ") ||
      sp.startsWith("los novios ") ||
      sp.startsWith("los hermanos ") ||
      sp.startsWith("los estudiantes ") ||
      sp.startsWith("mis padres ") ||
      sp.startsWith("yo ") ||
      sp.startsWith("tú ") ||
      sp.startsWith("él ") ||
      sp.startsWith("ella ") ||
      sp.startsWith("usted ") ||
      sp.startsWith("nosotros ") ||
      sp.startsWith("nosotras ") ||
      sp.startsWith("vosotros ") ||
      sp.startsWith("vosotras ") ||
      sp.startsWith("ellos ") ||
      sp.startsWith("ellas ") ||
      sp.startsWith("ustedes ") ||
      sp.startsWith("es muy ") ||
      sp.startsWith("antes de ") ||
      sp.startsWith("después de ") ||
      sp.startsWith("me dio ") ||
      sp.startsWith("te dije ") ||
      sp.startsWith("le di ") ||
      sp.startsWith("nos mandaron ") ||
      sp.startsWith("les pidió ") ||
      sp.startsWith("se lo ") ||
      sp.startsWith("te lo ") ||
      sp.startsWith("nos lo ") ||
      sp.startsWith("el pasajero ") ||
      sp.startsWith("el recepcionista ") ||
      sp.startsWith("el muchacho ") ||
      sp.startsWith("la mujer ") ||
      sp.startsWith("anoche ") ||
      sp.startsWith("ayer ")
    ) {
      return true;
    }
  }

  return false;
}

export function isEligibleForFlashcard(item) {
  if (!item || !item.spanish) return false;

  // 1. Full sentences and clause examples must never be flashcards
  if (isSentenceItem(item)) return false;

  // 2. Common conversational phrases/greetings that don't need formal vocabulary flashcards
  const clean = item.spanish.trim().toLowerCase().replace(/[¿?¡!.,]/g, '');
  const conversationalPhrases = [
    "más o menos", "mas o menos",
    "qué tal", "que tal",
    "cómo estás", "como estas",
    "cómo está usted", "como esta usted",
    "buenos días", "buenos dias",
    "buenas tardes",
    "buenas noches",
    "hasta luego",
    "hasta pronto",
    "hasta mañana", "hasta manana",
    "mucho gusto",
    "de nada",
    "por favor",
    "qué pasa", "que pasa",
    "cómo te llamas", "como te llamas",
    "de dónde eres", "de donde eres"
  ];
  if (conversationalPhrases.includes(clean)) {
    return false;
  }

  return true;
}

export function generateFillInTheBlank(sentenceItem) {
  const sentence = (sentenceItem?.spanish || "").trim();
  const normalizeKey = (str) => (str || "").trim().toLowerCase();
  let targetKey = normalizeKey(sentence);

  if (targetKey === "la mujer come una manzana roja" && Math.random() > 0.5) {
    targetKey = "la mujer come una manzana roja (adj)";
  } else if (targetKey === "el muchacho tiene un perro negro" && Math.random() > 0.5) {
    targetKey = "el muchacho tiene un perro negro (adj)";
  } else if (targetKey === "yo me lavo las manos antes de comer" && Math.random() > 0.5) {
    targetKey = "yo me lavo las manos antes de comer (obj)";
  } else if (targetKey === "nosotros nos vamos a besar antes de salir" && Math.random() > 0.5) {
    targetKey = "nosotros nos vamos a besar antes de salir (inf)";
  } else if (targetKey === "los novios se van a besar en el altar" && Math.random() > 0.5) {
    targetKey = "los novios se van a besar en el altar (inf)";
  }

  let spec = BLANK_SPECS[targetKey];
  if (!spec) {
    // Fallback: match without accents or trailing punctuation
    const deaccent = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[.,/#!$%^&*;:{}=\-_`~()¿?¡!]/g, "").trim().toLowerCase();
    const deaccentTarget = deaccent(targetKey);
    const foundKey = Object.keys(BLANK_SPECS).find(k => deaccent(k) === deaccentTarget);
    if (foundKey) spec = BLANK_SPECS[foundKey];
  }

  if (!spec) return null;

  return {
    sentence: spec.blanked,
    meaning: sentenceItem.english,
    correct: spec.correct,
    choices: [...spec.choices].sort(() => Math.random() - 0.5),
    type: spec.type,
    hint: spec.hint || null,
    targetVerb: spec.targetVerb || null,
    tense: spec.tense || null
  };
}
