require('dotenv').config();
const express = require('express');
const session = require('express-session');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.static('public'));

app.use('/', require('./src/routes/beneficiaireRoutes'));
app.use('/', require('./src/routes/virementRoutes'));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});