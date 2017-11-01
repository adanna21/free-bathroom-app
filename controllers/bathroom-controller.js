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

// taskController.index = (req, res) => {
//   Task.findAll(req.user.id)
//     .then(tasks => {
//       res.status(200).render('tasks/tasks-index', {
//         tasks: tasks,
//       });
//     }).catch(err => {
//       console.log(err);
//       res.status(500).json({error: err});
//     });
// };
bathroomController.index = (req, res) => {
  res.render('index');
}


bathroomController.send = (req, res) => {
  console.log(res.locals.information)
  //res.json(res.locals.information)
}

bathroomController.show = (req, res) => {
  console.log(req.body);
}

bathroomController.create = (req,res) => {
  Bathroom.create({
    name: req.body.name ,
    street: req.body.street ,
    city: req.body.city ,
    state: req.body.state,
    accessible: req.body.accessible,
    unisex: req.body.unisex,
    price: req.body.price,
    directions: req.body.directions,
    comment: req.body.comment,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    country: req.body.country,
    distance: req.body.distance,
    bearing: req.body.bearing
  }).then((bathroom)=>{
    res.send(bathroom)
  }).catch(err=>{
    console.log(err)
    res.status(500).json(err)
  })
}



module.exports = bathroomController;
