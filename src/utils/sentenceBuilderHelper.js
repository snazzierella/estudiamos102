// -------------------------------------------------------------
// SENTENCE BUILDER / CONSTRUCTION ENGINE
// High-quality sentence pools across Spanish 101 Review & Units 2-4,
// with grammar-aligned distractors for drag-and-drop & tap construction.
// -------------------------------------------------------------

export const SENTENCE_POOLS = {
  // UNIT 1: Repaso de Español 101 (Present tense, articles, agreement, basic syntax)
  1: [
    {
      spanish: "La mujer come una manzana roja",
      english: "The woman eats a red apple",
      distractors: ["el", "como", "rojo"],
      hint: "Subject + Verb + Object (feminine noun & adjective agreement)"
    },
    {
      spanish: "El muchacho tiene un perro negro",
      english: "The boy has a black dog",
      distractors: ["la", "tengo", "negra"],
      hint: "Check verb form for 'él' and masculine adjective agreement"
    },
    {
      spanish: "Nosotros vivimos en una casa grande",
      english: "We live in a big house",
      distractors: ["vivo", "el", "pequeño"],
      hint: "Remember the 'nosotros' -ir verb ending (-imos)"
    },
    {
      spanish: "Ellos quieren almorzar en la cafetería",
      english: "They want to eat lunch in the cafeteria",
      distractors: ["quiere", "el", "almuerzan"],
      hint: "Stem-changing verb 'querer' followed by an infinitive"
    },
    {
      spanish: "El estudiante hace la tarea en la biblioteca",
      english: "The student does homework in the library",
      distractors: ["hago", "un", "las"],
      hint: "Irregular verb 'hacer' with feminine direct object"
    },
    {
      spanish: "El maestro enseña la clase de español",
      english: "The teacher teaches the Spanish class",
      distractors: ["enseño", "un", "las"],
      hint: "Regular -ar verb ending for 3rd person singular"
    },
    {
      spanish: "Nosotros compramos pan en el mercado",
      english: "We buy bread in the market",
      distractors: ["compro", "la", "compran"],
      hint: "We buy = nosotros compramos"
    },
    {
      spanish: "Ella habla español muy bien",
      english: "She speaks Spanish very well",
      distractors: ["hablo", "el", "bueno"],
      hint: "Adverb 'bien' describes how she speaks"
    },
    {
      spanish: "Yo tengo que estudiar para el examen",
      english: "I have to study for the exam",
      distractors: ["tiene", "por", "un"],
      hint: "Tener que + infinitive expresses obligation"
    },
    {
      spanish: "A mí me gusta el café caliente",
      english: "I like hot coffee",
      distractors: ["gustan", "te", "la"],
      hint: "Use singular 'gusta' for singular coffee"
    },
    {
      spanish: "Mis amigos van al parque los domingos",
      english: "My friends go to the park on Sundays",
      distractors: ["va", "el", "las"],
      hint: "Ir a + el contracts to 'al'"
    },
    {
      spanish: "A qué hora es la clase de inglés",
      english: "What time is the English class",
      distractors: ["son", "en", "el"],
      hint: "Time question with 'es' for a singular event"
    }
  ],

  // UNIT 2: Rutina Diaria, Salud, Emociones, Verbos Reflexivos y Recíprocos
  2: [
    {
      spanish: "Yo me lavo las manos antes de comer",
      english: "I wash my hands before eating",
      distractors: ["te", "lava", "los"],
      hint: "Reflexive pronoun 'me' goes before conjugated verb 'lavo'"
    },
    {
      spanish: "Los dos amigos se abrazan cuando se ven",
      english: "The two friends hug each other when they see each other",
      distractors: ["nos", "abraza", "abrazarse"],
      hint: "Reciprocal action with plural pronoun 'se'"
    },
    {
      spanish: "Ella se cepilla los dientes después de cenar",
      english: "She brushes her teeth after dinner",
      distractors: ["me", "cepillan", "el"],
      hint: "Reflexive pronoun 'se' + singular verb 'cepilla'"
    },
    {
      spanish: "Nosotros nos ayudamos con la tarea de español",
      english: "We help each other with the Spanish homework",
      distractors: ["se", "ayudan", "para"],
      hint: "Reciprocal 'nosotros nos ayudamos'"
    },
    {
      spanish: "A Juan le duele la cabeza hoy",
      english: "Juan's head hurts today",
      distractors: ["duelen", "el", "les"],
      hint: "Doler uses singular 'duele' for one body part"
    },
    {
      spanish: "Ellos quieren besarse antes de salir",
      english: "They want to kiss each other before leaving",
      distractors: ["besan", "se", "nos"],
      hint: "Attach pronoun to the infinitive: 'besarse'"
    },
    {
      spanish: "Yo estudio español por dos horas todos los días",
      english: "I study Spanish for two hours every day",
      distractors: ["para", "estudia", "las"],
      hint: "Use 'por' for duration of time"
    },
    {
      spanish: "El regalo es para mi hermana menor",
      english: "The gift is for my younger sister",
      distractors: ["por", "la", "mis"],
      hint: "Use 'para' for a recipient"
    },
    {
      spanish: "Mis padres se conocieron en la universidad",
      english: "My parents met each other in college",
      distractors: ["nos", "conoció", "el"],
      hint: "Preterite reciprocal: 'se conocieron'"
    },
    {
      spanish: "Tú te despiertas temprano por la mañana",
      english: "You wake up early in the morning",
      distractors: ["se", "despierto", "para"],
      hint: "Stem-changing reflexive (e -> ie): 'te despiertas'"
    }
  ],

  // UNIT 3: De Compras, Ropa, Quehaceres y Verbos en Pretérito
  3: [
    {
      spanish: "Ayer compré una camisa azul en la tienda",
      english: "Yesterday I bought a blue shirt in the store",
      distractors: ["compro", "compró", "un"],
      hint: "Preterite yo form ending (-é) for -ar verbs"
    },
    {
      spanish: "Nosotros lavamos los platos anoche",
      english: "We washed the dishes last night",
      distractors: ["lavo", "las", "lavaron"],
      hint: "Past time marker 'anoche' with preterite 'lavamos'"
    },
    {
      spanish: "Ella fue al supermercado ayer por la tarde",
      english: "She went to the supermarket yesterday afternoon",
      distractors: ["va", "fueron", "el"],
      hint: "Irregular preterite of ir: 'ella fue'"
    },
    {
      spanish: "Mis amigos limpiaron la casa esta mañana",
      english: "My friends cleaned the house this morning",
      distractors: ["limpia", "limpió", "el"],
      hint: "Preterite 3rd person plural (-aron)"
    },
    {
      spanish: "Tú pagaste la ropa con tarjeta de crédito",
      english: "You paid for the clothes with a credit card",
      distractors: ["pagó", "pagas", "el"],
      hint: "Preterite tú form (-aste)"
    },
    {
      spanish: "Mi hermano pasó la aspiradora en la sala",
      english: "My brother vacuumed in the living room",
      distractors: ["pasa", "el", "pasaron"],
      hint: "Preterite 3rd person singular (-ó)"
    },
    {
      spanish: "Yo busqué los zapatos nuevos en el centro comercial",
      english: "I looked for the new shoes at the mall",
      distractors: ["buscó", "las", "busco"],
      hint: "Preterite yo spelling change (c -> qu): 'busqué'"
    },
    {
      spanish: "A ellos les gustó la comida del restaurante",
      english: "They liked the restaurant food",
      distractors: ["gustaron", "gusta", "la"],
      hint: "Gustar in preterite for singular food: 'gustó'"
    }
  ],

  // UNIT 4: Viajes, Transporte, Hoteles y Pronombres Dobles
  4: [
    {
      spanish: "Nosotros viajamos a México en avión",
      english: "We traveled to Mexico by plane",
      distractors: ["viajo", "viajaron", "por"],
      hint: "Preterite travel verb with transport preposition 'en'"
    },
    {
      spanish: "El pasajero mostró el pasaporte en el mostrador",
      english: "The passenger showed the passport at the counter",
      distractors: ["muestra", "la", "mostraron"],
      hint: "Past action completed: 'mostró'"
    },
    {
      spanish: "Ellos hicieron las maletas antes del viaje",
      english: "They packed the suitcases before the trip",
      distractors: ["hace", "hizo", "los"],
      hint: "Irregular preterite stem (hic-): 'hicieron'"
    },
    {
      spanish: "Yo le di la tarjeta de embarque al agente",
      english: "I gave the boarding pass to the agent",
      distractors: ["les", "da", "el"],
      hint: "Irregular preterite dar: 'yo di'"
    },
    {
      spanish: "Nosotros nos quedamos en un hotel cómodo",
      english: "We stayed in a comfortable hotel",
      distractors: ["se", "quedan", "una"],
      hint: "Reflexive preterite 'nosotros nos quedamos'"
    },
    {
      spanish: "Tú encontraste tu asiento de ventanilla",
      english: "You found your window seat",
      distractors: ["encuentras", "pasillo", "la"],
      hint: "Preterite 'encontraste'"
    },
    {
      spanish: "El vuelo salió a tiempo esta tarde",
      english: "The flight departed on time this afternoon",
      distractors: ["sale", "salieron", "en"],
      hint: "Preterite of salir for singular flight: 'salió'"
    },
    {
      spanish: "Ella me lo explicó con calma",
      english: "She explained it to me calmly",
      distractors: ["te", "la", "explica"],
      hint: "Double object pronouns: Indirect (me) + Direct (lo)"
    }
  ]
};

