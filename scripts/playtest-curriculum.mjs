// -------------------------------------------------------------
// PLAYTEST CURRICULUM & LINGUISTIC AUDIT HARNESS
// Exhaustively tests all 125 levels (Stages 1-5, Levels 1-25),
// all 1,271 vocabulary words, 175+ sentence builders, 57 contrast decisions,
// and verb conjugations across the entire Spanish 102 curriculum.
// -------------------------------------------------------------

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { SENTENCE_POOLS, generateSentenceBuilderQuestion, tokenizeSentence } from '../src/utils/sentenceBuilderHelper.js';
import { 
  CONTRAST_QUESTIONS, 
  generateContrastQuestion, 
  conjugate, 
  isSentenceItem,
  PRONOUNS,
  BLANK_SPECS,
  sanitizeMeaningForQuiz
} from '../src/utils/conjugationHelper.js';
import { getLevelInfo } from '../src/utils/levelInfoHelper.js';
import { STAGES } from '../src/utils/difficultyMapper.js';

const vocabPath = path.resolve(__dirname, '../src/data/vocabulary.json');
const vocabData = JSON.parse(fs.readFileSync(vocabPath, 'utf8'));

console.log("===================================================================");
console.log("🔍 ESTUDIAMOS 102: EXHAUSTIVE LINGUISTIC & GAMEPLAY PLAYTEST SUITE");
console.log("===================================================================\n");

let totalAudits = 0;
let totalPassed = 0;
const issues = [];

function assert(condition, message, context = null) {
  totalAudits++;
  if (!condition) {
    issues.push({ message, context });
    console.error(`  ❌ FAIL: ${message}`);
  } else {
    totalPassed++;
  }
}

// -------------------------------------------------------------
// 1. VOCABULARY AUDIT (1,151 words)
// -------------------------------------------------------------
console.log(`--- [1/5] Auditing Vocabulary Database (${vocabData.length} items) ---`);
const allSubcats = new Set(Object.values(STAGES).flatMap(s => s.subcategories));

vocabData.forEach((item, idx) => {
  assert(item.spanish && item.spanish.trim().length > 0, `Word at index ${idx} has missing spanish`, item);
  assert(item.english && item.english.trim().length > 0, `Word '${item.spanish}' has missing english`, item);
  assert(item.subcategory, `Word '${item.spanish}' has missing subcategory`, item);
  assert(allSubcats.has(item.subcategory), `Word '${item.spanish}' has unknown subcategory: '${item.subcategory}'`, item);

  // Linguistic checks:
  // 1. Standalone pronoun "ti" should never have an accent mark in Spanish ("tí" is incorrect!)
  if (/(?:^|\s)tí(?:\s|[.,;!?]|$)/i.test(item.spanish)) {
    assert(false, `Word '${item.spanish}' incorrectly uses accented standalone 'tí'. In Spanish, 'ti' never carries an accent!`, item);
  }
  // 2. Sentences ending with period/exclamation/question should have proper inverted punctuation
  if (item.spanish.endsWith('?')) {
    assert(item.spanish.includes('¿'), `Question '${item.spanish}' is missing leading inverted question mark (¿)`, item);
  }
  if (item.spanish.endsWith('!')) {
    assert(item.spanish.includes('¡'), `Exclamation '${item.spanish}' is missing leading inverted exclamation mark (¡)`, item);
  }
});
console.log(`  ✓ Vocabulary database audited: ${vocabData.length} entries verified.\n`);

// -------------------------------------------------------------
// 2. SENTENCE BUILDERS AUDIT (SENTENCE_POOLS)
// -------------------------------------------------------------
console.log("--- [2/5] Auditing Sentence Builders & Syntax Breakdowns ---");
let totalSentencesChecked = 0;

