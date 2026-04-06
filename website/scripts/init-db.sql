-- ============================================================
--  Travel Lunatics – Database Init
--  Safe to run multiple times (idempotent)
-- ============================================================

-- Destinations table
CREATE TABLE IF NOT EXISTS destinations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  image_url VARCHAR(500),
  category VARCHAR(100),
  price_from DECIMAL(10, 2),
  duration_days INT,
  rating DECIMAL(3, 2),
  reviews_count INT DEFAULT 0,
  highlights TEXT[],
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS trip_requests (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  destination_id INT REFERENCES destinations(id),
  travel_date DATE,
  travelers_count INT,
  budget_range VARCHAR(50),
  special_requirements TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  destination_id INT REFERENCES destinations(id),
  rating INT CHECK (rating >= 1 AND rating <= 5),
  review TEXT NOT NULL,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS travel_buddies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  country VARCHAR(255),
  travel_type VARCHAR(100),
  places TEXT[],
  travel_date DATE,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  review TEXT NOT NULL,
  image_url VARCHAR(500),
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- make sure legacy installs have the correct columns
ALTER TABLE travel_buddies
  ADD COLUMN IF NOT EXISTS country VARCHAR(255),
  ADD COLUMN IF NOT EXISTS travel_type VARCHAR(100),
  ADD COLUMN IF NOT EXISTS places TEXT[],
  ADD COLUMN IF NOT EXISTS rating INT CHECK (rating >= 1 AND rating <= 5),
  ADD COLUMN IF NOT EXISTS review TEXT,
  ADD COLUMN IF NOT EXISTS image_url VARCHAR(500),
  ADD COLUMN IF NOT EXISTS approved BOOLEAN DEFAULT false;

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
--  DESTINATIONS  (one INSERT per row + ON CONFLICT DO NOTHING)
-- ============================================================

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Unawatuna Beach', 'A crescent-shaped bay fringed by coral reefs and swaying palms, perfect for snorkelling and relaxed beach life.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', 'Beach', 90, 2, 4.7, 410, ARRAY['Coral reef snorkelling','Beachside restaurants','Turtle watching','Calm swimming waters'], 6.0099, 80.2498) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Mirissa Beach', 'Pristine coastal paradise known for whale watching and golden sunsets.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', 'Beach', 120, 3, 4.9, 512, ARRAY['Whale watching','Golden sunsets','Water sports','Beach clubs'], 5.9483, 80.4716) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Hikkaduwa Beach', 'Sri Lanka''s most vibrant beach strip – famous for its colourful coral sanctuary, surf breaks, and lively nightlife.', 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800', 'Beach', 95, 2, 4.6, 378, ARRAY['Coral sanctuary','Glass-bottom boats','Surfing','Nightlife & beach bars'], 6.1395, 80.1063) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Arugam Bay', 'Vibrant beach town on the east coast – a world-class surf point with laid-back vibes and stunning wildlife nearby.', 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800', 'Beach', 100, 2, 4.6, 267, ARRAY['Surfing','Beach bars','Water sports','Sunset views'], 6.8396, 81.8361) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Nilaveli Beach', 'Unspoiled white-sand beach in the north-east, gateway to Pigeon Island and crystal-clear snorkelling waters.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', 'Beach', 110, 3, 4.8, 189, ARRAY['Pigeon Island day trips','Snorkelling','Peaceful sands','Sea turtle sightings'], 8.7167, 81.2167) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Bentota Beach', 'Elegant resort beach where the Bentota lagoon meets the Indian Ocean – ideal for water sports and luxury escapes.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', 'Beach', 130, 2, 4.7, 302, ARRAY['Water sports centre','Lagoon boat rides','Luxury resorts','Ayurveda spas'], 6.4269, 79.9969) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Tangalle Beach', 'Laid-back southern gem with wide open bays, nesting sea turtles, and some of the most unspoiled shoreline in Sri Lanka.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', 'Beach', 85, 2, 4.6, 214, ARRAY['Sea turtle nesting','Remote bays','Fishing village vibes','Blowholes nearby'], 6.0243, 80.7974) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Pasikudah Beach', 'Shallow turquoise lagoon with calm, crystal-clear waters stretching far out – perfect for families and waders.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', 'Beach', 115, 3, 4.8, 276, ARRAY['Shallow calm waters','Kitesurfing','Luxury beach hotels','Spectacular sunrises'], 7.9297, 81.5631) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Ella Rock', 'Scenic mountain hiking destination with breathtaking valley views and emerald tea plantations.', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', 'Adventure', 80, 1, 4.8, 198, ARRAY['Hiking trails','Valley views','Tea plantations','Mountain scenery'], 6.8667, 81.0466) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Little Adam''s Peak', 'An easy but rewarding hike near Ella with panoramic views over the valley — perfect for sunrise seekers.', 'https://images.unsplash.com/photo-1542401886-65d27afda266?w=800', 'Adventure', 60, 1, 4.7, 312, ARRAY['Sunrise hike','360 views','Tea estate walk','Accessible trail'], 6.8750, 81.0561) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Pidurangala Rock', 'A boulder-scramble that rewards hikers with the best panoramic view of Sigiriya — popular at sunrise.', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', 'Adventure', 70, 1, 4.8, 247, ARRAY['Sigiriya panorama','Sunrise viewpoint','Rock scramble','Ancient cave temple'], 7.9611, 80.7592) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Knuckles Mountain Range', 'UNESCO-listed cloud forest massif with rare biodiversity, misty peaks, and multi-day trekking routes.', 'https://images.unsplash.com/photo-1542401886-65d27afda266?w=800', 'Nature', 140, 3, 4.9, 163, ARRAY['UNESCO World Heritage','Cloud forest trekking','Endemic wildlife','Village homestays'], 7.4333, 80.8000) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Horton Plains National Park', 'Misty highland plateau with a unique ecosystem, World''s End cliff drop, and Baker''s Falls.', 'https://images.unsplash.com/photo-1542401886-65d27afda266?w=800', 'Nature', 110, 2, 4.9, 401, ARRAY['Hiking','Misty landscape','Wildlife','Photography'], 6.8024, 80.8060) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Sigiriya Rock Fortress', 'Ancient rock fortress with stunning views, frescoes, and 1,500 years of history.', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'Historical', 150, 2, 4.8, 324, ARRAY['Ancient fortress','Panoramic views','Rock climbing','Archaeological site'], 7.9570, 80.7603) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Nine Arch Bridge', 'A spectacular colonial-era viaduct nestled in lush tea-garden hills near Ella — iconic when a train passes.', 'https://images.unsplash.com/photo-1548013146-72ad6854fdf1?w=800', 'Historical', 50, 1, 4.8, 589, ARRAY['Train photography','Tea plantation walk','Engineering marvel','Sunrise viewpoint'], 6.8748, 81.0599) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('World''s End', 'A sheer 870m cliff edge at the end of Horton Plains — best before the morning mist rolls in.', 'https://images.unsplash.com/photo-1542401886-65d27afda266?w=800', 'Nature', 110, 1, 4.9, 334, ARRAY['Sheer cliff viewpoint','Early morning hike','Cloud forest','Baker''s Falls nearby'], 6.7993, 80.8038) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Ravana Falls', 'One of Sri Lanka''s widest waterfalls, steeped in Ramayana legend near Ella.', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', 'Nature', 55, 1, 4.5, 278, ARRAY['Mythological site','Swimming pool','Roadside beauty','Cave exploration nearby'], 6.8622, 81.0464) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Bambarakanda Falls', 'Sri Lanka''s tallest waterfall plunging 263m through tropical forest — a hidden gem in the highlands.', 'https://images.unsplash.com/photo-1542401886-65d27afda266?w=800', 'Nature', 75, 1, 4.7, 152, ARRAY['Tallest waterfall','Jungle trek','Photography','Picnic spot'], 6.7392, 80.7775) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Yala National Park', 'Sri Lanka''s most famous safari destination — home to the world''s highest density of leopards.', 'https://images.unsplash.com/photo-1542401886-65d27afda266?w=800', 'Wildlife', 180, 2, 4.9, 623, ARRAY['Leopard safaris','Elephant herds','Sloth bears','Bird watching'], 6.3728, 81.5166) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Udawalawe National Park', 'Best park to see large herds of wild elephants in open grasslands.', 'https://images.unsplash.com/photo-1542401886-65d27afda266?w=800', 'Wildlife', 140, 2, 4.8, 441, ARRAY['Elephant herds','Open grassland safaris','Elephant transit home','Bird watching'], 6.4749, 80.8997) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Wilpattu National Park', 'Sri Lanka''s largest national park with natural lakes (villus), leopards, and a remote wilderness feel.', 'https://images.unsplash.com/photo-1542401886-65d27afda266?w=800', 'Wildlife', 160, 2, 4.7, 287, ARRAY['Leopard sightings','Natural lakes','Remote wilderness','Sloth bear'], 8.4167, 80.0333) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Minneriya National Park', 'Famous for The Gathering — hundreds of elephants around the ancient reservoir from July to October.', 'https://images.unsplash.com/photo-1542401886-65d27afda266?w=800', 'Wildlife', 130, 1, 4.8, 356, ARRAY['The Gathering event','Elephant herds','Scenic reservoir','Bird watching'], 8.0333, 80.9000) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Kaudulla National Park', 'Extension of the elephant corridor with seasonal gatherings rivalling Minneriya — less crowded and serene.', 'https://images.unsplash.com/photo-1542401886-65d27afda266?w=800', 'Wildlife', 125, 1, 4.7, 198, ARRAY['Elephant corridor','Seasonal gathering','Tank wetlands','Bird watching'], 8.1667, 80.9167) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Temple of the Sacred Tooth Relic', 'Sacred Buddhist temple in Kandy housing the tooth relic of the Buddha.', 'https://images.unsplash.com/photo-1548013146-72ad6854fdf1?w=800', 'Spiritual', 100, 1, 4.7, 289, ARRAY['Sacred temple','Cultural experience','Local traditions','Spiritual rituals'], 7.2936, 80.6412) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Ancient City of Anuradhapura', 'UNESCO-listed ancient capital with colossal stupas, sacred Bo tree, and 2,500 years of Buddhist civilisation.', 'https://images.unsplash.com/photo-1548013146-72ad6854fdf1?w=800', 'Historical', 130, 2, 4.8, 412, ARRAY['UNESCO Heritage','Sacred Bo tree','Ancient stupas','Moonstone carvings'], 8.3354, 80.4036) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Ancient City of Polonnaruwa', 'Well-preserved medieval royal city with spectacular stone sculptures and a vast irrigation tank.', 'https://images.unsplash.com/photo-1548013146-72ad6854fdf1?w=800', 'Historical', 120, 2, 4.7, 318, ARRAY['UNESCO Heritage','Gal Vihara sculptures','Royal palace ruins','Parakrama Samudra'], 7.9403, 81.0188) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Dambulla Cave Temple', 'A UNESCO World Heritage cave complex with 153 Buddha statues and 2,100 sq m of ceiling murals.', 'https://images.unsplash.com/photo-1548013146-72ad6854fdf1?w=800', 'Spiritual', 80, 1, 4.8, 367, ARRAY['UNESCO Heritage','Cave murals','153 Buddha statues','Golden Temple'], 7.8568, 80.6492) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Galle Fort', 'A well-preserved Dutch colonial fortified city — a living heritage town with art galleries and boutique hotels.', 'https://images.unsplash.com/photo-1548013146-72ad6854fdf1?w=800', 'Historical', 90, 2, 4.8, 534, ARRAY['Dutch colonial walls','Boutique shopping','Lighthouse','Sunset ramparts'], 6.0298, 80.2167) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Adam''s Peak', 'Sacred mountain pilgrimage site (Sri Pada) revered by four religions — the sunrise from the summit is legendary.', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', 'Spiritual', 95, 1, 4.9, 487, ARRAY['Sacred pilgrimage','Sunrise summit','Multi-faith site','Night trek'], 6.8096, 80.4994) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Sinharaja Forest Reserve', 'Sri Lanka''s last primary tropical rainforest — a UNESCO Biosphere Reserve teeming with endemic species.', 'https://images.unsplash.com/photo-1542401886-65d27afda266?w=800', 'Nature', 125, 2, 4.8, 241, ARRAY['UNESCO Biosphere','Endemic birds','Guided jungle walks','Rare flora & fauna'], 6.4167, 80.5000) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Kitulgala', 'Adrenaline hub on the Kelani River — white-water rafting, canyoning, and jungle survival experiences.', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', 'Adventure', 100, 1, 4.7, 312, ARRAY['White-water rafting','Canyoning','Bird watching','Filming location'], 6.9894, 80.4161) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Riverston', 'Hidden gem in the Knuckles foothills with misty valleys, end-of-the-world viewpoints, and quiet forest trails.', 'https://images.unsplash.com/photo-1542401886-65d27afda266?w=800', 'Nature', 85, 1, 4.8, 167, ARRAY['Mini Worlds End','Misty viewpoints','Waterfalls','Off-the-beaten-path'], 7.5167, 80.8500) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Diyaluma Falls', 'Sri Lanka''s second-highest waterfall cascading 220m in tiers — upper rock pools are perfect for swimming.', 'https://images.unsplash.com/photo-1542401886-65d27afda266?w=800', 'Nature', 70, 1, 4.8, 278, ARRAY['Natural rock pools','Photography','Jungle trek','Second-highest falls'], 6.7234, 81.0021) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Pigeon Island National Park', 'Marine national park off Nilaveli with vibrant coral reefs and resident blacktip reef sharks.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', 'Beach', 145, 1, 4.8, 312, ARRAY['Coral reef snorkelling','Reef sharks','Tropical fish','Boat day-trip'], 8.7333, 81.2167) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Nainativu Island', 'Serene island in the Jaffna lagoon accessible only by boat — home to a sacred Hindu temple and a Buddhist shrine.', 'https://images.unsplash.com/photo-1548013146-72ad6854fdf1?w=800', 'Spiritual', 90, 1, 4.7, 189, ARRAY['Nagapooshani Amman temple','Buddhist stupa','Boat pilgrimage','Jaffna lagoon'], 9.6500, 79.8167) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Delft Island', 'Remote island in the Palk Strait — famous for wild ponies, ancient Portuguese ruins, and baobab trees.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', 'Adventure', 110, 1, 4.6, 134, ARRAY['Wild ponies','Portuguese ruins','Baobab trees','Remote exploration'], 9.6667, 79.6833) ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights, latitude, longitude) VALUES ('Paravi Duwa Temple', 'A tiny island temple connected to Matara by a footbridge — a peaceful sanctuary dedicated to the god Vishnu.', 'https://images.unsplash.com/photo-1548013146-72ad6854fdf1?w=800', 'Spiritual', 40, 1, 4.5, 98, ARRAY['Island temple','Footbridge walk','Matara attraction','Peaceful atmosphere'], 5.9500, 80.5333) ON CONFLICT (name) DO NOTHING;

