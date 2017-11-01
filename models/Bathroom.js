const db = require('../db/config');

const Bathroom = {};


//get model to add bathroom to db
Bathroom.create = (bathroom) => {
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
    created_at,
    updated_at,
    country,
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
      $/created_at/,
      $/updated_at/,
      $/country/
    )
    RETURNING *`,
    bathrooms
  );
}
