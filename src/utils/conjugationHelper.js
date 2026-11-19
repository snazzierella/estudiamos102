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
  "conducir": ["conduzco", "conduces", "conduce", "conducemos", "conducéis", "conducen"],
  "traducir": ["traduzco", "traduces", "traduce", "traducemos", "traducéis", "traducen"],
  "producir": ["produzco", "produces", "produce", "producemos", "producéis", "producen"],
  
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
  "reir": ["río", "ríes", "ríe", "reímos", "reís", "ríen"],
  "sonreír": ["sonrío", "sonríes", "sonríe", "sonreímos", "sonreís", "sonríen"],
  "sonreir": ["sonrío", "sonríes", "sonríe", "sonreímos", "sonreís", "sonríen"],
  "repetir": ["repito", "repites", "repite", "repetimos", "repetís", "repiten"],
  "conseguir": ["consigo", "consigues", "consigue", "conseguimos", "conseguís", "consiguen"],
  "vestir": ["visto", "vistes", "viste", "vestimos", "vestís", "visten"],
  "desvestir": ["desvisto", "desvistes", "desviste", "desvestimos", "desvestís", "desvisten"],
  "medir": ["mido", "mides", "mide", "medimos", "medís", "miden"],
  "despedir": ["despido", "despides", "despide", "despedimos", "despedís", "despiden"],
  "reunir": ["reúno", "reúnes", "reúne", "reunimos", "reunís", "reúnen"],
  "mentir": ["miento", "mientes", "miente", "mentimos", "mentís", "mienten"],
  "divertir": ["divierto", "diviertes", "divierte", "divertimos", "divertís", "divierten"],
  "sugerir": ["sugiero", "sugieres", "sugiere", "sugerimos", "sugerís", "sugieren"],

  // Double vowel & -uir present verbs
  "caer": ["caigo", "caes", "cae", "caemos", "caéis", "caen"],
  "poseer": ["poseo", "posees", "posee", "poseemos", "poseéis", "poseen"],
  "proveer": ["proveo", "provees", "provee", "proveemos", "proveéis", "proveen"],
  "construir": ["construyo", "construyes", "construye", "construimos", "construís", "construyen"],
  "destruir": ["destruyo", "destruyes", "destruye", "destruimos", "destruís", "destruyen"],
  "incluir": ["incluyo", "incluyes", "incluye", "incluimos", "incluís", "incluyen"],
  "contribuir": ["contribuyo", "contribuyes", "contribuye", "contribuimos", "contribuís", "contribuyen"],
  "huir": ["huyo", "huyes", "huye", "huimos", "huís", "huyen"],
  "concluir": ["concluyo", "concluyes", "concluye", "concluimos", "concluís", "concluyen"]
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

  // Preterite 3rd-person stem changers (e->i, o->u in Unit 3/4 - Sandal Verbs)
  "pedir": ["pedí", "pediste", "pidió", "pedimos", "pedisteis", "pidieron"],
  "servir": ["serví", "serviste", "sirvió", "servimos", "servisteis", "sirvieron"],
  "dormir": ["dormí", "dormiste", "durmió", "dormimos", "dormisteis", "durmieron"],
  "preferir": ["preferí", "preferiste", "prefirió", "preferimos", "preferisteis", "prefirieron"],
  "repetir": ["repetí", "repetiste", "repitió", "repetimos", "repetisteis", "repitieron"],
  "seguir": ["seguí", "seguiste", "siguió", "seguimos", "seguisteis", "siguieron"],
  "conseguir": ["conseguí", "conseguiste", "consiguió", "conseguimos", "conseguisteis", "consiguieron"],
  "sentir": ["sentí", "sentiste", "sintió", "sentimos", "sentisteis", "sintieron"],
  "vestir": ["vestí", "vestiste", "vistió", "vestimos", "vestisteis", "vistieron"],
  "desvestir": ["desvestí", "desvestiste", "desvistió", "desvestimos", "desvestisteis", "desvistieron"],
  "medir": ["medí", "mediste", "midió", "medimos", "medisteis", "midieron"],
  "morir": ["morí", "moriste", "murió", "morimos", "moristeis", "murieron"],
  "despedir": ["despedí", "despediste", "despidió", "despedimos", "despedisteis", "despidieron"],
  "reunir": ["reuní", "reuniste", "reunió", "reunimos", "reunisteis", "reunieron"],
  "mentir": ["mentí", "mentiste", "mintió", "mentimos", "mentisteis", "mintieron"],
  "divertir": ["divertí", "divertiste", "divirtió", "divertimos", "divertisteis", "divirtieron"],
  "sugerir": ["sugerí", "sugeriste", "sugirió", "sugerimos", "sugeristeis", "sugirieron"],
  "reír": ["reí", "reíste", "rió", "reímos", "reísteis", "rieron"],
  "reir": ["reí", "reíste", "rió", "reímos", "reísteis", "rieron"],
  "sonreír": ["sonreí", "sonreíste", "sonrió", "sonreímos", "sonreísteis", "sonrieron"],
  "sonreir": ["sonreí", "sonreíste", "sonrió", "sonreímos", "sonreísteis", "sonrieron"],

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
  "comenzar": ["comencé", "comenzaste", "comenzó", "comenzamos", "comenzasteis", "comenzaron"],
  "cruzar": ["crucé", "cruzaste", "cruzó", "cruzamos", "cruzasteis", "cruzaron"],
  "regar": ["regué", "regaste", "regó", "regamos", "regasteis", "regaron"],
  "explicar": ["expliqué", "explicaste", "explicó", "explicamos", "explicasteis", "explicaron"],
  "pescar": ["pesqué", "pescaste", "pescó", "pescamos", "pescasteis", "pescaron"],
  "secar": ["sequé", "secaste", "secó", "secamos", "secasteis", "secaron"],
  "marcar": ["marqué", "marcaste", "marcó", "marcamos", "marcasteis", "marcaron"],
  "apagar": ["apagué", "apagaste", "apagó", "apagamos", "apagasteis", "apagaron"],
  "entregar": ["entregué", "entregaste", "entregó", "entregamos", "entregasteis", "entregaron"],
  "cargar": ["cargué", "cargaste", "cargó", "cargamos", "cargasteis", "cargaron"],
  "organizar": ["organicé", "organizaste", "organizó", "organizamos", "organizasteis", "organizaron"],
  "alcanzar": ["alcancé", "alcanzaste", "alcanzó", "alcanzamos", "alcanzasteis", "alcanzaron"],
  "utilizar": ["utilicé", "utilizaste", "utilizó", "utilizamos", "utilizasteis", "utilizaron"],

  // Irregular stems & intervocalic i->y (Unit 3 & 4)
  "andar": ["anduve", "anduviste", "anduvo", "anduvimos", "anduvisteis", "anduvieron"],
  "conducir": ["conduje", "condujiste", "condujo", "condujimos", "condujisteis", "condujeron"],
  "traducir": ["traduje", "tradujiste", "tradujo", "tradujimos", "tradujisteis", "tradujeron"],
  "producir": ["produje", "produjiste", "produjo", "produjimos", "produjisteis", "produjeron"],
  "leer": ["leí", "leíste", "leyó", "leímos", "leísteis", "leyeron"],
  "creer": ["creí", "creíste", "creyó", "creímos", "creísteis", "creyeron"],
  "oír": ["oí", "oíste", "oyó", "oímos", "oísteis", "oyeron"],
  "oir": ["oí", "oíste", "oyó", "oímos", "oísteis", "oyeron"],
  "caer": ["caí", "caíste", "cayó", "caímos", "caísteis", "cayeron"],
  "poseer": ["poseí", "poseíste", "poseyó", "poseímos", "poseísteis", "poseyeron"],
  "proveer": ["proveí", "proveíste", "proveyó", "proveímos", "proveísteis", "proveyeron"],
  "destruir": ["destruí", "destruiste", "destruyó", "destruimos", "destruisteis", "destruyeron"],
  "construir": ["construí", "construiste", "construyó", "construimos", "construisteis", "construyeron"],
  "incluir": ["incluí", "incluiste", "incluyó", "incluimos", "incluisteis", "incluyeron"],
  "contribuir": ["contribuí", "contribuiste", "contribuyó", "contribuimos", "contribuisteis", "contribuyeron"],
  "huir": ["huí", "huiste", "huyó", "huimos", "huisteis", "huyeron"],
  "concluir": ["concluí", "concluiste", "concluyó", "concluimos", "concluisteis", "concluyeron"]
};

// Endings arrays for regular verbs
const PRES_AR_ENDINGS = ["o", "as", "a", "amos", "áis", "an"];
const PRES_ER_ENDINGS = ["o", "es", "e", "emos", "éis", "en"];
const PRES_IR_ENDINGS = ["o", "es", "e", "imos", "ís", "en"];

const PRET_AR_ENDINGS = ["é", "aste", "ó", "amos", "asteis", "aron"];
const PRET_ER_IR_ENDINGS = ["í", "iste", "ió", "imos", "isteis", "ieron"];

export const IMP_AR_ENDINGS = ["aba", "abas", "aba", "ábamos", "abais", "aban"];
export const IMP_ER_IR_ENDINGS = ["ía", "ías", "ía", "íamos", "íais", "ían"];

