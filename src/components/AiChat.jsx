import React, { useState, useEffect, useRef } from 'react';
import vocabularyData from '../data/vocabulary.json';
import { speakSpanish as speakSpanishUtil } from '../utils/speechHelper';
import { Settings, Send, ArrowLeft, Volume2, Key, Info, Sparkles } from 'lucide-react';

// Extract unique Spanish words to highlight them and feed to LLM
const getUniqueWords = () => {
  const words = new Set();
  
  // High-frequency 102 conjugations (preterite & reflexives) to recognize
  const common102Forms = [
    // Preterite common regular & irregular
    "fui", "fuiste", "fue", "fuimos", "fueron",
    "estuve", "estuviste", "estuvo", "estuvimos", "estuvieron",
    "tuve", "tuviste", "tuvo", "tuvimos", "tuvieron",
    "hice", "hiciste", "hizo", "hicimos", "hicieron",
    "pude", "pudiste", "pudo", "pudimos", "pudieron",
    "puse", "pusiste", "puso", "pusimos", "pusieron",
    "supe", "supiste", "supo", "supimos", "supieron",
    "dije", "dijiste", "dijo", "dijimos", "dijeron",
    "traje", "trajiste", "trajo", "trajimos", "trajeron",
    "di", "diste", "dio", "dimos", "dieron",
    "vi", "viste", "vio", "vimos", "vieron",
    "compré", "compraste", "compró", "compramos", "compraron",
    "pagué", "pagaste", "pagó", "pagamos", "pagaron",
    "lavé", "limpié", "viajé", "nadé", "caminé", "descansé", "cené", "desayuné",
    "comí", "comiste", "comió", "comimos", "comieron",
    "salí", "saliste", "salió", "salimos", "salieron",
    "dormí", "durmió", "durmieron",
    // Reflexives (present & preterite)
    "desperté", "despierto", "despiertas", "despierta", "despertamos",
    "levanté", "levanto", "levantas", "levanta", "levantamos",
    "duché", "ducho", "duchas", "ducha", "duchamos",
    "cepillé", "cepillo", "cepillas", "cepilla",
    "vestí", "visto", "vistes", "viste", "vestimos",
    "acosté", "acuesto", "acuestas", "acuesta", "acostamos",
    "dormí", "duermo", "duermes", "duerme", "dormimos",
    "sentí", "siento", "sientes", "siente", "sentimos",
    "enfermé", "enfermo", "lastimé", "lastimo",
    "dolió", "dolieron", "duele", "duelen", "gustó", "gustaron", "gusta", "gustan",
    // Conversational markers
    "hola", "adiós", "gracias", "por", "para", "ayer", "anoche", "hoy", "mañana",
    "siempre", "nunca", "a veces", "después", "antes", "temprano", "tarde",
    "bien", "mal", "mucho", "poco", "sí", "no"
  ];
  common102Forms.forEach(w => words.add(w.toLowerCase()));

  vocabularyData.forEach(item => {
    const baseClean = item.spanish.replace(/\(.*?\)/g, "").replace(/\[.*?\]/g, "").trim().toLowerCase();
    const parts = baseClean.split(/\s*[/,\s]\s*/);
    parts.forEach(part => {
      const clean = part.replace(/^(el|la|los|las|un|una|unos|unas|del|al)\b/g, "")
                        .replace(/[¿?¡!,.]/g, "")
                        .trim();
      if (clean && clean.length > 1) {
        words.add(clean);
        if (clean.endsWith("se")) {
          words.add(clean.slice(0, -2)); // e.g. despertarse -> despertar
        }
      }
    });
  });
  return Array.from(words);
};

const UNIQUE_SPANISH_WORDS = getUniqueWords();

