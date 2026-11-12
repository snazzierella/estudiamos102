// scripts/update-syntax-breakdowns.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const helperPath = path.resolve(__dirname, '../src/utils/sentenceBuilderHelper.js');

let content = fs.readFileSync(helperPath, 'utf8');

// UNIT 1 breakdowns map by spanish string
const unit1Breakdowns = {
  "La mujer come una manzana roja": "[Subject: La mujer] + [Present Verb: come] + [Direct Object (fem. sing.): una manzana roja]",
  "El muchacho tiene un perro negro": "[Subject: El muchacho] + [Present Verb: tiene] + [Direct Object (masc. sing.): un perro negro]",
  "Nosotros vivimos en una casa grande": "[Subject: Nosotros] + [Present Verb (-ir): vivimos] + [Prepositional Phrase / Location: en una casa grande]",
  "Ellos quieren almorzar en la cafetería": "[Subject: Ellos] + [Stem-Changing Verb (e->ie): quieren] + [Infinitive: almorzar] + [Location: en la cafetería]",
  "El estudiante hace la tarea en la biblioteca": "[Subject: El estudiante] + [Irregular Verb (hacer): hace] + [Direct Object: la tarea] + [Location: en la biblioteca]",
  "El maestro enseña la clase de español": "[Subject: El maestro] + [Present Verb (-ar): enseña] + [Direct Object: la clase de español]",
  "Nosotros compramos pan en el mercado": "[Subject: Nosotros] + [Present Verb: compramos] + [Direct Object: pan] + [Location: en el mercado]",
  "Ella habla español muy bien": "[Subject: Ella] + [Present Verb: habla] + [Direct Object: español] + [Adverb of Manner: muy bien]",
  "Yo tengo que estudiar para el examen": "[Subject: Yo] + [Obligation: tengo que estudiar] + [Purpose / Goal (para): para el examen]",
  "A mí me gusta el café caliente": "[Clarifier: A mí] + [Indirect Object Pronoun: me] + [Gustar Verb (sing.): gusta] + [Subject: el café caliente]",
  "Mis amigos van al parque los domingos": "[Subject: Mis amigos] + [Irregular Verb (ir): van] + [Contraction (a + el): al parque] + [Time Expression: los domingos]",
  "A qué hora es la clase de inglés": "[Question Phrase: A qué hora] + [Verb (ser): es] + [Subject: la clase de inglés]",
  "Los estudiantes leen muchos libros interesantes": "[Subject: Los estudiantes] + [Present Verb: leen] + [Direct Object (pl.): muchos libros interesantes]",
  "Yo sé la respuesta a la pregunta": "[Subject: Yo] + [Irregular Verb (saber - facts): sé] + [Direct Object: la respuesta] + [Indirect Object / Direction: a la pregunta]",
  "Nosotros conocemos a la profesora nueva": "[Subject: Nosotros] + [Verb (conocer - people): conocemos] + [Personal 'a': a la profesora nueva]",
  "A ellos les gustan las frutas frescas": "[Clarifier: A ellos] + [Indirect Object Pronoun: les] + [Gustar Verb (pl.): gustan] + [Plural Subject: las frutas frescas]",
  "Tú duermes ocho horas todas las noches": "[Subject: Tú] + [Stem-Changing Verb (o->ue): duermes] + [Duration: ocho horas] + [Frequency: todas las noches]",
  "El profesor explica la lección difícil": "[Subject: El profesor] + [Present Verb: explica] + [Direct Object: la lección difícil]",
  "Mi familia y yo comemos juntos los domingos": "[Compound Subject: Mi familia y yo] + [Verb (nosotros): comemos] + [Adjective / Manner: juntos] + [Time: los domingos]",
  "Ustedes pueden hablar con el director hoy": "[Subject: Ustedes] + [Modal Verb (o->ue): pueden] + [Infinitive: hablar] + [Prepositional Phrase: con el director] + [Time: hoy]",
  "Yo salgo con mis amigos los fines de semana": "[Subject: Yo] + [Irregular 'yo' Verb: salgo] + [Accompaniment: con mis amigos] + [Time: los fines de semana]",
  "El agua fría está en el refrigerador": "[Subject: El agua fría] + [Verb (estar - location): está] + [Location: en el refrigerador]",
  "Nosotros siempre decimos la verdad en casa": "[Subject: Nosotros] + [Frequency Adverb: siempre] + [Irregular Verb (decir): decimos] + [Direct Object: la verdad] + [Location: en casa]",
  "Ella prefiere tomar té por la mañana": "[Subject: Ella] + [Stem-Changing Verb (e->ie): prefiere] + [Infinitive: tomar] + [Direct Object: té] + [Time (por): por la mañana]",
  "Los niños juegan en el jardín grande": "[Subject: Los niños] + [Stem-Changing Verb (u->ue): juegan] + [Location: en el jardín grande]",
  "Yo pongo los libros en la mesa": "[Subject: Yo] + [Irregular 'yo' Verb: pongo] + [Direct Object: los libros] + [Location: en la mesa]",
  "Mi hermano menor pide ayuda con la tarea": "[Subject: Mi hermano menor] + [Stem-Changing Verb (e->i): pide] + [Direct Object: ayuda] + [Prepositional Phrase: con la tarea]",
  "Dónde compras tú la ropa bonita": "[Question Word: Dónde] + [Present Verb: compras] + [Subject: tú] + [Direct Object: la ropa bonita]",
  "Nosotros almorzamos en la cafetería a las doce": "[Subject: Nosotros] + [Present Verb (no stem change in nosotros): almorzamos] + [Location: en la cafetería] + [Time: a las doce]",
  "Tú tienes que hacer la tarea de matemáticas": "[Subject: Tú] + [Obligation: tienes que hacer] + [Direct Object: la tarea de matemáticas]",
  "Mi hermana menor tiene quince años": "[Subject: Mi hermana menor] + [Age Verb (tener): tiene] + [Years: quince años]",
  "A mi padre le gusta beber café con leche": "[Clarifier: A mi padre] + [Indirect Object Pronoun: le] + [Gustar Verb (sing. before infinitive): gusta] + [Infinitive Phrase: beber café con leche]",
  "Ellos entienden la lección de gramática hoy": "[Subject: Ellos] + [Stem-Changing Verb (e->ie): entienden] + [Direct Object: la lección de gramática] + [Time: hoy]",
  "Yo quiero pedir una hamburguesa con papas fritas": "[Subject: Yo] + [Stem-Changing Verb (e->ie): quiero] + [Infinitive (e->i stem): pedir] + [Direct Object: una hamburguesa con papas fritas]",
  "Nosotros sabemos dónde está la biblioteca central": "[Subject: Nosotros] + [Verb (saber - facts): sabemos] + [Indirect Question / Location: dónde está la biblioteca central]",
  "Tú conoces muy bien esta hermosa ciudad": "[Subject: Tú] + [Verb (conocer - places): conoces] + [Adverb: muy bien] + [Direct Object: esta hermosa ciudad]",
  "A qué hora empieza la fiesta de cumpleaños": "[Question Phrase: A qué hora] + [Stem-Changing Verb (e->ie): empieza] + [Subject: la fiesta de cumpleaños]",
  "El profesor repite las palabras difíciles para los estudiantes": "[Subject: El profesor] + [Stem-Changing Verb (e->i): repite] + [Direct Object: las palabras difíciles] + [Beneficiary (para): para los estudiantes]"
};

