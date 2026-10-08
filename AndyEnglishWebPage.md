Aquí tienes la solución completa unificada en **un único archivo `.md` exhaustivo y detallado**.

Contiene tanto la **arquitectura técnica y diseño web de vanguardia** (con Next.js 15, Tailwind CSS, Framer Motion, Vercel y Supabase) como **todo el contenido en inglés de nivel intermedio (B1-B2)** con los 16 requisitos de la rúbrica escolar perfectamente integrados y analizados.

Puedes copiar todo el bloque de código de abajo y guardarlo como `TOKYO_COMPLETE_PROJECT_AND_ARCHITECTURE.md`:

```markdown
# Neo-Edo: Tokyo Interactive Travel Platform & Curriculum Specification
> Comprehensive Full-Stack Architecture, UI/UX System & Academic English Content Guide  
> Project: Unit 5 — My Town, the Best Town (Tokyo, Japan)

---

## TABLE OF CONTENTS
1. [Project Overview & Creative Vision](#1-project-overview--creative-vision)
2. [Full-Stack Architecture & Cloud Infrastructure](#2-full-stack-architecture--cloud-infrastructure)
3. [UI/UX Design System & Animation Philosophy](#3-uiux-design-system--animation-philosophy)
4. [Innovative Features & Interactive Components](#4-innovative-features--interactive-components)
5. [Project Directory & File Structure](#5-project-directory--file-structure)
6. [Academic English Curriculum & Rubric Compliance Matrix](#6-academic-english-curriculum--rubric-compliance-matrix)
7. [Complete Website Content Copy (Intermediate B1-B2 English)](#7-complete-website-content-copy-intermediate-b1-b2-english)
8. [Linguistic & Grammar Reference Bank](#8-linguistic--grammar-reference-bank)
9. [Media Strategy, Image Guidelines & Asset Specification](#9-media-strategy-image-guidelines--asset-specification)
10. [Official Source Citations & References](#10-official-source-citations--references)

---

## 1. PROJECT OVERVIEW & CREATIVE VISION

### 1.1 Executive Concept
"Neo-Edo: Tokyo" is a high-performance interactive web application built to showcase Tokyo, Japan as a world-leading travel destination[cite: 1]. Instead of relying on a conventional static website layout, this platform is conceived as an interactive digital travel guide. It captures the balance between Tokyo's historic Edo-period heritage and its forward-looking metropolitan culture[cite: 1].

### 1.2 Target Audience & Experience Goals
* **Target Audience:** International tourists, cultural travelers, and English-language learners looking for practical, well-structured, and authentic travel insights[cite: 1].
* **Core Experience Goals:**
  * Deliver fast page speeds using the modern Vercel Edge runtime.
  * Provide real-time data persistence and dynamic feedback using Supabase.
  * Ensure full compliance with the academic English requirements through an intuitive "Grammar Lens" interface[cite: 1].

---

## 2. FULL-STACK ARCHITECTURE & CLOUD INFRASTRUCTURE

### 2.1 Frontend Architecture
* **Framework:** Next.js 15 (React 19, App Router)
  * *React Server Components (RSC):* Pre-renders rich tourist content on the server for instant First Contentful Paint (FCP) and optimal search engine indexing.
  * *Client Components:* Isolated strictly to interactive client widgets (such as the virtual transit pass, filterable food carousel, and real-time community polls).
* **Styling Framework:** Tailwind CSS v4 utilizing modern CSS variables and container queries.
* **Animation Engine:** Framer Motion combined with Lenis Smooth Scroll for fluid inertia and scroll-linked reveals.
* **Iconography:** Lucide React for consistent, accessible SVG vector icons.

### 2.2 Backend & Data Layer (Supabase)
* **PostgreSQL Database:** Hosts normalized collections for landmarks, culinary profiles, etiquette tips, and real-time ratings[cite: 1].
* **Supabase Realtime:** Powers a live crowd estimate indicator and user reaction system without page reloads.
* **Supabase Storage:** High-speed Content Delivery Network (CDN) delivering modern WebP and AVIF image assets.
* **Database Schema Blueprint (SQL):**

```sql
-- Attractions and Landmark Profiles
create table public.attractions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  district text not null,
  description text not null,
  category text not null,
  image_url text not null,
  highlight_tag text,
  crowd_index integer default 50
);

