// --------------------------------------------------------------------------
// MIDTERM ORAL EXAM DATA (SPANISH 102)
// Grounded strictly in: "estudiamos 102 ppts/spa102 midterm.pdf"
// Theme: "¿Cómo fue la última vez que fuiste de compras?"
// Focus: Preterite tense (regular, irregular, stem-changing, spelling changes)
// --------------------------------------------------------------------------

export const MIDTERM_TITLE = {
  spanish: "¿Cómo fue la última vez que fuiste de compras?",
  english: "How was the last time you went shopping?",
  context: "Tema del Examen Oral de Medio Término: Una visita de compras / al mercado en tiempo pretérito.",
  contextEn: "Midterm Oral Exam Theme: A shopping trip / market visit in the preterite tense."
};

export const MIDTERM_QUESTIONS = [
  {
    id: 1,
    question: "¿Con quién fuiste?",
    english: "Who did you go with?",
    verbTested: "ir (fuiste -> fui)",
    grammarFocus: "Pretérito irregular del verbo 'ir'. Responde en primera persona singular: 'Fui con...'",
    grammarFocusEn: "Irregular preterite of 'ir'. Respond in first-person singular: 'Fui con...'",
    guidedPaths: [
      {
        id: "1a",
        label: "Con mi mejor amigo",
        targetSentence: "Fui con mi mejor amigo al centro comercial",
        englishMeaning: "I went with my best friend to the shopping mall",
        distractors: ["fueron", "para", "la"],
        hint: "Start with 'Fui con' followed by the companion and destination.",
        syntaxBreakdown: "[Verbo pretérito: Fui] + [Compañía: con mi mejor amigo] + [Destino: al centro comercial]"
      },
      {
        id: "1b",
        label: "Con mi mamá y mis hermanos",
        targetSentence: "Fui con mi mamá y mis hermanos ayer",
        englishMeaning: "I went with my mom and my siblings yesterday",
        distractors: ["fue", "en", "el"],
        hint: "Preterite 'fui' + family members + time expression 'ayer'.",
        syntaxBreakdown: "[Verbo pretérito: Fui] + [Compañía: con mi mamá y mis hermanos] + [Tiempo: ayer]"
      },
      {
        id: "1c",
        label: "Fui solo / sola",
        targetSentence: "Fui solo porque quería buscar ropa nueva",
        englishMeaning: "I went alone because I wanted to look for new clothes",
        distractors: ["fui a", "para", "muy"],
        hint: "Use 'solo' (or 'sola') followed by a reason with 'porque'.",
        syntaxBreakdown: "[Verbo: Fui] + [Modo: solo] + [Conector de causa: porque] + [Verbo imperfecto + infinitivo: quería buscar ropa nueva]"
      },
      {
        id: "1d",
        label: "Con mis compañeros de clase",
        targetSentence: "Fui con mis compañeros de clase el sábado pasado",
        englishMeaning: "I went with my classmates last Saturday",
        distractors: ["fuimos", "al", "de"],
        hint: "'Compañeros de clase' + time expression 'el sábado pasado'.",
        syntaxBreakdown: "[Verbo pretérito: Fui] + [Compañía: con mis compañeros de clase] + [Tiempo: el sábado pasado]"
      }
    ]
  },
  {
    id: 2,
    question: "¿A dónde fuiste?",
    english: "Where did you go?",
    verbTested: "ir (fuiste -> fui a / al)",
    grammarFocus: "Pretérito de 'ir' con preposición de destino 'a'. Recuerda la contracción obligatoria: a + el = al.",
    grammarFocusEn: "Preterite of 'ir' with destination preposition 'a'. Remember mandatory contraction: a + el = al.",
    guidedPaths: [
      {
        id: "2a",
        label: "Al mercado de artesanías",
        targetSentence: "Fui al mercado de artesanías en el centro histórico",
        englishMeaning: "I went to the craft market in the historic downtown",
        distractors: ["a la", "fue", "de"],
        hint: "Remember 'al' (a + el) for masculine nouns like 'mercado'.",
        syntaxBreakdown: "[Verbo pretérito: Fui] + [Destino (contracción al): al mercado de artesanías] + [Ubicación: en el centro histórico]"
      },
      {
        id: "2b",
        label: "Al centro comercial grande",
        targetSentence: "Fui a un gran centro comercial cerca de mi casa",
        englishMeaning: "I went to a large shopping mall near my house",
        distractors: ["fueron", "el", "lejos"],
        hint: "'Fui a un gran centro comercial...'",
        syntaxBreakdown: "[Verbo: Fui] + [Destino: a un gran centro comercial] + [Ubicación relativa: cerca de mi casa]"
      },
      {
        id: "2c",
        label: "A una tienda de ropa elegante",
        targetSentence: "Fui a una tienda de ropa elegante por la tarde",
        englishMeaning: "I went to an elegant clothing store in the afternoon",
        distractors: ["al", "fui con", "mañana"],
        hint: "Use 'a una tienda' (feminine noun takes 'a una').",
        syntaxBreakdown: "[Verbo: Fui] + [Destino (fem.): a una tienda de ropa elegante] + [Tiempo: por la tarde]"
      },
      {
        id: "2d",
        label: "Al tianguis tradicional",
        targetSentence: "Fui al tianguis tradicional para encontrar buenos precios",
        englishMeaning: "I went to the traditional open-air market to find good prices",
        distractors: ["por", "fui en", "caros"],
        hint: "'Tianguis' means traditional outdoor market. 'Para + infinitivo' expresses purpose.",
        syntaxBreakdown: "[Verbo: Fui] + [Destino: al tianguis tradicional] + [Propósito: para encontrar buenos precios]"
      }
    ]
  },
  {
    id: 3,
    question: "¿Qué compraste en tu visita?",
    english: "What did you buy during your visit?",
    verbTested: "comprar (compraste -> compré)",
    grammarFocus: "Pretérito regular de -ar: terminación '-é' con tilde (compré).",
    grammarFocusEn: "Regular preterite of -ar verbs: accented ending '-é' (compré).",
    guidedPaths: [
      {
        id: "3a",
        label: "Camisa bordada y recuerdos",
        targetSentence: "Compré una camisa bordada y dos recuerdos bonitos",
        englishMeaning: "I bought an embroidered shirt and two nice souvenirs",
        distractors: ["compro", "el", "las"],
        hint: "'Compré' + direct objects with correct gender and number agreement.",
        syntaxBreakdown: "[Verbo pretérito (-ar): Compré] + [Objeto directo fem: una camisa bordada] + [Conjunción: y] + [Objeto directo masc. pl.: dos recuerdos bonitos]"
      },
      {
        id: "3b",
        label: "Pantalones y zapatos cómodos",
        targetSentence: "Compré unos pantalones nuevos y zapatos cómodos",
        englishMeaning: "I bought some new pants and comfortable shoes",
        distractors: ["compraste", "la", "cómoda"],
        hint: "Check plural adjective agreement: 'nuevos' and 'cómodos'.",
        syntaxBreakdown: "[Verbo: Compré] + [Objeto: unos pantalones nuevos] + [Conjunción: y] + [Objeto: zapatos cómodos]"
      },
      {
        id: "3c",
        label: "Frutas frescas y pan dulce",
        targetSentence: "Compré frutas frescas y pan dulce en los puestos",
        englishMeaning: "I bought fresh fruits and sweet bread at the stalls",
        distractors: ["compraron", "fresco", "el"],
        hint: "Market food shopping: 'frutas frescas' and 'pan dulce'.",
        syntaxBreakdown: "[Verbo: Compré] + [Alimentos: frutas frescas y pan dulce] + [Lugar: en los puestos]"
      },
      {
        id: "3d",
        label: "Una pulsera de plata",
        targetSentence: "No compré mucho dinero solo una pulsera de plata",
        englishMeaning: "I didn't spend much money just a silver bracelet",
        distractors: ["compré nada", "de el", "oro"],
        hint: "'una pulsera de plata' (a silver bracelet).",
        syntaxBreakdown: "[Negación + Verbo: No compré mucho] + [Restricción: solo una pulsera de plata]"
      }
    ]
  },
  {
    id: 4,
    question: "¿Probaste comidas nuevas? ¿Qué comiste?",
    english: "Did you try new foods? What did you eat?",
    verbTested: "probar & comer (probaste -> probé; comiste -> comí)",
    grammarFocus: "Pregunta compuesta: requiere responder sobre la experiencia (probar) y el alimento específico (comer). Ambos verbos en primera persona pretérito.",
    grammarFocusEn: "Compound question: requires answering about the experience (probar) and the specific food (comer). Both verbs in first-person preterite.",
    guidedPaths: [
      {
        id: "4a",
        label: "Sí, probé tacos de pescado",
        targetSentence: "Sí probé comidas nuevas y comí deliciosos tacos de pescado",
        englishMeaning: "Yes I tried new foods and I ate delicious fish tacos",
        distractors: ["pruebo", "como", "la"],
        hint: "Two preterite verbs: 'probé' (-ar) and 'comí' (-er).",
        syntaxBreakdown: "[Afirmación: Sí] + [Verbo pretérito: probé comidas nuevas] + [Conector: y] + [Verbo pretérito: comí deliciosos tacos de pescado]"
      },
      {
        id: "4b",
        label: "Empanadas y agua de horchata",
        targetSentence: "Sí probé empanadas de carne y tomé agua de horchata fresca",
        englishMeaning: "Yes I tried beef empanadas and drank fresh horchata water",
        distractors: ["tomo", "fresco", "el"],
        hint: "'tomé' is preterite for 'I drank'.",
        syntaxBreakdown: "[Afirmación: Sí] + [Verbo: probé empanadas de carne] + [Verbo: tomé agua de horchata fresca]"
      },
      {
        id: "4c",
        label: "No probé nada nuevo, comí ensalada",
        targetSentence: "No probé nada nuevo pero comí una ensalada fresca",
        englishMeaning: "I didn't try anything new but I ate a fresh salad",
        distractors: ["como", "un", "nuevo"],
        hint: "Use double negative 'No probé nada...' followed by 'pero comí...'",
        syntaxBreakdown: "[Doble negación: No probé nada nuevo] + [Contraste: pero] + [Verbo: comí una ensalada fresca]"
      },
      {
        id: "4d",
        label: "Tamales y churros calientes",
        targetSentence: "Sí probé tamales tradicionales y comí churros calientes con chocolate",
        englishMeaning: "Yes I tried traditional tamales and ate hot churros with chocolate",
        distractors: ["probó", "comen", "de"],
        hint: "'probé tamales... y comí churros calientes'",
        syntaxBreakdown: "[Afirmación: Sí] + [Verbo: probé tamales tradicionales] + [Verbo: y comí churros calientes con chocolate]"
      }
    ]
  },
  {
    id: 5,
    question: "¿Te mediste ropa?",
    english: "Did you try on clothes?",
    verbTested: "medirse (te mediste -> me medí)",
    grammarFocus: "Verbo reflexivo en pretérito con cambio de raíz e->i en tercera persona (medirse). Para 'yo': pronombre 'me' + 'medí'.",
    grammarFocusEn: "Reflexive verb in preterite with e->i stem change in 3rd person (medirse). For 'yo': pronoun 'me' + 'medí'.",
    guidedPaths: [
      {
        id: "5a",
        label: "Sí, me medí una chaqueta",
        targetSentence: "Sí me medí una chaqueta de cuero en la tienda",
        englishMeaning: "Yes I tried on a leather jacket in the store",
        distractors: ["te medí", "mido", "el"],
        hint: "Reflexive pronoun 'me' precedes conjugated verb 'medí'.",
        syntaxBreakdown: "[Afirmación: Sí] + [Pronombre reflexivo: me] + [Pretérito: medí] + [Prenda: una chaqueta de cuero] + [Lugar: en la tienda]"
      },
      {
        id: "5b",
        label: "Sí, me medí varios vestidos",
        targetSentence: "Sí me medí varios vestidos antes de comprar uno",
        englishMeaning: "Yes I tried on several dresses before buying one",
        distractors: ["se medió", "para", "unos"],
        hint: "'antes de + infinitivo' (before buying).",
        syntaxBreakdown: "[Pronombre + Verbo: Sí me medí] + [Prenda pl.: varios vestidos] + [Temporal: antes de comprar uno]"
      },
      {
        id: "5c",
        label: "No me medí ropa",
        targetSentence: "No no me medí ropa porque había mucha gente allí",
        englishMeaning: "No I didn't try on clothes because there were many people there",
        distractors: ["me no medí", "hubo", "mucho"],
        hint: "Negation: 'No, no me medí...'",
        syntaxBreakdown: "[Negación reflexiva: No, no me medí ropa] + [Causa: porque había mucha gente allí]"
      },
      {
        id: "5d",
        label: "Me medí una camisa azul",
        targetSentence: "Me medí una camisa azul pero me quedó un poco pequeña",
        englishMeaning: "I tried on a blue shirt but it fit me a bit small",
        distractors: ["te quedó", "pequeño", "la"],
        hint: "Using 'quedar' for fit: 'me quedó pequeña' (it fit me small).",
        syntaxBreakdown: "[Pronombre + Verbo: Me medí una camisa azul] + [Contraste y ajuste: pero me quedó un poco pequeña]"
      }
    ]
  },
  {
    id: 6,
    question: "¿Escogiste artesanías para regalar?",
    english: "Did you pick out handicrafts as gifts?",
    verbTested: "escoger (escogiste -> escogí)",
    grammarFocus: "Pretérito regular de -er: 'escogí'. Preposición 'para' expresa propósito / destinatario ('para regalar', 'para mi madre').",
    grammarFocusEn: "Regular preterite of -er: 'escogí'. Preposition 'para' expresses purpose / recipient ('para regalar', 'para mi madre').",
    guidedPaths: [
      {
        id: "6a",
        label: "Vasija de cerámica para mi madre",
        targetSentence: "Sí escogí una vasija de cerámica bonita para mi madre",
        englishMeaning: "Yes I chose a pretty ceramic vase for my mother",
        distractors: ["escojo", "por", "el"],
        hint: "'para mi madre' (recipient takes 'para').",
        syntaxBreakdown: "[Verbo pretérito: Sí escogí] + [Objeto artesanal: una vasija de cerámica bonita] + [Destinatario (para): para mi madre]"
      },
      {
        id: "6b",
        label: "Pulseras hechas a mano para amigos",
        targetSentence: "Sí escogí unas pulseras hechas a mano para mis amigos",
        englishMeaning: "Yes I chose some handmade bracelets for my friends",
        distractors: ["escogió", "hecho", "por"],
        hint: "'hechas a mano' agrees with feminine plural 'pulseras'.",
        syntaxBreakdown: "[Verbo: Sí escogí] + [Objeto: unas pulseras hechas a mano] + [Destinatario: para mis amigos]"
      },
      {
        id: "6c",
        label: "No escogí artesanías, compré dulces",
        targetSentence: "No escogí artesanías preferí comprar dulces tradicionales y ropa",
        englishMeaning: "I didn't choose handicrafts I preferred to buy traditional candies and clothes",
        distractors: ["no escojo", "prefiero", "de"],
        hint: "'preferí' is preterite of preferir (e->i stem-change in 3rd person, but regular 'preferí' for yo).",
        syntaxBreakdown: "[Negación: No escogí artesanías] + [Verbo pretérito: preferí comprar dulces tradicionales y ropa]"
      },
      {
        id: "6d",
        label: "Mantel bordado para mi tía",
        targetSentence: "Escogí un mantel bordado de muchos colores para mi tía",
        englishMeaning: "I chose an embroidered tablecloth of many colors for my aunt",
        distractors: ["escogieron", "para el", "mucho"],
        hint: "'un mantel bordado' (masculine singular).",
        syntaxBreakdown: "[Verbo: Escogí] + [Objeto: un mantel bordado de muchos colores] + [Destinatario: para mi tía]"
      }
    ]
  },
  {
    id: 7,
    question: "¿Pagaste en efectivo o con tarjeta de crédito? ¿Recibiste descuentos?",
    english: "Did you pay in cash or with a credit card? Did you receive discounts?",
    verbTested: "pagar (pagaste -> pagué [g->gu]) & recibir (recibiste -> recibí)",
    grammarFocus: "Cambio ortográfico en pretérito de verbos -gar: g -> gu ante 'e' (yo pagué). Pregunta doble sobre método de pago y descuentos.",
    grammarFocusEn: "Spelling change in preterite of -gar verbs: g -> gu before 'e' (yo pagué). Dual question on payment method and discounts.",
    guidedPaths: [
      {
        id: "7a",
        label: "En efectivo con descuento del 10%",
        targetSentence: "Pagué en efectivo y recibí un descuento del diez por ciento",
        englishMeaning: "I paid in cash and I received a ten percent discount",
        distractors: ["page", "recibo", "con"],
        hint: "Spelling change: 'pagué' with 'gu'. 'recibí' ends with accented -í.",
        syntaxBreakdown: "[Verbo ortográfico pretérito: Pagué en efectivo] + [Conector: y] + [Verbo pretérito: recibí un descuento del diez por ciento]"
      },
      {
        id: "7b",
        label: "Con tarjeta pero sin descuento",
        targetSentence: "Pagué con tarjeta de crédito pero no recibí ningún descuento",
        englishMeaning: "I paid with a credit card but didn't receive any discount",
        distractors: ["pago", "recibió", "algún"],
        hint: "Negative indefinite: 'no recibí ningún descuento'.",
        syntaxBreakdown: "[Verbo: Pagué con tarjeta de crédito] + [Contraste y negación: pero no recibí ningún descuento]"
      },
      {
        id: "7c",
        label: "En efectivo porque no aceptaban tarjetas",
        targetSentence: "Pagué en efectivo porque el puesto no aceptaba tarjetas de crédito",
        englishMeaning: "I paid in cash because the stall did not accept credit cards",
        distractors: ["paguei", "por", "los"],
        hint: "'Pagué en efectivo porque...'",
        syntaxBreakdown: "[Verbo pretérito: Pagué en efectivo] + [Explicación: porque el puesto no aceptaba tarjetas de crédito]"
      },
      {
        id: "7d",
        label: "Con tarjeta y me dieron una rebaja",
        targetSentence: "Pagué con tarjeta y el vendedor me dio una buena rebaja",
        englishMeaning: "I paid with card and the seller gave me a good discount",
        distractors: ["dio me", "da", "bueno"],
        hint: "'rebaja' is a great synonym for 'descuento'. 'me dio' (irregular pretérito de dar).",
        syntaxBreakdown: "[Verbo: Pagué con tarjeta] + [Pronombre indirecto + verbo dar: y el vendedor me dio una buena rebaja]"
      }
    ]
  },
  {
    id: 8,
    question: "¿Qué otras cosas encontraste?",
    english: "What other things did you find?",
    verbTested: "encontrar (encontraste -> encontré) / ver (vi)",
    grammarFocus: "Pretérito regular de 'encontrar' (-ar): 'encontré'. Describe artículos adicionales o sorpresas en el mercado.",
    grammarFocusEn: "Regular preterite of 'encontrar' (-ar): 'encontré'. Describe additional items or surprises at the market.",
    guidedPaths: [
      {
        id: "8a",
        label: "Libros antiguos y música",
        targetSentence: "Encontré libros antiguos y discos de música tradicional mexicana",
        englishMeaning: "I found antique books and records of traditional Mexican music",
        distractors: ["encuentro", "antiguo", "la"],
        hint: "Adjective agreement: 'libros antiguos' (masculine plural).",
        syntaxBreakdown: "[Verbo pretérito: Encontré] + [Objeto 1: libros antiguos] + [Conector: y] + [Objeto 2: discos de música tradicional mexicana]"
      },
      {
        id: "8b",
        label: "Dulces típicos y sombreros",
        targetSentence: "También encontré dulces típicos deliciosos y sombreros elegantes",
        englishMeaning: "I also found delicious traditional candies and elegant hats",
        distractors: ["tampoco", "delicioso", "encontraron"],
        hint: "Start with adverb 'También' + 'encontré...'",
        syntaxBreakdown: "[Adverbio: También] + [Verbo: encontré] + [Objetos con adjetivos: dulces típicos deliciosos y sombreros elegantes]"
      },
      {
        id: "8c",
        label: "Pinturas al óleo y postales",
        targetSentence: "Vi pinturas al óleo muy bonitas y postales coloridas",
        englishMeaning: "I saw very pretty oil paintings and colorful postcards",
        distractors: ["veo", "colorido", "las"],
        hint: "Using 'vi' (irregular preterite of ver, no accent): 'Vi pinturas al óleo...'",
        syntaxBreakdown: "[Verbo irregular (ver): Vi] + [Objeto 1: pinturas al óleo muy bonitas] + [Objeto 2: y postales coloridas]"
      },
      {
        id: "8d",
        label: "Collares de plata y especias",
        targetSentence: "Encontré collares de plata fina y especias aromáticas para cocinar",
        englishMeaning: "I found fine silver necklaces and aromatic spices for cooking",
        distractors: ["encuentre", "por", "aromático"],
        hint: "'especias aromáticas' (feminine plural).",
        syntaxBreakdown: "[Verbo: Encontré] + [Joyería: collares de plata fina] + [Condimentos: y especias aromáticas para cocinar]"
      }
    ]
  },
  {
    id: 9,
    question: "¿Cómo te sentiste en el mercado?",
    english: "How did you feel at the market?",
    verbTested: "sentirse (te sentiste -> me sentí)",
    grammarFocus: "Verbo reflexivo de cambio de raíz e->i en pretérito (solo 3ra persona: se sintió; para yo: me sentí con tilde). Usa adjetivos de emoción acordes con el género del hablante.",
    grammarFocusEn: "Reflexive verb with e->i stem change in preterite (3rd person: se sintió; for yo: me sentí with accent). Use emotion adjectives matching speaker gender.",
    guidedPaths: [
      {
        id: "9a",
        label: "Muy contento y emocionado",
        targetSentence: "Me sentí muy contento y emocionado por la experiencia cultural",
        englishMeaning: "I felt very happy and excited about the cultural experience",
        distractors: ["siento", "te sentiste", "para"],
        hint: "Reflexive 'Me sentí' + emotions + 'por la experiencia' (cause takes 'por').",
        syntaxBreakdown: "[Pronombre + Verbo pretérito: Me sentí] + [Emociones: muy contento y emocionado] + [Causa (por): por la experiencia cultural]"
      },
      {
        id: "9b",
        label: "Un poco abrumado por la multitud",
        targetSentence: "Me sentí un poco abrumado porque había demasiada gente ruidosa",
        englishMeaning: "I felt a bit overwhelmed because there were too many noisy people",
        distractors: ["me sentió", "demasiado", "el"],
        hint: "'Me sentí un poco abrumado' (or 'abrumada').",
        syntaxBreakdown: "[Pronombre + Verbo: Me sentí] + [Estado: un poco abrumado] + [Explicación: porque había demasiada gente ruidosa]"
      },
      {
        id: "9c",
        label: "Relajado y alegre",
        targetSentence: "Me sentí relajado caminando tranquilamente por los pasillos del mercado",
        englishMeaning: "I felt relaxed walking calmly through the market aisles",
        distractors: ["siento me", "tranquilo", "en el"],
        hint: "'Me sentí relajado caminando...' Gerund '-ando' expresses ongoing action.",
        syntaxBreakdown: "[Verbo: Me sentí relajado] + [Gerundio: caminando tranquilamente] + [Lugar: por los pasillos del mercado]"
      },
      {
        id: "9d",
        label: "Cansado pero muy satisfecho",
        targetSentence: "Al final me sentí cansado pero muy satisfecho con mis compras",
        englishMeaning: "At the end I felt tired but very satisfied with my purchases",
        distractors: ["sentí me", "satisfactorio", "de"],
        hint: "'Al final me sentí cansado pero muy satisfecho...'",
        syntaxBreakdown: "[Locución de tiempo: Al final] + [Verbo: me sentí cansado] + [Contraste positivo: pero muy satisfecho con mis compras]"
      }
    ]
  },
  {
    id: 10,
    question: "¿Qué pensaste de tu visita al mercado? ¿Por qué?",
    english: "What did you think of your visit to the market? Why?",
    verbTested: "pensar (pensaste -> pensé)",
    grammarFocus: "Pregunta reflexiva/evaluativa: 'Pensé que fue...' seguida de adjetivo valorativo (maravillosa, excelente, divertida) y la justificación causal con 'porque...'.",
    grammarFocusEn: "Evaluative question: 'Pensé que fue...' followed by an assessment adjective (maravillosa, excelente, divertida) and causal justification with 'porque...'.",
    guidedPaths: [
      {
        id: "10a",
        label: "Maravillosa por la cultura",
        targetSentence: "Pensé que fue maravillosa porque aprendí mucho sobre la cultura local",
        englishMeaning: "I thought it was wonderful because I learned a lot about local culture",
        distractors: ["pienso", "fue un", "por"],
        hint: "'Pensé que fue...' + adjective + 'porque aprendí...' (preterite of aprender).",
        syntaxBreakdown: "[Verbo pretérito: Pensé que fue maravillosa] + [Conector causal: porque] + [Verbo pretérito: aprendí mucho sobre la cultura local]"
      },
      {
        id: "10b",
        label: "Divertida y económica",
        targetSentence: "Pensé que fue muy divertida porque los precios fueron bastante baratos",
        englishMeaning: "I thought it was very fun because the prices were quite cheap",
        distractors: ["fueron mucho", "barata", "pensaron"],
        hint: "Adjective agreement: 'divertida' describes 'la visita', 'baratos' describes 'los precios'.",
        syntaxBreakdown: "[Verbo: Pensé que fue muy divertida] + [Causa: porque los precios fueron bastante baratos]"
      },
      {
        id: "10c",
        label: "Fascinante por la comida",
        targetSentence: "Pensé que fue fascinante porque la comida tradicional estuvo riquísima",
        englishMeaning: "I thought it was fascinating because the traditional food was super delicious",
        distractors: ["estuvo rico", "es", "para"],
        hint: "Use 'estuvo' for food condition + absolute superlative '-ísima'.",
        syntaxBreakdown: "[Verbo: Pensé que fue fascinante] + [Causa con estar pretérito: porque la comida tradicional estuvo riquísima]"
      },
      {
        id: "10d",
        label: "Inolvidable por la gente",
        targetSentence: "Pensé que fue una experiencia inolvidable por la amabilidad de la gente",
        englishMeaning: "I thought it was an unforgettable experience because of the kindness of the people",
        distractors: ["inolvidables", "para", "el"],
        hint: "'por la amabilidad' (cause/reason takes 'por').",
        syntaxBreakdown: "[Verbo: Pensé que fue una experiencia inolvidable] + [Causa (por): por la amabilidad de la gente]"
      }
    ]
  }
];

