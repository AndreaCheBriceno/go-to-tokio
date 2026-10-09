import { Attraction, FoodItem, TraditionItem, TravelTip, TouristProblem } from './defaultContent';

export const contentEs = {
  hero: {
    badge: "Unidad 5: Mi Ciudad, la Mejor Ciudad • Portafolio Académico de Viajes",
    headline: "TOKIO: Donde la Tradición Ancestral se Encuentra con el Futuro",
    subheadline: "¡Una metrópolis mundialmente famosa y de alta tecnología donde la tradición milenaria se fusiona con el mañana!",
    tagline: "Explora la capital de Japón mediante mapas interactivos, simulaciones culturales en vivo y análisis gramatical en inglés.",
    location: "Isla de Honshu, Costa Este",
    populationCity: "Más de 14 Millones (Centro Urbano)",
    populationMetro: "Más de 37 Millones (Gran Tokio)",
    climate: "Subtropical (4 estaciones bien marcadas)",
  },
  overview: {
    title: "Identidad y Resumen de la Metrópolis",
    description:
      "Tokio es la capital de Japón, ubicada en la costa oriental de la isla principal de Honshu. Es una metrópolis densamente poblada pero excepcionalmente organizada, hogar de aproximadamente 14 millones de personas en el centro urbano y más de 37 millones de habitantes en toda su área metropolitana. El centro de Tokio es más limpio y más rápido que la mayoría de las capitales del mundo, funcionando como el corazón político, cultural y tecnológico del país.",
    stats: [
      { label: "Capital de", value: "Japón", highlight: "Isla de Honshu" },
      { label: "Población Urbana", value: "14.1 Millones", highlight: "Distritos Especiales" },
      { label: "Área Metropolitana", value: "37.4 Millones", highlight: "La Más Grande del Mundo" },
      { label: "Mejores Épocas", value: "Primavera y Otoño", highlight: "Sakura y Arces Rojos" },
    ],
  },
  travelEssentials: {
    title: "Cómo Llegar, Cómo Moverse y Clima",
    climateText:
      "Tokio cuenta con un clima subtropical húmedo con cuatro estaciones bien definidas. La primavera (de finales de marzo a mayo) es famosa mundialmente por los cerezos en flor (sakura) y sus temperaturas agradables. El otoño (de septiembre a noviembre) brinda aire fresco y vibrantes hojas de arce rojo. Los veranos son cálidos y húmedos con animados festivales callejeros (matsuri), mientras que los inviernos son templados, soleados y secos.",
    airportsText:
      "Los viajeros internacionales llegan a través del Aeropuerto de Haneda (HND), ubicado a solo 15 minutos al sur del centro de Tokio, o del Aeropuerto Internacional de Narita (NRT), situado al este de la ciudad. Ambas terminales se conectan de manera muy fluida con los principales nudos ferroviarios mediante monorraíles y trenes expresos rápidos.",
    transitText:
      "Moverse por Tokio es muy sencillo gracias a su red de transporte público bien planificada. La línea circular JR Yamanote recorre los principales distritos del centro, mientras que 13 líneas subterráneas de Tokyo Metro y Toei enlazan cada rincón. La red de trenes es más limpia y más rápida que el transporte público de la mayoría de las capitales occidentales.",
    comparatives: [
      "La red de metro de Tokio es más limpia y más rápida que los sistemas de transporte de la mayoría de las capitales occidentales.",
      "El hospedaje en el centro de Tokio es más costoso que las casas de huéspedes tradicionales en pueblos rurales tranquilos.",
    ],
  },
  attractions: [
    {
      id: "sensoji",
      name: "Templo Senso-ji",
      japanese: "浅草寺",
      district: "Asakusa (Distrito de Taito)",
      category: "Herencia Ancestral y Espiritualidad",
      description:
        "El templo budista más antiguo y emblemático de Tokio, fundado en el año 645 d.C. Los visitantes cruzan la imponente puerta Kaminarimon con su farol rojo de 700 kg y recorren la histórica calle comercial Nakamise para probar galletas de arroz tradicionales.",
      grammarTag: "Herencia Ancestral de Edo",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
      highlights: ["Puerta del Trueno Kaminarimon", "Calle Comercial Nakamise", "Fundado en el 645 d.C."],
    },
    {
      id: "shibuya",
      name: "Cruce de Shibuya y Estatua Hachiko",
      japanese: "渋谷スクランブル交差点",
      district: "Distrito de Shibuya",
      category: "Metrópolis Neón y Energía Urbana",
      description:
        "El corazón palpitante del Tokio moderno con sus famosos pasos peatonales iluminados con neón. Reconocido mundialmente como el cruce peatonal más transitado del planeta, donde hasta 3,000 personas cruzan a la vez bajo gigantescas pantallas digitales.",
      grammarTag: "Superlativo: El Más Transitado",
      image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80",
      highlights: ["Cruce Peatonal Más Frecuentado", "Estatua del Perro Fiel Hachiko", "Pantallas Gigantes de Neón"],
    },
    {
      id: "skytree",
      name: "Torre Tokyo Skytree",
      japanese: "東京スカイツリー",
      district: "Distrito de Sumida",
      category: "Arquitectura Panorámica",
      description:
        "Elevándose 634 metros sobre la metrópolis, Tokyo Skytree es la torre de telecomunicaciones independiente más alta del mundo. Sus miradores de cristal ofrecen las vistas panorámicas más impresionantes de 360 grados de toda la región, con el Monte Fuji visible en días despejados.",
      grammarTag: "Superlativo: Las Vistas Más Impresionantes",
      image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1200&q=80",
      highlights: ["Altura de 634 metros", "Miradores Tembo y Galleria", "Vista al Monte Fuji"],
    },
    {
      id: "akihabara",
      name: "Ciudad Eléctrica de Akihabara",
      japanese: "秋葉原電気街",
      district: "Distrito de Chiyoda",
      category: "Cultura Pop y Alta Tecnología",
      description:
        "El centro global de la electrónica, el anime, los videojuegos y el manga. Akihabara representa la identidad de alta tecnología de Tokio con salas de arcade retro de varios pisos, tiendas de coleccionismo y tecnología de vanguardia.",
      grammarTag: "Compuesto: Alta Tecnología",
      image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80",
      highlights: ["Edificio Radio Kaikan", "Salas de Arcades Retro", "Tiendas Exclusivas de Manga y Anime"],
    },
    {
      id: "meiji",
      name: "Santuario Meiji Jingu",
      japanese: "明治神宮",
      district: "Shibuya / Harajuku",
      category: "Santuario Espiritual Sintoísta",
      description:
        "Un sereno refugio boscoso de 70 hectáreas dedicado al Emperador Meiji y a la Emperatriz Shoken. Sus senderos sombreados de grava bajo gigantescos cedros ofrecen paz y espiritualidad justo al lado de las dinámicas calles de Harajuku.",
      grammarTag: "Naturaleza y Tranquilidad",
      image: "https://images.unsplash.com/photo-1583484963886-cfe2bff2945f?auto=format&fit=crop&w=1200&q=80",
      highlights: ["Gran Puerta Torii de Ciprés", "Bosque Sagrado de 70 Hectáreas", "Muro de Barriles de Sake Ofrendados"],
    },
  ] as Attraction[],
  gastronomy: [
    {
      id: "sushi",
      name: "Nigiri Sushi Edomae",
      japanese: "江戸前握り寿司",
      category: "Obra Maestra del Mar",
      description:
        "Pescado crudo fresco y de la más alta calidad cortado delicadamente y moldeado a mano sobre arroz templado aderezado con vinagre. Tokio es la cuna histórica del sushi estilo Edomae, perfeccionado durante más de 200 años con capturas de la bahía de Tokio.",
      priceLevel: "$$$ (Alta gastronomía) a $ (Cinta giratoria Kaitenzushi)",
      bestSpots: "Mercado Exterior de Tsukiji, Mercado de Toyosu, barras de Ginza",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
      funFact: "¡El sushi Edomae nació originalmente en Tokio como comida callejera rápida para los comerciantes ocupados de la era Edo!",
    },
    {
      id: "ramen",
      name: "Tokyo Shoyu Ramen",
      japanese: "東京醤油ラーメン",
      category: "Reconfortante Caldo de Fideos",
      description:
        "Fideos de trigo elásticos sumergidos en un caldo aromático y dorado a base de salsa de soja (shoyu), cocinado a fuego lento con pollo, cerdo y alga kombu. Servido con tierna panceta chashu, huevo marinado y alga nori crujiente.",
      priceLevel: "$ (Económico y casual, ¥850 - ¥1,200)",
      bestSpots: "Tokyo Station Ramen Street, callejones de Shinjuku e Ikebukuro",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
      funFact: "¡Comer en una pequeña tienda de ramen de barrio es menos costoso que reservar una cena en un restaurante de sushi de lujo!",
    },
    {
      id: "monjayaki",
      name: "Monjayaki de Tokio",
      japanese: "もんじゃ焼き",
      category: "Plancha Interactiva Tradicional",
      description:
        "El plato reconfortante insignia de Tokio: una masa líquida sazonada y mezclada con col rallada, calamar, huevas mentaiko y queso, cocinada directamente en una plancha de hierro en tu mesa con pequeñas espátulas metálicas (hagashi).",
      priceLevel: "$$ (Moderado, ¥1,200 - ¥1,800)",
      bestSpots: "Tsukishima Monja Street (calle con más de 70 restaurantes especializados)",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
      funFact: "¡Comenzó en la era Edo como una forma en que los niños practicaban escribir caracteres japoneses con masa sobre planchas calientes!",
    },
  ] as FoodItem[],
  traditions: [
    {
      id: "hanami",
      name: "Hanami (Observación de Cerezos)",
      japanese: "花見 (桜)",
      type: "Tradición Primaveral",
      description:
        "Una entrañable costumbre cultural que data de hace más de mil años. A finales de marzo y abril, amigos, familias y compañeros se reúnen bajo los cerezos en flor en los parques públicos para celebrar picnics al aire libre.",
      location: "Parque Ueno, Shinjuku Gyoen, Paseo del Río Meguro",
      image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=1200&q=80",
      details: "Fomenta la introspección y el aprecio por la belleza efímera y pasajera de la vida (mono no aware).",
    },
    {
      id: "sumo",
      name: "Torneos Oficiales de Sumo (Honbasho)",
      japanese: "大相撲 (本場所)",
      type: "Deporte Marcial Nacional y Ritual Sintoísta",
      description:
        "El sagrado deporte nacional de Japón que combina antiguos rituales de purificación sintoísta con una tremenda fuerza física. Tokio alberga tres torneos oficiales de 15 días al año (enero, mayo y septiembre).",
      location: "Arena Nacional Ryogoku Kokugikan, Sumida",
      image: "https://images.unsplash.com/photo-1554797589-7241bb691973?auto=format&fit=crop&w=1200&q=80",
      details: "Los luchadores lanzan sal para purificar el círculo de arena sagrado (dohyo) y chocan con enorme potencia hasta que uno sale del círculo o toca el suelo.",
    },
    {
      id: "kanda",
      name: "Gran Festival Kanda Matsuri",
      japanese: "神田祭",
      type: "Histórico Festival Sintoísta",
      description:
        "Uno de los tres festivales principales de Tokio, celebrado a mediados de mayo en años impares. Más de 200 mikoshi (santuarios portátiles) desfilan por el centro de Tokio transportados por miles de feligreses con trajes de la época de Edo.",
      location: "Santuario Kanda Myojin y Distrito de Nihonbashi",
      image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=80",
      details: "Históricamente rendía homenaje al Shogun en el Castillo de Edo para otorgar salud y prosperidad a toda la metrópolis.",
    },
  ] as TraditionItem[],
  dayTrip: {
    title: "Excursión Recomendada: Kamakura Histórico y Costero",
    japanese: "鎌倉 (神奈川県)",
    distance: "A 50-60 minutos al sur de Tokio en la línea JR Yokosuka",
    description:
      "Para los viajeros que buscan una escapada pacífica de la gran metrópolis, Kamakura ofrece un encanto costero tranquilo y sereno. Rodeado de colinas boscosas y del océano Pacífico, Kamakura fue la capital militar samurai de Japón en el siglo XII.",
    highlights: [
      "Monumento exterior del Gran Buda (Kotoku-in) forjado en bronce en el año 1252 d.C.",
      "Mágicos bosques de bambú y jardines de rocas Zen en el Templo Hokoku-ji",
      "Vistas del atardecer en la playa de Yuigahama sobre la bahía de Sagami",
      "Casas de té tradicionales de matcha y tiendas de recuerdos artesanales en la calle Komachi",
    ],
    image: "https://images.unsplash.com/photo-1570459027562-4a916cc6113f?auto=format&fit=crop&w=1200&q=80",
  },
  travelTips: [
    {
      id: "tip1",
      number: 1,
      title: "Lleva Siempre Dinero en Efectivo en Yenes (¥)",
      practicalTip: "Aunque las tarjetas bancarias y tarjetas IC funcionan en estaciones grandes y tiendas de conveniencia, muchos santuarios históricos, máquinas expendedoras de ramen y puestos locales solo aceptan billetes y monedas físicas.",
      reportedGrammar: "Las guías oficiales aconsejan a los turistas llevar suficiente dinero en efectivo para los puestos locales.",
      icon: "Coins",
    },
    {
      id: "tip2",
      number: 2,
      title: "Lleva una Bolsa Pequeña Personal para la Basura",
      practicalTip: "Los botes de basura en las calles se retiraron por seguridad y limpieza ciudadana. Guarda una pequeña bolsa en tu mochila y deposita los desechos en tu hotel o junto a los contenedores de reciclaje de tiendas como 7-Eleven.",
      reportedGrammar: "Los conserjes de hotel recuerdan a los huéspedes extranjeros llevar su basura personal durante el día.",
      icon: "Trash2",
    },
    {
      id: "tip3",
      number: 3,
      title: "Consigue una eSIM Móvil o Pocket Wi-Fi",
      practicalTip: "El transporte de Tokio es veloz pero inmenso. Disponer de internet móvil fiable te permite traducir carteles al instante, verificar andenes en Google Maps y moverte sin perderte en los transbordos del metro.",
      reportedGrammar: "Los viajeros frecuentes dicen a los nuevos visitantes que configuren una eSIM antes de salir del aeropuerto.",
      icon: "Wifi",
    },
    {
      id: "tip4",
      number: 4,
      title: "Respeta la Etiqueta en los Trenes (Modo Silencio)",
      practicalTip: "Los pasajeros japoneses consideran los trenes como espacios de descanso y calma. Pon tu móvil en 'Modo Silencio', evita atender llamadas telefónicas y habla en voz baja y moderada.",
      reportedGrammar: "Los anuncios de las estaciones recuerdan con regularidad a los pasajeros no hablar alto en los trenes públicos.",
      icon: "VolumeX",
    },
    {
      id: "tip5",
      number: 5,
      title: "Termina la Comida Junto al Puesto",
      practicalTip: "Caminar comiendo por aceras concurridas (aruki-kui) está mal visto y se considera descortés, además de arriesgarte a manchar a otros. Disfruta tu comida justo al lado del puesto o en zonas designadas.",
      reportedGrammar: "Las autoridades locales dicen a la gente no comer mientras caminan por aceras públicas concurridas.",
      icon: "UtensilsCrossed",
    },
  ] as TravelTip[],
  problemSolutions: [
    {
      id: "prob_food",
      title: "Barrera del Idioma en Restaurantes Tradicionales",
      context: "Locales tradicionales de barrio (izakayas, bares de ramen, puestos tachigui)",
      problem:
        "Muchos restaurantes tradicionales solo exhiben menús escritos a mano en kanji japonés, sin traducciones en inglés ni fotografías, y el personal rara vez habla otros idiomas.",
      solution:
        "Utiliza apps de traducción con cámara (Google Translate) para escanear menús en tiempo real. Busca las vitrinas con réplicas hiperrealistas de comida en cera o plástico (sampuru), o señala la foto y pronuncia la frase de cortesía para ordenar.",
      usefulJapanesePhrase: "これをお願いします (Kore o onegaishimasu / Kore o kudasai)",
      phrasePronunciation: "Ko-reh oh koo-dah-sigh",
      phraseMeaning: "¡Esto, por favor!",
    },
    {
      id: "prob_train",
      title: "Orientarse en Megaterminales de Tren (El Laberinto de Shinjuku)",
      context: "Estaciones colosales con más de 200 salidas y 3.5 millones de pasajeros diarios",
      problem:
        "Desorientarse dentro de estaciones masivas como Shinjuku, Shibuya o Tokyo Station al transbordar entre distintas compañías de trenes.",
      solution:
        "Sigue la señalización aérea en inglés codificada por colores que indica las salidas principales (ej. Salida Este, Salida Sur). Si te pierdes, acércate a la caseta de la estación (Koban), donde el personal te entregará mapas y te guiará al andén correcto.",
      usefulJapanesePhrase: "すみません、この電車は渋谷に行きますか？ (Sumimasen, kono densha wa Shibuya ni ikimasu ka?)",
      phrasePronunciation: "Soo-mee-mah-sen, koh-noh den-shah wah Shee-boo-yah nee ee-kee-mahss kah?",
      phraseMeaning: "Disculpe, ¿este tren va hacia Shibuya?",
    },
  ] as TouristProblem[],
  grammarBank: {
    compoundAdjectives: [
      { word: "world-famous (famoso en el mundo)", example: "Tokyo is a world-famous center of culture, hospitality, and cutting-edge design." },
      { word: "densely-populated (densamente poblado)", example: "It is a densely-populated yet exceptionally organized metropolis." },
      { word: "well-planned (bien planificado)", example: "Navigating Tokyo is simple thanks to its well-planned public transit network." },
      { word: "high-tech (de alta tecnología)", example: "Akihabara highlights Tokyo's high-tech identity with retro gaming arcades." },
      { word: "slow-paced (de ritmo tranquilo)", example: "Kamakura provides a quiet, slow-paced coastal escape from the city." },
    ],
    comparatives: [
      { phrase: "cleaner and faster than (más limpio y más rápido que)", example: "Tokyo's subway network is cleaner and faster than transit in western capitals." },
      { phrase: "more expensive than (más caro que)", example: "Central Tokyo accommodations are more expensive than countryside guesthouses." },
      { phrase: "less expensive than (menos costoso que)", example: "Eating at a ramen shop is less expensive than reserving a luxury sushi dinner." },
    ],
    superlatives: [
      { phrase: "the busiest (el más transitado)", example: "Shibuya Crossing is globally recognized as the busiest pedestrian intersection in the world." },
      { phrase: "the most impressive (el más impresionante)", example: "Tokyo Skytree offers the most impressive 360-degree views of the entire region." },
    ],
    reportedAdvice: [
      { structure: "tell + people + not to eat (decir que no coman)", example: "Local authorities tell people not to eat while walking on crowded sidewalks." },
      { structure: "advise + tourists + to purchase (aconsejar que compren)", example: "Official travel guides advise tourists to purchase a reloadable transit card." },
      { structure: "remind + passengers + not to speak (recordar que no hablen)", example: "Station signs regularly remind passengers not to speak loudly on the train." },
    ],
  },
  citations: [
    { title: "Organización Nacional de Turismo de Japón (JNTO)", url: "https://www.japan.travel", note: "Guías oficiales, mapas de transporte y normas de etiqueta" },
    { title: "Buró de Convenciones y Visitantes de Tokio (Go Tokyo)", url: "https://www.gotokyo.org", note: "Portal turístico oficial, calendario de festivales y perfiles de barrios" },
    { title: "Guía Oficial de Tránsito de Japan Rail Pass", url: "https://japanrailpass.net", note: "Rutas de la línea Yamanote e información sobre tarjetas IC (Suica/Pasmo)" },
    { title: "División de Turismo del Gobierno Metropolitano de Tokio", url: "https://www.metro.tokyo.lg.jp", note: "Estadísticas de población, geografía urbana y archivos culturales" },
  ],
};
