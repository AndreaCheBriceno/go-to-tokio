-- Enable UUID generation if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table for Live Editable Site Content (CMS connected to page)
CREATE TABLE IF NOT EXISTS public.site_content (
  id TEXT PRIMARY KEY,
  section TEXT NOT NULL,
  key_name TEXT NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  extra_data JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table for Interactive Student / Presentation Polls & Reactions
CREATE TABLE IF NOT EXISTS public.interactive_poll (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  votes INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interactive_poll ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Public site_content select" ON public.site_content;
DROP POLICY IF EXISTS "Public site_content update" ON public.site_content;
DROP POLICY IF EXISTS "Public site_content insert" ON public.site_content;

DROP POLICY IF EXISTS "Public interactive_poll select" ON public.interactive_poll;
DROP POLICY IF EXISTS "Public interactive_poll update" ON public.interactive_poll;
DROP POLICY IF EXISTS "Public interactive_poll insert" ON public.interactive_poll;

-- Create Open Policies for Student Demo / Live Editing
CREATE POLICY "Public site_content select" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Public site_content update" ON public.site_content FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public site_content insert" ON public.site_content FOR INSERT WITH CHECK (true);

CREATE POLICY "Public interactive_poll select" ON public.interactive_poll FOR SELECT USING (true);
CREATE POLICY "Public interactive_poll update" ON public.interactive_poll FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public interactive_poll insert" ON public.interactive_poll FOR INSERT WITH CHECK (true);

-- Pre-seed initial content
INSERT INTO public.site_content (id, section, key_name, title, content)
VALUES
  ('hero_title', 'hero', 'headline', 'TOKYO: Where Ancient Heritage Meets Tomorrow''s World', 'Tokyo: The Ultimate Tourist Destination'),
  ('hero_subtitle', 'hero', 'subheadline', 'Welcome to Japan''s vibrant capital', 'A world-famous, high-tech metropolis where ancient tradition meets the future!'),
  ('city_overview', 'overview', 'summary', 'Metropolis Overview', 'Tokyo is the capital city of Japan, located on the eastern coastline of Honshu island. It is a densely-populated yet exceptionally organized metropolis, home to over 14 million people in the city center and approximately 37 million residents across the metropolitan area. Central Tokyo is cleaner and faster than most capital cities in the world.'),
  ('climate_info', 'essentials', 'climate', 'Climate & Best Seasons', 'Tokyo enjoys a humid subtropical climate with four distinct seasons. The best time to visit is during spring (March to May) for cherry blossoms (sakura) or autumn (September to November) for vibrant foliage. Summers are energetic yet humid, while winters remain crisp, sunny, and mild.'),
  ('transit_info', 'essentials', 'transit', 'Getting There & Around', 'Arrive via Haneda (HND) or Narita (NRT) international airports. Getting around is effortless with the circular JR Yamanote Line and extensive Tokyo Metro network. Subway cars are cleaner and faster than transit in western cities.'),
  ('sensoji_desc', 'attractions', 'sensoji', 'Senso-ji Temple', 'Tokyo''s oldest and most iconic Buddhist temple in Asakusa, founded in 645 AD. Walk through the giant Kaminarimon lantern gate and explore traditional Nakamise street for Edo snacks.'),
  ('shibuya_desc', 'attractions', 'shibuya', 'Shibuya Crossing', 'The beating heart of modern Tokyo with famous neon-lit crosswalks. Globally celebrated as the busiest pedestrian intersection on the planet, with up to 3,000 people crossing at once.'),
  ('skytree_desc', 'attractions', 'skytree', 'Tokyo Skytree', 'Standing 634 meters high, this architectural marvel offers the most impressive 360-degree panoramic views of Tokyo and Mount Fuji on clear days.'),
  ('akihabara_desc', 'attractions', 'akihabara', 'Akihabara Electric Town', 'The global center of electronics, anime, gaming, and manga culture. A high-tech wonderland of multi-story arcade centers and themed cafes.'),
  ('meiji_desc', 'attractions', 'meiji', 'Meiji Jingu Shrine', 'A serene, 170-acre forested retreat dedicated to Emperor Meiji and Empress Shoken, offering tranquil walking paths beside buzzing Harajuku.'),
  ('sushi_desc', 'food', 'sushi', 'Nigiri Sushi', 'Fresh, pristine raw fish sliced delicately over warm, seasoned vinegared rice. Tokyo is the birthplace of modern Edomae sushi.'),
  ('ramen_desc', 'food', 'ramen', 'Tokyo Shoyu Ramen', 'Springy wheat noodles served in a savory, clear soy-sauce broth simmered with chicken and pork, topped with melt-in-your-mouth chashu slices.'),
  ('monja_desc', 'food', 'monjayaki', 'Monjayaki', 'Traditional savory pan-fried batter made right at your table with cabbage and seafood using tiny spatulas, famous in the Tsukishima district.'),
  ('hanami_desc', 'culture', 'hanami', 'Hanami (Sakura Viewing)', 'Centuries-old spring tradition of picnicking under blooming cherry blossom trees with friends and family in parks like Ueno and Shinjuku Gyoen.'),
  ('sumo_desc', 'culture', 'sumo', 'Sumo Wrestling (Honbasho)', 'Japan''s ancient national sport combining Shinto spirituality with intense physical power, held at the historic Ryogoku Kokugikan arena.'),
  ('kanda_desc', 'culture', 'kanda_matsuri', 'Kanda Matsuri Festival', 'One of Tokyo''s three great Shinto festivals, featuring over 200 mikoshi portable shrines and thousands of locals in Edo-era attire.'),
  ('kamakura_desc', 'daytrip', 'kamakura', 'Day Trip: Historic Kamakura', 'A charming slow-paced coastal town only one hour south by train, renowned for its monumental bronze Great Buddha, Zen gardens, and beaches.'),
  ('problem_food', 'problem_solution', 'food_ordering', 'Problem: Language Barrier at Restaurants', 'Menus at local spots are exclusively in Japanese characters without photos.'),
  ('solution_food', 'problem_solution', 'food_solution', 'Solution: Visuals & Key Phrases', 'Use translation apps, look at realistic plastic food replicas (sampuru) in windows, or point and politely say "Kore o kudasai" ("This one, please").'),
  ('problem_trains', 'problem_solution', 'train_stations', 'Problem: Massive Station Mazes', 'Getting lost inside colossal transit hubs like Shinjuku or Tokyo Station.'),
  ('solution_trains', 'problem_solution', 'train_solution', 'Solution: Signage & Station Masters', 'Follow numbered color-coded overhead English signs or ask staff at the gate booth (Koban).')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  updated_at = NOW();

-- Pre-seed interactive poll reactions
INSERT INTO public.interactive_poll (id, label, votes)
VALUES
  ('ramen_fan', 'Ramen Lovers', 42),
  ('sushi_fan', 'Sushi Enthusiasts', 38),
  ('anime_fan', 'Akihabara Geeks', 55),
  ('culture_fan', 'Tradition & Temples', 49)
ON CONFLICT (id) DO NOTHING;