// --------------------------------------------------------------------------
// MODO LIBRE: CATEGORIZED WORD BANK (VOCABULARY DRAWERS)
// Each token includes a bilingual English gloss for live translation.
// --------------------------------------------------------------------------

export const OPEN_WORD_BANK = {
  verbos: [
    { text: "Fui", gloss: "I went", pos: "verb" },
    { text: "Compré", gloss: "I bought", pos: "verb" },
    { text: "Probé", gloss: "I tried", pos: "verb" },
    { text: "Comí", gloss: "I ate", pos: "verb" },
    { text: "Tomé", gloss: "I drank", pos: "verb" },
    { text: "Me medí", gloss: "I tried on", pos: "verb" },
    { text: "No me medí", gloss: "I didn't try on", pos: "verb" },
    { text: "Escogí", gloss: "I chose", pos: "verb" },
    { text: "No escogí", gloss: "I didn't choose", pos: "verb" },
    { text: "Pagué", gloss: "I paid", pos: "verb" },
    { text: "Recibí", gloss: "I received", pos: "verb" },
    { text: "No recibí", gloss: "I didn't receive", pos: "verb" },
    { text: "Encontré", gloss: "I found", pos: "verb" },
    { text: "Vi", gloss: "I saw", pos: "verb" },
    { text: "Me sentí", gloss: "I felt", pos: "verb" },
    { text: "Pensé que fue", gloss: "I thought it was", pos: "verb" },
    { text: "Aprendí", gloss: "I learned", pos: "verb" },
    { text: "Preferí", gloss: "I preferred", pos: "verb" },
    { text: "Gasté", gloss: "I spent", pos: "verb" },
    { text: "Buscaba", gloss: "I was looking for", pos: "verb" }
  ],
  personas: [
    { text: "con mi mejor amigo", gloss: "with my best friend", pos: "noun_phrase" },
    { text: "con mi mamá", gloss: "with my mom", pos: "noun_phrase" },
    { text: "con mis hermanos", gloss: "with my siblings", pos: "noun_phrase" },
    { text: "con mi familia", gloss: "with my family", pos: "noun_phrase" },
    { text: "con mis compañeros de clase", gloss: "with my classmates", pos: "noun_phrase" },
    { text: "con mi prima", gloss: "with my cousin", pos: "noun_phrase" },
    { text: "solo", gloss: "alone (masc.)", pos: "adj" },
    { text: "sola", gloss: "alone (fem.)", pos: "adj" }
  ],
  lugares: [
    { text: "al mercado central", gloss: "to the central market", pos: "prep_phrase" },
    { text: "al centro comercial", gloss: "to the shopping mall", pos: "prep_phrase" },
    { text: "a una tienda de ropa", gloss: "to a clothing store", pos: "prep_phrase" },
    { text: "al tianguis", gloss: "to the outdoor market", pos: "prep_phrase" },
    { text: "en el centro histórico", gloss: "in the historic downtown", pos: "prep_phrase" },
    { text: "cerca de mi casa", gloss: "near my house", pos: "prep_phrase" },
    { text: "en los puestos", gloss: "at the vendor stalls", pos: "prep_phrase" },
    { text: "en los probadores", gloss: "in the fitting rooms", pos: "prep_phrase" }
  ],
  objetos: [
    { text: "una camisa bordada", gloss: "an embroidered shirt", pos: "noun_phrase" },
    { text: "ropa nueva", gloss: "new clothes", pos: "noun_phrase" },
    { text: "unos pantalones", gloss: "some pants", pos: "noun_phrase" },
    { text: "zapatos cómodos", gloss: "comfortable shoes", pos: "noun_phrase" },
    { text: "una chaqueta de cuero", gloss: "a leather jacket", pos: "noun_phrase" },
    { text: "artesanías para regalar", gloss: "handicrafts as gifts", pos: "noun_phrase" },
    { text: "una vasija de cerámica", gloss: "a ceramic vase", pos: "noun_phrase" },
    { text: "pulseras de plata", gloss: "silver bracelets", pos: "noun_phrase" },
    { text: "un mantel colorido", gloss: "a colorful tablecloth", pos: "noun_phrase" },
    { text: "recuerdos bonitos", gloss: "nice souvenirs", pos: "noun_phrase" },
    { text: "tacos de pescado", gloss: "fish tacos", pos: "noun_phrase" },
    { text: "tamales tradicionales", gloss: "traditional tamales", pos: "noun_phrase" },
    { text: "empanadas calientes", gloss: "hot empanadas", pos: "noun_phrase" },
    { text: "dulces típicos", gloss: "traditional sweets", pos: "noun_phrase" },
    { text: "agua de horchata", gloss: "horchata water", pos: "noun_phrase" },
    { text: "en efectivo", gloss: "in cash", pos: "prep_phrase" },
    { text: "con tarjeta de crédito", gloss: "with credit card", pos: "prep_phrase" },
    { text: "un descuento del diez por ciento", gloss: "a 10% discount", pos: "noun_phrase" },
    { text: "una buena rebaja", gloss: "a good markdown", pos: "noun_phrase" },
    { text: "libros antiguos", gloss: "antique books", pos: "noun_phrase" }
  ],
  conectores: [
    { text: "porque", gloss: "because", pos: "conj" },
    { text: "y", gloss: "and", pos: "conj" },
    { text: "pero", gloss: "but", pos: "conj" },
    { text: "también", gloss: "also", pos: "adv" },
    { text: "después", gloss: "afterwards", pos: "adv" },
    { text: "ayer", gloss: "yesterday", pos: "adv" },
    { text: "el sábado pasado", gloss: "last Saturday", pos: "adv" },
    { text: "por la tarde", gloss: "in the afternoon", pos: "adv" },
    { text: "para mi madre", gloss: "for my mother", pos: "prep_phrase" },
    { text: "para mis amigos", gloss: "for my friends", pos: "prep_phrase" },
    { text: "Sí", gloss: "Yes", pos: "interj" },
    { text: "No", gloss: "No", pos: "interj" }
  ],
  adjetivos: [
    { text: "muy contento", gloss: "very happy", pos: "adj" },
    { text: "emocionado", gloss: "excited", pos: "adj" },
    { text: "un poco cansado", gloss: "a bit tired", pos: "adj" },
    { text: "relajado", gloss: "relaxed", pos: "adj" },
    { text: "abrumado", gloss: "overwhelmed", pos: "adj" },
    { text: "maravillosa", gloss: "wonderful", pos: "adj" },
    { text: "divertida", gloss: "fun", pos: "adj" },
    { text: "fascinante", gloss: "fascinating", pos: "adj" },
    { text: "inolvidable", gloss: "unforgettable", pos: "adj" },
    { text: "deliciosa", gloss: "delicious", pos: "adj" },
    { text: "económica", gloss: "budget-friendly", pos: "adj" },
    { text: "riquísima", gloss: "super tasty", pos: "adj" }
  ]
};

