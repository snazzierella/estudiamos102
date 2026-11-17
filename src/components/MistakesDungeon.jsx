import React, { useState, useEffect, useRef, useCallback } from 'react';
import vocabularyData from '../data/vocabulary.json';
import { SENTENCE_POOLS } from '../utils/sentenceBuilderHelper';
import { generateConjugationQuestion, isPreteriteTense } from '../utils/conjugationHelper';
import { formatEnglishPrompt } from '../utils/difficultyMapper';
import { speakSpanish as speakSpanishUtil } from '../utils/speechHelper';
import { ArrowLeft, Trophy, Volume2 } from 'lucide-react';

// Flatten all syllabus sentence pools across all units
const ALL_SENTENCE_ITEMS = Object.values(SENTENCE_POOLS || {}).flat();

/**
 * Robust resolver for words or sentences in state.mistakes.
 * Finds corresponding vocabulary items or sentences so no ghost is ever unkillable.
 */
function resolveMistakeItem(spanishWord) {
  if (!spanishWord || typeof spanishWord !== 'string') return null;
  const target = spanishWord.trim().toLowerCase();

  // 1. Direct match in vocabulary
  const vocabMatch = vocabularyData.find(item => 
    item.spanish && item.spanish.trim().toLowerCase() === target
  );
  if (vocabMatch) return vocabMatch;

  // 2. Syllabus / Stage sentences match
  const sentenceMatch = ALL_SENTENCE_ITEMS.find(s => 
    s.spanish && s.spanish.trim().toLowerCase() === target
  );
  if (sentenceMatch) {
    return {
      spanish: sentenceMatch.spanish,
      english: sentenceMatch.english,
      category: "Sentences",
      subcategory: "Syllabus Sentences",
      unit: "Sentences",
      isSentence: true
    };
  }

  // 3. Partial or prefix match in vocabulary
  const partialMatch = vocabularyData.find(item => {
    if (!item.spanish) return false;
    const itemNorm = item.spanish.trim().toLowerCase();
    return itemNorm.startsWith(target) || target.startsWith(itemNorm);
  });
  if (partialMatch) return partialMatch;

  // 4. Safe fallback item
  return {
    spanish: spanishWord.trim(),
    english: spanishWord.trim(),
    category: "Vocabulary",
    subcategory: "Mistakes Review",
    unit: "Review"
  };
}

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

const stripArticles = (str) => {
  if (!str) return "";
  return cleanAnswer(str).replace(/^(the|a|an|el|la|los|las|un|una|unos|unas)\s+/i, "").trim();
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
  if (!correct || !user) return false;
  if (checkSynonyms(correct, user)) return true;
  if (checkSynonyms(stripArticles(correct), stripArticles(user))) return true;

  if (correct.includes("/")) {
    const parts = correct.split("/");
    for (let part of parts) {
      if (checkSynonyms(part, user)) return true;
      if (checkSynonyms(stripArticles(part), stripArticles(user))) return true;
    }
  }
  return false;
};

