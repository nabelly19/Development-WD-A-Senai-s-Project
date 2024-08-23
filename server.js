const express = require('express');
const routes = require('./routes');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// arquivos estáticos
app.use(express.static('public'));

// sessões
const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
  secret: process.env.SESSION_SECRET,
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false
}));

// cookie parser middleware
app.use(cookieParser());

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(routes);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});