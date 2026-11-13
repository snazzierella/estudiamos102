import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  Eye, 
  EyeOff, 
  RotateCcw, 
  Check, 
  Sparkles, 
  AlertCircle, 
  ArrowLeft, 
  ArrowRight, 
  Mic, 
  MicOff, 
  Trophy, 
  HelpCircle,
  Globe 
} from 'lucide-react';
import { 
  MIDTERM_TITLE, 
  MIDTERM_QUESTIONS, 
  OPEN_WORD_BANK, 
  translateCustomSentence, 
  validateOralExamAnswer 
} from '../data/midtermOralExamData';
import { speakSpanish, stopSpanishSpeech } from '../utils/speechHelper';
import { t } from '../utils/translationsHelper';

export default function OralExamPractice({ 
  state, 
  setView, 
  recordOralQuestionCompleted, 
  awardMidtermOpenRewards,
  awardMidtermChallengeRewards,
  toggleTranslateInstructions 
}) {
  const translate = Boolean(state?.translateInstructions);

  // Current question index (0 to 9)
  const [currentIdx, setCurrentIdx] = useState(0);
  const currentQuestion = MIDTERM_QUESTIONS[currentIdx];

  // Modes: 'guided' (Modo Guiado), 'open' (Modo Libre), 'challenge' (Modo Desafío)
  const [mode, setMode] = useState('guided');

  // Audio & Listening state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isQuestionRevealed, setIsQuestionRevealed] = useState(false);
  const [isQuestionTranslationRevealed, setIsQuestionTranslationRevealed] = useState(false);
  const [isTargetMeaningRevealed, setIsTargetMeaningRevealed] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState(1.0); // 1.0 (Normal) or 0.75 (Lento)
  const isFirstMountRef = useRef(true);
  const audioTimeoutRef = useRef(null);

  // Guided Mode state
  const [selectedPathId, setSelectedPathId] = useState(currentQuestion.guidedPaths[0].id);
  const [guidedPlacedTokens, setGuidedPlacedTokens] = useState([]);
  const [guidedBankTokens, setGuidedBankTokens] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [guidedAnswered, setGuidedAnswered] = useState(false);
  const [guidedIsCorrect, setGuidedIsCorrect] = useState(false);

  // Open Mode (Modo Libre) state
  const [openCategory, setOpenCategory] = useState('verbos');
  const [openPlacedTokens, setOpenPlacedTokens] = useState([]);
  const [openAnswers, setOpenAnswers] = useState({}); // { [idx]: { text, isCorrect, feedback, translation } }
  const [openAnswered, setOpenAnswered] = useState(false);
  const [openFeedback, setOpenFeedback] = useState(null);
  const [showOpenModal, setShowOpenModal] = useState(false);
  const [openFinalResult, setOpenFinalResult] = useState(null);

  // Challenge Mode state
  const [challengeAnswers, setChallengeAnswers] = useState({}); // { [idx]: { text, isCorrect, feedback, translation } }
  const [challengeInput, setChallengeInput] = useState("");
  const [challengeAnswered, setChallengeAnswered] = useState(false);
  const [challengeFeedback, setChallengeFeedback] = useState(null);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [challengeFinalResult, setChallengeFinalResult] = useState(null);

  // Speech Recognition state
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [pronunciationScore, setPronunciationScore] = useState(null);
  const [isTestingPronunciation, setIsTestingPronunciation] = useState(false);
  const recognitionRef = useRef(null);

  // Clean up any timers or audio on unmount
  useEffect(() => {
    return () => {
      stopSpanishSpeech();
      if (audioTimeoutRef.current) clearTimeout(audioTimeoutRef.current);
    };
  }, []);

  // Setup Speech Recognition on mount
  useEffect(() => {
    const SpeechRecognition = typeof window !== 'undefined' && 
      (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!SpeechRecognition) {
      setSpeechSupported(false);
    }
  }, []);

  // Current guided path
  const currentPath = currentQuestion.guidedPaths.find(p => p.id === selectedPathId) || currentQuestion.guidedPaths[0];

  // Question navigation effect
  useEffect(() => {
    // Reset revealed state on question change
    setIsQuestionRevealed(false);
    setIsQuestionTranslationRevealed(false);
    setIsTargetMeaningRevealed(false);
    setGuidedAnswered(false);
    setGuidedIsCorrect(false);
    setShowHint(false);
    setPronunciationScore(null);
    setIsPlayingAudio(false);
    stopSpanishSpeech();
    if (audioTimeoutRef.current) clearTimeout(audioTimeoutRef.current);

    // Reset guided tokens to default path
    const defaultPath = currentQuestion.guidedPaths[0];
    setSelectedPathId(defaultPath.id);
    initGuidedTokens(defaultPath);

    // Open mode state for current question
    const existingOpen = openAnswers[currentIdx];
    if (existingOpen) {
      setOpenAnswered(true);
      setOpenFeedback({ isValid: true, feedback: existingOpen.feedback });
    } else {
      setOpenPlacedTokens([]);
      setOpenAnswered(false);
      setOpenFeedback(null);
    }

    // If challenge answer already recorded for this question, load it
    const existing = challengeAnswers[currentIdx];
    if (existing) {
      setChallengeInput(existing.text || "");
      setChallengeAnswered(true);
      setChallengeFeedback({ isCorrect: existing.isCorrect, text: existing.feedback, translation: existing.translation });
    } else {
      setChallengeInput("");
      setChallengeAnswered(false);
      setChallengeFeedback(null);
    }

    // Auto-play on question change if the user has navigated (not on initial cold mount)
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
    } else {
      playQuestionAudio(audioSpeed);
    }
  }, [currentIdx]);

  // Handle path switch in guided mode
  const handleSelectPath = (path) => {
    setSelectedPathId(path.id);
    initGuidedTokens(path);
    setGuidedAnswered(false);
    setGuidedIsCorrect(false);
    setShowHint(false);
  };

  const initGuidedTokens = (path) => {
    const words = path.targetSentence.split(" ").filter(Boolean);
    const targetTokens = words.map((w, i) => ({
      id: `target-${i}-${w}`,
      text: w,
      isDistractor: false
    }));

    const distractors = (path.distractors || []).map((w, i) => ({
      id: `dist-${i}-${w}`,
      text: w,
      isDistractor: true
    }));

    const allTokens = [...targetTokens, ...distractors].sort(() => Math.random() - 0.5);
    setGuidedBankTokens(allTokens);
    setGuidedPlacedTokens([]);
  };

  // Audio Playback
  const playQuestionAudio = (rate) => {
    const targetRate = typeof rate === 'number' ? rate : audioSpeed;
    if (audioTimeoutRef.current) clearTimeout(audioTimeoutRef.current);

    stopSpanishSpeech();
    setIsPlayingAudio(true);

    speakSpanish(currentQuestion.question, {
      state,
      rate: targetRate,
      onStart: () => setIsPlayingAudio(true),
      onEnd: () => setIsPlayingAudio(false)
    });

    // Safety fallback timeout to prevent stuck playing states
    const safetyMs = Math.max(4000, Math.round((currentQuestion.question.length * 140) / targetRate));
    audioTimeoutRef.current = setTimeout(() => {
      setIsPlayingAudio(false);
    }, safetyMs);
  };

  const handleSetSpeedAndPlay = (speed) => {
    setAudioSpeed(speed);
    playQuestionAudio(speed);
  };

  const playSentenceAudio = (text, rate) => {
    const targetRate = typeof rate === 'number' ? rate : audioSpeed;
    stopSpanishSpeech();
    speakSpanish(text, {
      state,
      rate: targetRate
    });
  };

  // Guided Mode actions
  const handleGuidedBankClick = (token) => {
    if (guidedAnswered) return;
    setGuidedBankTokens(prev => prev.filter(t => t.id !== token.id));
    setGuidedPlacedTokens(prev => [...prev, token]);
  };

  const handleGuidedPlacedClick = (token) => {
    if (guidedAnswered) return;
    setGuidedPlacedTokens(prev => prev.filter(t => t.id !== token.id));
    setGuidedBankTokens(prev => [...prev, token]);
  };

  const handleResetGuided = () => {
    if (guidedAnswered) return;
    initGuidedTokens(currentPath);
  };

  const handleCheckGuided = () => {
    const assembled = guidedPlacedTokens.map(t => t.text.toLowerCase().trim()).join(" ");
    const target = currentPath.targetSentence.toLowerCase().trim();

    if (assembled === target) {
      setGuidedIsCorrect(true);
      setGuidedAnswered(true);
      if (recordOralQuestionCompleted) {
        recordOralQuestionCompleted(currentQuestion.id);
      }
    } else {
      setGuidedIsCorrect(false);
      setGuidedAnswered(true);
    }
  };

  // Open Mode (Modo Libre) actions
  const handleOpenBankClick = (token) => {
    if (openAnswered) return;
    setOpenPlacedTokens(prev => [...prev, { ...token, id: `${token.text}-${Date.now()}-${Math.random()}` }]);
  };

  const handleOpenPlacedClick = (token) => {
    if (openAnswered) return;
    setOpenPlacedTokens(prev => prev.filter(t => t.id !== token.id));
  };

  const handleResetOpen = () => {
    if (openAnswered) return;
    setOpenPlacedTokens([]);
    setOpenAnswered(false);
    setOpenFeedback(null);
  };

  const handleCheckOpen = () => {
    if (openPlacedTokens.length === 0) return;
    const assembledText = openPlacedTokens.map(t => t.text).join(" ");
    const validation = validateOralExamAnswer(currentQuestion.id, assembledText, translate);

    setOpenAnswered(true);
    setOpenFeedback(validation);

    if (validation.isValid) {
      if (recordOralQuestionCompleted) {
        recordOralQuestionCompleted(currentQuestion.id);
      }

      const updated = {
        ...openAnswers,
        [currentIdx]: {
          text: assembledText,
          isCorrect: true,
          feedback: validation.feedback,
          translation: translateCustomSentence(openPlacedTokens)
        }
      };
      setOpenAnswers(updated);

      const score = Object.values(updated).filter(a => a.isCorrect).length;
      const answeredCount = Object.keys(updated).length;

      if (score >= 9 && awardMidtermOpenRewards) {
        const res = awardMidtermOpenRewards(score);
        if (res?.earnedReadyBadge || answeredCount >= 10) {
          setOpenFinalResult({ score, ...res });
          setShowOpenModal(true);
        }
      } else if (answeredCount >= 10) {
        setOpenFinalResult({ score });
        setShowOpenModal(true);
      }
    }
  };

  // Challenge Mode actions
  const handleInsertAccent = (char) => {
    setChallengeInput(prev => prev + char);
  };

  const handleToggleMic = () => {
    const SpeechRecognition = typeof window !== 'undefined' && 
      (window.SpeechRecognition || window.webkitSpeechRecognition);

    if (!SpeechRecognition) {
      alert("Tu navegador no soporta reconocimiento de voz nativo. Por favor escribe tu respuesta en el cuadro de texto.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-MX';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setChallengeInput(prev => (prev ? prev + " " + transcript : transcript));
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.warn("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.error("Speech recognition startup error:", e);
      setIsListening(false);
    }
  };

  const handleCheckChallenge = () => {
    if (!challengeInput.trim()) return;

    const validation = validateOralExamAnswer(currentQuestion.id, challengeInput, translate);
    setChallengeAnswered(true);
    setChallengeFeedback({
      isCorrect: validation.isValid,
      text: validation.feedback,
      translation: validation.userTranslation
    });

    const updated = {
      ...challengeAnswers,
      [currentIdx]: {
        text: challengeInput.trim(),
        isCorrect: validation.isValid,
        feedback: validation.feedback,
        translation: validation.userTranslation
      }
    };
    setChallengeAnswers(updated);

    if (validation.isValid && recordOralQuestionCompleted) {
      recordOralQuestionCompleted(currentQuestion.id);
    }

    // Check if all 10 questions answered in challenge mode
    const answeredCount = Object.keys(updated).length;
    if (answeredCount >= 10) {
      const score = Object.values(updated).filter(a => a.isCorrect).length;
      if (awardMidtermChallengeRewards) {
        const rewardResult = awardMidtermChallengeRewards(score);
        setChallengeFinalResult({ score, ...rewardResult });
      } else {
        setChallengeFinalResult({ score });
      }
      setShowChallengeModal(true);
    }
  };

  // Practice Pronunciation tool
  const handleTestPronunciation = (targetText) => {
    const SpeechRecognition = typeof window !== 'undefined' && 
      (window.SpeechRecognition || window.webkitSpeechRecognition);

    if (!SpeechRecognition) {
      alert("El reconocimiento de voz no está disponible en este navegador. Puedes escuchar la pronunciación y practicar en voz alta.");
      return;
    }

    if (isTestingPronunciation) {
      recognitionRef.current?.stop();
      setIsTestingPronunciation(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-MX';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsTestingPronunciation(true);
        setPronunciationScore({ status: 'listening', message: 'Escuchando... di tu respuesta en voz alta.' });
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setIsTestingPronunciation(false);

        // Compare target vs transcript
        const targetClean = targetText.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()¿?¡!]/g, "");
        const heardClean = transcript.replace(/[.,/#!$%^&*;:{}=\-_`~()¿?¡!]/g, "");

        const targetWords = targetClean.split(" ").filter(Boolean);
        const heardWords = heardClean.split(" ").filter(Boolean);

        let matches = 0;
        targetWords.forEach(w => {
          if (heardWords.includes(w)) matches++;
        });

        const percent = Math.min(100, Math.round((matches / targetWords.length) * 100));

        setPronunciationScore({
          status: 'result',
          transcript,
          percentage: percent,
          feedback: percent >= 80 
            ? "¡Excelente pronunciación! Tu acento y fluidez en pretérito son claros." 
            : percent >= 50 
            ? "¡Buen intento! Se entendió la idea principal. Escucha el audio de nuevo e inténtalo una vez más." 
            : "Sigue practicando. Escucha el audio modelo para perfeccionar el ritmo."
        });
      };

      recognition.onerror = () => {
        setIsTestingPronunciation(false);
        setPronunciationScore({ status: 'error', message: 'No se pudo captar el audio del micrófono.' });
      };

      recognition.onend = () => {
        setIsTestingPronunciation(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.error(e);
      setIsTestingPronunciation(false);
    }
  };

  // Navigate between questions
  const handlePrev = () => {
    if (currentIdx > 0) setCurrentIdx(currentIdx - 1);
  };

  const handleNext = () => {
    if (currentIdx < MIDTERM_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else if (mode === 'open') {
      const score = Object.values(openAnswers).filter(a => a.isCorrect).length;
      if (awardMidtermOpenRewards) {
        const res = awardMidtermOpenRewards(score);
        setOpenFinalResult({ score, ...res });
      } else {
        setOpenFinalResult({ score });
      }
      setShowOpenModal(true);
    } else if (mode === 'challenge') {
      const score = Object.values(challengeAnswers).filter(a => a.isCorrect).length;
      if (awardMidtermChallengeRewards) {
        const rewardResult = awardMidtermChallengeRewards(score);
        setChallengeFinalResult({ score, ...rewardResult });
      } else {
        setChallengeFinalResult({ score });
      }
      setShowChallengeModal(true);
    }
  };

  const completedCount = state.oralExamProgress?.completedQuestions?.length || 0;

  return (
    <div className="view-container" style={{ maxWidth: '940px', margin: '0 auto', paddingBottom: '60px' }}>
      
      {/* Top Header & Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
        <button 
          className="btn btn-secondary btn-sm" 
          onClick={() => setView('dashboard')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <ArrowLeft size={15} /> {t('midtermReturnDashboard', translate)}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {toggleTranslateInstructions && (
            <button
              type="button"
              className={`btn ${translate ? 'btn-primary' : 'btn-secondary'} btn-sm`}
              onClick={toggleTranslateInstructions}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', padding: '4px 10px', borderRadius: '16px' }}
              title={translate ? "Switch instructions to Spanish" : "Traducir instrucciones al inglés"}
            >
              <Globe size={13} />
              <span>{translate ? "🌐 English" : "🌐 Español"}</span>
            </button>
          )}

          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {t('midtermOverallProgress', translate, completedCount)}
          </span>
          {state.hasMidtermHpDoubler && (
            <span style={{ 
              background: 'rgba(245, 158, 11, 0.15)', 
              color: '#fbbf24', 
              padding: '3px 8px', 
              borderRadius: '8px', 
              fontSize: '0.75rem', 
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              border: '1px solid rgba(245, 158, 11, 0.3)'
            }}>
              {t('midtermTitanHeartBadge', translate)}
            </span>
          )}
        </div>
      </div>

      {/* Main Title Banner */}
      <div className="glass-panel" style={{ 
        padding: '20px 24px', 
        borderRadius: '16px', 
        marginBottom: '20px', 
        background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(99, 102, 241, 0.08) 100%)',
        border: '1px solid rgba(236, 72, 153, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <span style={{ fontSize: '1.8rem' }}>🎙️</span>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', margin: 0, color: 'var(--text-primary)' }}>
              {t('midtermTitle', translate)}
            </h2>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {MIDTERM_TITLE.spanish} • <em>"{MIDTERM_TITLE.english}"</em>
            </span>
          </div>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '8px 0 0 0', lineHeight: 1.4 }}>
          {translate && MIDTERM_TITLE.contextEn ? MIDTERM_TITLE.contextEn : MIDTERM_TITLE.context} {t('midtermPdfBasis', translate)}
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button
          className={`btn ${mode === 'guided' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setMode('guided')}
          style={{ flex: 1, minWidth: '160px', padding: '10px 14px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <span>🎓</span>
          <div>
            <strong>{t('midtermModeGuided', translate)}</strong>
            <span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.8 }}>{t('midtermModeGuidedSub', translate)}</span>
          </div>
        </button>

        <button
          className={`btn ${mode === 'open' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setMode('open')}
          style={{ flex: 1, minWidth: '160px', padding: '10px 14px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <span>🧩</span>
          <div>
            <strong>{t('midtermModeOpen', translate)}</strong>
            <span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.8 }}>{t('midtermModeOpenSub', translate)}</span>
          </div>
        </button>

        <button
          className={`btn ${mode === 'challenge' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setMode('challenge')}
          style={{ 
            flex: 1, 
            minWidth: '160px', 
            padding: '10px 14px', 
            fontSize: '0.85rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '8px',
            borderColor: mode === 'challenge' ? 'var(--primary)' : 'rgba(245, 158, 11, 0.4)',
            background: mode === 'challenge' ? undefined : 'rgba(245, 158, 11, 0.05)'
          }}
        >
          <span>⚔️</span>
          <div>
            <strong style={{ color: mode === 'challenge' ? '#fff' : '#fbbf24' }}>{t('midtermModeChallenge', translate)}</strong>
            <span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.8 }}>{t('midtermModeChallengeSub', translate)}</span>
          </div>
        </button>
      </div>

      {/* Question Card (Audio-First with Reveal) */}
      <div className="glass-panel" style={{ 
        padding: '24px', 
        borderRadius: '16px', 
        marginBottom: '20px',
        border: '1px solid var(--card-border)',
        position: 'relative'
      }}>
        {/* Question Header & Counter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ 
            background: 'rgba(99, 102, 241, 0.15)', 
            color: 'var(--primary)', 
            padding: '4px 10px', 
            borderRadius: '20px', 
            fontSize: '0.78rem', 
            fontWeight: 700 
          }}>
            {t('midtermQuestionCounter', translate, currentIdx + 1, MIDTERM_QUESTIONS.length)}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {state.oralExamProgress?.completedQuestions?.includes(currentQuestion.id) && (
              <span style={{ color: 'var(--accent)', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Check size={14} /> {t('midtermCompletedCheck', translate)}
              </span>
            )}
          </div>
        </div>

        {/* Audio Player Controls */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          background: 'rgba(255, 255, 255, 0.02)', 
          padding: '12px 16px', 
          borderRadius: '12px', 
          border: '1px solid var(--card-border)',
          marginBottom: '16px',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <button
              className={`btn ${isPlayingAudio ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => playQuestionAudio(audioSpeed)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600 }}
            >
              <Volume2 size={16} />
              <span>{isPlayingAudio ? (translate ? "Playing..." : "Reproduciendo...") : t('midtermListenAudio', translate)}</span>
            </button>

            {/* Interactive Speed Toggle Segment */}
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              background: 'rgba(0, 0, 0, 0.3)', 
              borderRadius: '24px', 
              padding: '3px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              gap: '2px'
            }}>
              <button
                type="button"
                onClick={() => handleSetSpeedAndPlay(1.0)}
                className="btn btn-sm"
                style={{ 
                  borderRadius: '20px', 
                  fontSize: '0.75rem', 
                  padding: '4px 10px',
                  fontWeight: audioSpeed === 1.0 ? 700 : 500,
                  background: audioSpeed === 1.0 ? 'var(--primary)' : 'transparent',
                  color: audioSpeed === 1.0 ? '#fff' : 'var(--text-secondary)',
                  border: audioSpeed === 1.0 ? '1px solid rgba(255, 255, 255, 0.25)' : 'none',
                  boxShadow: audioSpeed === 1.0 ? '0 2px 8px rgba(99, 102, 241, 0.4)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                title={translate ? "Normal speed (1.0x)" : "Velocidad normal (1.0x)"}
              >
                {t('midtermListenNormal', translate)}
              </button>

              <button
                type="button"
                onClick={() => handleSetSpeedAndPlay(0.75)}
                className="btn btn-sm"
                style={{ 
                  borderRadius: '20px', 
                  fontSize: '0.75rem', 
                  padding: '4px 10px',
                  fontWeight: audioSpeed === 0.75 ? 700 : 500,
                  background: audioSpeed === 0.75 ? '#d97706' : 'transparent',
                  color: audioSpeed === 0.75 ? '#fff' : 'var(--text-secondary)',
                  border: audioSpeed === 0.75 ? '1px solid rgba(245, 158, 11, 0.5)' : 'none',
                  boxShadow: audioSpeed === 0.75 ? '0 2px 8px rgba(217, 119, 6, 0.4)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                title={translate ? "Slow, clear speed (0.75x)" : "Velocidad lenta clara (0.75x)"}
              >
                {t('midtermListenSlow', translate)}
              </button>
            </div>
          </div>

          <button
            className="btn btn-secondary"
            onClick={() => setIsQuestionRevealed(!isQuestionRevealed)}
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              fontSize: '0.8rem',
              borderColor: isQuestionRevealed ? 'var(--card-border)' : 'var(--primary)'
            }}
          >
            {isQuestionRevealed ? <EyeOff size={15} /> : <Eye size={15} />}
            <span>{isQuestionRevealed ? t('midtermHideQuestion', translate) : t('midtermShowQuestion', translate)}</span>
          </button>
        </div>

        {/* Revealed vs Hidden Text Zone */}
        {isQuestionRevealed ? (
          <div style={{ animation: 'pop-in 0.25s ease-out' }}>
            <h3 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: '1.45rem', 
              color: 'var(--text-primary)', 
              margin: '0 0 8px 0',
              lineHeight: 1.3 
            }}>
              {currentQuestion.question}
            </h3>

            {/* English translation: Concealed before answering; revealed via toggle or post-answer */}
            {mode === 'challenge' ? (
              <div style={{ 
                padding: '6px 10px', 
                borderRadius: '8px', 
                background: 'rgba(245, 158, 11, 0.08)', 
                border: '1px solid rgba(245, 158, 11, 0.25)', 
                marginBottom: '12px',
                fontSize: '0.75rem',
                color: '#fbbf24'
              }}>
                {t('midtermChallengeNoTranslationNotice', translate)}
              </div>
            ) : (
              <div style={{ marginBottom: '12px' }}>
                {isQuestionTranslationRevealed ? (
                  <div style={{ 
                    padding: '8px 12px', 
                    borderRadius: '8px', 
                    background: 'rgba(59, 130, 246, 0.08)', 
                    border: '1px solid rgba(59, 130, 246, 0.25)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: '#93c5fd', fontWeight: 700, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        🇺🇸 {t('midtermQuestionMeaningLabel', translate)}
                      </span>
                      <span style={{ fontSize: '0.92rem', color: '#e0e7ff', fontWeight: 600 }}>
                        "{currentQuestion.english}"
                      </span>
                    </div>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => setIsQuestionTranslationRevealed(false)}
                      style={{ fontSize: '0.7rem', padding: '3px 8px' }}
                    >
                      {t('midtermHideTranslationBtn', translate)}
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setIsQuestionTranslationRevealed(true)}
                    style={{ fontSize: '0.72rem', padding: '4px 10px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                  >
                    <span>{t('midtermRevealTranslationBtn', translate)}</span>
                  </button>
                )}
              </div>
            )}

            {/* Grammar Focus Tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <Sparkles size={13} color="var(--primary)" />
              <span><strong>{t('midtermGrammarFocusLabel', translate)}</strong> {translate && currentQuestion.grammarFocusEn ? currentQuestion.grammarFocusEn : currentQuestion.grammarFocus}</span>
            </div>
          </div>
        ) : (
          <div 
            onClick={() => setIsQuestionRevealed(true)}
            style={{ 
              padding: '24px 16px', 
              borderRadius: '12px', 
              background: 'rgba(0, 0, 0, 0.25)', 
              border: '1px dashed rgba(255, 255, 255, 0.15)',
              textAlign: 'center',
              cursor: 'pointer'
            }}
          >
            <div style={{ fontSize: '1.8rem', marginBottom: '6px', opacity: 0.7 }}>🎧</div>
            <p style={{ margin: '0 0 6px 0', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              {t('midtermHiddenAudioTitle', translate)}
            </p>
            <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {t('midtermHiddenAudioDesc', translate)}
            </p>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* MODE 1: MODO GUIADO (SCAFFOLDED PATHS)                         */}
      {/* ============================================================== */}
      {mode === 'guided' && (
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', marginBottom: '20px' }}>
          {/* Path Selector Tabs */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px', fontWeight: 700 }}>
              {t('midtermGuidedChoosePathLabel', translate)}
            </label>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {currentQuestion.guidedPaths.map(path => (
                <button
                  key={path.id}
                  className={`btn ${selectedPathId === path.id ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => handleSelectPath(path)}
                  style={{ fontSize: '0.78rem', padding: '6px 12px' }}
                >
                  {path.label}
                </button>
              ))}
            </div>
          </div>

          {/* Meaning Target Callout */}
          <div style={{ 
            padding: '10px 14px', 
            borderRadius: '10px', 
            background: 'rgba(255, 255, 255, 0.02)', 
            border: '1px solid var(--card-border)', 
            marginBottom: '16px' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {t('midtermGuidedIdeaToExpress', translate)}
                </span>
                {isTargetMeaningRevealed || guidedAnswered ? (
                  <span style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                    "{currentPath.englishMeaning}"
                  </span>
                ) : (
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    ({currentPath.label})
                  </span>
                )}
              </div>
              {!guidedAnswered && !isTargetMeaningRevealed && (
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setIsTargetMeaningRevealed(true)}
                  style={{ fontSize: '0.7rem', padding: '3px 8px' }}
                >
                  {t('midtermRevealTranslationBtn', translate)}
                </button>
              )}
            </div>
          </div>

          {/* Sentence Builder Slot Zone (Placed tokens) */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', fontWeight: 700 }}>
              {t('midtermGuidedConstructedLabel', translate)}
            </label>
            <div style={{ 
              minHeight: '60px', 
              padding: '12px', 
              borderRadius: '12px', 
              background: 'rgba(0, 0, 0, 0.35)', 
              border: guidedAnswered 
                ? guidedIsCorrect ? '2px solid var(--accent)' : '2px solid var(--danger)'
                : '1px solid rgba(255, 255, 255, 0.15)',
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '8px', 
              alignItems: 'center' 
            }}>
              {guidedPlacedTokens.length === 0 ? (
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  {t('midtermGuidedEmptySlotNotice', translate)}
                </span>
              ) : (
                guidedPlacedTokens.map((token) => (
                  <button
                    key={token.id}
                    onClick={() => handleGuidedPlacedClick(token)}
                    disabled={guidedAnswered}
                    className="btn"
                    style={{
                      background: 'rgba(99, 102, 241, 0.25)',
                      border: '1px solid rgba(99, 102, 241, 0.5)',
                      color: '#e0e7ff',
                      fontSize: '0.85rem',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      cursor: guidedAnswered ? 'default' : 'pointer'
                    }}
                  >
                    {token.text}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Word Bank */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 700 }}>
                {t('midtermWordBankLabel', translate)}
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={handleResetGuided}
                  disabled={guidedAnswered}
                  style={{ fontSize: '0.72rem', padding: '3px 8px', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <RotateCcw size={12} /> {t('midtermResetBtn', translate)}
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setShowHint(!showHint)}
                  style={{ fontSize: '0.72rem', padding: '3px 8px', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <HelpCircle size={12} /> {showHint ? t('midtermHideHint', translate) : t('midtermShowHint', translate)}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', minHeight: '44px' }}>
              {guidedBankTokens.map((token) => (
                <button
                  key={token.id}
                  onClick={() => handleGuidedBankClick(token)}
                  disabled={guidedAnswered}
                  className="btn btn-secondary"
                  style={{
                    fontSize: '0.82rem',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--card-border)'
                  }}
                >
                  {token.text}
                </button>
              ))}
            </div>
          </div>

          {/* Hint & Syntax Breakdown Accordion */}
          {showHint && (
            <div style={{ 
              padding: '12px 14px', 
              borderRadius: '10px', 
              background: 'rgba(250, 204, 21, 0.05)', 
              border: '1px solid rgba(250, 204, 21, 0.25)', 
              marginBottom: '16px',
              animation: 'pop-in 0.2s ease-out'
            }}>
              <span style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                {t('midtermGrammarHintLabel', translate)}
              </span>
              <p style={{ margin: '0 0 8px 0', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                {currentPath.hint}
              </p>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
                {t('midtermSyntaxBreakdownLabel', translate)}
              </span>
              <code style={{ fontSize: '0.78rem', color: 'var(--primary)', fontFamily: 'monospace' }}>
                {currentPath.syntaxBreakdown}
              </code>
            </div>
          )}

          {/* Action Button & Feedback */}
          {!guidedAnswered ? (
            <button
              className="btn btn-primary"
              onClick={handleCheckGuided}
              disabled={guidedPlacedTokens.length === 0}
              style={{ width: '100%', padding: '10px', fontSize: '0.9rem', fontWeight: 600 }}
            >
              {t('midtermCheckGuidedBtn', translate)}
            </button>
          ) : (
            <div style={{ animation: 'pop-in 0.25s ease-out' }}>
              {/* Post-Answer Bilingual Card */}
              <div style={{ 
                padding: '16px', 
                borderRadius: '12px', 
                background: guidedIsCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                border: guidedIsCorrect ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  {guidedIsCorrect ? <Check size={18} color="var(--accent)" /> : <AlertCircle size={18} color="var(--danger)" />}
                  <span style={{ fontWeight: 700, fontSize: '0.92rem', color: guidedIsCorrect ? 'var(--accent)' : 'var(--danger)' }}>
                    {guidedIsCorrect ? t('midtermFeedbackCorrect', translate) : t('midtermFeedbackIncorrect', translate)}
                  </span>
                </div>

                {/* Bilingual Question & Answer Review */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem' }}>
                  <div>
                    <strong style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem', textTransform: 'uppercase' }}>
                      {t('midtermFeedbackQuestionLabel', translate)}
                    </strong>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{currentQuestion.question}</div>
                    <div style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>"{currentQuestion.english}"</div>
                  </div>

                  <div>
                    <strong style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem', textTransform: 'uppercase' }}>
                      {t('midtermFeedbackYourAnswerLabel', translate)}
                    </strong>
                    <div style={{ color: 'var(--accent)', fontWeight: 700 }}>{currentPath.targetSentence}</div>
                    <div style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>"{currentPath.englishMeaning}"</div>
                  </div>

                  <div>
                    <strong style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem', textTransform: 'uppercase' }}>
                      {t('midtermFeedbackSyntaxLabel', translate)}
                    </strong>
                    <div style={{ color: 'var(--primary)', fontFamily: 'monospace', fontSize: '0.75rem' }}>
                      {currentPath.syntaxBreakdown}
                    </div>
                  </div>
                </div>
              </div>

              {/* Oral Practice Controls */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => playSentenceAudio(currentPath.targetSentence)}
                  style={{ flex: 1, minWidth: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.82rem' }}
                >
                  <Volume2 size={15} color="var(--primary)" /> {t('midtermListenModelAudioBtn', translate)}
                </button>

                {speechSupported && (
                  <button
                    className={`btn ${isTestingPronunciation ? 'btn-danger' : 'btn-secondary'}`}
                    onClick={() => handleTestPronunciation(currentPath.targetSentence)}
                    style={{ flex: 1, minWidth: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.82rem' }}
                  >
                    <Mic size={15} color={isTestingPronunciation ? "#fff" : "var(--primary)"} />
                    <span>{isTestingPronunciation ? t('midtermRecordingPronunciation', translate) : t('midtermTestPronunciationBtn', translate)}</span>
                  </button>
                )}
              </div>

              {/* Pronunciation Feedback Box */}
              {pronunciationScore && (
                <div style={{ 
                  padding: '10px 14px', 
                  borderRadius: '10px', 
                  background: 'rgba(99, 102, 241, 0.08)', 
                  border: '1px solid rgba(99, 102, 241, 0.25)', 
                  marginBottom: '14px',
                  fontSize: '0.8rem'
                }}>
                  {pronunciationScore.status === 'listening' && (
                    <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{pronunciationScore.message}</span>
                  )}
                  {pronunciationScore.status === 'result' && (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span>{t('midtermPronunciationMatch', translate)} <strong>{pronunciationScore.percentage}%</strong></span>
                        <span style={{ color: pronunciationScore.percentage >= 80 ? 'var(--accent)' : 'var(--gold)' }}>
                          {pronunciationScore.percentage >= 80 ? t('midtermPronunciationExcellent', translate) : t('midtermPronunciationNeedsPractice', translate)}
                        </span>
                      </div>
                      <div style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '4px' }}>
                        {t('midtermElenaHeard', translate, pronunciationScore.transcript)}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {pronunciationScore.feedback}
                      </div>
                    </div>
                  )}
                  {pronunciationScore.status === 'error' && (
                    <span style={{ color: 'var(--danger)' }}>{pronunciationScore.message}</span>
                  )}
                </div>
              )}

              {/* Next Question / Retry */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {!guidedIsCorrect && (
                  <button
                    className="btn btn-secondary"
                    onClick={() => { setGuidedAnswered(false); initGuidedTokens(currentPath); }}
                    style={{ flex: 1 }}
                  >
                    {t('midtermRetryBtn', translate)}
                  </button>
                )}
                <button
                  className="btn btn-primary"
                  onClick={handleNext}
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <span>{currentIdx < MIDTERM_QUESTIONS.length - 1 ? t('midtermNextQuestionBtn', translate) : t('midtermFinishPracticeBtn', translate)}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* MODE 2: MODO LIBRE (OPEN CATEGORIZED WORD BANK)               */}
      {/* ============================================================== */}
      {mode === 'open' && (
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', marginBottom: '20px' }}>
          
          {/* Open Mode Header Banner */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#a78bfa', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={16} /> Modo Libre: Banco de Palabras por Categorías
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Combina palabras de los 6 cajones temáticos para crear tu respuesta con traducción en tiempo real.
              </span>
            </div>
            <div style={{ 
              background: 'rgba(139, 92, 246, 0.15)', 
              color: '#c4b5fd', 
              padding: '4px 10px', 
              borderRadius: '10px', 
              fontSize: '0.75rem', 
              fontWeight: 700 
            }}>
              Aciertos: {Object.values(openAnswers).filter(a => a.isCorrect).length} / {MIDTERM_QUESTIONS.length}
            </div>
          </div>

          {/* Open Mode Reward Goal Callout */}
          <div style={{ 
            padding: '10px 14px', 
            borderRadius: '10px', 
            background: 'rgba(139, 92, 246, 0.08)', 
            border: '1px solid rgba(139, 92, 246, 0.25)', 
            marginBottom: '16px',
            fontSize: '0.78rem',
            color: 'var(--text-secondary)'
          }}>
            🎯 <strong>Meta del Modo Libre:</strong> ¡Valida al menos <strong>9 de las 10 preguntas</strong> para desbloquear la medalla <em>"Listo para el Examen (Ready for the Midterm)"</em> (+50 XP, +25 Oro)!
          </div>

          {/* Question Translation in Open Mode */}
          <div style={{ 
            padding: '10px 14px', 
            borderRadius: '10px', 
            background: 'rgba(59, 130, 246, 0.08)', 
            border: '1px solid rgba(59, 130, 246, 0.25)', 
            marginBottom: '16px' 
          }}>
            <span style={{ fontSize: '0.7rem', color: '#93c5fd', fontWeight: 700, display: 'block', textTransform: 'uppercase' }}>
              Traducción de la Pregunta:
            </span>
            <span style={{ fontSize: '0.92rem', color: '#e0e7ff', fontWeight: 600 }}>
              "{currentQuestion.english}"
            </span>
          </div>

          {/* Constructed Custom Sentence Zone */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 700 }}>
                Tu Oración Personal (Toca las palabras de los cajones para agregarlas):
              </label>
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleResetOpen}
                disabled={openAnswered}
                style={{ fontSize: '0.7rem', padding: '3px 8px', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <RotateCcw size={12} /> Limpiar
              </button>
            </div>

            <div style={{ 
              minHeight: '64px', 
              padding: '12px', 
              borderRadius: '12px', 
              background: 'rgba(0, 0, 0, 0.35)', 
              border: openAnswered 
                ? (openFeedback?.isValid ? '2px solid var(--accent)' : '2px solid var(--danger)')
                : '1px solid rgba(255, 255, 255, 0.15)',
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '8px', 
              alignItems: 'center' 
            }}>
              {openPlacedTokens.length === 0 ? (
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  Elige palabras de los cajones inferiores para armar tu propia respuesta libre...
                </span>
              ) : (
                openPlacedTokens.map((token) => (
                  <button
                    key={token.id}
                    onClick={() => handleOpenPlacedClick(token)}
                    disabled={openAnswered}
                    className="btn"
                    style={{
                      background: 'rgba(139, 92, 246, 0.25)',
                      border: '1px solid rgba(139, 92, 246, 0.5)',
                      color: '#e0e7ff',
                      fontSize: '0.85rem',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      cursor: openAnswered ? 'default' : 'pointer'
                    }}
                    title="Toca para quitar de tu oración"
                  >
                    {token.text}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Dynamic Live Translation of Custom Created Sentence */}
          <div style={{ 
            padding: '12px 14px', 
            borderRadius: '10px', 
            background: 'rgba(16, 185, 129, 0.08)', 
            border: '1px solid rgba(16, 185, 129, 0.25)', 
            marginBottom: '20px' 
          }}>
            <span style={{ fontSize: '0.7rem', color: '#6ee7b7', fontWeight: 700, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              🇬🇧 Traducción en Vivo de tu Oración Creada:
            </span>
            <span style={{ fontSize: '0.92rem', color: '#e0e7ff', fontWeight: 600 }}>
              {openPlacedTokens.length > 0 
                ? `"${translateCustomSentence(openPlacedTokens)}"` 
                : "(Agrega palabras arriba para ver la traducción en tiempo real de tu oración personalizada)"}
            </span>
          </div>

          {/* Categorized Word Bank Drawers */}
          <div style={{ marginBottom: '20px' }}>
            {/* Drawer Tabs */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
              {[
                { key: 'verbos', label: 'Verbos Pretéritos', icon: '⚡' },
                { key: 'personas', label: 'Personas', icon: '👥' },
                { key: 'lugares', label: 'Lugares', icon: '📍' },
                { key: 'objetos', label: 'Objetos y Compras', icon: '🛍️' },
                { key: 'conectores', label: 'Conectores', icon: '🔗' },
                { key: 'adjetivos', label: 'Emociones y Adjetivos', icon: '✨' },
              ].map(cat => (
                <button
                  key={cat.key}
                  className={`btn ${openCategory === cat.key ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setOpenCategory(cat.key)}
                  style={{ fontSize: '0.75rem', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: '5px' }}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label} ({OPEN_WORD_BANK[cat.key]?.length || 0})</span>
                </button>
              ))}
            </div>

            {/* Tokens in Selected Category Drawer */}
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '8px', 
              padding: '12px', 
              borderRadius: '12px', 
              background: 'rgba(255, 255, 255, 0.02)', 
              border: '1px solid var(--card-border)',
              maxHeight: '180px',
              overflowY: 'auto'
            }}>
              {(OPEN_WORD_BANK[openCategory] || []).map((token, i) => (
                <button
                  key={`${openCategory}-${i}`}
                  onClick={() => handleOpenBankClick(token)}
                  disabled={openAnswered}
                  className="btn btn-secondary"
                  style={{
                    fontSize: '0.78rem',
                    padding: '5px 10px',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{token.text}</span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{token.gloss}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Validation & Feedback in Open Mode */}
          {!openAnswered ? (
            <button
              className="btn btn-primary"
              onClick={handleCheckOpen}
              disabled={openPlacedTokens.length === 0}
              style={{ width: '100%', padding: '10px', fontSize: '0.9rem', fontWeight: 600 }}
            >
              Comprobar mi Oración Creada
            </button>
          ) : (
            <div style={{ animation: 'pop-in 0.25s ease-out' }}>
              <div style={{ 
                padding: '16px', 
                borderRadius: '12px', 
                background: openFeedback?.isValid ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                border: openFeedback?.isValid ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  {openFeedback?.isValid ? <Check size={18} color="var(--accent)" /> : <AlertCircle size={18} color="var(--danger)" />}
                  <span style={{ fontWeight: 700, fontSize: '0.92rem', color: openFeedback?.isValid ? 'var(--accent)' : 'var(--danger)' }}>
                    {openFeedback?.isValid ? "¡Oración Validada con Éxito!" : "Atención Gramatical"}
                  </span>
                </div>
                <p style={{ margin: '0 0 10px 0', fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
                  {openFeedback?.feedback}
                </p>

                {openFeedback?.isValid && (
                  <div style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Traducción confirmada:</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 600 }}>
                      "{translateCustomSentence(openPlacedTokens)}"
                    </div>
                  </div>
                )}
              </div>

              {/* Speech Controls in Open Mode */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => playSentenceAudio(openPlacedTokens.map(t => t.text).join(" "))}
                  style={{ flex: 1, minWidth: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.82rem' }}
                >
                  <Volume2 size={15} color="var(--primary)" /> 🔊 Escuchar Mi Oración
                </button>

                {speechSupported && (
                  <button
                    className={`btn ${isTestingPronunciation ? 'btn-danger' : 'btn-secondary'}`}
                    onClick={() => handleTestPronunciation(openPlacedTokens.map(t => t.text).join(" "))}
                    style={{ flex: 1, minWidth: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.82rem' }}
                  >
                    <Mic size={15} color={isTestingPronunciation ? "#fff" : "var(--primary)"} />
                    <span>{isTestingPronunciation ? "Grabando..." : "🎙️ Probar Pronunciación"}</span>
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                {!openFeedback?.isValid && (
                  <button
                    className="btn btn-secondary"
                    onClick={() => setOpenAnswered(false)}
                    style={{ flex: 1 }}
                  >
                    Ajustar Oración
                  </button>
                )}
                <button
                  className="btn btn-primary"
                  onClick={handleNext}
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <span>{currentIdx < MIDTERM_QUESTIONS.length - 1 ? "Siguiente Pregunta" : "Finalizar Práctica"}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* MODE 3: MODO DESAFÍO (REAL ORAL EXAM CHALLENGE)               */}
      {/* ============================================================== */}
      {mode === 'challenge' && (
        <div className="glass-panel" style={{ 
          padding: '24px', 
          borderRadius: '16px', 
          marginBottom: '20px',
          border: '1px solid rgba(245, 158, 11, 0.4)',
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(0, 0, 0, 0.2) 100%)'
        }}>
          {/* Challenge Banner */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Trophy size={16} /> Modo Desafío del Examen de Medio Término
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Condiciones de examen real: Preguntas solo en español (sin traducción). Escribe o dicta tu respuesta.
              </span>
            </div>
            <div style={{ 
              background: 'rgba(245, 158, 11, 0.15)', 
              color: '#fbbf24', 
              padding: '4px 10px', 
              borderRadius: '10px', 
              fontSize: '0.75rem', 
              fontWeight: 700 
            }}>
              Aciertos: {Object.values(challengeAnswers).filter(a => a.isCorrect).length} / {MIDTERM_QUESTIONS.length}
            </div>
          </div>

          {/* Reward Goal Callout */}
          <div style={{ 
            padding: '10px 14px', 
            borderRadius: '10px', 
            background: 'rgba(245, 158, 11, 0.08)', 
            border: '1px solid rgba(245, 158, 11, 0.25)', 
            marginBottom: '16px',
            fontSize: '0.78rem',
            color: 'var(--text-secondary)'
          }}>
            🎯 <strong>Meta del Modo Desafío:</strong> ¡Consigue un <strong>10/10 perfecto</strong> (sin traducción, escribiendo o dictando) para ganar la medalla <em>"Maestro del Examen de Medio Término"</em> y el legendario <strong>Corazón de Titán (¡Doble de Vida permanente: 200 HP!)</strong>!
          </div>

          {/* Input Box: Typing or Speech-To-Text */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 700 }}>
                Formula tu respuesta en pretérito (Typing o Micrófono):
              </label>
              
              {speechSupported && (
                <button
                  className={`btn ${isListening ? 'btn-danger' : 'btn-secondary'} btn-sm`}
                  onClick={handleToggleMic}
                  disabled={challengeAnswered}
                  style={{ fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                >
                  {isListening ? <MicOff size={13} /> : <Mic size={13} color="var(--primary)" />}
                  <span>{isListening ? "Detener Dictado" : "🎙️ Dictar por Micrófono"}</span>
                </button>
              )}
            </div>

            <textarea
              rows={3}
              value={challengeInput}
              onChange={(e) => setChallengeInput(e.target.value)}
              disabled={challengeAnswered}
              placeholder="Ejemplo: Fui con mi mejor amigo al centro comercial porque queríamos comprar ropa..."
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                background: 'rgba(0, 0, 0, 0.35)',
                border: challengeAnswered 
                  ? (challengeFeedback?.isCorrect ? '2px solid var(--accent)' : '2px solid var(--danger)')
                  : '1px solid rgba(255, 255, 255, 0.15)',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />

            {/* Virtual Accents Keyboard Bar */}
            {!challengeAnswered && (
              <div style={{ display: 'flex', gap: '4px', marginTop: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginRight: '4px' }}>Tildes:</span>
                {['á', 'é', 'í', 'ó', 'ú', 'ñ', '¿', '¡'].map(c => (
                  <button
                    key={c}
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleInsertAccent(c)}
                    style={{ padding: '2px 8px', fontSize: '0.75rem', minWidth: '26px' }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action or Result */}
          {!challengeAnswered ? (
            <button
              className="btn btn-primary"
              onClick={handleCheckChallenge}
              disabled={!challengeInput.trim()}
              style={{ width: '100%', padding: '10px', fontSize: '0.9rem', fontWeight: 600 }}
            >
              Comprobar Respuesta en Desafío
            </button>
          ) : (
            <div style={{ animation: 'pop-in 0.25s ease-out' }}>
              <div style={{ 
                padding: '16px', 
                borderRadius: '12px', 
                background: challengeFeedback?.isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                border: challengeFeedback?.isCorrect ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  {challengeFeedback?.isCorrect ? <Check size={18} color="var(--accent)" /> : <AlertCircle size={18} color="var(--danger)" />}
                  <span style={{ fontWeight: 700, fontSize: '0.92rem', color: challengeFeedback?.isCorrect ? 'var(--accent)' : 'var(--danger)' }}>
                    {challengeFeedback?.isCorrect ? "¡Correcto en Modo Desafío! (+20 XP, +10 Oro)" : "Necesita Ajuste Gramatical"}
                  </span>
                </div>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                  {challengeFeedback?.text}
                </p>
                {challengeFeedback?.translation && (
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    Traducción estimada: "{challengeFeedback?.translation}"
                  </div>
                )}
              </div>

              {/* Audio playback of user response */}
              <button
                className="btn btn-secondary"
                onClick={() => playSentenceAudio(challengeInput)}
                style={{ width: '100%', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.82rem' }}
              >
                <Volume2 size={15} color="var(--primary)" /> 🔊 Escuchar Mi Respuesta Dictada
              </button>

              <div style={{ display: 'flex', gap: '8px' }}>
                {!challengeFeedback?.isCorrect && (
                  <button
                    className="btn btn-secondary"
                    onClick={() => { setChallengeAnswered(false); }}
                    style={{ flex: 1 }}
                  >
                    Corregir
                  </button>
                )}
                <button
                  className="btn btn-primary"
                  onClick={handleNext}
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <span>{currentIdx < MIDTERM_QUESTIONS.length - 1 ? "Siguiente Pregunta" : "Ver Resultados del Desafío"}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* 10-QUESTION QUICK JUMP GRID NAVIGATOR                          */}
      {/* ============================================================== */}
      <div className="glass-panel" style={{ padding: '16px', borderRadius: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 700 }}>
            Navegador de Preguntas (1 a 10):
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={handlePrev}
              disabled={currentIdx === 0}
              style={{ fontSize: '0.72rem', padding: '4px 8px' }}
            >
              ← Anterior
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={handleNext}
              disabled={currentIdx === MIDTERM_QUESTIONS.length - 1}
              style={{ fontSize: '0.72rem', padding: '4px 8px' }}
            >
              Siguiente →
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '6px' }}>
          {MIDTERM_QUESTIONS.map((q, idx) => {
            const isCompleted = state.oralExamProgress?.completedQuestions?.includes(q.id);
            const isCurrent = idx === currentIdx;
            const isChallengeCorrect = challengeAnswers[idx]?.isCorrect;

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(idx)}
                className="btn"
                style={{
                  padding: '8px 2px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  borderRadius: '8px',
                  background: isCurrent 
                    ? 'var(--primary)' 
                    : isCompleted 
                    ? 'rgba(16, 185, 129, 0.2)' 
                    : 'rgba(255, 255, 255, 0.05)',
                  border: isCurrent 
                    ? '2px solid #fff' 
                    : isCompleted 
                    ? '1px solid rgba(16, 185, 129, 0.4)' 
                    : '1px solid var(--card-border)',
                  color: isCurrent 
                    ? '#fff' 
                    : isCompleted 
                    ? '#6ee7b7' 
                    : 'var(--text-secondary)',
                  position: 'relative'
                }}
                title={`Pregunta ${idx + 1}: ${q.question}`}
              >
                <span>{idx + 1}</span>
                {isCompleted && (
                  <span style={{ position: 'absolute', top: '-4px', right: '-2px', fontSize: '0.6rem' }}>✓</span>
                )}
                {mode === 'open' && openAnswers[idx]?.isCorrect && (
                  <span style={{ 
                    position: 'absolute', 
                    bottom: '1px', 
                    right: '3px', 
                    fontSize: '0.55rem', 
                    color: 'var(--accent)' 
                  }}>
                    ●
                  </span>
                )}
                {mode === 'challenge' && challengeAnswers[idx] && (
                  <span style={{ 
                    position: 'absolute', 
                    bottom: '1px', 
                    right: '3px', 
                    fontSize: '0.55rem', 
                    color: isChallengeCorrect ? 'var(--accent)' : 'var(--danger)' 
                  }}>
                    {isChallengeCorrect ? '●' : '×'}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* OPEN MODE CELEBRATION MODAL (9/10 "Listo para el Examen")       */}
      {/* ============================================================== */}
      {showOpenModal && openFinalResult && (
        <div className="modal-overlay" onClick={() => setShowOpenModal(false)}>
          <div 
            className="glass-panel modal-content" 
            onClick={(e) => e.stopPropagation()}
            style={{ 
              maxWidth: '460px', 
              textAlign: 'center', 
              padding: '28px 24px', 
              borderRadius: '20px',
              animation: 'pop-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
          >
            <div style={{ fontSize: '3.5rem', marginBottom: '8px' }}>
              {openFinalResult.score >= 9 ? '🎯' : '🧩'}
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--gold)', margin: '0 0 8px 0' }}>
              {openFinalResult.score >= 9 
                ? "¡Listo para el Examen Oral!" 
                : "Progreso de Modo Libre"}
            </h2>

            <p style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 600, margin: '0 0 12px 0' }}>
              Puntuación: {openFinalResult.score} / 10 Preguntas Validadas
            </p>

            {openFinalResult.score >= 9 ? (
              <>
                <div style={{ 
                  padding: '14px', 
                  borderRadius: '12px', 
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(99, 102, 241, 0.15) 100%)', 
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  marginBottom: '16px',
                  textAlign: 'left'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '1.3rem' }}>🌟</span>
                    <strong style={{ color: '#6ee7b7', fontSize: '0.92rem' }}>
                      ¡Medalla Desbloqueada: "Listo para el Examen"!
                    </strong>
                  </div>
                  <p style={{ margin: '0 0 6px 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Has demostrado soltura construyendo oraciones con el vocabulario oficial del examen. ¡Recompensas otorgadas: <strong>+50 XP, +25 Oro</strong>!
                  </p>
                </div>

                <div style={{ 
                  padding: '10px 12px', 
                  borderRadius: '10px', 
                  background: 'rgba(245, 158, 11, 0.1)', 
                  border: '1px solid rgba(245, 158, 11, 0.3)', 
                  marginBottom: '16px',
                  fontSize: '0.78rem',
                  color: '#fbbf24',
                  textAlign: 'left'
                }}>
                  ⚔️ <strong>¿Listo para el siguiente nivel?</strong><br />
                  ¡Completa el <strong>Modo Desafío con 10/10</strong> para desbloquear la medalla <em>"Maestro del Examen"</em> y ganar el <strong>Corazón de Titán (Doble vida permanente: 200 HP)</strong>!
                </div>
              </>
            ) : (
              <div style={{ 
                padding: '12px', 
                borderRadius: '12px', 
                background: 'rgba(255, 255, 255, 0.05)', 
                border: '1px solid var(--card-border)',
                marginBottom: '16px',
                fontSize: '0.82rem',
                color: 'var(--text-secondary)'
              }}>
                Llevas {openFinalResult.score} de 10 preguntas validadas. Valida al menos 9 de 10 para ganar la medalla <em>"Listo para el Examen"</em>. ¡Puedes reintentar o ajustar cualquier pregunta!
              </div>
            )}

            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <button
                className="btn btn-secondary"
                onClick={() => setShowOpenModal(false)}
                style={{ flex: 1, padding: '10px' }}
              >
                Continuar Práctica
              </button>
              {openFinalResult.score >= 9 && (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setShowOpenModal(false);
                    setMode('challenge');
                  }}
                  style={{ flex: 1, padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <span>⚔️ Ir al Desafío (200 HP)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* CHALLENGE CELEBRATION MODAL (10/10 Maestro + 200 HP)            */}
      {/* ============================================================== */}
      {showChallengeModal && challengeFinalResult && (
        <div className="modal-overlay" onClick={() => setShowChallengeModal(false)}>
          <div 
            className="glass-panel modal-content" 
            onClick={(e) => e.stopPropagation()}
            style={{ 
              maxWidth: '460px', 
              textAlign: 'center', 
              padding: '28px 24px', 
              borderRadius: '20px',
              animation: 'pop-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
          >
            <div style={{ fontSize: '3.5rem', marginBottom: '8px' }}>
              {challengeFinalResult.score === 10 ? '👑' : '📊'}
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--gold)', margin: '0 0 8px 0' }}>
              {challengeFinalResult.score === 10 
                ? "¡Maestro Supremo del Examen Oral!" 
                : "Resultados del Desafío Oral"}
            </h2>

            <p style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 600, margin: '0 0 12px 0' }}>
              Puntuación Final: {challengeFinalResult.score} / 10 Correctas
            </p>

            {challengeFinalResult.score === 10 ? (
              <div style={{ 
                padding: '14px', 
                borderRadius: '12px', 
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(236, 72, 153, 0.15) 100%)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                marginBottom: '16px'
              }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '4px' }}>💖 200 HP</div>
                <strong style={{ color: '#fbbf24', display: 'block', fontSize: '0.95rem' }}>
                  ¡Has ganado el legendario Corazón de Titán!
                </strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginTop: '4px', lineHeight: 1.4 }}>
                  Tu vida máxima se ha <strong>duplicado permanentemente a 200 HP</strong> en todo el juego, y has desbloqueado la medalla <em>"Maestro del Examen de Medio Término"</em>!
                </span>
              </div>
            ) : (
              <div style={{ 
                padding: '12px', 
                borderRadius: '12px', 
                background: 'rgba(255, 255, 255, 0.05)', 
                border: '1px solid var(--card-border)',
                marginBottom: '16px',
                fontSize: '0.82rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.4
              }}>
                Obtuviste <strong>{challengeFinalResult.score} de 10</strong> preguntas correctas. Para desbloquear la medalla <em>"Maestro del Examen"</em> y duplicar tu vida a <strong>200 HP</strong> con el Corazón de Titán, se requiere una puntuación perfecta de <strong>10/10</strong>.
                <div style={{ marginTop: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  💡 <em>(Recuerda: Si buscas la medalla "Listo para el Examen", puedes obtenerla con 9/10 en el Modo Libre).</em>
                </div>
              </div>
            )}

            <button
              className="btn btn-primary"
              onClick={() => setShowChallengeModal(false)}
              style={{ width: '100%', padding: '10px' }}
            >
              Continuar
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
