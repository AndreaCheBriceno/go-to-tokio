export interface Attraction {
  id: string;
  name: string;
  japanese: string;
  district: string;
  category: string;
  description: string;
  grammarTag?: string;
  image: string;
  highlights: string[];
}

export interface FoodItem {
  id: string;
  name: string;
  japanese: string;
  category: string;
  description: string;
  priceLevel: string;
  bestSpots: string;
  image: string;
  funFact: string;
}

export interface TraditionItem {
  id: string;
  name: string;
  japanese: string;
  type: string;
  description: string;
  location: string;
  image: string;
  details: string;
}

export interface TravelTip {
  id: string;
  number: number;
  title: string;
  practicalTip: string;
  reportedGrammar: string; // Fulfills reported advice/command rubric
  icon: string;
}

export interface TouristProblem {
  id: string;
  title: string;
  context: string;
  problem: string;
  solution: string;
  usefulJapanesePhrase: string;
  phrasePronunciation: string;
  phraseMeaning: string;
}

export const defaultContent = {
  hero: {
    badge: "Unit 5: My Town, the Best Town • Academic Travel Portfolio",
    headline: "TOKYO: Where Ancient Heritage Meets Tomorrow's World",
    subheadline: "A world-famous, high-tech metropolis where ancient tradition meets the future!",
    tagline: "Explore Japan's capital through interactive maps, live cultural simulations, and English grammar insights.",
    location: "Honshu Island, Eastern Coastline",
    populationCity: "14+ Million (City Center)",
    populationMetro: "37+ Million (Greater Tokyo)",
    climate: "Subtropical (4 distinct seasons)",
  },
  overview: {
    title: "Metropolis Identity & Overview",
    description:
      "Tokyo is the capital city of Japan, located on the eastern coastline of the main island of Honshu. It is a densely-populated yet exceptionally organized metropolis, home to approximately 14 million people in the city center and more than 37 million residents across the broader metropolitan area. Central Tokyo is cleaner and faster than most capital cities in the world, serving as the political, cultural, and technological heartbeat of the nation.",
    stats: [
      { label: "Capital City of", value: "Japan", highlight: "Honshu Island" },
      { label: "City Population", value: "14.1 Million", highlight: "Downtown Wards" },
      { label: "Metropolitan Area", value: "37.4 Million", highlight: "Largest Metro in World" },
      { label: "Best Travel Seasons", value: "Spring & Autumn", highlight: "Sakura & Red Maples" },
    ],
  },
  travelEssentials: {
    title: "Getting There, Getting Around & Climate",
    climateText:
      "Tokyo has a humid subtropical climate with four well-defined seasons. Spring (late March to May) is world-famous for cherry blossoms (sakura) and pleasant temperatures. Autumn (September to November) offers crisp air and vibrant red Japanese maples. Summers are hot and humid with colorful street matsuri, while winters are mild, sunny, and dry.",
    airportsText:
      "International travelers arrive through Haneda Airport (HND), situated only 15 minutes south of central Tokyo, or Narita International Airport (NRT), located east of the city. Both terminals connect smoothly to major train hubs via rapid monorails and express trains.",
    transitText:
      "Navigating Tokyo is simple thanks to its well-planned public transportation network. The circular JR Yamanote Line loops around all downtown districts, while 13 underground Tokyo Metro and Toei subway lines link every neighborhood. Subway cars are cleaner and faster than public transit in most western capitals.",
    comparatives: [
      "Tokyo's subway network is cleaner and faster than public transit systems in most western capitals.",
      "Hotel accommodations in central Tokyo are more expensive than traditional guesthouses in quiet rural towns.",
    ],
  },
  attractions: [
    {
      id: "sensoji",
      name: "Senso-ji Temple",
      japanese: "浅草寺",
      district: "Asakusa (Taito Ward)",
      category: "Ancient Heritage & Spirituality",
      description:
        "Tokyo's oldest and most iconic Buddhist temple, founded in 645 AD. Visitors walk under the massive 700 kg red Kaminarimon lantern and explore the historic Nakamise Shopping Street to sample traditional rice crackers.",
      grammarTag: "Ancient Edo Heritage",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
      highlights: ["Kaminarimon Thunder Gate", "Nakamise Souvenir Street", "Founded in 645 AD"],
    },
    {
      id: "shibuya",
      name: "Shibuya Crossing & Hachiko",
      japanese: "渋谷スクランブル交差点",
      district: "Shibuya Ward",
      category: "Neon Metropolis & Urban Energy",
      description:
        "The beating heart of modern Tokyo with famous neon-lit crosswalks. Globally recognized as the busiest pedestrian intersection on the planet, where up to 3,000 people cross simultaneously under giant video billboards.",
      grammarTag: "Superlative: The Busiest",
      image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80",
      highlights: ["World's Busiest Crosswalk", "Loyal Dog Hachiko Statue", "Giant Neon Billboards"],
    },
    {
      id: "skytree",
      name: "Tokyo Skytree",
      japanese: "東京スカイツリー",
      district: "Sumida Ward",
      category: "Panoramic Architecture",
      description:
        "Rising 634 meters above the metropolis, Tokyo Skytree is the tallest freestanding broadcasting tower in the world. Its glass decks offer the most impressive 360-degree views of the entire region, with Mount Fuji visible on sunny days.",
      grammarTag: "Superlative: The Most Impressive",
      image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1200&q=80",
      highlights: ["634m Tower Height", "Tembo Deck & Galleria", "Mount Fuji Vista"],
    },
    {
      id: "akihabara",
      name: "Akihabara Electric Town",
      japanese: "秋葉原電気街",
      district: "Chiyoda Ward",
      category: "Pop Culture & High-Tech",
      description:
        "The global center of electronics, anime, gaming, and manga culture. Akihabara represents Tokyo's high-tech identity with multi-floor arcades, retro console markets, and futuristic electronics boutiques.",
      grammarTag: "Compound: High-Tech",
      image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80",
      highlights: ["Radio Kaikan Hub", "Retro Gaming Arcades", "Manga & Anime Specialty Stores"],
    },
    {
      id: "meiji",
      name: "Meiji Jingu Shrine",
      japanese: "明治神宮",
      district: "Shibuya / Harajuku",
      category: "Shinto Spiritual Sanctuary",
      description:
        "A serene, 170-acre forested retreat dedicated to Emperor Meiji and Empress Shoken. Shaded gravel pathways under giant cedar trees offer a peaceful sanctuary immediately adjacent to lively youth-culture districts.",
      grammarTag: "Nature & Tranquility",
      image: "https://images.unsplash.com/photo-1583484963886-cfe2bff2945f?auto=format&fit=crop&w=1200&q=80",
      highlights: ["Giant Cypress Torii Gate", "170-Acre Sacred Forest", "Sake Barrel Dedication Wall"],
    },
  ] as Attraction[],
  gastronomy: [
    {
      id: "sushi",
      name: "Edomae Nigiri Sushi",
      japanese: "江戸前握り寿司",
      category: "Seafood Masterpiece",
      description:
        "Fresh, pristine raw fish sliced delicately and hand-pressed over warm vinegared rice. Tokyo is the historic birthplace of Edomae sushi, perfected over 200 years to highlight seasonal catch from Tokyo Bay.",
      priceLevel: "$$$ (Luxury dining) to $ (Conveyor belt)",
      bestSpots: "Tsukiji Outer Market, Toyosu Market, Ginza counters",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
      funFact: "Edomae sushi was originally created in Tokyo as quick street food for busy merchants during the Edo period!",
    },
    {
      id: "ramen",
      name: "Tokyo Shoyu Ramen",
      japanese: "東京醤油ラーメン",
      category: "Comfort Noodle Broth",
      description:
        "Springy wheat noodles bathed in a fragrant, golden soy-sauce broth made from chicken, pork bones, and dashi kelp. Topped with braised chashu pork, seasoned soft-boiled egg, and crisp nori seaweed.",
      priceLevel: "$ (Affordable & casual, ¥850 - ¥1,200)",
      bestSpots: "Tokyo Station Ramen Street, Shinjuku, Ikebukuro",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
      funFact: "Eating at a neighborhood ramen shop is less expensive than reserving dinner at a luxury sushi restaurant!",
    },
    {
      id: "monjayaki",
      name: "Tokyo Monjayaki",
      japanese: "もんじゃ焼き",
      category: "Downtown Interactive Griddle",
      description:
        "Tokyo's signature comfort dish: a savory, seasoned liquid batter mixed with shredded cabbage, squid, mentaiko, and cheese, cooked directly on an iron griddle at your table using miniature spatulas (hagashi).",
      priceLevel: "$$ (Moderate, ¥1,200 - ¥1,800)",
      bestSpots: "Tsukishima Monja Street (over 70 specialized restaurants)",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
      funFact: "It began during the Edo period as a way for children to practice writing Japanese characters with batter on hot stoves!",
    },
  ] as FoodItem[],
  traditions: [
    {
      id: "hanami",
      name: "Hanami (Cherry Blossom Viewing)",
      japanese: "花見 (桜)",
      type: "Spring Seasonal Tradition",
      description:
        "A cherished cultural custom dating back over a thousand years. During late March and April, friends, families, and coworkers gather under blooming sakura trees in public parks for outdoor picnics.",
      location: "Ueno Park, Shinjuku Gyoen, Meguro River Promenade",
      image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=1200&q=80",
      details: "Encourages mindfulness and appreciation of the ephemeral, fleeting beauty of life (mono no aware).",
    },
    {
      id: "sumo",
      name: "Sumo Wrestling Tournaments (Honbasho)",
      japanese: "大相撲 (本場所)",
      type: "National Martial Sport & Shinto Ritual",
      description:
        "Japan's sacred national sport combining ancient Shinto purification rituals with intense physical strength. Tokyo hosts three official 15-day Grand Sumo Tournaments each year (January, May, September).",
      location: "Ryogoku Kokugikan National Sumo Arena, Sumida",
      image: "https://images.unsplash.com/photo-1554797589-7241bb691973?auto=format&fit=crop&w=1200&q=80",
      details: "Wrestlers toss salt to purify the sacred ring (dohyo) and clash with explosive power until one wrestler steps out or touches the ground.",
    },
    {
      id: "kanda",
      name: "Kanda Matsuri Festival",
      japanese: "神田祭",
      type: "Historic Grand Shinto Festival",
      description:
        "One of Tokyo's three major festivals, held in mid-May in odd-numbered years. Over 200 mikoshi (portable shrines) are paraded through the streets of central Tokyo by thousands of parishioners in historical Edo costume.",
      location: "Kanda Myojin Shrine & Nihonbashi District",
      image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=80",
      details: "Historically honored the Shogun in Edo Castle to bestow health and prosperity upon the metropolis.",
    },
  ] as TraditionItem[],
  dayTrip: {
    title: "Recommended Day Trip: Historic Coastal Kamakura",
    japanese: "鎌倉 (神奈川県)",
    distance: "50-60 minutes south of Tokyo via JR Yokosuka Line",
    description:
      "For travelers seeking a peaceful escape from the metropolis, Kamakura provides a charming, slow-paced coastal sanctuary. Surrounded by forested hills and the Pacific Ocean, Kamakura served as the medieval samurai capital of Japan in the 12th century.",
    highlights: [
      "Monumental outdoor Great Buddha (Kotoku-in) cast in bronze in 1252 AD",
      "Serene bamboo groves and Zen rock gardens at Hokoku-ji Temple",
      "Yuigahama Beach sunset vistas overlooking Sagami Bay",
      "Traditional matcha teahouses and artisanal souvenir shops along Komachi Street",
    ],
    image: "https://images.unsplash.com/photo-1570459027562-4a916cc6113f?auto=format&fit=crop&w=1200&q=80",
  },
  travelTips: [
    {
      id: "tip1",
      number: 1,
      title: "Always Carry Cash in Japanese Yen (¥)",
      practicalTip: "While credit cards and IC cards work in major train stations and convenience stores, many historic shrines, ramen ticket machines, and local food stalls exclusively accept physical yen notes and coins.",
      reportedGrammar: "Official travel guides advise tourists to carry sufficient cash for neighborhood food stalls.",
      icon: "Coins",
    },
    {
      id: "tip2",
      number: 2,
      title: "Carry a Small Personal Trash Bag",
      practicalTip: "Public street wastebaskets were removed for public safety and cleanliness. Keep a small bag inside your backpack and dispose of trash at your hotel or beside convenience store recycling bins.",
      reportedGrammar: "Hotel concierges remind international guests to carry their personal garbage throughout the day.",
      icon: "Trash2",
    },
    {
      id: "tip3",
      number: 3,
      title: "Secure Mobile eSIM / Pocket Wi-Fi",
      practicalTip: "Tokyo transit is fast but vast. Having reliable mobile data allows instant translation of signs, real-time train platform routing on Google Maps, and navigation through complex subway stations.",
      reportedGrammar: "Frequent travelers tell first-time visitors to set up an eSIM before departing the airport.",
      icon: "Wifi",
    },
    {
      id: "tip4",
      number: 4,
      title: "Maintain Train Etiquette (Silent Mode)",
      practicalTip: "Japanese commuters treat trains as quiet sanctuaries. Switch your phone to 'Manner Mode' (vibration), avoid answering phone calls, and keep conversation volume polite and subdued.",
      reportedGrammar: "Station announcements regularly remind passengers not to speak loudly on public trains.",
      icon: "VolumeX",
    },
    {
      id: "tip5",
      number: 5,
      title: "Finish Street Snacks at the Stall",
      practicalTip: "Eating while walking on crowded sidewalks (aruki-kui) is viewed as impolite and risks spilling food on others. Enjoy your treat directly beside the shop or in designated dining spots.",
      reportedGrammar: "Local authorities tell people not to eat while walking along crowded public sidewalks.",
      icon: "UtensilsCrossed",
    },
  ] as TravelTip[],
  problemSolutions: [
    {
      id: "prob_food",
      title: "Language Barrier at Local Eateries",
      context: "Authentic neighborhood diners (izakaya, ramen bars, tachigui)",
      problem:
        "Many traditional restaurants only display handwritten menus in Japanese kanji without English translations, photos, or English-speaking staff.",
      solution:
        "Use smartphone camera translation apps (Google Translate) to scan menus in real time. Look for realistic plastic food models (sampuru) displayed in shopfront windows, or point to photos on the counter and speak the polite ordering phrase.",
      usefulJapanesePhrase: "これをお願いします (Kore o onegaishimasu / Kore o kudasai)",
      phrasePronunciation: "Ko-reh oh koo-dah-sigh",
      phraseMeaning: "This one, please!",
    },
    {
      id: "prob_train",
      title: "Navigating Giant Transit Hubs (Shinjuku Maze)",
      context: "Massive stations with over 200 exits and 3.5 million daily commuters",
      problem:
        "Getting disoriented inside colossal stations like Shinjuku, Shibuya, or Tokyo Station when transferring between different rail operators.",
      solution:
        "Follow color-coded overhead English signs pointing to designated exits (e.g., East Exit, South Exit). If lost, visit a station gate booth (Koban) where friendly station masters provide English transit maps and direct you to the correct track.",
      usefulJapanesePhrase: "すみません、この電車は渋谷に行きますか？ (Sumimasen, kono densha wa Shibuya ni ikimasu ka?)",
      phrasePronunciation: "Soo-mee-mah-sen, koh-noh den-shah wah Shee-boo-yah nee ee-kee-mahss kah?",
      phraseMeaning: "Excuse me, does this train go to Shibuya?",
    },
  ] as TouristProblem[],
  grammarBank: {
    compoundAdjectives: [
      { word: "world-famous", example: "Tokyo is a world-famous center of culture, hospitality, and cutting-edge design." },
      { word: "densely-populated", example: "It is a densely-populated yet exceptionally organized metropolis." },
      { word: "well-planned", example: "Navigating Tokyo is simple thanks to its well-planned public transit network." },
      { word: "high-tech", example: "Akihabara highlights Tokyo's high-tech identity with retro gaming arcades." },
      { word: "slow-paced", example: "Kamakura provides a quiet, slow-paced coastal escape from the city." },
    ],
    comparatives: [
      { phrase: "cleaner and faster than", example: "Tokyo's subway network is cleaner and faster than transit in western capitals." },
      { phrase: "more expensive than", example: "Central Tokyo accommodations are more expensive than countryside guesthouses." },
      { phrase: "less expensive than", example: "Eating at a ramen shop is less expensive than reserving a luxury sushi dinner." },
    ],
    superlatives: [
      { phrase: "the busiest", example: "Shibuya Crossing is globally recognized as the busiest pedestrian intersection in the world." },
      { phrase: "the most impressive", example: "Tokyo Skytree offers the most impressive 360-degree views of the entire region." },
    ],
    reportedAdvice: [
      { structure: "tell + people + not to eat", example: "Local authorities tell people not to eat while walking on crowded sidewalks." },
      { structure: "advise + tourists + to purchase", example: "Official travel guides advise tourists to purchase a reloadable transit card." },
      { structure: "remind + passengers + not to speak", example: "Station signs regularly remind passengers not to speak loudly on the train." },
    ],
  },
  citations: [
    { title: "Japan National Tourism Organization (JNTO)", url: "https://www.japan.travel", note: "Official guides, transit maps, and etiquette" },
    { title: "Tokyo Convention & Visitors Bureau (Go Tokyo)", url: "https://www.gotokyo.org", note: "Sightseeing portals, festival schedules, and neighborhood profiles" },
    { title: "Japan Rail Pass Official Transit Guide", url: "https://japanrailpass.net", note: "Yamanote Line routes, IC cards (Suica/Pasmo) guidance" },
    { title: "Tokyo Metropolitan Government Tourism Division", url: "https://www.metro.tokyo.lg.jp", note: "Population statistics, urban geography, and cultural archives" },
  ],
};