-- Traditional Cuisine Catalog
create table public.gastronomy (
  id uuid default gen_random_uuid() primary key,
  dish_name text not null,
  japanese_name text not null,
  description text not null,
  broth_base text,
  price_category text not null,
  photo_url text not null
);

-- Travel Etiquette & Reported Guidelines
create table public.travel_guidelines (
  id uuid default gen_random_uuid() primary key,
  rule_title text not null,
  practical_tip text not null,
  reported_advice text not null,
  category text not null
);

```

### 2.3 Hosting, Edge & CI/CD Pipeline (Vercel)

* **Vercel Edge Network:** Delivers server-rendered pages from global edge nodes closest to the user.
* **Vercel Image Optimization:** Automatically scales and formats photographic assets on demand.
* **Incremental Static Regeneration (ISR):** Statically generates pages while revalidating data in the background every 3600 seconds, ensuring fast load times alongside fresh data.

---

## 3. UI/UX DESIGN SYSTEM & ANIMATION PHILOSOPHY

### 3.1 Color Palette ("Neo-Edo" Aesthetic)

* **Canvas Background (`--color-tokyo-night`):** `#090A0F` — Deep midnight ink providing contrast for text and imagery.
* **Surface Glass (`--color-surface-glass`):** `rgba(20, 22, 33, 0.72)` — Translucent cards paired with a subtle border: `rgba(255, 255, 255, 0.08)`.
* **Sakura Crimson (`--color-sakura-accent`):** `#FF2A5F` — Cherry-blossom neon used for key call-to-actions, badges, and primary interactive states.
* **Cyber Cyan (`--color-cyber-cyan`):** `#00F0FF` — Electric blue accent representing Tokyo's transit lines and high-tech urban energy.


* **Temple Gold (`--color-temple-gold`):** `#E5B869` — Warm metallic tone dedicated to traditional temples, festivals, and cultural heritage.


* **Base Text (`--color-text-primary`):** `#F1F3F7` — High-contrast off-white for body copy.
* **Secondary Text (`--color-text-muted`):** `#A0A6B8` — Balanced gray for descriptive captions and supplementary metadata.

### 3.2 Typography Hierarchy

* **Headings & Display:** *Syne* / *Zen Kaku Gothic New* (Google Fonts) — Geometric display fonts with contemporary Japanese styling.
* **Body Copy:** *Plus Jakarta Sans* — Clean, friendly typography engineered for high legibility at intermediate reading speeds.

---

## 4. INNOVATIVE FEATURES & INTERACTIVE COMPONENTS

### 4.1 The Interactive "Grammar Lens" Mode

An educational switcher embedded in the navigation bar. When visitors toggle the "Grammar Lens", the website dynamically highlights each academic English grammar requirement with visual badges:

* 🟩 **Green Badges:** Compound Adjectives (*world-famous*, *high-tech*, *densely-populated*, *well-planned*, *slow-paced*).


* 🟦 **Blue Badges:** Comparative Structures (*cleaner and faster than*, *more expensive than*, *less expensive than*).


* 🟪 **Purple Badges:** Superlative Structures (*the busiest*, *the most impressive*).


* 🟧 **Orange Badges:** Impersonal Reported Advice & Commands (*tell people not to eat*, *advise tourists to purchase*, *remind passengers not to speak*).



### 4.2 Interactive 3D Digital Suica Pass

A virtual representation of Tokyo's transit card embedded directly into the Hero section.

