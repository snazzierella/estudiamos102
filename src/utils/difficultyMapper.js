// Progressive Stage Mapper and Difficulty Ratings for Spanish 102
export const TOTAL_STAGES = 8;

export const STAGES = {
  1: {
    name: "Unidad 1: Repaso de Español 101 (Comprehensive Review)",
    subcategories: [
      "Greetings, Goodbyes, & Conversation",
      "Articles",
      "Numbers",
      "Subject & Indirect Object Pronouns",
      "People and Professions",
      "Family",
      "Animals and Pets",
      "Classroom and Office",
      "Places in the City",
      "Colors",
      "The House and Furniture",
      "Tableware and Utensils",
      "Food and Drinks",
      "The University and Courses",
      "Time, Days, Months, and Seasons",
      "Weather and Nature",
      "Sports and Hobbies",
      "Other Common Nouns",
      "Conjunctions",
      "Physical Appearance",
      "Personality & Qualities",
      "Emotions & Conditions",
      "Nationalities",
      "Possessive & Quantitative Adjectives",
      "Weather Adjectives",
      "Miscellaneous Adjectives",
      "Regular -ar Verbs",
      "Regular -er Verbs",
      "Regular -ir Verbs",
      "Question Words",
      "Prepositions and Location Words",
      "Adverbs of Time and Frequency",
      "Other Useful Words",
      "Core Irregular Verbs",
      "Stem-Changing Verbs (o -> ue)",
      "Stem-Changing Verbs (e -> ie)",
      "Stem-Changing Verbs (e -> i)",
      "Irregular Yo Form Verbs",
      "Verbs for Knowing",
      "Verbs Structured Like Gustar",
      "Syllabus Sentences"
    ]
  },
  2: {
    name: "Unidad 2: ¿Qué haces todos los días? (Daily Routine, Health & Emotions)",
    subcategories: [
      "El Cuerpo Humano",
      "La Rutina Diaria y Verbos Reflexivos",
      "Adverbios de Frecuencia y Tiempo",
      "La Salud y Emergencias Médicas",
      "Emociones y Verbos Recíprocos",
      "Expresiones con Por y Para"
    ]
  },
  3: {
    name: "Unidad 3: Nosotros preferimos ir de compras (Shopping & Preterite Basics)",
    subcategories: [
      "Tareas y Quehaceres",
      "En la Tienda de Ropa y Compras",
      "En el Supermercado y En Línea",
      "Verbos en Pretérito"
    ]
  },
  4: {
    name: "Unidad 4: ¿Adónde fuiste de vacaciones? (Travel, Lodging & Object Pronouns)",
    subcategories: [
      "Viajes y Medios de Transporte",
      "Hoteles y Alojamiento",
      "Verbos de Cambio y Pretéritos Irregulares",
      "Pronombres de Objeto Indirecto y Doble Objeto"
    ]
  },
  5: {
    name: "Unidad 5: Próximamente (Coming Soon in Class)",
    subcategories: [
      "Unidad 5: Próximamente"
    ]
  },
  6: {
    name: "Unidad 6: Próximamente (Coming Soon in Class)",
    subcategories: [
      "Unidad 6: Próximamente"
    ]
  },
  7: {
    name: "Unidad 7: Próximamente (Coming Soon in Class)",
    subcategories: [
      "Unidad 7: Próximamente"
    ]
  },
  8: {
    name: "Unidad 8: Próximamente (Coming Soon in Class)",
    subcategories: [
      "Unidad 8: Próximamente"
    ]
  }
};

// Maps subcategory string to Stage Number
export function getStageForSubcategory(subcategory) {
  for (const [stageNum, stageInfo] of Object.entries(STAGES)) {
    if (stageInfo.subcategories.includes(subcategory)) {
      return parseInt(stageNum, 10);
    }
  }
  return TOTAL_STAGES; // default fallback
}

// Assigns word difficulty rating (1 to 5) for the adaptive placement test
export function getWordDifficulty(item) {
  const stage = getStageForSubcategory(item.subcategory);
  
  if (stage <= 1) return 1; // 101 Review
  if (stage <= 3) return 2; // Units 2-3
  if (stage <= 5) return 3; // Units 4-5
  if (stage <= 7) return 4; // Units 6-7
  return 5; // Unit 8
}

// Prefixes articles like 'the', 'a', 'an' to English translations based on Spanish article presence
export function formatEnglishPrompt(spanish, english) {
  const sp = spanish.trim().toLowerCase();
  const en = english.trim().toLowerCase();
  
  // Definite Articles
  if (sp.startsWith("el ") || sp.startsWith("la ") || sp.startsWith("los ") || sp.startsWith("las ")) {
    if (!en.startsWith("the ")) {
      return "the " + english;
    }
  }
  
  // Indefinite Singular Articles
  if (sp.startsWith("un ") || sp.startsWith("una ")) {
    if (!en.startsWith("a ") && !en.startsWith("an ")) {
      const firstChar = english.trim().toLowerCase().charAt(0);
      const isVowel = ['a', 'e', 'i', 'o', 'u'].includes(firstChar);
      return (isVowel ? "an " : "a ") + english;
    }
  }
  
  // Indefinite Plural Articles
  if (sp.startsWith("unos ") || sp.startsWith("unas ")) {
    if (!en.startsWith("some ")) {
      return "some " + english;
    }
  }
  
  return english;
}