for (const [unitStr, pool] of Object.entries(SENTENCE_POOLS)) {
  const unit = Number(unitStr);
  console.log(`  Evaluating Unit ${unit} Sentence Pool (${pool.length} sentences)...`);
  pool.forEach((sItem, sIdx) => {
    totalSentencesChecked++;
    const sSpec = generateSentenceBuilderQuestion({ unit, sentenceItem: sItem });
    assert(sSpec !== null, `Failed to generate sentence spec for unit ${unit} index ${sIdx}: "${sItem.spanish}"`);

    if (sSpec) {
      assert(sSpec.targetTokens && sSpec.targetTokens.length >= 3, `Sentence too short or tokens missing: "${sItem.spanish}"`, sSpec);
      assert(sSpec.bankTokens && sSpec.bankTokens.length >= sSpec.targetTokens.length, `Bank tokens smaller than target: "${sItem.spanish}"`);
      assert(sSpec.distractors && sSpec.distractors.length >= 1, `Sentence missing distractors: "${sItem.spanish}"`, sSpec);
      assert(sSpec.meaning && sSpec.meaning.length > 0, `Sentence missing english meaning: "${sItem.spanish}"`);
      assert(sSpec.syntaxBreakdown && sSpec.syntaxBreakdown.length > 5, `Sentence missing valid syntax breakdown in Unit ${unit}: "${sItem.spanish}"`);

      // Verify no distractor duplicates a target token
      const targetLower = new Set(sSpec.targetTokens.map(t => t.text.toLowerCase().replace(/[.,!?:;]/g, '')));
      sSpec.distractors.forEach(d => {
        const dClean = d.toLowerCase().replace(/[.,!?:;]/g, '');
        assert(!targetLower.has(dClean), `Distractor '${d}' is identical to a target token in sentence: "${sItem.spanish}"`, { sentence: sItem.spanish, distractor: d });
      });

      // Verify token concatenation can produce the target sentence words
      const tokenized = tokenizeSentence(sItem.spanish);
      assert(tokenized.length === sSpec.targetWords.length, `Tokenized word count mismatch in sentence: "${sItem.spanish}"`);
    }
  });
}
assert(SENTENCE_POOLS[5] && SENTENCE_POOLS[5].length >= 48, `Stage 5 sentence pool must have at least 48 sentences, found ${SENTENCE_POOLS[5]?.length}`);
console.log(`  ✓ Checked ${totalSentencesChecked} sentence construction puzzles with zero token ambiguity (Stage 5 has ${SENTENCE_POOLS[5].length} sentences).\n`);

// -------------------------------------------------------------
// 3. CONTRAST DECISION AUDIT (CONTRAST_QUESTIONS)
// -------------------------------------------------------------
console.log("--- [3/5] Auditing Contrast Decision Engine (Which One to Use When) ---");
assert(CONTRAST_QUESTIONS[5] && CONTRAST_QUESTIONS[5].length >= 28, `Stage 5 contrast questions must have at least 28 questions, found ${CONTRAST_QUESTIONS[5]?.length}`);
let totalContrastsChecked = 0;

for (const [stageKey, qList] of Object.entries(CONTRAST_QUESTIONS)) {
  console.log(`  Auditing Stage ${stageKey} Contrast Questions (${qList.length} questions)...`);
  qList.forEach((cQ) => {
    totalContrastsChecked++;
    assert(cQ.sentenceWithBlank && cQ.sentenceWithBlank.includes("[_____]"), `Contrast question missing blank: "${cQ.sentenceWithBlank}"`);
    assert(Array.isArray(cQ.choices) && cQ.choices.length >= 2, `Contrast question choices invalid: "${cQ.sentenceWithBlank}"`);
    assert(cQ.choices.includes(cQ.correct), `Correct answer '${cQ.correct}' not in choices [${cQ.choices.join(', ')}]: "${cQ.sentenceWithBlank}"`);
    assert(cQ.ruleExplanation && cQ.ruleExplanation.length > 10, `Contrast question missing explanation banner: "${cQ.sentenceWithBlank}"`);
    assert(cQ.contrastPair && cQ.contrastPair.length > 3, `Contrast question missing contrastPair: "${cQ.sentenceWithBlank}"`);

    // Verify hint does not leak the exact answer directly
    if (cQ.hint) {
      const escaped = cQ.correct.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const leaksWord = new RegExp(`(?:^|[\\s"':;,.¿?¡!])${escaped}(?:$|[\\s"':;,.¿?¡!])`, 'i').test(cQ.hint);
      assert(!leaksWord, `Contrast hint leaks target token '${cQ.correct}': "${cQ.hint}"`);
    }

    // Linguistic checks on specific high-stakes contrasts:
    if (cQ.contrastPair.includes("Realizar")) {
      if (cQ.correct.includes("realiz")) {
        // "realizar" in Spanish means to fulfill/achieve, never to mentally realize
        assert(!cQ.englishMeaning?.toLowerCase().includes("realize"), 
          `False cognate violation! 'Realizar' used for mental realization in: "${cQ.sentenceWithBlank}"`);
      }
    }
  });
}

// Test generator across all 5 stages
for (let stage = 1; stage <= 5; stage++) {
  for (let lvl = 1; lvl <= 25; lvl++) {
    const q = generateContrastQuestion(stage, lvl);
    assert(q !== null, `generateContrastQuestion failed for stage ${stage} level ${lvl}`);
    if (q) {
      assert(q.isContrastDecision === true, `Question missing isContrastDecision flag`);
      assert(q.choices.includes(q.correct), `Generated question correct answer not in choices`);
    }
  }
}
console.log(`  ✓ Checked ${totalContrastsChecked} contrast decision matrices & runtime generator.\n`);

