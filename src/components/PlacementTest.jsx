import React, { useState, useEffect } from 'react';
import vocabularyData from '../data/vocabulary.json';
import { formatEnglishPrompt } from '../utils/difficultyMapper';
import { Swords, ArrowRight, Trophy } from 'lucide-react';
import { generateConjugationQuestion } from '../utils/conjugationHelper';
import { generateSentenceBuilderQuestion } from '../utils/sentenceBuilderHelper';
import SentenceBuilder from './SentenceBuilder';

export default function PlacementTest({ completePlacement }) {
  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0); // 0 to 15
  const [questionsList, setQuestionsList] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Generate 16 balanced questions:
  // - 8 Vocabulary (1 from each core 101 subcategory)
  // - 4 Verb Conjugation (Present tense of core 101 verbs)
  // - 4 Sentence Construction (Drag-and-drop / tap syntax with distractors)
  const generateQuestions = () => {
    // 1. Eight Core Vocabulary Questions
    const targetSubcategories = [
      "Greetings, Goodbyes, & Conversation",
      "Family",
      "Food and Drinks",
      "People and Professions",
      "Numbers",
      "Time, Days, Months, and Seasons",
      "Sports and Hobbies",
      "Colors"
    ];

    const vocabQuestions = [];

    targetSubcategories.forEach(sub => {
      const subWords = vocabularyData.filter(item => item.subcategory === sub);
      if (subWords.length === 0) return;

      const shuffled = [...subWords].sort(() => Math.random() - 0.5);
      const randWord = shuffled[0];

      // Translation direction: 0 = Spanish to English, 1 = English to Spanish
      const qType = Math.random() > 0.5 ? 1 : 0;
      const correctVal = qType === 1 ? randWord.spanish : formatEnglishPrompt(randWord.spanish, randWord.english);
      const questionWord = qType === 1 ? formatEnglishPrompt(randWord.spanish, randWord.english) : randWord.spanish;

      const distractors = [];
      const shuffledSub = [...subWords].sort(() => Math.random() - 0.5);
      for (let item of shuffledSub) {
        const val = qType === 1 ? item.spanish : formatEnglishPrompt(item.spanish, item.english);
        if (val.toLowerCase() !== correctVal.toLowerCase() && !distractors.includes(val) && val.length < 35) {
          distractors.push(val);
        }
        if (distractors.length === 3) break;
      }

      if (distractors.length < 3) {
        const shuffledAll = [...vocabularyData].sort(() => Math.random() - 0.5);
        for (let item of shuffledAll) {
          const val = qType === 1 ? item.spanish : formatEnglishPrompt(item.spanish, item.english);
          if (val.toLowerCase() !== correctVal.toLowerCase() && !distractors.includes(val) && val.length < 35) {
            distractors.push(val);
          }
          if (distractors.length === 3) break;
        }
      }

      const choices = [correctVal, ...distractors].sort(() => Math.random() - 0.5);

      vocabQuestions.push({
        isVocab: true,
        spanish: questionWord,
        correct: correctVal,
        choices: choices,
        subcategory: sub,
        originalItem: randWord
      });
    });

    // 2. Four Verb Conjugation Questions (Present Tense of Core 101 Verbs)
    const CORE_101_VERBS = [
      { spanish: "hablar", english: "to speak" },
      { spanish: "comer", english: "to eat" },
      { spanish: "vivir", english: "to live" },
      { spanish: "tener", english: "to have" },
      { spanish: "ser", english: "to be (identity/characteristic)" },
      { spanish: "estar", english: "to be (state/location)" },
      { spanish: "ir", english: "to go" },
      { spanish: "hacer", english: "to do / make" },
      { spanish: "querer", english: "to want" },
      { spanish: "estudiar", english: "to study" },
      { spanish: "comprar", english: "to buy" }
    ];

    const shuffledVerbs = [...CORE_101_VERBS].sort(() => Math.random() - 0.5);
    const chosenVerbs = shuffledVerbs.slice(0, 4);
    const conjugationQuestions = chosenVerbs.map(v => {
      const qSpec = generateConjugationQuestion(v, { tense: "present", excludeVosotros: true });
      return {
        isConjugation: true,
        verb: qSpec.verb,
        infinitive: qSpec.infinitive,
        subjectPronoun: qSpec.subjectPronoun,
        prompt: qSpec.prompt,
        meaning: qSpec.meaning,
        pronoun: qSpec.pronoun,
        tense: qSpec.tense,
        tenseLabel: qSpec.tenseLabel,
        correct: qSpec.correct,
        choices: qSpec.choices,
        spanish: qSpec.verb
      };
    });

    // 3. Four Sentence Construction Questions (Drag & Drop / Tap from Unit 1 pool)
    const sentenceQuestions = [];
    const usedSentences = new Set();
    while (sentenceQuestions.length < 4) {
      const sSpec = generateSentenceBuilderQuestion({ unit: 1 });
      if (!usedSentences.has(sSpec.targetSentence)) {
        usedSentences.add(sSpec.targetSentence);
        sentenceQuestions.push({
          isSentenceBuilder: true,
          ...sSpec,
          correct: sSpec.targetSentence,
          spanish: sSpec.prompt,
          choices: []
        });
      }
    }

    // Combine and shuffle all 16 questions
    const allQuestions = [...vocabQuestions, ...conjugationQuestions, ...sentenceQuestions];
    return allQuestions.sort(() => Math.random() - 0.5);
  };

  // Generate questions list on mount
  useEffect(() => {
    const list = generateQuestions();
    setQuestionsList(list);
    if (list.length > 0) {
      setActiveQuestion(list[0]);
    }
  }, []);

  const handleSelect = (choice) => {
    if (selectedAnswer !== null) return; // locked
    setSelectedAnswer(choice);
    
    const isCorrect = choice.trim().toLowerCase() === activeQuestion.correct.trim().toLowerCase();

    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleSentenceAnswer = (isCorrect, answerStr) => {
    if (selectedAnswer !== null) return; // locked
    setSelectedAnswer(isCorrect ? activeQuestion.correct : answerStr);

    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);

    if (currentIdx < 15) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      setActiveQuestion(questionsList[nextIdx]);
    } else {
      setIsFinished(true);
    }
  };

  const getPlacementRank = () => {
    if (score >= 13) {
      return { 
        level: "Maestro 101 (Ready for Unit 2)", 
        stage: 2,
        gold: score * 10, 
        xp: score * 40, 
        desc: "¡Increíble! You scored wonderfully on the Spanish 101 evaluation. You may skip the Unit 1 review and advance straight into Unit 2!" 
      };
    }
    return { 
      level: "Repaso 101 (Unit 1 Review)", 
      stage: 1,
      gold: score * 10, 
      xp: score * 40, 
      desc: "¡Bienvenido! You will start at Unit 1 (Repaso de Español 101) to reinforce your foundations before advancing to new 102 material." 
    };
  };

  const handleFinish = () => {
    const rank = getPlacementRank();
    completePlacement(score, rank.stage);
  };

  if (!started) {
    return (
      <div className="glass-panel quiz-box" style={{ textAlign: 'center', padding: '40px', maxWidth: '500px', margin: '40px auto', animation: 'pop-in 0.4s ease-out' }}>
        <Swords size={60} color="var(--accent)" style={{ margin: '0 auto 20px', animation: 'float 3s ease-in-out infinite' }} />
        <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', marginBottom: '12px' }}>Prueba de Nivel</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '30px' }}>
          Welcome to Estudiamos 102! This comprehensive 16-question placement test determines your starting stage. It evaluates your core Spanish 101 foundations: 8 essential vocabulary terms, 4 present-tense verb conjugations, and 4 sentence construction challenges (drag and drop words into proper grammar order).
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button className="btn btn-primary" onClick={() => setStarted(true)} style={{ padding: '14px', fontSize: '1rem', fontWeight: 'bold' }}>
            Take Placement Test <ArrowRight size={16} />
          </button>
          <button className="btn btn-secondary" onClick={() => completePlacement(0, 1)} style={{ padding: '12px', fontSize: '0.9rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--card-border)' }}>
            Skip & Start from Beginning (Stage 1)
          </button>
        </div>
      </div>
    );
  }

  if (!activeQuestion) {
    return <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>Loading Placement Assessment...</div>;
  }

  if (isFinished) {
    const rank = getPlacementRank();
    return (
      <div className="glass-panel quiz-box" style={{ animation: 'pop-in 0.4s ease-out' }}>
        <div style={{ textAlign: 'center', padding: '10px' }}>
          <Trophy size={60} color="var(--gold)" style={{ margin: '0 auto 16px', animation: 'float 3s ease-in-out infinite' }} />
          <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>Evaluación Completada</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Assessment finished!</p>
          
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '16px', border: '1px solid var(--card-border)', marginBottom: '30px' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Score / Total Questions</div>
            <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--accent)', margin: '8px 0' }}>
              {score} / 16
            </div>
            
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--gold)', marginTop: '16px' }}>
              Unlocking: {rank.level}
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '8px', maxWidth: '380px', margin: '8px auto 0', lineHeight: '1.4' }}>
              {rank.desc}
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ display: 'block', color: 'var(--gold)', fontWeight: 800, fontSize: '1.2rem' }}>+{rank.gold}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Gold Coins</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ display: 'block', color: 'var(--primary)', fontWeight: 800, fontSize: '1.2rem' }}>+{rank.xp}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>XP Bonus</span>
              </div>
            </div>
          </div>

          <button className="btn btn-accent" onClick={handleFinish} style={{ width: '100%', maxWidth: '280px', margin: '0 auto' }}>
            Comenzar Búsqueda <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel quiz-box">
      <div className="quiz-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Swords size={20} color="var(--primary)" />
          <span style={{ fontWeight: 700, fontFamily: 'var(--font-display)' }}>Placement Assessment</span>
        </div>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Question {currentIdx + 1} of 16</span>
      </div>

      <div className="quiz-progress-track">
        <div className="quiz-progress-fill" style={{ width: `${((currentIdx + 1) / 16) * 100}%` }}></div>
      </div>

      {/* Conjugation Card */}
      {activeQuestion.isConjugation ? (
        <div className="quiz-question-card" style={{ textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid #10b981',
            borderRadius: '12px',
            padding: '3px 12px',
            color: '#a7f3d0',
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            marginBottom: '8px'
          }}>
            ⚡ Tiempo Presente
          </div>
          <div className="quiz-question-lbl" style={{ marginBottom: '4px' }}>
            Conjugate for the subject pronoun:
          </div>
          <h3 className="quiz-word" style={{ fontSize: '2.2rem', margin: '6px 0 4px' }}>
            <span style={{ color: 'var(--gold)', fontWeight: 800 }}>
              {activeQuestion.subjectPronoun || activeQuestion.verb?.split(' ')[0]}
            </span>{' '}
            <span style={{ color: 'var(--primary)' }}>
              ({activeQuestion.infinitive || activeQuestion.spanish?.replace(/^[^(]+\(/, '').replace(/\)$/, '')})
            </span>
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontStyle: 'italic', margin: 0 }}>
            {activeQuestion.pronoun} • ({activeQuestion.meaning})
          </p>
        </div>
      ) : !activeQuestion.isSentenceBuilder ? (
        /* Standard Vocabulary Card */
        <div className="quiz-question-card">
          <div className="quiz-question-lbl">
            Translate this term:
          </div>
          <h3 className="quiz-word">{activeQuestion.spanish}</h3>
        </div>
      ) : null}

      {/* Question Interaction Area */}
      {activeQuestion.isSentenceBuilder ? (
        <div style={{ marginTop: '10px' }}>
          <SentenceBuilder
            question={activeQuestion}
            onAnswer={handleSentenceAnswer}
            answered={selectedAnswer !== null}
            userCorrect={selectedAnswer === activeQuestion.correct}
            showSubmitButton={true}
          />
        </div>
      ) : (
        <div className="quiz-choices-grid">
          {activeQuestion.choices.map((choice, idx) => {
            let btnClass = "";
            if (selectedAnswer !== null) {
              if (choice === activeQuestion.correct) {
                btnClass = "correct";
              } else if (choice === selectedAnswer) {
                btnClass = "wrong";
              }
            }

            return (
              <button
                key={idx}
                className={`quiz-choice-btn ${btnClass}`}
                onClick={() => handleSelect(choice)}
                disabled={selectedAnswer !== null}
              >
                {choice}
              </button>
            );
          })}
        </div>
      )}

      {selectedAnswer !== null && (
        <div 
          className={`quiz-feedback-box ${selectedAnswer === activeQuestion.correct ? 'correct' : 'wrong'}`}
          style={{ animation: 'pop-in 0.3s ease-out' }}
        >
          {selectedAnswer === activeQuestion.correct 
            ? "¡Correcto! Bien hecho." 
            : activeQuestion.isSentenceBuilder
              ? `Incorrecto. Frase correcta: "${activeQuestion.correct}".`
              : activeQuestion.isConjugation
                ? `Incorrecto. Forma correcta: "${activeQuestion.correct}".`
                : `Incorrecto. Correct translation: "${activeQuestion.correct}".`
          }
          <button 
            className="btn btn-primary" 
            onClick={handleNext}
            style={{ width: '100%', marginTop: '16px' }}
          >
            {currentIdx === 15 ? "Finish Test" : "Next Question"} <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
