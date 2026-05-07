-- ============================================================
--  Travel Lunatics – Admin System Migration
--  Safe to run multiple times (idempotent)
-- ============================================================

-- Admin users table
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inquiries table (for contact form persistence)
CREATE TABLE IF NOT EXISTS inquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'unread',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tour packages table
CREATE TABLE IF NOT EXISTS tour_packages (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  short_description TEXT,
  description TEXT,
  price DECIMAL(10, 2),
  duration VARCHAR(100),
  location VARCHAR(255),
  included TEXT[],
  excluded TEXT[],
  itinerary JSONB DEFAULT '[]',
  images TEXT[],
  cover_image VARCHAR(500),
  tags TEXT[],
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Experiences table
CREATE TABLE IF NOT EXISTS experiences (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  images TEXT[],
  activity_type VARCHAR(100),
  duration VARCHAR(100),
  price DECIMAL(10, 2),
  location VARCHAR(255),
  difficulty VARCHAR(50),
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Site settings (key-value store)
CREATE TABLE IF NOT EXISTS site_settings (
  key VARCHAR(100) PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Default site settings
INSERT INTO site_settings (key, value) VALUES
  ('site_name', 'Travel Lunatics'),
  ('site_tagline', 'Discover the Beauty of Sri Lanka'),
  ('contact_email', 'info@travellunatics.com'),
  ('contact_phone', '+94 77 123 4567'),
  ('contact_address', 'Colombo, Sri Lanka'),
  ('facebook_url', ''),
  ('instagram_url', ''),
  ('twitter_url', ''),
  ('whatsapp_number', ''),
  ('google_maps_url', ''),
  ('meta_description', 'Discover the beauty of Sri Lanka with Travel Lunatics. Expert travel guides for beaches, temples, wildlife and cultural experiences.')
ON CONFLICT (key) DO NOTHING;

-- Add featured column to destinations if not exists
ALTER TABLE destinations ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;
ALTER TABLE destinations ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT true;

-- Add status column to testimonials
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'approved';
