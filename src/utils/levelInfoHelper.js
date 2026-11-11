// Level metadata and pedagogical guidance for Spanish 102 Quest Stages and Levels

export function getLevelInfo(stageNum, levelNum, isEarlyBoss = false, translate = false) {
  if (levelNum === 20 && isEarlyBoss) {
    return {
      title: translate 
        ? `⚡ Desafío de Salto (Jefe de Unidad ${stageNum}) • Skip Challenge`
        : `⚡ Desafío de Salto (Jefe de Unidad ${stageNum})`,
      focus: translate 
        ? "Sudden Death • 30 Questions" 
        : "Muerte Súbita (Sudden Death) • 30 Preguntas",
      desc: translate
        ? `Early Skip Challenge! Face the Unit Boss directly to bypass all 19 lessons of Unit ${stageNum}. Extended 30-question advanced synthesis assessment in Sudden Death: a single mistake terminates the challenge immediately!`
        : `¡Reto de Salto Anticipado! Enfréntate directamente al Jefe para saltarte las 19 lecciones de la Unidad ${stageNum}. Evaluación extendida de 30 preguntas de síntesis avanzada en Muerte Súbita: ¡un solo fallo termina el reto de inmediato!`
    };
  }

  if (stageNum === 1) {
    switch (levelNum) {
      case 1:
        return {
          title: translate ? "Saludos y Artículos (Greetings & Articles)" : "Saludos y Artículos",
          focus: "Greetings, Conversation & Articles",
          desc: "Review core greetings, polite phrases, definite/indefinite articles (el/la/los/las), and basic conversation nouns."
        };
      case 2:
        return {
          title: translate ? "Familia y Personas (Family & People)" : "Familia y Personas",
          focus: "Family Members & Professions",
          desc: "Practice family relations, professions, and subject pronoun identification."
        };
      case 3:
        return {
          title: translate ? "La Casa y Comida (The House & Food)" : "La Casa y Comida",
          focus: "The House, Kitchen & Food",
          desc: "Rooms, tableware, common foods, and daily breakfast/dinner items."
        };
      case 4:
        return {
          title: translate ? "Deportes y El Clima (Sports & Weather)" : "Deportes y El Clima",
          focus: "Sports, Hobbies & Weather",
          desc: "Athletics, leisure activities, seasons, weather adjectives, and date expressions."
        };
      case 5:
        return {
          title: translate ? "Verbos Regulares en Presente (Regular Present Verbs)" : "Verbos Regulares en Presente",
          focus: "Regular -ar, -er, -ir Verbs",
          desc: "Present tense regular verb conjugations (hablar, comer, vivir) across all grammatical persons."
        };
      case 6:
        return {
          title: translate ? "Cambio de Raíz: O ➔ UE (Stem Changers: O ➔ UE)" : "Cambio de Raíz: O ➔ UE",
          focus: "Stem-Changing Verbs (o ➔ ue)",
          desc: "Conjugations and fill-in-the-blank drills for dormir, poder, volver, almorzar, and costar."
        };
      case 7:
        return {
          title: translate ? "Cambio de Raíz: E ➔ IE (Stem Changers: E ➔ IE)" : "Cambio de Raíz: E ➔ IE",
          focus: "Stem-Changing Verbs (e ➔ ie)",
          desc: "Conjugations and sentences for querer, preferir, empezar, entender, and pensar."
        };
      case 8:
        return {
          title: translate ? "Cambio de Raíz: E ➔ I (Stem Changers: E ➔ I)" : "Cambio de Raíz: E ➔ I",
          focus: "Stem-Changing Verbs (e ➔ i)",
          desc: "Conjugations and sentences for pedir, servir, repetir, and seguir."
        };
      case 9:
        return {
          title: translate ? "Verbos Irregulares en Yo (Irregular 'Yo' Form Verbs)" : "Verbos Irregulares en Yo",
          focus: "Irregular 'Yo' Form Verbs",
          desc: "Mastering unique first-person present forms: hago, salgo, pongo, traigo, and veo."
        };
      case 10:
        return {
          title: translate ? "Verbos Clave de Alta Frecuencia (Core High-Frequency Verbs)" : "Verbos Clave de Alta Frecuencia",
          focus: "Core Irregulars (ir, ser, estar, tener)",
          desc: "Contrast between ser vs estar, destination ir, and idiomatic expressions with tener."
        };
      case 11:
        return {
          title: translate ? "Saber vs Conocer (Knowing Facts vs People)" : "Saber vs Conocer",
          focus: "Verbs for Knowing",
          desc: "Knowing facts, skills, and how to do things (saber) vs acquaintance with people and places (conocer with personal 'a')."
        };
      case 12:
        return {
          title: translate ? "Verbos como Gustar (Verbs Like Gustar)" : "Verbos como Gustar",
          focus: "Verbs Structured Like Gustar",
          desc: "Structures with indirect pronouns: me gusta/gustan, te encanta, nos interesa, and les fascina."
        };
      case 13:
        return {
          title: translate ? "Preguntas y Conectores (Questions & Conjunctions)" : "Preguntas y Conectores",
          focus: "Interrogatives & Conjunctions",
          desc: "Question words (qué, cuál, cómo, cuándo, por qué) and coordinating conjunctions (pero, porque, y, o)."
        };
      case 14:
        return {
          title: translate ? "Concordancia de Adjetivos (Adjective Agreement)" : "Concordancia de Adjetivos",
          focus: "Adjective Agreement & Position",
          desc: "Gender and number agreement for descriptive, physical, personality, and possessive adjectives."
        };
      case 15:
        return {
          title: translate ? "Adverbios y Preposiciones (Adverbs & Prepositions)" : "Adverbios y Preposiciones",
          focus: "Location & Frequency",
          desc: "Spatial location words (debajo de, encima de, cerca de) and time/frequency adverbs (siempre, a menudo, nunca)."
        };
      case 16:
        return {
          title: translate ? "Construcción de Oraciones I (Sentence Construction I)" : "Construcción de Oraciones I",
          focus: "Sentence Synthesis: Core Clauses",
          desc: "Interactive word ordering puzzles with subject-verb-object arrangement and distractor handling."
        };
      case 17:
        return {
          title: translate ? "Construcción de Oraciones II (Sentence Construction II)" : "Construcción de Oraciones II",
          focus: "Sentence Synthesis: Modals & Infinitives",
          desc: "Puzzles combining modal auxiliaries (poder, querer, preferir) directly followed by infinitives."
        };
      case 18:
        return {
          title: translate ? "Desafío de Maestría 101 (101 Mastery Challenge)" : "Desafío de Maestría 101",
          focus: "Comprehensive 101 Synthesis",
          desc: "High-tempo mixed challenges: stem-changers, irregular yo forms, and complex sentence builders."
        };
      case 19:
        return {
          title: translate ? "Ensayo Final de Nivel 101 (101 Final Rehearsal)" : "Ensayo Final de Nivel 101",
          focus: "Pre-Boss Rehearsal",
          desc: "The ultimate trial preparing you for the Stage 1 Review Gate with multi-distractor sentence puzzles."
        };
      case 20:
        return {
          title: translate ? "🛡️ Puerta de Revisión (Jefe de Unidad 1) • Review Gate" : "🛡️ Puerta de Revisión (Jefe de Unidad 1)",
          focus: "Boss Battle: 101 Review Gate",
          desc: "Comprehensive evaluation across all Spanish 101 topics. Requires a strict 80% passing grade (16/20) to unlock Unidad 2."
        };
      default:
        return { 
          title: translate ? `Nivel ${levelNum} (Level ${levelNum})` : `Nivel ${levelNum}`, 
          focus: translate ? "Repaso 101 (101 Review)" : "Repaso 101", 
          desc: translate ? `Practice level ${levelNum}.` : `Nivel de práctica ${levelNum}.` 
        };
    }
  } else if (stageNum === 2) {
    if (levelNum <= 5) {
      return {
        title: translate ? `El Cuerpo y Salud (The Body & Health) (Pt. ${levelNum})` : `El Cuerpo y Salud (Pt. ${levelNum})`,
        focus: "Body Parts & Health Emergencies",
        desc: "Essential vocabulary for anatomy, health conditions, illness symptoms, and doctor visits."
      };
    } else if (levelNum <= 10) {
      return {
        title: translate ? `Rutina Diaria (Daily Routine) (Pt. ${levelNum - 5})` : `Rutina Diaria (Pt. ${levelNum - 5})`,
        focus: "Daily Routine & Reflexive Verbs",
        desc: "Reflexive pronouns (me, te, se, nos) and hygiene verbs (levantarse, ducharse, cepillarse, vestirse)."
      };
    } else if (levelNum <= 15) {
      return {
        title: translate ? `Emociones y Recíprocos (Emotions & Reciprocals) (Pt. ${levelNum - 10})` : `Emociones y Recíprocos (Pt. ${levelNum - 10})`,
        focus: "Emotions, Reciprocals & Por/Para",
        desc: "Reciprocal verbs (abrazarse, besarse), expressions of emotional states, and distinctions between Por and Para."
      };
    } else if (levelNum <= 19) {
      return {
        title: translate ? `Síntesis de Unidad 2 (Unidad 2 Synthesis) (Pt. ${levelNum - 15})` : `Síntesis de Unidad 2 (Pt. ${levelNum - 15})`,
        focus: "Unidad 2 Advanced Synthesis",
        desc: "Comprehensive sentence construction puzzles and contextual fill-in-the-blank drills."
      };
    } else {
      return {
        title: translate ? "🛡️ Puerta de Revisión (Jefe de Unidad 2) • Review Gate" : "🛡️ Puerta de Revisión (Jefe de Unidad 2)",
        focus: "Boss Battle: Unidad 2 Review Gate",
        desc: "Comprehensive final evaluation across all Unidad 2 topics. Requires 80% (16/20) to unlock Unidad 3."
      };
    }
  } else if (stageNum === 3) {
    if (levelNum <= 5) {
      return {
        title: translate ? `Compras y Quehaceres (Shopping & Chores) (Pt. ${levelNum})` : `Compras y Quehaceres (Pt. ${levelNum})`,
        focus: "Shopping & Chores",
        desc: "Vocabulary for clothing shops, supermarkets, and household chores."
      };
    } else if (levelNum <= 15) {
      return {
        title: translate ? `Pretérito Regular (Regular Preterite) (Pt. ${levelNum - 5})` : `Pretérito Regular (Pt. ${levelNum - 5})`,
        focus: "Preterite Tense Basics",
        desc: "Past completed actions with regular -ar, -er, -ir preterite endings."
      };
    } else if (levelNum <= 19) {
      return {
        title: translate ? `Síntesis de Unidad 3 (Unidad 3 Synthesis) (Pt. ${levelNum - 15})` : `Síntesis de Unidad 3 (Pt. ${levelNum - 15})`,
        focus: "Preterite Synthesis",
        desc: "Sentence builder puzzles and mixed past tense conjugation."
      };
    } else {
      return {
        title: translate ? "🛡️ Puerta de Revisión (Jefe de Unidad 3) • Review Gate" : "🛡️ Puerta de Revisión (Jefe de Unidad 3)",
        focus: "Boss Battle: Unidad 3 Review Gate",
        desc: "Final evaluation for Unidad 3. Requires 80% (16/20) to unlock Unidad 4."
      };
    }
  } else if (stageNum === 4) {
    if (levelNum <= 5) {
      return {
        title: translate ? `Viajes y Transporte (Travel & Lodging) (Pt. ${levelNum})` : `Viajes y Transporte (Pt. ${levelNum})`,
        focus: "Travel & Lodging",
        desc: "Transportation, vacations, airport vocabulary, and hotel amenities."
      };
    } else if (levelNum <= 15) {
      return {
        title: translate ? `Pretérito Irregular y Pronombres (Irregular Preterite & Pronouns) (Pt. ${levelNum - 5})` : `Pretérito Irregular y Pronombres (Pt. ${levelNum - 5})`,
        focus: "Irregular Preterite & Double Pronouns",
        desc: "Irregular preterite stems and indirect/direct object pronoun sequences."
      };
    } else if (levelNum <= 19) {
      return {
        title: translate ? `Síntesis de Unidad 4 (Unidad 4 Synthesis) (Pt. ${levelNum - 15})` : `Síntesis de Unidad 4 (Pt. ${levelNum - 15})`,
        focus: "Unidad 4 Advanced Synthesis",
        desc: "Complex travel scenarios and narrative past sentences."
      };
    } else {
      return {
        title: translate ? "🛡️ Puerta de Revisión (Jefe de Unidad 4) • Review Gate" : "🛡️ Puerta de Revisión (Jefe de Unidad 4)",
        focus: "Boss Battle: Unidad 4 Review Gate",
        desc: "Final evaluation for Unidad 4. Requires 80% (16/20) to complete current class content."
      };
    }
  }

  return {
    title: translate ? `Nivel ${levelNum} (Level ${levelNum})` : `Nivel ${levelNum}`,
    focus: translate ? `Etapa ${stageNum} (Stage ${stageNum})` : `Etapa ${stageNum}`,
    desc: translate ? `Learning mission for Stage ${stageNum}, Level ${levelNum}.` : `Misión de aprendizaje para la Etapa ${stageNum}, Nivel ${levelNum}.`
  };
}
