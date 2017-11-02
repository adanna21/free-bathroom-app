const express = require('express');

const bathroomRoutes = express.Router();
const bathroomController = require('../controllers/bathroom-controller');
const helper = require('../services/bathroom-helpers')


bathroomRoutes.get('/', bathroomController.index);

// this is the dispay view for the post
// bathroomRoutes.get('/new', (req,res)=>{
//   res.render('bathrooms/bathrooms-new',{});
// });
bathroomRoutes.post('/',bathroomController.create);
bathroomRoutes.post('/show',bathroomController.show);

bathroomRoutes.post('/api', helper.api, (req, res, next) => {
  res.json(res.locals.data)
  //res.render('/bathrooms/bathrooms-index', {});
});

bathroomRoutes.get('/map', (req,res)=>{
  res.render('bathrooms/bathrooms-map');
});

bathroomRoutes.get('/index', (req,res)=>{
  res.render('bathrooms/bathrooms-index',{});
});

// showing bathroom details
bathroomRoutes.get('/:id', bathroomController.show);
// bathroomRoutes.get('/show', (req,res)=>{
//   res.render('bathrooms/bathrooms-single');
// });


module.exports = bathroomRoutes;
