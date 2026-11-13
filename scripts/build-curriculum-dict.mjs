import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const vocabPath = path.resolve(__dirname, '../src/data/vocabulary.json');
const vocab = JSON.parse(fs.readFileSync(vocabPath, 'utf8'));

const dict = {};

const manualPairs = [
  // Numbers
  ["un", "a"], ["una", "a"], ["uno", "one"], ["dos", "two"], ["tres", "three"], ["cuatro", "four"], ["cinco", "five"],
  ["seis", "six"], ["siete", "seven"], ["ocho", "eight"], ["nueve", "nine"], ["diez", "ten"],
  ["once", "eleven"], ["doce", "twelve"], ["trece", "thirteen"], ["catorce", "fourteen"], ["quince", "fifteen"],
  ["veinte", "twenty"], ["treinta", "thirty"], ["cuarenta", "forty"], ["cincuenta", "fifty"], ["cien", "hundred"],
  ["ciento", "hundred"], ["doscientos", "two hundred"], ["quinientos", "five hundred"], ["mil", "thousand"],

  // Preterite Verbs (all conjugations & accent variants)
  ["fui", "I went"], ["fuiste", "you went"], ["fue", "it was"], ["fuimos", "we went"], ["fueron", "they went"],
  ["iba", "I used to go"], ["ibas", "you used to go"], ["íbamos", "we used to go"], ["ibamos", "we used to go"], ["iban", "they used to go"],
  ["compré", "I bought"], ["compre", "I bought"], ["compraste", "you bought"], ["compró", "bought"], ["compro", "bought"], ["compramos", "we bought"], ["compraron", "they bought"],
  ["pagué", "I paid"], ["pague", "I paid"], ["pagaste", "you paid"], ["pagó", "paid"], ["pago", "paid"], ["pagamos", "we paid"], ["pagaron", "they paid"],
  ["probé", "I tried"], ["probe", "I tried"], ["probaste", "you tried"], ["probó", "tried"], ["probo", "tried"], ["probamos", "we tried"], ["probaron", "they tried"],
  ["comí", "I ate"], ["comi", "I ate"], ["comiste", "you ate"], ["comió", "ate"], ["comio", "ate"], ["comimos", "we ate"], ["comieron", "they ate"],
  ["bebí", "I drank"], ["bebi", "I drank"], ["bebiste", "you drank"], ["bebió", "drank"], ["bebio", "drank"], ["bebimos", "we drank"], ["bebieron", "they drank"],
  ["tomé", "I drank"], ["tome", "I drank"], ["tomaste", "you drank"], ["tomó", "drank"], ["tomo", "drank"], ["tomamos", "we drank"], ["tomaron", "they drank"],
  ["medí", "I tried on"], ["medi", "I tried on"], ["mediste", "you tried on"], ["midió", "tried on"], ["midio", "tried on"], ["medimos", "we tried on"], ["midieron", "they tried on"],
  ["escogí", "I chose"], ["escogi", "I chose"], ["escogiste", "you chose"], ["escogió", "chose"], ["escogio", "chose"], ["escogimos", "we chose"], ["escogieron", "they chose"],
  ["elegí", "I chose"], ["elegi", "I chose"], ["elegiste", "you chose"], ["eligió", "chose"], ["eligio", "chose"], ["elegimos", "we chose"], ["elegieron", "they chose"],
  ["encontré", "I found"], ["encontre", "I found"], ["encontraste", "you found"], ["encontró", "found"], ["encontro", "found"], ["encontramos", "we found"], ["encontraron", "they found"],
  ["vi", "I saw"], ["viste", "you saw"], ["vio", "saw"], ["vimos", "we saw"], ["vieron", "they saw"],
  ["miré", "I looked at"], ["mire", "I looked at"], ["miraste", "you looked at"], ["miró", "looked at"], ["miro", "looked at"], ["miramos", "we looked at"], ["miraron", "they looked at"],
  ["busqué", "I looked for"], ["busque", "I looked for"], ["buscaste", "you looked for"], ["buscó", "looked for"], ["busco", "looked for"], ["buscamos", "we looked for"], ["buscaron", "they looked for"],
  ["gasté", "I spent"], ["gaste", "I spent"], ["gastaste", "you spent"], ["gastó", "spent"], ["gasto", "spent"], ["gastamos", "we spent"], ["gastaron", "they spent"],
  ["salí", "I went out"], ["sali", "I went out"], ["saliste", "you went out"], ["salió", "went out"], ["salio", "went out"], ["salimos", "we went out"], ["salieron", "they went out"],
  ["llegué", "I arrived"], ["llegue", "I arrived"], ["llegaste", "you arrived"], ["llegó", "arrived"], ["llego", "arrived"], ["llegamos", "we arrived"], ["llegaron", "they arrived"],
  ["entré", "I entered"], ["entre", "I entered"], ["entraste", "you entered"], ["entró", "entered"], ["entro", "entered"], ["entramos", "we entered"], ["entraron", "they entered"],
  ["pasé", "I spent time"], ["pase", "I spent time"], ["pasaste", "you spent time"], ["pasó", "spent time"], ["paso", "spent time"], ["pasamos", "we spent time"], ["pasaron", "they spent time"],
  ["sentí", "I felt"], ["senti", "I felt"], ["sentiste", "you felt"], ["sintió", "felt"], ["sintio", "felt"], ["sentimos", "we felt"], ["sintieron", "they felt"],
  ["pensé", "I thought"], ["pense", "I thought"], ["pensaste", "you thought"], ["pensó", "thought"], ["penso", "thought"], ["pensamos", "we thought"], ["pensaron", "they thought"],
  ["creí", "I thought"], ["crei", "I thought"], ["creíste", "you thought"], ["creyó", "thought"], ["creyo", "thought"], ["creímos", "we thought"], ["creyeron", "they thought"],
  ["aprendí", "I learned"], ["aprendi", "I learned"], ["aprendiste", "you learned"], ["aprendió", "learned"], ["aprendio", "learned"], ["aprendimos", "we learned"], ["aprendieron", "they learned"],
  ["decidí", "I decided"], ["decidi", "I decided"], ["decidiste", "you decided"], ["decidió", "decided"], ["decidio", "decided"], ["decidimos", "we decided"], ["decidieron", "they decided"],
  ["recibí", "I received"], ["recibi", "I received"], ["recibiste", "you received"], ["recibió", "received"], ["recibio", "received"], ["recibimos", "we received"], ["recibieron", "they received"],
  ["estuve", "I was"], ["estuviste", "you were"], ["estuvo", "was"], ["estuvimos", "we were"], ["estuvieron", "they were"],
  ["tuve", "I had"], ["tuviste", "you had"], ["tuvo", "had"], ["tuvimos", "we had"], ["tuvieron", "they had"],
  ["hice", "I made/did"], ["hiciste", "you made/did"], ["hizo", "made/did"], ["hicimos", "we made/did"], ["hicieron", "they made/did"],
  ["pude", "I could"], ["pudiste", "you could"], ["pudo", "could"], ["pudimos", "we could"], ["pudieron", "they could"],
  ["quise", "I wanted"], ["quisiste", "you wanted"], ["quiso", "wanted"], ["quisimos", "we wanted"], ["quisieron", "they wanted"],
  ["dije", "I said"], ["dijiste", "you said"], ["dijo", "said"], ["dijimos", "we said"], ["dijeron", "they said"],
  ["puse", "I put"], ["pusiste", "you put"], ["puso", "put"], ["pusimos", "we put"], ["pusieron", "they put"],
  ["traje", "I brought"], ["trajiste", "you brought"], ["trajo", "brought"], ["trajimos", "we brought"], ["trajeron", "they brought"],
  ["anduve", "I walked"], ["anduviste", "you walked"], ["anduvo", "walked"], ["anduvimos", "we walked"], ["anduvieron", "they walked"],
  ["di", "I gave"], ["diste", "you gave"], ["dio", "gave"], ["dimos", "we gave"], ["dieron", "they gave"],
  ["pedí", "I ordered"], ["pedi", "I ordered"], ["pediste", "you ordered"], ["pidió", "ordered"], ["pidio", "ordered"], ["pedimos", "we ordered"], ["pidieron", "they ordered"],
  ["serví", "I served"], ["servi", "I served"], ["serviste", "you served"], ["sirvió", "served"], ["sirvio", "served"], ["servimos", "we served"], ["sirvieron", "they served"],
  ["dormí", "I slept"], ["dormi", "I slept"], ["dormiste", "you slept"], ["durmió", "slept"], ["durmio", "slept"], ["dormimos", "we slept"], ["durmieron", "they slept"],
  ["preferí", "I preferred"], ["preferi", "I preferred"], ["prefirió", "preferred"], ["prefirio", "preferred"], ["preferimos", "we preferred"], ["prefirieron", "they preferred"],
  ["llevé", "I took/wore"], ["lleve", "I took/wore"], ["llevaste", "you took/wore"], ["llevó", "took/wore"], ["llevo", "took/wore"], ["llevamos", "we took/wore"], ["llevaron", "they took/wore"],
  ["caminé", "I walked"], ["camine", "I walked"], ["caminó", "walked"], ["camino", "walked"], ["caminamos", "we walked"],
  ["viajé", "I traveled"], ["viaje", "I traveled"], ["viajó", "traveled"], ["viajamos", "we traveled"],
  ["gustó", "liked"], ["gusto", "liked"], ["gustaron", "liked"],
  ["encantó", "loved"], ["encanto", "loved"], ["encantaron", "loved"],
  ["quedó", "fit"], ["quedo", "fit"], ["quedaron", "fit"],
  ["costó", "cost"], ["costo", "cost"], ["costaron", "cost"],
  ["pareció", "seemed"], ["parecio", "seemed"], ["parecieron", "seemed"],

  // Present verbs common in 101/102
  ["voy", "I go"], ["vas", "you go"], ["va", "goes"], ["vamos", "we go"], ["van", "they go"],
  ["compro", "I buy"], ["compra", "buys"], ["compran", "they buy"],
  ["cuesta", "costs"], ["cuestan", "cost"], ["pago", "I pay"], ["paga", "pays"],
  ["quiero", "I want"], ["quieres", "you want"], ["quiere", "wants"], ["queremos", "we want"], ["quieren", "they want"],
  ["prefiero", "I prefer"], ["prefiere", "prefers"], ["preferimos", "we prefer"],
  ["tengo", "I have"], ["tienes", "you have"], ["tiene", "has"], ["tenemos", "we have"], ["tienen", "they have"],
  ["soy", "I am"], ["eres", "you are"], ["es", "is"], ["somos", "we are"], ["son", "they are"],
  ["estoy", "I am"], ["estás", "you are"], ["estas", "you are"], ["está", "is"], ["esta", "is"], ["estamos", "we are"], ["están", "are"], ["estan", "are"],
  ["hay", "there is/are"], ["pienso", "I think"], ["piensa", "thinks"], ["pensamos", "we think"],

  // Clothing & Accessories
  ["blusa", "blouse"], ["blusas", "blouses"],
  ["camisa", "shirt"], ["camisas", "shirts"],
  ["camiseta", "t-shirt"], ["camisetas", "t-shirts"],
  ["falda", "skirt"], ["faldas", "skirts"],
  ["vestido", "dress"], ["vestidos", "dresses"],
  ["pantalón", "pants"], ["pantalon", "pants"], ["pantalones", "pants"],
  ["jeans", "jeans"], ["vaqueros", "jeans"],
  ["suéter", "sweater"], ["sueter", "sweater"], ["suéteres", "sweaters"],
  ["chaqueta", "jacket"], ["chaquetas", "jackets"],
  ["abrigo", "coat"], ["abrigos", "coats"],
  ["traje", "suit"], ["trajes", "suits"],
  ["zapatos", "shoes"], ["zapato", "shoe"],
  ["botas", "boots"], ["bota", "boot"],
  ["sandalias", "sandals"], ["sandalia", "sandal"],
  ["tenis", "sneakers"],
  ["calcetines", "socks"], ["calcetín", "sock"], ["calcetin", "sock"],
  ["sombrero", "hat"], ["sombreros", "hats"],
  ["gorra", "cap"], ["gorras", "caps"],
  ["cinturón", "belt"], ["cinturon", "belt"], ["cinturones", "belts"],
  ["corbata", "tie"], ["corbatas", "ties"],
  ["guantes", "gloves"], ["bufanda", "scarf"], ["bufandas", "scarves"],
  ["joyas", "jewelry"], ["joyería", "jewelry"], ["joyeria", "jewelry"],
  ["collar", "necklace"], ["collares", "necklaces"],
  ["pulsera", "bracelet"], ["pulseras", "bracelets"],
  ["anillo", "ring"], ["anillos", "rings"],
  ["aretes", "earrings"], ["pendientes", "earrings"],
  ["reloj", "watch"], ["relojes", "watches"],
  ["bolsa", "bag"], ["bolsas", "bags"], ["bolso", "purse"], ["bolsos", "purses"],
  ["cartera", "wallet"], ["carteras", "wallets"], ["mochila", "backpack"], ["mochilas", "backpacks"],
  ["cuero", "leather"], ["algodón", "cotton"], ["algodon", "cotton"],
  ["lana", "wool"], ["seda", "silk"], ["lino", "linen"],
  ["plata", "silver"], ["oro", "gold"],
  ["recuerdo", "souvenir"], ["recuerdos", "souvenirs"],
  ["artesanía", "handicraft"], ["artesania", "handicraft"], ["artesanías", "handicrafts"], ["artesanias", "handicrafts"],
  ["bordada", "embroidered"], ["bordado", "embroidered"], ["bordadas", "embroidered"], ["bordados", "embroidered"],
  ["descuento", "discount"], ["descuentos", "discounts"],
  ["rebaja", "sale"], ["rebajas", "sales"], ["oferta", "offer"], ["ofertas", "offers"],
  ["precio", "price"], ["precios", "prices"],
  ["dólares", "dollars"], ["dolares", "dollars"], ["pesos", "pesos"],
  ["dinero", "money"], ["efectivo", "cash"],
  ["tarjeta", "card"], ["tarjetas", "cards"],
  ["crédito", "credit"], ["credito", "credit"], ["débito", "debit"], ["debito", "debit"],

  // Places
  ["mercado", "market"], ["mercados", "markets"],
  ["tienda", "store"], ["tiendas", "stores"],
  ["centro", "center"], ["comercial", "mall"],
  ["plaza", "plaza"], ["plazas", "plazas"],
  ["supermercado", "supermarket"], ["supermercados", "supermarkets"],
  ["puesto", "stall"], ["puestos", "stalls"], ["tianguis", "street market"],
  ["restaurante", "restaurant"], ["restaurantes", "restaurants"],
  ["cafetería", "cafeteria"], ["cafeteria", "cafeteria"], ["café", "cafe"], ["cafe", "cafe"],
  ["panadería", "bakery"], ["farmacia", "pharmacy"], ["biblioteca", "library"],
  ["parque", "park"], ["playa", "beach"], ["museo", "museum"], ["hotel", "hotel"],
  ["calle", "street"], ["ciudad", "city"], ["pueblo", "town"], ["casa", "house"],

  // Food & Drinks
  ["tacos", "tacos"], ["taco", "taco"], ["pescado", "fish"], ["carne", "meat"], ["pollo", "chicken"],
  ["churros", "churros"], ["churro", "churro"],
  ["empanadas", "empanadas"], ["empanada", "empanada"],
  ["tamales", "tamales"], ["tamal", "tamale"],
  ["quesadillas", "quesadillas"], ["quesadilla", "quesadilla"],
  ["salsa", "salsa"], ["guacamole", "guacamole"], ["tortillas", "tortillas"],
  ["arroz", "rice"], ["frijoles", "beans"],
  ["fruta", "fruit"], ["frutas", "fruits"], ["verdura", "vegetable"], ["verduras", "vegetables"],
  ["manzana", "apple"], ["manzanas", "apples"], ["plátano", "banana"], ["platano", "banana"], ["plátanos", "bananas"],
  ["naranja", "orange"], ["naranjas", "oranges"],
  ["pan", "bread"], ["queso", "cheese"], ["agua", "water"], ["leche", "milk"],
  ["jugo", "juice"], ["refresco", "soda"], ["cerveza", "beer"], ["vino", "wine"],
  ["té", "tea"], ["te", "tea"], ["café", "coffee"], ["cafe", "coffee"],
  ["dulces", "candies"], ["dulce", "candy"], ["helado", "ice cream"],
  ["postre", "dessert"], ["postres", "desserts"],
  ["comida", "food"], ["bebida", "drink"], ["bebidas", "drinks"],

  // Family & People
  ["mamá", "mom"], ["mama", "mom"], ["madre", "mother"], ["madres", "mothers"],
  ["papá", "dad"], ["papa", "dad"], ["padre", "father"], ["padres", "parents"],
  ["hermano", "brother"], ["hermana", "sister"], ["hermanos", "siblings"], ["hermanas", "sisters"],
  ["hijo", "son"], ["hija", "daughter"], ["hijos", "children"], ["hijas", "daughters"],
  ["abuelo", "grandfather"], ["abuela", "grandmother"], ["abuelos", "grandparents"],
  ["tío", "uncle"], ["tio", "uncle"], ["tía", "aunt"], ["tia", "aunt"], ["tíos", "uncles/aunts"], ["tios", "uncles/aunts"],
  ["primo", "cousin"], ["prima", "cousin"], ["primos", "cousins"], ["primas", "cousins"],
  ["sobrino", "nephew"], ["sobrina", "niece"],
  ["amigo", "friend"], ["amiga", "friend"], ["amigos", "friends"], ["amigas", "friends"],
  ["mejor", "best"], ["mejores", "best"],
  ["novio", "boyfriend"], ["novia", "girlfriend"],
  ["esposo", "husband"], ["esposa", "wife"],
  ["compañero", "classmate"], ["compañera", "classmate"], ["compañeros", "classmates"], ["compañeras", "classmates"],
  ["vecino", "neighbor"], ["vecina", "neighbor"],
  ["familia", "family"], ["gente", "people"], ["persona", "person"], ["personas", "people"],
  ["vendedor", "vendor"], ["vendedora", "vendor"], ["cajero", "cashier"], ["cajera", "cashier"],
  ["dependiente", "store clerk"], ["dependienta", "store clerk"], ["dependientes", "store clerks"], ["dependientas", "store clerks"],
  ["chico", "boy"], ["chica", "girl"], ["chicos", "boys"], ["chicas", "girls"],
  ["niño", "child"], ["niña", "child"], ["niños", "children"], ["niñas", "children"],
  ["hombre", "man"], ["hombres", "men"], ["mujer", "woman"], ["mujeres", "women"],
  ["señor", "Mr."], ["señora", "Mrs."], ["señorita", "Miss"],
  ["solo", "alone"], ["sola", "alone"], ["solos", "alone"], ["solas", "alone"],

  // Adjectives & Feelings
  ["contento", "happy"], ["contenta", "happy"], ["contentos", "happy"], ["contentas", "happy"],
  ["feliz", "happy"], ["felices", "happy"], ["alegre", "cheerful"], ["alegres", "cheerful"],
  ["emocionado", "excited"], ["emocionada", "excited"], ["emocionados", "excited"], ["emocionadas", "excited"],
  ["cansado", "tired"], ["cansada", "tired"], ["cansados", "tired"], ["cansadas", "tired"],
  ["relajado", "relaxed"], ["relajada", "relaxed"],
  ["abrumado", "overwhelmed"], ["abrumada", "overwhelmed"],
  ["triste", "sad"], ["tristes", "sad"], ["nervioso", "nervous"], ["nerviosa", "nervous"],
  ["enojado", "angry"], ["enojada", "angry"], ["preocupado", "worried"], ["preocupada", "worried"],
  ["maravilloso", "wonderful"], ["maravillosa", "wonderful"], ["maravillosos", "wonderful"], ["maravillosas", "wonderful"],
  ["divertido", "fun"], ["divertida", "fun"], ["divertidos", "fun"], ["divertidas", "fun"],
  ["amable", "friendly"], ["amables", "friendly"], ["simpático", "nice"], ["simpatico", "nice"], ["simpática", "nice"], ["simpatica", "nice"],
  ["fascinante", "fascinating"], ["fascinantes", "fascinating"],
  ["increíble", "incredible"], ["increible", "incredible"],
  ["inolvidable", "unforgettable"], ["inolvidables", "unforgettable"],
  ["delicioso", "delicious"], ["deliciosa", "delicious"], ["deliciosos", "delicious"], ["deliciosas", "delicious"],
  ["rico", "delicious"], ["rica", "delicious"], ["ricos", "delicious"], ["ricas", "delicious"],
  ["riquísimo", "super tasty"], ["riquisimo", "super tasty"], ["riquísima", "super tasty"], ["riquisima", "super tasty"],
  ["sabroso", "tasty"], ["sabrosa", "tasty"],
  ["caro", "expensive"], ["cara", "expensive"], ["caros", "expensive"], ["caras", "expensive"],
  ["barato", "cheap"], ["barata", "cheap"], ["baratos", "cheap"], ["baratas", "cheap"],
  ["económico", "budget-friendly"], ["economico", "budget-friendly"], ["económica", "budget-friendly"], ["economica", "budget-friendly"],
  ["bonito", "pretty"], ["bonita", "pretty"], ["bonitos", "pretty"], ["bonitas", "pretty"],
  ["hermoso", "beautiful"], ["hermosa", "beautiful"], ["hermosos", "beautiful"], ["hermosas", "beautiful"],
  ["lindo", "cute"], ["linda", "cute"], ["lindos", "cute"], ["lindas", "cute"],
  ["feo", "ugly"], ["fea", "ugly"],
  ["grande", "big"], ["grandes", "big"],
  ["pequeño", "small"], ["pequeña", "small"], ["pequeños", "small"], ["pequeñas", "small"],
  ["chico", "small"], ["chica", "small"],
  ["nuevo", "new"], ["nueva", "new"], ["nuevos", "new"], ["nuevas", "new"],
  ["viejo", "old"], ["vieja", "old"], ["viejos", "old"], ["viejas", "old"],
  ["antiguo", "antique"], ["antigua", "antique"], ["antiguos", "antique"], ["antiguas", "antique"],
  ["cómodo", "comfortable"], ["comodo", "comfortable"], ["cómoda", "comfortable"], ["comoda", "comfortable"], ["cómodos", "comfortable"], ["comodos", "comfortable"],
  ["apretado", "tight"], ["apretada", "tight"], ["ancho", "loose"], ["ancha", "loose"],
  ["elegante", "elegant"], ["elegantes", "elegant"],
  ["moderno", "modern"], ["moderna", "modern"],
  ["típico", "typical"], ["tipico", "typical"], ["típica", "typical"], ["tipica", "typical"],
  ["tradicional", "traditional"], ["tradicionales", "traditional"],
  ["fácil", "easy"], ["facil", "easy"], ["difícil", "difficult"], ["dificil", "difficult"],
  ["interesante", "interesting"], ["interesantes", "interesting"],
  ["aburrido", "boring"], ["aburrida", "boring"],
  ["bueno", "good"], ["buena", "good"], ["buenos", "good"], ["buenas", "good"],
  ["malo", "bad"], ["mala", "bad"], ["malos", "bad"], ["malas", "bad"],

  // Colors
  ["rojo", "red"], ["roja", "red"], ["rojos", "red"], ["rojas", "red"],
  ["azul", "blue"], ["azules", "blue"],
  ["verde", "green"], ["verdes", "green"],
  ["amarillo", "yellow"], ["amarilla", "yellow"], ["amarillos", "yellow"], ["amarillas", "yellow"],
  ["blanco", "white"], ["blanca", "white"], ["blancos", "white"], ["blancas", "white"],
  ["negro", "black"], ["negra", "black"], ["negros", "black"], ["negras", "black"],
  ["gris", "gray"], ["grises", "gray"],
  ["marrón", "brown"], ["marron", "brown"],
  ["morado", "purple"], ["morada", "purple"],
  ["rosado", "pink"], ["rosada", "pink"], ["rosa", "pink"],
  ["naranja", "orange"], ["anaranjado", "orange"], ["anaranjada", "orange"],
  ["claro", "light"], ["clara", "light"], ["oscuro", "dark"], ["oscura", "dark"],

  // Connectors, Time & Adverbs
  ["y", "and"], ["e", "and"], ["o", "or"], ["u", "or"],
  ["pero", "but"], ["porque", "because"], ["aunque", "although"],
  ["también", "also"], ["tambien", "also"], ["tampoco", "neither"],
  ["ayer", "yesterday"], ["anteayer", "day before yesterday"], ["hoy", "today"], ["anoche", "last night"], ["mañana", "tomorrow"],
  ["ahora", "now"], ["después", "afterwards"], ["despues", "afterwards"], ["luego", "then"], ["entonces", "then"],
  ["primero", "first"], ["finalmente", "finally"], ["siempre", "always"], ["nunca", "never"], ["jamás", "never"], ["jamas", "never"],
  ["mucho", "a lot"], ["mucha", "a lot of"], ["muchos", "many"], ["muchas", "many"],
  ["poco", "a little"], ["poca", "little"], ["pocos", "few"], ["pocas", "few"],
  ["muy", "very"], ["bastante", "quite"], ["demasiado", "too much"], ["tan", "so"], ["tanto", "so much"],
  ["más", "more"], ["mas", "more"], ["menos", "less"],
  ["nada", "nothing"], ["algo", "something"], ["nadie", "nobody"], ["alguien", "someone"],
  ["todo", "everything"], ["todos", "all"], ["todas", "all"],
  ["aquí", "here"], ["aqui", "here"], ["allí", "there"], ["alli", "there"], ["allá", "over there"], ["alla", "over there"],
  ["cerca", "close"], ["lejos", "far"], ["bien", "well"], ["mal", "badly"],
  ["con", "with"], ["sin", "without"], ["para", "for"], ["por", "for/by"], ["de", "of"], ["en", "in"], ["a", "to"], ["al", "to the"], ["del", "of the"],
  ["un", "a"], ["una", "a"], ["unos", "some"], ["unas", "some"],
  ["el", "the"], ["la", "the"], ["los", "the"], ["las", "the"],
  ["mi", "my"], ["mis", "my"], ["tu", "your"], ["tus", "your"],
  ["su", "his/her/their"], ["sus", "their"], ["nuestro", "our"], ["nuestra", "our"], ["nuestros", "our"], ["nuestras", "our"],
  ["yo", "I"], ["tú", "you"], ["tu", "your"], ["él", "he"], ["ella", "she"], ["usted", "you"],
  ["nosotros", "we"], ["nosotras", "we"], ["ellos", "they"], ["ellas", "they"], ["ustedes", "you all"],
  ["me", "myself"], ["te", "yourself"], ["se", "himself/herself"], ["nos", "ourselves"],
  ["sí", "yes"], ["si", "yes"], ["no", "no"], ["que", "that"], ["qué", "what"], ["que", "what"], ["quién", "who"], ["quien", "who"],
  ["dónde", "where"], ["donde", "where"], ["cuándo", "when"], ["cuando", "when"], ["cómo", "how"], ["como", "how/as"]
];