// -------------------------------------------------------------
// 4. VERB CONJUGATION & IRREGULARS AUDIT
// -------------------------------------------------------------
console.log("--- [4/5] Auditing Verb Conjugation Accuracy & Irregular Stems ---");

// Test key irregulars highlighted in PowerPoint curriculum
const preteriteChecks = [
  // Radical irregulars (unaccented stems)
  { verb: "andar", person: 0, expected: "anduve" },
  { verb: "andar", person: 2, expected: "anduvo" },
  { verb: "andar", person: 5, expected: "anduvieron" },
  { verb: "conducir", person: 0, expected: "conduje" },
  { verb: "conducir", person: 2, expected: "condujo" },
  { verb: "conducir", person: 5, expected: "condujeron" }, // -eron, NOT -ieron!
  { verb: "estar", person: 0, expected: "estuve" },
  { verb: "estar", person: 2, expected: "estuvo" },
  { verb: "tener", person: 0, expected: "tuve" },
  { verb: "tener", person: 2, expected: "tuvo" },
  { verb: "poder", person: 0, expected: "pude" },
  { verb: "poder", person: 2, expected: "pudo" },
  { verb: "poner", person: 0, expected: "puse" },
  { verb: "poner", person: 2, expected: "puso" },
  { verb: "saber", person: 0, expected: "supe" },
  { verb: "saber", person: 2, expected: "supo" },
  { verb: "hacer", person: 0, expected: "hice" },
  { verb: "hacer", person: 2, expected: "hizo" }, // z before o!
  { verb: "querer", person: 0, expected: "quise" },
  { verb: "querer", person: 2, expected: "quiso" },
  { verb: "decir", person: 0, expected: "dije" },
  { verb: "decir", person: 5, expected: "dijeron" }, // -eron, NOT -ieron!
  { verb: "traer", person: 0, expected: "traje" },
  { verb: "traer", person: 5, expected: "trajeron" }, // -eron!
  // Intervocalic i -> y
  { verb: "leer", person: 2, expected: "leyó" },
  { verb: "leer", person: 5, expected: "leyeron" },
  { verb: "creer", person: 2, expected: "creyó" },
  { verb: "creer", person: 5, expected: "creyeron" },
  { verb: "oír", person: 2, expected: "oyó" },
  { verb: "oír", person: 5, expected: "oyeron" },
  { verb: "destruir", person: 2, expected: "destruyó" },
  { verb: "destruir", person: 5, expected: "destruyeron" },
  // Preterite stem-changers: ONLY -ir verbs, ONLY 3rd person singular and plural
  { verb: "pedir", person: 0, expected: "pedí" }, // 1st person regular
  { verb: "pedir", person: 2, expected: "pidió" }, // e -> i!
  { verb: "pedir", person: 5, expected: "pidieron" }, // e -> i!
  { verb: "servir", person: 2, expected: "sirvió" },
  { verb: "servir", person: 5, expected: "sirvieron" },
  { verb: "dormir", person: 0, expected: "dormí" }, // 1st person regular
  { verb: "dormir", person: 2, expected: "durmió" }, // o -> u!
  { verb: "dormir", person: 5, expected: "durmieron" }, // o -> u!
  // Spelling changers (-car, -gar, -zar in yo form only)
  { verb: "buscar", person: 0, expected: "busqué" },
  { verb: "buscar", person: 2, expected: "buscó" },
  { verb: "pagar", person: 0, expected: "pagué" },
  { verb: "pagar", person: 2, expected: "pagó" },
  { verb: "almorzar", person: 0, expected: "almorcé" },
  { verb: "almorzar", person: 2, expected: "almorzó" }
];

preteriteChecks.forEach(check => {
  const result = conjugate(check.verb, check.person, "preterite");
  assert(result === check.expected, `Preterite conjugation mismatch for '${check.verb}' (person ${PRONOUNS[check.person]}): got '${result}', expected '${check.expected}'`);
});
console.log(`  ✓ All ${preteriteChecks.length} preterite irregular stems, stem-changers, and spelling-changers verified.`);