* Hovering or tapping tilts the card in 3D space using Framer Motion.
* Clicking flips the card over to reveal immediate transit tips: airport transfer routes from Haneda and Narita, recommended subway passes, and commuter etiquette.



### 4.3 Responsive Bento Grid for Attractions

Instead of standard bullet points, the 5 core attractions are arranged in an asymmetrical Bento Grid:

* Large cards for major cultural hubs (Senso-ji Temple and Shibuya Crossing).


* Medium cards for high-altitude landmarks (Tokyo Skytree).


* Compact cards for pop-culture and natural retreats (Akihabara and Meiji Shrine).


* Every card includes photo galleries, best visiting hours, and simulated crowd meters powered by Supabase.

### 4.4 Tourist Problem & Solution Interactive Drawer

A dedicated expandable troubleshooting interface. Visitors click on common traveler issues (such as navigating kanji-only dining menus) to reveal actionable solutions: camera translation tools, how to use plastic food models (*sampuru*), and helpful everyday spoken phrases.

---

## 5. PROJECT DIRECTORY & FILE STRUCTURE

```
tokyo-travel-guide/
├── app/
│   ├── favicon.ico
│   ├── globals.css              # Tailwind CSS v4 variables & custom keyframes
│   ├── layout.tsx               # Root layout, fonts, header, and global footer
│   ├── page.tsx                 # Unified landing page orchestrating all sections
│   └── api/
│       └── crowd-data/route.ts  # Edge route handler querying Supabase
├── components/
│   ├── ui/                      # Base buttons, badges, modals, and tooltips
│   ├── Navigation.tsx           # Sticky blurred header with "Grammar Lens" switch
│   ├── HeroSection.tsx          # Fullscreen video background & 3D Suica Card
│   ├── MetricsBar.tsx           # Key city indicators: location, population, seasons
│   ├── BentoAttractions.tsx     # 5 core landmarks in a dynamic bento layout
│   ├── FoodShowcase.tsx         # 3 traditional dishes with taste and price profiles
│   ├── CultureFestival.tsx      # Traditions and Kanda Matsuri festival highlight
│   ├── DayTripKamakura.tsx      # Coastal excursion with train connection timeline
│   ├── TravelTipsCards.tsx      # 5 flip cards with etiquette & reported advice
│   ├── ProblemSolverDrawer.tsx  # Interactive language troubleshooting drawer
│   └── GrammarBadge.tsx         # Color-coded grammar highlighter component
├── lib/
│   ├── supabaseClient.ts        # Supabase JavaScript client configuration
│   └── siteContent.ts           # Centralized TypeScript content file
└── public/
    └── images/                  # Highly optimized WebP photographic assets

```

---

## 6. ACADEMIC ENGLISH CURRICULUM & RUBRIC COMPLIANCE MATRIX

This project fulfills all 16 distinct requirements outlined in the Unit 5 Project rubric:

| # | Project Requirement | Fulfillment in Website | Implementation Status |
| --- | --- | --- | --- |
| 1 | **City name, location, and population** | Section 7.1 (Hero & Overview) | Verified

 |
| 2 | **Climate and best time to visit** | Section 7.2 (Travel Essentials) | Verified

 |
| 3 | **How to get there and how to get around** | Section 7.2 (Travel Essentials) | Verified

 |
| 4 | **At least 5 attractions or activities** | Section 7.3 (Bento Grid Landmarks) | Verified (5 included)

 |
| 5 | **At least 3 typical foods** | Section 7.4 (Tokyo Gastronomy) | Verified (3 included)

 |
| 6 | **At least 2 cultural traditions or events** | Section 7.5 (Living Heritage) | Verified (2 included)

 |
| 7 | **At least 1 festival** | Section 7.5 (Living Heritage) | Verified (1 included)

 |
| 8 | **At least 1 day trip** | Section 7.6 (Day Trip Spotlight) | Verified (1 included)

 |