export default function MistakesDungeon({ state, takeDamage, heal, removeMistake, addXp, addGold, setView }) {
  // Snapshot of mistake items for the current dungeon run session
  const [dungeonItems, setDungeonItems] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [clearedWords, setClearedWords] = useState(() => new Set());
  const [question, setQuestion] = useState(null);
  
  // Question states
  const [answered, setAnswered] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [shakeTrigger, setShakeTrigger] = useState(false);
  const [healTrigger, setHealTrigger] = useState(false);
  
  const [dungeonFinished, setDungeonFinished] = useState(false);
  const [goldBonusEarned, setGoldBonusEarned] = useState(0);
  const [xpBonusEarned, setXpBonusEarned] = useState(0);
  const [totalClearedInSession, setTotalClearedInSession] = useState(0);

  const audioCtxRef = useRef(null);
  const inputRef = useRef(null);
  const initializedRef = useRef(false);

  const buildDungeonQuestion = useCallback((item) => {
    setAnswered(false);
    setIsAnswerCorrect(false);
    setSelectedChoice(null);
    setTypedAnswer("");

    const isVerb = item.category === "Verbs" && item.subcategory !== "Verbs Structured Like Gustar";
    // 40% chance of conjugation for verbs, otherwise translation
    const wantsConjugation = isVerb && Math.random() > 0.6;

    if (wantsConjugation) {
      const qSpec = generateConjugationQuestion(item, { excludeVosotros: state.excludeVosotros });
      if (qSpec) {
        setQuestion({
          item,
          isConjugation: true,
          isGustar: qSpec.isGustar,
          isReciprocal: qSpec.isReciprocal,
          isReflexive: qSpec.isReflexive,
          subjectPronoun: qSpec.subjectPronoun,
          infinitive: qSpec.infinitive,
          prompt: qSpec.prompt,
          tense: qSpec.tense,
          tenseLabel: qSpec.tenseLabel,
          questionWord: qSpec.verb,
          meaning: qSpec.meaning,
          pronoun: qSpec.pronoun,
          correct: qSpec.correct,
          choices: qSpec.choices
        });
        return;
      }
    }

    // Determine question type: 0 = MC es->en, 1 = MC en->es, 2 = typing en->es
    let qType = Math.floor(Math.random() * 3);
    if (qType === 2 && (item.isSentence || item.spanish.includes("/") || item.spanish.includes("(") || item.spanish.length > 25)) {
      qType = Math.random() > 0.5 ? 0 : 1;
    }

    const isEsToEn = qType === 0;
    const correctText = isEsToEn ? formatEnglishPrompt(item.spanish, item.english) : item.spanish;
    const questionText = isEsToEn ? item.spanish : formatEnglishPrompt(item.spanish, item.english);

    // Generate distractors
    const distractors = [];
    let attempts = 0;
    while (distractors.length < 3 && attempts < 50) {
      attempts++;
      const rand = vocabularyData[Math.floor(Math.random() * vocabularyData.length)];
      const val = isEsToEn ? formatEnglishPrompt(rand.spanish, rand.english) : rand.spanish;
      if (
        val &&
        val.toLowerCase() !== correctText.toLowerCase() &&
        !checkSynonyms(val, correctText) &&
        !distractors.includes(val) &&
        val.length < 45
      ) {
        distractors.push(val);
      }
    }

    setQuestion({
      item,
      isConjugation: false,
      type: qType, // 0: MC es->en, 1: MC en->es, 2: typing en->es
      questionWord: questionText,
      correct: correctText,
      choices: [correctText, ...distractors].sort(() => Math.random() - 0.5)
    });
  }, [state.excludeVosotros]);

  const startDungeonRun = useCallback(() => {
    const list = state.mistakes || [];
    const seen = new Set();
    const mapped = [];

    for (const word of list) {
      const item = resolveMistakeItem(word);
      if (item && item.spanish) {
        const key = item.spanish.trim().toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          mapped.push(item);
        }
      }
    }

    setDungeonItems(mapped);
    setCurrentIdx(0);
    setClearedWords(new Set());
    setDungeonFinished(false);
    setAnswered(false);
    setIsAnswerCorrect(false);
    setSelectedChoice(null);
    setTypedAnswer("");

    if (mapped.length > 0) {
      buildDungeonQuestion(mapped[0]);
    }
  }, [state.mistakes, buildDungeonQuestion]);

  // Initialize once on mount with current mistakes snapshot
  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      startDungeonRun();
    }
  }, [startDungeonRun]);

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
      console.warn("Audio synthesis blocked:", e);
    }
  };

  const speakSpanish = (text) => {
    speakSpanishUtil(text, { state });
  };

  const processAnswerResult = (isCorrect) => {
    if (isCorrect) {
      setHealTrigger(true);
      playSound('correct');
      // Healing +10 HP restores health and revives if fainted
      heal(10);
      
      const spanishKey = question.item.spanish;
      setClearedWords(prev => {
        const next = new Set(prev);
        next.add(spanishKey.trim().toLowerCase());
        return next;
      });

      // Safely remove word from global mistake queue in parent state
      removeMistake(spanishKey);
      setTimeout(() => setHealTrigger(false), 500);
    } else {
      setShakeTrigger(true);
      playSound('wrong');
      // Take standard damage (reduced if shield is equipped); stays at 0 if already fainted
      takeDamage(15);
      setTimeout(() => setShakeTrigger(false), 500);
    }
  };

  const handleChoiceAnswer = (choice) => {
    if (answered || !question) return;
    setSelectedChoice(choice);
    setAnswered(true);

    const isCorrect = choice.trim().toLowerCase() === question.correct.trim().toLowerCase() ||
                      compareAnswers(question.correct, choice);
    setIsAnswerCorrect(isCorrect);
    processAnswerResult(isCorrect);
  };

  const handleTypedSubmit = (e) => {
    e.preventDefault();
    if (answered || !typedAnswer.trim() || !question) return;
    setAnswered(true);

    const isCorrect = compareAnswers(question.correct, typedAnswer);
    setIsAnswerCorrect(isCorrect);
    setSelectedChoice(typedAnswer);
    processAnswerResult(isCorrect);
  };

  const finishDungeon = useCallback(() => {
    const numCleared = clearedWords.size;
    const goldBonus = Math.max(10, numCleared * 5);
    const xpBonus = Math.max(20, numCleared * 15);
    addGold(goldBonus);
    addXp(xpBonus);
    setGoldBonusEarned(goldBonus);
    setXpBonusEarned(xpBonus);
    setTotalClearedInSession(numCleared);
    setDungeonFinished(true);

    // If player purified at least one ghost, ensure they leave revived with a healthy HP cushion
    if (numCleared > 0 && (state.fainted || state.hp < 25)) {
      heal(Math.max(25, numCleared * 10));
    }
  }, [clearedWords, addGold, addXp, heal, state.fainted, state.hp]);

  const handleNext = useCallback(() => {
    const nextIdx = currentIdx + 1;
    if (nextIdx < dungeonItems.length) {
      setCurrentIdx(nextIdx);
      buildDungeonQuestion(dungeonItems[nextIdx]);
    } else {
      finishDungeon();
    }
  }, [currentIdx, dungeonItems, buildDungeonQuestion, finishDungeon]);

  // Pressing Enter when answer feedback is shown advances to next question
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (answered && e.key === 'Enter') {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [answered, handleNext]);

  const handleInsertAccent = (char) => {
    if (!inputRef.current) return;
    const start = inputRef.current.selectionStart || 0;
    const end = inputRef.current.selectionEnd || 0;
    const newText = typedAnswer.substring(0, start) + char + typedAnswer.substring(end);
    setTypedAnswer(newText);
    setTimeout(() => {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(start + 1, start + 1);
    }, 0);
  };

  // If no mistakes in queue initially
  if (dungeonItems.length === 0 && !dungeonFinished) {
    return (
      <div className="view-container">
        <div className="view-header">
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem' }}>La Mazmorra de Errores</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Battle and purify vocabulary words you recently got wrong.</p>
          </div>
          <button className="btn btn-secondary" onClick={() => setView('dashboard')}>
            <ArrowLeft size={16} /> Back to Hub
          </button>
        </div>

        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', margin: '40px auto', maxWidth: '500px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px', animation: 'float 3s ease-in-out infinite' }}>
            {state.fainted ? '💀' : '🐉💤'}
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)', fontSize: '1.4rem', marginBottom: '12px' }}>
            {state.fainted ? 'Dungeon Clear, Pero Estás Debilitado' : 'Dungeon Clear!'}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '24px' }}>
            {state.fainted
              ? "You have no active mistakes to fight right now! Since you are fainted, use a Red Potion or Elixir from your bag/shop to restore your health."
              : "The dragon sleeps. You have no active mistakes to clear right now! Go practice quests or mini-games to challenge yourself."}
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button className="btn btn-secondary" onClick={() => setView('dashboard')}>
              Back to Hub
            </button>
            {state.fainted && (
              <button className="btn btn-primary" onClick={() => setView('shop')}>
                Visit Shop
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // If successfully finished the dungeon clearing session
  if (dungeonFinished) {
    const unpurifiedCount = dungeonItems.length - totalClearedInSession;
    return (
      <div className="view-container">
        <div className="view-header">
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem' }}>La Mazmorra de Errores</h2>
          </div>
          <button className="btn btn-secondary" onClick={() => setView('dashboard')}>
            <ArrowLeft size={16} /> Back to Hub
          </button>
        </div>

        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', margin: '40px auto', maxWidth: '500px' }}>
          <Trophy size={64} color="var(--gold)" style={{ margin: '0 auto 16px', animation: 'float 3s ease-in-out infinite' }} />
          <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)', fontSize: '1.6rem', marginBottom: '12px' }}>
            {unpurifiedCount === 0 ? "¡Mazmorra Purificada!" : "¡Batalla Completada!"}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '24px' }}>
            {unpurifiedCount === 0
              ? `You have successfully defeated all ${totalClearedInSession} ghost words and purified the dungeon! Your health has been restored.`
              : `You purified ${totalClearedInSession} of ${dungeonItems.length} ghost words and recovered HP! ${unpurifiedCount} ghost${unpurifiedCount > 1 ? 's' : ''} escaped for now.`}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '28px' }}>
            <span style={{ background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.3)', color: 'var(--gold)', padding: '8px 16px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 'bold' }}>
              +{goldBonusEarned} Gold Coins
            </span>
            <span style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', color: 'var(--primary)', padding: '8px 16px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 'bold' }}>
              +{xpBonusEarned} XP
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {unpurifiedCount > 0 && state.mistakes && state.mistakes.length > 0 && (
              <button className="btn btn-accent" onClick={startDungeonRun} style={{ width: '100%' }}>
                ⚔️ Enfrentar Fantasmas Restantes ({state.mistakes.length})
              </button>
            )}
            <button className="btn btn-primary" onClick={() => setView('dashboard')} style={{ width: '100%' }}>
              Regresar al Castillo
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = question;
  if (!currentQ) return null;

  const currentItem = currentQ.item;
  const isConjugation = currentQ.isConjugation;
  const isTyping = !isConjugation && currentQ.type === 2;

  // Render the battle interface
  return (
    <div className="view-container">
      <div className="view-header">
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem' }}>La Mazmorra de Errores (Mistakes Dungeon)</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Defeating Ghost {currentIdx + 1} of {dungeonItems.length}
          </p>
        </div>
        <button className="btn btn-secondary" onClick={() => setView('dashboard')}>
          Escape Dungeon
        </button>
      </div>

      {/* Battleground Console */}
      <div className={`glass-panel quiz-box ${shakeTrigger ? 'shake-anim' : ''} ${healTrigger ? 'heal-pulse' : ''}`} style={{ border: '1px solid rgba(239, 68, 68, 0.2)' }}>
        
        {/* Recovery Mode Banner when fainted or HP <= 0 */}
        {(state.fainted || state.hp <= 0) && (
          <div style={{ 
            background: 'rgba(16, 185, 129, 0.12)', 
            border: '1px solid rgba(16, 185, 129, 0.35)', 
            borderRadius: '12px', 
            padding: '10px 16px', 
            marginBottom: '16px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            fontSize: '0.85rem',
            color: '#a7f3d0'
          }}>
            <span style={{ fontSize: '1.2rem' }}>✨</span>
            <span>
              <strong>Modo de Recuperación (Soul Recovery):</strong> Cada fantasma purificado restaura <strong>+10 HP</strong> y te revive sin necesidad de pociones.
            </span>
          </div>
        )}

        {/* Dungeon Header stats */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '0.85rem' }}>
          <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            👻 Ghost Category: <strong>{currentItem.subcategory || currentItem.category}</strong>
          </span>
          <span style={{ color: state.hp <= 0 ? 'var(--danger)' : '#10b981', fontWeight: 'bold' }}>
            {state.hp <= 0 ? '💀 HP: 0/100 (Recovery: +10 HP per correct answer)' : `❤️ Your HP: ${state.hp}/100`}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="quiz-progress-track">
          <div 
            className="quiz-progress-fill" 
            style={{ 
              width: `${((currentIdx + (answered && isAnswerCorrect ? 1 : 0)) / dungeonItems.length) * 100}%`, 
              background: 'var(--danger)',
              transition: 'width 0.3s ease'
            }}
          ></div>
        </div>

        {/* Ghost visual box */}
        {(() => {
          const isPret = isConjugation && isPreteriteTense(currentQ);
          return (
            <div style={{ 
              background: 'rgba(0,0,0,0.15)', 
              padding: '24px', 
              borderRadius: '16px', 
              textAlign: 'center', 
              marginBottom: '24px', 
              borderTop: isConjugation
                ? (isPret ? '4px solid #f97316' : '4px solid #10b981')
                : '1px solid rgba(255,255,255,0.02)',
              borderLeft: '1px solid rgba(255,255,255,0.02)',
              borderRight: '1px solid rgba(255,255,255,0.02)',
              borderBottom: '1px solid rgba(255,255,255,0.02)',
              boxShadow: isConjugation
                ? (isPret ? '0 0 20px rgba(249, 115, 22, 0.2)' : '0 0 20px rgba(16, 185, 129, 0.2)')
                : 'none'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px', animation: 'float 2.5s ease-in-out infinite' }}>👻</div>
              
              {isConjugation ? (
                <div>
                  {/* Tasteful Compact Tense Pill */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 14px',
                      borderRadius: '12px',
                      background: isPret 
                        ? 'rgba(249, 115, 22, 0.15)' 
                        : 'rgba(16, 185, 129, 0.15)',
                      border: isPret ? '1px solid #f97316' : '1px solid #10b981',
                      color: isPret ? '#fed7aa' : '#a7f3d0',
                      fontWeight: '700',
                      fontSize: '0.8rem',
                      letterSpacing: '0.03em'
                    }}>
                      <span>{isPret ? '⏳' : '⚡'}</span>
                      <span>{isPret ? 'Tiempo Pretérito (Past Tense)' : 'Tiempo Presente'}</span>
                    </span>
                  </div>

                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Conjugate for the subject pronoun:
                  </div>

                  {/* Prominent Subject + Verb Headline: e.g. "yo (tener)" */}
                  <div style={{ 
                    fontSize: '2.1rem', 
                    fontFamily: 'var(--font-display)', 
                    fontWeight: '800', 
                    margin: '8px 0 4px'
                  }}>
                    <span style={{ color: 'var(--gold)' }}>
                      {currentQ.subjectPronoun || currentQ.questionWord?.split(' ')[0]}
                    </span>{' '}
                    <span style={{ color: 'var(--primary)' }}>
                      ({currentQ.infinitive || currentQ.item?.spanish || currentQ.questionWord?.replace(/^[^(]+\(/, '').replace(/\)$/, '')})
                    </span>
                  </div>

                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '12px' }}>
                    {currentQ.pronoun} • ({currentQ.meaning})
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '4px' }}>
                    {isTyping ? "Write Translation" : "Translate Word / Sentence"}
                  </div>
                  <div>
                    <div className="quiz-word" style={{ fontSize: '2rem' }}>{currentQ.questionWord}</div>
                    <button 
                      onClick={() => speakSpanish(currentItem.spanish)}
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '8px' }}
                      title="Speak Pronunciation"
                    >
                      <Volume2 size={14} /> Pronounce
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })()}

        {/* Input/Choices Area */}
        {isTyping ? (
          <form onSubmit={handleTypedSubmit} className="quiz-input-wrapper">
            <input
              ref={inputRef}
              type="text"
              className={`quiz-input ${answered ? (isAnswerCorrect ? 'correct' : 'wrong') : ''}`}
              placeholder="Type translation in Spanish..."
              value={typedAnswer}
              onChange={(e) => setTypedAnswer(e.target.value)}
              disabled={answered}
              autoFocus
            />
            
            {/* Accent characters insert bar */}
            {!answered && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', margin: '4px 0' }}>
                {['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'].map(char => (
                  <button
                    key={char}
                    type="button"
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '6px 10px', fontSize: '0.8rem', minWidth: '32px' }}
                    onClick={() => handleInsertAccent(char)}
                  >
                    {char}
                  </button>
                ))}
              </div>
            )}

            {!answered && (
              <button type="submit" className="btn btn-danger" style={{ width: '100%', marginTop: '8px' }}>
                ⚔️ Strike Ghost
              </button>
            )}
          </form>
        ) : (
          <div className="quiz-choices-grid">
            {currentQ.choices.map((choice, i) => {
              const isChoiceSelected = selectedChoice === choice;
              const isThisCorrect = choice.trim().toLowerCase() === currentQ.correct.trim().toLowerCase() ||
                                    compareAnswers(currentQ.correct, choice);
              
              let btnClass = "";
              if (answered) {
                if (isThisCorrect) btnClass = "correct";
                else if (isChoiceSelected) btnClass = "wrong";
              } else if (isChoiceSelected) {
                btnClass = "selected";
              }

              return (
                <button
                  key={i}
                  className={`quiz-choice-btn ${btnClass}`}
                  disabled={answered}
                  onClick={() => handleChoiceAnswer(choice)}
                >
                  {choice}
                </button>
              );
            })}
          </div>
        )}

        {/* Feedback box */}
        {answered && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
            <div className={`quiz-feedback-box ${isAnswerCorrect ? 'correct' : 'wrong'}`} style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
              {isAnswerCorrect ? (
                <span>✨ ¡Excelente! Correct answer: <strong>{question.correct}</strong> (Ghost purified! +10 HP restored)</span>
              ) : (
                <span>⚠️ Incorrect! Correct {isConjugation ? `form (${isPreteriteTense(question) ? 'Pretérito / Past' : 'Presente'}):` : 'translation:'} <strong>{question.correct}</strong></span>
              )}
            </div>

            <button className="btn btn-primary" onClick={handleNext} style={{ width: '100%' }}>
              {currentIdx < dungeonItems.length - 1 ? "Next Ghost (Press Enter)" : "Complete Dungeon (Press Enter)"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
