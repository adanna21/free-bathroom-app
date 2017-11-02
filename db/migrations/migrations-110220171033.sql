ALTER TABLE users DROP COLUMN bathroom_id;

ALTER TABLE bathrooms ADD COLUMN user_id INTEGER REFERENCES users(id);
