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
  },

  // Midterm Oral Exam: Navigation & Header
  midtermReturnDashboard: {
    es: "Volver al Dashboard",
    en: "Back to Dashboard"
  },
  midtermOverallProgress: {
    es: (c) => `Progreso general: ${c} / 10`,
    en: (c) => `Overall progress: ${c} / 10`
  },
  midtermTitanHeartBadge: {
    es: "👑 Corazón de Titán (200 HP)",
    en: "👑 Titan's Heart (200 HP)"
  },
  midtermTitle: {
    es: "Simulador del Examen Oral: Medio Término",
    en: "Oral Exam Simulator: Midterm"
  },
  midtermPdfBasis: {
    es: "Basado en el documento oficial del examen oral de español 102.",
    en: "Based on the official Spanish 102 oral exam syllabus."
  },

  // Midterm Mode Switcher
  midtermModeGuided: {
    es: "Modo Guiado",
    en: "Guided Mode"
  },
  midtermModeGuidedSub: {
    es: "Opciones modulares + sintaxis",
    en: "Modular options + syntax scaffolding"
  },
  midtermModeOpen: {
    es: "Modo Libre",
    en: "Free Mode"
  },
  midtermModeOpenSub: {
    es: "9/10: Medalla \"Listo para el Examen\"",
    en: "9/10: \"Ready for the Midterm\" Badge"
  },
  midtermModeChallenge: {
    es: "Modo Desafío",
    en: "Challenge Mode"
  },
  midtermModeChallengeSub: {
    es: "10/10: Medalla Maestro + 200 HP",
    en: "10/10: Midterm Master Badge + 200 HP"
  },

  // Midterm Question Card & Audio Controls
  midtermQuestionCounter: {
    es: (idx, total) => `Pregunta ${idx} de ${total}`,
    en: (idx, total) => `Question ${idx} of ${total}`
  },
  midtermCompletedCheck: {
    es: "Completada",
    en: "Completed"
  },
  midtermListenAudio: {
    es: "🔊 Escuchar Pregunta",
    en: "🔊 Listen to Question"
  },
  midtermListenNormal: {
    es: "⚡ 1.0x Normal",
    en: "⚡ 1.0x Normal"
  },
  midtermListenSlow: {
    es: "🐢 0.75x Lento",
    en: "🐢 0.75x Slow"
  },
  midtermShowQuestion: {
    es: "👁️ Mostrar Pregunta",
    en: "👁️ Show Question"
  },
  midtermHideQuestion: {
    es: "Ocultar Texto",
    en: "Hide Text"
  },
  midtermHiddenAudioTitle: {
    es: "El texto de la pregunta está oculto por audio.",
    en: "Question text is hidden for listening comprehension."
  },
  midtermHiddenAudioDesc: {
    es: "Trata de entenderla escuchando el audio de Elena. Haz clic aquí o pulsa \"Mostrar Pregunta\" para revelar el texto.",
    en: "Try to understand by listening to Elena's audio. Click here or tap \"Show Question\" to reveal the text."
  },
  midtermRevealTranslationBtn: {
    es: "👁️ Revelar significado en inglés",
    en: "👁️ Reveal English meaning"
  },
  midtermHideTranslationBtn: {
    es: "Ocultar significado en inglés",
    en: "Hide English meaning"
  },
  midtermQuestionMeaningLabel: {
    es: "Significado de la Pregunta en Inglés:",
    en: "English Question Meaning:"
  },
  midtermChallengeNoTranslationNotice: {
    es: "⚠️ Modo Desafío activo: Las traducciones al inglés están bloqueadas para simular la condición real del examen oral.",
    en: "⚠️ Challenge Mode active: English translations are blocked to simulate real oral exam conditions."
  },
  midtermGrammarFocusLabel: {
    es: "Foco Gramatical:",
    en: "Grammar Focus:"
  },

  // Midterm: Guided Mode
  midtermGuidedChoosePathLabel: {
    es: "Elige tu respuesta personalizada (Choose your story path):",
    en: "Choose your customized response (Choose your story path):"
  },
  midtermGuidedIdeaToExpress: {
    es: "Idea que vas a expresar:",
    en: "Idea you will express:"
  },
  midtermGuidedConstructedLabel: {
    es: "Tu respuesta construida (Toca las palabras para colocarlas):",
    en: "Your constructed response (Tap words below to place them):"
  },
  midtermGuidedEmptySlotNotice: {
    es: "Toca las fichas de abajo para formar tu oración completa en pretérito...",
    en: "Tap the tokens below to form your complete sentence in preterite..."
  },
  midtermWordBankLabel: {
    es: "Banco de Palabras (Word Bank):",
    en: "Word Bank:"
  },
  midtermResetBtn: {
    es: "Reiniciar",
    en: "Reset"
  },
  midtermShowHint: {
    es: "Ver Pista",
    en: "Show Hint"
  },
  midtermHideHint: {
    es: "Ocultar Pista",
    en: "Hide Hint"
  },
  midtermGrammarHintLabel: {
    es: "💡 Pista de Gramática:",
    en: "💡 Grammar Hint:"
  },
  midtermSyntaxBreakdownLabel: {
    es: "Estructura Sintáctica:",
    en: "Syntactic Structure:"
  },
  midtermCheckGuidedBtn: {
    es: "Comprobar Respuesta",
    en: "Check Answer"
  },
  midtermFeedbackCorrect: {
    es: "¡Excelente! Respuesta correcta (+20 XP, +10 Oro)",
    en: "Excellent! Correct answer (+20 XP, +10 Gold)"
  },
  midtermFeedbackIncorrect: {
    es: "Casi lo tienes. Revisa el orden o los distractores.",
    en: "Almost there. Check word order or distractors."
  },
  midtermFeedbackQuestionLabel: {
    es: "❓ Pregunta del Examen:",
    en: "❓ Exam Question:"
  },
  midtermFeedbackYourAnswerLabel: {
    es: "💬 Tu Respuesta Completa:",
    en: "💬 Your Complete Answer:"
  },
  midtermFeedbackSyntaxLabel: {
    es: "💡 Estructura Gramatical:",
    en: "💡 Grammatical Structure:"
  },
  midtermListenModelAudioBtn: {
    es: "🔊 Escuchar Pronunciación",
    en: "🔊 Listen to Pronunciation"
  },
  midtermTestPronunciationBtn: {
    es: "🎙️ Probar Pronunciación",
    en: "🎙️ Test Pronunciation"
  },
  midtermRecordingPronunciation: {
    es: "Grabando...",
    en: "Recording..."
  },
  midtermPronunciationMatch: {
    es: "Coincidencia de pronunciación:",
    en: "Pronunciation match:"
  },
  midtermPronunciationExcellent: {
    es: "¡Excelente!",
    en: "Excellent!"
  },
  midtermPronunciationNeedsPractice: {
    es: "Práctica recomendada",
    en: "Practice recommended"
  },
  midtermElenaHeard: {
    es: (transcript) => `Elena escuchó: "${transcript}"`,
    en: (transcript) => `Elena heard: "${transcript}"`
  },
  midtermRetryBtn: {
    es: "Reintentar",
    en: "Retry"
  },
  midtermNextQuestionBtn: {
    es: "Siguiente Pregunta",
    en: "Next Question"
  },
  midtermFinishPracticeBtn: {
    es: "Finalizar Práctica",
    en: "Finish Practice"
  },
  midtermViewChallengeResultsBtn: {
    es: "Ver Resultados del Desafío",
    en: "View Challenge Results"
  },
  midtermAdjustSentenceBtn: {
    es: "Ajustar Oración",
    en: "Adjust Sentence"
  },
  midtermCorrectAnswerBtn: {
    es: "Corregir",
    en: "Correct"
  },

  // Midterm: Open Mode
  midtermOpenHeaderTitle: {
    es: "Modo Libre: Banco de Palabras por Categorías",
    en: "Free Mode: Categorized Word Bank"
  },
  midtermOpenHeaderDesc: {
    es: "Combina palabras de los 6 cajones temáticos para crear tu respuesta con traducción en tiempo real.",
    en: "Combine words from the 6 thematic drawers to craft your own sentence with real-time translation."
  },
  midtermOpenScore: {
    es: (score, total) => `Aciertos: ${score} / ${total}`,
    en: (score, total) => `Validated: ${score} / ${total}`
  },
  midtermOpenGoalCallout: {
    es: "🎯 Meta del Modo Libre: ¡Valida al menos 9 de las 10 preguntas para desbloquear la medalla \"Listo para el Examen (Ready for the Midterm)\" (+50 XP, +25 Oro)!",
    en: "🎯 Free Mode Goal: Validate at least 9 of 10 questions to unlock the \"Ready for the Midterm\" Badge (+50 XP, +25 Gold)!"
  },
  midtermOpenYourSentenceLabel: {
    es: "Tu Oración Personal (Toca las palabras de los cajones para agregarlas):",
    en: "Your Custom Sentence (Tap words from the drawers below to add them):"
  },
  midtermOpenCleanBtn: {
    es: "Limpiar",
    en: "Clear"
  },
  midtermOpenEmptyPrompt: {
    es: "Elige palabras de los cajones inferiores para armar tu propia respuesta libre...",
    en: "Pick words from the drawers below to assemble your custom response..."
  },
  midtermOpenLiveTranslationTitle: {
    es: "🇬🇧 Traducción en Vivo de tu Oración Creada:",
    en: "🇬🇧 Live English Translation of Your Created Sentence:"
  },
  midtermOpenLiveTranslationEmpty: {
    es: "(Agrega palabras arriba para ver la traducción en tiempo real de tu oración personalizada)",
    en: "(Add words above to see the real-time English translation of your custom sentence)"
  },
  midtermDrawerVerbs: {
    es: "Verbos Pretéritos",
    en: "Preterite Verbs"
  },
  midtermDrawerPeople: {
    es: "Personas",
    en: "People"
  },
  midtermDrawerPlaces: {
    es: "Lugares",
    en: "Places"
  },
  midtermDrawerObjects: {
    es: "Objetos y Compras",
    en: "Objects & Purchases"
  },
  midtermDrawerConnectors: {
    es: "Conectores",
    en: "Connectors"
  },
  midtermDrawerAdjectives: {
    es: "Emociones y Adjetivos",
    en: "Emotions & Adjectives"
  },
  midtermOpenCheckBtn: {
    es: "Comprobar mi Oración Creada",
    en: "Validate My Custom Sentence"
  },
  midtermOpenValidatedSuccess: {
    es: "¡Oración Validada con Éxito!",
    en: "Sentence Validated Successfully!"
  },
  midtermOpenGrammarAttention: {
    es: "Atención Gramatical",
    en: "Grammar Check Required"
  },
  midtermOpenConfirmedTranslation: {
    es: "Traducción confirmada:",
    en: "Confirmed Translation:"
  },
  midtermOpenListenMineBtn: {
    es: "🔊 Escuchar Mi Oración",
    en: "🔊 Listen to My Sentence"
  },

  // Midterm: Challenge Mode
  midtermChallengeHeaderTitle: {
    es: "Modo Desafío del Examen de Medio Término",
    en: "Midterm Oral Exam: Challenge Mode"
  },
  midtermChallengeHeaderDesc: {
    es: "Condiciones de examen real: Preguntas solo en español (sin traducción). Escribe o dicta tu respuesta.",
    en: "Real exam conditions: Questions in Spanish only (no translations). Type or dictate your answer."
  },
  midtermChallengeGoalCallout: {
    es: "🎯 Meta del Modo Desafío: ¡Consigue un 10/10 perfecto (sin traducción, escribiendo o dictando) para ganar la medalla \"Maestro del Examen de Medio Término\" y el legendario Corazón de Titán (¡Doble de Vida permanente: 200 HP!)!",
    en: "🎯 Challenge Mode Goal: Achieve a perfect 10/10 (no translations, typing or speaking) to earn the \"Midterm Master\" Badge and the legendary Titan's Heart (Permanent double health: 200 HP)!"
  },
  midtermChallengeFormulaLabel: {
    es: "Formula tu respuesta en pretérito (Typing o Micrófono):",
    en: "Craft your answer in preterite (Typing or Microphone):"
  },
  midtermChallengeStopDictation: {
    es: "Detener Dictado",
    en: "Stop Dictation"
  },
  midtermChallengeStartDictation: {
    es: "🎙️ Dictar por Micrófono",
    en: "🎙️ Speak into Microphone"
  },
  midtermChallengePlaceholder: {
    es: "Ejemplo: Fui con mi mejor amigo al centro comercial porque queríamos comprar ropa...",
    en: "Example: Fui con mi mejor amigo al centro comercial porque queríamos comprar ropa..."
  },
  midtermChallengeTildes: {
    es: "Tildes:",
    en: "Accents:"
  },
  midtermChallengeCheckBtn: {
    es: "Comprobar Respuesta en Desafío",
    en: "Submit Challenge Answer"
  },
  midtermChallengeSuccess: {
    es: "¡Correcto en Modo Desafío! (+20 XP, +10 Oro)",
    en: "Correct in Challenge Mode! (+20 XP, +10 Gold)"
  },
  midtermChallengeAdjustment: {
    es: "Necesita Ajuste Gramatical",
    en: "Needs Grammar Adjustment"
  },
  midtermChallengeEstimatedTranslation: {
    es: "Traducción estimada:",
    en: "Estimated translation:"
  },
  midtermChallengeListenDictated: {
    es: "🔊 Escuchar Mi Respuesta Dictada",
    en: "🔊 Listen to My Dictated Answer"
  },

  // Midterm: Navigator & Modals
  midtermNavTitle: {
    es: "Navegador de Preguntas (1 a 10):",
    en: "Question Navigator (1 to 10):"
  },
  midtermNavPrev: {
    es: "← Anterior",
    en: "← Previous"
  },
  midtermNavNext: {
    es: "Siguiente →",
    en: "Next →"
  },
  midtermModalOpenWinTitle: {
    es: "¡Listo para el Examen Oral!",
    en: "Ready for the Oral Exam!"
  },
  midtermModalOpenProgressTitle: {
    es: "Progreso de Modo Libre",
    en: "Free Mode Progress"
  },
  midtermModalOpenScore: {
    es: (score) => `Puntuación: ${score} / 10 Preguntas Validadas`,
    en: (score) => `Score: ${score} / 10 Questions Validated`
  },
  midtermModalOpenBadgeName: {
    es: "¡Medalla Desbloqueada: \"Listo para el Examen\"!",
    en: "Badge Unlocked: \"Ready for the Midterm\"!"
  },
  midtermModalOpenBadgeDesc: {
    es: "Has demostrado soltura construyendo oraciones con el vocabulario oficial del examen. ¡Recompensas otorgadas: +50 XP, +25 Oro!",
    en: "You have demonstrated fluency crafting sentences with official syllabus vocabulary. Rewards awarded: +50 XP, +25 Gold!"
  },
  midtermModalOpenNextPrompt: {
    es: "⚔️ ¿Listo para el siguiente nivel? ¡Completa el Modo Desafío con 10/10 para desbloquear la medalla \"Maestro del Examen\" y ganar el Corazón de Titán (Doble vida permanente: 200 HP)!",
    en: "⚔️ Ready for the next level? Complete Challenge Mode with 10/10 to unlock the \"Midterm Master\" Badge and win the Titan's Heart (Permanent double HP: 200 HP)!"
  },
  midtermModalOpenContinuePractice: {
    es: "Continuar Práctica",
    en: "Continue Practice"
  },
  midtermModalOpenGoChallenge: {
    es: "⚔️ Ir al Desafío (200 HP)",
    en: "⚔️ Go to Challenge (200 HP)"
  },
  midtermModalChallengeWinTitle: {
    es: "¡Maestro Supremo del Examen Oral!",
    en: "Supreme Oral Exam Master!"
  },
  midtermModalChallengeResultsTitle: {
    es: "Resultados del Desafío Oral",
    en: "Oral Challenge Results"
  },
  midtermModalChallengeScore: {
    es: (score) => `Puntuación Final: ${score} / 10 Correctas`,
    en: (score) => `Final Score: ${score} / 10 Correct`
  },
  midtermModalChallengeTitanWon: {
    es: "¡Has ganado el legendario Corazón de Titán!",
    en: "You have won the legendary Titan's Heart!"
  },
  midtermModalChallengeTitanDesc: {
    es: "Tu vida máxima se ha duplicado permanentemente a 200 HP en todo el juego, y has desbloqueado la medalla \"Maestro del Examen de Medio Término\"!",
    en: "Your maximum health has permanently doubled to 200 HP across the entire game, and you unlocked the \"Midterm Master\" Badge!"
  },
  midtermModalChallengePartialDesc: {
    es: (score) => `Obtuviste ${score} de 10 preguntas correctas. Para desbloquear la medalla "Maestro del Examen" y duplicar tu vida a 200 HP con el Corazón de Titán, se requiere una puntuación perfecta de 10/10.`,
    en: (score) => `You scored ${score} out of 10 questions correct. To unlock the "Midterm Master" badge and double your health to 200 HP with the Titan's Heart, a perfect 10/10 is required.`
  },

  // Settings Menu
  settingsTitle: {
    es: "Configuración (Settings)",
    en: "Settings"
  },
  settingsClose: {
    es: "Cerrar",
    en: "Close"
  },
  settingsTranslateToggleLabel: {
    es: "Traducir instrucciones al inglés (Translate Instructions)",
    en: "Translate Instructions to English"
  },
  settingsTranslateToggleDesc: {
    es: "Muestra traducciones al inglés en instrucciones de niveles, reglas de desafíos y menús (por defecto en español para máxima inmersión).",
    en: "Displays English translations for level instructions, challenge rules, and UI menus (defaults to Spanish for maximum immersion)."
  },
  settingsVosotrosLabel: {
    es: "Ignorar formas de \"vosotros\" (España)",
    en: "Ignore \"vosotros\" forms (Spain)"
  },
  settingsVosotrosDesc: {
    es: "Oculta formas plurales específicas de España en cuestionarios y Codex (activo por defecto).",
    en: "Hides Spain-specific plural forms in quizzes & Codex (active by default)."
  },
  settingsDifficultyHeader: {
    es: "Dificultad (Difficulty Mode)",
    en: "Difficulty Mode"
  },
  settingsDiffRelaxedBtn: {
    es: "Relajada",
    en: "Relaxed"
  },
  settingsDiffStandardBtn: {
    es: "Estándar",
    en: "Standard"
  },
  settingsDiffHardcoreBtn: {
    es: "Hardcore",
    en: "Hardcore"
  },
  settingsDiffRelaxedDesc: {
    es: "Relajada: Sin daño en cuestionarios. 50% de recompensas de XP y Oro.",
    en: "Relaxed: No quiz damage. 50% XP and Gold rewards."
  },
  settingsDiffStandardDesc: {
    es: "Estándar: 15 HP de daño por cada error en cuestionarios.",
    en: "Standard: 15 HP damage per mistake in quizzes."
  },
  settingsDiffHardcoreDesc: {
    es: "Hardcore: 30 HP de daño. Desmayarse reinicia el nivel de la misión. ¡Recompensas dobles (2x)!",
    en: "Hardcore: 30 HP damage. Fainting resets quest level. 2x rewards!"
  },
  settingsTtsHeader: {
    es: "Pronunciación y Voz (Text-to-Speech)",
    en: "Pronunciation & Voice (Text-to-Speech)"
  },
  settingsTtsVoiceLabel: {
    es: "Voz en Español:",
    en: "Spanish Voice:"
  },
  settingsTtsVoiceAuto: {
    es: "Auto (Voz natural recomendada de tu sistema)",
    en: "Auto (System recommended natural voice)"
  },
  settingsTtsSpeedLabel: {
    es: "Velocidad:",
    en: "Speed:"
  },
  settingsTtsGeminiLabel: {
    es: "Gemini Studio AI Voice (Voz humana)",
    en: "Gemini Studio AI Voice (Human Voice)"
  },
  settingsTtsGeminiDesc: {
    es: "Pronunciación ultra-realista generada por IA.",
    en: "Ultra-realistic AI-generated voice pronunciation."
  },
  settingsTtsTestBtn: {
    es: "🔊 Probar Pronunciación",
    en: "🔊 Test Pronunciation"
  },
  settingsGeminiKeyHeader: {
    es: "Gemini API Key (Opcional)",
    en: "Gemini API Key (Optional)"
  },
  settingsGeminiKeyDesc: {
    es: "Requerido para chatear libremente con Elena en el AI Chat.",
    en: "Required for freeform conversation with Elena in AI Chat."
  },
  settingsFeedbackHeader: {
    es: "Comentarios y Sugerencias",
    en: "Feedback & Suggestions"
  },
  settingsFeedbackBtn: {
    es: "Enviar correo a jsorba@mail.pima.edu",
    en: "Email feedback to jsorba@mail.pima.edu"
  },
  settingsSaveHeader: {
    es: "Guardar y Restaurar (Save & Backup)",
    en: "Save & Backup"
  },
  settingsSaveDesc: {
    es: "Exporta tu archivo de guardado para respaldar tu progreso o transferirlo a otro navegador o dispositivo.",
    en: "Export your save file to backup your progress or transfer it to another browser or device."
  },
  settingsSaveExportBtn: {
    es: "Exportar (.json)",
    en: "Export (.json)"
  },
  settingsSaveCopyBtn: {
    es: "Copiar",
    en: "Copy"
  },
  settingsSaveCopied: {
    es: "¡Copiado!",
    en: "Copied!"
  },
  settingsSaveImportFileBtn: {
    es: "Importar Archivo",
    en: "Import File"
  },
  settingsSavePasteBtn: {
    es: "Pegar",
    en: "Paste Code"
  },
  settingsSavePastePrompt: {
    es: "Pega aquí el código JSON de tu partida:",
    en: "Paste your save JSON code here:"
  },
  settingsSaveCancelBtn: {
    es: "Cancelar",
    en: "Cancel"
  },
  settingsSaveRestoreBtn: {
    es: "Restaurar",
    en: "Restore"
  },
  settingsDangerHeader: {
    es: "Zona de Peligro (Danger Zone)",
    en: "Danger Zone"
  },
  settingsResetAllBtn: {
    es: "Reiniciar Todo el Progreso",
    en: "Reset All Progress"
  },
  settingsFooterClose: {
    es: "Cerrar",
    en: "Close"
  },
  settingsFooterSave: {
    es: "Guardar",
    en: "Save"
  },
  settingsRestoreConfirm: {
    es: "¿Deseas restaurar esta partida? Esto reemplazará tu progreso actual con los datos del archivo.",
    en: "Do you want to restore this save? This will replace your current progress with the imported data."
  },
  settingsResetConfirm: {
    es: "¿De veras? ¿Estás seguro de que deseas reiniciar todas las estadísticas, medallas y progreso? Esto no se puede deshacer.",
    en: "Are you sure you want to reset all stats, badges, and progress? This cannot be undone."
  },
  settingsSaveDownloadSuccess: {
    es: "¡Archivo de guardado descargado exitosamente!",
    en: "Save file downloaded successfully!"
  },
  settingsSaveDownloadError: {
    es: "Error al exportar el archivo de guardado.",
    en: "Error exporting save file."
  },
  settingsSaveCopySuccess: {
    es: "¡Código de guardado copiado al portapapeles!",
    en: "Save code copied to clipboard!"
  },
  settingsSaveCopyError: {
    es: "No se pudo copiar automáticamente. Puedes descargar el archivo .json.",
    en: "Could not copy automatically. You can download the .json file."
  },
  settingsSaveEmptyPasteError: {
    es: "Por favor pega el código JSON de tu partida antes de restaurar.",
    en: "Please paste your save JSON code before restoring."
  },

  // Header & Dashboard
  headerQuickTranslate: {
    es: "Traducir Instrucciones",
    en: "Translate Instructions"
  },
  headerOralExamBtn: {
    es: "Examen Oral",
    en: "Oral Exam"
  },
  dashGreeting: {
    es: "¡Hola, Aventurero!",
    en: "Hello, Adventurer!"
  },
  dashSubtitle: {
    es: "Bienvenido de nuevo. ¿Cuál es tu meta hoy?",
    en: "Welcome back. What is your goal today?"
  },
  dashSettingsBtn: {
    es: "Configuración",
    en: "Settings"
  },
  dashMidtermCardTitle: {
    es: "Examen Oral: Medio Término (Midterm Practice)",
    en: "Oral Exam: Midterm Practice"
  },
  dashMidtermCardBadge: {
    es: (c) => `${c}/10 Completadas`,
    en: (c) => `${c}/10 Completed`
  },
  dashMidtermCardDesc: {
    es: "Practica las 10 preguntas del examen oral (PDF) con audio oculto, banco de palabras, traducciones bilingües y el Desafío del Corazón de Titán.",
    en: "Practice the 10 oral exam questions (PDF) with hidden audio, word bank, bilingual reviews, and the Titan's Heart Challenge."
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
