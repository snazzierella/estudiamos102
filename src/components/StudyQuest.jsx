import React, { useState, useEffect, useRef } from 'react';
import vocabularyData from '../data/vocabulary.json';
import { STAGES, formatEnglishPrompt } from '../utils/difficultyMapper';
import { 
  generateConjugationQuestion, 
  generatePreteriteTranslationMC,
  getPreteriteFlashcardDetails,
  getVocabKey,
  isPreteriteFocusItem,
  generateFillInTheBlank, 
  conjugate,
  isVerbItem,
  parseVerb,
  isGustarVerb,
  isReciprocalVerb,
  isPreteriteTense,
  INDIRECT_OBJECT_PRONOUNS,
  isEligibleForFlashcard,
  isSentenceItem,
  BLANK_SPECS,
  generateContrastQuestion,
  getVerbPracticeCards,
  isPreteriteSpellingChanger,
  isPreteriteStemChanger,
  isPreteriteDoubleVowel,
  getVerbCategories,
  getVerbCategoryInfo,
  VERB_LAB_GROUPS,
  getVerbsForGroups,
  cleanConjugationInput,
  sanitizeMeaningForQuiz
} from '../utils/conjugationHelper';
import { t } from '../utils/translationsHelper';
import { speakSpanish as speakSpanishUtil } from '../utils/speechHelper';
import { generateSentenceBuilderQuestion, SENTENCE_POOLS } from '../utils/sentenceBuilderHelper';
import { CONTRAST_CODEX_TABS, CONTRAST_TABS_CONTENT } from '../utils/codexData';
import SentenceBuilder from './SentenceBuilder';
import { 
  Swords, 
  ArrowLeft, 
  ArrowRight, 
  Volume2, 
  Coins, 
  Heart, 
  Award, 
  Shuffle, 
  Play,
  CheckCircle2,
  Lock,
  RotateCcw,
  Layers,
  Compass,
  Zap,
  Skull,
  Globe
} from 'lucide-react';
import { getLevelInfo } from '../utils/levelInfoHelper';

