-- Create tables for travel agency

-- Destinations table
CREATE TABLE IF NOT EXISTS destinations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
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

-- Trip requests/bookings table
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

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  destination_id INT REFERENCES destinations(id),
  rating INT CHECK (rating >= 1 AND rating <= 5),
  review TEXT NOT NULL,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Travel buddies (community) table
CREATE TABLE IF NOT EXISTS travel_buddies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  destination_id INT REFERENCES destinations(id),
  travel_date DATE,
  travelers_count INT,
  bio TEXT,
  interests TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample destinations
INSERT INTO destinations (name, description, image_url, category, price_from, duration_days, rating, reviews_count, highlights)
VALUES
  ('Sigiriya Lion Rock', 'Ancient rock fortress with stunning views and rich history', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500', 'Historical', 150, 2, 4.8, 324, ARRAY['Ancient fortress', 'Panoramic views', 'Rock climbing', 'Archaeological site']),
  ('Mirissa Beach', 'Pristine coastal paradise known for whale watching and golden sunsets', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500', 'Beach', 120, 3, 4.9, 512, ARRAY['Whale watching', 'Golden sunsets', 'Water sports', 'Beach clubs']),
  ('Kandy Temple of the Tooth', 'Sacred Buddhist temple housing the tooth relic of Buddha', 'https://images.unsplash.com/photo-1548013146-72ad6854fdf1?w=500', 'Spiritual', 100, 1, 4.7, 289, ARRAY['Sacred temple', 'Cultural experience', 'Local traditions', 'Spiritual rituals']),
  ('Ella Rock', 'Scenic mountain hiking destination with breathtaking valley views', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500', 'Adventure', 80, 1, 4.8, 198, ARRAY['Hiking trails', 'Valley views', 'Tea plantations', 'Mountain scenery']),
  ('Arugambe Beach', 'Vibrant beach town perfect for surfing and laid-back vibes', 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=500', 'Beach', 100, 2, 4.6, 267, ARRAY['Surfing', 'Beach bars', 'Water sports', 'Sunset views']),
  ('Horton Plains', 'Misty highlands with unique ecosystem and stunning walking trails', 'https://images.unsplash.com/photo-1542401886-65d27afda266?w=500', 'Nature', 110, 2, 4.9, 401, ARRAY['Hiking', 'Misty landscape', 'Wildlife', 'Photography']);

INSERT INTO testimonials (name, destination_id, rating, review, image_url)
VALUES
  ('Sarah Johnson', 1, 5, 'The climb to Sigiriya was unforgettable! Amazing views and well-preserved archaeological site. Highly recommend!', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'),
  ('Michael Chen', 2, 5, 'Whale watching in Mirissa was the highlight of my trip. Professional guides and stunning sunset experience.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'),
  ('Emma Wilson', 3, 4, 'The Temple of the Tooth is truly magnificent. Great cultural experience and peaceful atmosphere.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'),
  ('James Rodriguez', 4, 5, 'Ella Rock hike was incredible! Saw tea plantations, amazing views, and met wonderful local people.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'),
  ('Lisa Anderson', 5, 5, 'Best beach and surf experience! The town has great vibes, delicious food, and friendly locals.', 'https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?w=150');