export const IMPERFECT_IRREGULARS = {
  "ser": ["era", "eras", "era", "éramos", "erais", "eran"],
  "ir": ["iba", "ibas", "iba", "íbamos", "ibais", "iban"],
  "ver": ["veía", "veías", "veía", "veíamos", "veíais", "veían"],
  "haber": ["había", "habías", "había", "habíamos", "habíais", "habían"]
};

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
    if (first === "anduve") return { base: "andar", isReflexive: false, suffix: "" };
    if (first === "conduje") return { base: "conducir", isReflexive: false, suffix: "" };
    if (first === "di") return { base: "dar", isReflexive: false, suffix: "" };
    if (first === "vi") return { base: "ver", isReflexive: false, suffix: "" };
    if (first === "leí") return { base: "leer", isReflexive: false, suffix: "" };
    if (first === "creí") return { base: "creer", isReflexive: false, suffix: "" };
    if (first === "oí") return { base: "oír", isReflexive: false, suffix: "" };
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
    if (first === "sonreí" || first === "sonrió") return { base: "sonreír", isReflexive: false, suffix: "" };
    if (first === "reí" || first === "rió") return { base: "reír", isReflexive: false, suffix: "" };
    if (first === "caí" || first === "cayó") return { base: "caer", isReflexive: false, suffix: "" };
    if (first === "construí" || first === "construyó") return { base: "construir", isReflexive: false, suffix: "" };
    if (first === "destruí" || first === "destruyó") return { base: "destruir", isReflexive: false, suffix: "" };
    if (first === "almorcé") return { base: "almorzar", isReflexive: false, suffix: "" };
    if (first === "empecé") return { base: "empezar", isReflexive: false, suffix: "" };
    if (first === "comencé") return { base: "comenzar", isReflexive: false, suffix: "" };
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
    preterite: { singular: "gustó", plural: "gustaron" },
    imperfect: { singular: "gustaba", plural: "gustaban" }
  },
  "encantar": {
    present: { singular: "encanta", plural: "encantan" },
    preterite: { singular: "encantó", plural: "encantaron" },
    imperfect: { singular: "encantaba", plural: "encantaban" }
  },
  "doler": {
    present: { singular: "duele", plural: "duelen" },
    preterite: { singular: "dolió", plural: "dolieron" },
    imperfect: { singular: "dolía", plural: "dolían" }
  },
  "molestar": {
    present: { singular: "molesta", plural: "molestan" },
    preterite: { singular: "molestó", plural: "molestaron" },
    imperfect: { singular: "molestaba", plural: "molestaban" }
  },
  "fascinar": {
    present: { singular: "fascina", plural: "fascinan" },
    preterite: { singular: "fascinó", plural: "fascinaron" },
    imperfect: { singular: "fascinaba", plural: "fascinaban" }
  },
  "importar": {
    present: { singular: "importa", plural: "importan" },
    preterite: { singular: "importó", plural: "importaron" },
    imperfect: { singular: "importaba", plural: "importaban" }
  },
  "faltar": {
    present: { singular: "falta", plural: "faltan" },
    preterite: { singular: "faltó", plural: "faltaron" },
    imperfect: { singular: "faltaba", plural: "faltaban" }
  },
  "quedar": {
    present: { singular: "queda", plural: "quedan" },
    preterite: { singular: "quedó", plural: "quedaron" },
    imperfect: { singular: "quedaba", plural: "quedaban" }
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
 * Determines whether a question or item targets Imperfecto (Past Tense).
 */
export function isImperfectTense(questionOrItem) {
  if (!questionOrItem) return false;
  if (questionOrItem.tense === "imperfect") return true;
  if (typeof questionOrItem.tenseLabel === "string" && questionOrItem.tenseLabel.includes("Imperfecto")) return true;
  if (questionOrItem.item) {
    if (questionOrItem.item.subcategory?.includes("Imperfecto")) return true;
    if (questionOrItem.item.english?.toLowerCase().includes("imperfect")) return true;
  }
  return false;
}

/**
 * Conjugates any Spanish 101 or 102 verb in Present, Preterite, or Imperfect (Past Tense).
 * Automatically prepending reflexive pronouns (me, te, se, nos, os, se) for reflexive verbs.
 * For gustar and gustar-like verbs, returns indirect object pronoun + gusta / gustan (or gustó/gustaron, gustaba/gustaban).
 */
export function conjugate(rawVerb, pronounIdx, tense = "present") {
  const { base, isReflexive, suffix } = parseVerb(rawVerb);

  // Special handling for Gustar and verbs structured like it:
  // Gustar does NOT conjugate by person. It only uses 3rd-person singular/plural with IOPs!
  if (isGustarVerb(rawVerb)) {
    const forms = GUSTAR_FORMS[base] || GUSTAR_FORMS["gustar"];
    let tenseForms = forms.present;
    if (tense === "imperfect") {
      tenseForms = forms.imperfect || forms.present;
    } else if (tense === "preterite" || tense === "past") {
      tenseForms = forms.preterite;
    }
    const iop = INDIRECT_OBJECT_PRONOUNS[pronounIdx]?.iop || "le";
    return `${iop} ${tenseForms.singular} (sing.) / ${iop} ${tenseForms.plural} (pl.)`;
  }

  let conjugatedBase = "";
  const deaccentBase = base.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  if (tense === "imperfect") {
    const impForms = IMPERFECT_IRREGULARS[base] || IMPERFECT_IRREGULARS[deaccentBase];
    if (impForms) {
      conjugatedBase = impForms[pronounIdx];
    } else {
      const stem = base.slice(0, -2);
      const normEnding = deaccentBase.slice(-2);
      if (normEnding === "ar") {
        conjugatedBase = stem + IMP_AR_ENDINGS[pronounIdx];
      } else if (normEnding === "er" || normEnding === "ir") {
        conjugatedBase = stem + IMP_ER_IR_ENDINGS[pronounIdx];
      } else {
        conjugatedBase = base;
      }
    }
  } else if (tense === "preterite" || tense === "past") {
    const pretForms = PRETERITE_IRREGULARS[base] || PRETERITE_IRREGULARS[deaccentBase];
    if (pretForms) {
      conjugatedBase = pretForms[pronounIdx];
    } else {
      const stem = base.slice(0, -2);
      const normEnding = deaccentBase.slice(-2);
      if (normEnding === "ar") {
        if (pronounIdx === 0) {
          if (deaccentBase.endsWith("car")) {
            conjugatedBase = base.slice(0, -3) + "qué";
          } else if (deaccentBase.endsWith("gar")) {
            conjugatedBase = base.slice(0, -3) + "gué";
          } else if (deaccentBase.endsWith("zar")) {
            conjugatedBase = base.slice(0, -3) + "cé";
          } else {
            conjugatedBase = stem + PRET_AR_ENDINGS[pronounIdx];
          }
        } else {
          conjugatedBase = stem + PRET_AR_ENDINGS[pronounIdx];
        }
      } else if (normEnding === "er" || normEnding === "ir") {
        conjugatedBase = stem + PRET_ER_IR_ENDINGS[pronounIdx];
      } else {
        conjugatedBase = base;
      }
    }
  } else {
    // Present tense
    const presForms = PRESENT_IRREGULARS[base] || PRESENT_IRREGULARS[deaccentBase];
    if (presForms) {
      conjugatedBase = presForms[pronounIdx];
    } else {
      const stem = base.slice(0, -2);
      const normEnding = deaccentBase.slice(-2);
      if (normEnding === "ar") {
        conjugatedBase = stem + PRES_AR_ENDINGS[pronounIdx];
      } else if (normEnding === "er") {
        conjugatedBase = stem + PRES_ER_ENDINGS[pronounIdx];
      } else if (normEnding === "ir") {
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
  },
  // Imperfect - Singular
  {
    sentence: "De niño me [_____] mucho la música de los años ochenta.",
    isPlural: false,
    meaning: "As a child I used to like 80s music a lot (singular imperfect)",
    tense: "imperfect"
  },
  {
    sentence: "Cuando éramos pequeños, a mi hermano le [_____] comer helado.",
    isPlural: false,
    meaning: "When we were little, my brother liked eating ice cream (infinitive imperfect)",
    tense: "imperfect"
  },
  // Imperfect - Plural
  {
    sentence: "A mis primos les [_____] las películas de dibujos animados.",
    isPlural: true,
    meaning: "My cousins used to like animated cartoons (plural imperfect)",
    tense: "imperfect"
  },
  {
    sentence: "A nosotros nos [_____] los videojuegos en el Atari.",
    isPlural: true,
    meaning: "We used to love video games on the Atari (plural imperfect)",
    tense: "imperfect"
  }
];

// -------------------------------------------------------------
// VERB CATEGORY CLASSIFIERS & DEDICATED PRACTICE DECKS
// -------------------------------------------------------------
export function isPreteriteSpellingChanger(itemOrStr) {
  if (!itemOrStr) return false;
  const raw = typeof itemOrStr === "object" ? (itemOrStr.spanish || "") : String(itemOrStr);
  const { base } = parseVerb(raw);
  const norm = base.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  return norm.endsWith("car") || norm.endsWith("gar") || norm.endsWith("zar");
}

export function isPreteriteStemChanger(itemOrStr) {
  if (!itemOrStr) return false;
  const raw = typeof itemOrStr === "object" ? (itemOrStr.spanish || "") : String(itemOrStr);
  const { base } = parseVerb(raw);
  const norm = base.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const list = [
    "pedir", "servir", "dormir", "morir", "preferir", "repetir", "seguir",
    "conseguir", "sentir", "vestir", "desvestir", "medir", "despedir",
    "mentir", "divertir", "sugerir", "sonreir", "sonreír", "reir", "reír"
  ];
  return list.includes(norm) || list.includes(base);
}

export function isPreteriteDoubleVowel(itemOrStr) {
  if (!itemOrStr) return false;
  const raw = typeof itemOrStr === "object" ? (itemOrStr.spanish || "") : String(itemOrStr);
  const { base } = parseVerb(raw);
  const norm = base.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const list = [
    "leer", "creer", "oir", "oír", "caer", "poseer", "proveer",
    "destruir", "construir", "incluir", "contribuir", "huir", "concluir"
  ];
  return list.includes(norm) || list.includes(base);
}

export function isReflexiveVerb(itemOrStr) {
  if (!itemOrStr) return false;
  const raw = typeof itemOrStr === "object" ? (itemOrStr.spanish || "") : String(itemOrStr);
  return parseVerb(raw).isReflexive;
}

export const PRETERITE_SPELL_CHANGERS_CAR_GAR_ZAR = [
  { spanish: "buscar", english: "to look for / to search", note: "c -> qu in yo (yo busqué)" },
  { spanish: "pagar", english: "to pay", note: "g -> gu in yo (yo pagué)" },
  { spanish: "almorzar", english: "to eat lunch", note: "z -> c in yo (yo almorcé)" },
  { spanish: "tocar", english: "to touch / play instrument", note: "c -> qu in yo (yo toqué)" },
  { spanish: "sacar", english: "to take out / take photos", note: "c -> qu in yo (yo saqué)" },
  { spanish: "practicar", english: "to practice", note: "c -> qu in yo (yo practiqué)" },
  { spanish: "explicar", english: "to explain", note: "c -> qu in yo (yo expliqué)" },
  { spanish: "pescar", english: "to fish", note: "c -> qu in yo (yo pesqué)" },
  { spanish: "secar", english: "to dry", note: "c -> qu in yo (yo sequé)" },
  { spanish: "llegar", english: "to arrive", note: "g -> gu in yo (yo llegué)" },
  { spanish: "jugar", english: "to play (sports/games)", note: "g -> gu in yo (yo jugué)" },
  { spanish: "regar", english: "to water plants", note: "g -> gu in yo (yo regué)" },
  { spanish: "apagar", english: "to turn off / extinguish", note: "g -> gu in yo (yo apagué)" },
  { spanish: "entregar", english: "to deliver / turn in", note: "g -> gu in yo (yo entregué)" },
  { spanish: "empezar", english: "to begin / start", note: "z -> c in yo (yo empecé)" },
  { spanish: "comenzar", english: "to start / commence", note: "z -> c in yo (yo comencé)" },
  { spanish: "cruzar", english: "to cross", note: "z -> c in yo (yo crucé)" },
  { spanish: "abrazar", english: "to hug / embrace", note: "z -> c in yo (yo abracé)" },
  { spanish: "organizar", english: "to organize", note: "z -> c in yo (yo organicé)" },
  { spanish: "alcanzar", english: "to reach / attain", note: "z -> c in yo (yo alcancé)" }
];

export const PRETERITE_STEM_CHANGERS_LIST = [
  { spanish: "sonreír", english: "to smile", note: "e -> i in 3rd person (él sonrió, ellos sonrieron)" },
  { spanish: "reír", english: "to laugh", note: "e -> i in 3rd person (él rió, ellos rieron)" },
  { spanish: "pedir", english: "to ask for / order", note: "e -> i in 3rd person (él pidió, ellos pidieron)" },
  { spanish: "servir", english: "to serve", note: "e -> i in 3rd person (él sirvió, ellos sirvieron)" },
  { spanish: "dormir", english: "to sleep", note: "o -> u in 3rd person (él durmió, ellos durmieron)" },
  { spanish: "morir", english: "to die", note: "o -> u in 3rd person (él murió, ellos murieron)" },
  { spanish: "preferir", english: "to prefer", note: "e -> i in 3rd person (él prefirió, ellos prefirieron)" },
  { spanish: "repetir", english: "to repeat", note: "e -> i in 3rd person (él repitió, ellos repitieron)" },
  { spanish: "seguir", english: "to follow / continue", note: "e -> i in 3rd person (él siguió, ellos siguieron)" },
  { spanish: "conseguir", english: "to get / obtain", note: "e -> i in 3rd person (él consiguió, ellos consiguieron)" },
  { spanish: "sentir", english: "to feel / regret", note: "e -> i in 3rd person (él sintió, ellos sintieron)" },
  { spanish: "vestir", english: "to dress", note: "e -> i in 3rd person (él vistió, ellos vistieron)" },
  { spanish: "desvestir", english: "to undress", note: "e -> i in 3rd person (él desvistió, ellos desvistieron)" },
  { spanish: "medir", english: "to measure", note: "e -> i in 3rd person (él midió, ellos midieron)" },
  { spanish: "despedir", english: "to say goodbye to / fire", note: "e -> i in 3rd person (él despidió, ellos despidieron)" },
  { spanish: "mentir", english: "to lie", note: "e -> i in 3rd person (él mintió, ellos mintieron)" },
  { spanish: "sugerir", english: "to suggest", note: "e -> i in 3rd person (él sugirió, ellos sugirieron)" }
];

export const PRETERITE_DOUBLE_VOWEL_LIST = [
  { spanish: "leer", english: "to read", note: "double vowel root (leí, leíste, leyó, leímos, leyeron)" },
  { spanish: "creer", english: "to believe / think", note: "double vowel root (creí, creíste, creyó, creyeron)" },
  { spanish: "oír", english: "to hear", note: "double vowel root (oí, oíste, oyó, oímos, oyeron)" },
  { spanish: "caer", english: "to fall", note: "double vowel root (caí, caíste, cayó, caímos, cayeron)" },
  { spanish: "caerse", english: "to fall down (reflexive)", note: "reflexive + double vowel (me caí, se cayó, se cayeron)" },
  { spanish: "poseer", english: "to possess / own", note: "double vowel root (poseí, poseyó, poseyeron)" },
  { spanish: "proveer", english: "to provide", note: "double vowel root (proveí, proveyó, proveyeron)" },
  { spanish: "destruir", english: "to destroy", note: "-uir verb: i -> y (destruí, destruyó, destruyeron)" },
  { spanish: "construir", english: "to build / construct", note: "-uir verb: i -> y (construí, construyó, construyeron)" },
  { spanish: "incluir", english: "to include", note: "-uir verb: i -> y (incluí, incluyó, incluyeron)" },
  { spanish: "contribuir", english: "to contribute", note: "-uir verb: i -> y (contribuí, contribuyó, contribuyeron)" },
  { spanish: "huir", english: "to flee / run away", note: "-uir verb: i -> y (huí, huyó, huyeron)" },
  { spanish: "concluir", english: "to conclude", note: "-uir verb: i -> y (concluí, concluyó, concluyeron)" }
];

export const REFLEXIVE_VERBS_PRACTICE_LIST = [
  { spanish: "levantarse", english: "to get up / stand up", note: "reflexive pronoun: me levanto, te levantas, se levanta..." },
  { spanish: "acostarse", english: "to go to bed", note: "stem-changing (o->ue): me acuesto, te acuestas; pret: me acosté" },
  { spanish: "despertarse", english: "to wake up", note: "stem-changing (e->ie): me despierto, te despiertas; pret: me desperté" },
  { spanish: "lavarse", english: "to wash oneself", note: "reflexive: me lavo, te lavas, se lava; pret: me lavé" },
  { spanish: "ducharse", english: "to take a shower", note: "daily routine: me ducho, te duchas, se ducha; pret: me duché" },
  { spanish: "bañarse", english: "to take a bath", note: "daily routine: me baño, te bañas, se baña; pret: me bañé" },
  { spanish: "cepillarse", english: "to brush oneself (teeth/hair)", note: "daily routine: me cepillo, te cepillas, se cepilla" },
  { spanish: "peinarse", english: "to comb one's hair", note: "daily routine: me peino, te peinas, se peina" },
  { spanish: "vestirse", english: "to get dressed", note: "e->i stem changer: me visto, te vistes; pret: se vistió" },
  { spanish: "desvestirse", english: "to get undressed", note: "e->i stem changer: me desvisto; pret: se desvistió" },
  { spanish: "ponerse", english: "to put on (clothes) / become", note: "yo me pongo; pret: me puse, se puso contento" },
  { spanish: "secarse", english: "to dry oneself", note: "yo form preterite spelling change: me sequé" },
  { spanish: "afeitarse", english: "to shave oneself", note: "daily routine: me afeito, te afeitas, se afeita" },
  { spanish: "maquillarse", english: "to put on makeup", note: "daily routine: me maquillo, te maquillas" },
  { spanish: "sentarse", english: "to sit down", note: "stem-changing (e->ie): me siento, te sientas; pret: me senté" },
  { spanish: "sentirse", english: "to feel (emotion/health)", note: "e->ie pres / e->i pret: me siento bien; se sintió mal" },
  { spanish: "dormirse", english: "to fall asleep", note: "o->ue pres / o->u pret: me duermo; él se durmió" },
  { spanish: "despedirse", english: "to say goodbye", note: "e->i stem changer: me despido; pret: se despidió" },
  { spanish: "divertirse", english: "to have fun / enjoy oneself", note: "e->ie pres / e->i pret: me divierto; se divirtió" },
  { spanish: "acordarse", english: "to remember", note: "stem-changing (o->ue): me acuerdo de..." },
  { spanish: "llamarse", english: "to be called / named", note: "me llamo, te llamas, se llama..." },
  { spanish: "caerse", english: "to fall down", note: "double vowel reflexive: me caigo; pret: se cayó" },
  { spanish: "reírse", english: "to laugh to oneself", note: "stem-changing reflexive: me río; pret: se rió" },
  { spanish: "sonreírse", english: "to smile to oneself", note: "stem-changing reflexive: me sonrío; pret: se sonrió" }
];

export const PRETERITE_RADICAL_IRREGULARS_LIST = [
  { spanish: "tener", english: "to have (preterite: had)", note: "U-stem: tuve, tuviste, tuvo, tuvimos, tuvieron" },
  { spanish: "estar", english: "to be (location/condition)", note: "U-stem: estuve, estuviste, estuvo, estuvimos, estuvieron" },
  { spanish: "andar", english: "to walk / wander", note: "U-stem: anduve, anduviste, anduvo, anduvimos, anduvieron" },
  { spanish: "poder", english: "to manage / succeed (in past)", note: "U-stem: pude, pudiste, pudo, pudimos, pudieron" },
  { spanish: "poner", english: "to put / place", note: "U-stem: puse, pusiste, puso, pusimos, pusieron" },
  { spanish: "saber", english: "to find out (in past)", note: "U-stem: supe, supiste, supo, supimos, supieron" },
  { spanish: "hacer", english: "to do / to make", note: "I-stem: hice, hiciste, hizo (z!), hicimos, hicieron" },
  { spanish: "querer", english: "to try / refuse (in past)", note: "I-stem: quise, quisiste, quiso, quisimos, quisieron" },
  { spanish: "venir", english: "to come", note: "I-stem: vine, viniste, vino, vinimos, vinieron" },
  { spanish: "decir", english: "to say / to tell", note: "J-stem: dije, dijiste, dijo, dijimos, dijeron (-eron!)" },
  { spanish: "traer", english: "to bring", note: "J-stem: traje, trajiste, trajo, trajimos, trajeron (-eron!)" },
  { spanish: "conducir", english: "to drive", note: "J-stem: conduje, condujiste, condujo, condujimos, condujeron (-eron!)" },
  { spanish: "dar", english: "to give", note: "unaccented: di, diste, dio, dimos, disteis, dieron" },
  { spanish: "ver", english: "to see", note: "unaccented: vi, viste, vio, vimos, visteis, vieron" },
  { spanish: "ir", english: "to go (shared with ser)", note: "fui, fuiste, fue, fuimos, fuisteis, fueron" },
  { spanish: "ser", english: "to be (shared with ir)", note: "fui, fuiste, fue, fuimos, fuisteis, fueron" }
];

export function getVerbPracticeCards(subcategory) {
  if (!subcategory) return [];
  const s = subcategory.toLowerCase();
  let list = [];
  let defaultUnit = "Unit 3: Nosotros preferimos ir de compras";

  if (s.includes("ortográfico") || s.includes("-car, -gar, -zar") || s.includes("spelling")) {
    list = PRETERITE_SPELL_CHANGERS_CAR_GAR_ZAR;
    defaultUnit = "Unit 3: Nosotros preferimos ir de compras";
  } else if (s.includes("cambio de raíz") || s.includes("e->i, o->u") || s.includes("stem")) {
    list = PRETERITE_STEM_CHANGERS_LIST;
    defaultUnit = "Unit 3: Nosotros preferimos ir de compras";
  } else if (s.includes("doble vocal") || s.includes("i -> y") || s.includes("double vowel")) {
    list = PRETERITE_DOUBLE_VOWEL_LIST;
    defaultUnit = "Unit 4: ¿Adónde fuiste de vacaciones?";
  } else if (s.includes("reflexivo") || s.includes("rutina") || s.includes("reflexive")) {
    list = REFLEXIVE_VERBS_PRACTICE_LIST;
    defaultUnit = "Unit 2: ¿Qué haces todos los días?";
  } else if (s.includes("raíces irregulares") || s.includes("u, i, j") || s.includes("radical")) {
    list = PRETERITE_RADICAL_IRREGULARS_LIST;
    defaultUnit = "Unit 4: ¿Adónde fuiste de vacaciones?";
  } else if (s.includes("todos") || s.includes("all verbs")) {
    list = [
      ...PRETERITE_SPELL_CHANGERS_CAR_GAR_ZAR,
      ...PRETERITE_STEM_CHANGERS_LIST,
      ...PRETERITE_DOUBLE_VOWEL_LIST,
      ...REFLEXIVE_VERBS_PRACTICE_LIST,
      ...PRETERITE_RADICAL_IRREGULARS_LIST
    ];
    defaultUnit = "Unit 3: Nosotros preferimos ir de compras";
  } else {
    return [];
  }

  // De-duplicate by spanish infinitive
  const seen = new Set();
  const result = [];
  for (const item of list) {
    if (!seen.has(item.spanish)) {
      seen.add(item.spanish);
      result.push({
        spanish: item.spanish,
        english: item.note ? `${item.english} (${item.note})` : item.english,
        category: "Verbs",
        subcategory: subcategory,
        unit: defaultUnit,
        isVerbPracticeDeck: true
      });
    }
  }
  return result;
}

export const TWIN_VERBS_LIST = [
  { spanish: "ser", english: "to be (preterite: was/were)", note: "fui, fuiste, fue, fuimos, fuisteis, fueron" },
  { spanish: "ir", english: "to go (preterite: went)", note: "fui, fuiste, fue, fuimos, fuisteis, fueron" },
  { spanish: "dar", english: "to give (preterite: gave)", note: "di, diste, dio, dimos, disteis, dieron" },
  { spanish: "ver", english: "to see (preterite: saw)", note: "vi, viste, vio, vimos, visteis, vieron" }
];

export const VERB_LAB_GROUPS = [
  // --- Present Tense (101) ---
  {
    id: "present_regular",
    labelEn: "Regular -ar, -er, -ir",
    labelEs: "Regulares -ar, -er, -ir",
    icon: "🟢",
    tense: "present",
    group: "present"
  },
  {
    id: "present_stem_ie",
    labelEn: "Stem-Changing (e ➔ ie)",
    labelEs: "Cambio de Raíz (e ➔ ie)",
    icon: "👢",
    tense: "present",
    group: "present"
  },
  {
    id: "present_stem_ue",
    labelEn: "Stem-Changing (o ➔ ue)",
    labelEs: "Cambio de Raíz (o ➔ ue)",
    icon: "👢",
    tense: "present",
    group: "present"
  },
  {
    id: "present_stem_i",
    labelEn: "Stem-Changing (e ➔ i)",
    labelEs: "Cambio de Raíz (e ➔ i)",
    icon: "👢",
    tense: "present",
    group: "present"
  },
  {
    id: "present_yo_go",
    labelEn: "\"Yo-Go\" & Irregular Yo",
    labelEs: "Verbos en \"-go\" y Yo Irregular",
    icon: "⚡",
    tense: "present",
    group: "present"
  },
  {
    id: "present_core_irreg",
    labelEn: "Core Irregulars (ser, estar, ir, dar, saber...)",
    labelEs: "Irregulares Puros (ser, estar, ir, dar...)",
    icon: "⭐",
    tense: "present",
    group: "present"
  },
  {
    id: "present_gustar",
    labelEn: "Verbs Structured Like Gustar",
    labelEs: "Verbos Tipo Gustar",
    icon: "❤️",
    tense: "present",
    group: "present"
  },

  // --- Reflexive Verbs ---
  {
    id: "reflexive_verbs",
    labelEn: "Reflexive & Daily Routine",
    labelEs: "Verbos Reflexivos y Rutina Diaria",
    icon: "🪞",
    tense: "both",
    group: "reflexive"
  },

  // --- Preterite / Past Tense ---
  {
    id: "pret_regular",
    labelEn: "Regular Preterite (-ar, -er, -ir)",
    labelEs: "Pretérito Regular (-ar, -er, -ir)",
    icon: "🟢",
    tense: "preterite",
    group: "preterite"
  },
  {
    id: "pret_car_gar_zar",
    labelEn: "Spell Change (-car, -gar, -zar)",
    labelEs: "Cambios Ortográficos (-car, -gar, -zar)",
    icon: "✏️",
    tense: "preterite",
    group: "preterite"
  },
  {
    id: "pret_sandal",
    labelEn: "Sandal Verbs (3rd-Person e➔i, o➔u)",
    labelEs: "Verbos Sandalia (3ª Persona)",
    icon: "👡",
    tense: "preterite",
    group: "preterite"
  },
  {
    id: "pret_double_vowel",
    labelEn: "Double Vowel (i ➔ y: leer, creer...)",
    labelEs: "Doble Vocal (i ➔ y: leer, creer...)",
    icon: "🌊",
    tense: "preterite",
    group: "preterite"
  },
  {
    id: "pret_radical_uij",
    labelEn: "Radical Stems: U, I, J (tuve, hice, dije...)",
    labelEs: "Raíces Irregulares: U, I, J",
    icon: "📦",
    tense: "preterite",
    group: "preterite"
  },
  {
    id: "pret_twins",
    labelEn: "Twin & Irregular Verbs (ser/ir, dar, ver)",
    labelEs: "Verbos Gemelos (ser/ir, dar, ver)",
    icon: "⭐",
    tense: "preterite",
    group: "preterite"
  },

  // --- Imperfect / Past Tense (Unidad 5) ---
  {
    id: "imp_regular",
    labelEn: "Regular Imperfect (-aba, -ía)",
    labelEs: "Imperfecto Regular (-aba, -ía)",
    icon: "📜",
    tense: "imperfect",
    group: "imperfect"
  },
  {
    id: "imp_irregulars",
    labelEn: "The 3 Irregulars (ser, ir, ver) & haber",
    labelEs: "Los 3 Irregulares (ser, ir, ver) y haber",
    icon: "👑",
    tense: "imperfect",
    group: "imperfect"
  }
];

export function getVerbsForGroups(groupIds = [], customVocab = []) {
  if (!Array.isArray(groupIds) || groupIds.length === 0) return [];

  const rawList = [];
  const selectedSet = new Set(groupIds);
  const vocab = Array.isArray(customVocab) ? customVocab : [];

  if (selectedSet.has("present_regular")) {
    const items = vocab
      .filter(item => ["Regular -ar Verbs", "Regular -er Verbs", "Regular -ir Verbs"].includes(item.subcategory))
      .map(item => ({ ...item, defaultTense: "present", verbGroup: "present_regular" }));
    rawList.push(...items);
  }

  if (selectedSet.has("present_stem_ie")) {
    const items = vocab
      .filter(item => item.subcategory === "Stem-Changing Verbs (e -> ie)")
      .map(item => ({ ...item, defaultTense: "present", verbGroup: "present_stem_ie" }));
    rawList.push(...items);
  }

  if (selectedSet.has("present_stem_ue")) {
    const items = vocab
      .filter(item => item.subcategory === "Stem-Changing Verbs (o -> ue)")
      .map(item => ({ ...item, defaultTense: "present", verbGroup: "present_stem_ue" }));
    rawList.push(...items);
  }

  if (selectedSet.has("present_stem_i")) {
    const items = vocab
      .filter(item => item.subcategory === "Stem-Changing Verbs (e -> i)")
      .map(item => ({ ...item, defaultTense: "present", verbGroup: "present_stem_i" }));
    rawList.push(...items);
  }

  if (selectedSet.has("present_yo_go")) {
    const items = vocab
      .filter(item => item.subcategory === "Irregular Yo Form Verbs")
      .map(item => ({ ...item, defaultTense: "present", verbGroup: "present_yo_go" }));
    rawList.push(...items);
  }

  if (selectedSet.has("present_core_irreg")) {
    const items = vocab
      .filter(item => ["Core Irregular Verbs", "Verbs for Knowing"].includes(item.subcategory))
      .map(item => ({ ...item, defaultTense: "present", verbGroup: "present_core_irreg" }));
    rawList.push(...items);
  }

  if (selectedSet.has("present_gustar")) {
    const items = vocab
      .filter(item => item.subcategory === "Verbs Structured Like Gustar")
      .map(item => ({ ...item, defaultTense: "present", verbGroup: "present_gustar" }));
    rawList.push(...items);
  }

  if (selectedSet.has("reflexive_verbs")) {
    const items = REFLEXIVE_VERBS_PRACTICE_LIST.map(item => ({
      spanish: item.spanish,
      english: item.english,
      category: "Verbs",
      subcategory: "Verbos Reflexivos y Rutina Diaria (Reflexive Verbs)",
      unit: "Unit 2: ¿Qué haces todos los días?",
      defaultTense: "both",
      verbGroup: "reflexive_verbs"
    }));
    rawList.push(...items);
  }

  if (selectedSet.has("pret_regular")) {
    const items = vocab
      .filter(item => ["Regular -ar Verbs", "Regular -er Verbs", "Regular -ir Verbs"].includes(item.subcategory))
      .map(item => ({
        ...item,
        defaultTense: "preterite",
        verbGroup: "pret_regular",
        english: item.english ? `${item.english} (preterite / past)` : item.english
      }));
    rawList.push(...items);
  }

  if (selectedSet.has("pret_car_gar_zar")) {
    const items = PRETERITE_SPELL_CHANGERS_CAR_GAR_ZAR.map(item => ({
      spanish: item.spanish,
      english: item.note ? `${item.english} (${item.note})` : item.english,
      category: "Verbs",
      subcategory: "Verbos en Pretérito: Cambios Ortográficos (-car, -gar, -zar)",
      unit: "Unit 3: Nosotros preferimos ir de compras",
      defaultTense: "preterite",
      verbGroup: "pret_car_gar_zar"
    }));
    rawList.push(...items);
  }

  if (selectedSet.has("pret_sandal")) {
    const items = PRETERITE_STEM_CHANGERS_LIST.map(item => ({
      spanish: item.spanish,
      english: item.note ? `${item.english} (${item.note})` : item.english,
      category: "Verbs",
      subcategory: "Verbos en Pretérito: Cambio de Raíz (e->i, o->u)",
      unit: "Unit 3: Nosotros preferimos ir de compras",
      defaultTense: "preterite",
      verbGroup: "pret_sandal"
    }));
    rawList.push(...items);
  }

  if (selectedSet.has("pret_double_vowel")) {
    const items = PRETERITE_DOUBLE_VOWEL_LIST.map(item => ({
      spanish: item.spanish,
      english: item.note ? `${item.english} (${item.note})` : item.english,
      category: "Verbs",
      subcategory: "Verbos en Pretérito: Doble Vocal (i -> y)",
      unit: "Unit 4: ¿Adónde fuiste de vacaciones?",
      defaultTense: "preterite",
      verbGroup: "pret_double_vowel"
    }));
    rawList.push(...items);
  }

  if (selectedSet.has("pret_radical_uij")) {
    const items = PRETERITE_RADICAL_IRREGULARS_LIST.map(item => ({
      spanish: item.spanish,
      english: item.note ? `${item.english} (${item.note})` : item.english,
      category: "Verbs",
      subcategory: "Verbos en Pretérito: Raíces Irregulares (U, I, J)",
      unit: "Unit 4: ¿Adónde fuiste de vacaciones?",
      defaultTense: "preterite",
      verbGroup: "pret_radical_uij"
    }));
    rawList.push(...items);
  }

  if (selectedSet.has("pret_twins")) {
    const items = TWIN_VERBS_LIST.map(item => ({
      spanish: item.spanish,
      english: item.note ? `${item.english} (${item.note})` : item.english,
      category: "Verbs",
      subcategory: "Twin Verbs (Irregular)",
      unit: "Unit 4: ¿Adónde fuiste de vacaciones?",
      defaultTense: "preterite",
      verbGroup: "pret_twins"
    }));
    rawList.push(...items);
  }

  if (selectedSet.has("imp_regular")) {
    const regularModels = [
      { spanish: "hablar", english: "to speak / talk (imperfect: hablaba...)" },
      { spanish: "comer", english: "to eat (imperfect: comía...)" },
      { spanish: "vivir", english: "to live (imperfect: vivía...)" },
      { spanish: "estudiar", english: "to study (imperfect: estudiaba...)" },
      { spanish: "jugar", english: "to play (imperfect: jugaba...)" },
      { spanish: "chatear", english: "to chat online (imperfect: chateaba...)" },
      { spanish: "teclear", english: "to type (imperfect: tecleaba...)" },
      { spanish: "descargar", english: "to download (imperfect: descargaba...)" },
      { spanish: "mirar", english: "to watch (imperfect: miraba...)" },
      { spanish: "escuchar", english: "to listen (imperfect: escuchaba...)" }
    ];
    const items = regularModels.map(item => ({
      spanish: item.spanish,
      english: item.english,
      category: "Unidad 5",
      subcategory: "El Tiempo Imperfecto",
      unit: "Unit 5: ¡Luces, cámara, acción!",
      defaultTense: "imperfect",
      verbGroup: "imp_regular"
    }));
    rawList.push(...items);
  }

  if (selectedSet.has("imp_irregulars")) {
    const irregModels = [
      { spanish: "ser", english: "to be (imperfect: era, eras, era, éramos, erais, eran)" },
      { spanish: "ir", english: "to go (imperfect: iba, ibas, iba, íbamos, ibais, iban)" },
      { spanish: "ver", english: "to see / watch (imperfect: veía, veías, veía, veíamos, veíais, veían)" },
      { spanish: "haber", english: "there was / there were (imperfect: había)" }
    ];
    const items = irregModels.map(item => ({
      spanish: item.spanish,
      english: item.english,
      category: "Unidad 5",
      subcategory: "El Tiempo Imperfecto",
      unit: "Unit 5: ¡Luces, cámara, acción!",
      defaultTense: "imperfect",
      verbGroup: "imp_irregulars"
    }));
    rawList.push(...items);
  }

  // De-duplicate by spanish infinitive + defaultTense so a verb selected in both present and preterite is distinct
  const seen = new Set();
  const result = [];
  for (const item of rawList) {
    const key = `${item.spanish.toLowerCase()}__${item.defaultTense || "any"}`;
    if (!seen.has(key)) {
      seen.add(key);
      result.push({
        ...item,
        category: "Verbs",
        isVerbPracticeDeck: true
      });
    }
  }

  return result;
}

const SUBJECT_PRONOUNS_CLEAN_REGEX = /^(yo|tú|él|ella|usted|nosotros|nosotras|vosotros|vosotras|ellos|ellas|ustedes)\s+/i;

export function cleanConjugationInput(userStr, correctStr) {
  if (!userStr || !correctStr) return false;
  const cleanUser = userStr.trim().replace(/[¿¡!?.“”"'()\-–—,;:]/g, "").replace(/\s+/g, " ");
  const cleanCorrect = correctStr.trim().replace(/[¿¡!?.“”"'()\-–—,;:]/g, "").replace(/\s+/g, " ");

  if (cleanUser.toLowerCase() === cleanCorrect.toLowerCase()) return true;

  // Try stripping subject pronoun prefix from user input
  const strippedUser = cleanUser.replace(SUBJECT_PRONOUNS_CLEAN_REGEX, "");
  if (strippedUser.toLowerCase() === cleanCorrect.toLowerCase()) return true;

  // Try stripping subject pronoun prefix from correct answer if present
  const strippedCorrect = cleanCorrect.replace(SUBJECT_PRONOUNS_CLEAN_REGEX, "");
  if (cleanUser.toLowerCase() === strippedCorrect.toLowerCase()) return true;
  if (strippedUser.toLowerCase() === strippedCorrect.toLowerCase()) return true;

  return false;
}

/**
 * Sanitizes an English gloss/meaning string for quiz presentation so that
 * parenthetical verb conjugations (e.g. "(yo hago)", "(yo salgo)"), irregular stems
 * (e.g. "(irregular preterite: conduj-)"), stem changes (e.g. "[u -> ue]", "(o -> ue)"),
 * or tense cues do not spoil the answer to the student during active quizzes.
 */
export function sanitizeMeaningForQuiz(text) {
  if (!text || typeof text !== "string") return text;
  return text
    // Remove parentheticals containing yo/tú/él conjugations, stems, or grammar notes
    .replace(/\s*\([^)]*(?:yo\s+[a-záéíóúñ]+|preterite|past\b|stem|irregular|e\s*->\s*[ie]|o\s*->\s*ue|u\s*->\s*ue|e\s*->\s*i|\b(?:hago|salgo|pongo|traigo|valgo|veo|oigo|conduzco|sé|conozco|estoy|soy|voy|digo|sigo|vengo|tengo|conduj-)\b)[^)]*\)/gi, "")
    // Remove square brackets containing stem changes or grammar notes
    .replace(/\s*\[[^\]]*(?:->|stem|irregular|yo)[^\]]*\]/gi, "")
    // Clean up multiple spaces or dangling slashes/hyphens
    .replace(/\s{2,}/g, " ")
    .replace(/\s*[/,-]\s*$/g, "")
    .trim();
}

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
    if (verbItem.subcategory?.includes("Imperfecto") || verbItem.english?.toLowerCase().includes("imperfect")) {
      targetTense = "imperfect";
    } else if (verbItem.subcategory?.includes("Pretérito") || verbItem.english?.toLowerCase().includes("preterite") || verbItem.english?.toLowerCase().includes("(past)")) {
      targetTense = "preterite";
    }
  }

  let tenseLabel = "Presente";
  if (targetTense === "imperfect") {
    tenseLabel = "Imperfecto (Past Tense)";
  } else if (targetTense === "preterite") {
    tenseLabel = "Pretérito (Past Tense)";
  }

  // SPECIAL: Verbs Structured Like Gustar
  // Gustar does NOT conjugate by pronoun (yo/tú/él). It tests singular vs plural with IOPs!
  if (isGustar) {
    const templates = GUSTAR_PRACTICE_TEMPLATES.filter(t => t.tense === targetTense);
    const pool = templates.length > 0 ? templates : GUSTAR_PRACTICE_TEMPLATES;
    const tpl = pool[Math.floor(Math.random() * pool.length)];
    
    let correct = "";
    let choices = [];
    if (tpl.tense === "imperfect") {
      correct = tpl.isPlural ? "gustaban" : "gustaba";
      choices = tpl.isPlural 
        ? ["gustaban", "gustaba", "gustaron", "gustan"] 
        : ["gustaba", "gustaban", "gustó", "gusta"];
    } else if (tpl.tense === "preterite") {
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
      pronoun: tpl.isPlural ? "Objeto Plural (¿gusta, gustó o gustaban?)" : "Objeto Singular / Verbo",
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

  // Generate plausible distractors
  const distractors = new Set();
  const alternateTense = targetTense === "imperfect" ? "preterite" : (targetTense === "preterite" ? "present" : "preterite");

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

    // Distractor source 2: Forms from the alternate tense (e.g. Present vs Preterite vs Imperfect confusion)
    for (let i = 0; i < 6; i++) {
      if (!(options.excludeVosotros && i === 4)) {
        distractors.add(conjugate(verbItem.spanish, i, alternateTense));
      }
    }

    // Distractor source 3: Wrong reflexive pronouns for reflexives
    if (isReflexive) {
      const wrongReflexive = REFLEXIVE_PRONOUNS[(randPronoun.idx + 2) % 6];
      distractors.add(`${wrongReflexive} ${conjugate(base, randPronoun.idx, targetTense)}${suffix}`);
      // Bare verb without reflexive pronoun (critical student distractor!)
      distractors.add(`${conjugate(base, randPronoun.idx, targetTense)}${suffix}`);
      // Another common wrong reflexive pronoun
      const wrongReflexive2 = randPronoun.idx === 0 ? "se" : (randPronoun.idx === 3 ? "te" : "me");
      distractors.add(`${wrongReflexive2} ${conjugate(base, randPronoun.idx, targetTense)}${suffix}`);
    }

    // Distractor source 4: Grammatical distractors for past tense special categories
    if (targetTense === "imperfect") {
      const normBase = base.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      // Add preterite equivalent as distractor (pretérito vs imperfecto confusion)
      distractors.add(conjugate(verbItem.spanish, randPronoun.idx, "preterite"));
      // Add cross-ending distractor (-ar with -ía, or -er/-ir with -aba)
      if (normBase.endsWith("ar")) {
        distractors.add(base.slice(0, -2) + IMP_ER_IR_ENDINGS[randPronoun.idx] + suffix);
      } else if (normBase.endsWith("er") || normBase.endsWith("ir")) {
        distractors.add(base.slice(0, -2) + IMP_AR_ENDINGS[randPronoun.idx] + suffix);
      }
    } else if (targetTense === "preterite") {
      const normBase = base.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      // Spell changers in yo form: unspelled regular form (e.g. buscé, pagé, almorzé)
      if (randPronoun.idx === 0) {
        if (normBase.endsWith("car") || normBase.endsWith("gar") || normBase.endsWith("zar")) {
          distractors.add(base.slice(0, -2) + "é" + suffix);
        }
      }
      // Preterite stem changers in 3rd person: un-stem-changed form (e.g. pedió, dormió, sonreió)
      if (randPronoun.idx === 2 || randPronoun.idx === 5) {
        if (isPreteriteStemChanger(base)) {
          const fakeEnding = randPronoun.idx === 2 ? "ió" : "ieron";
          distractors.add(base.slice(0, -2) + fakeEnding + suffix);
        }
      }
      // Preterite double vowel in 3rd person: un-y form (e.g. leió, creieron, caió)
      if (randPronoun.idx === 2 || randPronoun.idx === 5) {
        if (isPreteriteDoubleVowel(base)) {
          const fakeEnding = randPronoun.idx === 2 ? "ió" : "ieron";
          distractors.add(base.slice(0, -2) + fakeEnding + suffix);
        }
      }
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
    meaning: sanitizeMeaningForQuiz(verbItem.english),
    pronoun: pronounLabel,
    tense: targetTense,
    tenseLabel: tenseLabel,
    isReflexive,
    isReciprocal,
    isSpellChanger: isPreteriteSpellingChanger(verbItem) && targetTense === "preterite",
    isStemChangerPreterite: isPreteriteStemChanger(verbItem) && targetTense === "preterite",
    isDoubleVowel: isPreteriteDoubleVowel(verbItem) && targetTense === "preterite",
    isImperfect: targetTense === "imperfect",
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
      hint: "Verbo recíproco conjugado en presente para la 3ª persona plural."
    },
    "los dos amigos van a abrazarse con alegría": {
      blanked: "los dos amigos van a [_____] con alegría",
      correct: "abrazarse",
      choices: ["abrazarse", "se abrazan", "abrazar", "se abrazaron"],
      type: "verb",
      targetVerb: "abrazarse",
      tense: "present",
      hint: "Con perífrasis verbal ('ir a + infinitivo'), une el pronombre recíproco al final del infinitivo."
    },
    "los dos amigos corrieron para abrazarse con emoción": {
      blanked: "los dos amigos corrieron para [_____] con emoción",
      correct: "abrazarse",
      choices: ["abrazarse", "se abrazan", "abrazar", "se abrazaron"],
      type: "verb",
      targetVerb: "abrazarse",
      tense: "present",
      hint: "Después de una preposición ('para'), usa el infinitivo con el pronombre recíproco unido."
    },
    "a ellos les encanta abrazarse cuando hace frío": {
      blanked: "a ellos les encanta [_____] cuando hace frío",
      correct: "abrazarse",
      choices: ["abrazarse", "se abrazan", "abrazar", "se abrazaron"],
      type: "verb",
      targetVerb: "abrazarse",
      tense: "present",
      hint: "Después de un verbo como encantar, usa el infinitivo con el pronombre recíproco unido."
    },
    "ellos se besan antes de salir": {
      blanked: "ellos [_____] antes de salir",
      correct: "se besan",
      choices: ["se besan", "besarse", "besan", "se besaron"],
      type: "verb",
      targetVerb: "besarse",
      tense: "present",
      hint: "Verbo recíproco conjugado en presente para la 3ª persona plural."
    },
    "los novios quieren besarse en el parque": {
      blanked: "los novios quieren [_____] en el parque",
      correct: "besarse",
      choices: ["besarse", "se besan", "besar", "se besaron"],
      type: "verb",
      targetVerb: "besarse",
      tense: "present",
      hint: "Con dos verbos consecutivos ('querer + verbo'), el segundo verbo va en infinitivo con pronombre unido."
    },
    "los novios van a besarse en el altar": {
      blanked: "los novios van a [_____] en el altar",
      correct: "besarse",
      choices: ["besarse", "se besan", "besar", "se besaron"],
      type: "verb",
      targetVerb: "besarse",
      tense: "present",
      hint: "En la perífrasis 'ir a + infinitivo' sin pronombre previo, une el pronombre recíproco al final del infinitivo."
    },
    "a ellos les gusta besarse bajo la lluvia": {
      blanked: "a ellos les gusta [_____] bajo la lluvia",
      correct: "besarse",
      choices: ["besarse", "se besan", "besar", "se besaron"],
      type: "verb",
      targetVerb: "besarse",
      tense: "present",
      hint: "Después de la estructura con gustar, usa el infinitivo con el pronombre recíproco unido."
    },
    "nosotros vamos a besarnos antes de salir": {
      blanked: "nosotros vamos a [_____] antes de salir",
      correct: "besarnos",
      choices: ["besarnos", "besarse", "nos besamos", "besarme"],
      type: "verb",
      targetVerb: "besarse",
      tense: "present",
      hint: "Para nosotros tras la perífrasis, une el pronombre recíproco correspondiente al final del infinitivo."
    },
    "nosotros nos vamos a besar antes de salir": {
      blanked: "nosotros [_____] a besar antes de salir",
      correct: "nos vamos",
      choices: ["nos vamos", "vamos", "se van", "me voy"],
      type: "verb",
      targetVerb: "besarse",
      tense: "present",
      hint: "Coloca el pronombre recíproco de 1ª persona plural antes del verbo auxiliar conjugado."
    },
    "nosotros nos vamos a besar antes de salir (inf)": {
      blanked: "nosotros nos vamos a [_____] antes de salir",
      correct: "besar",
      choices: ["besar", "besarse", "besarnos", "besan"],
      type: "verb",
      targetVerb: "besarse",
      tense: "present",
      hint: "El pronombre ya está colocado antes del verbo conjugado; mantén el infinitivo simple sin duplicar el pronombre."
    },
    "los novios se van a besar en el altar": {
      blanked: "los novios [_____] a besar en el altar",
      correct: "se van",
      choices: ["se van", "van", "se va", "nos vamos"],
      type: "verb",
      targetVerb: "besarse",
      tense: "present",
      hint: "Coloca el pronombre recíproco de 3ª persona plural antes del verbo auxiliar conjugado."
    },
    "los novios se van a besar en el altar (inf)": {
      blanked: "los novios se van a [_____] en el altar",
      correct: "besar",
      choices: ["besar", "besarse", "besan", "besaron"],
      type: "verb",
      targetVerb: "besarse",
      tense: "present",
      hint: "El pronombre ya precede al verbo conjugado; mantén el infinitivo en su forma simple sin pronombre añadido."
    },
    "los novios se quieren besar en el parque": {
      blanked: "los novios se quieren [_____] en el parque",
      correct: "besar",
      choices: ["besar", "besarse", "besan", "se besan"],
      type: "verb",
      targetVerb: "besarse",
      tense: "present",
      hint: "El pronombre ya precede al verbo querer; usa el infinitivo simple sin duplicar el pronombre."
    },
    "nosotros nos debemos ayudar en la clase": {
      blanked: "nosotros nos debemos [_____] en la clase",
      correct: "ayudar",
      choices: ["ayudar", "ayudarnos", "ayudarse", "ayudamos"],
      type: "verb",
      targetVerb: "ayudarse",
      tense: "present",
      hint: "El pronombre ya está al inicio de la frase verbal; mantén el infinitivo simple sin pronombre añadido."
    },
    "los dos amigos se van a abrazar en el aeropuerto": {
      blanked: "los dos amigos [_____] a abrazar en el aeropuerto",
      correct: "se van",
      choices: ["se van", "van", "se va", "nos vamos"],
      type: "verb",
      targetVerb: "abrazarse",
      tense: "present",
      hint: "Coloca el pronombre recíproco de 3ª persona plural antes del verbo auxiliar conjugado."
    },
    "los dos amigos se van a abrazar en el aeropuerto (inf)": {
      blanked: "los dos amigos se van a [_____] en el aeropuerto",
      correct: "abrazar",
      choices: ["abrazar", "abrazarse", "abrazan", "abrazaron"],
      type: "verb",
      targetVerb: "abrazarse",
      tense: "present",
      hint: "El pronombre ya está antes del verbo auxiliar; mantén el infinitivo simple sin duplicarlo."
    },
    "nosotros nos vamos a abrazar con alegría": {
      blanked: "nosotros [_____] a abrazar con alegría",
      correct: "nos vamos",
      choices: ["nos vamos", "vamos", "se van", "me voy"],
      type: "verb",
      targetVerb: "abrazarse",
      tense: "present",
      hint: "Coloca el pronombre recíproco de 1ª persona plural antes del verbo auxiliar conjugado."
    },
    "nosotros nos vamos a abrazar con alegría (inf)": {
      blanked: "nosotros nos vamos a [_____] con alegría",
      correct: "abrazar",
      choices: ["abrazar", "abrazarnos", "abrazan", "abrazarse"],
      type: "verb",
      targetVerb: "abrazarse",
      tense: "present",
      hint: "El pronombre ya precede a la perífrasis verbal; usa el infinitivo simple sin pronombre adherido."
    },
    "nosotros vamos a abrazarnos con alegría": {
      blanked: "nosotros vamos a [_____] con alegría",
      correct: "abrazarnos",
      choices: ["abrazarnos", "abrazar", "abrazarse", "nos abrazamos"],
      type: "verb",
      targetVerb: "abrazarse",
      tense: "present",
      hint: "Sin pronombre previo a la perífrasis, une el pronombre recíproco de 1ª persona plural al final del infinitivo."
    },
    "los dos estudiantes se van a conocer hoy": {
      blanked: "los dos estudiantes [_____] a conocer hoy",
      correct: "se van",
      choices: ["se van", "van", "se va", "nos vamos"],
      type: "verb",
      targetVerb: "conocerse",
      tense: "present",
      hint: "Coloca el pronombre recíproco de 3ª persona plural antes de la forma conjugada de ir."
    },
    "los dos estudiantes se van a conocer hoy (inf)": {
      blanked: "los dos estudiantes se van a [_____] hoy",
      correct: "conocer",
      choices: ["conocer", "conocerse", "conocen", "conocieron"],
      type: "verb",
      targetVerb: "conocerse",
      tense: "present",
      hint: "El pronombre ya precede a la perífrasis verbal; mantén el infinitivo en su forma simple."
    },
    "nosotros nos queremos conocer mejor": {
      blanked: "nosotros [_____] conocer mejor",
      correct: "nos queremos",
      choices: ["nos queremos", "queremos", "se quieren", "me quiero"],
      type: "verb",
      targetVerb: "conocerse",
      tense: "present",
      hint: "Coloca el pronombre recíproco de 1ª persona plural antes del verbo querer conjugado."
    },
    "nosotros nos queremos conocer mejor (inf)": {
      blanked: "nosotros nos queremos [_____] mejor",
      correct: "conocer",
      choices: ["conocer", "conocernos", "conocen", "conocerse"],
      type: "verb",
      targetVerb: "conocerse",
      tense: "present",
      hint: "El pronombre ya antecede al verbo querer; usa el infinitivo simple sin pronombre añadido."
    },
    "nosotros queremos conocernos mejor": {
      blanked: "nosotros queremos [_____] mejor",
      correct: "conocernos",
      choices: ["conocernos", "conocer", "conocerse", "nos conocemos"],
      type: "verb",
      targetVerb: "conocerse",
      tense: "present",
      hint: "Une el pronombre recíproco de 1ª persona plural directamente al final del infinitivo."
    },
    "los amigos se van a despedir en la estación": {
      blanked: "los amigos [_____] a despedir en la estación",
      correct: "se van",
      choices: ["se van", "van", "se va", "nos vamos"],
      type: "verb",
      targetVerb: "despedirse",
      tense: "present",
      hint: "Coloca el pronombre recíproco de 3ª persona plural antes del verbo auxiliar conjugado."
    },
    "los amigos se van a despedir en la estación (inf)": {
      blanked: "los amigos se van a [_____] en la estación",
      correct: "despedir",
      choices: ["despedir", "despedirse", "despiden", "se despiden"],
      type: "verb",
      targetVerb: "despedirse",
      tense: "present",
      hint: "El pronombre ya está situado antes del verbo auxiliar; mantén el infinitivo simple."
    },
    "los amigos van a despedirse en la estación": {
      blanked: "los amigos van a [_____] en la estación",
      correct: "despedirse",
      choices: ["despedirse", "despedir", "se despiden", "despiden"],
      type: "verb",
      targetVerb: "despedirse",
      tense: "present",
      hint: "Sin pronombre antes de la perífrasis, une el pronombre recíproco de 3ª persona plural al final del infinitivo."
    },
    "nosotros nos tenemos que despedir ahora": {
      blanked: "nosotros nos tenemos que [_____] ahora",
      correct: "despedir",
      choices: ["despedir", "despedirnos", "despedirse", "nos despedimos"],
      type: "verb",
      targetVerb: "despedirse",
      tense: "present",
      hint: "El pronombre ya precede al verbo tener; usa el infinitivo simple sin duplicar el pronombre."
    },
    "nosotros tenemos que despedirnos ahora": {
      blanked: "nosotros tenemos que [_____] ahora",
      correct: "despedirnos",
      choices: ["despedirnos", "despedir", "despedirse", "nos despedimos"],
      type: "verb",
      targetVerb: "despedirse",
      tense: "present",
      hint: "Une el pronombre reflexivo/recíproco de 1ª persona plural al final del infinitivo tras 'que'."
    },
    "nosotros nos vamos a reunir en la cafetería": {
      blanked: "nosotros [_____] a reunir en la cafetería",
      correct: "nos vamos",
      choices: ["nos vamos", "vamos", "se van", "me voy"],
      type: "verb",
      targetVerb: "reunirse",
      tense: "present",
      hint: "Coloca el pronombre recíproco de 1ª persona plural antes del verbo auxiliar conjugado."
    },
    "nosotros nos vamos a reunir en la cafetería (inf)": {
      blanked: "nosotros nos vamos a [_____] en la cafetería",
      correct: "reunir",
      choices: ["reunir", "reunirnos", "reúnen", "reunirse"],
      type: "verb",
      targetVerb: "reunirse",
      tense: "present",
      hint: "El pronombre ya precede a la perífrasis verbal; usa el infinitivo simple."
    },
    "nosotros vamos a reunirnos en la cafetería": {
      blanked: "nosotros vamos a [_____] en la cafetería",
      correct: "reunirnos",
      choices: ["reunirnos", "reunir", "reunirse", "nos reunimos"],
      type: "verb",
      targetVerb: "reunirse",
      tense: "present",
      hint: "Une el pronombre recíproco de 1ª persona plural directamente al final del infinitivo."
    },
    "nosotros nos tenemos que ayudar con la tarea": {
      blanked: "nosotros nos tenemos que [_____] con la tarea",
      correct: "ayudar",
      choices: ["ayudar", "ayudarnos", "ayudan", "ayudarse"],
      type: "verb",
      targetVerb: "ayudarse",
      tense: "present",
      hint: "El pronombre ya precede al verbo tener; usa el infinitivo simple sin duplicar el pronombre."
    },
    "nosotros tenemos que ayudarnos con la tarea": {
      blanked: "nosotros tenemos que [_____] con la tarea",
      correct: "ayudarnos",
      choices: ["ayudarnos", "ayudar", "ayudarse", "nos ayudamos"],
      type: "verb",
      targetVerb: "ayudarse",
      tense: "present",
      hint: "Une el pronombre recíproco de 1ª persona plural directamente al final del infinitivo."
    },
    "yo me voy a acostar temprano esta noche": {
      blanked: "yo me voy a [_____] temprano esta noche",
      correct: "acostar",
      choices: ["acostar", "acostarme", "acuesto", "acostarse"],
      type: "verb",
      targetVerb: "acostarse",
      tense: "present",
      hint: "El pronombre reflexivo ya precede al verbo conjugado; mantén el infinitivo simple sin duplicarlo."
    },
    "yo voy a acostarme temprano esta noche": {
      blanked: "yo voy a [_____] temprano esta noche",
      correct: "acostarme",
      choices: ["acostarme", "acostar", "me acuesto", "acostarse"],
      type: "verb",
      targetVerb: "acostarse",
      tense: "present",
      hint: "Con perífrasis sin pronombre previo, une el pronombre reflexivo de 1ª persona singular al infinitivo."
    },
    "tú te tienes que lavar las manos antes de comer": {
      blanked: "tú te tienes que [_____] las manos antes de comer",
      correct: "lavar",
      choices: ["lavar", "lavarte", "lavas", "lavarse"],
      type: "verb",
      targetVerb: "lavarse",
      tense: "present",
      hint: "El pronombre reflexivo ya precede al verbo conjugado; mantén el infinitivo simple sin duplicarlo."
    },
    "tú tienes que lavarte las manos antes de comer": {
      blanked: "tú tienes que [_____] las manos antes de comer",
      correct: "lavarte",
      choices: ["lavarte", "lavar", "te lavas", "lavarse"],
      type: "verb",
      targetVerb: "lavarse",
      tense: "present",
      hint: "Con perífrasis sin pronombre previo, une el pronombre reflexivo de 2ª persona singular al infinitivo."
    },
    "los amigos se despiden en la estación": {
      blanked: "los amigos [_____] en la estación",
      correct: "se despiden",
      choices: ["se despiden", "despedirse", "despiden", "se despide"],
      type: "verb",
      targetVerb: "despedirse",
      tense: "present",
      hint: "Verbo recíproco conjugado en presente para la 3ª persona plural."
    },
    "antes de despedirse los estudiantes se dieron un abrazo": {
      blanked: "antes de [_____] los estudiantes se dieron un abrazo",
      correct: "despedirse",
      choices: ["despedirse", "se despiden", "despedir", "se despidieron"],
      type: "verb",
      targetVerb: "despedirse",
      tense: "present",
      hint: "Después de una preposición ('antes de'), el verbo recíproco va en infinitivo con su pronombre unido."
    },
    "nosotros nos ayudamos con la tarea de español": {
      blanked: "nosotros [_____] con la tarea de español",
      correct: "nos ayudamos",
      choices: ["nos ayudamos", "ayudarnos", "se ayudan", "ayudamos"],
      type: "verb",
      targetVerb: "ayudarse",
      tense: "present",
      hint: "Verbo recíproco conjugado en presente para la 1ª persona plural."
    },
    "nosotros debemos ayudarnos en la clase": {
      blanked: "nosotros debemos [_____] en la clase",
      correct: "ayudarnos",
      choices: ["ayudarnos", "nos ayudamos", "ayudarse", "ayudamos"],
      type: "verb",
      targetVerb: "ayudarse",
      tense: "present",
      hint: "Tras el verbo modal sin pronombre previo, une el pronombre recíproco de 1ª persona plural al infinitivo."
    },
    "es muy importante ayudarse entre compañeros": {
      blanked: "es muy importante [_____] entre compañeros",
      correct: "ayudarse",
      choices: ["ayudarse", "se ayudan", "ayudar", "nos ayudamos"],
      type: "verb",
      targetVerb: "ayudarse",
      tense: "present",
      hint: "En expresiones impersonales, usa el infinitivo con el pronombre reflexivo/recíproco general de 3ª persona."
    },
    "mis padres se conocieron en la universidad": {
      blanked: "mis padres [_____] en la universidad",
      correct: "se conocieron",
      choices: ["se conocieron", "conocerse", "se conocen", "conocieron"],
      type: "verb",
      targetVerb: "conocerse",
      tense: "preterite",
      hint: "Acción completada en el pasado con el pronombre recíproco y la terminación de pretérito para ellos."
    },
    "los dos estudiantes van a conocerse hoy": {
      blanked: "los dos estudiantes van a [_____] hoy",
      correct: "conocerse",
      choices: ["conocerse", "se conocen", "conocer", "se conocieron"],
      type: "verb",
      targetVerb: "conocerse",
      tense: "present",
      hint: "En la perífrasis 'ir a + infinitivo' sin pronombre previo, une el pronombre recíproco al final."
    },
    "los hermanos a veces se pelean por los juguetes": {
      blanked: "los hermanos a veces [_____] por los juguetes",
      correct: "se pelean",
      choices: ["se pelean", "pelearse", "pelean", "se pelea"],
      type: "verb",
      targetVerb: "pelearse",
      tense: "present",
      hint: "Verbo recíproco conjugado en presente correspondiente a ellos."
    },
    "después de pelearse los niños pidieron perdón": {
      blanked: "después de [_____] los niños pidieron perdón",
      correct: "pelearse",
      choices: ["pelearse", "se pelean", "pelear", "se pelearon"],
      type: "verb",
      targetVerb: "pelearse",
      tense: "present",
      hint: "Después de una preposición ('después de'), el verbo recíproco va en infinitivo con pronombre unido."
    },
    "yo me lavo las manos antes de comer": {
      blanked: "yo [_____] las manos antes de comer",
      correct: "me lavo",
      choices: ["me lavo", "lavarme", "te lavas", "se lava"],
      type: "verb",
      targetVerb: "lavarse",
      tense: "present",
      hint: "Verbo reflexivo regular en presente conjugado para la 1ª persona singular."
    },
    "yo me lavo las manos antes de comer (obj)": {
      blanked: "yo me lavo [_____] antes de comer",
      correct: "las manos",
      choices: ["las manos", "los dientes", "la chaqueta", "el pelo"],
      type: "noun",
      hint: "Identifica el objeto directo que indica la parte del cuerpo sobre la que recae la acción."
    },
    "yo necesito lavarme las manos": {
      blanked: "yo necesito [_____] las manos",
      correct: "lavarme",
      choices: ["lavarme", "me lavo", "lavarse", "lavar"],
      type: "verb",
      targetVerb: "lavarse",
      tense: "present",
      hint: "Con infinitivo tras verbo modal para 'yo', une el pronombre reflexivo de 1ª persona singular al final."
    },
    "antes de comer es necesario lavarse las manos": {
      blanked: "antes de comer es necesario [_____] las manos",
      correct: "lavarse",
      choices: ["lavarse", "se lava", "lavar", "me lavo"],
      type: "verb",
      targetVerb: "lavarse",
      tense: "present",
      hint: "En frases impersonales ('es necesario...'), usa el infinitivo con el pronombre reflexivo general de 3ª persona."
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
      hint: "Preposición requerida ante un objeto directo de persona específica."
    },
    "nosotros ayudamos a nuestros amigos": {
      blanked: "nosotros ayudamos [_____] nuestros amigos",
      correct: "a",
      choices: ["a", "de", "con", "por"],
      type: "preposition",
      hint: "Preposición requerida ante objetos directos humanos definidos."
    },
    "yo me despierto a las siete de la mañana": {
      blanked: "yo [_____] a las siete de la mañana",
      correct: "me despierto",
      choices: ["me despierto", "te despiertas", "se despierta", "nos despertamos"],
      type: "verb",
      targetVerb: "despertarse",
      tense: "present",
      hint: "Verbo reflexivo con cambio de raíz (e -> ie) conjugado para la 1ª persona singular."
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
      hint: "El verbo doler concuerda en singular con la parte del cuerpo afectada ('la garganta')."
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
      hint: "Acción recíproca entre amigos expresada con pronombre y verbo conjugado para ellos."
    },
    "ayer compré una camisa azul en la tienda": {
      blanked: "ayer [_____] una camisa azul en la tienda",
      correct: "compré",
      choices: ["compré", "compro", "compró", "compramos"],
      type: "verb",
      targetVerb: "comprar",
      tense: "preterite",
      hint: "Usa la terminación regular de 1ª persona singular para verbos en -ar en pretérito (-é)."
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
      hint: "Usa la forma irregular de 3ª persona singular en pretérito para el verbo ir."
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
      hint: "Verbos en -car cambian ortográficamente a -qué en la 1ª persona singular del pretérito."
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
      hint: "Usa la raíz irregular hic- de hacer con la terminación de 3ª persona plural en pretérito."
    },
    "yo le di la tarjeta de embarque al agente": {
      blanked: "yo le [_____] la tarjeta de embarque al agente",
      correct: "di",
      choices: ["di", "da", "dio", "dimos"],
      type: "verb",
      targetVerb: "dar",
      tense: "preterite",
      hint: "Forma irregular de pretérito de 1ª persona singular para dar (monosílabo sin tilde)."
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
      hint: "Usa la raíz irregular pud- de poder con la terminación de 1ª persona singular (-e)."
    },
    "ella tuvo que cancelar la reserva": {
      blanked: "ella [_____] que cancelar la reserva",
      correct: "tuvo",
      choices: ["tuvo", "tiene", "tuve", "tuvieron"],
      type: "verb",
      targetVerb: "tener",
      tense: "preterite",
      hint: "Usa la raíz irregular tuv- de tener con la terminación de 3ª persona singular (-o)."
    },
    "nosotros estuvimos en españa durante las vacaciones": {
      blanked: "nosotros [_____] en España durante las vacaciones",
      correct: "estuvimos",
      choices: ["estuvimos", "estamos", "estuvo", "estuvieron"],
      type: "verb",
      targetVerb: "estar",
      tense: "preterite",
      hint: "Usa la raíz irregular estuv- de estar con la terminación de 1ª persona plural (-imos)."
    },
    "ella me lo explicó con calma": {
      blanked: "ella me [_____] explicó con calma",
      correct: "lo",
      choices: ["lo", "la", "los", "las"],
      type: "pronoun",
      hint: "Identifica el pronombre de objeto directo masculino singular."
    },

    // Spanish 102 Direct Object Pronoun (DOP) sentence drills:
    "yo lo tengo en la mochila": {
      blanked: "yo [_____] tengo en la mochila",
      correct: "lo",
      choices: ["lo", "la", "los", "las"],
      type: "pronoun",
      hint: "Usa el pronombre de objeto directo masculino singular que sustituye a 'el pasaporte'."
    },
    "yo la compré ayer": {
      blanked: "yo [_____] compré ayer",
      correct: "la",
      choices: ["la", "lo", "las", "le"],
      type: "pronoun",
      hint: "Identifica el pronombre de objeto directo femenino singular."
    },
    "nosotros los vamos a guardar": {
      blanked: "nosotros [_____] vamos a guardar",
      correct: "los",
      choices: ["los", "las", "les", "lo"],
      type: "pronoun",
      hint: "Usa el pronombre de objeto directo masculino plural colocado antes de la perífrasis verbal."
    },
    "nosotros vamos a guardarlos": {
      blanked: "nosotros vamos a [_____]",
      correct: "guardarlos",
      choices: ["guardarlos", "guardar", "guardarlas", "guardarse"],
      type: "verb",
      targetVerb: "guardar",
      tense: "present",
      hint: "Con infinitivo, une el pronombre de objeto directo masculino plural al final del verbo."
    },
    "ella las encontró en la habitación": {
      blanked: "ella [_____] encontró en la habitación",
      correct: "las",
      choices: ["las", "los", "la", "les"],
      type: "pronoun",
      hint: "Identifica el pronombre de objeto directo femenino plural."
    },
    "el botones lo sube en el ascensor": {
      blanked: "el botones [_____] sube en el ascensor",
      correct: "lo",
      choices: ["lo", "la", "los", "le"],
      type: "pronoun",
      hint: "Usa el pronombre de objeto directo masculino singular que sustituye a 'el equipaje'."
    },
    "nosotros las queremos ver": {
      blanked: "nosotros [_____] queremos ver",
      correct: "las",
      choices: ["las", "los", "la", "les"],
      type: "pronoun",
      hint: "Usa el pronombre de objeto directo femenino plural colocado antes del verbo querer."
    },
    "nosotros queremos verlas": {
      blanked: "nosotros queremos [_____]",
      correct: "verlas",
      choices: ["verlas", "verlos", "verla", "ver"],
      type: "verb",
      targetVerb: "ver",
      tense: "present",
      hint: "Une el pronombre de objeto directo femenino plural al final del infinitivo."
    },
    "mi hermana las tiene": {
      blanked: "mi hermana [_____] tiene",
      correct: "las",
      choices: ["las", "los", "la", "le"],
      type: "pronoun",
      hint: "Identifica el pronombre de objeto directo femenino plural."
    },
    "nosotros lo encontramos cerca del centro": {
      blanked: "nosotros [_____] encontramos cerca del centro",
      correct: "lo",
      choices: ["lo", "la", "los", "le"],
      type: "pronoun",
      hint: "Usa el pronombre de objeto directo masculino singular que sustituye a 'el hotel'."
    },
    "yo te escucho claramente": {
      blanked: "yo [_____] escucho claramente",
      correct: "te",
      choices: ["te", "me", "le", "lo"],
      type: "pronoun",
      hint: "Usa el pronombre de objeto directo de 2ª persona singular (para 'tú')."
    },
    "el profesor nos ayuda con la lección": {
      blanked: "el profesor [_____] ayuda con la lección",
      correct: "nos",
      choices: ["nos", "les", "me", "se"],
      type: "pronoun",
      hint: "Pronombre de objeto directo de 1ª persona plural."
    },

    // Spanish 102 Indirect Object Pronouns (IOP) & Double Object Drills:
    "me dio un regalo": {
      blanked: "[_____] dio un regalo",
      correct: "me",
      choices: ["me", "le", "te", "lo"],
      type: "pronoun",
      hint: "Usa el pronombre de objeto indirecto que corresponde a la 1ª persona singular ('a mí')."
    },
    "te dije la verdad": {
      blanked: "[_____] dije la verdad",
      correct: "te",
      choices: ["te", "le", "me", "lo"],
      type: "pronoun",
      hint: "Usa el pronombre de objeto indirecto que corresponde a la 2ª persona singular ('a ti')."
    },
    "le di las maletas": {
      blanked: "[_____] di las maletas",
      correct: "le",
      choices: ["le", "les", "lo", "la"],
      type: "pronoun",
      hint: "Usa el pronombre de objeto indirecto de 3ª persona singular ('a él / ella')."
    },
    "nos mandaron los pasajes": {
      blanked: "[_____] mandaron los pasajes",
      correct: "nos",
      choices: ["nos", "les", "me", "los"],
      type: "pronoun",
      hint: "Pronombre de objeto indirecto de 1ª persona plural."
    },
    "les pidió un taxi": {
      blanked: "[_____] pidió un taxi",
      correct: "les",
      choices: ["les", "le", "los", "se"],
      type: "pronoun",
      hint: "Usa el pronombre de objeto indirecto de 3ª persona plural ('a ellos / ellas')."
    },
    "se lo compré": {
      blanked: "[_____] lo compré",
      correct: "se",
      choices: ["se", "le", "me", "te"],
      type: "pronoun",
      hint: "En combinación de pronombres, el indirecto de 3ª persona cambia por eufonía antes de un pronombre directo con l-."
    },
    "te lo presto": {
      blanked: "[_____] lo presto",
      correct: "te",
      choices: ["te", "me", "le", "se"],
      type: "pronoun",
      hint: "En combinación de pronombres, el indirecto de 2ª persona singular precede al pronombre de objeto directo."
    },
    "nos lo explicaron": {
      blanked: "[_____] lo explicaron",
      correct: "nos",
      choices: ["nos", "les", "me", "los"],
      type: "pronoun",
      hint: "En combinación de pronombres, el indirecto de 1ª persona plural precede al pronombre de objeto directo."
    },
    "yo le di la tarjeta de embarque al agente (iop)": {
      blanked: "yo [_____] di la tarjeta de embarque al agente",
      correct: "le",
      choices: ["le", "les", "lo", "la"],
      type: "pronoun",
      hint: "Usa el pronombre de objeto indirecto singular que corresponde al destinatario ('al agente')."
    },
    "el recepcionista nos dio la llave de la habitación (iop)": {
      blanked: "el recepcionista [_____] dio la llave de la habitación",
      correct: "nos",
      choices: ["nos", "les", "me", "los"],
      type: "pronoun",
      hint: "Usa el pronombre de objeto indirecto de 1ª persona plural."
    },
    "el botones les subió las maletas a los huéspedes": {
      blanked: "el botones [_____] subió las maletas a los huéspedes",
      correct: "les",
      choices: ["les", "le", "los", "se"],
      type: "pronoun",
      hint: "Usa el pronombre de objeto indirecto plural correspondiente al destinatario 'a los huéspedes'."
    },
    "ella va a mostrarme las fotos del viaje": {
      blanked: "ella va a [_____] las fotos del viaje",
      correct: "mostrarme",
      choices: ["mostrarme", "mostrarte", "mostrarle", "mostrar"],
      type: "verb",
      targetVerb: "mostrar",
      tense: "present",
      hint: "Con infinitivo tras perífrasis, une el pronombre indirecto de 1ª persona singular al final del verbo."
    },
    "ella me va a mostrar las fotos del viaje": {
      blanked: "ella [_____] va a mostrar las fotos del viaje",
      correct: "me",
      choices: ["me", "te", "le", "lo"],
      type: "pronoun",
      hint: "Coloca el pronombre de objeto indirecto de 1ª persona singular antes de la perífrasis verbal conjugada."
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
      sp.startsWith("el botones ") ||
      sp.startsWith("mi hermana ") ||
      sp.startsWith("el profesor ") ||
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
  } else if (targetKey === "los dos amigos se van a abrazar en el aeropuerto" && Math.random() > 0.5) {
    targetKey = "los dos amigos se van a abrazar en el aeropuerto (inf)";
  } else if (targetKey === "nosotros nos vamos a abrazar con alegría" && Math.random() > 0.5) {
    targetKey = "nosotros nos vamos a abrazar con alegría (inf)";
  } else if (targetKey === "los dos estudiantes se van a conocer hoy" && Math.random() > 0.5) {
    targetKey = "los dos estudiantes se van a conocer hoy (inf)";
  } else if (targetKey === "nosotros nos queremos conocer mejor" && Math.random() > 0.5) {
    targetKey = "nosotros nos queremos conocer mejor (inf)";
  } else if (targetKey === "los amigos se van a despedir en la estación" && Math.random() > 0.5) {
    targetKey = "los amigos se van a despedir en la estación (inf)";
  } else if (targetKey === "nosotros nos vamos a reunir en la cafetería" && Math.random() > 0.5) {
    targetKey = "nosotros nos vamos a reunir en la cafetería (inf)";
  } else if (targetKey === "yo le di la tarjeta de embarque al agente" && Math.random() > 0.5) {
    targetKey = "yo le di la tarjeta de embarque al agente (iop)";
  } else if (targetKey === "el recepcionista nos dio la llave de la habitación" && Math.random() > 0.5) {
    targetKey = "el recepcionista nos dio la llave de la habitación (iop)";
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

// -------------------------------------------------------------
// CONTRASTIVE QUESTIONS ENGINE ("Which One to Use When")
// Covers all 8 core contrast pairs from Spanish 101 Review & Units 2-4
// -------------------------------------------------------------
export const CONTRAST_QUESTIONS = {
  // UNIT 1: Repaso 101 (Saber vs Conocer, Ser vs Estar)
  1: [
    {
      contrastPair: "Saber vs Conocer",
      sentenceWithBlank: "Yo no [_____] la respuesta correcta a la pregunta.",
      englishMeaning: "I do not know the correct answer to the question.",
      choices: ["sé", "conozco", "sabe", "conocemos"],
      correct: "sé",
      ruleExplanation: "Use 'saber' for facts, data, or concrete information. The irregular 'yo' form is 'sé'.",
      ruleExplanationEs: "Usa 'saber' para hechos, datos o información concreta. La forma irregular en 'yo' es 'sé'."
    },
    {
      contrastPair: "Saber vs Conocer",
      sentenceWithBlank: "Nosotros [_____] a la nueva profesora de matemáticas.",
      englishMeaning: "We know the new female math teacher.",
      choices: ["conocemos", "sabemos", "conozco", "saben"],
      correct: "conocemos",
      ruleExplanation: "Use 'conocer' (+ personal 'a') to express familiarity or acquaintance with people or places.",
      ruleExplanationEs: "Usa 'conocer' (+ 'a' personal) para indicar familiaridad o conocimiento de personas y lugares."
    },
    {
      contrastPair: "Saber vs Conocer",
      sentenceWithBlank: "¿Tú [_____] tocar el piano o la guitarra?",
      englishMeaning: "Do you know how to play the piano or the guitar?",
      choices: ["sabes", "conoces", "sabe", "conoce"],
      correct: "sabes",
      ruleExplanation: "Use 'saber' (+ infinitive) to express learned skills or abilities ('to know how to do something').",
      ruleExplanationEs: "Usa 'saber' (+ infinitivo) para habilidades aprendidas ('to know how to do something')."
    },
    {
      contrastPair: "Ser vs Estar",
      sentenceWithBlank: "Mi hermano [_____] médico en el hospital general.",
      englishMeaning: "My brother is a doctor at the general hospital.",
      choices: ["es", "está", "son", "están"],
      correct: "es",
      ruleExplanation: "Use 'ser' for professions, identity, and essential characteristics.",
      ruleExplanationEs: "Usa 'ser' para profesiones, identidad y características esenciales."
    },
    {
      contrastPair: "Ser vs Estar",
      sentenceWithBlank: "La biblioteca [_____] al lado del centro de estudiantes.",
      englishMeaning: "The library is next to the student center.",
      choices: ["está", "es", "están", "son"],
      correct: "está",
      ruleExplanation: "Use 'estar' for geographical location and physical position, even of permanent buildings.",
      ruleExplanationEs: "Usa 'estar' para ubicación geográfica y posición física, incluso de edificios permanentes."
    },
    {
      contrastPair: "Ser vs Estar",
      sentenceWithBlank: "Hoy los estudiantes [_____] muy cansados por el examen.",
      englishMeaning: "Today the students are very tired because of the exam.",
      choices: ["están", "son", "está", "es"],
      correct: "están",
      ruleExplanation: "Use 'estar' for temporary, physical, or changing emotional conditions and states.",
      ruleExplanationEs: "Usa 'estar' para estados temporales, físicos o emocionales cambiantes."
    }
  ],

  // UNIT 2: Por vs Para, Recíproco vs Reflexivo
  2: [
    {
      contrastPair: "Por vs Para",
      sentenceWithBlank: "Estudié español [_____] dos horas anoche en mi habitación.",
      englishMeaning: "I studied Spanish for two hours last night in my room.",
      choices: ["por", "para"],
      correct: "por",
      ruleExplanation: "Use 'por' to express duration of time ('for 2 hours').",
      ruleExplanationEs: "Usa 'por' para expresar duración de tiempo ('for 2 hours')."
    },
    {
      contrastPair: "Por vs Para",
      sentenceWithBlank: "Tengo que entregar este ensayo [_____] el viernes a las tres.",
      englishMeaning: "I have to hand in this essay by Friday at three.",
      choices: ["para", "por"],
      correct: "para",
      ruleExplanation: "Use 'para' to indicate a specific deadline or due date ('by/for Friday').",
      ruleExplanationEs: "Usa 'para' para indicar una fecha límite o plazo específico ('by/for Friday')."
    },
    {
      contrastPair: "Por vs Para",
      sentenceWithBlank: "Pagué cuarenta dólares [_____] esta chaqueta de lana.",
      englishMeaning: "I paid forty dollars for this wool jacket.",
      choices: ["por", "para"],
      correct: "por",
      ruleExplanation: "Use 'por' to indicate exchanges, price, or money paid ('in exchange for').",
      ruleExplanationEs: "Usa 'por' para indicar intercambios, precios o dinero pagado (exchange / price)."
    },
    {
      contrastPair: "Por vs Para",
      sentenceWithBlank: "Compré este medicamento en la farmacia [_____] mi abuela.",
      englishMeaning: "I bought this medicine at the pharmacy for my grandmother.",
      choices: ["para", "por"],
      correct: "para",
      ruleExplanation: "Use 'para' to indicate the recipient or final beneficiary of an action ('for whom').",
      ruleExplanationEs: "Usa 'para' para indicar el receptor o beneficiario final de una acción (recipient / beneficiary)."
    },
    {
      contrastPair: "Por vs Para",
      sentenceWithBlank: "Hago ejercicio todas las mañanas [_____] tener buena salud.",
      englishMeaning: "I exercise every morning in order to have good health.",
      choices: ["para", "por"],
      correct: "para",
      ruleExplanation: "Use 'para' (+ infinitive) to express purpose or goal ('in order to').",
      ruleExplanationEs: "Usa 'para' (+ infinitivo) para expresar propósito o meta ('in order to' / purpose)."
    },
    {
      contrastPair: "Por vs Para",
      sentenceWithBlank: "La ambulancia llegó al hospital [_____] la autopista central.",
      englishMeaning: "The ambulance arrived at the hospital via/through the central highway.",
      choices: ["por", "para"],
      correct: "por",
      ruleExplanation: "Use 'por' to indicate the route, path, or means of transportation/communication ('through / by').",
      ruleExplanationEs: "Usa 'por' para indicar la ruta, vía o medio de transporte/comunicación ('through / by')."
    },
    {
      contrastPair: "Por vs Para",
      sentenceWithBlank: "El tren de alta velocidad sale [_____] Sevilla a las diez.",
      englishMeaning: "The high-speed train departs for Seville at ten.",
      choices: ["para", "por"],
      correct: "para",
      ruleExplanation: "Use 'para' to indicate the final physical destination of travel ('headed for / bound for').",
      ruleExplanationEs: "Usa 'para' para indicar el destino final de un viaje (destination: 'bound for')."
    },
    {
      contrastPair: "Por vs Para",
      sentenceWithBlank: "Tengo mucha fiebre y dolor de cabeza, [_____] eso no voy a trabajar.",
      englishMeaning: "I have a high fever and headache, that is why I am not going to work.",
      choices: ["por", "para"],
      correct: "por",
      ruleExplanation: "The fixed idiom is 'por eso' ('that is why / therefore').",
      ruleExplanationEs: "La locución fija es 'por eso' (that's why / therefore)."
    },
    {
      contrastPair: "Por vs Para",
      sentenceWithBlank: "Después de esperar en la clínica, [_____] fin me atendió el médico.",
      englishMeaning: "After waiting at the clinic, at last the doctor saw me.",
      choices: ["por", "para"],
      correct: "por",
      ruleExplanation: "The fixed expression is 'por fin' ('at last / finally').",
      ruleExplanationEs: "La expresión fija es 'por fin' (at last / finally)."
    },
    {
      contrastPair: "Por vs Para",
      sentenceWithBlank: "Llevo pastillas en mi bolso, [_____] si acaso me da alergia.",
      englishMeaning: "I carry pills in my bag, just in case my allergies act up.",
      choices: ["por", "para"],
      correct: "por",
      ruleExplanation: "The idiomatic phrase is 'por si acaso' ('just in case').",
      ruleExplanationEs: "La locución idiomática es 'por si acaso' (just in case)."
    },
    {
      contrastPair: "Por vs Para",
      sentenceWithBlank: "[_____] empezar, debes descansar y beber mucha agua tibia.",
      englishMeaning: "To begin with, you should rest and drink plenty of warm water.",
      choices: ["Para", "Por"],
      correct: "Para",
      ruleExplanation: "The fixed phrase is 'Para empezar' ('to begin with / for starters').",
      ruleExplanationEs: "La locución fija es 'Para empezar' (to begin with / for starters)."
    },
    {
      contrastPair: "Por vs Para",
      sentenceWithBlank: "A mi hermano no le gusta ir al dentista [_____] nada.",
      englishMeaning: "My brother does not like going to the dentist at all.",
      choices: ["para", "por"],
      correct: "para",
      ruleExplanation: "The emphatic negative idiom is 'para nada' ('not at all').",
      ruleExplanationEs: "La locución enfática negativa es 'para nada' (not at all)."
    },
    {
      contrastPair: "Por vs Para",
      sentenceWithBlank: "Este té de manzanilla caliente es [_____] mí.",
      englishMeaning: "This hot chamomile tea is for me.",
      choices: ["para", "por"],
      correct: "para",
      ruleExplanation: "Use 'para' with prepositional pronouns to indicate the recipient/opinion ('para mí' with accent).",
      ruleExplanationEs: "Usa 'para' con pronombres preposicionales para indicar el destinatario ('para mí' con tilde)."
    },
    {
      contrastPair: "Recíproco vs Reflexivo",
      sentenceWithBlank: "Los dos amigos se abrazaron el [_____] al otro al despedirse.",
      englishMeaning: "The two friends hugged each other upon saying goodbye.",
      choices: ["uno", "mismo", "propio", "otro"],
      correct: "uno",
      ruleExplanation: "The phrase 'el uno al otro' explicitly clarifies that the action is reciprocal between two subjects ('each other').",
      ruleExplanationEs: "La frase 'el uno al otro' clarifica explícitamente que la acción es recíproca entre dos sujetos."
    },
    {
      contrastPair: "Recíproco vs Reflexivo",
      sentenceWithBlank: "El paciente se miró a sí [_____] en el espejo del baño.",
      englishMeaning: "The patient looked at himself in the bathroom mirror.",
      choices: ["mismo", "uno", "otro", "propio"],
      correct: "mismo",
      ruleExplanation: "The phrase 'a sí mismo' clarifies that the action is reflexive (the subject acts on themselves).",
      ruleExplanationEs: "La frase 'a sí mismo' clarifica que la acción es reflexiva (el sujeto actúa sobre sí mismo)."
    }
  ],

  // UNIT 3: Direct Object Pronouns, Personal 'a', Preterite Stem-changers & Spelling
  3: [
    {
      contrastPair: "Objeto Directo vs Indirecto",
      sentenceWithBlank: "¿Lavaste los platos de la cocina? —Sí, ya [_____] lavé todos.",
      englishMeaning: "Did you wash the kitchen dishes? —Yes, I already washed them all.",
      choices: ["los", "les", "lo", "las"],
      correct: "los",
      ruleExplanation: "'Los platos' is masculine plural direct object; it is replaced exclusively by 'los' (never 'les').",
      ruleExplanationEs: "'Los platos' es el objeto directo masculino plural; se reemplaza únicamente por 'los' (nunca 'les')."
    },
    {
      contrastPair: "Objeto Directo vs Indirecto",
      sentenceWithBlank: "¿Sacaste la basura al contenedor? —Sí, mi hermano [_____] sacó anoche.",
      englishMeaning: "Did you take out the trash to the bin? —Yes, my brother took it out last night.",
      choices: ["la", "le", "lo", "las"],
      correct: "la",
      ruleExplanation: "'La basura' is feminine singular direct object; it is replaced by 'la'.",
      ruleExplanationEs: "'La basura' es objeto directo femenino singular; se reemplaza por 'la'."
    },
    {
      contrastPair: "Personal 'a'",
      sentenceWithBlank: "Ayer mi madre acompañó [_____] mi abuela al supermercado.",
      englishMeaning: "Yesterday my mother accompanied my grandmother to the supermarket.",
      choices: ["a", "— (sin preposición)", "con", "de"],
      correct: "a",
      ruleExplanation: "The personal 'a' is strictly required because the direct object is a specific person ('mi abuela').",
      ruleExplanationEs: "Se requiere obligatoriamente la 'a' personal porque el objeto directo es una persona específica ('mi abuela')."
    },
    {
      contrastPair: "Personal 'a'",
      sentenceWithBlank: "Nosotros limpiamos [_____] las mesas de la cafetería después de comer.",
      englishMeaning: "We cleaned the cafeteria tables after eating.",
      choices: ["— (sin preposición)", "a", "al", "para"],
      correct: "— (sin preposición)",
      ruleExplanation: "Do NOT use the personal 'a' when the direct object is an inanimate thing or object ('las mesas').",
      ruleExplanationEs: "NO se usa la 'a' personal cuando el objeto directo es una cosa u objeto inanimado ('las mesas')."
    },
    {
      contrastPair: "Personal 'a'",
      sentenceWithBlank: "Tía Rosa llevó [_____] su perrito Lucas a la clínica veterinaria.",
      englishMeaning: "Aunt Rosa took her little dog Lucas to the veterinary clinic.",
      choices: ["a", "— (sin preposición)", "en", "por"],
      correct: "a",
      ruleExplanation: "Use the personal 'a' when a household pet is treated as a beloved member of the family.",
      ruleExplanationEs: "Se utiliza la 'a' personal cuando el animal doméstico es considerado parte afectiva de la familia."
    },
    {
      contrastPair: "Pretérito: Cambio de Raíz",
      sentenceWithBlank: "En el restaurante elegante, el cliente [_____] salmón con verduras.",
      englishMeaning: "In the elegant restaurant, the customer ordered salmon with vegetables.",
      choices: ["pidió", "pedió", "pide", "pediste"],
      correct: "pidió",
      ruleExplanation: "Only -ir verbs stem-change in the preterite (e -> i) in the 3rd person: pedir -> pidió (never 'pedió').",
      ruleExplanationEs: "Solo los verbos -ir tienen cambio de raíz en el pretérito (e -> i) en 3ª persona: pedir -> pidió (nunca 'pedió')."
    },
    {
      contrastPair: "Pretérito: Cambio de Raíz",
      sentenceWithBlank: "Los camareros [_____] los platos principales con mucha rapidez.",
      englishMeaning: "The waiters served the main dishes very quickly.",
      choices: ["sirvieron", "servieron", "sirven", "servieronse"],
      correct: "sirvieron",
      ruleExplanation: "The verb servir (-ir) changes e -> i in the 3rd person plural of the preterite: sirvieron.",
      ruleExplanationEs: "El verbo servir (-ir) cambia e -> i en 3ª persona plural del pretérito: sirvieron."
    },
    {
      contrastPair: "Pretérito: Cambio de Raíz",
      sentenceWithBlank: "Anoche mi hermano pequeño [_____] diez horas seguidas en su cama.",
      englishMeaning: "Last night my little brother slept ten straight hours in his bed.",
      choices: ["durmió", "dormió", "duerme", "dormiste"],
      correct: "durmió",
      ruleExplanation: "Dormir changes o -> u in the 3rd person singular of the preterite: durmió (never 'dormió').",
      ruleExplanationEs: "Dormir cambia o -> u en la 3ª persona del singular del pretérito: durmió (nunca 'dormió')."
    },
    {
      contrastPair: "Pretérito: Sin Cambio en -ar/-er",
      sentenceWithBlank: "Nosotros devolvemos libros hoy, pero ayer ellos [_____] su ropa en la tienda.",
      englishMeaning: "We return books today, but yesterday they returned their clothes at the store.",
      choices: ["devolvieron", "devuelvieron", "devolvó", "devuelven"],
      correct: "devolvieron",
      ruleExplanation: "Key rule! Verbs in -ar and -er with present tense stem changes NEVER change stems in the preterite: devolvieron.",
      ruleExplanationEs: "¡Regla clave! Los verbos -ar y -er con cambio en presente NUNCA tienen cambio de raíz en pretérito: devolvieron."
    },
    {
      contrastPair: "Pretérito: Ortografía en Yo",
      sentenceWithBlank: "Ayer yo [_____] la ropa en efectivo en la caja registradora.",
      englishMeaning: "Yesterday I paid for the clothes in cash at the cash register.",
      choices: ["pagué", "pagé", "pagó", "pago"],
      correct: "pagué",
      ruleExplanation: "Verbs ending in -gar change g -> gu before 'e' in the 'yo' preterite form to maintain the hard /g/ sound: pagué.",
      ruleExplanationEs: "Los verbos en -gar cambian g -> gu delante de 'e' en la forma yo del pretérito para mantener el sonido /g/: pagué."
    },
    {
      contrastPair: "Pretérito: Ortografía en Yo",
      sentenceWithBlank: "Yo [_____] un buzón para depositar la carta durante media hora.",
      englishMeaning: "I looked for a mailbox to drop off the letter for half an hour.",
      choices: ["busqué", "buscé", "buscó", "busco"],
      correct: "busqué",
      ruleExplanation: "Verbs ending in -car change c -> qu in the 'yo' preterite form to maintain the /k/ sound: busqué.",
      ruleExplanationEs: "Los verbos en -car cambian c -> qu en la forma yo del pretérito para mantener el sonido /k/: busqué."
    },
    {
      contrastPair: "Devolver vs Volver",
      sentenceWithBlank: "Tengo que [_____] esta camisa apretada a la tienda de ropa.",
      englishMeaning: "I have to return this tight shirt to the clothing store.",
      choices: ["devolver", "volver"],
      correct: "devolver",
      ruleExplanation: "Use 'devolver' to return an item or money to a place/store. Use 'volver' for a person returning physically.",
      ruleExplanationEs: "Usa 'devolver' para devolver un objeto o dinero a su lugar. Usa 'volver' para el regreso físico de una persona."
    }
  ],

  // UNIT 4: To Become, To Realize, Double Object Pronouns (se lo), Irregular Preterites
  4: [
    {
      contrastPair: "To Become (Ponerse vs Volverse vs Hacerse)",
      sentenceWithBlank: "Cuando el recepcionista perdió la reservación, el huésped se [_____] furioso.",
      englishMeaning: "When the receptionist lost the reservation, the guest became furious.",
      choices: ["puso", "volvió", "hizo", "llegó"],
      correct: "puso",
      ruleExplanation: "Use 'ponerse' for sudden, temporary, and involuntary changes in emotional or physical state.",
      ruleExplanationEs: "Usa 'ponerse' para cambios de estado emocional o físico rápidos, pasajeros e involuntarios."
    },
    {
      contrastPair: "To Become (Ponerse vs Volverse vs Hacerse)",
      sentenceWithBlank: "Mi perro se [_____] completamente loco cuando escucha truenos fuertes.",
      englishMeaning: "My dog becomes completely crazy when he hears loud thunder.",
      choices: ["vuelve", "pone", "hace", "llega"],
      correct: "vuelve",
      ruleExplanation: "Use 'volverse' for radical transformations or drastic changes in behavior or mental disposition.",
      ruleExplanationEs: "Usa 'volverse' para transformaciones extremas o cambios drásticos de conducta o estado mental."
    },
    {
      contrastPair: "To Become (Ponerse vs Volverse vs Hacerse)",
      sentenceWithBlank: "Después de estudiar diez años en la facultad, ella se [_____] cirujana.",
      englishMeaning: "After studying ten years in medical school, she became a surgeon.",
      choices: ["hizo", "puso", "volvió", "dio"],
      correct: "hizo",
      ruleExplanation: "Use 'hacerse' for changes in profession, religion, or status requiring conscious effort, study, and time.",
      ruleExplanationEs: "Usa 'hacerse' para cambios de profesión o estatus que requieren esfuerzo consciente, estudio y tiempo."
    },
    {
      contrastPair: "To Realize (Darse cuenta vs Realizar)",
      sentenceWithBlank: "Solo me [_____] cuenta de que no tenía el pasaporte al llegar al aeropuerto.",
      englishMeaning: "I only realized that I didn't have my passport upon arriving at the airport.",
      choices: ["di", "realicé", "hice", "puse"],
      correct: "di",
      ruleExplanation: "Use 'darse cuenta de' to mentally realize or become aware of a fact ('me di cuenta').",
      ruleExplanationEs: "Usa 'darse cuenta de' para percatarse o darse cuenta mentalmente de un hecho ('me di cuenta')."
    },
    {
      contrastPair: "To Realize (Darse cuenta vs Realizar)",
      sentenceWithBlank: "El arquitecto [_____] su gran sueño de construir el hotel ecológico.",
      englishMeaning: "The architect fulfilled his great dream of building the eco-friendly hotel.",
      choices: ["realizó", "se dio cuenta de", "se puso", "se volvió"],
      correct: "realizó",
      ruleExplanation: "False cognate! 'Realizar' means to fulfill, carry out, or achieve a project or dream (to fulfill / achieve).",
      ruleExplanationEs: "¡Cognado falso! 'Realizar' significa cumplir, llevar a cabo o materializar un proyecto o sueño (to fulfill / achieve)."
    },
    {
      contrastPair: "Pronombres Dobles (se lo / se la)",
      sentenceWithBlank: "¿Le diste los billetes al turista? —Sí, ya [_____] di en el mostrador.",
      englishMeaning: "Did you give the tickets to the tourist? —Yes, I already gave them to him at the counter.",
      choices: ["se los", "le los", "les los", "se las"],
      correct: "se los",
      ruleExplanation: "Mandatory rule: When 'le' or 'les' appears before 'lo/la/los/las', it changes phonetically to 'se' ('se los', never 'le los').",
      ruleExplanationEs: "Regla obligatoria: Cuando 'le' o 'les' se encuentra antes de 'lo/la/los/las', cambia por fonética a 'se'."
    },
    {
      contrastPair: "Pronombres Dobles (se lo / se la)",
      sentenceWithBlank: "¿Nos puedes mostrar la escultura? —Sí, con gusto [_____] muestro ahora mismo.",
      englishMeaning: "Can you show us the sculpture? —Yes, gladly I will show it to you (plural) right now.",
      choices: ["se la", "nos la", "le la", "os lo"],
      correct: "se la",
      ruleExplanation: "'A ustedes' (indirect pronoun le/les) changes to 'se' before the direct object 'la' ('se la muestro').",
      ruleExplanationEs: "'A ustedes' (indirecto le/les) cambia a 'se' antes del objeto directo 'la' ('se la muestro')."
    },
    {
      contrastPair: "Posición de Pronombres",
      sentenceWithBlank: "Mamá tiene mi tarjeta de embarque y va a [_____] en el control de seguridad.",
      englishMeaning: "Mom has my boarding pass and is going to give it to me at security.",
      choices: ["dármela", "darle la", "darsela", "me la dar"],
      correct: "dármela",
      ruleExplanation: "When attaching two pronouns to the end of an infinitive, keep Indirect + Direct order and add a written accent: dármela.",
      ruleExplanationEs: "Al adjuntar dos pronombres al final de un infinitivo, se conserva el orden Indirecto + Directo y se añade tilde: dármela."
    },
    {
      contrastPair: "Pretérito Irregular Radical",
      sentenceWithBlank: "Ayer nosotros [_____] por toda la ciudad histórica durante tres horas.",
      englishMeaning: "Yesterday we walked throughout the historic city for three hours.",
      choices: ["anduvimos", "andamos", "anduvisteis", "andaron"],
      correct: "anduvimos",
      ruleExplanation: "The verb andar has the irregular preterite stem 'anduv-': anduvimos (no written accent).",
      ruleExplanationEs: "El verbo andar tiene raíz irregular 'anduv-' en pretérito: anduvimos (sin tilde)."
    },
    {
      contrastPair: "Pretérito Irregular Radical",
      sentenceWithBlank: "El conductor del taxi [_____] con mucho cuidado hacia el aeropuerto.",
      englishMeaning: "The taxi driver drove very carefully toward the airport.",
      choices: ["condujo", "condució", "conduje", "condujeron"],
      correct: "condujo",
      ruleExplanation: "Verbs ending in -ducir have 'j' stems in the preterite: condujo (3rd person singular, no written accent).",
      ruleExplanationEs: "Los verbos en -ducir tienen raíz en 'j' en el pretérito: condujo (3ª pers. sing. sin tilde)."
    }
  ],

  // UNIT 5: Pretérito vs Imperfecto, Indefinite vs Negative Words, Comparatives (Tan/Tanto vs Más/Menos)
  5: [
    {
      contrastPair: "Pretérito vs Imperfecto",
      sentenceWithBlank: "Cuando era niña, yo siempre [_____] los dibujos animados en el televisor.",
      englishMeaning: "When I was a little girl, I always used to watch cartoons on the television.",
      choices: ["veía", "vi", "veo", "vería"],
      correct: "veía",
      ruleExplanation: "Childhood routine with 'siempre' expresses a habitual past action, requiring the imperfect form.",
      ruleExplanationEs: "La rutina en la niñez con 'siempre' expresa una acción habitual en el pasado, exigiendo el imperfecto."
    },
    {
      contrastPair: "Pretérito vs Imperfecto",
      sentenceWithBlank: "Ayer mi hermano [_____] una película de horror en el cine.",
      englishMeaning: "Yesterday my brother watched a horror movie at the movie theater.",
      choices: ["vio", "veía", "ve", "veían"],
      correct: "vio",
      ruleExplanation: "Specific completed action in the past ('ayer') requires the preterite tense.",
      ruleExplanationEs: "Una acción completada en un momento específico ('ayer') requiere el tiempo pretérito."
    },
    {
      contrastPair: "Pretérito vs Imperfecto",
      sentenceWithBlank: "En aquellos tiempos, nosotros [_____] películas en la tienda de videos todos los viernes.",
      englishMeaning: "In those days, we used to rent movies at the video store every Friday.",
      choices: ["alquilábamos", "alquilamos", "alquilaron", "alquilaban"],
      correct: "alquilábamos",
      ruleExplanation: "Repetitive habitual past actions with 'en aquellos tiempos' and 'todos los viernes' use imperfect -ar ending (-ábamos).",
      ruleExplanationEs: "Las acciones habituales con 'en aquellos tiempos' y 'todos los viernes' usan imperfecto en -ábamos."
    },
    {
      contrastPair: "Pretérito vs Imperfecto (Irregulares: Ser)",
      sentenceWithBlank: "Cuando mi abuelo [_____] niño, no existían los teléfonos inteligentes.",
      englishMeaning: "When my grandfather was a boy, smartphones did not exist.",
      choices: ["era", "fue", "es", "sería"],
      correct: "era",
      ruleExplanation: "Describing background conditions or age/identity in childhood uses the imperfect of ser.",
      ruleExplanationEs: "Describir condiciones de fondo o la niñez en el pasado usa el imperfecto de ser."
    },
    {
      contrastPair: "Pretérito vs Imperfecto (Irregulares: Ir)",
      sentenceWithBlank: "Cada verano, mi familia y yo [_____] a la playa en coche.",
      englishMeaning: "Every summer, my family and I used to go to the beach by car.",
      choices: ["íbamos", "fuimos", "vamos", "ibais"],
      correct: "íbamos",
      ruleExplanation: "Recurring summer trips ('cada verano') express habitual past action, requiring the imperfect of ir with accent on 'í'.",
      ruleExplanationEs: "Viajes recurrentes ('cada verano') expresan hábito en el pasado, requiriendo el imperfecto de ir con tilde en la 'í'."
    },
    {
      contrastPair: "Pretérito vs Imperfecto (Haber)",
      sentenceWithBlank: "En los años noventa no [_____] tabletas electrónicas.",
      englishMeaning: "In the 1990s there were no electronic tablets.",
      choices: ["había", "hubo", "hay", "habían"],
      correct: "había",
      ruleExplanation: "Impersonal ongoing past existence ('there was / there were') uses the singular imperfect form.",
      ruleExplanationEs: "La existencia continua en el pasado ('había') se usa únicamente en forma singular."
    },
    {
      contrastPair: "Palabras Indefinidas vs Negativas",
      sentenceWithBlank: "¿Viste a [_____] conocido en el cine? No, no vi a nadie.",
      englishMeaning: "Did you see anyone you know at the cinema? No, I didn't see anyone.",
      choices: ["alguien", "nadie", "algo", "nada"],
      correct: "alguien",
      ruleExplanation: "Affirmative questions asking about a person use the indefinite personal pronoun.",
      ruleExplanationEs: "Las preguntas afirmativas sobre personas usan el pronombre indefinido correspondiente."
    },
    {
      contrastPair: "Palabras Indefinidas vs Negativas",
      sentenceWithBlank: "No tengo [_____] en los bolsillos de mi chaqueta.",
      englishMeaning: "I have nothing in the pockets of my jacket.",
      choices: ["nada", "algo", "alguien", "nadie"],
      correct: "nada",
      ruleExplanation: "Following a negative verb ('no tengo'), use the negative pronoun referring to inanimate things.",
      ruleExplanationEs: "Tras un verbo negado ('no tengo'), se usa el pronombre negativo para cosas inanimadas."
    },
    {
      contrastPair: "Doble Negación en Español",
      sentenceWithBlank: "[_____] compra periódicos impresos en la calle hoy en día.",
      englishMeaning: "Nobody buys printed newspapers on the street nowadays.",
      choices: ["Nadie", "Alguien", "Ninguno", "Nada"],
      correct: "Nadie",
      ruleExplanation: "When a negative word precedes the verb as the grammatical subject, 'no' is omitted.",
      ruleExplanationEs: "Cuando la palabra negativa antecede al verbo como sujeto, se omite el 'no'."
    },
    {
      contrastPair: "Algún / Ningún (Apócope)",
      sentenceWithBlank: "No tengo [_____] libro electrónico en mi nueva tableta.",
      englishMeaning: "I do not have any e-book on my new tablet.",
      choices: ["ningún", "ninguno", "ninguna", "alguno"],
      correct: "ningún",
      ruleExplanation: "Before a masculine singular noun ('libro'), the negative adjective shortens and adds a written accent.",
      ruleExplanationEs: "Delante de un sustantivo masculino singular ('libro'), el adjetivo negativo se apocopa con tilde."
    },
    {
      contrastPair: "También vs Tampoco",
      sentenceWithBlank: "Yo no uso las redes sociales y mi abuelo no las usa [_____].",
      englishMeaning: "I don't use social networks and my grandfather doesn't use them either.",
      choices: ["tampoco", "también", "nada", "nunca"],
      correct: "tampoco",
      ruleExplanation: "To agree with a negative statement ('neither / not either'), use this negative adverb.",
      ruleExplanationEs: "Para concordar con una declaración negativa ('not either'), se usa este adverbio negativo."
    },
    {
      contrastPair: "Comparaciones de Igualdad (Tan vs Tanto)",
      sentenceWithBlank: "Un enfermero es [_____] importante como un médico en el hospital.",
      englishMeaning: "A nurse is as important as a doctor in the hospital.",
      choices: ["tan", "tanto", "tanta", "más"],
      correct: "tan",
      ruleExplanation: "For comparisons of equality with adjectives or adverbs, use the invariant modifier before 'como'.",
      ruleExplanationEs: "Para comparaciones de igualdad con adjetivos o adverbios, se usa la forma invariable antes de 'como'."
    },
    {
      contrastPair: "Comparaciones de Igualdad (Concordancia de Tanto)",
      sentenceWithBlank: "El músico tiene [_____] instrumentos como el cantante.",
      englishMeaning: "The musician has as many instruments as the singer.",
      choices: ["tantos", "tan", "tanto", "tantas"],
      correct: "tantos",
      ruleExplanation: "When modifying a masculine plural noun ('instrumentos'), match gender and number before 'como'.",
      ruleExplanationEs: "Al modificar a un sustantivo masculino plural ('instrumentos'), concuerda en género y número antes de 'como'."
    },
    {
      contrastPair: "Comparaciones con Números",
      sentenceWithBlank: "Ese portátil de última generación cuesta [_____] quinientos dólares.",
      englishMeaning: "That latest-generation laptop costs more than five hundred dollars.",
      choices: ["más de", "más que", "tan", "como"],
      correct: "más de",
      ruleExplanation: "When expressing comparative inequality with numerical quantities or figures, use this prepositional comparative.",
      ruleExplanationEs: "Al expresar desigualdad comparativa con cifras numéricas, se usa la preposición correspondiente."
    }
  ]
};

/**
 * Generates a focused contrastive decision question for the current stage and level.
 */
export function generateContrastQuestion(stageVal, _levelVal) {
  const pool = CONTRAST_QUESTIONS[stageVal] || CONTRAST_QUESTIONS[1] || [];
  if (pool.length === 0) return null;

  const chosen = pool[Math.floor(Math.random() * pool.length)];
  return {
    isContrastDecision: true,
    isCardIntro: false,
    isConjugation: false,
    isFillInTheBlank: false,
    isSentenceBuilder: false,
    contrastPair: chosen.contrastPair,
    questionWord: chosen.sentenceWithBlank,
    context: chosen.englishMeaning,
    meaning: chosen.englishMeaning,
    prompt: "Choose the correct option according to the rule of " + chosen.contrastPair + ":",
    correct: chosen.correct,
    choices: [...chosen.choices].sort(() => Math.random() - 0.5),
    ruleExplanation: chosen.ruleExplanation,
    ruleExplanationEs: chosen.ruleExplanationEs || chosen.ruleExplanation,
    hint: chosen.ruleExplanation
  };
}

// -------------------------------------------------------------
// CATEGORIZED IRREGULAR & REGULAR VERBS FOR CONJUGATION HELPER
// Separated cleanly by tense:
// - Present Tense: Boot Stem Changers (e->ie, o->ue, e->i), "Yo-Go" Verbs, "-zco" Verbs, Core Irregulars, Regular Models
// - Preterite Tense: Radical U-Group, I-Group, J-Group, Spell Changers (-car/-gar/-zar), Sandal Verbs, Twin Verbs, Double Vowels, Regular Models
// -------------------------------------------------------------

export const PRESENT_VERB_CATEGORIES = [
  {
    id: "boot_stem_change",
    labelEn: "👢 Boot Verbs (Stem Change)",
    labelEs: "👢 Verbos Bota (Cambio de Raíz)",
    badge: "Bota",
    color: "#a855f7",
    ruleEn: "Present Boot Verbs: The vowel changes in all singular forms (yo, tú, él/ella) and ellos/ellas (forming a boot shape). The nosotros and vosotros forms NEVER change their stem!",
    ruleEs: "Verbos Bota en Presente: La vocal cambia en todas las formas singulares (yo, tú, él) y ellos (en forma de bota). ¡Nosotros y vosotros NUNCA cambian su raíz!",
    subcategories: [
      {
        id: "boot_e_ie",
        label: "e ➔ ie",
        ruleEn: "Stem changes e -> ie in present boot forms (yo pienso, tú piensas, él piensa, ellos piensan). Nosotros (pensamos) and vosotros (pensáis) do not change.",
        ruleEs: "Cambio e -> ie en las formas de la bota (pienso, piensas, piensa, piensan). Nosotros (pensamos) y vosotros (pensáis) no cambian.",
        verbs: [
          { verb: "pensar", stem: "e ➔ ie (pienso)", meaning: "to think" },
          { verb: "cerrar", stem: "e ➔ ie (cierro)", meaning: "to close" },
          { verb: "entender", stem: "e ➔ ie (entiendo)", meaning: "to understand" },
          { verb: "empezar", stem: "e ➔ ie (empiezo)", meaning: "to begin / start" },
          { verb: "comenzar", stem: "e ➔ ie (comienzo)", meaning: "to start" },
          { verb: "querer", stem: "e ➔ ie (quiero)", meaning: "to want / love" },
          { verb: "preferir", stem: "e ➔ ie (prefiero)", meaning: "to prefer" },
          { verb: "sentir", stem: "e ➔ ie (siento)", meaning: "to feel" },
          { verb: "perder", stem: "e ➔ ie (pierdo)", meaning: "to lose" },
          { verb: "despertar", stem: "e ➔ ie (despierto)", meaning: "to wake up" }
        ]
      },
      {
        id: "boot_o_ue",
        label: "o ➔ ue (u ➔ ue)",
        ruleEn: "Stem changes o -> ue (or u -> ue in jugar) in present boot forms (yo puedo, tú puedes, él puede, ellos pueden). Nosotros (podemos) and vosotros (podéis) do not change.",
        ruleEs: "Cambio o -> ue (o u -> ue en jugar) en las formas de la bota (puedo, puedes, puede, pueden). Nosotros (podemos) y vosotros (podéis) no cambian.",
        verbs: [
          { verb: "poder", stem: "o ➔ ue (puedo)", meaning: "to be able / can" },
          { verb: "dormir", stem: "o ➔ ue (duermo)", meaning: "to sleep" },
          { verb: "almorzar", stem: "o ➔ ue (almuerzo)", meaning: "to eat lunch" },
          { verb: "volver", stem: "o ➔ ue (vuelvo)", meaning: "to return (person)" },
          { verb: "devolver", stem: "o ➔ ue (devuelvo)", meaning: "to return (object)" },
          { verb: "jugar", stem: "u ➔ ue (juego)", meaning: "to play (game/sport)" },
          { verb: "costar", stem: "o ➔ ue (cuesta)", meaning: "to cost" },
          { verb: "recordar", stem: "o ➔ ue (recuerdo)", meaning: "to remember" },
          { verb: "encontrar", stem: "o ➔ ue (encuentro)", meaning: "to find" },
          { verb: "acostar", stem: "o ➔ ue (acuesto)", meaning: "to lie down" }
        ]
      },
      {
        id: "boot_e_i",
        label: "e ➔ i",
        ruleEn: "Stem changes e -> i in present boot forms (yo pido, tú pides, él pide, ellos piden). Nosotros (pedimos) and vosotros (pedís) do not change.",
        ruleEs: "Cambio e -> i en las formas de la bota (pido, pides, pide, piden). Nosotros (pedimos) y vosotros (pedís) no cambian.",
        verbs: [
          { verb: "pedir", stem: "e ➔ i (pido)", meaning: "to ask for / order" },
          { verb: "servir", stem: "e ➔ i (sirvo)", meaning: "to serve" },
          { verb: "repetir", stem: "e ➔ i (repito)", meaning: "to repeat" },
          { verb: "seguir", stem: "e ➔ i (sigo)", meaning: "to follow / continue" },
          { verb: "conseguir", stem: "e ➔ i (consigo)", meaning: "to get / obtain" },
          { verb: "vestir", stem: "e ➔ i (visto)", meaning: "to dress / wear" },
          { verb: "medir", stem: "e ➔ i (mido)", meaning: "to measure" },
          { verb: "despedir", stem: "e ➔ i (despido)", meaning: "to say goodbye / fire" }
        ]
      }
    ]
  },
  {
    id: "yo_go",
    labelEn: "⚡ \"Yo-Go\" Verbs",
    labelEs: "⚡ Verbos en \"-go\"",
    badge: "Yo en -go",
    color: "#f59e0b",
    ruleEn: "Irregular 'Yo' in -go: The first-person singular ends in -go (hago, pongo, salgo, traigo). Verbs like tener, venir, and decir also have boot stem changes in tú, él, ellos.",
    ruleEs: "Verbos con 'Yo' irregular en -go: La primera persona singular termina en -go (hago, pongo, salgo, traigo). Verbos como tener, venir y decir además cambian de raíz en la bota.",
    verbs: [
      { verb: "tener", stem: "tengo / e ➔ ie", meaning: "to have" },
      { verb: "poner", stem: "yo pongo", meaning: "to put / place" },
      { verb: "hacer", stem: "yo hago", meaning: "to do / make" },
      { verb: "salir", stem: "yo salgo", meaning: "to leave / go out" },
      { verb: "venir", stem: "vengo / e ➔ ie", meaning: "to come" },
      { verb: "traer", stem: "yo traigo", meaning: "to bring" },
      { verb: "decir", stem: "digo / e ➔ i", meaning: "to say / tell" },
      { verb: "oír", stem: "oigo / y", meaning: "to hear" },
      { verb: "valer", stem: "yo valgo", meaning: "to be worth" }
    ]
  },
  {
    id: "yo_zco",
    labelEn: "🎭 \"-zco\" Verbs (-cer/-cir)",
    labelEs: "🎭 Verbos en \"-zco\"",
    badge: "Yo en -zco",
    color: "#8b5cf6",
    ruleEn: "Verbs ending in vowel + -cer/-cir change c -> zc only in the 'yo' form (yo conozco, yo conduzco, yo traduzco) to preserve a soft sound before 'o'. All other forms follow regular -er/-ir endings (conoces, conduce).",
    ruleEs: "Verbos en vocal + -cer/-cir cambian c -> zc solo en la forma 'yo' (yo conozco, yo conduzco, yo traduzco). El resto son regulares (conoces, conduce).",
    verbs: [
      { verb: "conocer", stem: "yo conozco", meaning: "to know / meet (person/place)" },
      { verb: "conducir", stem: "yo conduzco", meaning: "to drive" },
      { verb: "traducir", stem: "yo traduzco", meaning: "to translate" },
      { verb: "producir", stem: "yo produzco", meaning: "to produce" }
    ]
  },
  {
    id: "core_irregulars",
    labelEn: "⭐ Core Irregulars",
    labelEs: "⭐ Irregulares Puros",
    badge: "Irregulares",
    color: "#06b6d4",
    ruleEn: "Highly irregular verbs with unique stems, endings, or accent patterns throughout the present tense: ser, estar, ir, dar, ver, saber, and haber.",
    ruleEs: "Verbos altamente irregulares con raíces, terminaciones o acentos únicos en el presente: ser, estar, ir, dar, ver, saber y haber.",
    verbs: [
      { verb: "ser", stem: "soy, eres, es...", meaning: "to be (essence/traits)" },
      { verb: "estar", stem: "estoy, estás, está...", meaning: "to be (location/state)" },
      { verb: "ir", stem: "voy, vas, va...", meaning: "to go" },
      { verb: "dar", stem: "doy, das, da...", meaning: "to give" },
      { verb: "ver", stem: "veo, ves, ve...", meaning: "to see / watch" },
      { verb: "saber", stem: "sé, sabes, sabe...", meaning: "to know (facts/info)" },
      { verb: "haber", stem: "he, has, ha / hay...", meaning: "to have (auxiliary) / there is" }
    ]
  },
  {
    id: "regulars",
    labelEn: "🟢 Regular Models",
    labelEs: "🟢 Modelos Regulares",
    badge: "Regular",
    color: "#10b981",
    ruleEn: "Regular Verbs: Follow standard, predictable -ar (-o, -as, -a, -amos, -áis, -an), -er (-o, -es, -e, -emos, -éis, -en), and -ir (-o, -es, -e, -imos, -ís, -en) ending patterns.",
    ruleEs: "Verbos Regulares: Siguen patrones estándar de -ar, -er e -ir en el presente.",
    verbs: [
      { verb: "hablar", stem: "Regular -ar", meaning: "to speak / talk" },
      { verb: "comer", stem: "Regular -er", meaning: "to eat" },
      { verb: "vivir", stem: "Regular -ir", meaning: "to live" }
    ]
  }
];

export const PRETERITE_VERB_CATEGORIES = [
  {
    id: "u_group",
    labelEn: "📦 U-Group (Radical)",
    labelEs: "📦 Grupo U (Radical)",
    badge: "U-Stem",
    color: "#3b82f6",
    ruleEn: "Preterite Radical U-Stem: takes special endings with NO ACCENTS (-e, -iste, -o, -imos, -isteis, -ieron).",
    ruleEs: "Pretérito Raíz U: terminaciones especiales SIN ACENTOS (-e, -iste, -o, -imos, -isteis, -ieron).",
    verbs: [
      { verb: "tener", stem: "tuv-", meaning: "to have" },
      { verb: "estar", stem: "estuv-", meaning: "to be (state/loc)" },
      { verb: "poder", stem: "pud-", meaning: "to be able / can" },
      { verb: "poner", stem: "pus-", meaning: "to put / place" },
      { verb: "saber", stem: "sup-", meaning: "to know (facts)" },
      { verb: "andar", stem: "anduv-", meaning: "to walk" },
      { verb: "haber", stem: "hub-", meaning: "there was / had" }
    ]
  },
  {
    id: "i_group",
    labelEn: "⚡ I-Group (Radical)",
    labelEs: "⚡ Grupo I (Radical)",
    badge: "I-Stem",
    color: "#eab308",
    ruleEn: "Preterite Radical I-Stem: takes endings with NO ACCENTS (-e, -iste, -o, -imos, -isteis, -ieron). Note: hacer becomes 'hizo' in él/ella/usted to preserve the /s/ sound.",
    ruleEs: "Pretérito Raíz I: terminaciones SIN ACENTOS (-e, -iste, -o, -imos, -isteis, -ieron). Nota: hacer cambia a 'hizo' en 3ª persona.",
    verbs: [
      { verb: "hacer", stem: "hic- / hiz-", meaning: "to do / make" },
      { verb: "querer", stem: "quis-", meaning: "to want / tried" },
      { verb: "venir", stem: "vin-", meaning: "to come" }
    ]
  },
  {
    id: "j_group",
    labelEn: "🎯 J-Group (Radical)",
    labelEs: "🎯 Grupo J (Radical)",
    badge: "J-Stem",
    color: "#f97316",
    ruleEn: "Preterite Radical J-Stem: takes endings with NO ACCENTS, and DROPS the 'i' in ellos/ellas/ustedes: -eron (dijeron, trajeron, condujeron - never -ieron)!",
    ruleEs: "Pretérito Raíz J: terminaciones SIN ACENTOS y PIERDEN la 'i' en ellos: -eron (dijeron, trajeron, condujeron).",
    verbs: [
      { verb: "decir", stem: "dij-", meaning: "to say / tell" },
      { verb: "traer", stem: "traj-", meaning: "to bring" },
      { verb: "conducir", stem: "conduj-", meaning: "to drive" },
      { verb: "traducir", stem: "traduj-", meaning: "to translate" },
      { verb: "producir", stem: "produj-", meaning: "to produce" }
    ]
  },
  {
    id: "spell_change",
    labelEn: "✏️ Spell Change (-car/-gar/-zar)",
    labelEs: "✏️ Ortográficos (-car/-gar/-zar)",
    badge: "Ortografía",
    color: "#ec4899",
    ruleEn: "Spelling Change in Preterite: ONLY in the 'yo' form to preserve original consonant sounds: -car -> qué, -gar -> gué, -zar -> cé. All other forms are regular.",
    ruleEs: "Cambio Ortográfico en Pretérito: SOLO en la forma 'yo': -car -> qué, -gar -> gué, -zar -> cé. El resto son regulares.",
    subcategories: [
      {
        id: "car",
        label: "-car (c ➔ qu)",
        ruleEn: "Verbs in -car change c -> qu before 'e' (yo busqué)",
        ruleEs: "Verbos en -car cambian c -> qu delante de 'e' (yo busqué)",
        verbs: [
          { verb: "buscar", stem: "c ➔ qu (yo busqué)", meaning: "to search / look for" },
          { verb: "practicar", stem: "c ➔ qu (yo practiqué)", meaning: "to practice" },
          { verb: "tocar", stem: "c ➔ qu (yo toqué)", meaning: "to play / touch" },
          { verb: "sacar", stem: "c ➔ qu (yo saqué)", meaning: "to take out" },
          { verb: "explicar", stem: "c ➔ qu (yo expliqué)", meaning: "to explain" }
        ]
      },
      {
        id: "gar",
        label: "-gar (g ➔ gu)",
        ruleEn: "Verbs in -gar change g -> gu before 'e' (yo pagué)",
        ruleEs: "Verbos en -gar cambian g -> gu delante de 'e' (yo pagué)",
        verbs: [
          { verb: "pagar", stem: "g ➔ gu (yo pagué)", meaning: "to pay" },
          { verb: "llegar", stem: "g ➔ gu (yo llegué)", meaning: "to arrive" },
          { verb: "jugar", stem: "g ➔ gu (yo jugué)", meaning: "to play (sport/game)" },
          { verb: "apagar", stem: "g ➔ gu (yo apagué)", meaning: "to turn off" },
          { verb: "regar", stem: "g ➔ gu (yo regué)", meaning: "to water (plants)" }
        ]
      },
      {
        id: "zar",
        label: "-zar (z ➔ c)",
        ruleEn: "Verbs in -zar change z -> c before 'e' (yo empecé)",
        ruleEs: "Verbos en -zar cambian z -> c delante de 'e' (yo empecé)",
        verbs: [
          { verb: "empezar", stem: "z ➔ c (yo empecé)", meaning: "to begin / start" },
          { verb: "comenzar", stem: "z ➔ c (yo comencé)", meaning: "to start" },
          { verb: "almorzar", stem: "z ➔ c (yo almorcé)", meaning: "to eat lunch" },
          { verb: "cruzar", stem: "z ➔ c (yo crucé)", meaning: "to cross" },
          { verb: "organizar", stem: "z ➔ c (yo organicé)", meaning: "to organize" }
        ]
      }
    ]
  },
  {
    id: "sandal",
    labelEn: "👡 Sandal Verbs (3rd Person)",
    labelEs: "👡 Verbos Sandalia (3ª Persona)",
    badge: "Sandalia",
    color: "#a855f7",
    ruleEn: "Preterite Sandal Verbs: ONLY -ir verbs change their stem in the preterite, and ONLY in the 3rd person (él: -ió, ellos: -ieron) with e->i or o->u. Yo, tú, nosotros, and vosotros use standard regular endings!",
    ruleEs: "Verbos Sandalia en Pretérito: ¡SOLO los verbos -ir cambian de raíz en pretérito, y SOLO en 3ª persona (él: -ió, ellos: -ieron) con e->i u o->u! Las demás formas son regulares.",
    subcategories: [
      {
        id: "sandal_ei",
        label: "Sandal (e ➔ i)",
        ruleEn: "-ir verbs with e -> i in 3rd person (él pidió, ellos pidieron)",
        ruleEs: "Verbos -ir con e -> i en 3ª persona (él pidió, ellos pidieron)",
        verbs: [
          { verb: "pedir", stem: "e ➔ i (pidió, pidieron)", meaning: "to ask for / order" },
          { verb: "servir", stem: "e ➔ i (sirvió, sirvieron)", meaning: "to serve" },
          { verb: "preferir", stem: "e ➔ i (prefirió, prefirieron)", meaning: "to prefer" },
          { verb: "repetir", stem: "e ➔ i (repitió, repitieron)", meaning: "to repeat" },
          { verb: "seguir", stem: "e ➔ i (siguió, siguieron)", meaning: "to follow / continue" },
          { verb: "sentir", stem: "e ➔ i (sintió, sintieron)", meaning: "to feel" },
          { verb: "vestir", stem: "e ➔ i (vistió, vistieron)", meaning: "to dress / wear" }
        ]
      },
      {
        id: "sandal_ou",
        label: "Sandal (o ➔ u)",
        ruleEn: "-ir verbs with o -> u in 3rd person (él durmió, ellos durmieron)",
        ruleEs: "Verbos -ir con o -> u en 3ª persona (él durmió, ellos durmieron)",
        verbs: [
          { verb: "dormir", stem: "o ➔ u (durmió, durmieron)", meaning: "to sleep" },
          { verb: "morir", stem: "o ➔ u (murió, murieron)", meaning: "to die" }
        ]
      }
    ]
  },
  {
    id: "twin_verbs",
    labelEn: "⭐ Twin Verbs (Irregular)",
    labelEs: "⭐ Verbos Gemelos",
    badge: "Gemelos",
    color: "#06b6d4",
    ruleEn: "Core Irregulars: Ser and Ir share identical forms in the preterite (fui, fuiste, fue...). Dar and Ver share parallel preterite endings with NO ACCENTS (di/vi, dio/vio).",
    ruleEs: "Irregulares Puros: Ser e Ir comparten conjugación idéntica en pretérito (fui, fuiste, fue...). Dar y Ver tienen formas paralelas SIN ACENTOS (di/vi, dio/vio).",
    verbs: [
      { verb: "ser", stem: "fui, fuiste, fue...", meaning: "to be (essence/traits)" },
      { verb: "ir", stem: "fui, fuiste, fue...", meaning: "to go" },
      { verb: "dar", stem: "di, diste, dio...", meaning: "to give" },
      { verb: "ver", stem: "vi, viste, vio...", meaning: "to see / watch" }
    ]
  },
  {
    id: "double_vowel",
    labelEn: "🌊 Double Vowel (i ➔ y)",
    labelEs: "🌊 Doble Vocal (i ➔ y)",
    badge: "i ➔ y",
    color: "#818cf8",
    ruleEn: "Intervocalic i -> y: Unstressed 'i' becomes 'y' in 3rd person (él leyó, ellos leyeron; oyó, creyó, destruyó). Other forms carry written accents.",
    ruleEs: "i intervocálica -> y: La 'i' átona cambia a 'y' en 3ª persona (él leyó, ellos leyeron; oyó, creyó, destruyó).",
    verbs: [
      { verb: "leer", stem: "i ➔ y (leyó, leyeron)", meaning: "to read" },
      { verb: "creer", stem: "i ➔ y (creyó, creyeron)", meaning: "to believe" },
      { verb: "oír", stem: "i ➔ y (oyó, oyeron)", meaning: "to hear" },
      { verb: "caer", stem: "i ➔ y (cayó, cayeron)", meaning: "to fall" },
      { verb: "destruir", stem: "i ➔ y (destruyó, destruyeron)", meaning: "to destroy" }
    ]
  },
  {
    id: "regulars",
    labelEn: "🟢 Regular Models",
    labelEs: "🟢 Modelos Regulares",
    badge: "Regular",
    color: "#10b981",
    ruleEn: "Regular Preterite Verbs: Follow standard -ar (-é, -aste, -ó, -amos, -asteis, -aron) and -er/-ir (-í, -iste, -ió, -imos, -isteis, -ieron) patterns with written accents on yo and él/ella.",
    ruleEs: "Verbos Regulares: Patrones estándar de pretérito en -ar y -er/-ir con acentos escritos en yo y él/ella.",
    verbs: [
      { verb: "hablar", stem: "Regular -ar", meaning: "to speak / talk" },
      { verb: "comer", stem: "Regular -er", meaning: "to eat" },
      { verb: "vivir", stem: "Regular -ir", meaning: "to live" }
    ]
  }
];

export const IMPERFECT_VERB_CATEGORIES = [
  {
    id: "imp_irregulars",
    labelEn: "👑 The 3 Irregulars: ser, ir, ver (+ haber)",
    labelEs: "👑 Los 3 Irregulares: ser, ir, ver (+ haber)",
    badge: "Irregulares",
    color: "#ef4444",
    ruleEn: "In the Imperfect tense, there are ONLY three irregular verbs in all of Spanish: ser (era...), ir (iba...), and ver (veía...), plus haber (había).",
    ruleEs: "En el imperfecto SOLO hay tres verbos irregulares en todo el idioma: ser (era...), ir (iba...) y ver (veía...), más haber (había).",
    verbs: [
      { verb: "ser", stem: "era, eras, era, éramos, erais, eran", meaning: "to be (descriptions, identity, time, age in past)" },
      { verb: "ir", stem: "iba, ibas, iba, íbamos, ibais, iban", meaning: "to go (habitual past movement, was going)" },
      { verb: "ver", stem: "veía, veías, veía, veíamos, veíais, veían", meaning: "to see / watch (habitual viewing, was watching)" },
      { verb: "haber", stem: "había (strictly singular)", meaning: "there was / there were (ongoing past existence)" }
    ]
  },
  {
    id: "imp_ar_regulars",
    labelEn: "🟢 Regular -ar Verbs (-aba)",
    labelEs: "🟢 Regulares -ar (-aba)",
    badge: "-AR",
    color: "#10b981",
    ruleEn: "Regular -ar verbs in the imperfect: add -aba, -abas, -aba, -ábamos, -abais, -aban. Note: only nosotros carries a written accent (-ábamos).",
    ruleEs: "Verbos regulares en -ar en imperfecto: añaden -aba, -abas, -aba, -ábamos, -abais, -aban. Nota: solo nosotros lleva tilde (-ábamos).",
    verbs: [
      { verb: "hablar", stem: "hablaba, hablabas, hablaba...", meaning: "to speak / talk" },
      { verb: "jugar", stem: "jugaba, jugabas, jugaba...", meaning: "to play" },
      { verb: "estudiar", stem: "estudiaba, estudiabas, estudiaba...", meaning: "to study" },
      { verb: "chatear", stem: "chateaba, chateabas, chateaba...", meaning: "to chat online" },
      { verb: "mirar", stem: "miraba, mirabas, miraba...", meaning: "to watch / look at" },
      { verb: "escuchar", stem: "escuchaba, escuchabas, escuchaba...", meaning: "to listen" },
      { verb: "usar", stem: "usaba, usabas, usaba...", meaning: "to use" }
    ]
  },
  {
    id: "imp_er_ir_regulars",
    labelEn: "🔵 Regular -er / -ir Verbs (-ía)",
    labelEs: "🔵 Regulares -er / -ir (-ía)",
    badge: "-ER / -IR",
    color: "#3b82f6",
    ruleEn: "Regular -er and -ir verbs in the imperfect: add -ía, -ías, -ía, -íamos, -íais, -ían. Every person carries a written accent on the 'í'.",
    ruleEs: "Verbos regulares en -er e -ir en imperfecto: añaden -ía, -ías, -ía, -íamos, -íais, -ían. Todas las formas llevan tilde en la 'í'.",
    verbs: [
      { verb: "comer", stem: "comía, comías, comía...", meaning: "to eat" },
      { verb: "vivir", stem: "vivía, vivías, vivía...", meaning: "to live" },
      { verb: "tener", stem: "tenía, tenías, tenía...", meaning: "to have / used to have" },
      { verb: "hacer", stem: "hacía, hacías, hacía...", meaning: "to do / make" },
      { verb: "escribir", stem: "escribía, escribías, escribía...", meaning: "to write" }
    ]
  }
];

export function getVerbCategories(tense = "present") {
  if (tense === "imperfect") return IMPERFECT_VERB_CATEGORIES;
  return tense === "preterite" ? PRETERITE_VERB_CATEGORIES : PRESENT_VERB_CATEGORIES;
}

// Backwards compatibility alias
export const VERB_CATEGORIES = PRETERITE_VERB_CATEGORIES;

/**
 * Resolves which grammatical category a verb belongs to for the Conjugation Helper
 * conditioned on the active tense (present, preterite, or imperfect).
 */
export function getVerbCategoryInfo(rawVerb, tense = "present") {
  if (!rawVerb) return null;
  const base = parseVerb(rawVerb).base.toLowerCase();
  const categories = tense === "imperfect"
    ? IMPERFECT_VERB_CATEGORIES
    : (tense === "preterite" ? PRETERITE_VERB_CATEGORIES : PRESENT_VERB_CATEGORIES);

  for (const cat of categories) {
    if (cat.verbs) {
      const match = cat.verbs.find(v => v.verb === base);
      if (match) {
        return {
          categoryId: cat.id,
          category: cat,
          subcategoryId: null,
          subcategory: null,
          verbMeta: match
        };
      }
    }
    if (cat.subcategories) {
      for (const sub of cat.subcategories) {
        const match = sub.verbs.find(v => v.verb === base);
        if (match) {
          return {
            categoryId: cat.id,
            category: cat,
            subcategoryId: sub.id,
            subcategory: sub,
            verbMeta: match
          };
        }
      }
    }
  }

  // Preterite fallback checks for -car, -gar, -zar
  if (tense === "preterite") {
    if (base.endsWith("car")) {
      const spellCat = categories.find(c => c.id === "spell_change");
      const sub = spellCat?.subcategories?.find(s => s.id === "car");
      return {
        categoryId: "spell_change",
        category: spellCat,
        subcategoryId: "car",
        subcategory: sub,
        verbMeta: { verb: base, stem: "c ➔ qu (yo)", meaning: "" }
      };
    }
    if (base.endsWith("gar")) {
      const spellCat = categories.find(c => c.id === "spell_change");
      const sub = spellCat?.subcategories?.find(s => s.id === "gar");
      return {
        categoryId: "spell_change",
        category: spellCat,
        subcategoryId: "gar",
        subcategory: sub,
        verbMeta: { verb: base, stem: "g ➔ gu (yo)", meaning: "" }
      };
    }
    if (base.endsWith("zar")) {
      const spellCat = categories.find(c => c.id === "spell_change");
      const sub = spellCat?.subcategories?.find(s => s.id === "zar");
      return {
        categoryId: "spell_change",
        category: spellCat,
        subcategoryId: "zar",
        subcategory: sub,
        verbMeta: { verb: base, stem: "z ➔ c (yo)", meaning: "" }
      };
    }
  }

  const regCat = categories.find(c => c.id === "regulars");
  return {
    categoryId: "regulars",
    category: regCat,
    subcategoryId: null,
    subcategory: null,
    verbMeta: { verb: base, stem: base.endsWith("ar") ? "Regular -ar" : base.endsWith("er") ? "Regular -er" : "Regular -ir", meaning: "" }
  };
}
