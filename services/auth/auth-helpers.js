const bcrypt = require('bcryptjs');

//compare db password to entered password
function comparePass(userPassword, databasePassword) {
  console.log(userPassword, databasePassword);
  return bcrypt.compareSync(userPassword, databasePassword);
}

function loginRedirect(req, res, next) {
  if (req.user){
    return res.redirect('/user')
  }

  return next();
}


function loginRequired(req, res, next) {
  if (!req.user){
    return res.redirect('/auth/login')
  }

  return next();
}

module.exports = {
  comparePass: comparePass,
  loginRedirect: loginRedirect,
  loginRequired: loginRequired,
};
