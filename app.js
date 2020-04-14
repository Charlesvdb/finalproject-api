var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const cors = require("cors")
require('dotenv').config()

app.use(cors({
  credentials: true,
  origin: ["http://localhost:3001"]
}))

app.use(express.static('public'))

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

mongoose
  .connect('mongodb://localhost/finalproject', {useNewUrlParser: true})
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

app.use(session({
secret: "basic-auth-secret",
cookie: {maxAge: 600000},
store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60
    })
}));  


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(cors({
  origin: ["https://localhost:3000", "http://localhost:3000"],
  credentials: true
}))

module.exports = app;
