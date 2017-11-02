const db = require('../db/config');

const User = {};

//query to find a user
User.findByUserName = username => {
  return db.oneOrNone(
    `SELECT * FROM users
    WHERE username = $1
    `, [username]);
};
User.create = user => {
  return db.one(`
    INSERT INTO users
    (username, password_digest, name, email)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `, [user.username, user.password_digest, user.name, user.email])
};


module.exports = User;
