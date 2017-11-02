const bcrypt = require('bcryptjs');
const User = require('../models/User');

const usersController = {};

usersController.create = (req, res) => {
  console.log(req.body.password);
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  User.create({
    username: req.body.username,
    password_digest: hash,
    name: req.body.name,
    email: req.body.email,
  }).then(user => {
    req.login(user, err => {
      if (err) return next(err);
      res.redirect('/user');
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
}

usersController.index = (req, res) => {
  res.redirect('/bathrooms');
};

module.exports = usersController;
