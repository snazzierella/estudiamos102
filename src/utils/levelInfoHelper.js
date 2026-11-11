// Level metadata and pedagogical guidance for Spanish 102 Quest Stages and Levels

export function getLevelInfo(stageNum, levelNum, isEarlyBoss = false) {
  if (levelNum === 20 && isEarlyBoss) {
    return {
      title: `⚡ Desafío de Salto (Jefe de Unidad ${stageNum})`,
      focus: "Muerte Súbita (Sudden Death) • 30 Preguntas",
      desc: `¡Reto de Salto Anticipado! Enfréntate directamente al Jefe para saltarte las 19 lecciones de la Unidad ${stageNum}. Evaluación extendida de 30 preguntas de síntesis avanzada en Muerte Súbita: ¡un solo fallo termina el reto de inmediato!`
    };
  }

  if (stageNum === 1) {
    switch (levelNum) {
      case 1:
        return {
          title: "Saludos y Artículos",
          focus: "Greetings, Conversation & Articles",
          desc: "Review core greetings, polite phrases, definite/indefinite articles (el/la/los/las), and basic conversation nouns."
        };
      case 2:
        return {
          title: "Familia y Personas",
          focus: "Family Members & Professions",
          desc: "Practice family relations, professions, and subject pronoun identification."
        };
      case 3:
        return {
          title: "La Casa y Comida",
          focus: "The House, Kitchen & Food",
          desc: "Rooms, tableware, common foods, and daily breakfast/dinner items."
        };
      case 4:
        return {
          title: "Deportes y El Clima",
          focus: "Sports, Hobbies & Weather",
          desc: "Athletics, leisure activities, seasons, weather adjectives, and date expressions."
        };
      case 5:
        return {
          title: "Verbos Regulares en Presente",
          focus: "Regular -ar, -er, -ir Verbs",
          desc: "Present tense regular verb conjugations (hablar, comer, vivir) across all grammatical persons."
        };
      case 6:
        return {
          title: "Cambio de Raíz: O ➔ UE",
          focus: "Stem-Changing Verbs (o ➔ ue)",
          desc: "Conjugations and fill-in-the-blank drills for dormir, poder, volver, almorzar, and costar."
        };
      case 7:
        return {
          title: "Cambio de Raíz: E ➔ IE",
          focus: "Stem-Changing Verbs (e ➔ ie)",
          desc: "Conjugations and sentences for querer, preferir, empezar, entender, and pensar."
        };
      case 8:
        return {
          title: "Cambio de Raíz: E ➔ I",
          focus: "Stem-Changing Verbs (e ➔ i)",
          desc: "Conjugations and sentences for pedir, servir, repetir, and seguir."
        };
      case 9:
        return {
          title: "Verbos Irregulares en Yo",
          focus: "Irregular 'Yo' Form Verbs",
          desc: "Mastering unique first-person present forms: hago, salgo, pongo, traigo, and veo."
        };
      case 10:
        return {
          title: "Verbos Clave de Alta Frecuencia",
          focus: "Core Irregulars (ir, ser, estar, tener)",
          desc: "Contrast between ser vs estar, destination ir, and idiomatic expressions with tener."
        };
      case 11:
        return {
          title: "Saber vs Conocer",
          focus: "Verbs for Knowing",
          desc: "Knowing facts, skills, and how to do things (saber) vs acquaintance with people and places (conocer with personal 'a')."
        };
      case 12:
        return {
          title: "Verbos como Gustar",
          focus: "Verbs Structured Like Gustar",
          desc: "Structures with indirect pronouns: me gusta/gustan, te encanta, nos interesa, and les fascina."
        };
      case 13:
        return {
          title: "Preguntas y Conectores",
          focus: "Interrogatives & Conjunctions",
          desc: "Question words (qué, cuál, cómo, cuándo, por qué) and coordinating conjunctions (pero, porque, y, o)."
        };
      case 14:
        return {
          title: "Concordancia de Adjetivos",
          focus: "Adjective Agreement & Position",
          desc: "Gender and number agreement for descriptive, physical, personality, and possessive adjectives."
        };
      case 15:
        return {
          title: "Adverbios y Preposiciones",
          focus: "Location & Frequency",
          desc: "Spatial location words (debajo de, encima de, cerca de) and time/frequency adverbs (siempre, a menudo, nunca)."
        };
      case 16:
        return {
          title: "Construcción de Oraciones I",
          focus: "Sentence Synthesis: Core Clauses",
          desc: "Interactive word ordering puzzles with subject-verb-object arrangement and distractor handling."
        };
      case 17:
        return {
          title: "Construcción de Oraciones II",
          focus: "Sentence Synthesis: Modals & Infinitives",
          desc: "Puzzles combining modal auxiliaries (poder, querer, preferir) directly followed by infinitives."
        };
      case 18:
        return {
          title: "Desafío de Maestría 101",
          focus: "Comprehensive 101 Synthesis",
          desc: "High-tempo mixed challenges: stem-changers, irregular yo forms, and complex sentence builders."
        };
      case 19:
        return {
          title: "Ensayo Final de Nivel 101",
          focus: "Pre-Boss Rehearsal",
          desc: "The ultimate trial preparing you for the Stage 1 Review Gate with multi-distractor sentence puzzles."
        };
      case 20:
        return {
          title: "🛡️ Puerta de Revisión (Jefe de Unidad 1)",
          focus: "Boss Battle: 101 Review Gate",
          desc: "Comprehensive evaluation across all Spanish 101 topics. Requires a strict 80% passing grade (16/20) to unlock Unidad 2."
        };
      default:
        return { title: `Nivel ${levelNum}`, focus: "Repaso 101", desc: `Nivel de práctica ${levelNum}.` };
    }
  } else if (stageNum === 2) {
    if (levelNum <= 5) {
      return {
        title: `El Cuerpo y Salud (Pt. ${levelNum})`,
        focus: "Body Parts & Health Emergencies",
        desc: "Essential vocabulary for anatomy, health conditions, illness symptoms, and doctor visits."
      };
    } else if (levelNum <= 10) {
      return {
        title: `Rutina Diaria (Pt. ${levelNum - 5})`,
        focus: "Daily Routine & Reflexive Verbs",
        desc: "Reflexive pronouns (me, te, se, nos) and hygiene verbs (levantarse, ducharse, cepillarse, vestirse)."
      };
    } else if (levelNum <= 15) {
      return {
        title: `Emociones y Recíprocos (Pt. ${levelNum - 10})`,
        focus: "Emotions, Reciprocals & Por/Para",
        desc: "Reciprocal verbs (abrazarse, besarse), expressions of emotional states, and distinctions between Por and Para."
      };
    } else if (levelNum <= 19) {
      return {
        title: `Síntesis de Unidad 2 (Pt. ${levelNum - 15})`,
        focus: "Unidad 2 Advanced Synthesis",
        desc: "Comprehensive sentence construction puzzles and contextual fill-in-the-blank drills."
      };
    } else {
      return {
        title: "🛡️ Puerta de Revisión (Jefe de Unidad 2)",
        focus: "Boss Battle: Unidad 2 Review Gate",
        desc: "Comprehensive final evaluation across all Unidad 2 topics. Requires 80% (16/20) to unlock Unidad 3."
      };
    }
  } else if (stageNum === 3) {
    if (levelNum <= 5) {
      return {
        title: `Compras y Quehaceres (Pt. ${levelNum})`,
        focus: "Shopping & Chores",
        desc: "Vocabulary for clothing shops, supermarkets, and household chores."
      };
    } else if (levelNum <= 15) {
      return {
        title: `Pretérito Regular (Pt. ${levelNum - 5})`,
        focus: "Preterite Tense Basics",
        desc: "Past completed actions with regular -ar, -er, -ir preterite endings."
      };
    } else if (levelNum <= 19) {
      return {
        title: `Síntesis de Unidad 3 (Pt. ${levelNum - 15})`,
        focus: "Preterite Synthesis",
        desc: "Sentence builder puzzles and mixed past tense conjugation."
      };
    } else {
      return {
        title: "🛡️ Puerta de Revisión (Jefe de Unidad 3)",
        focus: "Boss Battle: Unidad 3 Review Gate",
        desc: "Final evaluation for Unidad 3. Requires 80% (16/20) to unlock Unidad 4."
      };
    }
  } else if (stageNum === 4) {
    if (levelNum <= 5) {
      return {
        title: `Viajes y Transporte (Pt. ${levelNum})`,
        focus: "Travel & Lodging",
        desc: "Transportation, vacations, airport vocabulary, and hotel amenities."
      };
    } else if (levelNum <= 15) {
      return {
        title: `Pretérito Irregular y Pronombres (Pt. ${levelNum - 5})`,
        focus: "Irregular Preterite & Double Pronouns",
        desc: "Irregular preterite stems and indirect/direct object pronoun sequences."
      };
    } else if (levelNum <= 19) {
      return {
        title: `Síntesis de Unidad 4 (Pt. ${levelNum - 15})`,
        focus: "Unidad 4 Advanced Synthesis",
        desc: "Complex travel scenarios and narrative past sentences."
      };
    } else {
      return {
        title: "🛡️ Puerta de Revisión (Jefe de Unidad 4)",
        focus: "Boss Battle: Unidad 4 Review Gate",
        desc: "Final evaluation for Unidad 4. Requires 80% (16/20) to complete current class content."
      };
    }
  }

  return {
    title: `Nivel ${levelNum}`,
    focus: `Etapa ${stageNum}`,
    desc: `Misión de aprendizaje para la Etapa ${stageNum}, Nivel ${levelNum}.`
  };
}
