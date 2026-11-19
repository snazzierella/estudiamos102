// -------------------------------------------------------------
// SENTENCE BUILDER / CONSTRUCTION ENGINE
// High-quality sentence pools across Spanish 101 Review & Units 2-4,
// with grammar-aligned distractors for drag-and-drop & tap construction.
// -------------------------------------------------------------

export const SENTENCE_POOLS = {
  // UNIT 1: Repaso de Español 101 (Present tense, articles, agreement, basic syntax)
  1: [
    {
      spanish: "La mujer come una manzana roja",
      english: "The woman eats a red apple",
      distractors: ["el", "como", "rojo"],
      hint: "Subject + Verb + Object (feminine noun & adjective agreement)",
      syntaxBreakdown: "[Subject: La mujer] + [Present Verb: come] + [Direct Object (fem. sing.): una manzana roja]"
    },
    {
      spanish: "El muchacho tiene un perro negro",
      english: "The boy has a black dog",
      distractors: ["la", "tengo", "negra"],
      hint: "Check verb form for 'él' and masculine adjective agreement",
      syntaxBreakdown: "[Subject: El muchacho] + [Present Verb: tiene] + [Direct Object (masc. sing.): un perro negro]"
    },
    {
      spanish: "Nosotros vivimos en una casa grande",
      english: "We live in a big house",
      distractors: ["vivo", "el", "pequeño"],
      hint: "Remember the 'nosotros' -ir verb ending (-imos)",
      syntaxBreakdown: "[Subject: Nosotros] + [Present Verb (-ir): vivimos] + [Prepositional Phrase / Location: en una casa grande]"
    },
    {
      spanish: "Ellos quieren almorzar en la cafetería",
      english: "They want to eat lunch in the cafeteria",
      distractors: ["quiere", "el", "almuerzan"],
      hint: "Stem-changing verb 'querer' followed by an infinitive",
      syntaxBreakdown: "[Subject: Ellos] + [Stem-Changing Verb (e->ie): quieren] + [Infinitive: almorzar] + [Location: en la cafetería]"
    },
    {
      spanish: "El estudiante hace la tarea en la biblioteca",
      english: "The student does homework in the library",
      distractors: ["hago", "un", "las"],
      hint: "Irregular verb 'hacer' with feminine direct object",
      syntaxBreakdown: "[Subject: El estudiante] + [Irregular Verb (hacer): hace] + [Direct Object: la tarea] + [Location: en la biblioteca]"
    },
    {
      spanish: "El maestro enseña la clase de español",
      english: "The teacher teaches the Spanish class",
      distractors: ["enseño", "un", "las"],
      hint: "Regular -ar verb ending for 3rd person singular",
      syntaxBreakdown: "[Subject: El maestro] + [Present Verb (-ar): enseña] + [Direct Object: la clase de español]"
    },
    {
      spanish: "Nosotros compramos pan en el mercado",
      english: "We buy bread in the market",
      distractors: ["compro", "la", "compran"],
      hint: "Regular -ar verb ending for 1st person plural (nosotros).",
      syntaxBreakdown: "[Subject: Nosotros] + [Present Verb: compramos] + [Direct Object: pan] + [Location: en el mercado]"
    },
    {
      spanish: "Ella habla español muy bien",
      english: "She speaks Spanish very well",
      distractors: ["hablo", "el", "bueno"],
      hint: "Adverb 'bien' describes how she speaks",
      syntaxBreakdown: "[Subject: Ella] + [Present Verb: habla] + [Direct Object: español] + [Adverb of Manner: muy bien]"
    },
    {
      spanish: "Yo tengo que estudiar para el examen",
      english: "I have to study for the exam",
      distractors: ["tiene", "por", "un"],
      hint: "Tener que + infinitive expresses obligation",
      syntaxBreakdown: "[Subject: Yo] + [Obligation: tengo que estudiar] + [Purpose / Goal (para): para el examen]"
    },
    {
      spanish: "A mí me gusta el café caliente",
      english: "I like hot coffee",
      distractors: ["gustan", "te", "la"],
      hint: "Use singular 'gusta' for singular coffee",
      syntaxBreakdown: "[Clarifier: A mí] + [Indirect Object Pronoun: me] + [Gustar Verb (sing.): gusta] + [Subject: el café caliente]"
    },
    {
      spanish: "Mis amigos van al parque los domingos",
      english: "My friends go to the park on Sundays",
      distractors: ["va", "el", "las"],
      hint: "Ir a + el contracts to 'al'",
      syntaxBreakdown: "[Subject: Mis amigos] + [Irregular Verb (ir): van] + [Contraction (a + el): al parque] + [Time Expression: los domingos]"
    },
    {
      spanish: "A qué hora es la clase de inglés",
      english: "What time is the English class",
      distractors: ["son", "en", "el"],
      hint: "Time question with 'es' for a singular event",
      syntaxBreakdown: "[Question Phrase: A qué hora] + [Verb (ser): es] + [Subject: la clase de inglés]"
    },
    {
      spanish: "Los estudiantes leen muchos libros interesantes",
      english: "The students read many interesting books",
      distractors: ["lee", "mucho", "interesante"],
      hint: "3rd person plural verb ending (-en) and plural adjective agreement",
      syntaxBreakdown: "[Subject: Los estudiantes] + [Present Verb: leen] + [Direct Object (pl.): muchos libros interesantes]"
    },
    {
      spanish: "Yo sé la respuesta a la pregunta",
      english: "I know the answer to the question",
      distractors: ["conozco", "sabe", "el"],
      hint: "Use saber for facts/answers; irregular yo form is 'sé'",
      syntaxBreakdown: "[Subject: Yo] + [Irregular Verb (saber - facts): sé] + [Direct Object: la respuesta] + [Indirect Object / Direction: a la pregunta]"
    },
    {
      spanish: "Nosotros conocemos a la profesora nueva",
      english: "We know the new female teacher",
      distractors: ["sabemos", "conocen", "nuevo"],
      hint: "Use conocer with personal 'a' for people; feminine adjective",
      syntaxBreakdown: "[Subject: Nosotros] + [Verb (conocer - people): conocemos] + [Personal 'a': a la profesora nueva]"
    },
    {
      spanish: "A ellos les gustan las frutas frescas",
      english: "They like fresh fruits",
      distractors: ["gusta", "le", "fresco"],
      hint: "Use plural 'gustan' for plural fruits and indirect pronoun 'les'",
      syntaxBreakdown: "[Clarifier: A ellos] + [Indirect Object Pronoun: les] + [Gustar Verb (pl.): gustan] + [Plural Subject: las frutas frescas]"
    },
    {
      spanish: "Tú duermes ocho horas todas las noches",
      english: "You sleep eight hours every night",
      distractors: ["duerme", "dormir", "todos"],
      hint: "Stem-changing verb dormir (o -> ue) for tú",
      syntaxBreakdown: "[Subject: Tú] + [Stem-Changing Verb (o->ue): duermes] + [Duration: ocho horas] + [Frequency: todas las noches]"
    },
    {
      spanish: "El profesor explica la lección difícil",
      english: "The professor explains the difficult lesson",
      distractors: ["explico", "un", "las"],
      hint: "Regular -ar verb ending (-a) with feminine noun agreement",
      syntaxBreakdown: "[Subject: El profesor] + [Present Verb: explica] + [Direct Object: la lección difícil]"
    },
    {
      spanish: "Mi familia y yo comemos juntos los domingos",
      english: "My family and I eat together on Sundays",
      distractors: ["come", "comen", "junto"],
      hint: "Subject (Mi familia y yo) takes 1st person plural verb ending (-emos).",
      syntaxBreakdown: "[Compound Subject: Mi familia y yo] + [Verb (nosotros): comemos] + [Adjective / Manner: juntos] + [Time: los domingos]"
    },
    {
      spanish: "Ustedes pueden hablar con el director hoy",
      english: "You all can speak with the principal today",
      distractors: ["puedo", "puede", "hablan"],
      hint: "Modal verb poder (o -> ue) followed by an infinitive",
      syntaxBreakdown: "[Subject: Ustedes] + [Modal Verb (o->ue): pueden] + [Infinitive: hablar] + [Prepositional Phrase: con el director] + [Time: hoy]"
    },
    {
      spanish: "Yo salgo con mis amigos los fines de semana",
      english: "I go out with my friends on the weekends",
      distractors: ["sale", "el", "amigo"],
      hint: "Irregular 'yo-go' form of salir in present tense.",
      syntaxBreakdown: "[Subject: Yo] + [Irregular 'yo' Verb: salgo] + [Accompaniment: con mis amigos] + [Time: los fines de semana]"
    },
    {
      spanish: "El agua fría está en el refrigerador",
      english: "The cold water is in the refrigerator",
      distractors: ["es", "frío", "los"],
      hint: "Agua is feminine (fría), uses estar for location",
      syntaxBreakdown: "[Subject: El agua fría] + [Verb (estar - location): está] + [Location: en el refrigerador]"
    },
    {
      spanish: "Nosotros siempre decimos la verdad en casa",
      english: "We always tell the truth at home",
      distractors: ["decen", "dices", "el"],
      hint: "Irregular verb decir with nosotros ending (-imos)",
      syntaxBreakdown: "[Subject: Nosotros] + [Frequency Adverb: siempre] + [Irregular Verb (decir): decimos] + [Direct Object: la verdad] + [Location: en casa]"
    },
    {
      spanish: "Ella prefiere tomar té por la mañana",
      english: "She prefers to drink tea in the morning",
      distractors: ["prefiero", "toma", "el"],
      hint: "Stem changer preferir (e -> ie) + infinitive",
      syntaxBreakdown: "[Subject: Ella] + [Stem-Changing Verb (e->ie): prefiere] + [Infinitive: tomar] + [Direct Object: té] + [Time (por): por la mañana]"
    },
    {
      spanish: "Los niños juegan en el jardín grande",
      english: "The children play in the big garden",
      distractors: ["juega", "jugamos", "la"],
      hint: "Stem changer jugar (u -> ue) for plural ellos",
      syntaxBreakdown: "[Subject: Los niños] + [Stem-Changing Verb (u->ue): juegan] + [Location: en el jardín grande]"
    },
    {
      spanish: "Yo pongo los libros en la mesa",
      english: "I put the books on the table",
      distractors: ["pone", "el", "las"],
      hint: "Irregular 'yo-go' form of poner in present tense.",
      syntaxBreakdown: "[Subject: Yo] + [Irregular 'yo' Verb: pongo] + [Direct Object: los libros] + [Location: en la mesa]"
    },
    {
      spanish: "Mi hermano menor pide ayuda con la tarea",
      english: "My younger brother asks for help with homework",
      distractors: ["pede", "pido", "el"],
      hint: "Stem changer pedir (e -> i) for 3rd person singular",
      syntaxBreakdown: "[Subject: Mi hermano menor] + [Stem-Changing Verb (e->i): pide] + [Direct Object: ayuda] + [Prepositional Phrase: con la tarea]"
    },
    {
      spanish: "Dónde compras tú la ropa bonita",
      english: "Where do you buy pretty clothes",
      distractors: ["compra", "el", "bonito"],
      hint: "Question word with tú form of regular -ar verb",
      syntaxBreakdown: "[Question Word: Dónde] + [Present Verb: compras] + [Subject: tú] + [Direct Object: la ropa bonita]"
    },
    {
      spanish: "Nosotros almorzamos en la cafetería a las doce",
      english: "We eat lunch in the cafeteria at twelve",
      distractors: ["almuerzan", "el", "almuerzo"],
      hint: "Remember the nosotros form (-amos) does not change stem for almorzar",
      syntaxBreakdown: "[Subject: Nosotros] + [Present Verb (no stem change in nosotros): almorzamos] + [Location: en la cafetería] + [Time: a las doce]"
    },
    {
      spanish: "Tú tienes que hacer la tarea de matemáticas",
      english: "You have to do the math homework",
      distractors: ["hago", "por", "los"],
      hint: "Tener que + infinitive expresses obligation",
      syntaxBreakdown: "[Subject: Tú] + [Obligation: tienes que hacer] + [Direct Object: la tarea de matemáticas]"
    },
    {
      spanish: "Mi hermana menor tiene quince años",
      english: "My younger sister is fifteen years old",
      distractors: ["es", "un", "hermano"],
      hint: "In Spanish, age uses tener (to have years), not ser",
      syntaxBreakdown: "[Subject: Mi hermana menor] + [Age Verb (tener): tiene] + [Years: quince años]"
    },
    {
      spanish: "A mi padre le gusta beber café con leche",
      english: "My father likes to drink coffee with milk",
      distractors: ["gustan", "me", "el"],
      hint: "Use le gusta before an infinitive verb (beber)",
      syntaxBreakdown: "[Clarifier: A mi padre] + [Indirect Object Pronoun: le] + [Gustar Verb (sing. before infinitive): gusta] + [Infinitive Phrase: beber café con leche]"
    },
    {
      spanish: "Ellos entienden la lección de gramática hoy",
      english: "They understand the grammar lesson today",
      distractors: ["entiende", "un", "las"],
      hint: "Stem changer entender (e -> ie) for ellos",
      syntaxBreakdown: "[Subject: Ellos] + [Stem-Changing Verb (e->ie): entienden] + [Direct Object: la lección de gramática] + [Time: hoy]"
    },
    {
      spanish: "Yo quiero pedir una hamburguesa con papas fritas",
      english: "I want to order a hamburger with french fries",
      distractors: ["quiere", "pido", "la"],
      hint: "First verb is conjugated (quiero), second is infinitive (pedir)",
      syntaxBreakdown: "[Subject: Yo] + [Stem-Changing Verb (e->ie): quiero] + [Infinitive (e->i stem): pedir] + [Direct Object: una hamburguesa con papas fritas]"
    },
    {
      spanish: "Nosotros sabemos dónde está la biblioteca central",
      english: "We know where the central library is",
      distractors: ["conocemos", "saben", "el"],
      hint: "Use saber for facts/locations of places with interrogatives",
      syntaxBreakdown: "[Subject: Nosotros] + [Verb (saber - facts): sabemos] + [Indirect Question / Location: dónde está la biblioteca central]"
    },
    {
      spanish: "Tú conoces muy bien esta hermosa ciudad",
      english: "You know this beautiful city very well",
      distractors: ["sabes", "este", "bueno"],
      hint: "Use conocer to be acquainted with a city/place",
      syntaxBreakdown: "[Subject: Tú] + [Verb (conocer - places): conoces] + [Adverb: muy bien] + [Direct Object: esta hermosa ciudad]"
    },
    {
      spanish: "A qué hora empieza la fiesta de cumpleaños",
      english: "What time does the birthday party start",
      distractors: ["son", "en", "empiezan"],
      hint: "Stem changer empezar (e -> ie) for singular la fiesta",
      syntaxBreakdown: "[Question Phrase: A qué hora] + [Stem-Changing Verb (e->ie): empieza] + [Subject: la fiesta de cumpleaños]"
    },
    {
      spanish: "El profesor repite las palabras difíciles para los estudiantes",
      english: "The professor repeats the difficult words for the students",
      distractors: ["repito", "difícil", "por"],
      hint: "Stem changer repetir (e -> i) with plural adjective agreement",
      syntaxBreakdown: "[Subject: El profesor] + [Stem-Changing Verb (e->i): repite] + [Direct Object: las palabras difíciles] + [Beneficiary (para): para los estudiantes]"
    }
  ],

  // UNIT 2: Rutina Diaria, Salud, Emociones, Verbos Reflexivos y Recíprocos
  2: [
    {
      spanish: "Yo me lavo las manos antes de comer",
      english: "I wash my hands before eating",
      distractors: ["te", "lava", "los"],
      hint: "Reflexive pronoun 'me' goes before conjugated verb 'lavo'",
      syntaxBreakdown: "[Subject: Yo] + [Reflexive Pronoun: me] + [Conjugated Verb: lavo] + [Direct Object (body part): las manos] + [Time Clause: antes de comer]"
    },
    {
      spanish: "Los dos amigos se abrazan cuando se ven",
      english: "The two friends hug each other when they see each other",
      distractors: ["nos", "abraza", "abrazarse"],
      hint: "Reciprocal action with plural pronoun 'se'",
      syntaxBreakdown: "[Subject: Los dos amigos] + [Reciprocal Pronoun: se] + [Reciprocal Verb: abrazan] + [Conjunction & Clause: cuando se ven]"
    },
    {
      spanish: "Ella se cepilla los dientes después de cenar",
      english: "She brushes her teeth after dinner",
      distractors: ["me", "cepillan", "el"],
      hint: "Reflexive pronoun 'se' + singular verb 'cepilla'",
      syntaxBreakdown: "[Subject: Ella] + [Reflexive Pronoun: se] + [Conjugated Verb: cepilla] + [Direct Object: los dientes] + [Time Clause: después de cenar]"
    },
    {
      spanish: "Nosotros nos ayudamos con la tarea de español",
      english: "We help each other with the Spanish homework",
      distractors: ["se", "ayudan", "para"],
      hint: "Reciprocal 'nosotros nos ayudamos'",
      syntaxBreakdown: "[Subject: Nosotros] + [Reciprocal Pronoun: nos] + [Reciprocal Verb: ayudamos] + [Prepositional Phrase: con la tarea de español]"
    },
    {
      spanish: "A Juan le duele la cabeza hoy",
      english: "Juan's head hurts today",
      distractors: ["duelen", "el", "les"],
      hint: "Doler uses singular 'duele' for one body part",
      syntaxBreakdown: "[Clarifier: A Juan] + [Indirect Object Pronoun: le] + [Verb of Pain (sing.): duele] + [Singular Subject: la cabeza] + [Time: hoy]"
    },
    {
      spanish: "Ellos quieren besarse antes de salir",
      english: "They want to kiss each other before leaving",
      distractors: ["besan", "se", "nos"],
      hint: "Infinitive with attached reciprocal pronoun following the modal verb querer.",
      syntaxBreakdown: "[Subject: Ellos] + [Modal Verb: quieren] + [Infinitive + Attached Reciprocal Pronoun: besarse] + [Time Clause: antes de salir]"
    },
    {
      spanish: "Nosotros vamos a besarnos antes de salir",
      english: "We are going to kiss each other before leaving",
      distractors: ["se", "besarse", "besarme"],
      hint: "With 'ir a + infinitive', attach the 1st person plural reciprocal pronoun to the infinitive without duplicating it.",
      syntaxBreakdown: "[Subject: Nosotros] + [Future Verb Phrase (ir a): vamos a] + [Infinitive + Attached Pronoun: besarnos] + [Time Clause: antes de salir]"
    },
    {
      spanish: "Nosotros nos vamos a besar antes de salir",
      english: "We are going to kiss each other before leaving",
      distractors: ["se", "besarse", "besarme"],
      hint: "Since the reciprocal pronoun precedes the conjugated verb, keep the infinitive plain without repeating the pronoun.",
      syntaxBreakdown: "[Subject: Nosotros] + [Fronted Reciprocal Pronoun: nos] + [Future Verb Phrase: vamos a besar] + [Time Clause: antes de salir]"
    },
    {
      spanish: "Los novios se van a besar en el altar",
      english: "The sweethearts are going to kiss each other at the altar",
      distractors: ["besarse", "nos", "vamos"],
      hint: "Since the reciprocal pronoun is placed before the conjugated verb, keep the infinitive plain and remember the preposition 'a'.",
      syntaxBreakdown: "[Subject: Los novios] + [Fronted Reciprocal Pronoun: se] + [Future Verb Phrase: van a besar] + [Location: en el altar]"
    },
    {
      spanish: "Los novios se quieren besar en el parque",
      english: "The sweethearts want to kiss each other in the park",
      distractors: ["besarse", "quiere", "nos"],
      hint: "With the pronoun placed before querer, keep the second verb as a plain infinitive.",
      syntaxBreakdown: "[Subject: Los novios] + [Fronted Reciprocal Pronoun: se] + [Modal Verb: quieren] + [Plain Infinitive: besar] + [Location: en el parque]"
    },
    {
      spanish: "Los dos amigos se van a abrazar en el aeropuerto",
      english: "The two friends are going to hug each other at the airport",
      distractors: ["abrazarse", "nos", "vamos"],
      hint: "Since the reciprocal pronoun precedes the auxiliary verb, keep the following infinitive in its simple form.",
      syntaxBreakdown: "[Subject: Los dos amigos] + [Fronted Reciprocal Pronoun: se] + [Future Verb Phrase: van a abrazar] + [Location: en el aeropuerto]"
    },
    {
      spanish: "Nosotros nos vamos a abrazar con alegría",
      english: "We are going to hug each other with joy",
      distractors: ["se", "abrazarse", "abrazarme"],
      hint: "Place the 1st person plural reciprocal pronoun before the conjugated auxiliary verb.",
      syntaxBreakdown: "[Subject: Nosotros] + [Fronted Reciprocal Pronoun: nos] + [Future Verb Phrase: vamos a abrazar] + [Manner: con alegría]"
    },
    {
      spanish: "Nosotros vamos a abrazarnos con alegría",
      english: "We are going to hug each other with joy",
      distractors: ["se", "abrazarse", "abrazar"],
      hint: "Attach the 1st person plural reciprocal pronoun to the end of the infinitive.",
      syntaxBreakdown: "[Subject: Nosotros] + [Verb (ir a): vamos a] + [Infinitive + Attached Pronoun: abrazarnos] + [Manner: con alegría]"
    },
    {
      spanish: "Los dos estudiantes se van a conocer hoy",
      english: "The two students are going to meet each other today",
      distractors: ["conocerse", "nos", "vamos"],
      hint: "Since the pronoun is placed before the auxiliary verb, keep the infinitive in its simple form.",
      syntaxBreakdown: "[Subject: Los dos estudiantes] + [Fronted Reciprocal Pronoun: se] + [Future Verb Phrase: van a conocer] + [Time: hoy]"
    },
    {
      spanish: "Nosotros nos tenemos que ayudar con la tarea",
      english: "We have to help each other with the homework",
      distractors: ["se", "ayudarnos", "ayuda"],
      hint: "Since the pronoun precedes 'tener que', keep the following infinitive in its simple form without duplicating the pronoun.",
      syntaxBreakdown: "[Subject: Nosotros] + [Fronted Reciprocal Pronoun: nos] + [Obligation Phrase: tenemos que ayudar] + [Prepositional Phrase: con la tarea]"
    },
    {
      spanish: "Nosotros tenemos que ayudarnos con la tarea",
      english: "We have to help each other with the homework",
      distractors: ["se", "ayudar", "ellos"],
      hint: "Attach the reciprocal pronoun for nosotros directly to the end of the infinitive.",
      syntaxBreakdown: "[Subject: Nosotros] + [Obligation Phrase: tenemos que] + [Infinitive + Attached Pronoun: ayudarnos] + [Prepositional Phrase: con la tarea]"
    },
    {
      spanish: "Los amigos se van a despedir en la estación",
      english: "The friends are going to say goodbye to each other at the station",
      distractors: ["despedirse", "nos", "vamos"],
      hint: "When the reciprocal pronoun is placed before the conjugated verb, avoid duplicating it on the infinitive.",
      syntaxBreakdown: "[Subject: Los amigos] + [Fronted Reciprocal Pronoun: se] + [Future Verb Phrase: van a despedir] + [Location: en la estación]"
    },
    {
      spanish: "Nosotros nos vamos a reunir en la cafetería",
      english: "We are going to meet up in the cafeteria",
      distractors: ["se", "reunirse", "reúnen"],
      hint: "Place the reciprocal pronoun for nosotros before the conjugated auxiliary verb.",
      syntaxBreakdown: "[Subject: Nosotros] + [Fronted Reciprocal Pronoun: nos] + [Future Verb Phrase: vamos a reunir] + [Location: en la cafetería]"
    },
    {
      spanish: "Yo me voy a acostar temprano esta noche",
      english: "I am going to go to bed early tonight",
      distractors: ["te", "acostarme", "acuesto"],
      hint: "Since the reflexive pronoun precedes the conjugated verb, keep the infinitive in its plain form.",
      syntaxBreakdown: "[Subject: Yo] + [Fronted Reflexive Pronoun: me] + [Future Verb Phrase: voy a acostar] + [Time / Adverb: temprano esta noche]"
    },
    {
      spanish: "Tú te tienes que lavar las manos antes de comer",
      english: "You have to wash your hands before eating",
      distractors: ["se", "lavarte", "lavas"],
      hint: "Since the reflexive pronoun is in front of the conjugated verb, keep the infinitive plain without repeating the pronoun.",
      syntaxBreakdown: "[Subject: Tú] + [Fronted Reflexive Pronoun: te] + [Obligation: tienes que lavar] + [Direct Object: las manos] + [Time Clause: antes de comer]"
    },
    {
      spanish: "Yo estudio español por dos horas todos los días",
      english: "I study Spanish for two hours every day",
      distractors: ["para", "estudia", "las"],
      hint: "Use 'por' for duration of time",
      syntaxBreakdown: "[Subject: Yo] + [Verb: estudio] + [Direct Object: español] + [Duration (por): por dos horas] + [Frequency: todos los días]"
    },
    {
      spanish: "El regalo es para mi hermana menor",
      english: "The gift is for my younger sister",
      distractors: ["por", "la", "mis"],
      hint: "Use 'para' for a recipient",
      syntaxBreakdown: "[Subject: El regalo] + [Verb (ser): es] + [Recipient / Beneficiary (para): para mi hermana menor]"
    },
    {
      spanish: "Mis padres se conocieron en la universidad",
      english: "My parents met each other in college",
      distractors: ["nos", "conoció", "el"],
      hint: "Reciprocal action in preterite for 3rd person plural (ellos).",
      syntaxBreakdown: "[Subject: Mis padres] + [Reciprocal Pronoun: se] + [Preterite Verb: conocieron] + [Location: en la universidad]"
    },
    {
      spanish: "Tú te despiertas temprano por la mañana",
      english: "You wake up early in the morning",
      distractors: ["se", "despierto", "para"],
      hint: "Stem-changing reflexive verb (e -> ie) for 2nd person singular.",
      syntaxBreakdown: "[Subject: Tú] + [Reflexive Pronoun: te] + [Stem-Changing Verb (e->ie): despiertas] + [Adverb: temprano] + [Time of Day (por): por la mañana]"
    },
    {
      spanish: "Yo me despierto a las siete de la mañana",
      english: "I wake up at seven in the morning",
      distractors: ["te", "despierta", "por"],
      hint: "Stem-changing reflexive (e -> ie) with pronoun 'me'",
      syntaxBreakdown: "[Subject: Yo] + [Reflexive Pronoun: me] + [Stem-Changing Verb (e->ie): despierto] + [Specific Time: a las siete de la mañana]"
    },
    {
      spanish: "Mi hermano se levanta tarde los fines de semana",
      english: "My brother gets up late on weekends",
      distractors: ["me", "levantan", "el"],
      hint: "Reflexive pronoun 'se' with 3rd-person singular 'levanta'",
      syntaxBreakdown: "[Subject: Mi hermano] + [Reflexive Pronoun: se] + [Verb: levanta] + [Adverb: tarde] + [Frequency: los fines de semana]"
    },
    {
      spanish: "Nosotros nos duchamos con agua caliente",
      english: "We shower with hot water",
      distractors: ["se", "duchan", "ducha"],
      hint: "Nosotros requires the reflexive pronoun 'nos'",
      syntaxBreakdown: "[Subject: Nosotros] + [Reflexive Pronoun: nos] + [Verb: duchamos] + [Prepositional Phrase: con agua caliente]"
    },
    {
      spanish: "Ella se viste rápidamente para ir a trabajar",
      english: "She gets dressed quickly to go to work",
      distractors: ["me", "visten", "por"],
      hint: "Stem-changing reflexive verb vestir (e -> i) for 3rd person singular.",
      syntaxBreakdown: "[Subject: Ella] + [Reflexive Pronoun: se] + [Stem-Changing Verb (e->i): viste] + [Adverb: rápidamente] + [Purpose (para): para ir a trabajar]"
    },
    {
      spanish: "Tú te acuestas temprano cuando tienes examen",
      english: "You go to bed early when you have an exam",
      distractors: ["se", "acuesto", "para"],
      hint: "Stem-changing reflexive verb acostar (o -> ue) for 2nd person singular.",
      syntaxBreakdown: "[Subject: Tú] + [Reflexive Pronoun: te] + [Stem-Changing Verb (o->ue): acuestas] + [Adverb: temprano] + [Conditional Clause: cuando tienes examen]"
    },
    {
      spanish: "Antes de acostarse los niños leen un cuento",
      english: "Before going to bed the children read a story",
      distractors: ["acostarme", "se acuestan", "acostar"],
      hint: "After a preposition (antes de), use the infinitive with attached reflexive pronoun.",
      syntaxBreakdown: "[Preposition + Attached Pronoun: Antes de acostarse] + [Subject: los niños] + [Verb: leen] + [Direct Object: un cuento]"
    },
    {
      spanish: "Yo voy a lavarme la cara con jabón",
      english: "I am going to wash my face with soap",
      distractors: ["me lavo", "lavarse", "el"],
      hint: "With 'ir a + infinitive', attach the 1st person reflexive pronoun to the end of the infinitive.",
      syntaxBreakdown: "[Subject: Yo] + [Verb (ir a): voy a] + [Infinitive + Attached Reflexive Pronoun: lavarme] + [Direct Object: la cara] + [Instrument: con jabón]"
    },
    {
      spanish: "A mi hermano le duele mucho la garganta hoy",
      english: "My brother's throat hurts a lot today",
      distractors: ["duelen", "me", "el"],
      hint: "Doler agrees in singular with the affected body part.",
      syntaxBreakdown: "[Clarifier: A mi hermano] + [Indirect Object Pronoun: le] + [Verb of Pain: duele] + [Degree: mucho] + [Subject (body part): la garganta] + [Time: hoy]"
    },
    {
      spanish: "El médico dice que debes tomar esta medicina por cinco días",
      english: "The doctor says you must take this medicine for five days",
      distractors: ["para", "digo", "este"],
      hint: "Use 'por' to express duration of time",
      syntaxBreakdown: "[Subject: El médico] + [Reporting Verb: dice que] + [Obligation: debes tomar] + [Direct Object: esta medicina] + [Duration (por): por cinco días]"
    },
    {
      spanish: "Nosotros nos sentimos muy cansados después de correr",
      english: "We feel very tired after running",
      distractors: ["se", "sienten", "cansado"],
      hint: "Sentirse expresses how one feels emotionally or physically",
      syntaxBreakdown: "[Subject: Nosotros] + [Reflexive Pronoun: nos] + [Stem-Changing Verb (e->ie): sentimos] + [Predicate Adjective: muy cansados] + [Time Clause: después de correr]"
    },
    {
      spanish: "Tengo fiebre y necesito descansar en la cama",
      english: "I have a fever and need to rest in bed",
      distractors: ["estoy", "un", "el"],
      hint: "Use tener for symptoms like fiebre (fever) and tos (cough)",
      syntaxBreakdown: "[Condition (tener): Tengo fiebre] + [Connector: y] + [Need + Infinitive: necesito descansar] + [Location: en la cama]"
    },
    {
      spanish: "Ella toma té de manzanilla para aliviar el dolor de estómago",
      english: "She drinks chamomile tea to relieve the stomach ache",
      distractors: ["por", "los", "alivia"],
      hint: "Use 'para' before an infinitive to express purpose ('in order to')",
      syntaxBreakdown: "[Subject: Ella] + [Verb: toma] + [Direct Object: té de manzanilla] + [Purpose + Infinitive (para): para aliviar el dolor de estómago]"
    },
    {
      spanish: "Los amigos se saludan con un apretón de manos",
      english: "The friends greet each other with a handshake",
      distractors: ["nos", "saluda", "saludarse"],
      hint: "Reciprocal action with plural subject (ellos se saludan)",
      syntaxBreakdown: "[Subject: Los amigos] + [Reciprocal Pronoun: se] + [Reciprocal Verb: saludan] + [Manner: con un apretón de manos]"
    },
    {
      spanish: "Mis abuelos se miran con mucho cariño y amor",
      english: "My grandparents look at each other with much affection and love",
      distractors: ["nos", "mira", "mirarse"],
      hint: "Reciprocal action in present tense for 3rd person plural.",
      syntaxBreakdown: "[Subject: Mis abuelos] + [Reciprocal Pronoun: se] + [Reciprocal Verb: miran] + [Manner: con mucho cariño y amor]"
    },
    {
      spanish: "Los dos hermanos se abrazan con alegría en el aeropuerto",
      english: "The two brothers hug each other with joy at the airport",
      distractors: ["abrazamos", "abraza", "abrazarse"],
      hint: "Reciprocal verb expressing mutual action for plural subjects.",
      syntaxBreakdown: "[Subject: Los dos hermanos] + [Reciprocal Pronoun: se] + [Reciprocal Verb: abrazan] + [Manner: con alegría] + [Location: en el aeropuerto]"
    },
    {
      spanish: "Nosotros nos vemos todos los días en la cafetería",
      english: "We see each other every day in the cafeteria",
      distractors: ["se", "ven", "ve"],
      hint: "Reciprocal action for 1st person plural with subject and pronoun.",
      syntaxBreakdown: "[Subject: Nosotros] + [Reciprocal Pronoun: nos] + [Reciprocal Verb: vemos] + [Frequency: todos los días] + [Location: en la cafetería]"
    }
  ],

  // UNIT 3: De Compras, Ropa, Quehaceres y Verbos en Pretérito
  3: [
    {
        "spanish": "Ayer compré una camisa azul en la tienda",
        "english": "Yesterday I bought a blue shirt in the store",
        "distractors": [
            "compro",
            "compró",
            "el"
        ],
        "hint": "Preterite regular -ar verb ending for 1st person singular (-é).",
        "syntaxBreakdown": "[Time Adverb: Ayer] + [Preterite Verb: compré] + [Direct Object: una camisa azul] + [Location: en la tienda]"
    },
    {
        "spanish": "Nosotros lavamos los platos anoche",
        "english": "We washed the dishes last night",
        "distractors": [
            "lavan",
            "lavo",
            "el"
        ],
        "hint": "Preterite regular -ar verb ending for 1st person plural (-amos).",
        "syntaxBreakdown": "[Subject: Nosotros] + [Preterite Verb: lavamos] + [Direct Object: los platos] + [Time: anoche]"
    },
    {
        "spanish": "Ella fue al supermercado ayer por la tarde",
        "english": "She went to the supermarket yesterday afternoon",
        "distractors": [
            "va",
            "fueron",
            "el"
        ],
        "hint": "Irregular preterite form of ir for 3rd person singular.",
        "syntaxBreakdown": "[Subject: Ella] + [Preterite Verb: fue] + [Destination: al supermercado] + [Time: ayer por la tarde]"
    },
    {
        "spanish": "Mis amigos limpiaron la casa esta mañana",
        "english": "My friends cleaned the house this morning",
        "distractors": [
            "limpia",
            "limpió",
            "el"
        ],
        "hint": "Preterite regular -ar verb ending for 3rd person plural (-aron).",
        "syntaxBreakdown": "[Subject: Mis amigos] + [Preterite Verb: limpiaron] + [Direct Object: la casa] + [Time: esta mañana]"
    },
    {
        "spanish": "Tú pagaste la ropa con tarjeta de crédito",
        "english": "You paid for the clothes with a credit card",
        "distractors": [
            "pagas",
            "pagó",
            "por"
        ],
        "hint": "Preterite regular -ar verb ending for 2nd person singular (-aste).",
        "syntaxBreakdown": "[Subject: Tú] + [Preterite Verb: pagaste] + [Direct Object: la ropa] + [Instrumento: con tarjeta de crédito]"
    },
    {
        "spanish": "Ayer lavé los platos y los sequé",
        "english": "Yesterday I washed the dishes and I dried them",
        "distractors": [
            "les",
            "lo",
            "las"
        ],
        "hint": "Use masculine plural direct object pronoun 'los' to replace 'los platos'",
        "syntaxBreakdown": "[Time: Ayer] + [Verbo 1: lavé los platos] + [Conjunción: y] + [DOP Pronoun: los] + [Verbo 2: sequé]"
    },
    {
        "spanish": "Mi padre sacó la basura y la llevó al contenedor",
        "english": "My father took out the trash and carried it to the bin",
        "distractors": [
            "le",
            "lo",
            "las"
        ],
        "hint": "Use feminine singular direct object pronoun 'la' to replace 'la basura'",
        "syntaxBreakdown": "[Subject: Mi padre] + [Verbo 1: sacó la basura] + [Conjunción: y] + [DOP Pronoun: la] + [Verbo 2: llevó al contenedor]"
    },
    {
        "spanish": "No debes barrer el piso ahora",
        "english": "You should not sweep the floor now",
        "distractors": [
            "barres",
            "barrió",
            "lo"
        ],
        "hint": "Modal auxiliary deber followed by infinitive barrer",
        "syntaxBreakdown": "[Negación: No] + [Verbo modal: debes] + [Infinitivo: barrer] + [Direct Object: el piso] + [Time: ahora]"
    },
    {
        "spanish": "No lo debes barrer ahora",
        "english": "You should not sweep it now",
        "distractors": [
            "la",
            "le",
            "los"
        ],
        "hint": "Direct object pronoun 'lo' placed before the conjugated verb 'debes'",
        "syntaxBreakdown": "[Negación: No] + [DOP Pronoun: lo] + [Verbo modal: debes] + [Infinitivo: barrer] + [Time: ahora]"
    },
    {
        "spanish": "No debes barrerlo ahora",
        "english": "You should not sweep it now",
        "distractors": [
            "barrerla",
            "barrerle",
            "barrerlos"
        ],
        "hint": "Direct object pronoun '-lo' attached to the end of the infinitive 'barrer'",
        "syntaxBreakdown": "[Negación: No] + [Verbo modal: debes] + [Infinitivo con OD adjunto: barrerlo] + [Time: ahora]"
    },
    {
        "spanish": "Mamá dejó a los niños en la escuela esta mañana",
        "english": "Mom dropped off the children at school this morning",
        "distractors": [
            "para",
            "con",
            "de"
        ],
        "hint": "Personal 'a' is required because the direct object is specific people ('a los niños')",
        "syntaxBreakdown": "[Subject: Mamá] + [Preterite Verb: dejó] + ['a' personal + OD: a los niños] + [Location: en la escuela] + [Time: esta mañana]"
    },
    {
        "spanish": "Tía Sara llevó a su gato al veterinario",
        "english": "Aunt Sara took her cat to the vet",
        "distractors": [
            "para",
            "con",
            "en"
        ],
        "hint": "Personal 'a' is used because the family pet is treated like family",
        "syntaxBreakdown": "[Subject: Tía Sara] + [Preterite Verb: llevó] + ['a' personal + OD: a su gato] + [Destination: al veterinario]"
    },
    {
        "spanish": "Yo acompañé a mi abuela al supermercado ayer",
        "english": "I accompanied my grandmother to the supermarket yesterday",
        "distractors": [
            "para",
            "de",
            "con"
        ],
        "hint": "Personal 'a' is mandatory before human direct object 'mi abuela'",
        "syntaxBreakdown": "[Subject: Yo] + [Preterite Verb: acompañé] + ['a' personal + OD: a mi abuela] + [Destination: al supermercado] + [Time: ayer]"
    },
    {
        "spanish": "El camarero nos sirvió la comida caliente",
        "english": "The waiter served us the hot food",
        "distractors": [
            "servió",
            "sirve",
            "les"
        ],
        "hint": "Preterite stem changer: -ir verb changes e -> i in 3rd person singular.",
        "syntaxBreakdown": "[Subject: El camarero] + [IOP Pronoun: nos] + [Pretérito con cambio de raíz: sirvió] + [Direct Object: la comida caliente]"
    },
    {
        "spanish": "El cliente pidió salmón con verduras frescas",
        "english": "The customer ordered salmon with fresh vegetables",
        "distractors": [
            "pedió",
            "pide",
            "pidieron"
        ],
        "hint": "Preterite stem changer: -ir verb changes e -> i in 3rd person singular.",
        "syntaxBreakdown": "[Subject: El cliente] + [Pretérito con cambio de raíz: pidió] + [Direct Object: salmón con verduras frescas]"
    },
    {
        "spanish": "Las dependientas las midieron con la cinta métrica",
        "english": "The store clerks measured them with the tape measure",
        "distractors": [
            "medieron",
            "miden",
            "los"
        ],
        "hint": "Preterite stem changer: -ir verb changes e -> i in 3rd person plural.",
        "syntaxBreakdown": "[Subject: Las dependientas] + [DOP Pronoun: las] + [Pretérito con cambio: midieron] + [Instrumento: con la cinta métrica]"
    },
    {
        "spanish": "Mi hermano pequeño durmió ocho horas anoche",
        "english": "My little brother slept eight hours last night",
        "distractors": [
            "dormió",
            "duerme",
            "dormiste"
        ],
        "hint": "Preterite stem changer — dormir changes o -> u in 3rd person singular.",
        "syntaxBreakdown": "[Subject: Mi hermano pequeño] + [Pretérito con cambio: durmió] + [Duration: ocho horas] + [Time: anoche]"
    },
    {
        "spanish": "Ella prefirió comprar la falda rebajada",
        "english": "She preferred to buy the discounted skirt",
        "distractors": [
            "preferió",
            "prefiere",
            "el"
        ],
        "hint": "Preterite stem changer: -ir verb changes e -> i in 3rd person singular.",
        "syntaxBreakdown": "[Subject: Ella] + [Pretérito con cambio: prefirió] + [Infinitivo: comprar] + [Direct Object: la falda rebajada]"
    },
    {
        "spanish": "Yo busqué un buzón de correos en la calle",
        "english": "I looked for a mailbox on the street",
        "distractors": [
            "buscé",
            "buscó",
            "el"
        ],
        "hint": "Orthographic spelling change in preterite: -car changes c -> qu in 1st person singular.",
        "syntaxBreakdown": "[Subject: Yo] + [Pretérito ortográfico: busqué] + [Direct Object: un buzón de correos] + [Location: en la calle]"
    },
    {
        "spanish": "Ayer yo pagué la cuenta en efectivo",
        "english": "Yesterday I paid the bill in cash",
        "distractors": [
            "pagé",
            "pagó",
            "por"
        ],
        "hint": "Orthographic spelling change in preterite: -gar changes g -> gu in 1st person singular.",
        "syntaxBreakdown": "[Time: Ayer] + [Subject: yo] + [Pretérito ortográfico: pagué] + [Direct Object: la cuenta] + [Modo: en efectivo]"
    },
    {
        "spanish": "Yo crucé la calle con mucho cuidado",
        "english": "I crossed the street very carefully",
        "distractors": [
            "cruzé",
            "cruzó",
            "el"
        ],
        "hint": "Orthographic spelling change in preterite: -zar changes z -> c in 1st person singular.",
        "syntaxBreakdown": "[Subject: Yo] + [Pretérito ortográfico: crucé] + [Direct Object: la calle] + [Modo: con mucho cuidado]"
    },
    {
        "spanish": "Yo empecé a estudiar después de cenar",
        "english": "I began to study after having dinner",
        "distractors": [
            "empezé",
            "empezó",
            "por"
        ],
        "hint": "Orthographic spelling change in preterite: -zar changes z -> c in 1st person singular before 'a'.",
        "syntaxBreakdown": "[Subject: Yo] + [Pretérito ortográfico: empecé a] + [Infinitivo: estudiar] + [Time: después de cenar]"
    },
    {
        "spanish": "Ella leyó el periódico de ayer por la mañana",
        "english": "She read yesterday's newspaper in the morning",
        "distractors": [
            "leió",
            "lee",
            "un"
        ],
        "hint": "Intervocalic spelling change — double vowels change i -> y in 3rd person singular.",
        "syntaxBreakdown": "[Subject: Ella] + [Pretérito intervocal: leyó] + [Direct Object: el periódico de ayer] + [Time: por la mañana]"
    },
    {
        "spanish": "Ellos creyeron las noticias de la televisión",
        "english": "They believed the news on television",
        "distractors": [
            "creieron",
            "creen",
            "una"
        ],
        "hint": "Intervocalic spelling change — double vowels change i -> y in 3rd person plural.",
        "syntaxBreakdown": "[Subject: Ellos] + [Pretérito intervocal: creyeron] + [Direct Object: las noticias de la televisión]"
    },
    {
        "spanish": "Nosotros oímos la música alegre en el pasillo",
        "english": "We heard the cheerful music in the aisle",
        "distractors": [
            "oemos",
            "oyen",
            "un"
        ],
        "hint": "Preterite form of oír for 1st person plural with an accent mark.",
        "syntaxBreakdown": "[Subject: Nosotros] + [Pretérito: oímos] + [Direct Object: la música alegre] + [Location: en el pasillo]"
    },
    {
        "spanish": "El cajero me dio el recibo y la vuelta",
        "english": "The cashier gave me the receipt and the change",
        "distractors": [
            "da",
            "le",
            "los"
        ],
        "hint": "Irregular preterite form of dar for 3rd person singular (monosyllable without accent).",
        "syntaxBreakdown": "[Subject: El cajero] + [IOP Pronoun: me] + [Pretérito irregular: dio] + [Direct Object: el recibo y la vuelta]"
    },
    {
        "spanish": "Ella se probó el vestido rojo en el probador",
        "english": "She tried on the red dress in the fitting room",
        "distractors": [
            "se prueba",
            "le",
            "vestidor"
        ],
        "hint": "Reflexive preterite form for 3rd person singular.",
        "syntaxBreakdown": "[Subject: Ella] + [Pronombre reflexivo: se] + [Pretérito: probó] + [Direct Object: el vestido rojo] + [Location: en el probador]"
    },
    {
        "spanish": "Compramos una docena de huevos en el pasillo central",
        "english": "We bought a dozen eggs in the central aisle",
        "distractors": [
            "compran",
            "medio",
            "la"
        ],
        "hint": "Preterite 1st person plural form with quantity expression.",
        "syntaxBreakdown": "[Preterite Verb: Compramos] + [Cantidad y OD: una docena de huevos] + [Location: en el pasillo central]"
    },
    {
        "spanish": "El cliente pidió la entrega urgente del paquete",
        "english": "The customer requested express delivery of the package",
        "distractors": [
            "pedió",
            "pide",
            "un"
        ],
        "hint": "Preterite stem changer (e -> i) for 3rd person singular.",
        "syntaxBreakdown": "[Subject: El cliente] + [Pretérito con cambio: pidió] + [Direct Object: la entrega urgente del paquete]"
    },
    {
        "spanish": "Separamos el reciclaje de la basura en la cocina",
        "english": "We separated the recycling from the trash in the kitchen",
        "distractors": [
            "separan",
            "por",
            "un"
        ],
        "hint": "Preterite regular -ar verb ending for 1st person plural.",
        "syntaxBreakdown": "[Preterite Verb: Separamos] + [Direct Object: el reciclaje de la basura] + [Location: en la cocina]"
    },
    {
        "spanish": "Dejé los trajes limpios en la tintorería",
        "english": "I dropped off the clean suits at the dry cleaners",
        "distractors": [
            "dejo",
            "dejó",
            "las"
        ],
        "hint": "Preterite regular -ar verb ending for 1st person singular (-é).",
        "syntaxBreakdown": "[Preterite Verb: Dejé] + [Direct Object: los trajes limpios] + [Location: en la tintorería]"
    },
    {
        "spanish": "Esta camisa de algodón cuesta treinta dólares",
        "english": "This cotton shirt costs thirty dollars",
        "distractors": [
            "costó",
            "cuestan",
            "el"
        ],
        "hint": "Stem-changing verb costar (o -> ue) in 3rd person singular.",
        "syntaxBreakdown": "[Subject: Esta camisa de algodón] + [Verbo: cuesta] + [Price: treinta dólares]"
    },
    {
        "spanish": "Nosotros compramos unos pantalones negros de lana",
        "english": "We bought some black wool pants",
        "distractors": [
            "compro",
            "compraron",
            "las"
        ],
        "hint": "Preterite regular -ar verb ending for 1st person plural.",
        "syntaxBreakdown": "[Subject: Nosotros] + [Preterite Verb: compramos] + [Direct Object: unos pantalones negros de lana]"
    },
    {
        "spanish": "Ayer mi hermana barrió el piso de la cocina",
        "english": "Yesterday my sister swept the kitchen floor",
        "distractors": [
            "barre",
            "barrieron",
            "un"
        ],
        "hint": "Preterite regular -er verb ending for 3rd person singular (-ió).",
        "syntaxBreakdown": "[Time: Ayer] + [Subject: mi hermana] + [Preterite Verb: barrió] + [Direct Object: el piso de la cocina]"
    },
    {
        "spanish": "Mi hermano pasó la aspiradora en la sala",
        "english": "My brother vacuumed in the living room",
        "distractors": [
            "pasa",
            "pasaron",
            "el"
        ],
        "hint": "Preterite regular -ar verb ending for 3rd person singular (-ó).",
        "syntaxBreakdown": "[Subject: Mi hermano] + [Preterite Verb: pasó] + [Direct Object: la aspiradora] + [Location: en la sala]"
    }
],

  // UNIT 4: Viajes, Transporte, Hoteles y Pronombres Dobles
  4: [
    {
        "spanish": "Nosotros viajamos a México en avión",
        "english": "We traveled to Mexico by plane",
        "distractors": [
            "viajo",
            "viajaron",
            "por"
        ],
        "hint": "Preterite travel verb with transport preposition 'en'",
        "syntaxBreakdown": "[Subject: Nosotros] + [Preterite Verb: viajamos] + [Destination: a México] + [Transport: en avión]"
    },
    {
        "spanish": "El pasajero mostró el pasaporte en el mostrador",
        "english": "The passenger showed the passport at the counter",
        "distractors": [
            "muestra",
            "la",
            "mostraron"
        ],
        "hint": "Completed past action with regular -ar ending for 3rd person singular (-ó).",
        "syntaxBreakdown": "[Subject: El pasajero] + [Preterite Verb: mostró] + [Direct Object: el pasaporte] + [Location: en el mostrador]"
    },
    {
        "spanish": "Ellos hicieron las maletas antes del viaje",
        "english": "They packed the suitcases before the trip",
        "distractors": [
            "hace",
            "hizo",
            "los"
        ],
        "hint": "Irregular preterite stem of hacer (hic-) for 3rd person plural.",
        "syntaxBreakdown": "[Subject: Ellos] + [Pretérito irregular: hicieron] + [Direct Object: las maletas] + [Time: antes del viaje]"
    },
    {
        "spanish": "Yo le di la tarjeta de embarque al agente",
        "english": "I gave the boarding pass to the agent",
        "distractors": [
            "les",
            "da",
            "el"
        ],
        "hint": "Irregular preterite of dar for 1st person singular with indirect pronoun.",
        "syntaxBreakdown": "[Subject: Yo] + [IOP Pronoun: le] + [Pretérito irregular: di] + [Direct Object: la tarjeta de embarque] + [Destinatario: al agente]"
    },
    {
        "spanish": "El huésped se puso furioso con el retraso del vuelo",
        "english": "The guest became furious with the flight delay",
        "distractors": [
            "volvió",
            "hizo",
            "pusieron"
        ],
        "hint": "Use 'ponerse' in preterite 3rd person singular for a sudden emotional change.",
        "syntaxBreakdown": "[Subject: El huésped] + [Pronombre reflexivo: se] + [Verb of Becoming: puso] + [Adjetivo de emoción: furioso] + [Cause: con el retraso del vuelo]"
    },
    {
        "spanish": "Él se pone rojo cuando habla en público",
        "english": "He turns red when he speaks in public",
        "distractors": [
            "vuelve",
            "hace",
            "puso"
        ],
        "hint": "Use 'ponerse' for effortless, involuntary physical reactions (blushing / turning red)",
        "syntaxBreakdown": "[Subject: Él] + [Pronombre reflexivo: se] + [Verb of Becoming: pone] + [Adjetivo: rojo] + [Condición: cuando habla en público]"
    },
    {
        "spanish": "Mi perro se vuelve loco cuando escucha truenos",
        "english": "My dog goes crazy when he hears thunder",
        "distractors": [
            "pone",
            "hace",
            "volvió"
        ],
        "hint": "Use 'volverse' for sudden, extreme involuntary behavioral or character transformations",
        "syntaxBreakdown": "[Subject: Mi perro] + [Pronombre reflexivo: se] + [Verbo de transformación: vuelve] + [Adjetivo extremo: loco] + [Condición: cuando escucha truenos]"
    },
    {
        "spanish": "La madre se volvió un ogro con las malas noticias",
        "english": "The mother turned into an ogre with the bad news",
        "distractors": [
            "puso",
            "hizo",
            "volverse"
        ],
        "hint": "Use 'volverse' (+ noun/extreme state) for drastic personality transformations",
        "syntaxBreakdown": "[Subject: La madre] + [Pronombre reflexivo: se] + [Verbo de transformación: volvió] + [Sustantivo extremo: un ogro] + [Cause: con las malas noticias]"
    },
    {
        "spanish": "Ella se hizo médica después de muchos años de estudio",
        "english": "She became a doctor after many years of study",
        "distractors": [
            "puso",
            "volvió",
            "dio"
        ],
        "hint": "Use 'hacerse' for career or professional achievements requiring conscious effort and time",
        "syntaxBreakdown": "[Subject: Ella] + [Pronombre reflexivo: se] + [Verbo de logro profesional: hizo] + [Profesión: médica] + [Tiempo y esfuerzo: después de muchos años de estudio]"
    },
    {
        "spanish": "El arquitecto llegó a ser muy famoso en su tiempo",
        "english": "The architect reached the status of being very famous in his time",
        "distractors": [
            "ponerse",
            "volverse",
            "hacerse"
        ],
        "hint": "Use 'llegar a ser' for long-term status achieved over an extended career",
        "syntaxBreakdown": "[Subject: El arquitecto] + [Verbo compuesto de logro: llegó a ser] + [Adjetivo: muy famoso] + [Time: en su tiempo]"
    },
    {
        "spanish": "Me di cuenta de que olvidé mi pasaporte en casa",
        "english": "I realized that I forgot my passport at home",
        "distractors": [
            "realicé",
            "puse",
            "hice"
        ],
        "hint": "Use 'darse cuenta de que' for mental realization ('I realized that...')",
        "syntaxBreakdown": "[Pronombre reflexivo: Me] + [Verbo: di cuenta de que] + [Cláusula subordinada: olvidé mi pasaporte en casa]"
    },
    {
        "spanish": "Ella solo se dio cuenta del error al llegar al aeropuerto",
        "english": "She only realized the error upon arriving at the airport",
        "distractors": [
            "realizó",
            "puso",
            "hizo"
        ],
        "hint": "Use 'darse cuenta de' (+ sustantivo) to denote becoming aware of a fact or mistake",
        "syntaxBreakdown": "[Subject: Ella] + [Adverbio: solo] + [Verbo de percatación: se dio cuenta del error] + [Time: al llegar al aeropuerto]"
    },
    {
        "spanish": "El escritor realizó su sueño de publicar una novela",
        "english": "The writer fulfilled his dream of publishing a novel",
        "distractors": [
            "se dio cuenta",
            "se puso",
            "se volvió"
        ],
        "hint": "¡Cognado falso! 'Realizar' means to fulfill or carry out a dream or project, NOT to realize mentally",
        "syntaxBreakdown": "[Subject: El escritor] + [Verbo de cumplimiento: realizó] + [Direct Object: su sueño de publicar una novela]"
    },
    {
        "spanish": "El botones se las subió a los huéspedes",
        "english": "The bellhop took them up for the guests",
        "distractors": [
            "le las",
            "les las",
            "se los"
        ],
        "hint": "Double object pronoun rule — indirect 'les' becomes 'se' before 3rd person direct object.",
        "syntaxBreakdown": "[Subject: El botones] + [Pronombre OI cambiado: se] + [DOP Pronoun: las] + [Preterite Verb: subió] + [Destinatario aclarado: a los huéspedes]"
    },
    {
        "spanish": "El recepcionista nos los mandó por correo electrónico",
        "english": "The receptionist sent them to us by email",
        "distractors": [
            "los nos",
            "les los",
            "se los"
        ],
        "hint": "Double object pronoun order — Indirect pronoun precedes Direct pronoun before the conjugated verb.",
        "syntaxBreakdown": "[Subject: El recepcionista] + [IOP Pronoun: nos] + [DOP Pronoun: los] + [Preterite Verb: mandó] + [Medio: por correo electrónico]"
    },
    {
        "spanish": "Tu padre sabe la noticia porque se la dije ayer",
        "english": "Your father knows the news because I told it to him yesterday",
        "distractors": [
            "le la",
            "la le",
            "se lo"
        ],
        "hint": "Double object pronoun rule — indirect 'le' becomes 'se' before 3rd person direct object.",
        "syntaxBreakdown": "[Cláusula 1: Tu padre sabe la noticia] + [Conector: porque] + [IOP Pronoun: se] + [DOP Pronoun: la] + [Preterite Verb: dije] + [Time: ayer]"
    },
    {
        "spanish": "Mamá va a dármela al entrar en el puesto de seguridad",
        "english": "Mom is going to give it to me when entering the security checkpoint",
        "distractors": [
            "darsela",
            "darle la",
            "darla me"
        ],
        "hint": "Attach both pronouns to the infinitive in Indirect + Direct order with an accent mark.",
        "syntaxBreakdown": "[Subject: Mamá] + [Perífrasis verbal: va a] + [Infinitivo con pronombres adjuntos: dármela] + [Time: al entrar en el puesto de seguridad]"
    },
    {
        "spanish": "Ayer nosotros anduvimos por toda la ciudad histórica",
        "english": "Yesterday we walked throughout the entire historic city",
        "distractors": [
            "andamos",
            "andaron",
            "para"
        ],
        "hint": "Irregular preterite stem anduv- for 1st person plural.",
        "syntaxBreakdown": "[Time: Ayer] + [Subject: nosotros] + [Pretérito irregular: anduvimos] + [Lugar y ruta: por toda la ciudad histórica]"
    },
    {
        "spanish": "El taxista condujo con cuidado hacia la estación de tren",
        "english": "The taxi driver drove carefully toward the train station",
        "distractors": [
            "condució",
            "conduje",
            "condujeron"
        ],
        "hint": "Irregular j-stem preterite — verbs in -ducir take j-stem with -o in 3rd person singular.",
        "syntaxBreakdown": "[Subject: El taxista] + [Pretérito irregular: condujo] + [Modo: con cuidado] + [Destination: hacia la estación de tren]"
    },
    {
        "spanish": "El conserje le pidió un taxi a la señora",
        "english": "The concierge called a taxi for the lady",
        "distractors": [
            "les",
            "lo",
            "se"
        ],
        "hint": "Singular indirect object pronoun 'le' redundant with 'a la señora'",
        "syntaxBreakdown": "[Subject: El conserje] + [IOP Pronoun: le] + [Pretérito con cambio: pidió] + [Direct Object: un taxi] + [Beneficiaria: a la señora]"
    },
    {
        "spanish": "Nosotros trajimos las maletas a la habitación triple",
        "english": "We brought the suitcases to the triple room",
        "distractors": [
            "traemos",
            "trajeron",
            "los"
        ],
        "hint": "Irregular preterite stem traj- for 1st person plural.",
        "syntaxBreakdown": "[Subject: Nosotros] + [Pretérito irregular: trajimos] + [Direct Object: las maletas] + [Destination: a la habitación triple]"
    },
    {
        "spanish": "El avión despegó a tiempo de la pista principal",
        "english": "The airplane took off on time from the main runway",
        "distractors": [
            "despega",
            "despegaron",
            "en"
        ],
        "hint": "Preterite regular -ar verb ending for 3rd person singular (-ó).",
        "syntaxBreakdown": "[Subject: El avión] + [Preterite Verb: despegó] + [Modo: a tiempo] + [Origen: de la pista principal]"
    },
    {
        "spanish": "Compré un billete de ida y vuelta para Madrid",
        "english": "I bought a round-trip ticket for Madrid",
        "distractors": [
            "compras",
            "una",
            "por"
        ],
        "hint": "Preterite regular -ar verb ending for 1st person singular (-é).",
        "syntaxBreakdown": "[Preterite Verb: Compré] + [Direct Object: un billete de ida y vuelta] + [Destination: para Madrid]"
    },
    {
        "spanish": "Ayer yo no pude encontrar mi pasaporte en la mochila",
        "english": "Yesterday I could not find my passport in the backpack",
        "distractors": [
            "puedo",
            "pudo",
            "el"
        ],
        "hint": "Irregular preterite stem pud- for 1st person singular (-e).",
        "syntaxBreakdown": "[Time: Ayer] + [Subject: yo] + [Negación: no] + [Pretérito irregular: pude] + [Infinitivo: encontrar] + [Direct Object: mi pasaporte en la mochila]"
    },
    {
        "spanish": "Ella tuvo que cancelar la reserva por mal tiempo",
        "english": "She had to cancel the reservation due to bad weather",
        "distractors": [
            "tiene",
            "para",
            "tuvieron"
        ],
        "hint": "Irregular preterite stem tuv- for 3rd person singular (-o).",
        "syntaxBreakdown": "[Subject: Ella] + [Pretérito irregular: tuvo que] + [Infinitivo: cancelar] + [Direct Object: la reserva] + [Causa con por: por mal tiempo]"
    },
    {
        "spanish": "Nosotros estuvimos en España durante las vacaciones de verano",
        "english": "We were in Spain during the summer vacation",
        "distractors": [
            "estamos",
            "estuvo",
            "por"
        ],
        "hint": "Irregular preterite stem estuv- for 1st person plural (-imos).",
        "syntaxBreakdown": "[Subject: Nosotros] + [Pretérito irregular: estuvimos] + [Location: en España] + [Time: durante las vacaciones de verano]"
    },
    {
        "spanish": "Ellos dijeron la verdad sobre el retraso del vuelo",
        "english": "They told the truth about the flight delay",
        "distractors": [
            "dicen",
            "dijo",
            "un"
        ],
        "hint": "Irregular j-stem preterite for 3rd person plural (ending -eron, not -ieron).",
        "syntaxBreakdown": "[Subject: Ellos] + [Pretérito irregular: dijeron] + [Direct Object: la verdad sobre el retraso del vuelo]"
    },
    {
        "spanish": "Yo puse los boletos de tren encima del escritorio",
        "english": "I put the train tickets on top of the desk",
        "distractors": [
            "pongo",
            "puso",
            "las"
        ],
        "hint": "Irregular preterite stem pus- for 1st person singular (-e).",
        "syntaxBreakdown": "[Subject: Yo] + [Pretérito irregular: puse] + [Direct Object: los boletos de tren] + [Location: encima del escritorio]"
    },
    {
        "spanish": "El recepcionista nos dio la llave de la habitación doble",
        "english": "The receptionist gave us the key to the double room",
        "distractors": [
            "da",
            "les",
            "un"
        ],
        "hint": "Irregular preterite of dar for 3rd person singular.",
        "syntaxBreakdown": "[Subject: El recepcionista] + [IOP Pronoun: nos] + [Pretérito irregular: dio] + [Direct Object: la llave de la habitación doble]"
    },
    {
        "spanish": "El botones llevó las maletas pesadas en el ascensor",
        "english": "The bellhop carried the heavy suitcases in the elevator",
        "distractors": [
            "lleva",
            "pesado",
            "los"
        ],
        "hint": "Preterite regular -ar verb ending for 3rd person singular (-ó).",
        "syntaxBreakdown": "[Subject: El botones] + [Preterite Verb: llevó] + [Direct Object: las maletas pesadas] + [Location: en el ascensor]"
    }
  ],
  5: [
  {
    "spanish": "Mi hermano mira los dibujos animados en el televisor",
    "english": "My brother watches cartoons on the television set",
    "distractors": [
      "miran",
      "la",
      "animado"
    ],
    "hint": "Subject and verb agreement for third person singular with direct object noun phrase.",
    "syntaxBreakdown": "[Subject: Mi hermano] + [Verb: mira] + [Direct Object: los dibujos animados] + [Location: en el televisor]"
  },
  {
    "spanish": "Nosotros descargamos aplicaciones nuevas en el portátil",
    "english": "We download new applications on the laptop",
    "distractors": [
      "descarga",
      "nuevo",
      "la"
    ],
    "hint": "First person plural nosotros verb ending in present tense and feminine plural adjective agreement.",
    "syntaxBreakdown": "[Subject: Nosotros] + [Verb: descargamos] + [Direct Object (fem. pl.): aplicaciones nuevas] + [Location: en el portátil]"
  },
  {
    "spanish": "Ella prefiere ver una película romántica en el cine",
    "english": "She prefers to watch a romantic movie at the movie theater",
    "distractors": [
      "prefiero",
      "un",
      "romántico"
    ],
    "hint": "Stem-changing modal verb followed directly by an infinitive verb.",
    "syntaxBreakdown": "[Subject: Ella] + [Stem-Changing Verb: prefiere] + [Infinitive: ver] + [Direct Object: una película romántica] + [Location: en el cine]"
  },
  {
    "spanish": "Los estudiantes buscan información en los sitios web",
    "english": "The students search for information on websites",
    "distractors": [
      "busca",
      "el",
      "sitio"
    ],
    "hint": "Third person plural verb ending with plural prepositional phrase.",
    "syntaxBreakdown": "[Subject: Los estudiantes] + [Verb: buscan] + [Direct Object: información] + [Prepositional Phrase: en los sitios web]"
  },
  {
    "spanish": "Mi papá escucha el noticiero en la radio por la mañana",
    "english": "My dad listens to the news on the radio in the morning",
    "distractors": [
      "escucho",
      "un",
      "los"
    ],
    "hint": "Third person singular verb with feminine radio signal and time expression.",
    "syntaxBreakdown": "[Subject: Mi papá] + [Verb: escucha] + [Direct Object: el noticiero] + [Location: en la radio] + [Time: por la mañana]"
  },
  {
    "spanish": "Yo leo novelas interesantes en mi libro electrónico",
    "english": "I read interesting novels on my e-book reader",
    "distractors": [
      "lee",
      "interesante",
      "el"
    ],
    "hint": "First person yo form with plural adjective modifying novelas.",
    "syntaxBreakdown": "[Subject: Yo] + [Verb: leo] + [Direct Object: novelas interesantes] + [Location: en mi libro electrónico]"
  },
  {
    "spanish": "Nosotros disfrutamos de videos divertidos en la tableta",
    "english": "We enjoy fun videos on the tablet",
    "distractors": [
      "disfruto",
      "divertido",
      "el"
    ],
    "hint": "Verb disfrutar followed by preposition de and masculine plural adjective agreement.",
    "syntaxBreakdown": "[Subject: Nosotros] + [Verb Phrase: disfrutamos de] + [Direct Object: videos divertidos] + [Location: en la tableta]"
  },
  {
    "spanish": "Ella chatea con sus amigas por las redes sociales",
    "english": "She chats with her friends through social networks",
    "distractors": [
      "chateo",
      "su",
      "los"
    ],
    "hint": "Third person singular verb with plural possessive and medium preposition.",
    "syntaxBreakdown": "[Subject: Ella] + [Verb: chatea] + [Prepositional Phrase: con sus amigas] + [Means (por): por las redes sociales]"
  },
  {
    "spanish": "Cuando era niña yo siempre veía los dibujos animados",
    "english": "When I was a little girl I always used to watch cartoons",
    "distractors": [
      "fui",
      "vi",
      "el"
    ],
    "hint": "Imperfect tense of ser and ver for ongoing background descriptions and childhood routines.",
    "syntaxBreakdown": "[Time Clause: Cuando era niña] + [Subject: yo] + [Frequency: siempre] + [Imperfect Verb: veía] + [Direct Object: los dibujos animados]"
  },
  {
    "spanish": "En aquellos tiempos la gente alquilaba películas en la tienda",
    "english": "In those days people used to rent movies at the store",
    "distractors": [
      "alquiló",
      "el",
      "tiendas"
    ],
    "hint": "Time expression indicating past era paired with imperfect verb for collective singular noun.",
    "syntaxBreakdown": "[Time Phrase: En aquellos tiempos] + [Subject: la gente] + [Imperfect Verb (-aba): alquilaba] + [Direct Object: películas] + [Location: en la tienda]"
  },
  {
    "spanish": "Mi abuelo no usaba ni computadora ni teléfono móvil",
    "english": "My grandfather used neither a computer nor a cell phone",
    "distractors": [
      "usó",
      "o",
      "un"
    ],
    "hint": "Correlative negative conjunction paired with pre-verbal negative adverb and imperfect verb.",
    "syntaxBreakdown": "[Subject: Mi abuelo] + [Negative + Imperfect: no usaba] + [Correlative Negatives: ni computadora ni teléfono móvil]"
  },
  {
    "spanish": "Mi familia siempre pasaba las vacaciones de verano en la playa",
    "english": "My family always spent summer vacation at the beach",
    "distractors": [
      "pasó",
      "el",
      "veranos"
    ],
    "hint": "Imperfect past tense for recurring annual family vacations.",
    "syntaxBreakdown": "[Subject: Mi familia] + [Frequency: siempre] + [Imperfect Verb: pasaba] + [Direct Object: las vacaciones de verano] + [Location: en la playa]"
  },
  {
    "spanish": "Yo chateaba por internet mientras mi hermano montaba en bicicleta",
    "english": "I was chatting online while my brother was riding a bicycle",
    "distractors": [
      "chateé",
      "montó",
      "un"
    ],
    "hint": "Two simultaneous ongoing past actions connected by the conjunction mientras.",
    "syntaxBreakdown": "[Clause 1: Yo chateaba por internet] + [Conjunction: mientras] + [Clause 2: mi hermano montaba en bicicleta]"
  },
  {
    "spanish": "Cuando éramos pequeños nosotros jugábamos videojuegos en el Atari",
    "english": "When we were little we used to play video games on the Atari",
    "distractors": [
      "fuimos",
      "jugamos",
      "los"
    ],
    "hint": "Written accent mark on the nosotros imperfect forms for both ser and jugar.",
    "syntaxBreakdown": "[Time Clause: Cuando éramos pequeños] + [Subject: nosotros] + [Imperfect Verb: jugábamos] + [Direct Object: videojuegos] + [Location: en el Atari]"
  },
  {
    "spanish": "Antes del internet los estudiantes tenían que ir a la biblioteca",
    "english": "Before the internet students had to go to the library",
    "distractors": [
      "tuvieron",
      "el",
      "bibliotecas"
    ],
    "hint": "Imperfect form of tener que expressing past routine obligation.",
    "syntaxBreakdown": "[Time Phrase: Antes del internet] + [Subject: los estudiantes] + [Imperfect Obligation: tenían que ir] + [Destination: a la biblioteca]"
  },
  {
    "spanish": "En aquellos años no había teléfonos móviles con pantalla táctil",
    "english": "In those years there were no mobile phones with touch screens",
    "distractors": [
      "hubo",
      "el",
      "pantallas"
    ],
    "hint": "Impersonal imperfect haber describes ongoing past existence and takes singular form.",
    "syntaxBreakdown": "[Time Phrase: En aquellos años] + [Imperfect Haber: no había] + [Noun Phrase: teléfonos móviles] + [Prepositional Modifier: con pantalla táctil]"
  },
  {
    "spanish": "Nadie compra libros impresos en la tienda hoy en día",
    "english": "Nobody buys printed books in the store nowadays",
    "distractors": [
      "alguien",
      "compran",
      "el"
    ],
    "hint": "Negative subject preceding the verb takes singular third person agreement without no.",
    "syntaxBreakdown": "[Negative Subject: Nadie] + [Verb (sing.): compra] + [Direct Object: libros impresos] + [Location: en la tienda] + [Time: hoy en día]"
  },
  {
    "spanish": "Yo no tengo ningún libro electrónico en mi tableta",
    "english": "I do not have any e-book on my tablet",
    "distractors": [
      "ninguno",
      "tienen",
      "una"
    ],
    "hint": "Apocopation of negative adjective before a masculine singular noun.",
    "syntaxBreakdown": "[Subject: Yo] + [Negative Verb: no tengo] + [Apocopated Adjective: ningún libro electrónico] + [Location: en mi tableta]"
  },
  {
    "spanish": "Mi hermano no quiere ver nada en la televisión",
    "english": "My brother does not want to watch anything on television",
    "distractors": [
      "algo",
      "quieren",
      "un"
    ],
    "hint": "Double negative construction with negative pronoun placed after the infinitive verb.",
    "syntaxBreakdown": "[Subject: Mi hermano] + [Negative Modal: no quiere] + [Infinitive: ver] + [Negative Pronoun: nada] + [Location: en la televisión]"
  },
  {
    "spanish": "Nosotros no tenemos ni computadora portátil ni tableta",
    "english": "We have neither a laptop nor a tablet",
    "distractors": [
      "o",
      "tenéis",
      "un"
    ],
    "hint": "Correlative negative conjunction joins two coordinated noun objects.",
    "syntaxBreakdown": "[Subject: Nosotros] + [Negative Verb: no tenemos] + [Correlative Conjunctions: ni computadora portátil ni tableta]"
  },
  {
    "spanish": "No conozco a nadie en esta clase de tecnología",
    "english": "I do not know anyone in this technology class",
    "distractors": [
      "alguien",
      "conoce",
      "este"
    ],
    "hint": "Personal a precedes the negative personal pronoun when functioning as a direct object.",
    "syntaxBreakdown": "[Negative Verb: No conozco] + [Personal a + Direct Object: a nadie] + [Location: en esta clase de tecnología]"
  },
  {
    "spanish": "Ella no escucha la radio y yo no la escucho tampoco",
    "english": "She does not listen to the radio and I do not listen to it either",
    "distractors": [
      "también",
      "lo",
      "escuchas"
    ],
    "hint": "Negative adverb agrees with a preceding negative clause and uses direct object pronoun.",
    "syntaxBreakdown": "[Clause 1: Ella no escucha la radio] + [Connector: y] + [Clause 2: yo no la escucho tampoco]"
  },
  {
    "spanish": "Alguien llamó por teléfono pero nadie contestó la llamada",
    "english": "Someone called by phone but nobody answered the call",
    "distractors": [
      "ninguno",
      "llamaron",
      "el"
    ],
    "hint": "Contrast between affirmative personal pronoun and negative personal pronoun in preterite.",
    "syntaxBreakdown": "[Clause 1: Alguien llamó por teléfono] + [Connector: pero] + [Clause 2: nadie contestó la llamada]"
  },
  {
    "spanish": "El abuelo nunca usa las aplicaciones de mensajería instantánea",
    "english": "Grandfather never uses instant messaging applications",
    "distractors": [
      "siempre",
      "usó",
      "los"
    ],
    "hint": "Negative time adverb precedes the verb as a pre-verbal modifier.",
    "syntaxBreakdown": "[Subject: El abuelo] + [Negative Adverb: nunca] + [Verb: usa] + [Direct Object: las aplicaciones de mensajería instantánea]"
  },
  {
    "spanish": "Un enfermero es tan importante como un médico",
    "english": "A nurse is as important as a doctor",
    "distractors": [
      "tanto",
      "más",
      "el"
    ],
    "hint": "Comparison of equality with an adjective uses invariant comparative before como.",
    "syntaxBreakdown": "[Subject: Un enfermero] + [Copula: es] + [Comparative Equality: tan importante como] + [Reference: un médico]"
  },
  {
    "spanish": "El músico tiene tantos instrumentos como el cantante",
    "english": "The musician has as many instruments as the singer",
    "distractors": [
      "tan",
      "tanta",
      "que"
    ],
    "hint": "Comparative adjective matches masculine plural noun in gender and number before como.",
    "syntaxBreakdown": "[Subject: El músico] + [Verb: tiene] + [Comparative Noun: tantos instrumentos como] + [Reference: el cantante]"
  },
  {
    "spanish": "La trabajadora social tiene tanta paciencia como el psicólogo",
    "english": "The social worker has as much patience as the psychologist",
    "distractors": [
      "tanto",
      "tan",
      "que"
    ],
    "hint": "Comparative adjective matches feminine singular noun in gender and number.",
    "syntaxBreakdown": "[Subject: La trabajadora social] + [Verb: tiene] + [Comparative Noun: tanta paciencia como] + [Reference: el psicólogo]"
  },
  {
    "spanish": "Yo corro tanto como un deportista profesional",
    "english": "I run as much as a professional athlete",
    "distractors": [
      "tan",
      "más",
      "el"
    ],
    "hint": "Comparative equality directly following a verb uses fixed comparative phrase.",
    "syntaxBreakdown": "[Subject: Yo] + [Verb: corro] + [Verb Comparative: tanto como] + [Reference: un deportista profesional]"
  },
  {
    "spanish": "Rita Moreno tiene más premios que otras actrices",
    "english": "Rita Moreno has more awards than other actresses",
    "distractors": [
      "como",
      "menos",
      "el"
    ],
    "hint": "Comparative of inequality with a noun uses comparative word paired with que.",
    "syntaxBreakdown": "[Subject: Rita Moreno] + [Verb: tiene] + [Comparative Inequality: más premios que] + [Reference: otras actrices]"
  },
  {
    "spanish": "La enfermera estudia menos años que la médica especialista",
    "english": "The nurse studies fewer years than the specialist physician",
    "distractors": [
      "como",
      "poco",
      "el"
    ],
    "hint": "Comparative of inequality expressing fewer units uses comparative word paired with que.",
    "syntaxBreakdown": "[Subject: La enfermera] + [Verb: estudia] + [Comparative Inequality: menos años que] + [Reference: la médica especialista]"
  },
  {
    "spanish": "Ese portátil moderno cuesta más de quinientos dólares",
    "english": "That modern laptop costs more than five hundred dollars",
    "distractors": [
      "que",
      "como",
      "el"
    ],
    "hint": "Comparative of inequality modifying a numerical quantity requires preposition de instead of que.",
    "syntaxBreakdown": "[Subject: Ese portátil moderno] + [Verb: cuesta] + [Comparative with Number: más de quinientos dólares]"
  },
  {
    "spanish": "Esta nueva aplicación funciona mucho mejor que la versión anterior",
    "english": "This new application works much better than the previous version",
    "distractors": [
      "bien",
      "como",
      "el"
    ],
    "hint": "Irregular comparative form of bien is used with adverbial modifier and que.",
    "syntaxBreakdown": "[Subject: Esta nueva aplicación] + [Verb: funciona] + [Irregular Comparative: mucho mejor que] + [Reference: la versión anterior]"
  },
  {
    "spanish": "El usuario crea una contraseña segura para desbloquear su cuenta",
    "english": "The user creates a secure password to unlock their account",
    "distractors": ["bloquear", "seguro", "la"],
    "hint": "Third person singular verb with feminine direct object and purpose clause.",
    "syntaxBreakdown": "[Subject: El usuario] + [Verb: crea] + [Direct Object: una contraseña segura] + [Purpose: para desbloquear su cuenta]"
  },
  {
    "spanish": "Los jóvenes graban videos divertidos y los suben a internet",
    "english": "The youth record fun videos and upload them to the internet",
    "distractors": ["graba", "las", "un"],
    "hint": "Coordinated third person plural clauses with direct object pronoun replacement.",
    "syntaxBreakdown": "[Subject: Los jóvenes] + [Verb 1: graban] + [Direct Object: videos divertidos] + [Conjunction: y] + [Direct Object Pronoun: los] + [Verb 2: suben] + [Destination: a internet]"
  },
  {
    "spanish": "Mi prima ve el documental completo en su pantalla táctil",
    "english": "My cousin watches the full documentary on her touch screen",
    "distractors": ["ven", "un", "los"],
    "hint": "Singular subject pronoun agreement with masculine documentary object and location phrase.",
    "syntaxBreakdown": "[Subject: Mi prima] + [Verb: ve] + [Direct Object: el documental completo] + [Location: en su pantalla táctil]"
  },
  {
    "spanish": "Nosotros apagamos el televisor antes de ir a dormir",
    "english": "We turn off the television set before going to sleep",
    "distractors": ["apaga", "la", "un"],
    "hint": "First person plural present verb with direct object device and temporal prepositional infinitive.",
    "syntaxBreakdown": "[Subject: Nosotros] + [Verb: apagamos] + [Direct Object: el televisor] + [Time: antes de ir a dormir]"
  },
  {
    "spanish": "Cuando hacía frío en invierno nosotros nos quedábamos en casa",
    "english": "When it was cold in winter we used to stay at home",
    "distractors": ["hizo", "quedamos", "el"],
    "hint": "Imperfect weather expression with hacer paired with reflexive imperfect habitual verb.",
    "syntaxBreakdown": "[Time Clause: Cuando hacía frío en invierno] + [Subject: nosotros] + [Reflexive Verb: nos quedábamos] + [Location: en casa]"
  },
  {
    "spanish": "De niña mi hermana pequeña siempre tenía miedo de la oscuridad",
    "english": "As a little girl my little sister was always afraid of the dark",
    "distractors": ["tuvo", "tienen", "el"],
    "hint": "Idiomatic expression of physical or emotional sensation in the past with tener.",
    "syntaxBreakdown": "[Time Phrase: De niña] + [Subject: mi hermana pequeña] + [Adverb: siempre] + [Imperfect Verb: tenía] + [Object: miedo de la oscuridad]"
  },
  {
    "spanish": "El tren salía a las tres mientras los pasajeros esperaban",
    "english": "The train was departing at three while the passengers were waiting",
    "distractors": ["salió", "esperó", "un"],
    "hint": "Two simultaneous ongoing background actions in the past joined by the conjunction mientras.",
    "syntaxBreakdown": "[Subject 1: El tren] + [Imperfect Verb 1: salía] + [Time: a las tres] + [Conjunction: mientras] + [Subject 2: los pasajeros] + [Imperfect Verb 2: esperaban]"
  },
  {
    "spanish": "Mi abuela era muy generosa y siempre nos contaba historias",
    "english": "My grandmother was very generous and always used to tell us stories",
    "distractors": ["fue", "contó", "los"],
    "hint": "Descriptive character trait with imperfect ser paired with indirect object pronoun and habitual past telling.",
    "syntaxBreakdown": "[Subject: Mi abuela] + [Imperfect Copula: era] + [Predicate Adjective: muy generosa] + [Conjunction: y] + [Adverb: siempre] + [Indirect Pronoun: nos] + [Imperfect Verb: contaba] + [Direct Object: historias]"
  },
  {
    "spanish": "Nosotros no encontramos ninguna información útil en ese sitio web",
    "english": "We did not find any useful information on that website",
    "distractors": ["ningún", "alguna", "el"],
    "hint": "Negative adjective agrees with feminine singular noun información following a negated verb.",
    "syntaxBreakdown": "[Subject: Nosotros] + [Negation: no] + [Verb: encontramos] + [Direct Object (fem.): ninguna información útil] + [Location: en ese sitio web]"
  },
  {
    "spanish": "Nadie contestó el teléfono durante toda la tarde",
    "english": "Nobody answered the phone during the whole afternoon",
    "distractors": ["alguien", "contestaron", "un"],
    "hint": "Negative personal pronoun functions as pre-verbal subject and takes singular agreement without no.",
    "syntaxBreakdown": "[Subject: Nadie] + [Preterite Verb: contestó] + [Direct Object: el teléfono] + [Time: durante toda la tarde]"
  },
  {
    "spanish": "Mi hermano no quiere comer nada ni beber nada",
    "english": "My brother does not want to eat anything nor drink anything",
    "distractors": ["algo", "o", "un"],
    "hint": "Double negative construction coordinating two negated infinitives with the conjunction ni.",
    "syntaxBreakdown": "[Subject: Mi hermano] + [Negation: no] + [Verb: quiere] + [Infinitive 1: comer nada] + [Conjunction: ni] + [Infinitive 2: beber nada]"
  },
  {
    "spanish": "Viste algún mensaje nuevo en tu correo electrónico",
    "english": "You saw some new message in your email",
    "distractors": ["alguno", "ningún", "una"],
    "hint": "Affirmative statement before a masculine singular noun uses shortened apocopated adjective with written accent.",
    "syntaxBreakdown": "[Verb: Viste] + [Direct Object (masc. sing.): algún mensaje nuevo] + [Location: en tu correo electrónico]"
  },
  {
    "spanish": "El cocinero prepara tanta comida como la pastelera del restaurante",
    "english": "The cook prepares as much food as the restaurant pastry chef",
    "distractors": ["tanto", "tan", "que"],
    "hint": "Comparative adjective matches feminine singular noun comida in gender and number before como.",
    "syntaxBreakdown": "[Subject: El cocinero] + [Verb: prepara] + [Comparative Noun (fem. sing.): tanta comida como] + [Reference: la pastelera del restaurante]"
  },
  {
    "spanish": "Los bomberos son tan valientes como los policías de la ciudad",
    "english": "The firefighters are as brave as the city police officers",
    "distractors": ["tantos", "más", "el"],
    "hint": "Comparison of equality modifying a plural adjective uses invariant comparative word before como.",
    "syntaxBreakdown": "[Subject: Los bomberos] + [Copula: son] + [Comparative Adjective: tan valientes como] + [Reference: los policías de la ciudad]"
  },
  {
    "spanish": "Mi abuelo es mayor que mi padre por veinticinco años",
    "english": "My grandfather is older than my father by twenty-five years",
    "distractors": ["viejo", "como", "el"],
    "hint": "Irregular comparative adjective of age followed by comparative conjunction que and prepositional difference.",
    "syntaxBreakdown": "[Subject: Mi abuelo] + [Copula: es] + [Irregular Comparative: mayor que] + [Reference: mi padre] + [Difference: por veinticinco años]"
  },
  {
    "spanish": "El veterinario atiende a más de veinte animales cada día",
    "english": "The veterinarian cares for more than twenty animals every day",
    "distractors": ["que", "como", "un"],
    "hint": "Comparative expression of inequality directly modifying a numerical quantity requires preposition de.",
    "syntaxBreakdown": "[Subject: El veterinario] + [Verb: atiende] + [Comparative Quantity: a más de veinte animales] + [Frequency: cada día]"
  }
]
};

