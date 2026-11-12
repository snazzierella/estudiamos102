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
      hint: "Subject + Verb + Object (feminine noun & adjective agreement)"
    },
    {
      spanish: "El muchacho tiene un perro negro",
      english: "The boy has a black dog",
      distractors: ["la", "tengo", "negra"],
      hint: "Check verb form for 'él' and masculine adjective agreement"
    },
    {
      spanish: "Nosotros vivimos en una casa grande",
      english: "We live in a big house",
      distractors: ["vivo", "el", "pequeño"],
      hint: "Remember the 'nosotros' -ir verb ending (-imos)"
    },
    {
      spanish: "Ellos quieren almorzar en la cafetería",
      english: "They want to eat lunch in the cafeteria",
      distractors: ["quiere", "el", "almuerzan"],
      hint: "Stem-changing verb 'querer' followed by an infinitive"
    },
    {
      spanish: "El estudiante hace la tarea en la biblioteca",
      english: "The student does homework in the library",
      distractors: ["hago", "un", "las"],
      hint: "Irregular verb 'hacer' with feminine direct object"
    },
    {
      spanish: "El maestro enseña la clase de español",
      english: "The teacher teaches the Spanish class",
      distractors: ["enseño", "un", "las"],
      hint: "Regular -ar verb ending for 3rd person singular"
    },
    {
      spanish: "Nosotros compramos pan en el mercado",
      english: "We buy bread in the market",
      distractors: ["compro", "la", "compran"],
      hint: "We buy = nosotros compramos"
    },
    {
      spanish: "Ella habla español muy bien",
      english: "She speaks Spanish very well",
      distractors: ["hablo", "el", "bueno"],
      hint: "Adverb 'bien' describes how she speaks"
    },
    {
      spanish: "Yo tengo que estudiar para el examen",
      english: "I have to study for the exam",
      distractors: ["tiene", "por", "un"],
      hint: "Tener que + infinitive expresses obligation"
    },
    {
      spanish: "A mí me gusta el café caliente",
      english: "I like hot coffee",
      distractors: ["gustan", "te", "la"],
      hint: "Use singular 'gusta' for singular coffee"
    },
    {
      spanish: "Mis amigos van al parque los domingos",
      english: "My friends go to the park on Sundays",
      distractors: ["va", "el", "las"],
      hint: "Ir a + el contracts to 'al'"
    },
    {
      spanish: "A qué hora es la clase de inglés",
      english: "What time is the English class",
      distractors: ["son", "en", "el"],
      hint: "Time question with 'es' for a singular event"
    },
    {
      spanish: "Los estudiantes leen muchos libros interesantes",
      english: "The students read many interesting books",
      distractors: ["lee", "mucho", "interesante"],
      hint: "3rd person plural verb ending (-en) and plural adjective agreement"
    },
    {
      spanish: "Yo sé la respuesta a la pregunta",
      english: "I know the answer to the question",
      distractors: ["conozco", "sabe", "el"],
      hint: "Use saber for facts/answers; irregular yo form is 'sé'"
    },
    {
      spanish: "Nosotros conocemos a la profesora nueva",
      english: "We know the new female teacher",
      distractors: ["sabemos", "conocen", "nuevo"],
      hint: "Use conocer with personal 'a' for people; feminine adjective"
    },
    {
      spanish: "A ellos les gustan las frutas frescas",
      english: "They like fresh fruits",
      distractors: ["gusta", "le", "fresco"],
      hint: "Use plural 'gustan' for plural fruits and indirect pronoun 'les'"
    },
    {
      spanish: "Tú duermes ocho horas todas las noches",
      english: "You sleep eight hours every night",
      distractors: ["duerme", "dormir", "todos"],
      hint: "Stem-changing verb dormir (o -> ue) for tú"
    },
    {
      spanish: "El profesor explica la lección difícil",
      english: "The professor explains the difficult lesson",
      distractors: ["explico", "un", "las"],
      hint: "Regular -ar verb ending (-a) with feminine noun agreement"
    },
    {
      spanish: "Mi familia y yo comemos juntos los domingos",
      english: "My family and I eat together on Sundays",
      distractors: ["come", "comen", "junto"],
      hint: "Mi familia y yo = nosotros (comemos)"
    },
    {
      spanish: "Ustedes pueden hablar con el director hoy",
      english: "You all can speak with the principal today",
      distractors: ["puedo", "puede", "hablan"],
      hint: "Modal verb poder (o -> ue) followed by an infinitive"
    },
    {
      spanish: "Yo salgo con mis amigos los fines de semana",
      english: "I go out with my friends on the weekends",
      distractors: ["sale", "el", "amigo"],
      hint: "Irregular yo form of salir: 'salgo'"
    },
    {
      spanish: "El agua fría está en el refrigerador",
      english: "The cold water is in the refrigerator",
      distractors: ["es", "frío", "los"],
      hint: "Agua is feminine (fría), uses estar for location"
    },
    {
      spanish: "Nosotros siempre decimos la verdad en casa",
      english: "We always tell the truth at home",
      distractors: ["decen", "dices", "el"],
      hint: "Irregular verb decir with nosotros ending (-imos)"
    },
    {
      spanish: "Ella prefiere tomar té por la mañana",
      english: "She prefers to drink tea in the morning",
      distractors: ["prefiero", "toma", "el"],
      hint: "Stem changer preferir (e -> ie) + infinitive"
    },
    {
      spanish: "Los niños juegan en el jardín grande",
      english: "The children play in the big garden",
      distractors: ["juega", "jugamos", "la"],
      hint: "Stem changer jugar (u -> ue) for plural ellos"
    },
    {
      spanish: "Yo pongo los libros en la mesa",
      english: "I put the books on the table",
      distractors: ["pone", "el", "las"],
      hint: "Irregular yo form of poner: 'pongo'"
    },
    {
      spanish: "Mi hermano menor pide ayuda con la tarea",
      english: "My younger brother asks for help with homework",
      distractors: ["pede", "pido", "el"],
      hint: "Stem changer pedir (e -> i) for 3rd person singular"
    },
    {
      spanish: "Dónde compras tú la ropa bonita",
      english: "Where do you buy pretty clothes",
      distractors: ["compra", "el", "bonito"],
      hint: "Question word with tú form of regular -ar verb"
    },
    {
      spanish: "Nosotros almorzamos en la cafetería a las doce",
      english: "We eat lunch in the cafeteria at twelve",
      distractors: ["almuerzan", "el", "almuerzo"],
      hint: "Remember the nosotros form (-amos) does not change stem for almorzar"
    },
    {
      spanish: "Tú tienes que hacer la tarea de matemáticas",
      english: "You have to do the math homework",
      distractors: ["hago", "por", "los"],
      hint: "Tener que + infinitive expresses obligation"
    },
    {
      spanish: "Mi hermana menor tiene quince años",
      english: "My younger sister is fifteen years old",
      distractors: ["es", "un", "hermano"],
      hint: "In Spanish, age uses tener (to have years), not ser"
    },
    {
      spanish: "A mi padre le gusta beber café con leche",
      english: "My father likes to drink coffee with milk",
      distractors: ["gustan", "me", "el"],
      hint: "Use le gusta before an infinitive verb (beber)"
    },
    {
      spanish: "Ellos entienden la lección de gramática hoy",
      english: "They understand the grammar lesson today",
      distractors: ["entiende", "un", "las"],
      hint: "Stem changer entender (e -> ie) for ellos"
    },
    {
      spanish: "Yo quiero pedir una hamburguesa con papas fritas",
      english: "I want to order a hamburger with french fries",
      distractors: ["quiere", "pido", "la"],
      hint: "First verb is conjugated (quiero), second is infinitive (pedir)"
    },
    {
      spanish: "Nosotros sabemos dónde está la biblioteca central",
      english: "We know where the central library is",
      distractors: ["conocemos", "saben", "el"],
      hint: "Use saber for facts/locations of places with interrogatives"
    },
    {
      spanish: "Tú conoces muy bien esta hermosa ciudad",
      english: "You know this beautiful city very well",
      distractors: ["sabes", "este", "bueno"],
      hint: "Use conocer to be acquainted with a city/place"
    },
    {
      spanish: "A qué hora empieza la fiesta de cumpleaños",
      english: "What time does the birthday party start",
      distractors: ["son", "en", "empiezan"],
      hint: "Stem changer empezar (e -> ie) for singular la fiesta"
    },
    {
      spanish: "El profesor repite las palabras difíciles para los estudiantes",
      english: "The professor repeats the difficult words for the students",
      distractors: ["repito", "difícil", "por"],
      hint: "Stem changer repetir (e -> i) with plural adjective agreement"
    }
  ],

  // UNIT 2: Rutina Diaria, Salud, Emociones, Verbos Reflexivos y Recíprocos
  2: [
    {
      spanish: "Yo me lavo las manos antes de comer",
      english: "I wash my hands before eating",
      distractors: ["te", "lava", "los"],
      hint: "Reflexive pronoun 'me' goes before conjugated verb 'lavo'"
    },
    {
      spanish: "Los dos amigos se abrazan cuando se ven",
      english: "The two friends hug each other when they see each other",
      distractors: ["nos", "abraza", "abrazarse"],
      hint: "Reciprocal action with plural pronoun 'se'"
    },
    {
      spanish: "Ella se cepilla los dientes después de cenar",
      english: "She brushes her teeth after dinner",
      distractors: ["me", "cepillan", "el"],
      hint: "Reflexive pronoun 'se' + singular verb 'cepilla'"
    },
    {
      spanish: "Nosotros nos ayudamos con la tarea de español",
      english: "We help each other with the Spanish homework",
      distractors: ["se", "ayudan", "para"],
      hint: "Reciprocal 'nosotros nos ayudamos'"
    },
    {
      spanish: "A Juan le duele la cabeza hoy",
      english: "Juan's head hurts today",
      distractors: ["duelen", "el", "les"],
      hint: "Doler uses singular 'duele' for one body part"
    },
    {
      spanish: "Ellos quieren besarse antes de salir",
      english: "They want to kiss each other before leaving",
      distractors: ["besan", "se", "nos"],
      hint: "Attach pronoun to the infinitive: 'besarse'"
    },
    {
      spanish: "Nosotros vamos a besarnos antes de salir",
      english: "We are going to kiss each other before leaving",
      distractors: ["se", "besarse", "besarme"],
      hint: "With nosotros in 'ir a + infinitive', attach 'nos' to the infinitive: besarnos (or say 'nos vamos a besar'). Never use 'se' or 'me' with nosotros!"
    },
    {
      spanish: "Nosotros nos vamos a besar antes de salir",
      english: "We are going to kiss each other before leaving",
      distractors: ["se", "besarse", "besarme"],
      hint: "Pronoun in front: 'Nosotros nos vamos a besar'. Since 'nos' is before 'vamos', keep the infinitive plain: 'besar' (never *nos vamos a besarnos or *se vamos a besar)!"
    },
    {
      spanish: "Los novios se van a besar en el altar",
      english: "The sweethearts are going to kiss each other at the altar",
      distractors: ["besarse", "nos", "vamos"],
      hint: "Pronoun before verb: 'se van a besar'. Since 'se' is already in front, do not attach it again (*se van a besarse) and don't omit 'a' (*se van besarse)!"
    },
    {
      spanish: "Los novios se quieren besar en el parque",
      english: "The sweethearts want to kiss each other in the park",
      distractors: ["besarse", "quiere", "nos"],
      hint: "Pronoun before modal verb: 'se quieren besar'. Keep the second verb as plain infinitive 'besar' (never *se quieren besarse)!"
    },
    {
      spanish: "Los dos amigos se van a abrazar en el aeropuerto",
      english: "The two friends are going to hug each other at the airport",
      distractors: ["abrazarse", "nos", "vamos"],
      hint: "Front pronoun: 'se van a abrazar'. Keep the infinitive plain 'abrazar' since 'se' is already before 'van'!"
    },
    {
      spanish: "Nosotros nos vamos a abrazar con alegría",
      english: "We are going to hug each other with joy",
      distractors: ["se", "abrazarse", "abrazarme"],
      hint: "Nosotros uses 'nos' before the verb: 'nos vamos a abrazar'. Never use 'se' or duplicate the pronoun!"
    },
    {
      spanish: "Nosotros vamos a abrazarnos con alegría",
      english: "We are going to hug each other with joy",
      distractors: ["se", "abrazarse", "abrazar"],
      hint: "Attach pronoun 'nos' to the infinitive: 'abrazarnos' (or say 'nos vamos a abrazar')."
    },
    {
      spanish: "Los dos estudiantes se van a conocer hoy",
      english: "The two students are going to meet each other today",
      distractors: ["conocerse", "nos", "vamos"],
      hint: "With pronoun before 'van', use plain infinitive: 'se van a conocer' (not *se van a conocerse)."
    },
    {
      spanish: "Nosotros nos tenemos que ayudar con la tarea",
      english: "We have to help each other with the homework",
      distractors: ["se", "ayudarnos", "ayuda"],
      hint: "Pronoun before modal: 'nos tenemos que ayudar'. Don't repeat 'nos' at the end!"
    },
    {
      spanish: "Nosotros tenemos que ayudarnos con la tarea",
      english: "We have to help each other with the homework",
      distractors: ["se", "ayudar", "ellos"],
      hint: "Attach pronoun to infinitive: 'ayudarnos' (or say 'nos tenemos que ayudar')."
    },
    {
      spanish: "Los amigos se van a despedir en la estación",
      english: "The friends are going to say goodbye to each other at the station",
      distractors: ["despedirse", "nos", "vamos"],
      hint: "Pronoun in front: 'se van a despedir'. Avoid double pronoun *se van a despedirse!"
    },
    {
      spanish: "Nosotros nos vamos a reunir en la cafetería",
      english: "We are going to meet up in the cafeteria",
      distractors: ["se", "reunirse", "reúnen"],
      hint: "Reciprocal for nosotros uses 'nos': 'nos vamos a reunir' or 'vamos a reunirnos'."
    },
    {
      spanish: "Yo me voy a acostar temprano esta noche",
      english: "I am going to go to bed early tonight",
      distractors: ["te", "acostarme", "acuesto"],
      hint: "With pronoun before 'voy', keep infinitive plain: 'me voy a acostar' (or 'voy a acostarme')."
    },
    {
      spanish: "Tú te tienes que lavar las manos antes de comer",
      english: "You have to wash your hands before eating",
      distractors: ["se", "lavarte", "lavas"],
      hint: "Front pronoun: 'te tienes que lavar'. Don't double the pronoun (*te tienes que lavarte)!"
    },
    {
      spanish: "Yo estudio español por dos horas todos los días",
      english: "I study Spanish for two hours every day",
      distractors: ["para", "estudia", "las"],
      hint: "Use 'por' for duration of time"
    },
    {
      spanish: "El regalo es para mi hermana menor",
      english: "The gift is for my younger sister",
      distractors: ["por", "la", "mis"],
      hint: "Use 'para' for a recipient"
    },
    {
      spanish: "Mis padres se conocieron en la universidad",
      english: "My parents met each other in college",
      distractors: ["nos", "conoció", "el"],
      hint: "Preterite reciprocal: 'se conocieron'"
    },
    {
      spanish: "Tú te despiertas temprano por la mañana",
      english: "You wake up early in the morning",
      distractors: ["se", "despierto", "para"],
      hint: "Stem-changing reflexive (e -> ie): 'te despiertas'"
    },
    {
      spanish: "Yo me despierto a las siete de la mañana",
      english: "I wake up at seven in the morning",
      distractors: ["te", "despierta", "por"],
      hint: "Stem-changing reflexive (e -> ie) with pronoun 'me'"
    },
    {
      spanish: "Mi hermano se levanta tarde los fines de semana",
      english: "My brother gets up late on weekends",
      distractors: ["me", "levantan", "el"],
      hint: "Reflexive pronoun 'se' with 3rd-person singular 'levanta'"
    },
    {
      spanish: "Nosotros nos duchamos con agua caliente",
      english: "We shower with hot water",
      distractors: ["se", "duchan", "ducha"],
      hint: "Nosotros requires the reflexive pronoun 'nos'"
    },
    {
      spanish: "Ella se viste rápidamente para ir a trabajar",
      english: "She gets dressed quickly to go to work",
      distractors: ["me", "visten", "por"],
      hint: "Stem-changing reflexive vestir (e -> i): 'se viste'"
    },
    {
      spanish: "Tú te acuestas temprano cuando tienes examen",
      english: "You go to bed early when you have an exam",
      distractors: ["se", "acuesto", "para"],
      hint: "Stem-changing reflexive acostar (o -> ue): 'te acuestas'"
    },
    {
      spanish: "Antes de acostarse los niños leen un cuento",
      english: "Before going to bed the children read a story",
      distractors: ["acostarme", "se acuestan", "acostar"],
      hint: "After a preposition (antes de), use infinitive with attached pronoun: acostarse"
    },
    {
      spanish: "Yo voy a lavarme la cara con jabón",
      english: "I am going to wash my face with soap",
      distractors: ["me lavo", "lavarse", "el"],
      hint: "With 'ir a + infinitive', attach pronoun 'me' to the end: lavarme"
    },
    {
      spanish: "A mi hermano le duele mucho la garganta hoy",
      english: "My brother's throat hurts a lot today",
      distractors: ["duelen", "me", "el"],
      hint: "Doler agrees with the singular body part: 'duele'"
    },
    {
      spanish: "El médico dice que debes tomar esta medicina por cinco días",
      english: "The doctor says you must take this medicine for five days",
      distractors: ["para", "digo", "este"],
      hint: "Use 'por' to express duration of time"
    },
    {
      spanish: "Nosotros nos sentimos muy cansados después de correr",
      english: "We feel very tired after running",
      distractors: ["se", "sienten", "cansado"],
      hint: "Sentirse expresses how one feels emotionally or physically"
    },
    {
      spanish: "Tengo fiebre y necesito descansar en la cama",
      english: "I have a fever and need to rest in bed",
      distractors: ["estoy", "un", "el"],
      hint: "Use tener for symptoms like fiebre (fever) and tos (cough)"
    },
    {
      spanish: "Ella toma té de manzanilla para aliviar el dolor de estómago",
      english: "She drinks chamomile tea to relieve the stomach ache",
      distractors: ["por", "los", "alivia"],
      hint: "Use 'para' before an infinitive to express purpose ('in order to')"
    },
    {
      spanish: "Los amigos se saludan con un apretón de manos",
      english: "The friends greet each other with a handshake",
      distractors: ["nos", "saluda", "saludarse"],
      hint: "Reciprocal action with plural subject (ellos se saludan)"
    },
    {
      spanish: "Mis abuelos se miran con mucho cariño y amor",
      english: "My grandparents look at each other with much affection and love",
      distractors: ["nos", "mira", "mirarse"],
      hint: "Reciprocal action (they look at each other): 'se miran'"
    },
    {
      spanish: "Los dos hermanos se abrazan con alegría en el aeropuerto",
      english: "The two brothers hug each other with joy at the airport",
      distractors: ["abrazamos", "abraza", "abrazarse"],
      hint: "Reciprocal verb 'abrazarse': plural brothers hug each other"
    },
    {
      spanish: "Nosotros nos vemos todos los días en la cafetería",
      english: "We see each other every day in the cafeteria",
      distractors: ["se", "ven", "ve"],
      hint: "Reciprocal action for we: 'nosotros nos vemos'"
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
        "hint": "Preterite of regular -ar verb comprar for yo (-é): 'compré'",
        "syntaxBreakdown": "[Adverbio de tiempo: Ayer] + [Verbo pretérito: compré] + [Objeto directo: una camisa azul] + [Lugar: en la tienda]"
    },
    {
        "spanish": "Nosotros lavamos los platos anoche",
        "english": "We washed the dishes last night",
        "distractors": [
            "lavan",
            "lavo",
            "el"
        ],
        "hint": "Preterite of regular -ar verb lavar for nosotros (-amos): 'lavamos'",
        "syntaxBreakdown": "[Sujeto: Nosotros] + [Verbo pretérito: lavamos] + [Objeto directo: los platos] + [Tiempo: anoche]"
    },
    {
        "spanish": "Ella fue al supermercado ayer por la tarde",
        "english": "She went to the supermarket yesterday afternoon",
        "distractors": [
            "va",
            "fueron",
            "el"
        ],
        "hint": "Irregular preterite of ir for ella: 'fue'",
        "syntaxBreakdown": "[Sujeto: Ella] + [Verbo pretérito: fue] + [Destino: al supermercado] + [Tiempo: ayer por la tarde]"
    },
    {
        "spanish": "Mis amigos limpiaron la casa esta mañana",
        "english": "My friends cleaned the house this morning",
        "distractors": [
            "limpia",
            "limpió",
            "el"
        ],
        "hint": "Preterite ending for ellos/ellas (-aron): 'limpiaron'",
        "syntaxBreakdown": "[Sujeto: Mis amigos] + [Verbo pretérito: limpiaron] + [Objeto directo: la casa] + [Tiempo: esta mañana]"
    },
    {
        "spanish": "Tú pagaste la ropa con tarjeta de crédito",
        "english": "You paid for the clothes with a credit card",
        "distractors": [
            "pagas",
            "pagó",
            "por"
        ],
        "hint": "Preterite -ar verb ending for tú (-aste): 'pagaste'",
        "syntaxBreakdown": "[Sujeto: Tú] + [Verbo pretérito: pagaste] + [Objeto directo: la ropa] + [Instrumento: con tarjeta de crédito]"
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
        "syntaxBreakdown": "[Tiempo: Ayer] + [Verbo 1: lavé los platos] + [Conjunción: y] + [Pronombre OD: los] + [Verbo 2: sequé]"
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
        "syntaxBreakdown": "[Sujeto: Mi padre] + [Verbo 1: sacó la basura] + [Conjunción: y] + [Pronombre OD: la] + [Verbo 2: llevó al contenedor]"
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
        "syntaxBreakdown": "[Negación: No] + [Verbo modal: debes] + [Infinitivo: barrer] + [Objeto directo: el piso] + [Tiempo: ahora]"
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
        "syntaxBreakdown": "[Negación: No] + [Pronombre OD: lo] + [Verbo modal: debes] + [Infinitivo: barrer] + [Tiempo: ahora]"
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
        "syntaxBreakdown": "[Negación: No] + [Verbo modal: debes] + [Infinitivo con OD adjunto: barrerlo] + [Tiempo: ahora]"
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
        "syntaxBreakdown": "[Sujeto: Mamá] + [Verbo pretérito: dejó] + ['a' personal + OD: a los niños] + [Lugar: en la escuela] + [Tiempo: esta mañana]"
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
        "syntaxBreakdown": "[Sujeto: Tía Sara] + [Verbo pretérito: llevó] + ['a' personal + OD: a su gato] + [Destino: al veterinario]"
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
        "syntaxBreakdown": "[Sujeto: Yo] + [Verbo pretérito: acompañé] + ['a' personal + OD: a mi abuela] + [Destino: al supermercado] + [Tiempo: ayer]"
    },
    {
        "spanish": "El camarero nos sirvió la comida caliente",
        "english": "The waiter served us the hot food",
        "distractors": [
            "servió",
            "sirve",
            "les"
        ],
        "hint": "Preterite stem changer: servir changes e -> i in 3rd person singular: 'sirvió'",
        "syntaxBreakdown": "[Sujeto: El camarero] + [Pronombre OI: nos] + [Pretérito con cambio de raíz: sirvió] + [Objeto directo: la comida caliente]"
    },
    {
        "spanish": "El cliente pidió salmón con verduras frescas",
        "english": "The customer ordered salmon with fresh vegetables",
        "distractors": [
            "pedió",
            "pide",
            "pidieron"
        ],
        "hint": "Preterite stem changer: pedir changes e -> i in 3rd person singular: 'pidió' (never 'pedió')",
        "syntaxBreakdown": "[Sujeto: El cliente] + [Pretérito con cambio de raíz: pidió] + [Objeto directo: salmón con verduras frescas]"
    },
    {
        "spanish": "Las dependientas las midieron con la cinta métrica",
        "english": "The store clerks measured them with the tape measure",
        "distractors": [
            "medieron",
            "miden",
            "los"
        ],
        "hint": "Preterite stem changer: medir changes e -> i in 3rd person plural: 'midieron'",
        "syntaxBreakdown": "[Sujeto: Las dependientas] + [Pronombre OD: las] + [Pretérito con cambio: midieron] + [Instrumento: con la cinta métrica]"
    },
    {
        "spanish": "Mi hermano pequeño durmió ocho horas anoche",
        "english": "My little brother slept eight hours last night",
        "distractors": [
            "dormió",
            "duerme",
            "dormiste"
        ],
        "hint": "Preterite stem changer: dormir changes o -> u in 3rd person singular: 'durmió' (never 'dormió')",
        "syntaxBreakdown": "[Sujeto: Mi hermano pequeño] + [Pretérito con cambio: durmió] + [Duración: ocho horas] + [Tiempo: anoche]"
    },
    {
        "spanish": "Ella prefirió comprar la falda rebajada",
        "english": "She preferred to buy the discounted skirt",
        "distractors": [
            "preferió",
            "prefiere",
            "el"
        ],
        "hint": "Preterite stem changer: preferir changes e -> i in 3rd person singular: 'prefirió'",
        "syntaxBreakdown": "[Sujeto: Ella] + [Pretérito con cambio: prefirió] + [Infinitivo: comprar] + [Objeto directo: la falda rebajada]"
    },
    {
        "spanish": "Yo busqué un buzón de correos en la calle",
        "english": "I looked for a mailbox on the street",
        "distractors": [
            "buscé",
            "buscó",
            "el"
        ],
        "hint": "Orthographic yo spelling change in preterite: -car changes to -qué: 'busqué'",
        "syntaxBreakdown": "[Sujeto: Yo] + [Pretérito ortográfico: busqué] + [Objeto directo: un buzón de correos] + [Lugar: en la calle]"
    },
    {
        "spanish": "Ayer yo pagué la cuenta en efectivo",
        "english": "Yesterday I paid the bill in cash",
        "distractors": [
            "pagé",
            "pagó",
            "por"
        ],
        "hint": "Orthographic yo spelling change in preterite: -gar changes to -gué: 'pagué'",
        "syntaxBreakdown": "[Tiempo: Ayer] + [Sujeto: yo] + [Pretérito ortográfico: pagué] + [Objeto directo: la cuenta] + [Modo: en efectivo]"
    },
    {
        "spanish": "Yo crucé la calle con mucho cuidado",
        "english": "I crossed the street very carefully",
        "distractors": [
            "cruzé",
            "cruzó",
            "el"
        ],
        "hint": "Orthographic yo spelling change in preterite: -zar changes to -cé: 'crucé'",
        "syntaxBreakdown": "[Sujeto: Yo] + [Pretérito ortográfico: crucé] + [Objeto directo: la calle] + [Modo: con mucho cuidado]"
    },
    {
        "spanish": "Yo empecé a estudiar después de cenar",
        "english": "I began to study after having dinner",
        "distractors": [
            "empezé",
            "empezó",
            "por"
        ],
        "hint": "Orthographic yo spelling change in preterite: empezar -> 'empecé a'",
        "syntaxBreakdown": "[Sujeto: Yo] + [Pretérito ortográfico: empecé a] + [Infinitivo: estudiar] + [Tiempo: después de cenar]"
    },
    {
        "spanish": "Ella leyó el periódico de ayer por la mañana",
        "english": "She read yesterday's newspaper in the morning",
        "distractors": [
            "leió",
            "lee",
            "un"
        ],
        "hint": "Intervocalic i -> y spelling change in preterite 3rd person: leer -> 'leyó'",
        "syntaxBreakdown": "[Sujeto: Ella] + [Pretérito intervocal: leyó] + [Objeto directo: el periódico de ayer] + [Tiempo: por la mañana]"
    },
    {
        "spanish": "Ellos creyeron las noticias de la televisión",
        "english": "They believed the news on television",
        "distractors": [
            "creieron",
            "creen",
            "una"
        ],
        "hint": "Intervocalic i -> y in preterite 3rd person plural: creer -> 'creyeron'",
        "syntaxBreakdown": "[Sujeto: Ellos] + [Pretérito intervocal: creyeron] + [Objeto directo: las noticias de la televisión]"
    },
    {
        "spanish": "Nosotros oímos la música alegre en el pasillo",
        "english": "We heard the cheerful music in the aisle",
        "distractors": [
            "oemos",
            "oyen",
            "un"
        ],
        "hint": "Preterite of oír for nosotros: 'oímos' (with accent mark on í)",
        "syntaxBreakdown": "[Sujeto: Nosotros] + [Pretérito: oímos] + [Objeto directo: la música alegre] + [Lugar: en el pasillo]"
    },
    {
        "spanish": "El cajero me dio el recibo y la vuelta",
        "english": "The cashier gave me the receipt and the change",
        "distractors": [
            "da",
            "le",
            "los"
        ],
        "hint": "Irregular preterite dar for 3rd person singular: 'dio' (no accent mark)",
        "syntaxBreakdown": "[Sujeto: El cajero] + [Pronombre OI: me] + [Pretérito irregular: dio] + [Objeto directo: el recibo y la vuelta]"
    },
    {
        "spanish": "Ella se probó el vestido rojo en el probador",
        "english": "She tried on the red dress in the fitting room",
        "distractors": [
            "se prueba",
            "le",
            "vestidor"
        ],
        "hint": "Reflexive preterite of probarse for ella: 'se probó'",
        "syntaxBreakdown": "[Sujeto: Ella] + [Pronombre reflexivo: se] + [Pretérito: probó] + [Objeto directo: el vestido rojo] + [Lugar: en el probador]"
    },
    {
        "spanish": "Compramos una docena de huevos en el pasillo central",
        "english": "We bought a dozen eggs in the central aisle",
        "distractors": [
            "compran",
            "medio",
            "la"
        ],
        "hint": "Preterite nosotros form: 'compramos' with quantity 'una docena de'",
        "syntaxBreakdown": "[Verbo pretérito: Compramos] + [Cantidad y OD: una docena de huevos] + [Lugar: en el pasillo central]"
    },
    {
        "spanish": "El cliente pidió la entrega urgente del paquete",
        "english": "The customer requested express delivery of the package",
        "distractors": [
            "pedió",
            "pide",
            "un"
        ],
        "hint": "Preterite stem changer: 'pidió' with store vocabulary 'la entrega urgente'",
        "syntaxBreakdown": "[Sujeto: El cliente] + [Pretérito con cambio: pidió] + [Objeto directo: la entrega urgente del paquete]"
    },
    {
        "spanish": "Separamos el reciclaje de la basura en la cocina",
        "english": "We separated the recycling from the trash in the kitchen",
        "distractors": [
            "separan",
            "por",
            "un"
        ],
        "hint": "Preterite of separar for nosotros: 'separamos'",
        "syntaxBreakdown": "[Verbo pretérito: Separamos] + [Objeto directo: el reciclaje de la basura] + [Lugar: en la cocina]"
    },
    {
        "spanish": "Dejé los trajes limpios en la tintorería",
        "english": "I dropped off the clean suits at the dry cleaners",
        "distractors": [
            "dejo",
            "dejó",
            "las"
        ],
        "hint": "Preterite of dejar for yo (-é): 'dejé'",
        "syntaxBreakdown": "[Verbo pretérito: Dejé] + [Objeto directo: los trajes limpios] + [Lugar: en la tintorería]"
    },
    {
        "spanish": "Esta camisa de algodón cuesta treinta dólares",
        "english": "This cotton shirt costs thirty dollars",
        "distractors": [
            "costó",
            "cuestan",
            "el"
        ],
        "hint": "Stem-changing verb costar in present tense: 'cuesta'",
        "syntaxBreakdown": "[Sujeto: Esta camisa de algodón] + [Verbo: cuesta] + [Precio: treinta dólares]"
    },
    {
        "spanish": "Nosotros compramos unos pantalones negros de lana",
        "english": "We bought some black wool pants",
        "distractors": [
            "compro",
            "compraron",
            "las"
        ],
        "hint": "Preterite of comprar for nosotros: 'compramos'",
        "syntaxBreakdown": "[Sujeto: Nosotros] + [Verbo pretérito: compramos] + [Objeto directo: unos pantalones negros de lana]"
    },
    {
        "spanish": "Ayer mi hermana barrió el piso de la cocina",
        "english": "Yesterday my sister swept the kitchen floor",
        "distractors": [
            "barre",
            "barrieron",
            "un"
        ],
        "hint": "Preterite of regular -er verb barrer for ella (-ió): 'barrió'",
        "syntaxBreakdown": "[Tiempo: Ayer] + [Sujeto: mi hermana] + [Verbo pretérito: barrió] + [Objeto directo: el piso de la cocina]"
    },
    {
        "spanish": "Mi hermano pasó la aspiradora en la sala",
        "english": "My brother vacuumed in the living room",
        "distractors": [
            "pasa",
            "pasaron",
            "el"
        ],
        "hint": "Preterite of pasar for él (-ó): 'pasó la aspiradora'",
        "syntaxBreakdown": "[Sujeto: Mi hermano] + [Verbo pretérito: pasó] + [Objeto directo: la aspiradora] + [Lugar: en la sala]"
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
        "syntaxBreakdown": "[Sujeto: Nosotros] + [Verbo pretérito: viajamos] + [Destino: a México] + [Medio de transporte: en avión]"
    },
    {
        "spanish": "El pasajero mostró el pasaporte en el mostrador",
        "english": "The passenger showed the passport at the counter",
        "distractors": [
            "muestra",
            "la",
            "mostraron"
        ],
        "hint": "Past action completed: 'mostró'",
        "syntaxBreakdown": "[Sujeto: El pasajero] + [Verbo pretérito: mostró] + [Objeto directo: el pasaporte] + [Lugar: en el mostrador]"
    },
    {
        "spanish": "Ellos hicieron las maletas antes del viaje",
        "english": "They packed the suitcases before the trip",
        "distractors": [
            "hace",
            "hizo",
            "los"
        ],
        "hint": "Irregular preterite stem (hic-): 'hicieron'",
        "syntaxBreakdown": "[Sujeto: Ellos] + [Pretérito irregular: hicieron] + [Objeto directo: las maletas] + [Tiempo: antes del viaje]"
    },
    {
        "spanish": "Yo le di la tarjeta de embarque al agente",
        "english": "I gave the boarding pass to the agent",
        "distractors": [
            "les",
            "da",
            "el"
        ],
        "hint": "Irregular preterite dar: 'yo di' with indirect pronoun 'le'",
        "syntaxBreakdown": "[Sujeto: Yo] + [Pronombre OI: le] + [Pretérito irregular: di] + [Objeto directo: la tarjeta de embarque] + [Destinatario: al agente]"
    },
    {
        "spanish": "El huésped se puso furioso con el retraso del vuelo",
        "english": "The guest became furious with the flight delay",
        "distractors": [
            "volvió",
            "hizo",
            "pusieron"
        ],
        "hint": "Use 'ponerse' for sudden emotional change: 'se puso furioso'",
        "syntaxBreakdown": "[Sujeto: El huésped] + [Pronombre reflexivo: se] + [Verbo de cambio: puso] + [Adjetivo de emoción: furioso] + [Causa: con el retraso del vuelo]"
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
        "syntaxBreakdown": "[Sujeto: Él] + [Pronombre reflexivo: se] + [Verbo de cambio: pone] + [Adjetivo: rojo] + [Condición: cuando habla en público]"
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
        "syntaxBreakdown": "[Sujeto: Mi perro] + [Pronombre reflexivo: se] + [Verbo de transformación: vuelve] + [Adjetivo extremo: loco] + [Condición: cuando escucha truenos]"
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
        "syntaxBreakdown": "[Sujeto: La madre] + [Pronombre reflexivo: se] + [Verbo de transformación: volvió] + [Sustantivo extremo: un ogro] + [Causa: con las malas noticias]"
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
        "syntaxBreakdown": "[Sujeto: Ella] + [Pronombre reflexivo: se] + [Verbo de logro profesional: hizo] + [Profesión: médica] + [Tiempo y esfuerzo: después de muchos años de estudio]"
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
        "syntaxBreakdown": "[Sujeto: El arquitecto] + [Verbo compuesto de logro: llegó a ser] + [Adjetivo: muy famoso] + [Tiempo: en su tiempo]"
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
        "syntaxBreakdown": "[Sujeto: Ella] + [Adverbio: solo] + [Verbo de percatación: se dio cuenta del error] + [Tiempo: al llegar al aeropuerto]"
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
        "syntaxBreakdown": "[Sujeto: El escritor] + [Verbo de cumplimiento: realizó] + [Objeto directo: su sueño de publicar una novela]"
    },
    {
        "spanish": "El botones se las subió a los huéspedes",
        "english": "The bellhop took them up for the guests",
        "distractors": [
            "le las",
            "les las",
            "se los"
        ],
        "hint": "Double object rule: indirect 'les' changes to 'se' before direct object 'las': 'se las subió'",
        "syntaxBreakdown": "[Sujeto: El botones] + [Pronombre OI cambiado: se] + [Pronombre OD: las] + [Verbo pretérito: subió] + [Destinatario aclarado: a los huéspedes]"
    },
    {
        "spanish": "El recepcionista nos los mandó por correo electrónico",
        "english": "The receptionist sent them to us by email",
        "distractors": [
            "los nos",
            "les los",
            "se los"
        ],
        "hint": "Double object order: Indirect (nos) + Direct (los): 'nos los mandó'",
        "syntaxBreakdown": "[Sujeto: El recepcionista] + [Pronombre OI: nos] + [Pronombre OD: los] + [Verbo pretérito: mandó] + [Medio: por correo electrónico]"
    },
    {
        "spanish": "Tu padre sabe la noticia porque se la dije ayer",
        "english": "Your father knows the news because I told it to him yesterday",
        "distractors": [
            "le la",
            "la le",
            "se lo"
        ],
        "hint": "Double object pronoun rule: indirect 'le' turns into 'se' before direct 'la': 'se la dije'",
        "syntaxBreakdown": "[Cláusula 1: Tu padre sabe la noticia] + [Conector: porque] + [Pronombre OI: se] + [Pronombre OD: la] + [Verbo pretérito: dije] + [Tiempo: ayer]"
    },
    {
        "spanish": "Mamá va a dármela al entrar en el puesto de seguridad",
        "english": "Mom is going to give it to me when entering the security checkpoint",
        "distractors": [
            "darsela",
            "darle la",
            "darla me"
        ],
        "hint": "Attach both pronouns to the infinitive maintaining Indirect + Direct order with accent: 'dármela'",
        "syntaxBreakdown": "[Sujeto: Mamá] + [Perífrasis verbal: va a] + [Infinitivo con pronombres adjuntos: dármela] + [Tiempo: al entrar en el puesto de seguridad]"
    },
    {
        "spanish": "Ayer nosotros anduvimos por toda la ciudad histórica",
        "english": "Yesterday we walked throughout the entire historic city",
        "distractors": [
            "andamos",
            "andaron",
            "para"
        ],
        "hint": "Irregular preterite stem anduv- for nosotros: 'anduvimos' (no accent)",
        "syntaxBreakdown": "[Tiempo: Ayer] + [Sujeto: nosotros] + [Pretérito irregular: anduvimos] + [Lugar y ruta: por toda la ciudad histórica]"
    },
    {
        "spanish": "El taxista condujo con cuidado hacia la estación de tren",
        "english": "The taxi driver drove carefully toward the train station",
        "distractors": [
            "condució",
            "conduje",
            "condujeron"
        ],
        "hint": "Irregular j-stem preterite: conducir -> 'condujo' for 3rd person singular",
        "syntaxBreakdown": "[Sujeto: El taxista] + [Pretérito irregular: condujo] + [Modo: con cuidado] + [Destino: hacia la estación de tren]"
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
        "syntaxBreakdown": "[Sujeto: El conserje] + [Pronombre OI: le] + [Pretérito con cambio: pidió] + [Objeto directo: un taxi] + [Beneficiaria: a la señora]"
    },
    {
        "spanish": "Nosotros trajimos las maletas a la habitación triple",
        "english": "We brought the suitcases to the triple room",
        "distractors": [
            "traemos",
            "trajeron",
            "los"
        ],
        "hint": "Irregular preterite stem traj- for nosotros: 'trajimos'",
        "syntaxBreakdown": "[Sujeto: Nosotros] + [Pretérito irregular: trajimos] + [Objeto directo: las maletas] + [Destino: a la habitación triple]"
    },
    {
        "spanish": "El avión despegó a tiempo de la pista principal",
        "english": "The airplane took off on time from the main runway",
        "distractors": [
            "despega",
            "despegaron",
            "en"
        ],
        "hint": "Preterite of despegar for 3rd person singular: 'despegó'",
        "syntaxBreakdown": "[Sujeto: El avión] + [Verbo pretérito: despegó] + [Modo: a tiempo] + [Origen: de la pista principal]"
    },
    {
        "spanish": "Compré un billete de ida y vuelta para Madrid",
        "english": "I bought a round-trip ticket for Madrid",
        "distractors": [
            "compras",
            "una",
            "por"
        ],
        "hint": "Preterite of comprar: 'compré' with destination 'para Madrid'",
        "syntaxBreakdown": "[Verbo pretérito: Compré] + [Objeto directo: un billete de ida y vuelta] + [Destino: para Madrid]"
    },
    {
        "spanish": "Ayer yo no pude encontrar mi pasaporte en la mochila",
        "english": "Yesterday I could not find my passport in the backpack",
        "distractors": [
            "puedo",
            "pudo",
            "el"
        ],
        "hint": "Irregular preterite stem pud- for yo: 'pude'",
        "syntaxBreakdown": "[Tiempo: Ayer] + [Sujeto: yo] + [Negación: no] + [Pretérito irregular: pude] + [Infinitivo: encontrar] + [Objeto directo: mi pasaporte en la mochila]"
    },
    {
        "spanish": "Ella tuvo que cancelar la reserva por mal tiempo",
        "english": "She had to cancel the reservation due to bad weather",
        "distractors": [
            "tiene",
            "para",
            "tuvieron"
        ],
        "hint": "Irregular preterite stem tuv- for ella: 'tuvo que cancelar'",
        "syntaxBreakdown": "[Sujeto: Ella] + [Pretérito irregular: tuvo que] + [Infinitivo: cancelar] + [Objeto directo: la reserva] + [Causa con por: por mal tiempo]"
    },
    {
        "spanish": "Nosotros estuvimos en España durante las vacaciones de verano",
        "english": "We were in Spain during the summer vacation",
        "distractors": [
            "estamos",
            "estuvo",
            "por"
        ],
        "hint": "Irregular preterite stem estuv- for nosotros: 'estuvimos'",
        "syntaxBreakdown": "[Sujeto: Nosotros] + [Pretérito irregular: estuvimos] + [Lugar: en España] + [Tiempo: durante las vacaciones de verano]"
    },
    {
        "spanish": "Ellos dijeron la verdad sobre el retraso del vuelo",
        "english": "They told the truth about the flight delay",
        "distractors": [
            "dicen",
            "dijo",
            "un"
        ],
        "hint": "Irregular preterite stem dij- for ellos: 'dijeron' (drops i before eron)",
        "syntaxBreakdown": "[Sujeto: Ellos] + [Pretérito irregular: dijeron] + [Objeto directo: la verdad sobre el retraso del vuelo]"
    },
    {
        "spanish": "Yo puse los boletos de tren encima del escritorio",
        "english": "I put the train tickets on top of the desk",
        "distractors": [
            "pongo",
            "puso",
            "las"
        ],
        "hint": "Irregular preterite stem pus- for yo: 'puse'",
        "syntaxBreakdown": "[Sujeto: Yo] + [Pretérito irregular: puse] + [Objeto directo: los boletos de tren] + [Lugar: encima del escritorio]"
    },
    {
        "spanish": "El recepcionista nos dio la llave de la habitación doble",
        "english": "The receptionist gave us the key to the double room",
        "distractors": [
            "da",
            "les",
            "un"
        ],
        "hint": "Irregular preterite dar for 3rd person singular: 'dio'",
        "syntaxBreakdown": "[Sujeto: El recepcionista] + [Pronombre OI: nos] + [Pretérito irregular: dio] + [Objeto directo: la llave de la habitación doble]"
    },
    {
        "spanish": "El botones llevó las maletas pesadas en el ascensor",
        "english": "The bellhop carried the heavy suitcases in the elevator",
        "distractors": [
            "lleva",
            "pesado",
            "los"
        ],
        "hint": "Preterite 3rd person singular: 'llevó'",
        "syntaxBreakdown": "[Sujeto: El botones] + [Verbo pretérito: llevó] + [Objeto directo: las maletas pesadas] + [Lugar: en el ascensor]"
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
