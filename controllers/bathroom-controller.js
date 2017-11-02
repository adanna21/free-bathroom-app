// const iso = require('isomorphic-fetch')
//
// let url = 'https://www.refugerestrooms.org:443/api/v1/restrooms/by_location.json?lat=40.7507815&lng=-73.991148'
//
// fetch(url)
// .then(res => res.json())
// .then(json => {
//   // do shit
// })


const Bathroom = require('../models/Bathroom');

const bathroomController = {};

bathroomController.index = (req, res) => {
  Bathroom.findAll(req.user.id)
    .then(bathrooms => {
      res.status(200).render('bathrooms/bathrooms-index', {
        bathrooms: bathrooms,
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
};

// bathroomController.index = (req, res) => {
//   res.render('index');
// }


bathroomController.send = (req, res) => {
  console.log(res.locals.information)
  //res.json(res.locals.information)
}

//give model instruction on what to do when task is clicked
bathroomController.show = (req, res) => {
  Bathroom.findById(req.params.id)
    .then(bathroom => {
      res.status(200).render('bathrooms/bathrooms-single', {
        bathroom: bathroom,
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
};

//commented out because add bathroom feature removed
// bathroomController.create = (req,res) => {
//   Bathroom.create({
//     name: req.body.name ,
//     street: req.body.street ,
//     city: req.body.city ,
//     state: req.body.state,
//     accessible: req.body.accessible  || 'FALSE',
//     unisex: req.body.unisex  || 'TRUE',
//     price: req.body.price  || 'TRUE',
//     directions: req.body.directions,
//     comment: req.body.comment,
//     latitude: req.body.latitude,
//     longitude: req.body.longitude,
//     country: req.body.country,
//     distance: req.body.distance,
//     bearing: req.body.bearing
//   }, req.user.id).then((bathroom)=>{
//     res.redirect(`/bathrooms/${bathroom.id}`)
//   }).catch(err=>{
//     console.log(err)
//     res.status(500).json(err)
//   })
// }

bathroomController.create = (req,res) => {
  Bathroom.create({
    name: req.body.name ,
    street: req.body.street,
    city: req.body.city ,
    state: req.body.state,
    accessible: req.body.accessible,
    unisex: req.body.unisex,
    price: req.body.price,
    directions: req.body.directions,
    comment: req.body.comment,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    country: req.body.country,
    distance: req.body.distance
  }, req.user.id).then((bathroom)=>{
    res.redirect(`/bathrooms/${bathroom.id}`)
  }).catch(err=>{
    console.log(err)
    res.status(500).json(err)
  })
}

module.exports = bathroomController;
