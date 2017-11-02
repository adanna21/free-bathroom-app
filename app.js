//initiate all items app will need
const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

//stuff for user author
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const app = express();

require('dotenv').config();


const PORT = process.env.PORT || 3000;
const getmac = require('getmac');

//tell app where to listen
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

//tell app what type of template to expect
app.set('view engine', 'ejs');

//tell app where to find views
app.set('views', path.join(__dirname, 'views'));

//tell app to use static styles & images
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('index', { user: req.user || null });
});

// DECLARED A GLOBAL VARIABLE FOR USER
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});


const bathroomRoutes = require('./routes/bathroom-routes');
app.use('/bathrooms', bathroomRoutes);
const authRouter = require('./routes/auth-routes');
app.use('/auth', authRouter);
const userRoutes = require('./routes/user-routes');
app.use('/user', userRoutes);


app.get('*', (req, res) => {
  res.status(404).send('Not Found');
});
