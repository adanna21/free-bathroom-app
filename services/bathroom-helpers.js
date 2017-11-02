const axios = require('axios');

let bathroom = {};

bathroom.api = function (req, res, next) {
  let lat = req.body.lat;
  let lng = req.body.lng;

  const url = `https://www.refugerestrooms.org:443/api/v1/restrooms/by_location.json?lat=${lat}&lng=${lng}`

  axios({
    url,
    method: 'GET',
  })
  .then(response => {
    console.log(response.data);
    return res.json(
      { bathrooms: response.data,
        user: res.locals.user //used to end badck user stat to client
      })

    // response.data.forEach((e, i) => {
    //   const { name, street, city, state, unisex, directions, latitude, longitude } = e;
    //   // res.locals.information = {
    //   //   name, street, city, state, unisex, directions, latitude, longitude
    //   // }
    //   // next();
    //   res.json({name, street, city, state, unisex, directions, latitude, longitude});
    // })
  })
  .catch(err => console.error(err));
}

module.exports = bathroom;
