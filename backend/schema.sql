CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL,
  message TEXT,
  ip TEXT,
  country TEXT,
  region TEXT,
  city TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE page_visits (
  id SERIAL PRIMARY KEY,
  path TEXT,
  ip TEXT,
  country TEXT,
  region TEXT,
  city TEXT,
  user_agent TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  device_vendor TEXT,
  device_model TEXT,
  visited_at TIMESTAMP DEFAULT NOW()
);
