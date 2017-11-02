const db = require('../db/config');

const Bathroom = {};

//query all bathrooms for specific user
Bathroom.findAll = (id) => {
  console.log(id);
  return db.manyOrNone(`
    SELECT *
    FROM bathrooms
    WHERE user_id = $1
    `, [id]);
};

//get tasks by their id from db
Bathroom.findById = id => {
  return db.one(
    `SELECT * FROM bathrooms
     WHERE id = $1`, [id] );
};


//get model to add bathroom to db
Bathroom.create = (bathroom, user_id) => {
  bathroom.user_id = user_id;
  return db.one(
    `INSERT INTO bathrooms
    (name,
    street,
    city,
    state,
    accessible,
    unisex,
    price,
    directions,
    comment,
    latitude,
    longitude,
    country,
    user_id
    )VALUES (
      $/name/,
      $/street/,
      $/city/,
      $/state/,
      $/accessible/,
      $/unisex/,
      $/price/,
      $/directions/,
      $/comment/,
      $/latitude/,
      $/longitude/,
      $/country/,
      $/user_id/
    )
    RETURNING *`,
    bathroom
  );
}

module.exports = Bathroom;