// UNIT 2 breakdowns map by spanish string
const unit2Breakdowns = {
  "Yo me lavo las manos antes de comer": "[Subject: Yo] + [Reflexive Pronoun: me] + [Conjugated Verb: lavo] + [Direct Object (body part): las manos] + [Time Clause: antes de comer]",
  "Los dos amigos se abrazan cuando se ven": "[Subject: Los dos amigos] + [Reciprocal Pronoun: se] + [Reciprocal Verb: abrazan] + [Conjunction & Clause: cuando se ven]",
  "Ella se cepilla los dientes después de cenar": "[Subject: Ella] + [Reflexive Pronoun: se] + [Conjugated Verb: cepilla] + [Direct Object: los dientes] + [Time Clause: después de cenar]",
  "Nosotros nos ayudamos con la tarea de español": "[Subject: Nosotros] + [Reciprocal Pronoun: nos] + [Reciprocal Verb: ayudamos] + [Prepositional Phrase: con la tarea de español]",
  "A Juan le duele la cabeza hoy": "[Clarifier: A Juan] + [Indirect Object Pronoun: le] + [Verb of Pain (sing.): duele] + [Singular Subject: la cabeza] + [Time: hoy]",
  "Ellos quieren besarse antes de salir": "[Subject: Ellos] + [Modal Verb: quieren] + [Infinitive + Attached Reciprocal Pronoun: besarse] + [Time Clause: antes de salir]",
  "Nosotros vamos a besarnos antes de salir": "[Subject: Nosotros] + [Future Verb Phrase (ir a): vamos a] + [Infinitive + Attached Pronoun: besarnos] + [Time Clause: antes de salir]",
  "Nosotros nos vamos a besar antes de salir": "[Subject: Nosotros] + [Fronted Reciprocal Pronoun: nos] + [Future Verb Phrase: vamos a besar] + [Time Clause: antes de salir]",
  "Los novios se van a besar en el altar": "[Subject: Los novios] + [Fronted Reciprocal Pronoun: se] + [Future Verb Phrase: van a besar] + [Location: en el altar]",
  "Los novios se quieren besar en el parque": "[Subject: Los novios] + [Fronted Reciprocal Pronoun: se] + [Modal Verb: quieren] + [Plain Infinitive: besar] + [Location: en el parque]",
  "Los dos amigos se van a abrazar en el aeropuerto": "[Subject: Los dos amigos] + [Fronted Reciprocal Pronoun: se] + [Future Verb Phrase: van a abrazar] + [Location: en el aeropuerto]",
  "Nosotros nos vamos a abrazar con alegría": "[Subject: Nosotros] + [Fronted Reciprocal Pronoun: nos] + [Future Verb Phrase: vamos a abrazar] + [Manner: con alegría]",
  "Nosotros vamos a abrazarnos con alegría": "[Subject: Nosotros] + [Verb (ir a): vamos a] + [Infinitive + Attached Pronoun: abrazarnos] + [Manner: con alegría]",
  "Los dos estudiantes se van a conocer hoy": "[Subject: Los dos estudiantes] + [Fronted Reciprocal Pronoun: se] + [Future Verb Phrase: van a conocer] + [Time: hoy]",
  "Nosotros nos tenemos que ayudar con la tarea": "[Subject: Nosotros] + [Fronted Reciprocal Pronoun: nos] + [Obligation Phrase: tenemos que ayudar] + [Prepositional Phrase: con la tarea]",
  "Nosotros tenemos que ayudarnos con la tarea": "[Subject: Nosotros] + [Obligation Phrase: tenemos que] + [Infinitive + Attached Pronoun: ayudarnos] + [Prepositional Phrase: con la tarea]",
  "Los amigos se van a despedir en la estación": "[Subject: Los amigos] + [Fronted Reciprocal Pronoun: se] + [Future Verb Phrase: van a despedir] + [Location: en la estación]",
  "Nosotros nos vamos a reunir en la cafetería": "[Subject: Nosotros] + [Fronted Reciprocal Pronoun: nos] + [Future Verb Phrase: vamos a reunir] + [Location: en la cafetería]",
  "Yo me voy a acostar temprano esta noche": "[Subject: Yo] + [Fronted Reflexive Pronoun: me] + [Future Verb Phrase: voy a acostar] + [Time / Adverb: temprano esta noche]",
  "Tú te tienes que lavar las manos antes de comer": "[Subject: Tú] + [Fronted Reflexive Pronoun: te] + [Obligation: tienes que lavar] + [Direct Object: las manos] + [Time Clause: antes de comer]",
  "Yo estudio español por dos horas todos los días": "[Subject: Yo] + [Verb: estudio] + [Direct Object: español] + [Duration (por): por dos horas] + [Frequency: todos los días]",
  "El regalo es para mi hermana menor": "[Subject: El regalo] + [Verb (ser): es] + [Recipient / Beneficiary (para): para mi hermana menor]",
  "Mis padres se conocieron en la universidad": "[Subject: Mis padres] + [Reciprocal Pronoun: se] + [Preterite Verb: conocieron] + [Location: en la universidad]",
  "Tú te despiertas temprano por la mañana": "[Subject: Tú] + [Reflexive Pronoun: te] + [Stem-Changing Verb (e->ie): despiertas] + [Adverb: temprano] + [Time of Day (por): por la mañana]",
  "Yo me despierto a las siete de la mañana": "[Subject: Yo] + [Reflexive Pronoun: me] + [Stem-Changing Verb (e->ie): despierto] + [Specific Time: a las siete de la mañana]",
  "Mi hermano se levanta tarde los fines de semana": "[Subject: Mi hermano] + [Reflexive Pronoun: se] + [Verb: levanta] + [Adverb: tarde] + [Frequency: los fines de semana]",
  "Nosotros nos duchamos con agua caliente": "[Subject: Nosotros] + [Reflexive Pronoun: nos] + [Verb: duchamos] + [Prepositional Phrase: con agua caliente]",
  "Ella se viste rápidamente para ir a trabajar": "[Subject: Ella] + [Reflexive Pronoun: se] + [Stem-Changing Verb (e->i): viste] + [Adverb: rápidamente] + [Purpose (para): para ir a trabajar]",
  "Tú te acuestas temprano cuando tienes examen": "[Subject: Tú] + [Reflexive Pronoun: te] + [Stem-Changing Verb (o->ue): acuestas] + [Adverb: temprano] + [Conditional Clause: cuando tienes examen]",
  "Antes de acostarse los niños leen un cuento": "[Preposition + Attached Pronoun: Antes de acostarse] + [Subject: los niños] + [Verb: leen] + [Direct Object: un cuento]",
  "Yo voy a lavarme la cara con jabón": "[Subject: Yo] + [Verb (ir a): voy a] + [Infinitive + Attached Reflexive Pronoun: lavarme] + [Direct Object: la cara] + [Instrument: con jabón]",
  "A mi hermano le duele mucho la garganta hoy": "[Clarifier: A mi hermano] + [Indirect Object Pronoun: le] + [Verb of Pain: duele] + [Degree: mucho] + [Subject (body part): la garganta] + [Time: hoy]",
  "El médico dice que debes tomar esta medicina por cinco días": "[Subject: El médico] + [Reporting Verb: dice que] + [Obligation: debes tomar] + [Direct Object: esta medicina] + [Duration (por): por cinco días]",
  "Nosotros nos sentimos muy cansados después de correr": "[Subject: Nosotros] + [Reflexive Pronoun: nos] + [Stem-Changing Verb (e->ie): sentimos] + [Predicate Adjective: muy cansados] + [Time Clause: después de correr]",
  "Tengo fiebre y necesito descansar en la cama": "[Condition (tener): Tengo fiebre] + [Connector: y] + [Need + Infinitive: necesito descansar] + [Location: en la cama]",
  "Ella toma té de manzanilla para aliviar el dolor de estómago": "[Subject: Ella] + [Verb: toma] + [Direct Object: té de manzanilla] + [Purpose + Infinitive (para): para aliviar el dolor de estómago]",
  "Los amigos se saludan con un apretón de manos": "[Subject: Los amigos] + [Reciprocal Pronoun: se] + [Reciprocal Verb: saludan] + [Manner: con un apretón de manos]",
  "Mis abuelos se miran con mucho cariño y amor": "[Subject: Mis abuelos] + [Reciprocal Pronoun: se] + [Reciprocal Verb: miran] + [Manner: con mucho cariño y amor]",
  "Los dos hermanos se abrazan con alegría en el aeropuerto": "[Subject: Los dos hermanos] + [Reciprocal Pronoun: se] + [Reciprocal Verb: abrazan] + [Manner: con alegría] + [Location: en el aeropuerto]",
  "Nosotros nos vemos todos los días en la cafetería": "[Subject: Nosotros] + [Reciprocal Pronoun: nos] + [Reciprocal Verb: vemos] + [Frequency: todos los días] + [Location: en la cafetería]"
};

