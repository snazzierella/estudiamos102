import React, { useState, useEffect } from 'react';
import { RotateCcw, Check, Sparkles, AlertCircle } from 'lucide-react';
import { checkSentenceConstruction } from '../utils/sentenceBuilderHelper';

export default function SentenceBuilder({ 
  question, 
  onAnswer, 
  answered, 
  userCorrect, 
  showSubmitButton = true,
  onHintRevealed,
  translateInstructions = false
}) {
  const [placedTokens, setPlacedTokens] = useState([]);
  const [bankTokens, setBankTokens] = useState([]);
  const [draggedToken, setDraggedToken] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);
  const [showHint, setShowHint] = useState(false);

  // Initialize or reset when question changes
  useEffect(() => {
    if (question && question.bankTokens) {
      setBankTokens([...question.bankTokens]);
      setPlacedTokens([]);
      setDraggedToken(null);
      setDragOverIdx(null);
      setShowHint(false);
    }
  }, [question]);

  // Tap word in bank -> move to end of placed list
  const handleBankWordClick = (token) => {
    if (answered) return;
    setBankTokens(prev => prev.filter(t => t.id !== token.id));
    setPlacedTokens(prev => [...prev, token]);
  };

  // Tap placed word -> return to bank
  const handlePlacedWordClick = (token) => {
    if (answered) return;
    setPlacedTokens(prev => prev.filter(t => t.id !== token.id));
    setBankTokens(prev => [...prev, token]);
  };

  // Reset all words back to bank
  const handleReset = () => {
    if (answered || !question) return;
    setBankTokens([...question.bankTokens]);
    setPlacedTokens([]);
  };

  // Drag & Drop Handlers
  const handleDragStart = (e, token, source) => {
    if (answered) return;
    setDraggedToken({ ...token, source });
    e.dataTransfer.setData('text/plain', token.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, idx = null) => {
    e.preventDefault();
    if (answered) return;
    e.dataTransfer.dropEffect = 'move';
    if (idx !== null && dragOverIdx !== idx) {
      setDragOverIdx(idx);
    }
  };

  const handleDragLeave = () => {
    setDragOverIdx(null);
  };

  const handleDropOnSlotZone = (e) => {
    e.preventDefault();
    if (answered || !draggedToken) return;

    if (draggedToken.source === 'bank') {
      // From bank to sentence slot zone
      setBankTokens(prev => prev.filter(t => t.id !== draggedToken.id));
      if (dragOverIdx !== null && dragOverIdx >= 0 && dragOverIdx <= placedTokens.length) {
        setPlacedTokens(prev => {
          const next = [...prev];
          next.splice(dragOverIdx, 0, draggedToken);
          return next;
        });
      } else {
        setPlacedTokens(prev => [...prev, draggedToken]);
      }
    } else if (draggedToken.source === 'placed' && dragOverIdx !== null) {
      // Reordering within sentence zone
      setPlacedTokens(prev => {
        const filtered = prev.filter(t => t.id !== draggedToken.id);
        filtered.splice(dragOverIdx, 0, draggedToken);
        return filtered;
      });
    }

    setDraggedToken(null);
    setDragOverIdx(null);
  };

  const handleDropOnBankZone = (e) => {
    e.preventDefault();
    if (answered || !draggedToken) return;

    if (draggedToken.source === 'placed') {
      setPlacedTokens(prev => prev.filter(t => t.id !== draggedToken.id));
      setBankTokens(prev => [...prev, draggedToken]);
    }

    setDraggedToken(null);
    setDragOverIdx(null);
  };

  const handleSubmit = () => {
    if (answered || placedTokens.length === 0) return;
    const isCorrect = checkSentenceConstruction(placedTokens, question.targetWords);
    const assembledStr = placedTokens.map(t => t.text).join(' ');
    onAnswer(isCorrect, assembledStr);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '560px', margin: '0 auto' }}>
      
      {/* Target prompt */}
      <div style={{ textAlign: 'center', marginBottom: '4px' }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
          {translateInstructions ? "Construye la frase • Build the sentence:" : "Construye la frase (Build the sentence):"}
        </div>
        <h3 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: '1.4rem', 
          color: 'var(--text-primary)', 
          margin: 0,
          lineHeight: '1.4',
          fontWeight: 700 
        }}>
          &ldquo;{question.prompt}&rdquo;
        </h3>
        {question.hint && (
          <div style={{ marginTop: '8px', minHeight: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {!showHint ? (
              <button
                type="button"
                onClick={() => {
                  setShowHint(true);
                  onHintRevealed?.();
                }}
                className="hint-toggle-btn"
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
                  e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.4)';
                  e.currentTarget.style.color = '#fbbf24';
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
              <div 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  background: 'rgba(251, 191, 36, 0.12)', 
                  border: '1px solid rgba(251, 191, 36, 0.3)', 
                  padding: '6px 14px', 
                  borderRadius: '12px', 
                  color: '#fbbf24', 
                  fontSize: '0.8rem',
                  maxWidth: '92%',
                  animation: 'fadeIn 0.2s ease'
                }}
              >
                <span>💡</span>
                <span><strong>{translateInstructions ? "Pista (Hint):" : "Pista:"}</strong> {question.hint}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Drop / Assembly Zone */}
      <div 
        onDragOver={(e) => handleDragOver(e, null)}
        onDrop={handleDropOnSlotZone}
        style={{
          minHeight: '80px',
          padding: '14px',
          borderRadius: '14px',
          background: answered 
            ? (userCorrect ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)')
            : 'rgba(0, 0, 0, 0.25)',
          border: answered
            ? (userCorrect ? '2px solid #10b981' : '2px solid #ef4444')
            : '2px dashed rgba(255, 255, 255, 0.18)',
          boxShadow: answered && userCorrect ? '0 0 16px rgba(16, 185, 129, 0.2)' : 'none',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          alignItems: 'center',
          justifyContent: placedTokens.length === 0 ? 'center' : 'flex-start',
          transition: 'all 0.2s ease'
        }}
      >
        {placedTokens.length === 0 ? (
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', userSelect: 'none', textAlign: 'center' }}>
            {translateInstructions 
              ? "👆 Arrastra o toca las palabras de abajo para formar la frase (Drag or tap words below to form sentence)" 
              : "👆 Arrastra o toca las palabras de abajo para formar la frase"}
          </span>
        ) : (
          placedTokens.map((token, idx) => {
            let chipColor = 'var(--primary)';
            let chipBg = 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(79, 70, 229, 0.15))';
            let chipBorder = 'rgba(99, 102, 241, 0.4)';

            if (answered) {
              if (userCorrect) {
                chipColor = '#a7f3d0';
                chipBg = 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(5, 150, 105, 0.2))';
                chipBorder = '#10b981';
              } else {
                chipColor = '#fecaca';
                chipBg = 'linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(220, 38, 38, 0.2))';
                chipBorder = '#ef4444';
              }
            }

            return (
              <button
                key={token.id}
                type="button"
                draggable={!answered}
                onDragStart={(e) => handleDragStart(e, token, 'placed')}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDragLeave={handleDragLeave}
                onClick={() => handlePlacedWordClick(token)}
                disabled={answered}
                style={{
                  padding: '8px 14px',
                  borderRadius: '10px',
                  background: chipBg,
                  border: `1.5px solid ${chipBorder}`,
                  color: chipColor,
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: answered ? 'default' : 'pointer',
                  animation: 'pop-in 0.2s ease-out',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  transform: dragOverIdx === idx ? 'scale(1.08)' : 'scale(1)',
                  transition: 'transform 0.15s ease'
                }}
                title={answered ? "" : (translateInstructions ? "Toca para devolver palabra (Tap to return word)" : "Toca para devolver palabra")}
              >
                <span>{token.text}</span>
                {!answered && (
                  <span style={{ fontSize: '0.7rem', opacity: 0.6, marginLeft: '2px' }}>✕</span>
                )}
              </button>
            );
          })
        )}
      </div>

      {/* Control bar (Clear button & count) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          {translateInstructions ? "Palabras elegidas (Words placed):" : "Palabras elegidas:"} <strong>{placedTokens.length}</strong> / {question.targetWords.length}
        </span>
        {!answered && placedTokens.length > 0 && (
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.75rem', padding: '4px 10px', gap: '4px' }}
          >
            <RotateCcw size={13} /> {translateInstructions ? "Vaciar (Clear)" : "Vaciar"}
          </button>
        )}
      </div>

      {/* Word Bank Zone */}
      <div 
        onDragOver={(e) => handleDragOver(e, null)}
        onDrop={handleDropOnBankZone}
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--card-border)',
          borderRadius: '14px',
          padding: '16px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'center',
          minHeight: '70px',
          alignItems: 'center'
        }}
      >
        {bankTokens.length === 0 ? (
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            {translateInstructions 
              ? "¡Todas las palabras están colocadas arriba! (All words have been placed above!)" 
              : "¡Todas las palabras están colocadas arriba!"}
          </span>
        ) : (
          bankTokens.map((token) => (
            <button
              key={token.id}
              type="button"
              draggable={!answered}
              onDragStart={(e) => handleDragStart(e, token, 'bank')}
              onClick={() => handleBankWordClick(token)}
              disabled={answered}
              style={{
                padding: '9px 16px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: 'var(--text-primary)',
                fontWeight: 600,
                fontSize: '0.92rem',
                cursor: answered ? 'default' : 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (!answered) {
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!answered) {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {token.text}
            </button>
          ))
        )}
      </div>

      {/* Submit Button */}
      {showSubmitButton && !answered && (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={placedTokens.length === 0}
          className="btn btn-primary"
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '0.95rem',
            fontWeight: 700,
            marginTop: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <Check size={18} /> {translateInstructions ? "Comprobar Frase (Check Sentence)" : "Comprobar Frase"}
        </button>
      )}

      {/* Answer feedback banner if answered */}
      {answered && (
        <div style={{
          padding: '12px 16px',
          borderRadius: '12px',
          background: userCorrect ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
          border: `1px solid ${userCorrect ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          color: userCorrect ? '#a7f3d0' : '#fecaca',
          fontSize: '0.9rem',
          lineHeight: '1.4',
          animation: 'pop-in 0.25s ease-out'
        }}>
          {userCorrect ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
              <Sparkles size={18} color="#10b981" />
              <span>
                {translateInstructions 
                  ? "¡Excelente! Frase construida a la perfección. (Excellent! Sentence constructed perfectly.)"
                  : "¡Excelente! Frase construida a la perfección."}
              </span>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, marginBottom: '4px', color: '#f87171' }}>
                <AlertCircle size={18} />
                <span>
                  {translateInstructions 
                    ? "Orden incorrecto (Incorrect word order)" 
                    : "Orden incorrecto"}
                </span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {translateInstructions ? "Frase correcta (Correct sentence):" : "Frase correcta:"}{' '}
                <strong style={{ color: '#ffffff' }}>&ldquo;{question.targetSentence}&rdquo;</strong>
              </div>
            </div>
          )}
          {question.syntaxBreakdown && (
            <div style={{
              marginTop: '8px',
              padding: '8px 12px',
              background: 'rgba(255, 255, 255, 0.06)',
              borderRadius: '8px',
              borderLeft: '3px solid #38bdf8',
              fontSize: '0.84rem',
              color: '#bae6fd',
              lineHeight: '1.4'
            }}>
              <strong style={{ color: '#38bdf8' }}>Estructura gramatical:</strong> {question.syntaxBreakdown}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