// --------------------------------------------------------------------------
// DYNAMIC TRANSLATOR FOR MODO LIBRE ASSEMBLED TOKENS
// Converts an array of chosen tokens into a natural English translation.
// --------------------------------------------------------------------------
export function translateCustomSentence(tokens) {
  if (!tokens || tokens.length === 0) return "";
  
  const glosses = tokens.map(t => {
    if (typeof t === 'string') {
      const found = Object.values(OPEN_WORD_BANK).flat().find(item => item.text.toLowerCase() === t.toLowerCase());
      return found ? found.gloss : t;
    }
    return t.gloss || t.text;
  });

  let raw = glosses.join(" ");

  // Clean common grammatical glue in English
  raw = raw
    .replace(/\bYes I\b/gi, "Yes, I")
    .replace(/\bNo I\b/gi, "No, I")
    .replace(/\bI went with\b/gi, "I went with")
    .replace(/\s+/g, " ")
    .trim();

  // Capitalize first letter
  if (raw.length > 0) {
    raw = raw.charAt(0).toUpperCase() + raw.slice(1);
  }

  return raw;
}

// --------------------------------------------------------------------------
// CHALLENGE MODE & FREE VALIDATION LOGIC
// Evaluates typed or speech-to-text student responses in Spanish.
// Validates:
// 1. Appropriate preterite verb usage for the specific prompt
// 2. Presence of logically necessary semantic elements
// 3. Minimum sentence length and basic grammar agreement
// --------------------------------------------------------------------------
export function validateOralExamAnswer(questionId, userInput, translate = false) {
  if (!userInput || typeof userInput !== 'string') {
    return {
      isValid: false,
      feedback: translate 
        ? "Please type or speak a response in Spanish."
        : "Por favor escribe o dicta una respuesta en español.",
      userTranslation: ""
    };
  }

  const clean = userInput.trim().toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()¿?¡!]/g, "")
    .replace(/\s+/g, " ");

  const words = clean.split(" ");
  if (words.length < 3) {
    return {
      isValid: false,
      feedback: translate
        ? "Your answer is too short. The oral exam requires a complete sentence in preterite (at least 3 or 4 words)."
        : "Tu respuesta es muy corta. En el examen oral se requiere una oración completa en pretérito (al menos 3 o 4 palabras).",
      userTranslation: ""
    };
  }

  // Preterite Verb & Semantic Check by Question
  switch (questionId) {
    case 1: { // ¿Con quién fuiste?
      const hasIrPreterite = words.includes("fui") || clean.includes("fui con") || clean.includes("fuimos");
      const hasCompanion = clean.includes("con") || clean.includes("solo") || clean.includes("sola");
      if (!hasIrPreterite) {
        return {
          isValid: false,
          feedback: translate
            ? "Remember to use the preterite of 'ir': 'Fui con...' or 'Fui solo/sola'."
            : "Recuerda usar el pretérito de 'ir': 'Fui con...' o 'Fui solo/sola'.",
          userTranslation: ""
        };
      }
      if (!hasCompanion) {
        return {
          isValid: false,
          feedback: translate
            ? "Mention who you went with using 'con [amigo/mamá/familia]' or indicate that you went 'solo/sola'."
            : "Menciona con quién fuiste usando 'con [amigo/mamá/familia]' o indica que fuiste 'solo/sola'.",
          userTranslation: ""
        };
      }
      return {
        isValid: true,
        feedback: translate
          ? "Excellent! You used the preterite 'fui' and clearly explained who you went with."
          : "¡Excelente! Usaste el pretérito 'fui' y explicaste con quién fuiste claramente.",
        userTranslation: generateGlossaryTranslation(clean)
      };
    }

    case 2: { // ¿A dónde fuiste?
      const hasDest = clean.includes("fui al") || clean.includes("fui a") || clean.includes("fuimos a") || clean.includes("fuimos al");
      const hasPlace = clean.includes("mercado") || clean.includes("centro") || clean.includes("tienda") || clean.includes("tianguis") || clean.includes("supermercado") || clean.includes("plaza");
      if (!hasDest) {
        return {
          isValid: false,
          feedback: translate
            ? "Use the preterite of 'ir' with destination preposition: 'Fui a la...' or 'Fui al...'."
            : "Usa el pretérito de 'ir' con preposición de lugar: 'Fui a la...' o 'Fui al...'.",
          userTranslation: ""
        };
      }
      if (!hasPlace) {
        return {
          isValid: false,
          feedback: translate
            ? "Specify what place or shop you went to (e.g.: mercado, centro comercial, tienda de ropa)."
            : "Especifica a qué lugar o tienda fuiste (ej: mercado, centro comercial, tienda de ropa).",
          userTranslation: ""
        };
      }
      return {
        isValid: true,
        feedback: translate
          ? "Very good! You specified your destination with the correct preposition."
          : "¡Muy bien! Especificaste tu destino con la preposición correcta.",
        userTranslation: generateGlossaryTranslation(clean)
      };
    }

    case 3: { // ¿Qué compraste en tu visita?
      const hasComprar = clean.includes("compré") || clean.includes("compre") || clean.includes("compramos") || clean.includes("no compré");
      const hasItem = clean.includes("camisa") || clean.includes("ropa") || clean.includes("zapatos") || clean.includes("recuerdos") || clean.includes("artesan") || clean.includes("fruta") || clean.includes("pantal");
      if (!hasComprar) {
        return {
          isValid: false,
          feedback: translate
            ? "Use the verb 'comprar' in preterite: 'Compré...' (with accent on the e)."
            : "Usa el verbo 'comprar' en pretérito: 'Compré...' (con tilde en la e).",
          userTranslation: ""
        };
      }
      if (!hasItem && !clean.includes("nada") && !clean.includes("mucho")) {
        return {
          isValid: false,
          feedback: translate
            ? "Mention what item you bought (ropa, zapatos, una camisa, recuerdos) or if you bought nothing ('no compré nada')."
            : "Menciona qué artículo compraste (ropa, zapatos, una camisa, recuerdos) o si no compraste nada.",
          userTranslation: ""
        };
      }
      return {
        isValid: true,
        feedback: translate
          ? "Perfect! You used 'compré' and detailed your purchases with appropriate vocabulary."
          : "¡Perfecto! Usaste 'compré' y detallaste tus compras con vocabulario apropiado.",
        userTranslation: generateGlossaryTranslation(clean)
      };
    }

    case 4: { // ¿Probaste comidas nuevas? ¿Qué comiste?
      const hasProbar = clean.includes("probé") || clean.includes("probe") || clean.includes("no probé");
      const hasComer = clean.includes("comí") || clean.includes("comi") || clean.includes("tomé") || clean.includes("tome") || clean.includes("comimos");
      if (!hasProbar && !hasComer) {
        return {
          isValid: false,
          feedback: translate
            ? "This is a dual question: respond with 'probé...' (or 'no probé...') and specify 'comí [food]'."
            : "Esta es una pregunta doble: responde con 'probé...' (o 'no probé...') y especifica 'comí [alimento]'.",
          userTranslation: ""
        };
      }
      return {
        isValid: true,
        feedback: translate
          ? "Fantastic! You responded about both the experience and the food in preterite."
          : "¡Fantástico! Respondiste sobre la experiencia y la comida en pretérito.",
        userTranslation: generateGlossaryTranslation(clean)
      };
    }

    case 5: { // ¿Te mediste ropa?
      const hasMedir = clean.includes("me medí") || clean.includes("me medi") || clean.includes("no me medí") || clean.includes("no me medi");
      if (!hasMedir) {
        return {
          isValid: false,
          feedback: translate
            ? "Remember that 'medirse' is reflexive: use 'me medí...' or 'no me medí ropa'."
            : "Recuerda que 'medirse' es reflexivo: usa 'me medí...' o 'no me medí ropa'.",
          userTranslation: ""
        };
      }
      return {
        isValid: true,
        feedback: translate
          ? "Excellent mastery of the reflexive preterite 'me medí'!"
          : "¡Excelente dominio del reflexivo pretérito 'me medí'!",
        userTranslation: generateGlossaryTranslation(clean)
      };
    }

    case 6: { // ¿Escogiste artesanías para regalar?
      const hasEscoger = clean.includes("escogí") || clean.includes("escogi") || clean.includes("no escogí") || clean.includes("elegí") || clean.includes("compré");
      if (!hasEscoger) {
        return {
          isValid: false,
          feedback: translate
            ? "Use the preterite of 'escoger': 'Sí, escogí...' or 'No escogí artesanías'."
            : "Usa el pretérito de 'escoger': 'Sí, escogí...' o 'No escogí artesanías'.",
          userTranslation: ""
        };
      }
      return {
        isValid: true,
        feedback: translate
          ? "Very good! You used 'escogí' with suitable direct/indirect objects."
          : "¡Muy bien! Usaste 'escogí' con los complementos adecuados.",
        userTranslation: generateGlossaryTranslation(clean)
      };
    }

    case 7: { // ¿Pagaste en efectivo o con tarjeta de crédito? ¿Recibiste descuentos?
      const hasPagar = clean.includes("pagué") || clean.includes("pague") || clean.includes("pagamos");
      const hasPaymentMethod = clean.includes("efectivo") || clean.includes("tarjeta") || clean.includes("crédito");
      if (!hasPagar) {
        return {
          isValid: false,
          feedback: translate
            ? "Remember the spelling change of 'pagar' in preterite: 'Pagué' (with gu)."
            : "Recuerda el cambio ortográfico de 'pagar' en pretérito: 'Pagué' (con gu).",
          userTranslation: ""
        };
      }
      if (!hasPaymentMethod) {
        return {
          isValid: false,
          feedback: translate
            ? "Indicate your payment method: 'en efectivo' or 'con tarjeta de crédito'."
            : "Indica tu método de pago: 'en efectivo' o 'con tarjeta de crédito'.",
          userTranslation: ""
        };
      }
      return {
        isValid: true,
        feedback: translate
          ? "Perfect! You wrote 'pagué' with correct orthography and specified the payment method."
          : "¡Perfecto! Escribiste 'pagué' con su ortografía correcta y especificaste el método de pago.",
        userTranslation: generateGlossaryTranslation(clean)
      };
    }

    case 8: { // ¿Qué otras cosas encontraste?
      const hasEncontrar = clean.includes("encontré") || clean.includes("encontre") || clean.includes("vi") || clean.includes("había");
      if (!hasEncontrar) {
        return {
          isValid: false,
          feedback: translate
            ? "Use the verb 'encontrar' in preterite: 'Encontré...' or 'También vi...'."
            : "Usa el verbo 'encontrar' en pretérito: 'Encontré...' o 'También vi...'.",
          userTranslation: ""
        };
      }
      return {
        isValid: true,
        feedback: translate
          ? "Excellent! You described other items found at the market in preterite."
          : "¡Excelente! Describiste otros artículos hallados en el mercado en pretérito.",
        userTranslation: generateGlossaryTranslation(clean)
      };
    }

    case 9: { // ¿Cómo te sentiste en el mercado?
      const hasSentir = clean.includes("me sentí") || clean.includes("me senti");
      const hasEmotion = clean.includes("content") || clean.includes("feliz") || clean.includes("emocionad") || clean.includes("cansad") || clean.includes("relajad") || clean.includes("abrumad") || clean.includes("bien") || clean.includes("alegre");
      if (!hasSentir) {
        return {
          isValid: false,
          feedback: translate
            ? "Use the reflexive verb 'sentirse' in preterite: 'Me sentí...'."
            : "Usa el verbo reflexivo 'sentirse' en pretérito: 'Me sentí...'.",
          userTranslation: ""
        };
      }
      if (!hasEmotion) {
        return {
          isValid: false,
          feedback: translate
            ? "Add how you felt (e.g.: muy contento/a, emocionado/a, un poco cansado/a, feliz)."
            : "Agrega cómo te sentiste (ej: muy contento/a, emocionado/a, un poco cansado/a, feliz).",
          userTranslation: ""
        };
      }
      return {
        isValid: true,
        feedback: translate
          ? "Great response! You used 'me sentí' and expressed your mood with precision."
          : "¡Gran respuesta! Usaste 'me sentí' y expresaste tu estado de ánimo con precisión.",
        userTranslation: generateGlossaryTranslation(clean)
      };
    }

    case 10: { // ¿Qué pensaste de tu visita al mercado? ¿Por qué?
      const hasPensar = clean.includes("pensé") || clean.includes("pense") || clean.includes("fue");
      const hasCausa = clean.includes("porque") || clean.includes("por");
      if (!hasPensar) {
        return {
          isValid: false,
          feedback: translate
            ? "Begin with your opinion in preterite: 'Pensé que fue [maravillosa / divertida / fascinante]...'."
            : "Comienza con tu opinión en pretérito: 'Pensé que fue [maravillosa / divertida / fascinante]...'.",
          userTranslation: ""
        };
      }
      if (!hasCausa) {
        return {
          isValid: false,
          feedback: translate
            ? "Don't forget to explain the reason using 'porque...' (why did you think that?)."
            : "No olvides explicar la razón usando 'porque...' (¿por qué pensaste eso?).",
          userTranslation: ""
        };
      }
      return {
        isValid: true,
        feedback: translate
          ? "Wonderful! You expressed your critical evaluation with 'pensé que fue...' and justified it with 'porque'."
          : "¡Maravilloso! Expresaste tu valoración crítica con 'pensé que fue...' y la justificaste con 'porque'.",
        userTranslation: generateGlossaryTranslation(clean)
      };
    }

    default:
      return {
        isValid: true,
        feedback: translate ? "Response recorded!" : "¡Respuesta registrada!",
        userTranslation: generateGlossaryTranslation(clean)
      };
  }
}

