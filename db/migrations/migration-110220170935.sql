DELETE FROM users;

ALTER TABLE users DROP COLUMN password_encrypt;
ALTER TABLE users ADD COLUMN password_digest TEXT NOT NULL;