| 9 | **At least 5 travel tips** | Section 7.7 (Smart Travel Tips) | Verified (5 included)

 |
| 10 | **At least 1 tourist problem and its solution** | Section 7.8 (Troubleshooting) | Verified (1 included)

 |
| 11 | **At least 5 compound adjectives** | Integrated across copy & Section 8.1 | Verified (5 included)

 |
| 12 | **At least 3 comparatives** | Integrated across copy & Section 8.2 | Verified (3 included)

 |
| 13 | **At least 2 superlatives** | Integrated across copy & Section 8.3 | Verified (2 included)

 |
| 14 | **At least 3 reported advice/commands** | Integrated across copy & Section 8.4 | Verified (3 impersonal forms)

 |
| 15 | **Images that support the information** | Detailed in Section 9 (Media Strategy) | Verified

 |
| 16 | **A list of sources** | Detailed in Section 10 (References) | Verified

 |

---

## 7. COMPLETE WEBSITE CONTENT COPY (INTERMEDIATE B1-B2 ENGLISH)

### 7.1 Hero Section & City Identity

* **Website Headline:** TOKYO: Where Ancient Heritage Meets Tomorrow's World


* **Subtitle:** Welcome to Japan's vibrant capital — a **world-famous** center of culture, hospitality, and cutting-edge design.


* **City Profile Overview:**
> Tokyo is the capital city of Japan, located on the eastern coastline of the main island of Honshu. It is a **densely-populated** yet exceptionally organized metropolis, home to approximately 14 million people in the city center and more than 37 million residents across the broader metropolitan area. Tokyo serves as the political, economic, and creative heart of the nation, offering visitors a safe, welcoming, and endlessly fascinating travel experience.
> 
> 



---

### 7.2 Travel Essentials (Climate, Access & Transit)

#### Climate & Best Seasons to Visit

> Tokyo has a humid subtropical climate characterized by four distinct seasons. Summers are hot and humid, while winters remain mostly sunny and mild. The best time to visit is during spring (from late March to May), when picturesque cherry blossoms decorate the public parks across the metropolis. Autumn (from September to November) is also an excellent season to travel, as temperatures are comfortable and city gardens are filled with colorful red and golden maple foliage.
> 
> 

#### How to Get There & How to Get Around

> **Arriving in Tokyo:** Most international travelers land at Haneda Airport (HND), situated close to central Tokyo, or Narita International Airport (NRT), located east of the city. Both airports offer smooth connections to downtown terminals using express trains, airport limousine buses, and monorails.
> 
> 
> **Getting Around:** Navigating Tokyo is simple thanks to its **well-planned** public transportation network. The city relies primarily on the circular JR Yamanote train line and extensive underground Tokyo Metro systems. Travelers can purchase a rechargeable IC card (Suica or Pasmo) at any train station to tap through ticket gates conveniently.
> 
> 

#### Key Linguistic Comparisons in Transit:

* Tokyo's subway network is **cleaner and faster than** public transit systems in most western capitals.


* Hotel accommodations in central Tokyo are **more expensive than** guesthouses in quiet rural towns.



---

### 7.3 Top 5 Attractions & Activities

#### 1. Senso-ji Temple (Historic Asakusa)

* **Category:** Ancient History & Spirituality
* **Overview:** Senso-ji is Tokyo's oldest and most famous Buddhist temple, originally founded in the 7th century. Travelers enter through the massive Kaminarimon Gate with its iconic red lantern and walk along Nakamise Shopping Street to sample traditional rice crackers and buy souvenirs. It provides a quiet look into traditional Edo culture right in modern Tokyo.



#### 2. Shibuya Crossing & Hachiko Plaza

* **Category:** Urban Culture & Architecture
* **Overview:** Located right outside Shibuya Station, this intersection is known globally as **the busiest** pedestrian crossing in the world. Whenever the traffic signals stop vehicles, thousands of people step onto the street together under massive digital billboards and neon lights. It represents the energy and modern rhythm of Tokyo.