-- ============================================================
--  TESTIMONIALS SEED
-- ============================================================

INSERT INTO testimonials (name, destination_id, rating, review, image_url) SELECT 'Sarah Johnson', id, 5, 'The climb to Sigiriya was unforgettable! Amazing views and well-preserved archaeological site.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' FROM destinations WHERE name = 'Sigiriya Rock Fortress' ON CONFLICT DO NOTHING;

INSERT INTO testimonials (name, destination_id, rating, review, image_url) SELECT 'Michael Chen', id, 5, 'Whale watching in Mirissa was the highlight of my trip. Professional guides and stunning sunset experience.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' FROM destinations WHERE name = 'Mirissa Beach' ON CONFLICT DO NOTHING;

INSERT INTO testimonials (name, destination_id, rating, review, image_url) SELECT 'Emma Wilson', id, 4, 'The Temple of the Tooth is truly magnificent. Great cultural experience and peaceful atmosphere.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' FROM destinations WHERE name = 'Temple of the Sacred Tooth Relic' ON CONFLICT DO NOTHING;

INSERT INTO testimonials (name, destination_id, rating, review, image_url) SELECT 'James Rodriguez', id, 5, 'Ella Rock hike was incredible! Saw tea plantations, amazing views, and met wonderful local people.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' FROM destinations WHERE name = 'Ella Rock' ON CONFLICT DO NOTHING;

INSERT INTO testimonials (name, destination_id, rating, review, image_url) SELECT 'Lisa Anderson', id, 5, 'Best beach and surf experience! The town has great vibes, delicious food, and friendly locals.', 'https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?w=150' FROM destinations WHERE name = 'Arugam Bay' ON CONFLICT DO NOTHING;