// In-game instructions and pedagogical explanations dictionary (Spanish default with English translations)

export const INSTRUCTION_TRANSLATIONS = {
  // Navigation & Top Bars
  deckTitle: {
    es: "Baraja de Aprendizaje",
    en: "Study & Quest Deck"
  },
  deckSubtitle: {
    es: "Misiones de campaña y módulos de práctica personalizada.",
    en: "Campaign quests and custom practice modules."
  },
  backToHub: {
    es: "Volver al Centro",
    en: "Back to Hub"
  },
  questTab: {
    es: "Campaña de Misiones",
    en: "Quest Campaign"
  },
  practiceTab: {
    es: "Mazo de Práctica",
    en: "Practice Deck"
  },
  autoSpeak: {
    es: "Auto-pronunciar",
    en: "Auto-speak"
  },
  translateToggle: {
    es: "Traducir Instrucciones",
    en: "Translate Instructions"
  },
  viewInEnglish: {
    es: "Ver en inglés",
    en: "View in English"
  },
  viewInSpanish: {
    es: "Ver en español",
    en: "View in Spanish"
  },

  // Stage Navigator & Summary
  stagePrefix: {
    es: "Etapa",
    en: "Stage"
  },
  stageCompleted: {
    es: "Completada ✓",
    en: "Completed ✓"
  },
  stageCurrent: {
    es: "En Curso ⚔️",
    en: "In Progress ⚔️"
  },
  stageLocked: {
    es: "Etapa bloqueada.",
    en: "Stage locked."
  },
  stageSummaryCleared: {
    es: "Has superado todos los niveles de esta etapa. ¡Selecciona cualquier nivel para practicarlo libremente para ganar Oro y XP extra!",
    en: "You have completed all levels in this stage. Select any level to practice freely and earn bonus Gold & XP!"
  },
  stageSummaryInProgress: {
    es: (currentLvl) => `Progreso de campaña: Nivel ${currentLvl} de 19. Puedes volver a niveles anteriores para practicar sin riesgo.`,
    en: (currentLvl) => `Campaign progress: Level ${currentLvl} of 19. You can replay previous levels to practice without risking campaign progress.`
  },
  stageLevelsPassed: {
    es: "Niveles de Etapa Aprobados",
    en: "Stage Levels Passed"
  },
  reviewGateReady: {
    es: "Puerta de Revisión Lista",
    en: "Review Gate Ready"
  },
  levelsGridTitle: {
    es: (sNum) => `Niveles de la Etapa ${sNum}`,
    en: (sNum) => `Stage ${sNum} Levels`
  },
  levelsGridSubtitle: {
    es: "Haz clic en un nivel aprobado para practicar",
    en: "Click on any cleared level to practice"
  },

  // Level Status & Badges
  levelBadge: {
    es: (lvl) => `Nivel ${lvl}`,
    en: (lvl) => `Level ${lvl}`
  },
  skipBadge: {
    es: "⚡ Salto",
    en: "⚡ Skip"
  },
  bossBadge: {
    es: "🛡️ Boss",
    en: "🛡️ Boss"
  },
  skipChallengeTag: {
    es: "⚡ Desafío de Salto (Muerte Súbita - 0 Errores)",
    en: "⚡ Skip Challenge (Sudden Death - 0 Mistakes)"
  },
  passedLevelTag: {
    es: "✓ Nivel Aprobado (Listo para Repasar)",
    en: "✓ Cleared Level (Ready to Review)"
  },
  currentMissionTag: {
    es: "⚔️ Misión de Campaña Actual",
    en: "⚔️ Current Campaign Mission"
  },
  lockedLevelTag: {
    es: "🔒 Nivel Bloqueado",
    en: "🔒 Locked Level"
  },
  reviewGateLabel: {
    es: "Puerta de Revisión (Jefe)",
    en: "Review Gate (Boss)"
  },
  levelProgressFraction: {
    es: (lvl) => `Nivel ${lvl} de 19`,
    en: (lvl) => `Level ${lvl} of 19`
  },
  bestScoreLabel: {
    es: "Mejor Puntuación",
    en: "Best Score"
  },

  // Rules Callouts
  rulesSkipTitle: {
    es: "Reglas del Desafío de Salto (Unit Skip Challenge):",
    en: "Skip Challenge Rules (Unit Skip Challenge):"
  },
  rulesSkipItem1: {
    es: "Evaluación Extendida: 30 preguntas de síntesis completa (construcción de oraciones, conjugación y oraciones contextuales).",
    en: "Extended Assessment: 30 comprehensive synthesis questions (sentence construction, verb conjugation, and contextual sentences)."
  },
  rulesSkipItem2: {
    es: "Muerte Súbita: No se permite cometer ningún error (100% de precisión requerida). ¡Un solo fallo termina el reto de inmediato!",
    en: "Sudden Death: Zero mistakes permitted (100% accuracy required). A single mistake terminates the challenge immediately!"
  },
  rulesSkipItem3: {
    es: (stageNum) => `Recompensa de Salto: Al ganar con 30/30, apruebas toda la Unidad ${stageNum} al instante, desbloqueas la siguiente unidad, ganas +100 Oro, +400 XP y el Trofeo Exclusivo Desafío Implacable.`,
    en: (stageNum) => `Skip Reward: Clearing 30/30 instantly passes all of Unit ${stageNum}, unlocks the next unit, awards +100 Gold, +400 XP, and the Exclusive Skip Master Trophy.`
  },
  rulesBossReview: {
    es: "Evaluación tipo Jefe: Requiere al menos 16/20 (80%) para aprobar.",
    en: "Boss Assessment: Requires at least 16/20 (80%) to pass and unlock the next unit."
  },
  rulesExtraPractice: {
    es: "Práctica Extra: Acierta al menos 12/20 (60%) para completar la sesión de repaso y ganar oro/XP extra. ¡No arriesga tu progreso de campaña!",
    en: "Extra Practice: Score at least 12/20 (60%) to clear the review session and earn extra Gold/XP. Doesn't risk campaign progress!"
  },
  rulesCampaignMission: {
    es: "Misión de Campaña: Acierta al menos 12/20 (60%) para desbloquear el siguiente nivel.",
    en: "Campaign Mission: Score at least 12/20 (60%) to unlock the next level."
  },

  // Level Action Buttons
  btnPlayCurrent: {
    es: (lvlLabel) => `Jugar Nivel Actual (${lvlLabel})`,
    en: (lvlLabel) => `Play Current Level (${lvlLabel})`
  },
  btnSkipChallenge: {
    es: "⚡ Reto de Salto (Jefe)",
    en: "⚡ Skip Challenge (Boss)"
  },
  btnGoCurrentStage: {
    es: (sNum) => `Ir a Mi Etapa Actual (${sNum})`,
    en: (sNum) => `Go to Current Stage (${sNum})`
  },
  btnChallengeBoss: {
    es: "⚡ Desafiar al Jefe (Muerte Súbita - 30 Preguntas)",
    en: "⚡ Challenge the Boss (Sudden Death - 30 Questions)"
  },
  btnLockedLevel: {
    es: "Nivel Bloqueado (Supera los niveles anteriores)",
    en: "Locked Level (Clear previous levels first)"
  },
  btnPracticeLevel: {
    es: (lvlLabel) => `Practicar Nivel ${lvlLabel} (Práctica Extra)`,
    en: (lvlLabel) => `Practice Level ${lvlLabel} (Extra Practice)`
  },
  btnStartCampaignLevel: {
    es: (lvl) => `Iniciar Nivel ${lvl} de Campaña`,
    en: (lvl) => `Start Campaign Level ${lvl}`
  },
  btnStartReviewGate: {
    es: "Iniciar Puerta de Revisión",
    en: "Start Review Gate"
  },
  btnFainted: {
    es: "Estás debilitado. ¡Visita la tienda para curarte!",
    en: "You are fainted. Visit the shop to heal!"
  },

  // Active Quiz Gameplay & Prompts
  questStageLvl: {
    es: (stage, lvl) => `Etapa ${stage} | Nivel ${lvl}`,
    en: (stage, lvl) => `Stage ${stage} | Level ${lvl}`
  },
  suddenDeathTag: {
    es: "⚡ Muerte Súbita (0 Fallos)",
    en: "⚡ Sudden Death (0 Mistakes)"
  },
  extraPracticeTag: {
    es: "Práctica Extra",
    en: "Extra Practice"
  },
  noHintsBadge: {
    es: "🧠 Sin pistas",
    en: "🧠 No hints"
  },
  presentTensePill: {
    es: "Tiempo Presente",
    en: "Present Tense"
  },
  preteriteTensePill: {
    es: "Tiempo Pretérito (Past Tense)",
    en: "Preterite Tense (Past Tense)"
  },
  reciprocalBadge: {
    es: "🤝 Acción Recíproca (\"Each Other\")",
    en: "🤝 Reciprocal Action (\"Each Other\")"
  },
  reflexiveBadge: {
    es: "Reflexivo (me, te, se, nos, os, se)",
    en: "Reflexive (me, te, se, nos, os, se)"
  },
  conjugateSubjectPrompt: {
    es: "Conjuga para el pronombre:",
    en: "Conjugate for the subject pronoun:"
  },
  gustarPrompt: {
    es: "Selecciona la forma correcta de gustar:",
    en: "Select the correct form of gustar:"
  },
  fillInBlankPrompt: {
    es: "Completar la frase:",
    en: "Fill in the blank:"
  },
  typeTranslationPrompt: {
    es: "Escribe la traducción al español:",
    en: "Type the Spanish translation:"
  },
  chooseTranslationPrompt: {
    es: "Elige la traducción correcta:",
    en: "Choose the correct translation:"
  },
  viewConjugationsBtn: {
    es: "📖 Ver Conjugaciones",
    en: "📖 View Conjugations"
  },
  showHintBtn: {
    es: "Ver Pista",
    en: "Show Hint"
  },
  hintPrefix: {
    es: "Pista:",
    en: "Hint:"
  },
  submitTranslationBtn: {
    es: "Enviar Traducción",
    en: "Submit Translation"
  },
  nextChallengeBtn: {
    es: "Siguiente Desafío",
    en: "Next Challenge"
  },
  finishQuestBtn: {
    es: "Finalizar Misión",
    en: "Finish Quest"
  },

  // Flashcards Intro in Quest
  previewWordTitle: {
    es: "Vista Previa de Nueva Palabra (+2 XP)",
    en: "Preview New Word (+2 XP)"
  },
  clickToRevealTranslation: {
    es: "Haz clic para ver la traducción",
    en: "Click card to reveal translation"
  },
  clickToRevealSpanish: {
    es: "Haz clic para volver al español",
    en: "Click card to reveal Spanish"
  },
  learnedWordBtn: {
    es: "¡Aprendí esta palabra!",
    en: "I learned this word!"
  },

  // Sentence Builder
  sentenceBuilderTitle: {
    es: "Construye la frase:",
    en: "Build the sentence:"
  },
  sentenceDropPrompt: {
    es: "👆 Arrastra o toca las palabras de abajo para formar la frase",
    en: "👆 Drag or tap the words below to form the sentence"
  },
  sentenceEmptyBank: {
    es: "¡Todas las palabras están colocadas arriba!",
    en: "All words have been placed above!"
  },
  sentenceWordsPlaced: {
    es: "Palabras elegidas:",
    en: "Words placed:"
  },
  sentenceClearBtn: {
    es: "Vaciar",
    en: "Clear"
  },
  sentenceCheckBtn: {
    es: "Comprobar Frase",
    en: "Check Sentence"
  },
  sentenceSuccess: {
    es: "¡Excelente! Frase construida a la perfección.",
    en: "Excellent! Sentence constructed perfectly."
  },
  sentenceWrongOrder: {
    es: "Orden incorrecto",
    en: "Incorrect word order"
  },
  sentenceCorrectSentence: {
    es: "Frase correcta:",
    en: "Correct sentence:"
  },

  // Sudden Death Alert & Feedback
  suddenDeathFailTitle: {
    es: "💀 ¡Muerte Súbita! Reto de Salto Fallado",
    en: "💀 Sudden Death! Skip Challenge Failed"
  },
  suddenDeathFailDesc: {
    es: (qNum, total) => `En el Desafío de Salto debes tener 100% de precisión (0 fallos permitidos). El reto termina aquí (pregunta ${qNum} de ${total}).`,
    en: (qNum, total) => `The Skip Challenge requires 100% accuracy (0 mistakes allowed). The challenge ends here (question ${qNum} of ${total}).`
  },
  viewResultsBtn: {
    es: "Ver Resultados del Desafío",
    en: "View Challenge Results"
  },

  // Practice Modes
  practiceSentenceDesc: {
    es: "🧩 Construcción de Frases: Arrastra o toca las palabras para ordenar correctamente las oraciones en español con distractores gramaticales.",
    en: "🧩 Sentence Construction: Drag or tap words to correctly order Spanish sentences with grammatical distractors."
  },
  practiceMixedDesc: {
    es: "🔀 Modo Mixto: Repasa tarjetas interactivas, desafíos de conjugación y construcción de frases en el mismo mazo integral.",
    en: "🔀 Mixed Mode: Review interactive flashcards, conjugation drills, and sentence puzzles in the same comprehensive deck."
  }
};

/**
 * Returns translated text or default Spanish text based on translate setting.
 * @param {string} key - Dictionary key in INSTRUCTION_TRANSLATIONS
 * @param {boolean} translate - Whether to return English translation
 * @param {...any} args - Optional arguments for functional translations
 */
export function t(key, translate = false, ...args) {
  const entry = INSTRUCTION_TRANSLATIONS[key];
  if (!entry) return key;

  const textOrFn = translate ? (entry.en || entry.es) : entry.es;
  if (typeof textOrFn === 'function') {
    return textOrFn(...args);
  }
  return textOrFn;
}

/**
 * Helper to display dual bilingual or translated instruction string.
 * @param {string} esText - Spanish text
 * @param {string} enText - English translation
 * @param {boolean} translate - Whether translation is active
 */
export function bilingual(esText, enText, translate = false) {
  if (!translate) return esText;
  return `${esText} (${enText})`;
}
