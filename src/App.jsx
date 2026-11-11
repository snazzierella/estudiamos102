import React, { useState, useEffect } from 'react';
import { useGameState } from './hooks/useGameState';
import Dashboard from './components/Dashboard';
import PlacementTest from './components/PlacementTest';
import StudyQuest from './components/StudyQuest';
import GameShop from './components/GameShop';
import AiChat from './components/AiChat';
import MiniGames from './components/MiniGames';
import BadgeTrophy from './components/BadgeTrophy';
import MistakesDungeon from './components/MistakesDungeon';
import { Settings, RefreshCw, Mail } from 'lucide-react';
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
    setDifficultyMode
  } = useGameState();

  const [view, setView] = useState('dashboard');
  const [studyQuestTab, setStudyQuestTab] = useState('quest');
  const [showSettings, setShowSettings] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [prevLevel, setPrevLevel] = useState(state.level);
  const [tempKey, setTempKey] = useState(state.apiKeys.gemini || "");

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
      return <PlacementTest completePlacement={completePlacement} />;
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
            markFlashcardsSeen={markFlashcardsSeen}
            recordWordAnsweredCorrectly={recordWordAnsweredCorrectly}
            addMistake={addMistake}
            updateWordMastery={updateWordMastery}
            toggleAutoSpeak={toggleAutoSpeak}
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
            onOpenSettings={() => setShowSettings(true)}
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

        {state.hasCompletedPlacement && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Lvl <strong>{state.level}</strong>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 'bold' }}>
              🪙 {state.gold} G
            </div>
            <div style={{ fontSize: '0.85rem', color: '#ff7a00', fontWeight: 'bold' }}>
              🔥 {state.streak} days
            </div>
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
        )}
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
        <div className="modal-overlay">
          <div className="glass-panel modal-content" style={{ animation: 'pop-in 0.3s ease-out' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Settings size={20} color="var(--primary)" /> Configuración (Settings)
            </h3>
            
            <div className="form-group" style={{ marginTop: '10px' }}>
              <label className="form-label">Gemini API Key (Optional)</label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={tempKey}
                onChange={(e) => setTempKey(e.target.value)}
                className="form-input"
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Required to speak freely with Elena in the AI Chat.
              </span>
            </div>

            <div className="form-group" style={{ marginTop: '12px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--card-border)' }}>
              <input
                type="checkbox"
                id="excludeVosotros"
                checked={state.excludeVosotros || false}
                onChange={(e) => setExcludeVosotros(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--primary)' }}
              />
              <div>
                <label htmlFor="excludeVosotros" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', cursor: 'pointer', display: 'block' }}>
                  Exclude \"vosotros\" forms
                </label>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>
                  Hides Spain-specific plural forms in conjugation quizzes.
                </span>
              </div>
            </div>

            {/* Difficulty selector radio group */}
            <div className="form-group" style={{ marginTop: '14px', background: 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--card-border)' }}>
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px', display: 'block' }}>Dificultad (Difficulty Mode)</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['relaxed', 'standard', 'hardcore'].map(mode => (
                  <button 
                    key={mode}
                    type="button"
                    className={`btn ${state.difficultyMode === mode ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setDifficultyMode(mode)}
                    style={{ flex: 1, textTransform: 'capitalize', fontSize: '0.75rem', padding: '6px' }}
                  >
                    {mode === 'relaxed' ? 'Relaxed' : mode === 'hardcore' ? 'Hardcore' : 'Standard'}
                  </button>
                ))}
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '6px' }}>
                {state.difficultyMode === 'relaxed' && "Relaxed: No quiz damage. 50% XP/Gold rewards."}
                {state.difficultyMode === 'standard' && "Standard: 15 HP damage on mistakes."}
                {state.difficultyMode === 'hardcore' && "Hardcore: 30 HP damage. Fainting resets quest level. 2x XP/Gold rewards!"}
              </span>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '14px', marginTop: '14px' }}>
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px', display: 'block' }}>
                Comentarios y Sugerencias
              </label>
              <a 
                href="mailto:jsorba@mail.pima.edu?subject=Estudiamos%20102%20Feedback" 
                className="btn btn-secondary" 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', textDecoration: 'none', fontSize: '0.85rem' }}
              >
                <Mail size={15} color="var(--primary)" /> Enviar correo a jsorba@mail.pima.edu
              </a>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--danger)' }}>Zone of Danger</span>
              <button className="btn btn-danger" onClick={handleReset} style={{ display: 'flex', gap: '8px', fontSize: '0.85rem' }}>
                <RefreshCw size={14} /> Reset All Progress
              </button>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button className="btn btn-secondary" onClick={() => setShowSettings(false)} style={{ flex: 1 }}>
                Close
              </button>
              <button className="btn btn-primary" onClick={handleSaveSettings} style={{ flex: 1 }}>
                Save Key
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
