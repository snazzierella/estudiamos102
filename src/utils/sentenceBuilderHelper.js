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
      distractors: ["se", "duchan", "duchamos"],
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
      distractors: ["acostarse", "se acuestan", "acostar"],
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
      distractors: ["para", "dice", "este"],
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
      distractors: ["abrazan", "abraza", "abrazarse"],
      hint: "Reciprocal verb 'abrazarse': plural brothers hug each other"
    },
    {
      spanish: "Nosotros nos vemos todos los días en la cafetería",
      english: "We see each other every day in the cafeteria",
      distractors: ["se", "vemos", "ve"],
      hint: "Reciprocal action for we: 'nosotros nos vemos'"
    }
  ],

  // UNIT 3: De Compras, Ropa, Quehaceres y Verbos en Pretérito
  3: [
    {
      spanish: "Ayer compré una camisa azul en la tienda",
      english: "Yesterday I bought a blue shirt in the store",
      distractors: ["compro", "compró", "un"],
      hint: "Preterite yo form ending (-é) for -ar verbs"
    },
    {
      spanish: "Nosotros lavamos los platos anoche",
      english: "We washed the dishes last night",
      distractors: ["lavo", "las", "lavaron"],
      hint: "Past time marker 'anoche' with preterite 'lavamos'"
    },
    {
      spanish: "Ella fue al supermercado ayer por la tarde",
      english: "She went to the supermarket yesterday afternoon",
      distractors: ["va", "fueron", "el"],
      hint: "Irregular preterite of ir: 'ella fue'"
    },
    {
      spanish: "Mis amigos limpiaron la casa esta mañana",
      english: "My friends cleaned the house this morning",
      distractors: ["limpia", "limpió", "el"],
      hint: "Preterite 3rd person plural (-aron)"
    },
    {
      spanish: "Tú pagaste la ropa con tarjeta de crédito",
      english: "You paid for the clothes with a credit card",
      distractors: ["pagó", "pagas", "el"],
      hint: "Preterite tú form (-aste)"
    },
    {
      spanish: "Mi hermano pasó la aspiradora en la sala",
      english: "My brother vacuumed in the living room",
      distractors: ["pasa", "el", "pasaron"],
      hint: "Preterite 3rd person singular (-ó)"
    },
    {
      spanish: "Yo busqué los zapatos nuevos en el centro comercial",
      english: "I looked for the new shoes at the mall",
      distractors: ["buscó", "las", "busco"],
      hint: "Preterite yo spelling change (c -> qu): 'busqué'"
    },
    {
      spanish: "A ellos les gustó la comida del restaurante",
      english: "They liked the restaurant food",
      distractors: ["gustaron", "gusta", "la"],
      hint: "Gustar in preterite for singular food: 'gustó'"
    },
    {
      spanish: "Esta camisa de algodón cuesta treinta dólares",
      english: "This cotton shirt costs thirty dollars",
      distractors: ["cuestan", "este", "cuero"],
      hint: "Demonstrative 'esta' for feminine camisa; costar (o -> ue)"
    },
    {
      spanish: "Ella se probó el vestido rojo en el vestidor",
      english: "She tried on the red dress in the fitting room",
      distractors: ["se prueba", "la", "un"],
      hint: "Preterite of probarse for ella: 'se probó'"
    },
    {
      spanish: "Yo pagué en efectivo porque no tenía tarjeta",
      english: "I paid in cash because I did not have a card",
      distractors: ["pago", "pagó", "el"],
      hint: "Preterite spelling change for pagar (g -> gu): 'pagué'"
    },
    {
      spanish: "Nosotros compramos unos pantalones negros de lana",
      english: "We bought some black wool pants",
      distractors: ["compro", "negro", "la"],
      hint: "Preterite of comprar for nosotros: 'compramos'"
    },
    {
      spanish: "El dependiente me mostró los zapatos de cuero elegante",
      english: "The clerk showed me the elegant leather shoes",
      distractors: ["muestra", "te", "los"],
      hint: "Preterite 3rd-person singular: 'mostró'"
    },
    {
      spanish: "La tienda de ropa tiene rebajas fantásticas este fin de semana",
      english: "The clothing store has fantastic sales this weekend",
      distractors: ["tienen", "esta", "fantástico"],
      hint: "Agreement with feminine plural 'rebajas fantásticas'"
    },
    {
      spanish: "Tú encontraste una ganga increíble en el mercado",
      english: "You found an incredible bargain at the market",
      distractors: ["encuentras", "un", "increíbles"],
      hint: "Preterite -ar ending for tú: 'encontraste'"
    },
    {
      spanish: "Ayer mi hermana barrió el piso de la cocina",
      english: "Yesterday my sister swept the kitchen floor",
      distractors: ["barre", "el", "barrieron"],
      hint: "Preterite -er verb ending for 3rd person singular (-ió)"
    },
    {
      spanish: "Nosotros arreglamos los dormitorios antes de la fiesta",
      english: "We tidied the bedrooms before the party",
      distractors: ["arregla", "el", "arreglaron"],
      hint: "Preterite regular -ar ending for nosotros (-amos)"
    },
    {
      spanish: "Mi padre sacó la basura anoche después de la cena",
      english: "My father took out the trash last night after dinner",
      distractors: ["saca", "la", "sacaron"],
      hint: "Preterite 3rd person singular (-ó): 'sacó'"
    },
    {
      spanish: "Yo pasé la aspiradora por toda la casa ayer",
      english: "I vacuumed throughout the whole house yesterday",
      distractors: ["pasa", "para", "el"],
      hint: "Preterite yo ending (-é): 'pasé'"
    },
    {
      spanish: "Anoche comí pollo asado con verduras en el restaurante",
      english: "Last night I ate roast chicken with vegetables at the restaurant",
      distractors: ["como", "comió", "un"],
      hint: "Preterite -er verb ending for yo (-í): 'comí'"
    },
    {
      spanish: "Ellos escribieron una carta formal para el profesor",
      english: "They wrote a formal letter for the professor",
      distractors: ["escriben", "escribió", "por"],
      hint: "Preterite -ir verb ending for ellos (-ieron): 'escribieron'"
    },
    {
      spanish: "Yo empecé a estudiar español hace tres meses",
      english: "I began to study Spanish three months ago",
      distractors: ["empiezo", "empezó", "en"],
      hint: "Preterite spelling change (z -> c) for yo: 'empecé'"
    },
    {
      spanish: "Tú decidiste comprar el suéter verde y abrigado",
      english: "You decided to buy the warm green sweater",
      distractors: ["decides", "decidió", "la"],
      hint: "Preterite -ir verb ending for tú (-iste): 'decidiste'"
    },
    {
      spanish: "El sábado pasado bailamos salsa en la fiesta con amigos",
      english: "Last Saturday we danced salsa at the party with friends",
      distractors: ["bailan", "bailo", "el"],
      hint: "Past time marker 'el sábado pasado' with preterite 'bailamos'"
    }
  ],

  // UNIT 4: Viajes, Transporte, Hoteles y Pronombres Dobles
  4: [
    {
      spanish: "Nosotros viajamos a México en avión",
      english: "We traveled to Mexico by plane",
      distractors: ["viajo", "viajaron", "por"],
      hint: "Preterite travel verb with transport preposition 'en'"
    },
    {
      spanish: "El pasajero mostró el pasaporte en el mostrador",
      english: "The passenger showed the passport at the counter",
      distractors: ["muestra", "la", "mostraron"],
      hint: "Past action completed: 'mostró'"
    },
    {
      spanish: "Ellos hicieron las maletas antes del viaje",
      english: "They packed the suitcases before the trip",
      distractors: ["hace", "hizo", "los"],
      hint: "Irregular preterite stem (hic-): 'hicieron'"
    },
    {
      spanish: "Yo le di la tarjeta de embarque al agente",
      english: "I gave the boarding pass to the agent",
      distractors: ["les", "da", "el"],
      hint: "Irregular preterite dar: 'yo di'"
    },
    {
      spanish: "Nosotros nos quedamos en un hotel cómodo",
      english: "We stayed in a comfortable hotel",
      distractors: ["se", "quedan", "una"],
      hint: "Reflexive preterite 'nosotros nos quedamos'"
    },
    {
      spanish: "Tú encontraste tu asiento de ventanilla",
      english: "You found your window seat",
      distractors: ["encuentras", "pasillo", "la"],
      hint: "Preterite 'encontraste'"
    },
    {
      spanish: "El vuelo salió a tiempo esta tarde",
      english: "The flight departed on time this afternoon",
      distractors: ["sale", "salieron", "en"],
      hint: "Preterite of salir for singular flight: 'salió'"
    },
    {
      spanish: "Ella me lo explicó con calma",
      english: "She explained it to me calmly",
      distractors: ["te", "la", "explica"],
      hint: "Double object pronouns: Indirect (me) + Direct (lo)"
    },
    {
      spanish: "Nosotros pasamos por el control de seguridad del aeropuerto",
      english: "We went through the airport security checkpoint",
      distractors: ["pasa", "para", "los"],
      hint: "Preterite travel verb with preposition 'por'"
    },
    {
      spanish: "El avión aterrizó en la pista a las cinco de la tarde",
      english: "The plane landed on the runway at five in the afternoon",
      distractors: ["aterriza", "el", "aterrizaron"],
      hint: "Preterite singular: 'aterrizó'"
    },
    {
      spanish: "Yo facturé mi equipaje antes de subir al avión",
      english: "I checked my luggage before boarding the plane",
      distractors: ["facturo", "facturó", "la"],
      hint: "Preterite yo form (-é): 'facturé'"
    },
    {
      spanish: "El agente de aduanas revisó nuestras maletas cuidadosamente",
      english: "The customs agent inspected our suitcases carefully",
      distractors: ["revisa", "nuestro", "los"],
      hint: "Preterite 3rd-person singular: 'revisó'"
    },
    {
      spanish: "Tú compraste un boleto de ida y vuelta para Madrid",
      english: "You bought a round-trip ticket to Madrid",
      distractors: ["compras", "una", "por"],
      hint: "Preterite -ar ending for tú: 'compraste'"
    },
    {
      spanish: "El recepcionista nos dio la llave de la habitación doble",
      english: "The receptionist gave us the key to the double room",
      distractors: ["da", "les", "el"],
      hint: "Irregular preterite dar for 3rd person singular: 'dio'"
    },
    {
      spanish: "Nosotros reservamos una habitación con vista al mar",
      english: "We reserved a room with an ocean view",
      distractors: ["reserva", "un", "reservaron"],
      hint: "Preterite 'nosotros reservamos'"
    },
    {
      spanish: "El botones llevó las maletas pesadas en el ascensor",
      english: "The bellhop carried the heavy suitcases in the elevator",
      distractors: ["lleva", "pesado", "los"],
      hint: "Preterite 3rd person singular: 'llevó'"
    },
    {
      spanish: "Ayer yo no pude encontrar mi pasaporte en la mochila",
      english: "Yesterday I could not find my passport in the backpack",
      distractors: ["puedo", "pudo", "el"],
      hint: "Irregular preterite stem pud- for yo: 'pude'"
    },
    {
      spanish: "Ella tuvo que cancelar la reserva por mal tiempo",
      english: "She had to cancel the reservation due to bad weather",
      distractors: ["tiene", "para", "tuvieron"],
      hint: "Irregular preterite stem tuv- for ella: 'tuvo'"
    },
    {
      spanish: "Nosotros estuvimos en España durante las vacaciones de verano",
      english: "We were in Spain during the summer vacation",
      distractors: ["estamos", "estuvo", "por"],
      hint: "Irregular preterite stem estuv- for nosotros: 'estuvimos'"
    },
    {
      spanish: "Ellos dijeron la verdad sobre el retraso del vuelo",
      english: "They told the truth about the flight delay",
      distractors: ["dicen", "dijo", "el"],
      hint: "Irregular preterite stem dij- for ellos: 'dijeron'"
    },
    {
      spanish: "Yo puse los boletos de tren encima del escritorio",
      english: "I put the train tickets on top of the desk",
      distractors: ["pongo", "puso", "las"],
      hint: "Irregular preterite stem pus- for yo: 'puse'"
    },
    {
      spanish: "El camarero se la sirvió caliente a los clientes",
      english: "The waiter served it hot to the customers",
      distractors: ["le", "lo", "sirve"],
      hint: "Double object pronoun: indirect 'le' changes to 'se' before 'la'"
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
    hint: chosen.hint || "Arrange the words in the correct grammatical order."
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