#### 3. Tokyo Skytree

* **Category:** Panoramic Observation & Modern Design
* **Overview:** Soaring 634 meters above the city, the Tokyo Skytree is one of the tallest freestanding towers in the world. Its glass observation decks offer **the most impressive** 360-degree views of the entire metropolitan area. On clear days, visitors can even see Mount Fuji resting on the distant horizon.



#### 4. Akihabara Electric Town

* **Category:** Pop Culture & Entertainment
* **Overview:** Akihabara is the international capital of anime, manga, video games, and consumer electronics. This district highlights Tokyo's **high-tech** identity with multi-story shopping centers, retro arcade halls, and specialty hobby shops found nowhere else in the world.



#### 5. Meiji Jingu Shrine & Yoyogi Park

* **Category:** Nature & Cultural Shinto Heritage
* **Overview:** Dedicated to Emperor Meiji and Empress Shoken, this serene Shinto shrine is hidden inside a dense 170-acre forest in central Tokyo. Walking down its shaded gravel pathways gives travelers a quiet, natural break right beside the lively fashion streets of Harajuku.



---

### 7.4 Authentic Tokyo Gastronomy (3 Typical Foods)

#### 1. Nigiri Sushi

* **Description:** Fresh, premium raw fish sliced thinly and placed over warm, seasoned vinegared rice. Tokyo is the birthplace of modern Edomae-style sushi, which focuses on pristine seafood and careful preparation.


* **Where to Try:** Local sushi counters near the Tsukiji Outer Market or Toyosu Wholesale Market.

#### 2. Tokyo Shoyu Ramen

* **Description:** Springy wheat noodles served in a savory, clear broth seasoned with soy sauce (*shoyu*) and simmered with chicken, pork, and dried bonito flakes. Each bowl is served with tender pork slices (*chashu*), boiled eggs, and seaweed.


* **Where to Try:** Traditional ramen bars in Shinjuku and Tokyo Station's Ramen Street.

#### 3. Monjayaki

* **Description:** A classic pan-fried batter dish that originated in Tokyo's downtown neighborhoods. Mixed with shredded cabbage, seafood, or cheese, the savory batter is cooked directly on an iron griddle at your table using small spatulas.


* **Where to Try:** Tsukishima district, home to a famous street packed with over 70 monjayaki eateries.

#### Comparative Dining Observation:

* Eating at a neighborhood ramen shop is **less expensive than** reserving a dinner at a luxury sushi restaurant, but both offer an authentic taste of Japanese cuisine.



---

### 7.5 Living Culture & Annual Festivals

#### Cultural Tradition 1: Hanami (Cherry Blossom Viewing)

> Every spring, parks across Tokyo fill with people celebrating Hanami. Friends, families, and coworkers spread picnic blankets under blooming sakura trees in places like Ueno Park and Shinjuku Gyoen. This tradition represents the arrival of spring and encourages everyone to appreciate the brief beauty of nature.
> 
> 

#### Cultural Tradition 2: Sumo Grand Tournaments (*Honbasho*)

> Sumo is Japan's national sport, combining traditional Shinto rituals with intense athletic competition. Tokyo hosts three official grand tournaments every year (in January, May, and September) at the Ryogoku Kokugikan arena. Visitors can watch powerful wrestlers compete in circular sand rings following centuries-old customs.
> 
> 

#### Major Annual Festival: Kanda Matsuri

> The Kanda Matsuri is one of Tokyo's three major Shinto festivals, celebrated in mid-May. The festival includes huge processions of musicians, priests on horseback, and thousands of community members in historical Edo-period clothing carrying over 200 portable shrines (*mikoshi*) through central Tokyo to bring good fortune to the city.
> 
> 

---

### 7.6 Day Trip Spotlight: Coastal Kamakura

* **Destination:** Kamakura, Kanagawa Prefecture


