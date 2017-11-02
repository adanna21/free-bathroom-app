const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const init = require('./passport');
const User = require('../../models/User');
const authHelpers = require('./auth-helpers');

const options = {};

init();

passport.use(
  new LocalStrategy(options, (username, password, done) => {
    User.findByUserName(username)
      .then(user => {
        console.log(user);
        console.log('login');
        if(!user) {
          console.log('no user');
          return done(null, false);
        }
        if(!authHelpers.comparePass(password, user.password_digest)){
          console.log('no match');
          return done(null, false);
        }else {
          console.log('match');
          return done(null, user);
        }
      }).catch(err => {
        console.log(err);
        return done(err);
      });
  })
);

module.exports = passport;