// Conversational Themes for Spanish 102
const CONVERSATION_TOPICS = [
  {
    id: "general",
    label: "🌟 General 102",
    title: "Conversación General 102 (Routines, Travel & Past)",
    desc: "Habla sobre tus hábitos diarios, lo que hiciste ayer, compras y tus viajes favoritos.",
    openingMessage: "¡Hola! Me llamo Elena. Soy tu compañera de español 102. Hoy quiero que hablemos sobre tus rutinas, tus viajes y lo que hiciste recientemente. ¿Cómo estás hoy?",
    initialSuggestions: ["¡Hola Elena! Estoy muy bien.", "Hola, un poco cansado/a.", "Todo excelente, ¿y tú?"],
    steps: [
      {
        reply: "¡Me alegro! Yo hoy me levanté a las siete de la mañana, me duché y me cepillé los dientes. ¿A qué hora te despiertas o te levantas tú normalmente?",
        suggestions: ["Me despierto a las siete.", "Me levanto a las ocho.", "Me despierto temprano."]
      },
      {
        reply: "¡Qué bien! Ayer por la tarde tuve un día muy ocupado: limpié mi habitación y estudié para una prueba de español. Y tú, ¿qué hiciste ayer por la tarde?",
        suggestions: ["Ayer estudié mucho.", "Salí con mis amigos.", "Descansé en mi casa."]
      },
      {
        reply: "¡Excelente! El sábado pasado fui de compras al centro comercial. Compré unos zapatos nuevos y pagué con tarjeta de crédito. ¿Compraste algo tú esta semana?",
        suggestions: ["Compré ropa nueva.", "Compré comida en el súper.", "No compré nada."]
      },
      {
        reply: "¡Qué bien! A veces cuando voy de compras me canso mucho y me duele la espalda o los pies. ¿Cómo te sientes de salud hoy? ¿Tienes buena energía?",
        suggestions: ["Me siento muy bien.", "Me duele la cabeza.", "Tengo mucha energía."]
      },
      {
        reply: "¡Me alegro! El verano pasado viajé en avión a la playa en México y me quedé en un hotel bonito frente al mar. ¿Adónde fuiste tú de vacaciones en tu viaje favorito?",
        suggestions: ["Fui a la playa.", "Visité a mi familia.", "Viajé a las montañas."]
      },
      {
        reply: "¡Qué maravilloso viaje! Por las noches, antes de acostarme, siempre me pongo el pijama y leo un libro. ¿A qué hora te acuestas tú normalmente?",
        suggestions: ["Me acuesto a las diez.", "Me duermo a medianoche.", "Me acuesto tarde."]
      },
      {
        reply: "¡Fantástico! Practicaste verbos reflexivos, compras, salud y conjugaciones en pretérito pasado con mucha soltura. ¡Hiciste un trabajo excelente hoy! ¡Hasta la próxima charla!",
        suggestions: ["¡Muchas gracias Elena!", "¡Hasta luego Elena!", "¡Adiós, nos vemos!"]
      }
    ]
  },
  {
    id: "rutina",
    label: "🌅 Rutina y Reflexivos",
    title: "La Rutina Diaria y Verbos Reflexivos",
    desc: "Practica despertarse, levantarse, ducharse, vestirse y acostarse.",
    openingMessage: "¡Hola! Hoy vamos a practicar la rutina diaria y los verbos reflexivos. Yo me despierto con una alarma y me levanto en seguida. ¿Cómo empieza tu mañana?",
    initialSuggestions: ["Me despierto temprano.", "Me levanto despacio.", "Tomo café primero."],
    steps: [
      {
        reply: "¡Qué bien! Después de levantarme, voy al baño, me ducho con agua tibia y me cepillo los dientes. ¿Te duchas por la mañana o por la noche?",
        suggestions: ["Me ducho por la mañana.", "Me ducho por la noche.", "Me baño antes de dormir."]
      },
      {
        reply: "Comprendo. Luego voy a mi dormitorio y me visto con ropa cómoda. ¿Qué ropa te pones tú normalmente para ir a clase o al trabajo?",
        suggestions: ["Me pongo unos jeans.", "Me visto con camiseta.", "Me pongo ropa formal."]
      },
      {
        reply: "¡Muy bien! ¿Y ayer? Hablemos en pasado: ¿a qué hora te despertaste y te levantaste ayer por la mañana?",
        suggestions: ["Ayer me desperté a las 6.", "Me levanté a las ocho.", "Me desperté muy tarde."]
      },
      {
        reply: "¡Interesante! Por la noche me lavo la cara, me pongo la ropa de dormir y me acuesto a las diez y media. ¿Te duermes fácilmente por la noche?",
        suggestions: ["Sí, me duermo rápido.", "No, leo antes de dormir.", "Me cuesta dormirme."]
      },
      {
        reply: "¡Excelente conversación! Usaste verbos reflexivos como despertarse, levantarse, vestirse y acostarse con gran precisión. ¡Buen trabajo en tu rutina!",
        suggestions: ["¡Gracias por la práctica!", "¡Hasta la próxima!", "¡Adiós Elena!"]
      }
    ]
  },
  {
    id: "salud",
    label: "🩺 Salud y el Cuerpo",
    title: "La Salud, el Cuerpo y Emergencias",
    desc: "Habla sobre el cuerpo, síntomas, el consultorio médico y medicamentos.",
    openingMessage: "¡Hola! Hablemos sobre la salud, el cuerpo y el bienestar. A veces el estrés de las clases nos afecta. ¿Cómo te sientes físicamente hoy?",
    initialSuggestions: ["Me siento muy bien.", "Estoy un poco cansado/a.", "Tengo mucha energía."],
    steps: [
      {
        reply: "¡Te entiendo! La semana pasada tuve un resfriado fuerte: tuve fiebre alta y me dolió mucho la garganta. ¿Cuándo fue la última vez que te enfermaste?",
        suggestions: ["Me enfermé el mes pasado.", "Hace mucho no me enfermo.", "Tuve gripe hace poco."]
      },
      {
        reply: "¡Qué alivio que ya estás mejor! Cuando me sentí mal, fui a la clínica médica y el doctor me recetó antibióticos y descanso. ¿Prefieres tomar medicina o descansar?",
        suggestions: ["Prefiero descansar.", "Tomo medicina y té.", "Voy al médico siempre."]
      },
      {
        reply: "¡Muy buena decisión! Para mantenernos saludables, es importante cuidar el cuerpo: comer verduras, beber agua y hacer ejercicio. ¿Hiciste ejercicio esta semana?",
        suggestions: ["Sí, caminé mucho.", "Fui al gimnasio.", "No tuve tiempo ayer."]
      },
      {
        reply: "¡Genial! Hablamos de síntomas, partes del cuerpo y medicinas con gran precisión. ¡Cuídate mucho y hasta pronto!",
        suggestions: ["¡Gracias, cuídate tú también!", "¡Hasta luego Elena!", "¡Adiós!"]
      }
    ]
  },
  {
    id: "compras",
    label: "🛍️ Compras y Quehaceres",
    title: "Compras, Tiendas y Quehaceres en Pretérito",
    desc: "Practica comprar, pagar, tiendas de ropa, supermercado y tareas en pasado.",
    openingMessage: "¡Hola! Hoy practicamos quehaceres domésticos y compras en pretérito pasado. Ayer tuve que limpiar la casa antes de salir. ¿Hiciste quehaceres ayer en tu casa?",
    initialSuggestions: ["Sí, lavé los platos.", "Limpié mi habitación.", "No hice quehaceres ayer."],
    steps: [
      {
        reply: "¡Qué responsable! Después de limpiar, fui al supermercado porque necesitaba frutas, leche y pan. ¿Qué compraste tú en el supermercado recientemente?",
        suggestions: ["Compré frutas y verduras.", "Compré carne y queso.", "Compré comida para la semana."]
      },
      {
        reply: "¡Rico! Luego pasé por una tienda de ropa en el centro comercial. Vi una chaqueta muy bonita que costaba cincuenta dólares y la compré en efectivo. ¿Prefieres pagar en efectivo o con tarjeta?",
        suggestions: ["Pago con tarjeta.", "Prefiero pagar en efectivo.", "Pago con mi teléfono."]
      },
      {
        reply: "¿Y alguna vez devolviste algo a la tienda porque no te gustó o no te quedó bien? ¿Hiciste una devolución en el pasado?",
        suggestions: ["Sí, devolví una camisa.", "Nunca devolví nada.", "Cambié un regalo una vez."]
      },
      {
        reply: "¡Excelente! Usaste verbos en pretérito como compré, pagué, limpié y lavé con total soltura. ¡Nos vemos en la próxima compra!",
        suggestions: ["¡Muchas gracias Elena!", "¡Hasta luego!", "¡Adiós!"]
      }
    ]
  },
  {
    id: "viajes",
    label: "✈️ Viajes y Vacaciones",
    title: "Viajes, Hoteles y Pretéritos Irregulares",
    desc: "Viajes en avión/tren, hoteles, vacaciones y verbos como fui, estuve, hice.",
    openingMessage: "¡Hola! Mi tema favorito: los viajes y las vacaciones. Hablemos de los lugares que visitamos en el pasado. ¿Te gusta viajar en avión, en tren o en carro?",
    initialSuggestions: ["Prefiero viajar en avión.", "Me gusta viajar en carro.", "Me encanta el tren."],
    steps: [
      {
        reply: "¡A mí también! El año pasado fui a Puerto Rico de vacaciones. Fue un viaje increíble: tomé el avión, visité el Viejo San Juan y nadé en el mar. ¿Adónde fuiste tú en tus últimas vacaciones?",
        suggestions: ["Fui a México.", "Viajé a California.", "Me quedé en mi ciudad."]
      },
      {
        reply: "¡Qué fantástico destino! Cuando llegamos, nos quedamos en un hotel hermoso con vista al océano. ¿Preferiste quedarte en un hotel, en un albergue o en casa de amigos?",
        suggestions: ["Me quedé en un hotel.", "Me alojé con amigos.", "Alquilé una cabaña."]
      },
      {
        reply: "¿Y qué actividades hiciste durante ese viaje? ¿Sacaste fotos, comiste comida típica o compraste recuerdos?",
        suggestions: ["Saqué muchas fotos.", "Comí platos típicos.", "Caminé por la ciudad."]
      },
      {
        reply: "¡Qué maravilla de recuerdos! Usaste pretéritos como fui, viajé, nadé, me quedé y saqué. ¡Eres un viajero experto! ¡Buen viaje y hasta pronto!",
        suggestions: ["¡Gracias por la charla!", "¡Hasta el próximo viaje!", "¡Adiós Elena!"]
      }
    ]
  },
  {
    id: "ayer",
    label: "🕰️ ¿Qué hiciste ayer?",
    title: "Práctica Intensiva de Pretérito (Tiempo Pasado)",
    desc: "Preguntas continuas en pasado sobre tu día de ayer, tus comidas y actividades.",
    openingMessage: "¡Hola! En esta sesión vamos a practicar exclusivamente el tiempo pasado (pretérito). Quiero saber todo sobre tu día de ayer. Para empezar: ¿a qué hora te levantaste ayer por la mañana?",
    initialSuggestions: ["Ayer me levanté a las 7.", "Me levanté a las ocho.", "Me desperté temprano."],
    steps: [
      {
        reply: "¡Perfecto! ¿Y qué desayunaste o tomaste por la mañana después de levantarte?",
        suggestions: ["Desayuné huevos y café.", "Comí cereal y fruta.", "Solo tomé agua y té."]
      },
      {
        reply: "¡Sabroso! Durante la tarde, ¿trabajaste, fuiste a la universidad o estudiaste en casa?",
        suggestions: ["Trabajé todo el día.", "Fui a mis clases.", "Estudié en mi casa."]
      },
      {
        reply: "¡Qué día tan activo! ¿Y hablaste con algún amigo o viste una película anoche?",
        suggestions: ["Hablé con mi mejor amigo.", "Vi una película buena.", "Descansé y escuché música."]
      },
      {
        reply: "¡Qué buen día tuviste! Y por último: ¿a qué hora te acostaste anoche?",
        suggestions: ["Me acosté a las diez.", "Me dormí a medianoche.", "Me acosté muy tarde."]
      },
      {
        reply: "¡Impresionante! Conjugaste verbos en pretérito con gran precisión: me levanté, desayuné, trabajé, hablé y me acosté. ¡Dominas el tiempo pasado de español 102!",
        suggestions: ["¡Muchas gracias Elena!", "¡Hasta luego!", "¡Adiós!"]
      }
    ]
  }
];

