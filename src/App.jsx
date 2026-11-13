import React, { useState, useEffect, useRef } from 'react';
import { useGameState } from './hooks/useGameState';
import Dashboard from './components/Dashboard';
import PlacementTest from './components/PlacementTest';
import StudyQuest from './components/StudyQuest';
import GameShop from './components/GameShop';
import AiChat from './components/AiChat';
import MiniGames from './components/MiniGames';
import BadgeTrophy from './components/BadgeTrophy';
import MistakesDungeon from './components/MistakesDungeon';
import OralExamPractice from './components/OralExamPractice';
import { Settings, RefreshCw, Mail, Volume2, Sparkles, X, Download, Upload, Copy, Check, FileText, Save } from 'lucide-react';
import { subscribeToVoices, formatVoiceLabel, speakSpanish } from './utils/speechHelper';
import './App.css';

export default function App() {
  const {
    state,
    addXp,
    addGold,
    takeDamage,
    heal,
    revive,
    recordQuizPerformance,
    buyItem,
    consumeItem,
    completeAdventure,
    setApiKey,
    completePlacement,
    checkAndUpdateStreak,
    advanceQuest,
    passStageReview,
    recordLevelCompletion,
    resetAllProgress,
    setExcludeVosotros,
    markFlashcardsSeen,
    recordWordAnsweredCorrectly,
    buyEquipment,
    equipItem,
    addMistake,
    removeMistake,
    toggleAutoSpeak,
    claimBounty,
    incrementBountyCount,
    feedNarfy,
    playWithNarfy,
    updateWordMastery,
    setDifficultyMode,
    setTtsVoice,
    setTtsRate,
    setUseGeminiTts,
    toggleTranslateInstructions,
    setTranslateInstructions,
    exportSaveData,
    importSaveData,
    recordOralQuestionCompleted,
    awardMidtermOpenRewards,
    awardMidtermChallengeRewards,
  } = useGameState();

  const [view, setView] = useState('dashboard');
  const [studyQuestTab, setStudyQuestTab] = useState('quest');
  const [showSettings, setShowSettings] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [prevLevel, setPrevLevel] = useState(state.level);
  const [tempKey, setTempKey] = useState(state.apiKeys.gemini || "");
  const [availableVoices, setAvailableVoices] = useState([]);

  // Save / Load import-export state
  const [saveStatus, setSaveStatus] = useState(null); // { type: 'success' | 'error', message: string }
  const [copiedSave, setCopiedSave] = useState(false);
  const [showPasteImport, setShowPasteImport] = useState(false);
  const [pastedSaveText, setPastedSaveText] = useState("");
  const fileInputRef = useRef(null);

  const handleExportDownload = () => {
    try {
      const saveObj = exportSaveData();
      const jsonStr = JSON.stringify(saveObj, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const dateStr = new Date().toISOString().slice(0, 10);
      a.href = url;
      a.download = `estudiamos102_save_lvl${state.level}_stage${state.questStage}_${dateStr}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setSaveStatus({ type: 'success', message: '¡Archivo de guardado descargado exitosamente!' });
    } catch (e) {
      console.error("Export download error:", e);
      setSaveStatus({ type: 'error', message: 'Error al exportar el archivo de guardado.' });
    }
  };

  const handleExportCopy = async () => {
    try {
      const saveObj = exportSaveData();
      const jsonStr = JSON.stringify(saveObj, null, 2);
      await navigator.clipboard.writeText(jsonStr);
      setCopiedSave(true);
      setSaveStatus({ type: 'success', message: '¡Código de guardado copiado al portapapeles!' });
      setTimeout(() => setCopiedSave(false), 2500);
    } catch (e) {
      console.error("Export copy error:", e);
      setSaveStatus({ type: 'error', message: 'No se pudo copiar automáticamente. Puedes descargar el archivo .json.' });
    }
  };

  const handleFileImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (state.hasCompletedPlacement && (state.level > 1 || state.xp > 0 || state.questStage > 1)) {
      if (!window.confirm("¿Deseas restaurar esta partida? Esto reemplazará tu progreso actual con los datos del archivo.")) {
        e.target.value = '';
        return;
      }
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target.result;
        const res = importSaveData(text);
        if (res.success) {
          if (res.level) setPrevLevel(res.level);
          setSaveStatus({ type: 'success', message: res.message });
          setView('dashboard');
        } else {
          setSaveStatus({ type: 'error', message: res.error });
        }
      } catch (err) {
        console.error("File read error:", err);
        setSaveStatus({ type: 'error', message: 'Error al procesar el archivo seleccionado.' });
      }
    };
    reader.onerror = () => {
      setSaveStatus({ type: 'error', message: 'Error al cargar el archivo del dispositivo.' });
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handlePasteImport = () => {
    if (!pastedSaveText.trim()) {
      setSaveStatus({ type: 'error', message: 'Por favor pega el código JSON de tu partida antes de restaurar.' });
      return;
    }

    if (state.hasCompletedPlacement && (state.level > 1 || state.xp > 0 || state.questStage > 1)) {
      if (!window.confirm("¿Deseas restaurar esta partida? Esto reemplazará tu progreso actual con el código pegado.")) {
        return;
      }
    }

    const res = importSaveData(pastedSaveText.trim());
    if (res.success) {
      if (res.level) setPrevLevel(res.level);
      setSaveStatus({ type: 'success', message: res.message });
      setPastedSaveText("");
      setShowPasteImport(false);
      setView('dashboard');
    } else {
      setSaveStatus({ type: 'error', message: res.error });
    }
  };

  // Subscribe to loaded system/browser voices
  useEffect(() => {
    return subscribeToVoices(voices => {
      setAvailableVoices(voices);
    });
  }, []);

  // Update streak and run initial configurations on mount
  useEffect(() => {
    checkAndUpdateStreak();
  }, []);

  // Level Up Listener
  useEffect(() => {
    if (state.level > prevLevel) {
      setShowLevelUp(true);
      setPrevLevel(state.level);
    }
  }, [state.level, prevLevel]);

  // Synchronize settings state
  useEffect(() => {
    setTempKey(state.apiKeys.gemini || "");
  }, [state.apiKeys.gemini]);

  // Close settings on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showSettings) {
        setShowSettings(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSettings]);

  const handleSaveSettings = () => {
    setApiKey(tempKey);
    setShowSettings(false);
  };

  const handleReset = () => {
    if (window.confirm("¿De veras? Are you sure you want to reset all stats, badges, and progress? This cannot be undone.")) {
      resetAllProgress();
      setView('dashboard');
      setShowSettings(false);
      setPrevLevel(1);
    }
  };

  // Determine active view. Force placement test if not completed
  const getActiveView = () => {
    if (!state.hasCompletedPlacement) {
      return <PlacementTest completePlacement={completePlacement} onOpenSettings={() => { setSaveStatus(null); setShowSettings(true); }} />;
    }

    switch (view) {
      case 'study-quest':
        return (
          <StudyQuest 
            state={state}
            addXp={addXp}
            addGold={addGold}
            takeDamage={takeDamage}
            revive={revive}
            recordQuizPerformance={recordQuizPerformance}
            advanceQuest={advanceQuest}
            passStageReview={passStageReview}
            recordLevelCompletion={recordLevelCompletion}
            incrementBountyCount={incrementBountyCount}
            markFlashcardsSeen={markFlashcardsSeen}
            recordWordAnsweredCorrectly={recordWordAnsweredCorrectly}
            addMistake={addMistake}
            updateWordMastery={updateWordMastery}
            toggleAutoSpeak={toggleAutoSpeak}
            toggleTranslateInstructions={toggleTranslateInstructions}
            setView={setView}
            defaultTab={studyQuestTab}
          />
        );
      case 'chat':
        return <AiChat state={state} setApiKey={setApiKey} setView={setView} incrementBountyCount={incrementBountyCount} />;
      case 'shop':
        return (
          <GameShop 
            state={state} 
            buyItem={buyItem} 
            consumeItem={consumeItem} 
            buyEquipment={buyEquipment} 
            equipItem={equipItem} 
            setView={setView} 
          />
        );
      case 'dungeon':
        return (
          <MistakesDungeon 
            state={state} 
            takeDamage={takeDamage} 
            heal={heal} 
            removeMistake={removeMistake} 
            addXp={addXp}
            addGold={addGold}
            setView={setView} 
          />
        );
      case 'games':
        return (
          <MiniGames 
            state={state}
            addXp={addXp}
            addGold={addGold}
            completeAdventure={completeAdventure}
            incrementBountyCount={incrementBountyCount}
            setView={setView}
          />
        );
      case 'badges':
        return <BadgeTrophy state={state} setView={setView} />;
      case 'oral-exam':
        return (
          <OralExamPractice 
            state={state}
            setView={setView}
            recordOralQuestionCompleted={recordOralQuestionCompleted}
            awardMidtermOpenRewards={awardMidtermOpenRewards}
            awardMidtermChallengeRewards={awardMidtermChallengeRewards}
          />
        );
      default:
        return (
          <Dashboard 
            state={state}
            consumeItem={consumeItem}
            claimBounty={claimBounty}
            feedNarfy={feedNarfy}
            playWithNarfy={playWithNarfy}
            setView={setView}
            setStudyQuestTab={setStudyQuestTab}
            onOpenSettings={() => { setSaveStatus(null); setShowSettings(true); }}
          />
        );
    }
  };

  return (
    <div className="app-container">
      {/* Global Navigation Header */}
      <header className="app-header">
        <div className="app-title-container" onClick={() => state.hasCompletedPlacement && setView('dashboard')} style={{ cursor: 'pointer' }}>
          <span className="app-logo">🏰</span>
          <div>
            <h1 className="app-title">Estudiamos 102</h1>
            <span className="app-subtitle">Gamified Spanish 102 Learning</span>
          </div>
        </div>

        {state.hasCompletedPlacement ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Lvl <strong>{state.level}</strong>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 'bold' }}>
              🪙 {state.gold} G
            </div>
            <div style={{ fontSize: '0.85rem', color: '#ff7a00', fontWeight: 'bold' }}>
              🔥 {state.streak} days
            </div>

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setView('oral-exam')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '0.78rem',
                padding: '5px 12px',
                borderRadius: '20px',
                color: view === 'oral-exam' ? '#fff' : '#f472b6',
                background: view === 'oral-exam' ? 'rgba(236, 72, 153, 0.4)' : 'rgba(236, 72, 153, 0.12)',
                border: '1px solid rgba(236, 72, 153, 0.35)',
                cursor: 'pointer'
              }}
              title="Práctica para el Examen Oral de Medio Término (10 preguntas del PDF)"
            >
              <span>🎙️</span>
              <span>Examen Oral</span>
            </button>

            <a 
              href="mailto:jsorba@mail.pima.edu?subject=Estudiamos%20102%20Feedback"
              className="btn btn-secondary btn-sm"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.78rem',
                padding: '5px 12px',
                borderRadius: '20px',
                textDecoration: 'none',
                color: 'var(--text-secondary)',
                border: '1px solid var(--card-border)'
              }}
              title="Enviar comentarios o sugerencias a jsorba@mail.pima.edu"
            >
              <Mail size={13} color="var(--primary)" />
              <span>Feedback</span>
            </a>
          </div>
        ) : null}
      </header>

      {/* Main Screen Content */}
      <main style={{ flex: 1 }}>
        {getActiveView()}
      </main>

      {/* Footer */}
      <footer style={{ marginTop: '40px', padding: '24px 0', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        <div style={{ marginBottom: '6px' }}>
          Estudiamos 102 © 2026. Made with Google Antigravity. Strictly Spanish 102 Syllabus Vocabulary.
        </div>
        <div>
          ¿Tienes comentarios o encontraste un error?{' '}
          <a 
            href="mailto:jsorba@mail.pima.edu?subject=Estudiamos%20102%20Feedback" 
            style={{ color: 'var(--primary)', textDecoration: 'underline', fontWeight: 600 }}
          >
            Enviar comentarios a jsorba@mail.pima.edu
          </a>
        </div>
      </footer>

      {/* Level Up Celebration Modal */}
      {showLevelUp && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content" style={{ textAlign: 'center', maxWidth: '400px', animation: 'pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
            <div style={{ fontSize: '4rem', animation: 'float 2.5s ease-in-out infinite' }}>🎉</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--gold)', margin: '12px 0' }}>¡Subiste de Nivel!</h2>
            <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>You leveled up to Level {state.level}!</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.4' }}>
              Your health is fully restored to 100 HP, and the Merchant rewards you with <span style={{ color: 'var(--gold)', fontWeight: 'bold' }}>25 Gold Coins</span>!
            </p>

            <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'center', gap: '8px', margin: '20px 0' }}>
              <span style={{ background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.3)', color: 'var(--gold)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                +25 Gold Coins
              </span>
              <span style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: 'var(--accent)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                100% HP Restored
              </span>
            </div>

            <button className="btn btn-primary" onClick={() => setShowLevelUp(false)} style={{ width: '100%' }}>
              Continuar Aventura
            </button>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="modal-overlay" onClick={() => setShowSettings(false)}>
          <div 
            className="glass-panel modal-content" 
            onClick={(e) => e.stopPropagation()}
            style={{ 
              maxWidth: '460px', 
              maxHeight: 'calc(100dvh - 36px)', 
              display: 'flex', 
              flexDirection: 'column', 
              padding: 0, 
              overflow: 'hidden',
              animation: 'pop-in 0.25s ease-out',
              borderRadius: '16px'
            }}
          >
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 18px',
              borderBottom: '1px solid var(--card-border)',
              background: 'rgba(255, 255, 255, 0.02)',
              flexShrink: 0
            }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                <Settings size={18} color="var(--primary)" /> Configuración (Settings)
              </h3>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setShowSettings(false)}
                style={{ padding: '4px 8px', borderRadius: '8px', lineHeight: 1 }}
                title="Cerrar (Close)"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div style={{
              padding: '16px 18px',
              overflowY: 'auto',
              overscrollBehavior: 'contain',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {/* Translate Instructions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.02)', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--card-border)' }}>
                <input
                  type="checkbox"
                  id="translateInstructions"
                  checked={Boolean(state.translateInstructions)}
                  onChange={(e) => setTranslateInstructions(e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--primary)', flexShrink: 0 }}
                />
                <div>
                  <label htmlFor="translateInstructions" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>🌐</span> Traducir instrucciones al inglés (Translate Instructions)
                  </label>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', lineHeight: 1.3 }}>
                    Muestra traducciones al inglés en instrucciones de niveles, reglas de desafíos y ejercicios (por defecto en español para máxima inmersión).
                  </span>
                </div>
              </div>

              {/* Ignore Vosotros */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.02)', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--card-border)' }}>
                <input
                  type="checkbox"
                  id="excludeVosotros"
                  checked={Boolean(state.excludeVosotros)}
                  onChange={(e) => setExcludeVosotros(e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--primary)', flexShrink: 0 }}
                />
                <div>
                  <label htmlFor="excludeVosotros" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', cursor: 'pointer', display: 'block' }}>
                    Ignore &quot;vosotros&quot; forms (Spain)
                  </label>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', lineHeight: 1.3 }}>
                    Hides Spain-specific plural forms in quizzes & Codex (active by default).
                  </span>
                </div>
              </div>

              {/* Difficulty Mode */}
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--card-border)' }}>
                <label className="form-label" style={{ fontWeight: 700, fontSize: '0.8rem', marginBottom: '6px', display: 'block' }}>
                  Dificultad (Difficulty Mode)
                </label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {['relaxed', 'standard', 'hardcore'].map(mode => (
                    <button 
                      key={mode}
                      type="button"
                      className={`btn ${state.difficultyMode === mode ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => setDifficultyMode(mode)}
                      style={{ flex: 1, textTransform: 'capitalize', fontSize: '0.75rem', padding: '5px 4px' }}
                    >
                      {mode === 'relaxed' ? 'Relaxed' : mode === 'hardcore' ? 'Hardcore' : 'Standard'}
                    </button>
                  ))}
                </div>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block', marginTop: '6px', lineHeight: 1.3 }}>
                  {state.difficultyMode === 'relaxed' && "Relaxed: No quiz damage. 50% XP/Gold rewards."}
                  {state.difficultyMode === 'standard' && "Standard: 15 HP damage on mistakes."}
                  {state.difficultyMode === 'hardcore' && "Hardcore: 30 HP damage. Fainting resets quest level. 2x rewards!"}
                </span>
              </div>

              {/* Voice & Pronunciation */}
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--card-border)' }}>
                <label className="form-label" style={{ fontWeight: 700, fontSize: '0.8rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Volume2 size={15} color="var(--primary)" /> Pronunciación y Voz (Text-to-Speech)
                </label>

                <div style={{ marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '3px' }}>
                    Voz en Español:
                  </label>
                  <select
                    className="form-input"
                    value={state.ttsVoice || ""}
                    onChange={(e) => setTtsVoice(e.target.value)}
                    style={{ fontSize: '0.78rem', padding: '6px 8px', width: '100%' }}
                  >
                    <option value="">Auto (Voz natural recomendada de tu sistema)</option>
                    {availableVoices.map((v) => (
                      <option key={v.name} value={v.name}>
                        {formatVoiceLabel(v)}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '3px' }}>
                    Velocidad:
                  </label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {[0.85, 0.95, 1.0, 1.1].map((r) => (
                      <button
                        key={r}
                        type="button"
                        className={`btn ${(state.ttsRate ?? 0.95) === r ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setTtsRate(r)}
                        style={{ flex: 1, fontSize: '0.72rem', padding: '4px 6px' }}
                      >
                        {r}x {r === 0.95 ? "(Opt)" : ""}
                      </button>
                    ))}
                  </div>
                </div>

                {Boolean(state.apiKeys.gemini) && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', padding: '6px 8px', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                    <input
                      type="checkbox"
                      id="useGeminiTts"
                      checked={Boolean(state.useGeminiTts)}
                      onChange={(e) => setUseGeminiTts(e.target.checked)}
                      style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: 'var(--primary)', flexShrink: 0 }}
                    />
                    <div>
                      <label htmlFor="useGeminiTts" style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Sparkles size={12} /> Gemini Studio AI Voice (Voz humana)
                      </label>
                      <span style={{ fontSize: '0.66rem', color: 'var(--text-muted)', display: 'block' }}>
                        Pronunciación ultra-realista generada por IA.
                      </span>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => speakSpanish("¡Hola! Me llamo Elena. Bienvenidos a Estudiamos 102. Vamos a aprender español juntos.", { state })}
                  style={{ width: '100%', fontSize: '0.75rem', padding: '6px 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <Volume2 size={14} color="var(--primary)" /> 🔊 Probar Pronunciación
                </button>
              </div>

              {/* Gemini API Key */}
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--card-border)' }}>
                <label className="form-label" style={{ fontWeight: 700, fontSize: '0.8rem', marginBottom: '4px', display: 'block' }}>
                  Gemini API Key (Opcional)
                </label>
                <input
                  type="password"
                  placeholder="AIzaSy..."
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                  className="form-input"
                  style={{ fontSize: '0.8rem', padding: '7px 10px', width: '100%' }}
                />
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
                  Requerido para chatear libremente con Elena en el AI Chat.
                </span>
              </div>

              {/* Feedback Button */}
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--card-border)' }}>
                <label className="form-label" style={{ fontWeight: 700, fontSize: '0.8rem', marginBottom: '6px', display: 'block' }}>
                  Comentarios y Sugerencias
                </label>
                <a 
                  href="mailto:jsorba@mail.pima.edu?subject=Estudiamos%20102%20Feedback" 
                  className="btn btn-secondary" 
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', width: '100%', textDecoration: 'none', fontSize: '0.78rem', padding: '6px 10px' }}
                >
                  <Mail size={14} color="var(--primary)" /> Enviar correo a jsorba@mail.pima.edu
                </a>
              </div>

              {/* Save & Backup Section */}
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label className="form-label" style={{ fontWeight: 700, fontSize: '0.82rem', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Save size={15} color="var(--primary)" /> Guardar y Restaurar (Save & Backup)
                  </label>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    Lvl {state.level} • {state.gold} G • Etapa {state.questStage}
                  </span>
                </div>

                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '10px', lineHeight: 1.35 }}>
                  Exporta tu archivo de guardado para respaldar tu progreso o transferirlo a otro navegador o dispositivo.
                </span>

                {saveStatus && (
                  <div style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    marginBottom: '10px',
                    background: saveStatus.type === 'success' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                    border: saveStatus.type === 'success' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                    color: saveStatus.type === 'success' ? '#10b981' : '#ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px'
                  }}>
                    <span>{saveStatus.message}</span>
                    <button 
                      type="button" 
                      onClick={() => setSaveStatus(null)}
                      style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '0.8rem', padding: 0 }}
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* Export Buttons */}
                <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleExportDownload}
                    style={{ flex: 1, fontSize: '0.75rem', padding: '6px 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                    title="Descargar archivo .json con tu progreso"
                  >
                    <Download size={13} /> Exportar (.json)
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleExportCopy}
                    style={{ fontSize: '0.75rem', padding: '6px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}
                    title="Copiar código JSON al portapapeles"
                  >
                    {copiedSave ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                    <span>{copiedSave ? "¡Copiado!" : "Copiar"}</span>
                  </button>
                </div>

                {/* Import Buttons */}
                <div style={{ display: 'flex', gap: '6px' }}>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".json,application/json"
                    onChange={handleFileImport}
                    style={{ display: 'none' }}
                  />
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => fileInputRef.current?.click()}
                    style={{ flex: 1, fontSize: '0.75rem', padding: '6px 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                    title="Cargar archivo .json desde tu dispositivo"
                  >
                    <Upload size={13} color="var(--primary)" /> Importar Archivo
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowPasteImport(!showPasteImport)}
                    style={{ fontSize: '0.75rem', padding: '6px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}
                    title="Pegar código JSON de guardado"
                  >
                    <FileText size={13} />
                    <span>Pegar</span>
                  </button>
                </div>

                {/* Collapsible Paste Box */}
                {showPasteImport && (
                  <div style={{ marginTop: '10px', padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                      Pega aquí el código JSON de tu partida:
                    </label>
                    <textarea
                      value={pastedSaveText}
                      onChange={(e) => setPastedSaveText(e.target.value)}
                      placeholder='{"app":"estudiamos_102","data":{...}}'
                      rows={3}
                      style={{
                        width: '100%',
                        fontSize: '0.72rem',
                        fontFamily: 'monospace',
                        background: 'rgba(0,0,0,0.4)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '6px',
                        color: 'var(--text-primary)',
                        padding: '6px',
                        resize: 'vertical'
                      }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', marginTop: '6px' }}>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => { setShowPasteImport(false); setPastedSaveText(""); }}
                        style={{ fontSize: '0.72rem', padding: '4px 8px' }}
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={handlePasteImport}
                        style={{ fontSize: '0.72rem', padding: '4px 10px' }}
                      >
                        Restaurar
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Danger Zone */}
              <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--danger)', display: 'block', marginBottom: '6px' }}>
                  Zona de Peligro (Danger Zone)
                </span>
                <button className="btn btn-danger btn-sm" onClick={handleReset} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.75rem', width: '100%', padding: '6px 10px' }}>
                  <RefreshCw size={13} /> Reiniciar Todo el Progreso
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              display: 'flex',
              gap: '10px',
              padding: '12px 18px',
              borderTop: '1px solid var(--card-border)',
              background: 'rgba(0, 0, 0, 0.25)',
              flexShrink: 0
            }}>
              <button className="btn btn-secondary" onClick={() => setShowSettings(false)} style={{ flex: 1, padding: '8px', fontSize: '0.82rem' }}>
                Cerrar (Close)
              </button>
              <button className="btn btn-primary" onClick={handleSaveSettings} style={{ flex: 1, padding: '8px', fontSize: '0.82rem' }}>
                Guardar (Save)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
