const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const bcryptjs = require('bcryptjs');
const expressValidator = require('express-validator');
const session = require('express-session');
const port = process.env.PORT || 4040;
const route = require('./models/route');
const users = require('./models/user');

const app = express();

app.engine('hbs', hbs({extname: "hbs", defaultLayout: "layout", layoutDir: __dirname+"/views/layouts/"}));

app.set('port', port);
app.set('view engine', 'hbs');

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(session({secret: "secret", saveUninitialized: false, resave: false}));
app.use('/', route);
app.use('/', users);

app.listen(port, () => {
  console.log(`App listening to port ${port}`);
});