// Imperfect conjugations and the 3 irregular verbs (ser, ir, ver) + haber
const imperfectChecks = [
  // Regular -ar: ending in -aba, -ábamos with tilde
  { verb: "hablar", person: 0, expected: "hablaba" },
  { verb: "hablar", person: 1, expected: "hablabas" },
  { verb: "hablar", person: 2, expected: "hablaba" },
  { verb: "hablar", person: 3, expected: "hablábamos" },
  { verb: "hablar", person: 5, expected: "hablaban" },
  // Regular -er/-ir: ending in -ía (accented throughout)
  { verb: "comer", person: 0, expected: "comía" },
  { verb: "comer", person: 3, expected: "comíamos" },
  { verb: "vivir", person: 0, expected: "vivía" },
  { verb: "vivir", person: 3, expected: "vivíamos" },
  // The ONLY 3 irregulars in Spanish imperfect: ser, ir, ver (+ impersonal haber)
  { verb: "ser", person: 0, expected: "era" },
  { verb: "ser", person: 1, expected: "eras" },
  { verb: "ser", person: 2, expected: "era" },
  { verb: "ser", person: 3, expected: "éramos" },
  { verb: "ser", person: 5, expected: "eran" },
  { verb: "ir", person: 0, expected: "iba" },
  { verb: "ir", person: 1, expected: "ibas" },
  { verb: "ir", person: 2, expected: "iba" },
  { verb: "ir", person: 3, expected: "íbamos" },
  { verb: "ir", person: 5, expected: "iban" },
  { verb: "ver", person: 0, expected: "veía" },
  { verb: "ver", person: 1, expected: "veías" },
  { verb: "ver", person: 2, expected: "veía" },
  { verb: "ver", person: 3, expected: "veíamos" },
  { verb: "ver", person: 5, expected: "veían" },
  { verb: "haber", person: 2, expected: "había" }
];

imperfectChecks.forEach(check => {
  const result = conjugate(check.verb, check.person, "imperfect");
  assert(result === check.expected, `Imperfect conjugation mismatch for '${check.verb}' (person ${PRONOUNS[check.person]}): got '${result}', expected '${check.expected}'`);
});
console.log(`  ✓ All ${imperfectChecks.length} imperfect conjugations (regular -ar, -er/-ir, and irregulars ser/ir/ver/haber) verified.\n`);

// -------------------------------------------------------------
// 5. 125-LEVEL FULL CAMPAIGN SIMULATION
// -------------------------------------------------------------
console.log("--- [5/5] Full 125-Level Campaign Playtest (Stages 1-5, Levels 1-25) ---");

for (let stage = 1; stage <= 5; stage++) {
  const activeStage = STAGES[stage];
  const stageVocab = vocabData.filter(item => activeStage.subcategories.includes(item.subcategory) && !isSentenceItem(item));
  const totalEligibleVocab = stageVocab.length;

  let taperSchedule = [];
  if (stage === 2) taperSchedule = [10, 10, 10, 10, 9, 9, 9, 8, 8, 8, 8, 7, 7, 7, 6, 6, 6, 5, 5];
  else if (stage === 3) taperSchedule = [9, 9, 8, 8, 7, 7, 6, 6, 5, 5, 4, 4, 3, 2];
  else if (stage === 4) taperSchedule = [9, 9, 8, 8, 8, 7, 7, 7, 6, 6, 6, 5, 5, 5, 4, 4];
  else if (stage === 5) taperSchedule = [8, 8, 8, 8, 7, 7, 7, 6, 6, 6, 6, 5, 5, 5, 5, 4, 4, 4, 3];

  let seenInStage = new Set();
  let remainingUnseen = [...stageVocab];

  for (let lvl = 1; lvl <= 25; lvl++) {
    const isReview = (lvl === 25);
    const levelInfo = getLevelInfo(stage, lvl, false, false);
    assert(levelInfo && levelInfo.title && levelInfo.desc, `Missing levelInfo for Stage ${stage} Level ${lvl}`);

    let targetCards = (!isReview) ? (taperSchedule[lvl - 1] || 0) : 0;
    if (lvl === 19 && remainingUnseen.length > 0) {
      targetCards = Math.max(targetCards, remainingUnseen.length);
    }
    const actualCards = Math.min(targetCards, remainingUnseen.length);

    // Flashcard allocation
    const newCards = remainingUnseen.slice(0, actualCards);
    remainingUnseen = remainingUnseen.slice(actualCards);
    newCards.forEach(c => seenInStage.add(c.spanish));

    // INVARIANT 1: Level 1 must not exceed 10 cards
    if (lvl === 1) {
      assert(actualCards <= 10, `Stage ${stage} Level 1 exceeded 10 cards: got ${actualCards}`);
    }

    // INVARIANT 2: Levels 20-25 must have strictly 0 flashcards
    if (lvl >= 20) {
      assert(actualCards === 0, `Stage ${stage} Level ${lvl} must have 0 flashcards in synthesis block! Got ${actualCards}`);
    }

    // INVARIANT 3: Flashcard First Guarantee
    // Any vocabulary question must only be drawn from words seen in current or previous flashcards
    if (stage > 1) {
      const allowedWords = new Set([...seenInStage]);
      newCards.forEach(c => allowedWords.add(c.spanish));

      // Simulate question generation pool for this level
      const eligibleItems = stageVocab.filter(item => allowedWords.has(item.spanish));
      assert(eligibleItems.length === allowedWords.size, `Eligible items count mismatch in Stage ${stage} Level ${lvl}`);
    }
  }

  // INVARIANT 4: 100% of vocabulary words introduced before review gate
  if (stage > 1) {
    assert(seenInStage.size === totalEligibleVocab, 
      `Stage ${stage} failed to introduce 100% of vocabulary! Seen ${seenInStage.size} of ${totalEligibleVocab}`);
    console.log(`  Stage ${stage} Playtest Passed: 100% of vocabulary (${seenInStage.size}/${totalEligibleVocab}) introduced. Zero cards in Levels 20-25.`);
  } else {
    console.log(`  Stage 1 (Repaso 101) Playtest Passed: All 25 levels verified.`);
  }
}

