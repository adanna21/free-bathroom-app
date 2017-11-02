CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(15) NOT NULL UNIQUE,
  password_digest TEXT NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE
);


CREATE TABLE IF NOT EXISTS bathrooms (
  id SERIAL PRIMARY KEY,
  name CHAR(255),
  street CHAR(255),
  city VARCHAR(100),
  state CHAR(2) NOT NULL,
  accessible BOOLEAN NOT NULL,
  unisex BOOLEAN NOT NULL,
  price BOOLEAN NOT NULL,
  directions TEXT,
  comment TEXT,
  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6),
  country CHAR(100) NOT NULL,
  distance DECIMAL(9,6),
  user_id INTEGER REFERENCES users(id)
);