manualPairs.forEach(([s, e]) => {
  dict[s.toLowerCase()] = e;
});

// Incorporate vocabulary.json
vocab.forEach(v => {
  let sp = v.spanish;
  let en = v.english;
  let cleanEn = en.replace(/\s*\([^)]*\)/g, "").trim();
  if (cleanEn.includes("/")) cleanEn = cleanEn.split("/")[0].trim();
  cleanEn = cleanEn.replace(/^to\s+/i, "");

  const add = (s, e) => {
    const k = s.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()¿?¡!]/g, "").replace(/\s+/g, " ");
    if (k && e && !dict[k]) dict[k] = e;
  };

  if (sp.includes("/")) {
    sp.split("/").forEach(p => {
      add(p, cleanEn);
      add(p.replace(/^(el|la|los|las|un|una|unos|unas)\s+/i, ""), cleanEn);
    });
  } else {
    add(sp, cleanEn);
    add(sp.replace(/^(el|la|los|las|un|una|unos|unas)\s+/i, ""), cleanEn);
  }
});

const multiWord = [
  ["tienda de ropa", "clothing store"],
  ["centro comercial", "shopping mall"],
  ["tarjeta de crédito", "credit card"],
  ["tarjeta de credito", "credit card"],
  ["tarjeta de débito", "debit card"],
  ["tarjeta de debito", "debit card"],
  ["mercado central", "central market"],
  ["mercado de artesanías", "artisan craft market"],
  ["mercado de artesanias", "artisan craft market"],
  ["mercado al aire libre", "open-air market"],
  ["en efectivo", "in cash"],
  ["de compras", "shopping"],
  ["un poco", "a bit"],
  ["un poco de", "a bit of"],
  ["por la mañana", "in the morning"],
  ["por la tarde", "in the afternoon"],
  ["por la noche", "at night"],
  ["el fin de semana", "the weekend"],
  ["la semana pasada", "last week"],
  ["el año pasado", "last year"],
  ["el mes pasado", "last month"],
  ["el sábado pasado", "last Saturday"],
  ["el sabado pasado", "last Saturday"],
  ["el domingo pasado", "last Sunday"],
  ["todos los días", "every day"],
  ["todos los dias", "every day"],
  ["a menudo", "often"],
  ["a veces", "sometimes"],
  ["otra vez", "again"],
  ["tal vez", "maybe"],
  ["por supuesto", "of course"],
  ["de cuero", "leather"],
  ["de algodón", "cotton"],
  ["de algodon", "cotton"],
  ["de lana", "wool"],
  ["de seda", "silk"],
  ["de lino", "linen"],
  ["de plata", "silver"],
  ["de oro", "gold"],
  ["con mi mejor amigo", "with my best friend"],
  ["con mi mejor amiga", "with my best friend"],
  ["con mi mamá", "with my mom"],
  ["con mi mama", "with my mom"],
  ["con mi papá", "with my dad"],
  ["con mi papa", "with my dad"],
  ["con mi familia", "with my family"],
  ["con mis amigos", "with my friends"],
  ["con mis amigas", "with my friends"],
  ["con mis hermanos", "with my siblings"],
  ["fui con", "I went with"],
  ["fuimos con", "we went with"],
  ["fui al", "I went to the"],
  ["fui a la", "I went to the"],
  ["fui a un", "I went to a"],
  ["fui a una", "I went to a"],
  ["fui a", "I went to"],
  ["fuimos al", "we went to the"],
  ["fuimos a la", "we went to the"],
  ["fuimos a", "we went to"],
  ["me medí", "I tried on"],
  ["me medi", "I tried on"],
  ["se midió", "tried on"],
  ["se midio", "tried on"],
  ["nos medimos", "we tried on"],
  ["me probé", "I tried on"],
  ["me probe", "I tried on"],
  ["se probó", "tried on"],
  ["se probo", "tried on"],
  ["nos probamos", "we tried on"],
  ["me sentí", "I felt"],
  ["me senti", "I felt"],
  ["se sintió", "felt"],
  ["se sintio", "felt"],
  ["nos sentimos", "we felt"],
  ["pensé que fue", "I thought it was"],
  ["pense que fue", "I thought it was"],
  ["pensé que", "I thought that"],
  ["pense que", "I thought that"],
  ["creo que", "I think that"],
  ["no compré nada", "I didn't buy anything"],
  ["no compre nada", "I didn't buy anything"],
  ["no comí nada", "I didn't eat anything"],
  ["no comi nada", "I didn't eat anything"],
  ["no pagué nada", "I didn't pay anything"],
  ["no pague nada", "I didn't pay anything"],
  ["no probé nada", "I didn't try anything"],
  ["no probe nada", "I didn't try anything"],
  ["me quedó bien", "it fit me well"],
  ["me quedo bien", "it fit me well"],
  ["me quedó mal", "it fit me badly"],
  ["me quedo mal", "it fit me badly"],
  ["me quedó pequeño", "it was too small for me"],
  ["me quedo pequeño", "it was too small for me"],
  ["me quedó pequeña", "it was too small for me"],
  ["me quedo pequeña", "it was too small for me"],
  ["me quedó grande", "it was too big for me"],
  ["me quedo grande", "it was too big for me"],
  ["me quedó apretado", "it was too tight for me"],
  ["me quedo apretado", "it was too tight for me"],
  ["me quedaron bien", "they fit me well"],
  ["me quedaron mal", "they fit me badly"],
  ["me gustó", "I liked"],
  ["me gusto", "I liked"],
  ["no me gustó", "I didn't like"],
  ["no me gusto", "I didn't like"],
  ["me gustaron", "I liked"],
  ["no me gustaron", "I didn't like"],
  ["me encantó", "I loved"],
  ["me encanto", "I loved"],
  ["me encantaron", "I loved"],
  ["me dio", "gave me"],
  ["le dio", "gave him/her"],
  ["nos dio", "gave us"],
  ["el dependiente", "the clerk"],
  ["la dependienta", "the clerk"],
  ["los dependientes", "the clerks"],
  ["un descuento", "a discount"],
  ["buen precio", "good price"],
  ["buenos precios", "good prices"],
  ["muchas cosas", "many things"],
  ["muchos artículos", "many items"],
  ["muchos articulos", "many items"]
];