export default function AiChat({ state, setApiKey, setView, incrementBountyCount }) {
  const [activeTopicId, setActiveTopicId] = useState("general");
  const activeTopic = CONVERSATION_TOPICS.find(t => t.id === activeTopicId) || CONVERSATION_TOPICS[0];

  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "bot",
      text: CONVERSATION_TOPICS[0].openingMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState(state.apiKeys.gemini || "");
  const [mockStepIdx, setMockStepIdx] = useState(0);
  const [suggestions, setSuggestions] = useState(CONVERSATION_TOPICS[0].initialSuggestions);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSaveKey = () => {
    setApiKey(tempKey);
    setShowKeyModal(false);
  };

  const switchTopic = (topicId) => {
    const topic = CONVERSATION_TOPICS.find(t => t.id === topicId);
    if (!topic) return;

    setActiveTopicId(topicId);
    setMockStepIdx(0);
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages([
      {
        id: Date.now().toString(),
        role: "bot",
        text: topic.openingMessage,
        time: nowStr
      }
    ]);
    setSuggestions(topic.initialSuggestions);
    setInputText("");
  };

  // Helper to format the message and highlight Spanish vocabulary words
  const renderHighlightedMessage = (text, role) => {
    if (role !== "user") {
      return <span>{text}</span>;
    }

    // Split text into tokens including spaces/punctuation
    const tokens = text.split(/(\s+|[¿?¡!,.\n])/);
    
    return tokens.map((token, index) => {
      const cleanToken = token.toLowerCase().replace(/[¿?¡!,.]/g, "").trim();
      
      // Highlight if cleanToken exists in syllabus vocabulary
      const isKnown = UNIQUE_SPANISH_WORDS.includes(cleanToken);
      
      if (isKnown) {
        return (
          <span key={index} className="chat-highlight-word">
            {token}
          </span>
        );
      }
      
      return <span key={index}>{token}</span>;
    });
  };

  const speakMessage = (text) => {
    speakSpanishUtil(text, { state });
  };

  const submitUserMessage = async (userText) => {
    if (loading) return;
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user message
    const userMsg = {
      id: Date.now().toString(),
      role: "user",
      text: userText,
      time: nowStr
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setSuggestions([]);
    setLoading(true);

    if (incrementBountyCount) {
      incrementBountyCount("chat");
    }

    const apiKey = state.apiKeys.gemini;

    if (!apiKey) {
      // DEMO MOCK CHAT MODE
      setTimeout(() => {
        const step = activeTopic.steps[mockStepIdx];
        let replyText = "¡Qué buena respuesta! Hablaste muy bien en español. Practicamos mucho pretérito y reflexivos hoy. ¡Nos vemos en la próxima charla!";
        let nextSuggestions = ["¡Hasta luego Elena!", "¡Muchas gracias!", "¡Adiós!"];
        
        if (step) {
          replyText = step.reply;
          nextSuggestions = step.suggestions || [];
          setMockStepIdx(prev => prev + 1);
        }

        const botMsg = {
          id: (Date.now() + 1).toString(),
          role: "bot",
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, botMsg]);
        setSuggestions(nextSuggestions);
        setLoading(false);
      }, 900);
      
    } else {
      // REAL GEMINI API INTEGRATION
      try {
        const topicGuidance = activeTopic.id === 'rutina'
          ? "Focus topic: Daily routines, morning/evening habits, and reflexive verbs (despertarse, levantarse, ducharse, vestirse, acostarse)."
          : activeTopic.id === 'salud'
          ? "Focus topic: Health, body parts, symptoms, doctor visits, and medications (doler, fiebre, garganta, clínica, receta)."
          : activeTopic.id === 'compras'
          ? "Focus topic: Shopping, clothing, supermarket, prices, and chores in the preterite past tense (comprar, pagar, tienda, quehaceres)."
          : activeTopic.id === 'viajes'
          ? "Focus topic: Travel, vacations, transportation, and hotels in past tense (viajar, el hotel, el avión, adónde fuiste, preterite irregulars)."
          : activeTopic.id === 'ayer'
          ? "Focus topic: Past tense practice / ¿Qué hiciste ayer? (Ask frequent questions in the pretérito about what the student did yesterday, last night, or recently)."
          : "Focus topic: Comprehensive Spanish 102 conversation covering routines, health, shopping, travel, and past activities.";

        const systemPrompt = `You are Elena, an encouraging and engaging Spanish 102 university language partner.
You MUST communicate ONLY in Spanish.
${topicGuidance}

CRITICAL PEDAGOGICAL MANDATE:
1. Speak natural, accessible Spanish 102 level (avoid complex literary words or advanced subjunctive).
2. Actively use and reinforce Spanish 102 vocabulary:
   - Reflexive verbs (me despierto, te levantas, se duchó, nos vestimos, me acosté, etc.)
   - Past tense / Pretérito verbs (fui, hice, estuve, tuve, compré, pagué, limpié, hablé, salí, etc.)
   - Verbs structured like gustar and doler (me gustó, me dolió la cabeza, etc.)
3. FREQUENTLY ASK PAST TENSE (Pretérito) QUESTIONS, e.g.:
   - "¿Qué hiciste ayer por la tarde?"
   - "¿A qué hora te levantaste hoy?"
   - "¿Adónde fuiste el fin de semana pasado?"
   - "¿Qué compraste en la tienda recientemente?"
   - "¿Ayer hablaste con alguien o descansaste en tu casa?"
4. Keep your responses brief: 1 to 2 clear sentences maximum.
5. CRITICAL SUGGESTIONS: At the very end of your response, output a bracketed list of exactly 3 short suggested student replies (max 4-5 words each) in Spanish. Format it exactly: [Suggestion 1 | Suggestion 2 | Suggestion 3].`;

        // Retrieve last 6 messages to keep context
        const contextHistory = messages.slice(-6).map(m => `${m.role === 'user' ? 'Student' : 'Elena'}: ${m.text}`).join('\n');
        
        let response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  { 
                    text: `${systemPrompt}\n\nConversation history:\n${contextHistory}\n\nStudent: ${userText}\nElena:` 
                  }
                ]
              }
            ],
            generationConfig: {
              maxOutputTokens: 160,
              temperature: 0.6
            }
          })
        });

        // Fallback to gemini-1.5-flash if 2.5 is unavailable
        if (!response.ok) {
          response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    { 
                      text: `${systemPrompt}\n\nConversation history:\n${contextHistory}\n\nStudent: ${userText}\nElena:` 
                    }
                  ]
                }
              ],
              generationConfig: {
                maxOutputTokens: 160,
                temperature: 0.6
              }
            })
          });
        }

        if (!response.ok) {
          throw new Error(`API returned ${response.status}`);
        }

        const data = await response.json();
        let botText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Lo siento, no comprendo.";
        botText = botText.trim();

        let parsedSuggestions = [];
        const match = botText.match(/\[(.*?)\]/);
        if (match) {
          const raw = match[1];
          parsedSuggestions = raw.split("|").map(s => s.trim());
          botText = botText.replace(/\[.*?\]/, "").trim();
        } else {
          parsedSuggestions = ["Sí, exactamente.", "Ayer descansé.", "No comprendo bien."];
        }

        const botMsg = {
          id: Date.now().toString(),
          role: "bot",
          text: botText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, botMsg]);
        setSuggestions(parsedSuggestions);
      } catch (err) {
        console.error("Gemini API Error:", err);
        const errMsg = {
          id: Date.now().toString(),
          role: "bot",
          text: "Error de conexión con el AI. Por favor verifica tu clave de Gemini API en la configuración o inténtalo de nuevo.",
          time: nowStr
        };
        setMessages(prev => [...prev, errMsg]);
        setSuggestions(["Intentar de nuevo"]);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() || loading) return;
    submitUserMessage(inputText.trim());
  };

  const isDemo = !state.apiKeys.gemini;

  return (
    <div className="view-container">
      <div className="view-header">
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Charla AI con Elena</span>
            <span style={{ fontSize: '0.75rem', background: 'rgba(99, 102, 241, 0.2)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
              Español 102
            </span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {isDemo 
              ? "Running in Demo Mode. Elena will guide you through interactive Spanish 102 conversations." 
              : "Connected to Gemini AI. Practice freely using your Spanish 102 vocabulary and past tense!"}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary" onClick={() => setShowKeyModal(true)}>
            <Settings size={16} /> API Key
          </button>
          <button className="btn btn-secondary" onClick={() => setView('dashboard')}>
            <ArrowLeft size={16} /> Dashboard
          </button>
        </div>
      </div>

      {isDemo && (
        <div className="glass-panel" style={{ padding: '10px 16px', background: 'rgba(245, 158, 11, 0.05)', borderColor: 'rgba(245, 158, 11, 0.2)', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <Info size={16} color="var(--warning)" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <strong>Demo Mode:</strong> Pick any 102 topic below to practice reflexives and preterite questions! Add a <strong>Gemini API Key</strong> in settings to talk freely.
          </span>
        </div>
      )}

      {/* Chat Container */}
      <div className="glass-panel chat-container">
        {/* Banner with Elena's avatar and info */}
        <div className="chat-banner">
          <div className="chat-partner-info">
            <div className="chat-partner-avatar">👩‍🏫</div>
            <div>
              <span className="chat-partner-name">Elena</span>
              <div className="chat-partner-status">
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor', display: 'inline-block' }}></span>
                En línea (Online) • Compañera 102
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} color="var(--primary)" />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {activeTopic.title}
            </span>
          </div>
        </div>

        {/* Topic Selector Pills */}
        <div style={{ display: 'flex', gap: '6px', padding: '10px 16px', overflowX: 'auto', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.1)' }}>
          {CONVERSATION_TOPICS.map(topic => {
            const isActive = topic.id === activeTopicId;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => switchTopic(topic.id)}
                className={`btn ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                style={{
                  padding: '5px 12px',
                  fontSize: '0.75rem',
                  borderRadius: '16px',
                  whiteSpace: 'nowrap',
                  fontWeight: isActive ? 700 : 500,
                  opacity: isActive ? 1 : 0.8
                }}
                title={topic.desc}
              >
                {topic.label}
              </button>
            );
          })}
        </div>

        {/* Messages Body */}
        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`chat-msg ${msg.role}`}>
              <div className="chat-bubble">
                {renderHighlightedMessage(msg.text, msg.role)}
              </div>
              <div className="chat-msg-time" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {msg.role === 'bot' && (
                  <button 
                    onClick={() => speakMessage(msg.text)} 
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0 2px' }}
                    title="Escuchar pronunciación"
                  >
                    <Volume2 size={12} />
                  </button>
                )}
                {msg.time}
              </div>
            </div>
          ))}
          {loading && (
            <div className="chat-msg bot">
              <div className="chat-bubble" style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Elena escribe... (typing...)
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        {suggestions.length > 0 && !loading && (
          <div style={{ display: 'flex', gap: '8px', padding: '8px 16px', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', marginRight: '4px' }}>Sugerencias:</span>
            {suggestions.map((sug, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => submitUserMessage(sug)}
                className="btn btn-secondary"
                style={{ padding: '5px 12px', fontSize: '0.78rem', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {sug}
              </button>
            ))}
          </div>
        )}

        {/* Accent Characters Bar */}
        <div style={{ display: 'flex', gap: '6px', padding: '6px 16px 0', flexWrap: 'wrap', background: 'rgba(0,0,0,0.05)' }}>
          {['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'].map(char => (
            <button
              key={char}
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ padding: '3px 8px', fontSize: '0.8rem', minWidth: '26px', height: '26px' }}
              onClick={() => setInputText(prev => prev + char)}
              title={`Insertar ${char}`}
            >
              {char}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="chat-input-bar">
          <input
            type="text"
            placeholder="Escribe tu respuesta en español..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={loading}
            className="chat-text-input"
            autoFocus
          />
          <button type="submit" className="btn btn-primary" disabled={loading || !inputText.trim()}>
            <Send size={16} />
          </button>
        </form>
      </div>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content" style={{ animation: 'pop-in 0.3s ease-out' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Key size={20} color="var(--primary)" /> Gemini API Settings
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Paste your personal Gemini API key here to talk freely with Elena. The key is saved locally in your browser's LocalStorage and is never shared.
            </p>

            <div className="form-group">
              <label className="form-label">Gemini API Key</label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={tempKey}
                onChange={(e) => setTempKey(e.target.value)}
                className="form-input"
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button className="btn btn-secondary" onClick={() => setShowKeyModal(false)} style={{ flex: 1 }}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSaveKey} style={{ flex: 1 }}>
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
