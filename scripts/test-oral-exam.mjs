import { 
  MIDTERM_TITLE, 
  MIDTERM_QUESTIONS, 
  OPEN_WORD_BANK, 
  translateCustomSentence, 
  validateOralExamAnswer 
} from '../src/data/midtermOralExamData.js';

console.log("==========================================");
console.log("🧪 TESTING MIDTERM ORAL EXAM DATA & ENGINE");
console.log("==========================================");

// 1. Title & Context
console.log("Midterm Title:", MIDTERM_TITLE.spanish);
if (!MIDTERM_TITLE.spanish.includes("compras")) throw new Error("Title invalid");

// 2. 10 Questions Verification
if (MIDTERM_QUESTIONS.length !== 10) throw new Error(`Expected 10 questions, got ${MIDTERM_QUESTIONS.length}`);
console.log(`✓ Verified ${MIDTERM_QUESTIONS.length} questions loaded from PDF.`);

MIDTERM_QUESTIONS.forEach(q => {
  if (!q.question || !q.english || !q.grammarFocus) {
    throw new Error(`Question ${q.id} missing core fields`);
  }
  if (!Array.isArray(q.guidedPaths) || q.guidedPaths.length < 3) {
    throw new Error(`Question ${q.id} must have at least 3 guided paths`);
  }
  q.guidedPaths.forEach(path => {
    if (!path.id || !path.label || !path.targetSentence || !path.englishMeaning || !path.syntaxBreakdown) {
      throw new Error(`Path ${path.id} in Question ${q.id} missing fields`);
    }
  });
});
console.log("✓ Verified all 10 questions have valid guided paths, syntax breakdowns, and grammar focus.");

// 3. Open Word Bank Verification
const categories = ['verbos', 'personas', 'lugares', 'objetos', 'conectores', 'adjetivos'];
categories.forEach(cat => {
  if (!Array.isArray(OPEN_WORD_BANK[cat]) || OPEN_WORD_BANK[cat].length === 0) {
    throw new Error(`Category ${cat} is missing or empty`);
  }
  OPEN_WORD_BANK[cat].forEach(t => {
    if (!t.text || !t.gloss) throw new Error(`Token in ${cat} missing text or gloss: ${JSON.stringify(t)}`);
  });
});
console.log("✓ Verified all open word bank categories have valid tokens and English glosses.");

// 4. Test Dynamic Translation Helper
const sampleTokens = [
  { text: "Fui", gloss: "I went" },
  { text: "con mi mejor amigo", gloss: "with my best friend" },
  { text: "al mercado central", gloss: "to the central market" }
];
const translated = translateCustomSentence(sampleTokens);
console.log("Sample translation:", translated);
if (!translated.includes("I went with my best friend to the central market")) {
  throw new Error("Translation failed");
}
console.log("✓ Dynamic translation helper verified.");

// 5. Test Challenge / Free Validation Engine
const tests = [
  { qId: 1, text: "Fui con mi mamá al centro", expected: true },
  { qId: 1, text: "Voy con mi amigo", expected: false }, // present tense
  { qId: 2, text: "Fui al mercado de artesanías ayer", expected: true },
  { qId: 3, text: "Compré una camisa bordada y recuerdos", expected: true },
  { qId: 3, text: "hola", expected: false }, // too short
  { qId: 4, text: "Sí probé tacos de pescado y comí churros", expected: true },
  { qId: 5, text: "Sí me medí una chaqueta de cuero", expected: true },
  { qId: 6, text: "Escogí unas pulseras para regalar a mi madre", expected: true },
  { qId: 7, text: "Pagué en efectivo y recibí un descuento", expected: true },
  { qId: 8, text: "Encontré libros antiguos y música tradicional", expected: true },
  { qId: 9, text: "Me sentí muy contento y alegre", expected: true },
  { qId: 10, text: "Pensé que fue maravillosa porque aprendí mucho", expected: true }
];

tests.forEach((t, i) => {
  const res = validateOralExamAnswer(t.qId, t.text);
  if (res.isValid !== t.expected) {
    throw new Error(`Validation test ${i+1} failed for Q${t.qId}: expected ${t.expected}, got ${res.isValid} (${res.feedback})`);
  }
  if (res.userTranslation && typeof res.userTranslation !== 'string') {
    throw new Error(`Expected string userTranslation for Q${t.qId}`);
  }
});
console.log("✓ Verified 12/12 validation engine test cases and gloss generation.");

// 6. Test Curriculum Dictionary Translation with Free Sentences
const freeSentences = [
  { es: "Fui a la tienda de ropa con mi prima", enContains: "clothing store" },
  { es: "Pagué con tarjeta de crédito en el centro comercial", enContains: "credit card" },
  { es: "El dependiente fue muy amable y me dio un descuento", enContains: "clerk" }
];
freeSentences.forEach(({ es, enContains }) => {
  const res = validateOralExamAnswer(1, es);
  if (!res.userTranslation.toLowerCase().includes(enContains.toLowerCase())) {
    throw new Error(`Failed to translate '${es}': expected '${enContains}', got '${res.userTranslation}'`);
  }
});
console.log("✓ Verified free curriculum vocabulary translation across complex sentences.");

console.log("==========================================");
console.log("🎉 ALL MIDTERM ORAL EXAM TESTS PASSED!");
console.log("==========================================");