* **Travel Distance:** 50 to 60 minutes south of Tokyo via the JR Yokosuka Line.


* **Experience Overview:**
> For travelers who want a change from the city, Kamakura provides a quiet, **slow-paced** coastal escape. Surrounded by green hills and the Pacific Ocean, this historic town served as the political capital of Japan in the 12th century. Visitors can walk through Zen bamboo gardens, enjoy seaside cafes, and visit Kotoku-in Temple to admire the monumental outdoor Great Buddha bronze statue.
> 
> 



---

### 7.7 Smart Travel Tips & Impersonal Reported Advice

#### 5 Essential Travel Tips

1. **Carry Cash in Yen:** While credit cards are widely accepted in modern stores, many small diners and ticket machines only take cash.


2. **Bring a Small Trash Bag:** Public garbage bins are rare on Tokyo streets, so travelers should carry their personal trash until returning to their hotel.


3. **Set Up Mobile Internet:** Renting an eSIM or pocket Wi-Fi router upon arrival is essential for looking up train connections and translating signs.


4. **Follow Train Etiquette:** Keep your phone on silent mode and avoid answering phone calls on trains to keep commutes quiet and comfortable for everyone.


5. **Finish Snacks at the Stall:** Eating while walking on crowded streets is discouraged; it is polite to finish food right beside the vendor.



#### Impersonal Reported Advice & Commands (Unit 5 Grammar Structure)

* Local authorities **tell people not to eat** while walking along crowded public sidewalks.


* Official travel guides **advise tourists to purchase** a reloadable transit card at the airport.


* Station announcements regularly **remind passengers not to speak loudly** on public trains.



---

### 7.8 Tourist Problem & Practical Solution

* **The Problem (Language Barrier at Local Eateries):**
> Many traditional neighborhood restaurants in Tokyo only have menus written in Japanese characters without English translations or photos, which can make ordering food difficult for international visitors.
> 
> 


* **The Practical Solution:**
> Travelers can use smartphone translation apps to scan and translate printed menus in real time. Additionally, many restaurants display realistic plastic food replicas (*sampuru*) in their front display windows. Visitors can easily point to these displays or photo menus and politely say *"Kore o kudasai"* ("This one, please") to order with ease.
> 
> 



---

## 8. LINGUISTIC & GRAMMAR REFERENCE BANK

This section documents how the four required grammar targets are applied across the website copy:

### 8.1 Compound Adjectives (5 Required)

1. **World-famous:** Tokyo is a **world-famous** center of culture, hospitality, and design.


2. **Densely-populated:** It is a **densely-populated** yet exceptionally organized metropolis.


3. **Well-planned:** Navigating Tokyo is simple thanks to its **well-planned** public transit network.


4. **High-tech:** This district highlights Tokyo's **high-tech** identity with specialized electronics markets.


5. **Slow-paced:** Kamakura provides a quiet, **slow-paced** coastal escape from the city.



### 8.2 Comparative Structures (3 Required)

1. Tokyo's subway network is **cleaner and faster than** public transit systems in most western capitals.


2. Hotel accommodations in central Tokyo are **more expensive than** guesthouses in quiet rural towns.


3. Eating at a neighborhood ramen shop is **less expensive than** reserving a dinner at a luxury sushi restaurant.



### 8.3 Superlative Structures (2 Required)

1. Shibuya Crossing is known globally as **the busiest** pedestrian intersection in the world.


2. The Tokyo Skytree offers **the most impressive** 360-degree views of the entire region.



### 8.4 Reported Advice & Commands (3 Impersonal Forms Required)

*Grammar formula: Subject + Reporting Verb + Object + (Not) To + Base Verb*

1. Local authorities **tell people not to eat** while walking along crowded public sidewalks.


2. Official travel guides **advise tourists to purchase** a reloadable transit card at the airport.


3. Station announcements regularly **remind passengers not to speak loudly** on public trains.



