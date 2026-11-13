// Speech Synthesis and Audio Helper for Estudiamos 102
// Provides natural voice selection, intonation preservation, and optional Gemini Neural Studio TTS.

const audioCache = new Map();
let currentAudio = null;
let voiceListeners = [];

// Rank and score available browser voices to favor Natural / Neural / Enhanced voices
export function scoreVoice(voice) {
  let score = 0;
  const name = (voice.name || "").toLowerCase();
  const lang = (voice.lang || "").toLowerCase();

  // Must be a Spanish voice
  if (!lang.startsWith('es')) return -100;

  // Major preference for modern neural, natural, enhanced, or premium cloud voices
  if (name.includes('natural') || name.includes('neural') || name.includes('enhanced') || name.includes('premium')) {
    score += 60;
  }
  if (name.includes('online')) {
    score += 35;
  }
  if (name.includes('google')) {
    score += 25;
  }
  if (name.includes('microsoft')) {
    score += 20;
  }
  if (name.includes('apple') || name.includes('siri')) {
    score += 20;
  }

  // Dialect preference: Latin American / Mexican Spanish is standard for 102
  if (lang === 'es-mx' || name.includes('mexico') || name.includes('méxico')) {
    score += 15;
  } else if (lang === 'es-us' || lang === 'es-419') {
    score += 12;
  } else if (lang === 'es-es') {
    score += 8;
  } else {
    score += 5;
  }

  // Penalty for known robotic/offline fallback synthesizers (eSpeak, speech-dispatcher, etc.)
  if (name.includes('espeak') || name.includes('speech-dispatcher') || name.includes('klatt') || name.includes('pico')) {
    score -= 50;
  }

  return score;
}

// Retrieve sorted list of Spanish voices currently available on the device
export function getSpanishVoices() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  const voices = window.speechSynthesis.getVoices() || [];
  return voices
    .filter(v => (v.lang || '').toLowerCase().startsWith('es'))
    .sort((a, b) => scoreVoice(b) - scoreVoice(a));
}

// Register a listener for when browser voices asynchronously load
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    const list = getSpanishVoices();
    voiceListeners.forEach(cb => {
      try {
        cb(list);
      } catch (e) {
        console.warn("Voice listener error:", e);
      }
    });
  };
}

export function subscribeToVoices(callback) {
  voiceListeners.push(callback);
  callback(getSpanishVoices());
  return () => {
    voiceListeners = voiceListeners.filter(cb => cb !== callback);
  };
}

// Clean text for speech while keeping punctuation for natural breathing and cadence
export function cleanTextForSpeech(text) {
  if (!text) return "";
  return text
    .split("/")[0]
    .split(" o ")[0]
    .replace(/\(.*?\)/g, "")
    .replace(/\[.*?\]/g, "")
    .trim();
}

// Format friendly label for a voice in UI dropdowns
export function formatVoiceLabel(voice) {
  const isNatural = /natural|neural|enhanced|premium|online/i.test(voice.name);
  const tag = isNatural ? " ✨ Natural" : "";
  return `${voice.name} (${voice.lang})${tag}`;
}

// Play speech using Gemini Studio TTS if API key is provided
async function playGeminiTts(cleanText, apiKey, rate = 1.0) {
  if (audioCache.has(cleanText)) {
    const cachedUrl = audioCache.get(cleanText);
    if (currentAudio) {
      try { currentAudio.pause(); } catch {}
    }
    currentAudio = new Audio(cachedUrl);
    if (rate && typeof rate === 'number') {
      currentAudio.playbackRate = Math.max(0.5, Math.min(2.0, rate));
    }
    await currentAudio.play();
    return true;
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/interactions?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gemini-3.8-flash-tts",
        input: [{
          type: "user_input",
          content: [{
            type: "text",
            text: cleanText,
            annotations: [{ type: "speech_metadata", style: "warm and natural" }]
          }]
        }],
        response_format: { type: "audio" },
        generation_config: {
          speech_config: [{ voice: "Sulafat" }] // Warm, friendly Latin-American voice persona
        }
      })
    });

    if (response.ok) {
      const data = await response.json();
      const base64Audio = data.output_audio?.data ||
        data.steps?.flatMap(s => s.content || []).find(c => c.type === 'audio')?.data;
      if (base64Audio) {
        const audioUrl = `data:audio/wav;base64,${base64Audio}`;
        audioCache.set(cleanText, audioUrl);
        if (currentAudio) {
          try { currentAudio.pause(); } catch {}
        }
        currentAudio = new Audio(audioUrl);
        if (rate && typeof rate === 'number') {
          currentAudio.playbackRate = Math.max(0.5, Math.min(2.0, rate));
        }
        await currentAudio.play();
        return true;
      }
    }
  } catch (err) {
    console.warn("Gemini TTS request failed, using Web Speech fallback:", err);
  }

  return false;
}

// Stop any currently playing speech (Gemini audio or Web Speech)
export function stopSpanishSpeech() {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch {}
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {}
  }
}

// Main speech synthesis function used across all app components
export async function speakSpanish(text, options = {}) {
  const {
    state = {},
    rate = null,
    selectedVoiceName = null,
    onStart = null,
    onEnd = null
  } = options;

  const clean = cleanTextForSpeech(text);
  if (!clean) return;

  const finalRate = rate ?? state.ttsRate ?? 0.95;

  // 1. Try Gemini Neural Studio Voice if enabled and key exists
  const apiKey = state.apiKeys?.gemini;
  const wantsGemini = state.useGeminiTts || options.forceGemini;
  if (apiKey && wantsGemini) {
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      const success = await playGeminiTts(clean, apiKey, finalRate);
      if (success) {
        if (onStart) onStart();
        if (currentAudio) {
          currentAudio.onended = () => {
            if (onEnd) onEnd();
          };
          currentAudio.onerror = () => {
            if (onEnd) onEnd();
          };
        }
        return;
      }
    } catch (e) {
      console.warn("Falling back to browser speech synthesis:", e);
    }
  }

  // 2. Browser Web Speech API with ranked natural voices
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  try {
    // Stop any in-flight HTML5 audio
    if (currentAudio) {
      try {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      } catch {}
    }

    // Cancel prior speech and resume if paused (workaround for Chrome/Edge)
    window.speechSynthesis.cancel();
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = 'es-MX';
    
    // Scale rate within safe Web Speech limits
    utterance.rate = Math.max(0.4, Math.min(2.0, finalRate));
    utterance.pitch = 1.0;

    const voices = getSpanishVoices();
    let chosenVoice = null;

    const targetName = selectedVoiceName || state.ttsVoice;
    if (targetName) {
      chosenVoice = voices.find(v => v.name === targetName);
    }

    // Default to the highest scored natural voice
    if (!chosenVoice && voices.length > 0) {
      chosenVoice = voices[0];
    }

    if (chosenVoice) {
      utterance.voice = chosenVoice;
      utterance.lang = chosenVoice.lang;
    }

    if (onStart) utterance.onstart = onStart;
    if (onEnd) utterance.onend = onEnd;
    utterance.onerror = (e) => {
      console.warn("Speech synthesis utterance error:", e);
      if (onEnd) onEnd();
    };

    // Chrome/Blink requires brief delay after cancel before speaking a new utterance
    setTimeout(() => {
      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn("Web Speech API speak invocation error:", err);
        if (onEnd) onEnd();
      }
    }, 30);
  } catch (e) {
    console.warn("Web Speech API error:", e);
    if (onEnd) onEnd();
  }
}