/**
 * Splits a sentence into word tokens, preserving clean casing.
 */
export function tokenizeSentence(sentenceStr) {
  if (!sentenceStr) return [];
  // Clean special punctuation attached to words for tile bank
  return sentenceStr
    .trim()
    .split(/\s+/)
    .map(w => w.replace(/[¿?¡!.,;:"]/g, ''))
    .filter(Boolean);
}

/**
 * Generates a sentence construction question for a target unit or from a specific item.
 * Supports:
 * - Spanish sentence construction from an English prompt (default)
 * - English sentence construction from a Spanish prompt
 */
export function generateSentenceBuilderQuestion(options = {}) {
  const unit = options.unit || 1;
  const pool = SENTENCE_POOLS[unit] || SENTENCE_POOLS[1];
  
  // Pick random sentence from the selected unit pool
  const chosen = options.sentenceItem || pool[Math.floor(Math.random() * pool.length)];
  
  // Target direction: "es" (construct Spanish) or "en" (construct English)
  // For placement test and standard exercises, building Spanish is primary
  const targetLanguage = options.targetLanguage || "es";
  
  const isTargetSpanish = targetLanguage === "es";
  const sourcePrompt = isTargetSpanish ? chosen.english : chosen.spanish;
  const fullSolution = isTargetSpanish ? chosen.spanish : chosen.english;
  
  const targetWords = tokenizeSentence(fullSolution);
  
  // Distractors
  const rawDistractors = isTargetSpanish 
    ? (chosen.distractors || ["el", "la", "un"]) 
    : ["the", "a", "is", "they"];
  
  // Build token objects with unique IDs for rock-solid React state management
  let tokenId = 0;
  const targetTokens = targetWords.map(word => ({
    id: `target-${tokenId++}-${word}`,
    text: word,
    isDistractor: false
  }));

  const distractorTokens = rawDistractors.slice(0, 3).map(word => ({
    id: `dist-${tokenId++}-${word}`,
    text: word,
    isDistractor: true
  }));

  // Combine and shuffle the word bank
  const allBankTokens = [...targetTokens, ...distractorTokens].sort(() => Math.random() - 0.5);

  return {
    isSentenceBuilder: true,
    unit,
    prompt: sourcePrompt,
    promptLanguage: isTargetSpanish ? "en" : "es",
    targetLanguage,
    targetSentence: fullSolution,
    targetWords,
    targetTokens,
    bankTokens: allBankTokens,
    distractors: rawDistractors,
    meaning: isTargetSpanish ? chosen.english : chosen.spanish,
    hint: chosen.hint || "Arrange the words in the correct grammatical order."
  };
}

/**
 * Validates whether the user's placed words match the target sentence.
 */
export function checkSentenceConstruction(placedTokens, targetWords) {
  if (!placedTokens || !targetWords) return false;
  if (placedTokens.length !== targetWords.length) return false;

  for (let i = 0; i < targetWords.length; i++) {
    const placedWord = (placedTokens[i]?.text || placedTokens[i] || "").trim().toLowerCase();
    const targetWord = (targetWords[i] || "").trim().toLowerCase();
    if (placedWord !== targetWord) return false;
  }

  return true;
}
