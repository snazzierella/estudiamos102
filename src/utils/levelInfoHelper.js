// Level metadata and pedagogical guidance for Spanish 102 Quest Stages and Levels

export function getLevelInfo(stageNum, levelNum, isEarlyBoss = false, translate = false) {
  if (levelNum === 25 && isEarlyBoss) {
    return {
      title: translate 
        ? `⚡ Desafío de Salto (Jefe de Unidad ${stageNum}) • Skip Challenge`
        : `⚡ Desafío de Salto (Jefe de Unidad ${stageNum})`,
      focus: translate 
        ? "Sudden Death • 30 Questions" 
        : "Muerte Súbita (Sudden Death) • 30 Preguntas",
      desc: translate
        ? `Early Skip Challenge! Face the Unit Boss directly to bypass all 24 lessons of Unit ${stageNum}. Extended 30-question advanced synthesis assessment in Sudden Death: a single mistake terminates the challenge immediately!`
        : `¡Reto de Salto Anticipado! Enfréntate directamente al Jefe para saltarte las 24 lecciones de la Unidad ${stageNum}. Evaluación extendida de 30 preguntas de síntesis avanzada en Muerte Súbita: ¡un solo fallo termina el reto de inmediato!`
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
          title: translate ? "Verbos Reflexivos y Rutina (Reflexive Verbs & Routine Review)" : "Verbos Reflexivos y Rutina",
          focus: "101 Reflexive Foundations",
          desc: "Reflexive pronouns and daily routine actions (levantarse, acostarse, vestirse) in the present tense."
        };
      case 19:
        return {
          title: translate ? "Preguntas y Respuestas Complejas (Complex Questions & Answers)" : "Preguntas y Respuestas Complejas",
          focus: "Interrogative Syntax & Conversational Flow",
          desc: "Formulating interrogative clauses and matching logical conversational responses."
        };
      case 20:
        return {
          title: translate ? "Contraste Fundamental: Ser vs Estar & Saber vs Conocer (Foundational Contrasts)" : "Contraste Fundamental: Ser vs Estar & Saber vs Conocer",
          focus: "101 High-Frequency Contrasts",
          desc: "Targeted decisions distinguishing permanent characteristics/locations and knowledge of facts vs familiarity with people."
        };
      case 21:
        return {
          title: translate ? "Desafío de Concordancia y Plurales (Agreement & Plurals Challenge)" : "Desafío de Concordancia y Plurales",
          focus: "Syntactic Precision: Gender, Number & Modifiers",
          desc: "Multi-element agreement drills ensuring adjectives, articles, and verbs match their subjects."
        };
      case 22:
        return {
          title: translate ? "Traducción Contextual I: Vida Cotidiana (Contextual Translation I: Daily Life)" : "Traducción Contextual I: Vida Cotidiana",
          focus: "Applied Dialogue & Real-World Scenarios",
          desc: "Interactive sentence building for restaurant orders, campus life, and family discussions."
        };
      case 23:
        return {
          title: translate ? "Traducción Contextual II: Diálogos y Preguntas (Contextual Translation II: Dialogues)" : "Traducción Contextual II: Diálogos y Preguntas",
          focus: "Advanced Sentence Ordering & Distractor Traps",
          desc: "Complex English-to-Spanish sentence translations with targeted grammar distractors."
        };
      case 24:
        return {
          title: translate ? "Ensayo General de Nivel 101 (101 Grand Rehearsal)" : "Ensayo General de Nivel 101",
          focus: "Pre-Boss Cumulative Challenge",
          desc: "The final rehearsal covering all 101 topics before taking on the Unit 1 Review Gate."
        };
      case 25:
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
        focus: "Body Parts, Health Emergencies & Initial Vocab",
        desc: "Essential vocabulary for anatomy, health conditions, illness symptoms, and doctor visits (Levels 1–5 Vocab Intro)."
      };
    } else if (levelNum <= 10) {
      return {
        title: translate ? `Rutina Diaria y Verbos Reflexivos (Daily Routine & Reflexives) (Pt. ${levelNum - 5})` : `Rutina Diaria y Verbos Reflexivos (Pt. ${levelNum - 5})`,
        focus: "Daily Routine, Hygiene Verbs & Reflexive Pronouns",
        desc: "Reflexive pronouns (me, te, se, nos) and hygiene verbs (levantarse, ducharse, cepillarse, vestirse)."
      };
    } else if (levelNum <= 15) {
      return {
        title: translate ? `Emociones, Estados y Verbos Recíprocos (Emotions & Reciprocals) (Pt. ${levelNum - 10})` : `Emociones, Estados y Verbos Recíprocos (Pt. ${levelNum - 10})`,
        focus: "Emotions, Reciprocals & Por/Para Triggers",
        desc: "Reciprocal verbs (abrazarse, besarse), expressions of emotional states, and distinctions between Por and Para."
      };
    } else if (levelNum <= 19) {
      return {
        title: translate ? `Contrastes de Uso & Vocabulario Final (Usage Contrasts & Final Vocab) (Pt. ${levelNum - 15})` : `Contrastes de Uso & Vocabulario Final (Pt. ${levelNum - 15})`,
        focus: "Usage Contrasts (Por vs Para, Ponerse vs Sentirse) & Final Vocab Completion",
        desc: "Targeted contrast decisions, idioms with por/para, emotional transitions, and final unit vocabulary mastery (147/147 words completed by Level 19)."
      };
    } else if (levelNum <= 24) {
      return {
        title: translate ? `Síntesis de Unidad 2: Maestría Activa (Unidad 2 Active Synthesis) (Pt. ${levelNum - 19})` : `Síntesis de Unidad 2: Maestría Activa (Pt. ${levelNum - 19})`,
        focus: "100% Active Challenge • Zero Flashcards",
        desc: "Pure active mastery: advanced sentence builder puzzles, medical consultation dialogues, reflexive syntax, and contrastive decisions with zero flashcards."
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
        title: translate ? `Tareas, Mandados y la 'a' Personal (Chores & Personal 'a') (Pt. ${levelNum})` : `Tareas, Mandados y la 'a' Personal (Pt. ${levelNum})`,
        focus: "Chores, Errands & Personal 'a' with Direct Objects",
        desc: "Household tasks, errands, personal care objects, and the personal 'a' with specific person direct objects."
      };
    } else if (levelNum <= 10) {
      return {
        title: translate ? `De Compras y Pretérito Regular (Shopping & Regular Preterite) (Pt. ${levelNum - 5})` : `De Compras y Pretérito Regular (Pt. ${levelNum - 5})`,
        focus: "Shopping, Stores & Regular Preterite (-car/-gar/-zar yo changes)",
        desc: "Clothing, sizes, supermarket items, regular past tense endings, and -car/-gar/-zar yo spelling changes (busqué, pagué, almorcé)."
      };
    } else if (levelNum <= 14) {
      return {
        title: translate ? `Pretérito con Cambio de Raíz y Pronombres de Objeto Directo (Pt. ${levelNum - 10})` : `Pretérito con Cambio de Raíz y Pronombres DO (Pt. ${levelNum - 10})`,
        focus: "Preterite Stem Changers (-ir only) & DO Pronouns (lo/la/los/las)",
        desc: "Mastering e->i and o->u stem changes in 3rd person preterite (pidió/durmió) and direct object pronouns (all 83 unit words introduced by Level 14!)."
      };
    } else if (levelNum <= 19) {
      return {
        title: translate ? `Contrastes Pretéritos y Diálogos de Tienda (Preterite Contrasts & Dialogues) (Pt. ${levelNum - 14})` : `Contrastes Pretéritos y Diálogos de Tienda (Pt. ${levelNum - 14})`,
        focus: "Twin Verbs (fui/di/vi), Preterite Contrasts & Market Dialogues • Zero Flashcards",
        desc: "Distinguishing irregular preterite twin forms, direct object pronoun placement, and interactive market bargaining dialogues."
      };
    } else if (levelNum <= 24) {
      return {
        title: translate ? `Síntesis de Unidad 3: Traducción en Pasado (Unidad 3 Past Synthesis) (Pt. ${levelNum - 19})` : `Síntesis de Unidad 3: Traducción en Pasado (Pt. ${levelNum - 19})`,
        focus: "100% Active Challenge • Zero Flashcards",
        desc: "Pure active mastery: complex past narrative sentence builders, DO pronoun substitutions, and shopping conversations."
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
        title: translate ? `Viajes, Transporte y Aeropuertos (Travel & Airports) (Pt. ${levelNum})` : `Viajes, Transporte y Aeropuertos (Pt. ${levelNum})`,
        focus: "Travel, Airports, Trains & Flight Navigation",
        desc: "Airport navigation, trains, flights, luggage, and completed travel action narratives in the preterite."
      };
    } else if (levelNum <= 10) {
      return {
        title: translate ? `Hoteles y Pretéritos Irregulares Radicales (Hotels & Radical Preterites) (Pt. ${levelNum - 5})` : `Hoteles y Pretéritos Irregulares Radicales (Pt. ${levelNum - 5})`,
        focus: "Hotels, Lodging & Unaccented Radical Stems",
        desc: "Hotel check-in, amenities, and unaccented preterite stems (anduv-, estuv-, tuv-, pud-, pus-, sup-, dij-, traj-)."
      };
    } else if (levelNum <= 16) {
      return {
        title: translate ? `Verbos de Cambio, Darse Cuenta y Pronombres Dobles (Pt. ${levelNum - 10})` : `Verbos de Cambio, Darse Cuenta y Pronombres Dobles (Pt. ${levelNum - 10})`,
        focus: "Ponerse vs Volverse vs Hacerse, Darse cuenta vs Realizar & Se lo/la",
        desc: "Contrasts between ways to say 'to become', mental realization vs 'realizar', and double object pronouns (all 104 unit words introduced by Level 16!)."
      };
    } else if (levelNum <= 19) {
      return {
        title: translate ? `Guía de Contrastes de Viaje y Decisiones Gramaticales (Pt. ${levelNum - 16})` : `Guía de Contrastes de Viaje (Pt. ${levelNum - 16})`,
        focus: "Travel Contrast Guide (Por/Para, Darse cuenta, Se lo) • Zero Flashcards",
        desc: "Mastering the PowerPoint contrast rules in authentic travel and accommodation scenarios."
      };
    } else if (levelNum <= 24) {
      return {
        title: translate ? `Síntesis de Unidad 4: Gran Traducción de Viajes (Unidad 4 Synthesis) (Pt. ${levelNum - 19})` : `Síntesis de Unidad 4: Gran Traducción de Viajes (Pt. ${levelNum - 19})`,
        focus: "100% Active Challenge • Zero Flashcards",
        desc: "Pure active mastery: full travel narrative translations, double object pronoun constructions (se lo/la), and irregular preterite mastery."
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
