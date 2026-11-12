// scripts/update-contrast-explanations.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const helperPath = path.resolve(__dirname, '../src/utils/conjugationHelper.js');

let content = fs.readFileSync(helperPath, 'utf8');

const englishRuleExplanations = [
  // UNIT 1
  [
    `ruleExplanation: "Usa 'saber' para hechos, datos o información concreta. La forma irregular en 'yo' es 'sé'."`,
    `ruleExplanation: "Use 'saber' for facts, data, or concrete information. The irregular 'yo' form is 'sé'.",\n      ruleExplanationEs: "Usa 'saber' para hechos, datos o información concreta. La forma irregular en 'yo' es 'sé'."`
  ],
  [
    `ruleExplanation: "Usa 'conocer' (+ 'a' personal) para indicar familiaridad o conocimiento de personas y lugares."`,
    `ruleExplanation: "Use 'conocer' (+ personal 'a') to express familiarity or acquaintance with people or places.",\n      ruleExplanationEs: "Usa 'conocer' (+ 'a' personal) para indicar familiaridad o conocimiento de personas y lugares."`
  ],
  [
    `ruleExplanation: "Usa 'saber' (+ infinitivo) para habilidades aprendidas ('to know how to do something')."`,
    `ruleExplanation: "Use 'saber' (+ infinitive) to express learned skills or abilities ('to know how to do something').",\n      ruleExplanationEs: "Usa 'saber' (+ infinitivo) para habilidades aprendidas ('to know how to do something')."`
  ],
  [
    `ruleExplanation: "Usa 'ser' para profesiones, identidad y características esenciales."`,
    `ruleExplanation: "Use 'ser' for professions, identity, and essential characteristics.",\n      ruleExplanationEs: "Usa 'ser' para profesiones, identidad y características esenciales."`
  ],
  [
    `ruleExplanation: "Usa 'estar' para ubicación geográfica y posición física, incluso de edificios permanentes."`,
    `ruleExplanation: "Use 'estar' for geographical location and physical position, even of permanent buildings.",\n      ruleExplanationEs: "Usa 'estar' para ubicación geográfica y posición física, incluso de edificios permanentes."`
  ],
  [
    `ruleExplanation: "Usa 'estar' para estados temporales, físicos o emocionales cambiantes."`,
    `ruleExplanation: "Use 'estar' for temporary, physical, or changing emotional conditions and states.",\n      ruleExplanationEs: "Usa 'estar' para estados temporales, físicos o emocionales cambiantes."`
  ],

  // UNIT 2
  [
    `ruleExplanation: "Usa 'por' para expresar duración de tiempo (duration of time: 'for 2 hours')."`,
    `ruleExplanation: "Use 'por' to express duration of time ('for 2 hours').",\n      ruleExplanationEs: "Usa 'por' para expresar duración de tiempo ('for 2 hours')."`
  ],
  [
    `ruleExplanation: "Usa 'para' para indicar una fecha límite o plazo específico (deadline: 'by/for Friday')."`,
    `ruleExplanation: "Use 'para' to indicate a specific deadline or due date ('by/for Friday').",\n      ruleExplanationEs: "Usa 'para' para indicar una fecha límite o plazo específico ('by/for Friday')."`
  ],
  [
    `ruleExplanation: "Usa 'por' para indicar intercambios, precios o dinero pagado (exchange / price)."`,
    `ruleExplanation: "Use 'por' to indicate exchanges, price, or money paid ('in exchange for').",\n      ruleExplanationEs: "Usa 'por' para indicar intercambios, precios o dinero pagado (exchange / price)."`
  ],
  [
    `ruleExplanation: "Usa 'para' para indicar el receptor o beneficiario final de una acción (recipient / beneficiary)."`,
    `ruleExplanation: "Use 'para' to indicate the recipient or final beneficiary of an action ('for whom').",\n      ruleExplanationEs: "Usa 'para' para indicar el receptor o beneficiario final de una acción (recipient / beneficiary)."`
  ],
  [
    `ruleExplanation: "Usa 'para' (+ infinitivo) para expresar propósito o meta ('in order to' / purpose)."`,
    `ruleExplanation: "Use 'para' (+ infinitive) to express purpose or goal ('in order to').",\n      ruleExplanationEs: "Usa 'para' (+ infinitivo) para expresar propósito o meta ('in order to' / purpose)."`
  ],
  [
    `ruleExplanation: "Usa 'por' para indicar la ruta, vía o medio de transporte/comunicación ('through / by')."`,
    `ruleExplanation: "Use 'por' to indicate the route, path, or means of transportation/communication ('through / by').",\n      ruleExplanationEs: "Usa 'por' para indicar la ruta, vía o medio de transporte/comunicación ('through / by')."`
  ],
  [
    `ruleExplanation: "Usa 'para' para indicar el destino final de un viaje (destination: 'bound for')."`,
    `ruleExplanation: "Use 'para' to indicate the final physical destination of travel ('headed for / bound for').",\n      ruleExplanationEs: "Usa 'para' para indicar el destino final de un viaje (destination: 'bound for')."`
  ],
  [
    `ruleExplanation: "La locución fija es 'por eso' (that's why / therefore)."`,
    `ruleExplanation: "The fixed idiom is 'por eso' ('that is why / therefore').",\n      ruleExplanationEs: "La locución fija es 'por eso' (that's why / therefore)."`
  ],
  [
    `ruleExplanation: "La expresión fija es 'por fin' (at last / finally)."`,
    `ruleExplanation: "The fixed expression is 'por fin' ('at last / finally').",\n      ruleExplanationEs: "La expresión fija es 'por fin' (at last / finally)."`
  ],
  [
    `ruleExplanation: "La locución idiomática es 'por si acaso' (just in case)."`,
    `ruleExplanation: "The idiomatic phrase is 'por si acaso' ('just in case').",\n      ruleExplanationEs: "La locución idiomática es 'por si acaso' (just in case)."`
  ],
  [
    `ruleExplanation: "La locución fija es 'Para empezar' (to begin with / for starters)."`,
    `ruleExplanation: "The fixed phrase is 'Para empezar' ('to begin with / for starters').",\n      ruleExplanationEs: "La locución fija es 'Para empezar' (to begin with / for starters)."`
  ],
  [
    `ruleExplanation: "La locución enfática negativa es 'para nada' (not at all)."`,
    `ruleExplanation: "The emphatic negative idiom is 'para nada' ('not at all').",\n      ruleExplanationEs: "La locución enfática negativa es 'para nada' (not at all)."`
  ],
  [
    `ruleExplanation: "Usa 'para' con pronombres preposicionales para indicar el destinatario ('para mí' con tilde)."`,
    `ruleExplanation: "Use 'para' with prepositional pronouns to indicate the recipient/opinion ('para mí' with accent).",\n      ruleExplanationEs: "Usa 'para' con pronombres preposicionales para indicar el destinatario ('para mí' con tilde)."`
  ],
  [
    `ruleExplanation: "La frase 'el uno al otro' clarifica explícitamente que la acción es recíproca entre dos sujetos."`,
    `ruleExplanation: "The phrase 'el uno al otro' explicitly clarifies that the action is reciprocal between two subjects ('each other').",\n      ruleExplanationEs: "La frase 'el uno al otro' clarifica explícitamente que la acción es recíproca entre dos sujetos."`
  ],
  [
    `ruleExplanation: "La frase 'a sí mismo' clarifica que la acción es reflexiva (el sujeto actúa sobre sí mismo)."`,
    `ruleExplanation: "The phrase 'a sí mismo' clarifies that the action is reflexive (the subject acts on themselves).",\n      ruleExplanationEs: "La frase 'a sí mismo' clarifica que la acción es reflexiva (el sujeto actúa sobre sí mismo)."`
  ],

  // UNIT 3
  [
    `ruleExplanation: "'Los platos' es el objeto directo masculino plural; se reemplaza únicamente por 'los' (nunca 'les')."`,
    `ruleExplanation: "'Los platos' is masculine plural direct object; it is replaced exclusively by 'los' (never 'les').",\n      ruleExplanationEs: "'Los platos' es el objeto directo masculino plural; se reemplaza únicamente por 'los' (nunca 'les')."`
  ],
  [
    `ruleExplanation: "'La basura' es objeto directo femenino singular; se reemplaza por 'la'."`,
    `ruleExplanation: "'La basura' is feminine singular direct object; it is replaced by 'la'.",\n      ruleExplanationEs: "'La basura' es objeto directo femenino singular; se reemplaza por 'la'."`
  ],
  [
    `ruleExplanation: "Se requiere obligatoriamente la 'a' personal porque el objeto directo es una persona específica ('mi abuela')."`,
    `ruleExplanation: "The personal 'a' is strictly required because the direct object is a specific person ('mi abuela').",\n      ruleExplanationEs: "Se requiere obligatoriamente la 'a' personal porque el objeto directo es una persona específica ('mi abuela')."`
  ],
  [
    `ruleExplanation: "NO se usa la 'a' personal cuando el objeto directo es una cosa u objeto inanimado ('las mesas')."`,
    `ruleExplanation: "Do NOT use the personal 'a' when the direct object is an inanimate thing or object ('las mesas').",\n      ruleExplanationEs: "NO se usa la 'a' personal cuando el objeto directo es una cosa u objeto inanimado ('las mesas')."`
  ],
  [
    `ruleExplanation: "Se utiliza la 'a' personal cuando el animal doméstico es considerado parte afectiva de la familia."`,
    `ruleExplanation: "Use the personal 'a' when a household pet is treated as a beloved member of the family.",\n      ruleExplanationEs: "Se utiliza la 'a' personal cuando el animal doméstico es considerado parte afectiva de la familia."`
  ],
  [
    `ruleExplanation: "Solo los verbos -ir tienen cambio de raíz en el pretérito (e -> i) en 3ª persona: pedir -> pidió (nunca 'pedió')."`,
    `ruleExplanation: "Only -ir verbs stem-change in the preterite (e -> i) in the 3rd person: pedir -> pidió (never 'pedió').",\n      ruleExplanationEs: "Solo los verbos -ir tienen cambio de raíz en el pretérito (e -> i) en 3ª persona: pedir -> pidió (nunca 'pedió')."`
  ],
  [
    `ruleExplanation: "El verbo servir (-ir) cambia e -> i en 3ª persona plural del pretérito: sirvieron."`,
    `ruleExplanation: "The verb servir (-ir) changes e -> i in the 3rd person plural of the preterite: sirvieron.",\n      ruleExplanationEs: "El verbo servir (-ir) cambia e -> i en 3ª persona plural del pretérito: sirvieron."`
  ],
  [
    `ruleExplanation: "Dormir cambia o -> u en la 3ª persona del singular del pretérito: durmió (nunca 'dormió')."`,
    `ruleExplanation: "Dormir changes o -> u in the 3rd person singular of the preterite: durmió (never 'dormió').",\n      ruleExplanationEs: "Dormir cambia o -> u en la 3ª persona del singular del pretérito: durmió (nunca 'dormió')."`
  ],
  [
    `ruleExplanation: "¡Regla clave! Los verbos -ar y -er con cambio en presente NUNCA tienen cambio de raíz en pretérito: devolvieron."`,
    `ruleExplanation: "Key rule! Verbs in -ar and -er with present tense stem changes NEVER change stems in the preterite: devolvieron.",\n      ruleExplanationEs: "¡Regla clave! Los verbos -ar y -er con cambio en presente NUNCA tienen cambio de raíz en pretérito: devolvieron."`
  ],
  [
    `ruleExplanation: "Los verbos en -gar cambian g -> gu delante de 'e' en la forma yo del pretérito para mantener el sonido /g/: pagué."`,
    `ruleExplanation: "Verbs ending in -gar change g -> gu before 'e' in the 'yo' preterite form to maintain the hard /g/ sound: pagué.",\n      ruleExplanationEs: "Los verbos en -gar cambian g -> gu delante de 'e' en la forma yo del pretérito para mantener el sonido /g/: pagué."`
  ],
  [
    `ruleExplanation: "Los verbos en -car cambian c -> qu en la forma yo del pretérito para mantener el sonido /k/: busqué."`,
    `ruleExplanation: "Verbs ending in -car change c -> qu in the 'yo' preterite form to maintain the /k/ sound: busqué.",\n      ruleExplanationEs: "Los verbos en -car cambian c -> qu en la forma yo del pretérito para mantener el sonido /k/: busqué."`
  ],
  [
    `ruleExplanation: "Usa 'devolver' para devolver un objeto o dinero a su lugar. Usa 'volver' para el regreso físico de una persona."`,
    `ruleExplanation: "Use 'devolver' to return an item or money to a place/store. Use 'volver' for a person returning physically.",\n      ruleExplanationEs: "Usa 'devolver' para devolver un objeto o dinero a su lugar. Usa 'volver' para el regreso físico de una persona."`
  ],

  // UNIT 4
  [
    `ruleExplanation: "Usa 'ponerse' para cambios de estado emocional o físico rápidos, pasajeros e involuntarios (sudden emotional change)."`,
    `ruleExplanation: "Use 'ponerse' for sudden, temporary, and involuntary changes in emotional or physical state.",\n      ruleExplanationEs: "Usa 'ponerse' para cambios de estado emocional o físico rápidos, pasajeros e involuntarios."`
  ],
  [
    `ruleExplanation: "Usa 'volverse' para transformaciones extremas o cambios drásticos de conducta o estado mental."`,
    `ruleExplanation: "Use 'volverse' for radical transformations or drastic changes in behavior or mental disposition.",\n      ruleExplanationEs: "Usa 'volverse' para transformaciones extremas o cambios drásticos de conducta o estado mental."`
  ],
  [
    `ruleExplanation: "Usa 'hacerse' para cambios de profesión o estatus que requieren esfuerzo consciente, estudio y tiempo."`,
    `ruleExplanation: "Use 'hacerse' for changes in profession, religion, or status requiring conscious effort, study, and time.",\n      ruleExplanationEs: "Usa 'hacerse' para cambios de profesión o estatus que requieren esfuerzo consciente, estudio y tiempo."`
  ],
  [
    `ruleExplanation: "Usa 'darse cuenta de' para percatarse o darse cuenta mentalmente de un hecho ('me di cuenta')."`,
    `ruleExplanation: "Use 'darse cuenta de' to mentally realize or become aware of a fact ('me di cuenta').",\n      ruleExplanationEs: "Usa 'darse cuenta de' para percatarse o darse cuenta mentalmente de un hecho ('me di cuenta')."`
  ],
  [
    `ruleExplanation: "¡Cognado falso! 'Realizar' significa cumplir, llevar a cabo o materializar un proyecto o sueño (to fulfill / achieve)."`,
    `ruleExplanation: "False cognate! 'Realizar' means to fulfill, carry out, or achieve a project or dream (to fulfill / achieve).",\n      ruleExplanationEs: "¡Cognado falso! 'Realizar' significa cumplir, llevar a cabo o materializar un proyecto o sueño (to fulfill / achieve)."`
  ],
  [
    `ruleExplanation: "Regla obligatoria: Cuando 'le' o 'les' se encuentra antes de 'lo/la/los/las', cambia por fonética a 'se' ('se los', jamás 'le los')."`,
    `ruleExplanation: "Mandatory rule: When 'le' or 'les' appears before 'lo/la/los/las', it changes phonetically to 'se' ('se los', never 'le los').",\n      ruleExplanationEs: "Regla obligatoria: Cuando 'le' o 'les' se encuentra antes de 'lo/la/los/las', cambia por fonética a 'se'."`
  ],
  [
    `ruleExplanation: "'A ustedes' (indirecto le/les) cambia a 'se' antes del objeto directo 'la' ('se la muestro')."`,
    `ruleExplanation: "'A ustedes' (indirect pronoun le/les) changes to 'se' before the direct object 'la' ('se la muestro').",\n      ruleExplanationEs: "'A ustedes' (indirecto le/les) cambia a 'se' antes del objeto directo 'la' ('se la muestro')."`
  ],
  [
    `ruleExplanation: "Al adjuntar dos pronombres al final de un infinitivo, se conserva el orden Indirecto + Directo y se añade tilde: dármela."`,
    `ruleExplanation: "When attaching two pronouns to the end of an infinitive, keep Indirect + Direct order and add a written accent: dármela.",\n      ruleExplanationEs: "Al adjuntar dos pronombres al final de un infinitivo, se conserva el orden Indirecto + Directo y se añade tilde: dármela."`
  ],
  [
    `ruleExplanation: "El verbo andar tiene raíz irregular 'anduv-' en pretérito: anduvimos (sin tilde)."`,
    `ruleExplanation: "The verb andar has the irregular preterite stem 'anduv-': anduvimos (no written accent).",\n      ruleExplanationEs: "El verbo andar tiene raíz irregular 'anduv-' en pretérito: anduvimos (sin tilde)."`
  ],
  [
    `ruleExplanation: "Los verbos en -ducir tienen raíz en 'j' en el pretérito: condujo (3ª pers. sing. sin tilde)."`,
    `ruleExplanation: "Verbs ending in -ducir have 'j' stems in the preterite: condujo (3rd person singular, no written accent).",\n      ruleExplanationEs: "Los verbos en -ducir tienen raíz en 'j' en el pretérito: condujo (3ª pers. sing. sin tilde)."`
  ]
];

for (const [target, replacement] of englishRuleExplanations) {
  if (!content.includes(target)) {
    console.error("Target not found:", target);
  } else {
    content = content.replace(target, replacement);
  }
}

fs.writeFileSync(helperPath, content, 'utf8');
console.log("Successfully updated contrast rule explanations to English!");