/**
 * Splits a sentence into word tokens, preserving clean casing.
 */
export function tokenizeSentence(sentenceStr) {
  if (!sentenceStr) return [];
  // Clean special punctuation attached to words for tile bank
  return sentenceStr
    .trim()
    .split(/\s+/)
    .map(w => w.replace(/[¿?¡!.,;:"]/g, ''))
    .filter(Boolean);
}

/**
 * Generates a sentence construction question for a target unit or from a specific item.
 * Supports:
 * - Spanish sentence construction from an English prompt (default)
 * - English sentence construction from a Spanish prompt
 */
export function generateSentenceBuilderQuestion(options = {}) {
  const unit = options.unit || 1;
  const pool = SENTENCE_POOLS[unit] || SENTENCE_POOLS[1];
  
  // Pick random sentence from the selected unit pool
  const chosen = options.sentenceItem || pool[Math.floor(Math.random() * pool.length)];
  
  // Target direction: "es" (construct Spanish) or "en" (construct English)
  // For placement test and standard exercises, building Spanish is primary
  const targetLanguage = options.targetLanguage || "es";
  
  const isTargetSpanish = targetLanguage === "es";
  const sourcePrompt = isTargetSpanish ? chosen.english : chosen.spanish;
  const fullSolution = isTargetSpanish ? chosen.spanish : chosen.english;
  
  const targetWords = tokenizeSentence(fullSolution);
  
  // Distractors
  const rawDistractors = isTargetSpanish 
    ? (chosen.distractors || ["el", "la", "un"]) 
    : ["the", "a", "is", "they"];
  
  // Build token objects with unique IDs for rock-solid React state management
  let tokenId = 0;
  const targetTokens = targetWords.map(word => ({
    id: `target-${tokenId++}-${word}`,
    text: word,
    isDistractor: false
  }));

  const distractorTokens = rawDistractors.slice(0, 3).map(word => ({
    id: `dist-${tokenId++}-${word}`,
    text: word,
    isDistractor: true
  }));

  // Combine and shuffle the word bank
  const allBankTokens = [...targetTokens, ...distractorTokens].sort(() => Math.random() - 0.5);

  return {
    isSentenceBuilder: true,
    unit,
    prompt: sourcePrompt,
    promptLanguage: isTargetSpanish ? "en" : "es",
    targetLanguage,
    targetSentence: fullSolution,
    targetWords,
    targetTokens,
    bankTokens: allBankTokens,
    distractors: rawDistractors,
    meaning: isTargetSpanish ? chosen.english : chosen.spanish,
    hint: chosen.hint || "Arrange the words in the correct grammatical order.",
    syntaxBreakdown: chosen.syntaxBreakdown || null
  };
}

/**
 * Validates whether the user's placed words match the target sentence.
 */
export function checkSentenceConstruction(placedTokens, targetWords) {
  if (!placedTokens || !targetWords) return false;
  if (placedTokens.length !== targetWords.length) return false;

  for (let i = 0; i < targetWords.length; i++) {
    const placedWord = (placedTokens[i]?.text || placedTokens[i] || "").trim().toLowerCase();
    const targetWord = (targetWords[i] || "").trim().toLowerCase();
    if (placedWord !== targetWord) return false;
  }

  return true;
}
