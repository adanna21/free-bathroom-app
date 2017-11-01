//initiate all items app will need
const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

const PORT = process.env.PORT || 3000;

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

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('index');
});

const bathroomRoutes = require('./routes/bathroom-routes');
app.use('/bathrooms', bathroomRoutes);

app.get('*', (req, res) => {
  res.status(404).send('Not Found');
});
