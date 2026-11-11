import React, { useState, useEffect, useRef } from 'react';
import vocabularyData from '../data/vocabulary.json';
import { STAGES, formatEnglishPrompt } from '../utils/difficultyMapper';
import { 
  generateConjugationQuestion, 
  generateFillInTheBlank, 
  conjugate,
  isVerbItem,
  parseVerb,
  isGustarVerb,
  isReciprocalVerb,
  isPreteriteTense,
  INDIRECT_OBJECT_PRONOUNS
} from '../utils/conjugationHelper';
import { speakSpanish as speakSpanishUtil } from '../utils/speechHelper';
import { generateSentenceBuilderQuestion } from '../utils/sentenceBuilderHelper';
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
  Play
} from 'lucide-react';

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
  markFlashcardsSeen, 
  addMistake, 
  updateWordMastery, 
  toggleAutoSpeak, 
  setView, 
  defaultTab = "quest" 
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    setActiveTab(defaultTab);
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
  const [isListening, setIsListening] = useState(false);
  
  const questInputRef = useRef(null);
  const practiceInputRef = useRef(null);

  const openCodex = (verbItemOrString) => {
    const verbStr = typeof verbItemOrString === 'string' ? verbItemOrString : (verbItemOrString?.spanish || "");
    setCodexVerb(verbStr);
    const isPreterite = typeof verbItemOrString === 'object' && verbItemOrString !== null
      ? (verbItemOrString.subcategory?.includes("Pretérito") || verbItemOrString.unit?.includes("Unit 3") || verbItemOrString.unit?.includes("Unit 4") || verbItemOrString.english?.toLowerCase().includes("preterite") || verbItemOrString.english?.toLowerCase().includes("(past)"))
      : /fui|hice|tuve|estuve|pude|puse|supe|vine|dije|traje|di|vi/i.test(verbStr);
    setCodexTense(isPreterite ? "preterite" : "present");
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
    // 1. Repaso 101
    formatted["Repaso 101"] = [
      "All of Unit 1 (Todo el Repaso)",
      ...Array.from(all101Subcategories)
    ];

    // 2. Unidad 2
    if (grouped["Unidad 2"]) {
      formatted["Unidad 2"] = [
        "All of Unit 2 (Todo Unidad 2)",
        ...Array.from(grouped["Unidad 2"])
      ];
    }

    // 3. Unidad 3
    if (grouped["Unidad 3"]) {
      formatted["Unidad 3"] = [
        "All of Unit 3 (Todo Unidad 3)",
        ...Array.from(grouped["Unidad 3"])
      ];
    }

    // 4. Unidad 4
    if (grouped["Unidad 4"]) {
      formatted["Unidad 4"] = [
        "All of Unit 4 (Todo Unidad 4)",
        ...Array.from(grouped["Unidad 4"])
      ];
    }

    // 5-8. Coming soon units
    for (let u = 5; u <= 8; u++) {
      const catKey = `Unidad ${u}`;
      const displayKey = `Unidad ${u} (Próximamente)`;
      if (grouped[catKey]) {
        formatted[displayKey] = Array.from(grouped[catKey]);
      }
    }

    // 9. Part-of-speech categories
    const posKeys = ["Nouns", "Verbs", "Adjectives", "Grammar & Conversation", "Sentences"];
    posKeys.forEach(cat => {
      if (grouped[cat]) {
        formatted[cat] = Array.from(grouped[cat]);
      }
    });

    // Fallback for any other categories
    const handledKeys = new Set([
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
    if (state.fainted && questStarted) {
      setQuestStarted(false);
      const finalMissed = [...questMissedQuestions];
      if (currentQuestQ && !finalMissed.some(q => q.questionWord === currentQuestQ.questionWord)) {
        finalMissed.push(currentQuestQ);
      }
      setRedemptionQuestions(finalMissed);
      setRedemptionActive(true);

      setQuestFinished(false);
      setRedemptionCurrentIdx(0);
      setRedemptionTyped("");
      setRedemptionAnswered(false);
      setRedemptionSelected(null);
      setRedemptionScore(0);
      setRedemptionFailed(false);
      setRedemptionSuccess(false);
      setComboCount(0);
    }
  }, [state.fainted, questStarted]);

  // Autoplay TTS for card introductions
  useEffect(() => {
    if (questStarted && currentQuestQ && currentQuestQ.isCardIntro && state.autoSpeak) {
      if (!questFlipped) {
        speakSpanish(currentQuestQ.item.spanish);
      }
    }
  }, [questStarted, questCurrentIdx, questFlipped]);

  // Filter free practice cards when category changes
  useEffect(() => {
    if (!selectedSubcategory) return;
    let filtered;
    if (selectedCategory === "Repaso 101") {
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
    setPracticeCards(filtered);
    setPracticeCurrentIdx(0);
    setPracticeFlipped(false);
    setPracticeQuizStarted(false);
    setPracticeQuizFinished(false);
  }, [selectedCategory, selectedSubcategory]);

  const handleCategoryChange = (e) => {
    const cat = e.target.value;
    setSelectedCategory(cat);
    if (practiceCategories[cat] && practiceCategories[cat].length > 0) {
      setSelectedSubcategory(practiceCategories[cat][0]);
    }
  };

  const subcategories = practiceCategories[selectedCategory] || [];

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
        hint: fillSpec.hint
      };
    }

    const isVerb = isVerbItem(item);

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
    const answeredCorrectlyBefore = state.wordsAnsweredCorrectly?.includes(item.spanish);

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

  const startQuestLevel = () => {
    initAudio();
    const activeStage = STAGES[state.questStage];
    if (!activeStage) return;

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
      const rating = wordMastery[item.spanish] !== undefined ? wordMastery[item.spanish] : 2;
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
        if (!seen.has(x.spanish)) {
          result.push(x);
          seen.add(x.spanish);
        }
        if (result.length === count) break;
      }
      return result;
    };

    const stageItems = getUniqueItems(weightedItems, stageItemsRaw.length);

    const levelVal = state.questLevel;
    const seenWords = state.stageFlashcardsSeen || [];
    const unseenStageItems = stageItems.filter(item => !seenWords.includes(item.spanish));

    const targetCardCount = state.isReviewReady ? 0 : Math.max(1, 16 - Math.floor((levelVal - 1) * 0.85));
    const cardCount = Math.min(targetCardCount, unseenStageItems.length);
    const quizCount = 20 - cardCount;

    let finalQuestions = [];
    const selectedFlashcards = [];

    if (cardCount > 0) {
      unseenStageItems.sort(() => Math.random() - 0.5);
      const takeUnseen = unseenStageItems.slice(0, cardCount);
      selectedFlashcards.push(...takeUnseen);

      const newlySeen = takeUnseen.map(item => item.spanish);
      if (newlySeen.length > 0 && markFlashcardsSeen) {
        markFlashcardsSeen(newlySeen);
      }
    }

    const cardSteps = selectedFlashcards.map(item => ({
      item,
      isCardIntro: true
    }));

    const currentlyIntroduced = selectedFlashcards.map(item => item.spanish);
    const eligibleStageItems = stageItems.filter(item => 
      seenWords.includes(item.spanish) || currentlyIntroduced.includes(item.spanish)
    );

    const stageQuizPool = eligibleStageItems.length > 0 
      ? eligibleStageItems 
      : (selectedFlashcards.length > 0 ? selectedFlashcards : stageItems.slice(0, 5));

    let quizItems = [];
    if (state.isReviewReady) {
      const pool = eligibleStageItems.length > 0 ? eligibleStageItems : stageItems;
      const shuffledStage = [...pool].sort(() => Math.random() - 0.5);
      quizItems = shuffledStage.slice(0, 20);
      
      while (quizItems.length < 20 && pool.length > 0) {
        const needed = 20 - quizItems.length;
        const extra = [...pool].sort(() => Math.random() - 0.5).slice(0, needed);
        quizItems = [...quizItems, ...extra];
      }
    } else {
      const currentQuizCount = Math.ceil(quizCount * 0.7);
      const reviewQuizCount = quizCount - currentQuizCount;

      let reviewQuizItems = [];
      // Only review prior 102 stages (Stage 2+) during later lessons so 101 words are not repeated
      if (state.questStage > 2 && reviewQuizCount > 0) {
        const pastSubcategories = [];
        for (let s = 2; s < state.questStage; s++) {
          if (STAGES[s]?.subcategories) {
            pastSubcategories.push(...STAGES[s].subcategories);
          }
        }
        const pastItems = vocabularyData.filter(item => 
          pastSubcategories.includes(item.subcategory)
        );
        // Only review past 102 words that the user has already answered correctly or seen
        const knownPast = pastItems.filter(item => 
          state.wordsAnsweredCorrectly?.includes(item.spanish) ||
          state.stageFlashcardsSeen?.includes(item.spanish)
        );
        if (knownPast.length > 0) {
          reviewQuizItems = [...knownPast].sort(() => Math.random() - 0.5).slice(0, reviewQuizCount);
        }
      }

      // Fill remaining quiz items from stageQuizPool (words already introduced/seen)
      const neededCurrent = quizCount - reviewQuizItems.length;
      let filledCurrent = [];
      while (filledCurrent.length < neededCurrent && stageQuizPool.length > 0) {
        const needed = neededCurrent - filledCurrent.length;
        const extra = [...stageQuizPool].sort(() => Math.random() - 0.5).slice(0, needed);
        filledCurrent = [...filledCurrent, ...extra];
      }

      quizItems = [...filledCurrent, ...reviewQuizItems];
    }

    const isWordKnownForConjugation = (word) => {
      return (state.stageFlashcardsSeen || []).includes(word) || (state.wordsAnsweredCorrectly || []).includes(word);
    };

    const quizSteps = quizItems.map(item => buildProgressiveQuizStep(item, levelVal, isWordKnownForConjugation(item.spanish)));
    const shuffledQuizSteps = [...quizSteps].sort(() => Math.random() - 0.5);

    // CRITICAL: Present all flashcard learning introductions FIRST.
    // The user will NEVER encounter a quiz question before seeing the flashcard that teaches it!
    finalQuestions = [...cardSteps, ...shuffledQuizSteps];

    // Ensure exactly 20 items if possible, backfilling ONLY from verified seen/introduced words
    if (finalQuestions.length < 20 && stageQuizPool.length > 0) {
      while (finalQuestions.length < 20) {
        const needed = 20 - finalQuestions.length;
        const extra = [...stageQuizPool].sort(() => Math.random() - 0.5).slice(0, needed);
        const extraSteps = extra.map(item => buildProgressiveQuizStep(item, levelVal, isWordKnownForConjugation(item.spanish)));
        finalQuestions = [...finalQuestions, ...extraSteps];
      }
    } else if (finalQuestions.length > 20) {
      if (cardSteps.length < 20) {
        finalQuestions = [...cardSteps, ...shuffledQuizSteps.slice(0, 20 - cardSteps.length)];
      } else {
        finalQuestions = finalQuestions.slice(0, 20);
      }
    }

    setQuestQuestions(finalQuestions);
    setQuestCurrentIdx(0);
    setQuestScore(0);
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
  const handleQuestSubmitTyped = (e) => {
    e.preventDefault();
    if (questAnswered || !typedAnswer.trim()) return;
    setQuestAnswered(true);

    const currentQ = questQuestions[questCurrentIdx];
    const correctStr = currentQ.correct;
    const userStr = typedAnswer;
    const isCorrect = compareAnswers(correctStr, userStr);

    if (isCorrect) {
      setQuestScore(prev => prev + 1);
      setQuestSelected(correctStr);
      setHealTrigger(true);
      playSound('correct');
      
      // Update Leitner SRS
      if (updateWordMastery && currentQ.item) {
        updateWordMastery(currentQ.item.spanish, true);
      }

      // Combo count increment
      setComboCount(prev => {
        const next = prev + 1;
        setMaxCombo(m => Math.max(m, next));
        return next;
      });

      if (recordWordAnsweredCorrectly && currentQ.item) {
        recordWordAnsweredCorrectly(currentQ.item.spanish);
      }
      setTimeout(() => setHealTrigger(false), 500);
    } else {
      setQuestSelected(userStr);
      setShakeTrigger(true);
      playSound('wrong');
      
      setComboCount(0); // reset combo

      // Update Leitner SRS
      if (updateWordMastery && currentQ.item) {
        updateWordMastery(currentQ.item.spanish, false);
      }

      setQuestMissedQuestions(prev => {
        if (prev.some(q => q.questionWord === currentQ.questionWord)) return prev;
        return [...prev, currentQ];
      });

      if (addMistake && currentQ.item) {
        addMistake(currentQ.item.spanish);
      }

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
    const isCorrect = compareAnswers(correctStr, userStr);

    if (isCorrect) {
      setPracticeScore(prev => prev + 1);
      setPracticeSelected(correctStr);
      setHealTrigger(true);
      playSound('correct');
      if (updateWordMastery && currentQ.item) {
        updateWordMastery(currentQ.item.spanish, true);
      }
      setTimeout(() => setHealTrigger(false), 500);
    } else {
      setPracticeSelected(userStr);
      setShakeTrigger(true);
      playSound('wrong');
      if (updateWordMastery && currentQ.item) {
        updateWordMastery(currentQ.item.spanish, false);
      }
      if (addMistake && currentQ.item) {
        addMistake(currentQ.item.spanish);
      }
      if (!state.fainted) takeDamage(15);
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
      if (updateWordMastery && currentQ.item) {
        updateWordMastery(currentQ.item.spanish, true);
      }
      setTimeout(() => setHealTrigger(false), 500);
    } else {
      setShakeTrigger(true);
      playSound('wrong');
      if (updateWordMastery && currentQ.item) {
        updateWordMastery(currentQ.item.spanish, false);
      }
      if (addMistake && currentQ.item) {
        addMistake(currentQ.item.spanish);
      }
      if (!state.fainted) takeDamage(15);
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
      if (updateWordMastery && currentQ.item) {
        updateWordMastery(currentQ.item.spanish, true);
      }
      setTimeout(() => setHealTrigger(false), 500);
    } else {
      setShakeTrigger(true);
      playSound('wrong');
      if (updateWordMastery && currentQ.item) {
        updateWordMastery(currentQ.item.spanish, false);
      }
      if (addMistake && currentQ.item) {
        addMistake(currentQ.item.spanish);
      }
      if (!state.fainted) takeDamage(15);
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
      
      if (updateWordMastery && currentQ.item) {
        updateWordMastery(currentQ.item.spanish, true);
      }

      setComboCount(prev => {
        const next = prev + 1;
        setMaxCombo(m => Math.max(m, next));
        return next;
      });

      if (recordWordAnsweredCorrectly && currentQ.item) {
        recordWordAnsweredCorrectly(currentQ.item.spanish);
      }
      setTimeout(() => setHealTrigger(false), 500);
    } else {
      setShakeTrigger(true);
      playSound('wrong');
      setComboCount(0);

      if (updateWordMastery && currentQ.item) {
        updateWordMastery(currentQ.item.spanish, false);
      }

      setQuestMissedQuestions(prev => {
        if (prev.some(q => q.questionWord === currentQ.questionWord)) return prev;
        return [...prev, currentQ];
      });

      if (addMistake && currentQ.item) {
        addMistake(currentQ.item.spanish);
      }

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
      
      if (updateWordMastery && currentQ.item) {
        updateWordMastery(currentQ.item.spanish, true);
      }

      setComboCount(prev => {
        const next = prev + 1;
        setMaxCombo(m => Math.max(m, next));
        return next;
      });

      if (recordWordAnsweredCorrectly && currentQ.item) {
        recordWordAnsweredCorrectly(currentQ.item.spanish);
      }
      setTimeout(() => setHealTrigger(false), 500);
    } else {
      setShakeTrigger(true);
      playSound('wrong');
      setComboCount(0);

      if (updateWordMastery && currentQ.item) {
        updateWordMastery(currentQ.item.spanish, false);
      }

      setQuestMissedQuestions(prev => {
        if (prev.some(q => q.questionWord === currentQ.questionWord)) return prev;
        return [...prev, currentQ];
      });

      if (addMistake && currentQ.item) {
        addMistake(currentQ.item.spanish);
      }

      takeDamage(15);
      setTimeout(() => setShakeTrigger(false), 500);
    }
  };

  const handleQuestNext = () => {
    setQuestSelected(null);
    setQuestAnswered(false);
    setTypedAnswer("");
    
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
    const isCorrect = cleanAnswer(correctStr) === cleanAnswer(userStr);
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
  };

  const handleCancelRedemption = () => {
    setRedemptionActive(false);
    setQuestMissedQuestions([]);
  };

  const handleClaimRedemption = () => {
    revive(10);
    setRedemptionActive(false);
    setQuestMissedQuestions([]);
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

    let baseGoldReward = state.isReviewReady ? 50 : 12;
    let baseXpReward = state.isReviewReady ? 200 : 60;

    let totalGoldEarned = baseGoldReward;
    let totalXpEarned = baseXpReward;

    if (state.isReviewReady) {
      const passingRequired = Math.ceil(quizQuestionsCount * 0.8); // 80% Boss Review Gate
      const success = passStageReview(questScore, quizQuestionsCount);
      recordQuizPerformance(questScore, quizQuestionsCount);
      if (success) {
        if (comboMultiplier > 1.0) {
          const extraGold = Math.ceil(baseGoldReward * (comboMultiplier - 1));
          const extraXp = Math.ceil(baseXpReward * (comboMultiplier - 1));
          addGold(extraGold);
          addXp(extraXp);
          totalGoldEarned += extraGold;
          totalXpEarned += extraXp;
        }
        setQuestSuccessMsg(`¡Excelente! You passed the Review Gate with ${questScore}/${quizQuestionsCount} (${Math.round((questScore/quizQuestionsCount)*100)}%)! Gained ${totalGoldEarned} G & ${totalXpEarned} XP! Next stage unlocked! (Streak Combo Multiplier: ${comboMultiplier}x)`);
      } else {
        setQuestFailMsg(`Gate Failed! Boss reviews require 80% score or higher (${passingRequired}/${quizQuestionsCount}). Please practice and try again.`);
      }
    } else {
      const passingRequired = Math.ceil(quizQuestionsCount * 0.6);
      const success = advanceQuest(questScore, quizQuestionsCount);
      recordQuizPerformance(questScore, quizQuestionsCount);
      if (success) {
        if (comboMultiplier > 1.0) {
          const extraGold = Math.ceil(baseGoldReward * (comboMultiplier - 1));
          const extraXp = Math.ceil(baseXpReward * (comboMultiplier - 1));
          addGold(extraGold);
          addXp(extraXp);
          totalGoldEarned += extraGold;
          totalXpEarned += extraXp;
        }
        setQuestSuccessMsg(`Quest Level Cleared! You scored ${questScore}/${quizQuestionsCount} correct! Gained ${totalGoldEarned} G & ${totalXpEarned} XP. (Streak Combo Multiplier: ${comboMultiplier}x)`);
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

    let questions = [];

    if (practiceQuizMode === "mixed") {
      // MIX OF FLASHCARDS AND CONJUGATIONS (with translations for non-verbs)
      const verbItems = practiceCards.filter(item => isVerbItem(item));
      const otherItems = practiceCards.filter(item => !isVerbItem(item));

      // 1. Take up to 5 items as flashcards for study/review first
      const cardSource = verbItems.length >= 3 ? verbItems : practiceCards;
      const shuffledCards = [...cardSource].sort(() => Math.random() - 0.5);
      const cardBatch = shuffledCards.slice(0, Math.min(5, cardSource.length));

      const cardSteps = cardBatch.map(item => ({
        item,
        isCardIntro: true
      }));

      // 2. Conjugation & Translation Quiz challenges (6-8 questions)
      let quizItemsPool = [];
      if (verbItems.length > 0) {
        const shuffledVerbs = [...verbItems].sort(() => Math.random() - 0.5);
        quizItemsPool.push(...shuffledVerbs.slice(0, 6));
      }
      if (quizItemsPool.length < 6 && otherItems.length > 0) {
        const shuffledOther = [...otherItems].sort(() => Math.random() - 0.5);
        quizItemsPool.push(...shuffledOther.slice(0, 6 - quizItemsPool.length));
      }
      if (quizItemsPool.length === 0) {
        quizItemsPool = [...practiceCards].sort(() => Math.random() - 0.5).slice(0, 6);
      }

      const quizSteps = quizItemsPool.map(item => {
        const isVerb = isVerbItem(item);
        if (isVerb) {
          let chosenTense = practiceTense;
          if (chosenTense === "both") {
            chosenTense = Math.random() > 0.5 ? "present" : "preterite";
          } else if (chosenTense === "auto") {
            if (
              item.unit?.includes("Unit 3") || 
              item.unit?.includes("Unit 4") || 
              item.category === "Unidad 3" || 
              item.category === "Unidad 4" || 
              item.subcategory?.includes("Pretérito") ||
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
              isGustar: qSpec.isGustar,
              isReciprocal: qSpec.isReciprocal,
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

        const qType = Math.random() > 0.5 ? 0 : 1;
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

      questions = [...cardSteps, ...quizSteps, ...sentenceSteps];
    } else if (practiceQuizMode === "sentence") {
      questions = Array.from({ length: 8 }).map(() => {
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
        const verbPool = practiceCards.filter(item => isVerbItem(item));
        if (verbPool.length > 0) {
          pool = verbPool;
        }
      }

      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      const chosen = shuffled.slice(0, 10);

      questions = chosen.map(item => {
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
            hint: fillSpec.hint
          };
        }

        const isVerb = isVerbItem(item);
        const wantsConjugation = isVerb && practiceQuizMode === "conjugation";

        if (wantsConjugation) {
          let chosenTense = practiceTense;
          if (chosenTense === "both") {
            chosenTense = Math.random() > 0.5 ? "present" : "preterite";
          } else if (chosenTense === "auto") {
            if (
              item.unit?.includes("Unit 3") || 
              item.unit?.includes("Unit 4") || 
              item.category === "Unidad 3" || 
              item.category === "Unidad 4" || 
              item.subcategory?.includes("Pretérito") ||
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
              isGustar: qSpec.isGustar,
              isReciprocal: qSpec.isReciprocal,
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

        let qType = Math.floor(Math.random() * 3);
        if (qType === 2 && (item.spanish.includes("/") || item.spanish.includes("(") || item.spanish.length > 25)) {
          qType = Math.random() > 0.5 ? 0 : 1;
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
          questionWord: questionText,
          correct: correctVal,
          choices: choices
        };
      });
    }

    setPracticeQuestions(questions);
    setPracticeCurrentIdx(0);
    setPracticeScore(0);
    setPracticeAnswered(false);
    setPracticeSelected(null);
    setPracticeTyped("");
    setPracticeFlipped(false);
    setPracticeQuizFinished(false);
    setPracticeQuizStarted(true);
  };

  const handlePracticeNext = () => {
    setPracticeSelected(null);
    setPracticeAnswered(false);
    setPracticeTyped("");

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

  const activeStageSpec = STAGES[state.questStage];
  const maxStageProgress = 19;
  const stageProgressPct = Math.round((Math.min(19, state.questLevel - 1) / maxStageProgress) * 100);

  const currentQuestQ = questQuestions[questCurrentIdx];
  const shakeClass = shakeTrigger ? "shake damage-flash" : healTrigger ? "heal-flash" : "";

  const isQuestUserCorrect = questAnswered && currentQuestQ && (
    currentQuestQ.isSentenceBuilder
      ? questSelected?.trim().toLowerCase() === currentQuestQ.correct?.trim().toLowerCase()
      : compareAnswers(currentQuestQ.correct, questSelected)
  );
  const isPracticeUserCorrect = practiceAnswered && practiceQuestions[practiceCurrentIdx] && (
    practiceQuestions[practiceCurrentIdx].isSentenceBuilder
      ? practiceSelected?.trim().toLowerCase() === practiceQuestions[practiceCurrentIdx].correct?.trim().toLowerCase()
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
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.02)', padding: '6px 12px', borderRadius: '10px', border: '1px solid var(--card-border)' }}>
            <input 
              type="checkbox" 
              id="autoSpeakCheckbox" 
              checked={state.autoSpeak ?? true} 
              onChange={toggleAutoSpeak} 
              style={{ cursor: 'pointer', accentColor: 'var(--primary)' }}
            />
            <label htmlFor="autoSpeakCheckbox" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 600 }}>
              🔊 Auto-pronunciar
            </label>
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
              <Award size={48} color={questSuccessMsg ? "var(--accent)" : "var(--danger)"} style={{ margin: '0 auto 12px', animation: 'float 3s ease-in-out infinite' }} />
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
                {questSuccessMsg ? "¡Misión Cumplida!" : "Misión Fallida"}
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#e2e8f0', maxWidth: '500px', margin: '0 auto 16px', lineHeight: '1.4' }}>
                {questSuccessMsg || questFailMsg}
              </p>
              
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', width: 'fit-content', margin: '0 auto 20px', border: '1px solid var(--card-border)', display: 'flex', gap: '20px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Correct Challenges</span>
                  <strong style={{ fontSize: '1.4rem', color: 'var(--accent)' }}>{questScore} / {questQuestions.filter(q => !q.isCardIntro).length}</strong>
                </div>
                {questSuccessMsg && (
                  <>
                    <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }}></div>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Loot Gained</span>
                      <strong style={{ fontSize: '1.2rem', color: 'var(--gold)' }}>+{state.isReviewReady ? 50 : 12} Gold</strong>
                    </div>
                  </>
                )}
              </div>

              <button className="btn btn-primary" onClick={() => { setQuestFinished(false); startQuestLevel(); }}>
                {questSuccessMsg ? "Continue Next Quest" : "Retake Quest Level"}
              </button>
            </div>
          )}

          {!questFinished && activeStageSpec && (
            state.questStage >= 5 ? (
              <div className="glass-panel" style={{ padding: '36px 30px', maxWidth: '650px', margin: '0 auto', textAlign: 'center' }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '12px', animation: 'float 3s ease-in-out infinite' }}>⏳</div>
                
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--gold)', letterSpacing: '0.12em', fontWeight: 'bold' }}>
                  Campamento de Aprendizaje
                </span>
                <h3 style={{ fontSize: '1.9rem', fontFamily: 'var(--font-display)', margin: '6px 0 16px' }}>
                  Stage {state.questStage}: {activeStageSpec.name}
                </h3>

                <div style={{ background: 'rgba(0,0,0,0.15)', padding: '20px', borderRadius: '16px', textAlign: 'left', border: '1px solid var(--card-border)', marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>📚</span> Próximamente / Coming Soon in Class
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                    Units 5 through 8 will unlock as we cover them in class! In the meantime, you can sharpen your mastery with <strong>Práctica Libre (Free Practice)</strong> or revisit and review Units 1 through 4.
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => setActiveTab("practice")}
                    style={{ fontSize: '0.95rem', padding: '12px 24px' }}
                  >
                    Go to Free Practice <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="glass-panel" style={{ padding: '30px', maxWidth: '650px', margin: '0 auto', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '8px', animation: 'float 3s ease-in-out infinite' }}>🗺️</div>
                
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--gold)', letterSpacing: '0.1em', fontWeight: 'bold' }}>
                  Campamento de Aprendizaje
                </span>
                <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-display)', margin: '4px 0 16px' }}>
                  Stage {state.questStage}: {activeStageSpec.name}
                </h3>

                <div style={{ background: 'rgba(0,0,0,0.15)', padding: '16px 20px', borderRadius: '16px', textAlign: 'left', border: '1px solid var(--card-border)', marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '6px', fontWeight: 'bold' }}>
                    Unlocks Vocabulary:
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                    {activeStageSpec.subcategories.map(sub => (
                      <span key={sub} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600 }}>
                        {sub}
                      </span>
                    ))}
                  </div>

                  <div className="stat-row" style={{ margin: 0 }}>
                    <div className="stat-label">
                      <span>Stage Completion Progress</span>
                      <strong>{state.isReviewReady ? "100%" : `${stageProgressPct}%`}</strong>
                    </div>
                    <div className="progress-bar-outer" style={{ height: '8px' }}>
                      <div className="progress-bar-inner xp" style={{ width: state.isReviewReady ? '100%' : `${stageProgressPct}%` }}></div>
                    </div>
                  </div>
                </div>

                {state.isReviewReady ? (
                  <div style={{ background: 'rgba(239, 68, 68, 0.03)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '20px', borderRadius: '16px', marginBottom: '24px' }}>
                    <h4 style={{ color: 'var(--danger)', fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      🛡️ Stage Review Gate Active
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                      You have unlocked all content in Stage {state.questStage}! To level up to Stage {state.questStage + 1}, you must pass the Review Gate. <strong>Requires a strict 80% passing grade (16/20 or higher) to pass.</strong>
                    </p>
                  </div>
                ) : (
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.4' }}>
                    Quest Level {state.questLevel} of 19. Level quizzes mix safe flashcard previews with translation challenges. Score 12/20 to pass.
                  </p>
                )}

                {state.fainted ? (
                  <button className="btn btn-secondary" disabled style={{ opacity: 0.5 }}>
                    You are fainted. Visit the shop to heal!
                  </button>
                ) : (
                  <button 
                    className={`btn ${state.isReviewReady ? 'btn-danger' : 'btn-primary'}`} 
                    onClick={startQuestLevel}
                    style={{ width: '100%', maxWidth: '280px', margin: '0 auto', fontSize: '1rem', padding: '14px 20px' }}
                  >
                    {state.isReviewReady ? "Start Review Gate" : `Start Quest Level ${state.questLevel}`} <Play size={16} />
                  </button>
                )}
              </div>
            )
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
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Quest Stage {state.questStage} | Level {state.isReviewReady ? 'Review Gate' : state.questLevel}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
              <div 
                className="flashcard-wrapper"
                onClick={() => setQuestFlipped(!questFlipped)}
                style={{ height: '240px' }}
              >
                <div className={`flashcard ${questFlipped ? 'flipped' : ''}`}>
                  <div className="flashcard-face flashcard-front">
                    <span className="flashcard-category">Preview New Word (+2 XP)</span>
                    <h3 className="flashcard-term" style={{ fontSize: '2rem' }}>{currentQuestQ.item.spanish}</h3>
                    
                    {isVerbItem(currentQuestQ.item) && (
                      <button 
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={(e) => { e.stopPropagation(); openCodex(currentQuestQ.item); }}
                        style={{ position: 'absolute', top: '16px', right: '16px', padding: '6px 12px', fontSize: '0.75rem', gap: '4px' }}
                      >
                        📖 Codex
                      </button>
                    )}

                    {speechAvailable && (
                      <button 
                        className="btn btn-secondary"
                        onClick={(e) => { e.stopPropagation(); speakSpanish(currentQuestQ.item.spanish); }}
                        style={{ position: 'absolute', bottom: '60px', borderRadius: '50%', width: '40px', height: '40px', padding: 0 }}
                      >
                        <Volume2 size={16} color="var(--primary)" />
                      </button>
                    )}
                    <span className="flashcard-hint">Click card to reveal translation</span>
                  </div>

                  <div className="flashcard-face flashcard-back">
                    <span className="flashcard-category">Preview New Word (+2 XP)</span>
                    <h4 className="flashcard-translation" style={{ fontSize: '1.6rem' }}>{currentQuestQ.item.english}</h4>
                    <span className="flashcard-hint">Click card to reveal Spanish</span>
                  </div>
                </div>
              </div>

              <button className="btn btn-accent" onClick={handleQuestCardLearned} style={{ width: '100%', maxWidth: '240px', marginTop: '10px' }}>
                I learned this word!
              </button>
            </div>
          ) : (
            <div>
              {!currentQuestQ.isSentenceBuilder && (
                <div 
                  className="quiz-question-card"
                  style={currentQuestQ.isConjugation ? {
                    borderTop: isPreteriteTense(currentQuestQ) ? '4px solid #f97316' : '4px solid #10b981',
                    boxShadow: isPreteriteTense(currentQuestQ) ? '0 -2px 18px rgba(249, 115, 22, 0.2)' : '0 -2px 18px rgba(16, 185, 129, 0.2)'
                  } : undefined}
                >
                  {currentQuestQ.isConjugation ? (
                    <>
                      {/* High-Noticeability Tense Banner */}
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '6px 16px',
                          borderRadius: '20px',
                          background: isPreteriteTense(currentQuestQ) 
                            ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.25), rgba(234, 88, 12, 0.15))' 
                            : 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(5, 150, 105, 0.15))',
                          border: isPreteriteTense(currentQuestQ) ? '2px solid #f97316' : '2px solid #10b981',
                          color: isPreteriteTense(currentQuestQ) ? '#fed7aa' : '#a7f3d0',
                          fontWeight: '800',
                          fontSize: '0.88rem',
                          letterSpacing: '0.04em',
                          boxShadow: isPreteriteTense(currentQuestQ) ? '0 0 14px rgba(249, 115, 22, 0.35)' : '0 0 14px rgba(16, 185, 129, 0.35)',
                          textTransform: 'uppercase'
                        }}>
                          <span>{isPreteriteTense(currentQuestQ) ? '⏳' : '⚡'}</span>
                          <span>TIEMPO: <strong>{isPreteriteTense(currentQuestQ) ? 'PRETÉRITO (PAST TENSE)' : 'PRESENTE (PRESENT TENSE)'}</strong></span>
                        </div>
                      </div>

                      <div className="quiz-question-lbl" style={{ marginBottom: '8px' }}>
                        Conjugate in <strong style={{ color: isPreteriteTense(currentQuestQ) ? '#fb923c' : '#34d399', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                          {isPreteriteTense(currentQuestQ) ? 'PAST TENSE (Pretérito)' : 'PRESENT TENSE (Presente)'}
                        </strong> for:
                      </div>

                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                        {currentQuestQ.isReciprocal ? (
                          <span className="badge badge-primary" style={{ fontSize: '0.75rem', padding: '4px 8px', borderRadius: '8px', background: 'rgba(236, 72, 153, 0.15)', color: '#f472b6', borderColor: 'rgba(236, 72, 153, 0.3)' }}>
                            🤝 Acción Recíproca ("Each Other")
                          </span>
                        ) : currentQuestQ.isReflexive ? (
                          <span className="badge badge-primary" style={{ fontSize: '0.75rem', padding: '4px 8px', borderRadius: '8px' }}>
                            Reflexivo (me, te, se, nos, os, se)
                          </span>
                        ) : null}
                      </div>

                      <h3 className="quiz-word" style={{ color: 'var(--primary)' }}>{currentQuestQ.questionWord}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontStyle: 'italic', marginBottom: '12px' }}>({currentQuestQ.meaning})</p>
                      
                      <div style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        background: 'rgba(250, 204, 21, 0.1)', 
                        padding: '6px 14px', 
                        borderRadius: '16px', 
                        color: 'var(--gold)', 
                        fontWeight: 'bold', 
                        fontSize: '0.9rem' 
                      }}>
                        <span>Pronoun: {currentQuestQ.pronoun}</span>
                        <span style={{
                          fontSize: '0.7rem',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          background: isPreteriteTense(currentQuestQ) ? '#f97316' : '#10b981',
                          color: '#ffffff',
                          fontWeight: '800',
                          letterSpacing: '0.04em'
                        }}>
                          {isPreteriteTense(currentQuestQ) ? 'PASADO' : 'PRESENTE'}
                        </span>
                      </div>
                    </>
                  ) : currentQuestQ.isFillInTheBlank ? (
                    <>
                      <div className="quiz-question-lbl">Completar la frase (Fill in the blank):</div>
                      <h3 className="quiz-word" style={{ color: 'var(--accent)' }}>{currentQuestQ.questionWord}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontStyle: 'italic', marginBottom: currentQuestQ.hint ? '8px' : '12px' }}>({currentQuestQ.meaning})</p>
                      {currentQuestQ.hint && (
                        <div style={{ display: 'inline-block', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.25)', padding: '5px 12px', borderRadius: '12px', color: '#93c5fd', fontSize: '0.78rem', marginBottom: '12px', maxWidth: '90%' }}>
                          💡 <strong>Pista:</strong> {currentQuestQ.hint}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="quiz-question-lbl">
                        {currentQuestQ.type === 2 ? "Type the Spanish translation:" : "Choose the correct translation:"}
                      </div>
                      <h3 className="quiz-word">{currentQuestQ.questionWord}</h3>
                    </>
                  )}
                  
                  {isVerbItem(currentQuestQ.item) && (
                    <button 
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => openCodex(currentQuestQ.item)}
                      style={{ padding: '4px 10px', fontSize: '0.75rem', margin: '10px auto 0', display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content' }}
                    >
                      📖 Ver Conjugaciones
                    </button>
                  )}
                </div>
              )}

              {currentQuestQ.isSentenceBuilder ? (
                <div style={{ marginTop: '10px' }}>
                  <SentenceBuilder
                    question={currentQuestQ}
                    onAnswer={handleQuestSentenceAnswer}
                    answered={questAnswered}
                    userCorrect={isQuestUserCorrect}
                    showSubmitButton={true}
                  />
                </div>
              ) : currentQuestQ.isConjugation || currentQuestQ.isFillInTheBlank || currentQuestQ.type !== 2 ? (
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
                        placeholder="Type the Spanish translation..."
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
                        Submit Translation
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
                    ? `¡Correcto! ${comboCount >= 3 ? `Combo Streak ${comboCount}! ` : ''}` 
                    : currentQuestQ.isSentenceBuilder
                      ? `Incorrecto. Frase correcta: "${currentQuestQ.correct}"`
                      : currentQuestQ.isConjugation
                        ? `Incorrecto. Correct form (${isPreteriteTense(currentQuestQ) ? 'Pretérito / Past' : 'Presente'}): "${currentQuestQ.correct}"`
                        : currentQuestQ.isFillInTheBlank
                          ? `Incorrecto. Correct word: "${currentQuestQ.correct}"`
                          : `Incorrecto! Correct translation: "${currentQuestQ.correct}"`
                  }
                  <button className="btn btn-primary" onClick={handleQuestNext} style={{ width: '100%', marginTop: '16px' }}>
                    {questCurrentIdx === questQuestions.length - 1 ? "Finish Quest" : "Next Challenge"} <ArrowRight size={16} />
                  </button>
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
          </div>

          {practiceMode === "cards" && (
            practiceCards.length > 0 && practiceCards[practiceCurrentIdx] ? (
              <div style={{ textAlign: 'center' }}>
                <div className="flashcard-wrapper" onClick={() => setPracticeFlipped(!practiceFlipped)}>
                  <div className={`flashcard ${practiceFlipped ? 'flipped' : ''}`}>
                    
                    <div className="flashcard-face flashcard-front">
                      <span className="flashcard-category">
                        {selectedSubcategory.startsWith("All of ")
                          ? `${selectedCategory} • ${practiceCards[practiceCurrentIdx]?.subcategory || 'General'}`
                          : selectedSubcategory}
                      </span>
                      <h3 className="flashcard-term">{practiceCards[practiceCurrentIdx].spanish}</h3>
                      
                      {isVerbItem(practiceCards[practiceCurrentIdx]) && (
                        <button 
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={(e) => { e.stopPropagation(); openCodex(practiceCards[practiceCurrentIdx]); }}
                          style={{ position: 'absolute', top: '16px', right: '16px', padding: '6px 12px', fontSize: '0.75rem', gap: '4px' }}
                        >
                          📖 Codex
                        </button>
                      )}

                      {speechAvailable && (
                        <button 
                          className="btn btn-secondary"
                          onClick={(e) => { e.stopPropagation(); speakSpanish(practiceCards[practiceCurrentIdx].spanish); }}
                          style={{ position: 'absolute', bottom: '70px', borderRadius: '50%', width: '45px', height: '45px', padding: 0 }}
                        >
                          <Volume2 size={20} color="var(--primary)" />
                        </button>
                      )}
                      <span className="flashcard-hint">Click card to reveal translation</span>
                    </div>

                    <div className="flashcard-face flashcard-back">
                      <span className="flashcard-category">
                        {selectedSubcategory.startsWith("All of ")
                          ? `${selectedCategory} • ${practiceCards[practiceCurrentIdx]?.subcategory || 'General'}`
                          : selectedSubcategory}
                      </span>
                      <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '0.1em', fontWeight: 'bold', marginBottom: '8px' }}>
                        English Translation
                      </span>
                      <h4 className="flashcard-translation">{practiceCards[practiceCurrentIdx].english}</h4>
                      <span className="flashcard-hint">Click card to flip Spanish</span>
                    </div>

                  </div>
                </div>

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
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '8px' }}>Start Custom Practice Quiz</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px', lineHeight: '1.4' }}>
                  Test yourself in: <strong>{selectedSubcategory}</strong>. You will receive 10 questions. Errors deal damage to your HP!
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--accent)', marginBottom: '20px', background: 'rgba(16, 185, 129, 0.05)', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.15)', display: 'inline-block' }}>
                  💡 Tip: First time studying this topic? Switch to <strong>Flashcards</strong> above to learn the words first!
                </p>

                {practiceCards.some(item => isVerbItem(item)) && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '440px', margin: '0 auto 20px' }}>
                    <div className="form-group" style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
                      <label className="form-label" style={{ marginBottom: '6px', fontSize: '0.8rem' }}>Quiz Type</label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                        <button 
                          className={`btn ${practiceQuizMode === 'translation' ? 'btn-primary' : 'btn-secondary'}`} 
                          style={{ padding: '7px 4px', fontSize: '0.78rem' }} 
                          onClick={() => setPracticeQuizMode("translation")}
                        >
                          Traducción
                        </button>
                        <button 
                          className={`btn ${practiceQuizMode === 'conjugation' ? 'btn-primary' : 'btn-secondary'}`} 
                          style={{ padding: '7px 4px', fontSize: '0.78rem' }} 
                          onClick={() => setPracticeQuizMode("conjugation")}
                        >
                          ⚡ Conjugación
                        </button>
                        <button 
                          className={`btn ${practiceQuizMode === 'sentence' ? 'btn-primary' : 'btn-secondary'}`} 
                          style={{ padding: '7px 4px', fontSize: '0.78rem' }} 
                          onClick={() => setPracticeQuizMode("sentence")}
                        >
                          🧩 Frases
                        </button>
                        <button 
                          className={`btn ${practiceQuizMode === 'mixed' ? 'btn-primary' : 'btn-secondary'}`} 
                          style={{ padding: '7px 4px', fontSize: '0.78rem' }} 
                          onClick={() => setPracticeQuizMode("mixed")}
                        >
                          🔀 Mixto
                        </button>
                      </div>
                    </div>

                    {practiceQuizMode === 'sentence' && (
                      <p style={{ fontSize: '0.78rem', color: 'var(--accent)', margin: '-4px 0 2px', lineHeight: '1.4' }}>
                        🧩 Construcción de Frases: Arrastra o toca las palabras para ordenar correctamente las oraciones en español con distractores gramaticales.
                      </p>
                    )}

                    {practiceQuizMode === 'mixed' && (
                      <p style={{ fontSize: '0.78rem', color: 'var(--accent)', margin: '-4px 0 2px', lineHeight: '1.4' }}>
                        🔀 Modo Mixto: Repasa tarjetas interactivas, desafíos de conjugación y construcción de frases en el mismo mazo integral.
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
                  </div>
                )}

                <button className="btn btn-primary" onClick={startCustomPracticeQuiz}>
                  Start Practice Quiz
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
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent)', margin: '4px 0' }}>{practiceScore} / 10</div>
                
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
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem', color: 'var(--danger)', fontWeight: 'bold' }}>
                    <Heart size={14} fill="var(--danger)" /> {state.hp} HP
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
                  <div 
                    className="flashcard-wrapper"
                    onClick={() => setPracticeFlipped(!practiceFlipped)}
                    style={{ height: '240px', maxWidth: '500px', margin: '0 auto 16px' }}
                  >
                    <div className={`flashcard ${practiceFlipped ? 'flipped' : ''}`}>
                      <div className="flashcard-face flashcard-front">
                        <span className="flashcard-category">Repaso de Tarjeta (+2 XP)</span>
                        <h3 className="flashcard-term" style={{ fontSize: '2.2rem' }}>
                          {practiceQuestions[practiceCurrentIdx].item.spanish}
                        </h3>
                        
                        {isVerbItem(practiceQuestions[practiceCurrentIdx].item) && (
                          <button 
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={(e) => { e.stopPropagation(); openCodex(practiceQuestions[practiceCurrentIdx].item); }}
                            style={{ position: 'absolute', top: '16px', right: '16px', padding: '6px 12px', fontSize: '0.75rem', gap: '4px' }}
                          >
                            📖 Codex
                          </button>
                        )}

                        {speechAvailable && (
                          <button 
                            className="btn btn-secondary"
                            onClick={(e) => { e.stopPropagation(); speakSpanish(practiceQuestions[practiceCurrentIdx].item.spanish); }}
                            style={{ position: 'absolute', bottom: '60px', borderRadius: '50%', width: '40px', height: '40px', padding: 0 }}
                          >
                            <Volume2 size={16} color="var(--primary)" />
                          </button>
                        )}
                        <span className="flashcard-hint">Haz clic para ver la traducción</span>
                      </div>

                      <div className="flashcard-face flashcard-back">
                        <span className="flashcard-category">Traducción al Inglés</span>
                        <h4 className="flashcard-translation" style={{ fontSize: '1.6rem' }}>
                          {practiceQuestions[practiceCurrentIdx].item.english}
                        </h4>
                        <span className="flashcard-hint">Haz clic para volver al español</span>
                      </div>
                    </div>
                  </div>

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
                      {/* High-Noticeability Tense Banner */}
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '6px 16px',
                          borderRadius: '20px',
                          background: isPret 
                            ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.25), rgba(234, 88, 12, 0.15))' 
                            : 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(5, 150, 105, 0.15))',
                          border: isPret ? '2px solid #f97316' : '2px solid #10b981',
                          color: isPret ? '#fed7aa' : '#a7f3d0',
                          fontWeight: '800',
                          fontSize: '0.88rem',
                          letterSpacing: '0.04em',
                          boxShadow: isPret ? '0 0 14px rgba(249, 115, 22, 0.35)' : '0 0 14px rgba(16, 185, 129, 0.35)',
                          textTransform: 'uppercase'
                        }}>
                          <span>{isPret ? '⏳' : '⚡'}</span>
                          <span>TIEMPO: <strong>{isPret ? 'PRETÉRITO (PAST TENSE)' : 'PRESENTE (PRESENT TENSE)'}</strong></span>
                        </div>
                      </div>

                      <div className="quiz-question-lbl" style={{ marginBottom: '8px' }}>
                        {currQ?.isGustar ? (
                          <>
                            Elige la forma de gustar en <strong style={{ color: isPret ? '#fb923c' : '#34d399', textDecoration: 'underline' }}>
                              {isPret ? 'PRETÉRITO (gustó vs gustaron)' : 'PRESENTE (gusta vs gustan)'}
                            </strong>:
                          </>
                        ) : (
                          <>
                            Conjugate in <strong style={{ color: isPret ? '#fb923c' : '#34d399', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                              {isPret ? 'PAST TENSE (Pretérito)' : 'PRESENT TENSE (Presente)'}
                            </strong> for:
                          </>
                        )}
                      </div>

                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                        {currQ.isReciprocal ? (
                          <span className="badge badge-primary" style={{ fontSize: '0.75rem', padding: '4px 8px', borderRadius: '8px', background: 'rgba(236, 72, 153, 0.15)', color: '#f472b6', borderColor: 'rgba(236, 72, 153, 0.3)' }}>
                            🤝 Acción Recíproca ("Each Other")
                          </span>
                        ) : currQ.isReflexive ? (
                          <span className="badge badge-primary" style={{ fontSize: '0.75rem', padding: '4px 8px', borderRadius: '8px' }}>
                            Reflexivo (me, te, se, nos, os, se)
                          </span>
                        ) : null}
                        {currQ.isGustar && (
                          <span className="badge badge-primary" style={{ fontSize: '0.75rem', padding: '4px 8px', borderRadius: '8px', background: 'rgba(234, 179, 8, 0.15)', color: 'var(--gold)', borderColor: 'rgba(234, 179, 8, 0.3)' }}>
                            ✨ Tipo Gustar ({isPret ? 'gustó vs gustaron' : 'gusta vs gustan'})
                          </span>
                        )}
                      </div>

                      <h3 className="quiz-word" style={{ color: 'var(--primary)', fontSize: currQ?.isGustar ? '1.8rem' : '2.4rem' }}>
                        {currQ.questionWord}
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontStyle: 'italic', marginBottom: '12px' }}>
                        ({currQ.meaning})
                      </p>

                      <div style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        background: 'rgba(250, 204, 21, 0.1)', 
                        padding: '6px 14px', 
                        borderRadius: '16px', 
                        color: 'var(--gold)', 
                        fontWeight: 'bold', 
                        fontSize: '0.9rem' 
                      }}>
                        <span>{currQ?.isGustar ? currQ.pronoun : `Pronoun: ${currQ.pronoun}`}</span>
                        <span style={{
                          fontSize: '0.7rem',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          background: isPret ? '#f97316' : '#10b981',
                          color: '#ffffff',
                          fontWeight: '800',
                          letterSpacing: '0.04em'
                        }}>
                          {isPret ? 'PASADO' : 'PRESENTE'}
                        </span>
                      </div>
                      
                      <button 
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => openCodex(currQ.item)}
                        style={{ padding: '4px 10px', fontSize: '0.75rem', margin: '10px auto 0', display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content' }}
                      >
                        📖 Ver Conjugaciones
                      </button>
                    </div>
                  );
                })()
              ) : practiceQuestions[practiceCurrentIdx]?.isFillInTheBlank ? (
                <div className="quiz-question-card">
                  <div className="quiz-question-lbl">Completar la frase (Fill in the blank):</div>
                  <h3 className="quiz-word" style={{ color: 'var(--accent)', fontSize: '2rem' }}>{practiceQuestions[practiceCurrentIdx].questionWord}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontStyle: 'italic', marginBottom: practiceQuestions[practiceCurrentIdx]?.hint ? '8px' : '12px' }}>
                    ({practiceQuestions[practiceCurrentIdx].meaning})
                  </p>
                  {practiceQuestions[practiceCurrentIdx]?.hint && (
                    <div style={{ display: 'inline-block', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.25)', padding: '5px 12px', borderRadius: '12px', color: '#93c5fd', fontSize: '0.78rem', marginBottom: '12px', maxWidth: '90%' }}>
                      💡 <strong>Pista:</strong> {practiceQuestions[practiceCurrentIdx].hint}
                    </div>
                  )}
                </div>
              ) : (
                <div className="quiz-question-card">
                  <div className="quiz-question-lbl">
                    {practiceQuestions[practiceCurrentIdx]?.type === 2 ? "Type the Spanish translation:" : "Choose correct translation:"}
                  </div>
                  <h3 className="quiz-word">{practiceQuestions[practiceCurrentIdx]?.questionWord}</h3>
                  
                  {isVerbItem(practiceQuestions[practiceCurrentIdx]?.item) && (
                    <button 
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => openCodex(practiceQuestions[practiceCurrentIdx].item)}
                      style={{ padding: '4px 10px', fontSize: '0.75rem', margin: '10px auto 0', display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content' }}
                    >
                      📖 Ver Conjugaciones
                    </button>
                  )}
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
                    />
                  </div>
                ) : practiceQuestions[practiceCurrentIdx]?.isConjugation || practiceQuestions[practiceCurrentIdx]?.isFillInTheBlank || practiceQuestions[practiceCurrentIdx]?.type !== 2 ? (
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
                          placeholder="Type the Spanish translation..."
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
                          Submit Translation
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
                    ? "¡Correcto! +10 XP | +1 Gold" 
                    : practiceQuestions[practiceCurrentIdx]?.isSentenceBuilder
                      ? `Incorrecto! Frase correcta: "${practiceQuestions[practiceCurrentIdx].correct}"`
                      : practiceQuestions[practiceCurrentIdx]?.isConjugation
                        ? `Incorrecto! Correct form (${isPreteriteTense(practiceQuestions[practiceCurrentIdx]) ? 'Pretérito / Past' : 'Presente'}): "${practiceQuestions[practiceCurrentIdx].correct}"`
                        : `Incorrecto! Correct Answer: "${practiceQuestions[practiceCurrentIdx].correct}"`
                  }
                  <button className="btn btn-primary" onClick={handlePracticeNext} style={{ width: '100%', marginTop: '16px' }}>
                    Next Question <ArrowRight size={16} />
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
            Answer all missed questions correctly to revive with 10 HP!
          </div>

          {/* Question card */}
          {(() => {
            const currentQ = redemptionQuestions[redemptionCurrentIdx];
            if (!currentQ) return null;

            const isRedemptionCorrect = redemptionAnswered && (
              redemptionSelected === currentQ.correct || cleanAnswer(redemptionSelected) === cleanAnswer(currentQ.correct)
            );

            return (
              <div>
                {!currentQ.isSentenceBuilder && (
                  <div 
                    className="quiz-question-card"
                    style={currentQ.isConjugation ? {
                      borderTop: isPreteriteTense(currentQ) ? '4px solid #f97316' : '4px solid #10b981',
                      boxShadow: isPreteriteTense(currentQ) ? '0 -2px 18px rgba(249, 115, 22, 0.2)' : '0 -2px 18px rgba(16, 185, 129, 0.2)'
                    } : undefined}
                  >
                    {currentQ.isConjugation ? (
                    <>
                      {/* High-Noticeability Tense Banner */}
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '6px 16px',
                          borderRadius: '20px',
                          background: isPreteriteTense(currentQ) 
                            ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.25), rgba(234, 88, 12, 0.15))' 
                            : 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(5, 150, 105, 0.15))',
                          border: isPreteriteTense(currentQ) ? '2px solid #f97316' : '2px solid #10b981',
                          color: isPreteriteTense(currentQ) ? '#fed7aa' : '#a7f3d0',
                          fontWeight: '800',
                          fontSize: '0.88rem',
                          letterSpacing: '0.04em',
                          boxShadow: isPreteriteTense(currentQ) ? '0 0 14px rgba(249, 115, 22, 0.35)' : '0 0 14px rgba(16, 185, 129, 0.35)',
                          textTransform: 'uppercase'
                        }}>
                          <span>{isPreteriteTense(currentQ) ? '⏳' : '⚡'}</span>
                          <span>TIEMPO: <strong>{isPreteriteTense(currentQ) ? 'PRETÉRITO (PAST TENSE)' : 'PRESENTE (PRESENT TENSE)'}</strong></span>
                        </div>
                      </div>

                      <div className="quiz-question-lbl" style={{ marginBottom: '8px' }}>
                        Conjugate in <strong style={{ color: isPreteriteTense(currentQ) ? '#fb923c' : '#34d399', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                          {isPreteriteTense(currentQ) ? 'PAST TENSE (Pretérito)' : 'PRESENT TENSE (Presente)'}
                        </strong> for:
                      </div>

                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                        {currentQ.isReciprocal ? (
                          <span className="badge badge-primary" style={{ fontSize: '0.75rem', padding: '4px 8px', borderRadius: '8px', background: 'rgba(236, 72, 153, 0.15)', color: '#f472b6', borderColor: 'rgba(236, 72, 153, 0.3)' }}>
                            🤝 Acción Recíproca ("Each Other")
                          </span>
                        ) : currentQ.isReflexive ? (
                          <span className="badge badge-primary" style={{ fontSize: '0.75rem', padding: '4px 8px', borderRadius: '8px' }}>
                            Reflexivo (me, te, se, nos, os, se)
                          </span>
                        ) : null}
                      </div>

                      <h3 className="quiz-word" style={{ color: 'var(--primary)' }}>{currentQ.questionWord}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontStyle: 'italic', marginBottom: '12px' }}>({currentQ.meaning})</p>
                      
                      <div style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        background: 'rgba(250, 204, 21, 0.1)', 
                        padding: '6px 14px', 
                        borderRadius: '16px', 
                        color: 'var(--gold)', 
                        fontWeight: 'bold', 
                        fontSize: '0.9rem' 
                      }}>
                        <span>Pronoun: {currentQ.pronoun}</span>
                        <span style={{
                          fontSize: '0.7rem',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          background: isPreteriteTense(currentQ) ? '#f97316' : '#10b981',
                          color: '#ffffff',
                          fontWeight: '800',
                          letterSpacing: '0.04em'
                        }}>
                          {isPreteriteTense(currentQ) ? 'PASADO' : 'PRESENTE'}
                        </span>
                      </div>
                    </>
                  ) : currentQ.isFillInTheBlank ? (
                    <>
                      <div className="quiz-question-lbl">Completar la frase (Fill in the blank):</div>
                      <h3 className="quiz-word" style={{ color: 'var(--accent)' }}>{currentQ.questionWord}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontStyle: 'italic', marginBottom: currentQ.hint ? '8px' : '12px' }}>({currentQ.meaning})</p>
                      {currentQ.hint && (
                        <div style={{ display: 'inline-block', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.25)', padding: '5px 12px', borderRadius: '12px', color: '#93c5fd', fontSize: '0.78rem', marginBottom: '12px', maxWidth: '90%' }}>
                          💡 <strong>Pista:</strong> {currentQ.hint}
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
                      Excellent! You answered all missed questions correctly.
                    </p>
                    <button className="btn btn-accent" onClick={handleClaimRedemption} style={{ width: '100%', maxWidth: '240px', margin: '0 auto' }}>
                      Claim & Revive (10 HP)
                    </button>
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
                    ) : currentQ.isConjugation || currentQ.isFillInTheBlank || currentQ.type !== 2 ? (
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
                            placeholder="Type the Spanish translation..."
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
                              Submit Translation
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
                          ? "¡Correcto!" 
                          : currentQ.isSentenceBuilder
                            ? `Incorrecto. Frase correcta: "${currentQ.correct}"`
                            : currentQ.isConjugation
                              ? `Incorrecto. Correct form (${isPreteriteTense(currentQ) ? 'Pretérito / Past' : 'Presente'}): "${currentQ.correct}"`
                              : `Incorrecto. Correct answer: "${currentQ.correct}"`
                        }
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
          <div className="glass-panel modal-content" style={{ animation: 'pop-in 0.3s ease-out', maxWidth: '440px', width: '92%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '2px' }}>
                  📖 Codex de Conjugación
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Verbo: <strong style={{ color: 'var(--text-primary)' }}>"{codexVerb}"</strong>
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

            {/* Dual Tense Switcher Tabs */}
            <div style={{ display: 'flex', gap: '8px', margin: '14px 0 12px', background: 'rgba(0,0,0,0.25)', padding: '5px', borderRadius: '12px' }}>
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
                onClick={() => setCodexTense('present')}
              >
                ⚡ Presente
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
                onClick={() => setCodexTense('preterite')}
              >
                ⏳ Pretérito (Past)
              </button>
            </div>

            {/* Reflexive or Reciprocal Verb Banner */}
            {isReciprocalVerb(codexVerb) ? (
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
                🤝 Verbo Recíproco (Acción Mutua: "Each Other")
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
                ✨ Verbo Reflexivo (me, te, se, nos, os, se)
              </div>
            ) : null}
            
            {isGustarVerb(codexVerb) ? (
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
                  ⚠️ <strong>¡Regla de Oro!</strong> El verbo <em>gustar</em> <strong>NO</strong> se conjuga por la persona que siente el gusto (nunca se dice <em>"yo gusto"</em> para <em>I like</em>).
                  <br />
                  Solo tiene <strong>DOS formas</strong>:
                  <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
                    <li><strong>Singular:</strong> para cosas singulares o verbos infinitivos.</li>
                    <li><strong>Plural:</strong> para cosas o sustantivos en plural.</li>
                  </ul>
                </div>

                {/* 2 Forms display */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px', textAlign: 'center' }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 8px', borderRadius: '10px', border: '1px solid var(--card-border)' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Cosa Singular o Verbo</span>
                    <strong style={{ fontSize: '1.4rem', color: 'var(--primary)', display: 'block', margin: '4px 0' }}>
                      {codexTense === 'preterite' ? 'gustó' : 'gusta'}
                    </strong>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                      {codexTense === 'preterite' ? 'ej: Me gustó la fiesta' : 'ej: Me gusta el café / bailar'}
                    </span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 8px', borderRadius: '10px', border: '1px solid var(--card-border)' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Cosas Plurales</span>
                    <strong style={{ fontSize: '1.4rem', color: 'var(--accent)', display: 'block', margin: '4px 0' }}>
                      {codexTense === 'preterite' ? 'gustaron' : 'gustan'}
                    </strong>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                      {codexTense === 'preterite' ? 'ej: Me gustaron las fotos' : 'ej: Nos gustan los libros'}
                    </span>
                  </div>
                </div>

                {/* Pronouns list */}
                <h4 style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px', fontWeight: 700 }}>
                  Pronombres de Objeto Indirecto (¿A quién le gusta?):
                </h4>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left', marginBottom: '10px' }}>
                  <tbody>
                    {INDIRECT_OBJECT_PRONOUNS.map((p, idx) => {
                      const isVosotros = idx === 4;
                      const singForm = codexTense === 'preterite' ? 'gustó' : 'gusta';
                      const plurForm = codexTense === 'preterite' ? 'gustaron' : 'gustan';
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
                  🤝 <strong>¡Regla de los Verbos Recíprocos! (Acción Mutua: "Each Other")</strong>
                  <br />
                  Las acciones recíprocas describen acciones que dos o más personas se hacen <strong>mutuamente</strong>.
                  <br />
                  Por definición, <strong>solo se conjugan en las personas del PLURAL</strong>:
                </div>

                {/* Plural Conjugation Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left', marginBottom: '14px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <th style={{ padding: '8px 10px', color: 'var(--text-secondary)' }}>Pronombre Plural</th>
                      <th style={{ padding: '8px 10px', color: '#f472b6', fontWeight: 'bold' }}>
                        {codexTense === 'preterite' ? 'Forma Pretérito (Acción mutua pasada)' : 'Forma Presente (Acción mutua)'}
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
                    ❓ ¿Por qué no existe "yo me beso"? (El Objeto Directo)
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', margin: '0 0 10px 0' }}>
                    Decir <em>"me beso"</em> significaría literalmente <em>"I kiss myself"</em>. Para una acción individual hacia otra persona, el verbo ya no es recíproco ni reflexivo: es un verbo transitivo que toma un <strong>Objeto Directo</strong>:
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ background: 'rgba(0,0,0,0.25)', padding: '6px 10px', borderRadius: '6px' }}>
                      <strong style={{ color: 'var(--primary)' }}>1. Con "a" personal:</strong> <em>Yo beso <u>a mi abuela</u>.</em> / <em>Tú ayudas <u>a tus compañeros</u>.</em>
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.25)', padding: '6px 10px', borderRadius: '6px' }}>
                      <strong style={{ color: 'var(--accent)' }}>2. Con Pronombre de Objeto Directo:</strong> <em>Yo <u>la</u> beso.</em> / <em>Él <u>me</u> besa.</em> 
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>
                        (En <em>"Él me besa"</em>, <em>me</em> es el objeto directo [a mí], no un pronombre reflexivo)
                      </span>
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.25)', padding: '6px 10px', borderRadius: '6px' }}>
                      <strong style={{ color: 'var(--gold)' }}>3. Con partes del cuerpo o ropa:</strong> <em>Me lavo <u>las manos</u>.</em> / <em>Se cepilla <u>los dientes</u>.</em>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>
                        (Aquí <em>las manos</em> y <em>los dientes</em> son el objeto directo)
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
                    🔄 ¿Cuándo usar "-rse" (infinitivo) vs "se ...n" (conjugado)?
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', margin: '0 0 8px 0' }}>
                    ¡Ambas formas son correctas y esenciales en español! La elección depende de la estructura de la frase:
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ background: 'rgba(0,0,0,0.25)', padding: '6px 10px', borderRadius: '6px' }}>
                      <strong style={{ color: '#93c5fd' }}>1. Verbo Principal Conjugado (se {parseVerb(codexVerb).base}n):</strong>
                      <br />
                      Cuando el verbo es la acción directa de la oración:
                      <br />
                      <em>Los dos amigos <u>se {parseVerb(codexVerb).base}n</u> todos los días.</em>
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.25)', padding: '6px 10px', borderRadius: '6px' }}>
                      <strong style={{ color: '#93c5fd' }}>2. Con Verbo Auxiliar o Perífrasis ({parseVerb(codexVerb).base}rse):</strong>
                      <br />
                      Cuando sigue a verbos como <em>ir a, querer, preferir, poder, deber</em>, el pronombre se une al infinitivo:
                      <br />
                      <em>Ellos van a <u>{parseVerb(codexVerb).base}rse</u>.</em> / <em>Ellos quieren <u>{parseVerb(codexVerb).base}rse</u>.</em>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>
                        (También se puede colocar antes del primer verbo: <em>"Se van a {parseVerb(codexVerb).base}r"</em>)
                      </span>
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.25)', padding: '6px 10px', borderRadius: '6px' }}>
                      <strong style={{ color: '#93c5fd' }}>3. Después de Preposiciones (antes de, para, al, después de):</strong>
                      <br />
                      En español, después de una preposición el verbo SIEMPRE va en infinitivo con el pronombre unido:
                      <br />
                      <em>Antes de <u>despedirse</u>, hablaron un momento.</em>
                      <br />
                      <em>Corrieron para <u>{parseVerb(codexVerb).base}rse</u> con alegría.</em>
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.25)', padding: '6px 10px', borderRadius: '6px' }}>
                      <strong style={{ color: '#93c5fd' }}>4. Con Gustar / Encantar y Frases Impersonales:</strong>
                      <br />
                      <em>A ellos les gusta <u>{parseVerb(codexVerb).base}rse</u>.</em> / <em>Es importante <u>{parseVerb(codexVerb).base}rse</u>.</em>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <th style={{ padding: '8px 10px', color: 'var(--text-secondary)' }}>Pronombre</th>
                    <th style={{ padding: '8px 10px', color: 'var(--primary)', fontWeight: 'bold' }}>
                      {codexTense === 'preterite' ? 'Forma Pretérito' : 'Forma Presente'}
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
                    return (
                      <tr 
                        key={idx} 
                        style={{ 
                          borderBottom: '1px solid rgba(255,255,255,0.05)',
                          opacity: isVosotros && state.excludeVosotros ? 0.6 : 1
                        }}
                      >
                        <td style={{ padding: '8px 10px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                          {p.pronoun} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({p.translation})</span>
                        </td>
                        <td style={{ padding: '8px 10px', color: 'var(--text-primary)', fontWeight: 600 }}>
                          {conjugated}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            
            <button className="btn btn-secondary" onClick={() => setCodexVerb(null)} style={{ marginTop: '18px', width: '100%' }}>
              Cerrar Codex
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
