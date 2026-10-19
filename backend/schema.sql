CREATE TABLE IF NOT EXISTS portfolio (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  owner_name TEXT NOT NULL,
  headline TEXT NOT NULL,
  bio TEXT NOT NULL,
  email TEXT,
  location TEXT,
  skills TEXT,
  projects TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