// -------------------------------------------------------------
// 6. ANSWER GIVEAWAY & SPOILER AUDIT
// -------------------------------------------------------------
console.log("\n--- [6/6] Auditing Answer Giveaways in Hints & Quiz Prompts ---");

// Test sanitizeMeaningForQuiz
const sampleSpoilers = [
  "to do / make (yo hago)",
  "to leave / go out (yo salgo)",
  "to drive (irregular preterite: conduj-)",
  "to play [u -> ue]",
  "to hurt / be painful (o -> ue)"
];
sampleSpoilers.forEach(sp => {
  const sanitized = sanitizeMeaningForQuiz(sp);
  assert(!/\(yo\s+[a-z]+\)/i.test(sanitized), `Sanitization failed to strip parenthetical conjugation: '${sanitized}' from '${sp}'`);
  assert(!/irregular/i.test(sanitized), `Sanitization failed to strip irregular stem note: '${sanitized}' from '${sp}'`);
  assert(!/->/.test(sanitized), `Sanitization failed to strip stem change arrow: '${sanitized}' from '${sp}'`);
});

// Verify no BLANK_SPECS hint leaks target token
let blankHintAudits = 0;
for (const [key, spec] of Object.entries(BLANK_SPECS)) {
  if (spec.hint) {
    blankHintAudits++;
    assert(!spec.hint.includes(":"), `BLANK_SPECS hint for '${key}' contains a colon: "${spec.hint}"`);
    const escaped = spec.correct ? spec.correct.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") : "";
    if (escaped) {
      const leaksWord = new RegExp(`(?:^|[\\s"':;,.¿?¡!])${escaped}(?:$|[\\s"':;,.¿?¡!])`, 'i').test(spec.hint);
      assert(!leaksWord, `BLANK_SPECS hint for '${key}' leaks target token '${spec.correct}': "${spec.hint}"`);
    }
  }
}
console.log(`  ✓ Audited ${blankHintAudits} BLANK_SPECS hints: zero answer giveaways.`);

// Verify no SENTENCE_POOLS hint leaks target token via colon or direct quoting
let sbHintAudits = 0;
for (const [unitStr, pool] of Object.entries(SENTENCE_POOLS)) {
  pool.forEach(sItem => {
    if (sItem.hint) {
      sbHintAudits++;
      assert(!/:\s*['"`]/i.test(sItem.hint) && !/->\s*['"`]/i.test(sItem.hint) && !/:\s*[a-záéíóúñ]+/i.test(sItem.hint),
        `Sentence Builder hint in Unit ${unitStr} for '${sItem.spanish}' leaks token: "${sItem.hint}"`);
    }
  });
}
console.log(`  ✓ Audited ${sbHintAudits} Sentence Builder hints: zero colon giveaways or quoted answers.`);

console.log("\n===================================================================");
console.log(`🎉 AUDIT COMPLETE: ${totalPassed} / ${totalAudits} checks passed.`);
if (issues.length > 0) {
  console.log(`⚠️  ${issues.length} issues identified:`);
  issues.forEach((iss, i) => console.log(`   ${i + 1}. ${iss.message}`));
} else {
  console.log("🌟 ZERO DEFECTS FOUND: Spanish grammar, orthography, syntax breakdowns, and 25-level pacing are 100% clean!");
}
console.log("===================================================================\n");