// Replace in Unit 1 and Unit 2
for (const [spanish, breakdown] of Object.entries(unit1Breakdowns)) {
  const regex = new RegExp(`(spanish:\\s*"${spanish}",[\\s\\S]*?hint:\\s*"[^"]*")`, 'g');
  content = content.replace(regex, `$1,\n      syntaxBreakdown: "${breakdown}"`);
}

for (const [spanish, breakdown] of Object.entries(unit2Breakdowns)) {
  const regex = new RegExp(`(spanish:\\s*"${spanish}",[\\s\\S]*?hint:\\s*"[^"]*")`, 'g');
  content = content.replace(regex, `$1,\n      syntaxBreakdown: "${breakdown}"`);
}

// In Unit 3 and Unit 4, translate Spanish labels in syntaxBreakdown to English
const labelTranslations = [
  ["Sujeto:", "Subject:"],
  ["Verbo pretérito:", "Preterite Verb:"],
  ["Objeto directo:", "Direct Object:"],
  ["Objeto indirecto:", "Indirect Object:"],
  ["Pronombre OD:", "DOP Pronoun:"],
  ["Pronombre OI:", "IOP Pronoun:"],
  ["Pronombres dobles:", "Double Pronouns:"],
  ["Pronombre doble:", "Double Pronoun:"],
  ["Destino:", "Destination:"],
  ["Lugar:", "Location:"],
  ["Tiempo:", "Time:"],
  ["Adverbio de tiempo:", "Time Adverb:"],
  ["Medio de transporte:", "Transport:"],
  ["Propósito:", "Purpose:"],
  ["Causa:", "Cause:"],
  ["Duración:", "Duration:"],
  ["Intercambio:", "Exchange:"],
  ["Precio:", "Price:"],
  ["Verbo de cambio:", "Verb of Becoming:"],
  ["Darse cuenta:", "To Realize:"]
];

for (const [esLabel, enLabel] of labelTranslations) {
  content = content.replaceAll(esLabel, enLabel);
}

fs.writeFileSync(helperPath, content, 'utf8');
console.log("Updated sentenceBuilderHelper.js with 100% syntax breakdowns!");