// Helper to provide a quick English gloss of student's Spanish input
function generateGlossaryTranslation(cleanSpanish) {
  const dictionary = {
    "fui": "I went",
    "con": "with",
    "mi": "my",
    "mejor": "best",
    "amigo": "friend",
    "amiga": "friend",
    "mama": "mom",
    "mamá": "mom",
    "hermanos": "siblings",
    "familia": "family",
    "solo": "alone",
    "sola": "alone",
    "ayer": "yesterday",
    "al": "to the",
    "mercado": "market",
    "centro": "mall/downtown",
    "comercial": "mall",
    "tienda": "store",
    "de": "of",
    "ropa": "clothes",
    "artesanias": "crafts",
    "artesanías": "crafts",
    "compre": "I bought",
    "compré": "I bought",
    "una": "a",
    "camisa": "shirt",
    "bordada": "embroidered",
    "pantalones": "pants",
    "zapatos": "shoes",
    "comodos": "comfortable",
    "cómodos": "comfortable",
    "probe": "I tried",
    "probé": "I tried",
    "comi": "I ate",
    "comí": "I ate",
    "tacos": "tacos",
    "pescado": "fish",
    "empanadas": "empanadas",
    "tamales": "tamales",
    "me": "myself",
    "medi": "I tried on",
    "medí": "I tried on",
    "chaqueta": "jacket",
    "cuero": "leather",
    "escogi": "I chose",
    "escogí": "I chose",
    "para": "for",
    "regalar": "to gift",
    "pague": "I paid",
    "pagué": "I paid",
    "en": "in",
    "efectivo": "cash",
    "tarjeta": "card",
    "credito": "credit",
    "crédito": "credit",
    "descuento": "discount",
    "recibi": "I received",
    "recibí": "I received",
    "encontre": "I found",
    "encontré": "I found",
    "vi": "I saw",
    "libros": "books",
    "antiguos": "antique",
    "dulces": "candies",
    "senti": "I felt",
    "sentí": "I felt",
    "muy": "very",
    "contento": "happy",
    "contenta": "happy",
    "feliz": "happy",
    "emocionado": "excited",
    "emocionada": "excited",
    "cansado": "tired",
    "cansada": "tired",
    "pense": "I thought",
    "pensé": "I thought",
    "que": "that",
    "fue": "it was",
    "maravillosa": "wonderful",
    "divertida": "fun",
    "porque": "because",
    "aprendi": "I learned",
    "mucho": "a lot"
  };

  const words = cleanSpanish.split(" ");
  const translatedWords = words.map(w => dictionary[w] || w);
  let res = translatedWords.join(" ");
  return res.charAt(0).toUpperCase() + res.slice(1);
}