multiWord.sort((a, b) => b[0].length - a[0].length);

const outCode = `// Comprehensive Spanish 101/102 Curriculum Translation Dictionary
// Generated with 2,000+ words & phrases from curriculum & vocabulary.json

export const MULTI_WORD_EXPRESSIONS = ${JSON.stringify(multiWord, null, 2)};

export const CURRICULUM_DICTIONARY = ${JSON.stringify(dict, null, 2)};

export function translateSpanishTextToEnglish(input) {
  if (!input) return "";

  // If array of tokens with gloss (e.g. from OPEN_WORD_BANK)
  if (Array.isArray(input)) {
    const allHaveGloss = input.every(t => typeof t === 'object' && t && t.gloss);
    if (allHaveGloss && input.length > 0) {
      let glossStr = input.map(t => t.gloss).join(" ");
      glossStr = glossStr
        .replace(/\\bYes I\\b/gi, "Yes, I")
        .replace(/\\bNo I\\b/gi, "No, I")
        .replace(/\\s+/g, " ")
        .trim();
      return glossStr.length > 0 ? glossStr.charAt(0).toUpperCase() + glossStr.slice(1) : "";
    }

    input = input.map(t => (typeof t === 'object' && t ? (t.gloss || t.text || "") : String(t))).join(" ");
  }

  let text = String(input);
  let clean = text.toLowerCase().replace(/[.,/#!$%^&*;:{}=\\-_\\x60~()¿?¡!]/g, " ").replace(/\\s+/g, " ").trim();
  if (!clean) return "";

  // 1. Replace multi-word expressions (longest first)
  for (const [phr, rep] of MULTI_WORD_EXPRESSIONS) {
    let idx;
    while ((idx = clean.indexOf(phr)) !== -1) {
      const before = clean.slice(0, idx);
      const after = clean.slice(idx + phr.length);
      const isStart = idx === 0 || /\\s$/.test(before);
      const isEnd = after.length === 0 || /^\\s/.test(after);
      if (isStart && isEnd) {
        clean = before + " __" + rep.replace(/ /g, "___") + "__ " + after;
      } else {
        break;
      }
    }
  }

  // 2. Translate individual words
  const tokens = clean.split(/\\s+/).filter(Boolean);
  const out = tokens.map(tok => {
    if (tok.startsWith("__") && tok.endsWith("__")) {
      return tok.slice(2, -2).replace(/___/g, " ");
    }
    const cleanTok = tok.toLowerCase();
    if (CURRICULUM_DICTIONARY[cleanTok]) {
      return CURRICULUM_DICTIONARY[cleanTok];
    }
    // Plural fallback
    if (cleanTok.endsWith("s")) {
      const sing = cleanTok.slice(0, -1);
      if (CURRICULUM_DICTIONARY[sing]) {
        return CURRICULUM_DICTIONARY[sing] + "s";
      }
      if (cleanTok.endsWith("es")) {
        const sing2 = cleanTok.slice(0, -2);
        if (CURRICULUM_DICTIONARY[sing2]) {
          return CURRICULUM_DICTIONARY[sing2] + "s";
        }
      }
    }
    return cleanTok;
  });

  let res = out.join(" ")
    .replace(/\\s+/g, " ")
    .replace(/\\bYes I\\b/gi, "Yes, I")
    .replace(/\\bNo I\\b/gi, "No, I")
    .trim();

  if (res.length > 0) {
    res = res.charAt(0).toUpperCase() + res.slice(1);
  }
  return res;
}
`;

fs.writeFileSync(path.resolve(__dirname, '../src/utils/curriculumDictionary.js'), outCode, 'utf8');
console.log("Successfully created src/utils/curriculumDictionary.js");