---

## 9. MEDIA STRATEGY, IMAGE GUIDELINES & ASSET SPECIFICATION

To fulfill the visual support requirement, the website integrates optimized images for each content section:

| Section | Image Subject & Recommended Visual | Aspect Ratio | Caption & Academic Role |
| --- | --- | --- | --- |
| **Hero** | Wide skyline showing Tokyo Tower and Mount Fuji at sunset | 16:9 | Visual introduction to Tokyo's landscape.

 |
| **Attractions** | Senso-ji Temple's Kaminarimon red lantern in Asakusa | 4:3 | Shows ancient Buddhist architecture.

 |
| **Attractions** | Shibuya Crossing with pedestrians and illuminated signs | 1:1 | Illustrates the busiest crosswalk.

 |
| **Attractions** | Tokyo Skytree rising into the evening sky | 4:5 | Displays the observation tower.

 |
| **Attractions** | Akihabara Electric Town storefronts and colorful billboards | 16:9 | Highlights the high-tech entertainment hub.

 |
| **Attractions** | Torii gate entrance in the Meiji Jingu forest | 4:3 | Represents peaceful nature in the city.

 |
| **Gastronomy** | Fresh sushi assortment served on a slate plate | 1:1 | Illustrates traditional Nigiri sushi.

 |
| **Gastronomy** | Bowl of steaming Tokyo soy sauce (*shoyu*) ramen | 1:1 | Displays classic noodle gastronomy.

 |
| **Gastronomy** | Monjayaki cooking on a flat griddle with small spatulas | 16:9 | Highlights Tokyo's local comfort food.

 |
| **Culture** | Families enjoying a Hanami picnic under blooming sakura | 16:9 | Shows cherry blossom viewing traditions.

 |
| **Culture** | Sumo wrestlers performing rituals at Ryogoku arena | 4:3 | Highlights national wrestling tournaments.

 |
| **Festivals** | Kanda Matsuri parade with ornate portable shrines | 16:9 | Shows portable shrines and historic outfits.

 |
| **Day Trip** | Outdoor bronze Great Buddha statue in Kamakura | 4:3 | Highlights the Kamakura day trip.

 |
| **Problem Solver** | Restaurant window display filled with plastic food replicas | 16:9 | Visual solution for ordering food (*sampuru*).

 |

---

## 10. OFFICIAL SOURCE CITATIONS & REFERENCES

All geographical information, transportation advice, and cultural facts are drawn from official travel organizations:

1. **Japan National Tourism Organization (JNTO):** Official Tokyo Travel Guides, Transportation Access, and Etiquette.
*URL:* `https://www.japan.travel`

2. **Tokyo Convention & Visitors Bureau (Go Tokyo):** Official Tokyo Travel & Sightseeing Portal, Festival Calendars, and Neighborhood Profiles.
*URL:* `https://www.gotokyo.org`

3. **Japan Rail Pass Official Transit Guide:** Route Maps, IC Card Guidance, and Regional Rail Information.
*URL:* `https://japanrailpass.net`

4. **Tokyo Metropolitan Government Tourism Division:** Statistical Overviews, Population Metrics, and City Planning Resources.
*URL:* `https://www.metro.tokyo.lg.jp`


```

---

### Ventajas de este archivo único:
1. **Todo en un solo lugar:** Tienes en el mismo documento tanto las especificaciones técnicas completas (Next.js 15, Vercel, Supabase, Tailwind, animaciones, esquemas SQL y componentes) como los textos en inglés listos para usarse[cite: 1].
2. **Cumplimiento total de la rúbrica escolar:** Cada uno de los 16 puntos solicitados en la imagen del proyecto está desarrollado, categorizado y explicado[cite: 1].
3. **Inglés intermedio auténtico (B1-B2):** La redacción mantiene oraciones claras, fluidas y con la gramática solicitada[cite: 1].

```