export default function StudyQuest({ 
  state, 
  addXp, 
  addGold, 
  takeDamage, 
  revive, 
  recordWordAnsweredCorrectly, 
  recordQuizPerformance, 
  advanceQuest, 
  passStageReview, 
  recordLevelCompletion,
  incrementBountyCount,
  markFlashcardsSeen, 
  addMistake, 
  updateWordMastery, 
  toggleAutoSpeak, 
  toggleTranslateInstructions,
  setView, 
  defaultTab = "quest" 
}) {
  const [activeTab, setActiveTab] = useState(defaultTab === 'contrasts' ? 'quest' : defaultTab);

  useEffect(() => {
    if (defaultTab === 'contrasts') {
      setActiveTab('quest');
      openCodex('guia_contrastes');
    } else if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  // -------------------------------------------------------------
  // STATE FOR QUEST CAMPAIGN
  // -------------------------------------------------------------
  const [questStarted, setQuestStarted] = useState(false);
  const [questQuestions, setQuestQuestions] = useState([]);
  const [questCurrentIdx, setQuestCurrentIdx] = useState(0);
  const [questFinished, setQuestFinished] = useState(false);
  const [questScore, setQuestScore] = useState(0);
  const [questFlipped, setQuestFlipped] = useState(false); // for card intro
  const [questAnswered, setQuestAnswered] = useState(false);
  const [questSelected, setQuestSelected] = useState(null);
  const [questSuccessMsg, setQuestSuccessMsg] = useState("");
  const [questFailMsg, setQuestFailMsg] = useState("");
  const [shakeTrigger, setShakeTrigger] = useState(false);
  const [healTrigger, setHealTrigger] = useState(false);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [questMissedQuestions, setQuestMissedQuestions] = useState([]);
  const [redemptionQuestions, setRedemptionQuestions] = useState([]);
  const [redemptionActive, setRedemptionActive] = useState(false);
  const [redemptionCurrentIdx, setRedemptionCurrentIdx] = useState(0);
  const [redemptionTyped, setRedemptionTyped] = useState("");
  const [redemptionAnswered, setRedemptionAnswered] = useState(false);
  const [redemptionSelected, setRedemptionSelected] = useState(null);
  const [_redemptionScore, setRedemptionScore] = useState(0);
  const [redemptionFailed, setRedemptionFailed] = useState(false);
  const [redemptionSuccess, setRedemptionSuccess] = useState(false);

  // RPG & Combo details
  const [comboCount, setComboCount] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [codexVerb, setCodexVerb] = useState(null);
  const [codexTense, setCodexTense] = useState("present");
  const [objectPronounTab, setObjectPronounTab] = useState("direct");
  const [contrastCodexTab, setContrastCodexTab] = useState("por_para");
  const [codexLang, setCodexLang] = useState("en"); // 'en' (default) or 'es'
  const [codexVerbCategory, setCodexVerbCategory] = useState("u_group");
  const [codexVerbSubcategory, setCodexVerbSubcategory] = useState(null);
  const [isListening, setIsListening] = useState(false);
  
  // Hint reveal tracking for hintless lesson achievements
  const [hintsUsedInSession, setHintsUsedInSession] = useState(0);
  const [questHintRevealed, setQuestHintRevealed] = useState(false);
  const [practiceHintRevealed, setPracticeHintRevealed] = useState(false);
  const [redemptionHintRevealed, setRedemptionHintRevealed] = useState(false);
  
  const questInputRef = useRef(null);
  const practiceInputRef = useRef(null);

  // Level select & replay state
  const [selectedStage, setSelectedStage] = useState(state.questStage || 1);
  const [selectedLevel, setSelectedLevel] = useState(state.isReviewReady ? 25 : (state.questLevel || 1));
  const [activeQuestStage, setActiveQuestStage] = useState(state.questStage || 1);
  const [activeQuestLevel, setActiveQuestLevel] = useState(state.isReviewReady ? 25 : (state.questLevel || 1));
  const [activeQuestIsReview, setActiveQuestIsReview] = useState(state.isReviewReady || false);
  const [activeQuestIsReplay, setActiveQuestIsReplay] = useState(false);
  const [activeQuestIsEarlyBoss, setActiveQuestIsEarlyBoss] = useState(false);
  const [earlyBossFailed, setEarlyBossFailed] = useState(false);

  const translateInstructions = Boolean(state.translateInstructions);
  const [cardTranslateOverride, setCardTranslateOverride] = useState(null);
  const showCardTranslate = cardTranslateOverride !== null ? cardTranslateOverride : translateInstructions;

  // Sync selected stage/level when campaign state changes
  useEffect(() => {
    setSelectedStage(prev => (prev > (state.questStage || 1) ? (state.questStage || 1) : prev));
    setCardTranslateOverride(null);
  }, [state.questStage]);

  useEffect(() => {
    if (selectedStage === state.questStage) {
      setSelectedLevel(state.isReviewReady ? 25 : (state.questLevel || 1));
    }
    setCardTranslateOverride(null);
  }, [state.questLevel, state.isReviewReady, state.questStage, selectedStage]);

  const isEarlyBossLevel = (stageNum, levelNum) => {
    return stageNum === state.questStage && levelNum === 25 && !state.isReviewReady;
  };

  const isLevelPassed = (stageNum, levelNum) => {
    if (stageNum < state.questStage) return true;
    if (stageNum > state.questStage) return false;
    // For current stage:
    if (state.isReviewReady) return levelNum < 25;
    return levelNum < state.questLevel;
  };

  const isLevelCurrent = (stageNum, levelNum) => {
    if (stageNum !== state.questStage) return false;
    if (state.isReviewReady) return levelNum === 25;
    return levelNum === state.questLevel;
  };

  const isLevelLocked = (stageNum, levelNum) => {
    // Early boss challenge (Level 25 on current stage) is never locked!
    if (isEarlyBossLevel(stageNum, levelNum)) return false;
    return !isLevelPassed(stageNum, levelNum) && !isLevelCurrent(stageNum, levelNum);
  };

  const openCodex = (verbItemOrString, explicitTense = null) => {
    let target = verbItemOrString;
    let targetTense = explicitTense;

    // Helper to detect initial tab for object pronouns codex
    const detectPronounTab = (tgt) => {
      if (!tgt) return null;
      let str = "";
      let subcat = "";
      let eng = "";
      if (typeof tgt === 'string') {
        str = tgt.toLowerCase();
      } else if (typeof tgt === 'object') {
        str = (tgt.spanish || tgt.questionWord || "").toLowerCase();
        subcat = (tgt.subcategory || "").toLowerCase();
        eng = (tgt.english || "").toLowerCase();
      }
      if (str.includes("se lo") || str.includes("te lo") || str.includes("nos lo") || eng.includes("double") || subcat.includes("doble")) {
        return "double";
      }
      if (
        subcat.includes("indirect") || 
        eng.includes("indirect") || 
        /^(me dio|te dije|le di|nos mandaron|les pidió|yo le di|el recepcionista nos dio|el botones les subió|ella va a mostrarme|ella me va a mostrar)/.test(str) ||
        /^(le|les)$/.test(str)
      ) {
        return "indirect";
      }
      if (subcat.includes("direct") || eng.includes("direct") || /^(lo|la|los|las)$/.test(str) || str.includes("dop")) {
        return "direct";
      }
      return null;
    };

    const detectedTab = detectPronounTab(target);

    // Contrast Guide shortcut & contrast topic detection
    if (target === "guia_contrastes" || target === "contrastes" || target === "contrasts") {
      setCodexVerb("guia_contrastes");
      if (explicitTense) setContrastCodexTab(explicitTense);
      return;
    }

    if (typeof target === 'string') {
      const low = target.toLowerCase();
      if (low.includes('por') && low.includes('para')) {
        setCodexVerb("guia_contrastes");
        setContrastCodexTab("por_para");
        return;
      }
      if (low.includes('become') || low.includes('ponerse') || low.includes('volverse') || low.includes('hacerse')) {
        setCodexVerb("guia_contrastes");
        setContrastCodexTab("to_become");
        return;
      }
      if (low.includes('realize') || low.includes('darse cuenta') || low.includes('realizar')) {
        setCodexVerb("guia_contrastes");
        setContrastCodexTab("to_realize");
        return;
      }
      if (low.includes('personal') || low.includes('a personal')) {
        setCodexVerb("guia_contrastes");
        setContrastCodexTab("personal_a");
        return;
      }
      if (low.includes('saber') || low.includes('conocer') || low.includes('ser vs estar') || low.includes('ser/estar')) {
        setCodexVerb("guia_contrastes");
        setContrastCodexTab("saber_conocer_ser_estar");
        return;
      }
      if (low.includes('recíproco') || low.includes('reciproco') || low.includes('reflexiv')) {
        setCodexVerb("guia_contrastes");
        setContrastCodexTab("reciprocal_reflexive");
        return;
      }
      if (low.includes('pretérito') || low.includes('preterito') || low.includes('cambio de raíz') || low.includes('radical') || low.includes('ortografía')) {
        setCodexVerb("guia_contrastes");
        setContrastCodexTab("preterite_families");
        return;
      }
      if (low.includes('devolver') || low.includes('volver')) {
        setCodexVerb("guia_contrastes");
        setContrastCodexTab("devolver_volver");
        return;
      }
    }

    // Direct object / indirect object pronoun shortcut
    if (target === "pronombres_objeto" || target === "pronoun") {
      setCodexVerb("pronombres_objeto");
      setCodexTense("present");
      if (detectedTab) setObjectPronounTab(detectedTab);
      return;
    }

    if (typeof target === 'object' && target !== null) {
      if (target.targetVerb) {
        if (!targetTense && target.tense) targetTense = target.tense;
        target = target.targetVerb;
      } else if (target.infinitive) {
        if (!targetTense && target.tense) targetTense = target.tense;
        target = target.infinitive;
      } else if (target.spanish) {
        const sp = target.spanish.trim().toLowerCase();
        if (BLANK_SPECS && BLANK_SPECS[sp]?.targetVerb) {
          if (!targetTense && BLANK_SPECS[sp].tense) targetTense = BLANK_SPECS[sp].tense;
          target = BLANK_SPECS[sp].targetVerb;
        } else if (target.type === "pronoun" || target.subcategory?.includes("Objeto") || (BLANK_SPECS && BLANK_SPECS[sp]?.type === "pronoun")) {
          setCodexVerb("pronombres_objeto");
          setCodexTense("present");
          if (detectedTab) setObjectPronounTab(detectedTab);
          return;
        } else {
          target = target.spanish;
        }
      } else if (target.type === "pronoun" || target.subcategory?.includes("Objeto")) {
        setCodexVerb("pronombres_objeto");
        setCodexTense("present");
        if (detectedTab) setObjectPronounTab(detectedTab);
        return;
      }
    }

    let verbStr = String(target || "").trim();

    // If verbStr is a known sentence from BLANK_SPECS, resolve its targetVerb or pronoun type
    if (BLANK_SPECS && BLANK_SPECS[verbStr.toLowerCase()]) {
      const spec = BLANK_SPECS[verbStr.toLowerCase()];
      if (spec.targetVerb) {
        if (!targetTense && spec.tense) targetTense = spec.tense;
        verbStr = spec.targetVerb;
      } else if (spec.type === "pronoun") {
        setCodexVerb("pronombres_objeto");
        setCodexTense("present");
        if (detectedTab) setObjectPronounTab(detectedTab);
        return;
      }
    }

    if (
      verbStr === "pronombres_objeto" || 
      /^(lo|la|los|las|me|te|le|les|se|nos|os)$/i.test(verbStr) ||
      verbStr.toLowerCase().includes("se lo") ||
      verbStr.toLowerCase().includes("te lo") ||
      verbStr.toLowerCase().includes("nos lo")
    ) {
      setCodexVerb("pronombres_objeto");
      setCodexTense("present");
      if (detectedTab) setObjectPronounTab(detectedTab);
      return;
    }

    let resolvedTense = targetTense;
    if (!resolvedTense) {
      const isPreterite = typeof verbItemOrString === 'object' && verbItemOrString !== null
        ? (verbItemOrString.subcategory?.includes("Pretérito") || verbItemOrString.unit?.includes("Unit 3") || verbItemOrString.unit?.includes("Unit 4") || verbItemOrString.english?.toLowerCase().includes("preterite") || verbItemOrString.english?.toLowerCase().includes("(past)"))
        : /fui|hice|tuve|estuve|pude|puse|supe|vine|dije|traje|di|vi/i.test(verbStr);
      resolvedTense = isPreterite ? "preterite" : "present";
    }
    setCodexTense(resolvedTense);

    setCodexVerb(verbStr);
    const catInfo = getVerbCategoryInfo(verbStr, resolvedTense);
    if (catInfo) {
      setCodexVerbCategory(catInfo.categoryId);
      setCodexVerbSubcategory(catInfo.subcategoryId || null);
    }
  };

  // -------------------------------------------------------------
  // STATE FOR FREE PRACTICE
  // -------------------------------------------------------------
  const [practiceMode, setPracticeMode] = useState("cards"); // "cards" or "quiz"
  const [practiceCategories, setPracticeCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("Repaso 101");
  const [selectedSubcategory, setSelectedSubcategory] = useState("All of Unit 1 (Todo el Repaso)");
  const [practiceCards, setPracticeCards] = useState([]);
  const [practiceCurrentIdx, setPracticeCurrentIdx] = useState(0);
  const [practiceFlipped, setPracticeFlipped] = useState(false);
  const [practiceQuizStarted, setPracticeQuizStarted] = useState(false);
  const [practiceQuizFinished, setPracticeQuizFinished] = useState(false);
  const [practiceQuizMode, setPracticeQuizMode] = useState("translation"); // "translation" or "conjugation"
  const [practiceTense, setPracticeTense] = useState("auto"); // "auto", "present", "preterite", "both"
  const [practiceQuestions, setPracticeQuestions] = useState([]);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceAnswered, setPracticeAnswered] = useState(false);
  const [practiceSelected, setPracticeSelected] = useState(null);
  const [practiceTyped, setPracticeTyped] = useState("");
  const [selectedVerbGroups, setSelectedVerbGroups] = useState(() => VERB_LAB_GROUPS.map(g => g.id));
  const [practiceInputMode, setPracticeInputMode] = useState("choice"); // "choice" or "typed"
  const [practiceQuestionCount, setPracticeQuestionCount] = useState(10); // 10, 25, 50, or 'all'

  // Speech and Audio synthesis refs
  const [speechAvailable, setSpeechAvailable] = useState(false);
  const audioCtxRef = useRef(null);

  // Initialize Speech
  useEffect(() => {
    if ('speechSynthesis' in window) {
      setSpeechAvailable(true);
    }

    // Group categories for free practice
    const grouped = {};
    const all101Subcategories = new Set();

    vocabularyData.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = new Set();
      }
      grouped[item.category].add(item.subcategory);

      if (item.unit === "Unit 1: Repaso 101" || !item.unit) {
        all101Subcategories.add(item.subcategory);
      }
    });

    const formatted = {};
    // 0. Verb Practice Lab
    formatted["⚡ Práctica de Verbos (Verb Practice Lab)"] = [
      "Todos los Verbos (All Verbs Mixed)",
      "Verbos en Pretérito: Cambios Ortográficos (-car, -gar, -zar)",
      "Verbos en Pretérito: Cambio de Raíz (e->i, o->u)",
      "Verbos en Pretérito: Doble Vocal (i -> y)",
      "Verbos Reflexivos y Rutina Diaria (Reflexive Verbs)",
      "Verbos en Pretérito: Raíces Irregulares (U, I, J)"
    ];

    // 1. Repaso 101
    formatted["Repaso 101"] = [
      "All of Unit 1 (Todo el Repaso)",
      ...Array.from(all101Subcategories)
    ];

    // 2. Unidad 2
    if (grouped["Unidad 2"]) {
      formatted["Unidad 2"] = [
        "All of Unit 2 (Todo Unidad 2)",
        "Verbos Reflexivos y Rutina Diaria (Reflexive Verbs)",
        ...Array.from(grouped["Unidad 2"])
      ];
    }

    // 3. Unidad 3
    if (grouped["Unidad 3"]) {
      formatted["Unidad 3"] = [
        "All of Unit 3 (Todo Unidad 3)",
        "Verbos en Pretérito: Cambios Ortográficos (-car, -gar, -zar)",
        "Verbos en Pretérito: Cambio de Raíz (e->i, o->u)",
        ...Array.from(grouped["Unidad 3"])
      ];
    }

    // 4. Unidad 4
    if (grouped["Unidad 4"]) {
      formatted["Unidad 4"] = [
        "All of Unit 4 (Todo Unidad 4)",
        "Verbos en Pretérito: Doble Vocal (i -> y)",
        "Verbos en Pretérito: Raíces Irregulares (U, I, J)",
        ...Array.from(grouped["Unidad 4"])
      ];
    }

    // 5. Unidad 5
    if (grouped["Unidad 5"]) {
      formatted["Unidad 5"] = [
        "All of Unit 5 (Todo Unidad 5)",
        "Verbos en Imperfecto: Regulares (-ar, -er, -ir)",
        "Verbos en Imperfecto: Irregulares (ser, ir, ver)",
        ...Array.from(grouped["Unidad 5"])
      ];
    }

    // 6-8. Coming soon units
    for (let u = 6; u <= 8; u++) {
      const catKey = `Unidad ${u}`;
      const displayKey = `Unidad ${u} (Próximamente)`;
      if (grouped[catKey]) {
        formatted[displayKey] = Array.from(grouped[catKey]);
      }
    }

    // 9. Part-of-speech categories (Verbs consolidated into Verb Lab)
    const posKeys = ["Nouns", "Adjectives", "Grammar & Conversation", "Sentences"];
    posKeys.forEach(cat => {
      if (grouped[cat]) {
        formatted[cat] = Array.from(grouped[cat]);
      }
    });

    // Fallback for any other categories
    const handledKeys = new Set([
      "⚡ Práctica de Verbos (Verb Practice Lab)",
      "Repaso 101",
      "Unidad 2",
      "Unidad 3",
      "Unidad 4",
      "Unidad 5",
      "Unidad 6",
      "Unidad 7",
      "Unidad 8",
      ...posKeys
    ]);
    Object.keys(grouped).forEach(cat => {
      if (!handledKeys.has(cat)) {
        formatted[cat] = Array.from(grouped[cat]);
      }
    });

    setPracticeCategories(formatted);
    setSelectedCategory("Repaso 101");
    setSelectedSubcategory("All of Unit 1 (Todo el Repaso)");
  }, []);

  // Listen for user fainting during an active Quest Campaign level
  useEffect(() => {
    if (state.fainted && questStarted && !redemptionActive) {
      setQuestStarted(false);
      setRedemptionQuestions(() => {
        const list = [...questMissedQuestions];
        if (currentQuestQ && !list.some(q => q.questionWord === currentQuestQ.questionWord)) {
          list.push(currentQuestQ);
        }
        return list;
      });
      setRedemptionActive(true);

      setQuestFinished(false);
      setRedemptionCurrentIdx(0);
      setRedemptionTyped("");
      setRedemptionAnswered(false);
      setRedemptionSelected(null);
      setRedemptionScore(0);
      setRedemptionFailed(false);
      setRedemptionSuccess(false);
      setRedemptionHintRevealed(false);
      setComboCount(0);
    }
  }, [state.fainted, questStarted, redemptionActive, currentQuestQ, questMissedQuestions]);

  // Autoplay TTS for card introductions
  useEffect(() => {
    if (questStarted && currentQuestQ && currentQuestQ.isCardIntro && state.autoSpeak) {
      if (!questFlipped) {
        const pretDetails = isPreteriteFocusItem(currentQuestQ.item)
          ? getPreteriteFlashcardDetails(currentQuestQ.item, state.excludeVosotros)
          : null;
        speakSpanish(pretDetails ? pretDetails.speechText : currentQuestQ.item.spanish);
      }
    }
  }, [questStarted, questCurrentIdx, questFlipped]);

  // Filter free practice cards when category changes
  useEffect(() => {
    const isVerbLab = selectedCategory.includes("Práctica de Verbos") || selectedCategory.includes("Verb Practice Lab") || selectedCategory.includes("Verb Lab");
    let filtered = [];

    if (isVerbLab) {
      filtered = getVerbsForGroups(selectedVerbGroups, vocabularyData);
    } else {
      if (!selectedSubcategory) return;
      const verbCards = getVerbPracticeCards(selectedSubcategory);
      if (verbCards && verbCards.length > 0) {
        filtered = verbCards;
      } else if (selectedCategory === "Repaso 101") {
        if (selectedSubcategory === "All of Unit 1 (Todo el Repaso)") {
          filtered = vocabularyData.filter(item => item.unit === "Unit 1: Repaso 101" || !item.unit);
        } else {
          filtered = vocabularyData.filter(item => 
            item.subcategory === selectedSubcategory && (item.unit === "Unit 1: Repaso 101" || !item.unit)
          );
        }
      } else if (selectedCategory === "Unidad 2") {
        if (selectedSubcategory.startsWith("All of Unit 2")) {
          filtered = vocabularyData.filter(item => item.category === "Unidad 2" || (item.unit && item.unit.startsWith("Unit 2")));
        } else {
          filtered = vocabularyData.filter(item => 
            item.subcategory === selectedSubcategory && (item.category === "Unidad 2" || (item.unit && item.unit.startsWith("Unit 2")))
          );
        }
      } else if (selectedCategory === "Unidad 3") {
        if (selectedSubcategory.startsWith("All of Unit 3")) {
          filtered = vocabularyData.filter(item => item.category === "Unidad 3" || (item.unit && item.unit.startsWith("Unit 3")));
        } else {
          filtered = vocabularyData.filter(item => 
            item.subcategory === selectedSubcategory && (item.category === "Unidad 3" || (item.unit && item.unit.startsWith("Unit 3")))
          );
        }
      } else if (selectedCategory === "Unidad 4") {
        if (selectedSubcategory.startsWith("All of Unit 4")) {
          filtered = vocabularyData.filter(item => item.category === "Unidad 4" || (item.unit && item.unit.startsWith("Unit 4")));
        } else {
          filtered = vocabularyData.filter(item => 
            item.subcategory === selectedSubcategory && (item.category === "Unidad 4" || (item.unit && item.unit.startsWith("Unit 4")))
          );
        }
      } else if (selectedCategory === "Unidad 5") {
        if (selectedSubcategory.startsWith("All of Unit 5")) {
          filtered = vocabularyData.filter(item => item.category === "Unidad 5" || (item.unit && item.unit.startsWith("Unit 5")));
        } else {
          filtered = vocabularyData.filter(item => 
            item.subcategory === selectedSubcategory && (item.category === "Unidad 5" || (item.unit && item.unit.startsWith("Unit 5")))
          );
        }
      } else if (selectedCategory.startsWith("Unidad 5")) {
        filtered = vocabularyData.filter(item => item.category === "Unidad 5" || (item.unit && item.unit.startsWith("Unit 5")));
      } else if (selectedCategory.startsWith("Unidad 6")) {
        filtered = vocabularyData.filter(item => item.category === "Unidad 6" || (item.unit && item.unit.startsWith("Unit 6")));
      } else if (selectedCategory.startsWith("Unidad 7")) {
        filtered = vocabularyData.filter(item => item.category === "Unidad 7" || (item.unit && item.unit.startsWith("Unit 7")));
      } else if (selectedCategory.startsWith("Unidad 8")) {
        filtered = vocabularyData.filter(item => item.category === "Unidad 8" || (item.unit && item.unit.startsWith("Unit 8")));
      } else {
        filtered = vocabularyData.filter(item => 
          item.category === selectedCategory && item.subcategory === selectedSubcategory
        );
      }
    }
    // Practice flashcards must only display vocabulary words/terms, never full sentences or conversational phrases!
    setPracticeCards(filtered.filter(item => isEligibleForFlashcard(item)));
    setPracticeCurrentIdx(0);
    setPracticeFlipped(false);
    setPracticeQuizStarted(false);
    setPracticeQuizFinished(false);
  }, [selectedCategory, selectedSubcategory, selectedVerbGroups]);

  const handleCategoryChange = (e) => {
    const cat = e.target.value;
    setSelectedCategory(cat);
    if (practiceCategories[cat] && practiceCategories[cat].length > 0) {
      setSelectedSubcategory(practiceCategories[cat][0]);
    }
    if (cat.includes("Práctica de Verbos") || cat.includes("Verb Practice Lab") || cat.includes("Verb Lab")) {
      setPracticeQuizMode("conjugation");
    }
  };

  const subcategories = practiceCategories[selectedCategory] || [];
  const isVerbLab = selectedCategory.includes("Práctica de Verbos") || selectedCategory.includes("Verb Practice Lab") || selectedCategory.includes("Verb Lab");

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
  };

  const playSound = (type) => {
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'correct') {
        const now = ctx.currentTime;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        gain.gain.setValueAtTime(0.08, now);
        osc.start(now);
        osc.frequency.setValueAtTime(659.25, now + 0.1);
        osc.stop(now + 0.25);
      } else if (type === 'wrong') {
        const now = ctx.currentTime;
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(70, now + 0.3);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } catch (e) {
      console.warn("Audio synthesis block:", e);
    }
  };

  const speakSpanish = (text) => {
    if (!speechAvailable) return;
    speakSpanishUtil(text, { state });
  };

  const SYNONYM_GROUPS = [
    ["adiós", "adios", "chao", "bye", "goodbye", "bye-bye"],
    ["andar", "caminar", "to walk", "walk"],
    ["bonito", "lindo", "hermoso", "pretty", "beautiful", "lovely"],
    ["maestro", "profesor", "teacher", "professor"],
    ["coche", "carro", "auto", "car", "automobile"],
    ["bolígrafo", "pluma", "pen"],
    ["conversar", "hablar", "to talk", "to speak", "talk", "speak", "converse"],
    ["computadora", "ordenador", "computer"],
    ["estudiante", "alumno", "student"],
    ["apartamento", "departamento", "apartment"],
    ["lápiz", "lapiz", "pencil"],
    ["esposa", "mujer", "wife", "woman"],
  ];

  const cleanAnswer = (str) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .replace(/[¿¡!?.“”"'()\-–—,;:]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  const checkSynonyms = (val1, val2) => {
    const c1 = cleanAnswer(val1);
    const c2 = cleanAnswer(val2);
    if (c1 === c2) return true;
    
    for (let group of SYNONYM_GROUPS) {
      const cleanGroup = group.map(g => cleanAnswer(g));
      if (cleanGroup.includes(c1) && cleanGroup.includes(c2)) {
        return true;
      }
    }
    return false;
  };

  const compareAnswers = (correct, user) => {
    if (checkSynonyms(correct, user)) return true;

    if (correct && correct.includes("/")) {
      const parts = correct.split("/");
      for (let part of parts) {
        if (checkSynonyms(part, user)) {
          return true;
        }
      }
    }
    return false;
  };

  // Web Speech API Voice Dictation
  const handleVoiceInput = (mode) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Chrome or Edge.");
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-MX';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onerror = (e) => {
      console.error("Speech Recognition Error", e);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      if (mode === "quest") {
        setTypedAnswer(text);
      } else if (mode === "practice") {
        setPracticeTyped(text);
      }
    };

    recognition.start();
  };

  // -------------------------------------------------------------
  // QUEST CAMPAIGN CORE LOGIC
  // -------------------------------------------------------------
  const getPreteriteDifficultyTier = (item, levelVal = null, sessionIdx = 0, sessionTotal = 1) => {
    const mastery = state.wordMastery?.[getVocabKey(item)] ?? 2;
    if (levelVal !== null) {
      if (levelVal >= 14 || mastery >= 4) return 3;
      if (levelVal >= 6 || mastery >= 3) return 2;
      return 1;
    }
    const progress = sessionTotal > 1 ? sessionIdx / sessionTotal : 0;
    if (mastery >= 4 || sessionIdx >= 6 || progress >= 0.65) return 3;
    if (mastery >= 3 || sessionIdx >= 3 || progress >= 0.3) return 2;
    return 1;
  };

  const buildPreteriteDrillStep = (item, options = {}) => {
    const tier = options.difficultyTier || getPreteriteDifficultyTier(
      item,
      options.levelVal ?? null,
      options.sessionIdx ?? 0,
      options.sessionTotal ?? 1
    );
    const qSpec = generatePreteriteTranslationMC(item, {
      difficultyTier: tier,
      excludeVosotros: state.excludeVosotros,
      allowTyped: Boolean(options.allowTyped)
    });
    if (!qSpec) return null;
    return {
      item,
      ...qSpec
    };
  };

  const buildProgressiveQuizStep = (item, L, allowConjugation = false) => {
    const fillSpec = generateFillInTheBlank(item);
    if (fillSpec) {
      return {
        item,
        isCardIntro: false,
        isConjugation: false,
        isFillInTheBlank: true,
        questionWord: fillSpec.sentence,
        meaning: fillSpec.meaning,
        correct: fillSpec.correct,
        choices: fillSpec.choices,
        hint: fillSpec.hint,
        targetVerb: fillSpec.targetVerb,
        tense: fillSpec.tense
      };
    }

    const isVerb = isVerbItem(item) && !isSentenceItem(item);
    const isPretFocus = isPreteriteFocusItem(item);

    let format = "mc"; // "mc", "conjugation", "typing", "sentenceBuilder"
    
    // Only allow conjugation if this verb has been introduced and seen in prior flashcards/study
    const canConjugate = isVerb && allowConjugation;

    // Difficulty scaling across unit levels (1 to 19 & Review Gate):
    // Sentence construction questions are reserved for later levels in the unit
    if (L <= 5) {
      // Early introductory levels: 100% Multiple Choice (safe intro)
      format = "mc";
    } else if (L <= 10) {
      // Intermediate early: mostly MC, occasional conjugation/typing (~30%), 0% sentence construction
      format = Math.random() > 0.7 ? (canConjugate ? "conjugation" : "typing") : "mc";
    } else if (L <= 14) {
      // Intermediate late: sentence construction is introduced (~25%)
      const rand = Math.random();
      if (rand < 0.25) {
        format = "sentenceBuilder";
      } else if (rand < 0.65) {
        format = canConjugate ? "conjugation" : "typing";
      } else {
        format = "mc";
      }
    } else {
      // Later levels (L >= 15) and Review Gate: sentence construction is prominently featured (~45%)
      const rand = Math.random();
      if (rand < 0.45) {
        format = "sentenceBuilder";
      } else if (rand < 0.75) {
        format = canConjugate ? "conjugation" : "typing";
      } else {
        format = "mc";
      }
    }

    if (format === "sentenceBuilder") {
      const sSpec = generateSentenceBuilderQuestion({ unit: state.questStage || 1 });
      if (sSpec) {
        return {
          item,
          isCardIntro: false,
          isConjugation: false,
          isFillInTheBlank: false,
          isSentenceBuilder: true,
          unit: sSpec.unit,
          prompt: sSpec.prompt,
          promptLanguage: sSpec.promptLanguage,
          targetLanguage: sSpec.targetLanguage,
          targetSentence: sSpec.targetSentence,
          targetWords: sSpec.targetWords,
          targetTokens: sSpec.targetTokens,
          bankTokens: sSpec.bankTokens,
          distractors: sSpec.distractors,
          meaning: sSpec.meaning,
          hint: sSpec.hint,
          correct: sSpec.targetSentence,
          questionWord: sSpec.prompt,
          choices: []
        };
      }
    }

    if (isPretFocus) {
      const drillStep = buildPreteriteDrillStep(item, {
        levelVal: L,
        allowTyped: L >= 15 && Math.random() < 0.35
      });
      if (drillStep) return drillStep;
    }

    if (format === "conjugation") {
      let stageTense = "present";
      if (
        state.questStage >= 3 ||
        item.unit?.includes("Unit 3") || 
        item.unit?.includes("Unit 4") || 
        item.category === "Unidad 3" || 
        item.category === "Unidad 4" || 
        item.subcategory?.includes("Pretérito") ||
        item.english?.toLowerCase().includes("preterite") ||
        item.english?.toLowerCase().includes("(past)")
      ) {
        stageTense = "preterite";
      }

      const qSpec = generateConjugationQuestion(item, { 
        tense: stageTense,
        excludeVosotros: state.excludeVosotros 
      });
      if (qSpec) {
        return {
          item,
          isCardIntro: false,
          isConjugation: true,
          isGustar: qSpec.isGustar,
          isReciprocal: qSpec.isReciprocal,
          isSpellChanger: qSpec.isSpellChanger,
          isStemChangerPreterite: qSpec.isStemChangerPreterite,
          isDoubleVowel: qSpec.isDoubleVowel,
          subjectPronoun: qSpec.subjectPronoun,
          infinitive: qSpec.infinitive,
          prompt: qSpec.prompt,
          subjectMeaning: qSpec.subjectMeaning,
          questionWord: qSpec.verb,
          meaning: qSpec.meaning,
          pronoun: qSpec.pronoun,
          tense: qSpec.tense,
          tenseLabel: qSpec.tenseLabel,
          isReflexive: qSpec.isReflexive,
          correct: qSpec.correct,
          choices: qSpec.choices
        };
      }
    }
    
    if (format === "typing") {
      const correctText = item.spanish;
      const questionText = formatEnglishPrompt(item.spanish, item.english);
      
      if (item.spanish.includes("/") || item.spanish.includes("(") || item.spanish.length > 25) {
        format = "mc";
      } else {
        return {
          item,
          isCardIntro: false,
          isConjugation: false,
          type: 2,
          questionWord: questionText,
          correct: correctText,
          choices: []
        };
      }
    }

    const qType = Math.random() > 0.5 ? 0 : 1;
    const isEsToEn = qType === 0;
    const correctText = isEsToEn ? formatEnglishPrompt(item.spanish, item.english) : item.spanish;
    const questionText = isEsToEn ? item.spanish : formatEnglishPrompt(item.spanish, item.english);

    const distractors = [];
    const answeredCorrectlyBefore = state.wordsAnsweredCorrectly?.includes(getVocabKey(item));

    if (answeredCorrectlyBefore) {
      const sameSub = vocabularyData.filter(rand => rand.subcategory === item.subcategory);
      const shuffledSub = [...sameSub].sort(() => Math.random() - 0.5);
      for (let rand of shuffledSub) {
        const val = isEsToEn ? formatEnglishPrompt(rand.spanish, rand.english) : rand.spanish;
        if (
          val.toLowerCase() !== correctText.toLowerCase() && 
          !checkSynonyms(val, correctText) &&
          !distractors.includes(val) &&
          val.length < 35
        ) {
          distractors.push(val);
        }
        if (distractors.length === 3) break;
      }

      if (distractors.length < 3) {
        const sameCat = vocabularyData.filter(rand => rand.category === item.category);
        const shuffledCat = [...sameCat].sort(() => Math.random() - 0.5);
        for (let rand of shuffledCat) {
          const val = isEsToEn ? formatEnglishPrompt(rand.spanish, rand.english) : rand.spanish;
          if (
            val.toLowerCase() !== correctText.toLowerCase() && 
            !checkSynonyms(val, correctText) &&
            !distractors.includes(val) &&
            val.length < 35
          ) {
            distractors.push(val);
          }
          if (distractors.length === 3) break;
        }
      }
    }

    if (distractors.length < 3) {
      const shuffledAll = [...vocabularyData].sort(() => Math.random() - 0.5);
      for (let rand of shuffledAll) {
        const val = isEsToEn ? formatEnglishPrompt(rand.spanish, rand.english) : rand.spanish;
        if (
          val.toLowerCase() !== correctText.toLowerCase() && 
          !checkSynonyms(val, correctText) &&
          !distractors.includes(val) &&
          val.length < 35
        ) {
          distractors.push(val);
        }
        if (distractors.length === 3) break;
      }
    }
    const choices = [correctText, ...distractors].sort(() => Math.random() - 0.5);

    return {
      item,
      isCardIntro: false,
      isConjugation: false,
      type: qType,
      questionWord: questionText,
      correct: correctText,
      choices: choices
    };
  };

  const startQuestLevel = (targetStage, targetLevel) => {
    initAudio();
    const stageVal = targetStage !== undefined ? targetStage : (selectedStage || state.questStage);
    const activeStage = STAGES[stageVal];
    if (!activeStage) return;

    let levelVal = targetLevel !== undefined ? targetLevel : (selectedLevel || (state.isReviewReady ? 25 : state.questLevel));
    const isEarlyBoss = stageVal === state.questStage && levelVal === 25 && !state.isReviewReady;
    const isReview = levelVal === 25;
    const isCurrent = isLevelCurrent(stageVal, levelVal);
    const isReplay = !isCurrent && isLevelPassed(stageVal, levelVal);

    setActiveQuestStage(stageVal);
    setActiveQuestLevel(levelVal);
    setActiveQuestIsReview(isReview);
    setActiveQuestIsReplay(isReplay);
    setActiveQuestIsEarlyBoss(isEarlyBoss);
    setEarlyBossFailed(false);

    setQuestMissedQuestions([]);
    setComboCount(0);
    setMaxCombo(0);

    // Leitner Box / SRS Weighting selection:
    // Gather all words in stage, look up mastery, low mastery (<=2) gets weight 3.
    const stageItemsRaw = vocabularyData.filter(item => 
      activeStage.subcategories.includes(item.subcategory)
    );

    const wordMastery = state.wordMastery || {};
    const weightedItems = [];
    stageItemsRaw.forEach(item => {
      const key = getVocabKey(item);
      const rating = wordMastery[key] !== undefined ? wordMastery[key] : 2;
      const weight = rating <= 2 ? 3 : 1;
      for (let w = 0; w < weight; w++) {
        weightedItems.push(item);
      }
    });

    const getUniqueItems = (weighted, count, excludeSet = []) => {
      const result = [];
      const seen = new Set(excludeSet);
      const shuffled = [...weighted].sort(() => Math.random() - 0.5);
      for (let x of shuffled) {
        const key = getVocabKey(x);
        if (!seen.has(key)) {
          result.push(x);
          seen.add(key);
        }
        if (result.length === count) break;
      }
      return result;
    };

    const stageItems = getUniqueItems(weightedItems, stageItemsRaw.length);

    const seenWords = state.stageFlashcardsSeen || [];
    // Only real vocabulary words/terms can be introduced as flashcards.
    // Full sentences (like "a ellos les gusta besarse bajo la lluvia") and conversational phrases
    // must NEVER be presented as flashcard introductions!
    const flashcardEligibleStageItems = stageItems.filter(item => isEligibleForFlashcard(item));
    const unseenStageItems = flashcardEligibleStageItems.filter(item => !seenWords.includes(getVocabKey(item)));

    const isUnit1 = stageVal === 1;
    let finalQuestions = [];

    if (isUnit1) {
      // In Unit 1 (Repaso de 101), we assume students have seen all 101 words at least once.
      // Therefore, NO flashcards are shown in Campaign mode.
      // The focus is primarily on:
      // 1. Verb Conjugation (present tense)
      // 2. Fill in the Blank
      // 3. Sentence Construction (SentenceBuilder)
      // With Vocab Translation as a minor secondary component,
      // and increasing difficulty across later levels (1-24 & Review Gate).

      let sentenceCount = 3;
      let fillCount = 6;
      let conjugationCount = 8;
      let vocabCount = 3;

      if (isEarlyBoss) {
        // Early Boss Challenge (Test-Out / Unit Skip):
        // Extended 30 questions: 14 Sentence Builders, 9 Verb Conjugations, 7 Fill-in-the-Blank
        sentenceCount = 14;
        fillCount = 7;
        conjugationCount = 9;
        vocabCount = 0;
      } else if (isReview) {
        // Review Gate (Boss Battle): 50% Sentence Builder, 30% Conjugation, 20% Fill in the Blank
        sentenceCount = 10;
        fillCount = 4;
        conjugationCount = 6;
        vocabCount = 0;
      } else if (levelVal >= 20) {
        // Levels 20-24: Late synthesis mastery (100% active challenge)
        sentenceCount = 10;
        fillCount = 4;
        conjugationCount = 6;
        vocabCount = 0;
      } else if (levelVal >= 16) {
        // Levels 16-19: Advanced sentence building
        sentenceCount = 8;
        fillCount = 4;
        conjugationCount = 7;
        vocabCount = 1;
      } else if (levelVal >= 11) {
        // Levels 11-15: Advanced syntax & agreement
        sentenceCount = 6;
        fillCount = 5;
        conjugationCount = 7;
        vocabCount = 2;
      } else if (levelVal >= 6) {
        // Levels 6-10: Stem-changers & irregular yo
        sentenceCount = 4;
        fillCount = 6;
        conjugationCount = 8;
        vocabCount = 2;
      } else {
        // Levels 1-5: Foundations & regular verbs
        sentenceCount = 2;
        fillCount = 7;
        conjugationCount = 8;
        vocabCount = 3;
      }

      // 1. Sentence Builder Questions
      const u1SentencePool = [...(SENTENCE_POOLS[1] || [])].sort(() => Math.random() - 0.5);
      const chosenSentences = [];
      for (let i = 0; i < sentenceCount; i++) {
        const sentenceItem = u1SentencePool[i % u1SentencePool.length];
        const sSpec = generateSentenceBuilderQuestion({ unit: 1, sentenceItem });
        if (sSpec) {
          chosenSentences.push({
            item: { spanish: sSpec.targetSentence, english: sSpec.meaning, subcategory: "Syllabus Sentences", category: "Unidad 1" },
            isCardIntro: false,
            isConjugation: false,
            isFillInTheBlank: false,
            isSentenceBuilder: true,
            unit: sSpec.unit,
            prompt: sSpec.prompt,
            promptLanguage: sSpec.promptLanguage,
            targetLanguage: sSpec.targetLanguage,
            targetSentence: sSpec.targetSentence,
            targetWords: sSpec.targetWords,
            targetTokens: sSpec.targetTokens,
            bankTokens: sSpec.bankTokens,
            distractors: sSpec.distractors,
            meaning: sSpec.meaning,
            hint: sSpec.hint,
            correct: sSpec.targetSentence,
            questionWord: sSpec.prompt,
            choices: []
          });
        }
      }

      // 2. Fill in the Blank Questions
      const u1FillCandidates = vocabularyData.filter(item => 
        (item.subcategory === "Syllabus Sentences" || item.unit === "Unit 1: Repaso 101" || !item.unit) &&
        generateFillInTheBlank(item)
      ).sort(() => Math.random() - 0.5);

      const chosenFills = [];
      const seenFillPrompts = new Set();
      for (const item of u1FillCandidates) {
        if (chosenFills.length >= fillCount) break;
        const fillSpec = generateFillInTheBlank(item);
        if (fillSpec && !seenFillPrompts.has(fillSpec.sentence)) {
          seenFillPrompts.add(fillSpec.sentence);
          chosenFills.push({
            item,
            isCardIntro: false,
            isConjugation: false,
            isFillInTheBlank: true,
            questionWord: fillSpec.sentence,
            meaning: fillSpec.meaning,
            correct: fillSpec.correct,
            choices: fillSpec.choices,
            hint: fillSpec.hint
          });
        }
      }

      // 3. Verb Conjugation Questions
      const allU1Verbs = vocabularyData.filter(item => 
        (item.unit === "Unit 1: Repaso 101" || !item.unit) && (
          item.category === "Verbs" || 
          item.subcategory?.includes("Verbs") || 
          item.subcategory?.includes("Gustar") ||
          item.subcategory === "Verbs for Knowing"
        )
      );

      let primaryVerbSubs = [];
      if (levelVal <= 5) {
        primaryVerbSubs = ["Regular -ar Verbs", "Regular -er Verbs", "Regular -ir Verbs", "Core Irregular Verbs"];
      } else if (levelVal <= 10) {
        primaryVerbSubs = [
          "Stem-Changing Verbs (o -> ue)", 
          "Stem-Changing Verbs (e -> ie)", 
          "Stem-Changing Verbs (e -> i)", 
          "Irregular Yo Form Verbs",
          "Verbs Structured Like Gustar",
          "Core Irregular Verbs"
        ];
      } else {
        primaryVerbSubs = [
          "Regular -ar Verbs",
          "Regular -er Verbs",
          "Regular -ir Verbs",
          "Stem-Changing Verbs (o -> ue)", 
          "Stem-Changing Verbs (e -> ie)", 
          "Stem-Changing Verbs (e -> i)", 
          "Irregular Yo Form Verbs",
          "Verbs for Knowing",
          "Verbs Structured Like Gustar",
          "Core Irregular Verbs"
        ];
      }

      const leveledVerbs = allU1Verbs.filter(v => primaryVerbSubs.includes(v.subcategory)).sort(() => Math.random() - 0.5);
      const fallbackVerbs = allU1Verbs.sort(() => Math.random() - 0.5);
      const verbCandidates = [...leveledVerbs, ...fallbackVerbs];

      const chosenConjugations = [];
      const seenVerbNames = new Set();
      for (const vItem of verbCandidates) {
        if (chosenConjugations.length >= conjugationCount) break;
        if (!seenVerbNames.has(vItem.spanish)) {
          seenVerbNames.add(vItem.spanish);
          const qSpec = generateConjugationQuestion(vItem, { 
            tense: "present", 
            excludeVosotros: state.excludeVosotros 
          });
          if (qSpec) {
            chosenConjugations.push({
              item: vItem,
              isCardIntro: false,
              isConjugation: true,
              isGustar: qSpec.isGustar,
              isReciprocal: qSpec.isReciprocal,
              isSpellChanger: qSpec.isSpellChanger,
              isStemChangerPreterite: qSpec.isStemChangerPreterite,
              isDoubleVowel: qSpec.isDoubleVowel,
              subjectPronoun: qSpec.subjectPronoun,
              infinitive: qSpec.infinitive,
              prompt: qSpec.prompt,
              subjectMeaning: qSpec.subjectMeaning,
              questionWord: qSpec.verb,
              meaning: qSpec.meaning,
              pronoun: qSpec.pronoun,
              tense: qSpec.tense,
              tenseLabel: qSpec.tenseLabel,
              isReflexive: qSpec.isReflexive,
              correct: qSpec.correct,
              choices: qSpec.choices
            });
          }
        }
      }

      // 4. Vocab Translation Questions (minor secondary focus)
      const nonVerbNonSentenceItems = vocabularyData.filter(item => 
        (item.unit === "Unit 1: Repaso 101" || !item.unit) &&
        !item.subcategory?.includes("Verbs") &&
        !item.subcategory?.includes("Gustar") &&
        item.subcategory !== "Syllabus Sentences" &&
        item.category !== "Verbs"
      ).sort(() => Math.random() - 0.5);

      const chosenVocab = [];
      for (const item of nonVerbNonSentenceItems) {
        if (chosenVocab.length >= vocabCount) break;
        const step = buildProgressiveQuizStep(item, levelVal, false);
        if (step && !step.isCardIntro && !step.isSentenceBuilder && !step.isConjugation) {
          chosenVocab.push(step);
        }
      }

      // Combine and shuffle all 20 questions
      const u1Questions = [
        ...chosenSentences,
        ...chosenFills,
        ...chosenConjugations,
        ...chosenVocab
      ].sort(() => Math.random() - 0.5);

      const targetQuestionsTotal = isEarlyBoss ? 30 : 20;

      // Pad to exactly targetQuestionsTotal if needed
      while (u1Questions.length < targetQuestionsTotal && verbCandidates.length > 0) {
        const vItem = verbCandidates[Math.floor(Math.random() * verbCandidates.length)];
        const qSpec = generateConjugationQuestion(vItem, { tense: "present", excludeVosotros: state.excludeVosotros });
        if (qSpec) {
          u1Questions.push({
            item: vItem,
            isCardIntro: false,
            isConjugation: true,
            isGustar: qSpec.isGustar,
            isReciprocal: qSpec.isReciprocal,
            isSpellChanger: qSpec.isSpellChanger,
            isStemChangerPreterite: qSpec.isStemChangerPreterite,
            isDoubleVowel: qSpec.isDoubleVowel,
            subjectPronoun: qSpec.subjectPronoun,
            infinitive: qSpec.infinitive,
            prompt: qSpec.prompt,
            subjectMeaning: qSpec.subjectMeaning,
            questionWord: qSpec.verb,
            meaning: qSpec.meaning,
            pronoun: qSpec.pronoun,
            tense: qSpec.tense,
            tenseLabel: qSpec.tenseLabel,
            isReflexive: qSpec.isReflexive,
            correct: qSpec.correct,
            choices: qSpec.choices
          });
        }
      }

      finalQuestions = u1Questions.slice(0, targetQuestionsTotal);
    } else if (isEarlyBoss) {
      // Early Boss Challenge for Unit 2+ (Test-Out / Unit Skip):
      // 30 questions with 0 card intros:
      // - 12 Sentence Builder questions
      // - 10 Conjugation questions
      // - 8 Fill-in-the-blank / comprehensive vocabulary questions
      const unitSentencesPool = [...(SENTENCE_POOLS[stageVal] || SENTENCE_POOLS[1] || [])].sort(() => Math.random() - 0.5);
      const chosenSentences = [];
      for (let i = 0; i < 12; i++) {
        const sentenceItem = unitSentencesPool[i % unitSentencesPool.length];
        const sSpec = generateSentenceBuilderQuestion({ unit: stageVal, sentenceItem });
        if (sSpec) {
          chosenSentences.push({
            item: { spanish: sSpec.targetSentence, english: sSpec.meaning, subcategory: "Stage Sentences", category: `Unidad ${stageVal}` },
            isCardIntro: false,
            isConjugation: false,
            isFillInTheBlank: false,
            isSentenceBuilder: true,
            unit: sSpec.unit,
            prompt: sSpec.prompt,
            promptLanguage: sSpec.promptLanguage,
            targetLanguage: sSpec.targetLanguage,
            targetSentence: sSpec.targetSentence,
            targetWords: sSpec.targetWords,
            targetTokens: sSpec.targetTokens,
            bankTokens: sSpec.bankTokens,
            distractors: sSpec.distractors,
            meaning: sSpec.meaning,
            hint: sSpec.hint,
            correct: sSpec.targetSentence,
            questionWord: sSpec.prompt,
            choices: []
          });
        }
      }

      // Fill in the blank candidates from this stage
      const stageFillCandidates = vocabularyData.filter(item => 
        activeStage.subcategories.includes(item.subcategory) && generateFillInTheBlank(item)
      ).sort(() => Math.random() - 0.5);

      const chosenFills = [];
      const seenFills = new Set();
      for (const item of stageFillCandidates) {
        if (chosenFills.length >= 8) break;
        const fillSpec = generateFillInTheBlank(item);
        if (fillSpec && !seenFills.has(fillSpec.sentence)) {
          seenFills.add(fillSpec.sentence);
          chosenFills.push({
            item,
            isCardIntro: false,
            isConjugation: false,
            isFillInTheBlank: true,
            questionWord: fillSpec.sentence,
            meaning: fillSpec.meaning,
            correct: fillSpec.correct,
            choices: fillSpec.choices,
            hint: fillSpec.hint,
            targetVerb: fillSpec.targetVerb,
            tense: fillSpec.tense
          });
        }
      }

      // Conjugation questions for this stage
      const stageVerbs = vocabularyData.filter(item => 
        activeStage.subcategories.includes(item.subcategory) && isVerbItem(item) && !isSentenceItem(item)
      ).sort(() => Math.random() - 0.5);

      const stageTense = (stageVal === 5) ? "imperfect" : ((stageVal >= 3) ? "preterite" : "present");
      const chosenConjugations = [];
      const seenStageVerbs = new Set();
      for (const vItem of stageVerbs) {
        if (chosenConjugations.length >= 10) break;
        const vKey = getVocabKey(vItem);
        if (!seenStageVerbs.has(vKey)) {
          seenStageVerbs.add(vKey);
          if (isPreteriteFocusItem(vItem)) {
            const drillStep = buildPreteriteDrillStep(vItem, { levelVal: 20, allowTyped: Math.random() < 0.35 });
            if (drillStep) chosenConjugations.push(drillStep);
            continue;
          }
          const qSpec = generateConjugationQuestion(vItem, { 
            tense: stageTense, 
            excludeVosotros: state.excludeVosotros 
          });
          if (qSpec) {
            chosenConjugations.push({
              item: vItem,
              isCardIntro: false,
              isConjugation: true,
              isGustar: qSpec.isGustar,
              isReciprocal: qSpec.isReciprocal,
              isSpellChanger: qSpec.isSpellChanger,
              isStemChangerPreterite: qSpec.isStemChangerPreterite,
              isDoubleVowel: qSpec.isDoubleVowel,
              subjectPronoun: qSpec.subjectPronoun,
              infinitive: qSpec.infinitive,
              prompt: qSpec.prompt,
              subjectMeaning: qSpec.subjectMeaning,
              questionWord: qSpec.verb,
              meaning: qSpec.meaning,
              pronoun: qSpec.pronoun,
              tense: qSpec.tense,
              tenseLabel: qSpec.tenseLabel,
              isReflexive: qSpec.isReflexive,
              correct: qSpec.correct,
              choices: qSpec.choices
            });
          }
        }
      }

      // Fill remaining spots with vocabulary/grammar steps
      const otherStageItems = stageItems.filter(item => 
        !seenStageVerbs.has(getVocabKey(item)) && !seenFills.has(item.spanish)
      ).sort(() => Math.random() - 0.5);

      const chosenVocab = [];
      for (const item of otherStageItems) {
        if (chosenSentences.length + chosenFills.length + chosenConjugations.length + chosenVocab.length >= 30) break;
        const step = buildProgressiveQuizStep(item, 20, true);
        if (step && !step.isCardIntro) {
          chosenVocab.push(step);
        }
      }

      const combined30 = [
        ...chosenSentences,
        ...chosenFills,
        ...chosenConjugations,
        ...chosenVocab
      ].sort(() => Math.random() - 0.5);

      // Pad to 30 if needed
      while (combined30.length < 30 && stageItems.length > 0) {
        const item = stageItems[Math.floor(Math.random() * stageItems.length)];
        const step = buildProgressiveQuizStep(item, 20, true);
        if (step && !step.isCardIntro) {
          combined30.push(step);
        }
      }

      finalQuestions = combined30.slice(0, 30);
    } else {
      // Unit 2+ progressive flow with stage-calibrated flashcard tapering:
      // In 25-level architecture:
      // Stage 2 (147 words): Levels 1-19 introduce all 147 words ([10,10,10,10,9,9,9,8,8,8,8,7,7,7,6,6,5,5,5]). Levels 20-25 have strictly 0 flashcards.
      // Stage 3 (83 words): Levels 1-14 introduce all 83 words ([9,9,8,8,7,7,6,6,5,5,4,4,3,2]). Levels 15-25 have strictly 0 flashcards.
      // Stage 4 (104 words): Levels 1-16 introduce all 104 words ([9,9,8,8,8,7,7,7,6,6,6,5,5,5,4,4]). Levels 17-25 have strictly 0 flashcards.
      // Stage 5 (121 words): Levels 1-19 introduce words via taperSchedule. Levels 20-25 have strictly 0 flashcards.
      let targetCardCount = 0;
      if (!isReview && !isReplay) {
        let taperSchedule = [];
        if (stageVal === 2) {
          taperSchedule = [10, 10, 10, 10, 9, 9, 9, 8, 8, 8, 8, 7, 7, 7, 6, 6, 6, 5, 5];
        } else if (stageVal === 3) {
          taperSchedule = [9, 9, 8, 8, 7, 7, 6, 6, 5, 5, 4, 4, 3, 2];
        } else if (stageVal === 4) {
          taperSchedule = [9, 9, 8, 8, 8, 7, 7, 7, 6, 6, 6, 5, 5, 5, 4, 4];
        } else if (stageVal === 5) {
          taperSchedule = [8, 8, 8, 8, 7, 7, 7, 6, 6, 6, 6, 5, 5, 5, 5, 4, 4, 4, 3];
        }
        targetCardCount = taperSchedule[levelVal - 1] || 0;
        // On level 19 (final vocab introduction level before synthesis), guarantee all remaining unseen words are consumed:
        if (levelVal === 19 && unseenStageItems.length > 0) {
          targetCardCount = Math.max(targetCardCount, unseenStageItems.length);
        }
      }
      const cardCount = Math.min(targetCardCount, unseenStageItems.length, 12);
      const quizCount = Math.max(8, 20 - cardCount);

      const selectedFlashcards = [];

      if (cardCount > 0) {
        unseenStageItems.sort(() => Math.random() - 0.5);
        const takeUnseen = unseenStageItems.slice(0, cardCount);
        selectedFlashcards.push(...takeUnseen);

        const newlySeen = takeUnseen.map(item => getVocabKey(item));
        if (newlySeen.length > 0 && markFlashcardsSeen) {
          markFlashcardsSeen(newlySeen);
        }
      }

      const cardSteps = selectedFlashcards.map(item => ({
        item,
        isCardIntro: true
      }));

      // STRICT PEDAGOGICAL GUARANTEE:
      // A word MUST be seen in a flashcard (either in seenWords or in current selectedFlashcards)
      // before it can EVER appear in a standalone quiz question!
      const currentlyIntroduced = selectedFlashcards.map(item => getVocabKey(item));
      const currentlyIntroducedSet = new Set(currentlyIntroduced);
      const eligibleStageItems = stageItems.filter(item => {
        const key = getVocabKey(item);
        return seenWords.includes(key) || currentlyIntroducedSet.has(key);
      });

      // 1. Sentence Builder questions (scaling upward by level)
      let targetSentenceCount = 2;
      if (isReview) targetSentenceCount = 10;
      else if (levelVal >= 20) targetSentenceCount = 8;
      else if (levelVal >= 16) targetSentenceCount = 7;
      else if (levelVal >= 11) targetSentenceCount = 6;
      else if (levelVal >= 6) targetSentenceCount = 4;
      else targetSentenceCount = Math.min(3, Math.max(1, Math.floor(quizCount * 0.3)));

      const unitSentencesPool = [...(SENTENCE_POOLS[stageVal] || SENTENCE_POOLS[1] || [])].sort(() => Math.random() - 0.5);
      const chosenSentences = [];
      for (let i = 0; i < targetSentenceCount && i < unitSentencesPool.length; i++) {
        const sentenceItem = unitSentencesPool[i % unitSentencesPool.length];
        const sSpec = generateSentenceBuilderQuestion({ unit: stageVal, sentenceItem });
        if (sSpec) {
          chosenSentences.push({
            item: { spanish: sSpec.targetSentence, english: sSpec.meaning, subcategory: "Stage Sentences", category: `Unidad ${stageVal}` },
            isCardIntro: false,
            isConjugation: false,
            isFillInTheBlank: false,
            isSentenceBuilder: true,
            unit: sSpec.unit,
            prompt: sSpec.prompt,
            promptLanguage: sSpec.promptLanguage,
            targetLanguage: sSpec.targetLanguage,
            targetSentence: sSpec.targetSentence,
            targetWords: sSpec.targetWords,
            targetTokens: sSpec.targetTokens,
            bankTokens: sSpec.bankTokens,
            distractors: sSpec.distractors,
            meaning: sSpec.meaning,
            hint: sSpec.hint,
            syntaxBreakdown: sSpec.syntaxBreakdown,
            correct: sSpec.targetSentence,
            questionWord: sSpec.prompt,
            choices: []
          });
        }
      }

      // 2. Contrast Decision questions (Which One to Use When)
      const targetContrastCount = (levelVal >= 6 || isReview) ? 3 : 2;
      const chosenContrasts = [];
      const seenContrastPrompts = new Set();
      for (let c = 0; c < targetContrastCount * 2 && chosenContrasts.length < targetContrastCount; c++) {
        const cQ = generateContrastQuestion(stageVal, levelVal);
        if (cQ && !seenContrastPrompts.has(cQ.questionWord)) {
          seenContrastPrompts.add(cQ.questionWord);
          chosenContrasts.push(cQ);
        }
      }

      // 3. Verb Conjugations (strictly for verbs that have been introduced; prioritize newly introduced preterite flashcards)
      const allEligibleVerbs = eligibleStageItems.filter(item => isVerbItem(item) && !isSentenceItem(item));
      const newPretVerbs = allEligibleVerbs
        .filter(item => currentlyIntroducedSet.has(getVocabKey(item)) && isPreteriteFocusItem(item))
        .sort(() => Math.random() - 0.5);
      const otherEligibleVerbs = allEligibleVerbs
        .filter(item => !(currentlyIntroducedSet.has(getVocabKey(item)) && isPreteriteFocusItem(item)))
        .sort(() => Math.random() - 0.5);
      const eligibleVerbs = [...newPretVerbs, ...otherEligibleVerbs];

      const stageTense = (stageVal === 5) ? "imperfect" : ((stageVal >= 3) ? "preterite" : "present");
      const targetConjugationCount = isReview ? 4 : Math.max(newPretVerbs.length, levelVal >= 6 ? 3 : 2);
      const chosenConjugations = [];
      const seenVerbNames = new Set();
      for (const vItem of eligibleVerbs) {
        if (chosenConjugations.length >= targetConjugationCount) break;
        const vKey = getVocabKey(vItem);
        if (!seenVerbNames.has(vKey)) {
          seenVerbNames.add(vKey);
          if (isPreteriteFocusItem(vItem)) {
            const drillStep = buildPreteriteDrillStep(vItem, {
              levelVal,
              allowTyped: levelVal >= 15 && Math.random() < 0.3
            });
            if (drillStep) chosenConjugations.push(drillStep);
            continue;
          }
          const qSpec = generateConjugationQuestion(vItem, { tense: stageTense, excludeVosotros: state.excludeVosotros });
          if (qSpec) {
            chosenConjugations.push({
              item: vItem,
              isCardIntro: false,
              isConjugation: true,
              isGustar: qSpec.isGustar,
              isReciprocal: qSpec.isReciprocal,
              isSpellChanger: qSpec.isSpellChanger,
              isStemChangerPreterite: qSpec.isStemChangerPreterite,
              isDoubleVowel: qSpec.isDoubleVowel,
              subjectPronoun: qSpec.subjectPronoun,
              infinitive: qSpec.infinitive,
              prompt: qSpec.prompt,
              subjectMeaning: qSpec.subjectMeaning,
              questionWord: qSpec.verb,
              meaning: qSpec.meaning,
              pronoun: qSpec.pronoun,
              tense: qSpec.tense,
              tenseLabel: qSpec.tenseLabel,
              isReflexive: qSpec.isReflexive,
              correct: qSpec.correct,
              choices: qSpec.choices
            });
          }
        }
      }

      // 4. Fill in the Blank & Vocab Translations (strictly from eligibleStageItems)
      const remainingSlots = Math.max(0, quizCount - (chosenSentences.length + chosenContrasts.length + chosenConjugations.length));
      const poolForVocab = eligibleStageItems.length > 0 ? eligibleStageItems : selectedFlashcards;
      const shuffledEligible = [...poolForVocab].sort(() => Math.random() - 0.5);
      const chosenVocabAndFills = [];

      for (const item of shuffledEligible) {
        if (chosenVocabAndFills.length >= remainingSlots) break;
        const fillSpec = generateFillInTheBlank(item);
        if (fillSpec) {
          chosenVocabAndFills.push({
            item,
            isCardIntro: false,
            isConjugation: false,
            isFillInTheBlank: true,
            questionWord: fillSpec.sentence,
            meaning: fillSpec.meaning,
            correct: fillSpec.correct,
            choices: fillSpec.choices,
            hint: fillSpec.hint,
            targetVerb: fillSpec.targetVerb,
            tense: fillSpec.tense
          });
        } else {
          const step = buildProgressiveQuizStep(item, levelVal, true);
          if (step && !step.isCardIntro && !step.isSentenceBuilder) {
            chosenVocabAndFills.push(step);
          }
        }
      }

      // If still need slots to reach quizCount, pad with eligible items
      while (chosenSentences.length + chosenContrasts.length + chosenConjugations.length + chosenVocabAndFills.length < quizCount && poolForVocab.length > 0) {
        const item = poolForVocab[Math.floor(Math.random() * poolForVocab.length)];
        const step = buildProgressiveQuizStep(item, levelVal, true);
        if (step && !step.isCardIntro) {
          chosenVocabAndFills.push(step);
        }
      }

      const activeQuizQuestions = [
        ...chosenSentences,
        ...chosenContrasts,
        ...chosenConjugations,
        ...chosenVocabAndFills
      ].slice(0, quizCount).sort(() => Math.random() - 0.5);

      finalQuestions = [...cardSteps, ...activeQuizQuestions];
    }

    setQuestQuestions(finalQuestions);
    setQuestCurrentIdx(0);
    setQuestScore(0);
    setHintsUsedInSession(0);
    setQuestHintRevealed(false);
    setQuestFinished(false);
    setQuestStarted(true);
    setQuestAnswered(false);
    setQuestSelected(null);
    setQuestFlipped(false);
    setQuestSuccessMsg("");
    setQuestFailMsg("");
  };

  const handleQuestInsertAccent = (char) => {
    if (!questInputRef.current) return;
    const input = questInputRef.current;
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const text = typedAnswer;
    const newText = text.substring(0, start) + char + text.substring(end);
    setTypedAnswer(newText);
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + 1, start + 1);
    }, 0);
  };

  const handlePracticeInsertAccent = (char) => {
    if (!practiceInputRef.current) return;
    const input = practiceInputRef.current;
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const text = practiceTyped;
    const newText = text.substring(0, start) + char + text.substring(end);
    setPracticeTyped(newText);
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + 1, start + 1);
    }, 0);
  };

  // -------------------------------------------------------------
  // WRITTEN TRANSLATION SUBMIT HANDLERS
  // -------------------------------------------------------------
  const recordItemOutcome = (item, isCorrect, { recordCorrectly = false } = {}) => {
    if (!item) return;
    const key = getVocabKey(item);
    if (!key) return;
    if (updateWordMastery) {
      updateWordMastery(key, isCorrect);
    }
    if (isCorrect) {
      if (recordCorrectly && recordWordAnsweredCorrectly) {
        recordWordAnsweredCorrectly(key);
      }
    } else if (addMistake) {
      addMistake(key);
    }
  };

  const handleQuestSubmitTyped = (e) => {
    e.preventDefault();
    if (questAnswered || !typedAnswer.trim()) return;
    setQuestAnswered(true);

    const currentQ = questQuestions[questCurrentIdx];
    const correctStr = currentQ.correct;
    const userStr = typedAnswer;
    const isCorrect = currentQ.isConjugation
      ? cleanConjugationInput(userStr, correctStr)
      : compareAnswers(correctStr, userStr);

    if (isCorrect) {
      setQuestScore(prev => prev + 1);
      setQuestSelected(correctStr);
      setHealTrigger(true);
      playSound('correct');
      recordItemOutcome(currentQ.item, true, { recordCorrectly: true });

      setComboCount(prev => {
        const next = prev + 1;
        setMaxCombo(m => Math.max(m, next));
        return next;
      });
      setTimeout(() => setHealTrigger(false), 500);
    } else {
      setQuestSelected(userStr);
      setShakeTrigger(true);
      playSound('wrong');
      setComboCount(0);

      if (activeQuestIsEarlyBoss) {
        setEarlyBossFailed(true);
      }

      recordItemOutcome(currentQ.item, false);

      setQuestMissedQuestions(prev => {
        if (prev.some(q => q.questionWord === currentQ.questionWord)) return prev;
        return [...prev, currentQ];
      });

      takeDamage(15);
      setTimeout(() => setShakeTrigger(false), 500);
    }
  };

  const handlePracticeSubmitTyped = (e) => {
    e.preventDefault();
    if (practiceAnswered || !practiceTyped.trim()) return;
    setPracticeAnswered(true);

    const currentQ = practiceQuestions[practiceCurrentIdx];
    const correctStr = currentQ.correct;
    const userStr = practiceTyped;
    const isCorrect = currentQ.isConjugation
      ? cleanConjugationInput(userStr, correctStr)
      : compareAnswers(correctStr, userStr);

    if (isCorrect) {
      setPracticeScore(prev => prev + 1);
      setPracticeSelected(correctStr);
      setHealTrigger(true);
      playSound('correct');
      recordItemOutcome(currentQ.item, true);
      setTimeout(() => setHealTrigger(false), 500);
    } else {
      setPracticeSelected(userStr);
      setShakeTrigger(true);
      playSound('wrong');
      recordItemOutcome(currentQ.item, false);
      // Zero damage in practice mode!
      setTimeout(() => setShakeTrigger(false), 500);
    }
  };

  const handlePracticeAnswer = (choice) => {
    if (practiceAnswered) return;
    setPracticeSelected(choice);
    setPracticeAnswered(true);

    const currentQ = practiceQuestions[practiceCurrentIdx];
    const isCorrect = choice.trim().toLowerCase() === currentQ.correct.trim().toLowerCase();

    if (isCorrect) {
      setPracticeScore(prev => prev + 1);
      setHealTrigger(true);
      playSound('correct');
      recordItemOutcome(currentQ.item, true);
      setTimeout(() => setHealTrigger(false), 500);
    } else {
      setShakeTrigger(true);
      playSound('wrong');
      recordItemOutcome(currentQ.item, false);
      // Zero damage in practice mode!
      setTimeout(() => setShakeTrigger(false), 500);
    }
  };

  const handlePracticeSentenceAnswer = (isCorrect, answerStr) => {
    if (practiceAnswered) return;
    const currentQ = practiceQuestions[practiceCurrentIdx];
    setPracticeSelected(isCorrect ? currentQ.correct : answerStr);
    setPracticeAnswered(true);

    if (isCorrect) {
      setPracticeScore(prev => prev + 1);
      setHealTrigger(true);
      playSound('correct');
      recordItemOutcome(currentQ.item, true);
      setTimeout(() => setHealTrigger(false), 500);
    } else {
      setShakeTrigger(true);
      playSound('wrong');
      recordItemOutcome(currentQ.item, false);
      // Zero damage in practice mode!
      setTimeout(() => setShakeTrigger(false), 500);
    }
  };

  const handlePracticeCardLearned = () => {
    addXp(2);
    setHealTrigger(true);
    setTimeout(() => setHealTrigger(false), 500);

    if (practiceCurrentIdx < practiceQuestions.length - 1) {
      setPracticeCurrentIdx(prev => prev + 1);
      setPracticeFlipped(false);
    } else {
      const cardCount = practiceQuestions.filter(q => q.isCardIntro).length;
      const gradedCount = practiceQuestions.filter(q => !q.isCardIntro).length;
      const earnedXp = (practiceScore * 10) + (cardCount * 2);
      const earnedGold = practiceScore;
      addXp(earnedXp);
      addGold(earnedGold);
      if (gradedCount > 0) {
        recordQuizPerformance(practiceScore, gradedCount);
      }
      setPracticeQuizFinished(true);
    }
  };

  const handleQuestCardLearned = () => {
    addXp(2);
    setHealTrigger(true);
    setTimeout(() => setHealTrigger(false), 500);

    if (questCurrentIdx < questQuestions.length - 1) {
      setQuestCurrentIdx(prev => prev + 1);
      setQuestFlipped(false);
      setQuestHintRevealed(false);
    } else {
      finishQuestSession();
    }
  };

  const handleQuestAnswer = (choice) => {
    if (questAnswered) return;
    setQuestSelected(choice);
    setQuestAnswered(true);

    const currentQ = questQuestions[questCurrentIdx];
    const isCorrect = choice.trim().toLowerCase() === currentQ.correct.trim().toLowerCase();

    if (isCorrect) {
      setQuestScore(prev => prev + 1);
      setHealTrigger(true);
      playSound('correct');
      recordItemOutcome(currentQ.item, true, { recordCorrectly: true });

      setComboCount(prev => {
        const next = prev + 1;
        setMaxCombo(m => Math.max(m, next));
        return next;
      });
      setTimeout(() => setHealTrigger(false), 500);
    } else {
      setShakeTrigger(true);
      playSound('wrong');
      setComboCount(0);

      if (activeQuestIsEarlyBoss) {
        setEarlyBossFailed(true);
      }

      recordItemOutcome(currentQ.item, false);

      setQuestMissedQuestions(prev => {
        if (prev.some(q => q.questionWord === currentQ.questionWord)) return prev;
        return [...prev, currentQ];
      });

      takeDamage(15);
      setTimeout(() => setShakeTrigger(false), 500);
    }
  };

  const handleQuestSentenceAnswer = (isCorrect, answerStr) => {
    if (questAnswered) return;
    const currentQ = questQuestions[questCurrentIdx];
    setQuestSelected(isCorrect ? currentQ.correct : answerStr);
    setQuestAnswered(true);

    if (isCorrect) {
      setQuestScore(prev => prev + 1);
      setHealTrigger(true);
      playSound('correct');
      recordItemOutcome(currentQ.item, true, { recordCorrectly: true });

      setComboCount(prev => {
        const next = prev + 1;
        setMaxCombo(m => Math.max(m, next));
        return next;
      });
      setTimeout(() => setHealTrigger(false), 500);
    } else {
      setShakeTrigger(true);
      playSound('wrong');
      setComboCount(0);

      if (activeQuestIsEarlyBoss) {
        setEarlyBossFailed(true);
      }

      recordItemOutcome(currentQ.item, false);

      setQuestMissedQuestions(prev => {
        if (prev.some(q => q.questionWord === currentQ.questionWord)) return prev;
        return [...prev, currentQ];
      });

      takeDamage(15);
      setTimeout(() => setShakeTrigger(false), 500);
    }
  };

  const handleQuestNext = () => {
    // If Sudden Death failed on early boss challenge, immediately end session
    if (activeQuestIsEarlyBoss && earlyBossFailed) {
      finishQuestSession();
      return;
    }

    setQuestSelected(null);
    setQuestAnswered(false);
    setTypedAnswer("");
    setQuestHintRevealed(false);
    
    if (questCurrentIdx < questQuestions.length - 1) {
      setQuestCurrentIdx(prev => prev + 1);
    } else {
      finishQuestSession();
    }
  };

  const handleRedemptionAnswer = (choice) => {
    if (redemptionAnswered) return;
    setRedemptionAnswered(true);
    setRedemptionSelected(choice);

    const currentQ = redemptionQuestions[redemptionCurrentIdx];
    if (choice === currentQ.correct) {
      playSound('correct');
      setRedemptionScore(prev => prev + 1);
    } else {
      playSound('wrong');
      setTimeout(() => {
        setRedemptionFailed(true);
      }, 800);
    }
  };

  const handleRedemptionSentenceAnswer = (isCorrect, answerStr) => {
    if (redemptionAnswered) return;
    const currentQ = redemptionQuestions[redemptionCurrentIdx];
    setRedemptionAnswered(true);
    setRedemptionSelected(isCorrect ? currentQ.correct : answerStr);

    if (isCorrect) {
      playSound('correct');
      setRedemptionScore(prev => prev + 1);
    } else {
      playSound('wrong');
      setTimeout(() => {
        setRedemptionFailed(true);
      }, 800);
    }
  };

  const handleRedemptionSubmitTyped = (e) => {
    e.preventDefault();
    if (redemptionAnswered || !redemptionTyped.trim()) return;
    setRedemptionAnswered(true);

    const currentQ = redemptionQuestions[redemptionCurrentIdx];
    const correctStr = currentQ.correct;
    const userStr = redemptionTyped;
    const isCorrect = currentQ.isConjugation
      ? cleanConjugationInput(userStr, correctStr)
      : compareAnswers(correctStr, userStr);
    setRedemptionSelected(userStr);

    if (isCorrect) {
      playSound('correct');
      setRedemptionScore(prev => prev + 1);
    } else {
      playSound('wrong');
      setTimeout(() => {
        setRedemptionFailed(true);
      }, 800);
    }
  };

  const handleRedemptionNext = () => {
    setRedemptionSelected(null);
    setRedemptionAnswered(false);
    setRedemptionTyped("");
    setRedemptionHintRevealed(false);

    if (redemptionCurrentIdx < redemptionQuestions.length - 1) {
      setRedemptionCurrentIdx(prev => prev + 1);
    } else {
      setRedemptionSuccess(true);
    }
  };

  const handleRestartRedemption = () => {
    setRedemptionCurrentIdx(0);
    setRedemptionTyped("");
    setRedemptionAnswered(false);
    setRedemptionSelected(null);
    setRedemptionScore(0);
    setRedemptionFailed(false);
    setRedemptionSuccess(false);
    setRedemptionHintRevealed(false);
  };

  const handleCancelRedemption = () => {
    setRedemptionActive(false);
    setRedemptionSuccess(false);
    setRedemptionFailed(false);
    setRedemptionQuestions([]);
    setQuestMissedQuestions([]);
    setQuestStarted(false);
    setQuestQuestions([]);
    setQuestCurrentIdx(0);
  };

  const handleClaimAndExit = () => {
    revive(10);
    setRedemptionActive(false);
    setRedemptionSuccess(false);
    setRedemptionFailed(false);
    setRedemptionQuestions([]);
    setQuestMissedQuestions([]);
    setQuestStarted(false);
    setQuestQuestions([]);
    setQuestCurrentIdx(0);
  };

  const handleClaimRedemption = () => {
    revive(10);
    setRedemptionActive(false);
    setRedemptionSuccess(false);
    setRedemptionFailed(false);
    setRedemptionQuestions([]);
    setQuestMissedQuestions([]);

    // Continue the quiz from the exact point where the user failed
    if (questQuestions && questQuestions.length > 0 && questCurrentIdx < questQuestions.length) {
      setQuestAnswered(false);
      setQuestSelected(null);
      setTypedAnswer("");
      setQuestHintRevealed(false);
      setQuestFlipped(false);
      setQuestFinished(false);
      setEarlyBossFailed(false);
      setShakeTrigger(false);
      setHealTrigger(false);
      setQuestStarted(true);
      setActiveTab("quest");
    } else {
      setQuestStarted(false);
    }
  };

  const finishQuestSession = () => {
    setQuestStarted(false);
    setQuestFinished(true);

    const quizQuestionsCount = questQuestions.filter(q => !q.isCardIntro).length;

    // Apply Combo streak multiplier
    let comboMultiplier = 1.0;
    if (maxCombo >= 10) comboMultiplier = 2.0; // 2x rewards for 10 combo streak
    else if (maxCombo >= 5) comboMultiplier = 1.75;
    else if (maxCombo >= 3) comboMultiplier = 1.5;

    let baseGoldReward = activeQuestIsReview ? 50 : 12;
    let baseXpReward = activeQuestIsReview ? 200 : 60;

    let totalGoldEarned = baseGoldReward;
    let totalXpEarned = baseXpReward;

    const usedHints = hintsUsedInSession > 0;

    if (activeQuestIsEarlyBoss) {
      // Early Boss Challenge (Test-Out / Boss Skip)
      // Flawless requirement: 100% accuracy required (zero mistakes allowed)
      const flawless = questScore === quizQuestionsCount && !earlyBossFailed;
      recordQuizPerformance(questScore, quizQuestionsCount);
      if (recordLevelCompletion) {
        recordLevelCompletion(activeQuestStage, 25, questScore, quizQuestionsCount, usedHints);
      }

      if (flawless) {
        passStageReview(questScore, quizQuestionsCount, usedHints, true);
        const extraGold = 100;
        const extraXp = 400;
        if (comboMultiplier > 1.0) {
          totalGoldEarned = Math.ceil((baseGoldReward + extraGold) * comboMultiplier);
          totalXpEarned = Math.ceil((baseXpReward + extraXp) * comboMultiplier);
        } else {
          totalGoldEarned += extraGold;
          totalXpEarned += extraXp;
        }
        addGold(totalGoldEarned);
        addXp(totalXpEarned);
        playSound('fanfare');

        const hintlessMsg = !usedHints ? " 🧠 ¡Maestría Sin Pistas! (Sin pistas utilizadas)" : "";
        setQuestSuccessMsg(`⚡ ¡VICTORIA IMPLACABLE! ¡Has superado el Desafío de Salto con 100% de precisión perfecta (${questScore}/${quizQuestionsCount})! Has saltado la Unidad ${activeQuestStage} y desbloqueado la siguiente etapa. Ganaste +${totalGoldEarned} Oro & +${totalXpEarned} XP! (Streak Multiplier: ${comboMultiplier}x)${hintlessMsg}`);
      } else {
        playSound('gameover');
        setQuestFailMsg(`💀 ¡Desafío de Salto Fallado! En el Desafío de Salto se exige Muerte Súbita (0 fallos permitidos). Lograste ${questScore}/${quizQuestionsCount} preguntas correctas antes de cometer un fallo. Completa las lecciones de la unidad (1-24) para desbloquear la Puerta de Revisión estándar con 80% de margen o vuelve a intentarlo con precisión perfecta.`);
      }
    } else if (activeQuestIsReplay) {
      // Replaying an already passed level for extra practice:
      // Does NOT move the main campaign pointer forward or backward
      const passingRequired = activeQuestIsReview 
        ? Math.ceil(quizQuestionsCount * 0.8) 
        : Math.ceil(quizQuestionsCount * 0.6);
      const passed = questScore >= passingRequired;

      recordQuizPerformance(questScore, quizQuestionsCount);
      if (incrementBountyCount) {
        incrementBountyCount("quest");
      }

      if (passed) {
        let practiceGold = activeQuestIsReview ? 25 : 10;
        let practiceXp = activeQuestIsReview ? 100 : 40;
        if (comboMultiplier > 1.0) {
          practiceGold = Math.ceil(practiceGold * comboMultiplier);
          practiceXp = Math.ceil(practiceXp * comboMultiplier);
        }
        addGold(practiceGold);
        addXp(practiceXp);

        if (recordLevelCompletion) {
          recordLevelCompletion(activeQuestStage, activeQuestLevel, questScore, quizQuestionsCount, usedHints);
        }

        const hintlessMsg = !usedHints ? " 🧠 ¡Maestría Sin Pistas! (Sin pistas utilizadas)" : "";
        setQuestSuccessMsg(`¡Práctica de Nivel Superada! You cleared Level ${activeQuestIsReview ? 'Review Gate' : activeQuestLevel} with ${questScore}/${quizQuestionsCount} (${Math.round((questScore/quizQuestionsCount)*100)}%)! Gained +${practiceGold} Gold & +${practiceXp} XP! (Streak Multiplier: ${comboMultiplier}x)${hintlessMsg}`);
      } else {
        setQuestFailMsg(`Práctica no superada. You scored ${questScore}/${quizQuestionsCount} (Required: ${passingRequired}/${quizQuestionsCount}). ¡Sigue practicando!`);
      }
    } else if (activeQuestIsReview) {
      const passingRequired = Math.ceil(quizQuestionsCount * 0.8); // 80% Boss Review Gate
      const success = passStageReview(questScore, quizQuestionsCount, usedHints);
      recordQuizPerformance(questScore, quizQuestionsCount);
      if (recordLevelCompletion) {
        recordLevelCompletion(activeQuestStage, 25, questScore, quizQuestionsCount, usedHints);
      }
      if (success) {
        if (comboMultiplier > 1.0) {
          const extraGold = Math.ceil(baseGoldReward * (comboMultiplier - 1));
          const extraXp = Math.ceil(baseXpReward * (comboMultiplier - 1));
          addGold(extraGold);
          addXp(extraXp);
          totalGoldEarned += extraGold;
          totalXpEarned += extraXp;
        }
        const hintlessMsg = !usedHints ? " 🧠 ¡Maestría Sin Pistas! (Sin pistas utilizadas - ¡Logro conseguido!)" : "";
        setQuestSuccessMsg(`¡Excelente! You passed the Review Gate with ${questScore}/${quizQuestionsCount} (${Math.round((questScore/quizQuestionsCount)*100)}%)! Gained ${totalGoldEarned} G & ${totalXpEarned} XP! Next stage unlocked! (Streak Combo Multiplier: ${comboMultiplier}x)${hintlessMsg}`);
      } else {
        setQuestFailMsg(`Gate Failed! Boss reviews require 80% score or higher (${passingRequired}/${quizQuestionsCount}). Please practice and try again.`);
      }
    } else {
      const passingRequired = Math.ceil(quizQuestionsCount * 0.6);
      const success = advanceQuest(questScore, quizQuestionsCount, usedHints);
      recordQuizPerformance(questScore, quizQuestionsCount);
      if (recordLevelCompletion) {
        recordLevelCompletion(activeQuestStage, activeQuestLevel, questScore, quizQuestionsCount, usedHints);
      }
      if (success) {
        if (comboMultiplier > 1.0) {
          const extraGold = Math.ceil(baseGoldReward * (comboMultiplier - 1));
          const extraXp = Math.ceil(baseXpReward * (comboMultiplier - 1));
          addGold(extraGold);
          addXp(extraXp);
          totalGoldEarned += extraGold;
          totalXpEarned += extraXp;
        }
        const hintlessMsg = !usedHints ? " 🧠 ¡Maestría Sin Pistas! (Sin pistas utilizadas)" : "";
        setQuestSuccessMsg(`Quest Level Cleared! You scored ${questScore}/${quizQuestionsCount} correct! Gained ${totalGoldEarned} G & ${totalXpEarned} XP. (Streak Combo Multiplier: ${comboMultiplier}x)${hintlessMsg}`);
      } else {
        setQuestFailMsg(`Quest Failed! You missed 40% or more (Score: ${questScore}/${quizQuestionsCount}, Required: ${passingRequired}/${quizQuestionsCount}).`);
      }
    }
  };

  // -------------------------------------------------------------
  // CUSTOM PRACTICE LOGIC
  // -------------------------------------------------------------
  const startCustomPracticeQuiz = () => {
    initAudio();
    if (practiceCards.length === 0) return;

    const isVerbLab = selectedCategory.includes("Práctica de Verbos") || selectedCategory.includes("Verb Practice Lab") || selectedCategory.includes("Verb Lab");
    const targetCount = practiceQuestionCount === 'all' 
      ? practiceCards.length 
      : Math.min(Number(practiceQuestionCount) || 10, practiceCards.length);

    let questions = [];

    if (practiceQuizMode === "mixed" && !isVerbLab) {
      // MIX OF FLASHCARDS AND CONJUGATIONS (with translations for non-verbs)
      const verbItems = practiceCards.filter(item => isVerbItem(item) && !isSentenceItem(item));
      const otherItems = practiceCards.filter(item => !isVerbItem(item) || isSentenceItem(item));

      // 1. Take up to 20% of targetCount as flashcards for study/review first (min 1, max 5)
      const flashcardCount = Math.min(5, Math.max(1, Math.floor(targetCount * 0.2)));
      const cardSource = verbItems.length >= 3 ? verbItems : practiceCards;
      const shuffledCards = [...cardSource].sort(() => Math.random() - 0.5);
      const cardBatch = shuffledCards.slice(0, Math.min(flashcardCount, cardSource.length));

      const cardSteps = cardBatch.map(item => ({
        item,
        isCardIntro: true
      }));

      // 2. Conjugation & Translation Quiz challenges (prioritize verbs introduced in cardBatch)
      const quizSlots = Math.max(1, targetCount - cardSteps.length - 1);
      const cardKeys = new Set(cardBatch.map(c => getVocabKey(c)));
      const remainingVerbs = verbItems.filter(v => !cardKeys.has(getVocabKey(v))).sort(() => Math.random() - 0.5);
      let quizItemsPool = [...cardBatch.filter(c => isVerbItem(c) && !isSentenceItem(c)), ...remainingVerbs].slice(0, quizSlots);

      if (quizItemsPool.length < quizSlots && otherItems.length > 0) {
        const shuffledOther = [...otherItems].sort(() => Math.random() - 0.5);
        quizItemsPool.push(...shuffledOther.slice(0, quizSlots - quizItemsPool.length));
      }
      if (quizItemsPool.length === 0) {
        quizItemsPool = [...practiceCards].sort(() => Math.random() - 0.5).slice(0, quizSlots);
      }

      const quizSteps = quizItemsPool.map((item, idx) => {
        if (isPreteriteFocusItem(item)) {
          const drillStep = buildPreteriteDrillStep(item, {
            sessionIdx: idx,
            sessionTotal: quizItemsPool.length,
            allowTyped: practiceInputMode === "typed"
          });
          if (drillStep) return drillStep;
        }

        const isVerb = isVerbItem(item);
        if (isVerb) {
          let chosenTense = practiceTense;
          if (chosenTense === "both") {
            chosenTense = Math.random() > 0.5 ? "present" : "preterite";
          } else if (chosenTense === "auto") {
            if (item.defaultTense) {
              chosenTense = item.defaultTense === "both" ? (Math.random() > 0.5 ? "present" : "preterite") : item.defaultTense;
            } else if (
              item.unit?.includes("Unit 3") || 
              item.unit?.includes("Unit 4") || 
              item.category === "Unidad 3" || 
              item.category === "Unidad 4" || 
              item.subcategory?.includes("Pretérito") ||
              item.subcategory?.includes("Preterite") ||
              selectedSubcategory?.includes("Pretérito") ||
              selectedSubcategory?.includes("Preterite") ||
              item.english?.toLowerCase().includes("preterite") ||
              item.english?.toLowerCase().includes("(past)")
            ) {
              chosenTense = "preterite";
            } else {
              chosenTense = "present";
            }
          }

          const qSpec = generateConjugationQuestion(item, { 
            tense: chosenTense,
            excludeVosotros: state.excludeVosotros 
          });
          if (qSpec) {
            return {
              item,
              isCardIntro: false,
              isConjugation: true,
              isTyped: practiceInputMode === "typed",
              isGustar: qSpec.isGustar,
              isReciprocal: qSpec.isReciprocal,
              isSpellChanger: qSpec.isSpellChanger,
              isStemChangerPreterite: qSpec.isStemChangerPreterite,
              isDoubleVowel: qSpec.isDoubleVowel,
              subjectPronoun: qSpec.subjectPronoun,
              infinitive: qSpec.infinitive,
              prompt: qSpec.prompt,
              subjectMeaning: qSpec.subjectMeaning,
              questionWord: qSpec.verb,
              meaning: qSpec.meaning,
              pronoun: qSpec.pronoun,
              tense: qSpec.tense,
              tenseLabel: qSpec.tenseLabel,
              isReflexive: qSpec.isReflexive,
              correct: qSpec.correct,
              choices: qSpec.choices
            };
          }
        }

        let qType = practiceInputMode === "typed" ? 2 : (Math.random() > 0.5 ? 0 : 1);
        if (qType === 2 && (item.spanish.includes("/") || item.spanish.includes("(") || item.spanish.length > 25)) {
          qType = 0;
        }

        const isEsToEn = qType === 0;
        const correctVal = isEsToEn ? formatEnglishPrompt(item.spanish, item.english) : item.spanish;
        const questionText = isEsToEn ? item.spanish : formatEnglishPrompt(item.spanish, item.english);

        const distractors = [];
        while (distractors.length < 3) {
          const rand = vocabularyData[Math.floor(Math.random() * vocabularyData.length)];
          const val = isEsToEn ? formatEnglishPrompt(rand.spanish, rand.english) : rand.spanish;
          if (
            val.toLowerCase() !== correctVal.toLowerCase() && 
            !checkSynonyms(val, correctVal) &&
            !distractors.includes(val) &&
            val.length < 35
          ) {
            distractors.push(val);
          }
        }
        const choices = [correctVal, ...distractors].sort(() => Math.random() - 0.5);

        return {
          item,
          isCardIntro: false,
          isConjugation: false,
          type: qType,
          isTyped: qType === 2,
          questionWord: questionText,
          correct: correctVal,
          choices: choices
        };
      });

      // 3. Include sentence builder challenge in mixed mode
      const sSpecMixed = generateSentenceBuilderQuestion({ unit: state.questStage || 1 });
      const sentenceSteps = [{
        item: null,
        isCardIntro: false,
        isConjugation: false,
        isFillInTheBlank: false,
        isSentenceBuilder: true,
        unit: sSpecMixed.unit,
        prompt: sSpecMixed.prompt,
        promptLanguage: sSpecMixed.promptLanguage,
        targetLanguage: sSpecMixed.targetLanguage,
        targetSentence: sSpecMixed.targetSentence,
        targetWords: sSpecMixed.targetWords,
        targetTokens: sSpecMixed.targetTokens,
        bankTokens: sSpecMixed.bankTokens,
        distractors: sSpecMixed.distractors,
        meaning: sSpecMixed.meaning,
        hint: sSpecMixed.hint,
        correct: sSpecMixed.targetSentence,
        questionWord: sSpecMixed.prompt,
        choices: []
      }];

      questions = [...cardSteps, ...quizSteps, ...sentenceSteps].slice(0, targetCount);
    } else if (practiceQuizMode === "sentence" && !isVerbLab) {
      questions = Array.from({ length: Math.min(targetCount, 25) }).map(() => {
        const sSpec = generateSentenceBuilderQuestion({ unit: state.questStage || 1 });
        return {
          item: null,
          isCardIntro: false,
          isConjugation: false,
          isFillInTheBlank: false,
          isSentenceBuilder: true,
          unit: sSpec.unit,
          prompt: sSpec.prompt,
          promptLanguage: sSpec.promptLanguage,
          targetLanguage: sSpec.targetLanguage,
          targetSentence: sSpec.targetSentence,
          targetWords: sSpec.targetWords,
          targetTokens: sSpec.targetTokens,
          bankTokens: sSpec.bankTokens,
          distractors: sSpec.distractors,
          meaning: sSpec.meaning,
          hint: sSpec.hint,
          correct: sSpec.targetSentence,
          questionWord: sSpec.prompt,
          choices: []
        };
      });
    } else {
      let pool = practiceCards;
      if (practiceQuizMode === "conjugation") {
        const verbPool = practiceCards.filter(item => isVerbItem(item) && !isSentenceItem(item));
        if (verbPool.length > 0) {
          pool = verbPool;
        }
      }

      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      const chosen = shuffled.slice(0, targetCount);

      questions = chosen.map((item, idx) => {
        if (!isVerbLab && isPreteriteFocusItem(item)) {
          const drillStep = buildPreteriteDrillStep(item, {
            sessionIdx: idx,
            sessionTotal: chosen.length,
            allowTyped: practiceInputMode === "typed"
          });
          if (drillStep) return drillStep;
        }

        const isVerb = isVerbItem(item) && !isSentenceItem(item);
        const wantsConjugation = isVerb && (practiceQuizMode === "conjugation" || isVerbLab);

        if (wantsConjugation) {
          let chosenTense = practiceTense;
          if (isVerbLab) {
            if (item.defaultTense && item.defaultTense !== "both") {
              chosenTense = item.defaultTense;
            } else if (item.verbGroup?.startsWith("pret_")) {
              chosenTense = "preterite";
            } else if (item.verbGroup?.startsWith("present_")) {
              chosenTense = "present";
            } else if (item.defaultTense === "both") {
              const hasPreterite = selectedVerbGroups.some(g => g.startsWith("pret_"));
              const hasPresent = selectedVerbGroups.some(g => g.startsWith("present_"));
              if (hasPreterite && !hasPresent) {
                chosenTense = "preterite";
              } else if (hasPresent && !hasPreterite) {
                chosenTense = "present";
              } else {
                chosenTense = Math.random() > 0.5 ? "present" : "preterite";
              }
            } else {
              chosenTense = "present";
            }
          } else if (chosenTense === "both") {
            chosenTense = Math.random() > 0.5 ? "present" : "preterite";
          } else if (chosenTense === "auto") {
            if (item.defaultTense) {
              chosenTense = item.defaultTense === "both" ? (Math.random() > 0.5 ? "present" : "preterite") : item.defaultTense;
            } else if (
              item.unit?.includes("Unit 3") || 
              item.unit?.includes("Unit 4") || 
              item.category === "Unidad 3" || 
              item.category === "Unidad 4" || 
              item.subcategory?.includes("Pretérito") ||
              item.subcategory?.includes("Preterite") ||
              selectedSubcategory?.includes("Pretérito") ||
              selectedSubcategory?.includes("Preterite") ||
              item.english?.toLowerCase().includes("preterite") ||
              item.english?.toLowerCase().includes("(past)")
            ) {
              chosenTense = "preterite";
            } else {
              chosenTense = "present";
            }
          }

          const qSpec = generateConjugationQuestion(item, { 
            tense: chosenTense,
            excludeVosotros: state.excludeVosotros 
          });
          if (qSpec) {
            return {
              item,
              isCardIntro: false,
              isConjugation: true,
              isTyped: practiceInputMode === "typed",
              isGustar: qSpec.isGustar,
              isReciprocal: qSpec.isReciprocal,
              isSpellChanger: qSpec.isSpellChanger,
              isStemChangerPreterite: qSpec.isStemChangerPreterite,
              isDoubleVowel: qSpec.isDoubleVowel,
              subjectPronoun: qSpec.subjectPronoun,
              infinitive: qSpec.infinitive,
              prompt: qSpec.prompt,
              subjectMeaning: qSpec.subjectMeaning,
              questionWord: qSpec.verb,
              meaning: qSpec.meaning,
              pronoun: qSpec.pronoun,
              tense: qSpec.tense,
              tenseLabel: qSpec.tenseLabel,
              isReflexive: qSpec.isReflexive,
              correct: qSpec.correct,
              choices: qSpec.choices
            };
          }
        }

        const fillSpec = !isVerbLab ? generateFillInTheBlank(item) : null;
        if (fillSpec) {
          return {
            item,
            isCardIntro: false,
            isConjugation: false,
            isFillInTheBlank: true,
            questionWord: fillSpec.sentence,
            meaning: fillSpec.meaning,
            correct: fillSpec.correct,
            choices: fillSpec.choices,
            hint: fillSpec.hint,
            targetVerb: fillSpec.targetVerb,
            tense: fillSpec.tense
          };
        }

        let qType = practiceInputMode === "typed" ? 2 : (Math.floor(Math.random() * 2));
        if (qType === 2 && (item.spanish.includes("/") || item.spanish.includes("(") || item.spanish.length > 25)) {
          qType = 0;
        }

        const isEsToEn = qType === 0;
        const correctVal = isEsToEn ? formatEnglishPrompt(item.spanish, item.english) : item.spanish;
        const questionText = isEsToEn ? item.spanish : formatEnglishPrompt(item.spanish, item.english);

        const distractors = [];
        while (distractors.length < 3) {
          const rand = vocabularyData[Math.floor(Math.random() * vocabularyData.length)];
          const val = isEsToEn ? formatEnglishPrompt(rand.spanish, rand.english) : rand.spanish;
          if (
            val.toLowerCase() !== correctVal.toLowerCase() && 
            !checkSynonyms(val, correctVal) &&
            !distractors.includes(val) &&
            val.length < 35
          ) {
            distractors.push(val);
          }
        }
        const choices = [correctVal, ...distractors].sort(() => Math.random() - 0.5);

        return {
          item,
          isCardIntro: false,
          isConjugation: false,
          type: qType,
          isTyped: qType === 2,
          questionWord: questionText,
          correct: correctVal,
          choices: choices
        };
      });
    }

    setPracticeQuestions(questions.filter(Boolean));
    setPracticeCurrentIdx(0);
    setPracticeScore(0);
    setPracticeAnswered(false);
    setPracticeSelected(null);
    setPracticeTyped("");
    setPracticeHintRevealed(false);
    setPracticeFlipped(false);
    setPracticeQuizFinished(false);
    setPracticeQuizStarted(true);
  };

  const handlePracticeNext = () => {
    setPracticeSelected(null);
    setPracticeAnswered(false);
    setPracticeTyped("");
    setPracticeHintRevealed(false);

    if (practiceCurrentIdx < practiceQuestions.length - 1) {
      setPracticeCurrentIdx(prev => prev + 1);
    } else {
      const cardCount = practiceQuestions.filter(q => q.isCardIntro).length;
      const gradedCount = practiceQuestions.filter(q => !q.isCardIntro).length || 1;
      const earnedXp = (practiceScore * 10) + (cardCount * 2);
      const earnedGold = practiceScore;
      addXp(earnedXp);
      addGold(earnedGold);
      recordQuizPerformance(practiceScore, gradedCount);
      setPracticeQuizFinished(true);
    }
  };

  const selectedStageSpec = STAGES[selectedStage];
  const selectedLevelInfo = getLevelInfo(selectedStage, selectedLevel, isEarlyBossLevel(selectedStage, selectedLevel), showCardTranslate);

  const currentQuestQ = questQuestions[questCurrentIdx];
  const shakeClass = shakeTrigger ? "shake damage-flash" : healTrigger ? "heal-flash" : "";

  const isQuestUserCorrect = questAnswered && currentQuestQ && (
    currentQuestQ.isSentenceBuilder
      ? questSelected?.trim().toLowerCase() === currentQuestQ.correct?.trim().toLowerCase()
      : currentQuestQ.isConjugation
        ? cleanConjugationInput(questSelected, currentQuestQ.correct)
        : compareAnswers(currentQuestQ.correct, questSelected)
  );
  const isPracticeUserCorrect = practiceAnswered && practiceQuestions[practiceCurrentIdx] && (
    practiceQuestions[practiceCurrentIdx].isSentenceBuilder
      ? practiceSelected?.trim().toLowerCase() === practiceQuestions[practiceCurrentIdx].correct?.trim().toLowerCase()
      : practiceQuestions[practiceCurrentIdx].isConjugation
        ? cleanConjugationInput(practiceSelected, practiceQuestions[practiceCurrentIdx].correct)
        : compareAnswers(practiceQuestions[practiceCurrentIdx].correct, practiceSelected)
  );

  // RPG Sprite calculations
  const getHeroSprite = (level) => {
    if (level >= 15) return "🧙‍♂️✨";
    if (level >= 10) return "🛡️⚔️";
    if (level >= 5) return "⚔️";
    return "🎒";
  };

  const getMonsterSprite = (category) => {
    if (category === "Verbs") return "😈";
    if (category === "Sentences") return "🐉";
    return "👻";
  };

  const monsterHpPct = currentQuestQ 
    ? Math.max(0, Math.round(((questQuestions.length - questCurrentIdx) / questQuestions.length) * 100))
    : 100;

  const renderFlashcardCard = (item, {
    categoryFront,
    categoryBack,
    backLabel = null,
    hintFront,
    hintBack,
    flipped,
    onToggleFlip,
    wrapperStyle = {}
  }) => {
    const pretDetails = isPreteriteFocusItem(item)
      ? getPreteriteFlashcardDetails(item, state.excludeVosotros)
      : null;

    return (
      <div
        className={`flashcard-wrapper ${pretDetails ? 'flashcard-wrapper--tall' : ''}`}
        onClick={onToggleFlip}
        style={pretDetails ? { ...wrapperStyle, height: undefined } : wrapperStyle}
      >
        <div className={`flashcard ${flipped ? 'flipped' : ''}`}>
          <div className={`flashcard-face flashcard-front ${pretDetails ? 'flashcard-face--preterite' : ''}`}>
            <span className="flashcard-category">{categoryFront}</span>

            {(isVerbItem(item) || item?.subcategory?.includes("Objeto")) && (
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={(e) => { e.stopPropagation(); openCodex(item); }}
                style={{ position: 'absolute', top: '16px', right: '16px', padding: '6px 12px', fontSize: '0.75rem', gap: '4px' }}
              >
                📖 Codex
              </button>
            )}

            {pretDetails ? (
              <div className="flashcard-preterite-body">
                <h3 className="flashcard-term flashcard-preterite-infinitive">{pretDetails.infinitive}</h3>
                <div className="flashcard-preterite-subtitle">
                  {translateInstructions ? "Preterite Conjugations (Pretérito)" : "Conjugaciones en Pretérito"}
                </div>
                <div className="flashcard-preterite-grid">
                  {pretDetails.rows.map((row) => (
                    <div
                      key={row.idx}
                      className={`flashcard-preterite-row ${row.isHighlighted ? 'highlighted' : ''}`}
                    >
                      <span className="flashcard-preterite-pronoun">{row.pronoun}</span>
                      <span className="flashcard-preterite-form">{row.form}</span>
                    </div>
                  ))}
                </div>
                {speechAvailable && (
                  <button
                    type="button"
                    className="btn btn-secondary flashcard-preterite-audio"
                    onClick={(e) => { e.stopPropagation(); speakSpanish(pretDetails.speechText); }}
                    title="Listen to infinitive and preterite forms"
                  >
                    <Volume2 size={16} color="var(--primary)" />
                  </button>
                )}
              </div>
            ) : (
              <>
                <h3 className="flashcard-term" style={{ fontSize: '2rem' }}>{item.spanish}</h3>
                {speechAvailable && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={(e) => { e.stopPropagation(); speakSpanish(item.spanish); }}
                    style={{ position: 'absolute', bottom: '60px', borderRadius: '50%', width: '40px', height: '40px', padding: 0 }}
                  >
                    <Volume2 size={16} color="var(--primary)" />
                  </button>
                )}
              </>
            )}

            <span className="flashcard-hint">{hintFront}</span>
          </div>

          <div className="flashcard-face flashcard-back">
            <span className="flashcard-category">{categoryBack}</span>
            {backLabel && (
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '0.1em', fontWeight: 'bold', marginBottom: '8px' }}>
                {backLabel}
              </span>
            )}
            {pretDetails ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', padding: '0 10px' }}>
                <h4 className="flashcard-translation" style={{ fontSize: '1.8rem' }}>{pretDetails.englishMeaning}</h4>
                <div className="flashcard-preterite-past-summary">
                  {pretDetails.pastSummary}
                </div>
              </div>
            ) : (
              <h4 className="flashcard-translation" style={{ fontSize: '1.6rem' }}>{item.english}</h4>
            )}
            <span className="flashcard-hint">{hintBack}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderConjugationQuestionContent = (q, { isTypedView = false, showCodex = false } = {}) => {
    const isPret = isPreteriteTense(q);
    if (q.isPreteriteDrill) {
      return (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 14px',
              borderRadius: '12px',
              background: 'rgba(249, 115, 22, 0.15)',
              border: '1px solid #f97316',
              color: '#fed7aa',
              fontWeight: '700',
              fontSize: '0.8rem',
              letterSpacing: '0.03em'
            }}>
              <span>⏳</span>
              <span>{translateInstructions ? 'Tiempo Pretérito (Past Tense)' : 'Tiempo Pretérito'}</span>
            </span>
          </div>

          <div className="quiz-question-lbl" style={{ marginBottom: '6px' }}>
            {isTypedView || q.isTyped
              ? (translateInstructions ? "Escribe la conjugación para el pronombre (Type conjugation):" : "Escribe la conjugación para el pronombre:")
              : (translateInstructions ? "Conjuga para el pronombre (Conjugate for the subject pronoun):" : "Conjuga para el pronombre:")}
          </div>

          <h3 className="quiz-word" style={{ fontSize: '2.3rem', margin: '8px 0 4px' }}>
            <span style={{ color: 'var(--gold)', fontWeight: 800 }}>
              {q.subjectPronoun}
            </span>{' '}
            <span style={{ color: 'var(--primary)' }}>
              ({q.displayInfinitive || q.infinitive})
            </span>
          </h3>

          {q.meaning && (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontStyle: 'italic', marginBottom: '14px' }}>
              {q.meaning}
            </p>
          )}
        </>
      );
    }

    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 14px',
            borderRadius: '12px',
            background: isPret ? 'rgba(249, 115, 22, 0.15)' : 'rgba(16, 185, 129, 0.15)',
            border: isPret ? '1px solid #f97316' : '1px solid #10b981',
            color: isPret ? '#fed7aa' : '#a7f3d0',
            fontWeight: '700',
            fontSize: '0.8rem',
            letterSpacing: '0.03em'
          }}>
            <span>{isPret ? '⏳' : '⚡'}</span>
            <span>{isPret ? (translateInstructions ? 'Tiempo Pretérito (Past Tense)' : 'Tiempo Pretérito') : (translateInstructions ? 'Tiempo Presente (Present Tense)' : 'Tiempo Presente')}</span>
          </span>
        </div>

        <div className="quiz-question-lbl" style={{ marginBottom: '6px' }}>
          {q.isGustar
            ? (isTypedView || q.isTyped
                ? (translateInstructions ? "Escribe la forma correcta de gustar (Type form):" : "Escribe la forma correcta de gustar:")
                : (translateInstructions ? "Selecciona la forma correcta de gustar (Select correct form of gustar):" : "Selecciona la forma correcta de gustar:"))
            : (isTypedView || q.isTyped
                ? (translateInstructions ? "Escribe la conjugación para el pronombre (Type conjugation):" : "Escribe la conjugación para el pronombre:")
                : (translateInstructions ? "Conjuga para el pronombre (Conjugate for the subject pronoun):" : "Conjuga para el pronombre:"))}
        </div>

        {(q.isReciprocal || q.isReflexive || q.isSpellChanger || q.isStemChangerPreterite || q.isDoubleVowel || q.isGustar) && (
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
            {q.isReciprocal ? (
              <span className="badge badge-primary" style={{ fontSize: '0.75rem', padding: '3px 8px', borderRadius: '8px', background: 'rgba(236, 72, 153, 0.15)', color: '#f472b6', borderColor: 'rgba(236, 72, 153, 0.3)' }}>
                {translateInstructions ? '🤝 Acción Recíproca ("Each Other")' : '🤝 Acción Recíproca'}
              </span>
            ) : q.isReflexive ? (
              <span className="badge badge-primary" style={{ fontSize: '0.75rem', padding: '3px 8px', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.15)', color: '#a5b4fc', borderColor: 'rgba(99, 102, 241, 0.3)' }}>
                🪞 Reflexivo (me, te, se, nos, os, se)
              </span>
            ) : null}
            {q.isSpellChanger && (
              <span className="badge badge-primary" style={{ fontSize: '0.75rem', padding: '3px 8px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', borderColor: 'rgba(59, 130, 246, 0.3)' }}>
                ✍️ Cambio Ortográfico (-car/-gar/-zar)
              </span>
            )}
            {q.isStemChangerPreterite && (
              <span className="badge badge-primary" style={{ fontSize: '0.75rem', padding: '3px 8px', borderRadius: '8px', background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', borderColor: 'rgba(168, 85, 247, 0.3)' }}>
                👟 Verbo Sandalia (e➔i / o➔u)
              </span>
            )}
            {q.isDoubleVowel && (
              <span className="badge badge-primary" style={{ fontSize: '0.75rem', padding: '3px 8px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                📖 Doble Vocal (i ➔ y)
              </span>
            )}
            {q.isGustar && (
              <span className="badge badge-primary" style={{ fontSize: '0.75rem', padding: '3px 8px', borderRadius: '8px', background: 'rgba(234, 179, 8, 0.15)', color: 'var(--gold)', borderColor: 'rgba(234, 179, 8, 0.3)' }}>
                ✨ Tipo Gustar ({isPret ? 'gustó vs gustaron' : 'gusta vs gustan'})
              </span>
            )}
          </div>
        )}

        <h3 className="quiz-word" style={{ fontSize: q.isGustar ? '1.8rem' : '2.3rem', margin: '8px 0 4px' }}>
          {q.isGustar ? (
            q.questionWord
          ) : (
            <>
              <span style={{ color: 'var(--gold)', fontWeight: 800 }}>
                {q.subjectPronoun || q.questionWord?.split(' ')[0]}
              </span>{' '}
              <span style={{ color: 'var(--primary)' }}>
                ({q.infinitive || q.item?.spanish || q.questionWord?.replace(/^[^(]+\(/, '').replace(/\)$/, '')})
              </span>
            </>
          )}
        </h3>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontStyle: 'italic', marginBottom: '14px' }}>
          {q.isGustar ? sanitizeMeaningForQuiz(q.meaning) : `${q.pronoun} • ${sanitizeMeaningForQuiz(q.meaning)}`}
        </p>

        {showCodex && (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => openCodex(q.item)}
            style={{ padding: '4px 10px', fontSize: '0.75rem', margin: '10px auto 0', display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content' }}
          >
            📖 {translateInstructions ? "Ver Conjugaciones (View Conjugations)" : "Ver Conjugaciones"}
          </button>
        )}
      </>
    );
  };

  return (
    <div className={`view-container ${shakeClass}`} style={{ transition: 'background-color 0.25s ease' }}>
      
      {/* Header controls */}
      <div className="view-header">
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem' }}>Baraja de Aprendizaje (Study & Quest Deck)</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Campaign quests and custom practice modules.</p>
        </div>
        <button className="btn btn-secondary" onClick={() => { handleCancelRedemption(); setView('dashboard'); }}>
          <ArrowLeft size={16} /> Back to Hub
        </button>
      </div>

      {/* Tab Switcher */}
      {!questStarted && !practiceQuizStarted && !redemptionActive && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '14px', width: 'fit-content' }}>
            <button 
              className={`btn ${activeTab === 'quest' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              onClick={() => setActiveTab("quest")}
            >
              Quest Campaign (Búsqueda)
            </button>
            <button 
              className={`btn ${activeTab === 'practice' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              onClick={() => setActiveTab("practice")}
            >
              Practice Deck (Práctica)
            </button>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.02)', padding: '6px 12px', borderRadius: '10px', border: '1px solid var(--card-border)' }}>
              <input 
                type="checkbox" 
                id="autoSpeakCheckbox" 
                checked={state.autoSpeak ?? true} 
                onChange={toggleAutoSpeak} 
                style={{ cursor: 'pointer', accentColor: 'var(--primary)' }}
              />
              <label htmlFor="autoSpeakCheckbox" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 600 }}>
                🔊 {translateInstructions ? "Auto-pronunciar (Auto-speak)" : "Auto-pronunciar"}
              </label>
            </div>

            <button
              type="button"
              onClick={toggleTranslateInstructions}
              className={`btn ${translateInstructions ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                fontSize: '0.8rem',
                borderRadius: '10px',
                border: translateInstructions ? '1.5px solid var(--primary)' : '1px solid var(--card-border)',
                background: translateInstructions ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.02)',
                color: translateInstructions ? '#c7d2fe' : 'var(--text-secondary)',
                fontWeight: 600,
                cursor: 'pointer'
              }}
              title={translateInstructions ? "Instrucciones traducidas al inglés (clic para volver al español)" : "Traducir instrucciones al inglés"}
            >
              <Globe size={14} />
              <span>{translateInstructions ? "Instrucciones: EN (Traducido)" : "Instrucciones: ES (Original)"}</span>
            </button>

            <button
              type="button"
              onClick={() => openCodex("guia_contrastes")}
              className="btn btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                fontSize: '0.8rem',
                borderRadius: '10px',
                border: '1.5px solid rgba(139, 92, 246, 0.4)',
                background: 'rgba(139, 92, 246, 0.12)',
                color: '#c4b5fd',
                fontWeight: 600,
                cursor: 'pointer'
              }}
              title="Abrir la Guía de Contrastes Gramaticales (Which One to Use When)"
            >
              <span>⚖️</span>
              <span>{translateInstructions ? "Guía de Contrastes (Grammar Contrasts)" : "Guía de Contrastes"}</span>
            </button>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          TAB 1: QUEST CAMPAIGN VIEW
          ------------------------------------------------------------- */}
      {activeTab === "quest" && !questStarted && !redemptionActive && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {questFinished && (
            <div 
              className="glass-panel" 
              style={{ 
                padding: '24px', 
                border: questSuccessMsg ? '2px solid var(--accent)' : '2px solid var(--danger)',
                background: questSuccessMsg ? 'rgba(16,185,129,0.03)' : 'rgba(239,68,68,0.03)',
                animation: 'pop-in 0.4s ease-out',
                textAlign: 'center'
              }}
            >
              {activeQuestIsEarlyBoss ? (
                questSuccessMsg ? (
                  <Zap size={48} color="var(--gold)" style={{ margin: '0 auto 12px', animation: 'float 3s ease-in-out infinite' }} />
                ) : (
                  <Skull size={48} color="var(--danger)" style={{ margin: '0 auto 12px', animation: 'float 3s ease-in-out infinite' }} />
                )
              ) : (
                <Award size={48} color={questSuccessMsg ? "var(--accent)" : "var(--danger)"} style={{ margin: '0 auto 12px', animation: 'float 3s ease-in-out infinite' }} />
              )}
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
                {activeQuestIsEarlyBoss
                  ? (questSuccessMsg 
                      ? (translateInstructions ? "⚡ ¡Desafío de Salto Superado! (Skip Challenge Cleared!)" : "⚡ ¡Desafío de Salto Superado!") 
                      : (translateInstructions ? "💀 Desafío de Salto Fallado (Skip Challenge Failed - Sudden Death)" : "💀 Desafío de Salto Fallado (Muerte Súbita)"))
                  : (questSuccessMsg 
                      ? (translateInstructions ? "¡Misión Cumplida! (Quest Completed!)" : "¡Misión Cumplida!") 
                      : (translateInstructions ? "Misión Fallida (Quest Failed)" : "Misión Fallida"))}
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#e2e8f0', maxWidth: '540px', margin: '0 auto 16px', lineHeight: '1.4' }}>
                {questSuccessMsg || questFailMsg}
              </p>
              
              {activeQuestIsEarlyBoss && questSuccessMsg && (
                <div style={{
                  margin: '0 auto 16px',
                  padding: '8px 18px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(251, 191, 36, 0.2))',
                  border: '1.5px solid rgba(251, 191, 36, 0.6)',
                  color: '#fef08a',
                  fontSize: '0.88rem',
                  fontWeight: 'bold',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 0 20px rgba(251, 191, 36, 0.25)'
                }}>
                  <span>⚡</span>
                  <span>{translateInstructions ? "¡Trofeo Desbloqueado: Desafío Implacable (Skip Master Trophy Unlocked)!" : "¡Trofeo Desbloqueado: Desafío Implacable (Skip Master)!"}</span>
                  <span>🏆</span>
                </div>
              )}

              {questSuccessMsg && hintsUsedInSession === 0 && (
                <div style={{
                  margin: '0 auto 16px',
                  padding: '8px 18px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(16, 185, 129, 0.15))',
                  border: '1px solid rgba(251, 191, 36, 0.4)',
                  color: '#fef08a',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 0 16px rgba(251, 191, 36, 0.15)'
                }}>
                  <span>🧠</span>
                  <span>{translateInstructions ? "¡Victoria Sin Pistas! (Completed without hints!)" : "¡Victoria Sin Pistas!"}</span>
                  <span>✨</span>
                </div>
              )}
              
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', width: 'fit-content', margin: '0 auto 20px', border: '1px solid var(--card-border)', display: 'flex', gap: '20px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>{translateInstructions ? "Desafíos Correctos (Correct Challenges)" : "Desafíos Correctos"}</span>
                  <strong style={{ fontSize: '1.4rem', color: 'var(--accent)' }}>{questScore} / {questQuestions.filter(q => !q.isCardIntro).length}</strong>
                </div>
                {questSuccessMsg && (
                  <>
                    <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }}></div>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>{translateInstructions ? "Botín Ganado (Loot Gained)" : "Botín Ganado"}</span>
                      <strong style={{ fontSize: '1.2rem', color: 'var(--gold)' }}>+{activeQuestIsEarlyBoss ? 100 : activeQuestIsReview ? 50 : 12} Gold</strong>
                    </div>
                  </>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setQuestFinished(false)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Layers size={16} /> {translateInstructions ? "Selector de Niveles (Level Select)" : "Selector de Niveles"}
                </button>
                {activeQuestIsEarlyBoss ? (
                  questSuccessMsg ? (
                    <button 
                      className="btn btn-primary" 
                      onClick={() => { 
                        setQuestFinished(false); 
                        setSelectedStage(state.questStage); 
                        setSelectedLevel(1); 
                      }}
                      style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      {translateInstructions ? "Continuar a la Nueva Unidad (Continue to Next Unit)" : "Continuar a la Nueva Unidad"} <Play size={16} />
                    </button>
                  ) : (
                    <>
                      <button 
                        className="btn btn-danger" 
                        onClick={() => { setQuestFinished(false); startQuestLevel(activeQuestStage, 25); }}
                        style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        <Zap size={16} /> {translateInstructions ? "Reintentar Reto de Salto (Retry Skip Challenge)" : "Reintentar Reto de Salto"}
                      </button>
                      <button 
                        className="btn btn-secondary" 
                        onClick={() => { 
                          setQuestFinished(false); 
                          setSelectedStage(state.questStage); 
                          setSelectedLevel(state.isReviewReady ? 25 : state.questLevel); 
                        }}
                        style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        {translateInstructions ? "Volver a Lecciones de Campaña (Return to Campaign Lessons)" : "Volver a Lecciones de Campaña"}
                      </button>
                    </>
                  )
                ) : activeQuestIsReplay ? (
                  <button 
                    className="btn btn-primary" 
                    onClick={() => { setQuestFinished(false); startQuestLevel(activeQuestStage, activeQuestLevel); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <RotateCcw size={16} /> {translateInstructions ? `Repetir Práctica (Replay Practice - ${activeQuestIsReview ? 'Review Gate' : `Nivel ${activeQuestLevel}`})` : `Repetir Práctica (${activeQuestIsReview ? 'Review Gate' : `Nivel ${activeQuestLevel}`})`}
                  </button>
                ) : (
                  <button 
                    className="btn btn-primary" 
                    onClick={() => { 
                      setQuestFinished(false); 
                      if (questSuccessMsg) {
                        const nextStage = state.questStage;
                        const nextLvl = state.isReviewReady ? 25 : state.questLevel;
                        startQuestLevel(nextStage, nextLvl);
                      } else {
                        startQuestLevel(activeQuestStage, activeQuestLevel);
                      }
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    {questSuccessMsg 
                      ? (translateInstructions ? "Continuar al Siguiente Nivel (Continue to Next Level)" : "Continuar al Siguiente Nivel") 
                      : (translateInstructions ? "Reintentar Nivel (Retry Level)" : "Reintentar Nivel")} <Play size={16} />
                  </button>
                )}
              </div>
            </div>
          )}

          {!questFinished && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Stage Navigator (Stages 1 through 5) */}
              <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
                {[1, 2, 3, 4, 5].map(sNum => {
                  const isStageUnlocked = sNum <= state.questStage;
                  const isStageCurrent = sNum === state.questStage;
                  const isStageCompleted = sNum < state.questStage;
                  const isStageSelected = sNum === selectedStage;

                  return (
                    <button
                      key={sNum}
                      onClick={() => {
                        if (isStageUnlocked) {
                          setSelectedStage(sNum);
                          setSelectedLevel(sNum === state.questStage ? (state.isReviewReady ? 25 : state.questLevel) : 1);
                        }
                      }}
                      disabled={!isStageUnlocked}
                      className={`btn ${isStageSelected ? 'btn-primary' : 'btn-secondary'}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 16px',
                        fontSize: '0.88rem',
                        borderRadius: '12px',
                        opacity: isStageUnlocked ? 1 : 0.45,
                        cursor: isStageUnlocked ? 'pointer' : 'not-allowed',
                        border: isStageSelected ? '2px solid var(--primary)' : isStageCurrent ? '1.5px solid var(--gold)' : undefined,
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <span>{sNum === 1 ? '🏰' : sNum === 2 ? '🩺' : sNum === 3 ? '🛍️' : sNum === 4 ? '✈️' : '💻'}</span>
                      <span>{translateInstructions ? `Stage ${sNum}` : `Etapa ${sNum}`}</span>
                      {isStageCompleted && (
                        <span style={{ fontSize: '0.7rem', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent)', padding: '2px 6px', borderRadius: '8px', fontWeight: 'bold' }}>
                          ✓ 100%
                        </span>
                      )}
                      {isStageCurrent && (
                        <span style={{ fontSize: '0.7rem', background: 'rgba(250, 204, 21, 0.2)', color: 'var(--gold)', padding: '2px 6px', borderRadius: '8px', fontWeight: 'bold' }}>
                          {translateInstructions ? "Current" : "Actual"}
                        </span>
                      )}
                      {!isStageUnlocked && <Lock size={12} color="var(--text-muted)" />}
                    </button>
                  );
                })}
              </div>

              {/* Selected Stage Panel */}
              {selectedStageSpec && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* Stage Summary Banner */}
                  <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--card-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
                      <div style={{ maxWidth: '650px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--gold)', letterSpacing: '0.1em', fontWeight: 'bold' }}>
                            {translateInstructions ? `Stage ${selectedStage}` : `Etapa ${selectedStage}`} {selectedStage < state.questStage ? (translateInstructions ? '• Completed ✓' : '• Completada ✓') : selectedStage === state.questStage ? (translateInstructions ? '• In Progress ⚔️' : '• En Curso ⚔️') : ''}
                          </span>
                        </div>
                        <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', margin: '0 0 6px' }}>
                          {selectedStageSpec.name}
                        </h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                          {selectedStage < state.questStage 
                            ? (translateInstructions
                                ? "You have completed all levels in this stage. Select any level to practice freely and earn bonus Gold & XP!"
                                : "Has superado todos los niveles de esta etapa. ¡Selecciona cualquier nivel para practicarlo libremente para ganar Oro y XP extra!")
                            : selectedStage === state.questStage
                              ? (translateInstructions
                                  ? `Campaign progress: Level ${state.isReviewReady ? 'Review Gate' : state.questLevel} of 24. You can replay previous levels to practice without risk.`
                                  : `Progreso de campaña: Nivel ${state.isReviewReady ? 'Puerta de Revisión' : state.questLevel} de 24. Puedes volver a niveles anteriores para practicar sin riesgo.`)
                              : (translateInstructions ? "Stage locked." : "Etapa bloqueada.")}
                        </p>
                      </div>

                      {/* Quick play current quest level */}
                      <div>
                        {selectedStage === state.questStage ? (
                          !state.fainted && (
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                              <button
                                className={`btn ${state.isReviewReady ? 'btn-danger' : 'btn-primary'}`}
                                onClick={() => startQuestLevel(state.questStage, state.isReviewReady ? 25 : state.questLevel)}
                                style={{ fontSize: '0.88rem', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '8px' }}
                              >
                                <Play size={14} /> {translateInstructions ? "Play Current Level" : "Jugar Nivel Actual"} ({state.isReviewReady ? 'Review Gate' : `Lvl ${state.questLevel}`})
                              </button>
                              {!state.isReviewReady && (
                                <button
                                  className="btn btn-danger"
                                  onClick={() => {
                                    setSelectedLevel(25);
                                    startQuestLevel(state.questStage, 25);
                                  }}
                                  style={{ 
                                    fontSize: '0.88rem', 
                                    padding: '10px 16px', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '6px',
                                    background: 'rgba(239, 68, 68, 0.15)',
                                    border: '1.5px solid rgba(239, 68, 68, 0.5)',
                                    color: '#fca5a5'
                                  }}
                                  title={translateInstructions ? "Skip the entire unit by defeating the Boss now in Sudden Death (30 questions, 0 mistakes allowed)" : "Salta toda la unidad enfrentándote al Jefe ahora en Muerte Súbita (30 preguntas, 0 fallos permitidos)"}
                                >
                                  <Zap size={14} /> {translateInstructions ? "⚡ Skip Challenge (Boss)" : "⚡ Reto de Salto (Jefe)"}
                                </button>
                              )}
                            </div>
                          )
                        ) : (
                          <button
                            className="btn btn-secondary"
                            onClick={() => {
                              setSelectedStage(state.questStage);
                              setSelectedLevel(state.isReviewReady ? 25 : state.questLevel);
                            }}
                            style={{ fontSize: '0.88rem', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '8px' }}
                          >
                            <Compass size={14} /> {translateInstructions ? `Go to Current Stage (${state.questStage})` : `Ir a Mi Etapa Actual (${state.questStage})`}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar in Selected Stage */}
                    <div className="stat-row" style={{ margin: '0 0 16px' }}>
                      <div className="stat-label">
                        <span>{translateInstructions ? "Stage Levels Passed" : "Niveles de Etapa Aprobados"}</span>
                        <strong>
                          {selectedStage < state.questStage 
                            ? "25 / 25 (100%)" 
                            : selectedStage === state.questStage 
                              ? (state.isReviewReady ? (translateInstructions ? "24 / 25 (96%) • Review Gate Ready" : "24 / 25 (96%) • Puerta de Revisión Lista") : `${Math.min(24, state.questLevel - 1)} / 25 (${Math.round((Math.min(24, state.questLevel - 1) / 25) * 100)}%)`)
                              : "0 / 25"}
                        </strong>
                      </div>
                      <div className="progress-bar-outer" style={{ height: '8px' }}>
                        <div 
                          className="progress-bar-inner xp" 
                          style={{ 
                            width: selectedStage < state.questStage 
                              ? '100%' 
                              : selectedStage === state.questStage 
                                ? (state.isReviewReady ? '96%' : `${Math.round((Math.min(24, state.questLevel - 1) / 25) * 100)}%`)
                                : '0%' 
                          }}
                        />
                      </div>
                    </div>

                    {/* Subcategories tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {selectedStageSpec.subcategories.slice(0, 10).map(sub => (
                        <span key={sub} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          {sub}
                        </span>
                      ))}
                      {selectedStageSpec.subcategories.length > 10 && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
                          +{selectedStageSpec.subcategories.length - 10} más
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 25 Levels Grid */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h4 style={{ fontSize: '1rem', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Layers size={18} color="var(--primary)" /> {translateInstructions ? `Stage ${selectedStage} Levels` : `Niveles de la Etapa ${selectedStage}`}
                      </h4>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {translateInstructions ? "Click on a cleared level to practice" : "Haz clic en un nivel aprobado para practicar"}
                      </span>
                    </div>

                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fill, minmax(135px, 1fr))', 
                      gap: '12px', 
                      marginBottom: '16px' 
                    }}>
                      {Array.from({ length: 25 }, (_, i) => i + 1).map(lvl => {
                        const passed = isLevelPassed(selectedStage, lvl);
                        const current = isLevelCurrent(selectedStage, lvl);
                        const locked = isLevelLocked(selectedStage, lvl);
                        const isSelected = selectedLevel === lvl;
                        const isReviewGate = lvl === 25;
                        const isEarlyBoss = isEarlyBossLevel(selectedStage, lvl);

                        const levelInfo = getLevelInfo(selectedStage, lvl, isEarlyBoss, translateInstructions);
                        const recordKey = `${selectedStage}-${lvl}`;
                        const record = state.levelRecords?.[recordKey];

                        return (
                          <button
                            key={lvl}
                            onClick={() => {
                              if (!locked) {
                                setSelectedLevel(lvl);
                              }
                            }}
                            disabled={locked}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              textAlign: 'center',
                              padding: '12px 8px',
                              borderRadius: '14px',
                              border: isSelected
                                ? '2px solid var(--primary)'
                                : isEarlyBoss
                                  ? '2px dashed rgba(239, 68, 68, 0.7)'
                                  : current
                                    ? '2px solid var(--gold)'
                                    : passed
                                      ? '1.5px solid rgba(16, 185, 129, 0.45)'
                                      : '1px solid rgba(255, 255, 255, 0.08)',
                              background: isSelected
                                ? 'rgba(99, 102, 241, 0.18)'
                                : isEarlyBoss
                                  ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.18), rgba(245, 158, 11, 0.08))'
                                  : current
                                    ? 'linear-gradient(135deg, rgba(250, 204, 21, 0.15), rgba(99, 102, 241, 0.1))'
                                    : passed
                                      ? 'rgba(16, 185, 129, 0.06)'
                                      : 'rgba(255, 255, 255, 0.02)',
                              boxShadow: isSelected
                                ? '0 0 16px var(--primary-glow)'
                                : isEarlyBoss
                                  ? '0 0 14px rgba(239, 68, 68, 0.35)'
                                  : current
                                    ? '0 0 14px rgba(250, 204, 21, 0.25)'
                                    : 'none',
                              opacity: locked ? 0.35 : 1,
                              cursor: locked ? 'not-allowed' : 'pointer',
                              transition: 'all 0.2s ease',
                              position: 'relative'
                            }}
                          >
                            {/* Top Badge */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                              {isEarlyBoss ? (
                                <span style={{ fontSize: '0.72rem', background: 'rgba(239, 68, 68, 0.25)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.5)', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>
                                  {translateInstructions ? "⚡ Skip" : "⚡ Salto"}
                                </span>
                              ) : isReviewGate ? (
                                <span style={{ fontSize: '0.72rem', background: current ? 'rgba(239, 68, 68, 0.2)' : passed ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)', color: current ? 'var(--danger)' : passed ? 'var(--accent)' : 'var(--text-muted)', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>
                                  🛡️ Boss
                                </span>
                              ) : (
                                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: current ? 'var(--gold)' : passed ? 'var(--accent)' : 'var(--text-secondary)' }}>
                                  {translateInstructions ? `Level ${lvl}` : `Nivel ${lvl}`}
                                </span>
                              )}
                            </div>

                            {/* Status Icon */}
                            <div style={{ margin: '4px 0 6px' }}>
                              {passed ? (
                                <CheckCircle2 size={24} color="var(--accent)" />
                              ) : isEarlyBoss ? (
                                <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', animation: 'float 2s ease-in-out infinite' }}>
                                  ⚡💀
                                </div>
                              ) : current ? (
                                <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', animation: 'float 2s ease-in-out infinite' }}>
                                  ⚔️
                                </div>
                              ) : (
                                <Lock size={20} color="var(--text-muted)" />
                              )}
                            </div>

                            {/* Level Title */}
                            <span style={{ 
                              fontSize: '0.75rem', 
                              fontWeight: 600, 
                              color: isSelected ? 'var(--text-primary)' : isEarlyBoss ? '#fca5a5' : 'var(--text-secondary)',
                              lineHeight: 1.2,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              minHeight: '2.4em'
                            }}>
                              {isEarlyBoss ? (translateInstructions ? '⚡ Skip Challenge (Boss)' : '⚡ Reto de Salto (Jefe)') : levelInfo.title}
                            </span>

                            {/* Subtitle / Best score badge */}
                            {isEarlyBoss ? (
                              <span style={{ marginTop: '4px', fontSize: '0.68rem', color: '#f87171', fontWeight: 'bold' }}>
                                {translateInstructions ? "0 mistakes • 30 Qs" : "0 fallos • 30 Qs"}
                              </span>
                            ) : record ? (
                              <span style={{ marginTop: '4px', fontSize: '0.68rem', color: 'var(--gold)', fontWeight: 600 }}>
                                ⭐ {record.bestScore}/{record.total}
                              </span>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Selected Level Detail Card */}
                  {selectedLevelInfo && (() => {
                    const isEarlyBoss = isEarlyBossLevel(selectedStage, selectedLevel);
                    const currentCardInfo = getLevelInfo(selectedStage, selectedLevel, isEarlyBoss, showCardTranslate);

                    return (
                    <div 
                      className="glass-panel" 
                      style={{ 
                        padding: '24px', 
                        borderRadius: '16px',
                        border: isEarlyBoss
                          ? '2px solid rgba(239, 68, 68, 0.7)'
                          : isLevelCurrent(selectedStage, selectedLevel)
                            ? '2px solid var(--gold)'
                            : isLevelPassed(selectedStage, selectedLevel)
                              ? '2px solid var(--accent)'
                              : '1px solid var(--card-border)',
                        background: isEarlyBoss
                          ? 'rgba(239, 68, 68, 0.05)'
                          : isLevelCurrent(selectedStage, selectedLevel)
                            ? 'rgba(250, 204, 21, 0.03)'
                            : isLevelPassed(selectedStage, selectedLevel)
                              ? 'rgba(16, 185, 129, 0.03)'
                              : 'rgba(255, 255, 255, 0.02)',
                        boxShadow: isEarlyBoss ? '0 0 25px rgba(239, 68, 68, 0.2)' : 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                            <span style={{ 
                              fontSize: '0.75rem', 
                              fontWeight: 'bold', 
                              textTransform: 'uppercase', 
                              padding: '3px 10px', 
                              borderRadius: '8px',
                              background: isEarlyBoss
                                ? 'rgba(239, 68, 68, 0.25)'
                                : isLevelPassed(selectedStage, selectedLevel)
                                  ? 'rgba(16, 185, 129, 0.15)'
                                  : isLevelCurrent(selectedStage, selectedLevel)
                                    ? 'rgba(250, 204, 21, 0.15)'
                                    : 'rgba(255, 255, 255, 0.05)',
                              color: isEarlyBoss
                                ? '#f87171'
                                : isLevelPassed(selectedStage, selectedLevel)
                                  ? 'var(--accent)'
                                  : isLevelCurrent(selectedStage, selectedLevel)
                                    ? 'var(--gold)'
                                    : 'var(--text-muted)'
                            }}>
                              {isEarlyBoss
                                ? (showCardTranslate ? '⚡ Skip Challenge (Sudden Death - 0 Mistakes)' : '⚡ Desafío de Salto (Muerte Súbita - 0 Errores)')
                                : isLevelPassed(selectedStage, selectedLevel)
                                  ? (showCardTranslate ? '✓ Cleared Level (Ready to Review)' : '✓ Nivel Aprobado (Listo para Repasar)')
                                  : isLevelCurrent(selectedStage, selectedLevel)
                                    ? (showCardTranslate ? '⚔️ Current Campaign Mission' : '⚔️ Misión de Campaña Actual')
                                    : (showCardTranslate ? '🔒 Locked Level' : '🔒 Nivel Bloqueado')}
                            </span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                              {selectedLevel === 25 ? (showCardTranslate ? 'Review Gate (Boss)' : 'Puerta de Revisión (Jefe)') : (showCardTranslate ? `Level ${selectedLevel} of 24` : `Nivel ${selectedLevel} de 24`)}
                            </span>
                          </div>

                          <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-display)', margin: '4px 0', color: isEarlyBoss ? '#fca5a5' : 'inherit' }}>
                            {currentCardInfo.title}
                          </h3>
                          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '4px 0 0', maxWidth: '650px', lineHeight: 1.4 }}>
                            {currentCardInfo.desc}
                          </p>
                        </div>

                        {/* Card controls (Inline translate button & Best score badge) */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <button
                            type="button"
                            onClick={() => setCardTranslateOverride(prev => (prev === null ? !translateInstructions : !prev))}
                            className="btn btn-secondary btn-sm"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontSize: '0.75rem',
                              padding: '5px 12px',
                              borderRadius: '12px',
                              background: showCardTranslate ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                              border: showCardTranslate ? '1px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.15)',
                              color: showCardTranslate ? '#c7d2fe' : 'var(--text-secondary)'
                            }}
                            title="Alternar traducción al inglés de las explicaciones y reglas de este nivel"
                          >
                            <Globe size={13} />
                            <span>{showCardTranslate ? "Ver en español (ES)" : "Ver en inglés (EN)"}</span>
                          </button>

                          {state.levelRecords?.[`${selectedStage}-${selectedLevel}`] && (
                            <div style={{ background: 'rgba(250, 204, 21, 0.08)', border: '1px solid rgba(250, 204, 21, 0.25)', padding: '8px 14px', borderRadius: '12px', textAlign: 'center' }}>
                              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>
                                {showCardTranslate ? "Best Score" : "Mejor Puntuación"}
                              </span>
                              <strong style={{ fontSize: '1.1rem', color: 'var(--gold)' }}>
                                ⭐ {state.levelRecords[`${selectedStage}-${selectedLevel}`].bestScore} / {state.levelRecords[`${selectedStage}-${selectedLevel}`].total}
                              </strong>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Level requirements explanation */}
                      {isEarlyBoss ? (
                        <div style={{
                          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(245, 158, 11, 0.1))',
                          border: '1.5px solid rgba(239, 68, 68, 0.45)',
                          padding: '14px 18px',
                          borderRadius: '12px',
                          fontSize: '0.88rem',
                          color: '#fee2e2',
                          lineHeight: 1.5,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '0.95rem', color: '#fca5a5' }}>
                            <Zap size={18} color="#fca5a5" />
                            <span>{showCardTranslate ? "Skip Challenge Rules (Unit Skip Challenge):" : "Reglas del Desafío de Salto (Unit Skip Challenge):"}</span>
                          </div>
                          <ul style={{ margin: 0, paddingLeft: '20px', color: '#e2e8f0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <li>
                              <strong>{showCardTranslate ? "Extended Assessment:" : "Evaluación Extendida:"}</strong>{' '}
                              {showCardTranslate 
                                ? "30 comprehensive synthesis questions (sentence construction, verb conjugation, and contextual sentences)."
                                : "30 preguntas de síntesis completa (construcción de oraciones, conjugación y oraciones contextuales)."}
                            </li>
                            <li>
                              <strong>{showCardTranslate ? "Sudden Death:" : "Muerte Súbita:"}</strong>{' '}
                              {showCardTranslate 
                                ? "Zero mistakes permitted (100% accuracy required). A single mistake terminates the challenge immediately!"
                                : "No se permite cometer ningún error (100% de precisión requerida). ¡Un solo fallo termina el reto de inmediato!"}
                            </li>
                            <li>
                              <strong>{showCardTranslate ? "Skip Reward:" : "Recompensa de Salto:"}</strong>{' '}
                              {showCardTranslate 
                                ? `Clearing 30/30 instantly passes all of Unit ${selectedStage}, unlocks the next unit, awards +100 Gold, +400 XP, and the Exclusive Skip Master Trophy.`
                                : `Al ganar con 30/30, apruebas toda la Unidad ${selectedStage} al instante, desbloqueas la siguiente unidad, ganas +100 Oro, +400 XP y el Trofeo Exclusivo Desafío Implacable.`}
                            </li>
                          </ul>
                        </div>
                      ) : (
                        <div style={{ background: 'rgba(0,0,0,0.15)', padding: '12px 16px', borderRadius: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span>💡</span>
                          <span>
                            {selectedLevel === 25
                              ? (showCardTranslate ? 'Boss Assessment: Requires at least 16/20 (80%) to pass and unlock the next unit.' : 'Evaluación tipo Jefe: Requiere al menos 16/20 (80%) para aprobar.')
                              : isLevelPassed(selectedStage, selectedLevel)
                                ? (showCardTranslate ? 'Extra Practice: Score at least 12/20 (60%) to complete the review session and earn extra Gold/XP. Doesn\'t risk campaign progress!' : 'Práctica Extra: Acierta al menos 12/20 (60%) para completar la sesión de repaso y ganar oro/XP extra. ¡No arriesga tu progreso de campaña!')
                                : (showCardTranslate ? 'Campaign Mission: Score at least 12/20 (60%) to unlock the next level.' : 'Misión de Campaña: Acierta al menos 12/20 (60%) para desbloquear el siguiente nivel.')}
                          </span>
                        </div>
                      )}

                      {/* Start Level Button */}
                      <div>
                        {state.fainted ? (
                          <button className="btn btn-secondary" disabled style={{ opacity: 0.6 }}>
                            {showCardTranslate ? "You are fainted! Purify mistakes in the Dungeon to heal, or use a potion." : "Estás debilitado. ¡Vence errores en la Mazmorra o toma una poción!"}
                          </button>
                        ) : isEarlyBoss ? (
                          <button 
                            className="btn btn-danger"
                            onClick={() => startQuestLevel(selectedStage, 25)}
                            style={{ 
                              fontSize: '1rem', 
                              padding: '12px 24px', 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              gap: '8px',
                              background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                              boxShadow: '0 0 20px rgba(220, 38, 38, 0.4)',
                              fontWeight: 'bold'
                            }}
                          >
                            <Zap size={18} /> {showCardTranslate ? "⚡ Challenge the Boss (Sudden Death - 30 Questions)" : "⚡ Desafiar al Jefe (Muerte Súbita - 30 Preguntas)"}
                          </button>
                        ) : isLevelLocked(selectedStage, selectedLevel) ? (
                          <button className="btn btn-secondary" disabled style={{ opacity: 0.5, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            <Lock size={16} /> {showCardTranslate ? "Locked Level (Clear previous levels first)" : "Nivel Bloqueado (Supera los niveles anteriores)"}
                          </button>
                        ) : isLevelPassed(selectedStage, selectedLevel) ? (
                          <button 
                            className="btn btn-primary"
                            onClick={() => startQuestLevel(selectedStage, selectedLevel)}
                            style={{ fontSize: '1rem', padding: '12px 24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                          >
                            <RotateCcw size={16} /> {showCardTranslate ? `Practice Level ${selectedLevel === 25 ? 'Review Gate' : selectedLevel} (Extra Practice)` : `Practicar Nivel ${selectedLevel === 25 ? 'Review Gate' : selectedLevel} (Práctica Extra)`}
                          </button>
                        ) : (
                          <button 
                            className={`btn ${selectedLevel === 25 ? 'btn-danger' : 'btn-primary'}`}
                            onClick={() => startQuestLevel(selectedStage, selectedLevel)}
                            style={{ fontSize: '1rem', padding: '12px 24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                          >
                            <Play size={16} /> {selectedLevel === 25 ? (showCardTranslate ? 'Start Review Gate' : 'Iniciar Puerta de Revisión') : (showCardTranslate ? `Start Campaign Level ${selectedLevel}` : `Iniciar Nivel ${selectedLevel} de Campaña`)}
                          </button>
                        )}
                      </div>
                    </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------------
          ACTIVE QUEST GAMEPLAY SCREEN
          ------------------------------------------------------------- */}
      {questStarted && currentQuestQ && (
        <div 
          className="glass-panel quiz-box"
          style={{
            boxShadow: comboCount >= 10 
              ? '0 0 35px rgba(239, 68, 68, 0.4)' 
              : comboCount >= 5 
                ? '0 0 25px rgba(249, 115, 22, 0.3)' 
                : comboCount >= 3 
                  ? '0 0 15px rgba(250, 204, 21, 0.2)' 
                  : 'none',
            border: comboCount >= 3 ? '1.5px solid var(--gold)' : '1px solid var(--card-border)'
          }}
        >
          
          {/* Header HP details */}
          <div className="quiz-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                Quest Stage {activeQuestStage} | {translateInstructions ? "Level" : "Nivel"} {activeQuestIsEarlyBoss ? (translateInstructions ? 'Skip Challenge (Boss)' : 'Reto de Salto (Jefe)') : activeQuestIsReview ? 'Review Gate (Boss)' : activeQuestLevel}
              </span>
              {activeQuestIsEarlyBoss && (
                <span 
                  style={{ 
                    fontSize: '0.72rem', 
                    padding: '3px 10px', 
                    borderRadius: '12px', 
                    background: 'rgba(239, 68, 68, 0.2)', 
                    color: '#fca5a5', 
                    border: '1px solid rgba(239, 68, 68, 0.5)',
                    fontWeight: 'bold',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 0 10px rgba(239, 68, 68, 0.3)'
                  }}
                  title={translateInstructions ? "Sudden Death: 0 mistakes allowed in 30 questions to skip the unit" : "Muerte Súbita: 0 errores permitidos en 30 preguntas para saltar la unidad"}
                >
                  <Skull size={12} /> {translateInstructions ? "⚡ Sudden Death (0 Mistakes)" : "⚡ Muerte Súbita (0 Fallos)"}
                </span>
              )}
              {activeQuestIsReplay && (
                <span 
                  style={{ 
                    fontSize: '0.72rem', 
                    padding: '2px 8px', 
                    borderRadius: '12px', 
                    background: 'rgba(99, 102, 241, 0.15)', 
                    color: '#818cf8', 
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title={translateInstructions ? "Extra practice session. Your campaign progress will not decrease." : "Sesión de práctica extra. Tu progreso de campaña no bajará."}
                >
                  <RotateCcw size={12} /> {translateInstructions ? "Extra Practice" : "Práctica Extra"}
                </span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={toggleTranslateInstructions}
                className="btn btn-secondary btn-sm"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '3px 8px',
                  fontSize: '0.72rem',
                  borderRadius: '10px',
                  background: translateInstructions ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                  border: translateInstructions ? '1px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.12)',
                  color: translateInstructions ? '#c7d2fe' : 'var(--text-muted)',
                  cursor: 'pointer'
                }}
                title={translateInstructions ? "Instrucciones traducidas al inglés. Clic para ver en español." : "Traducir instrucciones al inglés."}
              >
                <Globe size={12} />
                <span>{translateInstructions ? "EN" : "ES"}</span>
              </button>

              {hintsUsedInSession === 0 ? (
                <span 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '4px', 
                    fontSize: '0.75rem', 
                    color: '#10b981', 
                    background: 'rgba(16, 185, 129, 0.1)', 
                    border: '1px solid rgba(16, 185, 129, 0.25)', 
                    padding: '2px 8px', 
                    borderRadius: '12px', 
                    fontWeight: 600 
                  }} 
                  title={translateInstructions ? "No hints used! Finish this lesson hintless to earn achievements." : "¡Sin pistas usadas! Termina sin pistas para ganar logros."}
                >
                  {translateInstructions ? "🧠 Sin pistas (No hints)" : "🧠 Sin pistas"}
                </span>
              ) : (
                <span 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '4px', 
                    fontSize: '0.75rem', 
                    color: 'var(--text-muted)', 
                    background: 'rgba(255, 255, 255, 0.05)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    padding: '2px 8px', 
                    borderRadius: '12px' 
                  }} 
                  title={`${hintsUsedInSession} hint(s) revealed`}
                >
                  💡 {hintsUsedInSession}
                </span>
              )}
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem', color: 'var(--danger)', fontWeight: 'bold' }}>
                <Heart size={14} fill="var(--danger)" /> {state.hp} HP
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem', color: 'var(--gold)', fontWeight: 'bold' }}>
                <Coins size={14} /> {state.gold} G
              </span>
            </div>
          </div>

          <div className="quiz-progress-track">
            <div className="quiz-progress-fill" style={{ width: `${((questCurrentIdx + 1) / questQuestions.length) * 100}%` }}></div>
          </div>

          {/* RPG Battle Scene Panel */}
          {!currentQuestQ.isCardIntro && (
            <div 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                background: 'rgba(0,0,0,0.2)', 
                padding: '12px 18px', 
                borderRadius: '12px', 
                marginBottom: '16px', 
                border: '1px solid rgba(255,255,255,0.05)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '4px' }}>{getHeroSprite(state.level)}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>You (Lv. {state.level})</div>
              </div>

              {/* Combo Streaks Banner */}
              {comboCount >= 3 ? (
                <div style={{ textAlign: 'center', animation: 'pulse 1s infinite' }}>
                  <div style={{ fontSize: '1rem', color: '#f97316', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>🔥 STREAK COMBO 🔥</div>
                  <div style={{ fontSize: '1.4rem', color: 'var(--gold)', fontWeight: 'bold' }}>x{comboCount}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                    {comboCount >= 10 ? '2.0x Gold/XP' : comboCount >= 5 ? '1.75x Gold/XP' : '1.5x Gold/XP'}
                  </div>
                </div>
              ) : (
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>VS Vocab Monster</div>
              )}

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '4px' }}>{getMonsterSprite(currentQuestQ.item?.category)}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>HP: {monsterHpPct}%</div>
                <div style={{ width: '60px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden', margin: '4px auto 0' }}>
                  <div style={{ width: `${monsterHpPct}%`, height: '100%', background: 'var(--danger)' }}></div>
                </div>
              </div>
            </div>
          )}

          {currentQuestQ.isCardIntro ? (
            <div style={{ textAlign: 'center', animation: 'pop-in 0.3s ease-out' }}>
              {renderFlashcardCard(currentQuestQ.item, {
                categoryFront: translateInstructions ? "Preview New Word (+2 XP)" : "Vista Previa de Palabra (+2 XP)",
                categoryBack: translateInstructions ? "Preview New Word (+2 XP)" : "Vista Previa de Palabra (+2 XP)",
                hintFront: translateInstructions ? "Click card to reveal translation (Haz clic para ver la traducción)" : "Haz clic para ver la traducción",
                hintBack: translateInstructions ? "Click card to reveal Spanish (Haz clic para volver al español)" : "Haz clic para volver al español",
                flipped: questFlipped,
                onToggleFlip: () => setQuestFlipped(!questFlipped),
                wrapperStyle: { height: '240px' }
              })}

              <button className="btn btn-accent" onClick={handleQuestCardLearned} style={{ width: '100%', maxWidth: '280px', marginTop: '10px' }}>
                {translateInstructions ? "I learned this word! (¡Aprendí esta palabra!)" : "¡Aprendí esta palabra!"}
              </button>
            </div>
          ) : (
            <div>
              {!currentQuestQ.isSentenceBuilder && (
                <div 
                  className="quiz-question-card"
                  style={currentQuestQ.isContrastDecision ? {
                    borderTop: '4px solid #8b5cf6',
                    boxShadow: '0 -2px 18px rgba(139, 92, 246, 0.25)'
                  } : currentQuestQ.isConjugation ? {
                    borderTop: isPreteriteTense(currentQuestQ) ? '4px solid #f97316' : '4px solid #10b981',
                    boxShadow: isPreteriteTense(currentQuestQ) ? '0 -2px 18px rgba(249, 115, 22, 0.2)' : '0 -2px 18px rgba(16, 185, 129, 0.2)'
                  } : undefined}
                >
                  {currentQuestQ.isContrastDecision ? (
                    <>
                      {/* Contrast Decision Header Pill */}
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '4px 14px',
                          borderRadius: '12px',
                          background: 'rgba(139, 92, 246, 0.15)',
                          border: '1px solid rgba(139, 92, 246, 0.4)',
                          color: '#c4b5fd',
                          fontWeight: '700',
                          fontSize: '0.8rem',
                          letterSpacing: '0.03em'
                        }}>
                          <span>⚖️</span>
                          <span>{currentQuestQ.contrastPair}</span>
                        </span>
                      </div>

                      <div className="quiz-question-lbl" style={{ marginBottom: '6px' }}>
                        {translateInstructions ? "Decisión Contrastiva (Choose the correct form):" : "Decisión Contrastiva:"}
                      </div>

                      <h3 className="quiz-word" style={{ fontSize: '1.4rem', color: 'var(--accent)', margin: '10px 0 6px', lineHeight: 1.4 }}>
                        {currentQuestQ.questionWord}
                      </h3>

                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontStyle: 'italic', marginBottom: '12px' }}>
                        ({currentQuestQ.context || sanitizeMeaningForQuiz(currentQuestQ.meaning)})
                      </p>

                      {currentQuestQ.hint && (
                        <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
                          {!questHintRevealed ? (
                            <button
                              type="button"
                              onClick={() => {
                                setQuestHintRevealed(true);
                                setHintsUsedInSession(prev => prev + 1);
                              }}
                              style={{
                                background: 'rgba(255, 255, 255, 0.06)',
                                border: '1px solid rgba(255, 255, 255, 0.18)',
                                color: 'var(--text-secondary)',
                                borderRadius: '20px',
                                padding: '4px 14px',
                                fontSize: '0.78rem',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                transition: 'all 0.2s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
                                e.currentTarget.style.color = '#c4b5fd';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
                                e.currentTarget.style.color = 'var(--text-secondary)';
                              }}
                            >
                              <span>💡</span>
                              <span>{translateInstructions ? "Ver Pista de la Regla (Show Rule Hint)" : "Ver Pista de la Regla"}</span>
                            </button>
                          ) : (
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(139, 92, 246, 0.12)', border: '1px solid rgba(139, 92, 246, 0.3)', padding: '6px 14px', borderRadius: '12px', color: '#c4b5fd', fontSize: '0.8rem', maxWidth: '90%', animation: 'fadeIn 0.2s ease' }}>
                              <span>💡</span>
                              <span><strong>{translateInstructions ? "Regla (Rule):" : "Regla:"}</strong> {currentQuestQ.hint}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  ) : currentQuestQ.isConjugation ? (
                    renderConjugationQuestionContent(currentQuestQ, {
                      isTypedView: Boolean(currentQuestQ.isTyped),
                      showCodex: false
                    })
                  ) : currentQuestQ.isFillInTheBlank ? (
                    <>
                      <div className="quiz-question-lbl">
                        {translateInstructions ? "Completar la frase (Fill in the blank):" : "Completar la frase:"}
                      </div>
                      <h3 className="quiz-word" style={{ color: 'var(--accent)' }}>{currentQuestQ.questionWord}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontStyle: 'italic', marginBottom: '8px' }}>({sanitizeMeaningForQuiz(currentQuestQ.meaning)})</p>
                      {currentQuestQ.hint && (
                        <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
                          {!questHintRevealed ? (
                            <button
                              type="button"
                              onClick={() => {
                                setQuestHintRevealed(true);
                                setHintsUsedInSession(prev => prev + 1);
                              }}
                              style={{
                                background: 'rgba(255, 255, 255, 0.06)',
                                border: '1px solid rgba(255, 255, 255, 0.18)',
                                color: 'var(--text-secondary)',
                                borderRadius: '20px',
                                padding: '4px 14px',
                                fontSize: '0.78rem',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                transition: 'all 0.2s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
                                e.currentTarget.style.color = '#93c5fd';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
                                e.currentTarget.style.color = 'var(--text-secondary)';
                              }}
                            >
                              <span>💡</span>
                              <span>{translateInstructions ? "Ver Pista (Show Hint)" : "Ver Pista"}</span>
                            </button>
                          ) : (
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '6px 14px', borderRadius: '12px', color: '#93c5fd', fontSize: '0.8rem', maxWidth: '90%', animation: 'fadeIn 0.2s ease' }}>
                              <span>💡</span>
                              <span><strong>{translateInstructions ? "Pista (Hint):" : "Pista:"}</strong> {currentQuestQ.hint}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="quiz-question-lbl">
                        {currentQuestQ.type === 2 
                          ? (translateInstructions ? "Escribe la traducción al español (Type Spanish translation):" : "Escribe la traducción al español:") 
                          : (translateInstructions ? "Elige la traducción correcta (Choose correct translation):" : "Elige la traducción correcta:")}
                      </div>
                      <h3 className="quiz-word">{currentQuestQ.questionWord}</h3>
                    </>
                  )}
                  
                  {currentQuestQ.hideHints ? null : currentQuestQ.isFillInTheBlank && currentQuestQ.targetVerb ? (
                    <button 
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => openCodex(currentQuestQ.targetVerb, currentQuestQ.tense)}
                      style={{ padding: '4px 10px', fontSize: '0.75rem', margin: '10px auto 0', display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content' }}
                    >
                      📖 {translateInstructions ? `Ver Conjugaciones: ${currentQuestQ.targetVerb} (View Conjugations)` : `Ver Conjugaciones (${currentQuestQ.targetVerb})`}
                    </button>
                  ) : (currentQuestQ.isFillInTheBlank || currentQuestQ.isSentenceBuilder) && (currentQuestQ.type === 'pronoun' || currentQuestQ.item?.subcategory?.includes('Objeto') || /(les|le|me|te|nos|se lo|te lo|nos lo|lo|la|los|las)/.test(currentQuestQ.hint || "") || /(les|le|me|te|nos|se lo|te lo|nos lo|lo|la|los|las)/.test(currentQuestQ.spanish || "")) ? (
                    <button 
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => openCodex(currentQuestQ.item || currentQuestQ.spanish || "pronombres_objeto")}
                      style={{ padding: '4px 10px', fontSize: '0.75rem', margin: '10px auto 0', display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content' }}
                    >
                      📖 {translateInstructions ? "Ver Pronombres de Objeto (View Object Pronouns)" : "Ver Pronombres de Objeto"}
                    </button>
                  ) : !currentQuestQ.isFillInTheBlank && isVerbItem(currentQuestQ.item) ? (
                    <button 
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => openCodex(currentQuestQ.item)}
                      style={{ padding: '4px 10px', fontSize: '0.75rem', margin: '10px auto 0', display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content' }}
                    >
                      📖 {translateInstructions ? "Ver Conjugaciones (View Conjugations)" : "Ver Conjugaciones"}
                    </button>
                  ) : !currentQuestQ.isFillInTheBlank && currentQuestQ.item?.subcategory?.includes('Objeto') ? (
                    <button 
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => openCodex(currentQuestQ.item || currentQuestQ.spanish || "pronombres_objeto")}
                      style={{ padding: '4px 10px', fontSize: '0.75rem', margin: '10px auto 0', display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content' }}
                    >
                      📖 {translateInstructions ? "Ver Pronombres de Objeto (View Object Pronouns)" : "Ver Pronombres de Objeto"}
                    </button>
                  ) : currentQuestQ.isContrastDecision ? (
                    <button 
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => openCodex(currentQuestQ.contrastPair || "guia_contrastes")}
                      style={{ padding: '4px 10px', fontSize: '0.75rem', margin: '10px auto 0', display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content' }}
                    >
                      📖 {translateInstructions ? `Ver Guía: ${currentQuestQ.contrastPair} (View Guide)` : `Ver Guía: ${currentQuestQ.contrastPair}`}
                    </button>
                  ) : null}
                </div>
              )}

              {currentQuestQ.isSentenceBuilder ? (
                <div style={{ marginTop: '10px' }}>
                  <SentenceBuilder
                    key={`quest-sb-${questCurrentIdx}-${questStarted ? 'active' : 'paused'}`}
                    question={currentQuestQ}
                    onAnswer={handleQuestSentenceAnswer}
                    answered={questAnswered}
                    userCorrect={isQuestUserCorrect}
                    showSubmitButton={true}
                    onHintRevealed={() => setHintsUsedInSession(prev => prev + 1)}
                    translateInstructions={translateInstructions}
                  />
                </div>
              ) : !currentQuestQ.isTyped && (currentQuestQ.isConjugation || currentQuestQ.isFillInTheBlank || currentQuestQ.type !== 2) ? (
                <div className="quiz-choices-grid">
                  {currentQuestQ.choices.map((choice, idx) => {
                    let btnClass = "";
                    if (questAnswered) {
                      if (choice === currentQuestQ.correct) {
                        btnClass = "correct";
                      } else if (choice === questSelected) {
                        btnClass = "wrong";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        className={`quiz-choice-btn ${btnClass}`}
                        onClick={() => handleQuestAnswer(choice)}
                        disabled={questAnswered}
                      >
                        {choice}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <form onSubmit={handleQuestSubmitTyped}>
                  <div className="quiz-input-wrapper" style={{ marginTop: '16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        ref={questInputRef}
                        placeholder={
                          currentQuestQ.isConjugation
                            ? (translateInstructions ? "Escribe la forma en pretérito... (Type Spanish form...)" : "Escribe la forma en pretérito...")
                            : (translateInstructions ? "Escribe la traducción al español... (Type Spanish translation...)" : "Escribe la traducción al español...")
                        }
                        value={typedAnswer}
                        onChange={(e) => setTypedAnswer(e.target.value)}
                        disabled={questAnswered}
                        className={`quiz-input ${questAnswered ? (isQuestUserCorrect ? 'correct' : 'wrong') : ''}`}
                        style={{ flex: 1, padding: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)', borderRadius: '12px', color: 'var(--text-primary)', fontSize: '1.1rem', outline: 'none' }}
                        autoFocus
                      />
                      
                      {/* Speech Rec Button */}
                      <button 
                        type="button" 
                        className={`btn ${isListening ? 'btn-danger pulse' : 'btn-secondary'}`}
                        disabled={questAnswered}
                        onClick={() => handleVoiceInput("quest")}
                        style={{ padding: '12px', borderRadius: '12px' }}
                      >
                        🎤
                      </button>
                    </div>
                    
                    {/* Accent Buttons row */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px', justifyContent: 'center' }}>
                      {['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'].map(char => (
                        <button
                          key={char}
                          type="button"
                          className="btn btn-secondary"
                          disabled={questAnswered}
                          onClick={() => handleQuestInsertAccent(char)}
                          style={{ padding: '6px 12px', fontSize: '1rem', minWidth: '38px', height: '38px', borderRadius: '8px' }}
                        >
                          {char}
                        </button>
                      ))}
                    </div>

                    {!questAnswered && (
                      <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }} disabled={!typedAnswer.trim()}>
                        {currentQuestQ.isConjugation
                          ? (translateInstructions ? "Enviar Conjugación (Submit Answer)" : "Enviar Conjugación")
                          : (translateInstructions ? "Enviar Traducción (Submit Translation)" : "Enviar Traducción")}
                      </button>
                    )}
                  </div>
                </form>
              )}

              {questAnswered && (
                <div 
                  className={`quiz-feedback-box ${isQuestUserCorrect ? 'correct' : 'wrong'}`}
                  style={{ animation: 'pop-in 0.3s ease-out' }}
                >
                  {isQuestUserCorrect 
                    ? `Correct! ${comboCount >= 3 ? `Combo Streak ${comboCount}! ` : ''}` 
                    : currentQuestQ.isContrastDecision
                      ? `Incorrect. Correct option: "${currentQuestQ.correct}"`
                      : currentQuestQ.isSentenceBuilder
                        ? `Incorrect. Correct sentence: "${currentQuestQ.correct}"`
                        : currentQuestQ.isConjugation
                          ? `Incorrect. Correct form for "${currentQuestQ.subjectPronoun || 'subject'}" (${isPreteriteTense(currentQuestQ) ? 'Preterite' : 'Present'}): "${currentQuestQ.correct}"`
                          : currentQuestQ.isFillInTheBlank
                            ? `Incorrect. Correct word: "${currentQuestQ.correct}"`
                            : `Incorrect! Correct translation: "${currentQuestQ.correct}"`
                  }

                  {(currentQuestQ.ruleExplanation || currentQuestQ.explanationEn) && (
                    <div style={{
                      marginTop: '10px',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: isQuestUserCorrect ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.15)',
                      border: isQuestUserCorrect ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                      fontSize: '0.82rem',
                      color: isQuestUserCorrect ? '#a7f3d0' : '#fca5a5',
                      textAlign: 'left',
                      lineHeight: 1.4
                    }}>
                      <strong>💡 Grammar Rule:</strong> {currentQuestQ.ruleExplanation || currentQuestQ.explanationEn}
                    </div>
                  )}
                  
                  {activeQuestIsEarlyBoss && !isQuestUserCorrect ? (
                    <div style={{
                      marginTop: '14px',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      background: 'rgba(239, 68, 68, 0.2)',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#fca5a5', marginBottom: '4px' }}>
                        💀 {translateInstructions ? "¡Muerte Súbita! Reto de Salto Fallado (Sudden Death! Skip Challenge Failed)" : "¡Muerte Súbita! Reto de Salto Fallado"}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#fef2f2', marginBottom: '12px', lineHeight: 1.4 }}>
                        {translateInstructions 
                          ? `En el Desafío de Salto debes tener 100% de precisión (0 fallos permitidos). El reto termina aquí (pregunta ${questCurrentIdx + 1} de ${questQuestions.length}). (In Skip Challenge you must have 100% accuracy with 0 mistakes allowed. The challenge ends here.)`
                          : `En el Desafío de Salto debes tener 100% de precisión (0 fallos permitidos). El reto termina aquí (pregunta ${questCurrentIdx + 1} de ${questQuestions.length}).`}
                      </div>
                      <button 
                        className="btn btn-danger" 
                        onClick={finishQuestSession} 
                        style={{ width: '100%', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 'bold' }}
                      >
                        <Skull size={16} /> {translateInstructions ? "Ver Resultados del Desafío (View Challenge Results)" : "Ver Resultados del Desafío"}
                      </button>
                    </div>
                  ) : (
                    <button className="btn btn-primary" onClick={handleQuestNext} style={{ width: '100%', marginTop: '16px' }}>
                      {questCurrentIdx === questQuestions.length - 1 
                        ? (translateInstructions ? "Finalizar Misión (Finish Quest)" : "Finalizar Misión") 
                        : (translateInstructions ? "Siguiente Desafío (Next Challenge)" : "Siguiente Desafío")} <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------------
          TAB 2: FREE PRACTICE VIEW
          ------------------------------------------------------------- */}
      {activeTab === "practice" && !practiceQuizStarted && !redemptionActive && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div className="study-selector-row">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Category</span>
                <select value={selectedCategory} onChange={handleCategoryChange} className="study-select">
                  {Object.keys(practiceCategories).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {isVerbLab ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {t('verbLabSelectedCount', translateInstructions)}
                  </span>
                  <div style={{ 
                    padding: '8px 12px', 
                    borderRadius: '8px', 
                    background: 'rgba(255,255,255,0.05)', 
                    border: '1px solid var(--card-border)',
                    fontSize: '0.85rem',
                    color: 'var(--primary)',
                    fontWeight: 600
                  }}>
                    ⚡ {selectedVerbGroups.length} / {VERB_LAB_GROUPS.length} ({practiceCards.length} {translateInstructions ? "verbs" : "verbos"})
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Vocabulary Unit</span>
                  <select 
                    value={selectedSubcategory} 
                    onChange={(e) => setSelectedSubcategory(e.target.value)} 
                    className="study-select"
                    disabled={subcategories.length === 0}
                  >
                    {subcategories.map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginLeft: 'auto' }}>
                {practiceMode === "cards" && (
                  <button className="btn btn-secondary" onClick={() => setPracticeCards(prev => [...prev].sort(() => Math.random() - 0.5))}>
                    <Shuffle size={14} /> Shuffle
                  </button>
                )}
                
                <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.03)', padding: '4px', borderRadius: '10px' }}>
                  <button 
                    className={`btn ${practiceMode === 'cards' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                    onClick={() => setPracticeMode("cards")}
                  >
                    Flashcards
                  </button>
                  <button 
                    className={`btn ${practiceMode === 'quiz' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                    onClick={() => setPracticeMode("quiz")}
                  >
                    Custom Quiz
                  </button>
                </div>
              </div>
            </div>

            {isVerbLab && (
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {translateInstructions ? "Select Verb Families to Practice:" : "Elige las Familias de Verbos a Practicar:"}
                  </span>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: '0.72rem', padding: '4px 8px' }}
                      onClick={() => setSelectedVerbGroups(VERB_LAB_GROUPS.map(g => g.id))}
                    >
                      {t('verbLabSelectAll', translateInstructions)}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: '0.72rem', padding: '4px 8px' }}
                      onClick={() => setSelectedVerbGroups(VERB_LAB_GROUPS.filter(g => g.group === 'present').map(g => g.id))}
                    >
                      {t('verbLabSelectPresent', translateInstructions)}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: '0.72rem', padding: '4px 8px' }}
                      onClick={() => setSelectedVerbGroups(VERB_LAB_GROUPS.filter(g => g.group === 'preterite').map(g => g.id))}
                    >
                      {t('verbLabSelectPreterite', translateInstructions)}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: '0.72rem', padding: '4px 8px' }}
                      onClick={() => setSelectedVerbGroups([])}
                    >
                      {t('verbLabClear', translateInstructions)}
                    </button>
                  </div>
                </div>

                {/* Verb groups organized by tense */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {/* Present Tense */}
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {t('verbLabGroupPresent', translateInstructions)}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {VERB_LAB_GROUPS.filter(g => g.group === 'present').map(group => {
                        const isSelected = selectedVerbGroups.includes(group.id);
                        return (
                          <button
                            key={group.id}
                            type="button"
                            onClick={() => {
                              setSelectedVerbGroups(prev => 
                                isSelected ? prev.filter(id => id !== group.id) : [...prev, group.id]
                              );
                            }}
                            className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                            style={{
                              fontSize: '0.75rem',
                              padding: '5px 10px',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '5px',
                              background: isSelected ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                              borderColor: isSelected ? '#10b981' : 'var(--card-border)',
                              color: isSelected ? '#fff' : 'var(--text-secondary)'
                            }}
                          >
                            <span>{group.icon}</span>
                            <span>{translateInstructions ? group.labelEn : group.labelEs}</span>
                            <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>{isSelected ? '✓' : '+'}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Reflexive Verbs */}
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {t('verbLabGroupReflexive', translateInstructions)}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {VERB_LAB_GROUPS.filter(g => g.group === 'reflexive').map(group => {
                        const isSelected = selectedVerbGroups.includes(group.id);
                        return (
                          <button
                            key={group.id}
                            type="button"
                            onClick={() => {
                              setSelectedVerbGroups(prev => 
                                isSelected ? prev.filter(id => id !== group.id) : [...prev, group.id]
                              );
                            }}
                            className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                            style={{
                              fontSize: '0.75rem',
                              padding: '5px 10px',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '5px',
                              background: isSelected ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                              borderColor: isSelected ? '#38bdf8' : 'var(--card-border)',
                              color: isSelected ? '#fff' : 'var(--text-secondary)'
                            }}
                          >
                            <span>{group.icon}</span>
                            <span>{translateInstructions ? group.labelEn : group.labelEs}</span>
                            <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>{isSelected ? '✓' : '+'}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Preterite Tense */}
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f97316', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {t('verbLabGroupPreterite', translateInstructions)}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {VERB_LAB_GROUPS.filter(g => g.group === 'preterite').map(group => {
                        const isSelected = selectedVerbGroups.includes(group.id);
                        return (
                          <button
                            key={group.id}
                            type="button"
                            onClick={() => {
                              setSelectedVerbGroups(prev => 
                                isSelected ? prev.filter(id => id !== group.id) : [...prev, group.id]
                              );
                            }}
                            className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                            style={{
                              fontSize: '0.75rem',
                              padding: '5px 10px',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '5px',
                              background: isSelected ? 'rgba(249, 115, 22, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                              borderColor: isSelected ? '#f97316' : 'var(--card-border)',
                              color: isSelected ? '#fff' : 'var(--text-secondary)'
                            }}
                          >
                            <span>{group.icon}</span>
                            <span>{translateInstructions ? group.labelEn : group.labelEs}</span>
                            <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>{isSelected ? '✓' : '+'}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {selectedVerbGroups.length === 0 && (
                  <div style={{ fontSize: '0.78rem', color: 'var(--danger)', padding: '6px 10px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>
                    ⚠️ {translateInstructions ? "Please select at least one verb family to practice." : "Por favor selecciona al menos una familia de verbos para practicar."}
                  </div>
                )}
              </div>
            )}
          </div>

          {practiceMode === "cards" && (
            practiceCards.length > 0 && practiceCards[practiceCurrentIdx] ? (
              <div style={{ textAlign: 'center' }}>
                {(() => {
                  const activeCard = practiceCards[practiceCurrentIdx];
                  const catLabel = isVerbLab
                    ? `${selectedCategory} • ${activeCard?.subcategory || 'Verbo'}`
                    : selectedSubcategory.startsWith("All of ")
                      ? `${selectedCategory} • ${activeCard?.subcategory || 'General'}`
                      : selectedSubcategory;
                  return renderFlashcardCard(activeCard, {
                    categoryFront: catLabel,
                    categoryBack: selectedSubcategory.startsWith("All of ")
                      ? `${selectedCategory} • ${activeCard?.subcategory || 'General'}`
                      : selectedSubcategory,
                    backLabel: "English Translation",
                    hintFront: "Click card to reveal translation",
                    hintBack: "Click card to flip Spanish",
                    flipped: practiceFlipped,
                    onToggleFlip: () => setPracticeFlipped(!practiceFlipped)
                  });
                })()}

                <div className="study-nav-controls">
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => { setPracticeFlipped(false); setPracticeCurrentIdx(prev => prev > 0 ? prev - 1 : practiceCards.length - 1); }}
                    style={{ borderRadius: '50%', width: '48px', height: '48px', padding: 0 }}
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <span className="study-progress-txt">{practiceCurrentIdx + 1} / {practiceCards.length}</span>
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => { setPracticeFlipped(false); setPracticeCurrentIdx(prev => prev < practiceCards.length - 1 ? prev + 1 : 0); }}
                    style={{ borderRadius: '50%', width: '48px', height: '48px', padding: 0 }}
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
                No vocabulary items found in this section.
              </div>
            )
          )}

          {practiceMode === "quiz" && (
            selectedCategory.includes("Próximamente") ? (
              <div className="glass-panel" style={{ padding: '30px', textAlign: 'center', maxWidth: '550px', margin: '0 auto' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>⏳</div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '8px' }}>
                  {selectedCategory}
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.4' }}>
                  This unit is coming soon! Practice quizzes for this unit will unlock once covered in class. You can practice Units 1 through 4 in the meantime.
                </p>
              </div>
            ) : (
              <div className="glass-panel" style={{ padding: '30px', textAlign: 'center', maxWidth: '550px', margin: '0 auto' }}>
                <Swords size={36} color="var(--primary)" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '8px' }}>
                  {translateInstructions ? "Start Custom Practice Quiz" : "Comenzar Cuestionario de Práctica"}
                </h4>
                
                {/* 🛡️ Safe Practice Badge */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10b981', fontSize: '0.8rem', fontWeight: 600, marginBottom: '10px' }}>
                  {t('practiceSafeBadge', translateInstructions)}
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', lineHeight: '1.4' }}>
                  {translateInstructions ? "Test yourself in: " : "Ponte a prueba en: "}
                  <strong>{isVerbLab ? (translateInstructions ? "Verb Practice Lab" : "Laboratorio de Verbos") : selectedSubcategory}</strong>
                </p>

                <p style={{ fontSize: '0.8rem', color: '#10b981', marginBottom: '16px', lineHeight: '1.4' }}>
                  {t('practiceZeroDamageBanner', translateInstructions)}
                </p>

                <p style={{ fontSize: '0.8rem', color: 'var(--accent)', marginBottom: '18px', background: 'rgba(16, 185, 129, 0.05)', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.15)', display: 'inline-block' }}>
                  💡 {translateInstructions ? "Tip: First time studying this topic? Switch to " : "Consejo: ¿Primera vez con este tema? Cambia a "}
                  <strong>{translateInstructions ? "Flashcards" : "Tarjetas"}</strong>
                  {translateInstructions ? " above to learn the words first!" : " arriba para aprender los términos primero!"}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '440px', margin: '0 auto 20px' }}>
                  {/* Question Count Selector */}
                  <div className="form-group" style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
                    <label className="form-label" style={{ marginBottom: '6px', fontSize: '0.8rem' }}>
                      {t('practiceQuestionCountLabel', translateInstructions)}
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                      {[10, 25, 50, 'all'].map(count => {
                        const isSelected = practiceQuestionCount === count;
                        const label = count === 'all' ? t('practiceCountAll', translateInstructions) : count;
                        return (
                          <button
                            key={count}
                            type="button"
                            className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ 
                              padding: '6px', 
                              fontSize: '0.8rem',
                              fontWeight: isSelected ? 700 : 500
                            }}
                            onClick={() => setPracticeQuestionCount(count)}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Answer Format Toggle */}
                  <div className="form-group" style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
                    <label className="form-label" style={{ marginBottom: '6px', fontSize: '0.8rem' }}>
                      {t('practiceAnswerModeLabel', translateInstructions)}
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                      <button
                        type="button"
                        className={`btn btn-sm ${practiceInputMode === 'choice' ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ padding: '7px 8px', fontSize: '0.8rem' }}
                        onClick={() => setPracticeInputMode("choice")}
                      >
                        🔘 {t('practiceModeChoice', translateInstructions)}
                      </button>
                      <button
                        type="button"
                        className={`btn btn-sm ${practiceInputMode === 'typed' ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ padding: '7px 8px', fontSize: '0.8rem' }}
                        onClick={() => setPracticeInputMode("typed")}
                      >
                        ⌨️ {t('practiceModeTyped', translateInstructions)}
                      </button>
                    </div>
                  </div>

                  {!isVerbLab && practiceCards.some(item => isVerbItem(item)) && (
                    <>
                      <div className="form-group" style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
                        <label className="form-label" style={{ marginBottom: '6px', fontSize: '0.8rem' }}>Quiz Type</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                          <button 
                            className={`btn ${practiceQuizMode === 'translation' ? 'btn-primary' : 'btn-secondary'}`} 
                            style={{ padding: '7px 4px', fontSize: '0.78rem' }} 
                            onClick={() => setPracticeQuizMode("translation")}
                          >
                            {translateInstructions ? "Traducción (Translation)" : "Traducción"}
                          </button>
                          <button 
                            className={`btn ${practiceQuizMode === 'conjugation' ? 'btn-primary' : 'btn-secondary'}`} 
                            style={{ padding: '7px 4px', fontSize: '0.78rem' }} 
                            onClick={() => setPracticeQuizMode("conjugation")}
                          >
                            ⚡ {translateInstructions ? "Conjugación (Conjugation)" : "Conjugación"}
                          </button>
                          <button 
                            className={`btn ${practiceQuizMode === 'sentence' ? 'btn-primary' : 'btn-secondary'}`} 
                            style={{ padding: '7px 4px', fontSize: '0.78rem' }} 
                            onClick={() => setPracticeQuizMode("sentence")}
                          >
                            🧩 {translateInstructions ? "Frases (Sentences)" : "Frases"}
                          </button>
                          <button 
                            className={`btn ${practiceQuizMode === 'mixed' ? 'btn-primary' : 'btn-secondary'}`} 
                            style={{ padding: '7px 4px', fontSize: '0.78rem' }} 
                            onClick={() => setPracticeQuizMode("mixed")}
                          >
                            🔀 {translateInstructions ? "Mixto (Mixed)" : "Mixto"}
                          </button>
                        </div>
                      </div>

                      {practiceQuizMode === 'sentence' && (
                        <p style={{ fontSize: '0.78rem', color: 'var(--accent)', margin: '-4px 0 2px', lineHeight: '1.4' }}>
                          {translateInstructions
                            ? "🧩 Sentence Construction: Drag or tap words to correctly order Spanish sentences with grammatical distractors."
                            : "🧩 Construcción de Frases: Arrastra o toca las palabras para ordenar correctamente las oraciones en español con distractores gramaticales."}
                        </p>
                      )}

                      {practiceQuizMode === 'mixed' && (
                        <p style={{ fontSize: '0.78rem', color: 'var(--accent)', margin: '-4px 0 2px', lineHeight: '1.4' }}>
                          {translateInstructions
                            ? "🔀 Mixed Mode: Review interactive flashcards, conjugation drills, and sentence puzzles in the same comprehensive deck."
                            : "🔀 Modo Mixto: Repasa tarjetas interactivas, desafíos de conjugación y construcción de frases en el mismo mazo integral."}
                        </p>
                      )}

                      {(practiceQuizMode === 'conjugation' || practiceQuizMode === 'mixed') && (
                        <div className="form-group" style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '12px', border: '1px solid var(--card-border)', animation: 'pop-in 0.2s ease-out' }}>
                          <label className="form-label" style={{ marginBottom: '6px', fontSize: '0.8rem' }}>Tense Mode</label>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
                            <button 
                              type="button"
                              className="btn btn-sm"
                              style={{ 
                                fontSize: '0.75rem', 
                                padding: '6px',
                                background: practiceTense === 'auto' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                color: practiceTense === 'auto' ? '#fff' : 'var(--text-secondary)',
                                borderColor: practiceTense === 'auto' ? 'var(--primary)' : 'transparent'
                              }} 
                              onClick={() => setPracticeTense("auto")}
                            >
                              🎯 Auto (By Unit)
                            </button>
                            <button 
                              type="button"
                              className="btn btn-sm"
                              style={{ 
                                fontSize: '0.75rem', 
                                padding: '6px',
                                background: practiceTense === 'present' ? '#10b981' : 'rgba(255,255,255,0.05)',
                                color: practiceTense === 'present' ? '#fff' : 'var(--text-secondary)',
                                borderColor: practiceTense === 'present' ? '#34d399' : 'transparent',
                                boxShadow: practiceTense === 'present' ? '0 0 10px rgba(16, 185, 129, 0.4)' : 'none',
                                fontWeight: practiceTense === 'present' ? 'bold' : 'normal'
                              }} 
                              onClick={() => setPracticeTense("present")}
                            >
                              ⚡ Presente
                            </button>
                            <button 
                              type="button"
                              className="btn btn-sm"
                              style={{ 
                                fontSize: '0.75rem', 
                                padding: '6px',
                                background: practiceTense === 'preterite' ? '#f97316' : 'rgba(255,255,255,0.05)',
                                color: practiceTense === 'preterite' ? '#fff' : 'var(--text-secondary)',
                                borderColor: practiceTense === 'preterite' ? '#fb923c' : 'transparent',
                                boxShadow: practiceTense === 'preterite' ? '0 0 10px rgba(249, 115, 22, 0.4)' : 'none',
                                fontWeight: practiceTense === 'preterite' ? 'bold' : 'normal'
                              }} 
                              onClick={() => setPracticeTense("preterite")}
                            >
                              ⏳ Pretérito (Past)
                            </button>
                            <button 
                              type="button"
                              className="btn btn-sm"
                              style={{ 
                                fontSize: '0.75rem', 
                                padding: '6px',
                                background: practiceTense === 'both' ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                                color: practiceTense === 'both' ? '#fff' : 'var(--text-secondary)',
                                borderColor: practiceTense === 'both' ? 'var(--accent)' : 'transparent'
                              }} 
                              onClick={() => setPracticeTense("both")}
                            >
                              🔀 Mixto (Both)
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <button 
                  className="btn btn-primary" 
                  onClick={startCustomPracticeQuiz}
                  disabled={practiceCards.length === 0 || (isVerbLab && selectedVerbGroups.length === 0)}
                  style={{ width: '100%', maxWidth: '280px', margin: '0 auto' }}
                >
                  {practiceCards.length === 0
                    ? (translateInstructions ? "No items available" : "No hay elementos disponibles")
                    : (isVerbLab && selectedVerbGroups.length === 0)
                      ? (translateInstructions ? "Select at least 1 group" : "Selecciona al menos 1 grupo")
                      : (translateInstructions ? "Start Practice Quiz" : "Comenzar Cuestionario")}
                </button>
              </div>
            )
          )}
        </div>
      )}

      {/* -------------------------------------------------------------
          ACTIVE CUSTOM PRACTICE QUIZ SCREEN
          ------------------------------------------------------------- */}
      {activeTab === "practice" && practiceQuizStarted && !redemptionActive && (
        <div className="glass-panel quiz-box">
          
          {practiceQuizFinished ? (
            <div style={{ textAlign: 'center', padding: '10px' }}>
              <Award size={64} color="var(--gold)" style={{ margin: '0 auto 16px', animation: 'float 3s ease-in-out' }} />
              <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>Practice Complete!</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>Unit: {selectedSubcategory}</p>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '16px', border: '1px solid var(--card-border)', marginBottom: '24px' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Score Gained</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent)', margin: '4px 0' }}>{practiceScore} / {practiceQuestions.length}</div>
                
                <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                  <div>
                    <span style={{ display: 'block', color: 'var(--primary)', fontWeight: 800, fontSize: '1.1rem' }}>+{practiceScore * 10} XP</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>XP Bonus</span>
                  </div>
                  <div>
                    <span style={{ display: 'block', color: 'var(--gold)', fontWeight: 800, fontSize: '1.1rem' }}>+{practiceScore} Gold</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Gold Bonus</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button className="btn btn-secondary" onClick={() => setPracticeQuizStarted(false)}>Another Unit</button>
                <button className="btn btn-primary" onClick={startCustomPracticeQuiz}>Replay</button>
              </div>
            </div>
          ) : (
            <div>
              <div className="quiz-header">
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  Practice Item {practiceCurrentIdx + 1} of {practiceQuestions.length}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '4px', 
                    fontSize: '0.8rem', 
                    color: '#10b981', 
                    fontWeight: 600,
                    background: 'rgba(16, 185, 129, 0.1)',
                    padding: '3px 8px',
                    borderRadius: '12px',
                    border: '1px solid rgba(16, 185, 129, 0.25)'
                  }}>
                    {t('practiceSafeBadge', translateInstructions)}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem', color: 'var(--gold)', fontWeight: 'bold' }}>
                    <Coins size={14} /> {state.gold} G
                  </span>
                </div>
              </div>

              <div className="quiz-progress-track">
                <div className="quiz-progress-fill" style={{ width: `${((practiceCurrentIdx + 1) / practiceQuestions.length) * 100}%` }}></div>
              </div>

              {practiceQuestions[practiceCurrentIdx]?.isCardIntro ? (
                <div style={{ textAlign: 'center', animation: 'pop-in 0.3s ease-out' }}>
                  {renderFlashcardCard(practiceQuestions[practiceCurrentIdx].item, {
                    categoryFront: "Repaso de Tarjeta (+2 XP)",
                    categoryBack: "Traducción al Inglés",
                    hintFront: "Haz clic para ver la traducción",
                    hintBack: "Haz clic para volver al español",
                    flipped: practiceFlipped,
                    onToggleFlip: () => setPracticeFlipped(!practiceFlipped),
                    wrapperStyle: { height: '240px', maxWidth: '500px', margin: '0 auto 16px' }
                  })}

                  <button className="btn btn-accent" onClick={handlePracticeCardLearned} style={{ width: '100%', maxWidth: '280px', margin: '0 auto' }}>
                    ¡Entendido! / Siguiente (+2 XP)
                  </button>
                </div>
              ) : practiceQuestions[practiceCurrentIdx]?.isSentenceBuilder ? null : practiceQuestions[practiceCurrentIdx]?.isConjugation ? (
                (() => {
                  const currQ = practiceQuestions[practiceCurrentIdx];
                  const isPret = isPreteriteTense(currQ);

                  return (
                    <div 
                      className="quiz-question-card"
                      style={{
                        borderTop: isPret ? '4px solid #f97316' : '4px solid #10b981',
                        boxShadow: isPret ? '0 -2px 18px rgba(249, 115, 22, 0.2)' : '0 -2px 18px rgba(16, 185, 129, 0.2)'
                      }}
                    >
                      {renderConjugationQuestionContent(currQ, {
                        isTypedView: practiceInputMode === "typed" || Boolean(currQ?.isTyped),
                        showCodex: !currQ.hideHints
                      })}
                    </div>
                  );
                })()
              ) : practiceQuestions[practiceCurrentIdx]?.isFillInTheBlank ? (
                <div className="quiz-question-card">
                  <div className="quiz-question-lbl">
                    {translateInstructions ? "Completar la frase (Fill in the blank):" : "Completar la frase:"}
                  </div>
                  <h3 className="quiz-word" style={{ color: 'var(--accent)', fontSize: '2rem' }}>{practiceQuestions[practiceCurrentIdx].questionWord}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontStyle: 'italic', marginBottom: '8px' }}>
                    ({practiceQuestions[practiceCurrentIdx].meaning})
                  </p>
                  {practiceQuestions[practiceCurrentIdx]?.hint && (
                    <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
                      {!practiceHintRevealed ? (
                        <button
                          type="button"
                          onClick={() => setPracticeHintRevealed(true)}
                          style={{
                            background: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            color: 'var(--text-secondary)',
                            borderRadius: '20px',
                            padding: '4px 14px',
                            fontSize: '0.78rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
                            e.currentTarget.style.color = '#93c5fd';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
                            e.currentTarget.style.color = 'var(--text-secondary)';
                          }}
                        >
                          <span>💡</span>
                          <span>{translateInstructions ? "Ver Pista (Show Hint)" : "Ver Pista"}</span>
                        </button>
                      ) : (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '6px 14px', borderRadius: '12px', color: '#93c5fd', fontSize: '0.8rem', maxWidth: '90%', animation: 'fadeIn 0.2s ease' }}>
                          <span>💡</span>
                          <span><strong>{translateInstructions ? "Pista (Hint):" : "Pista:"}</strong> {practiceQuestions[practiceCurrentIdx].hint}</span>
                        </div>
                      )}
                    </div>
                  )}
                  {practiceQuestions[practiceCurrentIdx]?.targetVerb ? (
                    <button 
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => openCodex(practiceQuestions[practiceCurrentIdx].targetVerb, practiceQuestions[practiceCurrentIdx].tense)}
                      style={{ padding: '4px 10px', fontSize: '0.75rem', margin: '10px auto 0', display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content' }}
                    >
                      📖 {translateInstructions ? `Ver Conjugaciones: ${practiceQuestions[practiceCurrentIdx].targetVerb} (View Conjugations)` : `Ver Conjugaciones (${practiceQuestions[practiceCurrentIdx].targetVerb})`}
                    </button>
                  ) : (practiceQuestions[practiceCurrentIdx]?.isFillInTheBlank || practiceQuestions[practiceCurrentIdx]?.isSentenceBuilder) && (practiceQuestions[practiceCurrentIdx]?.type === 'pronoun' || practiceQuestions[practiceCurrentIdx]?.item?.subcategory?.includes('Objeto') || /(les|le|me|te|nos|se lo|te lo|nos lo|lo|la|los|las)/.test(practiceQuestions[practiceCurrentIdx]?.hint || "") || /(les|le|me|te|nos|se lo|te lo|nos lo|lo|la|los|las)/.test(practiceQuestions[practiceCurrentIdx]?.spanish || "")) ? (
                    <button 
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => openCodex(practiceQuestions[practiceCurrentIdx].item || practiceQuestions[practiceCurrentIdx].spanish || "pronombres_objeto")}
                      style={{ padding: '4px 10px', fontSize: '0.75rem', margin: '10px auto 0', display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content' }}
                    >
                      📖 {translateInstructions ? "Ver Pronombres de Objeto (View Object Pronouns)" : "Ver Pronombres de Objeto"}
                    </button>
                  ) : null}
                </div>
              ) : (
                <div className="quiz-question-card">
                  <div className="quiz-question-lbl">
                    {practiceQuestions[practiceCurrentIdx]?.type === 2 || practiceQuestions[practiceCurrentIdx]?.isTyped || practiceInputMode === "typed"
                      ? (translateInstructions ? "Escribe la traducción al español (Type Spanish translation):" : "Escribe la traducción al español:") 
                      : (translateInstructions ? "Elige la traducción correcta (Choose correct translation):" : "Elige la traducción correcta:")}
                  </div>
                  <h3 className="quiz-word">{practiceQuestions[practiceCurrentIdx]?.questionWord}</h3>
                  
                  {!practiceQuestions[practiceCurrentIdx]?.isFillInTheBlank && isVerbItem(practiceQuestions[practiceCurrentIdx]?.item) ? (
                    <button 
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => openCodex(practiceQuestions[practiceCurrentIdx].item)}
                      style={{ padding: '4px 10px', fontSize: '0.75rem', margin: '10px auto 0', display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content' }}
                    >
                      📖 {translateInstructions ? "Ver Conjugaciones (View Conjugations)" : "Ver Conjugaciones"}
                    </button>
                  ) : !practiceQuestions[practiceCurrentIdx]?.isFillInTheBlank && (practiceQuestions[practiceCurrentIdx]?.item?.subcategory?.includes('Objeto') || /(les|le|me|te|nos|se lo|te lo|nos lo|lo|la|los|las)/.test(practiceQuestions[practiceCurrentIdx]?.hint || "") || /(les|le|me|te|nos|se lo|te lo|nos lo|lo|la|los|las)/.test(practiceQuestions[practiceCurrentIdx]?.spanish || "")) ? (
                    <button 
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => openCodex(practiceQuestions[practiceCurrentIdx].item || practiceQuestions[practiceCurrentIdx].spanish || "pronombres_objeto")}
                      style={{ padding: '4px 10px', fontSize: '0.75rem', margin: '10px auto 0', display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content' }}
                    >
                      📖 {translateInstructions ? "Ver Pronombres de Objeto (View Object Pronouns)" : "Ver Pronombres de Objeto"}
                    </button>
                  ) : null}
                </div>
              )}

              {!practiceQuestions[practiceCurrentIdx]?.isCardIntro && (
                practiceQuestions[practiceCurrentIdx]?.isSentenceBuilder ? (
                  <div style={{ marginTop: '10px' }}>
                    <SentenceBuilder
                      question={practiceQuestions[practiceCurrentIdx]}
                      onAnswer={handlePracticeSentenceAnswer}
                      answered={practiceAnswered}
                      userCorrect={isPracticeUserCorrect}
                      showSubmitButton={true}
                      translateInstructions={translateInstructions}
                    />
                  </div>
                ) : (practiceInputMode === 'choice' && !practiceQuestions[practiceCurrentIdx]?.isTyped && practiceQuestions[practiceCurrentIdx]?.type !== 2) ? (
                  <div className="quiz-choices-grid">
                    {practiceQuestions[practiceCurrentIdx]?.choices.map((choice, idx) => {
                      let btnClass = "";
                      if (practiceAnswered) {
                        if (choice === practiceQuestions[practiceCurrentIdx].correct) {
                          btnClass = "correct";
                        } else if (choice === practiceSelected) {
                          btnClass = "wrong";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          className={`quiz-choice-btn ${btnClass}`}
                          onClick={() => handlePracticeAnswer(choice)}
                          disabled={practiceAnswered}
                        >
                          {choice}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <form onSubmit={handlePracticeSubmitTyped}>
                    <div className="quiz-input-wrapper" style={{ marginTop: '16px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          ref={practiceInputRef}
                          placeholder={
                            practiceQuestions[practiceCurrentIdx]?.isConjugation
                              ? (translateInstructions 
                                  ? "Escribe la conjugación correcta (ej: hablo, comí)... (Type conjugation...)" 
                                  : "Escribe la conjugación correcta (ej: hablo, comí)...")
                              : (translateInstructions 
                                  ? "Escribe la traducción al español... (Type Spanish translation...)" 
                                  : "Escribe la traducción al español...")
                          }
                          value={practiceTyped}
                          onChange={(e) => setPracticeTyped(e.target.value)}
                          disabled={practiceAnswered}
                          className={`quiz-input ${practiceAnswered ? (isPracticeUserCorrect ? 'correct' : 'wrong') : ''}`}
                          style={{ flex: 1, padding: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)', borderRadius: '12px', color: 'var(--text-primary)', fontSize: '1.1rem', outline: 'none' }}
                          autoFocus
                        />
                        <button 
                          type="button" 
                          className={`btn ${isListening ? 'btn-danger pulse' : 'btn-secondary'}`}
                          disabled={practiceAnswered}
                          onClick={() => handleVoiceInput("practice")}
                          style={{ padding: '12px', borderRadius: '12px' }}
                        >
                          🎤
                        </button>
                      </div>
                      
                      {/* Accent Buttons row */}
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px', justifyContent: 'center' }}>
                        {['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'].map(char => (
                          <button
                            key={char}
                            type="button"
                            className="btn btn-secondary"
                            disabled={practiceAnswered}
                            onClick={() => handlePracticeInsertAccent(char)}
                            style={{ padding: '6px 12px', fontSize: '1rem', minWidth: '38px', height: '38px', borderRadius: '8px' }}
                          >
                            {char}
                          </button>
                        ))}
                      </div>

                      {!practiceAnswered && (
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }} disabled={!practiceTyped.trim()}>
                          {practiceQuestions[practiceCurrentIdx]?.isConjugation
                            ? (translateInstructions ? "Enviar Conjugación (Submit Conjugation)" : "Enviar Conjugación")
                            : (translateInstructions ? "Enviar Traducción (Submit Translation)" : "Enviar Traducción")}
                        </button>
                      )}
                    </div>
                  </form>
                )
              )}

              {practiceAnswered && !practiceQuestions[practiceCurrentIdx]?.isCardIntro && (
                <div 
                  className={`quiz-feedback-box ${isPracticeUserCorrect ? 'correct' : 'wrong'}`}
                  style={{ animation: 'pop-in 0.3s ease-out' }}
                >
                  {isPracticeUserCorrect 
                    ? "Correct! +10 XP | +1 Gold" 
                    : practiceQuestions[practiceCurrentIdx]?.isContrastDecision
                      ? `Incorrect! Correct option: "${practiceQuestions[practiceCurrentIdx].correct}"`
                      : practiceQuestions[practiceCurrentIdx]?.isSentenceBuilder
                        ? `Incorrect! Correct sentence: "${practiceQuestions[practiceCurrentIdx].correct}"`
                        : practiceQuestions[practiceCurrentIdx]?.isConjugation
                          ? `Incorrect! Correct form for "${practiceQuestions[practiceCurrentIdx]?.subjectPronoun || 'subject'}" (${isPreteriteTense(practiceQuestions[practiceCurrentIdx]) ? 'Preterite' : 'Present'}): "${practiceQuestions[practiceCurrentIdx].correct}"`
                          : `Incorrect! Correct answer: "${practiceQuestions[practiceCurrentIdx].correct}"`
                  }
                  {(practiceQuestions[practiceCurrentIdx]?.ruleExplanation || practiceQuestions[practiceCurrentIdx]?.explanationEn) && (
                    <div style={{
                      marginTop: '10px',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: isPracticeUserCorrect ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.15)',
                      border: isPracticeUserCorrect ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                      fontSize: '0.82rem',
                      color: isPracticeUserCorrect ? '#a7f3d0' : '#fca5a5',
                      textAlign: 'left',
                      lineHeight: 1.4
                    }}>
                      <strong>💡 Grammar Rule:</strong> {practiceQuestions[practiceCurrentIdx].ruleExplanation || practiceQuestions[practiceCurrentIdx].explanationEn}
                    </div>
                  )}
                  <button className="btn btn-primary" onClick={handlePracticeNext} style={{ width: '100%', marginTop: '16px' }}>
                    {practiceCurrentIdx === practiceQuestions.length - 1 
                      ? (translateInstructions ? "Finalizar Práctica (Finish Practice)" : "Finalizar Práctica") 
                      : (translateInstructions ? "Siguiente Pregunta (Next Question)" : "Siguiente Pregunta")} <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      )}

      {/* -------------------------------------------------------------
          REDEMPTION QUIZ GAMEPLAY SCREEN
          ------------------------------------------------------------- */}
      {redemptionActive && redemptionQuestions.length > 0 && (
        <div className="glass-panel quiz-box" style={{ borderColor: 'var(--warning)', boxShadow: '0 0 25px rgba(245, 158, 11, 0.15)' }}>
          
          <div className="quiz-header">
            <span style={{ fontSize: '0.9rem', color: 'var(--warning)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Swords size={16} /> REDEMPTION QUIZ
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Question {redemptionCurrentIdx + 1} of {redemptionQuestions.length}
            </span>
          </div>

          <div style={{ padding: '8px 12px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '10px', fontSize: '0.85rem', color: 'var(--warning)', textAlign: 'center', marginBottom: '16px', fontWeight: '500' }}>
            {questQuestions.length > 0
              ? `Answer all missed questions correctly to revive with 10 HP and continue Level ${activeQuestLevel} at Question ${questCurrentIdx + 1} of ${questQuestions.length}!`
              : "Answer all missed questions correctly to revive with 10 HP!"}
          </div>

          {/* Question card */}
          {(() => {
            const currentQ = redemptionQuestions[redemptionCurrentIdx];
            if (!currentQ) return null;

            const isRedemptionCorrect = redemptionAnswered && (
              currentQ.isConjugation
                ? cleanConjugationInput(redemptionSelected, currentQ.correct)
                : (redemptionSelected === currentQ.correct || cleanAnswer(redemptionSelected) === cleanAnswer(currentQ.correct))
            );

            return (
              <div>
                {!currentQ.isSentenceBuilder && (
                  <div 
                    className="quiz-question-card"
                    style={currentQ.isContrastDecision ? {
                      borderTop: '4px solid #8b5cf6',
                      boxShadow: '0 -2px 18px rgba(139, 92, 246, 0.25)'
                    } : currentQ.isConjugation ? {
                      borderTop: isPreteriteTense(currentQ) ? '4px solid #f97316' : '4px solid #10b981',
                      boxShadow: isPreteriteTense(currentQ) ? '0 -2px 18px rgba(249, 115, 22, 0.2)' : '0 -2px 18px rgba(16, 185, 129, 0.2)'
                    } : undefined}
                  >
                    {currentQ.isContrastDecision ? (
                      <>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '4px 14px',
                            borderRadius: '12px',
                            background: 'rgba(139, 92, 246, 0.15)',
                            border: '1px solid rgba(139, 92, 246, 0.4)',
                            color: '#c4b5fd',
                            fontWeight: '700',
                            fontSize: '0.8rem',
                            letterSpacing: '0.03em'
                          }}>
                            <span>⚖️</span>
                            <span>{currentQ.contrastPair}</span>
                          </span>
                        </div>
                        <div className="quiz-question-lbl" style={{ marginBottom: '6px' }}>Decisión Contrastiva:</div>
                        <h3 className="quiz-word" style={{ fontSize: '1.4rem', color: 'var(--accent)', margin: '10px 0 6px', lineHeight: 1.4 }}>
                          {currentQ.questionWord}
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontStyle: 'italic', marginBottom: '12px' }}>
                          ({currentQ.context || currentQ.meaning})
                        </p>
                      </>
                    ) : currentQ.isConjugation ? (
                      renderConjugationQuestionContent(currentQ, {
                        isTypedView: Boolean(currentQ.isTyped),
                        showCodex: false
                      })
                    ) : currentQ.isFillInTheBlank ? (
                    <>
                      <div className="quiz-question-lbl">Completar la frase (Fill in the blank):</div>
                      <h3 className="quiz-word" style={{ color: 'var(--accent)' }}>{currentQ.questionWord}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontStyle: 'italic', marginBottom: '8px' }}>({currentQ.meaning})</p>
                      {currentQ.hint && (
                        <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
                          {!redemptionHintRevealed ? (
                            <button
                              type="button"
                              onClick={() => setRedemptionHintRevealed(true)}
                              style={{
                                background: 'rgba(255, 255, 255, 0.06)',
                                border: '1px solid rgba(255, 255, 255, 0.18)',
                                color: 'var(--text-secondary)',
                                borderRadius: '20px',
                                padding: '4px 14px',
                                fontSize: '0.78rem',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                transition: 'all 0.2s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
                                e.currentTarget.style.color = '#93c5fd';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
                                e.currentTarget.style.color = 'var(--text-secondary)';
                              }}
                            >
                              <span>💡</span>
                              <span>Ver Pista (Show Hint)</span>
                            </button>
                          ) : (
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '6px 14px', borderRadius: '12px', color: '#93c5fd', fontSize: '0.8rem', maxWidth: '90%', animation: 'fadeIn 0.2s ease' }}>
                              <span>💡</span>
                              <span><strong>Pista:</strong> {currentQ.hint}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="quiz-question-lbl">
                        {currentQ.type === 2 ? "Type the Spanish translation:" : "Choose the correct translation:"}
                      </div>
                      <h3 className="quiz-word">{currentQ.questionWord}</h3>
                    </>
                  )}
                </div>
              )}

                {redemptionFailed ? (
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>💀</div>
                    <h3 style={{ color: 'var(--danger)', marginBottom: '10px' }}>Redemption Failed!</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
                      You made a mistake. You can try the redemption quiz again, or visit the shop/practice section.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '280px', margin: '0 auto' }}>
                      <button className="btn btn-primary" onClick={handleRestartRedemption}>
                        Try Redemption Again
                      </button>
                      <button className="btn btn-secondary" onClick={handleCancelRedemption}>
                        Exit to Hub
                      </button>
                    </div>
                  </div>
                ) : redemptionSuccess ? (
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>💖</div>
                    <h3 style={{ color: 'var(--accent)', marginBottom: '10px' }}>Redemption Successful!</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
                      {questQuestions.length > 0 
                        ? `Excellent! You answered all missed questions correctly. You can now revive with 10 HP and continue your level from Question ${questCurrentIdx + 1} of ${questQuestions.length}!`
                        : "Excellent! You answered all missed questions correctly."}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '320px', margin: '0 auto' }}>
                      <button className="btn btn-accent" onClick={handleClaimRedemption} style={{ width: '100%' }}>
                        {questQuestions.length > 0
                          ? `💖 Revive & Continue Level (${questCurrentIdx + 1}/${questQuestions.length})`
                          : "Claim & Revive (10 HP)"}
                      </button>
                      {questQuestions.length > 0 && (
                        <button className="btn btn-secondary" onClick={handleClaimAndExit} style={{ width: '100%' }}>
                          Exit to Level Map
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    {currentQ.isSentenceBuilder ? (
                      <div style={{ marginTop: '10px' }}>
                        <SentenceBuilder
                          question={currentQ}
                          onAnswer={handleRedemptionSentenceAnswer}
                          answered={redemptionAnswered}
                          userCorrect={isRedemptionCorrect}
                          showSubmitButton={true}
                        />
                      </div>
                    ) : !currentQ.isTyped && (currentQ.isConjugation || currentQ.isFillInTheBlank || currentQ.type !== 2) ? (
                      <div className="quiz-choices-grid">
                        {currentQ.choices.map((choice, idx) => {
                          let btnClass = "";
                          if (redemptionAnswered) {
                            if (choice === currentQ.correct) {
                              btnClass = "correct";
                            } else if (choice === redemptionSelected) {
                              btnClass = "wrong";
                            }
                          }

                          return (
                            <button
                              key={idx}
                              className={`quiz-choice-btn ${btnClass}`}
                              onClick={() => handleRedemptionAnswer(choice)}
                              disabled={redemptionAnswered}
                            >
                              {choice}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <form onSubmit={handleRedemptionSubmitTyped}>
                        <div className="quiz-input-wrapper" style={{ marginTop: '16px' }}>
                          <input
                            type="text"
                            placeholder={currentQ.isConjugation ? "Type the Spanish preterite form..." : "Type the Spanish translation..."}
                            value={redemptionTyped}
                            onChange={(e) => setRedemptionTyped(e.target.value)}
                            disabled={redemptionAnswered}
                            className={`quiz-input ${redemptionAnswered ? (isRedemptionCorrect ? 'correct' : 'wrong') : ''}`}
                            style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)', borderRadius: '12px', color: 'var(--text-primary)', fontSize: '1.1rem', outline: 'none' }}
                            autoFocus
                          />
                          
                          {/* Accent Buttons row */}
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px', justifyContent: 'center' }}>
                            {['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'].map(char => (
                              <button
                                key={char}
                                type="button"
                                className="btn btn-secondary"
                                disabled={redemptionAnswered}
                                onClick={() => setRedemptionTyped(prev => prev + char)}
                                style={{ padding: '6px 12px', fontSize: '1rem', minWidth: '38px', height: '38px', borderRadius: '8px' }}
                              >
                                {char}
                              </button>
                            ))}
                          </div>

                          {!redemptionAnswered && (
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }} disabled={!redemptionTyped.trim()}>
                              {currentQ.isConjugation ? "Submit Answer" : "Submit Translation"}
                            </button>
                          )}
                        </div>
                      </form>
                    )}

                    {redemptionAnswered && (
                      <div 
                        className={`quiz-feedback-box ${isRedemptionCorrect ? 'correct' : 'wrong'}`}
                        style={{ animation: 'pop-in 0.3s ease-out' }}
                      >
                        {isRedemptionCorrect
                          ? "Correct!" 
                          : currentQ.isContrastDecision
                            ? `Incorrect. Correct option: "${currentQ.correct}"`
                            : currentQ.isSentenceBuilder
                              ? `Incorrect. Correct sentence: "${currentQ.correct}"`
                              : currentQ.isConjugation
                                ? `Incorrect. Correct form for "${currentQ.subjectPronoun || 'subject'}" (${isPreteriteTense(currentQ) ? 'Preterite' : 'Present'}): "${currentQ.correct}"`
                                : `Incorrect. Correct answer: "${currentQ.correct}"`
                        }

                        {(currentQ.ruleExplanation || currentQ.explanationEn) && (
                          <div style={{
                            marginTop: '10px',
                            padding: '10px 14px',
                            borderRadius: '10px',
                            background: isRedemptionCorrect ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.15)',
                            border: isRedemptionCorrect ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                            fontSize: '0.82rem',
                            color: isRedemptionCorrect ? '#a7f3d0' : '#fca5a5',
                            textAlign: 'left',
                            lineHeight: 1.4
                          }}>
                            <strong>💡 Grammar Rule:</strong> {currentQ.ruleExplanation || currentQ.explanationEn}
                          </div>
                        )}
                        <button className="btn btn-primary" onClick={handleRedemptionNext} style={{ width: '100%', marginTop: '16px' }}>
                          Next Question <ArrowRight size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* -------------------------------------------------------------
          CONJUGATION CODEX VERB CHART POPUP MODAL
          ------------------------------------------------------------- */}
      {codexVerb && (
        <div className="modal-overlay" style={{ zIndex: 9999 }}>
          <div className="glass-panel modal-content" style={{ animation: 'pop-in 0.3s ease-out', maxWidth: '740px', width: '94%', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '2px' }}>
                  {codexVerb === 'guia_contrastes' 
                    ? (codexLang === 'en' ? '⚖️ Grammar Contrasts Guide (Which One to Use When)' : '⚖️ Guía de Contrastes / Cuándo Usar Cuál')
                    : codexVerb === 'pronombres_objeto' 
                      ? (codexLang === 'en' ? '📖 Object Pronouns Codex' : '📖 Codex de Pronombres de Objeto')
                      : (codexLang === 'en' ? '📖 Verb Conjugation Codex' : '📖 Codex de Conjugación')}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {codexVerb === 'guia_contrastes'
                    ? (codexLang === 'en' 
                        ? "Contrastive decision rules, comparison matrices, and Spanish 102 examples." 
                        : "Reglas contrastivas de decisión: matrices comparativas y ejemplos de Español 102.")
                    : codexVerb === 'pronombres_objeto'
                      ? (codexLang === 'en' ? "Direct (DOP), Indirect (IOP), and Double Object Pronouns (se lo/la)." : "Pronombres de Objeto Directo, Indirecto y Dobles")
                      : (() => {
                          const info = getVerbCategoryInfo(codexVerb, codexTense);
                          const isEn = codexLang === 'en';
                          const catName = info?.category ? (isEn ? info.category.labelEn : info.category.labelEs) : '';
                          const meta = info?.verbMeta;
                          return isEn ? (
                            <>
                              Verb: <strong style={{ color: 'var(--text-primary)' }}>"{codexVerb}"</strong>
                              {meta?.meaning && <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}> ({meta.meaning})</span>}
                              {catName && <span style={{ color: info?.category?.color || '#38bdf8', fontSize: '0.78rem', marginLeft: '6px', fontWeight: 600 }}>• {catName}</span>}
                            </>
                          ) : (
                            <>
                              Verbo: <strong style={{ color: 'var(--text-primary)' }}>"{codexVerb}"</strong>
                              {meta?.meaning && <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}> ({meta.meaning})</span>}
                              {catName && <span style={{ color: info?.category?.color || '#38bdf8', fontSize: '0.78rem', marginLeft: '6px', fontWeight: 600 }}>• {catName}</span>}
                            </>
                          );
                        })()}
                </p>
              </div>
              <button 
                className="btn btn-secondary btn-sm" 
                onClick={() => setCodexVerb(null)}
                style={{ padding: '4px 10px', fontSize: '0.8rem' }}
              >
                ✕
              </button>
            </div>

            {/* Dedicated Language Setting Box in Codex */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '10px',
              padding: '8px 12px',
              margin: '6px 0 12px',
              fontSize: '0.82rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                <span>🌐 <strong>{codexLang === 'en' ? "Explanation Language:" : "Idioma de Explicaciones:"}</strong></span>
              </div>
              <div style={{ display: 'inline-flex', background: 'rgba(0,0,0,0.35)', borderRadius: '8px', padding: '2px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <button
                  type="button"
                  onClick={() => setCodexLang('en')}
                  style={{
                    padding: '4px 10px',
                    fontSize: '0.75rem',
                    borderRadius: '6px',
                    background: codexLang === 'en' ? '#3b82f6' : 'transparent',
                    color: codexLang === 'en' ? '#ffffff' : 'var(--text-secondary)',
                    border: 'none',
                    fontWeight: codexLang === 'en' ? '700' : '500',
                    cursor: 'pointer',
                    boxShadow: codexLang === 'en' ? '0 0 8px rgba(59, 130, 246, 0.5)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  🇺🇸 English (Default)
                </button>
                <button
                  type="button"
                  onClick={() => setCodexLang('es')}
                  style={{
                    padding: '4px 10px',
                    fontSize: '0.75rem',
                    borderRadius: '6px',
                    background: codexLang === 'es' ? '#8b5cf6' : 'transparent',
                    color: codexLang === 'es' ? '#ffffff' : 'var(--text-secondary)',
                    border: 'none',
                    fontWeight: codexLang === 'es' ? '700' : '500',
                    cursor: 'pointer',
                    boxShadow: codexLang === 'es' ? '0 0 8px rgba(139, 92, 246, 0.5)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  🇪🇸 Español
                </button>
              </div>
            </div>

            {/* Top Codex Mode Switcher (Guía de Contrastes / Pronombres / Conjugación) */}
            <div style={{ display: 'flex', gap: '6px', margin: '0 0 14px', background: 'rgba(0,0,0,0.3)', padding: '5px', borderRadius: '12px' }}>
              <button
                type="button"
                className="btn btn-sm"
                style={{
                  flex: 1,
                  fontSize: '0.78rem',
                  padding: '7px 8px',
                  borderRadius: '8px',
                  background: codexVerb === 'guia_contrastes' ? '#8b5cf6' : 'rgba(255,255,255,0.05)',
                  color: codexVerb === 'guia_contrastes' ? '#ffffff' : 'var(--text-secondary)',
                  border: codexVerb === 'guia_contrastes' ? '2px solid #a78bfa' : '1px solid transparent',
                  boxShadow: codexVerb === 'guia_contrastes' ? '0 0 10px rgba(139, 92, 246, 0.4)' : 'none',
                  fontWeight: codexVerb === 'guia_contrastes' ? '800' : '500'
                }}
                onClick={() => setCodexVerb("guia_contrastes")}
              >
                {codexLang === 'en' ? '⚖️ Contrast Guide' : '⚖️ Guía de Contrastes'}
              </button>
              <button
                type="button"
                className="btn btn-sm"
                style={{
                  flex: 1,
                  fontSize: '0.78rem',
                  padding: '7px 8px',
                  borderRadius: '8px',
                  background: codexVerb === 'pronombres_objeto' ? '#3b82f6' : 'rgba(255,255,255,0.05)',
                  color: codexVerb === 'pronombres_objeto' ? '#ffffff' : 'var(--text-secondary)',
                  border: codexVerb === 'pronombres_objeto' ? '2px solid #60a5fa' : '1px solid transparent',
                  boxShadow: codexVerb === 'pronombres_objeto' ? '0 0 10px rgba(59, 130, 246, 0.4)' : 'none',
                  fontWeight: codexVerb === 'pronombres_objeto' ? '800' : '500'
                }}
                onClick={() => setCodexVerb("pronombres_objeto")}
              >
                {codexLang === 'en' ? '🎯 Pronouns' : '🎯 Pronombres'}
              </button>
              <button
                type="button"
                className="btn btn-sm"
                style={{
                  flex: 1,
                  fontSize: '0.78rem',
                  padding: '7px 8px',
                  borderRadius: '8px',
                  background: (codexVerb !== 'guia_contrastes' && codexVerb !== 'pronombres_objeto') ? '#10b981' : 'rgba(255,255,255,0.05)',
                  color: (codexVerb !== 'guia_contrastes' && codexVerb !== 'pronombres_objeto') ? '#ffffff' : 'var(--text-secondary)',
                  border: (codexVerb !== 'guia_contrastes' && codexVerb !== 'pronombres_objeto') ? '2px solid #34d399' : '1px solid transparent',
                  boxShadow: (codexVerb !== 'guia_contrastes' && codexVerb !== 'pronombres_objeto') ? '0 0 10px rgba(16, 185, 129, 0.4)' : 'none',
                  fontWeight: (codexVerb !== 'guia_contrastes' && codexVerb !== 'pronombres_objeto') ? '800' : '500'
                }}
                onClick={() => {
                  if (codexVerb === 'guia_contrastes' || codexVerb === 'pronombres_objeto') {
                    let targetV = "hablar";
                    if (questStarted && currentQuestQ?.targetVerb) {
                      targetV = currentQuestQ.targetVerb;
                    } else if (questStarted && currentQuestQ?.item && isVerbItem(currentQuestQ.item)) {
                      targetV = typeof currentQuestQ.item === 'string' ? currentQuestQ.item : currentQuestQ.item.spanish;
                    }
                    setCodexVerb(targetV);
                    const info = getVerbCategoryInfo(targetV, codexTense);
                    if (info) {
                      setCodexVerbCategory(info.categoryId);
                      setCodexVerbSubcategory(info.subcategoryId || null);
                    }
                  }
                }}
              >
                {codexLang === 'en' ? '📖 Conjugation' : '📖 Conjugación'}
              </button>
            </div>

            {/* Dual Tense Switcher Tabs (Only for Verbs) */}
            {codexVerb !== 'pronombres_objeto' && codexVerb !== 'guia_contrastes' && (
              <div style={{ display: 'flex', gap: '8px', margin: '0 0 10px', background: 'rgba(0,0,0,0.25)', padding: '5px', borderRadius: '12px' }}>
                <button
                  type="button"
                  className="btn btn-sm"
                  style={{ 
                    flex: 1, 
                    fontSize: '0.82rem', 
                    padding: '8px 12px', 
                    borderRadius: '9px',
                    background: codexTense === 'present' ? '#10b981' : 'rgba(255,255,255,0.05)',
                    color: codexTense === 'present' ? '#ffffff' : 'var(--text-secondary)',
                    border: codexTense === 'present' ? '2px solid #34d399' : '1px solid transparent',
                    boxShadow: codexTense === 'present' ? '0 0 12px rgba(16, 185, 129, 0.4)' : 'none',
                    fontWeight: codexTense === 'present' ? '800' : '500'
                  }}
                  onClick={() => {
                    setCodexTense('present');
                    const newInfo = getVerbCategoryInfo(codexVerb, 'present');
                    if (newInfo) {
                      setCodexVerbCategory(newInfo.categoryId);
                      setCodexVerbSubcategory(newInfo.subcategoryId || null);
                    }
                  }}
                >
                  {codexLang === 'en' ? '⚡ Present Tense' : '⚡ Presente'}
                </button>
                <button
                  type="button"
                  className="btn btn-sm"
                  style={{ 
                    flex: 1, 
                    fontSize: '0.82rem', 
                    padding: '8px 12px', 
                    borderRadius: '9px',
                    background: codexTense === 'preterite' ? '#f97316' : 'rgba(255,255,255,0.05)',
                    color: codexTense === 'preterite' ? '#ffffff' : 'var(--text-secondary)',
                    border: codexTense === 'preterite' ? '2px solid #fb923c' : '1px solid transparent',
                    boxShadow: codexTense === 'preterite' ? '0 0 12px rgba(249, 115, 22, 0.4)' : 'none',
                    fontWeight: codexTense === 'preterite' ? '800' : '500'
                  }}
                  onClick={() => {
                    setCodexTense('preterite');
                    const newInfo = getVerbCategoryInfo(codexVerb, 'preterite');
                    if (newInfo) {
                      setCodexVerbCategory(newInfo.categoryId);
                      setCodexVerbSubcategory(newInfo.subcategoryId || null);
                    }
                  }}
                >
                  {codexLang === 'en' ? '⏳ Preterite Tense' : '⏳ Pretérito (Past)'}
                </button>
                <button
                  type="button"
                  className="btn btn-sm"
                  style={{ 
                    flex: 1, 
                    fontSize: '0.82rem', 
                    padding: '8px 12px', 
                    borderRadius: '9px',
                    background: codexTense === 'imperfect' ? '#8b5cf6' : 'rgba(255,255,255,0.05)',
                    color: codexTense === 'imperfect' ? '#ffffff' : 'var(--text-secondary)',
                    border: codexTense === 'imperfect' ? '2px solid #a78bfa' : '1px solid transparent',
                    boxShadow: codexTense === 'imperfect' ? '0 0 12px rgba(139, 92, 246, 0.4)' : 'none',
                    fontWeight: codexTense === 'imperfect' ? '800' : '500'
                  }}
                  onClick={() => {
                    setCodexTense('imperfect');
                    const newInfo = getVerbCategoryInfo(codexVerb, 'imperfect');
                    if (newInfo) {
                      setCodexVerbCategory(newInfo.categoryId);
                      setCodexVerbSubcategory(newInfo.subcategoryId || null);
                    }
                  }}
                >
                  {codexLang === 'en' ? '📜 Imperfect Tense' : '📜 Imperfecto (Past)'}
                </button>
              </div>
            )}

            {/* Categorized Verb Explorer (Present: Boot, Yo-go, -zco, Core Irregulars, Regulars; Preterite: Radical U/I/J, -car/-gar/-zar, Sandal, Twins, etc.) */}
            {codexVerb !== 'pronombres_objeto' && codexVerb !== 'guia_contrastes' && (() => {
              const categories = getVerbCategories(codexTense);
              const activeCatInfo = getVerbCategoryInfo(codexVerb, codexTense);
              const currentCatId = codexVerbCategory && categories.some(c => c.id === codexVerbCategory)
                ? codexVerbCategory 
                : (activeCatInfo?.categoryId || categories[0].id);
              const currentCat = categories.find(c => c.id === currentCatId) || categories[0];
              const isEn = codexLang === 'en';

              const subcats = currentCat.subcategories || null;
              const currentSubId = subcats
                ? (codexVerbSubcategory && subcats.some(s => s.id === codexVerbSubcategory)
                    ? codexVerbSubcategory 
                    : (activeCatInfo?.categoryId === currentCatId && activeCatInfo?.subcategoryId ? activeCatInfo.subcategoryId : subcats[0].id))
                : null;
              const activeSubcat = subcats ? (subcats.find(s => s.id === currentSubId) || subcats[0]) : null;
              const verbsToDisplay = subcats ? (activeSubcat?.verbs || []) : (currentCat.verbs || []);

              return (
                <div style={{ marginBottom: '14px', background: 'rgba(0,0,0,0.28)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '10px 12px' }}>
                  {/* Category Header Bar */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '4px' }}>
                    <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {isEn ? '📚 Verb Group / Category:' : '📚 Grupo de Verbos / Categoría:'}
                    </span>
                    <span style={{ 
                      fontSize: '0.72rem', 
                      color: currentCat.color, 
                      fontWeight: 700, 
                      background: `${currentCat.color}20`, 
                      border: `1px solid ${currentCat.color}40`,
                      padding: '2px 8px', 
                      borderRadius: '5px' 
                    }}>
                      {currentCat.badge}
                    </span>
                  </div>

                  {/* Horizontal Scrollable Category Selector */}
                  <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '6px', marginBottom: '8px', scrollbarWidth: 'thin' }}>
                    {categories.map(cat => {
                      const isSelected = currentCatId === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          className="btn btn-sm"
                          style={{
                            whiteSpace: 'nowrap',
                            fontSize: '0.73rem',
                            padding: '5px 10px',
                            borderRadius: '8px',
                            background: isSelected ? `${cat.color}25` : 'rgba(255,255,255,0.04)',
                            color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                            border: isSelected ? `2px solid ${cat.color}` : '1px solid rgba(255,255,255,0.08)',
                            boxShadow: isSelected ? `0 0 10px ${cat.color}45` : 'none',
                            fontWeight: isSelected ? 800 : 500,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          onClick={() => {
                            setCodexVerbCategory(cat.id);
                            if (cat.subcategories) {
                              const firstSub = cat.subcategories[0];
                              setCodexVerbSubcategory(firstSub.id);
                              if (firstSub.verbs[0]) setCodexVerb(firstSub.verbs[0].verb);
                            } else if (cat.verbs && cat.verbs[0]) {
                              setCodexVerbSubcategory(null);
                              setCodexVerb(cat.verbs[0].verb);
                            }
                          }}
                        >
                          {isEn ? cat.labelEn : cat.labelEs}
                        </button>
                      );
                    })}
                  </div>

                  {/* Subcategories if present (e.g. -car, -gar, -zar or Sandal e->i, o->u) */}
                  {subcats && (
                    <div style={{ display: 'flex', gap: '6px', margin: '4px 0 8px', flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        {isEn ? 'Subgroup:' : 'Subgrupo:'}
                      </span>
                      {subcats.map(sub => {
                        const isSubSelected = activeSubcat?.id === sub.id;
                        return (
                          <button
                            key={sub.id}
                            type="button"
                            className="btn btn-sm"
                            style={{
                              fontSize: '0.72rem',
                              padding: '3px 9px',
                              borderRadius: '6px',
                              background: isSubSelected ? `${currentCat.color}35` : 'rgba(255,255,255,0.04)',
                              color: isSubSelected ? '#ffffff' : 'var(--text-secondary)',
                              border: isSubSelected ? `1.5px solid ${currentCat.color}` : '1px solid rgba(255,255,255,0.08)',
                              fontWeight: isSubSelected ? 700 : 500,
                              cursor: 'pointer'
                            }}
                            onClick={() => {
                              setCodexVerbSubcategory(sub.id);
                              if (sub.verbs[0]) setCodexVerb(sub.verbs[0].verb);
                            }}
                          >
                            {sub.label}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Verbs in Selected Group */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center', marginTop: '4px' }}>
                    {verbsToDisplay.map(v => {
                      const isActive = parseVerb(codexVerb).base.toLowerCase() === v.verb.toLowerCase();
                      return (
                        <button
                          key={v.verb}
                          type="button"
                          className="btn btn-sm"
                          style={{
                            fontSize: '0.74rem',
                            padding: '4px 10px',
                            borderRadius: '7px',
                            background: isActive ? currentCat.color : 'rgba(255,255,255,0.06)',
                            color: isActive ? '#ffffff' : 'var(--text-primary)',
                            border: isActive ? `1.5px solid #ffffff` : '1px solid rgba(255,255,255,0.12)',
                            fontWeight: isActive ? 800 : 500,
                            boxShadow: isActive ? `0 0 10px ${currentCat.color}70` : 'none',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            transition: 'all 0.12s ease'
                          }}
                          onClick={() => setCodexVerb(v.verb)}
                          title={`${v.verb}: ${v.meaning} (${v.stem})`}
                        >
                          <span>{v.verb}</span>
                          <span style={{ fontSize: '0.68rem', opacity: isActive ? 0.95 : 0.6, fontWeight: 400 }}>
                            ({v.stem})
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanatory Rule Banner for Active Category */}
                  <div style={{ 
                    marginTop: '10px', 
                    padding: '8px 12px', 
                    background: `${currentCat.color}14`, 
                    border: `1px solid ${currentCat.color}35`, 
                    borderRadius: '8px', 
                    fontSize: '0.76rem', 
                    color: '#e2e8f0',
                    lineHeight: '1.45' 
                  }}>
                    <strong style={{ color: currentCat.color }}>
                      {isEn ? '💡 Grammar Rule:' : '💡 Regla Gramatical:'}
                    </strong>{' '}
                    {isEn 
                      ? (activeSubcat?.ruleEn || currentCat.ruleEn) 
                      : (activeSubcat?.ruleEs || currentCat.ruleEs)}
                  </div>
                </div>
              );
            })()}

            {/* Reflexive or Reciprocal Verb Banner */}
            {codexVerb !== 'pronombres_objeto' && codexVerb !== 'guia_contrastes' && (
              isReciprocalVerb(codexVerb) ? (
                <div style={{ 
                  background: 'rgba(236, 72, 153, 0.12)', 
                  color: '#f472b6', 
                  border: '1px solid rgba(236, 72, 153, 0.3)', 
                  borderRadius: '8px', 
                  padding: '7px 12px', 
                  fontSize: '0.78rem', 
                  marginBottom: '12px', 
                  textAlign: 'center', 
                  fontWeight: 600 
                }}>
                  {codexLang === 'en' ? '🤝 Reciprocal Verb (Mutual Action: "Each Other")' : '🤝 Verbo Recíproco (Acción Mutua: "Each Other")'}
                </div>
              ) : parseVerb(codexVerb).isReflexive ? (
                <div style={{ 
                  background: 'rgba(168, 85, 247, 0.12)', 
                  color: '#c084fc', 
                  border: '1px solid rgba(168, 85, 247, 0.3)', 
                  borderRadius: '8px', 
                  padding: '7px 12px', 
                  fontSize: '0.78rem', 
                  marginBottom: '12px', 
                  textAlign: 'center', 
                  fontWeight: 600 
                }}>
                  {codexLang === 'en' ? '✨ Reflexive Verb (me, te, se, nos, os, se)' : '✨ Verbo Reflexivo (me, te, se, nos, os, se)'}
                </div>
              ) : null
            )}

            {/* Preterite Special Verb Rules (Spelling Changers, Sandal Verbs, Double Vowels) */}
            {codexVerb !== 'pronombres_objeto' && codexVerb !== 'guia_contrastes' && codexTense === 'preterite' && (
              <>
                {isPreteriteSpellingChanger(codexVerb) && (
                  <div style={{
                    background: 'rgba(59, 130, 246, 0.12)',
                    color: '#60a5fa',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '8px',
                    padding: '7px 12px',
                    fontSize: '0.78rem',
                    marginBottom: '12px',
                    textAlign: 'center',
                    fontWeight: 600
                  }}>
                    {codexLang === 'en' 
                      ? '✍️ Preterite Spelling Changer: -car ➔ qué, -gar ➔ gué, -zar ➔ cé (Yo form only)' 
                      : '✍️ Cambio Ortográfico en Pretérito: -car ➔ qué, -gar ➔ gué, -zar ➔ cé (solo forma Yo)'}
                  </div>
                )}
                {isPreteriteStemChanger(codexVerb) && (
                  <div style={{
                    background: 'rgba(168, 85, 247, 0.12)',
                    color: '#c084fc',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    borderRadius: '8px',
                    padding: '7px 12px',
                    fontSize: '0.78rem',
                    marginBottom: '12px',
                    textAlign: 'center',
                    fontWeight: 600
                  }}>
                    {codexLang === 'en'
                      ? '👟 Sandal Verb: Stem changes e ➔ i or o ➔ u in 3rd person (él/ella/ellos)'
                      : '👟 Verbo Sandalia: Cambio de raíz e ➔ i u o ➔ u en 3ª persona (él/ella/ellos)'}
                  </div>
                )}
                {isPreteriteDoubleVowel(codexVerb) && (
                  <div style={{
                    background: 'rgba(16, 185, 129, 0.12)',
                    color: '#34d399',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '8px',
                    padding: '7px 12px',
                    fontSize: '0.78rem',
                    marginBottom: '12px',
                    textAlign: 'center',
                    fontWeight: 600
                  }}>
                    {codexLang === 'en'
                      ? '📖 Double Vowel Verb: Unaccented i changes to y between vowels (e.g. leyó, leyeron, cayó)'
                      : '📖 Doble Vocal: La i átona cambia a y entre vocales (ej. leyó, leyeron, cayó)'}
                  </div>
                )}
              </>
            )}

            {/* Imperfect Special Verb Rules */}
            {codexVerb !== 'pronombres_objeto' && codexVerb !== 'guia_contrastes' && codexTense === 'imperfect' && (
              <div style={{
                background: 'rgba(139, 92, 246, 0.12)',
                color: '#c084fc',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '8px',
                padding: '7px 12px',
                fontSize: '0.78rem',
                marginBottom: '12px',
                textAlign: 'center',
                fontWeight: 600
              }}>
                {codexLang === 'en'
                  ? '📜 Imperfect Tense: Habitual past actions, ongoing descriptions & only 3 irregular verbs (ser, ir, ver)!'
                  : '📜 Tiempo Imperfecto: Acciones habituales, descripciones pasadas y ¡solo 3 verbos irregulares (ser, ir, ver)!'}
              </div>
            )}
            
            {codexVerb === 'guia_contrastes' ? (
              <div>
                {/* Horizontal scrollable subtabs */}
                <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '14px', scrollbarWidth: 'thin' }}>
                  {CONTRAST_CODEX_TABS.map(tab => (
                    <button
                      key={tab.id}
                      type="button"
                      className="btn btn-sm"
                      style={{
                        whiteSpace: 'nowrap',
                        fontSize: '0.74rem',
                        padding: '6px 10px',
                        borderRadius: '8px',
                        background: contrastCodexTab === tab.id ? '#8b5cf6' : 'rgba(255,255,255,0.05)',
                        color: contrastCodexTab === tab.id ? '#ffffff' : 'var(--text-secondary)',
                        border: contrastCodexTab === tab.id ? '2px solid #a78bfa' : '1px solid transparent',
                        boxShadow: contrastCodexTab === tab.id ? '0 0 8px rgba(139, 92, 246, 0.4)' : 'none',
                        fontWeight: contrastCodexTab === tab.id ? '700' : '500'
                      }}
                      onClick={() => setContrastCodexTab(tab.id)}
                    >
                      {codexLang === 'en' ? tab.labelEn : tab.labelEs}
                    </button>
                  ))}
                </div>

                {(() => {
                  const content = CONTRAST_TABS_CONTENT[contrastCodexTab];
                  if (!content) return null;
                  const isEn = codexLang === 'en';
                  return (
                    <div>
                      {/* Banner */}
                      <div style={{ background: 'rgba(139, 92, 246, 0.12)', border: '1px solid rgba(139, 92, 246, 0.35)', borderRadius: '10px', padding: '10px 12px', fontSize: '0.82rem', marginBottom: '14px', color: '#c4b5fd', lineHeight: '1.45' }}>
                        {isEn ? content.bannerEn : content.bannerEs}
                      </div>

                      {/* Table */}
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left', marginBottom: '14px' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            {(isEn ? content.headersEn : content.headersEs).map((h, i) => (
                              <th key={i} style={{ padding: '6px 8px', color: i === 1 ? '#c4b5fd' : 'var(--text-secondary)', fontWeight: i === 1 ? 'bold' : 'normal' }}>
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {content.rows.map((r, i) => {
                            if (contrastCodexTab === 'por_para') {
                              return (
                                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: r.prep === 'por' ? 'rgba(59, 130, 246, 0.04)' : 'rgba(16, 185, 129, 0.04)' }}>
                                  <td style={{ padding: '6px 8px', color: 'var(--text-secondary)' }}>{isEn ? r.ruleEn : r.ruleEs}</td>
                                  <td style={{ padding: '6px 8px', color: r.prep === 'por' ? '#60a5fa' : '#34d399', fontWeight: 700 }}>{r.prep}</td>
                                  <td style={{ padding: '6px 8px', color: 'var(--text-primary)', fontStyle: 'italic' }}>{r.ex}</td>
                                </tr>
                              );
                            }
                            if (contrastCodexTab === 'to_become') {
                              return (
                                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                  <td style={{ padding: '6px 8px', color: '#38bdf8', fontWeight: 700 }}>{r.verb}</td>
                                  <td style={{ padding: '6px 8px', color: 'var(--text-secondary)' }}>{isEn ? r.typeEn : r.typeEs}</td>
                                  <td style={{ padding: '6px 8px', color: 'var(--text-muted)' }}>{isEn ? r.effortEn : r.effortEs}</td>
                                  <td style={{ padding: '6px 8px', color: 'var(--text-primary)', fontStyle: 'italic' }}>{r.ex}</td>
                                </tr>
                              );
                            }
                            if (contrastCodexTab === 'to_realize') {
                              return (
                                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: r.isGood ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)' }}>
                                  <td style={{ padding: '8px', color: r.isGood ? '#34d399' : '#f87171', fontWeight: 700 }}>{r.expr}</td>
                                  <td style={{ padding: '8px', color: 'var(--text-secondary)' }}>{isEn ? r.meaningEn : r.meaningEs}</td>
                                  <td style={{ padding: '8px', color: 'var(--text-primary)', fontStyle: 'italic' }}>{r.ex}</td>
                                </tr>
                              );
                            }
                            if (contrastCodexTab === 'personal_a') {
                              return (
                                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: r.isYes ? 'rgba(16, 185, 129, 0.04)' : 'rgba(239, 68, 68, 0.04)' }}>
                                  <td style={{ padding: '6px 8px', color: 'var(--text-secondary)' }}>{isEn ? r.sitEn : r.sitEs}</td>
                                  <td style={{ padding: '6px 8px', color: r.isYes ? '#34d399' : '#f87171', fontWeight: 700 }}>{r.takes}</td>
                                  <td style={{ padding: '6px 8px', color: 'var(--text-primary)', fontStyle: 'italic' }}>{r.ex}</td>
                                </tr>
                              );
                            }
                            if (contrastCodexTab === 'reciprocal_reflexive') {
                              return (
                                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                  <td style={{ padding: '8px', color: i === 0 ? '#c084fc' : '#f472b6', fontWeight: 700 }}>{r.type}</td>
                                  <td style={{ padding: '8px', color: 'var(--text-secondary)' }}>{isEn ? r.targetEn : r.targetEs}</td>
                                  <td style={{ padding: '8px', color: 'var(--text-muted)' }}>{r.pron}</td>
                                  <td style={{ padding: '8px', color: 'var(--text-primary)', fontStyle: 'italic' }}>{r.ex}</td>
                                </tr>
                              );
                            }
                            if (contrastCodexTab === 'saber_conocer_ser_estar') {
                              return (
                                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                  <td style={{ padding: '8px', color: '#60a5fa', fontWeight: 700 }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                      <span>{r.pair}</span>
                                      {r.meaningEn && (
                                        <span style={{ 
                                          fontSize: '0.74rem', 
                                          color: '#34d399', 
                                          background: 'rgba(16, 185, 129, 0.12)', 
                                          border: '1px solid rgba(16, 185, 129, 0.25)',
                                          padding: '1px 6px', 
                                          borderRadius: '4px',
                                          fontWeight: 600,
                                          display: 'inline-block',
                                          width: 'fit-content'
                                        }}>
                                          "{isEn ? r.meaningEn : (r.meaningEs || r.meaningEn)}"
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                  <td style={{ padding: '8px', color: 'var(--text-secondary)' }}>{isEn ? r.useEn : r.useEs}</td>
                                  <td style={{ padding: '8px', color: 'var(--text-primary)', fontStyle: 'italic' }}>{r.pret}</td>
                                </tr>
                              );
                            }
                            if (contrastCodexTab === 'preterite_families') {
                              return (
                                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                  <td style={{ padding: '6px 8px', color: '#38bdf8', fontWeight: 700 }}>{r.fam}</td>
                                  <td style={{ padding: '6px 8px', color: 'var(--text-secondary)' }}>{isEn ? r.ruleEn : r.ruleEs}</td>
                                  <td style={{ padding: '6px 8px', color: 'var(--text-primary)', fontStyle: 'italic' }}>{r.ex}</td>
                                </tr>
                              );
                            }
                            if (contrastCodexTab === 'devolver_volver') {
                              return (
                                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                  <td style={{ padding: '8px', color: i === 0 ? '#60a5fa' : '#34d399', fontWeight: 700 }}>{r.verb}</td>
                                  <td style={{ padding: '8px', color: 'var(--text-secondary)' }}>{isEn ? r.meanEn : r.meanEs}</td>
                                  <td style={{ padding: '8px', color: 'var(--text-primary)', fontStyle: 'italic' }}>{r.ex}</td>
                                </tr>
                              );
                            }
                            return null;
                          })}
                        </tbody>
                      </table>

                      {/* Explanatory Note Callout (e.g. English Meanings Note) */}
                      {content.noteEn && (
                        <div style={{ 
                          background: 'rgba(59, 130, 246, 0.08)', 
                          border: '1px solid rgba(59, 130, 246, 0.28)', 
                          borderRadius: '8px', 
                          padding: '10px 12px', 
                          fontSize: '0.8rem', 
                          color: '#bfdbfe', 
                          marginBottom: '12px', 
                          lineHeight: '1.5',
                          whiteSpace: 'pre-line' 
                        }}>
                          {isEn ? content.noteEn : content.noteEs}
                        </div>
                      )}

                      {/* Footer Tip or Warning */}
                      {content.tipEn && (
                        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--card-border)', borderRadius: '8px', padding: '8px 12px', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                          {isEn ? content.tipEn : content.tipEs}
                        </div>
                      )}
                      {content.warningEn && (
                        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '8px', padding: '8px 12px', fontSize: '0.78rem', color: '#fca5a5', marginBottom: '12px', whiteSpace: 'pre-line' }}>
                          {isEn ? content.warningEn : content.warningEs}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            ) : codexVerb === 'pronombres_objeto' ? (
              <div>
                {/* 3 tabs switcher */}
                <div style={{ display: 'flex', gap: '6px', margin: '0 0 12px', background: 'rgba(0,0,0,0.25)', padding: '5px', borderRadius: '12px' }}>
                  <button
                    type="button"
                    className="btn btn-sm"
                    style={{
                      flex: 1,
                      fontSize: '0.74rem',
                      padding: '7px 6px',
                      borderRadius: '8px',
                      background: objectPronounTab === 'direct' ? '#3b82f6' : 'rgba(255,255,255,0.05)',
                      color: objectPronounTab === 'direct' ? '#ffffff' : 'var(--text-secondary)',
                      border: objectPronounTab === 'direct' ? '2px solid #60a5fa' : '1px solid transparent',
                      boxShadow: objectPronounTab === 'direct' ? '0 0 10px rgba(59, 130, 246, 0.4)' : 'none',
                      fontWeight: objectPronounTab === 'direct' ? '800' : '500'
                    }}
                    onClick={() => setObjectPronounTab('direct')}
                  >
                    {codexLang === 'en' ? '🎯 Direct (DOP)' : '🎯 Directo (DOP)'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm"
                    style={{
                      flex: 1,
                      fontSize: '0.74rem',
                      padding: '7px 6px',
                      borderRadius: '8px',
                      background: objectPronounTab === 'indirect' ? '#a855f7' : 'rgba(255,255,255,0.05)',
                      color: objectPronounTab === 'indirect' ? '#ffffff' : 'var(--text-secondary)',
                      border: objectPronounTab === 'indirect' ? '2px solid #c084fc' : '1px solid transparent',
                      boxShadow: objectPronounTab === 'indirect' ? '0 0 10px rgba(168, 85, 247, 0.4)' : 'none',
                      fontWeight: objectPronounTab === 'indirect' ? '800' : '500'
                    }}
                    onClick={() => setObjectPronounTab('indirect')}
                  >
                    {codexLang === 'en' ? '📬 Indirect (IOP)' : '📬 Indirecto (IOP)'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm"
                    style={{
                      flex: 1,
                      fontSize: '0.74rem',
                      padding: '7px 6px',
                      borderRadius: '8px',
                      background: objectPronounTab === 'double' ? '#f59e0b' : 'rgba(255,255,255,0.05)',
                      color: objectPronounTab === 'double' ? '#ffffff' : 'var(--text-secondary)',
                      border: objectPronounTab === 'double' ? '2px solid #fbbf24' : '1px solid transparent',
                      boxShadow: objectPronounTab === 'double' ? '0 0 10px rgba(245, 158, 11, 0.4)' : 'none',
                      fontWeight: objectPronounTab === 'double' ? '800' : '500'
                    }}
                    onClick={() => setObjectPronounTab('double')}
                  >
                    {codexLang === 'en' ? '🔄 Double (se lo/la)' : '🔄 Doble (se lo/la)'}
                  </button>
                </div>

                {/* TAB 1: DIRECT OBJECT PRONOUNS (DOP) */}
                {objectPronounTab === 'direct' && (
                  <div>
                    <div style={{ 
                      background: 'rgba(59, 130, 246, 0.12)', 
                      border: '1px solid rgba(59, 130, 246, 0.35)', 
                      borderRadius: '10px', 
                      padding: '10px 12px', 
                      fontSize: '0.82rem', 
                      marginBottom: '14px', 
                      color: '#93c5fd',
                      lineHeight: '1.45'
                    }}>
                      {codexLang === 'en' ? (
                        <>
                          🎯 <strong>Direct Object Pronouns (DOP)</strong>
                          <br />
                          Directly replace the person or thing that receives the action of the verb (answers <em>What?</em> or <em>Whom?</em>):
                        </>
                      ) : (
                        <>
                          🎯 <strong>Pronombres de Objeto Directo (DOP)</strong>
                          <br />
                          Reemplazan al sustantivo que recibe directamente la acción del verbo (responden a <em>¿Qué?</em> o <em>¿A quién?</em>):
                        </>
                      )}
                    </div>

                    {/* Direct Object Pronouns Table */}
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left', marginBottom: '14px' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                          <th style={{ padding: '6px 8px', color: 'var(--text-secondary)' }}>{codexLang === 'en' ? 'Noun / Person' : 'Sustantivo / Persona'}</th>
                          <th style={{ padding: '6px 8px', color: '#60a5fa', fontWeight: 'bold' }}>{codexLang === 'en' ? 'DO Pronoun' : 'Pronombre OD'}</th>
                          <th style={{ padding: '6px 8px', color: 'var(--text-secondary)' }}>{codexLang === 'en' ? 'Example' : 'Ejemplo'}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { person: "yo (me)", dop: "me", example: codexLang === 'en' ? "Él me llamó (He called me)" : "Él me llamó" },
                          { person: "tú (you inf.)", dop: "te", example: codexLang === 'en' ? "Yo te escucho (I listen to you)" : "Yo te escucho" },
                          { person: "él / ella / ud. / masc. sing. (el pasaporte)", dop: "lo", example: codexLang === 'en' ? "Yo lo tengo (I have it)" : "Yo lo tengo" },
                          { person: "ella / ud. / fem. sing. (la maleta)", dop: "la", example: codexLang === 'en' ? "Yo la compré (I bought it)" : "Yo la compré" },
                          { person: "nosotros / nosotras (us)", dop: "nos", example: codexLang === 'en' ? "Nos ayuda (He helps us)" : "Nos ayuda" },
                          { person: "vosotros / vosotras (Spain)", dop: "os", example: codexLang === 'en' ? "Os vi (I saw you all)" : "Os vi", isVosotros: true },
                          { person: "ellos / uds. / masc. pl. (los boletos)", dop: "los", example: codexLang === 'en' ? "Los guardamos (We keep them)" : "Los guardamos" },
                          { person: "ellas / uds. / fem. pl. (las llaves)", dop: "las", example: codexLang === 'en' ? "Las encontré (I found them)" : "Las encontré" }
                        ].map((row, idx) => (
                          <tr 
                            key={idx} 
                            style={{ 
                              borderBottom: '1px solid rgba(255,255,255,0.05)',
                              opacity: row.isVosotros && state.excludeVosotros ? 0.6 : 1
                            }}
                          >
                            <td style={{ padding: '6px 8px', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{row.person}</td>
                            <td style={{ padding: '6px 8px', color: '#38bdf8', fontWeight: 700 }}>{row.dop}</td>
                            <td style={{ padding: '6px 8px', color: 'var(--text-primary)', fontSize: '0.8rem' }}><em>{row.example}</em></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Placement Rules Callout */}
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      padding: '12px',
                      fontSize: '0.82rem',
                      lineHeight: '1.5',
                      marginBottom: '12px'
                    }}>
                      <h4 style={{ color: 'var(--gold)', fontSize: '0.88rem', margin: '0 0 6px 0', fontWeight: 700 }}>
                        {codexLang === 'en' ? '🔄 Placement Rules' : '🔄 Reglas de Colocación'}
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ background: 'rgba(0,0,0,0.25)', padding: '6px 10px', borderRadius: '6px' }}>
                          <strong style={{ color: '#93c5fd' }}>
                            {codexLang === 'en' ? '1. Single conjugated verb:' : '1. Un solo verbo conjugado:'}
                          </strong>
                          <br />
                          {codexLang === 'en' ? 'The pronoun goes before the verb:' : 'El pronombre va antes del verbo:'}
                          <br />
                          <em>¿Tienes el pasaporte? — Sí, yo <u>lo</u> tengo en la mochila.</em>
                          <br />
                          <em>¿Compraste la maleta? — Sí, yo <u>la</u> compré ayer.</em>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.25)', padding: '6px 10px', borderRadius: '6px' }}>
                          <strong style={{ color: '#93c5fd' }}>
                            {codexLang === 'en' ? '2. Two verbs (ir a + inf / querer / poder / necesitar):' : '2. Dos verbos (ir a + inf / querer / poder / necesitar):'}
                          </strong>
                          <br />
                          {codexLang === 'en' ? 'You have two correct positions!' : '¡Tienes dos posiciones correctas!'}
                          <br />
                          • <strong>{codexLang === 'en' ? 'Before' : 'Antes'}</strong> {codexLang === 'en' ? 'the conjugated verb:' : 'del verbo conjugado:'} <em>Nosotros <u>los</u> vamos a guardar.</em>
                          <br />
                          • <strong>{codexLang === 'en' ? 'Attached' : 'Unido'}</strong> {codexLang === 'en' ? 'to the end of the infinitive:' : 'al final del infinitivo:'} <em>Nosotros vamos a guardar<u>los</u>.</em>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.25)', padding: '6px 10px', borderRadius: '6px' }}>
                          <strong style={{ color: '#f87171' }}>{codexLang === 'en' ? '⚠️ Common mistakes:' : '⚠️ Errores comunes:'}</strong>
                          <br />
                          ❌ <em>Voy lo a guardar</em> {codexLang === 'en' ? '(Never put the pronoun in the middle!)' : '(¡Nunca pongas el pronombre en medio!)'}
                          <br />
                          ❌ <em>Lo voy a guardarlo</em> {codexLang === 'en' ? '(Never duplicate the pronoun!)' : '(¡Nunca dupliques el pronombre!)'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: INDIRECT OBJECT PRONOUNS (IOP) */}
                {objectPronounTab === 'indirect' && (
                  <div>
                    <div style={{ 
                      background: 'rgba(168, 85, 247, 0.12)', 
                      border: '1px solid rgba(168, 85, 247, 0.35)', 
                      borderRadius: '10px', 
                      padding: '10px 12px', 
                      fontSize: '0.82rem', 
                      marginBottom: '14px', 
                      color: '#c084fc',
                      lineHeight: '1.45'
                    }}>
                      {codexLang === 'en' ? (
                        <>
                          📬 <strong>Indirect Object Pronouns (IOP)</strong>
                          <br />
                          Indicate who benefits or is affected by the action, or who receives something (answers <em>To whom?</em> or <em>For whom?</em>):
                        </>
                      ) : (
                        <>
                          📬 <strong>Pronombres de Objeto Indirecto (IOP)</strong>
                          <br />
                          Indican a quién beneficia o perjudica la acción, o quién recibe algo (responden a <em>¿A quién?</em> o <em>¿Para quién?</em>):
                        </>
                      )}
                    </div>

                    {/* Indirect Object Pronouns Table */}
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left', marginBottom: '14px' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                          <th style={{ padding: '6px 8px', color: 'var(--text-secondary)' }}>{codexLang === 'en' ? 'Person' : 'Persona'}</th>
                          <th style={{ padding: '6px 8px', color: '#c084fc', fontWeight: 'bold' }}>{codexLang === 'en' ? 'IO Pronoun' : 'Pronombre OI'}</th>
                          <th style={{ padding: '6px 8px', color: 'var(--text-secondary)' }}>{codexLang === 'en' ? 'Example' : 'Ejemplo'}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { person: "yo (to/for me)", iop: "me", example: codexLang === 'en' ? "Él me dio un regalo (He gave me a gift)" : "Él me dio un regalo" },
                          { person: "tú (to/for you inf.)", iop: "te", example: codexLang === 'en' ? "Te dije la verdad (I told you the truth)" : "Te dije la verdad" },
                          { person: "él / ella / usted (to/for him/her)", iop: "le", example: codexLang === 'en' ? "Le di las maletas al botones (I gave the bags to the bellhop)" : "Le di las maletas al botones" },
                          { person: "nosotros / nosotras (to/for us)", iop: "nos", example: codexLang === 'en' ? "Nos mandaron los pasajes (They sent us the tickets)" : "Nos mandaron los pasajes" },
                          { person: "vosotros / vosotras (Spain)", iop: "os", example: codexLang === 'en' ? "Os presté el mapa (I lent you all the map)" : "Os presté el mapa", isVosotros: true },
                          { person: "ellos / ellas / ustedes (to/for them)", iop: "les", example: codexLang === 'en' ? "Les pidió un taxi a los turistas (He called a taxi for the tourists)" : "Les pidió un taxi a los turistas" }
                        ].map((row, idx) => (
                          <tr 
                            key={idx} 
                            style={{ 
                              borderBottom: '1px solid rgba(255,255,255,0.05)',
                              opacity: row.isVosotros && state.excludeVosotros ? 0.6 : 1
                            }}
                          >
                            <td style={{ padding: '6px 8px', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{row.person}</td>
                            <td style={{ padding: '6px 8px', color: '#e879f9', fontWeight: 700 }}>{row.iop}</td>
                            <td style={{ padding: '6px 8px', color: 'var(--text-primary)', fontSize: '0.8rem' }}><em>{row.example}</em></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Key IOP Rules Callout */}
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      padding: '12px',
                      fontSize: '0.82rem',
                      lineHeight: '1.5',
                      marginBottom: '12px'
                    }}>
                      <h4 style={{ color: 'var(--gold)', fontSize: '0.88rem', margin: '0 0 6px 0', fontWeight: 700 }}>
                        {codexLang === 'en' ? '💡 Key Indirect Object Rules' : '💡 Reglas Clave del Objeto Indirecto'}
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ background: 'rgba(0,0,0,0.25)', padding: '6px 10px', borderRadius: '6px' }}>
                          <strong style={{ color: '#c084fc' }}>
                            {codexLang === 'en' ? '1. Mandatory redundancy with "a + person":' : '1. Redundancia obligatoria con "a + persona":'}
                          </strong>
                          <br />
                          {codexLang === 'en' 
                            ? 'In Spanish, the pronoun (le / les / nos) is almost always required, even when the person or noun is explicitly named:'
                            : 'En español, el pronombre (le / les / nos) se usa casi siempre, aunque se mencione el nombre de la persona:'}
                          <br />
                          <em>Yo <u>le</u> di la tarjeta de embarque <u>al agente</u>.</em>
                          <br />
                          <em>El recepcionista <u>nos</u> dio la llave <u>a nosotros</u>.</em>
                          <br />
                          <em>El botones <u>les</u> subió las maletas <u>a los huéspedes</u>.</em>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.25)', padding: '6px 10px', borderRadius: '6px' }}>
                          <strong style={{ color: '#c084fc' }}>
                            {codexLang === 'en' ? '2. Two verbs (ir a + inf / querer / poder):' : '2. Dos verbos (ir a + inf / querer / poder):'}
                          </strong>
                          <br />
                          • <strong>{codexLang === 'en' ? 'Before' : 'Antes'}</strong> {codexLang === 'en' ? 'the conjugated verb:' : 'del verbo conjugado:'} <em>Ella <u>me</u> va a mostrar las fotos.</em>
                          <br />
                          • <strong>{codexLang === 'en' ? 'Attached' : 'Unido'}</strong> {codexLang === 'en' ? 'to the end of the infinitive:' : 'al final del infinitivo:'} <em>Ella va a mostrar<u>me</u> las fotos.</em>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: DOUBLE OBJECT PRONOUNS (IOP + DOP) */}
                {objectPronounTab === 'double' && (
                  <div>
                    <div style={{ 
                      background: 'rgba(245, 158, 11, 0.12)', 
                      border: '1px solid rgba(245, 158, 11, 0.35)', 
                      borderRadius: '10px', 
                      padding: '10px 12px', 
                      fontSize: '0.82rem', 
                      marginBottom: '14px', 
                      color: '#fde047',
                      lineHeight: '1.45'
                    }}>
                      {codexLang === 'en' ? (
                        <>
                          🔄 <strong>Double Object Pronouns</strong>
                          <br />
                          When combining the Indirect Object (person receiving) and the Direct Object (thing) in the same sentence:
                        </>
                      ) : (
                        <>
                          🔄 <strong>Pronombres Dobles de Objeto</strong>
                          <br />
                          Cuando combinamos el Objeto Indirecto (persona) y el Objeto Directo (cosa) en la misma oración:
                        </>
                      )}
                    </div>

                    <div style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      padding: '12px',
                      fontSize: '0.82rem',
                      lineHeight: '1.5',
                      marginBottom: '12px'
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ background: 'rgba(0,0,0,0.25)', padding: '8px 10px', borderRadius: '6px' }}>
                          <strong style={{ color: '#fbbf24' }}>
                            {codexLang === 'en' ? '1. Immutable Order: Indirect First, Direct Second (I.D.)' : '1. Orden Inmutable: Indirecto Primero, Directo Segundo (I.D.)'}
                          </strong>
                          <br />
                          {codexLang === 'en' 
                            ? <>Mnemonic: <em>"People come before things"</em> (or your <strong>ID</strong> card).</>
                            : <>Mnemotecnia: <em>"La gente va antes que las cosas"</em> (o tu <strong>ID</strong>).</>}
                          <br />
                          • <em>¿Me prestas el libro? — Sí, <u>te</u> (IOP) <u>lo</u> (DOP) presto.</em>
                          <br />
                          • <em>¿Quién les explicó el plan? — <u>Nos</u> <u>lo</u> explicaron ayer.</em>
                        </div>

                        <div style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '8px 10px', borderRadius: '6px' }}>
                          <strong style={{ color: '#f87171' }}>
                            {codexLang === 'en' ? '2. Golden Rule! LE / LES turns into SE:' : '2. ¡La Regla de Oro! LE / LES se convierte en SE:'}
                          </strong>
                          <br />
                          {codexLang === 'en' 
                            ? <>In Spanish, two consecutive pronouns starting with "L" clash phonetically (we never say <em>*le lo</em> or <em>*les la</em>). The indirect pronoun <strong>le / les</strong> must change to <strong>se</strong>:</>
                            : <>En español, dos pronombres seguidos que empiezan con "L" chocan fonéticamente (no decimos <em>*le lo</em> ni <em>*les la</em>). El pronombre indirecto <strong>le / les</strong> cambia obligatoriamente a <strong>se</strong>:</>}
                          <br />
                          ❌ <em>Le lo compré</em> ➔ ✅ <strong>Se lo compré</strong>.
                          <br />
                          ❌ <em>Les la sirvió</em> ➔ ✅ <strong>Se la sirvió</strong>.
                          <br />
                          ❌ <em>Le los entregué</em> ➔ ✅ <strong>Se los entregué</strong>.
                        </div>

                        <div style={{ background: 'rgba(0,0,0,0.25)', padding: '8px 10px', borderRadius: '6px' }}>
                          <strong style={{ color: '#fbbf24' }}>
                            {codexLang === 'en' ? '3. Two verbs (written accent added at end):' : '3. Dos verbos (con acento escrito al final):'}
                          </strong>
                          <br />
                          • <strong>{codexLang === 'en' ? 'Before' : 'Antes'}</strong> {codexLang === 'en' ? 'the conjugated verb:' : 'del verbo conjugado:'} <em>Ella <u>se lo</u> va a decir.</em>
                          <br />
                          • <strong>{codexLang === 'en' ? 'Attached' : 'Unidos'}</strong> {codexLang === 'en' ? 'at the end:' : 'al final:'} <em>Ella va a decír<u>selo</u>.</em> {codexLang === 'en' ? '(Requires an accent mark to maintain original stress!)' : '(¡Requiere tilde para mantener la pronunciación original!)'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* DOP vs IOP Summary Banner */}
                <div style={{
                  background: 'rgba(168, 85, 247, 0.08)',
                  border: '1px solid rgba(168, 85, 247, 0.25)',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  fontSize: '0.8rem',
                  lineHeight: '1.45',
                  marginTop: '10px'
                }}>
                  <strong style={{ color: '#c084fc' }}>
                    {codexLang === 'en' ? '💡 Direct vs Indirect Object Summary:' : '💡 ¿Objeto Directo o Indirecto?:'}
                  </strong>
                  <br />
                  • <strong>{codexLang === 'en' ? 'Direct (lo/la/los/las):' : 'Directo (lo/la/los/las):'}</strong> {codexLang === 'en' ? 'What or whom receives the action?' : '¿Qué o a quién?'} <em>({codexLang === 'en' ? 'I see the hotel → Lo veo' : 'Veo el hotel → Lo veo'})</em>.
                  <br />
                  • <strong>{codexLang === 'en' ? 'Indirect (me/te/le/nos/os/les):' : 'Indirecto (me/te/le/nos/os/les):'}</strong> {codexLang === 'en' ? 'Who benefits or receives?' : '¿A quién le beneficia?'} <em>({codexLang === 'en' ? 'I gave the key to the guest → Le di la llave al cliente' : 'Le di la llave al cliente'})</em>.
                </div>
              </div>
            ) : isGustarVerb(codexVerb) ? (
              <div>
                <div style={{ 
                  background: 'rgba(234, 179, 8, 0.12)', 
                  border: '1px solid rgba(234, 179, 8, 0.35)', 
                  borderRadius: '10px', 
                  padding: '10px 12px', 
                  fontSize: '0.82rem', 
                  marginBottom: '14px', 
                  color: '#fef08a',
                  lineHeight: '1.4'
                }}>
                  {codexLang === 'en' ? (
                    <>
                      ⚠️ <strong>Golden Rule!</strong> The verb <em>gustar</em> is <strong>NOT</strong> conjugated by the person who likes something (never say <em>"yo gusto"</em> for <em>"I like"</em>).
                      <br />
                      It only has <strong>TWO forms</strong>:
                      <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
                        <li><strong>Singular:</strong> for singular things or infinitive verbs.</li>
                        <li><strong>Plural:</strong> for plural things or nouns.</li>
                      </ul>
                    </>
                  ) : (
                    <>
                      ⚠️ <strong>¡Regla de Oro!</strong> El verbo <em>gustar</em> <strong>NO</strong> se conjuga por la persona que siente el gusto (nunca se dice <em>"yo gusto"</em> para <em>I like</em>).
                      <br />
                      Solo tiene <strong>DOS formas</strong>:
                      <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
                        <li><strong>Singular:</strong> para cosas singulares o verbos infinitivos.</li>
                        <li><strong>Plural:</strong> para cosas o sustantivos en plural.</li>
                      </ul>
                    </>
                  )}
                </div>

                {/* 2 Forms display */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px', textAlign: 'center' }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 8px', borderRadius: '10px', border: '1px solid var(--card-border)' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
                      {codexLang === 'en' ? 'Singular Thing or Verb' : 'Cosa Singular o Verbo'}
                    </span>
                    <strong style={{ fontSize: '1.4rem', color: 'var(--primary)', display: 'block', margin: '4px 0' }}>
                      {codexTense === 'imperfect' ? 'gustaba' : (codexTense === 'preterite' ? 'gustó' : 'gusta')}
                    </strong>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                      {codexTense === 'imperfect'
                        ? (codexLang === 'en' ? 'e.g. De niño me gustaba jugar' : 'ej: De niño me gustaba jugar')
                        : (codexTense === 'preterite' 
                          ? (codexLang === 'en' ? 'e.g. Me gustó la fiesta' : 'ej: Me gustó la fiesta') 
                          : (codexLang === 'en' ? 'e.g. Me gusta el café / bailar' : 'ej: Me gusta el café / bailar'))}
                    </span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 8px', borderRadius: '10px', border: '1px solid var(--card-border)' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
                      {codexLang === 'en' ? 'Plural Things' : 'Cosas Plurales'}
                    </span>
                    <strong style={{ fontSize: '1.4rem', color: 'var(--accent)', display: 'block', margin: '4px 0' }}>
                      {codexTense === 'imperfect' ? 'gustaban' : (codexTense === 'preterite' ? 'gustaron' : 'gustan')}
                    </strong>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                      {codexTense === 'imperfect'
                        ? (codexLang === 'en' ? 'e.g. Me gustaban los dibujos animados' : 'ej: Me gustaban los dibujos animados')
                        : (codexTense === 'preterite' 
                          ? (codexLang === 'en' ? 'e.g. Me gustaron las fotos' : 'ej: Me gustaron las fotos') 
                          : (codexLang === 'en' ? 'e.g. Nos gustan los libros' : 'ej: Nos gustan los libros'))}
                    </span>
                  </div>
                </div>

                {/* Pronouns list */}
                <h4 style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px', fontWeight: 700 }}>
                  {codexLang === 'en' ? 'Indirect Object Pronouns (Who likes it?):' : 'Pronombres de Objeto Indirecto (¿A quién le gusta?):'}
                </h4>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left', marginBottom: '10px' }}>
                  <tbody>
                    {INDIRECT_OBJECT_PRONOUNS.map((p, idx) => {
                      const isVosotros = idx === 4;
                      const singForm = codexTense === 'imperfect' ? 'gustaba' : (codexTense === 'preterite' ? 'gustó' : 'gusta');
                      const plurForm = codexTense === 'imperfect' ? 'gustaban' : (codexTense === 'preterite' ? 'gustaron' : 'gustan');
                      return (
                        <tr 
                          key={idx} 
                          style={{ 
                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                            opacity: isVosotros && state.excludeVosotros ? 0.6 : 1
                          }}
                        >
                          <td style={{ padding: '6px 8px', color: 'var(--text-secondary)' }}>
                            {p.pronoun} <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>({p.translation})</span>
                          </td>
                          <td style={{ padding: '6px 8px', color: 'var(--text-primary)', fontWeight: 600 }}>
                            <span style={{ color: 'var(--gold)' }}>{p.iop}</span> {singForm} / {plurForm}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : isReciprocalVerb(codexVerb) ? (
              <div>
                <div style={{ 
                  background: 'rgba(236, 72, 153, 0.12)', 
                  border: '1px solid rgba(236, 72, 153, 0.35)', 
                  borderRadius: '10px', 
                  padding: '10px 12px', 
                  fontSize: '0.82rem', 
                  marginBottom: '14px', 
                  color: '#fbcfe8',
                  lineHeight: '1.45'
                }}>
                  {codexLang === 'en' ? (
                    <>
                      🤝 <strong>Reciprocal Verbs Rule! (Mutual Action: "Each Other")</strong>
                      <br />
                      Reciprocal actions describe actions that two or more people perform on <strong>one another</strong>.
                      <br />
                      By definition, they are <strong>only conjugated in PLURAL persons</strong>:
                    </>
                  ) : (
                    <>
                      🤝 <strong>¡Regla de los Verbos Recíprocos! (Acción Mutua: "Each Other")</strong>
                      <br />
                      Las acciones recíprocas describen acciones que dos o más personas se hacen <strong>mutuamente</strong>.
                      <br />
                      Por definición, <strong>solo se conjugan en las personas del PLURAL</strong>:
                    </>
                  )}
                </div>

                {/* Plural Conjugation Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left', marginBottom: '14px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <th style={{ padding: '8px 10px', color: 'var(--text-secondary)' }}>{codexLang === 'en' ? 'Plural Pronoun' : 'Pronombre Plural'}</th>
                      <th style={{ padding: '8px 10px', color: '#f472b6', fontWeight: 'bold' }}>
                        {codexTense === 'imperfect'
                          ? (codexLang === 'en' ? 'Imperfect Form (Habitual mutual action)' : 'Forma Imperfecto (Acción mutua habitual)')
                          : (codexTense === 'preterite' 
                            ? (codexLang === 'en' ? 'Preterite Form (Past mutual action)' : 'Forma Pretérito (Acción mutua pasada)') 
                            : (codexLang === 'en' ? 'Present Form (Mutual action)' : 'Forma Presente (Acción mutua)'))}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { pronoun: "nosotros / nosotras", translation: "we — each other", idx: 3 },
                      { pronoun: "vosotros / vosotras", translation: "you all — each other (Spain)", idx: 4 },
                      { pronoun: "ellos / ellas / ustedes", translation: "they / you all — each other", idx: 5 }
                    ].map((p) => {
                      const conjugated = conjugate(codexVerb, p.idx, codexTense);
                      const isVosotros = p.idx === 4;
                      return (
                        <tr 
                          key={p.idx} 
                          style={{ 
                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                            opacity: isVosotros && state.excludeVosotros ? 0.6 : 1
                          }}
                        >
                          <td style={{ padding: '8px 10px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                            {p.pronoun} <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>({p.translation})</span>
                          </td>
                          <td style={{ padding: '8px 10px', color: 'var(--text-primary)', fontWeight: 600 }}>
                            <span style={{ color: '#f472b6' }}>{conjugated}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Direct Object Callout */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  padding: '12px',
                  fontSize: '0.82rem',
                  lineHeight: '1.5'
                }}>
                  <h4 style={{ color: 'var(--gold)', fontSize: '0.88rem', margin: '0 0 6px 0', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {codexLang === 'en' ? '❓ Why does "yo me beso" not exist? (The Direct Object)' : '❓ ¿Por qué no existe "yo me beso"? (El Objeto Directo)'}
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', margin: '0 0 10px 0' }}>
                    {codexLang === 'en' 
                      ? <>Saying <em>"me beso"</em> would literally mean <em>"I kiss myself"</em>. For an individual action directed towards another person, the verb is neither reciprocal nor reflexive: it is a transitive verb that takes a <strong>Direct Object</strong>:</>
                      : <>Decir <em>"me beso"</em> significaría literalmente <em>"I kiss myself"</em>. Para una acción individual hacia otra persona, el verbo ya no es recíproco ni reflexivo: es un verbo transitivo que toma un <strong>Objeto Directo</strong>:</>}
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ background: 'rgba(0,0,0,0.25)', padding: '6px 10px', borderRadius: '6px' }}>
                      <strong style={{ color: 'var(--primary)' }}>
                        {codexLang === 'en' ? '1. With Personal "a":' : '1. Con "a" personal:'}
                      </strong>{' '}
                      <em>Yo beso <u>a mi abuela</u>.</em> / <em>Tú ayudas <u>a tus compañeros</u>.</em>
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.25)', padding: '6px 10px', borderRadius: '6px' }}>
                      <strong style={{ color: 'var(--accent)' }}>
                        {codexLang === 'en' ? '2. With Direct Object Pronoun:' : '2. Con Pronombre de Objeto Directo:'}
                      </strong>{' '}
                      <em>Yo <u>la</u> beso.</em> / <em>Él <u>me</u> besa.</em> 
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>
                        {codexLang === 'en' 
                          ? '(In "Él me besa", "me" is the direct object [he kisses me], not a reflexive pronoun)' 
                          : '(En "Él me besa", me es el objeto directo [a mí], no un pronombre reflexivo)'}
                      </span>
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.25)', padding: '6px 10px', borderRadius: '6px' }}>
                      <strong style={{ color: 'var(--gold)' }}>
                        {codexLang === 'en' ? '3. With Body Parts or Clothing:' : '3. Con partes del cuerpo o ropa:'}
                      </strong>{' '}
                      <em>Me lavo <u>las manos</u>.</em> / <em>Se cepilla <u>los dientes</u>.</em>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>
                        {codexLang === 'en' ? '(Here "las manos" and "los dientes" are the direct object)' : '(Aquí las manos y los dientes son el objeto directo)'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Conjugated vs Infinitive Callout */}
                <div style={{
                  background: 'rgba(59, 130, 246, 0.08)',
                  border: '1px solid rgba(59, 130, 246, 0.25)',
                  borderRadius: '10px',
                  padding: '12px',
                  marginTop: '12px',
                  fontSize: '0.82rem',
                  lineHeight: '1.5'
                }}>
                  <h4 style={{ color: '#60a5fa', fontSize: '0.88rem', margin: '0 0 6px 0', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {codexLang === 'en' ? '🔄 When to use "-rse" (infinitive) vs "se ...n" (conjugated)?' : '🔄 ¿Cuándo usar "-rse" (infinitivo) vs "se ...n" (conjugado)?'}
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', margin: '0 0 8px 0' }}>
                    {codexLang === 'en' 
                      ? 'Both forms are correct and essential in Spanish! The choice depends on sentence structure:' 
                      : '¡Ambas formas son correctas y esenciales en español! La elección depende de la estructura de la frase:'}
                  </p>
                  
                  {(() => {
                    const cleanBase = parseVerb(codexVerb).base;
                    const infSe = cleanBase.endsWith("se") ? cleanBase : `${cleanBase}se`;
                    const theyForm = conjugate(codexVerb, 5, "present");
                    return (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ background: 'rgba(0,0,0,0.25)', padding: '6px 10px', borderRadius: '6px' }}>
                          <strong style={{ color: '#93c5fd' }}>
                            {codexLang === 'en' ? `1. Main Conjugated Verb (${theyForm}):` : `1. Verbo Principal Conjugado (${theyForm}):`}
                          </strong>
                          <br />
                          {codexLang === 'en' ? 'When the verb is the direct action of the sentence:' : 'Cuando el verbo es la acción directa de la oración:'}
                          <br />
                          <em>Los dos amigos <u>{theyForm}</u> todos los días.</em>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.25)', padding: '6px 10px', borderRadius: '6px' }}>
                          <strong style={{ color: '#93c5fd' }}>
                            {codexLang === 'en' ? `2. With Auxiliary Verb or Verbal Periphrasis (${infSe}):` : `2. Con Verbo Auxiliar o Perífrasis (${infSe}):`}
                          </strong>
                          <br />
                          {codexLang === 'en' 
                            ? 'When following verbs like ir a, querer, preferir, poder, deber, the pronoun attaches to the infinitive:' 
                            : 'Cuando sigue a verbos como ir a, querer, preferir, poder, deber, el pronombre se une al infinitivo:'}
                          <br />
                          <em>Ellos van a <u>{infSe}</u>.</em> / <em>Ellos quieren <u>{infSe}</u>.</em>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>
                            {codexLang === 'en' 
                              ? `(Can also be placed before the first verb: "Se van a ${cleanBase}")` 
                              : `(También se puede colocar antes del primer verbo: "Se van a ${cleanBase}")`}
                          </span>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.25)', padding: '6px 10px', borderRadius: '6px' }}>
                          <strong style={{ color: '#93c5fd' }}>
                            {codexLang === 'en' ? `3. After Prepositions (${infSe}):` : `3. Después de Preposiciones (${infSe}):`}
                          </strong>
                          <br />
                          {codexLang === 'en' 
                            ? 'In Spanish, after a preposition the verb is ALWAYS in the infinitive with the pronoun attached:' 
                            : 'En español, después de una preposición el verbo SIEMPRE va en infinitivo con el pronombre unido:'}
                          <br />
                          <em>Antes de <u>{infSe}</u>, hablaron un momento.</em>
                          <br />
                          <em>Corrieron para <u>{infSe}</u> con alegría.</em>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.25)', padding: '6px 10px', borderRadius: '6px' }}>
                          <strong style={{ color: '#93c5fd' }}>
                            {codexLang === 'en' ? `4. With Gustar / Encantar and Impersonal Phrases:` : `4. Con Gustar / Encantar y Frases Impersonales:`}
                          </strong>
                          <br />
                          <em>A ellos les gusta <u>{infSe}</u>.</em> / <em>Es importante <u>{infSe}</u>.</em>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <th style={{ padding: '8px 10px', color: 'var(--text-secondary)' }}>{codexLang === 'en' ? 'Pronoun' : 'Pronombre'}</th>
                    <th style={{ padding: '8px 10px', color: 'var(--primary)', fontWeight: 'bold' }}>
                      {codexTense === 'imperfect'
                        ? (codexLang === 'en' ? 'Imperfect Form' : 'Forma Imperfecto')
                        : (codexTense === 'preterite' 
                          ? (codexLang === 'en' ? 'Preterite Form' : 'Forma Pretérito') 
                          : (codexLang === 'en' ? 'Present Form' : 'Forma Presente'))}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { pronoun: "yo", translation: "I" },
                    { pronoun: "tú", translation: "you (inf)" },
                    { pronoun: "él / ella / usted", translation: "he/she/you (formal)" },
                    { pronoun: "nosotros / nosotras", translation: "we" },
                    { pronoun: "vosotros / vosotras", translation: "you all (Spain)" },
                    { pronoun: "ellos / ellas / ustedes", translation: "they/you all" }
                  ].map((p, idx) => {
                    const conjugated = conjugate(codexVerb, idx, codexTense);
                    const isVosotros = idx === 4;
                    const catInfo = getVerbCategoryInfo(codexVerb, codexTense);
                    const catId = catInfo?.categoryId;
                    const isImperfect = codexTense === 'imperfect';
                    const isPreterite = codexTense === 'preterite';
                    const baseVerb = parseVerb(codexVerb).base.toLowerCase();
                    
                    let isIrregularForm = false;
                    let irregularTag = null;
                    let highlightColor = catInfo?.category?.color || '#38bdf8';

                    if (isImperfect) {
                      if (catId === 'imp_irregulars') {
                        isIrregularForm = true;
                        irregularTag = 'irregular imperfect';
                        highlightColor = '#ec4899';
                      } else if (catId === 'imp_ar' && idx === 3) {
                        isIrregularForm = true;
                        irregularTag = '-ábamos';
                        highlightColor = '#a855f7';
                      } else if (catId === 'imp_er_ir') {
                        isIrregularForm = true;
                        irregularTag = '-ía accent';
                        highlightColor = '#818cf8';
                      }
                    } else if (isPreterite) {
                      if (catId === 'spell_change' && idx === 0) {
                        isIrregularForm = true;
                        irregularTag = catInfo?.subcategoryId === 'car' ? 'c ➔ qu' : catInfo?.subcategoryId === 'gar' ? 'g ➔ gu' : 'z ➔ c';
                        highlightColor = '#ec4899';
                      } else if ((catId === 'sandal' || catId === 'stem_change') && (idx === 2 || idx === 5)) {
                        isIrregularForm = true;
                        irregularTag = catInfo?.subcategoryId === 'sandal_ou' ? 'sandal: o ➔ u' : 'sandal: e ➔ i';
                        highlightColor = '#a855f7';
                      } else if (catId === 'j_group' && idx === 5) {
                        isIrregularForm = true;
                        irregularTag = "-eron (drops 'i')";
                        highlightColor = '#f97316';
                      } else if (catId === 'j_group' || catId === 'u_group' || catId === 'i_group') {
                        isIrregularForm = true;
                        if (idx === 0 || idx === 2) irregularTag = 'no accent';
                        highlightColor = catInfo?.category?.color || '#3b82f6';
                      } else if (catId === 'twin_verbs') {
                        isIrregularForm = true;
                        highlightColor = '#06b6d4';
                      } else if (catId === 'double_vowel' && (idx === 2 || idx === 5)) {
                        isIrregularForm = true;
                        irregularTag = 'i ➔ y';
                        highlightColor = '#818cf8';
                      }
                    } else {
                      // Present tense
                      if ((catId === 'boot_stem_change' || catId === 'stem_change') && idx !== 3 && idx !== 4) {
                        isIrregularForm = true;
                        irregularTag = catInfo?.subcategoryId === 'boot_e_ie' ? 'e ➔ ie' : catInfo?.subcategoryId === 'boot_o_ue' ? 'o ➔ ue' : catInfo?.subcategoryId === 'boot_e_i' ? 'e ➔ i' : 'boot change';
                        highlightColor = '#a855f7';
                      } else if (catId === 'yo_go') {
                        if (idx === 0) {
                          isIrregularForm = true;
                          irregularTag = 'yo en -go';
                          highlightColor = '#f59e0b';
                        } else if (idx !== 3 && idx !== 4 && (baseVerb === 'tener' || baseVerb === 'venir' || baseVerb === 'decir' || baseVerb === 'oír')) {
                          isIrregularForm = true;
                          irregularTag = baseVerb === 'decir' ? 'e ➔ i' : baseVerb === 'oír' ? 'y' : 'e ➔ ie';
                          highlightColor = '#a855f7';
                        }
                      } else if (catId === 'yo_zco') {
                        if (idx === 0) {
                          isIrregularForm = true;
                          irregularTag = 'c ➔ zc';
                          highlightColor = '#8b5cf6';
                        }
                      } else if (catId === 'core_irregulars') {
                        isIrregularForm = true;
                        highlightColor = '#06b6d4';
                        if (baseVerb === 'saber' && idx === 0) irregularTag = 'sé';
                        else if (baseVerb === 'estar' && idx === 0) irregularTag = 'estoy';
                        else if (baseVerb === 'estar' && (idx === 1 || idx === 2 || idx === 5)) irregularTag = 'accent mark';
                        else if (baseVerb === 'ir' || baseVerb === 'ser') irregularTag = 'irregular';
                        else if (idx === 0) irregularTag = 'irregular yo';
                      }
                    }

                    return (
                      <tr 
                        key={idx} 
                        style={{ 
                          borderBottom: '1px solid rgba(255,255,255,0.05)',
                          opacity: isVosotros && state.excludeVosotros ? 0.6 : 1,
                          background: isIrregularForm ? `${highlightColor}08` : 'transparent'
                        }}
                      >
                        <td style={{ padding: '8px 10px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                          {p.pronoun} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({p.translation})</span>
                        </td>
                        <td style={{ padding: '8px 10px', color: 'var(--text-primary)', fontWeight: 600 }}>
                          <span style={{ 
                            color: isIrregularForm ? highlightColor : 'var(--text-primary)',
                            fontWeight: isIrregularForm ? 700 : 600
                          }}>
                            {conjugated}
                          </span>
                          {irregularTag && (
                            <span style={{ 
                              marginLeft: '8px', 
                              fontSize: '0.68rem', 
                              color: highlightColor, 
                              background: `${highlightColor}18`, 
                              border: `1px solid ${highlightColor}35`,
                              padding: '1px 6px', 
                              borderRadius: '4px',
                              fontWeight: 600,
                              display: 'inline-block'
                            }}>
                              {irregularTag}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            
            <button className="btn btn-secondary" onClick={() => setCodexVerb(null)} style={{ marginTop: '18px', width: '100%' }}>
              {codexLang === 'en' ? 'Close Codex' : 'Cerrar Codex'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
